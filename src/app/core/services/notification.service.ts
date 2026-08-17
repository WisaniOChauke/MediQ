import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  
  public notifications$ = this.notifications.asObservable();

  constructor(private snackBar: MatSnackBar) {
    this.initializeNotifications();
  }

  private initializeNotifications() {
    // This will be updated when user logs in
    this.updateNotificationsForRole('patient');
  }

  updateNotificationsForRole(role: string) {
    const roleNotifications = {
      'patient': [
        {
          id: '1',
          type: 'warning' as const,
          title: 'Appointment Reminder',
          message: 'You have an appointment with Dr. Nkosi Dlamini tomorrow at 10:00 AM',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          type: 'info' as const,
          title: 'Lab Results Available',
          message: 'Your blood work results from January 10th are now available',
          timestamp: new Date(Date.now() - 3600000),
          read: false
        },
        {
          id: '3',
          type: 'success' as const,
          title: 'Prescription Refilled',
          message: 'Your Lisinopril prescription has been successfully refilled',
          timestamp: new Date(Date.now() - 7200000),
          read: true
        }
      ],
      'doctor': [
        {
          id: '1',
          type: 'warning' as const,
          title: 'High Priority Patient',
          message: 'David Chen requires immediate attention - cardiac follow-up with Dr. Nkosi Dlamini',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          type: 'info' as const,
          title: 'Schedule Update',
          message: 'Your 3:00 PM appointment has been rescheduled to 3:30 PM',
          timestamp: new Date(Date.now() - 1800000),
          read: false
        },
        {
          id: '3',
          type: 'success' as const,
          title: 'Lab Results Reviewed',
          message: 'All pending lab results have been reviewed and signed',
          timestamp: new Date(Date.now() - 5400000),
          read: true
        }
      ],
      'admin': [
        {
          id: '1',
          type: 'error' as const,
          title: 'System Alert',
          message: 'Database backup completed with warnings - review required',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          type: 'warning' as const,
          title: 'License Expiration',
          message: 'Dr. Nkosi Dlamini medical license renewal due in 180 days',
          timestamp: new Date(Date.now() - 3600000),
          read: false
        },
        {
          id: '3',
          type: 'info' as const,
          title: 'Monthly Report',
          message: 'January performance report is ready for review',
          timestamp: new Date(Date.now() - 7200000),
          read: true
        }
      ]
    };

    const notifications = roleNotifications[role as keyof typeof roleNotifications] || roleNotifications['patient'];
    this.notifications.next(notifications);
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: ['error-snackbar']
    });
  }

  getUnreadCount(): number {
    return this.notifications.value.filter(n => !n.read).length;
  }

  markAsRead(id: string) {
    const notifications = this.notifications.value.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    this.notifications.next(notifications);
  }

  markAllAsRead() {
    const notifications = this.notifications.value.map(n => ({ ...n, read: true }));
    this.notifications.next(notifications);
  }
}