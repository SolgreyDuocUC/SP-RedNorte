import { usersApi } from "./users.api";

export interface UserRoleDTO {
  id?: string;
  name: string;
}

export interface UserDTO {
  id?: string;
  run: string;
  nombre: string;
  segundoNombre?: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numeroTelefono?: string;
  direccion?: string;
  password?: string;
  email: string;
  enabled: boolean;
  roles: UserRoleDTO[];
}

export const usersRemote = {
  getAll: async (): Promise<UserDTO[]> => {
    const response = await usersApi.get<UserDTO[]>("/users");
    return response.data;
  },

  getById: async (id: string): Promise<UserDTO> => {
    const response = await usersApi.get<UserDTO>(`/users/${id}`);
    return response.data;
  },

  create: async (user: UserDTO): Promise<UserDTO> => {
    const response = await usersApi.post<UserDTO>("/users", user);
    return response.data;
  },

  update: async (id: string, user: UserDTO): Promise<UserDTO> => {
    const response = await usersApi.put<UserDTO>(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await usersApi.delete(`/users/${id}`);
  }
};
