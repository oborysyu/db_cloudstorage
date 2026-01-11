import { type StorageProvider } from './types';
import { GcpIcon } from '../../../shared/icons/GcpIcon';

export const gcpProvider: StorageProvider = {
  id: 'gcp',
  label: 'Google Cloud',
  icon: GcpIcon,
  fields: [
    { name: 'bucket', label: 'Bucket Name', type: 'text', required: true, colSpan: 2 },
    { name: 'accessKey', label: 'Access Key ID', type: 'text', required: true },
    { name: 'secretKey', label: 'Secret Access Key', type: 'password', required: true },
   ],
  buildDestination(values) {
    return {
      url: `s3://storage.googleapis.com/${values.bucket}/folder`,
      key: values.accessKey,
      secret: values.secretKey
    };
  }
};
