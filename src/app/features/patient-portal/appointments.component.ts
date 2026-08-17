import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule],
  template: `
    <div class="appointments-container">
      <h1>My Appointments</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>Upcoming Appointments</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="appointments" class="appointments-table">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.date}}</td>
            </ng-container>
            
            <ng-container matColumnDef="time">
              <th mat-header-cell *matHeaderCellDef>Time</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.time}}</td>
            </ng-container>
            
            <ng-container matColumnDef="doctor">
              <th mat-header-cell *matHeaderCellDef>Doctor</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.doctor}}</td>
            </ng-container>
            
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.type}}</td>
            </ng-container>
            
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let appointment">
                <span [class]="'status-' + appointment.status.toLowerCase()">{{appointment.status}}</span>
              </td>
            </ng-container>
            
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .appointments-container {
      padding: 24px;
    }
    .appointments-table {
      width: 100%;
    }
    .status-confirmed {
      color: #4caf50;
      font-weight: 500;
    }
    .status-pending {
      color: #ff9800;
      font-weight: 500;
    }
  `]
})
export class AppointmentsComponent implements OnInit {
  displayedColumns = ['date', 'time', 'doctor', 'type', 'status'];
  appointments: any[] = [];
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadAppointments();
  }

  private loadAppointments() {
    // Mock appointments based on user
    const mockAppointments = {
      'p001': [
        { date: '2024-01-15', time: '10:00 AM', doctor: 'Dr. Nkosi Dlamini', type: 'Annual Checkup', status: 'Confirmed' },
        { date: '2024-01-20', time: '2:30 PM', doctor: 'Dr. Nkosi Dlamini', type: 'Cardiology Follow-up', status: 'Pending' },
        { date: '2024-01-25', time: '9:15 AM', doctor: 'Dr. Nkosi Dlamini', type: 'Lab Results Review', status: 'Confirmed' }
      ]
    };
    
    this.appointments = mockAppointments[this.currentUser?.id as keyof typeof mockAppointments] || [];
  }
}