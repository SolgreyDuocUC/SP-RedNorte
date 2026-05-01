export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  patientId?: string;
}

export type UserRole =
  | 'patient'
  | 'administrative'
  | 'medical'
  | 'coordinator'
  | 'administrator';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
