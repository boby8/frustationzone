interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
  error,
  className = "",
  rows = 3,
  maxLength,
  onKeyPress,
}: TextareaProps) => {
  const baseClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none";
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
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={classes}
        rows={rows}
        maxLength={maxLength}
        onKeyPress={onKeyPress}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
