import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface QuickAction {
  label: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-mobile-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="dashboard">

      <!-- Header -->
      <div class="dash-header">
        <div>
          <p class="greeting">{{greeting}}</p>
          <h1>{{userName}}</h1>
          <span class="role-badge">{{roleLabel}}</span>
        </div>
        <div class="avatar">
          <mat-icon>account_circle</mat-icon>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section-label">Quick Actions</div>
      <div class="actions-grid">
        <button
          *ngFor="let action of actions"
          class="action-card"
          (click)="navigate(action.route)"
          [style.--accent]="action.color">
          <div class="action-icon">
            <mat-icon>{{action.icon}}</mat-icon>
          </div>
          <span>{{action.label}}</span>
        </button>
      </div>

      <!-- Recent Activity -->
      <div class="section-label">Recent Activity</div>
      <div class="activity-list">
        <div class="activity-item" *ngFor="let item of recentActivity">
          <div class="activity-dot" [style.background]="item.color"></div>
          <div class="activity-info">
            <p class="activity-title">{{item.title}}</p>
            <p class="activity-time">{{item.time}}</p>
          </div>
          <mat-icon class="activity-arrow">chevron_right</mat-icon>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px 16px 32px;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Header */
    .dash-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 28px;
    }

    .greeting {
      font-size: 0.85rem;
      color: var(--text-muted) !important;
      margin: 0 0 4px 0;
    }

    .dash-header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary) !important;
      margin: 0 0 8px 0;
    }

    .role-badge {
      display: inline-block;
      padding: 3px 10px;
      background: var(--brand-50);
      color: var(--brand-600) !important;
      border: 1px solid var(--brand-200);
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .dark-theme .role-badge {
      background: rgba(99,102,241,0.1);
      border-color: rgba(99,102,241,0.2);
    }

    .avatar mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--brand-400) !important;
    }

    /* Section label */
    .section-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted) !important;
      margin-bottom: 12px;
    }

    /* Actions grid */
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 28px;
    }

    @media (min-width: 480px) {
      .actions-grid { grid-template-columns: repeat(4, 1fr); }
    }

    .action-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 18px 8px;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--text-primary) !important;

      &:hover {
        border-color: var(--accent, var(--brand-500));
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
    }

    .action-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent, var(--brand-500)) 12%, transparent);
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon {
        font-size: 20px;
        color: var(--accent, var(--brand-500)) !important;
      }
    }

    /* Activity list */
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      overflow: hidden;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--surface-border);
      cursor: pointer;
      transition: background 0.15s ease;

      &:last-child { border-bottom: none; }
      &:hover { background: var(--surface-hover); }
    }

    .activity-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .activity-info { flex: 1; }

    .activity-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary) !important;
      margin: 0 0 2px 0;
    }

    .activity-time {
      font-size: 0.75rem;
      color: var(--text-muted) !important;
      margin: 0;
    }

    .activity-arrow {
      font-size: 18px;
      color: var(--text-muted) !important;
    }
  `]
})
export class MobileDashboardComponent implements OnInit {
  userName = '';
  roleLabel = '';
  greeting = '';
  actions: QuickAction[] = [];
  recentActivity: { title: string; time: string; color: string }[] = [];

  private readonly patientActions: QuickAction[] = [
    { label: 'Appointments', icon: 'event',         route: '/appointments',    color: '#6366f1' },
    { label: 'Prescriptions', icon: 'medication',   route: '/prescriptions',   color: '#10b981' },
    { label: 'Video Call',    icon: 'video_call',   route: '/telemedicine',    color: '#3b82f6' },
    { label: 'Lab Results',   icon: 'biotech',      route: '/lab-results',     color: '#f59e0b' },
    { label: 'Records',       icon: 'folder_shared',route: '/medical-records', color: '#8b5cf6' },
    { label: 'Billing',       icon: 'receipt_long', route: '/patient-billing', color: '#ef4444' },
    { label: 'Insurance',     icon: 'shield',       route: '/insurance',       color: '#06b6d4' },
    { label: 'Tracking',      icon: 'monitor_heart',route: '/health-tracking', color: '#ec4899' }
  ];

  private readonly doctorActions: QuickAction[] = [
    { label: 'Patients',      icon: 'people',       route: '/patients',             color: '#6366f1' },
    { label: 'Schedule',      icon: 'schedule',     route: '/smart-scheduling',     color: '#10b981' },
    { label: 'Telemedicine',  icon: 'video_call',   route: '/telemedicine',         color: '#3b82f6' },
    { label: 'Prescriptions', icon: 'medication',   route: '/doctor-prescriptions', color: '#f59e0b' },
    { label: 'AI Insights',   icon: 'insights',     route: '/ai-insights',          color: '#8b5cf6' },
    { label: 'Voice Notes',   icon: 'mic',          route: '/voice-notes',          color: '#ef4444' },
    { label: 'Clinical Notes',icon: 'note_add',     route: '/clinical-notes',       color: '#06b6d4' },
    { label: 'Profile',       icon: 'person',       route: '/profile',              color: '#ec4899' }
  ];

  private readonly adminActions: QuickAction[] = [
    { label: 'Analytics',    icon: 'analytics',          route: '/analytics',         color: '#6366f1' },
    { label: 'Users',        icon: 'admin_panel_settings',route: '/user-management',  color: '#10b981' },
    { label: 'Hospital',     icon: 'local_hospital',     route: '/hospital-management',color: '#3b82f6' },
    { label: 'Billing',      icon: 'receipt',            route: '/billing',           color: '#f59e0b' },
    { label: 'Compliance',   icon: 'verified_user',      route: '/compliance',        color: '#8b5cf6' },
    { label: 'Audit Logs',   icon: 'history',            route: '/audit-logs',        color: '#ef4444' },
    { label: 'Settings',     icon: 'settings',           route: '/system-settings',   color: '#06b6d4' },
    { label: 'Profile',      icon: 'person',             route: '/profile',           color: '#ec4899' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    const hour = new Date().getHours();
    this.greeting = hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';

    const names: Record<string, string> = {
      patient: 'Mathew Boobies',
      doctor:  'Dr. Nkosi Dlamini',
      admin:   'N. Shimambani'
    };

    const roles: Record<string, string> = {
      patient: 'Patient',
      doctor:  'Physician',
      admin:   'System Administrator'
    };

    const activity: Record<string, { title: string; time: string; color: string }[]> = {
      patient: [
        { title: 'Appointment with Dr. Dlamini confirmed', time: '2 hours ago',  color: '#10b981' },
        { title: 'Lab results ready for review',           time: 'Yesterday',    color: '#3b82f6' },
        { title: 'Prescription refill approved',           time: '2 days ago',   color: '#6366f1' }
      ],
      doctor: [
        { title: '3 new patient appointments today',       time: 'Just now',     color: '#6366f1' },
        { title: 'AI flagged high-risk patient',           time: '1 hour ago',   color: '#ef4444' },
        { title: 'Prescription request from Mathew B.',    time: '3 hours ago',  color: '#f59e0b' }
      ],
      admin: [
        { title: 'System uptime: 99.98%',                  time: 'Live',         color: '#10b981' },
        { title: '12 new user registrations today',        time: '30 min ago',   color: '#6366f1' },
        { title: 'Compliance report generated',            time: 'This morning', color: '#3b82f6' }
      ]
    };

    this.userName     = names[user.role]    || 'User';
    this.roleLabel    = roles[user.role]    || user.role;
    this.recentActivity = activity[user.role] || [];

    const actionsMap: Record<string, QuickAction[]> = {
      patient: this.patientActions,
      doctor:  this.doctorActions,
      admin:   this.adminActions
    };
    this.actions = actionsMap[user.role] || this.patientActions;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}