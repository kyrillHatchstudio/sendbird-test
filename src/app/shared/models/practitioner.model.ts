export interface PractitionerByType {
  description: string | null;
  sendbirdId: string | null
  timekitId: string | null
  verified: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  positionTitle: string | null;
  titleCredentials: string | null;
  avatarUrl: string;
  thumbnailUrl: string;
  availabilityStatus: 'online' | 'offline' | 'busy' | null;
  createdAt: Date;
  updatedAt: Date;
  prefix: string;
  practitionerId: string;
  practitionerTypeId: string;
}


export interface Practitioner {
  availabilityStatus: 'online' | 'offline' | 'busy' | null;
  avatarUrl: string;
  createdAt: Date;
  email: string;
  firstName: string;
  id: string;
  lastName: string,
  passwordHashed: string;
  sendbirdId: string;
  thumbnailUrl: string;
  timekitId: string;
  updatedAt: Date;
  verified: string;
}