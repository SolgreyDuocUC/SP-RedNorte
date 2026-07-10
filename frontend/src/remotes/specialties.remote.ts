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
};
