import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { AppNextPage } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "angular-component-m": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const StreamsPage: AppNextPage = () => {
  let basePath = process.env.NEXT_PUBLIC_STREAM_UI_APP ?? "";
  const { theme } = useTheme();

  const [value, setValue] = useState("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const router = useRouter();

  function getIFramePath(_newUrl: string) {
    let hashPart = _newUrl.split("#")[1];
    if (!hashPart) {
      hashPart = "streams";
    }
    setValue(hashPart);
  }

  const sendMessageToIframe = (message: any) => {
    if (iframeRef.current) {
      // Specify the target origin if needed, e.g., "http://example.com"
      const targetOrigin = "*";
      // Send the message to the iframe
      iframeRef.current.contentWindow?.postMessage(message, targetOrigin);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "hashchange",
      (e: HashChangeEvent) => {
        getIFramePath(e.newURL);
      },
      false
    );

    getIFramePath(router.asPath);
  }, [router.asPath]);

  useEffect(() => {
    sendMessageToIframe(theme);
  }, [theme]);

  return (
    <iframe
      ref={iframeRef}
      src={`${basePath}${value}`}
      className={"stream-iframe"}
      allow="camera *;microphone *"
      allowFullScreen={true}
    />
  );
};

StreamsPage.getLayout = getMainLayout({
  headProps: { title: "Streams | E-Sport" },
  withPaddingRight: false,
});

export default StreamsPage;
