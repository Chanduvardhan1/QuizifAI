// Dashboard.js
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { Line } from "rc-progress";
import { useNavigate } from "react-router-dom";

// import LogoutBar from "./logoutbar";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Image from "next/image";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Admin_User from "../../src/assets/Images/dashboard/Admin-User.png";
import searchIcon from "../../src/assets/Images/images/dashboard/searchBar.png";
import Start_button from "../../public/images/dashboard/Start-button.png";
import Share_button from "../../public/images/dashboard/Share-button.png";
import leaderboard_button from "../../public/images/dashboard/leaderboard-button.png";
import Edit_button from "../../src/assets/Images/dashboard/Edit-button.png";
import download from "../../src/assets/Images/dashboard/download.png";
import high_score from "../../src/assets/Images/dashboard/high-score.png";
import eye from "../../src/assets/Images/dashboard/eye.png";
import Attempt1 from "../../public/images/dashboard/Attempt1.png";
import NoOfQuestion from "../../public/images/dashboard/NoOfQuestion.png";
import Easy from "../../public/images/dashboard/Easy.png";
import Clock from "../../public/images/dashboard/Clock.png";

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

  const [latestResult, setLatestResult] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);

  const [getMoreQuizzes, setGetMoreQuizzes] = useState(false);

  const [notAttemptedQuizzes, setNotAttemptedQuizzes] = useState([]);
  const [latestquizzes, setLatestquizzes] = useState([]);
  // const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [popularquizzes, setPopularquizzes] = useState([]);
  const [attemptedquizzes, setAttemptedquizzes] = useState([]);
  const [allquizzes, setAllquizzes] = useState([]);

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState(localStorage.getItem("user_name"));
  const navigate = useNavigate();
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
        setPopularquizzes(data.popular_quizzes);
        setAttemptedquizzes(data.attempted_quiz_details);
        setAllquizzes(data.all_quizes);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId, username]);

  const card = ({ latestquizzes, attemptedquizzes }) => {
    const cardStyle = {
      backgroundColor: latestquizzes
        ? "#CFFCFF"
        : attemptedquizzes
        ? "#F5F5F5"
        : "#FFFFFF", // Grey for latest, blue for attempted
    };
  };

  const handleStartQuiz = (quizId) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/quizaccess`);
  };

  const leaderboard = (quizId) => {
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate('/quiz-results1', { state: { quizId } })
  };

  const Edit = (quizId) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/editmanuly`);
  };

  const [cardStates, setCardStates] = useState(Array(attemptedquizzes.length).fill(false));
  const toggleNavbar = (index) => {
    setCardStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  const [cardStatus, setCardStatus] = useState(Array(latestquizzes.length).fill(false));
  const toggleNavbar1 = (index) => {
    setCardStatus((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  const [cardStatuses, setCardStatuses] = useState(Array(popularquizzes.length).fill(false));
  const toggleNavbar2 = (index) => {
    setCardStatuses((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };
  

  const handleBackToQuizzes = () => {
    navigate('/quiz');
  };
  // const displayedQuizzes = getMoreQuizzes ? latestquizzes :latestquizzes.slice(0, 3);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  function getColor(grade) {
    if (grade === "A") {
      return "#15803d"; //Green Color
    } else if (grade === "B") {
      return "#F5E23F"; //yellow
    } else if (grade === "C") {
      return "#F6970D"; //orenge
    } else if (grade === "D") {
      return "#F34747"; // red
    } else {
      return "#808080";//grey
    }
  }

  function getColorPercentage(percentData) {
    if (percentData === 0) {
      return "#808080"; // Gray color
    } else if (percentData <= 60) {
      return "#F34747"; // Red color
    } else if (percentData > 60 && percentData < 80) {
      return "#F5E23F"; // yellow
    } else if (percentData >= 81 && percentData < 90) {
      return "#F6970D"; // orenge
    } else {
      return "#15803d"; // Green Color
    }
  }

  const results = latestResult.map((result, index) => {
    const textColorClass = getColor(result?.quiz_grade);
    return (
        <div key={index}>
            <div className={styles.infoLine}>
                <span className={styles.info} style={{ fontSize: "10px", color: "grey", textWrap: "nowrap" }}>
                    {result?.attempt_date}
                    <span className="relative group">
                        <span className="absolute ml-[10px] w-[100px] cursor-pointer z-0 truncate">
                            {result?.quiz_name}
                        </span>
                        <span className="cursor-pointer hidden group-hover:inline-block absolute left-0 top-5 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                            {result?.quiz_name}
                        </span>
                    </span>
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
                        percent={result?.quiz_percentage}
                        strokeWidth={4}
                        strokeColor={getColorPercentage(result?.quiz_percentage)}
                    />
                </span>
                <span className={`text-[10px]`} style={{ color: textColorClass }}>
                    {result?.quiz_percentage}%
                </span>
            </div>
            <hr className={styles.divider} />
        </div>
    );
});

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome {username}</p>

          <div className={styles.headerRight}>
            {/* <div>{getFormattedDate()}</div> */}
            {/* <div className="w-[99px] h-[41px] absolute mr-[160px] -mt-2 rounded-[10px] bg-[rgb(254,202,249)]">
              <div className="flex">
                <img
                  className="w-[25px] h-[25px] ml-2 mt-2"
                  src={Admin_User}
                  alt="Plus Icon"
                />
                <a
                  href="./quizadmin"
                  className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3"
                >
                  User
                </a>
              </div>
            </div> */}
            <div className="w-[99px] h-[41px] absolute mr-[80px] mb-2 pb-2 -mt-[35px] rounded-[10px] bg-[#fee2e2]">
              <div className="flex">
                <img
                  className="w-[25px] h-[25px] ml-2 mt-2"
                  src={Plus}
                  alt="Plus Icon"
                />
                <a
                  href="./create-quiz"
                  className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3"
                >
                  Quiz
                </a>
              </div>
            </div>
            {/* <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div> */}
          </div>
        </div>
        <div className={styles.completionInfo}>
          You've completed {weeklyQuizCount} Quizzes this week with an average
          score of {averageScorePercentage}%
        </div>
        <div className={styles.contentWrapper}>

        <div className={styles.resultWrapper}>
            <div className={styles.latestResult} style={{ paddingTop: "12px", paddingBottom: "13px", color: "#002366" }}>
                Latest Results
                {latestResult.length === 0 ? (
                    <p className="">No quizzes attempted till now.</p>
                ) : (
                    <div className={styles.resultInfo}>
                        {results}
                    </div>
                )}
            </div>
        </div>

  <div className={styles.resultWrapper}>
  <div className={styles.timeSpent} style={{ paddingTop: "10px",color:"#002366" }}>
    Time Spent (Last 7 Days)
    <span className={styles.moreButton}>
      {/* <img src={arrow3} alt="More" width={11} height={5} /> */}
    </span>
    <div className={styles.progressBar}>
      {Array.isArray(timeData) && timeData.length > 0 ? (
        timeData.map((item, index) => {
          // Create a new Date object from item.cal_date
          const date = new Date(item.cal_date);
          // Get the month abbreviation
          const monthAbbreviation = date.toLocaleString('default', { month: 'short' });
          // Get the day of the month
          const day = date.getDate();

          return (
            <div className={styles.progressBarItem} key={index}>
              <div className={styles.day}>{`${monthAbbreviation} ${day}`}</div>
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
                  whiteSpace: "nowrap",
                }}
              >
                {formatTime(item.timespent)}
              </div>
            </div>
          );
        })
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
            style={{ marginLeft: "40px" }}
          >
            <p className="text-[#002366]">Latest Quizzes</p>

            <span
              className={styles.moreLink} style={{marginRight:"4px"}}
              onClick={handleBackToQuizzes}
            >
              More{" "}
            </span>
            <p className="ml-[1px] mt-[1px] mr-[30px] text-[#EF5130]">></p>
            {/* <img
              className="cursor-pointer mr-[40px] ml-1"
              src={moreArrow}
              alt="More"
              width={17}
              height={8}
              onClick={() => toggleGetMoreQuizzes(false)}
            /> */}
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}
            <div className={styles.container1} style={{marginLeft:"20px",marginTop:"-10px"}}>
              {attemptedquizzes.length > 0 ?(
                attemptedquizzes.slice(0, 3).map((quizItem, index) =>(
                  <div
                  key={index} className={styles.card}
                  style={{
                    paddingTop: "8px",
                    marginRight:"10px",
                    backgroundColor:"#fee2e2",
                  }}
                >
                 <span className="relative group">
                <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate">
                {quizItem.quiz_name}
                </span>
                <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                {quizItem.quiz_name}
                </span>
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
                        onClick={() => toggleNavbar(index)}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                        {cardStates[index] ? "Close Navbar" : "Open Navbar"}
                      </svg>
                      {cardStates[index]  && (
                        <div className={styles.infoIcons}>
                          <img
                            className="absolute h-[1px] w-[1px] left-[6px] top-1"
                            src={eye}
                            alt="Play icon"
                          />
                          <span className="text-[8px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                            View
                          </span>
                          <img
                            className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[17px]"
                            src={download}
                            alt="download icon"
                          />
                          <span className="text-[8px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                            Download
                          </span>
                          <img
                            className={styles.leaderboardimage} style={{marginTop:"1px"}}
                            src={leaderboard_button}
                            alt="Play icon"
                          />
                          <span
                            className={styles.leaderboardtext}
                            onClick={() => leaderboard(latestquizzes[0].quiz_id)}
                          >
                            Leaderboard
                          </span>
                          <img
                            className={styles.shareimage} style={{marginTop:"2px"}}
                            src={Share_button}
                            alt="Play icon"
                          />
                          <span className={styles.sharetext}>Share</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex mt-5">
  <span className="relative group">
    <span className="text-[#002366] ml-[10px] mt-4 w-[50px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.category}
    </span>  
  </span>

  <p className="px-[2px] font-normal">|</p>
  
  <span className="relative group">
    <span className="text-[#002366] w-[100px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.sub_category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.sub_category}
    </span>  
  </span>
      </div>
      
      {/* <div className="h-[1px] w-full bg-white"></div> */}
{/* <div className="h-[3px] w-full bg-white"></div> */}
  <div className="relative group mt-1">
  <span className="text-wrap mt-[6px] text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
    {quizItem.quiz_description}
  </span>
  <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
    {quizItem.quiz_description}
  </span>
      </div>
      <div className="h-[2px] w-full bg-white"></div>

      <div style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}>
      <div className="h-[85px] rounded w-full bg-[#F5F5F5]">
      <div className="text-[6px] font-normal pl-[12px] relative top-[73px]">
                    <span>Pass</span>
                    <span className="px-[4px]">|</span>
                    <span>
                      {quizItem.speed_rank}
                      <sup>th</sup>Fastest
                    </span>
                    <span className="px-[3px]">|</span>
                    <span>
                      {quizItem.score_rank} <sup>th</sup>Highest
                    </span>
                    <span className="px-[3px]">|</span>
                    <span>
                      {quizItem.attained_percentage}% Score
                    </span>
                    <span className="px-[3px]">|</span>
                    <span>{quizItem.quiz_grade} Grade</span>
                  </div>
                  <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[50px] left-[12px]">
                  <div>Created By :
                    <span className="pl-[2px]">{quizItem.full_name}</span>
                  </div>
                  {/* <div>Created On</div> */}
                  </div>

                  <div
                    className={styles.additionalInfo}
                    style={{ marginTop: "25px" }}
                  >
                    <div
                      className={styles.infoIcon}
                      style={{ marginTop: "37px" }}
                    ></div>
                    <div className="z-0">
                      <div className="text-[7px] flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                        <img
                          className={styles.attemptsimage}
                          src={Attempt1}
                          alt="Attempts Icon"
                          width={10}
                          height={10}
                        />
                        <p>{quizItem.attempts_count} </p>
                        <span
                          title="number of times quiz attempted"
                          className="text-[8px] -ml-[1px] cursor-pointer"
                        >
                          quiz attempts
                        </span>
                      </div>
                    </div>

                    <span className="text-[8px] flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                      <img
                        className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                        src={high_score}
                        alt="Number of question Icon"
                        width={15}
                        height={10}
                      />{" "}
                      {quizItem.attained_score}/
                      {quizItem.total_score}
                      <div
                        title="attained score/total score"
                        className="cursor-pointer text-[6px]"
                      >
                        <span className="text-[8px] -ml-[1px]">score</span>
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
                      {quizItem.attempted_questions}/
                      {quizItem.total_questions}
                      <div
                        title="attempted qustions/total questions"
                        className="cursor-pointer text-[6px]"
                      >
                        <span className="text-[8px] -ml-[1px]">attemped</span>
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
                      {quizItem.attempt_duration_mins}/
                      {quizItem.quiz_duration}
                      <div
                        title="time taken for attempted/total duration of quiz "
                        className="cursor-pointer text-[6px]"
                      >
                        <span className="text-[8px] -ml-[1px]">duration</span>
                      </div>
                    </span>
                  </div>
        </div>
        </div>

                  
                </div>
                ))
              ):(
                <div className="ml-[50px] text-red-500">No attempts quizzes available</div>
              )}
            
            </div>
            
            <div className={styles.container1} style={{marginLeft:"10px",marginTop:"30px"}}>
  {latestquizzes.length > 0 ? (
    latestquizzes.slice(0, 3).map((quizItem, index) => (
      <div className={styles.infoCards} key={index}>
        <div className={styles.card} style={{ paddingTop: "8px", marginTop:"-15px", backgroundColor:"#CBF2FB" }}>
          <span className="relative group">
            <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate">
              {quizItem.quiz_name}
            </span>
            <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
              {quizItem.quiz_name}
            </span>
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
                onClick={() => toggleNavbar1(index)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
                {cardStatus[index] ? "Close Navbar" : "Open Navbar"}
              </svg>

              {cardStatus[index] && (
                <div className={styles.infoIcons}>
                  <div className={styles.start}>
                    <img className={styles.startimage} src={Start_button} alt="Play icon" />
                    <span className={styles.starttext} onClick={() => handleStartQuiz(latestquizzes[0].quiz_id)}>Start</span>
                  </div>
                  <div className={styles.edit}>
                    <img className={styles.editimage} src={Edit_button} alt="Edit icon" />
                    <span className={styles.edittext} onClick={() => Edit(latestquizzes[0].quiz_id)}>Edit</span>
                  </div>
                  <div className={styles.leaderboard}>
                    <img className={styles.leaderboardimage} src={leaderboard_button} alt="Leaderboard icon" />
                    <span className={styles.leaderboardtext} onClick={() => leaderboard(latestquizzes[0].quiz_id)}>Leaderboard</span>
                  </div>
                  <div className={styles.share}>
                    <img className={styles.shareimage} src={Share_button} alt="Share icon" />
                    <span className={styles.sharetext}>Share</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex mt-[10px] relative top-[9px]">
            <span className="relative group">
              <span className="text-[#002366] ml-[10px] w-[50px] cursor-pointer z-0 truncate text-[9px] font-normal">
                {quizItem.category}
              </span>
              <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                {quizItem.category}
              </span>
            </span>
            <p className="px-[2px] font-normal">|</p>
            <span className="relative group">
              <span className="text-[#002366] mt-4 w-[100px] cursor-pointer z-0 truncate text-[9px] font-normal">
                {quizItem.sub_category}
              </span>
              <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                {quizItem.sub_category}
              </span>
            </span>
          </div>
          <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[75px] left-[12px]">
          <div>Created By :
                    <span className="pl-[2px]">{quizItem.full_name}</span>
                  </div>
                  {/* <div>Created On</div> */}
                  </div>
          {/* <div style={{ backgroundColor: "#EFEFEF", padding: "2px 0" }}>
            <div className="h-[10px] w-full bg-[#D9D9D9]"></div>
          </div> */}

          <div className="relative group mt-1 ">
            <span className="mt-[6px] text-wrap text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
              {quizItem.quiz_description}
            </span>
            <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
              {quizItem.quiz_description}
            </span>
          </div>
          
          <div className="h-[2px] w-full bg-white"></div>

          <div style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}>
            <div className="h-[85px] rounded w-full bg-[#F5F5F5]">

            <div className={styles.additionalInfo} style={{ position: "relative", top: "55px" }}>
            <div className={styles.infoIcon} style={{ marginTop: "25px" }}></div>
            <div className="z-0">
              <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366] relative -left-[10px] -top-[90px] hover:text-black">
                <img className="h-[15px] w-[13px] pl-[3px] pb-1" src={Attempt1} alt="Attempts Icon" width={10} height={10} />
                <p>{quizItem.quiz_attempts}</p>
                <span className="text-[8px] ml-1">attempts</span>
              </div>
            </div>

            <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[12px] hover:text-black">
              <img className="pb-[1px] pt-[2px] -mt-1 relative bottom-[2px]" src={NoOfQuestion} alt="Number of question Icon" width={15} height={10} />
              {quizItem.number_of_questions}
              <span className="text-[8px] ml-[1px]">questions</span>
            </span>
            <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[14px] hover:text-black">
              <img className="pb-[1px] mr-[1px] relative left-[3px]" src={Clock} alt="Time Icon" width={14} height={14} />
              {quizItem.quiz_duration}
              <span className="text-[8px] -ml-[0.5px]">minutes</span>
            </span>
            <span className="flex text-[9px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded relative -left-[10px] hover:text-black">
              <img className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]" src={Easy} alt="Challenge Icon" width={15} height={9} />
              {quizItem.complexity}
            </span>
          </div>
            </div>
          </div>
          
        </div>
      </div>
    ))
  ) : (
    <div className="ml-[50px] text-red-500">No quizzes available</div>
  )}
</div>

          </div>
          
          <div className={styles.topScoredHeader} style={{marginTop:"15px"}}>
            <p className="text-[#002366]">Most Popular</p>
            <span
              className={styles.moreLink} style={{marginRight:"4px"}}
              onClick={handleBackToQuizzes}
            >
               More
            </span>
            <p className="ml-[1px] mt-[1px] mr-[18px] text-[#EF5130]">></p>
            {/* <img
              className="cursor-pointer mr-[20px] ml-1"
              src={moreArrow}
              alt="More"
              width={17}
              height={8}
              onClick={() => toggleGetMoreQuizzes(false)}
            /> */}
          </div>

 <div className={styles.container1}>
   {popularquizzes.length > 0 ?(
    popularquizzes.slice(0, 3).map((quizItem, index) =>(
      <div className={styles.infoCards}>
    {/* Info cards content */}
    <div className={styles.card} key={index} style={{ paddingTop: "8px",marginTop:"15px",backgroundColor:"#CBF2FB" }}>
    <span className="relative group">
                <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate">
                {quizItem.quiz_name}
                </span>
                <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                {quizItem.quiz_name}
                </span>

    </span>

      <div className={styles.iconContainer}>
        <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
            onClick={() => toggleNavbar2(index)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
             {cardStatuses[index] ? "Close Navbar" : "Open Navbar"}
          </svg>

          {cardStatuses[index] && (
            <div className={styles.infoIcons}>
              {/* start */}
              <div className={styles.start}>
                         <img
                           className={styles.startimage}
                           src={Start_button}
                           alt="Play icon"
                         />
                         <span
                           className={styles.starttext}
                           onClick={() =>
                             handleStartQuiz(latestquizzes[0].quiz_id)
                           }
                         >
                           Start
                         </span>
                       </div>
              {/* Edit  */}
              <div className={styles.edit}>
                         <img
                           className={styles.editimage}
                           src={Edit_button}
                           alt="Play icon"
                         />
                         <span
                           className={styles.edittext}
                           onClick={() => Edit(latestquizzes[0].quiz_id)}
                         >
                           Edit
                         </span>
                       </div>
              {/* Leaderboard */}
              <div className={styles.leaderboard}>
                         <img
                           className={styles.leaderboardimage}
                           src={leaderboard_button}
                           alt="Play icon"
                         />
                         <span
                           className={styles.leaderboardtext}
                           
                         >
                           Leaderboard
                         </span>
                       </div>
              {/* Share */}

              <div className={styles.share}>
                         <img
                           className={styles.shareimage}
                           src={Share_button}
                           alt="Play icon"
                         />
                         <span className={styles.sharetext}>Share</span>
                       </div>
            </div>

          )}
        </div>
      </div>


    <div className="flex mt-[10px] relative top-[9px]">

  <span className="relative group">
    <span className=" text-[#002366] ml-[10px] mt-4 w-[50px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.category}
    </span>  
  </span>

  <p className="px-[2px] font-normal">|</p>
  
  <span className="relative group">
    <span className="text-[#002366] mt-4 w-[100px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.sub_category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.sub_category}
    </span>  
  </span>
      </div>

      <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[75px] left-[12px]">
                  <div>Created By :
                    <span className="pl-[2px]">{quizItem.full_name}</span>
                  </div>
                  {/* <div>Created On</div> */}
                  </div>
      {/* <div className="h-[3px] w-full bg-white"></div> */}
      <div className="relative group mt-1">
  <span className="text-wrap mt-[6px] text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
    {quizItem.quiz_description}
  </span>
  <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
    {quizItem.quiz_description}
  </span>
      </div>
      <div className="h-[2px] w-full bg-white"></div>

      <div style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}>
            <div className="h-[85px] rounded w-full bg-[#F5F5F5]">

            <div className={styles.additionalInfo} style={{ position: "relative", top: "55px" }}>
            <div className={styles.infoIcon} style={{ marginTop: "25px" }}></div>
            <div className="z-0">
              <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366] relative -left-[10px] -top-[90px] hover:text-black">
                <img className="h-[15px] w-[13px] pl-[3px] pb-1" src={Attempt1} alt="Attempts Icon" width={10} height={10} />
                <p>{quizItem.quiz_attempts}</p>
                <span className="text-[8px] ml-1">attempts</span>
              </div>
            </div>

            <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[12px] hover:text-black">
              <img className="pb-[1px] pt-[2px] -mt-1 relative bottom-[2px]" src={NoOfQuestion} alt="Number of question Icon" width={15} height={10} />
              {quizItem.number_of_questions}
              <span className="text-[8px] ml-[1px]">questions</span>
            </span>
            <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[14px] hover:text-black">
              <img className="pb-[1px] mr-[1px] relative left-[3px]" src={Clock} alt="Time Icon" width={14} height={14} />
              {quizItem.quiz_duration}
              <span className="text-[8px] -ml-[0.5px]">minutes</span>
            </span>
            <span className="flex text-[9px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded relative -left-[10px] hover:text-black">
              <img className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]" src={Easy} alt="Challenge Icon" width={15} height={9} />
              {quizItem.complexity}
            </span>
          </div>
            </div>
          </div>
    </div>
  </div>
    ))
   ):(
    <div className="ml-[50px] text-red-500">No quizzes available</div>
   )}
      </div>

        </div>
      </div>
      <LogoutBar />
    </div>
  );
};

export default Dashboard;
