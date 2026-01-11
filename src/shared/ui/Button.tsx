interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  variant = 'secondary',
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={`db-button ${variant === 'primary' ? 'primary' : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};
