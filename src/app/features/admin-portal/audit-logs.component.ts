import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatChipsModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <h1>Audit Logs & Security Monitoring</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">24,567</div>
            <div class="metric-label">Total Events Today</div>
            <div class="metric-change positive">+12.3%</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">15</div>
            <div class="metric-label">Security Alerts</div>
            <div class="metric-change negative">+3</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">99.8%</div>
            <div class="metric-label">System Uptime</div>
            <div class="metric-change positive">+0.1%</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">2,847</div>
            <div class="metric-label">Failed Login Attempts</div>
            <div class="metric-change negative">+156</div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="filter-card">
        <mat-card-header>
          <mat-card-title>Audit Log Filters</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="filter-row">
            <mat-form-field appearance="outline">
              <mat-label>Event Type</mat-label>
              <mat-select [(value)]="selectedEventType">
                <mat-option value="all">All Events</mat-option>
                <mat-option value="login">Login/Logout</mat-option>
                <mat-option value="data-access">Data Access</mat-option>
                <mat-option value="system">System Changes</mat-option>
                <mat-option value="security">Security Events</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>User</mat-label>
              <input matInput [(ngModel)]="selectedUser" placeholder="Enter username">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Date Range</mat-label>
              <mat-date-range-input [rangePicker]="picker">
                <input matStartDate placeholder="Start date">
                <input matEndDate placeholder="End date">
              </mat-date-range-input>
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-date-range-picker #picker></mat-date-range-picker>
            </mat-form-field>
            
            <button mat-raised-button color="primary">Apply Filters</button>
            <button mat-button>Export</button>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-tab-group class="audit-tabs">
        <mat-tab label="System Events">
          <mat-card class="overview-card">
            <mat-card-header>
              <mat-card-title>Recent System Events</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="systemEvents">
                <ng-container matColumnDef="timestamp">
                  <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                  <td mat-cell *matCellDef="let event">{{event.timestamp}}</td>
                </ng-container>
                
                <ng-container matColumnDef="user">
                  <th mat-header-cell *matHeaderCellDef>User</th>
                  <td mat-cell *matCellDef="let event">{{event.user}}</td>
                </ng-container>
                
                <ng-container matColumnDef="action">
                  <th mat-header-cell *matHeaderCellDef>Action</th>
                  <td mat-cell *matCellDef="let event">{{event.action}}</td>
                </ng-container>
                
                <ng-container matColumnDef="resource">
                  <th mat-header-cell *matHeaderCellDef>Resource</th>
                  <td mat-cell *matCellDef="let event">{{event.resource}}</td>
                </ng-container>
                
                <ng-container matColumnDef="severity">
                  <th mat-header-cell *matHeaderCellDef>Severity</th>
                  <td mat-cell *matCellDef="let event">
                    <mat-chip [class]="'severity-' + event.severity">{{event.severityText}}</mat-chip>
                  </td>
                </ng-container>
                
                <ng-container matColumnDef="ipAddress">
                  <th mat-header-cell *matHeaderCellDef>IP Address</th>
                  <td mat-cell *matCellDef="let event">{{event.ipAddress}}</td>
                </ng-container>
                
                <tr mat-header-row *matHeaderRowDef="systemColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: systemColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Security Events">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Security Incidents</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="security-events">
                  <div class="security-event" *ngFor="let event of securityEvents">
                    <div class="event-header">
                      <mat-icon [style.color]="event.severityColor">{{event.icon}}</mat-icon>
                      <div class="event-info">
                        <div class="event-title">{{event.title}}</div>
                        <div class="event-description">{{event.description}}</div>
                        <div class="event-details">
                          <span>User: {{event.user}}</span>
                          <span>IP: {{event.ipAddress}}</span>
                          <span>Time: {{event.timestamp}}</span>
                        </div>
                      </div>
                      <mat-chip [class]="'severity-' + event.severity">{{event.severityText}}</mat-chip>
                    </div>
                    <div class="event-actions">
                      <button mat-button>Investigate</button>
                      <button mat-button>Mark Resolved</button>
                      <button mat-button>Block IP</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Failed Login Attempts</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="login-attempts">
                  <div class="attempt-item" *ngFor="let attempt of failedLogins">
                    <div class="attempt-info">
                      <div class="attempt-user">{{attempt.username}}</div>
                      <div class="attempt-details">
                        <span>{{attempt.attempts}} attempts</span>
                        <span>{{attempt.lastAttempt}}</span>
                        <span>{{attempt.ipAddress}}</span>
                      </div>
                    </div>
                    <div class="attempt-status">
                      <mat-chip [class]="'status-' + attempt.status">{{attempt.statusText}}</mat-chip>
                      <button mat-icon-button><mat-icon>block</mat-icon></button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Data Access">
          <mat-card class="overview-card">
            <mat-card-header>
              <mat-card-title>Patient Data Access Log</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="dataAccessEvents">
                <ng-container matColumnDef="timestamp">
                  <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                  <td mat-cell *matCellDef="let access">{{access.timestamp}}</td>
                </ng-container>
                
                <ng-container matColumnDef="user">
                  <th mat-header-cell *matHeaderCellDef>User</th>
                  <td mat-cell *matCellDef="let access">{{access.user}}</td>
                </ng-container>
                
                <ng-container matColumnDef="patient">
                  <th mat-header-cell *matHeaderCellDef>Patient</th>
                  <td mat-cell *matCellDef="let access">{{access.patientId}}</td>
                </ng-container>
                
                <ng-container matColumnDef="dataType">
                  <th mat-header-cell *matHeaderCellDef>Data Type</th>
                  <td mat-cell *matCellDef="let access">{{access.dataType}}</td>
                </ng-container>
                
                <ng-container matColumnDef="action">
                  <th mat-header-cell *matHeaderCellDef>Action</th>
                  <td mat-cell *matCellDef="let access">{{access.action}}</td>
                </ng-container>
                
                <ng-container matColumnDef="purpose">
                  <th mat-header-cell *matHeaderCellDef>Purpose</th>
                  <td mat-cell *matCellDef="let access">{{access.purpose}}</td>
                </ng-container>
                
                <tr mat-header-row *matHeaderRowDef="dataAccessColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: dataAccessColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Compliance Reports">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Compliance Audit Reports</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="reports-list">
                  <div class="report-item" *ngFor="let report of complianceReports">
                    <div class="report-info">
                      <mat-icon>{{report.icon}}</mat-icon>
                      <div>
                        <div class="report-name">{{report.name}}</div>
                        <div class="report-description">{{report.description}}</div>
                        <div class="report-details">
                          <span>Generated: {{report.generated}}</span>
                          <span>Period: {{report.period}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="report-actions">
                      <button mat-raised-button color="primary">Download</button>
                      <button mat-button>View</button>
                      <button mat-button>Schedule</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .audit-tabs { margin-top: 24px; }
    .filter-card { margin-bottom: 24px; }
    .filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
    .metric-change { font-size: 12px; font-weight: 600; }
    .positive { color: #10b981; }
    .negative { color: #ef4444; }
    
    .security-events { display: flex; flex-direction: column; gap: 16px; }
    .security-event { padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .event-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
    .event-info { flex: 1; }
    .event-title { font-weight: 600; margin-bottom: 4px; }
    .event-description { font-size: 14px; margin-bottom: 8px; }
    .event-details { display: flex; gap: 16px; font-size: 12px; color: var(--premium-text-muted); }
    .event-actions { display: flex; gap: 12px; }
    
    .login-attempts { display: flex; flex-direction: column; gap: 12px; }
    .attempt-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .attempt-user { font-weight: 600; margin-bottom: 4px; }
    .attempt-details { display: flex; gap: 12px; font-size: 12px; color: var(--premium-text-muted); }
    .attempt-status { display: flex; align-items: center; gap: 8px; }
    
    .reports-list { display: flex; flex-direction: column; gap: 16px; }
    .report-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .report-info { display: flex; align-items: center; gap: 12px; }
    .report-name { font-weight: 600; margin-bottom: 4px; }
    .report-description { font-size: 14px; margin-bottom: 8px; }
    .report-details { display: flex; gap: 16px; font-size: 12px; color: var(--premium-text-muted); }
    .report-actions { display: flex; gap: 12px; }
    
    .severity-critical { background-color: #fecaca; color: #991b1b; }
    .severity-high { background-color: #fed7aa; color: #9a3412; }
    .severity-medium { background-color: #fef3c7; color: #92400e; }
    .severity-low { background-color: #dcfce7; color: #166534; }
    .severity-info { background-color: #dbeafe; color: #1e40af; }
    
    .status-blocked { background-color: #fecaca; color: #991b1b; }
    .status-monitoring { background-color: #fef3c7; color: #92400e; }
    .status-active { background-color: #dcfce7; color: #166534; }
  `]
})
export class AuditLogsComponent implements OnInit {
  selectedEventType = 'all';
  selectedUser = '';
  
  systemColumns = ['timestamp', 'user', 'action', 'resource', 'severity', 'ipAddress'];
  dataAccessColumns = ['timestamp', 'user', 'patient', 'dataType', 'action', 'purpose'];

  systemEvents = [
    { timestamp: '2024-01-15 14:32:15', user: 'dr.dlamini', action: 'Patient Record Access', resource: 'Patient #12345', severity: 'info', severityText: 'Info', ipAddress: '192.168.1.45' },
    { timestamp: '2024-01-15 14:28:42', user: 'admin.user', action: 'System Configuration Change', resource: 'User Permissions', severity: 'medium', severityText: 'Medium', ipAddress: '192.168.1.10' },
    { timestamp: '2024-01-15 14:25:18', user: 'nurse.johnson', action: 'Medication Administration', resource: 'Patient #67890', severity: 'info', severityText: 'Info', ipAddress: '192.168.1.78' },
    { timestamp: '2024-01-15 14:22:03', user: 'unknown', action: 'Failed Login Attempt', resource: 'Login System', severity: 'high', severityText: 'High', ipAddress: '203.45.67.89' },
    { timestamp: '2024-01-15 14:18:55', user: 'tech.support', action: 'Database Backup', resource: 'Main Database', severity: 'info', severityText: 'Info', ipAddress: '192.168.1.5' }
  ];

  securityEvents = [
    {
      title: 'Multiple Failed Login Attempts',
      description: 'User attempted to login 15 times with incorrect credentials',
      user: 'unknown_user',
      ipAddress: '203.45.67.89',
      timestamp: '2024-01-15 14:22:03',
      severity: 'high',
      severityText: 'High Risk',
      severityColor: '#ef4444',
      icon: 'warning'
    },
    {
      title: 'Unusual Data Access Pattern',
      description: 'User accessed 50+ patient records in 10 minutes',
      user: 'dr.dlamini',
      ipAddress: '192.168.1.67',
      timestamp: '2024-01-15 13:45:22',
      severity: 'medium',
      severityText: 'Medium Risk',
      severityColor: '#f59e0b',
      icon: 'visibility'
    },
    {
      title: 'Privileged Account Usage',
      description: 'Admin account used outside normal business hours',
      user: 'admin.user',
      ipAddress: '192.168.1.10',
      timestamp: '2024-01-15 02:15:33',
      severity: 'medium',
      severityText: 'Medium Risk',
      severityColor: '#f59e0b',
      icon: 'admin_panel_settings'
    }
  ];

  failedLogins = [
    { username: 'dr.johnson', attempts: 5, lastAttempt: '2024-01-15 14:30:15', ipAddress: '192.168.1.89', status: 'monitoring', statusText: 'Monitoring' },
    { username: 'admin', attempts: 12, lastAttempt: '2024-01-15 14:22:03', ipAddress: '203.45.67.89', status: 'blocked', statusText: 'Blocked' },
    { username: 'nurse.davis', attempts: 3, lastAttempt: '2024-01-15 13:55:42', ipAddress: '192.168.1.92', status: 'active', statusText: 'Active' },
    { username: 'tech.admin', attempts: 8, lastAttempt: '2024-01-15 12:18:27', ipAddress: '10.0.0.45', status: 'monitoring', statusText: 'Monitoring' }
  ];

  dataAccessEvents = [
    { timestamp: '2024-01-15 14:32:15', user: 'Dr. Nkosi Dlamini', patientId: 'PT-12345', dataType: 'Medical Records', action: 'View', purpose: 'Treatment Review' },
    { timestamp: '2024-01-15 14:28:42', user: 'Nurse Johnson', patientId: 'PT-67890', dataType: 'Vital Signs', action: 'Update', purpose: 'Routine Care' },
    { timestamp: '2024-01-15 14:25:18', user: 'Dr. Nkosi Dlamini', patientId: 'PT-11111', dataType: 'Lab Results', action: 'View', purpose: 'Diagnosis' },
    { timestamp: '2024-01-15 14:22:03', user: 'Admin User', patientId: 'PT-22222', dataType: 'Billing Info', action: 'Export', purpose: 'Insurance Claim' },
    { timestamp: '2024-01-15 14:18:55', user: 'Pharmacist Lee', patientId: 'PT-33333', dataType: 'Prescriptions', action: 'Modify', purpose: 'Medication Review' }
  ];

  complianceReports = [
    {
      name: 'HIPAA Compliance Report',
      description: 'Monthly HIPAA compliance assessment and violations summary',
      generated: '2024-01-15',
      period: 'December 2023',
      icon: 'assessment'
    },
    {
      name: 'Data Access Audit',
      description: 'Comprehensive audit of all patient data access activities',
      generated: '2024-01-14',
      period: 'Q4 2023',
      icon: 'folder_shared'
    },
    {
      name: 'Security Incident Report',
      description: 'Summary of security incidents and response actions',
      generated: '2024-01-13',
      period: 'December 2023',
      icon: 'security'
    },
    {
      name: 'User Activity Report',
      description: 'Detailed analysis of user login patterns and system usage',
      generated: '2024-01-12',
      period: 'December 2023',
      icon: 'people'
    }
  ];

  ngOnInit() {}
}