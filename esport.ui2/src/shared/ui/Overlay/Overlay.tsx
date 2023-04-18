import cn from "classnames";
import { memo } from "react";
import styles from "./Overlay.module.css";

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

const Overlay = (props: OverlayProps) => {
  const { className, onClick } = props;

  return <div onClick={onClick} className={cn(styles.Overlay, className)} />;
};

export default memo(Overlay);
