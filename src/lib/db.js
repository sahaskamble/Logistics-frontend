import { PB_URL } from '@/constants/url';
import PocketBase from 'pocketbase';

const pbclient = new PocketBase(PB_URL);

// Enable auto cancellation for better performance
pbclient.autoCancellation(false);

// Debug auth store changes in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  pbclient.authStore.onChange((token, record) => {
    console.log('PocketBase auth changed:', {
      token: token ? 'present' : 'missing',
      record: record ? record.id : 'missing',
      isValid: pbclient.authStore.isValid
    });
  });
}

export default pbclient;
