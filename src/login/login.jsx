import React, { useState,useContext } from "react";
import styles from "../signup/email.module.css";
// import quizifailogo from "/images/Homeimage.png";
// import quizifailogo from "/images/oldimage.png";
// import homeImage from "../../public/homepicture.png";
import chartbots1 from "../../public/chatbots1.png";
import closeIcon from "../assets/Images/images/gmail/closeIcon.png";
import forgotPasswordIcon from "../assets/Images/images/back1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import googleLogo from "../assets/Images/images/gmail/google.png";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbarhome from "../navbarhome/navbarhome";
import { AuthContext } from "../Authcontext/AuthContext.jsx"
import HeaderSection from "../HeaderSection/HeaderSection.jsx";


const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showGmailPopup, setShowGmailPopup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [forgeotmobile, setforgeotmobile] = useState(false);
  const [showResetOTP, setShowResetOTP] = useState(false);
  const [showResendOTPForm, setShowResendOTPForm] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginOption, setloginOption] = useState("");
  const [platform, setplatform] = useState("")
  const [Forgotmassage, setForgotmassage] = useState("")
  const [Forgotmobile, setForgotmobile] = useState("")
  const { login } =  useContext(AuthContext);
  const [username, setUsername] = useState('');
  // const { handleLogin } = useAuth();

  const validateEmail = () => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = () => {
    return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password);
  };
  const handleMobileChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setMobile(inputValue);
    }
  };
  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setErrorMessage('')
    setPassword('')
    setShowPassword(false);
    setIsContentSelected(true);
    if (method === "gmail") {
      setShowGmailPopup(true);
    }
  };

  const handleBlur = () => {
    validateEmail();
  };

  const handleClosePopup = () => {
    setShowGmailPopup(false);
    setLoginMethod(null);
    setIsContentSelected(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setErrorMessage('')
  };

  const handleGoBack = () => {
    setShowThankYou(false);
  };
  const handleGoBack1 = () => {
    setShowForgotPassword(false);
  };
  // const handleForgotPasswordSubmit = () => {
  //   setShowThankYou(true);
  // };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    setShowResendOTPForm(true);
  };
  const navigate = useNavigate();

  // const handleLogin1 = async (loginOption, email, mobile, password) => {

  //   if (!password) {
  //     setErrorMessage("Please enter your password");
  //     return;
  //   }
  //   try {
  //     const platform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  //     ? "mobile" // If any of the identifiers are found, return 'Mobile'.
  //     : "Web";
  //     const tokenResponse = await fetch('https://dev.quizifai.com:8010/token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         accept: 'application/json',
  //       },
  //       body: new URLSearchParams({
  //         username:  loginOption === "email" ? email : mobile, // Use the fixed username
  //         password: password, // Use the fixed password
  //       }),
  //     });
  
  //     if (!tokenResponse.ok) {
  //       const errorData = await tokenResponse.json();
  //       const backendMessage = errorData.detail || "Failed to retrieve access token";
  
  //       // Show specific error message based on login option
  //       const errorMessage =
  //         loginOption === "email"
  //           ? "Incorrect email or password. Please try again."
  //           : "Incorrect mobile number or password. Please try again.";
        
  //       // If backend provides a specific error detail, use that
  //       setErrorMessage(backendMessage.includes("Incorrect") ? errorMessage : backendMessage);
  //       return; // Stop further execution
  //     }
  //     const tokenData = await tokenResponse.json();
  //     const accessToken = tokenData.access_token;
  
  //     const response = await fetch(`https://dev.quizifai.com:8010/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         login_option: loginOption,
  //         email_or_mobile: loginOption === "email" ? email : mobile,
  //         password: password,
  //         platform:platform,
  //       }),
  //     });
  
  //     const responseData = await response.json();
  
  //     if (response.ok) {
  //       if (responseData.response === "success") {
  //         const userId = responseData.data && responseData.data[0] && responseData.data[0].user_id;
  //       const userRole = responseData.data && responseData.data[0] && responseData.data[0].user_role;
  //       // const orgId = responseData.data?.[0]?.org_id;
  //       // const orgId = responseData.data?.[0]?.org_id || 0; // Default to 0 if null or undefined
  //       const orgId = responseData.data?.[0]?.org_id ?? "";
        
  //       if (userId && userRole) {
  //         login(accessToken);
  //         localStorage.setItem('user_id', userId);
  //         localStorage.setItem('user_role', userRole);
  //         localStorage.setItem('password', password);
  //         localStorage.setItem('org_id', orgId);
  //         localStorage.setItem('user_type', userType);
  //         if (loginOption === "email") {
  //           localStorage.setItem('email', email); // Store email in localStorage
  //         }
  //         setErrorMessage("");
  //         if (userRole === "Admin" && orgId) {
  //           navigate("/profileorganization");
  //         } else {
  //           navigate("/dashboard");
  //         }
  //           console.log("Login successful!");
  //         } else {
  //           setErrorMessage("An unknown error occurred while logging in.");
  //         }
  //       } else if (responseData.response === "fail") {
  //         let errorMessage = responseData.response_message;
  //         if (responseData.response_message === "Password is incorrect.Please try again.") {
  //           errorMessage = "Password is incorrect. Please try again.";
  //         } else if (responseData.response_message === "Email is not valid.Please check your email") {
  //           errorMessage = "Email is not valid.Please check your email";
  //         } else if (responseData.response_message === "Mobile Number is incorrect or account doesn't exist pls sinup.") {
  //           errorMessage = "Mobile Number is not valid.Please check your number";
  //         } else if (responseData.response_message === "Email is not verified, please verify your email") {
  //           errorMessage = "Email is not verified, please verify your email";
  //         } else if (responseData.response_message === "Registration is not yet completed.") {
  //           errorMessage = "Registration is not yet completed.";
  //         } else if (responseData.response_message === "Mobile Number is not valid.Please check your number") {
  //           errorMessage = "Mobile Number is not valid.Please check your number";
  //         } else if (responseData.response_message === "Email is incorrect or account doesn't exist.") {
  //           errorMessage = "Email is incorrect or account doesn't exist.";
  //         } else if (responseData.response_message === "Your login request is being processed. Please wait a moment while we verify your account details.") {
  //           errorMessage = "Your login request is being processed. Please wait a moment while we verify your account details.";
  //         }else if (responseData.response_message === "Please click here to complete your registration and activate your account.") {
  //           errorMessage = "Please click here to complete your registration and activate your account.";
  //         }else if (responseData.response_message === "Mobile Number is incorrect or account doesn't exist. Please sign up.") {
  //           errorMessage = "Mobile Number is incorrect or account doesn't exist. Please sign up.";
  //         }else if (responseData.response_message === "Mobile Number is not valid. Please check your number") {
  //           errorMessage = "Mobile Number is not valid. Please check your number";
  //         }else if (responseData.response_message === "Password is incorrect. Please try again.") {
  //           errorMessage = "Password is incorrect. Please try again.";
  //         }else if (responseData.response_message === "You've chosen mobile as your login method, so please log in using your mobile number.") {
  //           errorMessage = "You've chosen mobile as your login method, So, please login by using your mobile number.";
  //         }

  //         setErrorMessage(errorMessage);
  //       } else {
  //         setErrorMessage("An unknown error occurred while logging in.");
  //       }
  //     } else {
  //       setErrorMessage(responseData.message || "An unknown error occurred while logging in.");
  //     }
  //   } catch (error) {
  //     setErrorMessage("An error occurred while logging in.");
  //   }
  // };
  

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin1(loginMethod, email, mobile, password);
    }
  };
  

  const handleLogin1 = async (loginOption, email, mobile, password) => {
    if (loginOption === "email") {
      if (!email) {
        setErrorMessage("Please enter your email");
        return;
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address");
        return;
      }
    } else if (loginOption === "mobile") {
      if (!mobile) {
        setErrorMessage("Please enter your mobile number");
        return;
      }
      // Validate mobile number format (example: 10 digits)
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(mobile)) {
        setErrorMessage("Please enter a valid mobile number");
        return;
      }
    } else {
      setErrorMessage("Invalid login option selected");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }
  
    try {
      const platform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? "mobile"
        : "Web";
  
      // Step 1: Fetch the access token
      const tokenResponse = await fetch('https://dev.quizifai.com:8010/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
        body: new URLSearchParams({
          username: loginOption === "email" ? email : mobile,
          password: password,
        }),
      });
  
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        const backendMessage = errorData.detail || "Failed to retrieve access token";
  
        const errorMessage =
        loginOption === "email"
          ? "Please check your credentials and try again."
          : "Please check your credentials and try again.";

        setErrorMessage(backendMessage.includes("Incorrect") ? errorMessage : backendMessage);
        return;
      }
  
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
  
      // Step 2: Login request using the access token
      const response = await fetch(`https://dev.quizifai.com:8010/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          login_option: loginOption,
          email_or_mobile: loginOption === "email" ? email : mobile,
          password: password,
          platform: platform,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok && responseData.response === "success") {
        const userData = responseData.data?.[0];
  
        if (userData) {
          // Destructure and set user data
          const {
            user_id,
            user_role,
           
            user_type = "",
            subscription_details = {},
          } = userData;
          const orgId = responseData.data?.[0]?.org_id ?? "";
          const subscriptionType = subscription_details?.subscription_type || "Free";
  
          // Save user data to localStorage
          login(accessToken);
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('user_role', user_role);
          localStorage.setItem('password', password);
          localStorage.setItem('org_id', orgId);
          localStorage.setItem('user_type', user_type);
          localStorage.setItem('subscription_type', subscriptionType);
          localStorage.setItem("subscription_details", JSON.stringify(subscription_details));

          if (loginOption === "email") {
            localStorage.setItem('email', email);
          }
  
          setErrorMessage("");
  
          // Navigate based on user_role and org_id
          if (user_role === "Admin" && orgId) {
            navigate("/profileorganization");
          } else if (user_role === "Quiz Master") {
            navigate("/dashboard");
          } else {
            navigate("/dashboard");
          }
  
          console.log("Login successful!");
        } else {
          setErrorMessage("Failed to retrieve user data. Please try again.");
        }
      } else {
        const errorMsg = responseData.response_message || "An unknown error occurred.";
        setErrorMessage(errorMsg);
      }
    } catch (error) {
    
      if (error instanceof SyntaxError) {
        setErrorMessage("A parsing error occurred. Please check your input file.");
      } else if (error.message.includes("NetworkError")) {
        setErrorMessage("A network error occurred. Please check your internet connection.");
      } else if (error.message.includes("Failed to fetch")) {
        setErrorMessage("Server could not be reached. Please try again later.");
      } else {
        setErrorMessage("An unexpected error occurred while processing your request. Please try again.");
      }
    }
  };
  
  
  const validateEmail1 = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (validateEmail(email)) {
      setErrorMessage('');
    } else {
      setErrorMessage('Email is not valid.');
    }
  };
  const handleForgotPasswordSubmit = () => {
    const requestBody = JSON.stringify({
      Forogot_option: loginMethod,
      email_or_mobile: loginMethod === "email" ? email : mobile,
    });

    fetch("https://dev.quizifai.com:8010/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: requestBody,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.response === "success") {
        const userId = data.data[0]?.user_id;
        if (data.response_message === "OTP Succuessfully Sent") {
          navigate("/restpasswordmobile", { state: { userId,mobile } });
        } else if (data.response_message === "OTP Sent Successfully, Please reset your password") {
          navigate("/restpassword", { state: { userId,email} });
        }
      }else if (data.response === "fail" && data.response_message === "Email is incorrect or not registered.") {
        setForgotmassage(data.response_message);
      } else {
        setForgotmassage(data.response_message);
      }
    })
    
    .catch((error) => {
      console.error("Error occurred:", error);
    });
  };


  const handleEmailChange1 = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setEmail(value);
  };
  const handleBackToDashboard = () => {
    navigate("/signup");
  };
  return (
    <div>
       <HeaderSection/>
      <div className="flex font-Poppins" style={{display:"flex",maxWidth:"1280px", margin: "0 auto",alignItems: "flex-start"}}>
        <div className={styles.leftSection}>
          <div className={styles.logo1}>
            <img className="h-[400px] w-full max-w-[641px]"src={chartbots1} alt="Logo"
               style={{marginTop:"20px"}}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          {!showForgotPassword ? (
            <>
              <div className={styles.loginHeader}>
                <h1 className={styles.loginTitle}>Login</h1>
              </div>
              <div className={styles.totalBox1}>
              <div className={styles.formContainer1}>

              <div className={styles.toggleOptions}>
                    <div
                      className={`${styles.toggleLabel} ${
                        loginMethod === "email" ? styles.selected : ""
                      }`}
                      onClick={() => handleLoginMethodChange("email")}
                    >
                      Email
                    </div>
                    <div
                      className={`${styles.toggleLabel} ${
                        loginMethod === "mobile" ? styles.selected : ""
                      }`}
                      onClick={() => handleLoginMethodChange("mobile")}
                    >
                      Mobile
                    </div>
                    <div
                      className={styles.selectedLine}
                      style={{ left: loginMethod === "mobile" ? "50%" : "0" }}
                    />
                  </div>

              {/*  email content */}
              {loginMethod === "email" && (
                <div className={styles.emailContent}>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                      <div
                        className={styles.inputWithIcon}
                        style={{ marginTop: "20px" }}
                      >
                        <TextField
                          id="email"
                          label="Email"
                          required
                          onKeyDown={handleKeyDown} 
                          value={email}
                          onChange={handleEmailChange1}
                          variant="outlined"
                          className={styles.inputField}
                          style={{ width: "325px", height: "50px" }}
                          InputLabelProps={{
                            style: { fontFamily: "poppins" },
                          }}
                          InputProps={{
                            style: {
                              // backgroundImage: `url('/images/email/mail.png')`,
                              backgroundSize: "19px 16px",
                              backgroundPosition: "295px center",
                              backgroundRepeat: "no-repeat",
                              width: "325px",
                              height: "50px",
                              backgroundColor: "white",
                              border: "none",
                              fontFamily: "poppins",
                              paddingLeft: "0px",
                              borderRadius: "10px",
                            },
                            endAdornment: (
                              <div
                                className={styles.passwordToggleIcon}
                               
                                style={{ color: "#A7A3FF",cursor:"pointer",position:"relative",left:"10px" }}
                              >
                                <img src="images/email/mail.png" alt="" />
                              </div>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </div>
                    </div>

                    <div className={styles.inputWrapper}>
                      <div
                        className={styles.inputWithIcon}
                        style={{ marginRight: "87px" }}
                      >
                        <TextField
                          id="password1"
                          label="Password"
                          required
                          onKeyDown={handleKeyDown} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          variant="outlined"
                          className={styles.inputField}
                          style={{ width: "328px", height: "50px" }}
                          InputLabelProps={{
                            style: { fontFamily: "poppins" },
                          }}
                          InputProps={{
                            style: {
                              backgroundSize: "19px 16px",
                              backgroundPosition: "10px center",
                              backgroundRepeat: "no-repeat",
                              width: isMobile ? "100%" : "328px",
                              height: "50px",
                              backgroundColor: "white",
                              border: "none",
                              fontFamily: "poppins",
                              paddingLeft: "0px",

                              borderRadius: "10px",
                            },
                            endAdornment: showPassword !== undefined &&(
                              <div
                                className={styles.passwordToggleIcon}
                                onClick={togglePasswordVisibility}
                                style={{ color: "#A7A3FF",cursor:"pointer" }}
                              >
                                {showPassword ? <FaEye/> : <FaEyeSlash />}
                              </div>
                            ),
                            autoComplete: "new-password",
                          }}
                          type={showPassword ? "text" : "password"}
                        />
                      </div>

                      <div
                        className={styles.forgotPassword}
                        onClick={handleForgotPasswordClick}
                       
                      >
                        Forgot Password?
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile content */}
              {loginMethod === "mobile" && (
                <div className={styles.mobileContent}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#454B60",
                      marginRight: "210px",
                    }}
                  >
                  </p>
                  <div className={styles.inputWrapper}>
                    <div
                      className={styles.inputWithIcon}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <TextField
                        id="number"
                        label="Mobile Number"
                        type="tel"
                        required
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*", 
                        }}
                        onKeyDown={handleKeyDown} 
                        value={mobile}
                        // onChange={(e) => {
                        //   
                        //   setMobile(e.target.value);
                        // }}
                        onChange={handleMobileChange}
                        // onChange={(e) => 
                        //   handleMobileChange(e)
                        //   setMobile(e.target.value)}
                        variant="outlined"
                        className={styles.inputField}
                        style={{ width: "325px", height: "50px" }}
                        InputLabelProps={{
                          style: { fontFamily: "poppins" },
                        }}
                        InputProps={{
                          style: {
                            backgroundImage: `url('/images/mobile/mob.png')`,
                            backgroundSize: "10px 19px",
                            backgroundPosition: "295px center",
                            backgroundRepeat: "no-repeat",
                            width: "325px",
                            height: "50px",
                            backgroundColor: "white",
                            border: "none",
                            fontFamily: "poppins",
                            paddingLeft: "0px",
                            borderRadius: "10px",
                          },
                          autoComplete: "off",
                        }}
                      />
                      
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <div
                      className={styles.inputWithIcon}
                      style={{
                        marginTop: "20px",
                        marginRight: "90px",
                        marginBottom: "0px",
                      }}
                    >
                      <TextField
                        id="password2"
                        label="Password"
                        type="text"
                        required
                        onKeyDown={handleKeyDown} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        className={styles.inputField}
                        style={{ width: "325px", height: "50px" }}
                        InputLabelProps={{
                          style: { fontFamily: "poppins" },
                        }}
                        InputProps={{
                          style: {
                            // backgroundImage: `url('/images/contact/first.png')`,
                            backgroundSize: "19px 16px",
                            backgroundPosition: "10px center",
                            backgroundRepeat: "no-repeat",
                            width: "325px",
                            height: "50px",
                            backgroundColor: "white",
                            border: "none",
                            fontFamily: "poppins",
                            paddingLeft: "0px",
                            borderRadius: "10px",
                          },
                          endAdornment: (
                            <div
                              className={styles.passwordToggleIcon1}
                              onClick={togglePasswordVisibility1}
                              style={{ color: "#A7A3FF" ,cursor:"pointer"}}
                            >
                              {showPassword1 ? < FaEye/> : <FaEyeSlash />}
                            </div>
                          ),
                          type: showPassword1 ? "text" : "password",
                          autoComplete: "new-password",
                        }}
                      />
                    </div>
                    <div
                        className={styles.forgotPassword}
                        onClick={handleForgotPasswordClick}
                      >
                        Forgot Password?
                      </div>
                  </div>
                </div>
              )}

              {/* Gmail content */}
              {loginMethod === "gmail" && (
                <div className={styles.gmailPopup}>
                  <img
                    src={closeIcon}
                    alt="Close"
                    className={styles.closeButton}
                    onClick={handleClosePopup}
                  />

                  <div className={styles.popupLogo}>
                    <img src={googleLogo} alt="Google Logo" />
                  </div>
                  <div className={styles.signInText}>Sign in</div>
                  <div className={styles.googleAccountText}>
                    with your Google Account
                  </div>
                  <div className={styles.inputBoxContainer}>
                    <div className={styles.placeholderBox}>Email or phone</div>
                    <input
                      type="text"
                      placeholder=""
                      className={styles.inputBox}
                    />
                  </div>
                  <div className={styles.inputBoxContainer}>
                    <div className={styles.placeholderBox}>Password</div>
                    <input
                      type="password"
                      placeholder=""
                      className={styles.inputBox}
                    />
                  </div>

                  <div className={styles.forgotTextContainer}>
                    <div>Forgot Email?</div>
                    <div>Forgot Password</div>
                  </div>
                  <div className={styles.privacyText}>
                    Not your computer? Use Guest mode to sign in privately.
                  </div>
                  <div className={styles.learnMoreText}>Learn more</div>
                  <div className={styles.buttonContainer}>
                    <div className={styles.createAccountText}>
                      Create account
                    </div>
                    <button className={styles.nextButton}>Next</button>
                  </div>
                </div>
              )}

              <p
                className={`${styles.signUpText} ${
                  !isContentSelected || loginMethod === "gmail"
                    ? styles.withMarginTop
                    : ""
                }`}
               
              >
                Don't have an account yet?{" "}
                <span className={styles.diffColor}
                onClick={handleBackToDashboard}>Sign up</span>{" "}
              </p>             
              <button
                onClick={() =>
                  handleLogin1(loginMethod, email, mobile, password)
                }
                className={styles.loginButton}
              >
                Login
              </button>
              </div>
              {errorMessage && (
                <>
                  {console.log("Error message:", errorMessage)}
                  <p className={styles.displayError}>{errorMessage}</p>
                </>
              )}
              </div>           
            </>
          ) : (
            <>
              {/* Content for forgot password */}
              {!showThankYou ? (
                <div className={styles.forgotPasswordContent}>
                  {/* Forgot password form */}
                  <div
                    className={styles.forgotPasswordContent}
                    styles={{ marginLeft: "300px" }}
                  >
                    <div className={styles.forgotPasswordHeader}>
                      <div
                        className={styles.goBackButton}
                        onClick={handleGoBack1}
                      >
                        <img
                          src={forgotPasswordIcon}
                          alt="Go Back"
                          width={12}
                          height={17}
                        />
                        <span>Go Back</span>
                      </div>
                    </div>
                    <div className={styles.forgotPasswordText}>
                      <p
                        className={styles.firstParagraph}
                        style={{
                          color: "#454B60",
                          fontSize: "30px",
                          fontWeight: 700,
                        }}
                        >
                        Forgot Password
                      </p>
                      
                      <p
                        className={styles.secondParagraph}
                        style={{
                          color: "#454B60",
                          fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        Reset using {loginMethod === "email" && (<span>email</span>)} {loginMethod === "mobile" && (<span>mobile</span>)}
                      </p>
                        
                      <div className={styles.emailinputbox}>
                      {loginMethod === "email" && (
                      <div
                        className={styles.inputWithIcon1}
                        // style={{ marginTop: "20px", marginRight: "90px" }}
                      >
                        <input
                          type="text"
                          placeholder="Enter Email"
                          className={styles.inputField1}
                          style={{
                            backgroundImage: `url('/images/email/mail.png')`,
                            backgroundSize: "19px 16px",
                            backgroundPosition: "10px center",
                            backgroundRepeat: "no-repeat",
                            width: "325px",
                            height: 40,
                            backgroundColor: "#F0EFFF",
                            border: "none",
                            fontFamily: "poppins",
                          padding:"10px",
                          paddingLeft:"35px",
                            borderRadius: "10px",
                          }}
                          value={email}
                          onChange={handleEmailChange}
                          readOnly
                        />
                      </div>
                        )}
                      {/* <p
                        className={styles.orText}
                        style={{
                          marginLeft: "140px",
                          color: "#454B60",
                          fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        OR
                      </p> */}
                       {loginMethod === "mobile" && (
                      <div
                        className={styles.inputWithIcon1}
                        // style={{ marginTop: "20px", marginRight: "90px" }}
                      >
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          className={styles.inputField1}
                          style={{
                            backgroundImage: `url('/images/mobile/mob.png')`,
                            backgroundSize: "14px 24px",
                            backgroundPosition: "10px center",
                            backgroundRepeat: "no-repeat",
                            width: "325px",
                            height: 40,
                            backgroundColor: "#F0EFFF",
                            border: "none",
                            fontFamily: "poppins",
                            paddingLeft: "40px",
                            borderRadius: "10px",
                          }}
                          value={mobile}
                          onChange={handleMobileChange}
                          readOnly
                        />
                      </div>
                        )}
                      <div className={styles.buttonContainer}>
                     
                        <button
                          className={`${styles.submitButton} ${styles.button1}`}
                          onClick={handleForgotPasswordSubmit}
                          style={{
                            width: "80px",
                            height: "30px",
                           
                            fontFamily: "poppins",
                          }}
                        >
                          Send OTP
                        </button>
                     
                        {/* <button
                          className={`${styles.cancelButton} ${styles.button1}`}
                          style={{
                            width: "144px",
                            height: "48px",
                            fontFamily: "poppins",
                          }}
                          onClick={handleGoBack1}
                        >
                          Cancel
                        </button> */}
                      </div>
                      {Forgotmassage && (
                <>
                 
                  <p className={styles.Forgotmassage} >{Forgotmassage}</p>
                </>
              )}
                      </div>
                      {errorMessage && (
                <>
                  {console.log("Error message:", errorMessage)}
                  <p className={styles.displayError}>{errorMessage}</p>
                </>
              )}
                    </div>
                 
                  </div>
                </div>
              ) : (  
                // Thank You message

                <div className={styles.forgotPasswordContent}>
                {/* Forgot password form */}
                <div
                  className={styles.forgotPasswordContent}
                  styles={{ marginLeft: "300px" }}
                >
                  <div className={styles.forgotPasswordHeader}>
                    <div
                      className={styles.goBackButton}
                      onClick={handleGoBack1}
                    >
                      <img
                        src={forgotPasswordIcon}
                        alt="Go Back"
                        width={12}
                        height={17}
                      />
                      <span>Go Back</span>
                    </div>
                  </div>
                  <div className={styles.forgotPasswordText}>
                    <p
                      className={styles.firstParagraph}
                      style={{
                        color: "#454B60",
                        fontSize: "30px",
                        fontWeight: 700,
                      }}
                    >
                      Forgot Password
                    </p>
                    <p
                      className={styles.secondParagraph}
                      style={{
                        color: "#454B60",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Reset using phone or email
                    </p>
                    <div
                      className={styles.inputWithIcon1}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <input
                        type="text"
                        placeholder="Enter Email"
                        className={styles.inputField1}
                        style={{
                          backgroundImage: `url('/images/email/mail.png')`,
                          backgroundSize: "19px 16px",
                          backgroundPosition: "10px center",
                          backgroundRepeat: "no-repeat",
                          width: 270,
                          height: 40,
                          backgroundColor: "#F0EFFF",
                          border: "none",
                          fontFamily: "poppins",
                          paddingLeft: "40px",
                          borderRadius: "10px",
                        }}
                        value={email}
                        onChange={handleEmailChange}
                        readOnly
                      />
                    </div>
                    <p
                      className={styles.orText}
                      style={{
                        marginLeft: "140px",
                        color: "#454B60",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      OR
                    </p>
                     <div
                      className={styles.inputWithIcon1}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        className={styles.inputField1}
                        style={{
                          backgroundImage: `url('/images/mobile/mob.png')`,
                          backgroundSize: "14px 24px",
                          backgroundPosition: "10px center",
                          backgroundRepeat: "no-repeat",
                          width: 270,
                          height: 40,
                          backgroundColor: "#F0EFFF",
                          border: "none",
                          fontFamily: "poppins",
                          paddingLeft: "40px",
                          borderRadius: "10px",
                        }}
                        value={mobile}
                        onChange={handleMobileChange}
                      />
                    </div> 
                    <div
                      className={styles.checkboxContainer1}
                      styles={{ marginTop: "150px" }}
                    >
                  </div>
                    {errorMessage && (
              <>
                {console.log("Error message:", errorMessage)}
                <p className={styles.displayError}>{errorMessage}</p>
              </>
            )}
                    <div className={styles.buttonContainer}>
                      <button
                        className={`${styles.submitButton} ${styles.button1}`}
                        onClick={handleForgotPasswordSubmit}
                        style={{
                          width: "144px",
                          height: "48px",
                          marginRight: "40px",
                          fontFamily: "poppins",
                        }}
                      >
                        Submit
                      </button>
                      <button
                        className={`${styles.cancelButton} ${styles.button1}`}
                        style={{
                          width: "144px",
                          height: "48px",
                          fontFamily: "poppins",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
           
                  </div>
                </div>
              </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
