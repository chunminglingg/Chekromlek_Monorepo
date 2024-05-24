import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  colorScheme?: "primary" | "secondary" | "warning" | "danger" | "success";
  colorOutline?:
    | "none"
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | "success";
  rounded?:
    | "none"
    | "base"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "full";
  onClick?: () => void; // Add onClick event handler
  type?:  "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = "md",
  rounded = "base",
  colorScheme = "",
  colorOutline = "",
  onClick, // Destructure onClick
  ...props
}) => {
  const sizeButton = (size: string) => {
    switch (size) {
      case "sm":
        return "py-1 px-2 text-xs";
      case "md":
        return "w-[100px] h-[41px] text-sm";
      case "lg":
        return "py-3 px-6 text-xl";
      default:
        return "w-[153px] h-[43px] text-base";
    }
  };

  const getColorSchemeClass = (colorScheme: string) => {
    switch (colorScheme) {
      case "primary":
        return "bg-[#4B9960]";
      case "secondary":
        return "bg-[#212529]";
      case "warning":
        return "bg-[#FFCC00]";
      case "danger":
        return "bg-[#FF3333]";
      case "success":
        return "bg-[#69B77E]";
      default:
        return "";
    }
  };

  const buttonOutline = (colorOutline: string) => {
    switch (colorOutline) {
      case "primary":
        return " border-2 border-[#4B9960]";
      case "secondary":
        return "border-2 border-[#212529]";
      case "warning":
        return "border-2 border-[#warning]";
      case "danger":
        return "border-2 border-[#dc2626]";
      case "success":
        return "border-2 border-[#69B77E]";
      default:
        return "outline-none";
    }
  };

  const ButtonRounded = (rounded: string) => {
    switch (rounded) {
      case "base":
        return "rounded";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "2xl":
        return "rounded-2xl";
      case "3xl":
        return "rounded-3xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-none";
    }
  };

  const sizeButtonStyle = sizeButton(size);
  const colorSchemeStyle = getColorSchemeClass(colorScheme);
  const colorButtonOutline = buttonOutline(colorOutline);
  const getButtonRounded = ButtonRounded(rounded);

  return (
    <div
      className={`flex justify-center items-center cursor-pointer ${getButtonRounded} ${colorSchemeStyle} ${sizeButtonStyle} ${colorButtonOutline} ${className}`}
      onClick={onClick} // Add onClick event handler
    >
      {children}
    </div>
  );
};

export { Button };
