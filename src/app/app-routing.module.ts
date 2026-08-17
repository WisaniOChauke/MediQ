import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/mobile-dashboard', pathMatch: 'full' },
  { 
    path: 'mobile-dashboard', 
    loadComponent: () => import('./features/shared/mobile-dashboard.component').then(m => m.MobileDashboardComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  { path: 'patient-dashboard', redirectTo: '/mobile-dashboard', pathMatch: 'full' },
  { path: 'doctor-dashboard',  redirectTo: '/mobile-dashboard', pathMatch: 'full' },
  { path: 'admin-dashboard',   redirectTo: '/mobile-dashboard', pathMatch: 'full' },
  { 
    path: 'symptom-checker', 
    loadComponent: () => import('./features/ai/symptom-checker/symptom-checker.component').then(m => m.SymptomCheckerComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'voice-notes', 
    loadComponent: () => import('./features/voice-notes/voice-notes.component').then(m => m.VoiceNotesComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'smart-scheduling', 
    loadComponent: () => import('./features/smart-scheduling/smart-scheduling.component').then(m => m.SmartSchedulingComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'appointments', 
    loadComponent: () => import('./features/patient-portal/appointments.component').then(m => m.AppointmentsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'medical-records', 
    loadComponent: () => import('./features/patient-portal/medical-records.component').then(m => m.MedicalRecordsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'patients', 
    loadComponent: () => import('./features/doctor-portal/patient-management.component').then(m => m.PatientManagementComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'doctor-schedule', 
    loadComponent: () => import('./features/doctor-portal/doctor-schedule.component').then(m => m.DoctorScheduleComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'doctor-prescriptions', 
    loadComponent: () => import('./features/doctor-portal/prescriptions.component').then(m => m.PrescriptionsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'ai-insights', 
    loadComponent: () => import('./features/doctor-portal/ai-insights.component').then(m => m.AiInsightsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'user-management', 
    loadComponent: () => import('./features/admin-portal/user-management.component').then(m => m.UserManagementComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'hospital-management', 
    loadComponent: () => import('./features/admin-portal/hospital-management.component').then(m => m.HospitalManagementComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'analytics', 
    loadComponent: () => import('./features/admin-portal/analytics.component').then(m => m.AnalyticsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'system-settings', 
    loadComponent: () => import('./features/admin-portal/system-settings.component').then(m => m.SystemSettingsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'prescriptions', 
    loadComponent: () => import('./features/patient-portal/prescriptions.component').then(m => m.PrescriptionsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'lab-results', 
    loadComponent: () => import('./features/patient-portal/lab-results.component').then(m => m.LabResultsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'telemedicine', 
    loadComponent: () => import('./features/shared/telemedicine.component').then(m => m.TelemedicineComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'billing', 
    loadComponent: () => import('./features/admin-portal/billing.component').then(m => m.BillingComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'health-tracking', 
    loadComponent: () => import('./features/patient-portal/health-tracking.component').then(m => m.HealthTrackingComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'patient-billing', 
    loadComponent: () => import('./features/patient-portal/patient-billing.component').then(m => m.PatientBillingComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'insurance', 
    loadComponent: () => import('./features/patient-portal/insurance.component').then(m => m.InsuranceComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'medical-bills', 
    loadComponent: () => import('./features/patient-portal/patient-billing.component').then(m => m.PatientBillingComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'compliance', 
    loadComponent: () => import('./features/admin-portal/compliance.component').then(m => m.ComplianceComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'audit-logs', 
    loadComponent: () => import('./features/admin-portal/audit-logs.component').then(m => m.AuditLogsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'clinical-notes', 
    loadComponent: () => import('./features/doctor-portal/clinical-notes.component').then(m => m.ClinicalNotesComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'security', 
    loadComponent: () => import('./features/shared/security.component').then(m => m.SecurityComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./features/shared/settings.component').then(m => m.SettingsComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }