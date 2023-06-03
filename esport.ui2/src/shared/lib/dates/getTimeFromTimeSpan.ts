//12:00:00 -> 12:00

export const getTimeFromTimeSpan = (timeSpan?: string) => {
  if (!timeSpan) return "";

  if (timeSpan.length < 8) return timeSpan;
  return timeSpan?.split(":").slice(0, 2).join(":");
};
