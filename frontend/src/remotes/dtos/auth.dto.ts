export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginUserInfoDTO {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface LoginResponseDTO {
  token: string;
  user: LoginUserInfoDTO;
}
