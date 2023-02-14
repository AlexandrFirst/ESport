import { FC, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { SportModal } from "@shared/ui/SportModal/SportModal";
import { SportButton } from "@shared/ui/SportButton/SportButton";

interface SportPromptProps {
  shouldConfirmLeave: boolean;
}

export const SportPrompt: FC<SportPromptProps> = ({ shouldConfirmLeave }) => {
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

  return (
    <SportModal
      open={shouldShowLeaveConfirmDialog}
      title={"Warning! You have unsaved changes."}
      onClose={onRejectRouteChange}
      actions={
        <>
          <SportButton isNew onClick={onRejectRouteChange} variant={"outlined"}>
            Cancel
          </SportButton>
          <SportButton isNew onClick={onConfirmRouteChange}>
            Ok, leave
          </SportButton>
        </>
      }
    />
  );
};
