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
  // ── Cardiología ───────────────────────────────────────────────────────────
  {
    id: 'dr-1',
    name: 'Dr. Rodrigo Martínez',
    specialty: 'cardiologia',
    title: 'Cardiólogo Intervencionista',
    experience: 15,
    bio: 'Especialista en cardiología preventiva e intervencional, ecocardiografía y arritmias.',
    slots: 6,
  },
  {
    id: 'dr-9',
    name: 'Dra. Fernanda Ibáñez',
    specialty: 'cardiologia',
    title: 'Cardióloga Clínica',
    experience: 8,
    bio: 'Enfocada en insuficiencia cardíaca, hipertensión arterial y rehabilitación cardiovascular.',
    slots: 3,
  },

  // ── Neurología ────────────────────────────────────────────────────────────
  {
    id: 'dr-2',
    name: 'Dra. Ana Fuentes',
    specialty: 'neurologia',
    title: 'Neuróloga Clínica',
    experience: 12,
    bio: 'Especialista en cefaleas, epilepsia y neurología vascular.',
    slots: 4,
  },
  {
    id: 'dr-10',
    name: 'Dr. Cristóbal Ríos',
    specialty: 'neurologia',
    title: 'Neurólogo Funcional',
    experience: 9,
    bio: 'Trastornos del movimiento, Parkinson y síndromes neurológicos complejos.',
    slots: 5,
  },

  // ── Traumatología ─────────────────────────────────────────────────────────
  {
    id: 'dr-3',
    name: 'Dr. Pablo Soto',
    specialty: 'traumatologia',
    title: 'Traumatólogo Ortopédico',
    experience: 18,
    bio: 'Cirugía de rodilla y hombro, trauma de alta energía y artroplastías.',
    slots: 2,
  },
  {
    id: 'dr-11',
    name: 'Dra. Valentina Morales',
    specialty: 'traumatologia',
    title: 'Traumatóloga Deportiva',
    experience: 7,
    bio: 'Lesiones deportivas, medicina del deporte y retorno al rendimiento atlético.',
    slots: 7,
  },

  // ── Oftalmología ──────────────────────────────────────────────────────────
  {
    id: 'dr-4',
    name: 'Dra. Carmen Rojas',
    specialty: 'oftalmologia',
    title: 'Oftalmóloga General',
    experience: 11,
    bio: 'Diagnóstico y tratamiento de patologías oculares, cirugía refractiva y cataratas.',
    slots: 5,
  },
  {
    id: 'dr-12',
    name: 'Dr. Felipe Herrera',
    specialty: 'oftalmologia',
    title: 'Oftalmólogo Pediátrico',
    experience: 6,
    bio: 'Problemas visuales infantiles, estrabismo y ambliopía.',
    slots: 4,
  },

  // ── Broncopulmonar ────────────────────────────────────────────────────────
  {
    id: 'dr-5',
    name: 'Dr. Luis Vera',
    specialty: 'broncopulmonar',
    title: 'Broncopulmonar Adulto',
    experience: 14,
    bio: 'Enfermedades respiratorias crónicas, EPOC, asma y patología de la vía aérea.',
    slots: 4,
  },
  {
    id: 'dr-13',
    name: 'Dra. Patricia Núñez',
    specialty: 'broncopulmonar',
    title: 'Broncopulmonar Intervencional',
    experience: 10,
    bio: 'Fibrobroncoscopía, derrame pleural y enfermedades pulmonares intersticiales.',
    slots: 2,
  },

  // ── Medicina General ──────────────────────────────────────────────────────
  {
    id: 'dr-6',
    name: 'Dra. María Espinoza',
    specialty: 'medicina-general',
    title: 'Médico General',
    experience: 6,
    bio: 'Atención primaria integral, prevención, control de crónicos y salud del adulto.',
    slots: 8,
  },
  {
    id: 'dr-14',
    name: 'Dr. Andrés Castillo',
    specialty: 'medicina-general',
    title: 'Médico General',
    experience: 10,
    bio: 'Medicina familiar, manejo de enfermedades crónicas no transmisibles y salud preventiva.',
    slots: 6,
  },

  // ── Pediatría ─────────────────────────────────────────────────────────────
  {
    id: 'dr-7',
    name: 'Dra. Javiera Muñoz',
    specialty: 'pediatria',
    title: 'Pediatra General',
    experience: 9,
    bio: 'Salud infantil, control de niño sano, desarrollo psicomotor y vacunación.',
    slots: 5,
  },
  {
    id: 'dr-15',
    name: 'Dr. Sebastián Lagos',
    specialty: 'pediatria',
    title: 'Pediatra Neonatólogo',
    experience: 11,
    bio: 'Atención del recién nacido, prematuro y seguimiento del desarrollo temprano.',
    slots: 3,
  },

  // ── Ginecología ───────────────────────────────────────────────────────────
  {
    id: 'dr-8',
    name: 'Dra. Sandra Torres',
    specialty: 'ginecologia',
    title: 'Ginecóloga y Obstetra',
    experience: 13,
    bio: 'Salud femenina integral, control ginecológico, embarazo de alto riesgo y colposcopía.',
    slots: 3,
  },
  {
    id: 'dr-16',
    name: 'Dra. Catalina Vega',
    specialty: 'ginecologia',
    title: 'Ginecóloga Oncológica',
    experience: 8,
    bio: 'Patología cervical, cáncer ginecológico y cirugía laparoscópica.',
    slots: 2,
  },
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
  const dv   = clean.slice(-1);
  const bodyFormatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${bodyFormatted}-${dv}`;
}

/** Valida RUN chileno con módulo 11 */
export function validateRun(formatted: string): boolean {
  const clean = formatted.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
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

/** Extrae iniciales de un nombre de médico, omitiendo el tratamiento */
export function doctorInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Dra\.)\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('');
}
