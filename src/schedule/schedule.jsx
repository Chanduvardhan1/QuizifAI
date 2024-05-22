"use client";
import React , { useState, useEffect } from "react";
// import Image from "next/image";
import styles from "./schedule.module.css"
import { Line } from "rc-progress";
import Calendar from "react-calendar";
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx"


// Main-icons
import Plus from "../../src/assets/Images/Schedule/Plus.png";
import Search from "../../src/assets/Images/Schedule/Search.png";
import Menu from "../../src/assets/Images/Schedule/Menu.png";
import Topic from "../../src/assets/Images/Schedule/Topic.png";
import Timer from "../../src/assets/Images/Schedule/Timer.png";
// import Easy from "../../src/assets/Images/Schedule/Easy.png";
import Star from "../../src/assets/Images/Schedule/Star.png";
import Play from "../../src/assets/Images/Schedule/Play.png";
import Pencil from "../../src/assets/Images/Schedule/Pencil.png";
import ThreeStar from "../../src/assets/Images/Schedule/3-Stars.png";
import Share from "../../src/assets/Images/Schedule/Share.png";


import Attempt1 from "../../public/images/dashboard/Attempt1.png";
import NoOfQuestion from "../../public/images/dashboard/NoOfQuestion.png";
import Clock from "../../public/images/dashboard/Clock.png";
import Start_button from "../../public/images/dashboard/Start-button.png";
import Share_button from "../../public/images/dashboard/Share-button.png";
import Edit_button from "../../src/assets/Images/dashboard/Edit-button.png";
import leaderboard_button from "../../public/images/dashboard/leaderboard-button.png";
import Easy from "../../public/images/dashboard/Easy.png";



