"use client";
import React, { useState, useEffect, useContext} from "react";
// import Image from "next/image";

// Main-Section-icons
import Cancel from "../../src/assets/Images/Subscription/Cancel.png";
import Dropdown from "../../src/assets/Images/Subscription/Dropdown.png";
import QuizifAiLogo from "../../src/assets/Images/Subscription/Quizifai-Logo.png";
import Tick from "../../src/assets/Images/Subscription/Tick.png";
import Cross from "../../src/assets/Images/Subscription/Cross.png";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import Navigation from "../navbar/navbar";
import Public from "../../src/assets/Images/dashboard/public1.jpg";
import premiumlite from "../../src/assets/Images/dashboard/pemium lite.avif";
import premium from "../../src/assets/Images/dashboard/Premium.jpg";
import Orginazation from "../../src/assets/Images/dashboard/orginazations1.jpg";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../Authcontext/AuthContext";
import tixkmark from "../../src/assets/Images/dashboard/verify.png"
const subscription = ()=> {
 
  const navigate = useNavigate();
  const { isAuthenticated, authToken,logout } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [roleName, setRoleName] = useState('');
  const [userType, setUserType] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [occupationName, setOccupationName] = useState('');
  const [orgName, setOrgName] = useState('');
  // const [planType, setPlanType] = useState('Monthly'); // Example default value
  const [subscriptionPlanId, setSubscriptionPlanId] = useState(3);
  const [quizPackageId, setQuizPackageId] = useState(0);

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userName, setUserName] = useState("chandu");

  const [amount, setAmount] = useState(900); // in rupees
  const [currency, setCurrency] = useState("INR");
  const [receipt, setReceipt] = useState("string");
  const [responseMessage, setResponseMessage] = React.useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      } 
      const response = await fetch('https://dev.quizifai.com:8010/get_prfl_dtls', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          Authorization: `Bearer ${authToken}`, // Use dynamically retrieved token
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      const data = await response.json();
      if (data.response === 'success') {
        const profile = data.data;

        // Setting all the state variables with the API response data
        setFirstName(profile.first_name);
        setMiddleName(profile.middle_name || '');
        setLastName(profile.last_name);
        setFullName(profile.full_name);
        setEmailId(profile.user_email);
        setMobileNumber(profile.user_phone_number || '');
        setRoleName(profile.role_name);
        setUserType(profile.user_type);
        setGender(profile.gender);
        setDateOfBirth(profile.date_of_birth);
        setOccupationName(profile.occupation_name);
        setOrgName(profile.org_name);
        // You can map additional properties as required, for example:
        // setSubscriptionPlanId(profile.some_subscription_plan_id);
        // setQuizPackageId(profile.some_quiz_package_id);
      } else {
        console.error('Error fetching user profile:', data);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handlePayNow = () => {
    const subscriptionDetails = {
      Subscription_plan: "Yearly", // This should be your actual plan name
      Pricing: {
        "Yearly Price": 3650, // Example pricing, replace with actual data
      },
      Subscription_plan_id: 3, 
      PlanType: "Yearly"// Example plan ID, replace with actual ID
    };
  
    createOrderAndPay(subscriptionDetails.Subscription_plan_id, subscriptionDetails.Pricing["Yearly Price"],subscriptionDetails.PlanType);
  };
  const handleMonthly = () => {
    const subscriptionDetails = {
      Subscription_plan: "Monthly", // This should be your actual plan name
      Pricing: {
        "Monthly Price": 900, // Example pricing, replace with actual data
      },
      Subscription_plan_id: 3, 
      PlanType: "Monthly"// Example plan ID, replace with actual ID
    };
  
    createOrderAndPay(subscriptionDetails.Subscription_plan_id, subscriptionDetails.Pricing["Monthly Price"],subscriptionDetails.PlanType);
  };
  const createOrderAndPay = async (subscriptionPlanId, amount, PlanType) => {
    setLoading(true);
    setError("");
  
    try {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      } 
      // Step 1: Create Order
      const response = await fetch("https://dev.quizifai.com:8010/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`, // Use dynamically retrieved token
          },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          email_id: emailId,
          mobile_number: mobileNumber,
          subscription_plan_id: subscriptionPlanId,
          quiz_package_id: quizPackageId,
          plan_type: PlanType,
          amount: amount,
          currency: currency,
          receipt: receipt,
          notes: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        }),
      });
  
      const data = await response.json();
  
      // Step 2: Check if order creation is successful
      if (data.response === "success") {
        const order = data.response_message; // Extract the order object from response
  
        // Validate if the order contains the necessary properties
        if (!order || !order.amount || !order.currency || !order.id) {
          throw new Error("Invalid order details.");
        }
  
        // Step 3: Initiate Razorpay Payment with the order details
        handlePayment(order);
      } else {
        throw new Error("Failed to create order.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the order.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow1 = (pkg) => {
    createOrderAndPay1(pkg.subscription_plan_id, pkg.amount, pkg.plan_type, pkg.quiz_package_id);
  }
  const [showPopup, setShowPopup] = useState(false);

  const createOrderAndPay1 = async (subscriptionPlanId, amount, planType, quizPackageId) => {
    setLoading(true);
    setError("");
  
    try {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      }  
      // Step 1: Create Order
      const response = await fetch("https://dev.quizifai.com:8010/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`, // Use dynamically retrieved token
          },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          email_id: emailId,
          mobile_number: mobileNumber,
          subscription_plan_id: 2,
          quiz_package_id: quizPackageId,
          plan_type: planType,
          amount: amount,
          currency: currency,
          receipt: receipt,
          notes: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        }),
      });
  
      const data = await response.json();
  
      // Step 2: Check if order creation is successful
      if (data.response === "success") {
        const order = data.response_message; // Extract the order object from response
  
        // Validate if the order contains the necessary properties
        if (!order || !order.amount || !order.currency || !order.id) {
          throw new Error("Invalid order details.");
        }
  
        // Step 3: Initiate Razorpay Payment with the order details
        handlePayment(order);
      } else {
        throw new Error("Failed to create order.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the order.");
    } finally {
      setLoading(false);
    }
  };
  
  
  // Razorpay payment handler
  const handlePayment = async (order) => {
    if (!order || !order.amount || !order.currency || !order.id) {
      alert("Invalid order details.");
      return; // Exit if order details are incomplete
    }
  
    const isScriptLoaded = await loadRazorpayScript();
  
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }
  
    const options = {
      key: "rzp_test_YP62GL4fHAfeVI", // Replace with your actual key
      amount: order.amount, // Amount in subunits (paise)
      currency: order.currency,
      name: "QuizifAI",
      description: "Test Transaction",
      image: "https://example.com/your_logo", // Replace with your logo URL
      order_id: order.id, // Razorpay order ID from API
      handler: async function (response) {
        // Successful payment response
        // alert(`Payment ID: ${response.razorpay_payment_id}`);
        // alert(`Order ID: ${response.razorpay_order_id}`);
        // alert(`Signature: ${response.razorpay_signature}`);
        // console.log(`Signature: ${response.razorpay_signature}`)
        // console.log(`Signature: ${response.razorpay_order_id}`)
        // console.log(`Signature: ${response.razorpay_payment_id}`)
        // Prepare data for the verification API
        const paymentDetails = {
          user_name: userName, // Replace with actual user name
          email_id: emailId,   // Replace with actual email
          plan_type: "",  // Replace with actual plan type
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
  
        try {
          const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

          if (!authToken) {
            throw new Error("No authentication token found");
          } 
          const verifyPaymentResponse = await fetch('https://dev.quizifai.com:8010/verify_payment_signature/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentDetails),
          });
  
          const responseData = await verifyPaymentResponse.json();
  
          if (verifyPaymentResponse.ok) {
            setResponseMessage("Payment verified successfully!");
            // Handle the success response (e.g., redirect, show message)
          } else {
            setResponseMessage(`Payment verification failed: ${responseData.message}`);
            // Handle the failure response (e.g., show error message)
          }
        } catch (error) {
          setResponseMessage("Error verifying payment: " + error.message);
        }
      },
      prefill: {
        name: userName,
        email: emailId,
        contact: mobileNumber,
      },
      notes: order.notes, // Pass the order notes
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new window.Razorpay(options); // Create Razorpay instance
    rzp1.on("payment.failed", function (response) {
      setResponseMessage(`Payment failed: ${response.error.description}`);
    });
  
    rzp1.open(); // Open the Razorpay payment modal
  };
  
 
  const [currentPage, setCurrentPage] = useState("plans"); // To track the current step
  const [selectedPlan, setSelectedPlan] = useState(null); // To store the selected plan
  const [showAdditionalCards, setShowAdditionalCards] = useState(false);

  

  // Navigate to payment page
  const handleGetOrganizationAccess = () => {
    setSelectedPlan("Organization Access");
    setCurrentPage("payment");
  };
  const handleGetPremiumLite = () => {
    setSelectedPlan("Premium Lite");
    setCurrentPage("payment");

  };
 
  const Back = () => {
    navigate("/dashboard");

  };
  const HandleOrganizationcontactus = () => {
    navigate("/Organizationcontactus");

  };
  
  const handleConfirmPayment = (packageName) => {
    alert(`You selected the ${packageName} package for payment.`);
    // Add payment handling logic here
  };

  const handleGoBack = () => {
    setShowAdditionalCards(false);
    setCurrentPage("plans");
  };

    //-------------------**Premium**--------------------//

  const handleGetPremium = () => {
    setSelectedPlan("Premium");
    setCurrentPage("paymentpremium");

  };

  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSubscriptionDetails = async (planId) => {
    setError(""); // Clear previous errors
    setLoading(true); // Show loading state
    setSelectedPlan("Premium");
    setCurrentPage("paymentpremium");
  
    try {
      const response = await fetch(
        `https://dev.quizifai.com:8010/get_subscription_plan_details?plan_id=${planId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({}), // Empty payload
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        if (data.response === "success") {
          setSubscriptionDetails(data.message);
        } else {
          setError("Failed to fetch subscription details.");
        }
      } else {
        setError("Failed to fetch subscription details.");
      }
    } catch (err) {
      setError("An error occurred while fetching subscription details.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  


    //-------------------**Premium END**--------------------//

    //-------------------**quizPackages**--------------------//

  const [quizPackages, setQuizPackages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch quiz package data from the API
    const fetchQuizPackages = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

        if (!authToken) {
          throw new Error("No authentication token found");
        } 
        const response = await fetch("https://dev.quizifai.com:8010/quiz_packages/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`, // Use dynamically retrieved token

          },
        });
  
        // Parse the JSON response
        const data = await response.json();
  
        // Check if the response is successful
        if (data && data.response === "success") {
          setQuizPackages(data.data); // Set the packages data
        } else {
          setError(data.response_message || "Failed to fetch quiz packages.");
        }
      } catch (err) {
        console.error("Error fetching quiz packages:", err);
        setError("An error occurred while fetching quiz packages.");
      }
    };
  
    fetchQuizPackages();
  }, []);
  
    //-------------------**quizPackages END**--------------------//

        //-------------------**Conctactus **--------------------//

    const [showForm, setShowForm] = useState(false);



    const handleContactClick = () => {
      setShowForm(!showForm);
    };
     const [organizationName1, setOrganizationName1] = useState("");
  const [organizationType1, setOrganizationType1] = useState("");
  const [numberOfUsers1, setNumberOfUsers1] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [emailAddress1, setEmailAddress1] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [purposeOfUse1, setPurposeOfUse1] = useState("");
  const [responseMessage1, setResponseMessage1] = useState("");
  const [showPopup1, setShowPopup1] = useState(false);
