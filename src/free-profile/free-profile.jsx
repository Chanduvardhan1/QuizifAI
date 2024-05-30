// profile.js

import React, { useState, useEffect } from "react";
//import { useRouter } from 'next/router';
import Navigation from "../navbar/navbar.jsx";
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
import topicIcon from "../assets/Images/images/dashboard/topicNew.png";
import timerIcon from "../assets/Images/images/dashboard/timerNew.png";
import difficultyIcon from "../assets/Images/images/dashboard/difficultyLevelNew.png";
import img1Icon from "../assets/Images/images/dashboard/img1New.png";
import notifyIcon from "../assets/Images/images/dashboard/notify.png";
import img2Icon from "../assets/Images/images/dashboard/img2New.png";
import img3Icon from "../assets/Images/images/dashboard/img3New.png";
import img4Icon from "../assets/Images/images/dashboard/newImg4.png";
import img5Icon from "../assets/Images/images/dashboard/img5New.png";
import todayTopicIcon from "../assets/Images/images/dashboard/todayTopic.png";
import subTopicIcon from "../assets/Images/images/dashboard/subTopic.png";
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

  // const BasicProgressBar = ({ currentValue, maxValue }) => (
  // <progress value={currentValue} max={maxValue}>{currentValue}%</progress>
  //);

  const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress value={currentValue} max={maxValue} style={{ width: "100px" }}>
      {currentValue}%
    </progress>
  );

  const handleSubmit = async () => {
    const payload = {
      user_id: userId,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      user_email: email,

      user_phone_number: parseInt(mobileNumber === "" ? "0" : mobileNumber),
      gender: gender,
      date_of_birth: dob,
      user_address_line_1: address1,
      user_address_line_2: address2,
      occupation: professions,
      preferred_login_method: preferredLoginMethod,
      access_key: accesskey,
      user_role: userrole,
      user_type: usertype,
      user_org_id: 0,
      active_flag: true,
      user_address_id: 0,
      user_location_id: 0,
      access_key: null,
      otp: Otp,
      display_name: displayname,
    };

    try {
      const response = await fetch("https://quizifai.com:8010/edt_prfl_dtls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const responseData = await response.json();
      console.log(responseData);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    // Fetch user_id from local storage
    const userId = localStorage.getItem("user_id");

    // Make a POST request to the API endpoint
    fetch("https://quizifai.com:8010/get_prfl_dtls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful response
        setProfileData(data);
        setFirstName(data.data.first_name);
        setMiddleName(data.data.middle_name);
        setLastName(data.data.last_name);
        setGender(data.data.gender);
        setProfession(data.data.occupation_name);
        setDob(data.data.date_of_birth);

        setPostalCode(data.data.pin_code);
        setAddress1(data.data.user_address_line_1);
        setAddress2(data.data.user_address_line_2);
        setCity(data.data.location_name);
        setState(data.data.state_name);
        setCountry(data.data.country_name);
        setEmail(data.data.user_email);
        setMobileNumber(data.data.user_phone_number);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching profile data:", error);
      });
  }, []);
  // useEffect(() => {

  //   const fetchQuizData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://quizifai.com:8010/landing_page?user_id=1`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch quiz data");
  //       }
  //       const data = await response.json();
  //       setTimeData(data.time_spent);
  //       setLatestResults(data.latest_results);
  //       setWeeklyQuizCount(data.weekly_quiz_count);
  //       setAverageScorePercentage(data.average_score_percentage);
  //       setNotAttemptedQuizzes(data.latest_not_attempted_quizzes);
  //       setAttemptedQuizzes(data.latest_attempted_quizzes);
  //       setTopScoredQuizzes(data.top_scored_quizzes);
  //     } catch (error) {
  //       console.error("Error fetching quiz data:", error);
  //     }
  //   };

  //   fetchQuizData();
  // }, []);

  const [pincode, setpincode] = useState("");
  const [countryname, setcountryname] = useState("");
  const [statename, setstatename] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [responseData, setResponseData] = useState(null);

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://quizifai.com:8010/location_details/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pincode: pincode,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setResponseData(data); // Set response data in state
      console.log(data); // Displaying response in console
      setErrorMessage(""); // Clear any previous error message
      if (
        data &&
        data.data &&
        Array.isArray(data.data[0]) &&
        data.data[0].length > 0
      ) {
        setstatename(data.data[0][0].Statename);
        setcountryname(data.data[0][0].country_name);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to submit form. Please try again.");
    }
  };
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user name from local storage
    const storedUserName = localStorage.getItem("user_name");
    setUserName(storedUserName);
  }, []);
  
  return (
    <div className={styles.container}>
      {/*<Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
  </Head>*/}
      <Navigation />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome {userName}</p>
          <div className={styles.headerRight}>
            <div>{getFormattedDate()}</div>
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div>
            <div className={styles.notificationsettingsContainer}>
              <img
                src={notificationsettings}
                alt="notificationsettings Icon"
                className={styles.notificationsettings}
              />
            </div>
          </div>
        </div>
        <div className={styles.contentContainer} style={{ marginLeft: "80px" }}>
          <div className={styles.imgAndTextContainer}>
            <div className={styles.profileimgContainer}>
              <img
                src={profileimg}
                alt="img"
                className={styles.profileimg}
                style={{ width: "113px", height: "110px" }}
              />
            </div>

            <div className={styles.contentContainer}>
              <div
                className={styles.textContainer}
                style={{ marginLeft: "150px", marginTop: "-105px" }}
              >
                <div className={styles.textLine1}>{profession} </div>
                <div className={styles.textLine3}>
                  (<span className={styles.textLine2}>Plan of the Subscription</span>){" "}
                </div>
                <div className={styles.textLine3}>
                  No. days left in Subscription/ Free
                </div>
              </div>
            </div>
          </div>

          <div className={styles.additionalTextContainer1}>
            <div
              className={styles.contentContainer1}
              style={{ marginTop: "20px", marginLeft: "40px" }}
            >
              <div className={styles.textAndimgContainer1}>
                <div className={styles.textContainer1}>
                  <p className={styles.textLines1}>You Ranked</p>
                </div>
                <div className={styles.imgContainer2}>
                  <img
                    src={rankingimg}
                    alt="img"
                    className={styles.Rankingimg}
                    style={{ width: "60px", height: "40px" }}
                  />
                </div>
              </div>
              <div className={styles.textAndimgContainer2}>
                <div className={styles.textContainer1}>
                  <p
                    className={styles.textLines3}
                    style={{ marginTop: "-20px" }}
                  >
                    002
                  </p>
                  <p
                    className={styles.textLines4}
                    style={{ marginTop: "-20px" }}
                  >
                    in last 30 days
                  </p>
                </div>
              </div>
              <div className={styles.imgContainer1}>
                <img
                  src={infoph}
                  alt="img"
                  className={styles.infoimg}
                  style={{ width: "10px", height: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"

                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                // label="First Name"
                // style={{ width: "150px", height: "50px" }}
                // InputLabelProps={{
                //   style: { fontFamily: "poppins" },
                // }}
                // InputProps={{
                //   style: {
                //     // backgroundImage: `url('/images/email/mail.png')`,
                //     // backgroundSize: "19px 16px",
                //     // backgroundPosition: "295px center",
                //     // backgroundRepeat: "no-repeat",
                //     width: "150px",
                //     height: "50px",
                //     backgroundColor: "white",
                //     border: "none",
                //     fontFamily: "poppins",
                //     paddingLeft: "0px",
                //     borderRadius: "10px",
                //   },
                //   autoComplete: "off",
                // }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
         
          </div>

          <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {/* <option  className={styles.SelectGender} value="">Select Gender</option> */}
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                placeholder="Select your date of birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
               <div
                    className={styles.searchicon}
                    onClick={handleSubmit1}
                    style={{
                      backgroundImage: `url('images/signup/LineIcon.png'),url('images/signup/searchIcon.png')`,
                      backgroundRepeat: "no-repeat",
                      width: "40px",
                      height: "25px",
                      right: "-110px",
                      top:"-29px",
                      position: "relative",
                      // border: "1px solid #c2c2c2",
                      backgroundPosition:
                        "0px center, right 10px center, right 40px center",
                      cursor: "pointer",
                    }}
                  ></div>
              {/* <div
                    className={styles.searchicon}
                    onClick={handleSubmit1}
                    style={{
                      backgroundImage: `url('images/signup/LineIcon.png'),url('images/signup/searchIcon.png')`,
                      backgroundRepeat: "no-repeat",
                      width: "40px",
                      height: "20px",
                      top: "450px",
                      left: "190px",

                      position: "absolute",
                     

                      // border: "1px solid #c2c2c2",
                      backgroundPosition:
                        "0px center, right 10px center, right 40px center",
                      cours: "pointer",
                    }}
                  ></div> */}
            </div>
            {/* <div className={styles.inputGroup}>
              <label htmlFor="address1">Address Line 1</label>
              <input
                type="text"
                id="address1"
                placeholder="Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="address2">Address Line 2</label>
              <input
                type="text"
                id="address2"
                placeholder="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div> */}
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {/* <option value=""  disabled selected>District</option> */}
               {responseData &&
                            responseData.data &&
                            Array.isArray(responseData.data[0]) &&
                            [
                              ...new Set(
                                responseData.data[0].map(
                                  (location) => location.Districtname
                                )
                              ),
                            ].map((districtName, index) => (
                              <MenuItem key={index} value={districtName}>
                                {districtName}
                              </MenuItem>
                            ))}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                placeholder="State Name"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
               {/* <option value=""  disabled selected>State</option> */}
               {responseData &&
                              responseData.data &&
                              Array.isArray(responseData.data[0]) &&
                              [
                                ...new Set(
                                  responseData.data[0].map(
                                    (location) => location.Statename
                                  )
                                ),
                              ].map((stateName, index) => (
                                <MenuItem key={index} value={stateName}>
                                  {stateName}
                                </MenuItem>
                              ))}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Country Name"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {/* <option value=""  disabled selected>Country</option> */}
              {responseData &&
                              responseData.data &&
                              Array.isArray(responseData.data[0]) &&
                              [
                                ...new Set(
                                  responseData.data[0].map(
                                    (location) => location.country_name
                                  )
                                ),
                              ].map((countryName, index) => (
                                <MenuItem key={index} value={countryName}>
                                  {countryName}
                                </MenuItem>
                              ))}
            </div>
          </div>

          {/* <div className={styles.toggleButtonsContainer}>
            {/* <button
              className={`${styles.toggleButton} ${
                selectedButton === "Email" && styles.selected
              }`}
              onClick={() => handleButtonClick("Email")}
            >
              <img src={EmailIcon} alt="Email Icon" className={styles.icon1} />{" "}
              Email
            </button> */}
            {/* <button
          className={`${styles.toggleButton} ${selectedButton === 'Gmail' && styles.selected}`}
          onClick={() => handleButtonClick('Gmail')}
        >
         <img src={GmailIcon} alt="Gmail Icon" className={styles.icon2} /> Gmail
        </button> */}
            {/* <button
              className={`${styles.toggleButton} ${
                selectedButton === "Mobile" && styles.selected
              }`}
              onClick={() => handleButtonClick("Mobile")}
            >
              <img
                src={MobileIcon}
                alt="Mobile Icon"
                className={styles.icon3}
              />{" "}
              Mobile
            </button> */}
          {/* </div>  */}

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              {/* <label htmlFor="email">Email</label> */}
              <button
                className={`${styles.toggleButton} ${
                  selectedButton === "Email" && styles.selected
                }`}
                onClick={() => handleButtonClick("email")}
              >
                <img
                  src={EmailIcon}
                  alt="Email Icon"
                  className={styles.icon1}
                />{" "}
                Email
              </button>
              <input
                type="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              {/* <label htmlFor="mobileNumber">Mobile Number</label> */}
              <button
                className={`${styles.toggleButton} ${
                  selectedButton === "Mobile" && styles.selected
                }`}
                onClick={() => handleButtonClick("Mobile")}
              >
                <img
                  src={MobileIcon}
                  alt="Mobile Icon"
                  className={styles.icon3}
                />{" "}
                Mobile
              </button> 
              <input
                type="tel"
                id="mobileNumber"
                placeholder="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <div className={styles.buttonContainer}>
                <button className={styles.customButton}>Verify</button>
                <button className={styles.customButton} onClick={handleSubmit}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.box}>
        <div className={styles.horizontalBoxes}>
            <div className={styles.contentWrapper}>
              <div className={styles.resultWrapper}>
                <div className={styles.latestResult}>
                  Latest Result
                  <div className={styles.resultInfo}>
                    <div className={styles.infoLine}>
                      <span
                        className={styles.info}
                        style={{
                          fontSize: "10px",
                          color: "grey",
                          marginTop: "20px",
                          marginLeft: "10px",
                        }}
                      >
                        Date -<span className={styles.title}>Title</span> -
                        Topic
                      </span>
                      <span
                        style={{
                          marginLeft: "10px",

                          width: "100px",
                          height: "2px",
                          fontSize: "10px",
                        }}
                      >
                        <Progress percent={25} />
                      </span>
                    </div>
                    <hr className={styles.divider} />
                    <div className={styles.infoLine}>
                      <span
                        className={styles.info}
                        style={{
                          fontSize: "10px",
                          color: "grey",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                      >
                        Date -<span className={styles.title}>Title</span> -
                        Topic
                      </span>
                      <span
                        style={{
                          marginLeft: "10px",
                          marginTop: "-10px",
                          width: "100px",
                          height: "2px",
                          fontSize: "10px",
                        }}
                      >
                        <Progress percent={44} />
                      </span>
                    </div>
                    <hr className={styles.divider} />
                    <div
                      className={styles.infoLine}
                      style={{ fontSize: "10px" }}
                    >
                      <span
                        className={styles.info}
                        style={{
                          fontSize: "10px",
                          color: "grey",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                      >
                        Date -<span className={styles.title}>Title</span> -
                        Topic
                      </span>
                      <span
                        style={{
                          marginLeft: "10px",
                          marginTop: "-10px",
                          width: "100px",
                          height: "2px",

                          fontSize: "10px",
                        }}
                      >
                        <Progress percent={40} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.resultWrapper}>
              <div className={styles.timeSpent}>
                Time Spent on Quiz
                <span className={styles.moreButton}>Last week</span>
                <div className={styles.progressBars}>
                  <div className={styles.progressBar}>
                    <div className={styles.day}>Mon</div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ height: "20%" }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.day}>Tue</div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ height: "30%" }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.day}>Wed</div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ height: "50%" }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.day}>Thu</div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ height: "70%" }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.day}>Fri</div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ height: "40%" }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.day}>Sat</div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ height: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.day}>Sun</div>
                    <div className={styles.progress}>
                      <div
                        className={styles.progressFill}
                        style={{ height: "80%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.resultWrapper}>
              <div className={styles.rewards}>Rewards</div>
              <div className={styles.sentencesWrapper}>
                {/* Add five <div> tags for the sentences */}
        {/* <div className={styles.sentence}>
                  1. Top Ranked in last week
                </div>
                <div className={styles.sentence}>2. Won four Vouchers</div>
                <div className={styles.sentence}>3. Won four Vouchers</div>
                <div className={styles.sentence}>4. Won four Vouchers</div>
                <div className={styles.sentence}>5. Won four Vouchers</div>
              </div>
            </div>
          </div>
        </div>  */}

        {/* <div className={styles.contentWrapper1}>
          <div className={styles.latestQuizHeader}>
            <p>Latest Attended Quiz</p>
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}

        {/* <div className={styles.card}>
              <span className={styles.title}>
                {attemptedQuizzes[0]?.quiz_name}
              </span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  {attemptedQuizzes[0]?.description}
                </span>
                <div className={styles.additionalInfo}>
                  <div
                    className={styles.infoIcon}
                    style={{ marginTop: "10px" }}
                  >
                    <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[0]?.category}
                  </span>
                  <span className={styles.infoItem1}>
                    <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[0]?.duration}
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[0]?.complexity}
                  </span>
                  <div className={styles.iconContainer}>
                    <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>
                {attemptedQuizzes[1]?.quiz_name}
              </span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  {attemptedQuizzes[1]?.description}
                </span>
                <div className={styles.additionalInfo}>
                  <div
                    className={styles.infoIcon}
                    style={{ marginTop: "10px" }}
                  >
                    <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[1]?.category}
                  </span>
                  <span className={styles.infoItem1}>
                    <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[1]?.duration}
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[1]?.complexity}
                  </span>
                  <div className={styles.iconContainer}>
                    <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>
                {attemptedQuizzes[2]?.quiz_name}
              </span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  {attemptedQuizzes[2]?.description}
                </span>
                <div className={styles.additionalInfo}>
                  <div
                    className={styles.infoIcon}
                    style={{ marginTop: "10px" }}
                  >
                    <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[2]?.category}
                  </span>
                  <span className={styles.infoItem1}>
                    <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[2]?.duration}
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {attemptedQuizzes[2]?.complexity}
                  </span>
                  <div className={styles.iconContainer}>
                    <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.topScoredHeader}>
            <p>Top Scored Quiz</p>
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}

        {/* <div className={styles.card}>
              <span className={styles.title}>
                {topScoredQuizzes[0]?.quiz_name}
              </span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  {topScoredQuizzes[0]?.description}
                </span>
                <div className={styles.additionalInfo}>
                  <div
                    className={styles.infoIcon}
                    style={{ marginTop: "10px" }}
                  >
                    <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[0]?.topic}
                  </span>
                  <span className={styles.infoItem1}>
                    <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[0]?.duration}
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[0]?.complexity}
                  </span>
                  <div className={styles.iconContainer}>
                    <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>
                {topScoredQuizzes[1]?.quiz_name}
              </span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  {topScoredQuizzes[1]?.description}
                </span>
                <div className={styles.additionalInfo}>
                  <div
                    className={styles.infoIcon}
                    style={{ marginTop: "10px" }}
                  >
                    <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[1]?.topic}
                  </span>
                  <span className={styles.infoItem1}>
                    <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[1]?.duration}
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[1]?.complexity}
                  </span>
                  <div className={styles.iconContainer}>
                    <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>
                {topScoredQuizzes[2]?.quiz_name}
              </span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  {topScoredQuizzes[2]?.description}
                </span>
                <div className={styles.additionalInfo}>
                  <div
                    className={styles.infoIcon}
                    style={{ marginTop: "10px" }}
                  >
                    <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[2]?.topic}
                  </span>
                  <span className={styles.infoItem1}>
                    <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[2]?.duration}
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    {topScoredQuizzes[2]?.complexity}
                  </span>
                  <div className={styles.iconContainer}>
                    <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  */}
      </div>
      <div className={styles.logout}>
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <span style={{ marginRight: "10px" }}>Logout</span>
          <img
            src={logoutArrowIcon}
            alt="Logout Icon"
            style={{ width: "30px", height: "20px", marginLeft: "130px" }}
          />
        </div>
        <div
          style={{
            textAlign: "left",
            marginTop: "30px",
            fontFamily: "Poppins",
            fontSize: "15px",
            fontWeight: 700,
            lineHeight: "23px",
            letterSpacing: "0em",
            color: "#214082",
            marginLeft: "20px",
          }}
        >
          You’ve completed 10 <br></br>Quiz’s this week of <br></br>average
          score of 85%
        </div>
        <div style={{ textAlign: "left", marginLeft: "20px" }}>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <span
              style={{
                fontSize: "15px",
                color: "#000000",
                fontWeight: 500,
                marginRight: "10px",
              }}
            >
              Notification
            </span>
            <img
              src={notifyIcon}
              alt="Notify Icon"
              className={styles.notifyIcon}
              style={{ marginLeft: "120px" }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFE8EE",
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={todayTopicIcon}
                  alt="Scored Icon"
                  style={{ width: "15px", height: "15px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    marginRight: "15px",
                  }}
                >
                  Today - Topic
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#9696BB",
                    marginTop: "3px",
                  }}
                >
                  23 Jan 2024, Tuesday
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#E4EBFF",
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={subTopicIcon}
                  alt="Time Spent Icon"
                  style={{ width: "17px", height: "13px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 500 }}>
                  Topic - Sub Topic Title
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#9696BB",
                    marginTop: "3px",
                    marginRight: "30px",
                  }}
                >
                  24 Jan 2024, Wednesday
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#E4EBFF",
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  marginRight: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={subTopicIcon}
                  alt="Time Spent Icon"
                  style={{ width: "17px", height: "13px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 500 }}>
                  Topic - Sub Topic Title
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#9696BB",
                    marginTop: "3px",
                    marginRight: "30px",
                  }}
                >
                  24 Jan 2024, Wednesday
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeProfile;
