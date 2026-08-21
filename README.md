# MediQ Healthcare Management System

> HIPAA-compliant healthcare management platform built with Angular 18.

🔗 **Live:** [mediq-wisani.netlify.app](https://mediq-wisani.netlify.app/)

## 🚀 Features

- **Patient Dashboard** - Appointments, prescriptions, health records
- **Doctor Portal** - Schedule management, patient notes, video consultations
- **AI Symptom Checker** - OpenAI-powered symptom analysis
- **Smart Scheduling** - AI-optimized appointment booking
- **Voice Notes** - Speech-to-text for medical documentation
- **QR Check-in** - Contactless patient check-in system
- **Health Timeline** - Visual health history tracking
- **Admin Analytics** - Comprehensive dashboard with KPIs
- **Medical Aid Integration** - Real-time verification and claims processing
- **Payment Processing** - Secure multi-method payment system

## 🛠️ Technology Stack

- **Frontend**: Angular 18, TypeScript, RxJS, NgRx
- **UI**: Angular Material, SCSS
- **Testing**: Jasmine, Karma, Cypress
- **Security**: JWT, 2FA, HIPAA compliance
- **Deployment**: Docker, Nginx, CI/CD

## 📋 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Testing
```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Coverage report
npm run test:coverage
```

### Build
```bash
# Development build
npm run build

# Production build
npm run build:prod
```

## 🔒 Security & Compliance

- HIPAA-compliant architecture
- End-to-end encryption
- Role-based access control
- Audit logging
- Security headers implementation

## 🚀 Deployment

### Docker
```bash
docker build -t mediq .
docker run -p 80:80 mediq
```

### Docker Compose
```bash
docker-compose up -d
```

## 📄 License

Private - All rights reserved
