// FIX: Created Categories component to resolve the "not a module" error.
import React, { useState } from 'react';
import { mockCategories } from '../data/mockData';
import { UI_TEXT } from '../constants';
import { Category } from '../types';
import { PlusIcon } from '../components/icons/Icons';
import ConfirmationModal from '../components/ConfirmationModal';
import EditCategoryModal from '../components/EditCategoryModal';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleAdd = () => {
        setSelectedCategory(null);
        setIsEditModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleDelete = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            setCategories(categories.filter(c => c.id !== categoryToDelete.id));
            setCategoryToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleSave = (categoryToSave: Category) => {
        if (selectedCategory) { // Editing
            setCategories(categories.map(c => c.id === categoryToSave.id ? categoryToSave : c));
        } else { // Adding
            setCategories([...categories, categoryToSave]);
        }
        setIsEditModalOpen(false);
        setSelectedCategory(null);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.categories}</h1>
                    <button onClick={handleAdd} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        {UI_TEXT.addCategory}
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{UI_TEXT.categoryName}</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">{UI_TEXT.action}</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category: Category) => (
                                <tr key={category.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.name}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(category)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">{UI_TEXT.edit}</button>
                                        <button onClick={() => handleDelete(category)} className="font-medium text-red-600 dark:text-red-500 hover:underline">{UI_TEXT.delete}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {isEditModalOpen && (
                <EditCategoryModal
                    category={selectedCategory}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {isDeleteModalOpen && categoryToDelete && (
                <ConfirmationModal
                    title={UI_TEXT.deleteCategory}
                    message={UI_TEXT.confirmDeleteCategoryMessage.replace('{categoryName}', categoryToDelete.name)}
                    onConfirm={confirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    confirmText={UI_TEXT.delete}
                    cancelText={UI_TEXT.cancel}
                />
            )}
        </>
    );
};

export default Categories;
