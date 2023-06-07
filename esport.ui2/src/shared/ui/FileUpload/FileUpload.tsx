import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useRef,
} from "react";
import styles from "./FileUpload.module.css";
import cn from "classnames";

export interface FileUploadProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onFileChange?: (files: File[] | null) => void;
  children: ReactNode;
  multiple?: boolean;
  className?: string;
}

export const FileUpload: FC<FileUploadProps> = ({
  accept,
  onFileChange,
  name = "file",
  children,
  multiple,
  className,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onFileChange?.(files ? Array.from(files) : null);
  };

  const handleClick = () => ref.current?.click();

  return (
    <div onClick={handleClick} className={cn(styles.wrapper, className)}>
      <input
        type="file"
        name={name}
        onChange={handleChange}
        className={styles.input}
        accept={accept}
        ref={ref}
        multiple={multiple}
      />
      {children}
    </div>
  );
};
