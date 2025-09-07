// Fix: Created Inventory component to resolve the "not a module" error.
import React, { useState, useMemo } from 'react';
import { mockDevices, mockCategories } from '../data/mockData';
import { UI_TEXT } from '../constants';
import { Device } from '../types';
import { PlusIcon, ExportIcon } from '../components/icons/Icons';
import EditDeviceModal from '../components/EditDeviceModal';
import ConfirmationModal from '../components/ConfirmationModal';

const Inventory: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>(mockDevices);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);

    const filteredDevices = useMemo(() => {
        return devices.filter(device =>
            device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [devices, searchTerm]);

    const handleEdit = (device: Device) => {
        setSelectedDevice(device);
        setIsModalOpen(true);
    };
    
    const handleAdd = () => {
        setSelectedDevice(null);
        setIsModalOpen(true);
    };

    const handleDelete = (device: Device) => {
        setDeviceToDelete(device);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deviceToDelete) {
            setDevices(devices.filter(d => d.id !== deviceToDelete.id));
            setDeviceToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleSave = (deviceToSave: Device) => {
        if (selectedDevice) { // Editing existing device
            setDevices(devices.map(d => d.id === deviceToSave.id ? deviceToSave : d));
        } else { // Adding new device
            const newDevice = { ...deviceToSave, id: `NEW-${Date.now()}` };
            setDevices([...devices, newDevice]);
        }
        setIsModalOpen(false);
        setSelectedDevice(null);
    };

    const getStatusClass = (status: 'In Stock' | 'Low Stock' | 'Out of Stock') => {
        switch (status) {
            case 'In Stock': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Low Stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Out of Stock': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        }
    };

    const getConditionClass = (condition: 'Normal' | 'Rusak') => {
        switch (condition) {
            case 'Normal': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Rusak': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.inventory}</h1>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            // FIX: Corrected typo from UI__TEXT to UI_TEXT.
                            placeholder={UI_TEXT.searchDevice}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                         <button onClick={handleAdd} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            <PlusIcon className="w-5 h-5 mr-2" />
                            {UI_TEXT.addDevice}
                        </button>
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
                                <th scope="col" className="px-6 py-3">{UI_TEXT.name}</th>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.category}</th>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.deviceBrand}</th>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.quantity}</th>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.deviceStatus}</th>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.deviceCondition}</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">{UI_TEXT.action}</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevices.map((device: Device) => (
                                <tr key={device.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{device.name}</td>
                                    <td className="px-6 py-4">{device.category}</td>
                                    <td className="px-6 py-4">{device.brand}</td>
                                    <td className="px-6 py-4">{device.quantity}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(device.status)}`}>
                                            {device.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionClass(device.condition)}`}>
                                            {device.condition}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(device)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">{UI_TEXT.edit}</button>
                                        <button onClick={() => handleDelete(device)} className="font-medium text-red-600 dark:text-red-500 hover:underline">{UI_TEXT.delete}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <EditDeviceModal
                    device={selectedDevice}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    categories={mockCategories.map(c => c.name)}
                />
            )}
            {isDeleteModalOpen && deviceToDelete && (
                 <ConfirmationModal
                    title={`${UI_TEXT.delete} ${UI_TEXT.name}`}
                    message={`Apakah Anda yakin ingin menghapus perangkat "${deviceToDelete.name}"? Tindakan ini tidak dapat diurungkan.`}
                    onConfirm={confirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    confirmText={UI_TEXT.delete}
                    cancelText={UI_TEXT.cancel}
                />
            )}
        </>
    );
};

export default Inventory;