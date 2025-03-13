"use client";
import React, { useState,useContext } from "react";
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
import superadmin from "../../src/assets/Images/dashboard/image (21).1.webp";
import admin from "../../src/assets/Images/dashboard/image (21).png";
import organization from "../../src/assets/Images/dashboard/image (20).png";
import Quizmaster from "../../src/assets/Images/dashboard/quizmaster.webp";
import repoart from "../../src/assets/Images/dashboard/report.webp";
import { AuthContext } from "../Authcontext/AuthContext";


import { MdOutlineCancel } from "react-icons/md";

const reportsData = [
  {
    image:repoart,
      category: 'My Reports',
      color: "bg-[#c1e7e3]",  

      reports: ['My History', 'My Quiz Attemt Details', 'Global Score leaderboard', 'Users Quiz Report']
  },
  {
    image:Quizmaster,
    color: "bg-[#ceffe4]",  

      category: 'Quiz Master Reports',
      reports: ['Quiz Master Performance', 'Quiz Status Detail', 'Quiz Status Summary']
  },
  {
    image:admin,
    color: "bg-[#ffe9ee]",  

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
    image:organization,
    color: "bg-[#c1bbdd]",  

      category: 'Organization Reports',
      reports: [
          'Organization Top Scorers',
          'Organization User List',
          'Organization Quiz Summary',
          // 'Detailed User Report',
          'Organization All Users',
          'All User Summary Report',
          // 'Organization-Wide Quiz Performance Summary',
          // 'Department/Class-Wise Quiz Analysis',
          'Quiz Master Performance Across Organization',
          // 'Organization-Wide Quiz Trends',
          // 'Organization-Wide Low Performers'
      ]
  },
  {
    image:superadmin,
    color: "bg-[#c1e7e3]",  

      category: 'Super Admin Reports',
      reports: [
          'Organization User List SuperAdmin',
          'Organization Quiz Summary SuperAdmin',
          // 'Detailed User Report',
          'User Summary Report',
          'User Activity Summary',
          'Database Audit Summary',
          // 'Organization Overview',
          'Quiz Master Performance',
          'All Users SuperAdmin',
          'Subscription',
          'InternshipUsers',
          // 'Super Admin Metrics',
          // 'User List Across Organizations',
          // 'Organization-Wide Quiz Summary',
          // 'Subscription Summary'
      ]
  }
];

const categoryColors = {
  "Quiz Master Reports": "bg-[#c1e7e3]",  
  "User Reports": "bg-[#ceffe4]",  
  "Performance Reports": "bg-[#ffe9ee]",  
  "My Reports": "bg-[#c1bbdd]",  
  "Default": "bg-gray-200" // Fallback color
};

