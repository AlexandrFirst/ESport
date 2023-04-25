import { createBuildPath, Parameter } from "@/shared/lib";

const buildPath = createBuildPath("/competition/category");

export const categoryRoutes = {
  CategoryById: buildPath<[Parameter]>("/:categoryId"),
};
