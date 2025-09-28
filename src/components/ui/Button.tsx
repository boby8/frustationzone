import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  RocketLaunchIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
  icon?:
    | "rocket"
    | "arrow-right"
    | "check"
    | "x-mark"
    | "pencil"
    | "trash"
    | "plus";
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  fullWidth = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg focus:ring-blue-500",
    secondary:
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg focus:ring-purple-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    outline:
      "border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white focus:ring-purple-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-8 py-4 text-lg",
  };

  const widthClasses = fullWidth ? "w-full" : "";
  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`;

  const iconMap = {
    rocket: RocketLaunchIcon,
    "arrow-right": ArrowRightIcon,
    check: CheckIcon,
    "x-mark": XMarkIcon,
    pencil: PencilIcon,
    trash: TrashIcon,
    plus: PlusIcon,
  };

  const IconComponent = icon ? iconMap[icon] : null;
  const iconSize =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileHover={!disabled && !loading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
    >
      <span className="flex items-center justify-center gap-2">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {icon && iconPosition === "left" && IconComponent && (
              <IconComponent className={iconSize} />
            )}
            {children}
            {icon && iconPosition === "right" && IconComponent && (
              <IconComponent className={iconSize} />
            )}
          </>
        )}
      </span>
    </motion.button>
  );
};

export default Button;
