import React, { useEffect } from 'react'
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from 'react';
import Switch from "react-switch";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png"
import Delete from "../../src/assets/Images/Assets/Delete.png"
import Line from "../../src/assets/Images/Assets/Line.png"
import { RiDeleteBinLine } from "react-icons/ri";
import defaultPhoto from '../../src/assets/Images/dashboard/narmtech.jpg'
import camera1 from "../../src/assets/Images/dashboard/edit.png"
import search from "../assets/Images/images/dashboard/Search.png";

const profileorganization = () => {
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
 
  const [showsave, setShowsave] = useState(false);
  const [showcancel, setShowcancel] = useState(false);

//---------**Pincode**------------//

const [postalCode, setPostalCode] = useState("");
const [error, setError] = useState("");
const [city, setCity] = useState("");
const [locations, setLocations] = useState([]);
const [state, setState] = useState("");
const [address, setAddress] = useState("");
const [country, setCountry] = useState("");
const [district, setDistrict] = useState("");
const [locationId, setLocationId] = useState("");


const handlePostalCodeChange = (e) => {
  const value = e.target.value;
  // Allow only digits and limit to 6 characters
  if (/^\d{0,6}$/.test(value)) {
    setPostalCode(value);
    setError("");
  }
};
const fetchDetailsByPincode = async (pincode) => {
  try {
    const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

    if (!authToken) {
      throw new Error("No authentication token found");
    }
    const response = await axios.post(
      "https://dev.quizifai.com:8010/location_details/",
      {
        pincode: pincode,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the auth token in the Authorization header
        },
      }
    );
    const data = response.data.data[0];
    setCountry(data.country);
    setState(data.state);
    setDistrict(data.district);
    setLocationId(data.location_id);

    const locationData = response.data.data;
    setLocations(locationData);
    if (locationData.length > 0) {
      setCity(locationData[0].location);
    }
  } catch (error) {
    console.error("Error fetching details by pincode", error);
  }
};

const handleSearchClick = () => {
  if (postalCode.length < 6) {
    setError("* Pincode must be 6 digits.");
    return;
  }
  fetchDetailsByPincode(postalCode);
};
const handleCityChange = (event) => {
  const selectedCity = event.target.value;
  setCity(selectedCity);

  const selectedLocation = locations.find(
    (location) => location.location === selectedCity
  );
  if (selectedLocation) {
    setLocationId(selectedLocation.location_id);
  }
};
//---------**Pincode end**------------//


//---------**users**------------//
const [users, setUsers] = useState([]); // Store fetched users
const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
  const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

  if (!authToken) {
    throw new Error("No authentication token found");
  }
  fetch("https://dev.quizifai.com:8010/users/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.response === "success") {
        setUsers(data.data);
      } else {
        console.error("Error fetching users:", data.response_message);
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}, []);

// Handle user selection
const handleUserSelect = (e) => {
  const selectedId = e.target.value;
  const user = users.find((u) => u.user_id === parseInt(selectedId, 10)); // Find selected user
  setSelectedUser(user);

  // Pass user_id to backend
  fetch("https://dev.quizifai.com:8010/your-backend-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ user_id: selectedId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from backend:", data);
    })
    .catch((error) => console.error("Post error:", error));
};

//---------**users end**------------//

//---------**AddOrganizationProfile list dropdown**------------//
const orgId = localStorage.getItem('org_id');


