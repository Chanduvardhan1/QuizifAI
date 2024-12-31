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

  const handleAddSubject = async () => {
    const courseData = {
      subject_name: subjectName,
      class_id: classId,
      created_by: userId,
    };

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
  
      const response = await fetch('https://dev.quizifai.com:8010/adding_subjects/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Subject added successfully:', data);
      fetchCourses();
      setIsNavbarOpen(false);

      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error('Error adding subject:', error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleUpdateSubject = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found');
        return;
      }

      const requestBody = {
        subject_name: subjectName,
        class_id: classId,
        subject_id: subjectId,
        updated_by: userId
      };

      const response = await fetch('https://dev.quizifai.com:8010/update_subjects/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update subject');
      }

      const data = await response.json();
      setResponseMessage(data.response_message || 'Subject updated successfully');

    } catch (error) {
      console.error('Error updating subject:', error);
      setResponseMessage('An error occurred while updating the subject.');
    }
  };
//   const handleCourseChange = (courseId) => {
//     setSelectedCourseId(courseId);
//     const selectedCourse = courses.find(course => course.course_id === parseInt(courseId));
//     setSpecializations(selectedCourse ? selectedCourse.specializations : []);
//   };


  const handleSubmit = () => {
    if (isEditing) {
      handleUpdateSubject();
    } else {
      handleAddSubject();
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
    setClassId(e.target.value);

    // Reset specialization when course changes
  };
  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
  };
  const handleEdit = (course) => {
    if (selectedCategoryId === course.course_id) {
      setIsNavbarOpen(!isNavbarOpen);
    } else {
      setCourseId(course.course_id);
      setCourseName(course.course_name);
      setCourseShortName(course.course_short_name);
  
      // If the course has classes, pick the first one to edit (or customize as needed)
      if (course.classes && course.classes.length > 0) {
        const classData = course.classes[0]; // Assuming you want the first class
        setClassId(classData.class_id); // Set the class_id in state
  
        // Set the subject_name, subject_id, and updated_by values
        if (course.subjects && course.subjects.length > 0) {
          const subjectData = course.subjects[0]; // Assuming you want the first subject
          setSubjectName(subjectData.subject_name); // Set the subject_name in state
          setSubjectId(subjectData.subject_id); // Set the subject_id in state
        } else {
          setSubjectName(''); // Reset if no subject is found
          setSubjectId('');
        }
        if (course.specializations && course.specializations.length > 0) {
          const specialization = course.specializations[0]; // Assuming you want the first specialization
          setSelectedSpecialization(specialization.specialization_name);
          setSpecializationShortName(specialization.specialization_short_name);
          setSpecializationId(specialization.specialization_id);
        } else {
          setSelectedSpecialization('');
          setSpecializationShortName('');
          setSpecializationId('');
        }
        // Set updated_by as needed (you can customize this)
  
      } else {
        setClassId('');
        setSubjectName('');
        setSubjectId('');
        
      }
  
      setIsNavbarOpen(true);
      setIsEditing(true);
      setSelectedCategoryId(course.course_id);
    }
  };
  
  
  return (
    <>

    <div className='flex w-full flex-col gap-2'>
    <div className='flex justify-end pt-2'>
      
        <div className="flex items-center pr-[20px] py-1 rounded-[10px] bg-[#F7E0E3] cursor-pointer" onClick={toggleNavbar}>
    <img className="w-[20px] h-[20px] ml-2" src={Plus} alt="Plus Icon" />
    <span className="hover:underline underline-offset-2 font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2">
    Subjects
    </span>
  </div>
      </div>
      {isNavbarOpen && (
      <div className="bg-[#CBF2FB] text-[#214082] rounded-md text-[14px] p-4 flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
        style={{ '::placeholder': { color: '#214082' } }}
        readOnly
      />
      <input
        type="text"
        placeholder="Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
      />
      <select
        className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
        value={selectedSpecialization}
        onChange={handleSpecializationChange}
      >
        <option value="">
          Select a specialization
        </option>
        {courses.map((course) =>
          course.specializations.map((specialization) => (
            <option key={specialization.specialization_id} value={specialization.specialization_id}>
              {specialization.specialization_name}
            </option>
          ))
        )}
      </select>
      <select
        className="rounded-3xl py-1 px-2 text-center placeholder:text-[#214082] outline-[#214082]"
        value={classId}
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
        className="bg-[#214082] text-white py-1 px-6 rounded-3xl flex items-center justify-center"
      >
        {isEditing ? 'Update' : 'Add'}
      </button>
    </div>
    
      )}
      

      <table className='table-auto  rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[14px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Subject ID</th>
            <th className='pl-[10px] ml-[15px] py-2'>Subject Name</th>
            <th className='px-4 py-2 text-nowrap'>Specialization Name</th>
            <th className='px-2 py-2 text-wrap'>Class Name</th>
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
              <td className="px-4 py-2 border">
              {
  course.specializations && course.specializations.length > 0
    ? course.specializations[0].specialization_id
    : 'N/A'
}</td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
             
              {course.classes && course.classes.length > 0 && course.classes[0].class_name
  ? course.classes[0].class_name
  : 'N/A'}

              </td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>  {course.specializations.map((specialization) => (
        <div key={specialization.specialization_id}>
          {specialization.specialization_name}
        </div>
      ))}</td>

                <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>{course.course_name}</td>
              {/* <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
              {course.classes.map((cls) => (
                  <div key={cls.class_id}>{cls.class_name}</div>
                ))}
              </td> */}
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
    
     
    </div>

    </>
    
    

    
  )
}

export default subjects