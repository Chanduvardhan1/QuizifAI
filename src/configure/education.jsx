import React, { useEffect } from 'react'
import Navigation from "../navbar/navbar.jsx"
import { useState } from 'react';
import Course from './course.jsx';
import Specialisations from './specialisations.jsx';
import Classes from './classes.jsx';
import Subjects from './subjects.jsx';
import close from "../../src/assets/Images/images/dashboard/cancel.png"
import { useNavigate } from "react-router-dom";


const education = () => {

  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();


//----------------** activeTab **----------------//
const [activeTab, setActiveTab] = useState('Course');

const handleTabClick = (tab) => {
  setActiveTab(tab);
};
//----------------**activeTab end**----------------//
const handleBack = () => {
  navigate("/configure")
};

  return (
    <>
    <div className='flex w-full'>
    <Navigation/> 
    <div className='flex w-full flex-col p-5 bg-[#f5f5f5] pt-12'>
<div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
    <div className="flex w-full bg-[#eedbe5] px-2 pt-2 font-semibold rounded-t-lg">
      <button
        onClick={() => handleTabClick('Course')}
        className={`w-full px-4 py-2 ${
          activeTab === 'Course' ? 'bg-gray-100 text-[#214082] rounded-t-lg' : 'bg-[#F7E3DC] text-[#214082] rounded-lg'
        }`}
      >
       Create Course 
      </button>
      <button
        onClick={() => handleTabClick('Specializations')}
        className={`w-full px-4 py-2 ${ activeTab === 'Specializations' ? 'bg-gray-100 text-[#214082] rounded-t-lg' : 'bg-[#F7CEE2] text-[#214082] rounded-lg'}`}
      >
       Create Specializations
      </button>
      <button
        onClick={() => handleTabClick('Classes')}
        className={`w-full px-4 py-2 ${
          activeTab === 'Classes' ? 'bg-gray-100 text-[#214082] rounded-t-lg' : 'bg-[#CCCAF0] text-[#214082] rounded-lg'
        }`}
      >
    Create Classes and Sections
      </button>
      <button
        onClick={() => handleTabClick('Subjects')}
        className={`w-full px-4 py-2 ${
          activeTab === 'Subjects' ? 'bg-gray-100 text-[#214082] rounded-t-lg' : 'bg-[#CFDFEF] text-[#214082]'
        }`}
      >
      Create Subjects
      </button>
    </div>


    {activeTab === 'Course' && (
      <>
      <Course/>
      </>
    )}
    {activeTab === "Specializations" && (
      <>
      <Specialisations/>
      </>
    )}
     {activeTab === 'Classes' && (
      <>
      <Classes/>
      </>
    )}
    {activeTab === "Subjects" && (
      <>
      <Subjects/>
      </>
    )}
    
     
    </div>
    

    </div>
    </>
    
    

    
  )
}

export default education