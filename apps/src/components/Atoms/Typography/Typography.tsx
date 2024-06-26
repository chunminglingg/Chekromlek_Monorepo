import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
interface TypoProps {
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  fontSize?: "header" | "title" | "caption" | "normal";
  color?: "primary" | "secondary" | "submit"|"categories"|"wearing" | "success" ;
  Inter?: "inter 28" | "inter 24" | "inter 20" | "inter 16" | "inter 14";
  Mulish?: "Regular 1" | "Regular 2" | "Regular 3" | "Regular 4";
}
const Typography: React.FC<TypoProps> = ({
  children,
  className,
  align = "center",
  fontSize = "normal",
  color = "primary",
  Inter = "inter 14",
  Mulish = "mulish",
}) => {
  const TypographyAlign = (align: string) => {
    switch (align) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
    }
  };
  const TypographyFontsize = (fontSize: string) => {
    switch (fontSize) {
      // 24 , 20 , 16 , 14
      case "header":
        return "font-bold text-[24px]";
      case "title":
        return "font-bold text-[20px]";
      case "caption":
        return "text-[16px]";
      default:
        return "normal text-[14px]";
    }
  };
  const TypographyColor = (color: string) => {
    switch (color) {
      case "primary":
        return "text-[#343a40]";
      case "secondary":
        return "text-gray-500";
      case "submit":
        return "text-white";
      case "wearing":
        return "text-red-500";  
      case "categories":
        return "text-purple-600"  
      case "maintenance":
        return "text-yellow-500"; 
      default:
        return "text-black";
    }
  };
  const TypographyFontInter = (Inter: string) => {
    switch (Inter) {
      case "inter 28":
        return "font-inter text-[28px]";
      case "inter 24":
        return "font-inter text-[24px]";
      case "inter 20":
        return "text-inter text-[20px]";
      case "inter 16":
        return "font-inter text-[16px]";
      case "inter 14":
        return "text-inter text-[14px]";
      default:
        return "font-inter ";
    }
  };
  const TypographyFontMulish = (Mulish: string) => {
    switch (Mulish) {
      case "Regular 1":
        return "font-mulish text-[24px]";
      case "Regular 2":
        return "text-inter text-[20px]";
      case "Regular 3":
        return "font-inter text-[16px]";
      case "Regular 4":
        return "text-inter text-[14px]";
      default:
        return "font-inter";
    }
  };

  const typographyAlignStyles = TypographyAlign(align);
  const TypographyFontStyles = TypographyFontsize(fontSize);
  const TypographyColorStyles = TypographyColor(color);
  const TypograpgyFont = TypographyFontInter(Inter);
  const TypograpgyFontMulish = TypographyFontMulish(Mulish);
  return (
    <p
      className={`${typographyAlignStyles} ${className} ${TypographyFontStyles} ${TypographyColorStyles} ${TypograpgyFont} ${TypograpgyFontMulish}`}
    >
      {children}
    </p>
  );
};
export { Typography };
