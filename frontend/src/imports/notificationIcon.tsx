import { Bell, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const typeIcons = {
    'appointment-reminder': Calendar,
    'waiting-list-update': Clock,
    'appointment-scheduled': CheckCircle,
    'reassignment-offer': Bell,
    general: AlertCircle,
};

export const typeStyles = {
    'appointment-reminder': 'from-blue-500 to-cyan-500',
    'waiting-list-update': 'from-amber-500 to-orange-500',
    'appointment-scheduled': 'from-green-500 to-emerald-500',
    'reassignment-offer': 'from-purple-500 to-pink-500',
    general: 'from-gray-500 to-slate-500',
};