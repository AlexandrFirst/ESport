import React, { FC, ReactNode } from "react";

interface RoundProps {
  className?: string;
  children?: ReactNode;
}

export const Round: FC<RoundProps> = ({ className }) => {
  //   flex: 0;
  //   // min-width:300px;
  //   display:flex;
  //   flex-direction:column;
  // @media (max-width: ${props.mobileBreakpoint}px) {
  //     min-width:0;
  //   }
  return <div>Round</div>;
};
