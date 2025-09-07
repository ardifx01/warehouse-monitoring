
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UI_TEXT } from '../constants';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {UI_TEXT.loginTitle}
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
            {UI_TEXT.loginWelcome}
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {UI_TEXT.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled
              placeholder="admin@example.com"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {UI_TEXT.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled
              placeholder="••••••••"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50"
            />
          </div>
          <div className="pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
             (Halaman login ini adalah simulasi)
          </div>
          <div className="flex flex-col space-y-3">
              <button
                onClick={() => login(UserRole.ADMINISTRATOR)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {UI_TEXT.loginAsAdmin}
              </button>
              <button
                onClick={() => login(UserRole.VIEW_ONLY)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                {UI_TEXT.loginAsViewer}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
