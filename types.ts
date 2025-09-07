// FIX: Removed circular import of `UserRole` which was causing a declaration conflict.
export enum UserRole {
  ADMINISTRATOR = 'administrator',
  VIEW_ONLY = 'view_only',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Device {
  id: string;
  name:string;
  category: string;
  brand: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  condition: 'Normal' | 'Rusak';
  description?: string;
}

export interface DeviceInstance {
  registrationNumber: string;
  deviceId: string;
  deviceName: string;
  condition: 'Normal' | 'Rusak';
  status: 'In Stock' | 'Deployed';
}

export interface Category {
  id: string;
  name: string;
}

export enum TransactionType {
  IN = 'in',
  OUT = 'out',
}

export interface Transaction {
  id: string;
  deviceId: string;
  deviceName: string;
  type: TransactionType;
  quantity: number;
  date: string;
  user: string;
  destination?: string; // For OUT
  recipient?: string; // For OUT
  source?: string; // For IN
  sender?: string; // For IN
  registrationNumbers?: string[]; // For new devices in IN transaction
}