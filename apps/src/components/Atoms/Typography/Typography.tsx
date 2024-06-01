import React, { ReactNode } from "react";
import { Inter, Mulish } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface TypoProps {
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  fontSize?: "header" | "title" | "caption" | "normal";
  color?: "primary" | "secondary" | "submit" | "wearing";
  Inter?: "inter 28" | "inter 24" | "inter 20" | "inter 16" | "inter 14";
  Mulish?: "Regular 24" | "Regular 20" | "Regular 16" | "Regular 14";
}

const Typography: React.FC<TypoProps> = ({
  children,
  className,
  align = "center",
  fontSize = "normal",
  color = "primary",
  Inter = "inter 14",
  Mulish = "Regular 14",
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
        return "text-black";
      case "secondary":
        return "text-gray-500";
      case "submit":
        return "text-white";
      case "wearing":
        return "text-red-500";
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
        return "font-inter text-[20px]";
      case "inter 16":
        return "font-inter text-[16px]";
      case "inter 14":
        return "font-inter text-[14px]";
      default:
        return "font-inter";
    }
  };

  const TypographyFontMulish = (Mulish: string) => {
    switch (Mulish) {
      case "Regular 24":
        return "font-mulish text-[24px]";
      case "Regular 20":
        return "font-mulish text-[20px]";
      case "Regular 16":
        return "font-mulish text-[16px]";
      case "Regular 14":
        return "font-mulish text-[14px]";
      default:
        return "font-mulish";
    }
  };

  const typographyAlignStyles = TypographyAlign(align);
  const TypographyFontStyles = TypographyFontsize(fontSize);
  const TypographyColorStyles = TypographyColor(color);
  const TypograpgyFontInter = TypographyFontInter(Inter);
  const TypograpgyFontMulish = TypographyFontMulish(Mulish);

  return (
    <p
      className={`${typographyAlignStyles} ${className} ${TypographyFontStyles} ${TypographyColorStyles} ${TypograpgyFontInter} ${TypograpgyFontMulish} ${inter.className} ${mulish.className}`}
    >
      {children}
    </p>
  );
};

export { Typography };
