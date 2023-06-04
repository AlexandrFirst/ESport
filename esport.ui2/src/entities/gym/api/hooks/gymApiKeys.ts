import {
  GetGymTimetableRequest,
  GetTrainerRequestsRequest,
  IGymListingRequest,
} from "../types/types";

export const gymApiKeys = {
  all: ["gyms"] as const,
  gymListing: (request: IGymListingRequest) =>
    [...gymApiKeys.all, "gymListing", request] as const,
  gymTimetable: (gymId: number, request: GetGymTimetableRequest) =>
    [...gymApiKeys.all, "gym-timetable", gymId, request] as const,
  addUpdateTimetable: () =>
    [...gymApiKeys.all, "gym-timetable", "update"] as const,
  createTrainerRequest: () =>
    [...gymApiKeys.all, "trainer-request", "create"] as const,
  getTrainerRequestsAll: () =>
    [...gymApiKeys.all, "get-trainer-requests"] as const,
  getTrainerRequestsRequest: (request?: GetTrainerRequestsRequest) =>
    [...gymApiKeys.all, "get-trainer-requests", request] as const,
};