const repoarts = () => {
      const [userId, setUserId] = useState(localStorage.getItem("user_id"));
      const { isAuthenticated, authToken,logout } = useContext(AuthContext);

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
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen4, setIsModalOpen4] = useState(false);
    const [isModalOpen5, setIsModalOpen5] = useState(false);
    const closeModal1 = () => {
      setIsModalOpen1(false);
    };
    const closeModal2 = () => {
      setIsModalOpen2(false);
    };
    const closeModal3 = () => {
      setIsModalOpen3(false);
    };
    const closeModal4 = () => {
      setIsModalOpen4(false);
    };
    const closeModal5 = () => {
      setIsModalOpen5(false);
    };
    const userRole = localStorage.getItem("user_role");
    const orgId = localStorage.getItem("org_id");

    const filteredReportsData = reportsData.filter(categoryData => {
      if (["Super Admin","Admin"].includes(userRole) && categoryData.category === "Organization Reports" && orgId) {
        return true;
      }
      if (["Super Admin",].includes(userRole) && categoryData.category === "Organization Reports") {
        return true;
      }
      if (["Super Admin","Admin"].includes(userRole) && categoryData.category === "Quiz Admin Reports") {
        return true;
      }
      if (["Super Admin","Quiz Master"].includes(userRole) && categoryData.category.includes("Quiz Master")) {
        return true;
      }
      if (["Super Admin"].includes(userRole)  && categoryData.category.includes("Super Admin")) {
        return true;
      }

      if (userRole && categoryData.category.includes("My Reports")) {
        return true;
      }
      return false;
    });


  const allowedRoles1 = ["Quiz Master","Admin"];

  const allowedRoles2 = ["Admin"];
  const allowedRoles3 = ["Super Admin"];


  const handleRestrictedClick1 = (navigateTo) => {
    // Check if the user role is "Quiz Master" and orgId exists
    if (allowedRoles1.includes(userRole) && orgId) {
      navigate(navigateTo); // Allow navigation
    } else {
      setIsModalOpen1(true); // Show modal for restricted access
    }
  };


  const handleRestrictedClick2 = (navigateTo) => {
    // Check if the user role is "Quiz Master" and orgId exists
    if (allowedRoles1.includes(userRole)) {
      navigate(navigateTo); // Allow navigation
    } else {
      setIsModalOpen2(true); // Show modal for restricted access
    }
  };

  const handleRestrictedClick3 = (navigateTo) => {
    // Check if the user role is "Quiz Master" and orgId exists
    if (allowedRoles2.includes(userRole) && orgId) {
      navigate(navigateTo); // Allow navigation
    } else {
      setIsModalOpen3(true); // Show modal for restricted access
    }
  };

  const handleRestrictedClick4 = (navigateTo) => {
    // Check if the user role is "Quiz Master" and orgId exists
    if (allowedRoles2.includes(userRole)) {
      navigate(navigateTo); // Allow navigation
    } else {
      setIsModalOpen4(true); // Show modal for restricted access
    }
  };

  const handleRestrictedClick5 = (navigateTo) => {
    // Check if the user role is "Quiz Master" and orgId exists
    if (allowedRoles3.includes(userRole)) {
      navigate(navigateTo); // Allow navigation
    } else {
      setIsModalOpen5(true); // Show modal for restricted access
    }
  };

  const handleGlobalLeaderboard = () => handleRestrictedClick1("/leaderboardall");
  const handleOrganizationUserList = () => handleRestrictedClick3("/Organizationusesdetails");
  const handleOrganizationQuizSummary = () => handleRestrictedClick3("/Organizationquizsummary");
  const handleOrganizationTopScorers = () => handleRestrictedClick3("/Organizationtopscore");
  const handleQuizMasterPerformance = () => handleRestrictedClick3("/Organizationquizmaster");
  const handleOrganizationAllUsers = () => handleRestrictedClick3("/Organizationallusers");
  const handleAllUserSummaryReport = () => handleRestrictedClick3("/Alluserssummaryorganization");

  const handleUserActivitySummary = () => handleRestrictedClick5("/Allusersactivitysuperadmin");
  const handleDatabaseAuditSummary = () => handleRestrictedClick5("/Databaseauditsummary");
  const handleOrganizationUserListSuperAdmin = () => handleRestrictedClick5("/Superadminusesdetails");
  const handleOrganizationQuizSummarySuperAdmin = () => handleRestrictedClick5("/Superadminquizsummary");
  const handleQuizMasterPerformancesuperadmin = () => handleRestrictedClick5("/Superadminquizmaster");
  const handleAllUsersSuperAdmin = () => handleRestrictedClick5("/Superadminallusers");
  const handleUserSummaryReport = () => handleRestrictedClick5("/Superadminsummary");
  
  const handleSubscription = () => handleRestrictedClick5("/Subscriptionreports");
