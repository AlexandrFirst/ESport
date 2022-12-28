import { CompatitorType } from "../enums/compatitorType.enum";

export interface ICompatitor {
  _id?: string;
  displayName: string;
  weight?: number;
  height?: number;
  type: CompatitorType;
}
