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

const profileorganization = () => {
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
 
  const [showsave, setShowsave] = useState(false);
  const [showcancel, setShowcancel] = useState(false);


  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }

  const handleedit = () =>{
    setShowsave(true);
  }
  const handleeditback = () =>{
    setShowsave(false);
  }
  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='w-full p-5'>
        <div>
            <h1 className=' font-semibold text-[#EF5130] mb-2'>Oeganization Profile</h1>
        </div>
  <div className='flex gap-5'>
  <div className="relative w-[100px] h-[100px]">
        <img
          src={defaultPhoto}
          alt="Profile"
          className="w-[100px] h-[100px] rounded-xl"
        />
        <div 
          className="absolute bottom-0 right-0 rounded-full cursor-pointer"
        //   onClick={openModal}
        >
         <img src={camera1} alt="" className="w-[20px] h-[20px]"/>
        </div>
        <div className='flex justify-center'>Logo</div>
      </div>
    <div className='w-[70%] flex flex-col gap-5'>
    <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization ID<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization ID"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Website URL</label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Website URL"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Type<span className="text-red-500">*</span></label>
        <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        //   value={selectedComplexity}
        //   onChange={handleSelectComplexity}
        >
          <option value="" disabled>Institations</option>
          {/* {complexities.map((complexity, index) => (
            <option key={index} value={complexity}>
              {complexity}
            </option>
          ))} */}
        </select>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Description</label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Description"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Address<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization admin Name"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className='flex gap-2 w-full'>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[69%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin ID<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Admin ID"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Admin Name"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>
     

      <div className='flex gap-2 w-full'>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[69%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin Mobile<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Mobile"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin Email<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Email"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>

     
            
            {showsave ?  (
                   
                   <div className="flex justify-end gap-[10px] md:col-span-2">

                   <button
                     onClick={handleeditback}
                     className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
       
                   >
                     Cancel
                   </button>  
                    <button
                    //   onClick={handleNextpage1}
                      className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
        
                    >
                      Save
                    </button>
                    </div>
            ) :(
                <div className="flex justify-end gap-[10px] md:col-span-2">

                <button
                           onClick={handleedit}
                              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
                
                            >
                              Edit
                            </button>
                                 </div>
            )
        }
           
          
    </div>
  </div>

    </div>
    </div>
    </>
    
    

    
  )
}

export default profileorganization