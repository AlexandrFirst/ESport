import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useRef,
} from "react";
import styles from "./FileUpload.module.css";

interface FileUploadProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onFileChange?: (file: File | null) => void;
  children: ReactNode;
}

export const FileUpload: FC<FileUploadProps> = ({
  accept,
  onFileChange,
  name = "file",
  children,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFileChange?.(e.target?.files?.[0] ?? null);
  };

  const handleClick = () => ref.current?.click();

  return (
    <div onClick={handleClick} className={styles.wrapper}>
      <input
        type="file"
        name={name}
        onChange={handleChange}
        className={styles.input}
        accept={accept}
        ref={ref}
      />
      {children}
    </div>
  );
};
