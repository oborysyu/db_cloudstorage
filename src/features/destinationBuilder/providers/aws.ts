import type { StorageProvider } from './types';
import { AwsIcon } from '../../../shared/icons/AwsIcon';

export const awsProvider: StorageProvider = {
  id: 'aws',
  label: 'AWS',
  icon: AwsIcon,

  fields: [
    {
      name: 'bucket',
      label: 'Bucket Name',
      type: 'text',
      required: true
    },
    {
      name: 'region',
      label: 'Region Name',
      type: 'select',
      required: true,
      options: [
        { label: 'US West (Oregon)', value: 'us-west-2' },
        { label: 'US East (N. Virginia)', value: 'us-east-1' }
      ]
    },
    {
      name: 'accessKeyId',
      label: 'Access Key ID',
      type: 'text',
      required: true
    },
    {
      name: 'secretAccessKey',
      label: 'Secret Access Key',
      type: 'password',
      required: true
    }
  ],

  buildDestination(values) {
    return {
      url: `s3://s3.${values.region}.amazonaws.com/${values.bucket}/folder`,
      key: values.accessKeyId,
      secret: values.secretAccessKey
    };
  }
};