const [Designation, setDesignation] =useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate inputs
  if (!organizationName1) {
    setResponseMessage1("Organization name is required.");
    setShowPopup1(true);
    return;
  }

  if (!organizationType1) {
    setResponseMessage1("Organization type is required.");
    setShowPopup1(true);
    return;
  }

  if (!numberOfUsers1) {
    setResponseMessage1("Please enter a valid number of users.");
    setShowPopup1(true);
    return;
  }

  if (!fullName1) {
    setResponseMessage1("Full name is required.");
    setShowPopup1(true);
    return;
  }

  if (!Designation) {
    setResponseMessage1("Designation is required.");
    setShowPopup1(true);
    return;
  }

  if (!emailAddress1 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress1)) {
    setResponseMessage1("Please enter a valid email address.");
    setShowPopup1(true);
    return;
  }

  if (!phoneNumber1 || !/^\d{10}$/.test(phoneNumber1)) {
    setResponseMessage1("Please enter a valid 10-digit phone number.");
    setShowPopup1(true);
    return;
  }

  if (!purposeOfUse1) {
    setResponseMessage1("Purpose of use is required.");
    setShowPopup1(true);
    return;
  }

  const data = {
    organization_name: organizationName1,
    organization_type: organizationType1,
    number_of_users: numberOfUsers1,
    full_name: fullName1,
    designation: Designation,
    email_address: emailAddress1,
    phone_number: phoneNumber1,
    purpose_of_use: purposeOfUse1,
  };

  try {
    const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      "https://dev.quizifai.com:8010/organization_contact_us_email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (result.response === "success") {
      setResponseMessage1(result.message[0]); // Use the message from the API response
      setShowPopup1(true); // Ensure the popup is shown
      setShowForm(false); // Hide the form
      reset(); // Reset form fields
      return;
    } else if (result.response === "fail") {
      setResponseMessage1("Something went wrong. Please try again.");
    }
  } catch (error) {
    setResponseMessage1("Failed to submit. Please check your connection.");
  }

  setShowPopup1(true); // Ensure the popup is shown even on error
};


  const handleClose1 = () => {
    setShowPopup1(false);

  };


  const reset = () => {
    setDesignation("");
    setPurposeOfUse1("");
    setPhoneNumber1("");
    setEmailAddress1("");
    setFullName1("");
    setNumberOfUsers1("");
    setOrganizationType1("");
    setOrganizationName1("");
  };
        //-------------------**Conctactus END**--------------------//


        const handleclose = () => {
          setResponseMessage(null);
          handleBackToLogin();
           // Close the modal
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
              if (data.response === 'success') {
                localStorage.clear();
                logout(); // Clear AuthContext
                console.log('Navigating to login...');
                navigate('/login'); 
                navigate(0)// Navigate to login page
              } else {
                console.error('Logout failed:', data.response_message);
              }
            })
            .catch((error) => {
              console.error('Error logging out:', error);
            });
        };
        const currentSubscriptionType = localStorage.getItem("subscription_type"); // Get stored subscription type

  return (
    <div className="flex w-full">
      <Navigation/>
      <div className="w-full bg-[#f5f5f5]">
      {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} color="primary" />
  </div>
)}
    <div className=" absolute right-2 top-2">
            <img
              src={LogoutIcon}
              onClick={handleBackToLogin}
              alt="Logout Icon"
              className="w-5 h-5 cursor-pointer "
            />
            {/* <p className="text-[#002366] text-[14px]">Logout</p> */}
            </div>
      
