// Push notification utilities
export class PushNotificationService {
  constructor() {
    this.vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HuWukzpOCmnLEPTjdGCmfykXmqfzuFhRreUaGn1lQ1wUsrPmWVlI7A_Rvs';
    this.isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    this.permission = Notification.permission;
  }

  // Check if push notifications are supported
  isNotificationSupported() {
    return this.isSupported;
  }

  async getPermissionStatus() {
    if (!this.isNotificationSupported()) {
      return 'unsupported';
    }
    return Notification.permission;
  }

  // Request permission for notifications
  async requestPermission() {
    if (!this.isSupported) {
      throw new Error('Push notifications are not supported in this browser');
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  // Register service worker
  async registerServiceWorker() {
    if (!this.isSupported) return null;

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      throw error;
    }
  }

  // Subscribe to push notifications
  async subscribe() {
    if (!this.isSupported) {
      throw new Error('Push notifications are not supported');
    }

    if (this.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) {
        throw new Error('Permission denied for notifications');
      }
    }

    const registration = await this.registerServiceWorker();
    if (!registration) {
      throw new Error('Service Worker registration failed');
    }

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
    });

    // Store subscription in localStorage for demo purposes
    // In production, send this to your server
    localStorage.setItem('pushSubscription', JSON.stringify(subscription));
    
    return subscription;
  }

  // Unsubscribe from push notifications
  async unsubscribe() {
    if (!this.isSupported) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        localStorage.removeItem('pushSubscription');
      }
    }
  }

  // Get current subscription
  async getSubscription() {
    if (!this.isSupported) return null;

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      return await registration.pushManager.getSubscription();
    }
    return null;
  }

  // Send push notification (for demo purposes)
  async sendNotification(title, body, icon = '/favicon.ico', badge = '/favicon.ico') {
    // In a real app, this would be done by your server
    // For demo purposes, we'll simulate it locally
    const subscription = await this.getSubscription();
    if (!subscription) {
      throw new Error('No active subscription found');
    }

    // Simulate server-side push notification
    // In production, your server would use the subscription to send notifications
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.showNotification(title, {
          body,
          icon,
          badge,
          vibrate: [200, 100, 200],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {
              action: 'explore',
              title: 'Read Now',
              icon: '/favicon.ico'
            },
            {
              action: 'close',
              title: 'Close',
              icon: '/favicon.ico'
            }
          ]
        });
      }
    }
  }

  // Helper function to convert VAPID key
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Check if user is subscribed
  async isSubscribed() {
    const subscription = await this.getSubscription();
    return !!subscription;
  }

  // Get permission status
  getPermissionStatus() {
    return this.permission;
  }
}

export const pushService = new PushNotificationService();