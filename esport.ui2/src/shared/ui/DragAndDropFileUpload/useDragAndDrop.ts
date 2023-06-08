import { DragEvent, useState } from "react";
import { useThrottle } from "@/shared/lib";

interface UseDragAndDropProps {
  onFileChange?: (files: File[] | null) => void;
  onFilesReject?: () => void;
  accept?: string;
}

export const useDragAndDrop = (params?: UseDragAndDropProps) => {
  const { onFileChange, accept, onFilesReject } = params || {};

  const [drag, setDrag] = useState(false);
  const throttledSetDrag = useThrottle(setDrag, 100);

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    throttledSetDrag(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    throttledSetDrag(false);
  };

  const handleDropFile = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const allowedTypes = accept?.split(/[,\/]/).map((item) => item.trim());

    const filteredFiles = Array.from(files).filter((file) => {
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      return allowedTypes
        ? allowedTypes?.some(
            (type) =>
              fileType === type ||
              fileName.endsWith(type) ||
              fileType.includes(type)
          )
        : true;
    });
    onFileChange?.(!!filteredFiles?.length ? filteredFiles : null);
    if (filteredFiles?.length !== files.length) {
      onFilesReject?.();
    }
    setDrag(false);
  };

  return {
    drag,
    handleDragStart,
    handleDragLeave,
    handleDropFile,
    setDrag,
    throttledSetDrag,
  };
};