{/* <div className="flex px-4">
    <img
          src={quizifailogo}
          alt="Logo"
          width={180}
          height={160}
        />
</div> */}
<div className="flex px-4 pb-6 pt-1 justify-center">

   <h1 className=" text-[24px] text-[#00024b] font-extrabold">Subscription Plans</h1>
</div>
{currentPage === "plans" && (
<>
{/* <div className="flex flex-wrap justify-center gap-6 px-4 mb-1">

{currentSubscriptionType === "Free" && (
  <div
    className={`bg-white text-black rounded-lg shadow-lg p-2 w-full md:w-[22%] flex flex-col justify-between 
     `}
  >
      <div className="flex flex-col gap-[2px] justify-center">

<h2 className="text-[18px] font-bold text-center text-[#00024b]">Your Current Plan Public</h2>
        
      </div>
   
     
    </div>
)}
    
  
 {currentSubscriptionType === "Premium Lite" && (
    <div
    className={`bg-white text-black rounded-lg shadow-lg p-2 w-full md:w-[22%] flex flex-col justify-between 
      ${currentSubscriptionType === "Premium Lite" ? "border-4 border-blue-500 shadow-2xl" : ""}`}
  >
    <div className="flex flex-col gap-[2px] justify-center">

<h2 className="text-[18px] font-bold text-center text-[#00024b]">Premium Lite</h2>
        
      </div>
    
   

    </div>
 )}

    {currentSubscriptionType === "Premium" &&(


    <div
    className={`bg-white text-black rounded-lg shadow-lg p-2 w-full md:w-[22%] flex flex-col justify-between 
      ${currentSubscriptionType === "Premium" ? "border-4 border-blue-500 shadow-2xl" : ""}`}
  >
    <div className="flex flex-col gap-[2px] justify-center">

<h2 className="text-[18px] font-bold text-center text-[#00024b]">Premium</h2>
        
      </div>
  
    
    </div>
     )}
    <div className="bg-white text-black rounded-lg shadow-lg p-2 w-full md:w-[22%]   flex flex-col justify-between">
    
    <div className="flex flex-col gap-[2px] justify-center">

<h2 className="text-[18px] font-bold text-center text-[#00024b]">Organization</h2>
        
      </div>
 
    
    </div>
  </div> */}
    <div className="flex flex-wrap justify-center gap-6 px-4">
     {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} color="primary" />
  </div>
)}
    {/* Public Plan */}

    {/* <div className="bg-white text-black rounded-lg shadow-2xl p-6 w-full md:w-[22%]  flex flex-col justify-between"> */}

      <div
    className={`relative rounded-lg shadow-lg p-6 w-full md:w-[22%] flex flex-col justify-between 
      ${currentSubscriptionType === "Free" ? "border-2 border-blue-500 bg-[#567ed6] shadow-2xl text-white" : "bg-white text-black "}`}
  >
     {/* {currentSubscriptionType === "Free" && (
    <img 
      src={tixkmark} 
      alt="Tick Mark" 
      className="absolute top-[-12px] right-[-12px] w-6 h-6"
    />
  )} */}
      <div className="flex flex-col gap-[2px] justify-center">
      {/* <div className="bg-[#9fcbf0] rounded-r-full flex items-center justify-center"> */}

