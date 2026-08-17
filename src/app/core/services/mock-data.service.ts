import { Injectable } from '@angular/core';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getPatientAppointments(userId: string) {
    const appointments = {
      'p001': [
        { date: '2024-01-15', time: '10:00 AM', doctor: 'Dr. Sarah Smith', type: 'Cardiology Consultation', status: 'Confirmed', location: 'Room 301', notes: 'Bring previous EKG results' },
        { date: '2024-01-20', time: '2:30 PM', doctor: 'Dr. Michael Johnson', type: 'Endocrinology Follow-up', status: 'Pending', location: 'Room 205', notes: 'Diabetes management review' },
        { date: '2024-01-25', time: '9:15 AM', doctor: 'Dr. Emily Davis', type: 'Lab Results Review', status: 'Confirmed', location: 'Room 102', notes: 'Comprehensive metabolic panel results' },
        { date: '2024-02-01', time: '11:00 AM', doctor: 'Dr. Robert Wilson', type: 'Surgical Consultation', status: 'Scheduled', location: 'Room 401', notes: 'Pre-operative assessment' }
      ]
    };
    return appointments[userId as keyof typeof appointments] || [];
  }

  getPatientMedicalRecords(userId: string) {
    const records = {
      'p001': [
        {
          title: 'Annual Physical Exam',
          date: '2024-01-10',
          doctor: 'Dr. Sarah Smith',
          diagnosis: 'Excellent Health',
          treatment: 'Continue current lifestyle, increase vitamin D',
          notes: 'Patient shows excellent vital signs. Blood pressure: 118/76, Heart rate: 68 bpm.'
        },
        {
          title: 'Blood Work - Comprehensive Panel',
          date: '2023-12-15',
          doctor: 'Dr. Michael Johnson',
          diagnosis: 'All markers within normal ranges',
          treatment: 'No treatment needed',
          notes: 'Complete blood count, lipid panel, and metabolic panel all within normal limits.'
        }
      ]
    };
    return records[userId as keyof typeof records] || [];
  }

  getDoctorPatients(userId: string) {
    const patients = {
      'd001': [
        { id: 'p001', name: 'John Patient', age: 38, lastVisit: '2024-01-10', condition: 'Excellent Health', riskLevel: 'Low', nextAppt: '2024-07-10' },
        { id: 'p002', name: 'Jane Smith', age: 45, lastVisit: '2024-01-08', condition: 'Controlled Hypertension', riskLevel: 'Medium', nextAppt: '2024-02-08' },
        { id: 'p003', name: 'Bob Johnson', age: 62, lastVisit: '2024-01-05', condition: 'Type 2 Diabetes - Well Controlled', riskLevel: 'Medium', nextAppt: '2024-01-20' },
        { id: 'p004', name: 'Maria Garcia', age: 34, lastVisit: '2024-01-12', condition: 'Pregnancy - 28 weeks', riskLevel: 'Low', nextAppt: '2024-01-26' },
        { id: 'p005', name: 'David Chen', age: 55, lastVisit: '2024-01-09', condition: 'Post-MI Recovery', riskLevel: 'High', nextAppt: '2024-01-16' }
      ]
    };
    return patients[userId as keyof typeof patients] || [];
  }

  getDoctorSchedule(userId: string) {
    const schedule = {
      'd001': [
        { time: '8:00 AM', patient: 'Maria Garcia', type: 'Prenatal Check-up', duration: '30 min', room: '205', priority: 'Routine' },
        { time: '9:00 AM', patient: 'John Patient', type: 'Annual Physical', duration: '45 min', room: '301', priority: 'Routine' },
        { time: '10:00 AM', patient: 'David Chen', type: 'Cardiac Follow-up', duration: '30 min', room: '301', priority: 'High' },
        { time: '11:00 AM', patient: 'Jane Smith', type: 'Hypertension Management', duration: '20 min', room: '301', priority: 'Medium' },
        { time: '2:00 PM', patient: 'Bob Johnson', type: 'Diabetes Review', duration: '30 min', room: '301', priority: 'Medium' },
        { time: '3:00 PM', patient: 'New Patient Consultation', type: 'Initial Assessment', duration: '60 min', room: '301', priority: 'New' }
      ]
    };
    return schedule[userId as keyof typeof schedule] || [];
  }

  getSystemUsers() {
    return [
      { id: 'p001', name: 'John Patient', email: 'patient@mediq.com', role: 'patient', status: 'Active', lastLogin: '2024-01-14', department: 'N/A' },
      { id: 'd001', name: 'Dr. Nkosi Dlamini', email: 'doctor@mediq.com', role: 'doctor', status: 'Active', lastLogin: '2024-01-14', department: 'Internal Medicine & Cardiology' },
      { id: 'a001', name: 'N. Shimambani, MSc', email: 'n.shimambani@mediq.com', role: 'admin', status: 'Active', lastLogin: '2024-01-14', department: 'Technology & Innovation' },
      { id: 'p002', name: 'Jane Smith', email: 'jane.smith@email.com', role: 'patient', status: 'Active', lastLogin: '2024-01-13', department: 'N/A' },
      { id: 'd002', name: 'Dr. Michael Johnson', email: 'mjohnson@mediq.com', role: 'doctor', status: 'Active', lastLogin: '2024-01-14', department: 'Cardiology' },
      { id: 'd003', name: 'Dr. Emily Davis', email: 'edavis@mediq.com', role: 'doctor', status: 'Active', lastLogin: '2024-01-13', department: 'Pediatrics' },
      { id: 'n001', name: 'Lisa Wilson', email: 'lwilson@mediq.com', role: 'nurse', status: 'Active', lastLogin: '2024-01-14', department: 'Emergency' },
      { id: 'n002', name: 'Mark Thompson', email: 'mthompson@mediq.com', role: 'nurse', status: 'Active', lastLogin: '2024-01-14', department: 'ICU' }
    ];
  }

  getSymptomAnalysis(symptoms: string) {
    return {
      conditions: [
        { name: 'Viral Upper Respiratory Infection', probability: 78, severity: 'Mild' },
        { name: 'Allergic Rhinitis', probability: 65, severity: 'Mild' },
        { name: 'Tension Headache', probability: 45, severity: 'Mild' }
      ],
      recommendation: 'Based on your symptoms, you likely have a viral upper respiratory infection. Rest, fluids, and over-the-counter medications recommended. Consult provider if symptoms worsen or persist beyond 10 days.',
      urgency: 'Low'
    };
  }

  getVoiceNotes(userId: string) {
    const notes = {
      'p001': [
        { id: 1, title: 'Post-Workout Recovery Notes', date: '2024-01-14', duration: '2:45', transcript: 'Completed 45-minute cardio session. Heart rate peaked at 165 bpm. No chest pain. Recovery excellent.' },
        { id: 2, title: 'Medication Side Effects Check', date: '2024-01-13', duration: '1:30', transcript: 'Day 5 on new vitamin D supplement. No adverse effects. Sleep quality improved.' },
        { id: 3, title: 'Stress Level Assessment', date: '2024-01-12', duration: '3:15', transcript: 'Work stress manageable. Meditation helping. BP self-check: 120/78.' }
      ]
    };
    return notes[userId as keyof typeof notes] || [];
  }
}