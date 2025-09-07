import { User, Device, Transaction, UserRole, TransactionType, Category, DeviceInstance } from '../types';

export const mockUsers: User[] = [
  { id: 1, name: 'Admin Utama', email: 'admin@example.com', role: UserRole.ADMINISTRATOR },
  { id: 2, name: 'Staf Gudang', email: 'viewer@example.com', role: UserRole.VIEW_ONLY },
  { id: 3, name: 'Manajer Proyek', email: 'manager@example.com', role: UserRole.ADMINISTRATOR },
];

export const mockCategories: Category[] = [
    { id: 'cat-1', name: 'Switch' },
    { id: 'cat-2', name: 'Access Point' },
    { id: 'cat-3', name: 'Router' },
    { id: 'cat-4', name: 'Modem' },
    { id: 'cat-5', name: 'SFP' },
    { id: 'cat-6', name: 'Adaptor' },
    { id: 'cat-7', name: 'Kabel UTP' },
];

export const mockDevices: Device[] = [
  { id: 'CIS-001', name: 'Cisco Catalyst 9300', category: 'Switch', brand: 'Cisco', quantity: 15, status: 'In Stock', condition: 'Normal' },
  { id: 'CIS-002', name: 'Cisco Aironet 1850', category: 'Access Point', brand: 'Cisco', quantity: 3, status: 'Low Stock', condition: 'Rusak' },
  { id: 'HUA-001', name: 'Huawei AR6120', category: 'Router', brand: 'Huawei', quantity: 8, status: 'In Stock', condition: 'Normal' },
  { id: 'RAI-001', name: 'Raisecom ISCOM2128', category: 'Switch', brand: 'Raisecom', quantity: 22, status: 'In Stock', condition: 'Normal' },
  { id: 'MOD-001', name: 'ZTE F609', category: 'Modem', brand: 'ZTE', quantity: 50, status: 'In Stock', condition: 'Normal' },
  { id: 'MOD-002', name: 'Nokia G-240W-C', category: 'Modem', brand: 'Nokia', quantity: 0, status: 'Out of Stock', condition: 'Normal' },
  { id: 'SFP-001', name: 'SFP 1G LX', category: 'SFP', brand: 'Generic', quantity: 150, status: 'In Stock', condition: 'Normal' },
  { id: 'SFP-002', name: 'SFP+ 10G SR', category: 'SFP', brand: 'Generic', quantity: 4, status: 'Low Stock', condition: 'Normal' },
  { id: 'ADP-001', name: 'Adaptor 12V 2A', category: 'Adaptor', brand: 'Generic', quantity: 78, status: 'In Stock', condition: 'Normal' },
  { id: 'HUA-002', name: 'Huawei S5720', category: 'Switch', brand: 'Huawei', quantity: 12, status: 'In Stock', condition: 'Normal' },
];

export const mockDeviceInstances: DeviceInstance[] = [
    { registrationNumber: 'SN-CIS9300-001', deviceId: 'CIS-001', deviceName: 'Cisco Catalyst 9300', condition: 'Normal', status: 'In Stock' },
    { registrationNumber: 'SN-CIS9300-002', deviceId: 'CIS-001', deviceName: 'Cisco Catalyst 9300', condition: 'Normal', status: 'Deployed' },
    { registrationNumber: 'SN-CISAIR-001', deviceId: 'CIS-002', deviceName: 'Cisco Aironet 1850', condition: 'Rusak', status: 'In Stock' },
    { registrationNumber: 'SN-CISAIR-002', deviceId: 'CIS-002', deviceName: 'Cisco Aironet 1850', condition: 'Rusak', status: 'In Stock' },
    { registrationNumber: 'SN-CISAIR-003', deviceId: 'CIS-002', deviceName: 'Cisco Aironet 1850', condition: 'Rusak', status: 'In Stock' },
    { registrationNumber: 'SN-HUAAR-001', deviceId: 'HUA-001', deviceName: 'Huawei AR6120', condition: 'Normal', status: 'In Stock' },
    { registrationNumber: 'SN-HUAAR-002', deviceId: 'HUA-001', deviceName: 'Huawei AR6120', condition: 'Normal', status: 'Deployed' },
    { registrationNumber: 'SN-ZTEMOD-001', deviceId: 'MOD-001', deviceName: 'ZTE F609', condition: 'Normal', status: 'In Stock' },
    { registrationNumber: 'SN-ZTEMOD-002', deviceId: 'MOD-001', deviceName: 'ZTE F609', condition: 'Normal', status: 'In Stock' },
    { registrationNumber: 'SN-ZTEMOD-003', deviceId: 'MOD-001', deviceName: 'ZTE F609', condition: 'Normal', status: 'Deployed' },
];

export const mockTransactions: Transaction[] = [
  { id: 'T-001', deviceId: 'CIS-001', deviceName: 'Cisco Catalyst 9300', type: TransactionType.OUT, quantity: 2, date: '2023-10-26', user: 'Admin Utama', destination: 'Proyek A', recipient: 'Tim Jaringan' },
  { id: 'T-002', deviceId: 'MOD-001', deviceName: 'ZTE F609', type: TransactionType.IN, quantity: 20, date: '2023-10-25', user: 'Admin Utama', source: 'Supplier Telco', sender: 'Budi' },
  { id: 'T-003', deviceId: 'SFP-002', deviceName: 'SFP+ 10G SR', type: TransactionType.OUT, quantity: 10, date: '2023-10-24', user: 'Admin Utama', destination: 'Proyek B', recipient: 'Tim Fiber' },
  { id: 'T-004', deviceId: 'HUA-001', deviceName: 'Huawei AR6120', type: TransactionType.OUT, quantity: 1, date: '2023-10-23', user: 'Admin Utama', destination: 'Proyek C', recipient: 'Manajer Proyek' },
  { id: 'T-005', deviceId: 'RAI-001', deviceName: 'Raisecom ISCOM2128', type: TransactionType.IN, quantity: 5, date: '2023-10-22', user: 'Admin Utama', source: 'Gudang Pusat', sender: 'Andi' },
];
