import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthActions } from '../../../core/store/auth/auth.actions';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatIconModule
  ],
  template: `
    <div class="login-page">
      <div class="login-left">
        <div class="brand">
          <div class="brand-icon">
            <mat-icon>favorite</mat-icon>
          </div>
          <span class="brand-name">Medi<span>Q</span></span>
        </div>
        <h1>Healthcare,<br>reimagined.</h1>
        <p>A unified platform for patients, doctors, and administrators — built for clarity and speed.</p>
        <div class="features">
          <div class="feature-item">
            <mat-icon>check_circle</mat-icon>
            <span>Secure patient records</span>
          </div>
          <div class="feature-item">
            <mat-icon>check_circle</mat-icon>
            <span>Real-time telemedicine</span>
          </div>
          <div class="feature-item">
            <mat-icon>check_circle</mat-icon>
            <span>AI-powered insights</span>
          </div>
        </div>
      </div>

      <div class="login-right">
        <div class="login-box">
          <div class="login-header">
            <h2>Sign in</h2>
            <p>Welcome back. Enter your credentials to continue.</p>
          </div>

          <div class="demo-chips">
            <button type="button" class="chip" (click)="fillDemo('patient')">Patient</button>
            <button type="button" class="chip" (click)="fillDemo('doctor')">Doctor</button>
            <button type="button" class="chip" (click)="fillDemo('admin')">Admin</button>
          </div>

          <div class="error-banner" *ngIf="errorMessage" role="alert">
            <mat-icon>error_outline</mat-icon>
            <span>{{errorMessage}}</span>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Email address</mat-label>
              <input matInput type="email" formControlName="email" autocomplete="email">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [type]="showPassword ? 'text' : 'password'" formControlName="password" autocomplete="current-password">
              <button mat-icon-button matSuffix type="button" (click)="showPassword = !showPassword" [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                <mat-icon>{{showPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="submit-btn" [disabled]="isLoading || loginForm.invalid">
              <mat-spinner diameter="18" *ngIf="isLoading"></mat-spinner>
              <span>{{isLoading ? 'Signing in...' : 'Sign in'}}</span>
            </button>
          </form>

          <p class="hint">Demo password: <code>demo123</code></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex;
      min-height: 100vh;
      background: var(--surface-bg);
    }

    /* Left panel */
    .login-left {
      display: none;
      flex: 1;
      background: linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
      padding: 48px;
      flex-direction: column;
      justify-content: center;
      color: white;
    }

    @media (min-width: 900px) {
      .login-left { display: flex; }
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 48px;
    }

    .brand-icon {
      width: 36px;
      height: 36px;
      background: rgba(255,255,255,0.15);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      mat-icon { color: white !important; font-size: 20px; }
    }

    .brand-name {
      font-size: 1.4rem;
      font-weight: 700;
      color: white !important;
      span { color: #a5b4fc !important; }
    }

    .login-left h1 {
      font-size: 2.8rem;
      font-weight: 700;
      line-height: 1.15;
      color: white !important;
      margin-bottom: 16px;
    }

    .login-left p {
      font-size: 1rem;
      color: rgba(255,255,255,0.7) !important;
      line-height: 1.6;
      max-width: 360px;
      margin-bottom: 40px;
    }

    .features { display: flex; flex-direction: column; gap: 14px; }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: rgba(255,255,255,0.9) !important;
      font-size: 0.9rem;
      mat-icon { color: #a5b4fc !important; font-size: 18px; }
    }

    /* Right panel */
    .login-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .login-box {
      width: 100%;
      max-width: 400px;
    }

    .login-header {
      margin-bottom: 28px;
      h2 {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary) !important;
        margin-bottom: 6px;
      }
      p {
        color: var(--text-secondary) !important;
        font-size: 0.9rem;
        margin: 0;
      }
    }

    .demo-chips {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .chip {
      padding: 5px 14px;
      border-radius: 20px;
      border: 1px solid var(--surface-border);
      background: var(--surface-card);
      color: var(--text-secondary) !important;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--brand-500);
        color: var(--brand-600) !important;
        background: var(--brand-50);
      }
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 0.875rem;
      color: var(--error) !important;
      mat-icon { color: var(--error) !important; font-size: 18px; }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .submit-btn {
      width: 100%;
      height: 44px;
      margin-top: 8px;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .hint {
      text-align: center;
      margin-top: 20px;
      font-size: 0.8rem;
      color: var(--text-muted) !important;
      code {
        background: var(--surface-hover);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
        color: var(--text-secondary) !important;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  fillDemo(role: 'patient' | 'doctor' | 'admin') {
    const creds = {
      patient: { email: 'patient@mediq.com', password: 'demo123' },
      doctor:  { email: 'doctor@mediq.com',  password: 'demo123' },
      admin:   { email: 'admin@mediq.com',   password: 'demo123' }
    };
    this.loginForm.patchValue(creds[role]);
    this.errorMessage = '';
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    const role = this.determineUserRole(email);

    this.authService.login(email, password, role).subscribe({
      next: (response) => {
        this.store.dispatch(AuthActions.loginSuccess({ user: response.user, token: response.token }));
        this.router.navigate(['/mobile-dashboard']);
        this.snackBar.open(`Welcome back, ${response.user.name}`, '', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Login failed. Please try again.';
        this.loginForm.get('password')?.setValue('');
      }
    });
  }

  private determineUserRole(email: string): 'patient' | 'doctor' | 'admin' {
    if (email.includes('admin'))  return 'admin';
    if (email.includes('doctor')) return 'doctor';
    return 'patient';
  }
}