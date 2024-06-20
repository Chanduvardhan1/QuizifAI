// profile.js

import React, { useState, useEffect } from "react";
//import { useRouter } from 'next/router';
import Navigation from "../navbar/navbar.jsx";
import axios from "axios";
import LogoutBar from "../logoutbar/logoutbar.jsx";

import styles from "./free-profile.module.css";
import logoutArrowIcon from "../assets/Images/images/dashboard/logoutArrow1.png";
//import Head from "next/head";
//import img from "next/img";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import notificationsettings from "../assets/Images/images/dashboard/notification-settings.png";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import rankingimg from "../assets/Images/images/profile/ranking.png";
import infoIcon from "../assets/Images/images/dashboard/infoIcon.png";

import infoph from "../assets/Images/images/profile/infoPh.png";
import EmailIcon from "../assets/Images/images/email/mail.png";
import GmailIcon from "../assets/Images/images/profile/icongmail.png";
import MobileIcon from "../assets/Images/images/mobile/mob.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from "react-sweet-progress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "react-sweet-progress/lib/style.css";

const FreeProfile = () => {
  const getFormattedDate = () => {
    const currentDate = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
    };
    return currentDate.toLocaleDateString("en-IN", options);
  };

  const currentValue1 = 50;
  const maxValue1 = 100;
  const currentValue2 = 30;
  const maxValue2 = 80;

  const [isFocused, setIsFocused] = useState(false);
  const [selectedButton, setSelectedButton] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [preferredLoginMethod, setPreferredLoginMethod] = useState("email");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [accesskey, setaccesskey] = useState("");

  const [latestResults, setLatestResults] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const [notAttemptedQuizzes, setNotAttemptedQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [topScoredQuizzes, setTopScoredQuizzes] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [profileData, setProfileData] = useState(null);
  const [profession, setProfession] = useState("");
  const [Otp, setOtp] = useState(null);
  const [userrole, setuserrole] = useState("quiz user");
  const [usertype, setusertype] = useState("public");
  const [displayname, setdisplayname] = useState(null);
  const [professions, setProfessions] = useState("student");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setInputValue(buttonName);
  };
  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    // Allow only digits and limit to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setPostalCode(value);
    }
  };

  const handleDateChange =(e) =>{
    const dateValue = e.target.value;
    const year = dateValue.split('-')[0];
    if(year.length <= 4){
      setDob(dateValue);
    }
  }

  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://quizifai.com:8010/get_prfl_dtls");
  //       const userData = await response.json();
  //       setFirstName(userData.data.first_name);
  //       setMiddleName(userData.data.middle_name);
  //       setLastName(userData.data.last_name);
  //       setOccupation(userData.data.occupation_name);
  //       setPincode(userData.data.pin_code);
  //       setCityName(userData.data.city_name);
  //       setGender(userData.data.gender);
  //       setStateName(userData.data.state_name);
  //       setDOB(userData.data.date_of_birth);
  //       setCountryName(userData.data.country_name);
  //       setEmail(userData.data.user_email);
  //       setMobile(userData.data.user_phone_number || ""); 
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  
  // const BasicProgressBar = ({ currentValue, maxValue }) => (
  // <progress value={currentValue} max={maxValue}>{currentValue}%</progress>
  //);

  // const BasicProgressBar = ({ currentValue, maxValue }) => (
  //   <progress value={currentValue} max={maxValue} style={{ width: "100px" }}>
  //     {currentValue}%
  //   </progress>
  // );

  // const handleSubmit = async () => {
  //   const payload = {
  //     user_id: userId,
  //     first_name: firstName,
  //     middle_name: middleName,
  //     last_name: lastName,
  //     user_email: email,

  //     user_phone_number: parseInt(mobileNumber === "" ? "0" : mobileNumber),
  //     gender: gender,
  //     date_of_birth: dob,
  //     user_address_line_1: address1,
  //     user_address_line_2: address2,
  //     occupation: professions,
  //     preferred_login_method: preferredLoginMethod,
  //     access_key: accesskey,
  //     user_role: userrole,
  //     user_type: usertype,
  //     user_org_id: 0,
  //     active_flag: true,
  //     user_address_id: 0,
  //     user_location_id: 0,
  //     access_key: null,
  //     otp: Otp,
  //     display_name: displayname,
  //   };

  //   try {
  //     const response = await fetch("https://quizifai.com:8010/edt_prfl_dtls", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to submit data");
  //     }

  //     const responseData = await response.json();
  //     console.log(responseData);
  //     console.log("Response:", response);
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  // useEffect(() => {
  //   const userId = localStorage.getItem("user_id");

  //   fetch("https://quizifai.com:8010/get_prfl_dtls", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       accept: "application/json",
  //     },
  //     body: JSON.stringify({ user_id: userId }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setProfileData(data);
  //       setFirstName(data.data.first_name);
  //       setMiddleName(data.data.middle_name);
  //       setLastName(data.data.last_name);
  //       setGender(data.data.gender);
  //       setProfession(data.data.occupation_name);
  //       setDob(data.data.date_of_birth);

  //       setPostalCode(data.data.pin_code);
  //       setAddress1(data.data.user_address_line_1);
  //       setAddress2(data.data.user_address_line_2);
  //       setCity(data.data.location_name);
  //       setState(data.data.state_name);
  //       setCountry(data.data.country_name);
  //       setEmail(data.data.user_email);
  //       setMobileNumber(data.data.user_phone_number);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching profile data:", error);
  //     });
  // }, []);

  // const [pincode, setpincode] = useState("");
  // const [countryname, setcountryname] = useState("");
  // const [statename, setstatename] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [responseData, setResponseData] = useState(null);

  // const handleSearchClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       "https://quizifai.com:8010/location_details/",
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           pincode: postalCode,
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to submit form");
  //     }

  //     const data = await response.json();
  //     setResponseData(data); // Set response data in state
  //     console.log(data); // Displaying response in console
  //     setErrorMessage(""); // Clear any previous error message
  //     if (
  //       data &&
  //       data.data &&
  //       Array.isArray(data.data[0]) &&
  //       data.data[0].length > 0
  //     ) {
  //       setstatename(data.data[0][0].Statename || '');
  //       setcountryname(data.data[0][0].country_name || '');
  //       setCity(data.data[0][0].Cityname || '');
  //       setErrorMessage('');
  //     }else{
  //       setErrorMessage("No data found for the given postal code");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setErrorMessage("Failed to submit form. Please try again.");
  //   }
  // };
  
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user name from local storage
    const storedUserName = localStorage.getItem("user_name");
    setUserName(storedUserName);
  }, []);

  const [userData, setUserData] = useState({
    user_id: 0,
    first_name: 'Madhuri',
    middle_name: '',
    last_name: '',
    user_email: '',
    email_otp: 0,
    user_phone_number: '',
    otp: 0,
    user_role: 'quiz user',
    user_type: 'public',
    user_org_id: 0,
    active_flag: true,
    gender: '',
    display_name: '',
    date_of_birth: '',
    preferred_login_method: 'email',
    user_address_id: 0,
    user_location_id: 0,
    user_address_line_1: '',
    user_address_line_2: '',
    occupation: 'Student',
    other_occupation: '',
    access_key: ''
  });
  useEffect(() => {
    // Fetch user data on component mount
    axios.get('https://quizifai.com:8010/get_prfl_dtls')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  return (
    <div className={styles.container}>
      
      <Navigation />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <div className="flex">
          <div className="absolute left-0 ml-[50px]">
          <p className="">{userName}</p>
          <div className="bg-[#30CDF040] mt-[10px] pl-[5px] text-[15px] font-medium text-[#214082] leading-6 py-[10px] rounded-[10px] w-[770px]">
          You've completed {weeklyQuizCount} Quizzes this week with an average
          score of {averageScorePercentage}%
        </div>
          </div>
          <div className={styles.headerRight}>
            <div>{getFormattedDate()}</div>
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div>
          </div>
          </div>
          
        </div>
        <div className={styles.contentContainer} style={{ marginLeft: "30px",marginTop:"80px" }}>
          <div className={styles.imgAndTextContainer}>
            <div className={styles.profileimgContainer}>
              <img
                src={profileimg}
                alt="img"
                className={styles.profileimg}
                style={{ width: "113px", height: "110px",marginLeft:"20px" }}
              />
              {/* <a href="./old-password" className="text-[10px] ml-[14px] text-blue-700 font-medium hover:underline">Update Password</a> */}
            </div>
          </div>

          <div className="flex">
            {/* first name */}
            <div className="flex">
          <div className={styles.inputGroup1} style={{ marginLeft: "-50px" }}>
            <label className="text-blue-800 font-semibold">First Name</label>
            <input
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              className="border-none border-b-2 hover:border-gray-500 ml-[10px] h-[30px] w-[250px] text-[11px] focus:outline-none"
              type="text"
            />
            <hr className="h-[1px] w-[255px] bg-gray-200"></hr>
          </div>
          <div className={styles.inputGroup1} style={{ marginLeft: "-35px" }}>
            <label className="text-blue-800 font-semibold">Occupation</label>
            <input
              name="occupation"
              value={userData.occupation}
              onChange={handleChange}
              className="border-none border-b-2 hover:border-gray-500 ml-[10px] h-[30px] w-[250px] text-[11px] focus:outline-none"
              type="text"
            />
            <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
          </div>
        </div>
 {/* occupation  */}
            {/* <div className={styles.inputGroup1} style={{marginLeft:"-35px"}}>
             <label className="text-blue-800 font-semibold">Occupation</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
            </div> */}
   </div>
  
   </div>
   <div className="flex ml-[29%] -mt-[50px]">
            {/* Middle name */}
          <div className={styles.inputGroup1} style={{marginLeft:"-50px"}}>
             <label className="text-blue-800 font-semibold">Middle Name</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[255px] bg-gray-200"></hr>
            </div>
 {/* pincode  */}
            <div className={styles.inputGroup1} style={{marginLeft:"-53px"}}>
             <label className="text-blue-800 font-semibold">Pincode</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
            </div>
   </div>
   <div className="flex ml-[29%] -mt-[10px]">
            {/* Last name */}
          <div className={styles.inputGroup1} style={{marginLeft:"-50px"}}>
             <label className="text-blue-800 font-semibold">Last Name</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[255px] bg-gray-200"></hr>
            </div>
 {/* city name  */}
            <div className={styles.inputGroup1} style={{marginLeft:"-35px"}}>
             <label className="text-blue-800 font-semibold">City Name</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
            </div>
   </div>
   <div className="flex ml-[29%] -mt-[10px]">
            {/* gender*/}
          <div className={styles.inputGroup1} style={{marginLeft:"-50px"}}>
             <label className="text-blue-800 font-semibold">Gender</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[255px] bg-gray-200"></hr>
            </div>
 {/* state name  */}
            <div className={styles.inputGroup1} style={{marginLeft:"-13px"}}>
             <label className="text-blue-800 font-semibold">State Name</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-50
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
            </div>
   </div>
   <div className="flex ml-[29%] -mt-[10px]">
            {/* email*/}
          <div className={styles.inputGroup1} style={{marginLeft:"-50px",textWrap:"nowrap"}}>
             <label className="text-blue-800 font-semibold">DOB</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[255px] bg-gray-200"></hr>
            </div>
 {/* mobile */}
            <div className={styles.inputGroup1} style={{marginLeft:"10px",textWrap:"nowrap"}}>
             <label className="text-blue-800 font-semibold">Country Name</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
  />
  <hr
    className={`h-[1px] w-[270px] bg-gray-200 ${isFocused ? 'bg-blue-500' : ''}`}
  />
            </div>
   </div>
   <div className="flex ml-[29%] -mt-[10px]">
            {/* email*/}
          <div className={styles.inputGroup1} style={{marginLeft:"-50px"}}>
             <label className="text-blue-800 font-semibold">Email</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[255px] bg-gray-200"></hr>
            </div>
 {/* mobile */}
            <div className={styles.inputGroup1} style={{marginLeft:"3px"}}>
             <label className="text-blue-800 font-semibold">Mobile</label>
             <input className="
   border-none 
      border-b-2  
      hover:border-gray-500 
      ml-[10px] 
      h-[30px] 
      w-[250px] 
      text-[11px] 
      focus:outline-none
    " type="text"/>
    <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
            </div>
   </div>
   
   <div className="flex justify-start ml-[23%] gap-5 mt-[20px]">
   <button className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[#FA3D49] transition-transform duration-300 ease-in-out px-4 py-1 rounded-[20px] text-white">Edit</button>
   <button className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[#FA3D49] transition-transform duration-300 ease-in-out px-4 py-1 rounded-[20px] text-white">Save</button>
   {/* <button className="bg-[#3B61C8] py-2 px-4 rounded-[20px] text-white">verify</button> */}
   </div>
   
   </div>
        
       <LogoutBar />
    </div>
  );
};

export default FreeProfile;
