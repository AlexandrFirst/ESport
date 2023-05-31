import { FC } from "react";
import styles from "./TimeInput.module.css";

import TimeField from "react-simple-timefield";
import { ClockIcon } from "lucide-react";
import cn from "classnames";

import { Icon } from "../Icon/Icon";
import { InputBase, InputBaseProps } from "../Input/InputBase";

export interface TimeInputBaseProps extends Omit<InputBaseProps, "value"> {
  value?: string;
}

export const TimeInputBase: FC<TimeInputBaseProps> = ({
  className,
  onChange,
  value,
  fullWidth = false,
  ...props
}) => {
  return (
    <TimeField
      value={value}
      onChange={onChange}
      input={
        <InputBase
          {...props}
          fullWidth={fullWidth}
          className={cn(styles.time_input, className)}
          endIcon={<Icon Svg={ClockIcon} fill={false} />}
          endIconClassName={styles.icon}
        />
      }
    />
  );
};
