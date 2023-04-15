import cn from "classnames";
import React, { memo } from "react";
import styles from "./Icon.module.css";

export type IconSvg = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface IconProps {
  Svg: IconSvg;
  className?: string;
  iconSize?: "s" | "m" | "l";
}

export const Icon = memo(function Icon(props: IconProps) {
  const { className, Svg, iconSize = "s" } = props;

  return <Svg className={cn(styles.Icon, className, styles[iconSize])} />;
});
