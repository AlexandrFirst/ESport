import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  FC,
  HTMLAttributes,
} from "react";
import styles from "./IconButton.module.css";

import { IconProps, Icon } from "@/shared/ui/Icon/Icon";
import cn from "classnames";

type IconButtonProps = IconProps &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    svgClassName?: string;
    as?: ElementType;
  };

export const IconButton: FC<IconButtonProps> = (props) => {
  const {
    svgClassName,
    Svg,
    iconSize = "s",
    className,
    as: Component = "button",
    ...otherProps
  } = props;

  return (
    <Component
      {...otherProps}
      className={cn(styles.wrapper, className, styles[iconSize])}
    >
      <Icon Svg={Svg} className={svgClassName} iconSize={iconSize} />
    </Component>
  );
};
