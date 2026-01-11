import { BaseDropdown } from './BaseDropdown';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  error?: string;
  onChange: (value: string) => void;
}

export const Select = ({
  label,
  value,
  options,
  error,
  onChange
}: Props) => {
  const selected = options.find(opt => opt.value === value) ?? null;

  return (
    <div className="ui-field">
      <label className="ui-label">{label}</label>

      <BaseDropdown
        value={selected}
        items={options}
        onChange={opt => onChange(opt.value)}
        renderValue={opt => <span>{opt.label}</span>}
        renderItem={opt => <span>{opt.label}</span>}
      >
        <ChevronDownIcon />
      </BaseDropdown>

      {error && <div className="ui-error">{error}</div>}
    </div>
  );
};
