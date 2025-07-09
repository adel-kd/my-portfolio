import React, { createContext, useContext, useState, useEffect } from 'react';
import { pushService } from '../utils/pushNotifications';

const NotificationContext = createContext(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newBlogCount, setNewBlogCount] = useState(0);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    setPushSupported(pushService.isNotificationSupported());
    
    // Check if user is already subscribed
    checkPushSubscription();
  }, []);

  const checkPushSubscription = async () => {
    try {
      const isSubscribed = await pushService.isSubscribed();
      setPushEnabled(isSubscribed);
    } catch (error) {
      console.error('Error checking push subscription:', error);
    }
  };

  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const addBlogNotification = (blogTitle) => {
    addNotification({
      type: 'success',
      title: 'New Blog Post Published!',
      message: `"${blogTitle}" is now live on the blog.`,
      icon: '📝'
    });
    setNewBlogCount(prev => prev + 1);
    
    // Send push notification if enabled
    if (pushEnabled) {
      sendPushNotification(blogTitle);
    }
  };

  const sendPushNotification = async (blogTitle) => {
    try {
      await pushService.sendNotification(
        'New Blog Post Published! 🎉',
        `"${blogTitle}" is now available to read.`,
        '/favicon.ico',
        '/favicon.ico'
      );
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  const enablePushNotifications = async () => {
    try {
      // Check current permission status before attempting to subscribe
      const permissionStatus = await pushService.getPermissionStatus();
      
      if (permissionStatus === 'denied') {
        addNotification({
          type: 'error',
          title: 'Notifications Blocked',
          message: 'Please enable notifications for this site in your browser settings, then try again.',
          icon: '🚫'
        });
        return;
      }
      
      await pushService.subscribe();
      setPushEnabled(true);
      addNotification({
        type: 'success',
        title: 'Push Notifications Enabled!',
        message: 'You\'ll now receive notifications for new blog posts.',
        icon: '🔔'
      });
    } catch (error) {
      console.error('Error enabling push notifications:', error);
      
      // Provide specific error messages based on the error type
      let errorMessage = 'Could not enable push notifications.';
      let errorTitle = 'Push Notifications Failed';
      
      if (error.message && error.message.includes('Permission denied')) {
        errorTitle = 'Notifications Blocked';
        errorMessage = 'Please enable notifications for this site in your browser settings, then try again.';
      } else if (error.message && error.message.includes('not supported')) {
        errorTitle = 'Not Supported';
        errorMessage = 'Push notifications are not supported in this browser.';
      }
      
      addNotification({
        type: 'error',
        title: errorTitle,
        message: errorMessage,
        icon: '❌'
      });
    }
  };

  const disablePushNotifications = async () => {
    try {
      await pushService.unsubscribe();
      setPushEnabled(false);
      addNotification({
        type: 'info',
        title: 'Push Notifications Disabled',
        message: 'You won\'t receive push notifications anymore.',
        icon: '🔕'
      });
    } catch (error) {
      console.error('Error disabling push notifications:', error);
    }
  };

  const clearBlogNotifications = () => {
    setNewBlogCount(0);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      addBlogNotification,
      newBlogCount,
      clearBlogNotifications,
      pushEnabled,
      pushSupported,
      enablePushNotifications,
      disablePushNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};