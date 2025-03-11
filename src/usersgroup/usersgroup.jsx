"use client";
import React  ,{ useState, useEffect } from "react";
import visible from "../assets/Images/images/profile/visible.png";
import hide from "../assets/Images/images/profile/hide.png";
import Navigation from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import close from "../../src/assets/Images/images/dashboard/cancel.png"
import editicon from "../../src/assets/Images/quiz-type/edit.png"
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function usersgroup() {
    const [preferredLoginMethod, setPreferredLoginMethod] = useState("Email");
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [showNewPasswords, setShowNewPasswords] = useState(false);
  const [loading1, setLoading1] = useState(false);

    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");

    const [username1, setUsername1] = useState("");

useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    setUsername1(storedUsername);
  }
}, []);

    const handleLoginCancelClick1 = () => {
        setShowNewPasswords(false);
      };

      // const togglePasswordVisibility = (type) => {
      //   if (type === "old") {
      //     setOldPasswordVisible(!oldPasswordVisible);
      //   } else if (type === "new") {
      //     setNewPasswordVisible(!newPasswordVisible);
      //   } else if (type === "confirm") {
      //     setConfirmPasswordVisible(!confirmPasswordVisible);
      //   }
      // };
      const handleexcel = () => {
        navigate("/excelcreat")
      }

