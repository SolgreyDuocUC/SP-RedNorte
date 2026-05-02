import type { WaitingListEntry } from '../app/types';

class WaitingListService {
  private baseUrl = '/waiting-list';

  async getEntriesByPatient(patientId: string): Promise<WaitingListEntry[]> {
    // Mock implementation
    return [
      {
        id: '1',
        patientId,
        patientName: 'Juan Pérez González',
        specialtyId: 's1',
        specialtyName: 'Traumatología',
        facilityId: 'f1',
        facilityName: 'Hospital Regional Iquique',
        entryDate: '2026-04-01',
        priority: 'medium',
        status: 'waiting',
        estimatedWaitDays: 45,
        diagnosis: 'Lesión de rodilla',
      },
    ];
  }

  async createEntry(entry: Omit<WaitingListEntry, 'id'>): Promise<WaitingListEntry> {
    // Mock implementation
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...entry,
    };
  }

  async updatePriority(id: string, priority: WaitingListEntry['priority']): Promise<void> {
    // Mock implementation
    console.log(`Entry ${id} priority updated to ${priority}`);
  }

  async updateStatus(id: string, status: WaitingListEntry['status']): Promise<void> {
    // Mock implementation
    console.log(`Entry ${id} status updated to ${status}`);
  }
}

export const waitingListService = new WaitingListService();
