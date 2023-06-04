import { BaseListingResult } from "@/shared/types";

import { AdminType } from "../../constants/admin-type";
import { IPendingAdminModel } from "../../model/types/pending-admin-model";
import { UserTypeEntity } from "../../constants/user-type-entity";

export interface TrainerSportInfoToUpdate {
  sportId: number;
  from: Date;
  to?: Date;
  level: string;
}

interface UpdateUserInfo {
  name?: string;
  surname?: string;
  email?: string;
  telephone?: string;
  overrideIdentityInfo: boolean;
}

export interface UpdateProfileInfoRequest {
  updateAdminInfo?: {
    updateUserInfo?: UpdateUserInfo;
    gymIds: number[];
  };
  updateOrganisationAdminInfo?: Maybe<{
    updateUserInfo?: UpdateUserInfo;
    organisationId: number;
    organisationName: string | null;
    organisationDescription: string | null;
  }>;
  updateTraineeInfo?: {
    updateUserInfo?: UpdateUserInfo;
  };
  updateTrainerInfo?: {
    updateUserInfo?: UpdateUserInfo;
    trainerSportInfoIds: TrainerSportInfoToUpdate[];
  };
}

export interface GetPendingAdminsRequest {
  page: number;
  pageSize: number;
  adminType: AdminType;
  gymId?: number;
}

export interface GetPendingAdminsResponse extends BaseListingResult {
  pendingAdminModels: IPendingAdminModel[];
}

export interface ConfirmAdminRequest {
  userId: number;
}

export interface SetAsLoginDataRequest {
  userTypeProfile: UserTypeEntity;
}
