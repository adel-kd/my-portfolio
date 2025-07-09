import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const PushNotificationButton = () => {
  const { 
    pushEnabled, 
    pushSupported, 
    enablePushNotifications, 
    disablePushNotifications 
  } = useNotification();

  if (!pushSupported) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-center">
          <BellOff className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              Push Notifications Not Supported
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
              Your browser doesn't support push notifications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className={`h-5 w-5 mr-3 ${pushEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Browser Push Notifications
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {pushEnabled 
                ? 'Get notified instantly when new blog posts are published'
                : 'Enable notifications to never miss a new blog post'
              }
            </p>
          </div>
        </div>
        <button
          onClick={pushEnabled ? disablePushNotifications : enablePushNotifications}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            pushEnabled
              ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/30'
              : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/30'
          }`}
        >
          {pushEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    </div>
  );
};

export default PushNotificationButton;