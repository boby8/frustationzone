import { motion } from "motion/react";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  background?: "white" | "glass" | "transparent";
  border?: boolean;
  shadow?: boolean;
}

const Card = ({
  children,
  className = "",
  hover = false,
  padding = "md",
  background = "white",
  border = false,
  shadow = true,
}: CardProps) => {
  const baseClasses = "rounded-2xl transition-all duration-300";

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const backgroundClasses = {
    white: "bg-white",
    glass: "bg-white/80 backdrop-blur-sm",
    transparent: "bg-transparent",
  };

  const borderClasses = border ? "border border-gray-200" : "";
  const shadowClasses = shadow ? "shadow-lg" : "";
  const hoverClasses = hover ? "hover:scale-105 hover:shadow-xl" : "";

  const classes = `${baseClasses} ${paddingClasses[padding]} ${backgroundClasses[background]} ${borderClasses} ${shadowClasses} ${hoverClasses} ${className}`;

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={classes}>{children}</div>;
};

export default Card;
