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

const subjects = () => {
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
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/dashboard');
  }
 const addCourse = async (courseData) => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
  
      const response = await fetch('https://dev.quizifai.com:8010/add_courses/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      setIsEditing(false);
      fetchCourses();
    } catch (error) {
      console.error('Error:', error);
    }
  };
//   const handleCourseChange = (courseId) => {
//     setSelectedCourseId(courseId);
//     const selectedCourse = courses.find(course => course.course_id === parseInt(courseId));
//     setSpecializations(selectedCourse ? selectedCourse.specializations : []);
//   };

  const handleCreateCategory = () => {


    const courseData = {
      course_name: courseName,
      course_short_name: courseShortName,
      course_duration: '',
      course_duration_unit: '',
      specialization_name: '',
      specialization_short_name: '',
      class_name: '',
      created_by: '',
    };

    addCourse(courseData);
  };
  const handleSubmit = () => {
    if (isEditing) {
      handleUpdateCategory();
    } else {
      handleCreateCategory();
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
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const selectedCourse = courses.find(course => course.course_id === parseInt(courseId));
    console.log('Selected Course:', selectedCourse); // Debugging log
    if (selectedCourse && selectedCourse.specializations.length > 0) {
      selectedCourse.specializations.forEach(spec => {
        console.log('Specialization:', spec.specialization_name); // Log each specialization name
      });
    } else {
      console.log('No specializations available for this course');
    }
    setSelectedCourse(selectedCourse);
    setSpecializations(selectedCourse ? selectedCourse.specializations : []);
    setSelectedSpecialization(null); // Reset specialization when course changes
  };
  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
  };
  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='flex w-full flex-col'>
    <div className='flex justify-end mt-[30px]'>
        <div className='w-[137px] h-[30px] rounded-[10px] bg-[#F7E0E3] mr-[10px]'>
          <div className="flex"onClick={toggleNavbar} >
            <img className="w-[20px] h-[20px] ml-2 mt-1" src={Plus} alt="Plus Icon" />
            <a className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-1.5">
            Subjects
            </a>
          </div>
        </div>
        <img onClick={handleBanckToDashbaord} className='h-4 w-4 cursor-pointer mt-[6px] mr-6' title='close settings' src={cancel} />
      </div>
      {isNavbarOpen && (
        <div className='text-[10px] mx-[10px] text-[#214082] h-[50px] mt-[30px] rounded-md bg-[#CBF2FB] flex flex-row justify-around p-4'>
          <input
            type='text'
            placeholder='Subject ID'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className=' w-[100px] -mt-[10px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]'
            style={{ '::placeholder': { color: '#214082' } }}
            readOnly
          />
          <input
            type='text'
            placeholder='Subject Name'
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className=' w-[120px] rounded-3xl text-center -mt-[10px]  py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]'
          />
     
  
        
     <select
      className="rounded-3xl text-center -mt-[10px] w-[150px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
      value={selectedSpecialization}
      onChange={handleSpecializationChange}
    >
      <option value="">Select a specialization</option>
      {courses.map(course => 
        course.specializations.map(specialization => (
          <option key={specialization.specialization_id} value={specialization.specialization_id}>
            {specialization.specialization_name}
          </option>
        ))
      )}
    </select>
    
    
        
       <select
  className="rounded-3xl text-center -mt-[10px] w-[150px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
  value={selectedCourseId}
  onChange={handleCourseChange}

>
  <option value="">Select a class</option>
  {courses.map((course) => (
    <option key={course.course_id} value={course.course_id}>
      {course.course_name}
    </option>
  ))}
</select>
         
         <button
onClick={handleSubmit}
  className='bg-[#214082] w-[80px] -mt-[10px] ml-[20px] py-[14px] rounded-3xl text-white flex items-center justify-center'
>
  {isEditing ? 'Update' : 'Add'}
</button>
        </div>
      )}
      

      <table className='h-[20px] table-auto mt-[30px] mx-[20px] rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[13px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Subject ID</th>
            <th className='pl-[10px] ml-[15px] py-2'>Subject Name</th>
            <th className='px-4 py-2 text-nowrap'>SpecialiZation Name</th>
            <th className='px-2 py-2 text-wrap'>Class Name</th>
            <div className='flex -mt-[5px]'>
            <input
                className='mt-[15px] text-[10px] pl-[30px] pr-[10px] rounded-[20px] h-[28px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none'
                type='text'
                placeholder='Search'
                value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <img
                className='h-[12px] w-[12px] relative top-[25px] right-[160px]'
                src={searchIcon}
               />
          </div>
          </tr>
        </thead>
        <tbody  className='bg-white border-gray-500 '>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>   {course.classes.map((cls) => (
        <div key={cls.class_id}>
          {cls.class_id}
        </div>
      ))}</td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>
             
              {course.classes.map((cls) => (
        <div key={cls.class_id}>
          {cls.class_name}
        </div>
      ))}

              </td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>  {course.specializations.map((specialization) => (
        <div key={specialization.specialization_id}>
          {specialization.specialization_name}
        </div>
      ))}</td>

                <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>{course.course_name}</td>
              {/* <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>
              {course.classes.map((cls) => (
                  <div key={cls.class_id}>{cls.class_name}</div>
                ))}
              </td> */}
              <td className='h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline'>         
              <img
                className='h-[13px] w-[13px] mr-1 cursor-pointer'
                src={Edit}
                alt="Edit"
             
              />
             <button className='flex text-orange-500 w-[30px] h-[30px]' ><RiDeleteBinLine/></button>

            </td>
            </tr>
          ))}
        </tbody>
      </table>
    
     
    </div>
    
     

   
    <LogoutBar />
    </div>
    </>
    
    

    
  )
}

export default subjects