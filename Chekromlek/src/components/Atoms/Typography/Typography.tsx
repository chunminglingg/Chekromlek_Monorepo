import React, { ReactNode } from "react";
interface TypoProps{
  children?:ReactNode;
  className?:string;
  align?:"left"|"center"|"right";
  fontSize?:"header"|"title"|"caption"|"normal";
}
const Typography: React.FC<TypoProps> = ({children,className,align="left",fontSize="normal"}) => {
  const TypographyAlign=(align:string)=>{
    switch(align){
      case"left":
        return"text-left";
      case"center":
        return"text-center";
      case"right":
        return"text-right";
    }
  };
  const TypographyFont=(fontSize:string)=>{
    switch(fontSize){
      // 24 , 20 , 16 , 14
      case"header":
      return "font-bold text-[24px]";
      case"title":
        return "font-bold text-[20px]"; 
      case"caption":
        return "font-medium";
      default:
        return "normal text-[14px]";
    }
  }
  const typographyAlignStyles=TypographyAlign(align);
  const TypographyFontStyles=TypographyFont(fontSize);
  return (
   <p className={`${typographyAlignStyles} ${className} ${TypographyFontStyles}`}>{children}</p>
  );
};
export {Typography}




