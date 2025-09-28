interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
  error,
  className = "",
  autoComplete,
  minLength,
  maxLength,
  onKeyPress,
}: InputProps) => {
  const baseClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const errorClasses = error ? "border-red-300 focus:ring-red-500" : "";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={classes}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        onKeyPress={onKeyPress}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
