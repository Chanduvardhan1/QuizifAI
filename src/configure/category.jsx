import React from 'react'
import Navigation from "../navbar/navbar.jsx"
import { useState } from 'react';
import Plus from "../../src/assets/Images/dashboard/Plus.png";

const category = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen((prevState) => !prevState);
      };
  return (
    <div className='flex font-Poppins'>
    <Navigation/>

    <div className='w-[108px] h-[41px] absolute mt-[30px] rounded-[10px] bg-[#FFEDCD] end-24'>
    <div className="flex" onClick={toggleNavbar}>
                <img
                  className="w-[25px] h-[25px] ml-2 mt-2"
                  src={Plus}
                  alt="Plus Icon"
                />
                <a
                //   href="./create-quiz"
                  className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3"
                >
                  Category
                  
                </a>
              </div>
    </div>
    {isNavbarOpen &&(
   <div className='h-[60px] w-[900px] absolute top-[90px] left-[200px] rounded-md bg-slate-200 flex gap-[40px]'>
   <button className='bg-white rounded-3xl my-2 px-2 ml-[20px] text-[#9696BB]'>Category ID</button> 
   <button className='bg-white rounded-3xl my-2 px-2 text-[#9696BB] '>Category Name</button> 
   <button className='bg-white rounded-3xl my-2 px-2 text-[#9696BB]'>Parent Category</button> 
   <button className='bg-white rounded-3xl my-2 px-2 text-[#9696BB]'>Dropdown</button> 
   <button className='bg-gray-700 rounded-3xl my-2 px-6  text-white'>Add</button> 

    </div>
    )}
    

    <div className='w-full h-[50px] flex gap-[40px] ml-9 pt-3 pl-[20px] mt-[170px] text-center border bg-[#2a4e9c] text-white'>

      <div>Category id</div>
      <div className='h-[250px] w-[2px] mt-[37px] bg-slate-500'></div>
      <div>Category name</div>
      <div className='h-[250px] w-[2px] mt-[37px] bg-slate-500'></div>
      <div>Category description</div>
      <div className='h-[250px] w-[2px] mt-[37px] bg-slate-500'></div>
      <div>Parent category</div>
    </div>
    </div>

    
  )
}

export default category