<h2 className={`text-[18px] font-bold text-center ${currentSubscriptionType === "Free" ? "text-white" : "  text-[#00024b]"} `}>Public</h2>
{/* </div> */}
        <img src={Public} alt="" className="h-[100px]" />
        
      </div>
    
      <p className="text-[16px] font-semibold text-center">Free</p>
      <ul className=" mt-6 space-y-3 text-sm">
          <li>✔ Access to Public Quizzes</li>
          <li>✔ Limited to Two Quizzes Daily</li>
        </ul>
      {/* <p className="text-gray-600 mt-4 text-center">
        Access to Public Quizzes
      </p>
      */}
      <p className="mt-6 text-center font-medium">
        Pricing: Rs 0 per day
      </p>
   
      <button onClick={Back} className={`mt-2 py-2 px-4 rounded-sm ${currentSubscriptionType === "Free" ? "bg-[#ffffff] text-[#567ed6] font-medium" : " bg-[#567ed6] text-white font-medium"} `}>
      Get Started for Free
      </button>
      {/* <div className="flex justify-center">
      <button className="mt-6  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
        Get Started for Free
      </button>
      </div> */}
     
    </div>
  
    {/* Premium Lite Plan */}
    {/* <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full md:w-[22%] flex flex-col justify-between">
    */}
  
       <div
    className={`relative rounded-lg shadow-lg p-6 w-full md:w-[22%] flex flex-col justify-between 
      ${currentSubscriptionType === "Premium Lite" ? "border-2 border-blue-500 bg-[#567ed6] shadow-2xl text-white" : "bg-white text-black "}`}
  >
 
      {/* {currentSubscriptionType === "Premium Lite" && (
    <img 
      src={tixkmark} 
      alt="Tick Mark" 
      className="absolute top-[-12px] right-[-12px] w-6 h-6"
    />
  )} */}
    <div className="flex flex-col gap-[2px] justify-center">
      {/* <div className="bg-[#9fcbf0] rounded-r-full flex items-center justify-center"> */}

