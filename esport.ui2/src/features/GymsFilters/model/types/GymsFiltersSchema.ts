export interface GymsFiltersSchema {
  organisationIds: number[] | null;
  name: string | null;
  address: string | null;
  openHour: Date | null;
  closeHour: Date | null;
}
