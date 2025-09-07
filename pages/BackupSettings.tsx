import React, { useState, useEffect } from 'react';
import { UI_TEXT } from '../constants';

interface BackupSettingsState {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  destination: 'local' | 'cloud';
}

const BackupSettings: React.FC = () => {
  const [settings, setSettings] = useState<BackupSettingsState>({
    enabled: false,
    frequency: 'weekly',
    time: '02:00',
    destination: 'cloud',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('backupSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('backupSettings', JSON.stringify(settings));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{UI_TEXT.backupSettings}</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{UI_TEXT.enableScheduledBackups}</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {settings.enabled ? 'Cadangan terjadwal aktif.' : 'Cadangan terjadwal nonaktif.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className={`${
                  settings.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800`}
                role="switch"
                aria-checked={settings.enabled}
              >
                <span
                  className={`${
                    settings.enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
              </button>
            </div>

            {/* Settings Form - shown only if enabled */}
            {settings.enabled && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                {/* Backup Frequency */}
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {UI_TEXT.backupFrequency}
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={settings.frequency}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="daily">{UI_TEXT.daily}</option>
                    <option value="weekly">{UI_TEXT.weekly}</option>
                    <option value="monthly">{UI_TEXT.monthly}</option>
                  </select>
                </div>

                {/* Backup Time */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {UI_TEXT.backupTime}
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={settings.time}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Backup Destination */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {UI_TEXT.backupDestination}
                  </span>
                  <div className="mt-2 flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="destination"
                        value="cloud"
                        checked={settings.destination === 'cloud'}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{UI_TEXT.cloud}</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="destination"
                        value="local"
                        checked={settings.destination === 'local'}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{UI_TEXT.local}</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end items-center">
              {showSuccess && (
                <p className="text-sm text-green-600 dark:text-green-400 mr-4">{UI_TEXT.settingsSaved}</p>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {UI_TEXT.saveChanges}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackupSettings;