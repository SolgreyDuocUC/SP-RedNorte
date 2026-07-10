import type { PatientDTO, CoverageDTO, CreatePatientDTO } from '../remotes/dtos/patient.dto';
import type { AppointmentDTO, CreateAppointmentDTO, SlotDTO } from '../remotes/dtos/appointment.dto';
import type { FacilityDTO } from '../remotes/facilities.remote';
import type { UserDTO } from '../remotes/users.remote';
import { mockFacilities } from './mockFacilities';

const KEYS = {
  PATIENTS: 'rn_mock_patients_v1',
  COVERAGES: 'rn_mock_coverages_v1',
  APPOINTMENTS: 'rn_mock_appointments_v1',
  SLOTS: 'rn_mock_slots_v1',
  FACILITIES: 'rn_mock_facilities_v1',
  USERS: 'rn_mock_users_v1',
};

const getTodayString = () => new Date().toISOString().split('T')[0];

const INITIAL_COVERAGES: CoverageDTO[] = [
  { id: 'cov-1', code: 'FON-A', name: 'FONASA A', description: 'Fondo Nacional de Salud Tramo A' },
  { id: 'cov-2', code: 'FON-B', name: 'FONASA B', description: 'Fondo Nacional de Salud Tramo B' },
  { id: 'cov-3', code: 'FON-C', name: 'FONASA C', description: 'Fondo Nacional de Salud Tramo C' },
  { id: 'cov-4', code: 'FON-D', name: 'FONASA D', description: 'Fondo Nacional de Salud Tramo D' },
  { id: 'cov-5', code: 'ISA-BAN', name: 'ISAPRE - Banmédica', description: 'Institución de Salud Previsional' },
  { id: 'cov-6', code: 'ISA-CON', name: 'ISAPRE - Consalud', description: 'Institución de Salud Previsional' },
  { id: 'cov-7', code: 'ISA-CRU', name: 'ISAPRE - CruzBlanca', description: 'Institución de Salud Previsional' },
  { id: 'cov-8', code: 'ISA-COL', name: 'ISAPRE - Colmena', description: 'Institución de Salud Previsional' },
  { id: 'cov-9', code: 'PART', name: 'Particular', description: 'Atención Particular / Sin Previsión' },
];

const INITIAL_PATIENTS: PatientDTO[] = [
  {
    id: 'pat-2024-001',
    identifierValue: '12.345.678-9',
    firstName: 'Juan Pablo',
    lastName: 'Pérez Cotapos',
    birthDate: '1985-06-15',
    gender: 'MALE',
    phone: '+56 9 8765 4321',
    email: 'jperez@rednorte.cl',
    address: 'Av. Héroes de la Concepción 1200, Iquique',
    coverage: INITIAL_COVERAGES[2], // FONASA C
  },
  {
    id: 'pat-2024-002',
    identifierValue: '26.823.184-6',
    firstName: 'María Fernanda',
    lastName: 'González Rojas',
    birthDate: '1992-11-20',
    gender: 'FEMALE',
    phone: '+56 9 1234 5678',
    email: 'mgonzalez@rednorte.cl',
    address: 'Los Aromos 450, Iquique',
    coverage: INITIAL_COVERAGES[4], // Banmédica
  },
  {
    id: 'pat-2024-003',
    identifierValue: '15.678.901-2',
    firstName: 'Carlos Andrés',
    lastName: 'Reyes Silva',
    birthDate: '1978-03-10',
    gender: 'MALE',
    phone: '+56 9 9988 7766',
    email: 'creyes@rednorte.cl',
    address: 'Arturo Prat 2100, Alto Hospicio',
    coverage: INITIAL_COVERAGES[0], // FONASA A
  },
];