// --------------***view image*** -------------- //
const [photo, setPhoto] = useState(''); // State to store the image URL
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(null);

      const fetchProfileImage = async () => {
        try {
          const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
                if (!authToken) {
                  console.error("No authentication token found. Please log in again.");
                  return;
                }
          const response = await fetch(`https://dev.quizifai.com:8010/view-profile_image?user_id=${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'accept': 'application/json',
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            if (data.response === 'success') {
              setPhoto(data.data); // Set the image URL from the response
            } else {
              setPhoto(defaultPhoto);
            }
          } else {
            setPhoto(defaultPhoto);
            // setError('Failed to fetch image');
          }
        } catch (error) {
          setPhoto(defaultPhoto);
          // setError('Error fetching image: ' + error.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchProfileImage();
      }, []);
// --------------***view image end*** -------------- //

// --------------***class and sections *** -------------- //
const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);
const [selectedClass, setSelectedClass] = useState('');
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
      setClasses(data.data.classes || []);
      setSections(data.data.sections || []);
      setDepartments(data.data.departments || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDetails();
}, []);

const handleClassChange = (e) => {
  setSelectedClass(e.target.value);
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
  //         setError("Authentication token not found.");
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
  //         setError("Failed to fetch departments.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching departments:", error);
  //       setError("An error occurred while fetching departments.");
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


// Randompassword generate //
const [randomPassword, setRandomPassword] = useState('');
const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const generateRandomPassword = (length = 8) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  // Handle change for email input
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserEmail(email);

    // Generate a random password whenever the email changes
    if (email) {
      const generatedPassword = generateRandomPassword();
      setRandomPassword(generatedPassword);
      setPassword(generatedPassword); // Update both randomPassword and password
    } else {
      setRandomPassword('');
      setPassword(''); // Clear password if email is empty
    }
  };
  const [validationMessages, setValidationMessages] = useState([]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Validation conditions
    const errors = [];
    if (value.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(value)) {
      errors.push("Password must have at least 1 uppercase letter.");
    }
    if ((value.match(/[a-z]/g) || []).length < 3) {
      errors.push("Password must have at least 3 lowercase letters.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push("Password must have at least 1 special symbol.");
    }

    setValidationMessages(errors);
  };

// Randompassword generate end //


// roles linst fetch //

const [roles, setRoles] = useState([]); // To store roles from API
const [selectedRoleId, setSelectedRoleId] = useState(null); 

useEffect(() => {
  const fetchRoles = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("No authentication token found");
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/roles/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const result = await response.json();
      if (result.response === 'success') {
        setRoles(result.data); // Store roles in state
      } else {
        console.error('Failed to fetch roles:', result.response_message);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  fetchRoles();
}, []);

const handleRoleChange = (e) => {
  const selectedId = e.target.value;
  setSelectedRoleId(selectedId);
  console.log('Selected Role ID:', selectedId);
};

// roles linst fetch end //


      // integrating user create //


      const [firstName, setFirstName] = useState("");
      const [middleName, setMiddleName] = useState("");
      const [lastName, setLastName] = useState("");
      const [userEmail, setUserEmail] = useState("");
      const [userTypeId, setUserTypeId] = useState(0);
      const orgId = localStorage.getItem('org_id');

      
      const [dateOfBirth, setDateOfBirth] = useState("");
      const [userAddressId, setUserAddressId] = useState('');
    
      const [responseMessage, setResponseMessage] = useState("");

      const handleChange = (e, setter) => {
        setter(e.target.value);
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
          toast.error("First name and last name are required.");
          return;
        }
      
        if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
          toast.error("Please enter a valid email address.");
          return;
        }
      
        if (!password || password.length < 8) {
          toast.error("Password must be at least 6 characters long.");
          return;
        }
      
        if (!selectedRoleId) {
          toast.error("Please select a role.");
          return;
        }
      

        const formData = {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          user_email: userEmail,
          user_type_id: 3,
          password: password,
          user_role_id: selectedRoleId,
          user_email: userEmail,
          org_id:orgId,
          created_by: userId,
          updated_by: userId,
          department_id: selectedDepartmentId,
          class_id: selectedClass,
          section_id: selectedSection,
        };
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }
        fetch("https://dev.quizifai.com:8010/users-create-by-superadmin", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,

          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if  (data.success) {
              setResponseMessage("User created successfully!");
              reset('');
              
            } else {
              setResponseMessage(data.message || "Failed to create user.");
            }
          })
          .catch((error) => {
            console.error("Error creating user:", error);
            setResponseMessage("An error occurred. Please try again.");
          });
      };

 
      const reset =()=> {
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setUserEmail('');
        setPassword('');
        setRandomPassword('');
        setSelectedRoleId('');
      }
    // integrating user create end //
      
const handleclose = ()=> {
  setResponseMessage('');
  window.location.reload();

}

    // user type list//
const [userTypes, setUserTypes] = useState([]);
const [selectedUserTypeId, setSelectedUserTypeId] = useState(null);

useEffect(() => {

  fetch("https://dev.quizifai.com:8010/user_type/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response === "success") {
        setUserTypes(data.data);
      } else {
        alert(data.response_message || "Failed to fetch user types.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user types:", error);
    });
}, []);

// Handle selection of user type
const handleUserTypeChange = (e) => {
  const userTypeId = parseInt(e.target.value, 10); // Get the selected user_type_id
  setSelectedUserTypeId(userTypeId);
  console.log("Selected User Type ID:", userTypeId);
  // Here you can send the `userTypeId` to the backend or perform other actions
};
// user type end//
const handleBack = () => {
  navigate(-1)
};
  const [ isEditing ,setisEditing] = useState(false);

const handeledit =()=> {
  setisEditing((prevState) => !prevState);
 }

  return (
    <>
      <div className="w-full flex">
        <div>
<Navigation/>
<ToastContainer/>
        </div>
        <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
        <div className="w-full">

       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white mt-4 px-5 pb-5">
  
  <div className="md:col-span-2">
      <h1 className="text-center text-[24px] font-bold text-[#F17530]">Create User</h1>
    </div>
    {userRole === 'Admin' && (
    <div className="flex md:col-span-2 gap-2 items-center">
    <div
      className="rounded-full w-[80px]  h-[80px]"

    >
     
        <img
          className="w-[80px] h-[80px] rounded-2xl"
          src={photo}
          alt="Default"
        />
    
    </div>

    <div className=" font-bold text-[#214082]">
      <span className="text-[15px]">Welcome </span>
      <span className="text-[15px]">
        {username1.charAt(0).toUpperCase() + username1.slice(1)}
      </span>
      <br />
      <span className="text-[15px]">User ID : </span>
      <span className=" font-normal text-[12px]">{userId}</span>
      {/* <span className="text-[15px] ml-1">A ID : </span>
      <span className=" font-normal text-[12px]">{userId}</span> */}
    </div>
    </div>
    )}

    {/* User Id*/}
   
    {/* <div className="flex flex-col md:col-span-2">
      <div className="w-[50%] flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2  ">User Id</label>
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-[50%]`} />
    </div>
   */}
   
    {/*  Fist Name*/}
    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2">First Name<span className="text-red-500">*</span></label>
    
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        type="text"
        required
        value={firstName}
        onChange={(e) => handleChange(e, setFirstName)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
   
   {/* Middle Name */}
<div className="flex flex-col ">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2 ">Middle Name<span className="text-red-500"></span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        type="text"
        required
        value={middleName}
        onChange={(e) => handleChange(e, setMiddleName)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
    {/* Address */}
    {/* <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2">Address 1</label>

    
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        value={userAddressId}
            onChange={(e) => handleChange(e, setUserAddressId)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div> */}
     {/* last Name */}
    
<div className="flex flex-col ">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2">Last Name<span className="text-red-500">*</span></label>
 
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        type="text"
        required
        value={lastName}
        onChange={(e) => handleChange(e, setLastName)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2">User Role<span className="text-red-500">*</span></label>
      <select
        id="roles"
        name="roles"
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        onChange={handleRoleChange}
      >
        <option value="" disabled selected>
         Select a Role
        </option>
        {roles  
          .filter((role) => role.role_name !== "Super Admin" && role.role_name !== "Admin") 
           .map((role) => (
          <option key={role.user_role_id} value={role.user_role_id}>
            {role.role_name}
          </option>
        ))}
      </select>
     
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>

    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2">Departments<span className="text-red-500"></span></label>
      <select
        id="roles"
        name="roles"
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        value={selectedDepartmentId}
        onChange={handleDepartmentChange}
      >
        <option value="" disabled selected>
        Select a department
        </option>
        {departments.map((dept) => (
          <option key={dept.department_id} value={dept.department_id}>
            {dept.department_name}
          </option>
        ))}
      </select>
     
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>

    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2">Class<span className="text-red-500"></span></label>
      <select
        id="roles"
        name="roles"
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        value={selectedClass}
        onChange={handleClassChange}
      >
        <option value="" disabled selected>
        Select a class
        </option>
        {classes.map((cls) => (
            <option key={cls.class_id} value={cls.class_id}>
              {cls.class_name}
            </option>
          ))}
      </select>
     
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>

    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2">Section<span className="text-red-500"></span></label>
      <select
        id="roles"
        name="roles"
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        value={selectedSection}
        onChange={handleSectionChange}
      >
        <option value="" disabled selected>
        Select a Section
        </option>
        {sections
            .filter((sec) => sec.class_id === parseInt(selectedClass))
            .map((sec) => (
              <option key={sec.section_id} value={sec.section_id}>
                {sec.section_name}
              </option>
            ))}      
      </select>
     
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
    {/* Address 2 */}
    {/* <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2 ">Address 2</label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div> */}
   

    


   {/* email */}
<div className="flex flex-col ">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2 ">Email<span className="text-red-500">*</span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        type="text"
        required
        value={userEmail}
        onChange={handleEmailChange}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
    <div className="w-full flex items-center ">

    <div className=" w-full flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[26%] text-blue-800 font-semibold mb-2 ">Password<span className="text-red-500">*</span></label>

      <div className="relative w-full">
  <input
     className={`w-full border-transparent h-8 border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none ${
      !isEditing ? 'text-gray-700 cursor-not-allowed' : 'text-black'
    }`}
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={handlePasswordChange}
    disabled={!isEditing}
    required
  />
  {/* Password visibility toggle */}
  <div
    onClick={togglePasswordVisibility}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#A7A3FF] cursor-pointer"
  >
    {showPassword ? <FaEye /> : <FaEyeSlash />}
  </div>
</div>

      </div>
    
      <hr className={`h-[1px] w-full`} />
      {validationMessages.length > 0 && (
        <div className="mt-2">
          {validationMessages.map((message, index) => (
            <p key={index} className="text-red-500 text-sm">
              {message}
            </p>
          ))}
        </div>
      )}
    </div>

    <div className="ml-2">
      {isEditing ? (
        <button
          onClick={handeledit} // Switch back to edit mode
           className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
        >
          Save
        </button>
      ) : (
        <img
          src={editicon}
          onClick={handeledit} // Switch to save mode
          className="w-[18px] h-[18px] cursor-pointer"
          alt="Edit"
        />
      )}
    </div>
            </div>
    
    </div>
    
<div className="flex w-full">
    <div className="w-full flex flex-col gap-5 px-5 ">
    {/* <div className="flex justify-start items-start ">
      <h1 className=" font-semibold text-[20px] text-[#214082]">Login Method</h1>
    </div> */}
    <div className="flex w-[75%]"
            
          >
                      <label className="text-blue-800 font-semibold">Login Method</label>
            <button
              className={`border-b-2 w-[10%] text-[15px] pl-[10px] ml-[10px] focus:outline-none ${
                preferredLoginMethod === "Email"
                  ? "border-blue-200"
                  : "border-transparent"
              } `}
              onClick={() =>setPreferredLoginMethod("Email")}
            //   disabled={!isEditingLogin}
            >
              Email
            </button>

           
            {/* <button
              className={`border-b-2 w-[25%] text-[14px] pl-[10px] focus:outline-none ${
                preferredLoginMethod === "Mobile"
                  ? "border-blue-200"
                  : "border-transparent"
              } `}
              onClick={() =>
              setPreferredLoginMethod("Mobile")
              }
            //   disabled={!isEditingLogin}
            >
              Mobile
            </button> */}
            {/* <hr className="h-[1px] w-[90px] bg-gray-200"></hr> */}
          </div>
          <div className="flex justify-between">

         
          <div className="flex w-full flex-col">
      <div className="w-[56%] flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2 ">Email<span className="text-red-500">*</span></label>

      <input
        className={ `  w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[15px] focus:outline-none `}
        type="text"
        required
        value={userEmail}
        onChange={handleEmailChange}
      />
      </div>
    
      <hr className={`h-[1px] w-[56%]`} />
    </div>
    <div className="flex  pr-[50px] ">
            {/* <button
            //   onClick={() => setStep(2)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Edit
            </button> */}
            <button
              onClick={handleSubmit}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Create
            </button>
          </div>
    </div>
        
    </div>
   
        </div>
       

{responseMessage && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div
    className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
      responseMessage.includes('success') ? 'border-green-500' : 'border-red-500'
    } border-t-4`}
  >
    <h2
      className={`text-xl font-semibold ${
        responseMessage.includes('success') ? 'text-green-500' : 'text-red-500'
      }`}
    >
      {responseMessage.includes('success') ? 'Success' : 'Error'}
    </h2>
    <p className="mt-2 text-gray-700">{responseMessage}</p>
    <button
      onClick={handleclose} // Close the popup
      className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
    >
      Close
    </button>
  </div>
</div>

)}
    
          <div className="flex justify-end px-10">
        {/* <h1 className="text-blue-800 font-semibold"> Settings &gt; Organization &gt; <span onClick={handleexcel} className=" cursor-pointer hover:underline">Bulk user Import</span></h1>  */}
    </div>
      </div>
      </div>
    </>
  );
}

export default usersgroup;
