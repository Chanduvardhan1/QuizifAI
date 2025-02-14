import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Lady from "../assets/Images/images/contact/lady.png";
import ContactMail from "../assets/Images/images/contact/ContactMail.png";
import LastNameIcon from "../../src/assets/Images/images/contact/last.png";
import PhoneIcon from "../../src/assets/Images/images/contact/mobile.png";
import EmailIcon from "../../src/assets/Images/images/contact/mailImg.png";
import MessageIcon from "../../src/assets/Images/images/contact/msg.png";
import { useNavigate } from "react-router-dom";
import Navigation from "../navbar/navbar.jsx"
import chartbots1 from "../../public/chatbots1.png";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import close from "../../src/assets/Images/images/dashboard/cancel.png"



function contactus() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  // const router = useRouter();
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contact");
  };

  const handleClick1 = () => {
    navigate("/");
  };
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const token = searchParams.get('token');
  // useEffect(() => {
  //   if (token) {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         verify_option: "string",
  //         email_or_mobile: "string",
  //         otp: "string"
  //       })
  //     };

  //     fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/verification', requestOptions)
  //       .then(response => response.json())
  //       .then(token => {
  //         // Handle the verification result here
  //         console.log('Verification Result:', token);
  //         setVerificationResult(token);
  //       })
  //       .catch(error => {
  //         console.error('Error:', error);
  //         // Handle error if any
  //       });
  //   }
  // }, [token]);
  const [verificationResponse, setVerificationResult] = useState("");

  // const { email } = router.query;
  // const { email } = "";

  // console.log("email:", email);
 
  // // Ensure email value is properly populated before calling handleVerification
  // if (router.query && router.query.email) {
  //   const email = router.query.email;
  //   handleVerification(email); // Call handleVerification function with email value
  // } else {
  //   console.error('Email not found in router query');
  // }
  // useEffect(() => {
  //   if (email) {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         verify_option: email,
  //         email_or_mobile: email,
  //         otp: "string"
  //       })
  //     };

  //     fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/verification', requestOptions)
  //       .then(response => response.json())
  //       .then(email => {
  //         console.log('Verification Result:', email);
  //         setVerificationResult(email);
  //       })
  //       .catch(error => {
  //         console.error('Error:', email);
  //         // Handle error if any
  //       });
  //   }
  // }, [email]);

  // Now you have access to the token

  const submitContactForm = async () => {
    // Swal.fire("Your message has been sent to our QuizifAi team take an deep breath our team will reach you within 24hours");
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email_address: userEmail,
      message: message,
    };

    setSubmitted(true);


    const setPhoneNumber = (e) =>{
         const inputValue = e.target.value;
         if (/^[0-9]{10}$/.test(inputValue)){
          setPhoneNumber(inputValue);
         }
    }

    // const setUserEmail = (e) => {
    //   const inputValue = e.target.value;
    //   if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
    //     setUserEmail(inputValue);
    //   };
      
  
    // };

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      const response = await fetch(
        "https://dev.quizifai.com:8010/contact_us_email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      // Handle response data as needed
      if (responseData.response === "success") {
        // if (Array.isArray(responseData.message) && responseData.message.length > 0) {
        //   // Assuming you want to display the first message in the array
        //   console.log(responseData.message[0]);
        navigate("/contact-1");
        }
      else {
        // Handle other response scenarios
        // For example, if response is not success
        // You can show an error message
        setError("There was an error processing your request. Please try again later.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle error
      // For example, show a generic error message
      setError("An unexpected error occurred. Please try again later.");
    }
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


    const [username, setUsername] = useState("");
  
 useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleBack = () => {
    navigate("/subscription")
  };
  return (
    <div className="w-full flex">
      <Navigation/>
        <div onClick={handleBack} className=" absolute top-5 right-5 cursor-pointer">
                <img src={close} alt="" className="w-[25px] h-[25px]" />
              </div>
 <div className="w-full flex justify-center items-center p-4">
<img src={chartbots1} alt="" className=" w-[500px] h-[400px]"/>
 </div>
 <div className="w-full flex gap-2 flex-col md:pt-[120px] p-4">
  <div className="flex justify-center">
    <h1 className=" text-[24px] text-[#00028b] font-bold md:mb-10">Organization Contactus</h1>
  </div>
 <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Name<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Name"
                // value={orgAddressLine1}
                // onChange={(e) => setOrgAddressLine1(e.target.value)}
                // disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Descrption<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Descrption"
                // value={orgAddressLine2}
                // onChange={(e) => setOrgAddressLine2(e.target.value)}
                // disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Admin Email<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Admin Email"
                // value={orgAddressLine1}
                // onChange={(e) => setOrgAddressLine1(e.target.value)}
                // disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[40%] text-blue-800 font-semibold mb-2 mr-[9px] ">Mobile<span className="text-red-500"></span></label>
        <input
              type="text"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="Mobile"
                // value={orgAddressLine2}
                // onChange={(e) => setOrgAddressLine2(e.target.value)}
                // disabled={!isEditing}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="flex justify-end  mt-2 ">

<button
          //  onClick={handleedit}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Send
            </button>
            </div>       
 </div>
    </div>
  );
}

export default contactus;