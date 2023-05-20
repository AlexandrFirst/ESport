interface UpdateUserInfo {
  name?: string;
  surname?: string;
  email?: string;
  telephone?: string;
  overrideIdentityInfo: boolean;
}

export interface UpdateProfileInfoRequest {
  updateAdmin?: UpdateUserInfo & { gymIds?: number[] };
  updateOrganisationAdmin?: UpdateUserInfo & { organisationId: number };
  updateTrainee?: UpdateUserInfo;
  updateTrainer?: UpdateUserInfo;
}
