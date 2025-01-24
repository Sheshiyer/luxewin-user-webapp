interface NotificationData {
  url?: string;
  action?: 'open' | 'dismiss';
  id?: string;
  type?: 'raffle' | 'ticket' | 'profile' | 'system';
}

interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  data?: NotificationData;
}

class NotificationService {
  private readonly PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;
  private pushSubscription: PushSubscription | null = null;

  async init(): Promise<void> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return;
    }

    try {
      const permission = await this.requestPermission();
      if (permission === 'granted') {
        await this.subscribeToPush();
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  private async subscribeToPush(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service Worker not supported');
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // Get the push subscription
      let subscription = await registration.pushManager.getSubscription();

      // If no subscription exists, create one
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.PUBLIC_VAPID_KEY || ''),
        });
      }

      this.pushSubscription = subscription;

      // Send the subscription to your server
      await this.saveSubscription(subscription);
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  }

  private async saveSubscription(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        throw new Error('Failed to save push subscription');
      }
    } catch (error) {
      console.error('Error saving push subscription:', error);
      throw error;
    }
  }

  async sendNotification(payload: NotificationPayload): Promise<void> {
    if (Notification.permission !== 'granted') {
      throw new Error('Notification permission not granted');
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icons/icon-192x192.png',
        data: payload.data,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const notificationService = new NotificationService();
