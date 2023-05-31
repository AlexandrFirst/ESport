// export { Profile } from "./ui/Profile/Profile";

export { AboutInfo } from "./ui/AboutInfo/AboutInfo";
export { default as OverviewCard } from "./ui/OverviewCard/OverviewCard";

export { ProfilePhotoWithWrapper as ProfilePhoto } from "./ui/ProfilePhoto/ProfilePhotoWithWrapper";
export { EditableProfilePhoto } from "./ui/ProfilePhoto/EditableProfilePhoto";
export { ProfileMainInfo } from "./ui/ProfileMainInfo/ProfileMainInfo";
export { ProfileInfo } from "./ui/ProfileInfo/ProfileInfo";
export { ProfileDataForm } from "./ui/ProfileDataForm/ProfileDataForm";
export type { ProfileDataFormProps } from "./ui/ProfileDataForm/ProfileDataForm";
export { ReadonlyProfileInfo } from "./ui/ReadonlyProfileInfo/ReadonlyProfileInfo";

//model
export type { ProfileSchema } from "./model/types/profileSchema";
export {
  useProfileActions,
  profileActions,
  profileReducer,
} from "./model/slices/profileSlice";

//api
export { ProfileApi } from "./api/profileApi";
export { profileApiKeys } from "./api/hooks/profileApiKeys";
export { useGetProfileInfo } from "./api/hooks/useGetProfileInfo";
export { useUpdateProfileInfo } from "./api/hooks/useUpdateProfileInfo";
export { useConfirmMyProfile } from "./api/hooks/useConfirmMyProfile";

//hooks
export { useProfileInfo } from "./lib/hooks/useProfileInfo";

//helpers
export { transformProfileDataToUpdate } from "./lib/helpers/transformProfileDataToUpdate/transformProfileDataToUpdate";
export { getOrganisationAdminInfo } from "./lib/helpers/getOrganisationInfo/getOrganisationInfo";

//types
export type { IProfile, IProfileInfo } from "./model/types/profile";
export type { ITrainerSportInfo } from "./model/types/trainer-sport-info";
