import { createBuildPath } from "@/shared/lib";

const buildPath = createBuildPath("/trainer");

export const trainerRoutes = {
  Timetable: buildPath("/timetable"),
  Excercises: buildPath("/excercises"),
  CreateExcercise: buildPath("/excercises/create"),
};
