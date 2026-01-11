import { useMemo, useRef, useState } from 'react';
import { PROVIDERS } from './providers';
import type { ProviderId, StorageProvider } from './providers/types';
import { ProviderFormScreen } from './ProviderFormScreen';
import { ProviderSelectScreen } from './ProviderSelectScreen';
import { useContainerWidth } from '../../shared/hooks/useContainerWidth';
import { mockBackendValidation } from './utils/mockBackendValidation';

import './styles.css';

type Step = 'select' | 'form';

export const DestinationBuilder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useContainerWidth(containerRef as React.RefObject<HTMLDivElement>);
  const isMobile = width < 500;

  const [step, setStep] = useState<Step>('select');
  const [providerId, setProviderId] = useState<ProviderId | null>(null);

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resultJson, setResultJson] = useState<Record<string, string> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const provider: StorageProvider | undefined = useMemo(
    () => PROVIDERS.find(p => p.id === providerId),
    [providerId]
  );

  /* -------------------- handlers (can be moved to a separate file) -------------------- */

  const handleProviderSelect = (id: ProviderId) => {
    setProviderId(id);
    setValues({});
    setErrors({});
    setResultJson(null);
    setStep('form');
  };

  const handleValueChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateFrontend = (): boolean => {
    if (!provider) return false;

    const formErrors: Record<string, string> = {};

    provider.fields.forEach(field => {
      const value = values[field.name];

      if (field.required && !value) {
        formErrors[field.name] = 'Required field';
      }

      // example custom frontend validation
      if (field.name === 'bucket' && value?.includes('a')) {
        formErrors[field.name] = 'Bucket must not contain letter "a"';
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!provider) return;

    setResultJson(null);

    if (!validateFrontend()) return;

    setSubmitting(true);

    const backendError = await mockBackendValidation(values);

    if (backendError) {
      setErrors({ [backendError.field]: backendError.message });
      setSubmitting(false);
      return;
    }

    const destination = provider.buildDestination(values);
    setResultJson(destination);
    setSubmitting(false);
  };

  const handleCancel = () => {
    setStep('select');
    setProviderId(null);
    setValues({});
    setErrors({});
    setResultJson(null);
  };

  return (
    <div
      ref={containerRef}
      className="db-container"
      data-mobile={isMobile}
    >
      <h1 className="db-title">Third-Party Storage</h1>
      <div className="db-label">Choose Provider</div>
      {step === 'select' && (
        <ProviderSelectScreen
          providers={PROVIDERS}
          selectedProviderId={providerId}
          onSelect={handleProviderSelect}
        />
      )}

      {step === 'form' && provider && (
        <ProviderFormScreen
          provider={provider}
          providers={PROVIDERS}
          values={values}
          errors={errors}
          submitting={submitting}
          resultJson={resultJson}
          onChange={handleValueChange}
          onProviderChange={handleProviderSelect}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
