import img1 from '../assets/CARRUCEL-1.avif';
import img2 from '../assets/CARRUCEL-2.avif';
import img3 from '../assets/CARRUCEL-3.avif';

export const slides = [
  {
    id: 1,
    tag: 'Novedades',
    title: 'Red Norte amplía sus horarios los sábados y domingos',
    body: 'Unidad de Imágenes y Consultas Médicas disponibles,\nSábado 08:00 a 18:00 horas.\nDomingo 08:00 a 14:00 horas.',
    cta: 'Agenda aquí',
    accent: '#0096c7',
    image: img1,
  },
  {
    id: 2,
    tag: 'Prevención',
    title: 'Programa de salud preventiva para toda la familia',
    body: 'Controles periódicos, vacunación y atención integral.\nLunes a Viernes 07:30 a 19:00 horas.',
    cta: 'Ver programa',
    accent: '#0077b6',
    image: img2,
  },
  {
    id: 3,
    tag: 'Telemedicina',
    title: 'Consultas médicas online desde tu hogar',
    body: 'Atiéndete con nuestros especialistas sin salir de casa.\nDisponible todos los días del año.',
    cta: 'Reservar ahora',
    accent: '#023e8a',
    image: img3,
  },
];

export const navItems = [
  { label: 'Especialidades', dropdown: false },
  { label: 'Servicios y Unidades', dropdown: true },
  { label: 'Seguros y Convenios', dropdown: false },
  { label: 'Información al Paciente', dropdown: true },
];

// ─── Especialidades rápidas ────────────────────────────────────────────────────
export const especialidades = [
  'Medicina General', 'Pediatría', 'Ginecología', 'Traumatología',
  'Cardiología', 'Dermatología', 'Neurología', 'Oftalmología',
];

export const examenes = [
  'Hemograma', 'Radiografía', 'Ecografía', 'Electrocardiograma',
  'Resonancia Magnética', 'TAC', 'Mamografía', 'Endoscopía',
];

// ─── Centros ───────────────────────────────────────────────────────────────────
export const centros = [
  { nombre: 'Hospital Red Norte Central', ciudad: 'Iquique', telefono: '57 2 123 456' },
  { nombre: 'Centro Médico Alto Hospicio', ciudad: 'Alto Hospicio', telefono: '57 2 654 321' },
  { nombre: 'Clínica Colchane', ciudad: 'Colchane', telefono: '57 2 789 012' },
  { nombre: 'Posta Rural Huara', ciudad: 'Huara', telefono: '57 2 345 678' },
];
