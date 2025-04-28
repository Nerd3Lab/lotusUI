import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string; // Iconify icon name
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string; // Add extra classes if needed
}

const Button = ({
  children,
  onClick,
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) => {
  const baseStyle =
    'flex items-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 cursor-pointer';
  const sizeStyle = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  const variantStyle = {
    primary: 'bg-cyan-500 text-white hover:bg-cyan-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        baseStyle,
        sizeStyle[size],
        variantStyle[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {loading ? (
        <Icon icon="line-md:loading-loop" className="animate-spin text-xl" />
      ) : icon ? (
        <Icon icon={icon} className="text-xl" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
