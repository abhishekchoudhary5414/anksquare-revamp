import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  href?: string;
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  href,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const baseClass = `${styles.btn} ${styles[variant]}`;

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClass} ${className}`}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
