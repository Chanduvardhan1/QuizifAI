// profile.js

import React, { useState, useEffect } from "react";
//import { useRouter } from 'next/router';
import Navigation from "../navbar/navbar.jsx";
import axios from "axios";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import styles from "./free-profile.module.css";

import visible from "../assets/Images/images/profile/visible.png";
import hide from "../assets/Images/images/profile/hide.png";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import search from "../assets/Images/images/dashboard/Search.png";
import profileimg from "../assets/Images/images/profile/profileImage.png";
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
  const [preferredLoginMethod, setPreferredLoginMethod] = useState("");
  // get user details
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState('');
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLogin, setIsEditingLogin] = useState(false);
  const [initialFormData, setInitialFormData] = useState({}); 
  const [initialLoginData, setInitialLoginData] = useState({});
  const [oldPassword, setOldPassword] = useState('********');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showNewPasswords, setShowNewPasswords] = useState(false);
  const [buttonText, setButtonText] = useState('Update Password');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [locationId, setLocationId] = useState("");

  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const storedPassword = localStorage.getItem('password');
  const [userName, setUserName] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [profession, setProfession] = useState("");
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [userrole, setuserrole] = useState("quiz user");
  const [usertype, setusertype] = useState("public");
  const [displayname, setdisplayname] = useState(null);
  const [professions, setProfessions] = useState("student");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setInputValue(buttonName);
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    const year = dateValue.split("-")[0];
    if (year.length <= 4) {
      setDob(dateValue);
    }
  };

  //location details ****************************
  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    // Allow only digits and limit to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setPostalCode(value);
      setError('');
    }
  };

  
    const fetchDetailsByPincode = async (pincode) => {
      try {
        const response = await axios.post('https://quizifai.com:8010/location_details/', {
          pincode: pincode
        });
        const data = response.data.data[0];
        setCountry(data.country);
        setState(data.state);
        setDistrict(data.district);
        setLocationId(data.location_id);
  
        const locationData = response.data.data;
        setLocations(locationData);
        if(locationData.length > 0){
          setCity(locationData[0].location);
        }

      } catch (error) {
        console.error("Error fetching details by pincode", error);
      }
    };

    const handleSearchClick = () => {
      if (postalCode.length < 6) {
        setError('* Pincode must be 6 digits.');
        return;
      }
      fetchDetailsByPincode(postalCode);
    };

  // Get profile details integration part******************
  useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);     
      try {
        const response = await fetch(
          `https://quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data:", data);

        const dashboardData = data.data[0];
            if (dashboardData) {
                setWeeklyQuizCount(dashboardData.weekly_quiz_count);
                setAverageScorePercentage(dashboardData.average_score_percentage);
            } else {
                console.error("Dashboard data not found");
            }
      
        const userProfileDetails = data.data[0].user_profile_details;
        if(!userProfileDetails){
          throw new Error("User profile details not found");
        }
        
        const initialData = {
          firstName: userProfileDetails.first_name,
          middleName: userProfileDetails.middle_name,
          lastName: userProfileDetails.last_name,
          gender: userProfileDetails.gender,
          dob: userProfileDetails.date_of_birth,
          district : userProfileDetails.district_name,
          email: userProfileDetails.user_email,
          mobileNumber: userProfileDetails.user_phone_number,
          country: userProfileDetails.country_name,
          state: userProfileDetails.state_name,
          city: userProfileDetails.location_name ,
          postalCode: userProfileDetails.pin_code,
          occupation: userProfileDetails.occupation_name,
          preferredLoginMethod: userProfileDetails.preferred_login_method,
        };
        setFirstName(userProfileDetails.first_name);
        setMiddleName(userProfileDetails.middle_name);
        setLastName(userProfileDetails.last_name);
        setGender(userProfileDetails.gender);
        setDob(userProfileDetails.date_of_birth);
        setDistrict(userProfileDetails.district_name);
        setEmail(userProfileDetails.user_email);
        setMobileNumber(userProfileDetails.user_phone_number);
        setCountry(userProfileDetails.country_name);
        setState(userProfileDetails.state_name);
        setCity(userProfileDetails.location_name);
        setPostalCode(userProfileDetails.pin_code);
        setOccupation(userProfileDetails.occupation_name);
        setInitialLoginData(initialData);
        setPreferredLoginMethod(userProfileDetails.preferred_login_method);
         
        const userDetails = data.data[0].audit_details;
        setUserName(userDetails.full_name);

        console.log("Gender:", userProfileDetails.gender); 
        // const userDetails = data.user_details;
        // setUserName(userDetails.full_name);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId]);
  // console.log("Stored password:", storedPassword);
  
  // Edit profile details **********************
  const handleEditClick = () => {
    setInitialFormData({firstName,middleName,lastName,
          gender,
          dob,
          district,
          email,
          mobileNumber,
          country,
          state,
          city,
          postalCode,
          occupation,
          preferredLoginMethod,
    }); // Save the current form data as the initial state
    setIsEditing(true);
  };
   // save after edit 
  const handleSaveClick = async () => {
    const payload = {
      user_id: userId,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      user_email: email,
      email_otp: " ",
      user_phone_number: mobileNumber,
      otp: " ",
      user_role: "quiz user", // Example value, adjust as needed
      user_type: "public", 
      user_org_id: null,
      gender: gender,
      display_name: " ",
      date_of_birth: dob,
      preferred_login_method: preferredLoginMethod,
      user_address_id: null,
      user_location_id: locationId,
      user_address_line_1: " ",
      user_address_line_2: " ",
      occupation: occupation,
      other_occupation: " ",
    };

    console.log("Updating profile with payload:", payload);

    try {
      const response = await fetch(
        `https://quizifai.com:8010/edt_prfl_dtls`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update data: ${errorText}`);
      }

      const data = await response.json();
      console.log("Updated Data:", data);
      alert("Profile Updated successfully...!")

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleCancelClick = () => {
    setFirstName(initialFormData.firstName);
    setMiddleName(initialFormData.middleName);
    setLastName(initialFormData.lastName);
    setGender(initialFormData.gender);
    setDob(initialFormData.dob);
    setDistrict(initialFormData.district);
    setEmail(initialFormData.email);
    setMobileNumber(initialFormData.mobileNumber);
    setCountry(initialFormData.country);
    setState(initialFormData.state);
    setCity(initialFormData.city);
    setPostalCode(initialFormData.postalCode);
    setOccupation(initialFormData.occupation);
    setIsEditing(false);
  };

  //Login user detailes88********************

  const handleLoginEditClick = () => {
    setInitialFormData({
      email,
      mobileNumber,
});
setIsEditingLogin(true);
  };

  const handleLoginSaveClick = async () => {
    const payload = {
      user_id: userId,
      email: email,
      mobile: mobileNumber,
      // otp: otp,     
    };
  
    console.log("Sending OTP with payload:", payload);
  
    try {
      const response = await fetch(
        `https://quizifai.com:8010/chnge_email_mobile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to send OTP: ${errorText}`);
        throw new Error(`Failed to send OTP: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("OTP Sent Data:", data);
  
      setIsEditingLogin(false);
      setIsOtpSent(true);
      alert('OTP sent successfully!');
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      // Display error message to the user
      alert("Error sending OTP. Please try again.");
    }
  };
  const handleLoginCancelClick = () =>{
    setEmail(initialFormData.email);
    setMobileNumber(initialFormData.mobileNumber);
  }

  const handleOtpVerifyClick = () => {
    const isOtpValid = verifyOtp(otp);

    if (isOtpValid) {
      setMessage('OTP verified successfully!');
      setIsEditing(false);
      setIsEditingLogin(false);
      setIsOtpSent(false);
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };
  const verifyOtp = (enteredOtp) => {
    // Implement your OTP verification logic here
    // For this example, let's assume the OTP is "123456"
    return enteredOtp === "123456";
  };


//update password****************************
const togglePasswordVisibility = (type) => {
  switch (type) {
    case 'old':
      setOldPasswordVisible(!oldPasswordVisible);
      break;
    case 'new':
      setNewPasswordVisible(!newPasswordVisible);
      break;
    case 'confirm':
      setConfirmPasswordVisible(!confirmPasswordVisible);
      break;
    default:
      break;
  }
};
const handleUpdatePassword = async (e) => {
  e.preventDefault();

  if (!showNewPasswords) {
    setShowNewPasswords(true);
    setButtonText('Save Password');
    return;
  }

  let valid = true;

  if (!validatePassword(newPassword)) {
    setNewPasswordError('Password must be at least 8 characters long, contain 1 uppercase letter, 1 special character, and 1 digit.');
    valid = false;
  } else {
    setNewPasswordError('');
  }

  if (newPassword !== confirmPassword) {
    setConfirmPasswordError('New password and confirm password do not match.');
    valid = false;
  } else {
    setConfirmPasswordError('');
  }

  if (!valid) {
    return;
  }

  try {
    const response = await axios.post('https://quizifai.com:8010/update_password', {
      user_id: userId, // Replace with your user ID
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });

    if (response === "success") {
      alert("Password updated successfully");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setOldPasswordError('');
      setNewPasswordError('');
      setConfirmPasswordError('');
      setShowNewPasswords(false);
      setButtonText('Update Password');
    } else if (response.data.error === 'Incorrect old password') {
      setOldPasswordError('Incorrect old password.');
      alert("Incorrect old password");
    } else {
      alert("Failed to update password.");
    }
  } catch (error) {
    console.error("Error updating password", error);
    alert("An error occurred while updating the password");
  }
};

const validatePassword = (password) => {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.mainContent} style={{backgroundColor:"#F5F5F5"}}>
        <div className={styles.header}>
          {/* Header content */}
          <div className="flex">
            <div className="absolute left-0 ml-[20px] w-full">
              <p className="text-[#002366] ml-[16px]">Welcome {userName}</p>
              <div className="bg-[#30CDF040] mr-[40px] mt-[10px] pl-[20px] text-[15px] font-medium text-[#214082] leading-6 py-[10px] rounded-[10px]">
                You've completed {weeklyQuizCount} Quizzes this week with an
                average score of {averageScorePercentage}%
              </div>
            </div>
            <div className={styles.headerRight}>
              <div className="text-[#002366]">{getFormattedDate()}</div>
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

        {/* Main content  */}
        <div className="relative top-[70px] bg-white flex-col">
        <div
          className={styles.contentContainer}
          style={{ marginLeft: "30px", marginTop: "" }}
        >
          <div className={styles.imgAndTextContainer}>
            <div className={styles.profileimgContainer}>
            <h1 className=" text-[13px] text-[#EF5130] font-semibold relative top-3 left-2">
                  Personal Information
                </h1>
              <img
                src={profileimg}
                alt="img"
                className={styles.profileimg}
                style={{ width: "113px", height: "110px", marginLeft: "20px",position:"relative", top:"35px"}}
              />
              {/* <a href="./old-password" className="text-[10px] ml-[14px] text-blue-700 font-medium hover:underline">Update Password</a> */}
            </div>
          </div>
            
        </div>
        {/* first name */}
        <div className="flex flex-nowrap -mt-[25px]">
              <div
                className={styles.inputGroup1}
                style={{ marginLeft: "195px",marginTop:"-50px" }}
              >
                <label className="text-blue-800 font-semibold">
                  First Name
                </label>
                <input
                  className="border-transparent 
                          border-b-2  
                        hover:border-blue-200 
                          ml-[10px] 
                          mr-[73px]
                          h-[30px] 
                          w-[165px] 
                          pl-[21px]
                          text-[11px] 
                          focus:outline-none ${isEditing ? 'input-highlight' : ''}`}"
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={!isEditing}
                />
                <hr className={`h-[1px] w-[250px] ${isEditing ? 'hr-highlight' : 'bg-whitet'}`}></hr>
              </div>
              <div
                className={styles.inputGroup1}
                style={{ marginLeft: "-30px" ,marginTop:"-50px"}}
              >
                <label className="text-blue-800 font-semibold">
                  Occupation
                </label>
                <select
                  name="occupation"
                  className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          h-[30px] 
                          w-[183px] 
                          text-[11px] 
                          pl-[17px]
                          focus:outline-none"
                          type="text"
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                          disabled={!isEditing}
                >
                 {/* <option value={occupation}>{occupation}</option> */}
                 <option value="Student">Student</option>
                 <option value="Teacher">Teacher</option>
                 <option value="Professional">Professional</option>
                 <option value="Other">Other</option> 
                </select>
                <hr className="h-[0.5px] w-[270px] bg-gray-100"></hr>
              </div>
            </div>
        <div className="flex ml-[29%] -mt-[15px] my-[10px]">
          {/* Middle name */}
          <div className={styles.inputGroup1} style={{ marginLeft: "-46px" }}>
            <label className="text-blue-800 font-semibold">Middle Name</label>
            <input
              className="border-transparent 
                          border-b-2   
                        hover:border-blue-200 
                          ml-[8px] 
                          mr-[133px]
                          h-[30px] 
                          w-[103px] 
                          text-[11px] 
                          pl-2
                          focus:outline-none"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              disabled={!isEditing}
            />
            <hr className="h-[0.5px] w-[250px] bg-gray-200"></hr>
          </div>
          {/* pincode  */}
          <div className={styles.inputGroup1} style={{ marginLeft: "-40px",display:"" }}>
            <label className="text-blue-800 font-semibold">Pincode</label>
            <input
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          // mr-[90px]
                          h-[30px] 
                          w-[85px] 
                          text-[11px]
                          pl-[44px] 
                          focus:outline-none"
              type="text"
              value={postalCode}
              onChange={handlePostalCodeChange}
              disabled={!isEditing}
            />
          <img
          className="h-[15px] w-[15px] -mt-[15px] ml-[93%] relative -top-[8px] cursor-pointer"
          src={search}
          onClick={handleSearchClick}
        />     
         {error && <div className="text-red-500 text-[10px] mt-2">{error}</div>}       
            <hr className="h-[0.5px] w-[270px] bg-gray-200"></hr>
          </div>
        </div>
        <div className="flex ml-[29%] -mt-[5px] my-[10px]">
          {/* Last name */}
          <div className={styles.inputGroup1} style={{ marginLeft: "-50px" }}>
            <label className="text-blue-800 font-semibold">Last Name</label>
            <input
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          mr-[75px]
                          h-[30px] 
                          w-[170px] 
                          text-[11px]
                          pl-[26px] 
                          focus:outline-none"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
            />
            <hr className="h-[1px] w-[250px] bg-gray-200"></hr>
          </div>
          {/* district name  */}
          <div
            className={styles.inputGroup1}
            style={{ marginLeft: "-30px", textWrap: "nowrap" }}
          >
            <label className="text-blue-800 font-semibold">District Name</label>
            <input
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          h-[30px] 
                          w-[170px] 
                          text-[11px] 
                          pl-2
                          focus:outline-none"
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!isEditing}
            />
            <hr
              className={`h-[1px] w-[270px] bg-gray-200 ${
                isFocused ? "bg-blue-500" : ""
              }`}
            />
          </div>
          
        </div>
        <div className="flex ml-[29%] -mt-[5px] my-[10px]">
          {/* gender*/}
          <div className={styles.inputGroup1} style={{ marginLeft: "-50px" }}>
  <label className="text-blue-800 font-semibold">Gender</label>
  <select
    className="border-transparent 
               border-b-2   
               hover:border-blue-200 
               ml-[10px] 
               h-[30px] 
               w-[190px] 
               text-[11px] 
               pl-[43px]
               mr-[5px]
               focus:outline-none"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    disabled={!isEditing}
  >
    {/* <option value={gender}>{gender}</option> */}
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
  <hr className="h-[0.5px] w-[250px] bg-gray-200"></hr>
            </div>
          {/* city name  */}
          <div className={styles.inputGroup1} style={{ marginLeft: "40px" }}>
            <label className="text-blue-800 font-semibold">City Name</label>
            <select
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          h-[30px] 
                          w-[183px] 
                          text-[11px] 
                          pl-[25px]
                          focus:outline-none"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!isEditing}
            >
              <option value={city}>{city}</option>
             {locations.map((location) => (
            <option key={location.location_id} value={location.location}>
              {location.location}
            </option>
             ))} 
            </select>
            <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
          </div>  
        </div>
        <div className="flex ml-[29%] -mt-[5px] my-[10px]">
          {/* email*/}
          <div
            className={styles.inputGroup1}
            style={{ marginLeft: "-50px", textWrap: "nowrap" }}
          >
            <label className="text-blue-800 font-semibold">Date of birth</label>
            <input
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          mr-[150px]
                          h-[30px] 
                          w-[158px] 
                          text-[11px]
                          pl-[14px] 
                          focus:outline-none"
              type="date"
              value={dob}
              onChange={handleDateChange}
               disabled={!isEditing}
            />
            <hr className="h-[1px] w-[250px] bg-gray-200"></hr>
          </div>
          {/* state */}
          <div className={styles.inputGroup1} style={{ marginLeft: "-105px" }}>
            <label className="text-blue-800 font-semibold">State Name</label>
            <input
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          h-[30px] 
                          w-[183px] 
                          text-[11px] 
                          pl-[19px]
                          focus:outline-none"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={!isEditing}
            />
            <hr className="h-[1px] w-[270px] bg-gray-200"></hr>
          </div>
          
        </div>
        <div className="flex ml-[29%] -mt-[5px] my-[10px]">
         
          {/* Country */}
          <div
            className={styles.inputGroup1}
            style={{ marginLeft: "-50px", textWrap: "nowrap" }}
          >
            <label className="text-blue-800 font-semibold">Country Name</label>
            <input
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          h-[30px] 
                          w-[164px] 
                          text-[11px] 
                          focus:outline-none"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={!isEditing}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <hr
              className={`h-[1px] w-[270px] bg-gray-200 ${
                isFocused ? "bg-blue-500" : ""
              }`}
            />
          </div>
        </div>


        <div className="flex justify-start ml-[23%] mt-[20px] mb-[20px]">
        {isEditing ? (
        <button
          className="bg-[#3B61C8] hover:transform hover:scale-110  transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] text-white"
          onClick={handleSaveClick}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-[#3B61C8] hover:transform hover:scale-110 transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] text-white"
          onClick={handleEditClick}
        >
          Edit
        </button>
      )}
       <button className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] ml-[5%] text-white"
       onClick={handleCancelClick}
       >
       Cancel
       </button>
          {/* <button className="bg-[#3B61C8] py-2 px-4 rounded-[20px] text-white">verify</button> */}
        </div>
      </div>

      <div className="bg-white w-full mt-[8%]">
    <h1 className="ml-[6%] mt-4 text-[13px] text-[#EF5130] font-semibold">Login User Details</h1>
     {/* login method*/}
     <div
            className={styles.inputGroup1}
            style={{ marginLeft: "200px", textWrap: "nowrap",marginTop:"5px" }}
          >
            <label className="text-blue-800 font-semibold">login Method</label>
            <select
              className="border-transparent 
                           border-b-2   
                        hover:border-blue-200 
                          ml-[10px] 
                          mr-[90px]
                          h-[30px] 
                          w-[155px] 
                          text-[11px] 
                          pl-[10px]
                          focus:outline-none"
                          type="text"
                          value={preferredLoginMethod}
                          onChange={(e) => setPreferredLoginMethod(e.target.value)}
                          disabled={!isEditingLogin}
            >
              {/* <option value={preferredLoginMethod}>{preferredLoginMethod}</option> */}
              <option value="Email">Email</option>
              <option value="Mobile">Mobile</option>
              </select>
            <hr className="h-[1px] w-[250px] bg-gray-200"></hr>
          </div>
    <div className="flex ml-[30%] mt-[20px]">
      <div className={styles.inputGroup1} style={{ marginLeft: "-50px" }}>
        <label className="text-blue-800 font-semibold">Email</label>
        <input
          className={`border-transparent border-b-2 hover:border-blue-200 mr-[40px] ml-[10px] h-[30px] w-[200px] text-[11px] focus:outline-gray-300 ${isEditing ? 'highlight' : ''}`}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditingLogin}
        />
      </div>
      <div className={styles.inputGroup1}>
        <label className="text-blue-800 font-semibold ml-[20px]">Mobile</label>
        <input
          className={`border-transparent border-b-2 hover:border-blue-200 ml-[10px] h-[30px] w-[213px] text-[11px] focus:outline-gray-300 ${isEditing ? 'highlight' : ''}`}
          type="tel"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          disabled={!isEditingLogin}
        />
      </div>
    </div>
    {isEditingLogin ? (
      <>
        <button
          className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[90px] text-[13px] font-semibold rounded-[20px] ml-[200px] mb-[20px] text-white mt-[20px]"
          onClick={handleLoginSaveClick}
        >
          Send OTP
        </button>
        
      </>
    ) : (
      <button
        className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] ml-[200px] mb-[20px] text-white mt-[20px]"
        onClick={handleLoginEditClick}
      >
        Edit
      </button>
    )}
    <button
      className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] ml-[4%] text-white"
      onClick={handleLoginCancelClick}
    >
      Cancel
    </button>
    {message && (
      <div className="mt-[20px] text-green-500 font-semibold">
        {message}
      </div>
    )}
    {isOtpSent && (
          <div className="flex items-center ml-[50%] relative -top-[48px]">
            <input
              className="border-transparent border-b-2 hover:border-blue-200 h-[30px] w-[200px] text-[11px] focus:outline-gray-300"
              placeholder="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[90px] text-[13px] font-semibold rounded-[20px] ml-[10px] text-white"
              onClick={handleOtpVerifyClick}
            >
              Verify OTP
            </button>
          </div>
        )}
  </div>

  <div className="bg-white w-full">
      <h1 className="ml-[6%] mt-4 text-[13px] text-[#EF5130] font-semibold">Update Password</h1>
      <div className="flex ml-[30%] mt-[20px]">
        <div className="inputGroup1" style={{ marginLeft: "-50px" }}>
          <label className="text-blue-800 text-[13px] font-semibold">Password</label>
          <input
            className="border-transparent border-b-2 hover:border-blue-200 mr-[40px] ml-[px] h-[30px] w-[173px] text-[11px] focus:outline-gray-300 pl-[5px]"
            type={oldPasswordVisible ? 'text' : 'password'}
            placeholder="password"
            value={storedPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <span onClick={() => togglePasswordVisibility('old')} className='cursor-pointer'>
            {oldPasswordVisible ? (
              <img className='h-[17px] w-[17px] ml-[66%] relative -top-[25px]' src={visible} title="hide" alt='Hide Password' />
            ) : (
              <img className='h-[17px] w-[17px] ml-[66%] relative -top-[25px]' src={hide} title="show" alt='Show Password' />
            )}
          </span>
          {oldPasswordError && <div className="text-red-500 text-xs mt-1">{oldPasswordError}</div>}
        </div>

        {showNewPasswords && (
          <>
            <div className="inputGroup1">
              <label className="text-blue-800 font-semibold ml-[15px] text-[13px]">New Password</label>
              <input
                className="border-transparent border-b-2 hover:border-blue-200 ml-[15px] h-[30px] w-[163px] text-[11px] focus:outline-gray-300"
                type={newPasswordVisible ? 'text' : 'password'}
                placeholder="new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span onClick={() => togglePasswordVisibility('new')} className='cursor-pointer'>
                {newPasswordVisible ? (
                  <img className='h-[17px] w-[17px] ml-[72%] relative -top-[25px]' src={visible} title="hide" alt='Hide Password' />
                ) : (
                  <img className='h-[17px] w-[17px] ml-[72%] relative -top-[25px]' src={hide} title="show" alt='Show Password' />
                )}
              </span>
              {newPasswordError && <div className="text-red-500 text-xs mt-1 w-[190px] mx-[10px]">{newPasswordError}</div>}
            </div>

            <div className="inputGroup1">
              <label className="text-blue-800 font-semibold ml-[20px] text-[13px]">Confirm Password</label>
              <input
                className="border-transparent border-b-2 hover:border-blue-200 ml-[20px] h-[30px] w-[178px] text-[11px] focus:outline-gray-300"
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={() => togglePasswordVisibility('confirm')} className='cursor-pointer'>
                {confirmPasswordVisible ? (
                  <img className='h-[17px] w-[17px] ml-[67%] relative -top-[25px]' src={visible} title="hide" alt='Hide Password' />
                ) : (
                  <img className='h-[17px] w-[17px] ml-[67%] relative -top-[25px]' src={hide} title="show" alt='Show Password' />
                )}
              </span>
              {confirmPasswordError && <div className="text-red-500 text-xs mt-1 w-[200px]">{confirmPasswordError}</div>}
            </div>
          </>
        )}
      </div>

      <button
        className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[150px] text-[13px] font-semibold rounded-[20px] ml-[200px] mb-[20px] text-white mt-[20px] text-nowrap"
        onClick={handleUpdatePassword}
      >
        {buttonText}
      </button>
    </div>
       
      </div>
      <LogoutBar />
    </div>
  );
};

export default FreeProfile;