import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { useState } from "react";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import cancel from "../assets/Images/images/dashboard/cancel.png";
import DashBoardNavBar from "../../src/dashboardNavBar/dashboardNavBar.jsx";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";

import congiguration from "../../src/assets/Images/dashboard/configuration 1.png"
import preferences from "../../src/assets/Images/dashboard/preferences.png"
import software from "../../src/assets/Images/dashboard/image (11).png"
import card from "../../src/assets/Images/dashboard/image (6).png"
import pepooles from "../../src/assets/Images/dashboard/image (7).png"
import Q from "../../src/assets/Images/dashboard/image (8).png"
import notification from "../../src/assets/Images/dashboard/image (9).png"
import ball from "../../src/assets/Images/dashboard/image (10).png"
import { AuthContext } from "../Authcontext/AuthContext.jsx";
import report from "../../src/assets/Images/dashboard/image (14).png"
import close1 from "../../src/assets/Images/images/dashboard/cancel.png"
import help from "../../src/assets/Images/dashboard/help.png"

const configure = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userName, setUserName] = useState("");
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(null);
  const [averageScorePercentage, setAverageScorePercentage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const orgId = localStorage.getItem("org_id");

  const {authToken, logout } = useContext(AuthContext);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const navigate = useNavigate();
  const handleBanckToDashbaord = () => {
    navigate("/dashboard");
  };
  const userRole = localStorage.getItem("user_role");
  const allowedRoles = ["Super Admin","Admin"]; // Roles allowed to access the pages
  const allowedRoles1 = ["Quiz Master","Admin","Super Admin"];
  const allowedRoles2 = ["Super Admin"];
  const allowedRoles3 = ["Quiz Master","Admin","Super Admin","Quiz User"];

  const handleRestrictedClick = (navigateTo) => {
    if (allowedRoles.includes(userRole)) {
      navigate(navigateTo);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleRestrictedClickAll = (navigateTo) => {
    if (allowedRoles3.includes(userRole)) {
      navigate(navigateTo);
    } else {
      setIsModalOpen(true);
    }
  };
  
  const handleRestrictedClick1 = (navigateTo) => {
    if (allowedRoles1.includes(userRole)) {
      navigate(navigateTo);
    } else {
      setIsModalOpen1(true);
    }
  };

  const handleRestrictedClick3 = (navigateTo) => {
    // Check if the user role is "Quiz Master" and orgId exists
    if (userRole === "Quiz Master" && orgId) {
      navigate(navigateTo); // Allow navigation
    } else {
      setIsModalOpen3(true); // Show modal for restricted access
    }
  };

  const handleRestrictedClick2 = (navigateTo) => {
    if (allowedRoles2.includes(userRole)) {
      navigate(navigateTo);
    } else {
      setIsModalOpen2(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const closeModal3 = () => {
    setIsModalOpen3(false);
  };

  const handleCategoriesClick = () => handleRestrictedClick("/category");
  const handleCoursesClick = () => handleRestrictedClick("/Course");
  const handleSpecialisationsClick = () => handleRestrictedClick("/specialisations");
  const handleClassesClick = () => handleRestrictedClick("/classes");
  const handleSubjectsClick = () => handleRestrictedClick("/Subjects");
  const handleUsergroupsClick = () => handleRestrictedClick("/userandgroups");
  const handleQuizDownloadAndPrintClick = () => handleRestrictedClick("/print");
  const handleUsercrat = () => handleRestrictedClick("/usersgroup");

  const handleExamClick = () => handleRestrictedClick("/papertemplates");
  const handleProfile = () => handleRestrictedClick("/profileorganization");
  const handleSettings = () => handleRestrictedClick("/Profilesettings");
  const handleQuestionBank = () => handleRestrictedClick("/questionbank");
  const handleExpiryQuiz = () => handleRestrictedClick1("/Expiryquiz");
  const handleUserList = () => handleRestrictedClick("/userslist");
  const handleInstitution = ()=>  handleRestrictedClick("/education");
  const handleGlobalLeaderboard = () => handleRestrictedClick1("/leaderboardall");
  const handleCreateOrganization = () => handleRestrictedClick2('/creatorganization')
  const handleCreateOrganizationDepartment =()=> handleRestrictedClick('/creatorganizationdeparment')
  const handleQuizMasterReport = () => handleRestrictedClick1('/quizmasterleaderboard')
  const handleAddUsersBulk = () => handleRestrictedClick('/excelcreat')
  const handleGlobalLeaderboard1 =() => handleRestrictedClickAll('/globalleaderboard')
  const handleMyHistory=() => handleRestrictedClickAll('/myhistory')
  const handleDisableQuizs = () => handleRestrictedClick1("/Disablequiz");
  const handleAssignQuiz = () => handleRestrictedClick3("/multiassignquiz");

  const handleHelp = () =>{
    navigate("/HelpDesk")
  }
  const handleMyTickets = () =>{
    navigate("/MyTickets1")
  }
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }
        const response = await fetch(
          `https://dev.quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              user_id: userId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch header data");
        }
        const result = await response.json();

        const data = result.data[0];
        setWeeklyQuizCount(data.weekly_quiz_count || 0);
        setAverageScorePercentage(
          parseFloat(data.average_score_percentage) || 0
        );

        const userDetails = data.audit_details;
        setUserName(userDetails.full_name);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId]);

  const items = [
    {
      id: 1,
      image:congiguration,
      title: "Configuration",
      content: "Categories",
      //  Courses, Specialisations, Classes, Subjects",
    },
    {
      id: 2,
      image:pepooles,
      title: "User & Roles",
      content:
        "Add User, Add Bulk Users, Add/Edit User Groups, User List, Reset User Password",
    },
    {
      id: 3,
      image:software,
      title: "Organization",
      content:
        "Create Organization, Create Organization Department, Organization Profile, Institution Quizs, Organization Preferences",
    },
    {
      id: 4,
      image:card,
      title: "Subscription",
      content:
        "Order List, Subscription Details",
    },
    // {
    //   id: 5,
    //   image:report,
    //   title: "Reports",
    //   content:
    //     "Global Leaderboard, My History, Quiz Status Report, (Other Possible Reports)",
    // },
    {
      id: 6,
      image:Q,
      title: "Quizzes",
      content:
        "Question Bank, Quiz Print Templates, Assign Quiz, Disable Quizs, Expiry Quiz",
    },
    {
      id: 7,
      image:ball,
      title: "Notification",
      content:
        "Notification Preferences, Notification List",
    },
    {
      id: 8,
      image:help,
      title: "Help",
      content:
        "My Tickets, Help",
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: "lightblue" }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleBack = () => {
    navigate("/dashboard")
  }
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

  
  return (
    <div className="flex font-Poppins">
      <Navigation />
      <div className="flex-1 flex flex-col bg-[#F5F5F5]">
        <div className="flex justify-between p-[20px] pr-[80px] text-[20px] font-medium leading-7 text-left ml-[20px] mt-[10px] text-[#002366]">
          {/* Header content */}
          <p className="-mt-[5px]">
            Welcome {userName.charAt(0).toUpperCase() + userName.slice(1)}
          </p>
          <div className="flex -mt-[5px]">
            <img
              className="h-[12px] w-[12px] relative top-[9px] left-[25px]"
              src={searchIcon}
              alt="Search Icon"
            />
            <input
              className="-mt-[5px] border-solid border-[1px] border-[#000084] text-[10px] pl-[38px] pr-[10px] rounded-md h-[38px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082]  focus:border-none outline-none"
              type="text"
              placeholder="Search your settings"
              value={searchQuery}
              onChange={handleInputChange}
            />
            {/* <img
              onClick={handleBanckToDashbaord}
              className="h-4 w-4 cursor-pointer mt-[5px] mr-1"
              title="close settings"
              src={cancel}
            /> */}
                <div className=" absolute right-3 top-3">
  <img
    src={LogoutIcon}
    onClick={handleBackToLogin}
    alt="Logout Icon"
    className="w-5 h-5 cursor-pointer "
  />
</div>
          </div>
      
 {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
              You do not have permission to access this page. Only for Admin.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
       {isModalOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
              You do not have permission to access this page. Only for Quiz Master and Admin.
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
              You do not have permission to access this page. Only for Super Admin.
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
          {/* <div className={styles.headerRight}>
          <div className="w-[99px] h-[41px] absolute mr-[170px] -mt-2 rounded-[10px] bg-[#f3d0d5]">
            <div className="flex">
              <img
                className="w-[25px] h-[25px] ml-2 mt-2"
                src={Plus}
                alt="Plus Icon"
              />
              <a href="./create-quiz" className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3">
                Quiz
              </a>
            </div>
          </div>
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div>
          </div> */}
        </div>
        {/* <div
          className=" h-[41px] mx-[20px] pl-[23px] text-[15px] font-Poppins font-medium flex items-center -mt-[10px] leading-6 text-left justify-left
         text-[#002366] rounded-md"
          style={{ background: "#30CDF040" }}
        >
          <p>
            {weeklyQuizCount > 0 && averageScorePercentage > 0
              ? `You have successfully completed ${weeklyQuizCount} Quizzes this week, achieving an average score of ${averageScorePercentage}%`
              : "You have not attended any quizzes yet, Please attempt the quizzes below."}
          </p>{" "}
        </div> */}

        {/* <div className="flex bg-[#F3D0D5] h-[41px] mt-[20px] rounded-md ml-[20px] mr-[20px]">
          <h1 className="mt-[10px] ml-[20px] font-Poppins font-semibold text-[#214082] text-[16px]">
            All Settings
          </h1>
          <div className="flex gap-1 h-[30px] p-2 ml-auto mr-[2%] mt-[1%] rounded">
            <h1 className='text-[10px]'>Cancel settings</h1>
            <img onClick={handleBanckToDashbaord} className='h-4 w-4 cursor-pointer mt-[1px]' title='close settings' src={cancel}/> 
          </div>
        </div> */}
{/* <div className="flex">
<DashBoardNavBar/>
</div> */}
        <div className="flex flex-wrap gap-[20px] mt-[20px] ml-[15px] mr-[10px] justify-center">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-[20px] w-[calc((90%-80px)/4)] bg-white rounded-md shadow-xl transition-transform duration-300 transform scale-95 hover:scale-100 flex-none"
            >
              <div className="flex flex-col justify-start items-start">
              <div className="flex justify-start items-start">

              <img src={item.image} alt="" className="w-[40px] h-[40px]" />
              </div>
              <h1 className="text-[14px] font-semibold text-[#EF5130] text-center pt-4">
                {highlightText(item.title, searchQuery)}
              </h1>
              {item.content.split(", ").map((contentItem, index) => (
                <p
                  key={index}
                  className={`mt-3 text-[11px] font-semibold ${
                    contentItem === "Quiz sharing and access control" &&
                    item.title === "Quizzes" ? "text-gray-500"
                      : contentItem === "Add/Edit User Groups" &&
                        item.title === "User & Roles"
                      ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "User List" &&
                      item.title === "User & Roles"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Add User" &&
                      item.title === "User & Roles"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Add Bulk Users" &&
                      item.title === "User & Roles"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Quiz Status Report" &&
                      item.title === "Reports" 
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Global Leaderboard" &&
                      item.title === "Reports"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                    : contentItem === "My History" &&
                    item.title === "Reports"
                  ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Quiz Master Report" &&
                      item.title === "Reports"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Organization Profile" &&
                        item.title === "Organization"
                      ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Create Organization" &&
                      item.title === "Organization"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem === "Create Organization Department" &&
                      item.title === "Organization"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem ==="Organization Preferences" &&
                      item.title === "Organization"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : contentItem ==="Institution Quizs" &&
                      item.title === "Organization"
                    ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : ["Configuration", "Quizzes", "Help"].includes(item.title)
                      ? "text-[#3340AF] hover:underline hover:underline-offset-2 cursor-pointer"
                      : "text-gray-500"
                     
                  }`}
                  onClick={
                    contentItem === "Categories"
                      ? handleCategoriesClick
                      : contentItem === "Courses"
                      ? handleCoursesClick
                      : contentItem === "Specialisations"
                      ? handleSpecialisationsClick
                      : contentItem === "Classes"
                      ? handleClassesClick
                      : contentItem === "Subjects"
                      ? handleSubjectsClick
                      : contentItem === "Add/Edit User Groups"
                      ? handleUsergroupsClick
                      : contentItem === "Quiz download and print"
                      ? handleQuizDownloadAndPrintClick
                      : contentItem === "Quiz Print Templates"
                      ? handleExamClick
                      : contentItem === "Add User"
                      ? handleUsercrat
                      : contentItem === "Organization Profile"
                      ? handleProfile
                      : contentItem === "Organization Preferences"
                      ? handleSettings
                      : contentItem === "Institution Quizs"
                      ? handleInstitution
                      : contentItem === "Expiry Quiz"
                      ? handleExpiryQuiz
                      : contentItem === "Disable Quizs"
                      ? handleDisableQuizs
                      : contentItem === "Assign Quiz"
                      ? handleAssignQuiz
                      : contentItem === "Question Bank"
                      ? handleQuestionBank
                      : contentItem === "User List"
                      ? handleUserList
                      : contentItem === "Quiz Status Report"
                      ? handleGlobalLeaderboard
                      : contentItem === "Quiz Master Report"
                      ? handleQuizMasterReport
                      : contentItem === "Add Bulk Users"
                      ? handleAddUsersBulk
                      : contentItem === "Create Organization"
                      ? handleCreateOrganization
                      : contentItem === "Create Organization Department"
                      ? handleCreateOrganizationDepartment
                      : contentItem === "Global Leaderboard"
                      ? handleGlobalLeaderboard1
                      : contentItem === "My History"
                      ? handleMyHistory
                      : contentItem === "My Tickets"
                      ? handleMyTickets
                      : contentItem === "Help"
                      ? handleHelp
                      : null
                  }
                >
                  {highlightText(contentItem, searchQuery)}
                </p>
              ))}
            </div>
            </div>
          ))}
        </div>
      </div>
      {/* <LogoutBar /> */}
    </div>
  );
};

export default configure;
