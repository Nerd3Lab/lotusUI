import { useEffect, useState } from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  error?: string;
  label?: string;
  required?: boolean;
  type?: 'text' | 'number';
}

function Input({
  value,
  onChange,
  placeholder = 'input',
  className = '',
  inputClassName = '',
  error,
  label,
  required = false,
  type = 'text',
}: InputProps) {
  const [search, setSearch] = useState<string>(value);
  const [displayError, setDisplayError] = useState<string | undefined>(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (displayError) {
      setDisplayError('');
    }
    onChange(e);
  };

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor="input" className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-cyan-600">*</span>}
        </label>
      )}
      <div
        className={`flex items-center gap-2 border ${
          displayError ? 'border-red-500' : 'border-gray-300'
        } rounded-xl px-4 py-2 cursor-pointer text-gray-500 transition-colors duration-200 focus-within:border-brand-500 ${inputClassName}`}
      >
        <input
          id="input"
          type={type}
          value={search}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className="border-0 outline-none text-gray-800 flex-1 bg-transparent"
        />
      </div>
      {displayError && (
        <div className="text-red-500 text-sm mt-1">{displayError}</div>
      )}
    </div>
  );
}

export default Input;
