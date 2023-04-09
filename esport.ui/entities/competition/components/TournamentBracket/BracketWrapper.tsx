import { FC, PropsWithChildren } from "react";
import styles from "./tournamentBracket.module.scss";
import cn from "classnames";

interface BracketWrapperProps extends PropsWithChildren {
  className?: string;
}

export const BracketWrapper: FC<BracketWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn(styles.bracket_wrapper, className)}>{children}</div>
  );
};
