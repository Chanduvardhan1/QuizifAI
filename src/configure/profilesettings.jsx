import React, { useEffect } from 'react'
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from 'react';
// import Switch from "react-switch";
import { useNavigate } from 'react-router-dom';
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png"
import Delete from "../../src/assets/Images/Assets/Delete.png"
import Line from "../../src/assets/Images/Assets/Line.png"
import { RiDeleteBinLine } from "react-icons/ri";
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import camera1 from "../../src/assets/Images/dashboard/edit.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import close from "../../src/assets/Images/images/dashboard/cancel.png"


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

  const orgId = localStorage.getItem('org_id');

  const [orgPublicQuizzesAccessFlag, setOrgPublicQuizzesAccessFlag] = useState(false);
const [orgCreatePublicQuizzesFlag, setOrgCreatePublicQuizzesFlag] = useState(false);
const [printflag, setprintflag] = useState(false);
const [loginmethod, setloginmethod] = useState("email");
const [modalMessage, setModalMessage] = useState(''); // Message to display
const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
const [isError, setIsError] = useState(false); // Determine success or error modal

const handleToggle = async (flagName, value) => {
  // Save the previous state in case of API failure
  const previousState = {
    org_create_public_quizzes_flag: orgCreatePublicQuizzesFlag,
    org_public_quizzes_access_flag: orgPublicQuizzesAccessFlag,
    print_flag: printflag,
    login_method: loginmethod,
  };

  // Temporarily update the state for immediate UI feedback
  switch (flagName) {
    case "org_create_public_quizzes_flag":
      setOrgCreatePublicQuizzesFlag(value);
      break;
    case "org_public_quizzes_access_flag":
      setOrgPublicQuizzesAccessFlag(value);
      break;
    case "print_flag":
      setprintflag(value);
      break;
    case "login_method":
      setloginmethod(value);
      break;
    default:
      return;
  }

  // Prepare the payload with the updated value
  const payload = {
    updated_by: userId,
    org_id: orgId,
    [flagName]: value, // Update the specific flag dynamically
  };

  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await fetch('https://dev.quizifai.com:8010/edit_organizationprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Check for specific failure conditions
    if (!response.ok || (data.response === 'fail' && data.response_message)) {
      console.error('API Error:', data.response_message);

      // Handle specific error for organization ID
      if (data.response_message.includes('Given organization ID does not exist')) {
        throw new Error('The provided organization ID does not exist. Please check and try again.');
      }

      // General error message for other failure responses
      throw new Error(`API Error: ${data.response_message}`);
    }

    // Successfully updated
    console.log('Response:', data);
    setModalMessage(`${flagName} updated successfully!`);
    setIsError(false);
  } catch (error) {
    console.error('Error:', error);

    // Revert the toggle state to the previous value
    setOrgCreatePublicQuizzesFlag(previousState.org_create_public_quizzes_flag);
    setOrgPublicQuizzesAccessFlag(previousState.org_public_quizzes_access_flag);
    setprintflag(previousState.print_flag);
    setloginmethod(previousState.login_method);

    // Display error message
    setModalMessage(error.message || `Failed to update ${flagName}. Please try again.`);
    setIsError(true);
  } finally {
    setIsModalVisible(true);
  }
};


const fetchOrganizationDetails = async () => {
  try {
    const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

    if (!authToken) {
      throw new Error("No authentication token found");
    }
    const response = await fetch(
      `https://dev.quizifai.com:8010/get_organization_dtls?org_id=${orgId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();
    console.log('API Response:', data);
    if (data.response === 'success') {

      const organizationDetails = data.data; // Access the first object in the `data` array

 

      setOrgPublicQuizzesAccessFlag(organizationDetails.org_public_quizzes_access_flag || '');
      setOrgCreatePublicQuizzesFlag(organizationDetails.org_create_public_quizzes_flag || '');
     
      setloginmethod(organizationDetails.default_login_method || '');
      setprintflag(organizationDetails.print_flag || '');

       
    } else {
      setErrorMessage(data.response_message || 'Failed to fetch data');
    }
  }  catch (error) {
    console.error('Fetch Error:', error);
    alert('An error occurred while fetching data');
  }
};


useEffect(() => {
  fetchOrganizationDetails();
}, []);

const toggler1 = (event) => handleToggle("org_create_public_quizzes_flag", event.target.checked);
const toggler2 = (event) => handleToggle("org_public_quizzes_access_flag", event.target.checked);
const toggler3 = (event) => handleToggle("print_flag", event.target.checked);
const toggler4 = (event) => handleToggle("login_method", event.target.checked);

const closeModal1 = () => {
  setIsModalVisible(false);
  setModalMessage('');
};
const handleBack = () => {
  navigate("/configure")
};
  
  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='w-full p-5 bg-[#f5f5f5]'>
      
    <div onClick={handleBack} className=" absolute top-5 right-5 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
  <div className='flex gap-5 bg-white p-5 rounded-lg'>
 <div>
  <h2 className='text-[#EF5130] font-semibold'>Organization Settings 
  </h2>
 </div>
 <div className='flex gap-2 flex-col mt-[40px]'>
 <div className='flex justify-start gap-3 items-center'>
<h1 className='text-[#214082] font-semibold'>Create public Quizzes</h1>
<FormControlLabel
        control={<Switch />} 
        // label="Required"
          onChange={toggler1}
          checked={orgCreatePublicQuizzesFlag}
          className="react-switch  ml-[19px]"
        />
  </div>

  <div className='flex gap-3  justify-start items-center'>
<h1 className='text-[#214082] font-semibold '>Public Quizzes Access</h1>
<FormControlLabel
        control={<Switch />} 
        // label="Required"
          onChange={toggler2}
          checked={orgPublicQuizzesAccessFlag}
          className="react-switch  ml-[19px]"
        />
  </div>

  <div className='flex justify-normal items-center'>
    <div className='text-[#214082] font-semibold'>
      Login Method :
    </div>
    <div className='flex justify-center gap-2 items-center ml-[65px]'>
      <h1 className='text-[#214082] font-semibold'>Email</h1>
      <FormControlLabel
        control={<Switch />} 
        // label="Required"
          disabled
          onChange={toggler4}
          checked={loginmethod}
          className="react-switch"
        />
    </div>
    <div className='flex justify-center gap-2 items-center'>
      <h1 className='text-[#214082]  font-semibold'>Mobile</h1>
      <FormControlLabel
        control={<Switch />} 
        // label="Required"
          // onChange={toggler4}
          // checked={loginmethod}
          disabled
          className="react-switch"
        />
    </div>
  </div>
  <div className='flex gap-[135px]  justify-start items-center'>
<h1 className='text-[#214082] font-semibold '>Print</h1>
<FormControlLabel
        control={<Switch />} 
        // label="Required"
          onChange={toggler3}
          checked={printflag}
          
          className="react-switch"
        />
  </div>
 </div>
  </div>

    </div>
    {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${isError ? 'border-red-500' : 'border-green-500'} border-t-4`}>
            <h2 className={`text-xl font-semibold ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {isError ? 'Error' : 'Success'}
            </h2>
            <p className="mt-2 text-gray-700">{modalMessage}</p>
            <button
              onClick={closeModal1}
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

export default profilesettings