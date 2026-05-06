import { api } from "../api";
import type { UserDTO, UserCreateDTO, UserUpdateDTO } from "../../DTO/UserDTO";
import type { ChangePasswordDTO } from "../../DTO/ChangePasswordDTO";
import type { DeleteAccountDTO } from "@/remote/DTO/DeleteAccountDTO";

const URL = "/api/v1/users";

export const UserService = {
  register: async (data: UserCreateDTO): Promise<UserDTO> => {
    const res = await api.post<UserDTO>(URL, data);
    return res.data;
  },

  getUsers: async (): Promise<UserDTO[]> => {
    const res = await api.get<UserDTO[]>(URL);
    return res.data;
  },

  getUserById: async (id: number): Promise<UserDTO> => {
    const res = await api.get<UserDTO>(`${URL}/${id}`);
    return res.data;
  },

  getByEmail: async (email: string): Promise<UserDTO> => {
    const res = await api.get<UserDTO>(`${URL}/email/${email}`);
    return res.data;
  },

  getByRun: async (run: string): Promise<UserDTO> => {
    const res = await api.get<UserDTO>(`${URL}/run/${run}`);
    return res.data;
  },

  updateUser: async (id: number, data: UserUpdateDTO): Promise<UserDTO> => {
    const res = await api.put<UserDTO>(`${URL}/${id}`, data);
    return res.data;
  },

  changePassword: async (
    id: number,
    data: ChangePasswordDTO
  ): Promise<void> => {
    await api.put(`${URL}/${id}/change-password`, data);
  },

deleteUser: async (id: number, payload?: DeleteAccountDTO): Promise<void> => {
    await api.delete(`${URL}/${id}`);
  },
};
