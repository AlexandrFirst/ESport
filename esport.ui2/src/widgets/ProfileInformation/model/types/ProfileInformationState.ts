import { IProfile } from "@/entities/profile";

export interface ProfileInformationState {
  currentProfile: IProfile | null;
  editableProfile: IProfile;
  overrideLoginInfo: keyof IProfile | null;
}
