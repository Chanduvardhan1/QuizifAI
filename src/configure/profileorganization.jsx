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
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import camera1 from "../../src/assets/Images/dashboard/edit.png"
import search from "../assets/Images/images/dashboard/Search.png";
import x from "../../src/assets/Images/quiz-type/cross-button.png"

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
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


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
const [selectedUser, setSelectedUser] = useState('');

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

// const [OrgId1, setOrgId1] = useState('')


const orgId = localStorage.getItem('org_id');
const [email, setEmail] = useState('');

useEffect(() => {
  const storedEmail = localStorage.getItem('email');
  if (storedEmail) {
    setEmail(storedEmail);
  }
}, []);
console.log('email id 1:',email)


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
      setSelectedOrgTypeId(organizationDetails.org_type || '');
      setOrgPublicQuizzesAccessFlag(organizationDetails.org_public_quizzes_access_flag || '');
      setOrgCreatePublicQuizzesFlag(organizationDetails.org_create_public_quizzes_flag || '');
      setWebsiteurl(organizationDetails.website_url || '');
      // setOrgPhotoUrl(organizationDetails.org_photo_url || '');
      // setDefaultLoginMethod(organizationDetails.default_login_method || '');
      // setPrintFlag(organizationDetails.print_flag || '');'

      const locationDetails = organizationDetails.location_details[0]; // Access the first location detail
      if (locationDetails) {
        setCity(locationDetails.location_name || "N/A");
        setDistrict(locationDetails.district_name || "N/A");
        setState(locationDetails.state_name || "N/A");
        setCountry(locationDetails.country_name || "N/A");
        setPostalCode(locationDetails.pin_code || "N/A");
      } else {
        console.warn("No location details found");
      }
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



//---------**update OrganizationProfile**------------//

const [orgName, setOrgName] = useState('');
const [orgAdminId, setOrgAdminId] = useState(0);
const [orgLocationId, setOrgLocationId] = useState(0);
const [orgSubscriptionKey, setOrgSubscriptionKey] = useState('');
const [orgPointOfContactId, setOrgPointOfContactId] = useState(0);
const [orgAddressLine1, setOrgAddressLine1] = useState('');
const [orgAddressLine2, setOrgAddressLine2] = useState('');
// const [orgType, setOrgType] = useState('School');
const [orgPublicQuizzesAccessFlag, setOrgPublicQuizzesAccessFlag] = useState(true);
const [orgCreatePublicQuizzesFlag, setOrgCreatePublicQuizzesFlag] = useState(true);
const [websiteurl, setWebsiteurl] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();


  const payload = {
    updated_by: userId,
    org_id: orgId,
    org_name: orgName,
    org_admin_id: userId,
    org_location_id: locationId,
    org_subscription_key: orgSubscriptionKey,
    org_point_of_contact_id:  userId ,
    org_address_line1: orgAddressLine1,
    org_address_line2: orgAddressLine2,
    org_type: selectedOrgTypeId,
    website_url:websiteurl,
    org_public_quizzes_access_flag: true,
    org_create_public_quizzes_flag: true,
    print_flag: true,
  };

  try {
    const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

  if (!authToken) {
    throw new Error("No authentication token found");
  }
    const response = await fetch('https://dev.quizifai.com:8010/edit_organizationprofile', {
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
    setShowsave(false);
    setIsEditing(false)
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to add organization profile.');
  }
};



//---------**update OrganizationProfile End**------------//

//---------**AddOrganizationProfile User Type**------------//

const [orgTypes, setOrgTypes] = useState([]);
const [selectedOrgTypeId, setSelectedOrgTypeId] = useState(null);

// Fetch organization types
useEffect(() => {
  const fetchOrgTypes = async () => {
    try {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(
        'https://dev.quizifai.com:8010/organization-types-dropdown/',
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.response === 'success') {
        setOrgTypes(data.data);
      } else {
        console.error(data.response_message);
      }
    } catch (error) {
      console.error('Error fetching organization types:', error);
    }
  };

  fetchOrgTypes();
}, []);

// Handle dropdown selection
const handleSelectChange = (event) => {
  const selectedName = event.target.value;
  setSelectedOrgTypeId(selectedName);
  console.log('Selected Organization Type ID:', selectedId);

};

//---------**AddOrganizationProfile User Type end**------------//

//---------**AddOrganizationProfile Image **------------//
const [photo, setPhoto] = useState(''); // State to store the image URL
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const fetchProfileImage = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
              if (!authToken) {
                console.error("No authentication token found. Please log in again.");
                return;
              }
        const response = await fetch(`https://dev.quizifai.com:8010/view-org-image?org_id=${orgId}`, {
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
    const uploadImage = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
    
      try {
        const response = await fetch(`https://dev.quizifai.com:8010/upload-org-image?org_id=${orgId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });
    
        if (response.ok) {
          // After successfully uploading, fetch the updated image
          fetchProfileImage();
          navigate(0)
        } else {
          setError('Failed to upload image');
        }
      } catch (error) {
        setError('Error uploading image: ' + error.message);
      }
    };
    
    const handleIconClick = () => {
      document.getElementById('fileInput').click();
    };
    
    // Handle file selection
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadImage(file);
      }
    };
    
    useEffect(() => {
      fetchProfileImage();
    }, []);


    const deleteImage = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
              if (!authToken) {
                console.error("No authentication token found. Please log in again.");
                return;
              }
        const response = await fetch(`https://dev.quizifai.com:8010/remove-org-image?org_id=${orgId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'accept': 'application/json',
          },
        });
    
        if (response.ok) {
          // Clear the photo state after successful deletion
          setPhoto('');
          setError(null); // Reset any errors
          navigate(0)
        } else {
          setError('Failed to delete image');
        }
      } catch (error) {
        setError('Error deleting image: ' + error.message);
      }
    };
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };

