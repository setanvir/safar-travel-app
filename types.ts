
export enum UserRole {
  TRAVELER = 'TRAVELER',
  AGENCY = 'AGENCY',
  ADMIN = 'ADMIN'
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  imageUrl: string;
  agencyName: string;
}

export interface Booking {
  id: string;
  packageId: string;
  userId: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  amount: number;
  date: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: 'SERVICE' | 'DATABASE' | 'GATEWAY' | 'UI';
  description: string;
  technologies: string[];
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
}

export interface CodeSnippet {
  filename: string;
  language: string;
  content: string;
}