<h2 className={`text-[18px] font-bold text-center ${currentSubscriptionType === "Premium Lite" ? "text-white" : "  text-[#00024b]"} `}>Premium Lite</h2>
{/* </div> */}
        <img src={premiumlite} alt="" className="h-[100px]" />
        
      </div>
    
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Premium Lite</h2> */}
      <ul className="mt-6 space-y-3 text-sm">
          <li>✔ Access to Purchased Quizzes (EX:NEET, JEE, EventCounts.)</li>
          <li>✔ Access to Public Quizzes for the duration of the Premium Quiz</li>
        </ul>
      {/* <p className="text-gray-300 mt-4 text-center">
        Access to Purchased Quizzes and Public Quizzes for the duration of the Premium Quiz.
      </p> */}
      <p className="mt-6 text-center font-medium">
        Pricing: As per price defined for Premium Quiz Package
      </p>
      <button onClick={handleGetPremiumLite} className={`mt-2 py-2 px-4 rounded-sm ${currentSubscriptionType === "Premium Lite" ? "bg-[#ffffff] text-[#567ed6] font-medium" : " bg-[#567ed6] text-white font-medium"} `}>
      Subscribe
      </button>
      {/* <div className="flex justify-center">
      <button className="mt-6  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
       Subscribe
      </button>
      </div> */}
    </div>
  
    {/* Premium Plan */}
    {/* <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full md:w-[22%]  flex flex-col justify-between"> */}
    <div
    className={`relative rounded-lg shadow-lg p-6 w-full md:w-[22%] flex flex-col justify-between 
      ${currentSubscriptionType === "Premium" ? "border-2 border-blue-500 bg-[#567ed6] shadow-2xl text-white" : "bg-white text-black "}`}
  >
 
     {/* {currentSubscriptionType === "Premium" && (
    <img 
      src={tixkmark} 
      alt="Tick Mark" 
      className="absolute top-[-12px] right-[-12px] w-6 h-6"
    />
  )} */}
    <div className="flex flex-col gap-[2px] justify-center">
      {/* <div className="bg-[#9fcbf0] rounded-r-full flex items-center justify-center"> */}

