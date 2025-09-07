import React, { useState, useMemo } from 'react';
import { mockUsers } from '../data/mockData';
import { UI_TEXT } from '../constants';
import { User, UserRole } from '../types';
import { PlusIcon } from '../components/icons/Icons';
import EditUserModal from '../components/EditUserModal';
import ConfirmationModal from '../components/ConfirmationModal';

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    
    const handleAdd = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleDelete = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            setUsers(users.filter(u => u.id !== userToDelete.id));
            setUserToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleSave = (userToSave: User) => {
        if (selectedUser) { // Editing existing user
            setUsers(users.map(u => u.id === userToSave.id ? userToSave : u));
        } else { // Adding new user
            const newUser = { ...userToSave, id: Date.now() }; // Simple ID generation
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const getRoleClass = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMINISTRATOR: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case UserRole.VIEW_ONLY: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.users}</h1>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder={UI_TEXT.searchUser}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                         <button onClick={handleAdd} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            <PlusIcon className="w-5 h-5 mr-2" />
                            {UI_TEXT.addUser}
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.userName}</th>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.userEmail}</th>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.userRole}</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">{UI_TEXT.action}</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user: User) => (
                                <tr key={user.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleClass(user.role)}`}>
                                            {user.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(user)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">{UI_TEXT.edit}</button>
                                        <button onClick={() => handleDelete(user)} className="font-medium text-red-600 dark:text-red-500 hover:underline">{UI_TEXT.delete}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
            {isDeleteModalOpen && userToDelete && (
                 <ConfirmationModal
                    title={`${UI_TEXT.deleteUser}`}
                    message={UI_TEXT.confirmDeleteUserMessage.replace('{userName}', userToDelete.name)}
                    onConfirm={confirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    confirmText={UI_TEXT.delete}
                    cancelText={UI_TEXT.cancel}
                />
            )}
        </>
    );
};

export default Users;
