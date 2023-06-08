import { Dispatch, FC, SetStateAction } from "react";
import styles from "./ExerciseVideoList.module.css";

import cn from "classnames";
import { TrashIcon } from "lucide-react";

import { Button, FileUpload, IconButton, useDragAndDrop } from "@/shared/ui";

interface ExcerciseVideoListProps {
  files: File[] | null;
  setFiles: Dispatch<SetStateAction<File[] | null>>;
  className?: string;
  onFilesReject: () => void;
}

export const ExerciseVideoList: FC<ExcerciseVideoListProps> = ({
  className,
  setFiles,
  files,
  onFilesReject,
}) => {
  const handleAdd = (files: File[] | null) => {
    if (files) {
      setFiles((prev) => prev?.concat(files) ?? null);
    }
  };

  const { handleDragStart, handleDragLeave, handleDropFile, drag } =
    useDragAndDrop({
      accept: "video/*",
      onFileChange: handleAdd,
      onFilesReject,
    });

  const handleRemove = (index: number) => () =>
    setFiles((prev) => prev?.filter((_, i) => i !== index) ?? null);

  return (
    <ul
      className={cn(styles.wrapper, className, { [styles.drag]: drag })}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragStart}
      onDrop={handleDropFile}
    >
      {files &&
        Array.from(files).map((file, index) => (
          <li key={file.name + Math.random() * 4} className={styles.list_item}>
            <span className={"flex-1 font-semibold"}>{file.name}</span>
            <IconButton
              Svg={TrashIcon}
              fill={false}
              svgClassName={styles.trash}
              iconSize={"m"}
              onClick={handleRemove(index)}
            />
          </li>
        ))}
      <FileUpload
        accept={"video/*"}
        onFileChange={handleAdd}
        multiple
        className={"flex justify-end"}
      >
        <Button variant={"text"}>+ Add more</Button>
      </FileUpload>
    </ul>
  );
};
