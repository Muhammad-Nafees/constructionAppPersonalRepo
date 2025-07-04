import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  return (
    <button type={type}
      className={`inline-flex items-center justify-center gap-2 transition ${className} ${sizeClasses[size]
        }  ${disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
