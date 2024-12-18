import React, { useEffect } from "react";
import { useState } from "react";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

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
import close from "../../src/assets/Images/images/dashboard/close.png"
import close1 from "../../src/assets/Images/images/dashboard/cancel.png"

// import Delete from "../../src/assets/Images/Assets/Delete.png";
// import Line from "../../src/assets/Images/Assets/Line.png";

//-------------**importing imagesend**------------- //


const UserAndGroups = () => {


  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [activeFlag, setActiveFlag] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const userId = localStorage.getItem("user_id");
  const [options, setOptions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isOrganization, setIsOrganization] = useState(false);
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
  // const [orgId, setOrgId] = useState('');
  const [userId1, setUserId1] = useState('');
  const [orgName, setOrgName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
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
      if  (data.success) {
        setResponseMessage("Admin created successfully!");
        // setShowPopup(false);
        fetchUsers();

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
const handleSubmit3 = (e) => {
  e.preventDefault();

  const formData = {
    first_name: firstName1,
    middle_name: middleName1,
    last_name: lastName1,
    user_email: userEmail1,
    user_type_id: 3,
    password: randomPassword,
    user_role_id: 3,
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
        setResponseMessage("Admin created successfully!");
        setShowPopup1(false);
        fetchUsers();
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
  setUserEmail1('');
  setRandomPassword('');
  setSelectedRoleId('');
}

// crate end //

// Organizations list //
const [organizations, setOrganizations] = useState([]);
const [selectedOrg, setSelectedOrg] = useState('');

useEffect(() => {
  const fetchOrganizations = async () => {
    try {
      const response = await fetch('https://dev.quizifai.com:8010/organization/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFuZHUgdmFyZGhhbiBrIiwiZXhwIjoyNTM0MDIzMDA3OTl9.H_wmqwEmdspaXzFRthV49YH_y25UZlj5zul3hV0bXF8',
        },
      });
      const result = await response.json();
      if (result.response === 'success') {
        setOrganizations(result.data);
      } else {
        console.error(result.response_message);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  fetchOrganizations();
}, []);

const handleOrgSelect = (orgId) => {
  setSelectedOrg(orgId);
  // Pass org_id to the backend
  console.log('Selected Organization ID:', orgId);
  // Example POST request to send org_id
  fetch('https://your-backend-endpoint.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ org_id: orgId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from backend:', data);
    })
    .catch((error) => console.error('Error sending org_id:', error));
};
const handleSubmit1 = async (e) => {
  e.preventDefault();


  const payload = {
    user_id: userId,
    org_name: groupName,
    org_admin_id: selectedUser2,
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



  //   const fetchRoles = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://dev.quizifai.com:8010/groups-admins/",
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFuZHUgdmFyZGhhbiBrIiwiZXhwIjoyNTM0MDIzMDA3OTl9.Dke5RuSafS1gwDyvylEzw6qKDnNIKfbm2PfpCsPoFrA",
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const result = await response.json();

  //       // Extract user details with unique usernames
  //       const users = result.data
  //         .flatMap((group) => group.user_details || [])
  //         .map((user) => ({
  //           userId: user.user_id,
  //           userName: user.user_name,
  //           roleId: user.user_role_id,
  //           roleName: user.role_name,
  //         }));

  //       setRoles(users);
  //     } catch (error) {
  //       console.error("Error fetching roles:", error);
  //     }
  //   };

  //   useEffect(() => {
  //   fetchRoles();
  // }, []);

  // Handle dropdown change
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);

    if (selectedValue === "createAdmin") {
      setShowPopup(true);
    } else {
      setSelectedRoleId([selectedValue]);
    }

    console.log("Selected Role ID:", [selectedValue]);
  };

  const handleSelectChange2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser2(selectedValue);

    // Find the selected user's role_id
    const selectedUserDetails = roles.find((user) => user.userName === selectedValue);
    if (selectedUserDetails) {
      setSelectedRoleId2(selectedUserDetails.roleId);
    }
    if (selectedValue === "createAdmin") {
      setShowPopup(true);
    }

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

  // const handleSelectChange = (event) => {
  //   if (event.target.value === "createAdmin") {
  //     setShowPopup(true);
  //   }
  // };

  const closePopup = () => {
    setShowPopup(false);
  };
  const closePopup1 = () => {
    setShowPopup1(false);
  };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsOrganization(isChecked);
    setOrganizationid(event.target.checked);
  };

  const fetchGroups = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No authentication token found");
      return;
    }

    try {
      const [groupsResponse, usersResponse] = await Promise.all([
        fetch("https://dev.quizifai.com:8010/groups/", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch("https://dev.quizifai.com:8010/users/", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (!groupsResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const groupsData = await groupsResponse.json();
      const usersData = await usersResponse.json();
     
      const filteredUsers = usersData.data.filter(
        (user) => user.user_name && user.user_name.trim() !== ""
      );
      setGroups(groupsData.data);
      setUsers(filteredUsers);
      setOptions(filteredUsers.map((user) => ({ value: user.user_id, label: user.user_name })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    const groupData = {
      group_name: groupName,
      organization: true,
      organization_id: orgId,
      group_description: groupDescription,
      active_flag: activeflag,
      created_by: userId,
      users_for_regular_role_id: selectedUserIds,// Replace with the selected user IDs
      users_for_admin_role_id:[parseInt(selectedUser)],
   
    };

    try {
      const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch(
        "https://dev.quizifai.com:8010/create_group/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(groupData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
            }

      const newGroup = await response.json();
      setResponseMessage1("Groups updated successfully");
      console.log("groups added successfully..", newGroup);
      fetchGroups(); // Refresh groups list afzter creation
      resetForm();
      // setIsNavbarOpen(false);
      // setGroupDescription("");
      // setSelectedUserIds([]);
      // setSelectedUserName("");
      // setGroupName("");
    } catch (error) {
      console.error("Error adding groups:", error);
    }
  };
  const updateGroup = async () => {
    const groupData = {
      group_id: groupId,
      group_name: groupName,
      organization: isOrganization,
      organization_id: selectedOrg,
      group_description: groupDescription,
      active_flag: activeflag,
      updated_by: userId,
      users_for_regular_role_id: selectedUserId,
      users_for_admin_role_id:[parseInt(selectedUser)],

    };
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("No authentication token found");
        return;
      }
      const response = await fetch(
        "https://dev.quizifai.com:8010/edit_group/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(groupData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if(errorData.response_message.includes("Unauthorized"))
        console.error("Error response from server:", errorData);
        throw new Error(`Failed to update group: ${errorData.response_message || 'Unknown error'}`);
      }
      const result = await response.json();
      setResponseMessage1("Groups updated successfully");
      console.log("Groups updated successfully", result);
      fetchGroups();
      resetForm();
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleSubmit = () => {
    if (isEditing) {
      updateGroup();
    } else {
      handleCreateGroup();
    }
  };

  const handleEdit = (group) => {
    setGroupId(group.group_id);
    setGroupName(group.group_name);
    setGroupDescription(group.group_description);
    setSelectedUserIds(group.user_ids);
    // setSelectedUserName(
    //   users.find((user) => user.user_id === group.user_ids[0])?.user_name || ""
    // );
    setIsNavbarOpen(true);
    setIsEditing(true);
    // setSelectedCategoryId(group.group_id);
  };
  const resetForm = () => {
    setGroupId("");
    setGroupName("");
    setGroupDescription("");
    setSelectedUserIds([]);
    setSelectedRoleId([]);
    setSelectedOrg('');
    setOrganizations('');
    setactiveflag('');
    // setSelectedUserName("");
    setIsEditing(false);
    setIsOrganization(false);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const filteredGroups = groups.filter((group) =>
    group.group_name?.includes(searchInput)
  );
  const filteredUsers = users.filter((user) =>
    filteredGroups.some((group) => group.user_ids?.includes(user.user_id))
  );

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const navigate = useNavigate();
  const handleBanckToDashbaord = () => {
    navigate("/configure");
  };

  const handleBack = () => {
    navigate("/configure")
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
  return (
    <>
      <div className="flex w-full font-Poppins">
        <Navigation />
        <div className="flex w-full flex-col">
        <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close1} alt="" className="w-[25px] h-[25px]" />
        </div>
        {/* { userRole === "Admin" && ( */}
        <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530] font-bold">Create Group</h1>
          </div>
        {/* // )} */}
                {/* { userRole === "Super Admin" && (

          <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530] font-bold">Create Organization</h1>
          </div>
                )} */}
        <div className="flex justify-between items-center mx-[20px] pt-2">
          <div className="flex gap-2 justify-center items-center">
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
                  <span className="text-[15px]">User id : </span>
                  <span className=" font-normal text-[12px]">{userId}</span>
                </div>
                </div>
                <div className="flex items-center">
            <div className="w-[118px] h-[30px] rounded-[10px] bg-[#F7E0E3] mr-[10px]">
              <div className="flex" onClick={toggleNavbar}>
                <img
                  className="w-[20px] h-[20px] ml-2 mt-1"
                  src={Plus}
                  alt="Plus Icon"
                />
                <a className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-1.5">
                  Groups
                </a>
              </div>
            </div>
            {/* <img
              onClick={handleBanckToDashbaord}
              className="h-4 w-4 cursor-pointer"
              title="close settings"
              src={cancel}
            /> */}
          </div>
            

              </div>
        
          {isNavbarOpen && (
            <div className="text-[14px] mx-[20px] pl-4 p-2 mt-[30px] items-center rounded-md bg-[#DCFCE7] flex flex-row justify-between font-bold text-[#214082]">
        {/* {Organizationid &&(
 <input
 type="text"
 placeholder="Organization ID"

 className=" w-[85px] -mt-[5px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]"
 style={{ "::placeholder": { color: "#214082" } }}
 readOnly
/>

        )
      } */}
              {/* <input
                type="text"
                placeholder="Group ID"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className=" w-[75px] -mt-[5px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]"
                style={{ "::placeholder": { color: "#214082" } }}
                readOnly
              /> */}
                          {/* { userRole === "Super Admin" && (

              <div className="flex items-center justify-center">
                <input type="checkbox" name="" id=""
                 onChange={handleCheckboxChange}
                 checked={isOrganization} />
                <p className="pl-1">Is an organization</p>
              </div>
                          )} */}
              <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-[120px] rounded-sm  text-left pl-3 border-[#486ec0] border-[1px] py-[8px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
              />
              </div>
              <div className="flex items-center justify-center">

              <input
                type="text"
                placeholder="Group Description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className=" w-[200px] rounded-sm text-left pl-3 px-5 border-[1px]  py-[8px] text-[#214082] border-[#486ec0] placeholder:text-[#214082] outline-[#214082]"
              />
</div>
{isOrganization ? (
   
   <div className="flex items-center justify-center">
       <select
className="w-[200px] text-[#214082] border-[#486ec0] border-[1px] p-[8px]"
placeholder="Select User"
value={selectedUser2}
onChange={handleSelectChange2}

     >
       <option value="" disabled>Select a Admin</option>
       <option value="createAdmin" >Create Admin</option>
       {users1.map((user) => (
          <option key={user.user_id} value={user.user_id}>
           {user.user_name} (Id: {user.user_id})
          </option>
        ))}

     </select> 
  

 </div>
):(
 <div className="flex items-center justify-center">
<select
  className="w-[200px] text-[#214082] border-[#486ec0] border-[1px] p-[8px]"
placeholder="Select User"
value={selectedUser}
onChange={handleSelectChange}

       >
         <option value="" disabled>Select a Admin</option>
         <option value="createAdmin" >Creat Admin</option>

         {users1.map((user) => (
          <option key={user.user_id} value={user.user_id}>
          {user.user_name} (ID: {user.user_id})
          </option>
        ))}

       </select> 
       {/* {organizations.length > 0 ? (
   <select className="w-[200px] text-[#214082] -mt-[10px] ml-2 rounded-sm p-[8px]" 
   onChange={(e) => handleOrgSelect(e.target.value)} value={selectedOrg}>
     <option value="">Select an organization</option>
     {organizations.map((org) => (
       <option key={org.org_id} value={org.org_id}>
         {org.org_name}
       </option>
     ))}
   </select>
 ) : (
   <p>Loading organizations...</p>
 )} */}
</div>
)}   
{isOrganization ? (    
     <div></div>

):(
  <Select
  className="w-[200px] text-[#214082] rounded-sm"
  isMulti
  value={options.filter(option => selectedUserIds.includes(option.value))}
  onChange={handleChange}
  options={options}
  closeMenuOnSelect={false} // Keeps dropdown open after each selection
  placeholder="Select User"
  hideSelectedOptions={false} // Shows selected options with a checkbox
  styles={{
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid #486ec0" : "1px solid #486ec0", // Border on focus and normal
      borderRadius: "4px", // Rounded corners
      boxShadow: state.isFocused ? "#486ec0" : "none", // Subtle shadow on focus
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#214082", // Change placeholder color
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#486ec0" : state.isFocused ? "#dce4f5" : "white", // Highlight for selected/focused options
      color: state.isSelected ? "white" : "#214082",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#214082", // Change arrow color
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none", // Optional: rotate arrow on open
      transition: "transform 0.2s", // Smooth transition for arrow rotation
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid #486ec0", // Border around the dropdown menu
      borderRadius: "4px", // Rounded corners
    }),
  }}
/>

)}
    {isOrganization ? (
  <button
  onClick={handleSubmit1}
  className="w-[50px] h-[25px] rounded-full bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center"
>
    Add
</button>
    ):(
      <button
      onClick={handleSubmit}
      className="w-[50px] h-[30px] rounded-full bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center"
    >
    {isEditing ? "Update" : "Add"}
    </button>
    )}
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


            </div>
          )}
      
            {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Create Admin</h2>
<img src={close} onClick={closePopup} alt="" className="w-[20px] h-[20px] cursor-pointer" />
</div>
            <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">First Name<span className="text-red-500">*</span></label>
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
                {/* <button
                  type="button"
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                >
                  Cancel
                </button> */}
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
   {/* <select
    className="w-[200px] text-[#214082] -mt-[10px] rounded-3xl"
    isMulti
    value={options.filter(option => selectedUserIds.includes(option.value))}
    onChange={handleChange}
    options={options}
    closeMenuOnSelect={false} // Keeps dropdown open after each selection
    placeholder="Select User"
    hideSelectedOptions={false} // Shows selected options with a checkbox
  /> */}


            {/* <button
              onClick={handleSubmit}
              className="bg-[#214082] w-[80px] -mt-[10px] ml-[20px] py-[14px] rounded-3xl text-white flex items-center justify-center"
            >
              {isEditing ? "Update" : "Add"}
            </button> */}
        
  
        <table className="h-[20px] table-auto mt-[30px] mx-[20px] rounded text-left bg-[#CBF2FB] text-[#2b51a1] border-gray-200 text-[14px] font-bold">
  <thead>
    <tr className="h-[50px] text-center border-b">
      <th className="px-4 py-2 text-center">Group ID</th>
      <th className="px-4 py-2 text-left">Group Name</th>
      <th className="px-4 py-2 text-center">Org ID</th>
      <th className="px-4 py-2 text-center">Flag</th>
      <th className="px-4 py-2 text-center">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white border border-b border-gray-200">
    {filteredGroups.map((group) => (
      <tr
        key={group.group_id}
        className="bg-white hover:bg-gray-100 active:bg-green-200 text-[12px]"
      >
        <td className="px-4 py-2 border-b text-[#214082] font-semibold text-center">
          {highlightText(group.group_id.toString(), searchInput)}
        </td>

        <td className="px-4 py-2 border-b text-[#214082] font-semibold text-left">
          {highlightText(group.group_name, searchInput)}
        </td>

        <td className="px-4 py-2 border-b text-[#214082] font-semibold text-center w-[200px]">
          <span className="relative group">
            <span className="text-[14px] text-[#002366] cursor-pointer z-0 truncate">
              {highlightText(`${group.org_name}(ID:${group.org_id})`, searchInput)
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          </span>
        </td>

        <td className="px-4 py-2 border-b text-[#214082] font-semibold text-center">
          {highlightText(
            group.active_flag ? "Active" : "Inactive",
            searchInput
          )}
        </td>

        <td className="px-4 py-2 border-b text-center flex justify-center gap-2">
          <img
            className="h-[13px] w-[13px] cursor-pointer"
            src={Edit}
            alt="Edit"
            onClick={() => handleEdit(group)}
          />
          <button className="flex text-orange-500 w-[30px] h-[30px]">
            <RiDeleteBinLine />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
{/* 
        <LogoutBar /> */}
      </div>
    </>
  );
};

export default UserAndGroups;
