import { SessionType } from './session-type.model';

export interface SessionData {
  practitionerId: string;
  id?: string;
  startDate: Date;
  endDate: Date;
  type: SessionType;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
  practitionerTypeId: string;
  serviceId: string;
  userId: string;
}
