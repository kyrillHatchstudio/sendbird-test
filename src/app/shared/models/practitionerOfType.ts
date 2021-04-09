export interface PractitionerOfType {
    availabilityStatus: null | 'online' | 'offline' | 'busy';
    avatarUrl: string;
    description: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    positionTitle: string;
    practitionerId: string;
    practitionerTypeId: string;
    prefix: string;
    sendbirdId: string;
    thumbnailUrl: string;
    timekitId: string;
    titleCredentials: string;
}