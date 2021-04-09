// optional parameters to update
export class UserParams {
  check_in_time?: 'Morning' | 'Day' | 'Evening' | 'Night';
  firstName?: string;
  email?: string;
  password?: string;
}

export class User extends UserParams {
  email: string;
  id: string;
  token?: string;
  firstName?: string;
}
