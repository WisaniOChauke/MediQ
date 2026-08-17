import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatChipsModule, FormsModule],
  template: `
    <div class="security-container">
      <h1>Security Settings</h1>
      
      <div class="security-grid">
        <mat-card class="security-card">
          <mat-card-header>
            <mat-card-title>Account Security</mat-card-title>
            <mat-card-subtitle>{{userProfile.name}} - {{userProfile.department}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="security-item">
              <div class="security-info">
                <mat-icon>lock</mat-icon>
                <div>
                  <div class="security-title">Password</div>
                  <div class="security-desc">Last changed 45 days ago</div>
                </div>
              </div>
              <button mat-raised-button color="primary">Change Password</button>
            </div>
            
            <div class="security-item">
              <div class="security-info">
                <mat-icon>security</mat-icon>
                <div>
                  <div class="security-title">Two-Factor Authentication</div>
                  <div class="security-desc">{{twoFactorEnabled ? 'Enabled' : 'Disabled'}} - {{twoFactorMethod}}</div>
                </div>
              </div>
              <mat-slide-toggle [(ngModel)]="twoFactorEnabled"></mat-slide-toggle>
            </div>
            
            <div class="security-item">
              <div class="security-info">
                <mat-icon>fingerprint</mat-icon>
                <div>
                  <div class="security-title">Biometric Login</div>
                  <div class="security-desc">{{biometricEnabled ? 'Enabled' : 'Disabled'}} for this device</div>
                </div>
              </div>
              <mat-slide-toggle [(ngModel)]="biometricEnabled"></mat-slide-toggle>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="security-card">
          <mat-card-header>
            <mat-card-title>Active Sessions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="session-list">
              <div class="session-item" *ngFor="let session of activeSessions">
                <div class="session-info">
                  <mat-icon>{{session.icon}}</mat-icon>
                  <div>
                    <div class="session-device">{{session.device}}</div>
                    <div class="session-location">{{session.location}}</div>
                    <div class="session-time">{{session.lastActive}}</div>
                  </div>
                </div>
                <button mat-button color="warn" *ngIf="!session.current">End Session</button>
                <mat-chip *ngIf="session.current" color="primary">Current</mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="security-card">
          <mat-card-header>
            <mat-card-title>{{userRole === 'doctor' ? 'Medical License & Compliance' : userRole === 'admin' ? 'System Access & Permissions' : 'Privacy & Data Protection'}}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="compliance-list" *ngIf="userRole === 'doctor'">
              <div class="compliance-item">
                <mat-icon>verified</mat-icon>
                <div>
                  <div class="compliance-title">Medical License</div>
                  <div class="compliance-desc">MD-12345 - Expires Dec 2025</div>
                </div>
                <mat-chip color="primary">Valid</mat-chip>
              </div>
              <div class="compliance-item">
                <mat-icon>school</mat-icon>
                <div>
                  <div class="compliance-title">Board Certification</div>
                  <div class="compliance-desc">Internal Medicine & Cardiology</div>
                </div>
                <mat-chip color="primary">Current</mat-chip>
              </div>
              <div class="compliance-item">
                <mat-icon>health_and_safety</mat-icon>
                <div>
                  <div class="compliance-title">HIPAA Training</div>
                  <div class="compliance-desc">Completed Jan 2024</div>
                </div>
                <mat-chip color="primary">Up to Date</mat-chip>
              </div>
            </div>

            <div class="admin-permissions" *ngIf="userRole === 'admin'">
              <div class="permission-item">
                <mat-icon>admin_panel_settings</mat-icon>
                <div>
                  <div class="permission-title">System Administration</div>
                  <div class="permission-desc">Full system access and configuration</div>
                </div>
                <mat-chip color="primary">Granted</mat-chip>
              </div>
              <div class="permission-item">
                <mat-icon>storage</mat-icon>
                <div>
                  <div class="permission-title">Database Management</div>
                  <div class="permission-desc">Read/Write access to all databases</div>
                </div>
                <mat-chip color="primary">Granted</mat-chip>
              </div>
              <div class="permission-item">
                <mat-icon>security</mat-icon>
                <div>
                  <div class="permission-title">Security Oversight</div>
                  <div class="permission-desc">Monitor and manage security protocols</div>
                </div>
                <mat-chip color="primary">Granted</mat-chip>
              </div>
            </div>

            <div class="privacy-settings" *ngIf="userRole === 'patient'">
              <div class="privacy-item">
                <div class="privacy-info">
                  <mat-icon>visibility</mat-icon>
                  <div>
                    <div class="privacy-title">Data Sharing</div>
                    <div class="privacy-desc">Share data with healthcare providers</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
              <div class="privacy-item">
                <div class="privacy-info">
                  <mat-icon>notifications</mat-icon>
                  <div>
                    <div class="privacy-title">Marketing Communications</div>
                    <div class="privacy-desc">Receive health tips and updates</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="false"></mat-slide-toggle>
              </div>
              <div class="privacy-item">
                <div class="privacy-info">
                  <mat-icon>analytics</mat-icon>
                  <div>
                    <div class="privacy-title">Anonymous Analytics</div>
                    <div class="privacy-desc">Help improve MediQ services</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .security-container { padding: 24px; }
    .security-grid { display: grid; gap: 24px; margin-top: 24px; }
    .security-item, .session-item, .compliance-item, .permission-item, .privacy-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid var(--premium-border);
    }
    .security-info, .session-info, .privacy-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    .security-title, .session-device, .compliance-title, .permission-title, .privacy-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .security-desc, .session-location, .session-time, .compliance-desc, .permission-desc, .privacy-desc {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    .session-list, .compliance-list, .admin-permissions, .privacy-settings {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class SecurityComponent implements OnInit {
  userProfile: any = {};
  userRole: string = '';
  twoFactorEnabled = true;
  twoFactorMethod = 'SMS to +1 (555) ***-4567';
  biometricEnabled = false;

  activeSessions = [
    {
      device: 'Windows PC - Chrome',
      location: 'New York, NY',
      lastActive: 'Active now',
      current: true,
      icon: 'computer'
    },
    {
      device: 'iPhone 15 Pro - Safari',
      location: 'New York, NY',
      lastActive: '2 hours ago',
      current: false,
      icon: 'phone_iphone'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    this.userRole = currentUser?.role || 'patient';
    
    const profileData = {
      'patient': {
        name: 'Mathew Boobies',
        department: 'Patient Services'
      },
      'doctor': {
        name: 'Dr. Nkosi Dlamini',
        department: 'Internal Medicine & Cardiology'
      },
      'admin': {
        name: 'N. Shimambani, MSc',
        department: 'Technology & Innovation'
      }
    };

    this.userProfile = profileData[this.userRole as keyof typeof profileData] || profileData['patient'];
  }
}