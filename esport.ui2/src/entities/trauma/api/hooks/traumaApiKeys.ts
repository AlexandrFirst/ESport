export const traumaApiKeys = {
  all: ["traumas"] as const,
  getAllTraumas: () => [...traumaApiKeys.all, "get-all-traumas"] as const,
};
