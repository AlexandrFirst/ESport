export const getExerciseVideoUrl = (videoId?: number) => {
  if (!videoId) return "";
  return `${process.env.NEXT_PUBLIC_API_URL}/exercise-tutorial/${videoId}`;
};
