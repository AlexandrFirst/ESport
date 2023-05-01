import { ProfileContacts } from "./profile-contacts";

export interface IProfile {
  bannerImage?: string;
  avatarImage?: string;
  fullName: string;
  level?: string;
  location?: string;
  lastLogin?: string;
  country?: string;
  contacts?: ProfileContacts;
}