const handleInternshipUsers =() => handleRestrictedClick5("/InternshipUsers");

  const  handleMyQuizAttemtDetails =  () => {
    navigate('/Myquizattemtdetails');
  } 
  // const handleOrganizationUserList  =  () => {
  //   navigate('/Organizationusesdetails');
  // } 
  // const handleOrganizationQuizSummary  =  () => {
  //   navigate('/Organizationquizsummary');
  // } 
  // const handleOrganizationTopScorers  =  () => {
  //   navigate('/Organizationtopscore');
  // } 
  // const handleQuizMasterPerformance  =  () => {
  //   navigate('/Organizationquizmaster');
  // } 

  // const handleOrganizationAllUsers  =  () => {
  //   navigate('/Organizationallusers');
  // } 
  // const handleAllUserSummaryReport  =  () => {
  //   navigate('/Alluserssummaryorganization');
  // } 
  // const handleUserActivitySummary  =  () => {
  //   navigate('/Allusersactivitysuperadmin');
  // } 

  // const handleDatabaseAuditSummary  =  () => {
  //   navigate('/Databaseauditsummary');
  // } 


  // const handleOrganizationUserListSuperAdmin  =  () => {
  //   navigate('/Superadminusesdetails');
  // } 

  // const handleOrganizationQuizSummarySuperAdmin  =  () => {
  //   navigate('/Superadminquizsummary');
  // } 
  // const handleQuizMasterPerformancesuperadmin  =  () => {
  //   navigate('/Superadminquizmaster');
  // }
  // const handleAllUsersSuperAdmin  =  () => {
  //   navigate('/Superadminallusers');
  // }

  // const handleUserSummaryReport  =  () => {
  //   navigate('/Superadminsummary');
  // }
  const handleUsersQuizReport  =  () => {
    navigate('/Usersquizreports');
  }

  
  
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
          <div className="flex flex-wrap justify-left w-full gap-2 ">
      {filteredReportsData.map((categoryData, index) => (
        
        <div
          key={index}
          className="flex flex-col p-5 gap-2 justify-start items-start w-[25%]  "
          >
      <div   className={`flex cursor-pointer gap-2 justify-center w-full px-4 py-2 rounded-lg ${categoryData.color}`}
      >
        
              
        <img src={categoryData.image} alt="" className="w-6 h-6" />
  
        <button
          className={`text-[#214082] 
          `}
        >
          {categoryData.category} 
        </button>
        </div>
        <div
         
       className="flex flex-col p-5 gap-2 shadow-md justify-start items-start w-full h-full bg-white">

          {/* <div>
            <img src={categoryData.image} alt="Report Icon" className="w-[40px] h-[40px]" />
          </div>
          <div className="text-[14px] font-semibold text-[#EF5130]">
            <h1 className="text-[14px]">{categoryData.category}</h1>
          </div> */}
          {categoryData.reports.map((reportItem, index) => (
            <p
              key={index}
              className={` text-[11px] font-semibold ${
                ["Quiz Status Detail"].includes(
                  reportItem
                ) && categoryData.category === "Quiz Master Reports"
                  ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                  : ["My Reports", "Organization Reports" , "Super Admin Reports"].includes(
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
                  : reportItem === "My Quiz Attemt Details"
                  ? handleMyQuizAttemtDetails
                  : reportItem === "Organization User List"
                  ? handleOrganizationUserList
                  : reportItem === "Organization Quiz Summary"
                  ? handleOrganizationQuizSummary
                  : reportItem === "Organization Top Scorers"
                  ? handleOrganizationTopScorers
                  : reportItem === "Quiz Master Performance Across Organization"
                  ? handleQuizMasterPerformance
                  : reportItem === "Organization All Users"
                  ? handleOrganizationAllUsers
                  : reportItem === "All User Summary Report"
                  ? handleAllUserSummaryReport
                  : reportItem === "User Activity Summary"
                  ? handleUserActivitySummary
                  : reportItem === "Database Audit Summary"
                  ? handleDatabaseAuditSummary
                  : reportItem === "Organization User List SuperAdmin"
                  ? handleOrganizationUserListSuperAdmin
                  : reportItem === "Organization Quiz Summary SuperAdmin"
                  ? handleOrganizationQuizSummarySuperAdmin
                  : reportItem === "Quiz Master Performance"
                  ? handleQuizMasterPerformancesuperadmin     
                  : reportItem === "All Users SuperAdmin"
                  ? handleAllUsersSuperAdmin  
                  : reportItem === "Subscription" 
                  ? handleSubscription 
                  : reportItem === "InternshipUsers"
                  ? handleInternshipUsers 
                  : reportItem === "User Summary Report"
                  ? handleUserSummaryReport 
                  : reportItem === "Users Quiz Report"
                  ? handleUsersQuizReport
                  
                  :null}
            >
              {reportItem}
            </p>
          ))}
        </div>
         </div>
      ))}
    </div>
</div>
{isModalOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
            You must be a Quiz Master and belong to an organization to access this feature.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closeModal1}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isModalOpen2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
            You must be a Quiz Master access this feature.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closeModal2}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isModalOpen3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
            You must be a Admin and belong to an organization to access this feature.
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
      {isModalOpen4 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
            You must be a Admin access this feature.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closeModal4}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isModalOpen5 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
            You must be a super Admin access this feature.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closeModal5}
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
