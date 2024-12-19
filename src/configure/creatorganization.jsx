import React, { useEffect } from "react";
import { useState } from "react";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'


//-------------**importing  navbar**-------------//

import Navigation from "../navbar/navbar.jsx";

//-------------**importing  navbar end**-------------//


//-------------**importing images react-icons**------------- //

import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//-------------**importing images react-icons end**-------------//

//-------------**importing images**------------- //

import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import close from "../../src/assets/Images/images/dashboard/cancel.png"

// import Delete from "../../src/assets/Images/Assets/Delete.png";
// import Line from "../../src/assets/Images/Assets/Line.png";

//-------------**importing imagesend**------------- //


const creatorganization = () => {


  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [activeFlag, setActiveFlag] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const userId = localStorage.getItem("user_id");
  const [options, setOptions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isOrganization, setIsOrganization] = useState(true);
  const [Organizationid, setOrganizationid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [roles, setRoles] = useState([]); // Store user details
  const [selectedUser, setSelectedUser] = useState([]); // Store selected username
  const [selectedRoleId, setSelectedRoleId] = useState([]) // Store user_role_id for selected username

  const [selectedUser2, setSelectedUser2] = useState(""); // Store selected username
  const [selectedRoleId2, setSelectedRoleId2] = useState('') // Store user_role_id for selected username

  const userRole = localStorage.getItem("user_role");
  const orgId = localStorage.getItem('org_id');

  const [username1, setUsername1] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername1(storedUsername);
    }
  }, []);

  const [erroradmin, seterroradmin] = useState('');
  const [successadmin, setsuccessadmin] = useState('');
const [activeflag ,setactiveflag] = useState(true)


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
    setUserEmail1(email);

    // Generate a random password whenever the email changes
    if (email) {
      const password = generateRandomPassword();
      setRandomPassword(password);
    } else {
      setRandomPassword(''); // Clear password if email is empty
    }
  };

// Randompassword generate end //


// crate admin //
const [firstName1, setFirstName1] = useState("");
const [middleName1, setMiddleName1] = useState("");
const [lastName1, setLastName1] = useState("");
const [userEmail1, setUserEmail1] = useState("");
const [userTypeId, setUserTypeId] = useState(0);
const [orgId1, setOrgId1] = useState(0);
const [createdBy, setCreatedBy] = useState("");
const [updatedBy, setUpdatedBy] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [userAddressId, setUserAddressId] = useState(0);
const [responseMessage, setResponseMessage] = useState("");
const [responseMessage1, setResponseMessage1] = useState("");
const [selectedUserName, setSelectedUserName] = useState("");
const [orgdescription, setorgdescription] = useState("");

const [showPopup1, setShowPopup1] = useState(false);



const handleSubmit2 = (e) => {
    e.preventDefault();
  
    const formData = {
      first_name: firstName1,
      middle_name: middleName1,
      last_name: lastName1,
      user_email: userEmail1,
      user_type_id: 3,
      password: randomPassword,
      user_role_id: 2,
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
        console.log("Response data:", data); // Debug response
        if (data?.success) {
          setResponseMessage("Admin created successfully!");
          fetchUsers();
          reset('');
        } else {
          console.error("Error response:", data);
          setResponseMessage(data.message || "Failed to create user.");
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setResponseMessage("An error occurred. Please try again.");
      });
  };
  
// const handleSubmit3 = (e) => {
//   e.preventDefault();

//   const formData = {
//     first_name: firstName1,
//     middle_name: middleName1,
//     last_name: lastName1,
//     user_email: userEmail1,
//     user_type_id: 3,
//     password: randomPassword,
//     user_role_id: 3,
//     created_by: userId,
//     updated_by: userId,
//   };
//   const authToken = localStorage.getItem("authToken");

//   if (!authToken) {
//     console.error("No authentication token found");
//     return;
//   }
//   fetch("https://dev.quizifai.com:8010/users-create-by-superadmin", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,

//     },
//     body: JSON.stringify(formData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if  (data.success) {
//         setResponseMessage("Admin created successfully!");
//         setShowPopup1(false);
//         fetchUsers();
//         reset('');
        
//       } else {
//         setResponseMessage(data.message || "Failed to create user.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error creating user:", error);
//       setResponseMessage("An error occurred. Please try again.");
//     });
// };

const reset =()=> {
//   setFirstName('');
//   setMiddleName('');
//   setLastName('');
  setUserEmail1('');
  setRandomPassword('');
  setSelectedRoleId('');
}

// crate end //





// -----------------**create orginaization**-----------------// 



