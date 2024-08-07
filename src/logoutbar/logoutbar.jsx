// LogoutBar.js

import React , { useContext }from "react";
//import Image from "next/image";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import styles from "./dashboard.module.css";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import user2Icon from "../assets/Images/images/dashboard/user2.png";
import userIcon from "../assets/Images/images/dashboard/user.png";
import expand from "../assets/Images/images/dashboard/expand.png";
import ranks from "../assets/Images/images/dashboard/ranks.png";
import infinity from "../assets/Images/images/dashboard/infinity.png"
import questionmark from "../assets/Images/images/dashboard/questionmark.png";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import rocket from "../assets/Images/images/dashboard/rocket.png";
import { AuthContext } from "../Authcontext/AuthContext.jsx"


const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30; 
  const maxValue2 = 80; 


const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );

  

const LogoutBar = (data) => {
   const hasData = data && data.id;
  const navigate = useNavigate();


  // const handleBackToLogin = () => {
  //   navigate("/login");
  // };

 const handleToProfile =() =>{
  navigate("/free-profile");
 } 
  
 
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userName, setUserName] = useState('');
  // const [occupation, setOccupation] = useState(localStorage.getItem("occupation_name"));
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("")
  const [globalRank, setGlobalRank] = useState("");
  const [globalscore, setGlobalscore] = useState("");
  const [totalQuizzes, setTotalQuizzes] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [averageScorePercentage, setAverageScorePercentage] = useState("");
  const [registeredOn, setRegisteredOn] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [passwordChanged, setPasswordChanged] = useState("");
  const [subscriptionStartDate, setSubscriptionStartDate] = useState('');
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('');
  const [remainingDays, setRemainingDays] = useState('');
  const [otherOccupation, setOtherOccupation] = useState("");
  // const { user, logout } = useContext(AuthContext);
  const { isAuthenticated, authToken, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    const fetchQuizData = async () => {
      console.log("User ID:", userId);

      try {
       
        const response = await fetch(
          `https://dev.quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({
               user_id: userId
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data:", data);

        const auditDetails = data.data[0].audit_details;
        if (auditDetails) {
          // setCity(auditDetails.location_name || "");
          setCountry(auditDetails.country_name || "");
          setGlobalRank(auditDetails.global_score_rank || "");
          setGlobalscore(auditDetails.global_score || "");
          setRegisteredOn(auditDetails.created_date || "");
          setLastLogin(auditDetails.last_login_timestamp || "");
          setPasswordChanged(auditDetails.user_password_change_date || "");

          const userDetails = auditDetails;
          setUserName(userDetails.full_name);

          const UserProfileDetails = data.data[0].user_profile_details;
          setDistrict(UserProfileDetails.district_name);
          setOccupation(UserProfileDetails.occupation_name);
          setCity(UserProfileDetails.location_name);
          setOtherOccupation(UserProfileDetails.other_occupation_name);

          const subscriptionDetails = auditDetails.subscription_details && auditDetails.subscription_details[0];
          if (subscriptionDetails) {
            setSubscriptionStartDate(subscriptionDetails.start_date || "");
            setSubscriptionEndDate(subscriptionDetails.end_date || "");
            setRemainingDays(subscriptionDetails.remaining_days || "");
          } else {
            console.error("No subscription details found.");
          }
        } else {
          console.error("No user details found.");
        }

        const usermetrics = data.data[0].user_metrics;
        if (usermetrics) {
          setTotalQuizzes(usermetrics.countofquizes || 0);
          setTotalMinutes(usermetrics.total_minutes || 0);
          setAverageScorePercentage(usermetrics.average_total_percentage || 0);
          // setGlobalRank(usermetrics.global_score_rank || "");
        } else {
          console.error("No user metrics found.");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId,isAuthenticated,authToken]); 
  useEffect(() => {
    const handleWindowClose = () => {
      fetch("https://quizifai.com:8010/usr_logout/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Logout successful:", data))
        .catch((error) => console.error("Error:", error));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleWindowClose);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  const handleBackToLogin = () => {
    // Retrieve the authentication token from AuthContext or localStorage
    const authToken = localStorage.getItem('authToken') || null;
  
    fetch('https://dev.quizifai.com:8010/usr_logout/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include the authentication token
      },
      body: JSON.stringify({
        user_id: userId, // Ensure user.userId is available
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Logout response:', data);
        if (data.response === 'success') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user_id');
          localStorage.removeItem('user_role');
          localStorage.removeItem('password');
          logout(); // Clear the token from AuthContext
          navigate("/login");// Redirect to login page
        } else {
          console.error('Logout failed:', data.response_message);
          // Handle unsuccessful logout (optional)
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
        // Handle errors appropriately
      });
  };
  
  return (
    <div className={styles.logout}>
     <div style={{ marginTop: "-20px", display: "flex", alignItems: "center" , marginLeft:"20px",position:"relative",top:"25px"}}> 
       <div>
       <img
    src={LogoutIcon}
    onClick={handleBackToLogin}
    alt="Logout Icon"
    style={{ width: "20px",
             height: "20px",
             cursor:"pointer",
            marginLeft:"155px",
          cursor:"pointer" }}
  />
  <span style={{ marginRight: "5px",fontSize:"10px",position:"relative",left:"150px",top:"-5px" }}>Logout</span>
</div>

  </div>

       <div style={{ position: "relative"}}>
          
        <img
          src={profileimg}
          alt="Background Image"
          style={{ display: "block", marginLeft: "45px", width: "113px",
            height:"110px"}}
        />

{/* <img
          src={profileimg}
          alt="Foreground Image"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            paddingRight:"9px",
            width: "113px",
    height:"110px"
          }}
        /> */}
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "15px", marginBottom: "5px", fontWeight: 600 ,color:"#002366"}}>
            {userName}
          </p>
          <p
            style={{
              fontSize: "12px",
              margin: "0",
              fontWeight: 500,
              color:"#EF5130",
              marginTop:"-5px",
            }}
          >
                 {occupation === "Other" ? otherOccupation : occupation}

          </p>

          <div className="flex">
          <p
          style={{
            fontSize: "12px",
            margin: "0",
            fontWeight: 500,
            color: "#5E81F4",
            marginLeft: "75px",
          }}>
            User ID : {userId}
          </p>
          <div className="relative group inline-block">
          <img 
          src={questionmark}
          alt="question mark icon"
          style={{
            height: "15px",
            width: "15px",
            cursor:"pointer",
            marginLeft:"5px",
          }}
          />
         <span className="hidden group-hover:inline-block h-[70px] absolute -left-[150px] -top-[15px] -translate-x-1/2 bottom-full mb-1 w-[300px] px-2 py-1 bg-black text-white text-xs rounded">
          This is your unique identification number. It will help our support team to identify your account when you need assistance through QuizifAI's support channels.</span>
          </div>
          </div>
         

          <div className="text-[13px] ml-[30px] text-[#002366] mx-5">
          <p>{city}</p><br/>
          <div className="flex -mt-[20px] pl-2">
          <p className="pl-4">{district} ,</p>
          <p className="pl-1">{country}</p>
          </div>
          </div>
         
         <div className="h-[15px] w-[15px] rotate-[90deg] cursor-pointer ml-[195px]">
          <img className="-mt-1" onClick={handleToProfile} src={expand}/>
         </div>

         
          <div className="h-[5px] w-full bg-white mt-2"></div>

          <div style={{ marginTop: "0px" }}>
            
            <div className="flex justify-center">
              <img className="h-[60px] w-[60px]  mt-1" src={ranks}/>
              <div className=" flex flex-col">
              <div className=" flex items-center gap-[5px]">
              <p className="text-[25px] text-[#5E81F4]  text-start mt-1 font-bold">{globalRank}</p>
              <h1 className="relative font-Poppins text-[13px]">Global rank</h1>
              </div>
              <div className="flex items-center gap-[5px]">
              <p className="text-[20px] text-[#5E81F4]  text-start  font-bold">{globalscore}</p>
              <h1 className="relative font-Poppins text-[13px]">Global Score</h1>
              </div>
              </div>
            </div>
            <div className="h-[5px] w-full bg-white mt-[10px]"></div>

          <div className="flex">
            <span className="text-[25px] text-[#E97132] ml-[25px] mt-[5px] font-semibold">{totalQuizzes}</span>
            <h1 className="text-[12px] mt-[20px] ml-[5px] font-medium">Quizzes</h1>
          </div>
          <div className="flex -mt-[15px]">
            <span className="text-[25px] text-[#E97132] ml-[25px] mt-[10px] font-semibold">{totalMinutes}</span>
            <h1 className="mt-[23px] ml-[5px] text-[12px] text-nowrap font-normal">Total Minutes</h1>

          </div><div className="flex -mt-[15px]">
            <span className="text-[25px] text-[#E97132] ml-[25px] mt-[10px] font-semibold">{averageScorePercentage}%</span>
            <h1 className="mt-[23px] ml-[5px] text-[12px] font-normal">Average</h1>
          </div>
          
          {/* <div className="h-[5px] w-full bg-white mt-[10px]"></div>

          <div>
            <h1 className="font-semibold mt-[10px] text-[15px]">Public User</h1>
            <h1 className="text-[12px] mt-[5px] px-[1px]">Subscribed Date : 
              <span className="text-[#5E81F4] text-nowrap">{subscriptionStartDate}</span></h1>
            <h1 className="font-semibold -mt-[3px] text-[15px] pt-2">Subscribed</h1>
            
            <div className="flex">
            {/* <span className="text-[25px] text-[#5E81F4] ml-[20px] mt-[10px] font-semibold"></span> */}
            {/* {remainingDays > 0 ?(
              <p className="text-[13px] text-red-500 ml-[20px] mt-[3px]">{remainingDays}</p> 
            ):(             
              <img className="h-[40px] w-[35px] ml-5 -mt-2" src={infinity} />           
            )} */}
            {/* <h1 className="mt-[2px] ml-[10px] text-[13px] font-normal">days remaining</h1> */}
           {/* </div>
          </div> */}
          <div className="mt-[15px] ">
          <div className="h-[5px] w-full bg-white mt-[80px]"></div>
        <div className="ml-2 mt-[10px]">
            <h1 className="text-[13px] text-start">Registered On :<span className="text-[#5E81F4] pl-1">{registeredOn}</span></h1>
            <h1 className="text-[13px] text-start">Last Login : <span className="text-[#5E81F4]">{lastLogin}</span></h1>
            <h1 className="text-[13px] text-start">Password Changed : <span className="text-[#5E81F4]">{passwordChanged}</span></h1>
          </div>
          </div>
                 
            
          </div>
        </div>
      </div>
  );
};

export default LogoutBar;
