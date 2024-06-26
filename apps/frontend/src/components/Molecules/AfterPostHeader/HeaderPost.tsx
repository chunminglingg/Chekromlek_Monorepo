import Image from 'next/image'
import React from 'react'


const HeaderPost = ({profile = "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833560.jpg?t=st=1718526844~exp=1718530444~hmac=e4f7b65274771e179c76e2204f15d6e2760c5c738f616ea27ea17e857b1954dc&w=740" } : {profile?: string}) => {
 
  return (
    <>
        <div className='flex flex-row gap-4 w-[663px] max-sm:w-[350px] h-[60px] items-center justify-between p-6 border border-slate-3000  shadow-sm rounded-xl mb-4'>
            <div className=''>
               <Image alt='profile' src={`${profile}`} width={50} height={40} className='rounded-full object-cover p-0 m-0' />
            </div>
            <div className='flex justify-start w-full'>
                <p className='text-gray-500'>Create a post...</p>
            </div>
            <div>
                <Image alt='createPost' src='/icons/post.svg' width={35} height={35} className='object-cover p-0 m-0 opacity-60' />
            </div>
        </div>
    </>
  )
}

export default HeaderPost