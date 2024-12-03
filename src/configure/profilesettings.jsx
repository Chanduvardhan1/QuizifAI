import React, { useEffect } from 'react'
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from 'react';
import Switch from "react-switch";
import { useNavigate } from 'react-router-dom';
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png"
import Delete from "../../src/assets/Images/Assets/Delete.png"
import Line from "../../src/assets/Images/Assets/Line.png"
import { RiDeleteBinLine } from "react-icons/ri";
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import camera1 from "../../src/assets/Images/dashboard/edit.png"

const profilesettings = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryFlag, setParentCategoryFlag] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [courseShortName, setCourseShortName] = useState('');
  const [CourseId, setCourseId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [classId, setClassId] = useState('');
  const userId = localStorage.getItem("user_id");
  const [specializationName, setSpecializationName] = useState('');
  const [specializationShortName, setSpecializationShortName] = useState('');
  const [specializationId, setSpecializationId] = useState('');


  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }

  
  
  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='w-full p-5 bg-[#f5f5f5]'>
  <div className='flex gap-5 bg-white p-5 rounded-lg'>
 <div>
  <h2 className='text-[#214082] font-semibold'>Organization Settings : 
  </h2>
 </div>
 <div className='flex gap-2 flex-col'>
 <div className='flex justify-start items-center'>
<h1 className='text-[#214082] font-semibold'>Create public Quizzes</h1>
<input type="checkbox" name="" className='w-[12px] ml-[19px]  h-[12px]' id="" />
  </div>
  <div className='flex justify-start items-center'>
<h1 className='text-[#214082] font-semibold '>public Quizzes Access</h1>
<input type="checkbox" name="" className='w-[12px] ml-[19px] h-[12px]' id="" />
  </div>

  <div className='flex justify-normal items-center'>
    <div className='text-[#214082] font-semibold'>
      Login Method :
    </div>
    <div className='flex justify-center items-center'>
      <input type="checkbox" className='w-[12px] mx-2 ml-[70px] h-[12px]' name="" id="" />
      <h1 className='text-[#214082] font-semibold'>Email</h1>
    </div>
    <div className='flex justify-center items-center'>
      <input type="checkbox" className='w-[12px] mx-2 h-[12px]' name="" id="" />
      <h1 className='text-[#214082] font-semibold'>Mobile</h1>
    </div>
  </div>
  <div>
    <button className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]" >
    print
    </button>
  </div>
 </div>
  </div>

    </div>
    </div>
    </>
    
    

    
  )
}

export default profilesettings