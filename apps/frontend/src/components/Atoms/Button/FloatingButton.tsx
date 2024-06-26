// import React, { ReactNode } from 'react'
// interface FloatingButtonProps{
//     children: ReactNode;
//     className?: string;
//     position?: 'top-left' | 'top-right '| 'bottom-left' | 'bottom-right';
//     onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
// }

// const FloatingButton:React.FC<FloatingButtonProps> = ({children,onClick, position = "top-left",className}) => {
//     const align = (position: string) => {
//         switch (position) {
//           case "top-right":
//             return "top-15 right-5";
//           case "top-left":
//             return "top-10 left-5";
//           case "bottom-right":
//             return "bottom-5 right-5";
//           case "bottom-left":
//             return "bottom-5 left-5";
//           default:
//             return "top-5 left-5";
//         }
//       };
//       const alignButtonStyle = align(position);
//     const styleButton = `${alignButtonStyle} ${className} fixed bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out `
//   return (
//     <div>
//       <button className={styleButton} onClick={onClick}>{children}  </button>
//     </div>
//   )
// }

// export default FloatingButton;

