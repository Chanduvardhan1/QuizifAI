"use client";
import React, { useState } from "react";
// import Image from "next/image";

// Navbar-icons
import QuizifAilogo from "../../src/assets/Images/quiz-type/Quizifai 1.png";
import Dashboard from "../../src/assets/Images/quiz-type/Dashboard.png";
import Quiz from "../../src/assets/Images/quiz-type/Quiz.png";
import History from "../../src/assets/Images/quiz-type/History.png";
import Schedule from "../../src/assets/Images/quiz-type/Schedule.png";
import Notification from "../../src/assets/Images/quiz-type/Notification.png";
import QuizAdmin from "../../src/assets/Images/quiz-type/Quiz-admin.png";
import Profile from "../../src/assets/Images/quiz-type/Profile.png";
import Navigation from "../navbar/navbar.jsx";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";

// Main-Section-icons
import QuizTitle from "../../src/assets/Images/quiz-type/Quiz-Title.png";
import QuizCreatedBy from "../../src/assets/Images/quiz-type/Quiz-created-by.png";
import QuizDiscription from "../../src/assets/Images/quiz-type/Quiz-discription.png";
import HorizontalLine from "../../src/assets/Images/quiz-type/Horizontal-Line.png";
import Percentage from "../../src/assets/Images/quiz-type/Percentage.png";
import Easy from "../../src/assets/Images/quiz-type/Easy.png";
import Medium from "../../src/assets/Images/quiz-type/Medium.png";
import Complex from "../../src/assets/Images/quiz-type/Complex.png";
import Hash from "../../src/assets/Images/quiz-type/Hash.png";
import Camera from "../../src/assets/Images/quiz-type/Camera.png";
import MultipleAns from "../../src/assets/Images/quiz-type/Multiple-Answer.png";
import SubCategory from "../../src/assets/Images/quiz-type/Sub-Category.png";
import Clock from "../../src/assets/Images/quiz-type/Clock.png";
import Calender from "../../src/assets/Images/quiz-type/Calender.png";
import AiBot from "../../src/assets/Images/quiz-type/Ai-bot.png";
import Globe from "../../src/assets/Images/quiz-type/Globe.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myHistoryIcon from "../../public/myhistory.png"
import global1 from "../../src/assets/Images/dashboard/image (13).png";

import { MdOutlineCancel } from "react-icons/md";


const repoarts = () => {
      const [userId, setUserId] = useState(localStorage.getItem("user_id"));
    
   const navigate = useNavigate();
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

const  handleGlobalLeaderboard1 =() => {
    navigate('/globalleaderboard');
}

const  handleMyHistory =() => {
    navigate('/myhistory');
}
const  handleGlobalLeaderboard =() => {
    navigate('/leaderboardall');
}
  const [username, setUsername] = useState("");
  
 useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
    return (
        <>
          <div className="flex">
<Navigation/>
<div className="w-full p-5 bg-[#F5F5F5]">
       <div className="flex justify-between ">
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
    <div className="flex gap-5 h-[80%]">

    
    <div className="flex flex-col p-5 gap-2 shadow-md justify-start items-center w-[25%]  bg-white">
        <div>
            <img src={global1} alt="" className="w-[50px] h-[50px]" />
        </div>
        <div className=" text-[16px] font-semibold text-[#EF5130]">
            <h1 className="text-[16px]">
Global Leaderboard Reports
            </h1>
        </div>
        <div onClick={handleGlobalLeaderboard1}>
            <p className="text-[#00008b] cursor-pointer">Golbal Leaderboard</p>
        </div>
    </div>
    <div className="flex flex-col p-5 gap-2 shadow-md justify-start items-center w-[25%]  bg-white">
        <div>
            <img src={myHistoryIcon} alt="" className="w-[50px] h-[50px]" />
        </div>
        <div className=" text-[16px] font-semibold text-[#EF5130]">
            <h1 className="text-[16px]">
My History Reports
            </h1>
        </div>
        <div onClick={handleMyHistory}>
            <p className="text-[#00008b] cursor-pointer">My History</p>
        </div>
    </div>
    <div className="flex flex-col p-5 gap-2 shadow-md justify-start items-center w-[25%]  bg-white">
        <div>
            <img src={myHistoryIcon} alt="" className="w-[50px] h-[50px]" />
        </div>
        <div className=" text-[16px] font-semibold text-[#EF5130]">
            <h1 className="text-[16px]">
            Quiz Status Report Reports
            </h1>
        </div>
        <div onClick={handleGlobalLeaderboard}>
            <p className="text-[#00008b] cursor-pointer">Quiz Status Report</p>
        </div>
    </div>
</div>
</div>
</div>
        </>
   
    );
  };
  
  export default repoarts;