const INITIAL_APPOINTMENTS: AppointmentDTO[] = [
  {
    id: 'app-101',
    patientId: 'pat-2024-001',
    practitionerId: 'Dr. María Silva',
    specialty: 'Cardiología',
    start: `${getTodayString()}T10:00:00.000Z`,
    end: `${getTodayString()}T10:30:00.000Z`,
    status: 'booked',
    description: 'Control cardiológico anual · Paciente: Juan Pablo Pérez Cotapos',
  },
  {
    id: 'app-102',
    patientId: 'pat-2024-002',
    practitionerId: 'Dr. Carlos Rojas',
    specialty: 'Medicina General',
    start: `${getTodayString()}T11:30:00.000Z`,
    end: `${getTodayString()}T12:00:00.000Z`,
    status: 'booked',
    description: 'Consulta general · Paciente: María Fernanda González Rojas',
  },
  {
    id: 'app-103',
    patientId: 'pat-2024-003',
    practitionerId: 'Dra. Ana Torres',
    specialty: 'Traumatología',
    start: `${getTodayString()}T15:00:00.000Z`,
    end: `${getTodayString()}T15:30:00.000Z`,
    status: 'fulfilled',
    description: 'Evaluación post-operatoria rodilla · Paciente: Carlos Andrés Reyes Silva',
  },
  {
    id: 'app-104',
    patientId: 'pat-2024-001',
    practitionerId: 'Dr. Roberto Mendez',
    specialty: 'Oftalmología',
    start: `${getTodayString()}T16:30:00.000Z`,
    end: `${getTodayString()}T17:00:00.000Z`,
    status: 'cancelled',
    description: 'Examen de fondo de ojo · Paciente: Juan Pablo Pérez Cotapos',
  },
];

const INITIAL_USERS: UserDTO[] = [
  {
    id: 'usr-001',
    run: '11.111.111-1',
    nombre: 'Dra. María',
    apellidoPaterno: 'Silva',
    apellidoMaterno: 'Rojas',
    numeroTelefono: '+56 9 8877 6655',
    email: 'msilva@rednorte.cl',
    enabled: true,
    roles: [{ id: 'rol-1', name: 'ROLE_MEDICO' }],
  },
  {
    id: 'usr-002',
    run: '12.222.333-4',
    nombre: 'Carlos',
    apellidoPaterno: 'Rojas',
    apellidoMaterno: 'Mendez',
    numeroTelefono: '+56 9 7766 5544',
    email: 'crojas@rednorte.cl',
    enabled: true,
    roles: [{ id: 'rol-2', name: 'ROLE_MEDICO' }],
  },
  {
    id: 'usr-003',
    run: '13.333.444-5',
    nombre: 'Patricia',
    apellidoPaterno: 'Morales',
    apellidoMaterno: 'Vega',
    numeroTelefono: '+56 9 6655 4433',
    email: 'pmorales@rednorte.cl',
    enabled: true,
    roles: [{ id: 'rol-3', name: 'ROLE_ADMINISTRATIVO' }],
  },
  {
    id: 'usr-004',
    run: '14.444.555-6',
    nombre: 'Roberto',
    apellidoPaterno: 'Admin',
    apellidoMaterno: 'General',
    numeroTelefono: '+56 9 5544 3322',
    email: 'admin@rednorte.cl',
    enabled: true,
    roles: [{ id: 'rol-4', name: 'ROLE_ADMIN' }],
  },
];

const INITIAL_SLOTS: SlotDTO[] = [
  { id: 's-101', practitionerId: 'Dr. María Silva', start: `${getTodayString()}T09:00:00Z`, end: `${getTodayString()}T09:30:00Z`, status: 'free' },
  { id: 's-102', practitionerId: 'Dr. María Silva', start: `${getTodayString()}T10:00:00Z`, end: `${getTodayString()}T10:30:00Z`, status: 'free' },
  { id: 's-103', practitionerId: 'Dr. María Silva', start: `${getTodayString()}T11:00:00Z`, end: `${getTodayString()}T11:30:00Z`, status: 'free' },
  { id: 's-104', practitionerId: 'Dr. Carlos Rojas', start: `${getTodayString()}T10:30:00Z`, end: `${getTodayString()}T11:00:00Z`, status: 'free' },
  { id: 's-105', practitionerId: 'Dr. Carlos Rojas', start: `${getTodayString()}T15:30:00Z`, end: `${getTodayString()}T16:00:00Z`, status: 'free' },
  { id: 's-106', practitionerId: 'Dra. Ana Torres', start: `${getTodayString()}T14:00:00Z`, end: `${getTodayString()}T14:30:00Z`, status: 'free' },
];