<h2 className={`text-[18px] font-bold text-center ${currentSubscriptionType === "Premium" ? "text-white" : "  text-[#00024b]"} `}>Premium</h2>
{/* </div> */}
        <img src={premium} alt="" className="h-[100px]" />
        
      </div>
  
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Premium</h2> */}
      <ul className="mt-2 space-y-2 text-sm">
          <li>✔ Access to all Premium Quizzes</li>
          <li>✔ Quiz Master Access</li>
          <li>✔ Ability to Create and Sell Premium Quizzes on QuizifAI</li>
          <li>✔ Can Create one AI Quiz daily and up to 5 Manual Quizzes</li>
        </ul>
      {/* <p className="text-gray-600 mt-4 text-center">
         . Create daily one AI Quiz and up to 5 manual quizzes. Sell on QuizifAI platform.
      </p> */}
      <p className="mt-2 text-center font-medium">
        Pricing: Rs 10 per day with one-year subscription<br />
        Rs 30 per day with one-month access
      </p>
      <button  onClick={() => {
    console.log("Button clicked!"); // Debug to verify the button is working
    fetchSubscriptionDetails(3);
  }} className={`mt-2 py-2 px-4 rounded-sm ${currentSubscriptionType === "Premium" ? "bg-[#ffffff] text-[#567ed6] font-medium" : " bg-[#567ed6] text-white font-medium"} `}>
      Subscribe
      </button>
      {/* <div className="flex justify-center">
      <button className="mt-6  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
      Subscribe
      </button>
      </div> */}
    </div>
  
    {/* Organization Access Plan */}
    <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full md:w-[22%]   flex flex-col justify-between">
    
    <div className="flex flex-col gap-[2px] justify-center">
      {/* <div className="bg-[#9fcbf0] rounded-r-full flex items-center justify-center"> */}

