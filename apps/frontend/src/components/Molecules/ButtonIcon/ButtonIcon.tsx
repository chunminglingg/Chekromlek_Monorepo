import React, { ReactNode } from 'react'
import Image from 'next/image'
interface ButtonIconProps{
    children?:ReactNode,
    icon:string
}
const ButtonIcon:React.FC<ButtonIconProps> = ({children,icon}) => {
  return (
    <div className='flex justify-center items-center'>
     <Image src={icon} alt="categories-icon" width={20} height={20} />
     {children}
    </div>
  )
}

export default ButtonIcon
