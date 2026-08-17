import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-clinical-notes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  template: `
    <div class="dashboard-container">
      <h1>Clinical Notes - Dr. Nkosi Dlamini</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">247</div>
            <div class="metric-label">Notes This Month</div>
            <div class="metric-change positive">+18%</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">15</div>
            <div class="metric-label">Pending Reviews</div>
            <div class="metric-change negative">+3</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">98.5%</div>
            <div class="metric-label">Documentation Rate</div>
            <div class="metric-change positive">+2.1%</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">4.2</div>
            <div class="metric-label">Avg Minutes/Note</div>
            <div class="metric-change positive">-0.8 min</div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="action-bar">
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Clinical Note
        </button>
        <button mat-button>
          <mat-icon>search</mat-icon>
          Search Notes
        </button>
        <button mat-button>
          <mat-icon>filter_list</mat-icon>
          Filter
        </button>
        <button mat-button>
          <mat-icon>download</mat-icon>
          Export
        </button>
      </div>

      <mat-tab-group class="notes-tabs">
        <mat-tab label="Recent Notes">
          <div class="dashboard-grid">
            <mat-card class="overview-card" *ngFor="let note of recentNotes">
              <mat-card-header>
                <mat-card-title>{{note.patientName}}</mat-card-title>
                <mat-card-subtitle>{{note.date}} • {{note.type}}</mat-card-subtitle>
                <mat-chip [class]="'status-' + note.status">{{note.statusText}}</mat-chip>
              </mat-card-header>
              <mat-card-content>
                <div class="note-summary">
                  <div class="chief-complaint">
                    <strong>Chief Complaint:</strong> {{note.chiefComplaint}}
                  </div>
                  <div class="assessment">
                    <strong>Assessment:</strong> {{note.assessment}}
                  </div>
                  <div class="plan">
                    <strong>Plan:</strong> {{note.plan}}
                  </div>
                </div>
                <div class="note-details">
                  <div class="vital-signs" *ngIf="note.vitals">
                    <strong>Vitals:</strong>
                    <span>BP: {{note.vitals.bp}}</span>
                    <span>HR: {{note.vitals.hr}}</span>
                    <span>Temp: {{note.vitals.temp}}</span>
                    <span>O2: {{note.vitals.o2}}%</span>
                  </div>
                  <div class="medications" *ngIf="note.medications">
                    <strong>Medications:</strong>
                    <mat-chip *ngFor="let med of note.medications" class="medication-chip">{{med}}</mat-chip>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button>Edit</button>
                <button mat-button>Sign</button>
                <button mat-button>Print</button>
                <button mat-button>Share</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Templates">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Note Templates</mat-card-title>
                <button mat-raised-button color="primary">Create Template</button>
              </mat-card-header>
              <mat-card-content>
                <div class="templates-list">
                  <div class="template-item" *ngFor="let template of noteTemplates">
                    <div class="template-info">
                      <mat-icon>{{template.icon}}</mat-icon>
                      <div>
                        <div class="template-name">{{template.name}}</div>
                        <div class="template-description">{{template.description}}</div>
                        <div class="template-usage">Used {{template.usageCount}} times</div>
                      </div>
                    </div>
                    <div class="template-actions">
                      <button mat-raised-button color="primary">Use Template</button>
                      <button mat-icon-button><mat-icon>edit</mat-icon></button>
                      <button mat-icon-button><mat-icon>copy</mat-icon></button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Pending Reviews">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Notes Requiring Review</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="pending-notes">
                  <div class="pending-note" *ngFor="let note of pendingNotes">
                    <div class="note-header">
                      <div class="note-info">
                        <div class="patient-name">{{note.patientName}}</div>
                        <div class="note-date">{{note.date}} • {{note.type}}</div>
                        <div class="note-reason">{{note.reviewReason}}</div>
                      </div>
                      <mat-chip [class]="'priority-' + note.priority">{{note.priorityText}}</mat-chip>
                    </div>
                    <div class="note-preview">
                      {{note.preview}}
                    </div>
                    <div class="note-actions">
                      <button mat-raised-button color="primary">Review & Sign</button>
                      <button mat-button>Request Changes</button>
                      <button mat-button>View Full Note</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Analytics">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Documentation Analytics</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="analytics-grid">
                  <div class="analytic-item">
                    <div class="analytic-title">Most Common Diagnoses</div>
                    <div class="diagnosis-list">
                      <div class="diagnosis-item" *ngFor="let diagnosis of commonDiagnoses">
                        <span class="diagnosis-name">{{diagnosis.name}}</span>
                        <span class="diagnosis-count">{{diagnosis.count}} cases</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="analytic-item">
                    <div class="analytic-title">Documentation Efficiency</div>
                    <div class="efficiency-stats">
                      <div class="stat">
                        <span class="stat-value">4.2 min</span>
                        <span class="stat-label">Avg Time per Note</span>
                      </div>
                      <div class="stat">
                        <span class="stat-value">98.5%</span>
                        <span class="stat-label">Completion Rate</span>
                      </div>
                      <div class="stat">
                        <span class="stat-value">2.1 days</span>
                        <span class="stat-label">Avg Sign Time</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="analytic-item">
                    <div class="analytic-title">Note Types Distribution</div>
                    <div class="note-types">
                      <div class="note-type" *ngFor="let type of noteTypes">
                        <span class="type-name">{{type.name}}</span>
                        <div class="type-bar">
                          <div class="type-fill" [style.width.%]="type.percentage"></div>
                        </div>
                        <span class="type-percentage">{{type.percentage}}%</span>
                      </div>
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
    .notes-tabs { margin-top: 24px; }
    .action-bar { display: flex; gap: 12px; margin-bottom: 24px; }
    .metric-change { font-size: 12px; font-weight: 600; }
    .positive { color: #10b981; }
    .negative { color: #ef4444; }
    
    .note-summary { margin-bottom: 16px; }
    .chief-complaint, .assessment, .plan { margin-bottom: 8px; font-size: 14px; }
    .note-details { margin-bottom: 16px; }
    .vital-signs { display: flex; gap: 16px; margin-bottom: 8px; font-size: 12px; }
    .medications { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .medication-chip { font-size: 11px; height: 24px; }
    
    .templates-list { display: flex; flex-direction: column; gap: 16px; }
    .template-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .template-info { display: flex; align-items: center; gap: 12px; flex: 1; }
    .template-name { font-weight: 600; margin-bottom: 4px; }
    .template-description { font-size: 12px; color: var(--premium-text-muted); margin-bottom: 4px; }
    .template-usage { font-size: 11px; color: var(--premium-text-muted); }
    .template-actions { display: flex; align-items: center; gap: 8px; }
    
    .pending-notes { display: flex; flex-direction: column; gap: 16px; }
    .pending-note { padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .note-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .patient-name { font-weight: 600; margin-bottom: 4px; }
    .note-date { font-size: 12px; color: var(--premium-text-muted); margin-bottom: 4px; }
    .note-reason { font-size: 12px; color: var(--premium-accent); }
    .note-preview { font-size: 14px; margin-bottom: 12px; color: var(--premium-text-muted); }
    .note-actions { display: flex; gap: 12px; }
    
    .priority-high { background-color: #fecaca; color: #991b1b; }
    .priority-medium { background-color: #fef3c7; color: #92400e; }
    .priority-low { background-color: #dcfce7; color: #166534; }
    
    .analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .analytic-item { padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .analytic-title { font-weight: 600; margin-bottom: 16px; }
    
    .diagnosis-list { display: flex; flex-direction: column; gap: 8px; }
    .diagnosis-item { display: flex; justify-content: space-between; padding: 8px; background: var(--premium-card); border-radius: 4px; }
    .diagnosis-count { font-size: 12px; color: var(--premium-text-muted); }
    
    .efficiency-stats { display: flex; flex-direction: column; gap: 12px; }
    .stat { display: flex; justify-content: space-between; }
    .stat-value { font-weight: 600; color: var(--premium-accent); }
    .stat-label { font-size: 12px; color: var(--premium-text-muted); }
    
    .note-types { display: flex; flex-direction: column; gap: 8px; }
    .note-type { display: flex; align-items: center; gap: 12px; }
    .type-name { min-width: 100px; font-size: 12px; }
    .type-bar { flex: 1; height: 8px; background: var(--premium-border); border-radius: 4px; overflow: hidden; }
    .type-fill { height: 100%; background: var(--premium-accent); }
    .type-percentage { font-size: 12px; color: var(--premium-text-muted); min-width: 40px; text-align: right; }
  `]
})
export class ClinicalNotesComponent implements OnInit {
  recentNotes = [
    {
      patientName: 'Mathew Boobies',
      date: '2024-01-15 14:30',
      type: 'Follow-up Visit',
      status: 'signed',
      statusText: 'Signed',
      chiefComplaint: 'Hypertension follow-up, medication review',
      assessment: 'Hypertension well controlled on current regimen. Patient reports good adherence.',
      plan: 'Continue Lisinopril 10mg daily. RTC in 3 months. Home BP monitoring.',
      vitals: { bp: '118/76', hr: '72', temp: '98.6°F', o2: '98' },
      medications: ['Lisinopril 10mg', 'Aspirin 81mg']
    },
    {
      patientName: 'Sarah Johnson',
      date: '2024-01-15 13:45',
      type: 'Annual Physical',
      status: 'pending',
      statusText: 'Pending Review',
      chiefComplaint: 'Annual wellness exam, preventive care',
      assessment: 'Healthy 45-year-old female. All screening tests up to date.',
      plan: 'Mammogram due next year. Continue current lifestyle. Flu vaccine given.',
      vitals: { bp: '120/80', hr: '68', temp: '98.4°F', o2: '99' },
      medications: ['Multivitamin', 'Calcium + D3']
    },
    {
      patientName: 'Michael Davis',
      date: '2024-01-15 11:15',
      type: 'Cardiology Consult',
      status: 'draft',
      statusText: 'Draft',
      chiefComplaint: 'Chest pain evaluation, abnormal EKG',
      assessment: 'Atypical chest pain. EKG shows minor ST changes. Stress test recommended.',
      plan: 'Nuclear stress test scheduled. Cardiology follow-up in 2 weeks.',
      vitals: { bp: '135/85', hr: '78', temp: '98.2°F', o2: '97' },
      medications: ['Metoprolol 50mg', 'Atorvastatin 20mg']
    }
  ];

