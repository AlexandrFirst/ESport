import { ProfileContacts } from "./profile-contacts.type";

export type Profile = {
  bannerImage?: string;
  avatarImage?: string;
  fullName: string;
  level?: string;
  location?: string;
  lastLogin?: string;
  country?: string;
  contacts?: ProfileContacts;
};
