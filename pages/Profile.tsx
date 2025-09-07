import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UI_TEXT } from '../constants';
import { UserRole } from '../types';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  // State for profile info form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // State for password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isViewOnly = user?.role === UserRole.VIEW_ONLY;

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewOnly) return;
    // In a real app, you'd call an API here.
    console.log('Updating profile:', { name, email });
    alert(UI_TEXT.profileUpdatedSuccessfully);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword !== confirmPassword) {
      setPasswordError(UI_TEXT.passwordsDoNotMatch);
      return;
    }
    // In a real app, you'd validate the current password and call an API.
    console.log('Updating password...');
    alert(UI_TEXT.passwordUpdatedSuccessfully);
    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.profile}</h1>

      {/* Profile Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handleProfileUpdate}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{UI_TEXT.profileInformation}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Perbarui informasi profil dan alamat email Anda.</p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.userName}</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isViewOnly}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.userEmail}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isViewOnly}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="sm:col-span-2">
                 <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.userRole}</label>
                 <input
                  type="text"
                  id="role"
                  value={user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none disabled:opacity-70"
                />
              </div>
            </div>
          </div>
          {!isViewOnly && (
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end rounded-b-lg">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {UI_TEXT.saveChanges}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Change Password Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handlePasswordUpdate}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{UI_TEXT.changePassword}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.</p>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.currentPassword}</label>
                <input
                  type="password"
                  id="current_password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.newPassword}</label>
                <input
                  type="password"
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.confirmNewPassword}</label>
                <input
                  type="password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end rounded-b-lg">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {UI_TEXT.updatePassword}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;