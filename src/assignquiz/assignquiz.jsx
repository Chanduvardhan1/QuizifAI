import React from "react";
import Navigation from "../navbar/navbar";
import Select from 'react-select';

import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authcontext/AuthContext";

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'

const assignquiz = () => {
  
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const orgId = localStorage.getItem('org_id');

  const navigate = useNavigate();
  const { isAuthenticated, authToken,logout } = useContext(AuthContext);


  //-----------------**AssignQuiz**-----------------//
const [shareWithGroupOrOrg, setShareWithGroupOrOrg] = useState(false); // Initialize toggle state
const [groupName, setGroupName] = useState('');
const [file, setFile] = useState(null);
const [quizid, setQuizId] = useState(localStorage.getItem('quiz_id'));
const [quizName, setQuizName] = useState(localStorage.getItem("quiz_name"));

const handleToggle = (event) => {
  setShareWithGroupOrOrg(event.target.checked); // Update state based on toggle
}; 

const handleSubmit = async (e) => {
 e.preventDefault();

  const selectedUserIds = selectedUsers.map((user) => user.value); // Extract IDs

  // Prepare FormData
  const formData = new FormData();
  formData.append('quiz_id', quizid);
  formData.append('org_id', orgId);
  formData.append('share_with_group_or_org', shareWithGroupOrOrg);
  formData.append('group_name', groupName);
  formData.append('user_ids',selectedUserIds ); // Pass user IDs as a comma-separated string
  if (file) formData.append('files', file);

  try {
    const response = await fetch(
      'https://dev.quizifai.com:8010/assign-quiz-to-group-organization-or-users/',
      {
        method: 'POST',
        body: formData,
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    alert('Quiz assigned successfully!');
    console.log('Response:', result);
  } catch (error) {
    console.error('Error assigning quiz:', error.message);
    alert('Failed to assign quiz. Please try again.');
  }
};

//-----------------**AssignQuiz END**-----------------//

 //-----------------**users dropdown**-----------------//
const [users, setUsers] = useState([]); // Store dropdown options
const [selectedUsers, setSelectedUsers] = useState([]); // Store selected user IDs
// const [quizId, setQuizId] = useState('');

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error('No authentication token found');
      }
      const response = await fetch(
        `https://dev.quizifai.com:8010/get_organization_nrml_usrs?org_id=${orgId}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.response === 'success' && result.data) {
        // Map response data to react-select options
        const options = result.data.map((user) => ({
          value: user.user_id,
          label: user.user_name,
        }));
        setUsers(options);
      } else {
        console.error('Failed to fetch users:', result.response_message);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  fetchUsers();
}, []);
//-----------------**users dropdown END**-----------------//
const toggler1 = (event) => {
    setMultiAnswer(event.target.checked);
  };
  const customOption = ({ data, innerRef, innerProps, isSelected }) => (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center p-2 cursor-pointer ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-100'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {}}
        className="mr-2"
      />
      <span>{data.label}</span>
    </div>
  );
  
  return (
    <>
      <div className="flex w-full">
        <Navigation />
        <div className="w-full bg-white my-4 p-5">
    <div className="flex flex-col gap-6 bg-white ">
    
    <div className="flex items-start">
        <h1 className=" font-semibold text-[20px] text-[#214082]">Assign Quizzes</h1>
      </div>
     
      {/* <div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Oragnization<span className="text-red-500">*</span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
value={orgId}
                  placeholder="Oragnization"
                
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div> */}
<div className="flex gap-6 w-full">

<div className="flex flex-col  gap-6 w-full">
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Quiz Id<span className="text-red-500">*</span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                             value={`${quizName}(ID: ${quizid})`} 
                  placeholder="Oragnization"
                
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div>



<div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[72px]">
        Sharing with Group/Organization
        <span className="text-red-500">*</span>
        </label>
        <FormControlLabel
        control={<Switch />} 
        checked={shareWithGroupOrOrg} // Controlled state
        onChange={handleToggle} // Update state on toggle
          className="react-switch"
        />
        
      </div>
    
    {!shareWithGroupOrOrg && (
        <div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Deparment<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      // value={selectedCourse}
      // onChange={handleSelectCourse}
    >
      <option value="" disabled>Select a Deparment</option>
      <option value="">None</option>
      {/* {courses.map((course) => (
        <option key={course.course_id} value={course.course_name}>
          {course.course_name}
        </option>
      ))} */}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>
 )}
  {!shareWithGroupOrOrg &&(
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      User ID<span className="text-red-500">*</span>
    </label>
    {/* <Select
  options={users} // Dynamically populated options
isMulti
  value={selectedUsers} // Selected values
  onChange={setSelectedUsers} // Update state on selection
  className="basic-multi-select w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
  classNamePrefix="select"
/> */}
 <Select
        options={users}
        isMulti
        value={selectedUsers}
        onChange={setSelectedUsers}
        className="basic-multi-select w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
        classNamePrefix="select"
        placeholder="Search and select users..."
        closeMenuOnSelect={false}
        components={{ Option: customOption }}
        isSearchable={true}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#2563EB' : '#D1D5DB',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : base.boxShadow,
            '&:hover': { borderColor: '#2563EB' },
          }),
          option: (base, state) => ({
            ...base,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: '#2563EB',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#2563EB',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#2563EB',
            ':hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              color: 'white',
            },
          }),
        }}
      />

  </div>
  {/* <hr className="h-[1px] w-full" /> */}
</div>
   
)}
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
    File <span className="text-red-500"></span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="File"
                  type="file"
          onChange={(e) => setFile(e.target.files[0])}
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div>
</div>

<div className="flex flex-col  gap-6 w-full">
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      School<span className="text-red-500"></span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="School"
                  // value={quiztotalmarks}
                  // onChange={(e) => setquiztotalmarks(e.target.value)}
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div>
      <div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Class<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      // value={selectedCourse}
      // onChange={handleSelectCourse}
    >
      <option value="" disabled>Select a Class</option>
      <option value="">None</option>
      {/* {courses.map((course) => (
        <option key={course.course_id} value={course.course_name}>
          {course.course_name}
        </option>
      ))} */}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>
<div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className=" w-[20%] text-blue-800 font-semibold mb-2">
    Section<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      // value={selectedClass}
      // onChange={handleSelectClass}
      // disabled={classes.length === 0}
    >
      <option value="" disabled>Select a Section</option>
      {/* {classes.map((className, index) => (
        <option key={index} value={className}>
          {className}
        </option>
      ))} */}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>

<div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[72px]">
        Email Alert <span className="text-red-500"></span>
        </label>
        <FormControlLabel
        control={<Switch />} 
        // label="Required"
          onChange={toggler1}
        //   checked={multiAnswer}
          className="react-switch"
        />
        
      </div>

{/* Section */}



</div>

</div>











    </div>
  
    <div className="flex justify-end md:col-span-2 py-5">
    

        
            <div className="flex gap-2">
            

            <button
            onClick={handleSubmit}
              // onClick={handleNextpage4}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Assign
            </button>
            </div>
          
          </div>
   
 
   
    </div>
        {/* <LogoutBar /> */}
      </div>
    </>
  );
};

export default assignquiz;
