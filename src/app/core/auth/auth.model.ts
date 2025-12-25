export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
