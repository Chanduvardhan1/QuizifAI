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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from "@mui/material";

const specialisations = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryFlag, setParentCategoryFlag] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarOpen1, setIsNavbarOpen1] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [courseShortName, setCourseShortName] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [specializationId, setSpecializationId] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [specializationName, setSpecializationName] = useState('');
  const [specializationShortName, setSpecializationShortName] = useState('');
  const [courseId, setCourseId] = useState(0);
  const userId = localStorage.getItem("user_id");
  const [updatedBy, setUpdatedBy] = useState('');
  const orgId = localStorage.getItem('org_id');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }
 const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit1 = async () => {
    if (!specializationName.trim()) {
      toast.error("Specialization Name is required.");
      return;
    }
    if (!specializationShortName.trim()) {
      toast.error("Specialization Short Name is required.");
      return;
    }
    if (!courseId) {
      toast.error("Course Name is required.");
      return;
    }
    if (!userId) {
      toast.error("User Name is required.");
      return;
    }
    if (!orgId) {
      toast.error("Organization ID is required.");
      return;
    }
    if (!selectedDepartmentId) {
      toast.error("Department Name is required.");
      return;
    }

    const data = {
      specialization_name: specializationName,
      specialization_short_name: specializationShortName,
      course_id: courseId,
      created_by: userId,
      org_id: orgId,
      department_id: selectedDepartmentId,
    };

    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("No authentication token found");
        setModalMessage("Authentication token not found.");
        setIsError(true);
        setShowModal(true);
        return;
      }

      const response = await fetch(
        "https://dev.quizifai.com:8010/adding_specialization/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok && result.response === "success") {
        setModalMessage(result.response_message);
        setIsError(false);
        setShowModal(true);

        // Reset form fields
        setSpecializationName("");
        setSpecializationShortName("");
        setCourseId("");

        // Call any additional functions, e.g., fetchCourses
        fetchCourses();
        setIsNavbarOpen(false);
        setIsNavbarOpen1(false);
      } else {
        console.error("Failed to add specialization:", result);
        setModalMessage(result.response_message || "An error occurred.");
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("An error occurred while adding specialization.");
      setIsError(true);
      setShowModal(true);
    }finally {
      setLoading(false); // Hide loading after API response
    }
  };

  const updateSpecialization = async () => {
    if (!specializationName.trim()) {
      toast.error("Specialization Name is required.");
      return;
    }
    if (!specializationShortName.trim()) {
      toast.error("Specialization Short Name is required.");
      return;
    }
    if (!courseId) {
      toast.error("Course Name is required.");
      return;
    }
    if (!userId) {
      toast.error("User Name is required.");
      return;
    }
    if (!orgId) {
      toast.error("Organization ID is required.");
      return;
    }
    if (!selectedDepartmentId) {
      toast.error("Department Name is required.");
      return;
    }
    const specializationData = {
      specialization_name:specializationName,
      specialization_short_name: specializationShortName,
      course_id: courseId,
      specialization_id: specializationId,
      updated_by: userId,
      org_id:orgId,
      department_id:selectedDepartmentId,
    };
  
    try {
      setLoading(true); 

      const authToken = localStorage.getItem('authToken');
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/editing_specialization/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(specializationData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update specialization');
      }
  
      const result = await response.json();
      if (response.ok && result.response === "success") {
        setModalMessage(result.response_message);
        setIsError(false);
        setShowModal(true);

        // Reset form fields
        setSpecializationName("");
        setSpecializationShortName("");
        setCourseId("");

        // Call any additional functions, e.g., fetchCourses
        fetchCourses();
        setIsNavbarOpen(false);
        setIsNavbarOpen1(false);
      } else {
        console.error("Failed to Editing specialization:", result);
        setModalMessage(result.response_message || "An error occurred.");
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("An error occurred while Editing specialization.");
      setIsError(true);
      setShowModal(true);
    }finally {
      setLoading(false); // Hide loading after API response
    }
  };
  
  const handleSubmit = () => {
    if (isEditing) {
      updateSpecialization();
    } else {
        handleSubmit1();
    }
  };
  
  const fetchCourses = async () => {
    try {
      setLoading(true); 

      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
  
      const response = await fetch('https://dev.quizifai.com:8010/courses-clsses/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch courses data');
      }
  
      const data = await response.json();
      if (data.response === "success") {
        setCourses(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally {
      setLoading(false); // Hide loading after API response
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen1(!isNavbarOpen);
  };

const close =()=> {
  setSpecializationName("");
  setSpecializationShortName("");
  setCourseId("");
  setSelectedDepartmentId('');
  setIsNavbarOpen(false);
  
}

  //---------------**Department Selector**----------------//

  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true); 
        const authToken = localStorage.getItem("authToken"); // Replace with actual token retrieval logic

        if (!authToken) {
          console.error("No authentication token found");
          setError("Authentication token not found.");
          return;
        }

        const response = await fetch(
          `https://dev.quizifai.com:8010/view_departments_created_by_admin/?admin_id=${userId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.response === "success") {
          setDepartments(result.data);
        } else {
          console.error("Failed to fetch departments:", result);
          setError("Failed to fetch departments.");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("An error occurred while fetching departments.");
      }finally {
        setLoading(false); // Hide loading after API response
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDepartmentId(selectedId);

    // Pass department_id to the backend or handle it as needed
    console.log("Selected department_id:", selectedId);
  };

    //---------------**Department Selector end**----------------//

  const handleEdit = (course) => {
   
      // Toggle the form visibility if the same course ID is clicked
    
      // Set state with the course details to edit
      setCourseId(course.course_id);
      setCourseName(course.course_name);
      setCourseShortName(course.course_short_name);
      
      // If the course has specializations, pick the first one to edit (or customize as needed)
      if (course.specializations && course.specializations.length > 0) {
        const specialization = course.specializations[0]; // Assuming you want the first specialization
        setSpecializationName(specialization.specialization_name);
        setSpecializationShortName(specialization.specialization_short_name);
        setSpecializationId(specialization.specialization_id);
      } else {
        setSpecializationName('');
        setSpecializationShortName('');
        setSpecializationId('');
      }
      setUpdatedBy(''); // Set the updated_by field appropriately 
      setIsNavbarOpen(true); // Open the form
      setIsEditing(true); // Mark the form as being in edit mode
      setSelectedCategoryId(course.course_id); // Update the selected course ID
    
  };
  
  return (
    <>

    <div className='flex w-full flex-col gap-2'>
      <ToastContainer/>
    <div className='flex justify-end pt-2'>
    {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} color="primary" />
  </div>
)}
        <div className="flex items-center pr-[20px] py-1 rounded-[10px] bg-[#F7E0E3] cursor-pointer" onClick={toggleNavbar}>
    <img className="w-[20px] h-[20px] ml-2" src={Plus} alt="Plus Icon" />
    <span className="hover:underline underline-offset-2 font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2">
    Specialization
    </span>
  </div>
      </div>
      {isNavbarOpen && (
   <div className="bg-[#CBF2FB] text-[#214082] rounded-md  text-[14px] p-4 flex flex-col md:flex-row items-center justify-between">
   <input
     type="text"
     placeholder="Specialization ID"
     value={specializationId}
     onChange={(e) => setSpecializationId(e.target.value)}
     className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
     style={{ '::placeholder': { color: '#214082' } }}
   />
   <input
     type="text"
     placeholder="Specialization Name"
     value={specializationName}
     onChange={(e) => setSpecializationName(e.target.value)}
     className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
   />
   <input
     type="text"
     placeholder="Specialization Short Name"
     value={specializationShortName}
     onChange={(e) => setSpecializationShortName(e.target.value)}
     className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
   />
   <select
     className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
     value={courseId}
     onChange={(e) => setCourseId(e.target.value)}
   >
     <option value="">Select a course</option>
     {courses.map((course) => (
       <option key={course.course_id} value={course.course_id}>
         {course.course_name}
       </option>
     ))}
   </select>
   <select
     className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
     value={selectedDepartmentId}
     onChange={handleDepartmentChange}
   >
     <option value="">Select a department </option>
     {departments.map((dept) => (
          <option key={dept.department_id} value={dept.department_id}>
            {dept.department_name}
          </option>
        ))}
   </select>
   <button
     onClick={handleSubmit}
     className="bg-[#214082] text-white py-1 px-6 rounded-3xl flex items-center justify-center"
   >
     {isEditing ? 'Update' : 'Add'}
   </button>
 </div>
 
  )}
       <table className='h-[20px] table-auto rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[14px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Specialization ID</th>
            <th className='pl-[10px] ml-[15px] py-2'>Specialization Name</th>
            <th className='px-4 py-2 text-nowrap'>Specialization Short Name</th>
            <th className='px-2 py-2 text-wrap'>Courses</th>
            <th className='px-4 py-2 text-nowrap'>
              <div className='flex justify-center items-center'>
                <input
                  className='text-[10px] pl-[30px] pr-[10px] rounded-[20px] h-[28px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none'
                  type='text'
                  placeholder='Search'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <img
                  className='h-[12px] w-[12px] relative top-[2px] right-[155px]'
                  src={searchIcon}
                  alt='Search'
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className='bg-white border-gray-500'>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.course_id}>
                <td className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>
                  {course.specializations.map((spec) => (
                    <div key={spec.specialization_id}>
                      {spec.specialization_id}
                    </div>
                  ))}
                </td>
                <td className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
                  {course.specializations.map((spec) => (
                    <div key={spec.specialization_id}>
                      {spec.specialization_name}
                    </div>
                  ))}
                </td>
                <td className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
                  {course.specializations.map((spec) => (
                    <div key={spec.specialization_id}>
                      {spec.specialization_short_name}
                    </div>
                  ))}
                </td>
                <td className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
                  {course.course_name}
                </td>
                <td className='h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline'>
                  <img
                    className='h-[13px] w-[13px] mr-1 cursor-pointer'
                    src={Edit}
                    alt='Edit'
                    onClick={() => handleEdit(course)}
                  />
                  <button className='flex text-orange-500 w-[30px] h-[30px]'>
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center text-[#214082] font-bold text-[12px] py-4"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <table className='h-[20px] table-auto  rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[14px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Specialization ID</th>
            <th className='pl-[10px] ml-[15px] py-2'>Specialization Name</th>
            <th className='px-4 py-2 text-nowrap'>Specialization Short Name</th>
            <th className='px-2 py-2 text-wrap'>Courses</th>
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
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>    {course.specializations.map((spec) => (
                  <div key={spec.specialization_id}>
                    {spec.specialization_id}
                  </div>
                ))}</td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
              {course.specializations.map((spec) => (
                  <div key={spec.specialization_id}>
                    {spec.specialization_name}
                  </div>
                ))}
              </td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>{course.specializations.map((spec) => (
                  <div key={spec.specialization_id}>
                    {spec.specialization_short_name}
                  </div>
                ))}</td>

                <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>{course.course_name}</td>
             
              <td className='h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline'>         
              <img
                className='h-[13px] w-[13px] mr-1 cursor-pointer'
                src={Edit}
                alt="Edit"
                onClick={() => handleEdit(course)}
              />
             <button className='flex text-orange-500 w-[30px] h-[30px]' ><RiDeleteBinLine/></button>

            </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    
       {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
              isError ? "border-red-500" : "border-green-500"
            } border-t-4`}
          >
            <h2
              className={`text-xl font-semibold ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {isError ? "Error" : "Success"}
            </h2>
            <p className="mt-2 text-gray-700">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
              {isNavbarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
 <div className="flex flex-col bg-white p-6 shadow-lg rounded-lg w-[50%]">
 <button
        className="flex justify-end text-gray-900 hover:text-gray-800"
        onClick={close}
        aria-label="Close"
      >
        ✕
      </button>
 <h2 className="text-xl font-semibold text-blue-800 mb-4">Edit Specialization</h2>


 <div className="flex flex-row mb-4">
      <label className="w-[35%] text-blue-800 font-semibold">Specialization ID<span className="text-red-500">*</span></label>
      <input
        type="text"
        placeholder="Course ID"
        value={specializationId}
        onChange={(e) => setSpecializationId(e.target.value)}
        className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
        readOnly
      />
    </div>
    <div className="flex flex-row mb-4">
  <label className="w-[35%] text-blue-800 font-semibold">
  Department<span className="text-red-500">*</span>
  </label>
  <select
    className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
    value={selectedDepartmentId}
    onChange={handleDepartmentChange}
     >
     <option value="">Select a department </option>
     {departments.map((dept) => (
          <option key={dept.department_id} value={dept.department_id}>
            {dept.department_name}
          </option>
        ))}
  </select>
</div>
<div className="flex flex-row mb-4">
  <label className="w-[35%] text-blue-800 font-semibold">
  Course<span className="text-red-500">*</span>
  </label>
  <select
    className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
    value={courseId}
    onChange={(e) => setCourseId(e.target.value)}
     >
    <option value="">Select a course</option>
     {courses.map((course) => (
       <option key={course.course_id} value={course.course_id}>
         {course.course_name}
       </option>
     ))}
  </select>
</div>
    <div className="flex flex-row mb-4">
      <label className="w-[35%] text-blue-800 font-semibold">Specialization Name<span className="text-red-500">*</span></label>
      <input
        className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
        type="text"
        placeholder="Course Name"
        value={specializationName}
     onChange={(e) => setSpecializationName(e.target.value)}
      />
    </div>

    {/* Last Name */}
    <div className="flex flex-row mb-4">
      <label className="w-[35%] text-blue-800 font-semibold">Specialization Short Name<span className="text-red-500">*</span></label>
      <input
        className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
        type="text"
        placeholder="Course Short Name"
        value={specializationShortName}
        onChange={(e) => setSpecializationShortName(e.target.value)}
      />
    </div>


    {/* Role */}
   
  
    {/* Submit Button */}
    <div className='flex justify-end'>
    <div className='flex gap-1'>

     
<button
 className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
 onClick={close}
>
  Cancel
</button>
<button
     className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
      onClick={handleSubmit}
    >
    Update
    </button>
</div>
  
    </div>

  </div>
    </div>
)}
        {isNavbarOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
 <div className="flex flex-col bg-white p-6 shadow-lg rounded-lg w-[50%]">
 <button
        className="flex justify-end text-gray-900 hover:text-gray-800"
        onClick={() => setIsNavbarOpen1(false)}
        aria-label="Close"
      >
        ✕
      </button>
 <h2 className="text-xl font-semibold text-blue-800 mb-4">Create Specialization</h2>



    <div className="flex flex-row mb-4">
  <label className="w-[35%] text-blue-800 font-semibold">
  Department<span className="text-red-500">*</span>
  </label>
  <select
    className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
    value={selectedDepartmentId}
    onChange={handleDepartmentChange}
     >
     <option value="">Select a department </option>
     {departments.map((dept) => (
          <option key={dept.department_id} value={dept.department_id}>
            {dept.department_name}
          </option>
        ))}
  </select>
</div>
<div className="flex flex-row mb-4">
  <label className="w-[35%] text-blue-800 font-semibold">
  Course<span className="text-red-500">*</span>
  </label>
  <select
    className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
    value={courseId}
    onChange={(e) => setCourseId(e.target.value)}
     >
    <option value="">Select a course</option>
     {courses.map((course) => (
       <option key={course.course_id} value={course.course_id}>
         {course.course_name}
       </option>
     ))}
  </select>
</div>
    <div className="flex flex-row mb-4">
      <label className="w-[35%] text-blue-800 font-semibold">Specialization Name<span className="text-red-500">*</span></label>
      <input
        className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
        type="text"
        placeholder="Course Name"
        value={specializationName}
     onChange={(e) => setSpecializationName(e.target.value)}
      />
    </div>

    {/* Last Name */}
    <div className="flex flex-row mb-4">
      <label className="w-[35%] text-blue-800 font-semibold">Specialization Short Name<span className="text-red-500">*</span></label>
      <input
        className="w-3/4 border-b-2 bg-[#f5f5f5] focus:outline-none"
        type="text"
        placeholder="Course Short Name"
        value={specializationShortName}
        onChange={(e) => setSpecializationShortName(e.target.value)}
      />
    </div>


    {/* Role */}
   
  
    {/* Submit Button */}
    <div className='flex justify-end'>
    <div className='flex gap-1'>

     
<button
 className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
 onClick={()=> setIsNavbarOpen1(false)}
>
  Cancel
</button>
<button
 className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
  onClick={handleSubmit}
>
 Create
</button>
</div>
   
    </div>

  </div>
    </div>
)}
    </div>

    </>
    
    

    
  )
}

export default specialisations