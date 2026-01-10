
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PrequalificationData {
  name?: string;
  email?: string;
  serviceOfInterest?: string;
  budgetScale?: string;
  timeline?: string;
}

export enum AppMode {
  TEXT = 'TEXT',
  VOICE = 'VOICE'
}

export interface ServiceInfo {
  title: string;
  description: string;
  icon: string;
}
