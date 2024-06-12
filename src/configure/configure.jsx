import React from 'react'
import { useNavigate } from "react-router-dom";
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";



const configure = () => {
    const navigate = useNavigate();
    const navigatetocategory = () =>{
     navigate('/category');   
    }
  return (
    <div className='flex font-Poppins'>
        <Navigation/>
        <div className='flex-1 flex mt-[20px] flex-col'>
        <h1 className='mt-[20px] ml-[20px] font-Poppins font-semibold text-[#214082] text-[18px]'>All Settings</h1>
       <div className='flex gap-[80px] mt-[60px] ml-[15px] mr-[10px]'>

        <div className='h-[300px] w-[200px] bg-[#F5F5F5] rounded-md shadow-sm'>
            <h1 className='text-[16px] underline underline-offset-4 cursor-pointer font-medium hover:no-underline text-center pt-2'>Configuration</h1>
            <button onClick={navigatetocategory} className='cursor-pointer mt-4 text-[12px] ml-11'>Categories</button>
            <p className='mt-3 text-[12px] ml-11'>Cources</p>
        </div>
        {/* <div className='h-[250px] w-[2px] bg-slate-500'></div> */}
        <div className='h-[300px] w-[200px] bg-[#F5F5F5] rounded-md '>
            <h1 className='text-[16px] underline underline-offset-4 cursor-pointer font-medium hover:no-underline text-center pt-2'>Subscription</h1>
        </div>
        {/* <div className='h-[250px] w-[2px] bg-slate-500'></div> */}
        <div className='h-[300px] w-[200px] bg-[#F5F5F5] rounded-md'>
            <h1 className='text-[16px] underline underline-offset-4 cursor-pointer font-medium hover:no-underline text-center pt-2'>Notification</h1>
        </div>
       </div>
        </div>
       <LogoutBar /> 
    </div>
  )
}

export default configure