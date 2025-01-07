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
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import Template from "../../src/assets/Tamplate/bulk_user_upload_template.xlsx" 


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

  const handleFileUpload1 = (event) => {
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


  //------------------**File uploaded **----------------------//
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id",userId );

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("No authentication token found");
        return;
      }
      const response = await fetch("https://dev.quizifai.com:8010/import-bulk-users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      setResponseData(result);
      if (response.ok) {
        setMessage("File uploaded successfully!");
      } else {
        setMessage(result.response_message || "File upload failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during file upload.");
    }
  };
    //------------------**File uploaded End**----------------------//

    const handleDownloadTemplate = () => {
      const templateUrl = "/assets/templates/bulk_user_upload_template.xlsx";
      const link = document.createElement("a");
      link.href = templateUrl;
      link.download = "bulk_user_upload_template.xlsx";
      link.click();
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
      <h1 className=" font-semibold text-[20px] text-[#214082]">Create Bulk Users</h1>
    </div>
  

    {/* <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50"> */}
      <div className="bg-white shadow-lg rounded-md w-full">
       

        {/* Progress Steps */}

        {/* <div className="flex w-full  font-semibold rounded-lg">
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
    </div> */}
    {/* {activeTab === 'Upload' && ( */}
        <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md rounded-md p-6">
          <h1 className="text-lg font-bold mb-4 text-[#214082]">
            Import Data From Excel Sheet
          </h1>
  
          {/* File Upload Section */}
          <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={handleDownloadTemplate}
            className="text-blue-600 underline text-sm"
          >
            Download Template
          </button>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full sm:max-w-md"
            />
            <button
              onClick={handleFileUpload}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
            >
              Upload
            </button>
          </div>
  
          {/* Message */}
          {message && (
            <div
              className={`mt-4 p-2 rounded-md ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
  
          {/* Success Table */}
          {responseData && responseData.data?.successful_imports.length > 0 && (
            <div className="mt-8">
              <h2 className="text-green-600 font-bold mb-4">Successful Imports</h2>
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.data.successful_imports.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-300 px-4 py-2">{user.first_name}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.last_name}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
  
          {/* Failed Table */}
          {responseData && responseData.data?.failed_users.length > 0 && (
            <div className="mt-8">
              <h2 className="text-red-600 font-bold mb-4">Failed Imports</h2>
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.data.failed_users.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-300 px-4 py-2">{entry.user.first_name}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.user.last_name}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{entry.error}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    {/* )} */}
    {/* {activeTab === 'Upload' && (
  <div className=" bg-gray-50 flex items-center justify-center">
  <div className="container mx-auto p-8">
  <div className="mt-6 text-left text-gray-600 space-y-2 text-sm pb-6">
            <p>1. Download the template file and fill in the required data.</p>
            <p>2. Once completed, upload the file using the form provided and submit it.</p>
            <p>3. Use the correct IDs for users, teams, and sprints.</p>
            <p>4. Separate multiple items with commas.</p>
          </div>
    <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">
      
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
    )} */}
{/* {activeTab === 'Preview' && ( */}
  {/* <div className='w-full p-2'>
 <table className='w-full table-auto rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[14px] font-light'>
 <thead>
   <tr className='h-[50px]'>
     <th className='px-4 py-2 text-nowrap'>ID</th>
     <th className='pl-[10px] ml-[15px] py-2'>Name</th>
     <th className='px-4 py-2 text-nowrap'>Email</th>
     <th className='px-4 py-2 text-nowrap'>Orginzation Type</th>
     <th className='px-4 py-2 text-nowrap'>Role</th>

     <th className='px-4 py-2 text-nowrap'>
     <div className='flex justify-center items-center '>
     <input
         className=' text-[10px] pl-[30px] pr-[10px] rounded-[20px] h-[28px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none'
         type='text'
         placeholder='Search'
         value={searchInput}
       onChange={e => setSearchInput(e.target.value)}
     />
     <img
         className='h-[12px] w-[12px] relative top-[2px] right-[155px]'
         src={searchIcon}
        />
   </div>
   </th>
   </tr>
 </thead>
 <tbody  className='bg-white border-gray-500 '>

     <tr>
       <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'></td>
       <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'></td>
    
       <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
       </td>
       <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
       </td>
       <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>
       </td>
       <td className='h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline'>         
       <img
         className='h-[13px] w-[13px] mr-1 cursor-pointer'
         src={Edit}
         alt="Edit"

       />
      <button className='flex text-orange-500 w-[30px] h-[30px]' ><RiDeleteBinLine/></button>

     </td>
     </tr>
  
 </tbody>
</table>
</div> */}
{/* )} */}

   {/* {activeTab === 'Import' && ( */}
 {/* <div className="flex items-center justify-center h-screen bg-white">
 <div className="flex items-center space-x-16">
   <div className="text-center">
     <div className="w-32 h-32">
       <CircularProgressbar
         value={60}
         text={`${60}%`}
         styles={buildStyles({
           pathColor: '#22c55e',
           textColor: '#1f2937',
           trailColor: '#e5e7eb',
         })}
       />
     </div>
     <p className="mt-4 text-gray-500">Import 60% completed</p>
   </div>

   <div className="w-96 space-y-4">
     <div>
       <div className="flex justify-between text-sm text-gray-600">
         <span>File_1234_csv</span>
         <span>53% - 12 seconds left</span>
       </div>
       <div className="w-full h-2 mt-2 bg-gray-300 rounded">
         <div className="h-2 bg-green-500 rounded" style={{ width: '53%' }}></div>
       </div>
     </div>

     <div>
       <div className="flex justify-between text-sm text-gray-600">
         <span>File_6789_csv</span>
         <span>100%</span>
       </div>
       <div className="w-full h-2 mt-2 bg-gray-300 rounded">
         <div className="h-2 bg-green-500 rounded" style={{ width: '100%' }}></div>
       </div>
     </div>


   </div>
 </div>
</div> */}
{/* )}    */}
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