<h2 className="text-[18px] font-bold text-center text-[#00024b]">Organization</h2>
{/* </div> */}
        <img src={Orginazation} alt="" className="h-[100px]" />
        
      </div>
 
      {!showForm ? (
        <>
         {/* <h2 className="text-2xl font-bold mb-4 text-center">Organization Access</h2> */}
      <ul className="mt-2 space-y-2 text-sm">
          <li>✔ Premium Access</li>
          <li>✔ Access to Reports</li>
          <li>✔ Organization Management</li>
          <li>✔ Ability to Create and Sell Premium Quizzes on QuizifAI</li>
        </ul>
      {/* <p className="text-gray-300 mt-4 text-center">
        Premium Access + Reports + Organization Management. Create Premium Quizzes and sell on QuizifAI platform.
      </p> */}
      <p className="mt-2 text-center font-medium">
        Pricing: Rs 1 per day per user with one-year subscription<br />
        Rs 5 per day per user with one-month access
      </p>
      <button onClick={handleContactClick} className="mt-2  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
      Contact US
      </button>
      {/* <div className="flex justify-center">
      <button className="mt-6  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
      Contact US
      </button>
      </div> */}
              </>

       ) : (

        <div className="space-y-2">
          <h2 className="text-[18px] font-bold text-center text-[#00024b]">Contact Us</h2>
          
          <div>
          <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Organization Name"
                required
                value={organizationName1}
                onChange={(e) => setOrganizationName1(e.target.value)}
              ></input>
          </div>
          <div>
            <select  value={organizationType1}
            onChange={(e) => setOrganizationType1(e.target.value)}  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `} required>
              <option value="">Organization Type </option>
              <option value="Education">Education (School, College, University)</option>
              <option value="Corporate">Corporate (Employee Training, Team Engagement)</option>
              <option value="Non-Profit">Non-Profit / NGO</option>
              <option value="Government">Government Institution</option>
              <option value="Coaching">Coaching/Training Institute</option>
              <option value="Other">Other (Specify)</option>
            </select>
          </div>

          <div>
            <select value={numberOfUsers1}
            onChange={(e) => setNumberOfUsers1(e.target.value)} className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `} required>
              <option value="">Number of Users</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-100">51-100</option>
              <option value="101-500">101-500</option>
              <option value="500+">500+</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              value={fullName1}
              onChange={(e) => setFullName1(e.target.value)}
              placeholder="Full Name"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={Designation}
              onChange={(e) => setDesignation(e.target.value)}
               placeholder="Designation"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
              required
            />
          </div>

          <div>
            <input
              type="email"
              value={emailAddress1}
            onChange={(e) => setEmailAddress1(e.target.value)}
              placeholder="Email Address"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
              required
            />
          </div>

          <div>
            <input
              type="tel"
              value={phoneNumber1}
              onChange={(e) => setPhoneNumber1(e.target.value)}
              placeholder="Phone Number"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
              required
              pattern="\d{10,15}"
            />
          </div>

          <div>
            <select  value={purposeOfUse1}
            onChange={(e) => setPurposeOfUse1(e.target.value)} className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `} required>
              <option value="">Purpose of Use</option>
              <option value="Employee Training">Employee Training</option>
              <option value="Student Learning">Student Learning & Assessments</option>
              <option value="Exam Preparation">Competitive Exam Preparation</option>
              <option value="Fun Activities">Fun/Engagement Activities</option>
              <option value="Certification">Certification & Compliance Testing</option>
              <option value="Customer Training">Customer/Client Training</option>
              <option value="Other">Other (Specify)</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button onClick={handleContactClick} className="mt-2  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
            Back
      </button>
      <button onClick={handleSubmit} className="mt-2  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
      Submit
      </button>
           
          </div>
        </div>
      )}
      {showPopup1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
              responseMessage1.includes("success")
                ? "border-green-500"
                : "border-red-500"
            } border-t-4`}
          >
            <h2
              className={`text-xl font-semibold ${
                responseMessage1.includes("success")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {responseMessage1.includes("success") ? "Success" : "Error"}
            </h2>
            <p className="mt-2 text-gray-700">{responseMessage1}</p>
            <button
              onClick={handleClose1}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  
  </>
)}
  {/* Payment Methods Page */}
  {currentPage === "payment" && (
        <div className="w-full flex flex-col justify-center bg-[#141652] rounded-lg shadow-md p-6">
          {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} color="primary" />
  </div>
)}
          <h2 className="text-2xl text-white font-bold mb-6 text-center">
            Payment Methods
          </h2>
          <p className="text-white text-center mb-4">
            You selected: <strong>{selectedPlan}</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-6 px-4">
          {/* {quizPackages.map((pkg) => (

          <div  key={pkg.quiz_package_id} className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-72 flex flex-col items-center">
        <h3 className="text-lg text-[#00024b] font-semibold mt-6">{pkg.quiz_package_name}</h3>
        <h1 className="text-3xl font-bold  mt-2 text-[#00024b]">₹ {pkg.quiz_package_price}</h1>
        <p className="text-sm text-center mt-4">
        {pkg.quiz_package_description}
        </p>

        <button
         onClick={() => setShowPopup(true)}
         className="mt-2  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
            Pay Now
        </button>
        {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center  border-t-4`}
            >
              <h2
                className={`text-xl font-semibold `}
              >
                This feature is not implemented yet!
              </h2>
              <button
                onClick={() => setShowPopup(false)} // Close the popup
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
       
      
      )}
      </div>
           ))} */}
      </div>

          {/* <div className="flex flex-wrap justify-center gap-6 px-4">
          {quizPackages.map((pkg) => (
            <div
              key={pkg.quiz_package_id}
              className="bg-white text-black rounded-lg shadow-lg p-6 w-full md:w-[22%] flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-center">
                {pkg.quiz_package_name}
              </h2>
              <p className="text-gray-600 text-center my-4">
                {pkg.quiz_package_description}
              </p>
              <p className="text-center text-gray-800 font-medium">
                Pricing: Rs {pkg.quiz_package_price}
              </p>
              <button
                onClick={() => handleConfirmPayment(pkg.quiz_package_name)}
                className="mt-2 bg-indigo-600 text-white font-medium py-2 px-4 rounded-sm"
              >
                Pay Now
              </button>
            </div>
          ))}
          <button
            className="mt-6 w-full bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300"
            onClick={handleGoBack}
          >
            Back to Plans
          </button>
        </div> */}
          {/* Payment Options */}
          {/* <div className="flex flex-col gap-4">
            <button
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700"
              onClick={handleConfirmPayment}
            >
              Pay with Credit/Debit Card
            </button>
            <button
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700"
              onClick={handleConfirmPayment}
            >
              Pay with UPI
            </button>
            <button
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700"
              onClick={handleConfirmPayment}
            >
              Pay with Net Banking
            </button>
          </div> */}

          {/* Go Back */}
          <div>

        
<button
  className="mt-6  bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300"
  onClick={handleGoBack}
>
  Back to Plans
</button>
</div>
        </div>
      )}