const fetchOrganizationDetails = async () => {
  try {
    const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

    if (!authToken) {
      throw new Error("No authentication token found");
    }
    const response = await fetch(
      `https://dev.quizifai.com:8010/get_organization_dtls?org_id=${8}`,
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

      const organizationDetails = data.data[0]; // Access the first object in the `data` array

      // setOrgId(organizationDetails.org_id || '');
      setOrgName(organizationDetails.org_name || '');
      setSelectedUser(organizationDetails.org_admin_id || '');
      setOrgSubscriptionKey(organizationDetails.org_subscription_key || '');
      setOrgPointOfContactId(organizationDetails.org_point_of_contact_id || '');
      setOrgAddressLine1(organizationDetails.org_address_line1 || '');
      setOrgAddressLine2(organizationDetails.org_address_line2 || '');
      setOrgLocationId(organizationDetails.org_location_id || '');
      // setCreatedDate(organizationDetails.created_date || '');
      // setUpdatedDate(organizationDetails.updated_date || '');
      // setCreatedBy(organizationDetails.created_by || '');
      // setUpdatedBy(organizationDetails.updated_by || '');
      setOrgType(organizationDetails.org_type || '');
      setOrgPublicQuizzesAccessFlag(organizationDetails.org_public_quizzes_access_flag || '');
      setOrgCreatePublicQuizzesFlag(organizationDetails.org_create_public_quizzes_flag || '');
      // setOrgPhotoUrl(organizationDetails.org_photo_url || '');
      // setDefaultLoginMethod(organizationDetails.default_login_method || '');
      // setPrintFlag(organizationDetails.print_flag || '');
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


//---------**AddOrganizationProfile list dropdown**------------//



//---------**AddOrganizationProfile**------------//
const [orgName, setOrgName] = useState('');
const [orgAdminId, setOrgAdminId] = useState(0);
const [orgLocationId, setOrgLocationId] = useState(0);
const [orgSubscriptionKey, setOrgSubscriptionKey] = useState('');
const [orgPointOfContactId, setOrgPointOfContactId] = useState(0);
const [orgAddressLine1, setOrgAddressLine1] = useState('');
const [orgAddressLine2, setOrgAddressLine2] = useState('');
const [orgType, setOrgType] = useState('School');
const [orgPublicQuizzesAccessFlag, setOrgPublicQuizzesAccessFlag] = useState(true);
const [orgCreatePublicQuizzesFlag, setOrgCreatePublicQuizzesFlag] = useState(true);

const handleSubmit = async (e) => {
  e.preventDefault();


  const payload = {
    user_id: userId,
    org_name: orgName,
    org_admin_id:  selectedUser.user_id ,
    org_location_id: locationId,
    org_subscription_key: orgSubscriptionKey,
    org_point_of_contact_id:  selectedUser.user_id ,
    org_address_line_1: orgAddressLine1,
    org_address_line_2: orgAddressLine2,
    org_type: orgType,
    org_public_quizzes_access_flag: true,
    org_create_public_quizzes_flag: true,
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
    alert('Organization profile added successfully!');
    fetchOrganizationDetails();
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to add organization profile.');
  }
};



//---------**AddOrganizationProfile End**------------//



  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }

  const handleedit = () =>{
    setShowsave(true);
   setIsEditing(true)
  }
  const handleeditback = () =>{
    setShowsave(false);
    setIsEditing(false)
  }
  return (
    <>
    <div className='flex w-full'>
    <Navigation/> 
    <div className='w-full p-5 bg-[#F5F5F5]'>
      <div className=' bg-white p-5 rounded-lg '>

     
        <div>
            <h1 className=' font-semibold text-[#EF5130] mb-2'>Organization Profile</h1>
        </div>
  <div className='flex gap-5'>
  <div className="relative w-[90px] h-[90px]">
        <img
          src={defaultPhoto}
          alt="Profile"
          className="w-[90px] h-[90px] rounded-xl"
        />
        <div 
          className="absolute bottom-0 right-0 rounded-full cursor-pointer"
        //   onClick={openModal}
        >
         <img src={camera1} alt="" className="w-[20px] h-[20px]"/>
        </div>
        <div className='flex justify-center text-blue-800'>Org ID : <span className=' text-black ml-1'> 466</span> </div>
        <div className='flex justify-center text-blue-800'>Narmtech</div>

      </div>
    <div className='w-[80%] flex flex-col gap-5'>
    {/* <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization ID<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization ID"
         
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
      <div className='flex gap-[5px]'>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Type<span className="text-red-500">*</span></label>
        <select
         disabled={!isEditing}
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        //   value={selectedComplexity}
        //   onChange={handleSelectComplexity}
        >
          <option value="" disabled>Institations</option>
          {/* {complexities.map((complexity, index) => (
            <option key={index} value={complexity}>
              {complexity}
            </option>
          ))} */}
        </select>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>
      {/* <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Description</label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Description"

              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
<div className='flex gap-[5px]'>


      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[57%] text-blue-800 font-semibold mb-2 mr-[9px] ">Address line 1<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization admin Name"
                value={orgAddressLine1}
                onChange={(e) => setOrgAddressLine1(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Address line 2<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization admin Name"
                value={orgAddressLine2}
                onChange={(e) => setOrgAddressLine2(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

      </div>
<div className='flex gap-[5px]'>

<div className="flex flex-col w-full">
  <div className="w-full flex flex-row items-center">
    <label className="w-[36%] text-blue-800 font-semibold mb-2 mr-[9px]">
      Pincode<span className="text-red-500">*</span>
    </label>
    <div className="flex-grow flex items-center relative">
      <input
        type="text"
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] h-[30px] hover:border-blue-200 text-[11px] focus:outline-none `}

        placeholder="postalCode"
        value={postalCode}
        onChange={handlePostalCodeChange}
        disabled={!isEditing}
      />
      <img
        className="h-[15px] w-[15px] absolute right-1 cursor-pointer"
        src={search}
        onClick={handleSearchClick}
        alt="Search Icon"
      />
    </div>
  </div>
  {error && (
    <div className="text-red-500 text-[10px] mt-1">{error}</div>
  )}
  <hr className="h-[1px] w-full" />
</div>

      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] "> District Name<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
       
</div>
<div className='flex gap-[5px]'>


<div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[57%] text-blue-800 font-semibold mb-2 mr-[9px] ">City Name<span className="text-red-500"></span></label>
     
    <select
       className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    disabled={!isEditing}
                  >
                    <option value={city}>{city}</option>
                    {locations.map((location) => (
                      <option
                        key={location.location_id}
                        value={location.location}
                      >
                        {location.location}
                      </option>
                    ))}
                  </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> 
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">State Name<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>

      <div className='flex gap-[5px]'>

     
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[57%] text-blue-800 font-semibold mb-2 mr-[9px] ">Country Name<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
{/* 
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Pincode<span className="text-red-500">*</span></label>
        <select id="userSelect"               className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
 onChange={handleUserSelect}>
        <option value="">Select User Name</option>
        {users.map((user) => (
          <option key={user.user_id} value={user.user_id}>
            {user.user_name}
          </option>
        ))}
      </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}




      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Website URL</label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Website URL"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     
      </div>
  
    </div>
  </div>
  </div>
  <div className=' flex flex-col gap-5 mt-2 bg-white p-5 rounded-lg'>
      <div>
            <h1 className=' font-semibold text-[#EF5130] mb-2'>Administration</h1>
        </div>
        <div className='w-[89%] flex flex-col gap-5 pl-[110px]'>

     
      <div className='flex gap-2 w-full'>
      {/* <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[57%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin ID<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Admin ID"
                value={selectedUser ? selectedUser.user_id : ""}
                readOnly
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Name<span className="text-red-500">*</span></label>
      
    <select id="userSelect"               className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
 onChange={handleUserSelect}>
   disabled={!isEditing}
        <option value="">Select User Name</option>
        {users.map((user) => (
          <option key={user.user_id} value={user.user_id}>
            {user.user_name}
          </option>
        ))}
      </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>
     

      <div className='flex gap-2 w-full'>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[57%] text-blue-800 font-semibold mb-2 mr-[9px] ">Mobile<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Mobile"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 mr-[9px] ">Email<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Email"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>

      </div>
      
            
            {showsave ?  (
                   
                   <div className="flex justify-end gap-[10px] md:col-span-2 w-[89%] pl-[125px]">

                   <button
                     onClick={handleeditback}
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
            ) :(
                <div className="flex justify-end gap-[10px] md:col-span-2 w-[89%] ">

                <button
                           onClick={handleedit}
                              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
                
                            >
                              Edit
                            </button>
                                 </div>
            )
        }
           
           </div>
    </div>
    </div>
    </>
    
    

    
  )
}

export default profileorganization