import type { RoleCreateDTO, RoleDTO, RoleUpdateDTO } from "@/remote/DTO/RoleDTO";

import { api } from "../api";

const ROLE_URL = "/api/v1/roles";

    export const RoleService = {

    getAll: async (): Promise<RoleDTO[]> => {
        const { data } = await api.get<RoleDTO[]>(ROLE_URL);
        return data;
    },

    getById: async (id: number): Promise<RoleDTO> => {
        const { data } = await api.get<RoleDTO>(`${ROLE_URL}/${id}`);
        return data;
    },

    create: async (dto: RoleCreateDTO): Promise<RoleDTO> => {
        const { data } = await api.post<RoleDTO>(ROLE_URL, dto);
        return data;
    },

    update: async (id: number, dto: RoleUpdateDTO): Promise<RoleDTO> => {
        const { data } = await api.put<RoleDTO>(`${ROLE_URL}/${id}`, dto);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`${ROLE_URL}/${id}`);
    },
};
