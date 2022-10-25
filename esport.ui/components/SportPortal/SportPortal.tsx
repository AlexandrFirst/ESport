import ReactDOM from "react-dom";
import React, { PropsWithChildren, useEffect, useState } from "react";

export const SportPortal: React.FC<PropsWithChildren> = ({ children }) => {
  const [container] = useState(() => document?.createElement("div"));

  useEffect(() => {
    document?.body.appendChild(container);
    return () => {
      document?.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};
