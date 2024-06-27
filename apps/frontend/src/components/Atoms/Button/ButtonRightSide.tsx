import React, { ReactNode } from "react";
import { Button } from "./Button";

interface ButtonRightSideProps {
  children: ReactNode;
}

const ButtonRightSide: React.FC<ButtonRightSideProps> = ({children}) => {
  return (
    <div>
      <Button className="w-[200px] h-[40px] rounded-lg border bg-none border-[#E9ECEF] text-[#6C757D] hover:bg-slate-100">
        {children}
      </Button>
    </div>
  );
};

export default ButtonRightSide;
