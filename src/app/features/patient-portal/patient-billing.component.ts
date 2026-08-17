import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-patient-billing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatTabsModule, MatTableModule],
  template: `
    <div class="dashboard-container">
      <h1>My Billing & Payments</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">$1,245</div>
            <div class="metric-label">Outstanding Balance</div>
            <div class="metric-change negative">Due Soon</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">$3,890</div>
            <div class="metric-label">YTD Medical Expenses</div>
            <div class="metric-change positive">Insurance Covered: 85%</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">$2,100</div>
            <div class="metric-label">Deductible Remaining</div>
            <div class="metric-change stable">Out of $3,000</div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group class="billing-tabs">
        <mat-tab label="Current Bills">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Outstanding Bills</mat-card-title>
                <button mat-raised-button color="primary">Pay All Bills</button>
              </mat-card-header>
              <mat-card-content>
                <div class="bills-list">
                  <div class="bill-item" *ngFor="let bill of currentBills">
                    <div class="bill-header">
                      <div class="bill-info">
                        <div class="bill-service">{{bill.service}}</div>
                        <div class="bill-date">{{bill.date}}</div>
                        <div class="bill-provider">{{bill.provider}}</div>
                      </div>
                      <div class="bill-amount">
                        <span class="amount">{{bill.amount | currency}}</span>
                        <mat-chip [class]="'status-' + bill.status">{{bill.statusText}}</mat-chip>
                      </div>
                    </div>
                    <div class="bill-details">
                      <div class="detail-row">
                        <span>Insurance Covered:</span>
                        <span>{{bill.insuranceCovered | currency}}</span>
                      </div>
                      <div class="detail-row">
                        <span>Your Responsibility:</span>
                        <span class="patient-amount">{{bill.patientAmount | currency}}</span>
                      </div>
                      <div class="detail-row">
                        <span>Due Date:</span>
                        <span [class]="bill.isOverdue ? 'overdue' : ''">{{bill.dueDate}}</span>
                      </div>
                    </div>
                    <div class="bill-actions">
                      <button mat-raised-button color="primary">Pay Now</button>
                      <button mat-button>View Details</button>
                      <button mat-button>Set Up Payment Plan</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Payment History">
          <mat-card class="overview-card">
            <mat-card-header>
              <mat-card-title>Payment History</mat-card-title>
              <button mat-button>Download Statement</button>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="paymentHistory">
                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef>Date</th>
                  <td mat-cell *matCellDef="let payment">{{payment.date}}</td>
                </ng-container>
                
                <ng-container matColumnDef="service">
                  <th mat-header-cell *matHeaderCellDef>Service</th>
                  <td mat-cell *matCellDef="let payment">{{payment.service}}</td>
                </ng-container>
                
                <ng-container matColumnDef="amount">
                  <th mat-header-cell *matHeaderCellDef>Amount Paid</th>
                  <td mat-cell *matCellDef="let payment">{{payment.amount | currency}}</td>
                </ng-container>
                
                <ng-container matColumnDef="method">
                  <th mat-header-cell *matHeaderCellDef>Payment Method</th>
                  <td mat-cell *matCellDef="let payment">{{payment.method}}</td>
                </ng-container>
                
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let payment">
                    <mat-chip [class]="'status-' + payment.status">{{payment.statusText}}</mat-chip>
                  </td>
                </ng-container>
                
                <tr mat-header-row *matHeaderRowDef="paymentColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: paymentColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Insurance Claims">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Insurance Claims Status</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="claims-list">
                  <div class="claim-item" *ngFor="let claim of insuranceClaims">
                    <div class="claim-header">
                      <div class="claim-info">
                        <div class="claim-number">Claim #{{claim.claimNumber}}</div>
                        <div class="claim-service">{{claim.service}}</div>
                        <div class="claim-date">Service Date: {{claim.serviceDate}}</div>
                      </div>
                      <mat-chip [class]="'status-' + claim.status">{{claim.statusText}}</mat-chip>
                    </div>
                    <div class="claim-details">
                      <div class="detail-row">
                        <span>Total Billed:</span>
                        <span>{{claim.totalBilled | currency}}</span>
                      </div>
                      <div class="detail-row">
                        <span>Insurance Approved:</span>
                        <span>{{claim.insuranceApproved | currency}}</span>
                      </div>
                      <div class="detail-row">
                        <span>Your Responsibility:</span>
                        <span class="patient-amount">{{claim.patientResponsibility | currency}}</span>
                      </div>
                    </div>
                    <div class="claim-actions">
                      <button mat-button>View EOB</button>
                      <button mat-button *ngIf="claim.status === 'denied'">Appeal Claim</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Payment Methods">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Saved Payment Methods</mat-card-title>
                <button mat-raised-button color="primary">Add Payment Method</button>
              </mat-card-header>
              <mat-card-content>
                <div class="payment-methods">
                  <div class="payment-method" *ngFor="let method of paymentMethods">
                    <div class="method-info">
                      <mat-icon>{{method.icon}}</mat-icon>
                      <div>
                        <div class="method-name">{{method.name}}</div>
                        <div class="method-details">{{method.details}}</div>
                      </div>
                    </div>
                    <div class="method-actions">
                      <mat-chip [class]="'status-' + method.status">{{method.statusText}}</mat-chip>
                      <button mat-icon-button><mat-icon>edit</mat-icon></button>
                      <button mat-icon-button><mat-icon>delete</mat-icon></button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Payment Plans</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="payment-plans">
                  <div class="plan-item" *ngFor="let plan of paymentPlans">
                    <div class="plan-info">
                      <div class="plan-name">{{plan.name}}</div>
                      <div class="plan-details">{{plan.details}}</div>
                    </div>
                    <div class="plan-amount">
                      <span class="monthly">{{plan.monthlyAmount | currency}}/month</span>
                      <span class="remaining">{{plan.remainingPayments}} payments left</span>
                    </div>
                    <div class="plan-actions">
                      <button mat-button>View Schedule</button>
                      <button mat-button>Make Payment</button>
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
    .billing-tabs { margin-top: 24px; }
    .metric-change { font-size: 12px; font-weight: 600; }
    .positive { color: #10b981; }
    .negative { color: #ef4444; }
    .stable { color: #6b7280; }
    
    .bills-list, .claims-list { display: flex; flex-direction: column; gap: 16px; }
    .bill-item, .claim-item { padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .bill-header, .claim-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .bill-info, .claim-info { flex: 1; }
    .bill-service, .claim-service { font-weight: 600; margin-bottom: 4px; }
    .bill-date, .claim-date { font-size: 12px; color: var(--premium-text-muted); margin-bottom: 4px; }
    .bill-provider { font-size: 14px; color: var(--premium-text-muted); }
    .bill-amount { text-align: right; }
    .amount { font-size: 18px; font-weight: 700; color: var(--premium-accent); display: block; margin-bottom: 8px; }
    
    .bill-details, .claim-details { margin-bottom: 16px; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 14px; }
    .patient-amount { font-weight: 600; color: var(--premium-accent); }
    .overdue { color: #ef4444; font-weight: 600; }
    
    .bill-actions, .claim-actions { display: flex; gap: 12px; }
    
    .payment-methods, .payment-plans { display: flex; flex-direction: column; gap: 16px; }
    .payment-method, .plan-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .method-info, .plan-info { display: flex; align-items: center; gap: 12px; flex: 1; }
    .method-name, .plan-name { font-weight: 600; margin-bottom: 4px; }
    .method-details, .plan-details { font-size: 12px; color: var(--premium-text-muted); }
    .method-actions { display: flex; align-items: center; gap: 8px; }
    
    .plan-amount { text-align: right; margin-right: 16px; }
    .monthly { font-size: 18px; font-weight: 700; color: var(--premium-accent); display: block; }
    .remaining { font-size: 12px; color: var(--premium-text-muted); }
    .plan-actions { display: flex; gap: 8px; }
  `]
})
export class PatientBillingComponent implements OnInit {
  paymentColumns = ['date', 'service', 'amount', 'method', 'status'];

