import cn from "classnames";
import React, { memo } from "react";
import styles from "./Icon.module.css";
import { LucideIcon } from "lucide-react";

export type IconSvg =
  | React.ForwardRefExoticComponent<
      | React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
          title?: string;
          titleId?: string;
        } & React.RefAttributes<SVGSVGElement>
    >
  | LucideIcon;

export interface IconProps {
  Svg: IconSvg;
  className?: string;
  iconSize?: "s" | "m" | "l";
  fill?: boolean;
}

export const Icon = memo(function Icon(props: IconProps) {
  const { className, Svg, iconSize = "s", fill = true } = props;

  return (
    <Svg
      className={cn(className, styles[iconSize], {
        [styles.Icon]: fill,
      })}
    />
  );
});
