import React from 'react';
import { Monitor, Sun, Moon, Bell, Lock, Sliders, User } from 'lucide-react';
import { usePreferencesStore } from '../lib/store';

export default function Settings() {
  const { preferences, updatePreferences } = usePreferencesStore();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Appearance */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <Sliders className="inline-block w-5 h-5 mr-2" />
                Appearance
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {themeOptions.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => updatePreferences({ theme: value as any })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          preferences.theme === value
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Size
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {fontSizeOptions.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => updatePreferences({ fontSize: value as any })}
                        className={`p-3 rounded-lg border ${
                          preferences.fontSize === value
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-600'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <Bell className="inline-block w-5 h-5 mr-2" />
                Notifications
              </h2>
              
              <div className="space-y-4">
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key} notifications
                    </label>
                    <button
                      onClick={() =>
                        updatePreferences({
                          notifications: {
                            ...preferences.notifications,
                            [key]: !value,
                          },
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <Lock className="inline-block w-5 h-5 mr-2" />
                Privacy
              </h2>
              
              <div className="space-y-4">
                {Object.entries(preferences.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    <button
                      onClick={() =>
                        updatePreferences({
                          privacy: {
                            ...preferences.privacy,
                            [key]: !value,
                          },
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Interface */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <User className="inline-block w-5 h-5 mr-2" />
                Interface
              </h2>
              
              <div className="space-y-4">
                {Object.entries(preferences.interface).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    <button
                      onClick={() =>
                        updatePreferences({
                          interface: {
                            ...preferences.interface,
                            [key]: !value,
                          },
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}