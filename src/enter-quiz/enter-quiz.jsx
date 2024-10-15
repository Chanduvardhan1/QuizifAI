"use client";
import React from "react";

// import ToggleButton from 'react-toggle-button'

// Navbar-icons
import QuizifAilogo from "../assets/Images/quiz-type/Quizifai 1.png";
import Dashboard from "../assets/Images/quiz-type/Dashboard.png";
import Quiz from "../assets/Images/quiz-type/Quiz.png";
import History from "../assets/Images/quiz-type/History.png";
import Schedule from "../assets/Images/quiz-type/Schedule.png";
import Notification from "../assets/Images/quiz-type/Notification.png";
import QuizAdmin from "../assets/Images/quiz-type/Quiz-admin.png";
import Profile from "../assets/Images/quiz-type/Profile.png";

// Main-Section-icons
import CreateOrEdit from "../assets/Images/quiz-type/Create-Edit.png"
import Line from "../assets/Images/quiz-type/Line.png"
import Time from "../assets/Images/quiz-type/Time.png"
import Dropdown from "../assets/Images/quiz-type/Dropdown.png"
import A from "../assets/Images/quiz-type/A.png"
import RedToggle from "../assets/Images/quiz-type/Red-Toggle.png"
import B from "../assets/Images/quiz-type/B.png"
import C from "../assets/Images/quiz-type/C.png"
import D from "../assets/Images/quiz-type/D.png"
import Delete from "../assets/Images/quiz-type/Delete.png"
import Refresh from "../assets/Images/quiz-type/Refresh.png"
import RefreshOptions from "../assets/Images/quiz-type/Refresh-options.png"

export default function enterquiz() {
  return (
    <>
      <div>
        {/* Navigation-Section */}
        <header className="w-[219px] h-[880px] absolute top-[-19px] left-[-9px] rounded-tl-[20px] rounded-bl-[20px] bg-[#F5F5FB] z-10 shadow-lg shadow-gray-400/60">
          <div className="h-[300px] w-[270px] absolute top-[20px] -left-[20px]">
            <img src={QuizifAilogo} alt="QuizifAi Logo Icon" />
          </div>

          {/* Navigation-icons */}
          <div className="flex w-[15px] h-[15px] absolute top-[231px] left-[51px]">
            <img src={Dashboard} alt="Dashborad img" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Dashboard
            </a>
          </div>

          <div className="flex w-[16px] h-[15px] absolute top-[285px] left-[51px]">
            <img src={Quiz} alt="Quiz's img" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Quiz
            </a>
          </div>

          <div className="flex w-[13.87px] h-[15.41px] absolute top-[338px] left-[51px]">
            <img src={History} alt="History img" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              History
            </a>
          </div>

          <div className="flex w-[17px] h-4 absolute top-[394px] left-[51px]">
            <img src={Schedule} alt="Schedule img" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Schedule
            </a>
          </div>

          <div className="flex w-4 h-[15px] absolute top-[453px] left-[51px]">
            <img src={Notification} alt="Notification img" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Notification
            </a>
          </div>

          <div className="flex w-[25.46px] h-[27.87px] absolute top-[508px] left-[51px]">
            <img className="-ml-2.5" src={QuizAdmin} alt="QuizAdmin img" />
            <a
              className="ml-4 text-Poppins font-medium text-[15px] leading-[15px] text-nowrap text-[#30304F]"
              for=""
            >
              Quiz Admin
            </a>
          </div>

          <div className="flex w-[17px] h-[17px] absolute top-[581px] left-[51px]">
            <img src={Profile} alt="Profile img" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Profile
            </a>
          </div>
        </header>
        
     
        <main className="w-mx-auto">
    <div className="w-[848px] h-[44px] absolute top-[90px] left-[357px]">
        <h1 className="font-Poppins font-bold text-[30px] leading-[45px] text-[#F25822]">Create / Edit your Quiz </h1>
        <h1 className="font-Poppins font-medium text-[12px] leading-[18px]">Enter all your questions, options, and answers</h1>
    </div>

    {/* Input field for question */}
    <input type="text" placeholder="Enter your question" className="w-[742px] h-[71px] absolute top-[190px] left-[298px] rounded-[20px] border-[1.8px]" />

    {/* Input fields for options */}
    <div className="flex w-[339px] h-[37px] rounded-[10px] border-[2px] absolute top-[281px] left-[301px]">
        <img className="w-6 h-6 ml-1 mt-1.5" src={A} alt="Option A" />
        <input type="text" placeholder="Option A" className="font-Poppins font-normal text-[18px] leading-[27px] text-[#ABABAB] ml-1 mt-1" />
        <img className="w-[36px] h-5 ml-auto mt-2 mr-3" src={RedToggle} alt="Toggle" />
    </div>

    <div className="flex w-[339px] h-[37px] rounded-[10px] border-[2px] absolute top-[332px] left-[301px]">
        <img className="w-6 h-6 ml-1 mt-1.5" src={B} alt="Option B" />
        <input type="text" placeholder="Option B" className="font-Poppins font-normal text-[18px] leading-[27px] text-[#ABABAB] ml-1 mt-1" />
        <img className="w-[36px] h-5 ml-auto mt-2 mr-3" src={RedToggle} alt="Toggle" />
    </div>

    <div className="flex w-[339px] h-[37px] rounded-[10px] border-[2px] absolute top-[281px] left-[695px]">
        <img className="w-6 h-6 ml-1 mt-1.5" src={C} alt="Option C" />
        <input type="text" placeholder="Option C" className="font-Poppins font-normal text-[18px] leading-[27px] text-[#ABABAB] ml-1 mt-1" />
        <img className="w-[36px] h-5 ml-auto mt-2 mr-3" src={RedToggle} alt="Toggle" />
    </div>

    <div className="flex w-[339px] h-[37px] rounded-[10px] border-[2px] absolute top-[332px] left-[695px]">
        <img className="w-6 h-6 ml-1 mt-1.5" src={D} alt="Option D" />
        <input type="text" placeholder="Option D" className="font-Poppins font-normal text-[18px] leading-[27px] text-[#ABABAB] ml-1 mt-1" />
        <img className="w-[36px] h-5 ml-auto mt-2 mr-3" src={RedToggle} alt="Toggle" />
    </div>

    <div className="absolute top-[687px] left-[608px]">
        <button className="w-[123px] h-[32px] rounded-[10px] bg-[#1B1852] text-white">Create</button>
    </div>
    
</main>
      </div>
    </>
  );
};
