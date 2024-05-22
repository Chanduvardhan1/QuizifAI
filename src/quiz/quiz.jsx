// Dashboard.js
import React , { useState, useEffect } from "react";
import styles from "./quiz.module.css";
//import Head from "next/head";
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx"
import Plus from "../../src/assets/Images/dashboard/Plus.png";
//import { useRouter } from 'next/router';
//import img from "next/image";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import arrow1 from "../assets/Images/images/dashboard/arrow1.png";
import arrow3 from "../assets/Images/images/dashboard/arrow3.png";
import moreArrow from "../assets/Images/images/dashboard/moreArrow.png";
import infoIcon from "../assets/Images/images/dashboard/infoIcon.png";
import topicIcon from "../assets/Images/images/dashboard/topicNew.png";
import timerIcon from "../assets/Images/images/dashboard/timerNew.png";
import difficultyIcon from "../assets/Images/images/dashboard/difficultyLevelNew.png";
import img1Icon from "../assets/Images/images/dashboard/img1New.png";
import img2Icon from "../assets/Images/images/dashboard/img2New.png";
import img3Icon from "../assets/Images/images/dashboard/img3New.png";
import img4Icon from "../assets/Images/images/dashboard/newImg4.png";
import img5Icon from "../assets/Images/images/dashboard/img5New.png";
import addQuizIcon from "../assets/Images/images/superadmin/add-quiz.png";
import addUserIcon from "../assets/Images/images/superadmin/add-user.png";
import switchUserIcon from "../assets/Images/images/superadmin/switch-user.png";
import eyeIcon from "../assets/Images/images/dashboard/eyeIcon.png"; 
import img3NewIcon from "../assets/Images/images/dashboard/img3New.png";
import ProgressBar from "@ramonak/react-progress-bar";

import Attempt1 from "../../public/images/dashboard/Attempt1.png";
import NoOfQuestion from "../../public/images/dashboard/NoOfQuestion.png";
import Clock from "../../public/images/dashboard/Clock.png";
import Start_button from "../../public/images/dashboard/Start-button.png";
import Share_button from "../../public/images/dashboard/Share-button.png";
import Edit_button from "../../src/assets/Images/dashboard/Edit-button.png";
import leaderboard_button from "../../public/images/dashboard/leaderboard-button.png";
import Easy from "../../public/images/dashboard/Easy.png";
//import LeftBar from "./leftbar";
//import { Navigation1 } from "react-calendar";

