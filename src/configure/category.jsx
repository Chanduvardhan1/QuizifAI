import React from 'react'
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { useState } from 'react';
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png"
import Delete from "../../src/assets/Images/Assets/Delete.png"
import Line from "../../src/assets/Images/Assets/Line.png"
const category = () => {
 const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen((prevState) => !prevState);
      };
  return (
    <>
    <div className='fixed top-0 left-0 w-full min-h-screen z-10 '>
    <Navigation/> 
    </div>



    <div className='flex flex-col'>
    <div className='w-[118px] relative left-1 h-[41px] right-0 mt-[30px] rounded-[10px] bg-[#FFEDCD]'>
    <div className="flex" onClick={toggleNavbar}>
                <img
                  className="w-[25px] h-[25px] ml-2 mt-2"
                  src={Plus}
                  alt="Plus Icon"
                />
                <a
                  className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3"
                >
                  Category                
                </a>
              </div>
    </div>
    {isNavbarOpen &&(
     <div></div>
    )}
      <div className='h-[60px] mt-[100px] w-fit rounded-md bg-slate-200 flex gap-[15px]'>
   <button className='bg-white rounded-3xl my-2 px-2 text-[#9696BB]'>Category ID</button> 
   <button className='bg-white rounded-3xl my-2 px-2 text-[#9696BB] '>Category Name</button> 
   <button className='bg-white rounded-3xl my-2 px-2 text-[#9696BB]'>Parent Category</button> 
   <button className='bg-gray-700 rounded-3xl my-2 px-6  text-white'>Add</button> 
    </div>
     <div className='w-fit flex mt-[150px] pl-[15px] items-center h-[50px] border bg-[#2a4e9c] text-white gap-[20px] text-nowrap mr-auto'>
      <div className='flex'>
        <h1>Category Id</h1>
        <img className=' w-[7px] ml-[10px] relative left-[25px]' src={Line}/>
      </div>
      <div className='h-[250px] w-[2px] mt-[300px] bg-slate-500'></div>
      <div className='flex'>
        <h1>Category Name</h1>
        <img className=' w-[7px] relative left-[25px]' src={Line}/>
      </div>
      <div className='h-[250px] w-[2px] mt-[300px] bg-slate-500'></div>
      <div className='flex'>
        <h1>Category Description</h1>
        <img className=' w-[7px] relative left-[25px]' src={Line}/>
      </div>
      <div className='h-[250px] w-[2px] mt-[300px] bg-slate-500'></div>
      <div className='flex'>
        <h1>Parent Category</h1>
      <img className=' w-[7px] relative left-[25px]' src={Line}/>
      </div>
      <div className='h-[250px] w-[2px] mt-[300px] bg-slate-500'></div>
      <div className='flex gap-3'>
      <img className='h-[20px] w-[20px] mt-[120px]' src={Edit}/>
      <img className='h-[20px] w-[15px] mt-[120px] mr-3' src={Delete}/>
      </div>
    </div>
    </div>
 

 <LogoutBar className="fixed bottom-0 left-0 w-full z-10"  />

    </>
    
    

    
  )
}

export default category