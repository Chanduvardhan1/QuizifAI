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
      Authorization: `Bearer ${token}`,
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




  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }

  const handleedit = () =>{
    setShowsave(true);
  }
  const handleeditback = () =>{
    setShowsave(false);
  }
  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='w-full p-5'>
        <div>
            <h1 className=' font-semibold text-[#EF5130] mb-2'>Organization Profile</h1>
        </div>
  <div className='flex gap-5'>
  <div className="relative w-[100px] h-[100px]">
        <img
          src={defaultPhoto}
          alt="Profile"
          className="w-[100px] h-[100px] rounded-xl"
        />
        <div 
          className="absolute bottom-0 right-0 rounded-full cursor-pointer"
        //   onClick={openModal}
        >
         <img src={camera1} alt="" className="w-[20px] h-[20px]"/>
        </div>
        <div className='flex justify-center'>Logo</div>
      </div>
    <div className='w-[70%] flex flex-col gap-5'>
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
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Pincode<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                value={postalCode}
                onChange={handlePostalCodeChange}
              ></input>
   <img
                    className="h-[15px] w-[15px] absolute right-[275px] mt-[5px]"
                    src={search}
                    onClick={handleSearchClick}
                  />
        </div>
        {error && (
                    <div className="text-red-500 text-[10px] mt-1">{error}</div>
                  )}
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] "> District Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">City Name<span className="text-red-500">*</span></label>
     
    <select
       className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                    type="text"
                    value={city}
                    onChange={handleCityChange}
                  
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
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">State Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Country Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>






      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Website URL</label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Website URL"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Type<span className="text-red-500">*</span></label>
        <select
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
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Description</label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Description"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[25%] text-blue-800 font-semibold mb-2 mr-[9px] ">Organization Address<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization admin Name"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

  
    </div>
  </div>
  <div className=' flex flex-col gap-5'>
      <div>
            <h1 className=' font-semibold text-[#EF5130] mb-2'>Organization Admin</h1>
        </div>
        <div className='w-[80%] flex flex-col gap-5 pl-[125px]'>

     
      <div className='flex gap-2 w-full'>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[69%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin ID<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Admin ID"
                value={selectedUser ? selectedUser.user_id : ""}
                readOnly
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 mr-[9px] ">Name<span className="text-red-500">*</span></label>
      
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
      </div>
      </div>
     

      <div className='flex gap-2 w-full'>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[69%] text-blue-800 font-semibold mb-2 mr-[9px] ">Mobile<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Mobile"
                // value={availablefrom}
                // onChange={handleAvailableFromChange}
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
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      </div>

      </div>
      
            
            {showsave ?  (
                   
                   <div className="flex justify-end gap-[10px] md:col-span-2 w-[80%] pl-[125px]">

                   <button
                     onClick={handleeditback}
                     className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
       
                   >
                     Cancel
                   </button>  
                    <button
                    //   onClick={handleNextpage1}
                      className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
        
                    >
                      Save
                    </button>
                    </div>
            ) :(
                <div className="flex justify-end gap-[10px] md:col-span-2 w-[80%] ">

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