  noteTemplates = [
    {
      name: 'Hypertension Follow-up',
      description: 'Standard template for hypertension management visits',
      usageCount: 45,
      icon: 'monitor_heart'
    },
    {
      name: 'Annual Physical Exam',
      description: 'Comprehensive annual wellness examination template',
      usageCount: 32,
      icon: 'health_and_safety'
    },
    {
      name: 'Diabetes Management',
      description: 'Template for diabetes follow-up and monitoring',
      usageCount: 28,
      icon: 'water_drop'
    },
    {
      name: 'Cardiology Consultation',
      description: 'Specialized template for cardiac evaluations',
      usageCount: 18,
      icon: 'favorite'
    },
    {
      name: 'Medication Review',
      description: 'Template for medication reconciliation visits',
      usageCount: 15,
      icon: 'medication'
    }
  ];

  pendingNotes = [
    {
      patientName: 'Emily Wilson',
      date: '2024-01-14 16:20',
      type: 'Emergency Consult',
      reviewReason: 'Complex case requiring attending review',
      priority: 'high',
      priorityText: 'High Priority',
      preview: 'Patient presented with acute chest pain and elevated troponins. EKG shows ST elevation in leads II, III, aVF...'
    },
    {
      patientName: 'Robert Brown',
      date: '2024-01-14 14:45',
      type: 'Procedure Note',
      reviewReason: 'Post-procedure documentation review',
      priority: 'medium',
      priorityText: 'Medium Priority',
      preview: 'Successful cardiac catheterization with PCI to RCA. 99% stenosis reduced to 0% with drug-eluting stent...'
    },
    {
      patientName: 'Lisa Garcia',
      date: '2024-01-13 10:30',
      type: 'Discharge Summary',
      reviewReason: 'Discharge planning coordination needed',
      priority: 'low',
      priorityText: 'Low Priority',
      preview: 'Patient admitted for heart failure exacerbation. Responded well to diuretic therapy. Ready for discharge...'
    }
  ];

  commonDiagnoses = [
    { name: 'Hypertension', count: 89 },
    { name: 'Type 2 Diabetes', count: 67 },
    { name: 'Hyperlipidemia', count: 54 },
    { name: 'Coronary Artery Disease', count: 43 },
    { name: 'Heart Failure', count: 32 }
  ];

  noteTypes = [
    { name: 'Follow-up', percentage: 35 },
    { name: 'Annual Physical', percentage: 25 },
    { name: 'Consultation', percentage: 20 },
    { name: 'Procedure', percentage: 12 },
    { name: 'Emergency', percentage: 8 }
  ];

  ngOnInit() {}
}