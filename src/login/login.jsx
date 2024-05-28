import React, { useState, useEffect } from "react";
import styles from "../signup/email.module.css";
import quizifailogo from "../assets/Images/images/home/Quizifai4.jpg";
import butterflyImg from "../assets/Images/images/butterfly1.png";
import icon1 from "../assets/Images/images/mdi_gmail.png";
import icon2 from "../assets/Images/images/clarity_mobile-line.png";
import icon3 from "../assets/Images/images/logos_google-gmail.png";
import img2 from "../assets/Images/images/img2.png";
import logo2 from "../assets/Images/images/narmtech-logo.png";
import closeIcon from "../assets/Images/images/gmail/closeIcon.png";
import { FaSyncAlt } from "react-icons/fa";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import forgotPasswordIcon from "../assets/Images/images/back1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import googleLogo from "../assets/Images/images/gmail/google.png";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbarhome from "../navbarhome/navbarhome";


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
  const [showResetOTP, setShowResetOTP] = useState(false);
  const [showResendOTPForm, setShowResendOTPForm] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  // const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [loginOption, setloginOption] = useState("");

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
  // const handleLogin = async (loginOption, email, mobile, password) => {
  //   // if (!termsChecked) {
  //   //   setErrorMessage("Please agree to the terms and conditions");
  //   //   return;
  //   // }
  //   try {
  //     console.log("email - ", email);
  //     const response = await fetch(`https://quizifai.com:8010/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         login_option: loginMethod,
  //         email_or_mobile: loginMethod === "email" ? email : mobile,
  //         password: password,
  //       }),
  //     });
  //     const responseData = await response.json();
  //     console.log("API Response:", responseData);
  //     console.log(responseData);

  //     console.log("User ID:", responseData[0].user_id[0]);
  //     console.log("User Name:", responseData[0].user_name);
     
  //     // Store user_id and user_name in localStorage
  //     localStorage.setItem('user_id', responseData[0].user_id[0]);
  //     localStorage.setItem('user_name', responseData[0].user_name)
    

  //     {
  //       /*const userId = responseData[0].user_id[0]; 
  //     console.log('User ID:', userId);
      
     
  //     sessionStorage.setItem('userId', userId);*/
  //     }

  //     if (response.ok) {
  //       if (
  //         Array.isArray(responseData) &&
  //         responseData[0] &&
  //         responseData[0].response === "fail"
  //       ) {
  //         setErrorMessage(
  //           responseData[0].message ||
  //             "An unknown error occurred while logging in."
  //         );
  //         console.error(errorMessage);
  //       } else if (
  //         typeof responseData === "object" &&
  //         responseData.response === "fail"
  //       ) {
  //         setErrorMessage(
  //           responseData.data || "An unknown error occurred while logging in."
  //         );
  //         console.error(errorMessage);
  //       }else if (
     
  //         responseData.response === "fail" && responseData.data ==="Mobile Number is incorrect or account doesn't exist pls sinup." ) {
  //         setErrorMessage(
  //           responseData.data || "Mobile Number is incorrect or account doesn't exist pleass signup."
  //         );
  //         console.error(errorMessage);
  //       }  else if (responseData.response === "success") {
  //         // const userId = responseData.data.user_id;
  //         // sessionStorage.setItem('userId', userId);

  //         // const userName = responseData.response.user_name.user_id;
  //         // sessionStorage.setItem('userName', userName);
  //         // // sessionStorage.setItem('userid', userId);
  //         // navigate("/dashboard");
          
          
  //       } else {
  //         setErrorMessage("");
  //         navigate("/dashboard");
  //         console.log("Login successful!");
  //       }
  //     } else if (responseData.data === "Mobile Number is incorrect or account doesn't exist pls sinup.") {
  //       setErrorMessage("Mobile Number is incorrect or account doesn't exist. Please sign up.");
  //     } else {
  //       setErrorMessage(
  //         responseData.message || "An unknown error occurred while logging in."
  //       );
  //       console.error(errorMessage);
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setErrorMessage("An error occurred while logging in.");
  //   }
  // };
  const handleLogin = async (loginOption, email, mobile, password) => {
    // if (!termsChecked) {
    //   setErrorMessage("Please agree to the terms and conditions");
    //   return;
    // }
    try {
      console.log("email - ", email);
      const response = await fetch(`https://quizifai.com:8010/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_option: loginMethod,
          email_or_mobile: loginMethod === "email" ? email : mobile,
          password: password,
        }),
      });
  
      const responseData = await response.json();
      console.log("API Response:", responseData);
  
      if (response.ok) {
        if (Array.isArray(responseData) && responseData[0]) {
          if (responseData[0].response === "fail") {
            const errorMessage = responseData[0].message || "An unknown error occurred while logging in.";
            setErrorMessage(errorMessage);
            console.error(errorMessage);
          } else {
            // Assuming successful response structure in array form
            localStorage.setItem('user_id', responseData[0].user_id[0]);
            localStorage.setItem('user_name', responseData[0].user_name);
            localStorage.setItem('occupation_name', responseData[0].occupation_name);

            setErrorMessage("");
            navigate("/dashboard");
            console.log("Login successful!");
          }
        } else if (typeof responseData === "object" && responseData.response === "fail") {
          const errorMessage = responseData.data || responseData.message || "An unknown error occurred while logging in.";
          if (responseData.data === "Email is incorrect or account doesn't exist.") {
            setErrorMessage("Email is incorrect or account doesn't exist. Please sign up.");
          } else if (responseData.data === "Mobile Number is incorrect or account doesn't exist pls sinup.") {
            setErrorMessage("Mobile Number is incorrect or account doesn't exist. Please sign up.");
          } else if (responseData.message === "Email is already registered but not verified. Please verify your email and try again.") {
            setErrorMessage("Email is already registered but not verified. Please verify your email and try again.");
          } else {
            setErrorMessage(errorMessage);
          }
          console.error(errorMessage);
        } else if (responseData.response === "success") {
          // Assuming successful response structure in object form
          localStorage.setItem('user_id', responseData.data.user_id);
          localStorage.setItem('user_name', responseData.data.user_name);
          setErrorMessage("");
          navigate("/dashboard");
          console.log("Login successful!");
        } else {
          setErrorMessage("An unknown error occurred while logging in.");
          console.error("An unknown error occurred while logging in.");
        }
      } else {
        setErrorMessage(responseData.message || "An unknown error occurred while logging in.");
        console.error(responseData.message || "An unknown error occurred while logging in.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };
  
  
  const handleForgotPasswordSubmit = () => {
    // const forgotOption = email.includes("@") ? "email" : "mobile";
    // Prepare the request body
    const requestBody = JSON.stringify({
      Forogot_option:  loginMethod,
      email_or_mobile:loginMethod === "email" ? email : mobile,
    });

    // Make a POST request to the forgot password endpoint using fetch
    fetch("https://quizifai.com:8010/forgotpassword", {
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
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      // Check if response indicates success
      if (data.response === "success") {
        console.log("Email Sent Successfully");
        // Handle success response
        setShowThankYou(true); 
        navigate("/resetpassword");// Set state to show thank you message or handle as per your requirement
      } else {
        // Handle other response scenarios
        console.error("Unexpected response:", data);
        alert(data.response)
      }
    })
    .catch((error) => {
      // Handle error
      console.error("Error occurred:", error);
    });
};

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // const handleMobileChange = (event) => {
  //   setMobile(event.target.value);
  // };
  const handleBackToDashboard = () => {
    navigate("/signup");
  };
  return (
    <div>
        <Navbarhome/>
      <div className="container" style={{display:"flex"}}>
        <div className={styles.leftSection}>
          <div className={styles.logo1}>
            <img src={quizifailogo} alt="Logo"  width={500} height={500}
               style={{marginTop:"20px"}}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          {!showForgotPassword ? (
            <>
              <div className={styles.loginHeader}>
                <h1 className={styles.loginTitle}>Login</h1>
                {/* <p className={styles.loginDescription}>
                  Login by using the method you registered
                </p> */}
              </div>
              <div className={styles.totalBox1}>
              <div className={styles.formContainer1}>
              {/* <div className={styles.toggleOptions}>
                <label className={styles.toggleLabel}>
                  <input
                    type="radio"
                    name="contactMethod"
                    className={`${styles.toggleRadio} ${styles.greyScale}`}
                    value="email"
                    checked={loginMethod === "email"}
                    onChange={() => handleLoginMethodChange("email")}
                  />
                  <div className={styles.icon1}>
                    <img src={icon1} alt="Logo" width={24} height={24} />
                  </div>
                  Email
                </label>

                <label className={styles.toggleLabel}>
                  <input
                    type="radio"
                    name="contactMethod"
                    className={`${styles.toggleRadio} ${styles.greyScale}`}
                    value="mobile"
                    checked={loginMethod === "mobile"}
                    onChange={() => handleLoginMethodChange("mobile")}
                  />
                  <div className={styles.icon2}>
                    <img src={icon2} alt="Logo" width={30} height={30} />
                  </div>
                  Mobile
                </label>

                {/*<label className={styles.toggleLabel}>
                  <input
                    type="radio"
                    name="contactMethod"
                    className={`${styles.toggleRadio} ${styles.greyScale}`}
                    value="gmail"
                    checked={loginMethod === "gmail"}
                    onChange={() => handleLoginMethodChange("gmail")}
                  />
                  <div className={styles.icon3}>
                    <img src={icon3} alt="Logo" width={22} height={17} />
                  </div>
                  Gmail
                </label>
          */}
              {/* </div>  */}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="outlined"
                          className={styles.inputField}
                          style={{ width: "325px", height: "50px" }}
                          InputLabelProps={{
                            style: { fontFamily: "poppins" },
                          }}
                          InputProps={{
                            style: {
                              backgroundImage: `url('/images/email/mail.png')`,
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
                            endAdornment: (
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

                  {/*<div
                    className={styles.captcha}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "145px",
                        height: "20px",
                        borderRadius: "20px",
                        border: "1px solid #223F80",
                        padding: "10px",
                        marginRight: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                        Captcha
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ cursor: "pointer" }}>
                        <FaSyncAlt size={12} />
                      </div>

                      <div style={{ cursor: "pointer" }}>
                        {soundOn ? (
                          <BsFillVolumeUpFill
                            size={18}
                            onClick={() => setSoundOn(!soundOn)}
                          />
                        ) : (
                          <BsFillVolumeMuteFill
                            size={20}
                            onClick={() => setSoundOn(!soundOn)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={styles.captchaText}
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "30px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Type the word above"
                      style={{
                        width: "240px",
                        height: "25px",
                        backgroundColor: "#F0EFFF",
                        borderRadius: "5px",
                        padding: "5px",
                        fontFamily: "Poppins",
                        textAlign: "left",
                        border: "none",
                      }}
                    />

                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#223F80",
                        marginLeft: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>{" "}
                    </div>
                      </div>*/}
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
              {/* <div className={styles.checkboxContainer}>
              <input
                  type="checkbox"
                  id="termsCheckbox"
                  className={styles.checkboxInput1}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  // checked={termsChecked}
                  // onChange={() => setTermsChecked(!termsChecked)}
                />
            
             
                <span className={styles.termsText}>
                  I agree with the terms and conditions
                </span>
              </div> */}
          {/* <div className={styles.checkbox1}>
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  className={styles.checkboxInput1}
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                />
                <span className={styles.span}>
                  {" "}
                  I agree with the   <a className={styles.terms} href="/termsandconditions">
                        terms and conditions
                      </a>
                </span>
                {/* <p className={styles.span2} > and Please read over children police</p> */}
             
                {/* <label
                  htmlFor="termsCheckbox"
                  className={styles.checkboxLabel}
                  style={{ marginRight: "80px", marginLeft: "20px"  }}
                >
                  I agree with the terms and conditions
                </label> */}
              {/* </div>  */}
              {errorMessage && (
                <>
                  {console.log("Error message:", errorMessage)}
                  <p className={styles.displayError}>{errorMessage}</p>
                </>
              )}
              <button
                onClick={() =>
                  handleLogin(loginMethod, email, mobile, password)
                }
                className={styles.loginButton}
              >
                Login
              </button>
              </div>
              </div>
              {/* {loginMethod === "mobile" && (
                <button
                  onClick={handleResendOTP}
                  className={styles.resendButton}
                >
                  Resend OTP
                </button>
              )} */}
            
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
{/*                     
                          <input
                            type="checkbox"
                            id="termsCheckbox"
                            className={styles.checkboxInput}
                            checked={termsChecked}
                            onChange={() => setTermsChecked(!termsChecked)}
                          />
                          <label
                            htmlFor="termsCheckbox"
                            className={styles.checkboxLabel}
                          ></label>
                       
                        <span className={styles.termsText}>
                          I agree with the terms and conditions
                        </span> */}
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
              ) : (
                // Thank You message

                <div
                  className={styles.thankYouMessage}
                  style={{ marginLeft: "50px" }}
                >
                  <div
                    className={styles.goBackButton1}
                    style={{ marginTop: "100px" }}
                    onClick={handleGoBack}
                  >
                    <img
                      src={forgotPasswordIcon}
                      alt="Go Back"
                      width={12}
                      height={17}
                    />
                    <span>Go Back</span>
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
                      Thank You!
                    </p>
                    <p
                      className={styles.secondParagraph}
                      style={{
                        color: "#454B60",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Please check your email for further <br></br>instructions.
                    </p>
                  </div>
                  <div
                    className={styles.checkboxContainer1}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      className={styles.checkboxInput}
                      style={{ marginRight: "5px", marginTop: "5px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="termsCheckbox"
                        className={styles.checkboxLabel}
                        style={{
                          color: "#454B60",
                          fontSize: "16px",
                          fontWeight: 700,
                          marginTop: "40px",
                          marginBottom: "100px",
                        }}
                      >
                        Didn't get the reset email?
                      </label>
                    </div>
                  </div>
                  <div
                    className={styles.buttonContainer}
                    styles={{ marginTop: "200px" }}
                  >
                    <button
                      className={`${styles.submitButton} ${styles.button1}`}
                      style={{
                        width: "144px",
                        height: "48px",
                        marginRight: "40px",
                        fontFamily: "poppins",
                      }}
                    >
                      Resend
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
