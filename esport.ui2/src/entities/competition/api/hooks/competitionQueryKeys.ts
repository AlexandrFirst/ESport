export const competitionQueryKeys = {
  all: ["competitions"],
  byId: (id: string) => [...competitionQueryKeys.all, "by-id", id],
  byOrgId: (id?: number) => [...competitionQueryKeys.all, "by-org-id", id],
};
