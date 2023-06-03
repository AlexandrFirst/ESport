import { GetGymTimetableRequest, IGymListingRequest } from "../types/types";

export const gymApiKeys = {
  all: ["gyms"] as const,
  gymListing: (request: IGymListingRequest) =>
    [...gymApiKeys.all, "gymListing", request] as const,
  gymTimetable: (gymId: number, request: GetGymTimetableRequest) =>
    [...gymApiKeys.all, "gym-timetable", gymId, request] as const,
  addUpdateTimetable: () =>
    [...gymApiKeys.all, "gym-timetable", "update"] as const,
};
