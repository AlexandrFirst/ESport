import { Button, Modal } from "@/shared/ui";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import styles from "./Prompt.module.css";

interface PromptProps {
  shouldConfirmLeave: boolean;
}

export const Prompt: FC<PromptProps> = ({ shouldConfirmLeave }) => {
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
    useState(false);
  const [nextRouterPath, setNextRouterPath] = useState<string | null>("");

  const router = useRouter();

  const onRouteChangeStart = useCallback(
    (nextPath: string) => {
      if (!shouldConfirmLeave) {
        return;
      }

      setShouldShowLeaveConfirmDialog(true);
      setNextRouterPath(nextPath);

      throw "cancelRouteChange";
    },
    [shouldConfirmLeave]
  );

  const onRejectRouteChange = () => {
    setNextRouterPath(null);
    setShouldShowLeaveConfirmDialog(false);
  };

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog(false);
    // simply remove the listener here so that it doesn't get triggered when we push the new route.
    // This assumes that the component will be removed anyway as the route changes
    removeListener();
    router.push(nextRouterPath ?? "");
  };

  const removeListener = () => {
    router.events.off("routeChangeStart", onRouteChangeStart);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", onRouteChangeStart);

    return removeListener;
  }, [onRouteChangeStart]);

  useEffect(() => {
    const unloadCallback = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const modalActions = useCallback(
    (close: () => void) => (
      <div className={styles.btn_container}>
        <Button fullWidth={false} onClick={close}>
          Cancel
        </Button>
        <Button fullWidth={false} onClick={onConfirmRouteChange}>
          Ok, leave
        </Button>
      </div>
    ),
    [onConfirmRouteChange]
  );

  return (
    <Modal
      isOpen={shouldShowLeaveConfirmDialog}
      title={"Warning! You have unsaved changes."}
      description={"If you leave, your changes will be lost."}
      onClose={onRejectRouteChange}
      lazy
      actions={modalActions}
    />
  );
};
