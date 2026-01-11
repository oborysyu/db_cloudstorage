import { Button } from '../../shared/ui/Button';
import { Input } from '../../shared/ui/Input';
import { Select } from '../../shared/ui/Select';
import type { StorageProvider } from './providers/types';
import { ProviderSelect } from './ProviderSelect';

interface Props {
  provider: StorageProvider;
  providers: StorageProvider[];
  values: Record<string, string>;
  errors: Record<string, string>;
  submitting: boolean;
  resultJson: string | null;
  onChange: (name: string, value: string) => void;
  onProviderChange: (id: StorageProvider['id']) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const ProviderFormScreen = ({
  provider,
  providers,
  values,
  errors,
  submitting,
  resultJson,
  onChange,
  onProviderChange,
  onCancel,
  onSubmit
}: Props) => {
  return (
    <div className="db-grid two-columns">
      <div style={{ gridColumn: '1 / -1' }}>
        <ProviderSelect
          value={provider}
          providers={providers}
          onChange={onProviderChange}
        />
      </div>

      {provider.fields.map(field => {
        const style =
          field.colSpan === 2
            ? { gridColumn: '1 / -1' }
            : undefined;
        if (field.type === 'select') {
          return (
            <div key={field.name} style={style}>
              <Select
                label={field.label}
                value={values[field.name] ?? ''}
                options={field.options ?? []}
                error={errors[field.name]}
                onChange={v => onChange(field.name, v)}
              />
            </div>
          );
        }

        return (
          <div key={field.name} style={style}>
            <Input
              label={field.label}
              type={field.type}
              value={values[field.name] ?? ''}
              error={errors[field.name]}
              onChange={v => onChange(field.name, v)}
            />
          </div>
        );
      })}

      <div className="db-actions" style={{ gridColumn: '1 / -1' }}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? 'Saving…' : 'Save'}
        </Button>
      </div>

      {resultJson && (
        <pre className="db-result" style={{ gridColumn: '1 / -1' }}>
          <code>{JSON.stringify(resultJson, null, 2)}</code>
        </pre>
      )}
    </div>
  );
};
