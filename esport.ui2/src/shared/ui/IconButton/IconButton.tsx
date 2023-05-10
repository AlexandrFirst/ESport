import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  FC,
} from "react";
import styles from "./IconButton.module.css";

import { Icon, IconProps } from "../Icon/Icon";
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
    disabled = false,
    ...otherProps
  } = props;

  return (
    <Component
      {...otherProps}
      disabled={disabled}
      className={cn(styles.wrapper, className, styles[iconSize], {
        [styles.disabled]: disabled,
      })}
    >
      <Icon Svg={Svg} className={svgClassName} iconSize={iconSize} />
    </Component>
  );
};
