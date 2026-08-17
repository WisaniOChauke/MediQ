import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatSelectModule, MatFormFieldModule, FormsModule],
  template: `
    <div class="settings-container">
      <h1>Settings</h1>
      
      <div class="settings-grid">
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>General Preferences</mat-card-title>
            <mat-card-subtitle>{{userProfile.name}} - {{userProfile.department}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="setting-item">
              <div class="setting-info">
                <mat-icon>dark_mode</mat-icon>
                <div>
                  <div class="setting-title">Dark Mode</div>
                  <div class="setting-desc">Use dark theme for better visibility</div>
                </div>
              </div>
              <mat-slide-toggle [checked]="darkMode"></mat-slide-toggle>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <mat-icon>language</mat-icon>
                <div>
                  <div class="setting-title">Language</div>
                  <div class="setting-desc">Choose your preferred language</div>
                </div>
              </div>
              <mat-form-field appearance="outline">
                <mat-select value="en">
                  <mat-option value="en">English</mat-option>
                  <mat-option value="es">Spanish</mat-option>
                  <mat-option value="fr">French</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <mat-icon>schedule</mat-icon>
                <div>
                  <div class="setting-title">Time Zone</div>
                  <div class="setting-desc">{{timeZone}}</div>
                </div>
              </div>
              <mat-form-field appearance="outline">
                <mat-select value="EST">
                  <mat-option value="EST">Eastern Time (EST)</mat-option>
                  <mat-option value="CST">Central Time (CST)</mat-option>
                  <mat-option value="PST">Pacific Time (PST)</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Notification Preferences</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="notification-settings">
              <div class="setting-item" *ngFor="let notification of notificationSettings">
                <div class="setting-info">
                  <mat-icon>{{notification.icon}}</mat-icon>
                  <div>
                    <div class="setting-title">{{notification.title}}</div>
                    <div class="setting-desc">{{notification.description}}</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="notification.enabled"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>{{getRoleSpecificTitle()}}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <!-- Doctor Settings -->
            <div class="doctor-settings" *ngIf="userRole === 'doctor'">
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>schedule</mat-icon>
                  <div>
                    <div class="setting-title">Default Appointment Duration</div>
                    <div class="setting-desc">Standard consultation time</div>
                  </div>
                </div>
                <mat-form-field appearance="outline">
                  <mat-select value="30">
                    <mat-option value="15">15 minutes</mat-option>
                    <mat-option value="30">30 minutes</mat-option>
                    <mat-option value="45">45 minutes</mat-option>
                    <mat-option value="60">60 minutes</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>auto_awesome</mat-icon>
                  <div>
                    <div class="setting-title">AI Clinical Assistance</div>
                    <div class="setting-desc">Enable AI-powered diagnostic suggestions</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>mic</mat-icon>
                  <div>
                    <div class="setting-title">Voice Notes</div>
                    <div class="setting-desc">Auto-transcribe voice recordings</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
            </div>

            <!-- Admin Settings -->
            <div class="admin-settings" *ngIf="userRole === 'admin'">
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>security</mat-icon>
                  <div>
                    <div class="setting-title">System Monitoring</div>
                    <div class="setting-desc">Real-time system health alerts</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>backup</mat-icon>
                  <div>
                    <div class="setting-title">Auto Backup Notifications</div>
                    <div class="setting-desc">Daily backup status reports</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>analytics</mat-icon>
                  <div>
                    <div class="setting-title">Performance Analytics</div>
                    <div class="setting-desc">Weekly system performance reports</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="false"></mat-slide-toggle>
              </div>
            </div>

            <!-- Patient Settings -->
            <div class="patient-settings" *ngIf="userRole === 'patient'">
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>medication</mat-icon>
                  <div>
                    <div class="setting-title">Medication Reminders</div>
                    <div class="setting-desc">Daily medication notifications</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>event</mat-icon>
                  <div>
                    <div class="setting-title">Appointment Reminders</div>
                    <div class="setting-desc">24-hour appointment notifications</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
              
              <div class="setting-item">
                <div class="setting-info">
                  <mat-icon>health_and_safety</mat-icon>
                  <div>
                    <div class="setting-title">Health Insights</div>
                    <div class="setting-desc">Personalized health recommendations</div>
                  </div>
                </div>
                <mat-slide-toggle [checked]="true"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Data & Storage</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="storage-info">
              <div class="storage-item">
                <mat-icon>storage</mat-icon>
                <div>
                  <div class="storage-title">Storage Used</div>
                  <div class="storage-desc">{{getStorageUsed()}} of 50 GB</div>
                  <div class="storage-bar">
                    <div class="storage-fill" [style.width.%]="getStoragePercentage()"></div>
                  </div>
                </div>
              </div>
              
              <div class="data-actions">
                <button mat-raised-button color="primary">Export Data</button>
                <button mat-button>Clear Cache</button>
                <button mat-button color="warn">Delete Account</button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .settings-container { padding: 24px; }
    .settings-grid { display: grid; gap: 24px; margin-top: 24px; }
    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid var(--premium-border);
    }
    .setting-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    .setting-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .setting-desc {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    .storage-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .storage-bar {
      width: 200px;
      height: 8px;
      background: var(--premium-border);
      border-radius: 4px;
      overflow: hidden;
      margin-top: 4px;
    }
    .storage-fill {
      height: 100%;
      background: var(--premium-accent);
    }
    .data-actions {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }
  `]
})
export class SettingsComponent implements OnInit {
  userProfile: any = {};
  userRole: string = '';
  darkMode = false;
  timeZone = 'Eastern Time (EST)';

  notificationSettings = [
    {
      title: 'Email Notifications',
      description: 'Receive updates via email',
      enabled: true,
      icon: 'email'
    },
    {
      title: 'SMS Notifications',
      description: 'Receive text message alerts',
      enabled: true,
      icon: 'sms'
    },
    {
      title: 'Push Notifications',
      description: 'Browser and mobile notifications',
      enabled: false,
      icon: 'notifications'
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

  getRoleSpecificTitle(): string {
    switch (this.userRole) {
      case 'doctor': return 'Clinical Preferences';
      case 'admin': return 'System Administration';
      default: return 'Health Preferences';
    }
  }

  getStorageUsed(): string {
    switch (this.userRole) {
      case 'doctor': return '12.4 GB';
      case 'admin': return '8.7 GB';
      default: return '2.1 GB';
    }
  }

  getStoragePercentage(): number {
    switch (this.userRole) {
      case 'doctor': return 24.8;
      case 'admin': return 17.4;
      default: return 4.2;
    }
  }
}