const Quiz = () => {
  const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30;
  const maxValue2 = 80; 
  const [latestResults, setLatestResults] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const [notAttemptedQuizzes, setNotAttemptedQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [topScoredQuizzes, setTopScoredQuizzes] = useState([]);
  const [allquizzes, setAllquizzes] = useState([]);
  const [getMoreQuizzes, setGetMoreQuizzes] = useState(false);


  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarOpen1, setIsNavbarOpen1] = useState(false);
  const [isNavbarOpen2, setIsNavbarOpen2] = useState(false);
  const [isNavbarOpen3, setIsNavbarOpen3] = useState(false);
  const [isNavbarOpen4, setIsNavbarOpen4] = useState(false);
  const [isNavbarOpen5, setIsNavbarOpen5] = useState(false);
  const [isNavbarOpen6, setIsNavbarOpen6] = useState(false);
  const [isNavbarOpen7, setIsNavbarOpen7] = useState(false);
  const [isNavbarOpen8, setIsNavbarOpen8] = useState(false);


  {/*const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const handleBackToQuiz = () => {
    router.push('/quiz');
  };

  const handleBackToNotification = () => {
    router.push('/notification');
  };

  const handleBackToProfile = () => {
    router.push('/profile');
  };*/}


 // const BasicProgressBar = ({ currentValue, maxValue }) => (
   // <progress value={currentValue} max={maxValue}>{currentValue}%</progress>
  //);

  const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );
  
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`https://quizifai.com:8010/latest_quizes?user_id=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        setTimeData(data.time_spent);
        setLatestResults(data.latest_results);
        setWeeklyQuizCount(data.weekly_quiz_count);
        setAverageScorePercentage(data.average_score_percentage);
        setNotAttemptedQuizzes(data.latest_not_attempted_quizzes);
        setAttemptedQuizzes(data.latest_attempted_quizzes);
        setTopScoredQuizzes(data.top_scored_quizzes);
        setAllquizzes(data.all_quizes);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const toggleGetMoreQuizzes = () => {
    setGetMoreQuizzes(true);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };
  const toggleNavbar1 = () => {
    setIsNavbarOpen1((prevState) => !prevState);
  };
  const toggleNavbar2 = () => {
    setIsNavbarOpen2((prevState) => !prevState);
  };
  const toggleNavbar3 = () => {
    setIsNavbarOpen3((prevState) => !prevState);
  };
  const toggleNavbar4 = () => {
    setIsNavbarOpen4((prevState) => !prevState);
  };
  const toggleNavbar5 = () => {
    setIsNavbarOpen5((prevState) => !prevState);
  };
  const toggleNavbar6 = () => {
    setIsNavbarOpen6((prevState) => !prevState);
  };
  const toggleNavbar7 = () => {
    setIsNavbarOpen7((prevState) => !prevState);
  };
  const toggleNavbar8 = () => {
    setIsNavbarOpen8((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Navigation/>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome Username</p>
          <div className={styles.headerRight}>
          <div className="w-[99px] h-[41px] absolute top-[30px] left-[800px] rounded-[10px] bg-[#FFEDCD]">
            <div className="flex">
              <img
                className="w-[25px] h-[25px] ml-2 mt-2"
                src={Plus}
                alt="Plus Icon"
              />
              <a href="./create-quiz" className="cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3">
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
          </div>
        </div>
        <div className={styles.completionInfo}>
        You've completed  {weeklyQuizCount} Quizzes this week with an average score of {averageScorePercentage}%
        </div>
       
        <div className={styles.contentWrapper1}>
          <div className={styles.latestQuizHeader}>
            <p>Latest Quiz</p>

            <span className={styles.moreLink}>
              More  <img src={arrow1} alt="More" width={15} height={8} />
            </span>
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <p className={styles.title}>{allquizzes[0]?.quiz_name}</p>

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
                  {allquizzes[0]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {allquizzes[0]?.quiz_description}
                </span>
              </div>

              <div className={styles.description}>
                <span>{allquizzes[0]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "20px" }}
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
                    <p>{allquizzes[0]?.quiz_attempts}</p>
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
                  {allquizzes[0]?.number_of_questions}
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
                  {allquizzes[0]?.quiz_duration}
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
                  {allquizzes[0]?.complexity}
                </span>
              </div>
            </div>

            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {allquizzes[1]?.quiz_name}
              </span>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar1}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                  </svg>
                  {isNavbarOpen1 && (
                    <div className={styles.infoIcons}>
                      <img
                        className="absolute h-[1px] w-[1px] left-[6px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                        Edit
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                        src={leaderboard_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                        Leaderboard
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                        src={Share_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                        Share
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {allquizzes[1]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {allquizzes[1]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{allquizzes[1]?.quiz_description}</span>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "20px" }}
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
                    <p>{allquizzes[1]?.quiz_attempts}</p>
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
                  {allquizzes[1]?.number_of_questions}
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
                  {allquizzes[1]?.quiz_duration}
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
                  {allquizzes[1]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {allquizzes[2]?.quiz_name}
              </span>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar2}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen2 ? "Close Navbar" : "Open Navbar"}
                  </svg>
                  {isNavbarOpen2 && (
                    <div className={styles.infoIcons}>
                      <img
                        className="absolute h-[1px] w-[1px] left-[6px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                        Edit
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                        src={leaderboard_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                        Leaderboard
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                        src={Share_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                        Share
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.category}>
                <span className={styles.category1}>
                  {allquizzes[2]?.category}
                </span>
                <p className="px-1 font-normal">|</p>
                <span className={styles.category1}>
                  {allquizzes[2]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{allquizzes[2]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "20px" }}
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
                    <p>{allquizzes[2]?.quiz_attempts}</p>
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
                  {allquizzes[2]?.number_of_questions}
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
                  {allquizzes[2]?.quiz_duration}
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
                  {allquizzes[2]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {allquizzes[3]?.quiz_name}
              </span>
              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar3}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen3 ? "Close Navbar" : "Open Navbar"}
                  </svg>
                  {isNavbarOpen3 && (
                    <div className={styles.infoIcons}>
                      <img
                        className="absolute h-[1px] w-[1px] left-[6px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                        Edit
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                        src={leaderboard_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                        Leaderboard
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                        src={Share_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                        Share
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {allquizzes[3]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {allquizzes[3]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{allquizzes[3]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "20px" }}
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
                    <p>{allquizzes[3]?.quiz_attempts}</p>
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
                  {allquizzes[3]?.number_of_questions}
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
                  {allquizzes[3]?.quiz_duration}
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
                  {allquizzes[3]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {allquizzes[4]?.quiz_name}
              </span>
              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar4}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen4 ? "Close Navbar" : "Open Navbar"}
                  </svg>
                  {isNavbarOpen4 && (
                    <div className={styles.infoIcons}>
                      <img
                        className="absolute h-[1px] w-[1px] left-[6px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                        Edit
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                        src={leaderboard_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                        Leaderboard
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                        src={Share_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                        Share
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.category}>
                <span className={styles.category1}>
                  {allquizzes[4]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {allquizzes[4]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{allquizzes[4]?.quiz_description}</span>
              </div>
              <div
                className={styles.additionalInfo}
                style={{ marginTop: "20px" }}
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
                    <p>{allquizzes[4]?.quiz_attempts}</p>
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
                  {allquizzes[4]?.number_of_questions}
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
                  {allquizzes[4]?.quiz_duration}
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
                  {allquizzes[4]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {allquizzes[5]?.quiz_name}
              </span>
              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={toggleNavbar5}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                    {isNavbarOpen5 ? "Close Navbar" : "Open Navbar"}
                  </svg>
                  {isNavbarOpen5 && (
                    <div className={styles.infoIcons}>
                      <img
                        className="absolute h-[1px] w-[1px] left-[6px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                        Edit
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                        src={leaderboard_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                        Leaderboard
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                        src={Share_button}
                        alt="Play icon"
                      />
                      <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                        Share
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.category}>
                <span className={styles.category1}>
                  {allquizzes[5]?.category}
                </span>
                <p className="px-[2px] font-normal">|</p>
                <span className={styles.category1}>
                  {allquizzes[5]?.sub_category}
                </span>
              </div>

              <div className={styles.description}>
                <span>{allquizzes[5]?.quiz_description}</span>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "20px" }}
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
                    <p>{allquizzes[5]?.quiz_attempts}</p>
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
                  {allquizzes[5]?.number_of_questions}
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
                  {allquizzes[5]?.quiz_duration}
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
                  {allquizzes[5]?.complexity}
                </span>
              </div>
            </div>
            {getMoreQuizzes && (
              <div className=" ">
                <div className="flex">
                  <div
                    className={styles.card}
                    style={{
                      paddingTop: "8px",
                      backgroundColor: "#CFFCFF",
                    }}
                  >
                    <span className={styles.title}>
                      {allquizzes[6]?.quiz_name}
                    </span>
                    <div className={styles.iconContainer}>
                      <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                          onClick={toggleNavbar6}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                          {isNavbarOpen6 ? "Close Navbar" : "Open Navbar"}
                        </svg>
                        {isNavbarOpen6 && (
                          <div className={styles.infoIcons}>
                            <img
                              className="absolute h-[1px] w-[1px] left-[6px] top-1"
                              src={Start_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                              Start
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                              src={Edit_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                              Edit
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                              src={leaderboard_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                              Leaderboard
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                              src={Share_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                              Share
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.category}>
                      <span className={styles.category1}>
                        {allquizzes[6]?.category}
                      </span>
                      <p className="px-[2px] font-normal">|</p>
                      <span className={styles.category1}>
                        {allquizzes[6]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.description}>
                      <span>{allquizzes[6]?.quiz_description}</span>
                    </div>
                    <div
                      className={styles.additionalInfo}
                      style={{ marginTop: "20px" }}
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
                          <p>{allquizzes[6]?.quiz_attempts}</p>
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
                        {allquizzes[6]?.number_of_questions}
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
                        {allquizzes[6]?.quiz_duration}
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
                        {allquizzes[6]?.complexity}
                      </span>
                    </div>
                  </div>

                  <div
                    className={styles.card}
                    style={{ paddingTop: "8px", backgroundColor: "#CFFCFF" }}
                  >
                    <span className={styles.title}>
                      {allquizzes[7]?.quiz_name}
                    </span>
                    <div className={styles.iconContainer}>
                      <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                          onClick={toggleNavbar7}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                          {isNavbarOpen7 ? "Close Navbar" : "Open Navbar"}
                        </svg>
                        {isNavbarOpen7 && (
                          <div className={styles.infoIcons}>
                            <img
                              className="absolute h-[1px] w-[1px] left-[6px] top-1"
                              src={Start_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                              Start
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                              src={Edit_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                              Edit
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                              src={leaderboard_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                              Leaderboard
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                              src={Share_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                              Share
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.category}>
                      <span className={styles.category1}>
                        {allquizzes[7]?.category}
                      </span>
                      <p className="px-[2px] font-normal">|</p>
                      <span className={styles.category1}>
                        {allquizzes[7]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.description}>
                      <span>{allquizzes[7]?.quiz_description}</span>
                    </div>
                    <div
                      className={styles.additionalInfo}
                      style={{ marginTop: "20px" }}
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
                          <p>{allquizzes[7]?.quiz_attempts}</p>
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
                        {allquizzes[7]?.number_of_questions}
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
                        {allquizzes[7]?.quiz_duration}
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
                        {allquizzes[7]?.complexity}
                      </span>
                    </div>
                  </div>
                  <div
                    className={styles.card}
                    style={{ paddingTop: "8px", backgroundColor: "#CFFCFF" }}
                  >
                    <span className={styles.title}>
                      {allquizzes[8]?.quiz_name}
                    </span>
                    <div className={styles.iconContainer}>
                      <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                          onClick={toggleNavbar8}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                          {isNavbarOpen8 ? "Close Navbar" : "Open Navbar"}
                        </svg>
                        {isNavbarOpen8 && (
                          <div className={styles.infoIcons}>
                            <img
                              className="absolute h-[1px] w-[1px] left-[6px] top-1"
                              src={Start_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                              Start
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                              src={Edit_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                              Edit
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                              src={leaderboard_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                              Leaderboard
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                              src={Share_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                              Share
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.category}>
                      <span className={styles.category1}>
                        {allquizzes[8]?.category}
                      </span>
                      <p className="px-[2px] font-normal">|</p>
                      <span className={styles.category1}>
                        {allquizzes[8]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.description}>
                      <span>{allquizzes[8]?.quiz_description}</span>
                    </div>
                    <div
                      className={styles.additionalInfo}
                      style={{ marginTop: "20px" }}
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
                          <p>{allquizzes[8]?.quiz_attempts}</p>
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
                        {allquizzes[8]?.number_of_questions}
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
                        {allquizzes[8]?.quiz_duration}
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
                        {allquizzes[8]?.complexity}
                      </span>
                    </div>
                  </div>
                </div>
                {/* attempted-quiz  */}
                <div className="flex">
                  <div
                    className={styles.card}
                    style={{
                      paddingTop: "8px",
                    }}
                  >
                    <span className={styles.title} style={{width:"210px"}}>
                      {/* {allquizzes[85]?.quiz_name} */}mathemetics quizes mathemtetics quizes mathemetics
                      <span className={styles.subtitle}>mathemetics quizes mathemtetics quizes mathemetics</span>
                    </span>
                    <div className={styles.iconContainer}>
                      <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                          onClick={toggleNavbar6}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                          {isNavbarOpen6 ? "Close Navbar" : "Open Navbar"}
                        </svg>
                        {isNavbarOpen6 && (
                          <div className={styles.infoIcons}>
                            <img
                              className="absolute h-[1px] w-[1px] left-[6px] top-1"
                              src={eye}
                              alt="Play icon"
                            />
                            <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                              View
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                              src={download}
                              alt="download icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                              Download
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                              src={leaderboard_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                              Leaderboard
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                              src={Share_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                              Share
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.category}>
                      <span className={styles.category1}>
                        {attemptedquizzes[0]?.category}
                      </span>
                      <p className="px-[2px] font-normal">|</p>
                      <span className={styles.category1}>
                        {attemptedquizzes[0]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.description}>
                      <span>{allquizzes[85]?.quiz_description}
                      <span className={styles.subdescription}>{allquizzes[85]?.quiz_description}</span></span>
                    </div>

                    {/* attaempted ranks */}
                    <div className="text-[6px] font-normal pl-[15px] relative top-[40px]">
                      <span>Pass</span>
                      <span className="px-[2px]">|</span>
                      <span>
                      {attemptedquizzes[0]?.speed_rank}<sup>th</sup>Fastest
                      </span>
                      <span className="px-[2px]">|</span>
                      <span>
                      {attemptedquizzes[0]?.score_rank} <sup>th</sup>Highest
                      </span>
                      <span className="px-[2px]">|</span>
                      <span>{attemptedquizzes[0]?.attempt_percentage}% Score</span><br/>
                      <span>{attemptedquizzes[0]?.quiz_grade} Grade</span>
                    </div>
                    <div
                      className={styles.additionalInfo}
                      style={{ marginTop: "10px" }}
                    >
                      <div
                        className={styles.infoIcon}
                        style={{ marginTop: "20px" }}
                      ></div>
                      <div className="z-0">
                        <div className="text-[7px] flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                          <img
                            className="h-[15px] w-[13px] pl-[3px] pb-1"
                            src={Attempt1}
                            alt="Attempts Icon"
                            width={10}
                            height={10}
                          />
                          <p>{attemptedquizzes[0]?.attempts_count} </p>
                          <span
                            title="number of times quiz attempted"
                            className="text-[6px] ml-2 cursor-pointer"
                          >
                            quiz attempts
                          </span>
                        </div>
                      </div>

                      <span className=" text-[7px] flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                        <img
                          className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                          src={high_score}
                          alt="Number of question Icon"
                          width={15}
                          height={10}
                        />{" "}
                        {attemptedquizzes[0]?.attained_score}/{attemptedquizzes[0]?.total_score}
                        <div
                          title="attained score/total score"
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" ml-[8px]">score</span>
                        </div>
                      </span>
                      <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={NoOfQuestion}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {attemptedquizzes[0]?.attempted_questions}/{attemptedquizzes[0]?.total_questions}
                        <div
                          title="attempted qustions/total questions"
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" ml-[6px]">attemped</span>
                        </div>
                      </span>
                      <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={Clock}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {attemptedquizzes[0]?.attempt_duration_mins}/{attemptedquizzes[0]?.quiz_duration}
                        <div
                          title="time taken for attempted/total duration of quiz "
                          className="cursor-pointer text-[6px]"
                        >
                          <span className="-ml-[2px]">duration</span>
                        </div>
                      </span>
                      {/* <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {allquizzes[6]?.complexity}
                </span> */}
                    </div>
                  </div>
                  {/* second-card  */}
                  <div
                    className={styles.card}
                    style={{
                      paddingTop: "8px",
                    }}
                  >
                    <span className={styles.title}>
                      {allquizzes[6]?.quiz_name}
                    </span>
                    <div className={styles.iconContainer}>
                      <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                          onClick={toggleNavbar6}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                          {isNavbarOpen6 ? "Close Navbar" : "Open Navbar"}
                        </svg>
                        {isNavbarOpen6 && (
                          <div className={styles.infoIcons}>
                            <img
                              className="absolute h-[1px] w-[1px] left-[6px] top-1"
                              src={eye}
                              alt="Play icon"
                            />
                            <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                              View
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                              src={download}
                              alt="download icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                              Download
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                              src={leaderboard_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                              Leaderboard
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                              src={Share_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                              Share
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.category}>
                      <span className={styles.category1}>
                        {allquizzes[6]?.category}
                      </span>
                      <p className="px-[2px] font-normal">|</p>
                      <span className={styles.category1}>
                        {allquizzes[6]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.description}>
                      <span>{allquizzes[6]?.quiz_description}</span>
                    </div>

                    {/* attaempted ranks */}
                    <div className="text-[6px] font-normal pl-[15px] relative top-[48px]">
                      <span>pass</span>
                      <span className="px-[2px]">|</span>
                      <span>
                        8 <sup>th</sup>fastest
                      </span>
                      <span className="px-[2px]">|</span>
                      <span>
                        4 <sup>th</sup>height
                      </span>
                      <span className="px-[2px]">|</span>
                      <span>grade</span>
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
                          <p>{allquizzes[6]?.quiz_attempts}</p>
                          <span
                            title="number of times quiz attempted"
                            className="text-[6px] ml-1 cursor-pointer"
                          >
                            quiz attempts
                          </span>
                        </div>
                      </div>

                      <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                        <img
                          className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                          src={high_score}
                          alt="Number of question Icon"
                          width={15}
                          height={10}
                        />{" "}
                        {allquizzes[6]?.number_of_questions}
                        <div
                          title="attained score/total score"
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" ml-[1px]">2/</span>
                          <span className=" ml-[1px]">10</span>
                          <span className=" ml-[1px]">score</span>
                        </div>
                      </span>
                      <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={NoOfQuestion}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {allquizzes[6]?.quiz_duration}
                        <div
                          title="attempted qustions/total questions"
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" -ml-[1px]">4/</span>
                          <span className=" ml-[1px]">10</span>
                          <span className=" ml-[1px]">attemped</span>
                        </div>
                      </span>
                      <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={Clock}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {allquizzes[6]?.quiz_duration}
                        <div
                          title="time taken for attempted/total duration of quiz "
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" -ml-[1px]">8/</span>
                          <span className=" ml-[1px]">20</span>
                          <span className=" ml-[1px]">duration</span>
                        </div>
                      </span>
                      {/* <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {allquizzes[6]?.complexity}
                </span> */}
                    </div>
                  </div>
                  {/* third-card  */}
                  <div
                    className={styles.card}
                    style={{
                      paddingTop: "8px",
                    }}
                  >
                    <span className={styles.title}>
                      {allquizzes[6]?.quiz_name}
                    </span>
                    <div className={styles.iconContainer}>
                      <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                          onClick={toggleNavbar6}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                          {isNavbarOpen6 ? "Close Navbar" : "Open Navbar"}
                        </svg>
                        {isNavbarOpen6 && (
                          <div className={styles.infoIcons}>
                            <img
                              className="absolute h-[1px] w-[1px] left-[6px] top-1"
                              src={eye}
                              alt="Play icon"
                            />
                            <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                              View
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                              src={download}
                              alt="download icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                              Download
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                              src={leaderboard_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                              Leaderboard
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                              src={Share_button}
                              alt="Play icon"
                            />
                            <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                              Share
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.category}>
                      <span className={styles.category1}>
                        {allquizzes[6]?.category}
                      </span>
                      <p className="px-[2px] font-normal">|</p>
                      <span className={styles.category1}>
                        {allquizzes[6]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.description}>
                      <span>{allquizzes[6]?.quiz_description}</span>
                    </div>

                    {/* attaempted ranks */}
                    <div className="text-[6px] font-normal pl-[15px] relative top-[48px]">
                      <span>pass</span>
                      <span className="px-[2px]">|</span>
                      <span>
                        8 <sup>th</sup>fastest
                      </span>
                      <span className="px-[2px]">|</span>
                      <span>
                        4 <sup>th</sup>height
                      </span>
                      <span className="px-[2px]">|</span>
                      <span>grade</span>
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
                          <p>{allquizzes[6]?.quiz_attempts}</p>
                          <span
                            title="number of times quiz attempted"
                            className="text-[6px] ml-1 cursor-pointer"
                          >
                            quiz attempts
                          </span>
                        </div>
                      </div>

                      <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                        <img
                          className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                          src={high_score}
                          alt="Number of question Icon"
                          width={15}
                          height={10}
                        />{" "}
                        {allquizzes[6]?.number_of_questions}
                        <div
                          title="attained score/total score"
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" ml-[1px]">2/</span>
                          <span className=" ml-[1px]">10</span>
                          <span className=" ml-[1px]">score</span>
                        </div>
                      </span>
                      <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={NoOfQuestion}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {allquizzes[6]?.quiz_duration}
                        <div
                          title="attempted qustions/total questions"
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" -ml-[1px]">4/</span>
                          <span className=" ml-[1px]">10</span>
                          <span className=" ml-[1px]">attemped</span>
                        </div>
                      </span>
                      <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={Clock}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {allquizzes[6]?.quiz_duration}
                        <div
                          title="time taken for attempted/total duration of quiz "
                          className="cursor-pointer text-[6px]"
                        >
                          <span className=" -ml-[1px]">8/</span>
                          <span className=" ml-[1px]">20</span>
                          <span className=" ml-[1px]">duration</span>
                        </div>
                      </span>
                      {/* <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {allquizzes[6]?.complexity}
                </span> */}
                    </div>
                  </div>
                </div>

                {/* <div className="flex">
                 
                 <div className={styles.card} style={{paddingTop:"13px",backgroundColor:"#CFFCFF"}}>
              <span className={styles.title}>
              {allquizzes[9]?.quiz_name}
              </span>
              <div className={styles.infoBox} style={{marginTop:"15px"}}>
                <span className="h-[50px] w-[50px] text-[8px] ">
                  {allquizzes[9]?.quiz_description}
                </span>
                
                <div className="flex relative top-[40px]">
                <span className="text-nowrap w-[121.5px]">{allquizzes[9]?.category}</span>
                <p className="relative px-4 ">|</p>
                <span className="w-[90px]  text-nowrap">{allquizzes[9]?.sub_category}</span>
                </div>

                <div className={styles.additionalInfo} style={{marginTop:"38px"}} >
                  
                  <div className="">
                    <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[12px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                      <img
                        className="h-[15px] w-[13px] pl-[3px] pb-1 mr-[3px]"
                        src={Attempt1}
                        alt="Attempts Icon"
                        width={10}
                        height={10}
                      />
                      <p>{allquizzes[9]?.quiz_attempts}</p>
                    </div>
                  </div>

                  <span className="flex -pl-1 pt-1 -mt-[86.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img className="pb-[1px] -mt-1  -pt-[10px] relative bottom-[2px]"
                      src={NoOfQuestion}
                      alt="Number of question Icon"
                      width={17}
                      height={16}
                    />{" "}
                    {allquizzes[9]?.number_of_questions}
                  </span>
                  <span className="flex pl-[1px] pt-[5px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img 
                      className="pb-[1px] mr-[4px] relative left-[1px] "
                      src={Clock}
                      alt="Time Icon"
                      width={10}
                      height={5}
                    />{" "}
                    {allquizzes[9]?.quiz_duration}
                  </span>
                  <span className="flex pt-1 -mt-[0.5px] gap-[5px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="pl-[2px] pt-[2px] pb-[2px] pr-[3px]"
                      src={Easy}
                      alt="Challenge Icon"
                      width={15}
                      height={9}
                    />{" "}
                    {allquizzes[9]?.complexity}
                  </span>
                  <div className={styles.iconContainer}> 
                    <div className=" pt-[4px] mb-[2px] px-[20px] rounded relative -left-[10px] -top-[6px] py-[4.5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200" onClick={toggleNavbar}>
                     <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                      {isNavbarOpen && (
                      <div className=" pl-[6px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                        <img className="absolute h-[3px] w-[3px] -left-[10px] top-1" src={Start_button} alt="Play icon"/>
                    <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">Play</span>
                    <img className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]" src={Edit_button} alt="Play icon"/>
                    <span  className=" ml-[18px] absolute top-[2.5px] cursor-pointer hover:text-black">Edit</span>
                      </div>
                     )}

                    </div>
                  </div>
                </div>
              </div>
            </div> 
                </div> */}
              </div>
            )}
          </div>
          <div className={styles.topScoredHeader}>
            <p>Top Scored</p>
          </div>
          <div className={styles.infoCards}>
            
            {/* Info cards content */}
            <div className={styles.card } style={{backgroundColor:"#CFFCFF"}}>
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <div className={styles.sortBy}>
  <p>Sort by:</p>
  <div className={styles.dropdowns}>
    <select className={styles.dropdown}>
      <option value="toughness">Toughness</option>
      {/*  options  */}
    </select>
    <select className={styles.dropdown1}>
      <option value="topic">Topic</option>
      {/* options  */}
    </select>
    <select className={styles.dropdown2}>
      <option value="toughness">Toughness</option>
      {/* options*/}
    </select>
  </div>
</div>
<div className={styles.infoCards1 } >
            {/* Info cards content */}
            <div className={styles.card} style={{backgroundColor:"#CFFCFF"}}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
                    <img
                      src="/images/dashboard/infoIcon.png"
                      alt="Separate Icon"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginLeft: "40px",
                      }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src="/images/dashboard/topicNew.png"
                      alt="Topic Icon"
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                    <img src="/images/dashboard/timerNew.png" alt="Time Icon" />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src="/images/dashboard/difficultyLevelNew.png"
                      alt="Easy Icon"
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img
    src={eyeIcon} 
    alt="Icon 1"
    width={13}
    height={6}
    style={{ marginLeft: "5px", marginTop: "1px" }}
  />
  <img
    src={img3NewIcon} 
    alt="Icon 3"
    width={8}
    height={8}
  />

                   
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card} style={{backgroundColor:"#CFFCFF"}}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                <div className={styles.infoIcon}>
                    <img
                      src="/images/dashboard/infoIcon.png"
                      alt="Separate Icon"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginLeft: "40px",
                      }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src="/images/dashboard/topicNew.png"
                      alt="Topic Icon"
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                    <img src="/images/dashboard/timerNew.png" alt="Time Icon" />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src="/images/dashboard/difficultyLevelNew.png"
                      alt="Easy Icon"
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img
    src={eyeIcon} 
    alt="Icon 1"
    width={13}
    height={6}
    style={{ marginLeft: "5px", marginTop: "1px" }}
  />
  <img
    src={img3NewIcon} 
    alt="Icon 3"
    width={8}
    height={8}
  />

                   
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                <div className={styles.infoIcon}>
                    <img
                      src="/images/dashboard/infoIcon.png"
                      alt="Separate Icon"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginLeft: "40px",
                      }}
                    />
                  </div>
                  <span className={styles.infoItem}>
                    <img
                      src="/images/dashboard/topicNew.png"
                      alt="Topic Icon"
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                    <img src="/images/dashboard/timerNew.png" alt="Time Icon" />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src="/images/dashboard/difficultyLevelNew.png"
                      alt="Easy Icon"
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img
    src={eyeIcon} 
    alt="Icon 1"
    width={13}
    height={6}
    style={{ marginLeft: "5px", marginTop: "1px" }}
  />
  <img
    src={img3NewIcon} 
    alt="Icon 3"
    width={8}
    height={8}
  />

                   
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
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
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
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
            
           </div>
           </div>
           </div>
      <LogoutBar/>
    </div>
  );
};

export default Quiz;
