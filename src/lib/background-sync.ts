interface TicketPurchaseData {
  raffleId: string;
  quantity: number;
  multiplier?: number;
}

interface ProfileUpdateData {
  name?: string;
  email?: string;
  avatar?: string;
}

type SyncData = TicketPurchaseData | ProfileUpdateData;

interface SyncQueueItem {
  id: string;
  action: 'purchase-ticket' | 'update-profile';
  data: SyncData;
  timestamp: number;
}

class BackgroundSync {
  private readonly STORE_NAME = 'sync-queue';
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  private initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('background-sync-store', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async queueAction(action: SyncQueueItem['action'], data: SyncData): Promise<void> {
    if (!this.db) await this.initDB();

    const item: SyncQueueItem = {
      id: crypto.randomUUID(),
      action,
      data,
      timestamp: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.add(item);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        // Register for background sync if supported
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
            if ('sync' in registration) {
              (
                registration as ServiceWorkerRegistration & {
                  sync: { register: (tag: string) => Promise<void> };
                }
              ).sync.register('sync-queue');
            }
          });
        }
        resolve();
      };
    });
  }

  async processQueue(): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = async () => {
        const items: SyncQueueItem[] = request.result;

        for (const item of items) {
          try {
            // Process each action
            switch (item.action) {
              case 'purchase-ticket':
                if (this.isTicketPurchaseData(item.data)) {
                  await this.processPurchaseTicket(item.data);
                }
                break;
              case 'update-profile':
                if (this.isProfileUpdateData(item.data)) {
                  await this.processProfileUpdate(item.data);
                }
                break;
              // Add more cases as needed
            }

            // Remove processed item
            await this.removeFromQueue(item.id);
          } catch (error) {
            console.error('Error processing queue item:', error);
          }
        }
        resolve();
      };
    });
  }

  private async processPurchaseTicket(data: TicketPurchaseData): Promise<void> {
    try {
      const response = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to process ticket purchase');
    } catch (error) {
      throw new Error('Failed to process ticket purchase: ' + error);
    }
  }

  private async processProfileUpdate(data: ProfileUpdateData): Promise<void> {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update profile');
    } catch (error) {
      throw new Error('Failed to update profile: ' + error);
    }
  }

  private async removeFromQueue(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private isTicketPurchaseData(data: SyncData): data is TicketPurchaseData {
    return 'raffleId' in data && 'quantity' in data;
  }

  private isProfileUpdateData(data: SyncData): data is ProfileUpdateData {
    return (
      ('name' in data || 'email' in data || 'avatar' in data) &&
      !('raffleId' in data) &&
      !('quantity' in data)
    );
  }
}

export const backgroundSync = new BackgroundSync();
