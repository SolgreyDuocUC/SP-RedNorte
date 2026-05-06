export interface Notification {
  id: string;
  patientId: string;
  type: NotificationType;
  title: string;
  message: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  sentAt?: string;
  readAt?: string;
  relatedEntityId?: string;
  relatedEntityType?: 'appointment' | 'waiting-list' | 'procedure';
}

export type NotificationType =
  | 'appointment-scheduled'
  | 'appointment-reminder'
  | 'appointment-cancelled'
  | 'appointment-rescheduled'
  | 'waiting-list-update'
  | 'reassignment-offer'
  | 'general';

export type NotificationChannel = 'email' | 'sms' | 'portal' | 'all';

export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'read';