//---------**AddOrganizationProfile Image END**------------//



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
            <h1 className=' font-semibold text-[#EF5130] mb-2'>Profile</h1>
        </div>
  <div className='flex gap-5'>
  <div className="relative">
                    {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="relative w-[80px] h-[80px] ">
        <img
          src={photo}
          alt="Profile"
          onClick={openModal}
          className="w-[80px] h-[80px] rounded-2xl"
        />
        <div 
          className="absolute bottom-0 right-0 rounded-full cursor-pointer"
          onClick={openModal}
        >
         <img src={camera1} alt="" className="w-[20px] h-[20px]"/>
        </div>
      </div>
      )}

      {/* Hidden file input for selecting image */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
                    </div>
                    {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
         <div class="flex items-center justify-center min-h-screen ">
  <div class="bg-gray-800 text-white rounded-lg p-6 shadow-lg max-w-xs">
    <div class="relative">
      <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200">
        <img src={photo} alt="Profile" class="w-full h-full object-cover"/>
      </div>
      
      <div class="absolute top-[-15px] right-[-15px] flex space-x-2">
        <button class="bg-gray-600 p-2 rounded-full text-white hover:bg-gray-500">
        
          <img src={x} alt="" class="h-5 w-5" />
        </button>
      </div>
    </div>
    
    <h2 class="text-center text-xl  mt-4">Profile photo</h2>
    
    <div class="mt-4 flex justify-between">
      <button class="bg-gray-700 px-4 py-2 rounded text-sm text-white hover:bg-gray-600"  onClick={handleIconClick}>Add photo</button>

      <button class="bg-red-600 px-4 py-2 rounded text-sm text-white hover:bg-red-500" onClick={deleteImage}>Delete</button>
    </div>
  </div>
</div>

        </div>
      )}
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
                // onChange={(e) => setOrgName(e.target.value)}
                // disabled={!isEditing}
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
          value={selectedOrgTypeId}
        onChange={handleSelectChange}
        >
          <option value="" disabled>Institations</option>
          {orgTypes.map((org) => (
          <option key={org.org_type} value={org.org_type}>
            {org.org_type}
          </option>
        ))}
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
                placeholder="Organization Address Line1"
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
                placeholder="Organization Address Line2"
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
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] h-[31px] hover:border-blue-200 text-[11px] focus:outline-none `}

        placeholder="PostalCode"
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
                value={websiteurl}
                onChange={(e) => setWebsiteurl(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     
      </div>
  
    </div>
  </div>
  {showsave ?  (
                   
                   <div className="flex justify-end gap-[10px] md:col-span-2 w-[89%] pl-[125px] mt-2">

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
                <div className="flex justify-end gap-[10px] md:col-span-2 w-[89%] mt-2 ">

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
  <div className=' flex flex-col gap-5 mt-2 bg-white p-5 rounded-lg'>
      <div>
            <h1 className=' font-semibold text-[#EF5130] mb-2'>Admin</h1>
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
      
      <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Name"
                value={username}
              ></input>
  
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
                value={email}
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
    </div>
    </>
    
    

    
  )
}

export default profileorganization