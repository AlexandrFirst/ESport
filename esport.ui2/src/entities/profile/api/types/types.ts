interface TrainerSportInfo {
  sportId: number;
  from: Date;
  to: Date;
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
  updateOrganisationAdminInfo?: {
    updateUserInfo?: UpdateUserInfo;
    organisationId: number;
  };
  updateTraineeInfo?: {
    updateUserInfo?: UpdateUserInfo;
  };
  updateTrainerInfo?: {
    updateUserInfo?: UpdateUserInfo;
    trainerSportInfoIds: TrainerSportInfo[];
  };
}
