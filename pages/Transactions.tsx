
import React, { useState, useMemo } from 'react';
import { mockTransactions } from '../data/mockData';
import { UI_TEXT } from '../constants';
import { Transaction, TransactionType } from '../types';
import { ExportIcon, ArrowUpIcon, ArrowDownIcon } from '../components/icons/Icons';

const Transactions: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((t: Transaction) => {
      if (startDate && t.date < startDate) {
        return false;
      }
      if (endDate && t.date > endDate) {
        return false;
      }
      return true;
    });
  }, [startDate, endDate]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.transactionHistory}</h1>
        <div className="flex items-center space-x-4 flex-wrap gap-2">
          <div>
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{UI_TEXT.startDate}</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{UI_TEXT.endDate}</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            <ExportIcon className="w-5 h-5 mr-2" />
            {UI_TEXT.export}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">{UI_TEXT.transactionType}</th>
              <th scope="col" className="px-6 py-3">{UI_TEXT.name}</th>
              <th scope="col" className="px-6 py-3">{UI_TEXT.quantity}</th>
              <th scope="col" className="px-6 py-3">{UI_TEXT.date}</th>
              <th scope="col" className="px-6 py-3">{UI_TEXT.handledBy}</th>
              <th scope="col" className="px-6 py-3">{UI_TEXT.sourceOrDestination}</th>
              <th scope="col" className="px-6 py-3">{UI_TEXT.senderOrRecipient}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t: Transaction) => (
              <tr key={t.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                  <span className={`flex items-center font-semibold ${t.type === TransactionType.IN ? 'text-green-500' : 'text-red-500'}`}>
                    {t.type === TransactionType.IN ? <ArrowDownIcon className="w-4 h-4 mr-2"/> : <ArrowUpIcon className="w-4 h-4 mr-2"/>}
                    {t.type === TransactionType.IN ? UI_TEXT.incoming : UI_TEXT.outgoing}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{t.deviceName}</td>
                <td className="px-6 py-4">{t.quantity}</td>
                <td className="px-6 py-4">{t.date}</td>
                <td className="px-6 py-4">{t.user}</td>
                <td className="px-6 py-4">{t.type === TransactionType.IN ? t.source : t.destination || '-'}</td>
                <td className="px-6 py-4">{t.type === TransactionType.IN ? t.sender : t.recipient || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;