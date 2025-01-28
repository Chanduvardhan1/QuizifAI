// profile.js

import React, { useState, useEffect, useRef,  useContext } from "react";
//import { useRouter } from 'next/router';
import Navigation from "../navbar/navbar.jsx";
import axios from "axios";
import styles from "./free-profile.module.css";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";

import visible from "../assets/Images/images/profile/visible.png";
import hide from "../assets/Images/images/profile/hide.png";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import search from "../assets/Images/images/dashboard/Search.png";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import "react-sweet-progress/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoardNavBar from "../../src/dashboardNavBar/dashboardNavBar.jsx";
import { AuthContext } from "../Authcontext/AuthContext.jsx";
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import camera1 from "../../src/assets/Images/dashboard/edit.png"
import x from "../../src/assets/Images/quiz-type/cross-button.png"
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("Email");
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
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLogin, setIsEditingLogin] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});
  const [initialLoginData, setInitialLoginData] = useState({});
  const [oldPassword, setOldPassword] = useState("********");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showNewPasswords, setShowNewPasswords] = useState(false);
  const [buttonText, setButtonText] = useState("Update Password");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [locationId, setLocationId] = useState("");

  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  // const oldPassword = localStorage.getItem('password');
  const [userName, setUserName] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [profession, setProfession] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [userrole, setuserrole] = useState("quiz user");
  const [usertype, setusertype] = useState("");
  const [displayname, setdisplayname] = useState(null);
  const [professions, setProfessions] = useState("student");
  const [emailOtp, setEmailOtp] = useState("");
  const orgId = localStorage.getItem('org_id');

  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);

  const [otheroccupation, setOtherccupation] = useState("");
  const [address1, setAddress1] = useState("");

  const [occupations, setOccupations] = useState([]);

  const [isSendOtpSent, setIsSendOtpSent] = useState(false);

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [rolename, setrolename] = useState("");
  const inputReff = useRef(null);
  const [image, setImage] = useState("");

  const [step, setStep] = useState(1);
  const { isAuthenticated, authToken, logout } = useContext(AuthContext);


  const [photo, setPhoto] = useState(''); // State to store the image URL
  const [loading, setLoading] = useState(true); // State to manage loading status
  // const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
   // State to manage modal visibility
 
  
   const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
  };

  const handleNextpage = () => {
    setStep(2);
  };
  const handleNextpage1 = () => {
    setStep(3);
  };

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
  // Get profile details integration part******************
  useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);
      try {
        const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

        if (!authToken) {
          throw new Error("No authentication token found");
        }
        const response = await fetch(
          `https://dev.quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
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
        if (!userProfileDetails) {
          throw new Error("User profile details not found");
        }

        const initialData = {
          firstName: userProfileDetails.first_name,
          middleName: userProfileDetails.middle_name,
          lastName: userProfileDetails.last_name,
          gender: userProfileDetails.gender,
          dob: userProfileDetails.date_of_birth,
          district: userProfileDetails.district_name,
          email: userProfileDetails.user_email,
          mobileNumber: userProfileDetails.user_phone_number,
          country: userProfileDetails.country_name,
          state: userProfileDetails.state_name,
          city: userProfileDetails.location_name,
          postalCode: userProfileDetails.pin_code,
          occupation: userProfileDetails.occupation_name,
          loginMethod: userProfileDetails.preferred_login_method,
          address: userProfileDetails.user_address_line_1,
          otheroccupation: userProfileDetails.other_occupation_name,
          rolename: userProfileDetails.role_name,
          usertype: userProfileDetails.role_name,
        };
        setFirstName(userProfileDetails.first_name);
        setMiddleName(userProfileDetails.middle_name);
        setLastName(userProfileDetails.last_name);
        setGender(userProfileDetails.gender);
        setDob(userProfileDetails.date_of_birth);
        setDistrict(userProfileDetails.district_name);
        setEmail(userProfileDetails.user_email);
        setMobileNumber(userProfileDetails.user_phone_number);
        // setAddress(userProfileDetails.user_address_line_1);
        setCountry(userProfileDetails.country_name);
        setState(userProfileDetails.state_name);
        setCity(userProfileDetails.location_name);
        setPostalCode(userProfileDetails.pin_code);
        setOccupation(userProfileDetails.occupation_name);
        setInitialLoginData(initialData);
        setLoginMethod(userProfileDetails.preferred_login_method);
        setOtherccupation(userProfileDetails.other_occupation_name);
        setusertype(userProfileDetails.user_type);
        setShowOtherInput(userProfileDetails.occupation_name === "Other");
        setrolename(userProfileDetails.role_name);
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
    setInitialFormData({
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      district,
      email,
      mobileNumber,
      address,
      country,
      state,
      city,
      postalCode,
      occupation,
      loginMethod,
    }); // Save the current form data as the initial state
    setIsEditing(true);
    fetchDetailsByPincode(postalCode); // Call fetchDetailsByPincode here
    handlePostalCodeChange(postalCode);
  };

  const userlocationid = locationId ? String(locationId) : "";

  // save after edit
  // const handleSaveClick = async () => {


  // // Validation logic
  // const errors = [];
  // if (!dob) errors.push("Date of birth is required.");
  // if (!gender) errors.push("Gender is required.");
  // if (!locationId) errors.push("Pincode is required.");
  // if (!occupation) errors.push("Occupation is required.");
  // if (occupation === "Other" && !otheroccupation)
  //   errors.push("Please specify your other occupation.");
  // if (errors.length > 0) {
  //   errors.forEach((error) => toast.error(error)); // Display each error as a toast
  //   return;
  // }

  //   const payload = {
  //     // user_id: userId,
  //     // first_name: firstName,
  //     // middle_name: middleName,
  //     // last_name: lastName,
  //     // user_email: email,
  //     // email_otp: emailOtp,
  //     // // user_phone_number: mobileNumber,
  //     // otp: otp,
  //     // user_role: rolename, // Example value, adjust as needed
  //     // user_type: usertype,
  //     // user_org_id: orgId,
  //     // gender: gender,
  //     // display_name: " ",
  //     // date_of_birth: dob,
  //     // preferred_login_method: preferredLoginMethod,
  //     // user_address_id: null,
  //     // user_location_id: userlocationid,
  //     // user_address_line_1: address,
  //     // user_address_line_2: address1,
  //     // occupation: occupation,
  //     // other_occupation: otheroccupation,
  //     // user_phone_number: mobileNumber,


  //     user_id: userId,
  //     first_name: firstName,
  //     middle_name: middleName,
  //     last_name: lastName,
  //     user_role: rolename, // Example value, adjust as needed
  //     user_type: usertype,
  //     user_org_id: orgId,
  //     gender: gender,
  //     display_name: "",
  //     date_of_birth: dob,
  //     user_address_id: null,
  //     user_location_id: userlocationid,
  //     user_address_line_1: address,
  //     user_address_line_2: address1,
  //     occupation: occupation,
  //     other_occupation: otheroccupation,
  //   };

  //   console.log("Updating profile with payload:", payload);

  //   try {
  //     const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

  //     if (!authToken) {
  //       throw new Error("No authentication token found");
  //     }
  //     const response = await fetch(
  //       `https://dev.quizifai.com:8010/edit-profile`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Failed to update data: ${errorText}`);
  //     }

  //     const data = await response.json();
  //     console.log("Updated Data:", data);
  //     if (
  //       data.detail &&
  //       data.detail.response === "fail" &&
  //       data.detail.response_message === "Invalid or incorrect OTP."
  //     ) {
  //       setResponseMessage("Invalid or incorrect OTP. Please try again.");
  //     } else {
  //       setResponseMessage("Profile Updated successfully...!");
  //       setIsEmailOtpSent(false);
  //       setIsMobileOtpSent(false);
  //       setIsEditing(false);
  //       window.location.reload();
  //       // const response = await fetch(
  //       //   `https://dev.quizifai.com:8010/dashboard`,
  //       //   {
  //       //     method: "POST",
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //       "Authorization": `Bearer ${authToken}`,
  //       //     },
  //       //     body: JSON.stringify({
  //       //        user_id: userId
  //       //     }),
  //       //   }
  //       // );
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const handleSaveClick = async () => {
    // Validation logic
    const errors = [];
    if (!dob) errors.push("Date of birth is required.");
    if (!gender) errors.push("Gender is required.");
    if (!locationId) errors.push("Pincode is required.");
    if (!occupation) errors.push("Occupation is required.");
    if (occupation === "Other" && !otheroccupation)
      errors.push("Please specify your other occupation.");
    if (!userId) errors.push("User ID is required.");
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error)); // Display each error as a toast
      return;
    }
  
    const payload = {
      user_id: userId || null, // Ensure user_id is a valid integer
      first_name: firstName || null,
      middle_name: middleName || null,
      last_name: lastName || null,
      user_role: rolename,
      user_type: usertype,
      user_org_id: orgId || null,
      gender: gender || null,
      display_name: "" || "N/A",
      date_of_birth: dob || null,
      user_address_id: "" || null,
      user_location_id: userlocationid || null,
      user_address_line_1: address || null,
      user_address_line_2: address1 || null,
      occupation: occupation || null,
      other_occupation: occupation === "Other" ? otheroccupation : null,
    };
  
    console.log("Updating profile with payload:", payload);
  
    try {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage
  
      if (!authToken) {
        throw new Error("No authentication token found");
      }
  
      const response = await fetch(
        `https://dev.quizifai.com:8010/edit-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Bearer token for authentication
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update profile: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Profile Updated Response:", data);
  
      if (data.detail?.response === "fail") {
        toast.error(data.detail.response_message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully!");
        setIsEditing(false); // Close the editing mode
        setResponseMessage("Profile Updated successfully...!");
        window.location.reload(); // Reload the page or handle success
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile. Please try again.");
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
    setAddress(initialFormData.address);
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
    setIsEmailOtpSent(false);
    setIsMobileOtpSent(false);
    setIsSendOtpSent(true);
    handleEditClick();
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

    if (!authToken) {
      throw new Error("No authentication token found");
    }
    // Fetch the data from the API
    fetch("https://dev.quizifai.com:8010/occupations/", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response === "success") {
          setOccupations(data.data);
        } else {
          console.error("Failed to fetch occupations");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOccupationChange = (e) => {
    const selectedOccupation = e.target.value;
    setOccupation(selectedOccupation);
    setShowOtherInput(selectedOccupation === "Other");
  };
  // const handleLoginSaveClick = async () => {
  //   const payload = {
  //     user_id: userId,
  //     email: email,
  //     mobile: mobileNumber,
  //   };
  
  //   console.log("Sending OTP with payload:", payload);
  
  //   try {
  //     const authToken = localStorage.getItem("authToken");
  
  //     if (!authToken) {
  //       throw new Error("No authentication token found");
  //     }
  
  //     const response = await fetch(
  //       `https://dev.quizifai.com:8010/chnge_email_mobile`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error(`Failed to send OTP: ${errorText}`);
  //       throw new Error(`Failed to send OTP: ${errorText}`);
  //     }
  
  //     const data = await response.json();
  //     console.log("OTP Response Data:", data);
  
  //     // Handle success response
  //     if (data.response === "success") {
  //       const successMessage = data.response_message;
  
  //       // Show the appropriate OTP input box and success message
  //       if (
  //         successMessage ===
  //         "Your email account is successfully created and verify your OTP on your email."
  //       ) {
  //         setIsEmailOtpSent(true);
  //       } else if (
  //         successMessage ===
  //         "Your mobile account is successfully created and verify your OTP on your mobile."
  //       ) {
  //         setIsMobileOtpSent(true);
  //       } else if (
  //         successMessage ===
  //         "Given email is already registered.but not verified,Please verify your OTP"
  //       ) {
  //         setIsEmailOtpSent(true);
  //       } else if (
  //         successMessage ===
  //         "Given mobile is already registered.but not verified,Please verify your OTP"
  //       ) {
  //         setIsMobileOtpSent(true);
  //       }
  
  //       toast.success(successMessage);
  
  //       // Perform additional actions for success
  //       setIsEditingLogin(false);
  //       setIsOtpSent(true);
  //       handleEditClick();
  //       fetchDetailsByPincode(postalCode);
  //       handlePostalCodeChange(postalCode);
  
  //       return; // Exit after handling success
  //     }
  
  //     // Handle failure response
  //     if (data.response === "fail") {
  //       const errorMessage = data.response_message;
  
  //       // Display the failure message
  //       toast.error(errorMessage);
  //       return; // Exit after handling failure
  //     }
  
  //     // Handle unexpected response
  //     throw new Error("Unexpected response format");
  //   } catch (error) {
  //     console.error("Error sending OTP:", error.message);
  //     toast.error("Error sending OTP. Please try again.");
  //   }
  // };
  
  
  const handleLoginSaveClick = async () => {
    const payload = {
      preferred_login_method: loginMethod, // Determine the method based on input
      identifier: loginMethod === "Email" ? email : mobileNumber, // Use email or mobile as the identifier
      user_id: userId || 0, // Use userId or default to 0 if not provided
    };
  
    console.log("Sending OTP with payload:", payload);
  
    try {
      const authToken = localStorage.getItem("authToken");
  
      if (!authToken) {
        toast.error("No authentication token found.");
        return;
      }
  
      const response = await fetch(`https://dev.quizifai.com:8010/send-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
  
      // If response is not OK, handle it here
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send OTP:", errorText);
        throw new Error(errorText);
      }
  
      const data = await response.json();
      console.log("OTP Response Data:", data);
  
      // Handle success response
      if (data.response === "success" && data.data.response_message) {
        const successMessage = data.data.response_message;
  
        // Show appropriate OTP input box
        if (successMessage.includes("Email")) {
          setIsEmailOtpSent(true); // Show email OTP input box
        } else if (successMessage.includes("Mobile")) {
          setIsMobileOtpSent(true); // Show mobile OTP input box
        }
  
        // Show success toast
        toast.success(successMessage);
  
        // Additional actions for success
        setIsEditingLogin(false);
        setIsOtpSent(true);
        // Uncomment these if needed:
        // handleEditClick();
        // fetchDetailsByPincode(postalCode);
        // handlePostalCodeChange(postalCode);
  
        return; // Exit the function to avoid further code execution
      }
  
      // Handle unexpected response format
      console.error("Unexpected response format:", data);
      toast.error("Unexpected response format. Please try again.");
    } catch (error) {
      console.error("Error in handleLoginSaveClick:", error);
  
      // Show error message only when no success was processed
      toast.error("Error sending OTP. Please try again.");
    }
  };
  
  
  
  const updatePreferredLoginMethod = async () => {
    // Replace the placeholder values with actual data from your state or inputs
    const payload = {
      preferred_login_method: loginMethod, // or "Mobile"
      identifier: mobileNumber, // User's identifier (email or mobile)
      user_id: userId, // User's ID
      email_otp: emailOtp, // Email OTP sent to the user
      mobile_otp: "", // Mobile OTP sent to the user
      new_email: email, // New email to be updated
      new_mobile: "", // New mobile to be updated
    };
  
    try {
      const authToken = localStorage.getItem("authToken"); // Fetch the auth token from localStorage
      if (!authToken) {
        throw new Error("No authentication token found.");
      }
  
      const response = await fetch(
        "https://dev.quizifai.com:8010/update-preferred-login-method",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update login method:", errorText);
        throw new Error("Failed to update login method.");
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log("Update Preferred Login Method Response:", data);
  
      // Handle the success response
      if (data.response === "success") {
        toast.success(data.response_message || "Preferred login method updated successfully!");
        window.location.reload();
      } else if (data.response === "fail") {
        toast.error(data.response_message || "Failed to update preferred login method.");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error in updatePreferredLoginMethod:", error.message);
      toast.error("Error updating preferred login method. Please try again.");
    }
  };
  
  const updatePreferredLoginMethod1 = async () => {
    // Replace the placeholder values with actual data from your state or inputs
    const payload = {
      preferred_login_method: loginMethod, // or "Mobile"
      identifier:email, // User's identifier (email or mobile)
      user_id: userId, // User's ID
      email_otp: "", // Email OTP sent to the user
      mobile_otp: otp, // Mobile OTP sent to the user
      new_email: "", // New email to be updated
      new_mobile: mobileNumber, // New mobile to be updated
    };
  
    try {
      const authToken = localStorage.getItem("authToken"); // Fetch the auth token from localStorage
      if (!authToken) {
        throw new Error("No authentication token found.");
      }
  
      const response = await fetch(
        "https://dev.quizifai.com:8010/update-preferred-login-method",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update login method:", errorText);
        throw new Error("Failed to update login method.");
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log("Update Preferred Login Method Response:", data);
  
      // Handle the success response
      if (data.response === "success") {
        toast.success(data.response_message || "Preferred login method updated successfully!");
        window.location.reload();
      } else if (data.response === "fail") {
        toast.error(data.response_message || "Failed to update preferred login method.");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error in updatePreferredLoginMethod:", error.message);
      toast.error("Error updating preferred login method. Please try again.");
    }
  };
  

  const handleLoginCancelClick = () => {
    setLoginMethod("Email");
    setEmail(initialFormData.email);
    setMobileNumber(initialFormData.mobileNumber);
    setIsEmailOtpSent(false);
    setIsMobileOtpSent(false);
    setIsEditingLogin(false);
    setIsSendOtpSent(false);
    // handleEditClick();
  };

  const handleOtpVerifyClick = () => {
    const isOtpValid = verifyOtp(otp);

    if (isOtpValid) {
      setMessage("OTP verified successfully!");
      setIsEditing(false);
      setIsEditingLogin(false);
      setIsOtpSent(false);
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };
  const verifyOtp = (enteredOtp) => {
    // Implement your OTP verification logic here
    // For this example, let's assume the OTP is "123456"
    return enteredOtp === "123456";
  };

  //update password****************************

  useEffect(() => {
    const oldPassword = localStorage.getItem("password");
    if (oldPassword) {
      setOldPassword(oldPassword);
    }
  }, []);
  const togglePasswordVisibility = (type) => {
    if (type === "old") {
      setOldPasswordVisible(!oldPasswordVisible);
    } else if (type === "new") {
      setNewPasswordVisible(!newPasswordVisible);
    } else if (type === "confirm") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  // const handleUpdatePassword = async (e) => {
  //   e.preventDefault();

  //   if (!showNewPasswords) {
  //     setShowNewPasswords(true);
  //     setButtonText("Save Password");
  //     return;
  //   }

  //   let valid = true;

  //   if (!validatePassword(newPassword)) {
  //     setNewPasswordError(
  //       "Password must be at least 8 characters long, contain 1 uppercase letter, 1 special character, and 1 digit."
  //     );
  //     valid = false;
  //   } else {
  //     setNewPasswordError("");
  //   }

  //   if (newPassword !== confirmPassword) {
  //     setConfirmPasswordError(
  //       "New password and confirm password do not match."
  //     );
  //     valid = false;
  //   } else {
  //     setConfirmPasswordError("");
  //   }

  //   if (!valid) {
  //     return;
  //   }

  //   try {
  //     const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

  //     if (!authToken) {
  //       throw new Error("No authentication token found");
  //     }
  //     const headers = {
  //       'accept': 'application/json',
  //       'Authorization': `Bearer ${authToken}`,
  //       'Content-Type': 'application/json',
  //     };
  //     const response = await axios.post(
  //       "https://dev.quizifai.com:8010/update_password",
  //       {
  //         user_id: userId, // Replace with your user ID
  //         old_password: oldPassword,
  //         new_password: newPassword,
  //         confirm_password: confirmPassword,
  //         headers,
  //       }
  //     );

  //     if (response.data.response === "success") {
  //       toast.error(response.data.response_message);
  //       localStorage.setItem("password", newPassword); // Store the new password in localStorage

  //       setOldPassword(newPassword);
  //       setNewPassword("");
  //       setConfirmPassword("");
  //       setOldPasswordError("");
  //       setNewPasswordError("");
  //       setConfirmPasswordError("");
  //       setShowNewPasswords(false);
  //       setButtonText("Update Password");
  //     } else if (response.data.error === "Incorrect old password") {
  //       setOldPasswordError("Incorrect old password.");
  //     } else {
  //       toast.error("Failed to update password. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating password", error);
  //     toast.error("An error occurred while updating the password");
  //   }
  // };


  const handleUpdatePassword = async (e) => {
    e.preventDefault();
  
    if (!showNewPasswords) {
      setShowNewPasswords(true);
      setButtonText("Save Password");
      return;
    }
  
    let valid = true;
  
    // Validate new password
    if (!validatePassword(newPassword)) {
      setNewPasswordError(
        "Password must be at least 8 characters long, contain 1 uppercase letter, 1 special character, and 1 digit."
      );
      valid = false;
    } else {
      setNewPasswordError("");
    }
  
    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("New password and confirm password do not match.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }
  
    if (!valid) {
      return;
    }
  
    try {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage
  
      if (!authToken) {
        throw new Error("No authentication token found. Please log in again.");
      }
  
      const response = await axios.post(
        "https://dev.quizifai.com:8010/update_password",
        {
          user_id: userId, // Replace with your user ID
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${authToken}`, // Pass token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.response === "success") {
        toast.success(response.data.response_message);
  
        // Update state and reset fields
        localStorage.setItem("password", newPassword);
        setOldPassword(newPassword);
        setNewPassword("");
        setConfirmPassword("");
        setOldPasswordError("");
        setNewPasswordError("");
        setConfirmPasswordError("");
        setShowNewPasswords(false);
        setButtonText("Update Password");
      } else if (response.data.error === "Incorrect old password") {
        setOldPasswordError("Incorrect old password.");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password", error);
  
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        // Redirect to login if authentication fails
      } else {
        toast.error("An error occurred while updating the password.");
      }
    }
  };
  

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };
  const handleLoginCancelClick1 = () => {
    setShowNewPasswords(false);
  };
  // Image handling and crop logic
  useEffect(() => {
    const savedImage = localStorage.getItem("savedImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  function handleImageClick() {
    if (inputReff.current && typeof inputReff.current.click === "function") {
      inputReff.current.click(); // Open file dialog
    } else {
      console.error("click method is not available on inputReff.current");
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        // localStorage.setItem('savedImage', imageDataUrl);
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };
  function handleReplaceImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    handleImageClick(); // Open file dialog
  }

  function handleDeleteImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    localStorage.removeItem("savedImage"); // Remove from local storage
    setImage(""); // Reset to default image
  }

  function handleViewImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    if (image) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = image;
      link.target = "_blank"; // Open in a new tab
      link.click(); // Simulate click to open the image
    } else {
      console.error("No image available to view");
    }
  }
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      ASPECT_RATIO,
      width,
      height
    );
    setCrop(crop);
  };
  const handleBackToLogin = () => {
    const authToken = localStorage.getItem('authToken') || null;
  
    if (!authToken) {
      console.error('No authToken found in localStorage.');
      return;
    }
  
    fetch('https://dev.quizifai.com:8010/usr_logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Logout response:', data);
        if (data.response === 'success') {
          localStorage.clear();
          logout(); // Clear AuthContext
          console.log('Navigating to login...');
          navigate('/login'); // Navigate to login page
        } else {
          console.error('Logout failed:', data.response_message);
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };
  

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
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`https://dev.quizifai.com:8010/upload-image?user_id=${userId}`, {
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
  
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);
  
  const deleteImage = async () => {
    try {
      const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
            if (!authToken) {
              console.error("No authentication token found. Please log in again.");
              return;
            }
      const response = await fetch(`https://dev.quizifai.com:8010/remove-image?user_id=${userId}`, {
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
  
  return (
    <div className={styles.container}>
      <Navigation />
      <ToastContainer />
      <div
        className={styles.mainContent}
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className={styles.header}>
          {/* Header content */}
          <div className="flex justify-between w-full items-center px-[25px]">
            <div className=" w-full">
              <p className="text-[#002366]">
                Welcome {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </p>
              {/* <div className="bg-[#30CDF040] mr-[40px] mt-[10px] pl-[20px] text-[15px] font-medium text-[#214082] leading-6 py-[10px] rounded-[10px]">
                <p>
                  {weeklyQuizCount > 0 && averageScorePercentage > 0
                    ? `You have successfully completed ${weeklyQuizCount} Quizzes this week, achieving an average score of ${averageScorePercentage}%`
                    : "You have not attended any quizzes yet, Please attempt the quizzes below."}
                </p>
              </div> */}
            </div>
            {/* <div className={styles.headerRight}>
              <div className="text-[#002366]">{getFormattedDate()}</div>
            </div> */}
            <div className="flex flex-col justify-center items-center">
  <img
    src={LogoutIcon}
    onClick={handleBackToLogin}
    alt="Logout Icon"
    className="w-5 h-5 cursor-pointer "
  />
  <p className="text-[#002366] text-[14px]">Logout</p>
</div>

          </div>
        </div>

        {/* Main content  */}
        <div className="relative bg-white flex-col">
          <div className="flex">
            <div className="relative left-[35px]">
              <div className={styles.imgAndTextContainer}>
                <div className={styles.profileimgContainer}>
                  <h1 className=" text-[14px] text-[#EF5130] font-semibold relative top-3 left-2 text-nowrap">
                    Personal Information
                  </h1>
                  <div className="relative mt-4">
                    {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="relative w-[80px] h-[80px]">
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
                    <div className="text-blue-800 font-bold">User ID : <span className="">{userId}</span></div>
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
      {/* <button class="bg-gray-700 px-4 py-2 rounded text-sm text-white hover:bg-gray-600">Add photo</button> */}
      {/* <button class="bg-gray-700 px-4 py-2 rounded text-sm text-white hover:bg-gray-600">Frames</button> */}
      <button class="bg-red-600 px-4 py-2 rounded text-sm text-white hover:bg-red-500" onClick={deleteImage}>Delete</button>
    </div>
  </div>
</div>

        </div>
      )}
                </div>
              </div>
            </div>
            <div className='w-full flex text-[14px]  gap-5 p-5 pt-10'>

      <div className='w-full flex flex-col gap-[10px]'>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">First Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
             
              ></input>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">Middle Name<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                disabled={!isEditing}
             
              ></input>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">Last Name<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
             
              ></input>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">Gender<span className="text-red-500">*</span></label>
        <select
  className={`w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none`}
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  disabled={!isEditing}
>
  <option value="">Select a gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>

      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] "> Date of birth<span className="text-red-500">*</span></label>
        <input
              type="date"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Middle Name"
                value={dob}
                onChange={handleDateChange}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
      


      
      </div>
   

<div className='flex w-full flex-col gap-[10px]'>

<div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">User Address1<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="User Address1"
                value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">User Address2<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="User Address2"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">Occupation<span className="text-red-500">*</span></label>
        <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                  value={occupation}
                  onChange={handleOccupationChange}
                  disabled={!isEditing}
        >
            <option value="">Selet a Occupation</option>
           {occupations.map((occ) => (
                      <option
                        key={occ.occupation_id}
                        value={occ.occupation_name}
                      >
                        {occ.occupation_name}
                      </option>
                    ))}
        </select>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
     

<div className="flex flex-col w-full">
  <div className="w-full flex flex-row items-center">
    <label className="w-[35%] text-blue-800 font-semibold mb-2 mr-[9px]">
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
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] "> District Name<span className="text-red-500"></span></label>
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



<div className='flex w-full flex-col  gap-[10px]'>

      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">City Name<span className="text-red-500"></span></label>
     
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
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">State Name<span className="text-red-500"></span></label>
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
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2">Country Name<span className="text-red-500"></span></label>
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
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2">Mobile Number<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {showOtherInput && (

<div className="flex flex-col w-full">
        <div className="w-full flex flex-row">
        <label className="w-[55%] text-blue-800 font-semibold mb-2 mr-[9px] ">Other Occupation<span className="text-red-500">*</span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Last Name"
                value={otheroccupation}
                disabled={!isEditing}
                onChange={(e) => setOtherccupation(e.target.value)}
              ></input>
  
        </div>
      
        <hr
                    className={`h-[1px] w-full ${
                      isEditing ? "hr-highlight" : "bg-whitet"
                    }`}
                  ></hr>
      </div>
    )}
</div>

   
    </div>
          
          </div>
          <div className="flex justify-end mr-[20px] mb-[20px]">
            {isEditing ? (
              <>
                <button
                  className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] text-white"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] ml-[5%] text-white"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-[#3B61C8] hover:transform hover:scale-110 transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] text-white "
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
            {responseMessage && (
              <p className=" text-green-500 flex ml-[85px] mt-[5px]">
                {responseMessage}
              </p>
            )}
          </div>
        </div>
<div className="flex gap-1 mb-4">
        {/* *************login details ******************************* */}
        <div className="bg-white w-full mt-[1%]">
          <h1 className="ml-[6%] mt-4 text-[14px] text-[#EF5130] font-semibold">
            Login User Details
          </h1>
          <div
            className={styles.inputGroup1}
            style={{
              marginLeft: "150px",
              textWrap: "nowrap",
              marginTop: "5px",
            }}
          >
            <label className="text-blue-800 font-semibold">Login Method</label>
            <button
              className={`border-b-2 w-[77.5px] text-[11px] pl-[10px] ml-[10px] focus:outline-none ${
                loginMethod === "Email"
                  ? "border-blue-200"
                  : "border-transparent"
              } ${!isEditingLogin && "cursor-not-allowed"}`}
              onClick={() => isEditingLogin && handleLoginMethodChange("Email")}
              disabled={!isEditingLogin}
            >
              Email
            </button>
            <button
              className={`border-b-2 w-[77.5px] text-[11px] pl-[10px] focus:outline-none ${
                loginMethod === "Mobile"
                  ? "border-blue-200"
                  : "border-transparent"
              } ${!isEditingLogin && "cursor-not-allowed"}`}
              onClick={() =>
                isEditingLogin && handleLoginMethodChange("Mobile")
              }
              disabled={!isEditingLogin}
            >
              Mobile
            </button>
            <hr className="h-[1px] w-[90px] bg-gray-200"></hr>
          </div>
          <div className="flex ml-[34%] mt-[20px]">
            {loginMethod === "Email" && (
              <div
                className={styles.inputGroup1}
                style={{ marginLeft: "-60px" }}
              >
                <label className="text-blue-800 font-semibold">Email</label>
                <input
                  className={`border-transparent border-b-2 hover:border-blue-200 mr-[40px] ml-[10px] h-[30px] w-[200px] text-[11px] focus:outline-gray-300 ${
                    isEditingLogin ? "highlight" : ""
                  }`}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditingLogin}
                />
              </div>
            )}
            {loginMethod === "Mobile" && (
              <div
                className={styles.inputGroup1}
                style={{ marginLeft: "-60px" }}
              >
                <label className="text-blue-800 font-semibold ">Mobile</label>
                <input
                  className={`border-transparent border-b-2 hover:border-blue-200 ml-[10px] h-[30px] w-[213px] text-[11px] focus:outline-gray-300 ${
                    isEditingLogin ? "highlight" : ""
                  }`}
                  type="number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  disabled={!isEditingLogin}
                />
              </div>
            )}
            {isEmailOtpSent && (
              <div className="flex items-center  relative ">
                <input
                  className="border-transparent border-b-2 hover:border-blue-200 h-[30px] w-[200px] text-[11px] focus:outline-gray-300"
                  placeholder="Enter OTP"
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
                <button
                  className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[90px] text-[13px] font-semibold rounded-[20px] ml-[10px] text-white"
                  onClick={updatePreferredLoginMethod}
                >
                  Verify OTP
                </button>
              </div>
            )}
            {isMobileOtpSent && (
              <div className="flex items-center  relative ">
                <input
                  className="border-transparent border-b-2 hover:border-blue-200 h-[30px] w-[200px] text-[11px] focus:outline-gray-300"
                  placeholder="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[90px] text-[13px] font-semibold rounded-[20px] ml-[10px] text-white"
                  onClick={updatePreferredLoginMethod1}
                >
                  Verify OTP
                </button>
              </div>
            )}
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
          {isSendOtpSent && (
            <button
              className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] ml-[4%] text-white"
              onClick={handleLoginCancelClick}
            >
              Cancel
            </button>
          )}

          {message && (
            <div className="mt-[20px] text-green-500 font-semibold">
              {message}
            </div>
          )}
        </div>

        {/* *************password details ******************************* */}
        <div className="bg-white w-full mt-[1%]">
          <h1 className="ml-[6%] mt-4 text-[14px] text-[#EF5130] font-semibold colour red">
            Update Password
          </h1>
          <div className="flex pl-[145px] mt-[20px]">
            <div className="inputGroup1" style={{ marginLeft: "-50px" }}>
              <label className="text-blue-800 text-[13px] font-semibold">
                Password
              </label>
              <input
                className="border-transparent border-b-2 hover:border-blue-200 mr-[40px] ml-[px] h-[30px] w-[173px] text-[11px] focus:outline-gray-300 pl-[5px] cursor-not-allowed"
                type={oldPasswordVisible ? "text" : "password"}
                placeholder="password"
                value={oldPassword}
                disabled
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                onClick={() => togglePasswordVisibility("old")}
                className="cursor-pointer"
              >
                {oldPasswordVisible ? (
                  <img
                    className="h-[17px] w-[17px] ml-[66%] relative -top-[25px]"
                    src={visible}
                    title="hide"
                    alt="Hide Password"
                  />
                ) : (
                  <img
                    className="h-[17px] w-[17px] ml-[66%] relative -top-[25px]"
                    src={hide}
                    title="show"
                    alt="Show Password"
                  />
                )}
              </span>
              {oldPasswordError && (
                <div className="text-red-500 text-xs mt-1">
                  {oldPasswordError}
                </div>
              )}
            </div>

            {showNewPasswords && (
              <>
                <div className="inputGroup1">
                  <label className="text-blue-800 font-semibold ml-[15px] text-[13px]">
                    New Password
                  </label>
                  <input
                    className="border-transparent border-b-2 hover:border-blue-200 ml-[15px] h-[30px] w-[163px] text-[11px] focus:outline-gray-300"
                    type={newPasswordVisible ? "text" : "password"}
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    onClick={() => togglePasswordVisibility("new")}
                    className="cursor-pointer"
                  >
                    {newPasswordVisible ? (
                      <img
                        className="h-[17px] w-[17px] ml-[72%] relative -top-[25px]"
                        src={visible}
                        title="hide"
                        alt="Hide Password"
                      />
                    ) : (
                      <img
                        className="h-[17px] w-[17px] ml-[72%] relative -top-[25px]"
                        src={hide}
                        title="show"
                        alt="Show Password"
                      />
                    )}
                  </span>
                  {newPasswordError && (
                    <div className="text-red-500 text-xs mt-1 w-[190px] mx-[10px]">
                      {newPasswordError}
                    </div>
                  )}
                </div>

                <div className="inputGroup1">
                  <label className="text-blue-800 font-semibold ml-[20px] text-[13px]">
                    Confirm Password
                  </label>
                  <input
                    className="border-transparent border-b-2 hover:border-blue-200 ml-[20px] h-[30px] w-[178px] text-[11px] focus:outline-gray-300"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="cursor-pointer"
                  >
                    {confirmPasswordVisible ? (
                      <img
                        className="h-[17px] w-[17px] ml-[67%] relative -top-[25px]"
                        src={visible}
                        title="hide"
                        alt="Hide Password"
                      />
                    ) : (
                      <img
                        className="h-[17px] w-[17px] ml-[67%] relative -top-[25px]"
                        src={hide}
                        title="show"
                        alt="Show Password"
                      />
                    )}
                  </span>
                  {confirmPasswordError && (
                    <div className="text-red-500 text-xs mt-1 w-[200px]">
                      {confirmPasswordError}
                    </div>
                  )}
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
          {showNewPasswords && (
            <button
              className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] ml-[4%] text-white"
              onClick={handleLoginCancelClick1}
            >
              Cancel
            </button>
          )}
        </div>

        </div>
      
      </div>
      {/* <LogoutBar /> */}
    </div>
  );
};

export default FreeProfile;