  currentBills = [
    {
      service: 'Annual Physical Exam',
      date: '2024-01-10',
      provider: 'Dr. Nkosi Dlamini',
      amount: 450,
      insuranceCovered: 360,
      patientAmount: 90,
      dueDate: '2024-02-10',
      status: 'pending',
      statusText: 'Pending',
      isOverdue: false
    },
    {
      service: 'Blood Work & Lab Tests',
      date: '2024-01-08',
      provider: 'MediQ Lab Services',
      amount: 280,
      insuranceCovered: 224,
      patientAmount: 56,
      dueDate: '2024-02-08',
      status: 'pending',
      statusText: 'Pending',
      isOverdue: false
    },
    {
      service: 'Cardiology Consultation',
      date: '2023-12-15',
      provider: 'Dr. Nkosi Dlamini',
      amount: 650,
      insuranceCovered: 520,
      patientAmount: 130,
      dueDate: '2024-01-15',
      status: 'overdue',
      statusText: 'Overdue',
      isOverdue: true
    }
  ];

  paymentHistory = [
    { date: '2024-01-05', service: 'Prescription Copay', amount: 25, method: 'Credit Card ****1234', status: 'completed', statusText: 'Completed' },
    { date: '2023-12-20', service: 'Emergency Room Visit', amount: 150, method: 'Bank Transfer', status: 'completed', statusText: 'Completed' },
    { date: '2023-12-10', service: 'Specialist Consultation', amount: 75, method: 'Credit Card ****1234', status: 'completed', statusText: 'Completed' },
    { date: '2023-11-28', service: 'Routine Checkup', amount: 45, method: 'HSA Card', status: 'completed', statusText: 'Completed' }
  ];

