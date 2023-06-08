export const bodyPartApiKeys = {
  all: ["bodyParts"] as const,
  getAllBodyParts: () => [...bodyPartApiKeys.all, "get-all-bodyParts"] as const,
};
