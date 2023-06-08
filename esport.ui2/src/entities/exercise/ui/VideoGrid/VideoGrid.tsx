import { FC } from "react";
import styles from "./VideoGrid.module.css";

import { BoldText } from "@/shared/ui";

import { VideoItem } from "./VideoItem";

interface VideoGridProps {
  className?: string;
  exerciseTutorialLinks: number[];
}

export const VideoGrid: FC<VideoGridProps> = ({
  className,
  exerciseTutorialLinks,
}) => {
  return (
    <>
      {!!exerciseTutorialLinks.length ? (
        <>
          <BoldText className={"mb-3"}>Tutorial videos:</BoldText>
          <div className={styles.wrapper}>
            {exerciseTutorialLinks.map((videoId) => (
              <VideoItem videoId={videoId} key={videoId} />
            ))}
          </div>
        </>
      ) : (
        <BoldText>No videos added</BoldText>
      )}
    </>
  );
};
