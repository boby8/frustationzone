import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type?: "success" | "error" | "warning" | "info";
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = ({
  children,
  type = "info",
  className = "",
  dismissible = false,
  onDismiss,
}: AlertProps) => {
  const baseClasses = "px-4 py-3 rounded-xl border";

  const typeClasses = {
    success: "bg-green-100 border-green-300 text-green-700",
    error: "bg-red-100 border-red-300 text-red-700",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-700",
    info: "bg-blue-100 border-blue-300 text-blue-700",
  };

  const classes = `${baseClasses} ${typeClasses[type]} ${className}`;

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">{children}</div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Alert;
