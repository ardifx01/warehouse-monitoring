import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { UI_TEXT } from '../constants';
import { UserRole } from '../types';

interface BackupSettingsState {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  destination: 'local' | 'cloud';
}

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  
  // State for profile info form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // State for password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // State for backup settings
  const [backupSettings, setBackupSettings] = useState<BackupSettingsState>({
    enabled: false,
    frequency: 'weekly',
    time: '02:00',
    destination: 'cloud',
  });
  const [showBackupSuccess, setShowBackupSuccess] = useState(false);

  const isViewOnly = user?.role === UserRole.VIEW_ONLY;

  // Load backup settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('backupSettings');
    if (savedSettings) {
      setBackupSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewOnly) return;
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
    console.log('Updating password...');
    alert(UI_TEXT.passwordUpdatedSuccessfully);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleBackupSettingsChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setBackupSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleBackupToggle = () => {
    setBackupSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleBackupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('backupSettings', JSON.stringify(backupSettings));
    setShowBackupSuccess(true);
    setTimeout(() => setShowBackupSuccess(false), 3000);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.settings}</h1>

      {/* Profile Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handleProfileUpdate}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{UI_TEXT.profileInformation}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.userName}</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isViewOnly} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.userEmail}</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isViewOnly} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" />
              </div>
            </div>
          </div>
          {!isViewOnly && (
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end rounded-b-lg">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">{UI_TEXT.saveChanges}</button>
            </div>
          )}
        </form>
      </div>

      {/* Change Password Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handlePasswordUpdate}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{UI_TEXT.changePassword}</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.currentPassword}</label>
                <input type="password" id="current_password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.newPassword}</label>
                <input type="password" id="new_password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.confirmNewPassword}</label>
                <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end rounded-b-lg">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">{UI_TEXT.updatePassword}</button>
          </div>
        </form>
      </div>

      {/* Theme Settings Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Pengaturan Tema</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="theme-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">Tema</label>
          <select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="light">Terang</option>
            <option value="dark">Gelap</option>
            <option value="system">Sistem</option>
          </select>
        </div>
      </div>
      
      {/* Backup Settings Card - Admin only */}
      {user.role === UserRole.ADMINISTRATOR && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <form onSubmit={handleBackupSubmit}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{UI_TEXT.backupSettings}</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {backupSettings.enabled ? 'Cadangan terjadwal aktif.' : 'Cadangan terjadwal nonaktif.'}
                  </p>
                </div>
                <button type="button" onClick={handleBackupToggle} className={`${backupSettings.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800`} role="switch" aria-checked={backupSettings.enabled}>
                  <span className={`${backupSettings.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                </button>
              </div>
              {backupSettings.enabled && (
                <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 space-y-4">
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.backupFrequency}</label>
                    <select id="frequency" name="frequency" value={backupSettings.frequency} onChange={handleBackupSettingsChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="daily">{UI_TEXT.daily}</option>
                      <option value="weekly">{UI_TEXT.weekly}</option>
                      <option value="monthly">{UI_TEXT.monthly}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.backupTime}</label>
                    <input type="time" id="time" name="time" value={backupSettings.time} onChange={handleBackupSettingsChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT.backupDestination}</span>
                    <div className="mt-2 flex space-x-4">
                      <label className="inline-flex items-center"><input type="radio" name="destination" value="cloud" checked={backupSettings.destination === 'cloud'} onChange={handleBackupSettingsChange} className="form-radio h-4 w-4 text-blue-600" /><span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{UI_TEXT.cloud}</span></label>
                      <label className="inline-flex items-center"><input type="radio" name="destination" value="local" checked={backupSettings.destination === 'local'} onChange={handleBackupSettingsChange} className="form-radio h-4 w-4 text-blue-600" /><span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{UI_TEXT.local}</span></label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end items-center rounded-b-lg">
              {showBackupSuccess && <p className="text-sm text-green-600 dark:text-green-400 mr-4">{UI_TEXT.settingsSaved}</p>}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">{UI_TEXT.saveChanges}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;