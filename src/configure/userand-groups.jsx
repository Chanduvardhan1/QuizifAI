import React, { useEffect } from "react";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from "react";
import Select from 'react-select';
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png";
import Delete from "../../src/assets/Images/Assets/Delete.png";
import Line from "../../src/assets/Images/Assets/Line.png";
import { RiDeleteBinLine } from "react-icons/ri";

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
  const [selectedUser, setSelectedUser] = useState(""); // Store selected username
  const [selectedRoleId, setSelectedRoleId] = useState(""); // Store user_role_id for selected username

  const [orgId, setOrgId] = useState('');
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

  // Handle form submission
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    
    // Prepare the payload
    const payload = {
      org_id: parseInt(orgId),  // Ensure numbers are integers
      user_id: parseInt(userId),
      org_name: orgName,
      role_id: parseInt(roleId),
      mobile,
      email,
      user_first_name: firstName,
      user_middle_name: middleName,
      user_last_name: lastName,
    };

    try {
      const response = await fetch('https://dev.quizifai.com:8010/admin-role-updation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Handle success
        setsuccessadmin('Role updated successfully');
        seterroradmin('')
      } else {
        // Handle error
        seterroradmin(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('Error during submission');
      console.error('Error:', error);
    }
  };


  // Fetch group-admin data
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          "https://dev.quizifai.com:8010/groups-admins/",
          {
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFuZHUgdmFyZGhhbiBrIiwiZXhwIjoyNTM0MDIzMDA3OTl9.Dke5RuSafS1gwDyvylEzw6qKDnNIKfbm2PfpCsPoFrA",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Extract user details with unique usernames
        const users = result.data
          .flatMap((group) => group.user_details || [])
          .map((user) => ({
            userId: user.user_id,
            userName: user.user_name,
            roleId: user.user_role_id,
            roleName: user.role_name,
          }));

        setRoles(users);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Handle dropdown change
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);

    // Find the selected user's role_id
    const selectedUserDetails = roles.find((user) => user.userName === selectedValue);
    if (selectedUserDetails) {
      setSelectedRoleId(selectedUserDetails.roleId);
    }
    if (selectedValue === "createAdmin") {
      setShowPopup(true);
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
  const handleCheckboxChange = (event) => {
    setIsOrganization(event.target.checked);
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
      group_name: groupName, // Use appropriate state or variable
      group_description: groupDescription, // Ensure this matches the correct state
      active_flag: activeFlag,
      created_by: userId, // Replace with the user ID or relevant state
      user_ids: selectedUserIds, // Replace with the selected user IDs
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
      alert("Groups updated successfully");
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
      group_description: groupDescription,
      updated_by: userId,
      user_ids: selectedUserIds,
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
      alert("Groups updated successfully");
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
    // setSelectedUserName("");
    setIsEditing(false);
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

  // const options = users.map(user => ({
  //   value: user.user_id,
  //   label: user.user_name
  // }));

  const handleChange = (selectedOptions) => {
    setSelectedUserIds(selectedOptions.map((option) => option.value));
  };
  return (
    <>
      <div className="flex w-full font-Poppins">
        <Navigation />
        <div className="flex w-full flex-col">
          <div className="flex justify-end mt-[30px]">
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
            <img
              onClick={handleBanckToDashbaord}
              className="h-4 w-4 cursor-pointer mt-[6px] mr-6"
              title="close settings"
              src={cancel}
            />
          </div>
          {isNavbarOpen && (
            <div className="text-[10px] mx-[10px] text-[#214082] h-[50px] mt-[30px] rounded-md bg-[#CBF2FB] flex flex-row justify-around p-4">
        {Organizationid &&(
 <input
 type="text"
 placeholder="Organization ID"
//  value={groupId}
//  onChange={(e) => setGroupId(e.target.value)}
 className=" w-[85px] -mt-[5px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]"
 style={{ "::placeholder": { color: "#214082" } }}
 readOnly
/>

        )
      }
              <input
                type="text"
                placeholder="Group ID"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className=" w-[75px] -mt-[5px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]"
                style={{ "::placeholder": { color: "#214082" } }}
                readOnly
              />
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-[95px] rounded-3xl text-left pl-3 -mt-[5px]  py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
              />
              <input
                type="text"
                placeholder="Group Description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className=" w-[115px] rounded-3xl text-left pl-3 -mt-[5px]  py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
              />

              <div className="flex items-center justify-center">
                <input type="checkbox" name="" id="" onChange={handleCheckboxChange}  />
                <p className="pl-1">Is an organization</p>
              </div>
     <Select
      className="w-[200px] text-[#214082] -mt-[10px] rounded-3xl"
      isMulti
      value={options.filter(option => selectedUserIds.includes(option.value))}
      onChange={handleChange}
      options={options}
      closeMenuOnSelect={false} // Keeps dropdown open after each selection
      placeholder="Select User"
      hideSelectedOptions={false} // Shows selected options with a checkbox
    />


              <button
                onClick={handleSubmit}
                className="bg-[#214082] w-[80px] -mt-[10px] ml-[20px] py-[14px] rounded-3xl text-white flex items-center justify-center"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          )}
          {isOrganization && (
 <div className="text-[10px] mx-[10px] text-[#214082] h-[50px] mt-[30px] rounded-md bg-[#CBF2FB] flex flex-row justify-start p-4">
 <select
       className="w-[200px] text-[#214082] -mt-[10px] rounded-3xl"
placeholder="Select User"
value={selectedUser}
onChange={handleSelectChange}

            >
              <option value="" disabled>Select a Role</option>
              {roles.map((user) => (
          <option key={user.userId} value={user.userName}>
            {user.userName}
          </option>
        ))}
              <option value="createAdmin" >Creat Admin</option>

            </select>    
            {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Create Admin</h2>

<div className="flex w-full mb-2">
<label className="block mb-2 w-[65%] text-blue-800 font-semibold text-[14px] ">
                User Role
              </label>
              <div className="flex w-full border border-gray-500 p-2  ">

            <input type="checkbox" name="" id="" className="p"/>
              <p className="pl-1">Orgination Admin</p>
              </div>
</div>

            <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Fist Name<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col mb-2">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 text-[14px]  ">Middle Name<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="text"
          required
          value={middleName} 
          onChange={(e) => setMiddleName(e.target.value)} 
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
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
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
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
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
                onClick={handleSubmit1}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
         <div>
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
          </div>
          )}
  
          <table className="h-[20px] table-auto mt-[30px] mx-[20px] rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[13px] font-light">
            <thead>
              <tr className="h-[50px]">
                <th className="px-4 py-2 text-nowrap">Group Id</th>
                <th className="pl-[10px] ml-[15px] py-2">Group Name</th>
                <th className="px-4 py-2 text-nowrap">Group Description</th>
                <th className="px-4 py-2 text-nowrap">Flag</th>
                <th className="px-2 py-2 text-nowrap">Users List</th>
                <div className="flex -mt-[5px]">
                  <input
                    className="mt-[15px] text-[10px] pl-[30px] pr-[10px] rounded-[20px] h-[28px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <img
                    className="h-[12px] w-[12px] relative top-[25px] right-[160px]"
                    src={searchIcon}
                  />
                </div>
              </tr>
            </thead>
            <tbody className="bg-white border-gray-500 ">
              {filteredGroups.map((group) => (
                <tr key={group.group_id}>
                  <td className="px-4 py-2 border text-[#214082] font-bold text-[10px] text-center">
                    {highlightText(group.group_id.toString(), searchInput)}
                  </td>

                  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px]">
                    {highlightText(group.group_name, searchInput)}
                  </td>

                  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px] w-[200px]">
                    <span className="relative group">
                      <span className="text-[10px] text-[#002366] absolute w-[170px] cursor-pointer z-0 truncate">
                      {highlightText(group.group_description, searchInput)
                     .toLowerCase()
                     .replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                      <span className="absolute -top-1 w-[170px] h-auto cursor-pointer hidden group-hover:inline-block text-wrap z-20 bg-black text-white px-2 py-1 border border-black-300 rounded leading-tight whitespace-nowrap">
                      {highlightText(group.group_description, searchInput)
                     .toLowerCase()
                     .replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px] text-center">
                    {highlightText(
                      group.active_flag ? "Active" : "Inactive",
                      searchInput
                    )}
                  </td>

  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px] w-[200px]">
  <span className="relative group">
    <span className="text-[10px] text-[#002366] absolute w-[170px] cursor-pointer z-0 truncate">
      {filteredUsers
        .filter((user) => group.user_ids.includes(user.user_id))
        .map((user) => user.user_name)
        .join(", ")}
    </span>
    <span className="absolute -top-1 w-[170px] h-auto cursor-pointer hidden group-hover:inline-block text-wrap z-20 bg-black text-white px-2 py-1 border border-black-300 rounded leading-tight whitespace-nowrap">
      {filteredUsers
        .filter((user) => group.user_ids.includes(user.user_id))
        .map((user) => user.user_name)
        .join(", ")}
    </span>
  </span>
</td>
                  
                  <td className="h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline">
                    <img
                      className="h-[13px] w-[13px] mr-1 cursor-pointer"
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
