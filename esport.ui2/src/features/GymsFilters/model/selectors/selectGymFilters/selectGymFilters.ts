import { buildSelector } from "@/shared/lib";

export const [useSelectGymFilters, selectGymFilters] = buildSelector(
  (state) => state.gymsFilters
);
