export const mockFacilities = [
    {
        id: '1',
        name: 'Hospital Regional Iquique',
        type: 'hospital',
        address: 'Av. Héroes de la Concepción 2500',
        commune: 'Iquique',
        region: 'Tarapacá',
        phone: '+56 57 2391000',
        email: 'contacto@hriquique.cl',
        specialties: ['Cardiología', 'Traumatología', 'Medicina Interna', 'Cirugía'],
    },
    {
        id: '2',
        name: 'CESFAM Norte',
        type: 'primary-care',
        address: 'Calle Los Aromos 340',
        commune: 'Iquique',
        region: 'Tarapacá',
        phone: '+56 57 2345678',
        email: 'cesfamnorte@salud.cl',
        specialties: ['Medicina General', 'Pediatría', 'Ginecología'],
    },
    {
        id: '3',
        name: 'Clínica Especializada Norte',
        type: 'specialized-center',
        address: 'Av. Arturo Prat 1850',
        commune: 'Iquique',
        region: 'Tarapacá',
        phone: '+56 57 2456789',
        email: 'contacto@clinicaespecializada.cl',
        specialties: ['Oftalmología', 'Otorrinolaringología', 'Dermatología'],
    },
];

export const typeLabels = {
    hospital: 'Hospital',
    clinic: 'Clínica',
    'primary-care': 'Centro de Atención Primaria',
    'specialized-center': 'Centro Especializado',
    };

export const typeStyles = {
    hospital: 'bg-blue-100 text-blue-700',
    clinic: 'bg-purple-100 text-purple-700',
    'primary-care': 'bg-green-100 text-green-700',
    'specialized-center': 'bg-orange-100 text-orange-700',
};