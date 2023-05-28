import { IProfile } from "@/entities/profile";

export type IsEmailForProfileChanged = Record<
  keyof Omit<IProfile, "userIdentityInfo">,
  boolean
>;

export interface ProfileInformationState {
  currentProfile: IProfile | null;
  editableProfile: IProfile;
  overrideLoginInfo: keyof IProfile | null;
  isEmailForProfileChanged: Record<keyof IProfile, boolean>;
}