function Schedule() {
  // Calender-function
  const [date, setDate] = useState(new Date());
  const [quizAssignedData, setQuizAssignedData] = useState([]);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState(localStorage.getItem("user_name"));

  const onChange = (date) => {
    setDate(date);
  };

  
  useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);
      console.log("User Name:", username);
      try {
        const response = await fetch(`https://quizifai.com:8010/notification_page?user_id=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
      
        setQuizAssignedData(data.quiz_assigned_to_you);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [userId, username]);

  const toggleNavbar = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex justify-between">
        {/* Navigation-Section */}
        <Navigation />
        {/* Main-section  */}
        <main className="mx-auto">
          <div className="w-[218px] h-[39px] absolute left-[250px] top-[40px]">
            <h1 className="leading-[30px] font-medium font-poppins text-[20px] text-nowrap">
              Welcome {username}
            </h1>
          </div>
          <div className="w-[99px] h-[41px] absolute top-[49px] left-[800px] rounded-[10px] bg-[#FFEDCD]">
            <div className="flex">
              <img
                className="w-[25px] h-[25px] ml-2 mt-2"
                src={Plus}
                alt="Plus Icon"
              />
              <h1 className="font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3">
                Quiz
              </h1>
            </div>
          </div>

          <div className="w-[40.79px] h-[40.79px] absolute top-[51.51px] left-[910.82px] rounded-[10px] bg-[#E5E9F9]">
            <img
              className="w-[19.04px] h-[19.04px] flex justify-center items-center mx-3 my-3"
              src={Search}
              alt="searching image"
            />
          </div>

          <div className="w-[698px] h-[42px] absolute top-[100px] left-[254px] rounded-[10px] bg-[#30CDF040]">
            <h1 className="w-[560px] h-5 font-Poppins font-medium text-[15px] leading-[22.5px] text-[#214082] ml-4 mt-2 ">
              You’ve completed 10 Quiz’s this week of average score of 85%
            </h1>
          </div>

          <div className="w-[403px] h-[70px] absolute top-[170px] left-[258px]">
            <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">
              Quiz Schedule on
            </h1>
            <h1 className="font-Poppins font-light text-[12px] leading-[18px]">
              Click on the date to select your Schedule
            </h1>
          </div>

          <div className="w-[263.93px] h-[191.78px] absolute top-[250px] left-[270px]">
            <Calendar onChange={onChange} value={date} />
          </div>
          <div className="w-[263.93px] h-[191.78px] absolute top-[263px] left-[620px]">
            <Calendar onChange={onChange} value={date} />
          </div>

          <div className="w-[369px] h-[21px] absolute top-[460px] left-[264px]">
            <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">
              Quiz’s Assigned to you for today
            </h1>
            
            {/* first-three-cards */}
            <div className="flex">
            {/* first-box */}
            <div className={styles.card}
             style={{ paddingTop: "8px",
             marginTop:"25px",
             marginLeft:"-18px" }}>
              <p className={styles.title}>{quizAssignedData[0]?.title}
              <p className={styles.subtitle}>{quizAssignedData[0]?.title}</p></p>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                  </svg>

                  {isNavbarOpen && (
                    <div className={styles.infoIcons}>
                      {/* start */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[1px] w-[1px] left-[6px] top-1"
                          src={Start_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                          Start
                        </span>
                      </div>
                      {/* Edit  */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                          src={Edit_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                          Edit
                        </span>
                      </div>
                      {/* Leaderboard */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                          src={leaderboard_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                          Leaderboard
                        </span>
                      </div>
                      {/* Share */}

                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                          src={Share_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                          Share
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{quizAssignedData[0]?.quiz_description}
                <span className={styles.subdescription}>{quizAssignedData[0]?.quiz_description}</span></span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="z-0">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    {/* <p>{quizAssignedData[0]?.quiz_attempts}</p> */}
                    <span className="text-[6px] ml-[1px]">attempts</span>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {quizAssignedData[0]?.number_of_questions}
                  <span className="text-[6px] ml-[1px]">questions</span>
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {/* {quizAssignedData[0]?.quiz_duration} */}
                  <span className="text-[6px] ml-[2px]">minutes</span>
                </span>
                <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  {/* <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "} */}
                  {quizAssignedData[0]?.complexity}
                </span>
              </div>
            </div>

            {/* second-box  */}
           <div className={styles.card} style={{ paddingTop: "8px",marginTop:"25px" }}>
              <p className={styles.title}>{quizAssignedData[0]?.quiz_name}</p>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                  </svg>

                  {isNavbarOpen && (
                    <div className={styles.infoIcons}>
                      {/* start */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[1px] w-[1px] left-[6px] top-1"
                          src={Start_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                          Start
                        </span>
                      </div>
                      {/* Edit  */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                          src={Edit_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                          Edit
                        </span>
                      </div>
                      {/* Leaderboard */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                          src={leaderboard_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                          Leaderboard
                        </span>
                      </div>
                      {/* Share */}

                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                          src={Share_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                          Share
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{quizAssignedData[0]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="z-0">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{quizAssignedData[0]?.quiz_attempts}</p>
                    <span className="text-[6px] ml-1">attempts</span>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {quizAssignedData[0]?.number_of_questions}
                  <span className="text-[6px] ml-[1px]">questions</span>
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {quizAssignedData[0]?.quiz_duration}
                  <span className="text-[6px] -ml-[0.5px]">minutes</span>
                </span>
                <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {quizAssignedData[0]?.complexity}
                </span>
              </div>
            </div>

            {/* Third-box  */}
            <div className={styles.card} style={{ paddingTop: "8px",marginTop:"25px" }}>
              <p className={styles.title}>{quizAssignedData[0]?.quiz_name}</p>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                  </svg>

                  {isNavbarOpen && (
                    <div className={styles.infoIcons}>
                      {/* start */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[1px] w-[1px] left-[6px] top-1"
                          src={Start_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                          Start
                        </span>
                      </div>
                      {/* Edit  */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                          src={Edit_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                          Edit
                        </span>
                      </div>
                      {/* Leaderboard */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                          src={leaderboard_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                          Leaderboard
                        </span>
                      </div>
                      {/* Share */}

                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                          src={Share_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                          Share
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{quizAssignedData[0]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="z-0">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{quizAssignedData[0]?.quiz_attempts}</p>
                    <span className="text-[6px] ml-1">attempts</span>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {quizAssignedData[0]?.number_of_questions}
                  <span className="text-[6px] ml-[1px]">questions</span>
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {quizAssignedData[0]?.quiz_duration}
                  <span className="text-[6px] -ml-[0.5px]">minutes</span>
                </span>
                <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {quizAssignedData[0]?.complexity}
                </span>
              </div>
            </div>
            
          </div>
           {/* second-three-cards */}
          <div className="flex">
            {/* first-box */}
            <div className={styles.card}
             style={{ paddingTop: "8px",
             marginTop:"25px",
             marginLeft:"-18px" }}>
              <p className={styles.title}>{quizAssignedData[0]?.title}</p>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                  </svg>

                  {isNavbarOpen && (
                    <div className={styles.infoIcons}>
                      {/* start */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[1px] w-[1px] left-[6px] top-1"
                          src={Start_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                          Start
                        </span>
                      </div>
                      {/* Edit  */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                          src={Edit_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                          Edit
                        </span>
                      </div>
                      {/* Leaderboard */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                          src={leaderboard_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                          Leaderboard
                        </span>
                      </div>
                      {/* Share */}

                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                          src={Share_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                          Share
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{quizAssignedData[0]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="z-0">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{quizAssignedData[0]?.quiz_attempts}</p>
                    <span className="text-[6px] ml-1">attempts</span>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {quizAssignedData[0]?.number_of_questions}
                  <span className="text-[6px] ml-[1px]">questions</span>
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {quizAssignedData[0]?.quiz_duration}
                  <span className="text-[6px] -ml-[0.5px]">mintes</span>
                </span>
                <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {quizAssignedData[0]?.complexity}
                </span>
              </div>
            </div>

            {/* second-box  */}
           <div className={styles.card} style={{ paddingTop: "8px",marginTop:"25px" }}>
              <p className={styles.title}>{quizAssignedData[0]?.quiz_name}</p>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                  </svg>

                  {isNavbarOpen && (
                    <div className={styles.infoIcons}>
                      {/* start */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[1px] w-[1px] left-[6px] top-1"
                          src={Start_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                          Start
                        </span>
                      </div>
                      {/* Edit  */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                          src={Edit_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                          Edit
                        </span>
                      </div>
                      {/* Leaderboard */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                          src={leaderboard_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                          Leaderboard
                        </span>
                      </div>
                      {/* Share */}

                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                          src={Share_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                          Share
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{quizAssignedData[0]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="z-0">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{quizAssignedData[0]?.quiz_attempts}</p>
                    <span className="text-[6px] ml-1">attempts</span>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {quizAssignedData[0]?.number_of_questions}
                  <span className="text-[6px] ml-[1px]">questions</span>
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {quizAssignedData[0]?.quiz_duration}
                  <span className="text-[6px] -ml-[0.5px]">minutes</span>
                </span>
                <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {quizAssignedData[0]?.complexity}
                </span>
              </div>
            </div>

            {/* Third-box  */}
            <div className={styles.card} style={{ paddingTop: "8px",marginTop:"25px" }}>
              <p className={styles.title}>{quizAssignedData[0]?.quiz_name}</p>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                  </svg>

                  {isNavbarOpen && (
                    <div className={styles.infoIcons}>
                      {/* start */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[1px] w-[1px] left-[6px] top-1"
                          src={Start_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                          Start
                        </span>
                      </div>
                      {/* Edit  */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                          src={Edit_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                          Edit
                        </span>
                      </div>
                      {/* Leaderboard */}
                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                          src={leaderboard_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                          Leaderboard
                        </span>
                      </div>
                      {/* Share */}

                      <div className={styles.start}>
                        <img
                          className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                          src={Share_button}
                          alt="Play icon"
                        />
                        <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                          Share
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {quizAssignedData[0]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{quizAssignedData[0]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="z-0">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{quizAssignedData[0]?.quiz_attempts}</p>
                    <span className="text-[6px] ml-1">attempts</span>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {quizAssignedData[0]?.number_of_questions}
                  <span className="text-[6px] ml-[1px]">questions</span>
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {quizAssignedData[0]?.quiz_duration}
                  <span className="text-[6px] -ml-[0.5px]">minutes</span>
                </span>
                <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {quizAssignedData[0]?.complexity}
                </span>
              </div>
            </div>
            
          </div>

          </div>
          
        
        </main>
       
        <LogoutBar />
      </div>
    </>
  );
}

export default Schedule;
