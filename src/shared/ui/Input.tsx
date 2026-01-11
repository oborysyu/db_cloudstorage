import { useState } from 'react';
import { EyeIcon } from '../icons/EyeIcon';

interface Props {
  label: string;
  value: string;
  type?: 'text' | 'password';
  error?: string;
  onChange: (value: string) => void;
}

export const Input = ({
  label,
  value,
  type = 'text',
  error,
  onChange
}: Props) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="ui-field">
      <label className="ui-label">{label}</label>

      <div className="ui-input-wrapper">
        <input
          className="ui-input"
          type={isPassword && !visible ? 'password' : 'text'}
          value={value}
          onChange={e => onChange(e.target.value)}
        />

        {isPassword && (
          <button
            type="button"
            className="ui-eye"
            onClick={() => setVisible(v => !v)}
            aria-label="Toggle password visibility"
          >
            <EyeIcon />
          </button>
        )}
      </div>

      {error && <div className="ui-error">{error}</div>}
    </div>
  );
};
