import { motion } from "motion/react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
  className = "",
}: CheckboxProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const baseClasses =
    "rounded-full border-2 flex items-center justify-center transition-all cursor-pointer";
  const checkedClasses = checked
    ? "bg-green-500 border-green-500 text-white"
    : "border-gray-300 hover:border-green-500";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${sizeClasses[size]} ${checkedClasses} ${disabledClasses} ${className}`;

  return (
    <div className="flex items-center space-x-3">
      <motion.button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={classes}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.9 } : {}}
      >
        {checked && "✓"}
      </motion.button>
      {label && (
        <label
          className={`text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
