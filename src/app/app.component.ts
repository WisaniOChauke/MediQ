import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AppState } from './core/store';
import { selectIsAuthenticated, selectUserRole } from './core/store/auth/auth.selectors';
import { AuthActions } from './core/store/auth/auth.actions';
import { ThemeService } from './core/services/theme.service';
import { NotificationService, Notification } from './core/services/notification.service';
import { AuthService } from './core/services/auth.service';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MediQ';
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string | null>;
  isDarkTheme$: Observable<boolean>;
  canGoBack = false;
  currentPage = 'home';
  notifications: Notification[] = [];
  unreadCount = 0;

  private readonly pageNames: Record<string, string> = {
    '/mobile-dashboard':    'home',
    '/appointments':        'Appointments',
    '/medical-records':     'Medical Records',
    '/symptom-checker':     'Symptom Checker',
    '/prescriptions':       'Prescriptions',
    '/lab-results':         'Lab Results',
    '/health-tracking':     'Health Tracking',
    '/telemedicine':        'Telemedicine',
    '/patient-billing':     'Billing',
    '/insurance':           'Insurance',
    '/medical-bills':       'Medical Bills',
    '/patients':            'Patients',
    '/smart-scheduling':    'Scheduling',
    '/voice-notes':         'Voice Notes',
    '/ai-insights':         'AI Insights',
    '/doctor-prescriptions':'Prescriptions',
    '/clinical-notes':      'Clinical Notes',
    '/user-management':     'User Management',
    '/analytics':           'Analytics',
    '/system-settings':     'System Settings',
    '/hospital-management': 'Hospital',
    '/billing':             'Billing',
    '/compliance':          'Compliance',
    '/audit-logs':          'Audit Logs',
    '/profile':             'Profile',
    '/settings':            'Settings',
    '/security':            'Security',
  };

  constructor(
    private store: Store<AppState>,
    private themeService: ThemeService,
    private location: Location,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userRole$ = this.store.select(selectUserRole);
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
    
    // Restore authentication state on app initialization
    const token = this.authService.getToken();
    const user = this.authService.getCurrentUser();
    if (token && user) {
      this.store.dispatch(AuthActions.loginSuccess({ user, token }));
      // Only redirect if not on login page
      if (this.router.url === '/login') {
        this.router.navigate(['/mobile-dashboard']);
      }
    }
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('?')[0];
        this.currentPage = this.pageNames[url] || 'home';
        this.canGoBack = this.currentPage !== 'home';
      }
    });
    
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = notifications.filter(n => !n.read).length;
    });
    
    // Update notifications when user role changes
    this.userRole$.subscribe(role => {
      if (role) {
        this.notificationService.updateNotificationsForRole(role);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  goToHome() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.router.navigate(['/mobile-dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'success': return 'check_circle';
      default: return 'info';
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user?.name || 'User';
  }

  getCurrentUserRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.role || 'user';
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }

  openSecurity() {
    this.router.navigate(['/security']);
  }

  getCurrentUserEmail(): string {
    const user = this.authService.getCurrentUser();
    return user?.email || 'user@mediq.com';
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  trackNotification(index: number, notification: Notification): string {
    return notification.id;
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}
