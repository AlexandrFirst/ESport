import React, { FC } from "react";

import { AppVideo, ErrorText } from "@/shared/ui";

import { getExerciseVideoUrl } from "../../lib/helpers/getExerciseVideoUrl";

interface VideoItemProps {
  videoId: number;
}

const ErrorFallback: FC = () => {
  return (
    <div className={"flex justify-center"}>
      <ErrorText>Error while loading video</ErrorText>
    </div>
  );
};

export const VideoItem: FC<VideoItemProps> = ({ videoId }) => {
  return (
    <AppVideo
      src={getExerciseVideoUrl(videoId)}
      controls
      width={490}
      height={400}
      errorFallback={<ErrorFallback />}
    />
  );
};
