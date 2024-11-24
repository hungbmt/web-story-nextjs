// Button.tsx
import React from "react";
import "./Button.css"; // Import styles as needed
interface ButtonProps {
  label: string;
  icon: React.ReactNode | "";
  backgroundColor?: string;
  colorspan: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  backgroundColor = "white",
  colorspan = "white",
  size = "medium",
  onClick,
}) => {
  const buttonSize =
    size === "large"
      ? "btn-large"
      : size === "small"
      ? "btn-small"
      : "btn-medium";
  //

  return (
    <button
      className={`btn btn-joint ${buttonSize}`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <span style={{ color: colorspan }}>{label}</span>
      {icon}
    </button>
  );
};

export default Button;
