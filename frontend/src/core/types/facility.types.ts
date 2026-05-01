export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  address: string;
  commune: string;
  region: string;
  phone: string;
  email: string;
  isActive: boolean;
}

export type FacilityType =
  | 'hospital'
  | 'clinic'
  | 'primary-care'
  | 'specialized-center';

export interface Specialty {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
}

export interface Practitioner {
  id: string;
  firstName: string;
  lastName: string;
  specialtyId: string;
  specialtyName: string;
  facilityId: string;
  facilityName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  isActive: boolean;
}
