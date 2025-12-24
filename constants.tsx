
import React from 'react';
import { ArchitectureNode } from './types';

export const COLORS = {
  primary: '#FF5722', // SAFAR SRS Orange
  secondary: '#212121', // Deep Dark
  accent: '#03A9F4', // Sky Blue
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a'
};

export const ICONS = {
  Plane: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  Server: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6" y2="6"/><line x1="6" y1="18" x2="6" y2="18"/></svg>
  ),
  Database: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  )
};

export const MOCK_PACKAGES = [
  { id: '1', title: 'Sundarbans Eco Tour', destination: 'Khulna, BD', price: 150, currency: 'USD', duration: '3 Days', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1623945359620-6379963690d5?auto=format&fit=crop&w=800&q=80', agencyName: 'Tiger Safaris' },
  { id: '2', title: 'Cox’s Bazar Beach Escape', destination: 'Chattogram, BD', price: 90, currency: 'USD', duration: '2 Days', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80', agencyName: 'Horizon Travels' }
];

// Added ArchitectureNode[] type to satisfy the strict union type in ArchitectureViewer's state
export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  { id: 'gateway', name: 'API Gateway (Spring Cloud)', type: 'GATEWAY', description: 'Central Auth & Routing as per SRS 2.1.', technologies: ['Kotlin', 'WebFlux', 'JWT'] },
  { id: 'user-svc', name: 'User Service', type: 'SERVICE', description: 'SRS 3.1: Reg/Login, Role Access, KYC.', technologies: ['Kotlin', 'Spring Security', 'MySQL'] },
  { id: 'booking-svc', name: 'Booking Service', type: 'SERVICE', description: 'SRS 3.3: Lifecycle, WebSocket Status.', technologies: ['Kotlin', 'Coroutines', 'MySQL'] },
  { id: 'payment-svc', name: 'Payment Service', type: 'SERVICE', description: 'SRS 3.4: Stripe/PayPal/SSLCommerz.', technologies: ['Kotlin', 'WebClient', 'Vault'] },
  { id: 'search-svc', name: 'Search Service', type: 'SERVICE', description: 'SRS 3.2: Elasticsearch Global Search.', technologies: ['Kotlin', 'Elasticsearch'] },
  { id: 'notif-svc', name: 'Notification Service', type: 'SERVICE', description: 'SRS 3.8: FCM, Twilio SMS, SMTP.', technologies: ['Kotlin', 'Firebase', 'RabbitMQ'] },
  { id: 'admin-svc', name: 'Admin Service', type: 'SERVICE', description: 'SRS 3.7: Metrics, KYC Approvals.', technologies: ['Kotlin', 'Micrometer', 'Grafana'] }
];
