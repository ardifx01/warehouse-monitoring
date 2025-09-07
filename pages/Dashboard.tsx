import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockDevices, mockTransactions } from '../data/mockData';
import DashboardCard from '../components/DashboardCard';
import { UI_TEXT } from '../constants';
import { InventoryIcon, ArrowUpIcon, ArrowDownIcon, CheckCircleIcon, ExclamationCircleIcon } from '../components/icons/Icons';
import { Transaction, TransactionType } from '../types';

const Dashboard: React.FC = () => {
  const totalItems = mockDevices.reduce((sum, device) => sum + device.quantity, 0);
  const lowStockItems = mockDevices.filter(d => d.status === 'Low Stock').length;
  const itemsOut = mockTransactions.filter(t => t.type === 'out').reduce((sum, t) => sum + t.quantity, 0);
  const itemsIn = mockTransactions.filter(t => t.type === 'in').reduce((sum, t) => sum + t.quantity, 0);
  const normalItems = mockDevices.filter(d => d.condition === 'Normal').reduce((sum, device) => sum + device.quantity, 0);
  const damagedItems = mockDevices.filter(d => d.condition === 'Rusak').reduce((sum, device) => sum + device.quantity, 0);

  const categoryData = mockDevices.reduce((acc, device) => {
    const category = acc.find(c => c.name === device.category);
    if (category) {
      category.quantity += device.quantity;
    } else {
      acc.push({ name: device.category, quantity: device.quantity });
    }
    return acc;
  }, [] as { name: string; quantity: number }[]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.dashboard}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title={UI_TEXT.totalItems} value={totalItems} icon={<InventoryIcon className="w-8 h-8 text-white" />} colorClass="bg-blue-500" />
        <DashboardCard title={UI_TEXT.normalItems} value={normalItems} icon={<CheckCircleIcon className="w-8 h-8 text-white" />} colorClass="bg-teal-500" />
        <DashboardCard title={UI_TEXT.damagedItems} value={damagedItems} icon={<ExclamationCircleIcon className="w-8 h-8 text-white" />} colorClass="bg-orange-500" />
        <DashboardCard title={UI_TEXT.lowStockItems} value={lowStockItems} icon={<InventoryIcon className="w-8 h-8 text-white" />} colorClass="bg-yellow-500" />
        <DashboardCard title={UI_TEXT.itemsOut} value={itemsOut} icon={<ArrowUpIcon className="w-8 h-8 text-white" />} colorClass="bg-red-500" />
        <DashboardCard title={UI_TEXT.itemsIn} value={itemsIn} icon={<ArrowDownIcon className="w-8 h-8 text-white" />} colorClass="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{UI_TEXT.inventoryByCategory}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: 'rgba(128, 128, 128, 0.5)',
                  color: '#ffffff'
                }}
              />
              <Legend />
              <Bar dataKey="quantity" fill="#3B82F6" name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{UI_TEXT.recentTransactions}</h2>
          <div className="overflow-y-auto h-[300px]">
            <ul className="space-y-4">
              {mockTransactions.slice(0, 5).map((t: Transaction) => (
                <li key={t.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div>
                    <p className="font-semibold">{t.deviceName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.date} oleh {t.user}
                    </p>
                  </div>
                  <div className={`flex items-center text-sm font-bold ${t.type === TransactionType.IN ? 'text-green-500' : 'text-red-500'}`}>
                    {t.type === TransactionType.IN ? '+' : '-'}
                    {t.quantity}
                    {t.type === TransactionType.IN ? <ArrowDownIcon className="w-4 h-4 ml-1"/> : <ArrowUpIcon className="w-4 h-4 ml-1"/>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;