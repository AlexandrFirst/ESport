// export { Profile } from "./ui/Profile/Profile";

export { ProfilePhotoWithWrapper as ProfilePhoto } from "./ui/ProfilePhoto/ProfilePhotoWithWrapper";
export { EditableProfilePhoto } from "./ui/ProfilePhoto/EditableProfilePhoto";
export { default as ProfileMainInfo } from "./ui/ProfileMainInfo/ProfileMainInfo";
export { default as AboutInfo } from "./ui/AboutInfo/AboutInfo";
export { default as OverviewCard } from "./ui/OverviewCard/OverviewCard";

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
