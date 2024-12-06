"use client";
import React  ,{ useState, useEffect } from "react";
import visible from "../assets/Images/images/profile/visible.png";
import hide from "../assets/Images/images/profile/hide.png";
import Navigation from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function usersgroup() {
    const [preferredLoginMethod, setPreferredLoginMethod] = useState("Email");
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [showNewPasswords, setShowNewPasswords] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

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
      const password = generateRandomPassword();
      setRandomPassword(password);
    } else {
      setRandomPassword(''); // Clear password if email is empty
    }
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
    
        const formData = {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          user_email: userEmail,
          user_type_id: 3,
          password: randomPassword,
          user_role_id: selectedRoleId,
          user_email: userEmail,
          org_id:orgId,
          created_by: userId,
          updated_by: userId,
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
        setRandomPassword('');
        setSelectedRoleId('');
      }
    // integrating user create end //
      


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


  return (
    <>
      <div className="w-full flex">
        <div>
<Navigation/>
        </div>
        <div className="w-full">

       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
  
  <div className="md:col-span-2">
      <h1 className=" font-semibold text-[20px] text-[#214082]">Create User</h1>
    </div>

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
      <label className="w-[50%] text-blue-800 font-semibold mb-2">Fist Name<span className="text-red-500">*</span></label>
    
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
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
      <label className="w-[50%] text-blue-800 font-semibold mb-2 ">Middle Name<span className="text-red-500"></span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
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
      <label className="w-[50%] text-blue-800 font-semibold mb-2">last Name<span className="text-red-500">*</span></label>
 
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
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
      <label className="w-[50%] text-blue-800 font-semibold mb-2">User Role<span className="text-red-500">*</span></label>
      <select
        id="roles"
        name="roles"
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        onChange={handleRoleChange}
      >
        <option value="" disabled selected>
         Select a Role
        </option>
        {roles  
          .filter((role) => role.role_name !== "Super Admin") 
           .map((role) => (
          <option key={role.user_role_id} value={role.user_role_id}>
            {role.role_name}
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
      <label className="w-[50%] text-blue-800 font-semibold mb-2 ">Email<span className="text-red-500">*</span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        value={userEmail}
        onChange={handleEmailChange}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
 
    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2 ">Password<span className="text-red-500">*</span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type={showPassword ? 'text' : 'password'}
        value={randomPassword}
        required
      />
        <div
        className="absolute  right-5 mt-2 mr-1 text-lg text-[#A7A3FF] cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </div>
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>

  
    
    </div>
    
<div className="flex">
    <div className="w-full flex gap-5 flex-col p-5 ">
    {/* <div className="flex justify-start items-start ">
      <h1 className=" font-semibold text-[20px] text-[#214082]">Login Method</h1>
    </div> */}
    <div
            
          >
                      <label className="text-blue-800 font-semibold">Login Method</label>
            <button
              className={`border-b-2 w-[25%] text-[14px] pl-[10px] ml-[10px] focus:outline-none ${
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
              className={`border-b-2 w-[20%] text-[14px] pl-[10px] focus:outline-none ${
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

          <div className="flex flex-col pl-[100px]">
      <div className="w-[50%] flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2 ">Email<span className="text-red-500">*</span></label>

      <input
        className={ `  w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        value={userEmail}
        onChange={handleEmailChange}
      />
      </div>
    
      <hr className={`h-[1px] w-[50%]`} />
    </div>
    </div>
   
        </div>
       

{responseMessage && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className={`p-4 rounded shadow-lg w-[300px] text-center ${
        responseMessage.includes('success')
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      <p>{responseMessage}</p>
      <button
        onClick={() => setResponseMessage('')} // Close the popup
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  </div>
)}
    <div className="flex justify-between  p-5 pr-[50px] ">
            <button
            //   onClick={() => setStep(2)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Create
            </button>
          </div>
          <div className="flex justify-end px-10">
        <h1 className="text-blue-800 font-semibold"> Settings &gt; Organization &gt; <span onClick={handleexcel} className=" cursor-pointer hover:underline">Bulk user Import</span></h1> 
    </div>
      </div>
      </div>
    </>
  );
}

export default usersgroup;
