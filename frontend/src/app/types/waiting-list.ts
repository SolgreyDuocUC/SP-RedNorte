export interface WaitingListEntry {
  id: string;
  patientId: string;
  patientName: string;
  specialtyId: string;
  specialtyName: string;
  facilityId: string;
  facilityName: string;
  entryDate: string;
  priority: Priority;
  status: WaitingListStatus;
  estimatedWaitDays: number;
  diagnosis?: string;
  notes?: string;
}

export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export type WaitingListStatus =
  | 'registered'
  | 'waiting'
  | 'prioritized'
  | 'scheduled'
  | 'attended'
  | 'cancelled';
