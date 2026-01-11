export type ProviderId = "aws" | "gcp" ;

export type FieldType = 'text' | 'password' | 'select';

export interface ProviderField {
  name: string;
  label: string;
  required?: boolean;
  type: FieldType;
  options?: { label: string; value: string }[];
  colSpan?: 1 | 2;
}

export interface StorageProvider {
  id: ProviderId;
  label: string;
  icon?: React.FC<{ size?: number }>;
  fields: ProviderField[];
  buildDestination(values: Record<string, string>): {
    url: string;
    key: string;
    secret: string;
  };
}
