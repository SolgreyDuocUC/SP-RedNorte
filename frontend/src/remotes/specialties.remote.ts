import { specialtiesApi } from './specialties.api';

export interface SpecialtyDTO {
  idEspecialidad: number;
  nombreEspecialidad: string;
  descripcionEspecialidad?: string;
}

export const specialtiesRemote = {
  getAll(): Promise<SpecialtyDTO[]> {
    return specialtiesApi.get<SpecialtyDTO[]>('').then(r => r.data);
  },
  create(data: { nombreEspecialidad: string; descripcionEspecialidad: string }): Promise<SpecialtyDTO> {
    return specialtiesApi.post<SpecialtyDTO>('', data).then(r => r.data);
  },
  update(id: number, data: { nombreEspecialidad: string; descripcionEspecialidad: string }): Promise<SpecialtyDTO> {
    return specialtiesApi.put<SpecialtyDTO>(`/${id}`, data).then(r => r.data);
  },
  delete(id: number): Promise<void> {
    return specialtiesApi.delete(`/${id}`).then(() => {});
  },
};

