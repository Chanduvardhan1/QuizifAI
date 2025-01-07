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


// --------------***class and sections *** -------------- //
const [classes1, setClasses1] = useState([]);
const [sections, setSections] = useState([]);
const [selectedClass1, setSelectedClass1] = useState('');
const [selectedSection, setSelectedSection] = useState('');
const [departments, setDepartments] = useState([]);
const [selectedDepartmentId, setSelectedDepartmentId] = useState("");


useEffect(() => {
  // Fetch organization-related details
  const fetchDetails = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      const response = await fetch(
        `https://dev.quizifai.com:8010/get_organization_related_dept_cls_sec_details?org_id=${orgId}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: '', // Empty body for POST request
        }
      );
      const data = await response.json();
      setClasses1(data.data.classes || []);
      setSections(data.data.sections || []);
      setDepartments(data.data.departments || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDetails();
}, []);

const handleClassChange = (e) => {
  setSelectedClass1(e.target.value);
};

const handleSectionChange = (e) => {
  setSelectedSection(e.target.value);
};



// --------------***class and sections end*** -------------- //


  //---------------**Department Selector**----------------//

 
  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     try {
  //       const authToken = localStorage.getItem("authToken"); // Replace with actual token retrieval logic

  //       if (!authToken) {
  //         console.error("No authentication token found");
  //         setErrorMessage("Authentication token not found.");
  //         return;
  //       }

  //       const response = await fetch(
  //         "https://dev.quizifai.com:8010/view_departments_created_by_admin/?admin_id=1037",
  //         {
  //           method: "GET",
  //           headers: {
  //             accept: "application/json",
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );

  //       const result = await response.json();

  //       if (response.ok && result.response === "success") {
  //         setDepartments(result.data);
  //       } else {
  //         console.error("Failed to fetch departments:", result);
  //         setErrorMessage("Failed to fetch departments.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching departments:", error);
  //       setErrorMessage("An error occurred while fetching departments.");
  //     }
  //   };

  //   fetchDepartments();
  // }, []);

  const handleDepartmentChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDepartmentId(selectedId);

    // Pass department_id to the backend or handle it as needed
    console.log("Selected department_id:", selectedId);
  };

    //---------------**Department Selector end**----------------//



  //-----------------**AssignQuiz**-----------------//
const [shareWithGroupOrOrg, setShareWithGroupOrOrg] = useState(false); // Initialize toggle state
const [groupName, setGroupName] = useState('');
const [file, setFile] = useState(null);
const [quizid, setQuizId] = useState(localStorage.getItem('quiz_id'));
const [quizName, setQuizName] = useState(localStorage.getItem("quiz_name"));

const [showassign, setShowassign] = useState(false);
const [isError1, setIsError1] = useState(false);
const [modalMessage2, setModalMessage2] = useState('');

const closeModal2 = () => {
  setShowassign(false);
};

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
  formData.append('department_id', selectedDepartmentId);
  formData.append('section_id', selectedSection);
  formData.append('class_id', selectedClass1);
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

    if (result && result.response === "success") {
      // Check if response indicates success
      setModalMessage2('Quiz assigned successfully!');
      setIsError1(false);
    } else {
      setModalMessage2('Failed to assign quiz. Please try again.');
      setIsError1(true);
    }

    setShowassign(true);
    console.log('Response:', result);
  } catch (error) {
    console.error('Error assigning quiz:', error.message);
    setModalMessage2('Failed to assign quiz. Please try again.');
    setIsError1(true);
    setShowassign(true);
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
    
      {/* {!shareWithGroupOrOrg && ( */}
        <div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Deparment<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      value={selectedDepartmentId}
      onChange={handleDepartmentChange}
    >
      <option value="" disabled>Select a Deparment</option>
      <option value="">None</option>
      {departments.map((dept) => (
          <option key={dept.department_id} value={dept.department_id}>
            {dept.department_name}
          </option>
        ))}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>
 {/* )} */}
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

      <div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Class<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      value={selectedClass1}
      onChange={handleClassChange}
    >
      <option value="" disabled>Select a Class</option>
      <option value="">None</option>
      {classes1.map((cls) => (
            <option key={cls.class_id} value={cls.class_id}>
              {cls.class_name}
            </option>
          ))}
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
      value={selectedSection}
      onChange={handleSectionChange}
    >
      <option value="" disabled>Select a Section</option>
      <option value="">None</option>
      {sections
            .filter((sec) => sec.class_id === parseInt(selectedClass1))
            .map((sec) => (
              <option key={sec.section_id} value={sec.section_id}>
                {sec.section_name}
              </option>
            ))} 
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>







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
   
          {showassign && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
        isError1 ? "border-red-500" : "border-green-500"
      } border-t-4`}
    >
      <h2
        className={`text-xl font-semibold ${
          isError1 ? "text-red-500" : "text-green-500"
        }`}
      >
        {isError1 ? "Error" : "Success"}
      </h2>
      <p className="mt-2 text-gray-700">{modalMessage2}</p>
      <button
        onClick={closeModal2}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
   
    </div>
        {/* <LogoutBar /> */}
      </div>
    </>
  );
};

export default assignquiz;
