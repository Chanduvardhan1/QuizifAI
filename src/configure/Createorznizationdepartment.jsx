import React, { useEffect } from "react";
import { useState } from "react";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import { CircularProgress } from "@mui/material";


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


const creatorganizationdeparment = () => {


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
  const [loading1, setLoading1] = useState(false); // Loading state

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


//-----------------**Emloyes List**-----------------//

const [Emloyesusers, setEmloyesusers] = useState([]); // Store dropdown options
const [selectedUsers, setSelectedUsers] = useState([]);
const [selectedUsers2, setSelectedUsers2] = useState([]);

const [selectedUsers1, setSelectedUsers1] = useState(''); // Store selected user IDs
 // Store selected user IDs
// const [quizId, setQuizId] = useState('');

//-----------------**Emloyes List End**-----------------//

// --------------***view image*** -------------- //
const [photo, setPhoto] = useState(''); // State to store the image URL
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(null);

// --------------***view image end*** -------------- //


// --------------***user type list*** -------------- //

const [userTypes, setUserTypes] = useState([]);
  const [selectedUserTypeId, setSelectedUserTypeId] = useState(null);

// --------------***user type list end*** -------------- //


// --------------***Randompassword generate*** -------------- //

const [randomPassword, setRandomPassword] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

// --------------***Randompassword generate end*** -------------- //

// --------------***Fetch group-admin data*** -------------- //

const [users1, setUsers1] = useState([]);
const [selectedUserId, setSelectedUserId] = useState([]);
const [selectedUserId2, setSelectedUserId2] = useState([]);

// --------------***Fetch group-admin data end*** -------------- //


// --------------***crate admin*** -------------- //

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
const [Departmentid , setDepartmentid] = useState('');
const [showPopup1, setShowPopup1] = useState(false);
const [edit, setedit] = useState(false);

// --------------***crate admin end*** -------------- //


// user type list//

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


  // Fetch group-admin data//
 
 

    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        setLoading1(true);
        const authToken = localStorage.getItem("authToken");
  
        if (!authToken) {
          console.error("No authentication token found");
          return;
        }
        const response = await fetch("https://dev.quizifai.com:8010/admin-users/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
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
      }finally {
        setLoading1(false); // Stop loading after API call
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

    // Fetch group-admin data end//

// crate admin //


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
    
    // Input validation
    if (!userId || userId.trim() === "") {
      setResponseMessage1("User ID is required.");
      return;
    }
    if (!groupName || groupName.trim() === "") {
      setResponseMessage1("Department name is required.");
      return;
    }
    // if (!selectedUsers1) {
    //   setResponseMessage1("Department head is required.");
    //   return;
    // }
    if (!orgdescription || orgdescription.trim() === "") {
      setResponseMessage1("Department description is required.");
      return;
    }
    if (!selectedUsers) {
      setResponseMessage1("Department users is required.");
      return;
    }
  
    const payload = {
      department_name: groupName,
      department_description: orgdescription,
      active_flag: true,
      organization_id: orgId, // Replace with actual value
      department_head_id: selectedUsers1,
      users_for_deartments: selectedUsers.map((user) => user.value),
    };
  
    try {
      setLoading1(true);
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage
  
      if (!authToken) {
        throw new Error("No authentication token found");
      }
  
      const response = await fetch('https://dev.quizifai.com:8010/create_departments/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok && data.response !== "fail") {
        // Success case
        setResponseMessage1("Department created successfully!");
        reset1('');
        fetchDepartments();
      } else {
        // Failure case
        setResponseMessage1(data.response_message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage1("Something went wrong. Please try again.");
    }finally {
      setLoading1(false); // Stop loading after API call
    }
  };
  
const reset1 =()=>{
    setorgdescription('');
    setGroupName('');
    setSelectedUsers1('');
    setSelectedUsers('');
    setSelectedUsers2('');
}


//-----------------**create orginaization Department end**-----------------//


//-----------------**create orginaization Department edit**-----------------//

const handleEdit = (dept) => {
    setedit(true);
    setDepartmentid(dept.department_id)
    setGroupName(dept.department_name);
    setorgdescription(dept.department_description);
  
    // Preselect users for this department
    const preselectedUsers = dept.users.map((user) => ({
      value: user.user_id,
      label:  `${user.user_name} (ID: ${user.user_id})`,
    }));
  
    setSelectedUsers(preselectedUsers);
    setSelectedUsers1(dept.department_head?.user_id || "");


    // const preselectedUsers1 = [
    //   {
    //     value: dept.department_head?.user_id || "",
    //     label: dept.department_head?.user_name || "No Head Assigned",
    //   },
    // ];
  
    // setSelectedUsers1(preselectedUsers1);

    setSelectedUsers2(preselectedUsers);
  };
  
  

const handleSubmit = async () => {
    try {
      setLoading1(true);

        const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage
  
      if (!authToken) {
        throw new Error("No authentication token found");
      }
      const payload = {
        department_id: Departmentid, // Use actual department ID if updating an existing department
        department_name: groupName,
        department_description: orgdescription,
        active_flag: true, // Change as needed
        organization_id: orgId, // Provide actual organization ID
        department_head_id: selectedUsers1, // Head user ID
        users_for_deartments: selectedUsers.map((user) => user.value), // Selected employees
        remove_users: selectedUsers2.map((user) => user.value), // Add logic for users to remove if needed
      };

      const response = await fetch('https://dev.quizifai.com:8010/edit_departments/', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();

      if (result.response === 'success') {
        setResponseMessage1('Department updated successfully!');
        setedit(false);
        fetchDepartments();
        reset1('');
      } else {
        setResponseMessage1(`Failed to update department: ${result.response_message}`);
      }
    } catch (error) {
      console.error('Error submitting department:', error.message);
      setResponseMessage1('An error occurred while submitting the department.');
    }finally {
      setLoading1(false); // Stop loading after API call
    }
  };


  const handlecancel = () => {
    setedit(false);
        fetchDepartments();
        reset1('');
  }
//-----------------**create orginaization Department edit end**-----------------//


//-----------------**create orginaization Department edit end**-----------------//

const [showModal1, setShowModal1] = useState(false);
const [departmentIdToDelete, setDepartmentIdToDelete] = useState(null);

const handleDelete = (departmentId) => {
    setDepartmentIdToDelete(departmentId); // Store the departmentId to be deleted
    setShowModal1(true); // Show the modal
  };
  const handleConfirmDelete = () => {
    deleteDepartment(departmentIdToDelete); // Call the delete function
    setShowModal1(false); // Close the modal after deletion
  };
  const handleCancelDelete = () => {
    setShowModal1(false); // Close the modal if user cancels
  };

const deleteDepartment = async (departmentId) => {
  
    try {
      setLoading1(true);
        const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage
  
      if (!authToken) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`https://dev.quizifai.com:8010/delete_departments/?department_id=${departmentId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete department");
      }
  
      const data = await response.json();
      console.log("Delete response:", data);
      setResponseMessage1("Department deleted successfully!");
      fetchDepartments();
      reset1('');
    } catch (error) {
      console.error("Error deleting department:", error);
      setResponseMessage1("Failed to delete the department.");
    }finally {
      setLoading1(false); // Stop loading after API call
    }
  };
  




//-----------------**Department table**-----------------//
const [departments, setDepartments] = useState([]);



const fetchDepartments = async () => {
    try {
      setLoading1(true);
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(
        `https://dev.quizifai.com:8010/view_departments_created_by_admin/?admin_id=${userId}`,
        {
          method: "GET",
          headers: {
             Authorization: `Bearer ${authToken}`,
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch departments.");
      }

      const data = await response.json();
      setDepartments(data.data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch departments. Please try again.");
      setLoading(false);
    }
    finally {
      setLoading1(false); // Stop loading after API call
    }
  };

useEffect(() => {
   

    fetchDepartments();
  }, []);


  


//-----------------**Department table end**-----------------//



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





//-----------------**Emloyes List**-----------------//





useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading1(true);
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
          label:  `${user.user_name} (ID: ${user.user_id})`,
        }));
      // if (result.response === 'success' && result.data) {
      //   // Map users to react-select format
      //   const options = result.data.flatMap((dept) => {
      //     const deptUsers = dept.users.map((user) => ({
      //       value: user.user_id,
      //       label: user.user_name || `User ID: ${user.user_id}`,
      //     }));

      //     // Include department head
      //     if (dept.department_head) {
      //       const head = {
      //         value: dept.department_head.dept_head_id,
      //         label: dept.department_head.dept_head_name,
      //       };

      //       if (!deptUsers.some((user) => user.value === head.value)) {
      //         deptUsers.push(head);
      //       }
      //     }

      //     return deptUsers;
      //   });
        setEmloyesusers(options);
      } else {
        console.error('Failed to fetch users:', result.response_message);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }finally {
      setLoading1(false); // Stop loading after API call
    }
  };

  fetchUsers();
}, []);


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

  const customOption1 = ({ data, innerRef, innerProps, isSelected }) => (
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
  const handleChange1 = (e) => {
    setSelectedUsers1(e.target.value); // Update selected user ID
  };

  //-----------------**Emloyes List end**-----------------//


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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <div className="flex w-full font-Poppins">
        <Navigation />
        <div className="flex w-full flex-col p-5 bg-[#f5f5f5]">
         {loading1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <CircularProgress size={40} color="primary" />
        </div>
      )}
        <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
          <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530] font-bold">Create Organization Department</h1>
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


