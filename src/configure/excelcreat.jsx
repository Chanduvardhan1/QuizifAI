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
import close from "../../src/assets/Images/images/dashboard/cancel.png"

const excelcreat = () => {
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

  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      progress: Math.floor(Math.random() * 100), // Mocking upload progress
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }
  const handleBack = () => {
    navigate("/configure")
  };
  
  const [activeTab, setActiveTab] = useState('Upload');
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='w-full p-5'>
  
    <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
    <div className="flex"> 
      <h1 className=" font-semibold text-[20px] text-[#214082]">Create Bulk Numbers of Users</h1>
    </div>
  

    {/* <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50"> */}
      <div className="bg-white shadow-lg rounded-md w-full">
       

        {/* Progress Steps */}

        <div className="flex w-full  font-semibold rounded-lg">
      <button
        onClick={() => handleTabClick('Upload')}
        className={`w-full px-4 py-2 ${
          activeTab === 'Upload' ? 'bg-gray-100 text-[#214082] rounded-lg' : 'bg-[#F7E3DC] text-[#214082] rounded-lg'
        }`}
      >
       Upload
      </button>
      <button
        onClick={() => handleTabClick('Preview')}
        className={`w-full px-4 py-2 ${ activeTab === 'Preview' ? 'bg-gray-100 text-[#214082] rounded-lg' : 'bg-[#F7CEE2] text-[#214082] rounded-lg'}`}
      >
       Preview & Edit
      </button>
     
      <button
        onClick={() => handleTabClick('Import')}
        className={`w-full px-4 py-2 ${
          activeTab === 'Import' ? 'bg-gray-100 text-[#214082] rounded-lg' : 'bg-[#CFDFEF] text-[#214082] rounded-lg'
        }`}
      >
      Import
      </button>
    </div>
    {activeTab === 'Upload' && (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  <div className="container mx-auto p-8">
  <div className="mt-6 text-left text-gray-600 space-y-2 text-sm">
            <p>1. Download the template file and fill in the required data.</p>
            <p>2. Once completed, upload the file using the form provided and submit it.</p>
            <p>3. Use the correct IDs for users, teams, and sprints.</p>
            <p>4. Separate multiple items with commas.</p>
          </div>
    <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">
      {/* Upload Section */}
      
      <div className="w-1/2 p-6 border-2 border-dashed border-blue-400 rounded-lg flex flex-col items-center">
   
        <div className="text-blue-500 text-4xl mb-4">
          <i className="fas fa-upload"></i>
        </div>
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer mb-4"
        >
          Browse
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
        <p className="text-gray-500 text-sm mb-2">Drop a file here</p>
        <p className="text-red-500 text-xs">
          *File supported: .png, .jpg, & .webp
        </p>
      </div>

      {/* Uploaded Files Section */}
      <div className="w-1/2">
        <h2 className="text-lg font-bold mb-4">Uploaded files</h2>
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between border border-gray-200 p-4 rounded shadow-sm"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-500 p-2 rounded mr-4">
                  <i className="fas fa-file-image"></i>
                </div>
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <div className="flex items-center gap-4">
                {file.progress !== undefined ? (
                  <div className="relative w-24">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-1 bg-blue-500 rounded-full"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                    <span className="absolute top-0 left-0 text-xs text-gray-600">
                      {file.progress}%
                    </span>
                  </div>
                ) : null}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(file.name)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>
    )}

      
      {/* </div> */}
    </div>








    {/* <div className="flex  justify-center p-1"> 
        <div  className="p-2 px-4 border border-gray-500">

      <h1 className=" font-semibold text-[20px] text-[#214082]">Bulk user Import</h1>
        </div>
    </div>
    <div className='flex  justify-center '>

<p>Download Template</p>
  </div>

  <div className="flex  justify-center mt-20"> 
        <div  className="p-2 px-4 border border-gray-500">

      <h1 className=" font-semibold text-[20px] text-[#214082]">Upload File</h1>
        </div>
    </div>

      <div className='flex justify-end px-10'>
      <button
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
            >
              Proceed
            </button>
      </div> */}
     
 

    
     
    </div>
    </div>
    </>
    
    

    
  )
}

export default excelcreat