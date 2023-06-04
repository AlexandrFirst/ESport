export interface CreateUpdateShift {
  from: string;
  to: string;
  notifyOnUpdate: boolean;
}

export interface CreateUpdateShiftWithTrainerRequest extends CreateUpdateShift {
  trainerRequest?: string;
}