<div className="w-full flex gap-2">
<div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[60%] text-blue-800 font-semibold mb-2 mr-[9px] ">Department Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Department Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Department Head<span className="text-red-500">*</span></label>
        <select
  className="w-full border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
  value={selectedUsers1}  // Use the user_id value from the department head
  onChange={(e) => {
    setSelectedUsers1(e.target.value);  // Set the selected department head ID
  }}
>
  <option value="" disabled>
    Select a Head
  </option>
  {Emloyesusers.map((user) => (
    <option key={user.value} value={user.value}>
      {user.label}  {/* This now shows the name and ID */}
    </option>
  ))}
</select>



        </div>
      
        {/* <hr className={`h-[1px] w-full`} /> */}
      </div> 

</div>

     


      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[23%] text-blue-800 font-semibold mb-2 mr-[6px] ">Department Description<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Department Description"
                value={orgdescription}
                onChange={(e) => setorgdescription(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

  
      


{/* <div className="flex flex-col w-full">
        <div className="w-full flex gap-[50px] flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin<span className="text-red-500">*</span></label>
 
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
      
      </div>  */}
  
      {/* <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Description"
                value={selectedUserName}
                // onChange={(e) => setGroupDescription(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
       <div className="w-full flex gap-2">
            
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[60%] text-blue-800 font-semibold mb-2 mr-[9px] ">Department Employees<span className="text-red-500">*</span></label>
        <Select
  options={Emloyesusers} // All users
  isMulti
  value={selectedUsers} // Preselected users
  onChange={(selectedOptions) => setSelectedUsers(selectedOptions)} // Handle selection
  className="basic-multi-select w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
  classNamePrefix="select"
  placeholder="Search and select Employees..."
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
      
        {/* <hr className={`h-[1px] w-full`} /> */}
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Admin Name"
                value={username1}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>
      {edit && (
          <div className="w-full flex flex-col">
          <div className="w-full flex flex-row">
          <label className="w-[23%] text-blue-800 font-semibold mb-2 mr-[7px] ">Remove Employes<span className="text-red-500">*</span></label>
          <Select
    // options={Emloyesusers} // All users
    isMulti
    value={selectedUsers2} // Preselected users
    onChange={(selectedOptions) => setSelectedUsers2(selectedOptions)} // Handle selection
    className="basic-multi-select w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
    classNamePrefix="select"
    placeholder="Search and select Employees..."
    closeMenuOnSelect={false}
    components={{ Option: customOption1 }}
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
        
          {/* <hr className={`h-[1px] w-full`} /> */}
        </div>
      )}
                   <div className="flex justify-end md:col-span-2 mt-2">
{edit ? (
  <div className=" flex gap-2">
    <button
    onClick={handlecancel}
     className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

   >
     Cancel
   </button>
    <button
    onClick={handleSubmit}
     className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

   >
     Save
   </button>
   </div>
):(
    <button
                     onClick={handleSubmit1}
                      className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
        
                    >
                      Create
                    </button>
)}
                   
                
                    </div>
         
  
    </div>
    </div>
    <div className="overflow-x-auto mt-2">

    <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg text-[#214082]">
      <thead className="bg-[#CBF2FB]">
        <tr className="text-[14px]">
          <th className="py-2 px-4 border-b">Department ID</th>
          <th className="py-2 px-4 border-b text-start">Department Name</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b text-start">Department Head</th>
          <th className="py-2 px-4 border-b text-start">Employees</th>
          <th className="py-2 px-4 border-b text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {departments.map((dept) => (
          <tr key={dept.department_id} className="bg-white hover:bg-gray-100 text-[12px]">
            <td className="py-2 px-4 border-b text-center">{dept.department_id}</td>
            <td className="py-2 px-4 border-b text-start">{dept.department_name}</td>
            <td className="py-2 px-4 border-b text-center">{dept.department_description}</td>
            <td className="py-2 px-4 border-b text-start">
            {dept.department_head?.user_name || "N/A"}
            </td>
            <td className="py-2 px-4 border-b text-start">
              {dept.users.map((user) => (
                <div key={user.user_id}>{user.user_name}</div>
              ))}
            </td>
            <td className="py-2 px-4 border-b text-center flex gap-2 justify-center items-center">
              <img
                className="h-[13px] w-[13px] mr-1 cursor-pointer"
                src={Edit}
                alt="Edit"
                onClick={() => handleEdit(dept)}
              />
              <button
                className="text-orange-500 w-[30px] h-[30px]"
                onClick={() => handleDelete(dept.department_id)}
              >
                <RiDeleteBinLine />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
   {showModal1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-4 rounded shadow-lg w-[300px] text-center bg-white">
            <p className="text-[14px]">Are you sure you want to delete this department?</p>
            <div className="mt-4 flex justify-around">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
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

export default creatorganizationdeparment;
