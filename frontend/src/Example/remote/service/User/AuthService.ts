import type { AuthResponse } from "@/remote/DTO/AuthDTO";
import type { UserCreateDTO, UserDTO } from "@/remote/DTO/UserDTO";
import { api } from "../api";

const AUTH_URL = "/api/v1/auth";

export const AuthService = {

    login: async (email: string, password: string): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>(`${AUTH_URL}/login`, {
        email,
        password,
        });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data;
    },

    register: async (user: UserCreateDTO): Promise<UserDTO> => {
        const { data } = await api.post<UserDTO>(`${AUTH_URL}/register`, user);
        return data;
    },

    refreshToken: async (): Promise<AuthResponse> => {
        const refreshToken = localStorage.getItem("refreshToken");

        const { data } = await api.post<AuthResponse>(`${AUTH_URL}/refresh`, {
        refreshToken,
        });

        localStorage.setItem("accessToken", data.accessToken);
        return data;
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
};
