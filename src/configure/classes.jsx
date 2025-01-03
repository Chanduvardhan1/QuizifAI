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

const classes = () => {
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
  const [classId, setClassId] = useState('');
  const [specializationName, setSpecializationName] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState('');
  const [className, setClassName] = useState('');
  const [courseId, setCourseId] = useState(0);

  const [specializationId, setSpecializationId] = useState(0);
  const userId = localStorage.getItem("user_id");
  const orgId = localStorage.getItem('org_id');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [sectionName, setSectionName] = useState('');
  const [SectionId, setSectionId] = useState('');

    
  const [sectionCode, setSectionCode] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }

  


  const handleAddClass = async () => {

    try {
      const authToken = localStorage.getItem("authToken");
  
      if (!authToken) {
        console.error("No authentication token found");
        setModalMessage("Authentication token not found.");
        setIsError(true);
        setShowModal(true);
        return;
      }
 
  if (!className.trim()) {
    toast.error("Class Name is required.");
    return;
  }
  if (!courseId) {
    toast.error("Course ID is required.");
    return;
  }
  if (!specializationId) {
    toast.error("Specialization ID is required.");
    return;
  }
  if (!orgId) {
    toast.error("Organization ID is required.");
    return;
  }
  if (!selectedDepartmentId) {
    toast.error("Department ID is required.");
    return;
  }
  if (!userId) {
    toast.error("User ID is required.");
    return;
  }
  if (!sectionName.trim()) {
    toast.error("Section Name is required.");
    return;
  }
  if (!sectionCode.trim()) {
    toast.error("Section Code is required.");
    return;
  }
      const response = await fetch("https://dev.quizifai.com:8010/add_class_and_section/", {
        method: "POST",
        headers: {
          // accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_name: className,
          course_id: courseId,
          Specialization_id: specializationId,
          org_id: orgId,
          department_id: selectedDepartmentId,
          created_by: userId,
          updated_by: userId,
          sections: [
            {
              section_name: sectionName,
              section_code: sectionCode,
              created_by: userId,
              updated_by: userId,
              created_date: new Date().toISOString(),
              updated_date: new Date().toISOString(),
            },
          ],
          created_timestamp: new Date().toISOString(),
          updated_timestamp: new Date().toISOString(),
      
        }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.response === "success") {
        console.log("Class added successfully:", result);
        setModalMessage(result.response_message || "Class added successfully!");
        setIsError(false);
        setShowModal(true);
  
        // Reset form fields
        setClassName("");
        setCourseId("");
        setSpecializationId("");
  
        // Fetch updated data
        fetchCourses();
        setIsNavbarOpen(false);
      } else {
        console.error("Failed to add class:", result);
        setModalMessage(result.response_message || "An error occurred.");
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error adding class:", error);
      setModalMessage("An error occurred while adding the class.");
      setIsError(true);
      setShowModal(true);
    }
  };
  
  const handleUpdateClass = async () => {

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      if (!classId) {
        toast.error("Class ID is required.");
        return;
      }
      if (!className.trim()) {
        toast.error("Class Name is required.");
        return;
      }
      if (!courseId) {
        toast.error("Course ID is required.");
        return;
      }
      if (!specializationId) {
        toast.error("Specialization ID is required.");
        return;
      }
      if (!orgId) {
        toast.error("Organization ID is required.");
        return;
      }
      if (!selectedDepartmentId) {
        toast.error("Department ID is required.");
        return;
      }
      if (!userId) {
        toast.error("User ID is required.");
        return;
      }
      if (!sectionName.trim()) {
        toast.error("Section Name is required.");
        return;
      }
      if (!sectionCode.trim()) {
        toast.error("Section Code is required.");
        return;
      }
      if (!SectionId.trim()) {
        toast.error("Section Id is required.");
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/edit_class_and_section/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          class_id: classId,
          class_name: className,
          course_id: courseId,
          Specialization_id: specializationId,
          org_id: orgId,
          department_id: selectedDepartmentId,
          created_by: userId,
          updated_by: userId,
          sections: [
            {
              section_id:SectionId,
              section_name: sectionName,
              section_code: sectionCode,
              created_by: userId,
              updated_by: userId,
              created_date: new Date().toISOString(),
              updated_date: new Date().toISOString(),
            },
          ],
          created_timestamp: new Date().toISOString(),
          updated_timestamp: new Date().toISOString(),
      
        
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (response.ok && result.response === "success") {
        console.log("Class added successfully:", result);
        setModalMessage(result.response_message || "Class added successfully!");
        setIsError(false);
        setShowModal(true);
  
        // Reset form fields
        fetchCourses();
        setIsNavbarOpen(false);
        setClassName('');
        setCourseId('');
        setSpecializationId('');
      } else {
        console.error("Failed to add class:", result);
        setModalMessage(result.response_message || "An error occurred.");
        setIsError(true);
        setShowModal(true);
      }
     
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error('Error updating class:', error);
      setModalMessage("An error occurred while adding the class.");
      setIsError(true);
      setShowModal(true);
      // Handle error (e.g., show an error message)
    }
  };
  const handleSubmit = () => {
    if (isEditing) {
      handleUpdateClass();
    } else {
      handleAddClass();
    }
  };
  

  //---------------**Department Selector**----------------//

  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); // Replace with actual token retrieval logic

        if (!authToken) {
          console.error("No authentication token found");
          setError("Authentication token not found.");
          return;
        }

        const response = await fetch(
          "https://dev.quizifai.com:8010/view_departments_created_by_admin/?admin_id=1037",
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
    setCourseId(e.target.value);

  };
  const handleSpecializationChange = (e) => {
    setSpecializationId(e.target.value);
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
        setClassName(classData.class_name); // Set the class_name in state
        setClassId(classData.class_id); // Set the class_id in state
        if (classData.sections && classData.sections.length > 0) {
          const section = classData.sections[0]; // Assuming you want the first section
          setSectionName(section.section_name);
          setSectionId(section.section_id);
          setSectionCode(section.section_code);
        }
      } else {
        setClassName(''); // Reset if no class is found
        setClassId('');
      }

      if (course.specializations && course.specializations.length > 0) {
        const specialization = course.specializations[0];
        setSpecializationName(specialization.specialization_name);
        setSpecializationId(specialization.specialization_id);
      } else {
        setSpecializationId('');
      }

      setIsNavbarOpen(true);
      setIsEditing(true);
      setSelectedCategoryId(course.course_id);
    }
  };
  return (
    <>

    <div className='flex w-full flex-col gap-2'>
      <ToastContainer/>
    <div className='flex justify-end pt-2'>
    
        <div className="flex items-center pr-[20px] py-1 rounded-[10px] bg-[#F7E0E3] cursor-pointer" onClick={toggleNavbar}>
    <img className="w-[20px] h-[20px] ml-2" src={Plus} alt="Plus Icon" />
    <span className="hover:underline underline-offset-2 font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2">
    Class
    </span>
  </div>
      </div>
      {isNavbarOpen && (
      <div className="bg-[#CBF2FB] text-[#214082] rounded-md text-[14px] p-4 flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Class ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        className="rounded-3xl w-[7%] py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
        style={{ '::placeholder': { color: '#214082' } }}
        // readOnly
      />
      <input
        type="text"
        placeholder="Class"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="rounded-3xl w-[15%] py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
      />
         <input
        type="text"
        placeholder="Section Name"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        className="rounded-3xl w-[15%] py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
      />
      <input
        type="text"
        placeholder="Section Code"
        value={sectionCode}
        onChange={(e) => setSectionCode(e.target.value)}
        className="rounded-3xl w-[15%] py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
      />
         <select
        className="rounded-3xl w-[25%] py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
        value={courseId}
        onChange={handleCourseChange}
      >
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_name}
          </option>
        ))}
      </select>
      <select
        className="rounded-3xl w-[25%] py-1 px-4 text-center placeholder:text-[#214082] outline-[#214082]"
        value={specializationId}
        onChange={handleSpecializationChange}
      >
        <option value="">Select a specialization</option>
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
      

      <table className='h-[20px] table-auto  rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[14px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Class ID</th>
            <th className='px-4  py-2'>Class Name</th>
            <th className='px-4  py-2'>Section</th>
            <th className='px-4 py-2 text-nowrap'>Specialization</th>
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
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>   {course.classes.map((cls) => (
        <div key={cls.class_id}>
          {cls.class_id}
        </div>
      ))}</td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-left'>
             
              {course.classes.map((cls) => (
        <div key={cls.class_id}>
          {cls.class_name}
        </div>
      ))}

              </td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-start'>
             
              {course.classes.map((cls) => (
      <div key={cls.class_id}>
        {cls.sections.length > 0 ? (
          cls.sections.map((section) => (
            <div key={section.section_id}>{section.section_name}</div>
          ))
        ) : (
          <div>No Sections</div>
        )}
      </div>
    ))}

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

export default classes