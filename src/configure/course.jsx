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

const course = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryFlag, setParentCategoryFlag] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [courseDuration, setCourseDuration] = useState('');

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const [courseShortName, setCourseShortName] = useState('');
  const [coursePattern, setCoursePattern] = useState('');

  const [parentCategories, setParentCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [courseDurationUnit, setCourseDurationUnit] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const userId = localStorage.getItem("user_id");
  const [courseId, setCourseId] = useState(0);
  const orgId = localStorage.getItem('org_id');

  const [showModal , setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError  , setIsError] = useState(false);




  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }
  const addCourse = async () => {
    if (!orgId) {
      toast.error("Organization ID is required.");
      return;
    }
    if (!courseName.trim()) {
      toast.error("Course Name is required.");
      return;
    }
    if (!courseCode.trim()) {
      toast.error("Course Code is required.");
      return;
    }
    if (!courseDuration) {
      toast.error("Course Duration is required.");
      return;
    }
    if (!courseDurationUnit.trim()) {
      toast.error("Course Duration Unit is required.");
      return;
    }
    if (!coursePattern.trim()) {
      toast.error("Course Pattern is required.");
      return;
    }
    if (!userId) {
      toast.error("Updated By (User ID) is required.");
      return;
    }
    const data = {
      org_id: orgId,
      course_name: courseName,
      course_code: courseCode,
      // course_short_name: courseShortName,
      course_duration: courseDuration,
      course_duration_unit: courseDurationUnit,
      course_pattern: coursePattern,
      created_by: userId,
    };
  
    try {
      const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error("No authentication token found");
        setModalMessage("Authentication token not found.");
        setIsError(true);
        setShowModal(true);
        return;
      }
  
      const response = await fetch(
        "https://dev.quizifai.com:8010/adding_courses/",
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
        console.log("Course added successfully:", result);
  
        // Show success modal
        setModalMessage("Course added successfully.");
        setIsError(false);
        setShowModal(true);
  
        // Fetch updated courses
        fetchCourses();
  
        // Reset form fields
        setCourseName("");
        setCourseCode("");
        setCourseDuration("");
        setCourseDurationUnit("");
        setCoursePattern("");
        setIsNavbarOpen(false);
      } else {
        // Handle server-side failure
        console.error("Failed to add course:", result.response_message);
  
        // Show error modal
        setModalMessage(`Failed to add course: ${result.response_message}`);
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
  
      // Show error modal
      setModalMessage(`An unexpected error occurred: ${error.message}`);
      setIsError(true);
      setShowModal(true);
    }
  };
  
  
  const closeModal = () => {
    setShowModal(false);
  }; 

  const handleCourseDurationUnitChange = (event) => {
    setCourseDurationUnit(event.target.value);
  };

  const handleCoursePatternUnitChange = (event) => {
    setCoursePattern(event.target.value);
  };
  const updateCourse = async () => {
     // Replace with the actual token or retrieve it from local storage
     if (!orgId) {
      toast.error("Organization ID is required.");
      return;
    }
    if (!courseName.trim()) {
      toast.error("Course Name is required.");
      return;
    }
    if (!courseCode.trim()) {
      toast.error("Course Code is required.");
      return;
    }
    if (!courseDuration) {
      toast.error("Course Duration is required.");
      return;
    }
    if (!courseDurationUnit.trim()) {
      toast.error("Course Duration Unit is required.");
      return;
    }
    if (!coursePattern.trim()) {
      toast.error("Course Pattern is required.");
      return;
    }
    if (!courseId) {
      toast.error("Course ID is required.");
      return;
    }
    if (!userId) {
      toast.error("Updated By (User ID) is required.");
      return;
    }
    const courseData = {
      org_id: orgId,
      course_name: courseName,
      course_code: courseCode,
      // course_short_name: courseShortName,
      course_duration: courseDuration,
      course_duration_unit: courseDurationUnit,
      course_pattern: coursePattern,
      course_id: courseId,
      updated_by: userId
    };
  
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/edit_courses/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
      if (response.ok && result.response === "success") {
        console.log("Course Updated successfully:", result);
  
        // Show success modal
        setModalMessage("Course Updated  successfully.");
        setIsError(false);
        setShowModal(true);
  
        fetchCourses();
        setIsNavbarOpen(false);
        setCourseName('');
        setCourseCode('');
        setCoursePattern("");
        setCourseDuration('');
        setCourseDurationUnit('');
      }
     
    } catch (error) {
      console.error('Error:', error);
      setModalMessage(`An unexpected error occurred: ${error.message}`);
      setIsError(true);
      setShowModal(true);
    }
  };
  

  
  const handleSubmit = () => {
    if (isEditing) {
      updateCourse();
    } else {
      addCourse();
    }
  };
  
  const fetchCourses = async () => {
    try {
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
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleEdit = (course) => {
    if (selectedCategoryId === course.course_id) {
      // Toggle the form visibility if the same category ID is clicked
      setIsNavbarOpen(!isNavbarOpen);

    } else {
      // Set state with the course details
      setCourseId(course.course_id);
      setCourseName(course.course_name);
      setCourseCode(course.course_code);
      setCourseDuration(course.duration);
      setCoursePattern(course.course_pattern);
      setCourseDurationUnit(course.duration_unit);
      setIsNavbarOpen(true);
      setIsEditing(true);
      setSelectedCategoryId(course.course_id);
    }
  };

  return (
    <>

    <div className='flex w-full flex-col gap-2 '>
      <ToastContainer/>
    <div className='flex justify-end pt-2'>
    <div className="flex items-center pr-[20px] py-1 rounded-[10px] bg-[#F7E0E3] cursor-pointer" onClick={toggleNavbar}>
    <img className="w-[20px] h-[20px] ml-2" src={Plus} alt="Plus Icon" />
    <span className="hover:underline underline-offset-2 font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2">
      Courses
    </span>
  </div>
      </div>
      {isNavbarOpen && (
      <div className="bg-[#CBF2FB] text-[#214082] rounded-md py-2 text-[14px] p-2 flex flex-col md:flex-row items-center justify-between">
      <input
        type="text"
        placeholder="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="rounded-3xl w-[5%] py-1 px-4 text-center placeholder:text-[#214082] text-[14px] outline-[#214082]"
        style={{ '::placeholder': { color: '#214082' } }}
        readOnly
      />
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="rounded-3xl py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
      />
        {/* <input
        type="text"
        placeholder="Course Name"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        className="rounded-3xl py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
      /> */}
      <input
        type="text"
        placeholder="Course Short Name"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        className="rounded-3xl py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
      />
       <select
        className="rounded-3xl py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
        value={coursePattern}
        onChange={handleCoursePatternUnitChange}
      >
        <option value="">Select Course Pattern</option>
        <option value="ALL_SEM">ALL_SEM</option>
        <option value="ALL_YR">ALL_YR</option>

        
      </select>
      <input
        type="text"
        placeholder="Course Duration"
        value={courseDuration}
        onChange={(e) => setCourseDuration(e.target.value)}
        className="rounded-3xl py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
      />
      <select
        className="rounded-3xl py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
        value={courseDurationUnit}
        onChange={handleCourseDurationUnitChange}
      >
        <option value="">Select Duration Unit</option>
        <option value="months">Months</option>
        <option value="years">Years</option>
        <option value="Semester">Semester</option>

        
      </select>
      <button
        onClick={handleSubmit}
        className="bg-[#214082] text-white py-1 px-6 rounded-3xl flex items-center justify-center"
      >
        {isEditing ? 'Update' : 'Add'}
      </button>
    </div>
    
      )}
      

      <table className=' table-auto rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[14px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Course ID</th>
            <th className='pl-[10px] ml-[15px] py-2'>Course Name</th>
            <th className='px-4 py-2 text-nowrap'>Course Short Name</th>
            <th className='px-4 py-2 text-nowrap'>Course Pattern</th>
            <th className='px-4 py-2 text-nowrap'>Course Duration</th>

            {/* <th className='px-2 py-2 text-wrap'>Classes</th> */}
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
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>{course.course_id}</td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>{course.course_name}</td>
              {/* <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
              {course.specializations.map((spec) => (
                  <div key={spec.specialization_id}>
                    {spec.specialization_name}
                  </div>
                ))}
              </td> */}
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
              {course.course_code}
              </td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
              {course.course_pattern}
              </td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>
              {course.duration}
              </td>
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
      </table>
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
     
    </div>
    
     

    </>
    
    

    
  )
}

export default course