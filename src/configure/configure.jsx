import React from 'react'
import Navigation from "../navbar/navbar.jsx"

const configure = () => {
  return (
    <div className='flex font-Poppins'>
        <Navigation/>
        <h1 className='mt-[105px] ml-[90px] font-Poppins font-semibold text-[#214082] text-[18px]'>Configure</h1>
       <div className='flex gap-[80px] mt-[180px] -ml-[90px]'>
        <div>
            <h1 className='text-[16px] underline underline-offset-4 cursor-pointer font-medium hover:no-underline'>Configuration</h1>
            <a href='/category' className='mt-3 cursor-pointer text-[12px]'>Categories</a>
            <p className='mt-3 text-[12px]'>Cources</p>
        </div>
        <div className='h-[250px] w-[2px] bg-slate-500'></div>
        <div>
            <h1 className='text-[16px] underline underline-offset-4 cursor-pointer font-medium hover:no-underline'>Subscription</h1>
        </div>
        <div className='h-[250px] w-[2px] bg-slate-500'></div>
        <div>
            <h1 className='text-[16px] underline underline-offset-4 cursor-pointer font-medium hover:no-underline'>Notification</h1>
        </div>
       </div>
    </div>
  )
}

export default configure