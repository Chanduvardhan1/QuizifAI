// Dashboard.js
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { Line } from "rc-progress";

// import LogoutBar from "./logoutbar";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Image from "next/image";
import searchIcon from "../../src/assets/Images/images/dashboard/searchBar.png";
import Start_button from "../../public/images/dashboard/Start-button.png";
import Share_button from "../../public/images/dashboard/Share-button.png";
import leaderboard_button from "../../public/images/dashboard/leaderboard-button.png";
import Edit_button from "../../public/images/dashboard/Edit-button.png";
import Attempt1 from "../../public/images/dashboard/Attempt1.png";
import NoOfQuestion from "../../public/images/dashboard/NoOfQuestion.png";
import Easy from "../../public/images/dashboard/Easy.png";
import Clock from "../../public/images/dashboard/Clock.png";

// import Clock from "../../public/images/dashboard/Clock.png";
import moreArrow from "../../src/assets/Images/images/dashboard/moreArrow.png";
import infoIcon from "../../src/assets/Images/images/dashboard/infoIcon.png";
import topicIcon from "../../src/assets/Images/images/dashboard/topicNew.png";
import difficultyIcon from "../../src/assets/Images/images/dashboard/difficultyLevelNew.png";
import img1Icon from "../../src/assets/Images/images/dashboard/img1New.png";
import img2Icon from "../../src/assets/Images/images/dashboard/img2New.png";
import img3Icon from "../../src/assets/Images/images/dashboard/img3New.png";
import img4Icon from "../../src/assets/Images/images/dashboard/newImg4.png";
import img5Icon from "../../src/assets/Images/images/dashboard/img5New.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const Dashboard = () => {
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
  // const [timespent, setTimespent] = useState([]);
  const [latestResult, setLatestResult] = useState([]);
  // const [grade, setGrade] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const [getMoreQuizzes, setGetMoreQuizzes] = useState(false);

  // const [notAttemptedQuizzes, setNotAttemptedQuizzes] = useState([]);
  const [latestquizzes, setLatestquizzes] = useState([]);
  // const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [popularquizzes, setPopularquizzes] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState(localStorage.getItem("user_name"));
  useEffect(() => {
    // const storedUsername = sessionStorage.getItem('userName');
    // if (storedUsername) {
    //   setUserName(storedUsername);
    // }
    // console.log('Username set in sessionStorage:', storedUsername);

    const fetchQuizData = async () => {
      // Retrieve user_id and user_name from localStorage
      console.log("User ID:", userId);
      console.log("User Name:", username);
      try {
        const response = await fetch(
          `https://quizifai.com:8010/latest_quizes?user_id=${userId}&username=${username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              username: username, // Ensure correct payload format
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        console.log("data - ", data);
        setTimeData(data.time_spent);
        // setTimespent(data.cal_date);
        setLatestResult(data.latest_result);
        // setGrade(data.quiz_grade);

        setWeeklyQuizCount(data.weekly_quiz_count);
        setAverageScorePercentage(data.average_score_percentage);

        setLatestquizzes(data.latest_quizzes);
        // setAttemptedQuizzes(data.latest_attempted_quizzes);
        // setTopScoredQuizzes(data.top_scored_quizzes);
        setPopularquizzes(data.popular_quizzes);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId, username]);

  // const calculateTotalMinutes = (day) => {
  //   return timeData
  //     .filter((item) => item.day_of_week.toLowerCase() === day.toLowerCase())
  //     .reduce(
  //       (total, item) => total + parseInt(item.time_spent.split(" ")[0]),
  //       0
  //     );
  // };

  // Function to format time duration
  // const formatTime = (minutes) => {
  //   if (minutes >= 60) {
  //     const hours = Math.floor(minutes / 60);
  //     const remainingMinutes = minutes % 60;
  //     if (remainingMinutes === 0) {
  //       return `${hours}h`;
  //     } else {
  //       return `${hours}h ${remainingMinutes}m`;
  //     }
  //   } else {
  //     return `${minutes} min`;
  //   }
  // };
  const toggleNavbar = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };

  const toggleGetMoreQuizzes = () => {
    setGetMoreQuizzes(true);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  function getColor(grade) {
    if (grade === "A") {
      return "#15803d"; //Green Color
    } else if (grade === "B") {
      return "#F6970D"; //Orange
    } else if (grade === "C") {
      return "#F5E23F"; //Yellow
    } else if (grade === "D") {
      return "#808080"; // Gray
    } else {
      return "#F34747";
    }
  }

  function getColorPercentage(percentData) {
    if (percentData === 0) {
      return "#808080"; // Gray color
    } else if (percentData <= 60) {
      return "#F34747"; // Red color
    } else if (percentData > 60 && percentData < 80) {
      return "#F5E23F"; // Yellow
    } else if (percentData >= 81 && percentData < 90) {
      return "#F6970D"; // Orange
    } else {
      return "#15803d"; // Green Color
    }
  }

  const textColorClass = getColor(latestResult[0]?.quiz_grade);
  const textColorClass1 = getColor(latestResult[1]?.quiz_grade);
  const textColorClass2 = getColor(latestResult[2]?.quiz_grade);
  const textColorClass3 = getColor(latestResult[3]?.quiz_grade);
  console.log("percentage - ", latestResult);

  return (
    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Navigation />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome {username}</p>

          <div className={styles.headerRight}>
            <div>{getFormattedDate()}</div>
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
          You've completed {weeklyQuizCount} Quizzes this week with an average
          score of {averageScorePercentage}%
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.resultWrapper}>
            <div
              className={styles.latestResult}
              style={{ paddingTop: "12px", paddingBottom: "13px" }}
            >
              Latest Result
              {/* <span className={styles.moreButton} style={{marginLeft:"170px"}}>
                More <img src={arrow1} alt="More" width={15} height={8} />
              </span> */}
              <div className={styles.resultInfo}>
                <div className={styles.infoLine}>
                  <span
                    className={styles.info}
                    style={{
                      fontSize: "10px",
                      color: "grey",
                      textWrap: "nowrap",
                    }}
                  >
                    {latestResult[0]?.attempt_date}
                    <span className={styles.titlename}>
                      {latestResult[0]?.quiz_name}
                    </span>{" "}
                    {/* - {latestResults[0]?.quiz_category} */}
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      width: "130px",
                      height: "8px",
                      fontSize: "8px",
                      marginTop: "7px",
                      marginRight: "15px",
                    }}
                  >
                    <Line
                      percent={latestResult[0]?.quiz_percentage}
                      strokeWidth={4}
                      strokeColor={getColorPercentage(
                        latestResult[0]?.quiz_percentage
                      )}
                    />
                    {/* <Progress percent={latestResults[0]?.attained_percentage} /> */}
                  </span>
                  <span
                    className={`text-[10px]  `}
                    style={{ color: textColorClass, marginTop: "5px" }}
                  >
                    {latestResult[0]?.quiz_percentage}%
                  </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.infoLine}>
                  <span
                    className={styles.info}
                    style={{ fontSize: "10px", color: "grey" }}
                  >
                    {latestResult[1]?.attempt_date}
                    <span className={styles.titlename}>
                      {latestResult[1]?.quiz_name}
                    </span>{" "}
                    {/* - {latestResults[1]?.quiz_category} */}
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      width: "130px",
                      height: "8px",
                      fontSize: "8px",
                      marginTop: "7px",
                      marginRight: "10px",
                    }}
                  >
                    <Line
                      percent={latestResult[1]?.quiz_percentage}
                      strokeWidth={4}
                      strokeColor={getColorPercentage(
                        latestResult[1]?.quiz_percentage
                      )}
                    />

                    {/* <Progress percent={latestResults[1]?.attained_percentage} /> */}
                  </span>
                  <span
                    className={`text-[10px] `}
                    style={{ color: textColorClass1 }}
                  >
                    {latestResult[1]?.quiz_percentage}%
                  </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.infoLine} style={{ fontSize: "10px" }}>
                  <span
                    className={styles.info}
                    style={{ fontSize: "10px", color: "grey" }}
                  >
                    {latestResult[2]?.attempt_date}{" "}
                    <span className={styles.titlename}>
                      {latestResult[2]?.quiz_name}
                    </span>
                    {/* - {latestResults[2]?.quiz_category} */}
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      width: "130px",
                      height: "8px",
                      fontSize: "8px",
                      marginTop: "7px",
                      marginRight: "15px",
                    }}
                  >
                    <Line
                      percent={latestResult[2]?.quiz_percentage}
                      strokeWidth={4}
                      strokeColor={getColorPercentage(
                        latestResult[2]?.quiz_percentage
                      )}
                    />

                    {/* <Progress percent={latestResults[2]?.attained_percentage} /> */}
                  </span>
                  <span
                    className={`text-[10px] `}
                    style={{ color: textColorClass2 }}
                  >
                    {latestResult[2]?.quiz_percentage}%
                  </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.infoLine} style={{ fontSize: "10px" }}>
                  <span
                    className={styles.info}
                    style={{ fontSize: "10px", color: "grey" }}
                  >
                    {latestResult[3]?.attempt_date}{" "}
                    <span className={styles.titlename}>
                      {latestResult[3]?.quiz_name}
                    </span>
                    {/* - {latestResults[2]?.quiz_category} */}
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      width: "130px",
                      height: "8px",
                      fontSize: "8px",
                      marginTop: "6px",
                      marginRight: "15px",
                    }}
                  >
                    <Line
                      percent={latestResult[3]?.quiz_percentage}
                      strokeWidth={4}
                      strokeColor={getColorPercentage(
                        latestResult[3]?.quiz_percentage
                      )}
                    />
                    {/* <Progress percent={latestResults[2]?.attained_percentage} /> */}
                  </span>
                  <span
                    className={`text-[10px]`}
                    style={{ color: textColorClass3 }}
                  >
                    {latestResult[3]?.quiz_percentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.resultWrapper}>
            <div className={styles.timeSpent} style={{ paddingTop: "10px" }}>
              Time Spent (Last 7 Days)
              <span className={styles.moreButton}>
                {/* <img src={arrow3} alt="More" width={11} height={5} /> */}
              </span>
              <div className={styles.progressBar}>
                {Array.isArray(timeData) && timeData.length > 0 ? (
                  timeData.map((item, index) => (
                    <div className={styles.progressBarItem} key={index}>
                      <div className={styles.day}>{item.cal_date}</div>
                      <div className={styles.progress}>
                        <div
                          className={styles.progressFill}
                          style={{
                            height: `${item.timespent * 2}px`,
                          }}
                        ></div>
                      </div>
                      <div
                        className={styles.time}
                        style={{
                          fontSize: "8px",
                          marginTop: "5px",
                          textWrap: "nowrap",
                        }}
                      >
                        {formatTime(item.timespent)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper1}>
          <div
            className={styles.latestQuizHeader}
            style={{ marginLeft: "45px", marginTop: "" }}
          >
            <p>Latest Quizzes</p>

            <span className={styles.moreLink} onClick={toggleGetMoreQuizzes}>
              More{" "}
              <img
                className="ml-2"
                src={moreArrow}
                alt="More"
                width={17}
                height={10}
              />
            </span>
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {latestquizzes[0]?.quiz_name}
              </span>

              <div className={styles.iconContainer}>
                <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 -ml-[27px]  cursor-pointer rounded-lg hover:bg-slate-200"
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

              <div className="flex mt-1 pl-[15px] text-[9px]">
                <span className="text-nowrap font-normal cursor-pointer">
                  {latestquizzes[0]?.category}
                </span>
                <p className="relative px-[4px] font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer ">
                  {latestquizzes[0]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[7.5px]">
                  {latestquizzes[0]?.quiz_description}
                </span>
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
                    <p>{latestquizzes[0]?.quiz_attempts}</p>
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
                  {latestquizzes[0]?.number_of_questions}
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
                  {latestquizzes[0]?.quiz_duration}
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
                  {latestquizzes[0]?.complexity}
                </span>
              </div>
            </div>

            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {latestquizzes[1]?.quiz_name}
              </span>

              <div className="flex mt-1 pl-[15px] text-[9px]">
                <span className="text-nowrap font-normal cursor-pointer">
                  {latestquizzes[1]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer">
                  {latestquizzes[1]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[7.5px]">
                  {latestquizzes[1]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-3 h-2 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
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

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{latestquizzes[1]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {latestquizzes[1]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {latestquizzes[1]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {latestquizzes[1]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {latestquizzes[2]?.quiz_name}
              </span>
              <div className="flex mt-1 pl-[15px] ">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[2]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[2]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal">
                  {latestquizzes[2]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{latestquizzes[2]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {latestquizzes[2]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {latestquizzes[2]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {latestquizzes[2]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {latestquizzes[3]?.quiz_name}
              </span>

              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[3]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[3]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {latestquizzes[3]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{latestquizzes[3]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {latestquizzes[3]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {latestquizzes[3]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {latestquizzes[3]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {latestquizzes[4]?.quiz_name}
              </span>
              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[4]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[4]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {latestquizzes[4]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{latestquizzes[4]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {latestquizzes[4]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {latestquizzes[4]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {latestquizzes[4]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span className={styles.title}>
                {latestquizzes[5]?.quiz_name}
              </span>

              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[5]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {latestquizzes[5]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {latestquizzes[5]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{latestquizzes[5]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {latestquizzes[5]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {latestquizzes[5]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {latestquizzes[5]?.complexity}
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
                    <span
                      className={styles.title} >
                      {latestquizzes[6]?.quiz_name}
                    </span>
                    <div className="flex mt-1 pl-[15px] font-[8px]">
                      <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                        {latestquizzes[6]?.category}
                      </span>
                      <p className="relative px-4 font-normal">|</p>
                      <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                        {latestquizzes[6]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.infoBox1}>
                      <span className="h-[50px] w-[50px] font-normal text-[8px]">
                        {latestquizzes[6]?.quiz_description}
                      </span>
                    </div>

                    <div className={styles.iconContainer}>
                      <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                          onClick={toggleNavbar}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                        {isNavbarOpen && (
                          <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                            <img
                              className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                              src={Start_button}
                              alt="Play icon"
                            />
                            <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                              Start
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                              src={Edit_button}
                              alt="Play icon"
                            />
                            <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                              Edit
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={styles.additionalInfo}
                      style={{ marginTop: "23px" }}
                    >
                      <div
                        className={styles.infoIcon}
                        style={{ marginTop: "20px" }}
                      ></div>
                      <div className="">
                        <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                          <img
                            className="h-[15px] w-[13px] pl-[3px] pb-1"
                            src={Attempt1}
                            alt="Attempts Icon"
                            width={10}
                            height={10}
                          />
                          <p>{latestquizzes[6]?.quiz_attempts}</p>
                        </div>
                      </div>

                      <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                          src={NoOfQuestion}
                          alt="Number of question Icon"
                          width={15}
                          height={10}
                        />{" "}
                        {latestquizzes[6]?.number_of_questions}
                      </span>
                      <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={Clock}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {latestquizzes[6]?.quiz_duration}
                      </span>
                      <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                          src={Easy}
                          alt="Challenge Icon"
                          width={15}
                          height={9}
                        />{" "}
                        {latestquizzes[6]?.complexity}
                      </span>
                    </div>
                  </div>

                  <div
                    className={styles.card}
                    style={{ paddingTop: "8px", backgroundColor: "#CFFCFF" }}
                  >
                    <span
                      className={styles.title} >
                      {latestquizzes[7]?.quiz_name}
                    </span>
                    <div className="flex mt-1 pl-[15px] font-[8px]">
                      <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                        {latestquizzes[7]?.category}
                      </span>
                      <p className="relative px-4 font-normal">|</p>
                      <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                        {latestquizzes[7]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.infoBox1}>
                      <span className="h-[50px] w-[50px] font-normal text-[8px]">
                        {latestquizzes[7]?.quiz_description}
                      </span>
                    </div>

                    <div className={styles.iconContainer}>
                      <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                          onClick={toggleNavbar}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                        {isNavbarOpen && (
                          <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                            <img
                              className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                              src={Start_button}
                              alt="Play icon"
                            />
                            <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                              Start
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                              src={Edit_button}
                              alt="Play icon"
                            />
                            <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                              Edit
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={styles.additionalInfo}
                      style={{ marginTop: "23px" }}
                    >
                      <div
                        className={styles.infoIcon}
                        style={{ marginTop: "20px" }}
                      ></div>
                      <div className="">
                        <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                          <img
                            className="h-[15px] w-[13px] pl-[3px] pb-1"
                            src={Attempt1}
                            alt="Attempts Icon"
                            width={10}
                            height={10}
                          />
                          <p>{latestquizzes[7]?.quiz_attempts}</p>
                        </div>
                      </div>

                      <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                          src={NoOfQuestion}
                          alt="Number of question Icon"
                          width={15}
                          height={10}
                        />{" "}
                        {latestquizzes[7]?.number_of_questions}
                      </span>
                      <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={Clock}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {latestquizzes[7]?.quiz_duration}
                      </span>
                      <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                          src={Easy}
                          alt="Challenge Icon"
                          width={15}
                          height={9}
                        />{" "}
                        {latestquizzes[7]?.complexity}
                      </span>
                    </div>
                  </div>

                  <div
                    className={styles.card}
                    style={{ paddingTop: "8px", backgroundColor: "#CFFCFF" }}
                  >
                    <span
                      className={styles.title}>
                      {latestquizzes[8]?.quiz_name}
                    </span>
                    <div className="flex mt-1 pl-[15px] font-[8px]">
                      <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                        {latestquizzes[8]?.category}
                      </span>
                      <p className="relative px-4 font-normal">|</p>
                      <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                        {latestquizzes[8]?.sub_category}
                      </span>
                    </div>

                    <div className={styles.infoBox1}>
                      <span className="h-[50px] w-[50px] font-normal text-[8px]">
                        {latestquizzes[8]?.quiz_description}
                      </span>
                    </div>

                    <div className={styles.iconContainer}>
                      <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                          onClick={toggleNavbar}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                        {isNavbarOpen && (
                          <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                            <img
                              className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                              src={Start_button}
                              alt="Play icon"
                            />
                            <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                              Start
                            </span>
                            <img
                              className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                              src={Edit_button}
                              alt="Play icon"
                            />
                            <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                              Edit
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={styles.additionalInfo}
                      style={{ marginTop: "23px" }}
                    >
                      <div
                        className={styles.infoIcon}
                        style={{ marginTop: "20px" }}
                      ></div>
                      <div className="">
                        <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                          <img
                            className="h-[15px] w-[13px] pl-[3px] pb-1"
                            src={Attempt1}
                            alt="Attempts Icon"
                            width={10}
                            height={10}
                          />
                          <p>{latestquizzes[8]?.quiz_attempts}</p>
                        </div>
                      </div>

                      <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                          src={NoOfQuestion}
                          alt="Number of question Icon"
                          width={15}
                          height={10}
                        />{" "}
                        {latestquizzes[8]?.number_of_questions}
                      </span>
                      <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="pb-[1px] mr-[1px] relative left-[3px] "
                          src={Clock}
                          alt="Time Icon"
                          width={14}
                          height={14}
                        />{" "}
                        {latestquizzes[8]?.quiz_duration}
                      </span>
                      <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                        <img
                          className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                          src={Easy}
                          alt="Challenge Icon"
                          width={15}
                          height={9}
                        />{" "}
                        {latestquizzes[8]?.complexity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="flex">
                 
                 <div className={styles.card} style={{paddingTop:"13px",backgroundColor:"#CFFCFF"}}>
              <span className={styles.title}>
              {latestquizzes[9]?.quiz_name}
              </span>
              <div className={styles.infoBox} style={{marginTop:"15px"}}>
                <span className="h-[50px] w-[50px] text-[8px] ">
                  {latestquizzes[9]?.quiz_description}
                </span>
                
                <div className="flex relative top-[40px]">
                <span className="text-nowrap w-[121.5px]">{latestquizzes[9]?.category}</span>
                <p className="relative px-4 ">|</p>
                <span className="w-[90px]  text-nowrap">{latestquizzes[9]?.sub_category}</span>
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
                      <p>{latestquizzes[9]?.quiz_attempts}</p>
                    </div>
                  </div>

                  <span className="flex -pl-1 pt-1 -mt-[86.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img className="pb-[1px] -mt-1  -pt-[10px] relative bottom-[2px]"
                      src={NoOfQuestion}
                      alt="Number of question Icon"
                      width={17}
                      height={16}
                    />{" "}
                    {latestquizzes[9]?.number_of_questions}
                  </span>
                  <span className="flex pl-[1px] pt-[5px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img 
                      className="pb-[1px] mr-[4px] relative left-[1px] "
                      src={Clock}
                      alt="Time Icon"
                      width={10}
                      height={5}
                    />{" "}
                    {latestquizzes[9]?.quiz_duration}
                  </span>
                  <span className="flex pt-1 -mt-[0.5px] gap-[5px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="pl-[2px] pt-[2px] pb-[2px] pr-[3px]"
                      src={Easy}
                      alt="Challenge Icon"
                      width={15}
                      height={9}
                    />{" "}
                    {latestquizzes[9]?.complexity}
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
            <p>Most Popular</p>
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span
                className={styles.title}>
                {popularquizzes[0]?.quiz_name}
              </span>

              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[0]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[0]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {popularquizzes[0]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{popularquizzes[0]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {popularquizzes[0]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {popularquizzes[0]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {popularquizzes[0]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span
                className={styles.title}>
                {popularquizzes[1]?.quiz_name}
              </span>
              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[1]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[1]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {popularquizzes[1]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{popularquizzes[1]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {popularquizzes[1]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {popularquizzes[1]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {popularquizzes[1]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span
                className={styles.title}>
                {popularquizzes[2]?.quiz_name}
              </span>
              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[2]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[2]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {popularquizzes[2]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{popularquizzes[2]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {popularquizzes[2]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {popularquizzes[2]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {popularquizzes[2]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "8px" }}>
              <span
                className={styles.title}>
                {popularquizzes[3]?.quiz_name}
              </span>
              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[3]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[3]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {popularquizzes[3]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{popularquizzes[3]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {popularquizzes[3]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {popularquizzes[3]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {popularquizzes[3]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "10px" }}>
              <span
                className={styles.title}>
                {popularquizzes[4]?.quiz_name}
              </span>
              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[4]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[4]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {popularquizzes[4]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{popularquizzes[4]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {popularquizzes[4]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {popularquizzes[4]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {popularquizzes[4]?.complexity}
                </span>
              </div>
            </div>
            <div className={styles.card} style={{ paddingTop: "10px" }}>
              <span
                className={styles.title}>
                {popularquizzes[5]?.quiz_name}
              </span>
              <div className="flex mt-1 pl-[15px] font-[8px]">
                <span className="text-nowrap font-normal cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[5]?.category}
                </span>
                <p className="relative px-4 font-normal">|</p>
                <span className="font-normal  text-nowrap cursor-pointer hover:underline hover:underline-offset-2">
                  {popularquizzes[5]?.sub_category}
                </span>
              </div>

              <div className={styles.infoBox1}>
                <span className="h-[50px] w-[50px] font-normal text-[8px]">
                  {popularquizzes[5]?.quiz_description}
                </span>
              </div>

              <div className={styles.iconContainer}>
                <div className=" mb-[2px] pl-[36px] font-normal rounded  relative top-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-4 -ml-[23px]  cursor-pointer hover:bg-slate-200"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isNavbarOpen && (
                    <div className=" pl-[6px] text-[8px]  pt-[2px] -mt-[16px] ml-[10px] absolute ">
                      <img
                        className="absolute h-[3px] w-[3px] -left-[10px] top-1"
                        src={Start_button}
                        alt="Play icon"
                      />
                      <span className=" pl-[2px] -ml-[7px] cursor-pointer hover:text-black">
                        Start
                      </span>
                      <img
                        className="absolute h-[10px] w-[10px]  left-[32px] -ml-2 top-[5px]"
                        src={Edit_button}
                        alt="Play icon"
                      />
                      <span className=" ml-[15px] absolute top-[1.9px] cursor-pointer hover:text-black">
                        Edit
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.additionalInfo}
                style={{ marginTop: "23px" }}
              >
                <div
                  className={styles.infoIcon}
                  style={{ marginTop: "20px" }}
                ></div>
                <div className="">
                  <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[11px] -top-[90px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                    <img
                      className="h-[15px] w-[13px] pl-[3px] pb-1"
                      src={Attempt1}
                      alt="Attempts Icon"
                      width={10}
                      height={10}
                    />
                    <p>{popularquizzes[5]?.quiz_attempts}</p>
                  </div>
                </div>

                <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    src={NoOfQuestion}
                    alt="Number of question Icon"
                    width={15}
                    height={10}
                  />{" "}
                  {popularquizzes[5]?.number_of_questions}
                </span>
                <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="pb-[1px] mr-[1px] relative left-[3px] "
                    src={Clock}
                    alt="Time Icon"
                    width={14}
                    height={14}
                  />{" "}
                  {popularquizzes[5]?.quiz_duration}
                </span>
                <span className="flex pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black hover:underline underline-offset-2 cursor-pointer">
                  <img
                    className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    src={Easy}
                    alt="Challenge Icon"
                    width={15}
                    height={9}
                  />{" "}
                  {popularquizzes[5]?.complexity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LogoutBar />
    </div>
  );
};

export default Dashboard;
