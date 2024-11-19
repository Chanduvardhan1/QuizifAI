
import React, { useState, useEffect, useContext } from "react";
import styles from "./dashboard.module.css";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { Line } from "rc-progress";
import { useNavigate } from "react-router-dom";
import Delete from "../../src/assets/Images/dashboard/delete.png";
import disable from "../../src/assets/Images/dashboard/disable.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Start_button from "/images/dashboard/Start-button.png";
import start from "../../src/assets/Images/dashboard/non-attempted-start.png";
import PlayButton from "../../src/assets/Images/dashboard/playButton.png";
import Share_button from "/images/dashboard/Share-button.png";
import leaderboard_button from "/images/dashboard/leaderboard-button.png";
import Edit_button from "../../src/assets/Images/dashboard/Edit-button.png";
import download from "../../src/assets/Images/dashboard/download.png";
import high_score from "../../src/assets/Images/dashboard/high-score.png";
import eye from "../../src/assets/Images/dashboard/eye.png";
import Attempt1 from "/images/dashboard/Attempt1.png";
import NoOfQuestion from "/images/dashboard/NoOfQuestion.png";
import Easy from "/images/dashboard/Easy.png";
import Clock from "/images/dashboard/Clock.png";
import userplues from "../../src/assets/Images/dashboard/Admin-User.png"
import arrow from "../../src/assets/Images/dashboard/rightArrow.png";
import "react-sweet-progress/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Authcontext/AuthContext";
import Modal from "react-modal";
import noOfAttampt from "../../public/noofattampt.png";
import NoOfQuestion1 from "../../public/noofquestions.png";
import clock1 from "../../public/clock1.png";
import Calender from "../../public/calender1.png";
import created from "../../public/createdby.png";
import print from "../../public/print.png";
import leaderboard2 from "../../public/leaderboaed1.png";
import physics from "../../src/assets/Images/quiz-type/quizcover.jpg"
import username1 from "../../src/assets/Images/quiz-type/username.png"
import calander from "../../src/assets/Images/quiz-type/calander.png"
import timer from "../../src/assets/Images/quiz-type/Timer.png"
import comment from "../../src/assets/Images/quiz-type/comment.png"