const handleSubmit1 = async (e) => {
  e.preventDefault();
  if (!userId || userId.trim() === "") {
    setResponseMessage1("User ID is required.");
    return;
  }
  if (!groupName || groupName.trim() === "") {
    setResponseMessage1("Organization name is required.");
    return;
  }
  if (!selectedUser2) {
    setResponseMessage1("Organization admin is required.");
    return;
  }
  if (!orgdescription || orgdescription.trim() === "") {
    setResponseMessage1("Organization description is required.");
    return;
  }

  const payload = {
    user_id: userId,
    org_name: groupName,
    org_admin_id: selectedUser2,
    org_description:orgdescription,
  };

  try {
    const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

  if (!authToken) {
    throw new Error("No authentication token found");
  }
    const response = await fetch('https://dev.quizifai.com:8010/add_organizationprofile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
    setResponseMessage1('Organization Created successfully!');
  } catch (error) {
    console.error('Error:', error);
    setResponseMessage1('Failed to add organization Created.');
  }
};
//-----------------**create orginaization end**-----------------//

  // Handle form submission
  // const handleSubmit1 = async (e) => {
  //   e.preventDefault();
    
  //   // Prepare the payload
  //   const payload = {
  //     org_id: parseInt(orgId),  // Ensure numbers are integers
  //     user_id: parseInt(userId),
  //     org_name: orgName,
  //     role_id: parseInt(roleId),
  //     mobile,
  //     email,
  //     user_first_name: firstName,
  //     user_middle_name: middleName,
  //     user_last_name: lastName,
  //   };

  //   try {
  //     const response = await fetch('https://dev.quizifai.com:8010/admin-role-updation', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await response.json();
      
  //     if (response.ok) {
  //       // Handle success
  //       setsuccessadmin('Role updated successfully');
  //       seterroradmin('')
  //     } else {
  //       // Handle error
  //       seterroradmin(`Error: ${result.message}`);
  //     }
  //   } catch (error) {
  //     alert('Error during submission');
  //     console.error('Error:', error);
  //   }
  // };


  // Fetch group-admin data//
 
  const [users1, setUsers1] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [selectedUserId2, setSelectedUserId2] = useState([]);


    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dev.quizifai.com:8010/admin-users/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFuZHUgdmFyZGhhbiBrIiwiZXhwIjoyNTM0MDIzMDA3OTl9.9gCqjDdJvlOzvV-Bqpian_CpYAen9Uh739KAZ5qEYr8",
          },
        });
        const data = await response.json();
        if (data.response === "success") {
          setUsers1(data.data);
        } else {
          console.error("Failed to fetch user data:", data.response_message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    useEffect(() => {
    fetchUsers();
  }, []);




  const handleSelectChange2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser2(selectedValue);

    // Find the selected user's role_id
    // const selectedUserDetails = roles.find((user) => user.userName === selectedValue);
    
    const selectedUserDetails = users1.find(
        (user) => user.user_id.toString() === selectedValue
      );
      if (selectedUserDetails) {
        setSelectedUserName(selectedUserDetails.user_name.trim() || "Unnamed User");
    }
    // if (selectedValue === "createAdmin") {
    //   setShowPopup(true);
    // }
    console.log("Selected selectedUserName:", selectedUserName);

    console.log("Selected Role:", selectedValue);
  };


  const handleSelectChange1 = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);

    // Find the selected user's role_id
    const selectedUserDetails = roles.find((user) => user.userName === selectedValue);
    if (selectedUserDetails) {
      setSelectedRoleId([selectedUserDetails.roleId]);
    }
    if (selectedValue === "QuizMaster") {
      setShowPopup1(true);
    }

    console.log("Selected Role:", selectedValue);
  };

  const handleAdminopen = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    fetchUsers();
  };
  const closePopup1 = () => {
    setShowPopup1(false);
    setSelectedUser2("");
  };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsOrganization(isChecked);
    setOrganizationid(event.target.checked);
  };






  

  const navigate = useNavigate();
  const handleBanckToDashbaord = () => {
    navigate("/configure");
  };

  // const options = users.map(user => ({
  //   value: user.user_id,
  //   label: user.user_name
  // }));

  const handleChange = (selectedOptions) => {
    setSelectedUserIds(selectedOptions.map((option) => option.value));
  };
 const  handleclose = () => {
  setResponseMessage('');
  setShowPopup(false);

 }
 const  handleclose1 = () => {
    setResponseMessage1('');
    setShowPopup(false);
  
   }

   const handleBack = () => {
    navigate("/configure")
  };
  return (
    <>
      <div className="flex w-full font-Poppins">
        <Navigation />
        <div className="flex w-full flex-col p-5 bg-[#cfcfcf]">
      
        <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
          <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530] font-bold">Create Organization</h1>
          </div>
          <div className="w-full bg-white rounded-lg flex justify-center p-5">

        
          <div className='w-[90%] justify-center flex flex-col gap-5'>
   
      {/* <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[23%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization<span className="text-red-500">*</span></label>
        <FormControlLabel
        control={<Switch />} 
        disabled
        onChange={handleCheckboxChange}
        checked={isOrganization} />
          
        </div>
      
      </div> */}




      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Name<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Description<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Description"
                value={orgdescription}
                onChange={(e) => setorgdescription(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

  



<div className="flex flex-col w-full">
        <div className="w-full flex gap-[50px] flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin<span className="text-red-500"></span></label>
 
        <button
                     onClick={handleAdminopen}
                      className="w-[25%] px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
        
                    >
                      Create Admin
                    </button>
        <select
       className={ ` w-full  border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

placeholder="Select User"
value={selectedUser2}
onChange={handleSelectChange2}

     >
        <option value="" disabled>Select an Admin</option>
        {users1.map((user) => (
        <option key={user.user_id} value={user.user_id}>
          {user.user_name.trim() || "Unnamed User"} (Id: {user.user_id})
        </option>
      ))}

     </select> 

        </div>
      
        {/* <hr className={`h-[1px] w-full`} /> */}
      </div> 
  
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin Name<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Description"
                value={selectedUserName}
                // onChange={(e) => setGroupDescription(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
                   
                   <div className="flex justify-end md:col-span-2 mt-2">

                   
                    <button
                     onClick={handleSubmit1}
                      className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
        
                    >
                      Create
                    </button>
                    </div>
         
  
    </div>
    </div>
    {responseMessage1 && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className={`p-4 rounded shadow-lg w-[300px] text-center ${
        responseMessage1.includes('success')
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      <p>{responseMessage1}</p>
      <button
        onClick={handleclose1} // Close the popup
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  </div>
)}   

      
            {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Create Admin</h2>

{/* <div className="flex w-full mb-2">
<label className="block mb-2 w-[65%] text-blue-800 font-semibold text-[14px] ">
                User Role
              </label>
              <div className="flex w-full border border-gray-500 p-2  ">

            <input type="checkbox" name="" id="" className="p"/>
              <p className="pl-1">Orgination Admin</p>
              </div>
</div> */}

            <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Fist Name<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={firstName1} 
          onChange={(e) => setFirstName1(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Middle Name<span className="text-red-500"></span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={middleName1} 
          onChange={(e) => setMiddleName1(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Last Name<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={lastName1} 
          onChange={(e) => setLastName1(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     
      {/* <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">User ID<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={userId1} 
          onChange={(e) => setUserId1(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
      {/* <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Role ID<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={roleId} 
          onChange={(e) => setRoleId(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
      {/* <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Organization ID<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={orgId} 
          onChange={(e) => setOrgId(e.target.value)}  
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
      {/* <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Name of Organization<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={orgName} 
          onChange={(e) => setOrgName(e.target.value)}
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
      {/* <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Mobile<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={mobile} 
          onChange={(e) => setMobile(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
   
      <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Email<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={userEmail1}
            onChange={handleEmailChange}
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
              
      <div className="flex flex-col mb-2">
      <div className="w-full flex flex-row">
      <label className="w-[65%] text-blue-800 font-semibold mb-2 ">Password<span className="text-red-500">*</span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type={showPassword ? 'text' : 'password'}
        value={randomPassword}
        required
      />
        <div
        className="absolute  right-[450px] mt-2 mr-1 text-lg text-[#A7A3FF] cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </div>
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>

             
             
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                onClick={handleSubmit2}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
         <div>
    
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
        onClick={handleclose} // Close the popup
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  </div>
)}
         {erroradmin && <p className="text-red-500">{erroradmin}</p>}
          {successadmin && <p className="text-green-500">{successadmin}</p>}
         </div>
          </div>
        </div>
      )}
           {showPopup1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Create Quiz Master</h2>

{/* <div className="flex w-full mb-2">
<label className="block mb-2 w-[65%] text-blue-800 font-semibold text-[14px] ">
                User Role
              </label>
              <div className="flex w-full border border-gray-500 p-2  ">

            <input type="checkbox" name="" id="" className="p"/>
              <p className="pl-1">Orgination Admin</p>
              </div>
</div> */}

            <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Fist Name<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={firstName1} 
          onChange={(e) => setFirstName1(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Middle Name<span className="text-red-500"></span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={middleName1} 
          onChange={(e) => setMiddleName1(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Last Name<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={lastName1} 
          onChange={(e) => setLastName1(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     
     
    
  
   
      <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Email<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={userEmail1}
            onChange={handleEmailChange}
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
              
      <div className="flex flex-col mb-2">
      <div className="w-full flex flex-row">
      <label className="w-[65%] text-blue-800 font-semibold mb-2 ">Password<span className="text-red-500">*</span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type={showPassword ? 'text' : 'password'}
        value={randomPassword}
        required
      />
        <div
        className="absolute  right-[450px] mt-2 mr-1 text-lg text-[#A7A3FF] cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </div>
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>

             
             
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closePopup1}
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                onClick={handleSubmit3}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
         <div>
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
         {erroradmin && <p className="text-red-500">{erroradmin}</p>}
          {successadmin && <p className="text-green-500">{successadmin}</p>}
         </div>
          </div>
        </div>
      )}


        


        </div>

      </div>
    </>
  );
};

export default creatorganization;
