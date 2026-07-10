import { usersApi } from "./users.api";
import { mockStorage } from "../mocks/mockStorage";

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
    return usersApi.get<UserDTO[]>("/users").then(r => r.data).catch(() => mockStorage.getUsers());
  },

  getById: async (id: string): Promise<UserDTO> => {
    return usersApi.get<UserDTO>(`/users/${id}`).then(r => r.data).catch(err => {
      const found = mockStorage.getUsers().find(u => u.id === id || u.run === id);
      if (found) return found;
      throw err;
    });
  },

  create: async (user: UserDTO): Promise<UserDTO> => {
    return usersApi.post<UserDTO>("/users", user).then(r => r.data).catch(() => mockStorage.createUser(user));
  },

  update: async (id: string, user: UserDTO): Promise<UserDTO> => {
    return usersApi.put<UserDTO>(`/users/${id}`, user).then(r => r.data).catch(() => mockStorage.updateUser(id, user));
  },

  delete: async (id: string): Promise<void> => {
    await usersApi.delete(`/users/${id}`).catch(() => mockStorage.deleteUser(id));
  }
};

