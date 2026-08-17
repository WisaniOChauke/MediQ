import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-telemedicine',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="dashboard-container">
      <h1>Telemedicine</h1>
      
      <!-- Doctor View -->
      <div *ngIf="userRole === 'doctor'" class="dashboard-grid">
        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Scheduled Video Consultations</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="appointment-list">
              <div class="appointment-item" *ngFor="let appointment of doctorAppointments">
                <div class="appointment-header">
                  <div class="patient-info">
                    <mat-icon>person</mat-icon>
                    <div>
                      <div class="patient-name">{{appointment.patient}}</div>
                      <div class="reason">{{appointment.reason}}</div>
                    </div>
                  </div>
                  <mat-chip [class]="'status-' + appointment.status">{{appointment.status}}</mat-chip>
                </div>
                <div class="appointment-details">
                  <div class="detail-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{appointment.date}} at {{appointment.time}}</span>
                  </div>
                  <div class="detail-item">
                    <mat-icon>timer</mat-icon>
                    <span>{{appointment.duration}} minutes</span>
                  </div>
                </div>
                <div class="appointment-actions">
                  <button mat-raised-button color="primary" *ngIf="appointment.status === 'confirmed'">Start Call</button>
                  <button mat-button>View Notes</button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Patient View -->
      <div *ngIf="userRole === 'patient'" class="dashboard-grid">
        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Upcoming Virtual Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="appointment-list">
              <div class="appointment-item" *ngFor="let appointment of patientAppointments">
                <div class="appointment-header">
                  <div class="doctor-info">
                    <mat-icon>video_call</mat-icon>
                    <div>
                      <div class="doctor-name">Dr. {{appointment.doctor}}</div>
                      <div class="specialty">{{appointment.specialty}}</div>
                    </div>
                  </div>
                  <mat-chip [class]="'status-' + appointment.status">{{appointment.status}}</mat-chip>
                </div>
                <div class="appointment-details">
                  <div class="detail-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{appointment.date}} at {{appointment.time}}</span>
                  </div>
                  <div class="detail-item">
                    <mat-icon>timer</mat-icon>
                    <span>{{appointment.duration}} minutes</span>
                  </div>
                </div>
                <div class="appointment-actions">
                  <button mat-raised-button color="primary" *ngIf="appointment.status === 'confirmed'">Join Call</button>
                  <button mat-button>Reschedule</button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .appointment-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .appointment-item {
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
      background: var(--premium-card);
    }
    .appointment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .doctor-info, .patient-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .doctor-name, .patient-name {
      font-weight: 600;
      color: var(--premium-text);
    }
    .reason {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    .specialty {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    .appointment-details {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;
    }
    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--premium-text-muted);
    }
    .appointment-actions {
      display: flex;
      gap: 12px;
    }
    .quick-consult-options {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }
  `]
})
export class TelemedicineComponent implements OnInit {
  userRole: string = '';
  
  doctorAppointments = [
    {
      patient: 'Mathew Boobies',
      reason: 'Cardiology Follow-up',
      date: 'Today',
      time: '2:00 PM',
      duration: 30,
      status: 'confirmed'
    },
    {
      patient: 'Mathew Boobies',
      reason: 'Hypertension Check',
      date: 'Today',
      time: '3:30 PM',
      duration: 20,
      status: 'confirmed'
    }
  ];

  patientAppointments = [
    {
      doctor: 'Dr. Dlamini',
      specialty: 'Internal Medicine & Cardiology',
      date: 'Today',
      time: '2:00 PM',
      duration: 30,
      status: 'confirmed'
    },
    {
      doctor: 'Dr. Dlamini',
      specialty: 'Cardiology Consultation',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: 45,
      status: 'pending'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userRole = user?.role || 'patient';
  }
}