// import view1 from "../../public/view1.png";
import newView from "../../public/newview.png";
import NonAtemptedCard from "../../src/commonCard/nonAttemtedCard.jsx";
import AtemptedCard from "../../src/commonCard/attemptedCard.jsx";
import WeeklyProgess from "../../src/weeklyProgress/weeklyProgress.jsx";
import DashBoardNavBar from "../../src/dashboardNavBar/dashboardNavBar.jsx";
import more from "../../src/assets/Images/dashboard/more.png"
import Attemts from "../../src/assets/Images/dashboard/Attemts.png"
import view1 from "../../src/assets/Images/dashboard/view1.png"
import leader from "../../src/assets/Images/dashboard/Leader.png"
import print1 from "../../src/assets/Images/dashboard/print.png"

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
  const today = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = today.getDate().toString().padStart(2, '0');
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const dateString = `${day}-${month}-${year}`;

  const currentValue1 = 50;
  const maxValue1 = 100;
  const currentValue2 = 30;
  const maxValue2 = 80;

  const [latestResult, setLatestResult] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const [allquizzes, setAllquizzes] = useState([]);

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState("");

  const [retakeCount, setRetakeCount] = useState(0);
  const [retakeFlag, setRetakeFlag] = useState(0);

  const navigate = useNavigate();
  const { isAuthenticated, authToken } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  const [quizId, setQuizId] = useState(0);
  const [userid, setUserid] = useState(null);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isDisableConfirmed, setIsDisableConfirmed] = useState(false);

  const handleDisableClick = (quiz_id) => {
    setQuizId(quiz_id);
    setModalIsOpen1(true);
  };
  const handleDisableQuiz = async () => {
    try {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      const body = JSON.stringify({
        user_id: userId,
        quiz_id: quiz_id,
      });

      const response = await fetch(
        "https://dev.quizifai.com:8010/disable_quiz/",
        {
          method: "POST",
          headers,
          body,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Disable response:", result);
        setModalIsOpen1(false);
      } else {
        console.error("Failed to disable quiz");
      }
    } catch (error) {
      console.error("Error during disable operation:", error);
    }
  };
  useEffect(() => {
    if (isDisableConfirmed) {
      handleDisableQuiz();
    }
  }, [isDisableConfirmed]);

  const handleDeleteClick = (quiz_id) => {
    setQuizId(quiz_id);
    setModalIsOpen(true);
  }
  const handleDeleteQuiz = async () => {
    console.log("Deleting quiz with userId:", userId, "and quizId:", quizId);
    try {
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      const body = JSON.stringify({
        user_id: userid,
        quiz_id: quizId,
      });

      const response = await fetch(
        "https://dev.quizifai.com:8010/delete_quiz/",
        {
          method: "POST",
          headers,
          body,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Delete response:", result);
        setModalIsOpen(false);
      } else {
        console.error("Failed to delete quiz");
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
    }
  };
  useEffect(() => {
    if (isDeleteConfirmed) {
      handleDeleteQuiz();
    }
  }, [isDeleteConfirmed]);
  useEffect(() => {
    // Example: Checking authentication state on component mount
    console.log("User is authenticated:", isAuthenticated);
    // You might not need to directly use setIsAuthenticated here
    // It's typically handled within the AuthContext
  }, [isAuthenticated]);

  useEffect(() => {
    const handleWindowClose = () => {
      fetch("https://dev.quizifai.com:8010/usr_logout/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          "https://dev.quizifai.com:8010/dashboard",
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
          throw new Error("Failed to fetch quiz data");
        }
        const result = await response.json();
        console.log("dashboard data - ", result); // Log the entire response data

        const data = result.data[0];
        setTimeData(data.time_spent || []);
        setLatestResult(data.latest_result || []);
        setWeeklyQuizCount(data.weekly_quiz_count || 0);
        setAverageScorePercentage(
          parseFloat(data.average_score_percentage) || 0
        );
        setAllquizzes(data.all_quizzes || []);

        const userDetails = data.audit_details;
        setUsername(userDetails.full_name);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [authToken, isAuthenticated, navigate, userId]);

  const handleStartQuiz = (quizId) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/quizaccess`);
  };
  const handleStartQuiz1 = (quizId, attemptsCount, retakeFlag) => {
    if (attemptsCount >= retakeFlag) {
      toast.error(
        "You have reached the maximum number of retake attempts for this quiz."
      );
    } else {
      localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
      navigate(`/quizaccess`);
      setMessage(""); // Clear any previous messages
    }
  };
  const leaderboard = (
    quizId,
    quizTotalMarks,
    passPercentage,
    quizname,
    quizdescription,
    createdby,
    numberofquestions,
    quizduration,
    complexity,
    mincompletiontime,
    quizattempts,
    avgscore,
    max_percentage,
    quizcreatedate
  ) => {
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate("/quiz-results1", {
      state: {
        quizId,
        quizTotalMarks,
        passPercentage,
        quizname,
        quizdescription,
        createdby,
        numberofquestions,
        quizduration,
        complexity,
        mincompletiontime,
        quizattempts,
        avgscore,
        max_percentage,
        quizcreatedate,
      },
    });
  };


  const leaderboard1 = (
    quizId,
    attemptId,
    complexity,
    quizduration,
    passpercentage
  ) => {
    console.log('attemptId', attemptId);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/leaderboard`, {
      state: {
        quizId,
        attemptId,
        complexity,
        quizduration,
        passpercentage,
      },
    });
  };

  const Edit = (quizId) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/editmanuly`);
  };
  const quizresults = (quizId, attemptId) => {
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    localStorage.setItem("quiz_level_attempt_id", attemptId); // Store attempt_id in local storage
    navigate(`/quizview_results`);
  };
  const createQuiz = () => {
    navigate(`/create-quiz`);
  };
  const createUser = () => {
    navigate(`/usersgroup`);
  };
  const [cardStates, setCardStates] = useState(
    Array(allquizzes.length).fill(false)
  );
  const toggleNavbar = (index) => {
    setCardStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };
  const handleDelete = (index) => {
    setAllquizzes((prevAllquizzes) =>
      prevAllquizzes.filter((_, i) => i !== index)
    );
  };

  const handleBackToQuizzes = () => {
    navigate("/quiz");
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
      return "#F5E23F"; //yellow
    } else if (grade === "C") {
      return "#F6970D"; //orenge
    } else if (grade === "D") {
      return "#F34747"; // red
    } else {
      return "#808080"; //grey
    }
  }

  function getColorPercentage(percentData) {
    if (percentData === 0) {
      return "#808080"; // Gray color
    } else if (percentData > 0 && percentData <= 60) {
      return "#F34747"; // Red color
    } else if (percentData > 60 && percentData < 80) {
      return "#F5E23F"; // Yellow
    } else if (percentData >= 80 && percentData < 90) {
      return "#F6970D"; // Orange
    } else if (percentData >= 90 && percentData <= 100) {
      return "#15803d"; // Green Color
    } else {
      return "#808080"; // Gray color for invalid percentages
    }
  }
  const currentDate = new Date();

  const userRole = localStorage.getItem("user_role");

  const results = (latestResult || []).map((result, index) => {
    console.log(' {result?.attempt_date}', result?.attempt_date);

    const percentColor = getColorPercentage(result?.quiz_percentage);
    const handleQuizClick = () => {
      leaderboard1(result?.quiz_id, result?.quiz_level_attempt_id);
    };
    return (
      <div key={index}>
        <div className={styles.infoLine}>
          <span
            className={styles.info}
            style={{ fontSize: "10px", color: "grey", textWrap: "nowrap" }}
          >
            {result?.attempt_date}
            <span className="relative group">
              <span
                className="absolute ml-[10px] w-[100px] cursor-pointer z-0 truncate"
                onClick={handleQuizClick}
              >
                {result?.quiz_name}
              </span>
              <span className="cursor-pointer hidden group-hover:inline-block absolute left-0 top-5 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                {result?.quiz_name}
              </span>
            </span>
          </span>
          <span
            style={{
              marginLeft: "-10px",
              width: "130px",
              height: "8px",
              fontSize: "8px",
              marginTop: "7px",
              marginRight: "15px",
              position: "relative",
              left: "-15px",
            }}
          >
            <Line
              percent={result?.quiz_percentage}
              strokeWidth={4}
              strokeColor={percentColor}
            />
          </span>
          <span
            className={`text-[10px] -ml-2 mr-auto`}
            style={{ color: percentColor }}
          >
            {result?.quiz_percentage}%
          </span>
        </div>
        {index < 3 && <hr className={styles.divider} />}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <Navigation />
      <ToastContainer />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>
            <span className={styles.Welcome}>Welcome</span>{" "}
            {username.charAt(0).toUpperCase() + username.slice(1)}
          </p>

<div>
          <div className="flex gap-[10px]">
            {userRole === "Quiz Master" && (

              <div className="w-[99px] h-[41px]  rounded-[10px] bg-[#fee2e2]">
                <div onClick={createUser} className="flex cursor-pointer">
                  <img
                    className="w-[25px] h-[25px] ml-2 mt-2"
                    src={userplues}
                    alt="Plus Icon"
                  />
                  <a
                    onClick={createUser}
                    className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3"
                  >
                    users
                  </a>
                </div>
              </div>
              
            )}
             {userRole === "Quiz Master" && (

<div className="w-[99px] h-[41px]  rounded-[10px] bg-[#fee2e2]">
  <div className="flex cursor-pointer"  onClick={createQuiz}>
    <img
      className="w-[25px] h-[25px] ml-2 mt-2"
      src={Plus}
      alt="Plus Icon"
    />
    <a
      onClick={createQuiz}
      className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3"
    >
      Quiz
    </a>
  </div>
</div>

)}
          </div>
          {/* <div className={styles.headerRight1}>
            {userRole === "Quiz Master" && (
              
              <div className="w-[99px] h-[41px]  mr-[80px] mb-2 pb-2 -mt-[35px] rounded-[10px] bg-[#fee2e2]">
                <div className="flex">
                  <img
                    className="w-[25px] h-[25px] ml-2 mt-2"
                    src={Plus}
                    alt="Plus Icon"
                  />
                  <a
                    onClick={createQuiz}
                    className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3"
                  >
                    Quiz
                  </a>
                </div>
              </div>
              
            )}
          </div> */}
          </div>
        </div>
        <div className={styles.completionInfo}>
          <p>
            {weeklyQuizCount > 0 && averageScorePercentage > 0
              ? `You have successfully completed ${weeklyQuizCount} Quizzes this week, achieving an average score of ${averageScorePercentage}%`
              : "You have not attended any quizzes yet, Please attempt the quizzes below."}
          </p>{" "}
        </div>
        <div className="flex mx-auto">
          <DashBoardNavBar />
          {/* <div className="">
            <WeeklyProgess />
          </div> */}
        </div>
        <div className="mx-auto">
          <div
            className="flex justify-between mx-[20px]"
            style={{ marginBottom: "20px" }}
          >
            <p className="text-[#002366] text-[15px] font-medium leading-6 ml-[10px]">
              Latest Quizzes
            </p>
            <span className="flex">
              <span
                className="text-[#EF5130] text-[12px] mr-[20px] mt-1 cursor-pointer"
                style={{ fontWeight: "600" }}
                onClick={handleBackToQuizzes}
              >
                More{" "}
              </span>
              <img
                className="h-[10px] w-[9px] mt-[9px] -ml-[15px]"
                src={arrow}
              />
            </span>
          </div>
          <div className="flex flex-row w-full max-w-[400px] h-[170px] border-[#1E90FF] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-[10px] bg-white mb-4">
  {/* Image Section */}
  <div       className="w-[93px] h-[127px]  rounded-md  mr-2"
  >
    <img
      src={physics}
      alt="Quiz Cover"
      className="w-[93px] h-[140px] rounded-md mr-2"
    />
  </div>

  <div className="flex flex-col w-full">
    {/* Title and Version */}
    <div className="relative group flex justify-between items-center gap-[3px]">
      {/* Truncated text container */}
      <h2 className="text-[15px] font-semibold text-gray-800 w-[170px] sm:w-[215px] truncate">
        Physics,Physics,Physics,Physics
      </h2>

      {/* Full text that will appear above on hover */}
      <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-[25px] w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
        Physics,Physics,Physics,Physics
      </span>
      <img src={more} alt="" className=" w-[12px] h-[12px]" />
    </div>

    {/* Meta Information */}
    <div className="text-[#00008b] text-[12px] truncate max-w-[230px] justify-start mt-1">
      <span>General General</span>
      <span className="mx-1">.</span>
      <span>General General</span>
      <span className="mx-1">.</span>
      <span>General General</span>
      <span className="mx-1">.</span>
      <span>SimpleGeneral</span>
    </div>

    {/* Icons Row */}
    <div className="flex-col items-center text-[12px] space-y-1 mt-2 text-[#00008b]">
      {/* Author and Date */}
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center">
          <img src={username1} className="w-[20px] h-[20px] mr-1" />
          <span className="ml-1 text-[12px]  ">Samantha S</span>
        </div>
        <div className="flex items-center">
          <img src={calander} className="w-[20px] h-[20px] mr-1" />
          <span className="ml-1 text-[12px] ">12-11-2024</span>
        </div>
      </div>

      {/* Quiz Info */}
      <div className="flex items-center justify-between pr-1 text-xs sm:text-sm">
        <div className="flex items-center">
          <img src={comment} className="w-[20px]   h-[20px] mr-1" />
          <span className="ml-1 text-[12px] ">10 Questions</span>
        </div>
        <div className="flex items-center">
          <img src={timer} className="w-[20px] h-[20px] mr-1" />
          <span className="ml-1 text-[12px] ">15 Minutes</span>
        </div>
      </div>

      {/* Attempt Info */}
      <div className="flex items-center space-x-4 text-xs sm:text-sm">
        <div className="flex items-center">
          <img src={Attemts} className="w-[18px] h-[18px] mr-1" />
          <span className="ml-1 text-[12px]">1 Attempt</span>
        </div>
      </div>
      <div className="flex items-end justify-end ">
        <div className="flex items-end">
          <img src={view1} className="w-[18px] h-[18px] mr-1" />
          <img src={leader} className="w-[18px] h-[18px] mr-1" />
          <img src={print1} className="w-[18px] h-[18px] mr-1" />

        </div>
      </div>
    </div>
  </div>
</div>


          <div className="flex flex-wrap mx-auto ml-[15px] -mt-[20px]">
            {allquizzes
              .filter((quizItem) => {
                const quizCreateDate = new Date(quizItem.quiz_start_date);
                const quizEndDate = quizItem.quiz_end_date
                  ? new Date(quizItem.quiz_end_date)
                  : null;
                return (
                  quizItem.active_flag === "True" &&
                  quizItem.latest_flag === "Y" &&
                  currentDate >= quizCreateDate &&
                  (quizEndDate === null || currentDate <= quizEndDate)
                );
              })
              .slice(0, 3)
              .map((quizItem, index) => (
                <div key={index}>
                  {quizItem.attempt_flag === "Y" ? (
                    <div className=''>
                      <AtemptedCard quizItem={quizItem} handleView={() =>
                        leaderboard1(
                          quizItem.quiz_id,
                          quizItem.quiz_level_attempt_id,
                          quizItem.complexity,
                          quizItem.quiz_duration,
                          quizItem.pass_percentage
                        )}
                        handleStartQuiz={() => {
                          handleStartQuiz(quizItem.quiz_id)
                        }}

                      />
                    </div>
                    //  <div
                    //     key={index}
                    //     className={styles.sampleCard}
                    //       // style={{
                    //       //   flexGrow: 1,
                    //       //   paddingTop: "20px",
                    //        //   marginTop: "10px",
                    //        //   marginRight: "10px",
                    //        //   backgroundColor:
                    //        //     quizItem.attempts_count < quizItem.retake_flag
                    //       //       ? "#fee2e2"
                    //      //       : "#55505026",
                    //      // }}
                    //     >
                    //     <span className="relative group">
                    //       <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate -mt-[13px]">
                    //         {quizItem.quiz_name}
                    //       </span>
                    //       <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-[1px] w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                    //         {quizItem.quiz_name}
                    //       </span>
                    //     </span>
                    //     <div className={styles.iconContainer}>
                    //       <div className="z-40 mb-[2px]  font-normal rounded -mt-[13px]">
                    //         <svg
                    //           xmlns="http://www.w3.org/2000/svg"
                    //           fill="none"
                    //           viewBox="0 0 24 24"
                    //           strokeWidth="1.5"
                    //           stroke="currentColor"
                    //           className="w-4 h-4 rotate-90 -ml-[35px] relative -top-[7px] left-2 cursor-pointer rounded-lg hover:bg-slate-200"
                    //           onClick={() => toggleNavbar(index)}
                    //         >
                    //           <path
                    //             strokeLinecap="round"
                    //             strokeLinejoin="round"
                    //             d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    //           />
                    //           {cardStates[index] ? "Close Navbar" : "Open Navbar"}
                    //         </svg>
                    //         {cardStates[index] && (
                    //           <div
                    //             className={styles.infoIcons1}
                    //             style={{
                    //               marginLeft: "-122px",
                    //               marginTop: "-28px",
                    //             }}
                    //           >
                    //             <div className={styles.start}>
                    //               <img className="" src={eye} alt="Play icon" />
                    //               <span
                    //                 className="text-[8px]   cursor-pointer hover:text-black"
                    //                 onClick={() =>
                    //                   quizresults(
                    //                     quizItem.quiz_id,
                    //                     quizItem.quiz_level_attempt_id
                    //                   )
                    //                 }
                    //               >
                    //                 View
                    //               </span>
                    //             </div>
                    //             {quizItem.attempts_count <
                    //               quizItem.retake_flag && (
                    //                 <div className={styles.retake}>
                    //                   <img
                    //                     className=" h-[10px] w-[10px] "
                    //                     src={Share_button}
                    //                     alt="download icon"
                    //                   />
                    //                   <span
                    //                     className="text-[8px] - cursor-pointer hover:text-black"
                    //                     onClick={() =>
                    //                       handleStartQuiz(quizItem.quiz_id)
                    //                     }
                    //                   >
                    //                     Retake
                    //                   </span>
                    //                 </div>
                    //               )}
                    //             {userRole === "Quiz Master" && (
                    //               <div className={styles.edit}>
                    //                 <img
                    //                   className={styles.editimage}
                    //                   src={Edit_button}
                    //                   alt="Edit icon"
                    //                 />
                    //                 <span
                    //                   className={styles.edittext}
                    //                   onClick={() => Edit(quizItem.quiz_id)}
                    //                 >
                    //                   Edit
                    //                 </span>
                    //               </div>
                    //             )}
                    //             <div className={styles.leaderboard}>
                    //               <img
                    //                 className={styles.leaderboardimage}
                    //                 style={{ marginTop: "1px" }}
                    //                 src={leaderboard_button}
                    //                 alt="Play icon"
                    //               />
                    //               <span
                    //                 className={styles.leaderboardtext}
                    //                 onClick={() =>
                    //                   leaderboard1(
                    //                     quizItem.quiz_id,
                    //                     quizItem.quiz_level_attempt_id,
                    //                     quizItem.complexity,
                    //                     quizItem.quiz_duration,
                    //                     quizItem.pass_percentage
                    //                   )
                    //                 }
                    //               >
                    //                 Leaderboard 
                    //               </span>
                    //             </div>
                    //             {userRole === "Quiz Master" && (
                    //               <div className={styles.start}>
                    //                 <img
                    //                   className={styles.startimage}
                    //                   src={disable}
                    //                   alt="Disable icon"
                    //                 />
                    //                 <span
                    //                   className={styles.starttext}
                    //                   onClick={() => handleDisableClick(quizItem.quiz_id)}
                    //                 >
                    //                   Disable
                    //                 </span>
                    //                 <Modal
                    //                   isOpen={modalIsOpen1}
                    //                   onRequestClose={() =>
                    //                     setModalIsOpen1(false)
                    //                   }
                    //                   className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                    //                   overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    //                 >
                    //                   <h2 className="text-xl font-semibold mb-4">
                    //                     Are you sure you want to disable this
                    //                     card?
                    //                   </h2>
                    //                   <div className="mb-4">
                    //                     <input
                    //                       type="checkbox"
                    //                       id="confirmCheckbox"
                    //                       className="mr-2"
                    //                       checked={isChecked1}
                    //                       onChange={(e) =>
                    //                         setIsChecked1(e.target.checked)
                    //                       }
                    //                     />
                    //                     <label htmlFor="confirmCheckbox">
                    //                       I understand the consequences.
                    //                     </label>
                    //                   </div>
                    //                   <div className="flex justify-end space-x-4">
                    //                     <button
                    //                       className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked1
                    //                         ? "opacity-50 cursor-not-allowed"
                    //                         : ""
                    //                         }`}
                    //                       onClick={setIsDisableConfirmed}
                    //                       disabled={!isChecked1}
                    //                     >
                    //                       Disable
                    //                     </button>
                    //                     <button
                    //                       className="bg-gray-300 text-black px-4 py-2 rounded"
                    //                       onClick={() => setModalIsOpen1(false)}
                    //                     >
                    //                       Cancel
                    //                     </button>
                    //                   </div>
                    //                 </Modal>
                    //               </div>
                    //             )}
                    //           </div>
                    //         )}
                    //       </div>
                    //     </div>

                    //     <div className="flex mt-[9px] mb-4 relative top-[7px]">
                    //       <span className="relative group">
                    //         <span className="text-[#002366] ml-[10px] mt-4 w-[50px] cursor-pointer z-0 truncate text-[9px] font-semibold">
                    //           {quizItem.category}
                    //         </span>
                    //         <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                    //           {quizItem.category}
                    //         </span>
                    //       </span>

                    //       <p className="px-[2px] font-normal">|</p>

                    //       <span className="relative group">
                    //         <span className="text-[#002366] cursor-pointer z-0 truncate text-[9px] relative top-[1px] font-semibold inline-block w-[80px] overflow-hidden whitespace-nowrap">
                    //           {quizItem.sub_category}
                    //         </span>
                    //         <span className="absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded text-nowrap">
                    //           {quizItem.sub_category}
                    //         </span>
                    //       </span>

                    //       {quizItem.attempts_count < quizItem.retake_flag && (
                    //         <button
                    //           className="cursor-pointer ml-auto relative  right-1 flex gap-[2px] border-2 bg-[#F5F8F9] rounded-xl border-[#472E86] h-[16px] w-[34.5px]"
                    //           onClick={() =>
                    //             handleStartQuiz1(
                    //               quizItem.quiz_id,
                    //               quizItem.attempts_count,
                    //               quizItem.retake_flag
                    //             )
                    //           }
                    //         >
                    //           <img
                    //             className="h-[5.5px] w-[4.5px] relative top-[3.5px] left-[2px]"
                    //             src={PlayButton}
                    //             alt="Start button"
                    //           />
                    //           <h1 className="text-[#472E86] text-[6px] relative top-[2px] pl-[1px] font-bold">
                    //             Retake
                    //           </h1>
                    //         </button>
                    //       )}
                    //     </div>
                    //     <div className="h-1 -mt-[8px] pl-[10px] text-[7px] text-[#002366] font-semibold relative -top-[6px]">
                    //       <h3>Quiz ID : {quizItem.quiz_id}</h3>
                    //     </div>
                    //     <div className="relative group mt-1">
                    //       <span className="text-wrap mt-[6px] text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
                    //         {quizItem.quiz_description}
                    //       </span>
                    //       <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
                    //         {quizItem.quiz_description}
                    //       </span>
                    //     </div>
                    //     <div className="h-[2px] w-full bg-white"></div>

                    //     <div
                    //       style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}
                    //     >
                    //       <div className="h-[85px] rounded w-full bg-[#F5F5F5]">
                    //         <div className="text-[7px] font-normal pl-[10px] relative top-[73px]">
                    //           <span>{quizItem.pass_flag ? "Pass" : "Fail"}</span>
                    //           <span className="px-[4px]">|</span>
                    //           <span>
                    //             {quizItem.speed_rank}
                    //             <sup>th</sup>Fastest
                    //           </span>
                    //           <span className="px-[3px]">|</span>
                    //           <span>
                    //             {quizItem.score_rank} <sup>th</sup>Highest
                    //           </span>
                    //           <span className="px-[3px]">|</span>
                    //           <span>{quizItem.attained_percentage}% Score</span>
                    //           <span className="px-[3px]">|</span>
                    //           <span>{quizItem.quiz_grade} Grade</span>
                    //         </div>
                    //         <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[50px] left-[10px]">
                    //           <div>
                    //             Created By :
                    //             <span className="pl-[2px]">
                    //               {quizItem.created_by}
                    //             </span>
                    //           </div>
                    //         </div>

                    //         <div
                    //           className={styles.additionalInfo}
                    //           style={{ marginTop: "25px" }}
                    //         >
                    //           <div
                    //             className={styles.infoIcon}
                    //             style={{ marginTop: "37px" }}
                    //           ></div>
                    //           <div className="z-0">
                    //             <div className="text-[7px] flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                    //               <img
                    //                 className={styles.attemptsimage}
                    //                 src={Attempt1}
                    //                 alt="Attempts Icon"
                    //                 width={10}
                    //                 height={10}
                    //               />
                    //               <p>{quizItem.quiz_attempts} </p>
                    //               <span
                    //                 title="number of times quiz attempted"
                    //                 className="text-[8px] -ml-[1px] cursor-pointer"
                    //               >
                    //                 Quiz attempts
                    //               </span>
                    //             </div>
                    //           </div>

                    //           <span className="text-[8px] flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                    //             <img
                    //               className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                    //               src={high_score}
                    //               alt="Number of question Icon"
                    //               width={15}
                    //               height={10}
                    //             />{" "}
                    //             {quizItem.attained_score}/
                    //             {quizItem.quiz_total_marks}
                    //             <div
                    //               title="attained score/total score"
                    //               className="cursor-pointer text-[6px]"
                    //             >
                    //               <span className="text-[8px] -ml-[1px]">
                    //                 Score
                    //               </span>
                    //             </div>
                    //           </span>
                    //           <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                    //             <img
                    //               className="pb-[1px] mr-[1px] relative left-[3px] "
                    //               src={NoOfQuestion}
                    //               alt="Time Icon"
                    //               width={14}
                    //               height={14}
                    //             />{" "}
                    //             {quizItem.attempted_questions}/
                    //             {quizItem.number_of_questions}
                    //             <div
                    //               title="attempted qustions/total questions"
                    //               className="cursor-pointer text-[6px]"
                    //             >
                    //               <span className="text-[8px] -ml-[1px]">
                    //                 Attemped
                    //               </span>
                    //             </div>
                    //           </span>
                    //           <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                    //             <img
                    //               className="pb-[1px] mr-[1px] relative left-[3px] "
                    //               src={Clock}
                    //               alt="Time Icon"
                    //               width={14}
                    //               height={14}
                    //             />{" "}
                    //             {quizItem.attempt_duration_mins}/
                    //             {quizItem.quiz_duration}
                    //             <div
                    //               title="time taken for attempted/total duration of quiz "
                    //               className="cursor-pointer text-[6px]"
                    //             >
                    //               <span className="text-[8px] -ml-[1px]">
                    //                 Duration
                    //               </span>
                    //             </div>
                    //           </span>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                  ) : (
                    <div className='mr-4'>

                      <NonAtemptedCard quizItem={quizItem} handleStartQuiz={() => {
                        handleStartQuiz(quizItem.quiz_id)
                      }}
                      />
                    </div>
                    // <div 
                    //   key={index}
                    //   className={styles.card}
                    //   style={{
                    //     flexGrow: 1,
                    //     paddingTop: "20px",
                    //     marginTop: "10px",
                    //     marginRight: "10px",
                    //     backgroundColor: "#CBF2FB",
                    //   }}
                    //   >
                    //   <span className="relative group -top-[13px]">
                    //     <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate">
                    //       {quizItem.quiz_name}
                    //     </span>
                    //     <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                    //       {quizItem.quiz_name}
                    //     </span>
                    //   </span>

                    //   <div className={styles.iconContainer}>
                    //     <div className="z-40 mb-[2px]  font-normal rounded">
                    //       <svg
                    //         xmlns="http://www.w3.org/2000/svg"
                    //         fill="none"
                    //         viewBox="0 0 24 24"
                    //         strokeWidth="1.5"
                    //         stroke="currentColor"
                    //         className="w-4 h-4 -ml-[27px] relative -top-[20px] -left-[5px] rotate-90 cursor-pointer rounded-lg hover:bg-slate-200"
                    //         onClick={() => toggleNavbar(index)}
                    //       >
                    //         <path
                    //           strokeLinecap="round"
                    //           strokeLinejoin="round"
                    //           d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    //         />
                    //         {cardStates[index] ? "Close Navbar" : "Open Navbar"}
                    //       </svg>

                    //       {cardStates[index] && (
                    //         <div
                    //           className={styles.infoIcons}
                    //           style={{
                    //             marginTop: "-41px",
                    //             marginLeft: "-124px",
                    //           }}
                    //         >
                    //           <div className={styles.start}>
                    //             <img
                    //               className={styles.startimage}
                    //               src={Start_button}
                    //               alt="Play icon"
                    //             />
                    //             <span
                    //               className={styles.starttext}
                    //               onClick={() =>
                    //                 handleStartQuiz(quizItem.quiz_id)
                    //               }
                    //             >
                    //               Start
                    //             </span>
                    //           </div>
                    //           {userRole === "Quiz Master" && (
                    //             <div className={styles.edit}>
                    //               <img
                    //                 className={styles.editimage}
                    //                 src={Edit_button}
                    //                 alt="Edit icon"
                    //               />
                    //               <span
                    //                 className={styles.edittext}
                    //                 onClick={() => Edit(quizItem.quiz_id)}
                    //               >
                    //                 Edit
                    //               </span>
                    //             </div>
                    //           )}
                    //           <div className={styles.leaderboard}>
                    //             <img
                    //               className={styles.leaderboardimage}
                    //               src={leaderboard_button}
                    //               alt="Leaderboard icon"
                    //             />
                    //             <span
                    //               className={styles.leaderboardtext}
                    //               onClick={() =>
                    //                 leaderboard(
                    //                   quizItem.quiz_id,
                    //                   quizItem.quiz_total_marks,
                    //                   quizItem.pass_percentage,
                    //                   quizItem.quiz_name,
                    //                   quizItem.quiz_description,
                    //                   quizItem.created_by,
                    //                   quizItem.complexity,
                    //                   quizItem.quiz_duration,
                    //                   quizItem.number_of_questions,

                    //                   quizItem.min_completion_time,
                    //                   quizItem.quiz_attempts,
                    //                   quizItem.avg_score,
                    //                   quizItem.max_percentage,
                    //                   quizItem.quiz_create_date
                    //                 )
                    //               }
                    //             >
                    //               Leaderboard 123

                    //             </span>
                    //           </div>
                    //           {userRole === "Quiz Master" && (
                    //             <div className={styles.start}>
                    //               <img
                    //                 className={styles.startimage}
                    //                 src={Delete}
                    //                 alt="Delete icon"
                    //               />
                    //               <span
                    //                 className={styles.starttext}
                    //                 onClick={() => handleDeleteClick(quizItem.quiz_id)}>
                    //                 Delete
                    //               </span>
                    //               <Modal
                    //                 isOpen={modalIsOpen}
                    //                 onRequestClose={() => setModalIsOpen(false)}
                    //                 className="bg-white rounded-lg p-8 mx-auto max-w-md border-red-400 border-[1px]"
                    //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    //               >
                    //                 <h2 className="text-xl font-semibold mb-4">
                    //                   Are you sure you want to delete this card?
                    //                 </h2>
                    //                 <div className="mb-4">
                    //                   <input
                    //                     type="checkbox"
                    //                     id="confirmCheckbox"
                    //                     className="mr-2"
                    //                     checked={isChecked}
                    //                     onChange={(e) =>
                    //                       setIsChecked(e.target.checked)
                    //                     }
                    //                   />
                    //                   <label htmlFor="confirmCheckbox">
                    //                     I understand the consequences.
                    //                   </label>
                    //                 </div>
                    //                 <div className="flex justify-end space-x-4">
                    //                   <button
                    //                     className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked
                    //                       ? "opacity-50 cursor-not-allowed"
                    //                       : ""
                    //                       }`}
                    //                     onClick={() => setIsDeleteConfirmed(true)}
                    //                     disabled={!isChecked}
                    //                   >
                    //                     Delete
                    //                   </button>
                    //                   <button
                    //                     className="bg-gray-300 text-black px-4 py-2 rounded"
                    //                     onClick={() => setModalIsOpen(false)}
                    //                   >
                    //                     Cancel
                    //                   </button>
                    //                 </div>
                    //               </Modal>
                    //             </div>
                    //           )}

                    //           {userRole === "Quiz Master" && (
                    //             <div className={styles.start}>
                    //               <img
                    //                 className={styles.startimage}
                    //                 src={disable}
                    //                 alt="Disable icon"
                    //               />
                    //               <span
                    //                 className={styles.starttext}
                    //                 onClick={() => handleDisableClick(quizItem.quiz_id)}>
                    //                 Disable
                    //               </span>
                    //               <Modal
                    //                 isOpen={modalIsOpen1}
                    //                 onRequestClose={() => setModalIsOpen1(false)}
                    //                 className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                    //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    //               >
                    //                 <h2 className="text-xl font-semibold mb-4">
                    //                   Are you sure you want to disable this
                    //                   card?
                    //                 </h2>
                    //                 <div className="mb-4">
                    //                   <input
                    //                     type="checkbox"
                    //                     id="confirmCheckbox"
                    //                     className="mr-2"
                    //                     checked={isChecked1}
                    //                     onChange={(e) =>
                    //                       setIsChecked1(e.target.checked)
                    //                     }
                    //                   />
                    //                   <label htmlFor="confirmCheckbox">
                    //                     I understand the consequences.
                    //                   </label>
                    //                 </div>
                    //                 <div className="flex justify-end space-x-4">
                    //                   <button
                    //                     className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked1
                    //                       ? "opacity-50 cursor-not-allowed"
                    //                       : ""
                    //                       }`}
                    //                     onClick={() => setIsDisableConfirmed}
                    //                     disabled={!isChecked1}
                    //                   >
                    //                     Disable
                    //                   </button>
                    //                   <button
                    //                     className="bg-gray-300 text-black px-4 py-2 rounded"
                    //                     onClick={() => setModalIsOpen1(false)}
                    //                   >
                    //                     Cancel
                    //                   </button>
                    //                 </div>
                    //               </Modal>
                    //             </div>
                    //           )}
                    //         </div>
                    //       )}
                    //     </div>
                    //   </div>

                    //   <div className="flex -mt-[13px] relative top-[16px]">
                    //     <span className="relative group">
                    //       <span className="text-[#002366] ml-[10px] w-[50px] cursor-pointer z-0 truncate text-[9px] font-semibold">
                    //         {quizItem.category}
                    //       </span>
                    //       <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                    //         {quizItem.category}
                    //       </span>
                    //     </span>
                    //     <p className="px-[2px] font-normal">|</p>
                    //     <span className="relative group">
                    //       <span className="text-[#002366] cursor-pointer z-0 truncate text-[9px] relative top-[1px] font-semibold inline-block w-[80px] overflow-hidden whitespace-nowrap">
                    //         {quizItem.sub_category}
                    //       </span>
                    //       <span className="absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded text-nowrap">
                    //         {quizItem.sub_category}
                    //       </span>
                    //     </span>

                    //     <button
                    //       className="cursor-pointer ml-auto relative -top-[5px] right-1"
                    //       onClick={() => handleStartQuiz(quizItem.quiz_id)}
                    //     >
                    //       <img
                    //         className="h-8 w-[34px]"
                    //         src={start}
                    //         alt="Start button"
                    //       />
                    //     </button>
                    //   </div>
                    //   <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[75px] left-[12px]">
                    //     <div>
                    //       Created By :
                    //       <span className="pl-[2px]">
                    //         {quizItem.created_by}
                    //       </span>
                    //     </div>
                    //   </div>
                    //   <div className="h-1 -mt-[6px] pl-[10px] text-[7px] text-[#002366] font-semibold relative -top-[6px]">
                    //     <h3>Quiz ID : {quizItem.quiz_id}</h3>
                    //   </div>

                    //   <div className="relative group mt-1 ">
                    //     <span className="mt-[6px] text-wrap text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
                    //       {quizItem.quiz_description}
                    //     </span>
                    //     <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
                    //       {quizItem.quiz_description}
                    //     </span>
                    //   </div>

                    //   <div className="h-[2px] w-full bg-white"></div>

                    //   <div
                    //     style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}
                    //   >
                    //     <div className="h-[85px] rounded w-full bg-[#F5F5F5]">
                    //       <div
                    //         className={styles.additionalInfo}
                    //         style={{ position: "relative", top: "55px" }}
                    //       >
                    //         <div
                    //           className={styles.infoIcon}
                    //           style={{ marginTop: "25px" }}
                    //         ></div>
                    //         <div className="z-0">
                    //           <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366] relative -left-[10px] -top-[90px] hover:text-black">
                    //             <img
                    //               className="h-[15px] w-[13px] pl-[3px] pb-1"
                    //               src={Attempt1}
                    //               alt="Attempts Icon"
                    //               width={10}
                    //               height={10}
                    //             />
                    //             <p>{quizItem.quiz_attempts}</p>
                    //             <span className="text-[8px] -ml-[1px]">
                    //               Attempts
                    //             </span>
                    //           </div>
                    //         </div>

                    //         <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[12px] hover:text-black">
                    //           <img
                    //             className="pb-[1px] pt-[2px] -mt-1 relative bottom-[2px]"
                    //             src={NoOfQuestion}
                    //             alt="Number of question Icon"
                    //             width={15}
                    //             height={10}
                    //           />
                    //           {quizItem.number_of_questions}
                    //           <span className="text-[8px] ml-[1px]">
                    //             Questions
                    //           </span>
                    //         </span>
                    //         <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[14px] hover:text-black">
                    //           <img
                    //             className="pb-[1px] mr-[1px] relative left-[3px]"
                    //             src={Clock}
                    //             alt="Time Icon"
                    //             width={14}
                    //             height={14}
                    //           />
                    //           {quizItem.quiz_duration}
                    //           <span className="text-[8px] -ml-[0.5px]">
                    //             Minutes
                    //           </span>
                    //         </span>
                    //         <span className="flex text-[9px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded relative -left-[10px] hover:text-black">
                    //           <img
                    //             className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    //             src={Easy}
                    //             alt="Challenge Icon"
                    //             width={15}
                    //             height={9}
                    //           />
                    //           {quizItem.complexity}
                    //         </span>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                  )}
                </div>
              ))}
          </div>

          <div
            className="flex justify-between mx-[30px]"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            <p className="text-[#002366] text-[15px] font-medium leading-6">
              Most Popular Quizzes
            </p>
            <span className="flex">
              <span
                className="text-[#EF5130] text-[12px] mr-[20px] mt-1 cursor-pointer"
                style={{ fontWeight: "600" }}
                onClick={handleBackToQuizzes}
              >
                More{" "}
              </span>
              <img
                className="h-[10px] w-[9px] mt-[9px] -ml-[15px]"
                src={arrow}
              />
            </span>
          </div>

          <div className="flex flex-wrap mx-auto ml-[15px] -mt-[20px]">
            {allquizzes
              .filter((quizItem) => {
                const quizCreateDate = new Date(quizItem.quiz_start_date);
                const quizEndDate = quizItem.quiz_end_date
                  ? new Date(quizItem.quiz_end_date)
                  : null;
                return (
                  quizItem.active_flag === "true" &&
                  quizItem.popularity_flag === "Y" &&
                  currentDate >= quizCreateDate &&
                  (quizEndDate === null || currentDate <= quizEndDate)
                );
              })
              .sort((a, b) => b.quiz_attempts - a.quiz_attempts)
              .slice(0, 3)
              .map((quizItem, index) => (
                <div key={index} >
                  {quizItem.attempt_flag === "Y" ? (
                    <div className="mr-4" >
                      <AtemptedCard quizItem={quizItem} handleView={() =>
                        leaderboard1(
                          quizItem.quiz_id,
                          quizItem.quiz_level_attempt_id,
                          quizItem.complexity,
                          quizItem.quiz_duration,
                          quizItem.pass_percentage
                        )}
                      />
                    </div>
                    // <div className='mr-4'>
                    //   <div onClick={() =>
                    //     handleStartQuiz1(
                    //       quizItem.quiz_id,
                    //       quizItem.attempts_count,
                    //       quizItem.retake_flag
                    //     )
                    //   } className={styles.sampleBoxImage}>
                    //   </div>
                    //   <div
                    //     key={index}
                    //     className={styles.sampleBoxDetails}
                    //   // style={{
                    //   //   width: "245px",
                    //   //   // paddingTop: "8px",
                    //   //   paddingTop: "20px",
                    //   //   marginTop: "10px",
                    //   //   marginRight: "10px",
                    //   //   backgroundColor:
                    //   //     quizItem.attempts_count < quizItem.retake_flag
                    //   //       ? "#fee2e2"
                    //   //       : "#55505026",
                    //   // }}
                    //   >
                    //     <span className="relative group">
                    //       <span className={styles.title}>
                    //         {quizItem.quiz_name}
                    //       </span>
                    //       {/* <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                    //         {quizItem.quiz_name}
                    //       </span> */}
                    //     </span>
                    //     <div className={styles.sampleBoxQuizDetails}>
                    //       <div className="z-40 mb-[2px]  font-normal rounded -mt-[12px] relative -top-[8px] right-[2px]">
                    //         {/* <svg
                    //           xmlns="http://www.w3.org/2000/svg"
                    //           fill="none"
                    //           viewBox="0 0 24 24"
                    //           strokeWidth="1.5"
                    //           stroke="currentColor"
                    //           className="w-4 h-4 -ml-[27px] rotate-90 cursor-pointer rounded-lg hover:bg-slate-200"
                    //           onClick={() => toggleNavbar(index)}
                    //         >
                    //           <path
                    //             strokeLinecap="round"
                    //             strokeLinejoin="round"
                    //             d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    //           />
                    //           {cardStates[index] ? "Close Navbar" : "Open Navbar"}
                    //         </svg> */}

                    //         {cardStates[index] && (
                    //           <div
                    //             className={styles.infoIcons}
                    //             style={{
                    //               marginTop: "-23px",
                    //               marginLeft: "-118px",
                    //             }}
                    //           >
                    //             <div className={styles.start}>
                    //               <img className="" src={eye} alt="Play icon" />
                    //               <span
                    //                 className="text-[8px]  cursor-pointer hover:text-black"
                    //                 onClick={() =>
                    //                   quizresults(
                    //                     quizItem.quiz_id,
                    //                     quizItem.quiz_level_attempt_id
                    //                   )
                    //                 }
                    //               >
                    //                 View
                    //               </span>
                    //             </div>
                    //             {quizItem.attempts_count <
                    //               quizItem.retake_flag && (
                    //                 <div className={styles.retake}>
                    //                   <img
                    //                     className=" h-[10px] w-[10px] "
                    //                     src={Share_button}
                    //                     alt="download icon"
                    //                   />
                    //                   <span
                    //                     className="text-[8px]  cursor-pointer hover:text-black"
                    //                     onClick={() =>
                    //                       handleStartQuiz(quizItem.quiz_id)
                    //                     }
                    //                   >
                    //                     Retake
                    //                   </span>
                    //                 </div>
                    //               )}
                    //             {userRole === "Quiz Master" && (
                    //               <div className={styles.edit}>
                    //                 <img
                    //                   className={styles.editimage}
                    //                   src={Edit_button}
                    //                   alt="Edit icon"
                    //                 />
                    //                 <span
                    //                   className={styles.edittext}
                    //                   onClick={() => Edit(quizItem.quiz_id)}
                    //                 >
                    //                   Edit
                    //                 </span>
                    //               </div>
                    //             )}
                    //             <div className={styles.leaderboard}>
                    //               <img
                    //                 className={styles.leaderboardimage}
                    //                 style={{ marginTop: "1px" }}
                    //                 src={leaderboard_button}
                    //                 alt="Play icon"
                    //               />
                    //               <span
                    //                 className={styles.leaderboardtext}
                    //                 onClick={() =>
                    //                   leaderboard1(
                    //                     quizItem.quiz_id,
                    //                     quizItem.quiz_level_attempt_id,
                    //                     quizItem.complexity,
                    //                     quizItem.quiz_duration,
                    //                     quizItem.pass_percentage
                    //                   )
                    //                 }
                    //               >
                    //                 Leaderboard
                    //               </span>
                    //             </div>

                    //             {userRole === "Quiz Master" && (
                    //               <div className={styles.edit}>
                    //                 <img
                    //                   className={styles.editimage}
                    //                   src={disable}
                    //                   alt="Disable icon"
                    //                 />
                    //                 <span
                    //                   className={styles.starttext}
                    //                   onClick={() => handleDisableClick(quizItem.quiz_id)}>
                    //                   Disable
                    //                 </span>
                    //                 <Modal
                    //                   isOpen={modalIsOpen1}
                    //                   onRequestClose={() =>
                    //                     setModalIsOpen1(false)
                    //                   }
                    //                   className="bg-white rounded-lg p-8 mx-auto max-w-md border-red-400 border-[1px]"
                    //                   overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    //                 >
                    //                   <h2 className="text-xl font-semibold mb-4">
                    //                     Are you sure you want to disable this
                    //                     card?
                    //                   </h2>
                    //                   <div className="mb-4">
                    //                     <input
                    //                       type="checkbox"
                    //                       id="confirmCheckbox"
                    //                       className="mr-2"
                    //                       checked={isChecked1}
                    //                       onChange={(e) => setIsChecked1(e.target.checked)} />
                    //                     <label htmlFor="confirmCheckbox">
                    //                       I understand the consequences.
                    //                     </label>
                    //                   </div>
                    //                   <div className="flex justify-end space-x-4">
                    //                     <button
                    //                       className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked
                    //                         ? "opacity-50 cursor-not-allowed"
                    //                         : ""
                    //                         }`}
                    //                       onClick={() => setIsDisableConfirmed}
                    //                       disabled={!isChecked1}
                    //                     >
                    //                       Delete
                    //                     </button>
                    //                     <button
                    //                       className="bg-gray-300 text-black px-4 py-2 rounded"
                    //                       onClick={() => setModalIsOpen1(false)}
                    //                     >
                    //                       Cancel
                    //                     </button>
                    //                   </div>
                    //                 </Modal>
                    //               </div>
                    //             )}
                    //           </div>
                    //         )}
                    //       </div>
                    //     </div>

                    //     <div className="flex mt-[9px] mb-[18px] relative top-[6px]">
                    //       <span className="relative group">
                    //         <span className="text-[#002366] ml-[10px] mt-4 w-[50px] cursor-pointer z-0 truncate text-[9px] font-semibold">
                    //           {quizItem.category}
                    //         </span>
                    //         <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                    //           {quizItem.category}
                    //         </span>
                    //       </span>

                    //       <p className="px-[2px] font-normal">|</p>

                    //       <span className="relative group">
                    //         <span className="text-[#002366] w-[80px] cursor-pointer z-0 truncate text-[9px] font-semibold">
                    //           {quizItem.sub_category}
                    //         </span>
                    //         <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[13px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                    //           {quizItem.sub_category}
                    //         </span>
                    //       </span>


                    //     </div>
                    //     <div className="h-1 -mt-[8px] pl-[10px] text-[7px] text-[#002366] font-semibold relative -top-[6px]">
                    //       <h3>Quiz ID : {quizItem.quiz_id}</h3>
                    //     </div>

                    //     <div className="h-[2px] w-full bg-white"></div>
                    //     <div className={styles.sampleBoxQuizDetails} >
                    //       <div className={styles.sampleBoxQuizDetailsBoxes}>
                    //         <div className="ml-[5px] h-[25px]">
                    //           <img className={styles.author} src={created} />
                    //           <label className={styles.text}>{quizItem.created_by}</label>
                    //         </div>

                    //         <div className="ml-[5px]  h-[25px]">
                    //           <img className={styles.questions} src={NoOfQuestion1} />
                    //           <label className={styles.text}>{quizItem.number_of_questions}</label>
                    //         </div>

                    //         <div className="ml-[5px] h-[25px]" >
                    //           <img className={styles.questions} src={noOfAttampt} />
                    //           <label className={styles.text}>{quizItem.quiz_attempts}</label>
                    //         </div>
                    //       </div>
                    //       <div className={styles.sampleBoxQuizDetailsBoxes}>
                    //         <div className="">
                    //           <img className={styles.calender} src={Calender} />
                    //           <label className={styles.text} >{quizItem.quiz_create_date}</label>
                    //         </div>
                    //         <div>
                    //           <img className={styles.clock} src={clock1} />
                    //           <label className={styles.text}>{quizItem.quiz_duration}</label>
                    //         </div>
                    //       </div>
                    //     </div>
                    //     <div className={styles.sampleBoxDetailsFooterIcons}>
                    //       <img className={styles.view} title="View" src={newView} onClick={() =>
                    //         leaderboard1(
                    //           quizItem.quiz_id,
                    //           quizItem.quiz_level_attempt_id,
                    //           quizItem.complexity,
                    //           quizItem.quiz_duration,
                    //           quizItem.pass_percentage
                    //         )
                    //       } />
                    //       <img className={styles.clock} title="Leaderboard" src={leaderboard2} onClick={() =>
                    //         leaderboard1(
                    //           quizItem.quiz_id,
                    //           quizItem.quiz_level_attempt_id,
                    //           quizItem.complexity,
                    //           quizItem.quiz_duration,
                    //           quizItem.pass_percentage
                    //         )
                    //       } />
                    //       <img className={styles.print} title="Print" src={print} />
                    //     </div>
                    //   </div>
                    //   {/* <div className={styles.line}></div> */}
                    //   <div >
                    //     <div >
                    //     </div>
                    //     <div>

                    //     </div>
                    //   </div>
                    //   {/* <div className={styles.line}>

                    //   </div> */}
                    //   {/* <div className={styles.line}></div> */}
                    // </div>

                  ) : (
                    <>
                      <div className="mr-4" >
                        <NonAtemptedCard quizItem={quizItem} handleStartQuiz={() => {
                          handleStartQuiz(quizItem.quiz_id)
                        }} />
                      </div>

                    </>

                    // <div
                    //   className={styles.retakeColor}
                    //  >
                    //   {/* <span className="relative group -top-[1px]">
                    //     <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate">
                    //       {quizItem.quiz_name}
                    //     </span>
                    //     <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                    //       {quizItem.quiz_name}
                    //     </span>
                    //   </span> */}

                    //   <div className={styles.iconContainer}>
                    //     <div className="z-40 mb-[2px]  font-normal rounded">
                    //       {/* <svg
                    //         xmlns="http://www.w3.org/2000/svg"
                    //         fill="none"
                    //         viewBox="0 0 24 24"
                    //         strokeWidth="1.5"
                    //         stroke="currentColor"
                    //         className="w-4 h-4 -ml-[27px] relative -top-[9px] right-[1px] rotate-90 cursor-pointer rounded-lg hover:bg-slate-200"
                    //         onClick={() => toggleNavbar(index)}
                    //       >
                    //         <path
                    //           strokeLinecap="round"
                    //           strokeLinejoin="round"
                    //           d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    //         />
                    //         {cardStates[index]
                    //           ? "Close Navbar"
                    //           : "Open Navbar"}
                    //       </svg> */}

                    //       {cardStates[index] && (


                    //         <div
                    //           className={styles.infoIcons}
                    //           style={{
                    //             marginTop: "-29px",
                    //             marginLeft: "-120px",
                    //           }}
                    //         >
                    //           <div className={styles.start}>
                    //             <img
                    //               className={styles.startimage}
                    //               src={Start_button}
                    //               alt="Play icon"
                    //             />
                    //             <span
                    //               className={styles.starttext}
                    //               onClick={() =>
                    //                 handleStartQuiz(quizItem.quiz_id)
                    //               }
                    //             >
                    //               Start
                    //             </span>
                    //           </div>
                    //           {userRole === "Quiz Master" && (
                    //             <div className={styles.edit}>
                    //               <img
                    //                 className={styles.editimage}
                    //                 src={Edit_button}
                    //                 alt="Edit icon"
                    //               />
                    //               <span
                    //                 className={styles.edittext}
                    //                 onClick={() => Edit(quizItem.quiz_id)}
                    //               >
                    //                 Edit
                    //               </span>
                    //             </div>
                    //           )}
                    //           <div className={styles.leaderboard}>
                    //             <img
                    //               className={styles.leaderboardimage}
                    //               src={leaderboard_button}
                    //               alt="Leaderboard icon"
                    //             />
                    //             <span
                    //               className={styles.leaderboardtext}
                    //               onClick={() =>
                    //                 leaderboard(
                    //                   quizItem.quiz_id,
                    //                   quizItem.quiz_total_marks,
                    //                   quizItem.pass_percentage,
                    //                   quizItem.quiz_name,
                    //                   quizItem.quiz_description,
                    //                   quizItem.created_by,
                    //                   quizItem.complexity,
                    //                   quizItem.quiz_duration,
                    //                   quizItem.number_of_questions,
                    //                   quizItem.min_completion_time,
                    //                   quizItem.quiz_attempts,
                    //                   quizItem.avg_score,
                    //                   quizItem.max_percentage,
                    //                   quizItem.quiz_create_date
                    //                 )
                    //               }
                    //             >
                    //               Leaderboard
                    //             </span>
                    //           </div>
                    //           {userRole === "Quiz Master" && (
                    //             <div className={styles.start}>
                    //               <img
                    //                 className={styles.startimage}
                    //                 src={Delete}
                    //                 alt="Delete icon"
                    //               />
                    //               <span
                    //                 className={styles.starttext}
                    //                 onClick={() => handleDeleteClick(quizItem.quiz_id)}>
                    //                 Delete
                    //               </span>
                    //               <Modal
                    //                 isOpen={modalIsOpen}
                    //                 onRequestClose={() => setModalIsOpen(false)}
                    //                 className="bg-white rounded-lg p-8 mx-auto max-w-md border-red-400 border-[1px]"
                    //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    //               >
                    //                 <h2 className="text-xl font-semibold mb-4">
                    //                   Are you sure you want to delete this card?
                    //                 </h2>
                    //                 <div className="mb-4">
                    //                   <input
                    //                     type="checkbox"
                    //                     id="confirmCheckbox"
                    //                     className="mr-2"
                    //                     checked={isChecked}
                    //                     onChange={(e) =>
                    //                       setIsChecked(e.target.checked)
                    //                     }
                    //                   />
                    //                   <label htmlFor="confirmCheckbox">
                    //                     I understand the consequences.
                    //                   </label>
                    //                 </div>
                    //                 <div className="flex justify-end space-x-4">
                    //                   <button
                    //                     className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked
                    //                       ? "opacity-50 cursor-not-allowed"
                    //                       : ""
                    //                       }`}
                    //                     onClick={() => setIsDeleteConfirmed(true)}
                    //                     disabled={!isChecked}
                    //                   >
                    //                     Delete
                    //                   </button>
                    //                   <button
                    //                     className="bg-gray-300 text-black px-4 py-2 rounded"
                    //                     onClick={() => setModalIsOpen(false)}
                    //                   >
                    //                     Cancel
                    //                   </button>
                    //                 </div>
                    //               </Modal>
                    //             </div>
                    //           )}

                    //           {userRole === "Quiz Master" && (
                    //             <div className={styles.start}>
                    //               <img
                    //                 className={styles.startimage}
                    //                 src={disable}
                    //                 alt="Disable icon"
                    //               />
                    //               <span
                    //                 className={styles.starttext}
                    //                 onClick={() => handleDisableClick(quizItem.quiz_id)}>
                    //                 Disable
                    //               </span>
                    //               <Modal
                    //                 isOpen={modalIsOpen1}
                    //                 onRequestClose={() => setModalIsOpen1(false)}
                    //                 className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                    //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    //               >
                    //                 <h2 className="text-xl font-semibold mb-4">
                    //                   Are you sure you want to disable this
                    //                   card?
                    //                 </h2>
                    //                 <div className="mb-4">
                    //                   <input
                    //                     type="checkbox"
                    //                     id="confirmCheckbox"
                    //                     className="mr-2"
                    //                     checked={isChecked1}
                    //                     onChange={(e) =>
                    //                       setIsChecked1(e.target.checked)
                    //                     }
                    //                   />
                    //                   <label htmlFor="confirmCheckbox">
                    //                     I understand the consequences.
                    //                   </label>
                    //                 </div>
                    //                 <div className="flex justify-end space-x-4">
                    //                   <button
                    //                     className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked1
                    //                       ? "opacity-50 cursor-not-allowed"
                    //                       : ""
                    //                       }`}
                    //                     onClick={() => setIsDisableConfirmed}
                    //                     disabled={!isChecked1}
                    //                   >
                    //                     Disable
                    //                   </button>
                    //                   <button
                    //                     className="bg-gray-300 text-black px-4 py-2 rounded"
                    //                     onClick={() => setModalIsOpen1(false)}
                    //                   >
                    //                     Cancel
                    //                   </button>
                    //                 </div>
                    //               </Modal>
                    //             </div>
                    //           )}
                    //         </div>
                    //       )}
                    //     </div>
                    //   </div>


                    //   {/* <div className="flex relative top-[15px]">
                    //     <span className="relative group">
                    //       <span className="text-[#002366] ml-[10px] w-[50px] cursor-pointer z-0 truncate text-[9px] font-semibold">
                    //         {quizItem.category}
                    //       </span>
                    //       <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                    //         {quizItem.category}
                    //       </span>
                    //     </span>
                    //     <p className="px-[2px] font-normal">|</p>

                    //     <span className="relative group">
                    //       <span className="text-[#002366] cursor-pointer z-0 truncate text-[9px] relative top-[1px] font-semibold inline-block w-[80px] overflow-hidden whitespace-nowrap">
                    //         {quizItem.sub_category}
                    //       </span>
                    //       <span className="absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded text-nowrap">
                    //         {quizItem.sub_category}
                    //       </span>
                    //     </span>

                    //     <button
                    //       className="cursor-pointer ml-auto relative -top-[5px] right-1"
                    //       onClick={() => handleStartQuiz(quizItem.quiz_id)}
                    //     >
                    //       <img
                    //         className="h-8 w-[34px]"
                    //         src={start}
                    //         alt="Start button"
                    //       />
                    //     </button>
                    //   </div> */}
                    //   {/* <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[75px] left-[12px]">
                    //     <div>
                    //       Created By :
                    //       <span className="pl-[2px]">
                    //         {quizItem.created_by}
                    //       </span>
                    //     </div>
                    //   </div> */}
                    //   {/* <div className="h-1 -mt-[6px] pl-[10px] text-[7px] text-[#002366] font-semibold relative -top-[6px]">
                    //     <h3>Quiz ID : {quizItem.quiz_id}</h3>
                    //   </div> */}

                    //   {/* <div className="relative group mt-1 ">
                    //     <span className={styles.description}>
                    //       {quizItem.quiz_description}
                    //     </span>
                    //     <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
                    //       {quizItem.quiz_description}
                    //     </span>
                    //   </div> */}

                    //   {/* <div className="h-[2px] w-full bg-white"></div> */}

                    //   {/* <div
                    //     style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}
                    //   >
                    //     <div className="h-[85px] rounded w-full ">
                    //       <div
                    //         className={styles.additionalInfo}
                    //         style={{ position: "relative", top: "55px" }}
                    //       >
                    //         <div
                    //           className={styles.infoIcon}
                    //           style={{ marginTop: "25px" }}
                    //         ></div>
                    //         <div className="z-0">
                    //           <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366] relative -left-[10px] -top-[90px] hover:text-black">
                    //             <img
                    //               className="h-[15px] w-[13px] pl-[3px] pb-1"
                    //               src={Attempt1}
                    //               alt="Attempts Icon"
                    //               width={10}
                    //               height={10}
                    //             />
                    //             <p>{quizItem.quiz_attempts}</p>
                    //             <span className="text-[8px] -ml-1">
                    //               Attempts
                    //             </span>
                    //           </div>
                    //         </div>

                    //         <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[12px] hover:text-black">
                    //           <img
                    //             className="pb-[1px] pt-[2px] -mt-1 relative bottom-[2px]"
                    //             src={NoOfQuestion}
                    //             alt="Number of question Icon"
                    //             width={15}
                    //             height={10}
                    //           />
                    //           {quizItem.number_of_questions}
                    //           <span className="text-[8px] ml-[1px]">
                    //             Questions
                    //           </span>
                    //         </span>
                    //         <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[14px] hover:text-black">
                    //           <img
                    //             className="pb-[1px] mr-[1px] relative left-[3px]"
                    //             src={Clock}
                    //             alt="Time Icon"
                    //             width={14}
                    //             height={14}
                    //           />
                    //           {quizItem.quiz_duration}
                    //           <span className="text-[8px] -ml-[0.5px]">
                    //             Minutes
                    //           </span>
                    //         </span>
                    //         <span className="flex text-[9px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded relative -left-[10px] hover:text-black">
                    //           <img
                    //             className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                    //             src={Easy}
                    //             alt="Challenge Icon"
                    //             width={15}
                    //             height={9}
                    //           />
                    //           {quizItem.complexity}
                    //         </span>
                    //       </div>
                    //     </div>
                    //   </div> */}
                    // </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <LogoutBar /> */}
    </div>
  );
};

export default Dashboard;
