export interface Availability {
  start: string;
  end: string;
  resources: {
    id: string;
    name: string;
    timezone: string;
  }[]
}
