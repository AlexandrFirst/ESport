export interface IGym {}

export interface IGymInfo {
  name: string;
  address: string;
  openTime: Date;
  closeTime: Date;
  gymOrganisationId?: number;
  organisationName: string;
}
