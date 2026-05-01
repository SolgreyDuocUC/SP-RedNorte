export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  APPOINTMENTS: '/appointments',
  WAITING_LIST: '/waiting-list',
  PATIENTS: '/patients',
  FACILITIES: '/facilities',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  LOGIN: '/login',
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  scheduled: 'Agendada',
  confirmed: 'Confirmada',
  'in-progress': 'En Curso',
  completed: 'Completada',
  cancelled: 'Cancelada',
  'no-show': 'Inasistencia',
} as const;

export const PRIORITY_LABELS = {
  urgent: 'Urgente',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
} as const;

export const WAITING_LIST_STATUS_LABELS = {
  registered: 'Ingresado',
  waiting: 'En Espera',
  prioritized: 'Priorizado',
  scheduled: 'Agendado',
  attended: 'Atendido',
  cancelled: 'Cancelado',
} as const;
