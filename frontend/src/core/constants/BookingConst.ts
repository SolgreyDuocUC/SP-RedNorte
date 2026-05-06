import { Specialty, TimeSlot, Doctor } from '../../app/types/Booking';

export const PREVISION_OPTIONS = [
  'Fonasa A',
  'Fonasa B',
  'Fonasa C',
  'Fonasa D',
  'Isapre',
  'Particular',
];

export const SPECIALTIES: Specialty[] = [
  { id: 'cardiologia',      name: 'Cardiología',       icon: 'Heart' },
  { id: 'neurologia',       name: 'Neurología',        icon: 'Brain' },
  { id: 'traumatologia',    name: 'Traumatología',     icon: 'Bone' },
  { id: 'oftalmologia',     name: 'Oftalmología',      icon: 'Eye' },
  { id: 'broncopulmonar',   name: 'Broncopulmonar',    icon: 'Wind' },
  { id: 'medicina-general', name: 'Medicina General',  icon: 'Stethoscope' },
  { id: 'pediatria',        name: 'Pediatría',         icon: 'Baby' },
  { id: 'ginecologia',      name: 'Ginecología',       icon: 'Activity' },
];

export const MOCK_SLOTS: TimeSlot[] = [
  { time: '08:30', available: true  },
  { time: '09:00', available: false },
  { time: '09:30', available: true  },
  { time: '10:00', available: true  },
  { time: '10:30', available: false },
  { time: '11:00', available: true  },
  { time: '11:30', available: true  },
  { time: '14:00', available: false },
  { time: '14:30', available: true  },
  { time: '15:00', available: true  },
  { time: '15:30', available: true  },
  { time: '16:00', available: true  },
];

export const MOCK_DOCTORS: Doctor[] = [
  { id: 'dr-1', name: 'Dr. Rodrigo Martínez', specialty: 'cardiologia'      },
  { id: 'dr-2', name: 'Dra. Ana Fuentes',     specialty: 'neurologia'       },
  { id: 'dr-3', name: 'Dr. Pablo Soto',       specialty: 'traumatologia'    },
  { id: 'dr-4', name: 'Dra. Carmen Rojas',    specialty: 'oftalmologia'     },
  { id: 'dr-5', name: 'Dr. Luis Vera',        specialty: 'broncopulmonar'   },
  { id: 'dr-6', name: 'Dra. María Espinoza',  specialty: 'medicina-general' },
  { id: 'dr-7', name: 'Dra. Javiera Muñoz',   specialty: 'pediatria'        },
  { id: 'dr-8', name: 'Dra. Sandra Torres',   specialty: 'ginecologia'      },
];

export const CENTER_NAME = 'Centro Norte · Quilpué';
export const CENTER_ID   = 'centro-norte-quilpue';

export const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];

export const WEEKDAYS_SHORT = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

/** Valida formato RUN chileno: 12.345.678-9 o 12.345.678-K */
export function validateRun(value: string): boolean {
  return /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(value);
}

/** Formatea una fecha Date a etiqueta legible en español */
export function formatDateLabel(date: Date): string {
  return date.toLocaleDateString('es-CL', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  });
}