  insuranceClaims = [
    {
      claimNumber: 'CLM-2024-001',
      service: 'Annual Physical Exam',
      serviceDate: '2024-01-10',
      totalBilled: 450,
      insuranceApproved: 360,
      patientResponsibility: 90,
      status: 'approved',
      statusText: 'Approved'
    },
    {
      claimNumber: 'CLM-2024-002',
      service: 'Blood Work & Lab Tests',
      serviceDate: '2024-01-08',
      totalBilled: 280,
      insuranceApproved: 224,
      patientResponsibility: 56,
      status: 'processing',
      statusText: 'Processing'
    },
    {
      claimNumber: 'CLM-2023-045',
      service: 'MRI Scan',
      serviceDate: '2023-12-20',
      totalBilled: 1200,
      insuranceApproved: 0,
      patientResponsibility: 1200,
      status: 'denied',
      statusText: 'Denied'
    }
  ];

  paymentMethods = [
    {
      name: 'Visa Credit Card',
      details: 'Ending in 1234 • Expires 12/26',
      icon: 'credit_card',
      status: 'active',
      statusText: 'Active'
    },
    {
      name: 'Bank Account',
      details: 'Checking ****5678 • Wells Fargo',
      icon: 'account_balance',
      status: 'active',
      statusText: 'Active'
    },
    {
      name: 'HSA Card',
      details: 'Health Savings Account • $2,450 available',
      icon: 'savings',
      status: 'active',
      statusText: 'Active'
    }
  ];

  paymentPlans = [
    {
      name: 'Emergency Room Visit',
      details: 'Monthly payment plan for ER visit on Dec 15, 2023',
      monthlyAmount: 125,
      remainingPayments: 8
    },
    {
      name: 'Surgical Procedure',
      details: 'Extended payment plan for outpatient surgery',
      monthlyAmount: 200,
      remainingPayments: 12
    }
  ];

  ngOnInit() {}
}