import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import "./contactus.css";
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



function contact() {
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
  return (
    <div className="flex">
      <Navigation/>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      {/* <header className="header">
        <div className="logo">
          <Link to={"/"}>
            <img src={quizifailogo} alt="Logo" width={160} height={63} />
          </Link>
        </div>
        <nav className="navigation">
          <ul>
            <li onClick={handleClick1} className="navItem">
              Home
            </li>
            {/* <li onClick={() => setActiveSection("pricing")} className="navItem">
              Pricing
            </li> */}

{/*          
            <li className="buttons">
              <Link to={"/signup"}>
                <button
                  className="signup"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                //   onClick={handleClick}
                >
                  {/* <img
                    src={signupIcon}
                    alt="Signup Icon"
                    className="icon"
                    style={{ marginRight: "10px" }}
                  /> */}
                  {/* Sign Up
                </button>
              </Link>
            </li>
            <li className="buttons">
              <Link to="/login">
                <button
                  className="login"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                //   onClick={handleClick1}
                >
                  {/* <img
                    src={loginIcon}
                    alt="Login Icon"
                    className="icon"
                    style={{ marginRight: "10px" }}
                  /> */}
                 {/* Login
                </button>
              </Link>
            </li>
            <li onClick={handleClick} className="navItem">
              Contact Us
            </li>  */}
        {/*}  </ul>
        </nav>
      </header> */}
     
      <div className="content4">
      <div className="flex justify-between px-[10px] pb-[80px]">
        <div>
        <p className="text-[#002366] text-[20px]">
                Welcome {username.charAt(0).toUpperCase() + username.slice(1)}
              </p>
      
        </div>
          <div className="flex flex-col justify-center items-center">
        <img
          src={LogoutIcon}
          onClick={handleBackToLogin}
          alt="Logout Icon"
          className="w-5 h-5 cursor-pointer "
        />
        {/* <p className="text-[#002366] text-[14px]">Logout</p> */}
        </div>
      </div>
          <div className="contactContent">
            
          <div className="contactContent1">
        
          <img className="h-[400px] w-full max-w-[641px]"
              src={chartbots1}
              alt="Logo"
              // width={1000}
              // height={1000}
              style={{ marginTop: "20px" }}
            />
            {/* <img
              src="/images/contact/whatsapp.png"
              alt="Logo 1"
              width={40}
              height={40}
              style={{
                position: "absolute",
                top: "500px",
                left: "200px",
              }}
            /> */}

            {/* <p
              style={{
                position: "absolute",
                top: "480px",
                left: "250px",
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
              }}
            >
              +91 9611291621 - Sales and Services <br></br>+91 9663901621 -
              Hiring Queries <br></br>+91 8297902227 - Whatsapp
            </p> */}

            {/* Second Logo */}
            <div className="emailcontact">
            <img
              src={ContactMail}
              alt="Logo 2"
              width={40}
              height={40}
              // style={{
              //   position: "absolute",
              //   top: "465px",
              //   left: "248px",
              // }}
            />
            <span
              style={{
                // position: "absolute",
                // top: "460px",
                // left: "299px",
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
                display:"flex",
                gap:"5px"
                
              }}
            >

             <span> <a href="mailto:info@quizifai.com" className="ContactMail1">info@quizifai.com</a></span>
              <span className="line">|</span>
              <span> <a href="mailto:sales@quizifai.com" className="ContactMail2">sales@quizifai.com</a></span>
            </span>
            </div>
            {/* Third Logo */}
            {/* <img
              src="/images/contact/address.png"
              alt="Logo 3"
              width={40}
              height={40}
              style={{
                position: "absolute",
                top: "640px",
                left: "200px",
              }}
            />
            <p
              style={{
                position: "absolute",
                top: "630px",
                left: "250px",
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
              }}
            >
              #92, 3rd Main, Virgo Nagar, Post, <br></br>Seegehalli, Bengaluru,
              Karnataka 560049
            </p> */}
            </div>
            <div className="flex flex-col justify-center items-center">
  <h1 className="text-[#0B3A55] font-semibold text-2xl font-open-sans">
    Get in Touch With Us
  </h1>

  <div className="w-[380px] h-[400px] bg-[#F1F1FF] rounded-lg">
    <div className="p-5 mb-5">
      <div className="mt-0">
        <div className="flex gap-2 mb-7">
          {/* <div className="bg-no-repeat bg-left w-5 h-5" style={{ backgroundImage: `url('/images/email/mail.png')` }}></div> */}

          <TextField
            id="FirstName"
            label="First Name"
            variant="outlined"
            type="text"
            error={submitted && firstName.trim() === ""}
            helperText={submitted && firstName.trim() === "" ? "Name is required" : ""}
            className="w-[160px] h-[50px] rounded-xl bg-white border-none font-poppins text-[15px]"
            InputProps={{
              style: {
                backgroundPosition: "120px center",
                backgroundRepeat: "no-repeat",
                height: "50px",
                border: "none",
                fontFamily: "poppins",
                fontSize: "15px",
                borderRadius: "10px",
                backgroundColor: "white",
              },
              endAdornment: (
                <div
                  // className={styles.passwordToggleIcon}
                 
                  style={{ color: "#A7A3FF",cursor:"pointer",position:"relative",left:"10px" }}
                >
                  <img src={LastNameIcon} alt="" />
                </div>
              ),
              autoComplete: "off",
            }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* <div className="bg-no-repeat bg-left w-5 h-5" style={{ backgroundImage: `url(${LastNameIcon})` }}></div> */}

          <TextField
            id="LastName"
            label="Last Name"
            variant="outlined"
            type="text"
            error={submitted && lastName.trim() === ""}
            helperText={submitted && lastName.trim() === "" ? "Name is required" : ""}
            className="w-[170px] h-[50px] rounded-xl bg-white border-none font-poppins text-[15px] ml-[20px]"
            InputProps={{
              style: {
                backgroundPosition: "120px center",
                backgroundRepeat: "no-repeat",
                height: "50px",
                border: "none",
                fontFamily: "poppins",
                fontSize: "15px",
                borderRadius: "10px",
                backgroundColor: "white",
              },
              endAdornment: (
                <div
                  // className={styles.passwordToggleIcon}
                 
                  style={{ color: "#A7A3FF",cursor:"pointer",position:"relative",left:"10px" }}
                >
                  <img src={LastNameIcon} alt="" />
                </div>
              ),
              autoComplete: "off",
            }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-7">
          {/* <div className="bg-no-repeat bg-left w-5 h-5" style={{ backgroundImage: `url(${PhoneIcon})` }}></div> */}

          <TextField
            id="MobileNumber"
            type="tel"
            label="Mobile Number"
            variant="outlined"
            error={submitted && phoneNumber.trim() === ""}
            helperText={submitted && phoneNumber.trim() === "" ? "Number is required" : ""}
            className="w-[340px] h-[50px] rounded-xl bg-white border-none font-poppins text-[15px]"
            InputProps={{
              style: {
                backgroundPosition: "120px center",
                backgroundRepeat: "no-repeat",
                height: "50px",
                border: "none",
                fontFamily: "poppins",
                fontSize: "15px",
                borderRadius: "10px",
                backgroundColor: "white",
              },
              endAdornment: (
                <div
                  // className={styles.passwordToggleIcon}
                 
                  style={{ color: "#A7A3FF",cursor:"pointer",position:"relative",left:"10px" }}
                >
                  <img src={PhoneIcon} alt="" />
                </div>
              ),
              autoComplete: "off",
            }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-7">
          {/* <div className="bg-no-repeat bg-left w-5 h-5 z-50" style={{ backgroundImage: `url(${EmailIcon})`,backgroundPosition: "10px center", zIndex:"1" }}></div> */}

          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            error={submitted && userEmail.trim() === ""}
            helperText={submitted && userEmail.trim() === "" ? "Mail is required" : ""}
            className="w-[340px] h-[50px] rounded-xl bg-white border-none font-poppins text-[15px]"
            InputProps={{
              style: {
                // backgroundImage: `url(${EmailIcon})`,
                backgroundPosition: "10px center",
                backgroundRepeat: "no-repeat",
                height: "50px",
                border: "none",
                fontFamily: "poppins",
                fontSize: "15px",
                borderRadius: "10px",
                backgroundColor: "white",
              },
                endAdornment: (
                              <div
                                // className={styles.passwordToggleIcon}
                               
                                style={{ color: "#A7A3FF",cursor:"pointer",position:"relative",left:"10px" }}
                              >
                                <img src={EmailIcon} alt="" />
                              </div>
                            ),
              autoComplete: "off",
            }}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-7">
          {/* <div className="bg-no-repeat bg-left w-5 h-5" style={{ backgroundImage: `url(${MessageIcon})` }}></div> */}

          <TextField
            id="yourmessage"
            label="Your Message"
            variant="outlined"
            error={submitted && message.trim() === ""}
            helperText={submitted && message.trim() === "" ? "Message is required" : ""}
            className="w-[340px] h-[70px] rounded-xl bg-white border-none font-poppins text-[15px]"
            InputLabelProps={{ className: "font-poppins" }}
            InputProps={{
              style: {
                backgroundPosition: "120px center",
                backgroundRepeat: "no-repeat",
                height: "70px",
                border: "none",
                fontFamily: "poppins",
                fontSize: "15px",
                borderRadius: "10px",
                backgroundColor: "white",
              },
              endAdornment: (
                <div
                  // className={styles.passwordToggleIcon}
                 
                  style={{ color: "#A7A3FF",cursor:"pointer",position:"relative",left:"10px" }}
                >
                  <img src={MessageIcon} alt="" />
                </div>
              ),
              autoComplete: "off",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-end pr-2">
          <button
            className="w-[80px] h-[30px] bg-[#223F80] text-white rounded-[20px] font-poppins text-[13px] font-semibold cursor-pointer"
            onClick={submitContactForm}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>
      
      </div>
    </div>
  );
}

export default contact;