export const mockStorage = {
  // ── Coverages ──
  getCoverages(): CoverageDTO[] {
    try {
      const stored = localStorage.getItem(KEYS.COVERAGES);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(KEYS.COVERAGES, JSON.stringify(INITIAL_COVERAGES));
    return INITIAL_COVERAGES;
  },

  createCoverage(dto: CoverageDTO): CoverageDTO {
    const list = this.getCoverages();
    const newCov = { ...dto, id: dto.id || `cov-${Date.now()}` };
    list.push(newCov);
    localStorage.setItem(KEYS.COVERAGES, JSON.stringify(list));
    return newCov;
  },

  // ── Patients ──
  getPatients(): PatientDTO[] {
    try {
      const stored = localStorage.getItem(KEYS.PATIENTS);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
    return INITIAL_PATIENTS;
  },

  getPatientById(id: string): PatientDTO | undefined {
    return this.getPatients().find(p => p.id === id || p.identifierValue === id);
  },

  getPatientByIdentifier(type: string, value: string): PatientDTO | undefined {
    const cleanValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
    return this.getPatients().find(p => {
      const cleanP = (p.identifierValue || '').replace(/[^0-9kK]/g, '').toUpperCase();
      return cleanP === cleanValue;
    });
  },

  createPatient(dto: any): PatientDTO {
    const list = this.getPatients();
    const newPat: PatientDTO = {
      id: `pat-${Date.now()}`,
      identifierValue: dto.identifierValue || 'Sin-RUN',
      firstName: dto.firstName || 'Paciente',
      lastName: dto.lastName || 'Nuevo',
      birthDate: dto.birthDate || '1990-01-01',
      gender: dto.gender || 'UNKNOWN',
      phone: dto.phone || '',
      email: dto.email || '',
      address: dto.address || '',
      coverage: { id: 'cov-custom', code: dto.prevision || 'PART', name: dto.prevision || 'Particular' } as any,
    };
    list.unshift(newPat);
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(list));
    return newPat;
  },

  updatePatient(id: string, dto: any): PatientDTO {
    const list = this.getPatients();
    const idx = list.findIndex(p => p.id === id || p.identifierValue === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...dto };
      localStorage.setItem(KEYS.PATIENTS, JSON.stringify(list));
      return list[idx];
    }
    return { id, ...dto } as PatientDTO;
  },

  deletePatient(id: string): void {
    const list = this.getPatients().filter(p => p.id !== id && p.identifierValue !== id);
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(list));
  },

  // ── Appointments ──
  getAppointments(): AppointmentDTO[] {
    try {
      const stored = localStorage.getItem(KEYS.APPOINTMENTS);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    return INITIAL_APPOINTMENTS;
  },

  getAppointmentById(id: string): AppointmentDTO | undefined {
    return this.getAppointments().find(a => a.id === id);
  },

  getAppointmentsByPatient(patientId: string): AppointmentDTO[] {
    const list = this.getAppointments();
    const cleanId = patientId.replace(/[^0-9kK]/g, '').toUpperCase();
    return list.filter(a => {
      if (a.patientId === patientId) return true;
      const cleanA = (a.patientId || '').replace(/[^0-9kK]/g, '').toUpperCase();
      return cleanA === cleanId;
    });
  },

  getAppointmentsByPractitioner(practitionerId: string): AppointmentDTO[] {
    return this.getAppointments().filter(a => a.practitionerId === practitionerId);
  },

  createAppointment(dto: CreateAppointmentDTO): AppointmentDTO {
    const list = this.getAppointments();
    const newApp: AppointmentDTO = {
      id: `app-${Date.now()}`,
      patientId: dto.patientId,
      practitionerId: dto.practitionerId,
      specialty: dto.specialty,
      start: dto.start,
      end: dto.end,
      status: dto.status || 'booked',
      description: dto.description || '',
    };
    list.unshift(newApp);
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(list));
    return newApp;
  },

  updateAppointment(id: string, dto: Partial<AppointmentDTO>): AppointmentDTO {
    const list = this.getAppointments();
    const idx = list.findIndex(a => a.id === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...dto };
      localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(list));
      return list[idx];
    }
    return { id, ...dto } as AppointmentDTO;
  },

  deleteAppointment(id: string): void {
    const list = this.getAppointments().filter(a => a.id !== id);
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(list));
  },

  // ── Facilities ──
  getFacilities(): FacilityDTO[] {
    try {
      const stored = localStorage.getItem(KEYS.FACILITIES);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(KEYS.FACILITIES, JSON.stringify(mockFacilities));
    return mockFacilities;
  },

  createFacility(dto: Partial<FacilityDTO>): FacilityDTO {
    const list = this.getFacilities();
    const newFac: FacilityDTO = {
      id: `fac-${Date.now()}`,
      name: dto.name || 'Nuevo Centro Médico',
      type: dto.type || 'hospital',
      status: dto.status || 'active',
      address: dto.address || 'Sin dirección',
      commune: dto.commune || 'Iquique',
      region: dto.region || 'Tarapacá',
      phone: dto.phone || '+56 57 2000000',
      email: dto.email || 'contacto@rednorte.cl',
      specialties: dto.specialties || ['Medicina General'],
    };
    list.push(newFac);
    localStorage.setItem(KEYS.FACILITIES, JSON.stringify(list));
    return newFac;
  },

  deleteFacility(id: string): void {
    const list = this.getFacilities().filter(f => f.id !== id);
    localStorage.setItem(KEYS.FACILITIES, JSON.stringify(list));
  },

  // ── Users (Staff) ──
  getUsers(): UserDTO[] {
    try {
      const stored = localStorage.getItem(KEYS.USERS);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  },

  createUser(dto: UserDTO): UserDTO {
    const list = this.getUsers();
    const newUsr: UserDTO = {
      ...dto,
      id: dto.id || `usr-${Date.now()}`,
    };
    list.push(newUsr);
    localStorage.setItem(KEYS.USERS, JSON.stringify(list));
    return newUsr;
  },

  updateUser(id: string, dto: UserDTO): UserDTO {
    const list = this.getUsers();
    const idx = list.findIndex(u => u.id === id || u.run === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...dto };
      localStorage.setItem(KEYS.USERS, JSON.stringify(list));
      return list[idx];
    }
    return dto;
  },

  deleteUser(id: string): void {
    const list = this.getUsers().filter(u => u.id !== id && u.run !== id);
    localStorage.setItem(KEYS.USERS, JSON.stringify(list));
  },

  // ── Slots ──
  getSlots(): SlotDTO[] {
    try {
      const stored = localStorage.getItem(KEYS.SLOTS);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(KEYS.SLOTS, JSON.stringify(INITIAL_SLOTS));
    return INITIAL_SLOTS;
  },

  // ── Auth Fallback ──
  login(run: string, password: string, isClinical: boolean = true) {
    if (isClinical) {
      const users = this.getUsers();
      const found = users.find(u => u.run === run || u.email === run);
      const roles = found?.roles ? found.roles.map(r => r.name) : ['ROLE_MEDICO'];
      return {
        id: found?.id || 'usr-mock',
        email: found?.email || 'medico@rednorte.cl',
        roles: roles,
        accessToken: 'mock-jwt-access-token-rednorte',
        refreshToken: 'mock-jwt-refresh-token-rednorte'
      };
    } else {
      const patients = this.getPatients();
      const found = patients.find(p => p.identifierValue === run || (p.email && p.email === run));
      return {
        id: found?.id || 'pat-mock',
        email: found?.email || 'paciente@rednorte.cl',
        roles: ['ROLE_PACIENTE'],
        accessToken: 'mock-jwt-access-token-paciente',
        refreshToken: 'mock-jwt-refresh-token-paciente'
      };
    }
  },

  registerPatient(payload: any) {
    const created = this.createPatient({
      identifierValue: payload.run || payload.identifierValue || '11.222.333-4',
      firstName: payload.nombre || payload.firstName || 'Nuevo',
      lastName: `${payload.apellidoPaterno || ''} ${payload.apellidoMaterno || ''}`.trim() || payload.lastName || 'Paciente',
      birthDate: payload.birthDate || '1990-01-01',
      email: payload.email || 'paciente@rednorte.cl',
      phone: payload.telefono || payload.phone || '+56 9 1111 2222',
      address: payload.direccion || payload.address || 'Iquique',
      prevision: payload.prevision || 'FONASA C'
    });
    return {
      success: true,
      patient: created,
      accessToken: 'mock-jwt-access-token-paciente',
      refreshToken: 'mock-jwt-refresh-token-paciente',
      roles: ['ROLE_PACIENTE']
    };
  }
};

