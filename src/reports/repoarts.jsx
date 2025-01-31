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
import status from "../../src/assets/Images/dashboard/status (1).png"

import { MdOutlineCancel } from "react-icons/md";

const reportsData = [
  {
    image:myHistoryIcon,
      category: 'My Reports',
      reports: ['My History', 'Global Score leaderboard']
  },
  {
    image:status,
      category: 'Quiz Master Reports',
      reports: ['Quiz Status Detail', 'Quiz Status Summary']
  },
  {
    image:status,
      category: 'Quiz Admin Reports',
      reports: [
          'Quiz Status Detail',
          'Quiz Status Summary',
          'Class-Wise Quiz Performance Summary',
          'Course-Wise Quiz Analysis',
          'Section-Wise Comparison'
      ]
  },
  {
    image:status,
      category: 'Organization Reports',
      reports: [
          'Organization-Wide Quiz Performance Summary',
          'Department/Class-Wise Quiz Analysis',
          'Quiz Master Performance Across Organization',
          'Organization-Wide Top Scorers',
          'Organization-Wide Quiz Trends',
          'Organization-Wide Low Performers'
      ]
  },
  {
    image:status,
      category: 'Super Admin Reports',
      reports: [
          'Organization Overview',
          'Super Admin Metrics',
          'User List Across Organizations',
          'Organization-Wide Quiz Summary',
          'Subscription Summary'
      ]
  }
];


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
//----------------------** navigaite other pages**------------//
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const closeModal3 = () => {
      setIsModalOpen3(false);
    };

  const userRole = localStorage.getItem("user_role");
  const orgId = localStorage.getItem("org_id");

  const allowedRoles1 = ["Quiz Master","Admin","Super Admin"];

  const handleRestrictedClick3 = (navigateTo) => {
    // Check if the user role is "Quiz Master" and orgId exists
    if (allowedRoles1.includes(userRole) && orgId) {
      navigate(navigateTo); // Allow navigation
    } else {
      setIsModalOpen3(true); // Show modal for restricted access
    }
  };

  const handleGlobalLeaderboard = () => handleRestrictedClick3("/leaderboardall");

//----------------------** navigaite other pages**------------//

const  handleGlobalLeaderboard1 =() => {
    navigate('/globalleaderboard');
}

const  handleMyHistory =() => {
    navigate('/myhistory');
}
// const  handleGlobalLeaderboard =() => {
//     navigate('/leaderboardall');
// }
  const [username, setUsername] = useState("");
  
 useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleReportClick = (path) => {
    navigate(path); // Navigate to the selected report page
};
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
          <div className="flex flex-wrap gap-4 justify-center p-5">
      {reportsData.map((categoryData, index) => (
        <div
          key={index}
          className="flex flex-col p-5 gap-2 shadow-md justify-start items-start w-[25%] bg-white"
        >
          <div>
            <img src={categoryData.image} alt="Report Icon" className="w-[40px] h-[40px]" />
          </div>
          <div className="text-[14px] font-semibold text-[#EF5130]">
            <h1 className="text-[14px]">{categoryData.category}</h1>
          </div>
          {categoryData.reports.map((reportItem, index) => (
            <p
              key={index}
              className={` text-[11px] font-semibold ${
                ["Quiz Status Detail"].includes(
                  reportItem
                ) && categoryData.category === "Quiz Master Reports"
                  ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                  : ["My Reports"].includes(
                      categoryData.category
                    )
                  ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                  : "text-gray-500"
              }`}
              onClick={
                reportItem === "My History"
                  ? handleMyHistory
                  : reportItem === "Global Score leaderboard"
                  ? handleGlobalLeaderboard1
                  : reportItem === "Quiz Status Detail"
                  ? handleGlobalLeaderboard
                  :null}
            >
              {reportItem}
            </p>
          ))}
        </div>
      ))}
    </div>
</div>
{isModalOpen3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
            You must be a Quiz Master and belong to an organization to access this feature.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closeModal3}
            >
              Close
            </button>
          </div>
        </div>
      )}
</div>
        </>
   
    );
  };
  
  export default repoarts;
