import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import {
  GetGymTimetableRequest,
  GetGymTimetableResponse,
  IGymListingRequest,
  IGymListingResponse,
} from "./types/types";

export const GymApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    async gymListing(request: IGymListingRequest) {
      return instance.post<IGymListingResponse>("/gym-listing", request);
    },
    async getTimetable(gymId: number, request: GetGymTimetableRequest) {
      return instance.post<GetGymTimetableResponse>(
        `/gym/${gymId}/timetable/get`,
        request
      );
    },
  };
};