{currentPage === "paymentpremium" && (
        <div className="w-full flex flex-col justify-center  bg-[#141652] rounded-lg shadow-md p-6">
     {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} color="primary" />
  </div>
)}
          <h2 className="text-2xl text-white font-bold mb-6 text-center">
            Payment Methods
          </h2>
          <p className="text-white text-center mb-4">
            You selected: <strong>{selectedPlan}</strong>
          </p>
          {subscriptionDetails && (
          <div className="flex flex-wrap justify-center gap-6 px-4">

          <div  className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-72 flex flex-col items-center">
        <h3 className="text-lg font-semibold mt-6 text-[#00024b]">Monthly Plan</h3>
        <p className="text-gray-500 mt-2 text-center">{subscriptionDetails.Subscription_plan}</p>
        <h1 className="text-3xl font-bold text-[#00024b] mt-2">₹  {subscriptionDetails.Pricing["Monthly Price"]} <span className="text-sm text-gray-500">/month</span>
        </h1>
        {/* <p className="text-sm text-center mt-4">
        {pkg.quiz_package_description}
        </p> */}
        <button onClick={handleMonthly} className="mt-2  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
            Pay Now
        </button>
      </div>
         
      <div   className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-72 flex flex-col items-center">
        <h3 className="text-lg text-[#00024b] font-semibold mt-6">Yearly Plan</h3>
        <p className="text-gray-500 mt-2 text-center">{subscriptionDetails.Subscription_plan} </p>
        <h1 className="text-3xl font-bold text-[#00024b] mt-2">₹ {subscriptionDetails.Pricing["Yearly Price"]}         <span className="text-sm text-gray-500">/Yearly </span> </h1>
        {/* <p className="text-sm text-center mt-4">
        {pkg.quiz_package_description}
        </p> */}
        <button onClick={handlePayNow}  className="mt-2  bg-[#567ed6] text-white font-medium py-2 px-4 rounded-sm ">
            Pay Now
        </button>
      </div>

      </div>
          )}
          {/* <div className="flex flex-wrap justify-center gap-6 px-4">
          {quizPackages.map((pkg) => (
            <div
              key={pkg.quiz_package_id}
              className="bg-white text-black rounded-lg shadow-lg p-6 w-full md:w-[22%] flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-center">
                {pkg.quiz_package_name}
              </h2>
              <p className="text-gray-600 text-center my-4">
                {pkg.quiz_package_description}
              </p>
              <p className="text-center text-gray-800 font-medium">
                Pricing: Rs {pkg.quiz_package_price}
              </p>
              <button
                onClick={() => handleConfirmPayment(pkg.quiz_package_name)}
                className="mt-2 bg-indigo-600 text-white font-medium py-2 px-4 rounded-sm"
              >
                Pay Now
              </button>
            </div>
          ))}
          <button
            className="mt-6 w-full bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300"
            onClick={handleGoBack}
          >
            Back to Plans
          </button>
        </div> */}
          {/* Payment Options */}
          {/* <div className="flex flex-col gap-4">
            <button
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700"
              onClick={handleConfirmPayment}
            >
              Pay with Credit/Debit Card
            </button>
            <button
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700"
              onClick={handleConfirmPayment}
            >
              Pay with UPI
            </button>
            <button
              className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700"
              onClick={handleConfirmPayment}
            >
              Pay with Net Banking
            </button>
          </div> */}

          {/* Go Back */}
          <div>

        
          <button
            className="mt-6  bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300"
            onClick={handleGoBack}
          >
            Back to Plans
          </button>
          </div>
          {responseMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
                responseMessage.includes("success") ? "border-green-500" : "border-red-500"
              } border-t-4`}
            >
              <h2
                className={`text-xl font-semibold ${
                  responseMessage.includes("success") ? "text-green-500" : "text-red-500"
                }`}
              >
                {responseMessage.includes("success") ? "Success" : "Error"}
              </h2>
              <p className="mt-2 text-gray-700">{responseMessage}</p>
              <button
                onClick={handleclose} // Close the popup
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        </div>
      
        
      )}
      {/* Confirmation Page */}
      {currentPage === "confirmation" && (
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 text-center">
       {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} color="primary" />
  </div>
)}
          <h2 className="text-2xl font-bold mb-6">Payment Successful!</h2>
          <p className="text-gray-600">
            Thank you for purchasing the <strong>{selectedPlan}</strong> plan.
            You now have full access.
          </p>
          <button
            className="mt-6 bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700"
            onClick={() => setCurrentPage("plans")}
          >
            Go to Dashboard
          </button>
        </div>
      )}
  </div>
  </div>
  );
}

export default subscription;
