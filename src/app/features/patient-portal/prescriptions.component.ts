import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatTableModule],
  template: `
    <div class="dashboard-container">
      <h1>My Prescriptions</h1>
      
      <div class="dashboard-grid">
        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Active Prescriptions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="prescription-list">
              <div class="prescription-item" *ngFor="let prescription of prescriptions">
                <div class="prescription-header">
                  <div class="medication-info">
                    <div class="medication-name">{{prescription.medication}}</div>
                    <div class="indication">{{prescription.indication}}</div>
                  </div>
                  <mat-chip [class]="'status-' + prescription.status">{{prescription.status}}</mat-chip>
                </div>
                <div class="prescription-details">
                  <div class="detail-row">
                    <div class="detail-item">
                      <mat-icon>medication</mat-icon>
                      <span>{{prescription.dosage}}</span>
                    </div>
                    <div class="detail-item">
                      <mat-icon>schedule</mat-icon>
                      <span>{{prescription.frequency}}</span>
                    </div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-item">
                      <mat-icon>person</mat-icon>
                      <span>Dr. {{prescription.prescribedBy}}</span>
                    </div>
                    <div class="detail-item">
                      <mat-icon>refresh</mat-icon>
                      <span>{{prescription.refillsLeft}} refills left</span>
                    </div>
                  </div>
                  <div class="instructions">
                    <mat-icon>info</mat-icon>
                    <span>{{prescription.instructions}}</span>
                  </div>
                  <div class="side-effects">
                    <mat-icon>warning</mat-icon>
                    <span>Possible side effects: {{prescription.sideEffects}}</span>
                  </div>
                </div>
                <div class="prescription-actions">
                  <button mat-raised-button color="primary" [disabled]="prescription.refillsLeft === 0" (click)="refillPrescription(prescription)">Refill Now</button>
                  <button mat-button (click)="setReminder(prescription)">Set Reminder</button>
                  <button mat-button (click)="contactPharmacy(prescription)">Contact Pharmacy</button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .prescription-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .prescription-item {
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
      background: var(--premium-card);
    }
    .prescription-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .medication-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--premium-text);
    }
    .indication {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    .prescription-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }
    .detail-row {
      display: flex;
      gap: 24px;
    }
    .instructions, .side-effects {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      color: var(--premium-text-muted);
      font-size: 14px;
      margin-top: 8px;
    }
    .instructions mat-icon, .side-effects mat-icon {
      margin-top: 2px;
    }
    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--premium-text-muted);
    }
    .prescription-actions {
      display: flex;
      gap: 12px;
    }
  `]
})
export class PrescriptionsComponent implements OnInit {
  prescriptions = [
    {
      medication: 'Lisinopril 10mg',
      dosage: '10mg tablets',
      frequency: 'Once daily with breakfast',
      prescribedBy: 'Dlamini',
      status: 'active',
      refillsLeft: 2,
      nextRefill: '2024-02-15',
      indication: 'Hypertension Management',
      sideEffects: 'Dry cough, dizziness',
      instructions: 'Take with food. Monitor blood pressure weekly.'
    },
    {
      medication: 'Metformin 500mg',
      dosage: '500mg tablets',
      frequency: 'Twice daily with meals',
      prescribedBy: 'Dlamini',
      status: 'active',
      refillsLeft: 1,
      nextRefill: '2024-02-10',
      indication: 'Type 2 Diabetes Control',
      sideEffects: 'Nausea, stomach upset',
      instructions: 'Take with meals to reduce GI upset. Regular glucose monitoring required.'
    },
    {
      medication: 'Atorvastatin 20mg',
      dosage: '20mg tablets',
      frequency: 'Once daily at bedtime',
      prescribedBy: 'Dlamini',
      status: 'active',
      refillsLeft: 3,
      nextRefill: '2024-03-01',
      indication: 'Cholesterol Management',
      sideEffects: 'Muscle pain, liver enzyme elevation',
      instructions: 'Take at bedtime. Avoid grapefruit juice. Liver function tests every 6 months.'
    },
    {
      medication: 'Aspirin 81mg',
      dosage: '81mg tablets',
      frequency: 'Once daily',
      prescribedBy: 'Dlamini',
      status: 'active',
      refillsLeft: 5,
      nextRefill: '2024-04-15',
      indication: 'Cardiovascular Protection',
      sideEffects: 'Stomach irritation, bleeding risk',
      instructions: 'Take with food. Watch for signs of bleeding. Inform all healthcare providers.'
    }
  ];

  ngOnInit() {}

  refillPrescription(prescription: any) {
    alert(`Refill request submitted for ${prescription.medication}. Your pharmacy will be contacted within 24 hours. Estimated pickup: ${prescription.nextRefill}`);
  }

  setReminder(prescription: any) {
    alert(`Reminder set for ${prescription.medication}. You'll receive notifications for:\n• Daily medication time\n• Refill needed (3 days before)\n• Pharmacy pickup ready`);
  }

  contactPharmacy(prescription: any) {
    alert(`Contacting MediQ Partner Pharmacy:\n\nCVS Pharmacy - Main Street\nPhone: (555) 123-4567\nAddress: 123 Main St, City\n\nRegarding: ${prescription.medication}\nPrescribed by: Dr. ${prescription.prescribedBy}`);
  }
}