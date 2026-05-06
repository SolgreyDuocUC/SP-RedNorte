import type { UserRole } from "@/types";

export interface AuthResponse {
    id: number;
    accessToken: string;
    refreshToken: string;
    email: string;
    roles: UserRole[];
}
export interface AuthUser {
    id: number;
    email: string;
    roles: UserRole[];
}

