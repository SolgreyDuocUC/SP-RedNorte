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

/** Formatea RUN: "123456789" → "12.345.678-9" */
export function formatRun(raw: string): string {
  const clean = raw.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length === 0) return '';

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  const bodyFormatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${bodyFormatted}-${dv}`;
}

/** Valida RUN chileno con módulo 11 */
export function validateRun(formatted: string): boolean {
  const clean = formatted.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 2) return false;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  const expected =
    remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder);

  return dv === expected;
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