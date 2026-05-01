export const pastAppointments = [
{
    id: '3',
    specialty: 'Medicina Interna',
    practitioner: 'Dra. Ana Torres',
    date: '15 Abril 2026',
    time: '11:00 AM',
    facility: 'Hospital Regional Iquique',
    status: 'completed',
    },
];

export const statusConfig = {
    confirmed:  { label: 'Confirmada',  classes: 'bg-green-50 text-green-700 border-green-200' },
    scheduled:  { label: 'Agendada',    classes: 'bg-amber-50 text-amber-700 border-amber-200' },
    completed:  { label: 'Completada',  classes: 'bg-slate-50 text-slate-600 border-slate-200' },
    cancelled:  { label: 'Cancelada',   classes: 'bg-red-50 text-red-700 border-red-200' },
};