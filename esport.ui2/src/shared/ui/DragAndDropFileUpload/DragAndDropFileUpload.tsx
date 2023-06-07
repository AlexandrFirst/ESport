import React, { ReactNode } from "react";
import styles from "./DragAndDropFileUpload.module.css";

import { FileUpload } from "../FileUpload/FileUpload";
import { useDragAndDrop } from "./useDragAndDrop";

interface DragAndDropFileUploadProps {
  onFileChange?: (file: File[] | null) => void;
  accept: string;
  className?: string;
  multiple?: boolean;
  withText?: boolean;
  children?: ReactNode;
  onFilesReject?: () => void;
}

export const DragAndDropFileUpload: React.FC<DragAndDropFileUploadProps> = ({
  onFileChange,
  accept,
  className,
  multiple,
  withText = true,
  children,
  onFilesReject,
}) => {
  const { drag, handleDragStart, handleDragLeave, handleDropFile } =
    useDragAndDrop({ onFileChange, accept, onFilesReject });

  return (
    <div className={className}>
      {drag ? (
        <div
          className={styles.dropArea}
          onDragStart={handleDragStart}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragStart}
          onDrop={handleDropFile}
        >
          Drop your file here
        </div>
      ) : (
        <div
          className={styles.dropArea}
          onDragStart={handleDragStart}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragStart}
        >
          {withText && (
            <>
              Drag your file here,
              <FileUpload
                accept={accept}
                onFileChange={onFileChange}
                multiple={multiple}
              >
                <button className={styles.action_text}>or click here</button>
              </FileUpload>
              to upload it
            </>
          )}
          {children}
        </div>
      )}
    </div>
  );
};
