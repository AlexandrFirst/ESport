// export { Profile } from "./ui/Profile/Profile";

export { AboutInfo } from "./ui/AboutInfo/AboutInfo";
export { default as OverviewCard } from "./ui/OverviewCard/OverviewCard";

export { ProfilePhotoWithWrapper as ProfilePhoto } from "./ui/ProfilePhoto/ProfilePhotoWithWrapper";
export { EditableProfilePhoto } from "./ui/ProfilePhoto/EditableProfilePhoto";
export { ProfileMainInfo } from "./ui/ProfileMainInfo/ProfileMainInfo";
export { ProfileInfo } from "./ui/ProfileInfo/ProfileInfo";
export { ProfileDataForm } from "./ui/ProfileDataForm/ProfileDataForm";
export type { ProfileDataFormProps } from "./ui/ProfileDataForm/ProfileDataForm";

//model
export type { ProfileSchema } from "./model/types/profileSchema";
export type { IOldProfileToRemove } from "./model/types/profile";
export {
  useProfileActions,
  profileActions,
  profileReducer,
} from "./model/slices/profileSlice";

//api
export { ProfileApi } from "./api/profileApi";
export {
  getProfileKeys,
  useGetProfileInfo,
} from "./api/hooks/useGetProfileInfo";

//hooks
export { useProfileInfo } from "./lib/hooks/useProfileInfo";

//types
export type { IProfile, IProfileInfo } from "./model/types/profile";
