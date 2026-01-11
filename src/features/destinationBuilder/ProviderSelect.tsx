import { ChevronDownIcon } from '../../shared/icons/ChevronDownIcon';
import { BaseDropdown } from '../../shared/ui/BaseDropdown';
import type { StorageProvider } from './providers/types';

interface Props {
  value: StorageProvider;
  providers: StorageProvider[];
  onChange: (id: StorageProvider['id']) => void;
}

export const ProviderSelect = ({
  value,
  providers,
  onChange
}: Props) => {
  return (
    <BaseDropdown
      value={value}
      items={providers}
      onChange={p => onChange(p.id)}
      renderValue={p => (
        <div className="provider-select-value">
          {p.icon && <p.icon size={20} />}
          <span>{p.label}</span>
        </div>
      )}
      renderItem={p => (
        <>
          {p.icon && <p.icon size={20} />}
          <span>{p.label}</span>
        </>
      )}
    >
      <ChevronDownIcon />
    </BaseDropdown>
  );
};
