
import React, { useState, useEffect, useContext } from "react";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { Line } from "rc-progress";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
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
import back from "../../src/assets/Images/dashboard/quiz12.png"
import assign from "../../src/assets/Images/dashboard/assign.png"

const Expiryquiz = () => {
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
  const { isAuthenticated, authToken,logout } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  const [quizId, setQuizId] = useState(0);
  const [userid, setUserid] = useState(null);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isDisableConfirmed, setIsDisableConfirmed] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [enableModel, setEnableModel] = useState(false);
  const orgId = localStorage.getItem('org_id');

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDisableClick = (quiz_id) => {
    setQuizId(quiz_id);
    setModalIsOpen1(true);
  };
  const confirmDisable = (quizItem) => {
    console.log('confirmDisable');
    // setIsDisableConfirmed(true);
    handleDisableQuiz(quizItem);
  };
  const handleEnableOnClick = () => {
    setEnableModel(true);
  }
  const confirmEnable = async (quizItem) => {
    console.log('quizItem', quizItem);
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      const body = JSON.stringify({
        user_id: userId,
        quiz_id: quizItem?.quiz_id,  // Corrected reference
      });

      const response = await fetch("https://dev.quizifai.com:8010/enable_quiz/", {
        method: "POST",
        headers,
        body,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Disable response:", result);
        if (result.response === "fail") {
          // Show popup with message
          setPopupMessage(result.response_message);
          setShowPopup(true);
          setModalIsOpen1(false);
        } else {
          setModalIsOpen1(false);
          window.location.reload();

        }
       
        // window.location.reload();
        // Optionally, update the card to show it's disabled
      } else {
        console.error("Failed to disable quiz");
      }
    } catch (error) {
      console.error("Error during disable operation:", error);
    }
  };

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };
  const handleDisableQuiz = async (quizItem) => {
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
        quiz_id: quizItem?.quiz_id,
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
  
        if (result.response === "fail") {
          // Show popup with message
          setPopupMessage(result.response_message);
          setShowPopup(true);
          setModalIsOpen1(false);
        } else {
          setModalIsOpen1(false);
          window.location.reload();

        }
      } else {
        console.error("Failed to disable quiz");
      }
    } catch (error) {
      console.error("Error during disable operation:", error);
    }
  };
  
  // const handleDisableQuiz = async () => {
  //   try {
  //     const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

  //     if (!authToken) {
  //       throw new Error("No authentication token found");
  //     }

  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${authToken}`,
  //     };

  //     const body = JSON.stringify({
  //       user_id: userId,
  //       quiz_id: quizId,
  //     });

  //     const response = await fetch(
  //       "https://dev.quizifai.com:8010/disable_quiz/",
  //       {
  //         method: "POST",
  //         headers,
  //         body,
  //       }
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Disable response:", result);
  //     //   setModalIsOpen1(false);
  //     // } else {
  //     //   console.error("Failed to disable quiz");
  //     // }
  //     if (result.response === "fail") {
  //       // Show popup with message
  //       setPopupMessage(result.response_message);
  //       setShowPopup(true);
  //     } else {
  //       setModalIsOpen1(false);
  //     }
  //   }
  //   } catch (error) {
  //     console.error("Error during disable operation:", error);
  //   }
  // };
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
        user_id: userId,
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
        if (result.response === "fail") {
          // Show popup with message
          setPopupMessage(result.response_message);
          setShowPopup(true);
          setModalIsOpen(false);
        } else {
          setModalIsOpen(false);
        }
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
        localStorage.setItem("username", userDetails.full_name);

      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [authToken, isAuthenticated, navigate, userId]);

  const handleStartQuiz = (quizId, activeFlag) => {
    if (activeFlag === "i") {
      toast.error("This quiz is inactive and cannot be started.");
      return;
    }
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/quizaccess`);
  };
  // const handleStartQuiz1 = (quizId, attemptsCount, retakeFlag) => {
  //   if (attemptsCount >= retakeFlag) {
  //     toast.error(
  //       "You have reached the maximum number of retake attempts for this quiz."
  //     );
  //   } else {
  //     localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
  //     navigate(`/quizaccess`);
  //     setMessage(""); // Clear any previous messages
  //   }
  // };
  const handleStartQuiz1 = (quizId, attemptsCount, retakeFlag, activeFlag) => {
    // Check if the quiz is inactive
    if (activeFlag === "i") {
      toast.error("This quiz is inactive and cannot be started.");
      return;
    }
  
    // Check if the user has reached the maximum number of attempts
    if (attemptsCount >= retakeFlag) {
      toast.error(
        "You have reached the maximum number of retake attempts for this quiz."
      );
      return;
    }
  
    // Proceed with starting the quiz
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/quizaccess`);
    setMessage(""); // Clear any previous messages
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
  const Assign = (quizId, quizName) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    localStorage.setItem("quiz_name", quizName);
    navigate(`/assignquiz`);
  };
  const quizresults = (quizId, attemptId) => {
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    localStorage.setItem("quiz_level_attempt_id", attemptId); // Store attempt_id in local storage
    navigate(`/quizview_results`);
  };
  const createQuiz = () => {
    navigate(`/pdf`);
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
  const [cardStates1, setCardStates1] = useState(
    Array(allquizzes.length).fill(false)
  );
  const toggleNavbar1 = (index) => {
    setCardStates1((prevState) => {
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
    <div className="flex">
      <Navigation />
      <ToastContainer />
      <div className="w-full flex flex-wrap mx-auto gap-[24px] p-2">
      {allquizzes
  .filter((quizItem) => {
    const quizEndDate = new Date(quizItem.quiz_end_date);
    const today = new Date();
    return quizEndDate < today; // Only include quizzes with an expiry date
  })
  .map((quizItem, index) => (
               
                 <div
                        key={index}
                        className={`
                          
                          flex flex-row w-full max-w-[390px] h-[170px] rounded-lg rounded-b-xl shadow-lg p-[10px] bg-white mb-4 border-[#A7A7A7] border-[1px] border-b-[8px]
                        `}
                      >
                        {/* Image Section */}
                        <div       className="w-[140px] h-[127px]  rounded-md  mr-2"
                        >
                          <img
                            onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag
                              )
                            }
                          src={quizItem.photo1 || back}
                            alt="Quiz Cover"
                            className="w-[140px] h-[140px] rounded-md mr-2 cursor-pointer"
                          />
                        </div>
                      
                        <div  className="flex flex-col w-full cursor-pointer ">
                          {/* Title and Version */}
                          <div className="relative group flex justify-between items-center gap-[3px]">
                            {/* Truncated text container */}
                            <h2 
                            onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag
                              )
                            }
                               className="text-[15px] font-semibold text-[#00008b] w-[170px] cursor-pointer sm:w-[215px] truncate">
                            {quizItem.quiz_name}
                            </h2>
                      
                            {/* Full text that will appear above on hover */}
                            {/* <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-[25px] w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                              Physics,Physics,Physics,Physics
                            </span> */}
                            {(userRole === "Quiz Master" || userRole === "Super Admin") && (
                            <img src={more} alt="" onClick={() => toggleNavbar(index)} className=" w-[12px] h-[12px] hover:bg-gray-200   hover:rounded-full" />
                            )}
                            {cardStates[index]  && (
                              <div
                                className="absolute rounded-md w-[150px]  flex flex-col p-1 bg-gray-200 mt-[43px] ml-[115px]"
                                style={{
                                  clipPath:
                                    "polygon(0% 0%, 80% 0, 80% 8%, 95% 15%, 81% 23%, 80% 100%, 0 100%)",
                                }}
                              >
                                {/* <div className="flex items-center">
                                  <img
                                    className="w-2 h-2 mr-1"
                                    src={Start_button}
                                    alt="Play icon"
                                  />
                                  <span
                                    className="text-[12px] text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => handleStartQuiz(quizItem.quiz_id)}
                                  >
                                    Start
                                  </span>
                                </div> */}
                                {(userRole === "Super Admin" || (userRole === "Quiz Master" && orgId)) && (
  <div className="flex items-center">
    <img
      className="w-2 h-2 mr-1"
      src={assign}
      alt="Edit icon"
    />
    <span
      className="text-[12px] text-[#00008b] cursor-pointer hover:underline"
      onClick={() => Assign(quizItem.quiz_id,quizItem.quiz_name)}
    >
      Assign
    </span>
  </div>
)}

                                {(userRole === "Quiz Master" || userRole === "Super Admin")&& (
                                  <div className="flex items-center ">
                                    <img
                                      className="w-2 h-2 mr-1"
                                      src={Edit_button}
                                      alt="Edit icon"
                                    />
                                    <span
                                      className="text-[12px] text-[#00008b] cursor-pointer hover:underline"
                                      onClick={() => Edit(quizItem.quiz_id)}
                                    >
                                      Edit
                                    </span>
                                  </div>
                                )}

                                {(userRole === "Quiz Master" || userRole === "Super Admin") && (
  <div className="flex items-center">
    <img
    onClick={() => handleDeleteClick(quizItem.quiz_id)}
      className="w-2 h-2 mr-1 cursor-pointer"
      src={Delete}
      alt="Delete icon"
    />
    <span
      className="text-[#00008b] text-[12px] cursor-pointer hover:underline"
      onClick={() => handleDeleteClick(quizItem.quiz_id)}
    >
      Delete
    </span>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="bg-white rounded-lg p-8 mx-auto max-w-md border border-red-400"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <h2 className="text-xl font-semibold mb-4">
        Are you sure you want to delete this card?
      </h2>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="confirmCheckbox"
          className="mr-2 h-4 w-4"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="confirmCheckbox" className="text-sm">
          I understand the consequences.
        </label>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          className={`px-4 py-2 rounded bg-red-500 text-white transition-opacity duration-200 ${
            !isChecked ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
          onClick={setIsDeleteConfirmed}
          disabled={!isChecked}
        >
          Delete
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
          onClick={() => setModalIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  </div>
)}
                                {/* <div className="flex items-center">
                                  <img
                                    className="w-2 h-2 mr-1"
                                    src={leaderboard_button}
                                    alt="Leaderboard icon"
                                  />
                                  <span
                                    className="text-[12px] text-blue-500 cursor-pointer hover:underline"
                                    onClick={() =>
                                      leaderboard(
                                        quizItem.quiz_id,
                                        quizItem.quiz_total_marks,
                                        quizItem.pass_percentage,
                                        quizItem.quiz_name,
                                        quizItem.quiz_description,
                                        quizItem.created_by,
                                        quizItem.complexity,
                                        quizItem.quiz_duration,
                                        quizItem.number_of_questions,
                                        quizItem.min_completion_time,
                                        quizItem.quiz_attempts,
                                        quizItem.avg_score,
                                        quizItem.max_percentage,
                                        quizItem.quiz_create_date
                                      )
                                    }
                                  >
                                    Leaderboard
                                  </span>
                                </div> */}
                                {(userRole === "Quiz Master" || userRole === "Super Admin") && (
  <div className="flex items-center">
    <img
      className="w-2 h-2 mr-1 cursor-pointer"
      src={disable}
      alt="Disable icon"
    />
                             {quizItem.active_flag ?.toLowerCase() != "true"  ? 

<span
  className="text-[#00008b] text-[12px] cursor-pointer hover:underline"
  onClick={handleEnableOnClick}
>
  Enable
</span>:
<span
  className="text-[#00008b] text-[12px] cursor-pointer hover:underline"
  onClick={() => setModalIsOpen1(true)}
>
  Disable
</span>
}
   
  <Modal
                                      isOpen={modalIsOpen1}
                                      onRequestClose={() =>
                                        setModalIsOpen1(false)
                                      }
                                      ariaHideApp={false}
                                      className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                                      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                    >
                                      <h2 className="text-xl font-semibold mb-4">
                                        Are you sure you want to disable this card?
                                      </h2>
                                      <div className="mb-4">
                                        <input
                                          type="checkbox"
                                          id="confirmCheckbox"
                                          className="mr-2"
                                          checked={isChecked1}
                                          onChange={(e) =>
                                            setIsChecked1(e.target.checked)
                                          }
                                        />
                                        <label htmlFor="confirmCheckbox">
                                          I understand the consequences.
                                        </label>
                                      </div>
                                      <div className="flex justify-end space-x-4">
                                        <button
                                          className={`bg-red-500 text-white px-4 py-2 rounded ${
                                            !isChecked1
                                              ? "opacity-50 cursor-not-allowed"
                                              : ""
                                          }`}
                                          onClick={() =>  confirmDisable(quizItem)}
                                          disabled={!isChecked1}
                                        >
                                          Disable 
                                        </button>
                                        <button
                                          className="bg-gray-300 text-black px-4 py-2 rounded"
                                          onClick={() => setModalIsOpen1(false)}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </Modal>
    <Modal
                                      isOpen={enableModel}
                                      onRequestClose={() =>
                                        setModalIsOpen1(false)
                                      }
                                      ariaHideApp={false}
                                      className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                                      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                    >
                                      <h2 className="text-xl font-semibold mb-4">
                                        Are you sure you want to Enable this card?
                                      </h2>
                                      <div className="mb-4">
                                        <input
                                          type="checkbox"
                                          id="confirmCheckbox"
                                          className="mr-2"
                                          checked={isChecked1}
                                          onChange={(e) =>
                                            setIsChecked1(e.target.checked)
                                          }
                                        />
                                        <label htmlFor="confirmCheckbox">
                                          I understand the consequences.
                                        </label>
                                      </div>
                                      <div className="flex justify-end space-x-4">
                                        <button
                                          className={`bg-red-500 text-white px-4 py-2 rounded ${
                                            !isChecked1
                                              ? "opacity-50 cursor-not-allowed"
                                              : ""
                                          }`}
                                          onClick={() => confirmEnable(quizItem)}
                                          disabled={!isChecked1}
                                        >
                                          Enable 
                                        </button>
                                        <button
                                          className="bg-gray-300 text-black px-4 py-2 rounded"
                                          onClick={() => setEnableModel(false)}
                                        >
                                          Cancel 
                                        </button>
                                      </div>
                                    </Modal>
  </div>
)}

                              </div>
                            )}
                          </div>
                         
                          {/* Meta Information */}
                          <div  onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag
                              )
                            } className="text-[#00008b] cursor-pointer text-[12px] truncate max-w-[230px] max-h-4 justify-start mt-1">
                            <span>{quizItem.category}</span>
                            <span className="mx-1">.</span>
                            <span>{quizItem.sub_category}</span>
                            <span className="mx-1">.</span>
                            <span>{quizItem.complexity}</span>
                          </div>
                      
                          {/* Icons Row */}
                          <div className="flex-col items-center text-[10px] space-y-1 mt-2 text-[#00008b]">
                            {/* Author and Date */}
                            <div   
                             onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag
                              )
                            } className="flex items-center justify-between cursor-pointer text-[12px] sm:text-[10px]">
                              <div className="flex items-center">
                                <img src={username1} className="w-[20px] h-[20px] mr-1" />
                                <span className="ml-1 text-[12px]  ">{quizItem.created_by}</span>
                              </div>
                              <div className="flex items-center">
                                <img src={calander} className="w-[20px] h-[20px] mr-1" />
                                <span className="ml-1 text-[12px] ">{quizItem.quiz_create_date} </span>
                              </div>
                            </div>
                      
                            {/* Quiz Info */}
                            <div  
                             onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag
                              )
                            }
                             className="flex cursor-pointer items-center justify-between pr-1 text-xs sm:text-sm">
                              <div className="flex items-center">
                                <img src={comment} className="w-[20px]   h-[20px] mr-1" />
                                <span className="ml-1 text-[12px] ">{quizItem.number_of_questions} Questions</span>
                              </div>
                              <div className="flex items-center">
                                <img src={timer} className="w-[20px] h-[20px] mr-1" />
                                <span className="ml-1 text-[12px] ">{quizItem.quiz_duration} Minutes</span>
                              </div>
                            </div>
                      
                            {/* Attempt Info */}
                            <div 
                             onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag
                              )
                            } 
                            className="flex items-center cursor-pointer space-x-4 text-xs sm:text-sm">
                              <div className="flex items-center">
                                <img src={Attemts} className="w-[18px] h-[18px] mr-1" />
                                <span className="ml-1 text-[12px]">{quizItem.quiz_attempts} Attempt</span>
                              </div>
                            </div>
                            <div className="flex items-end justify-end ">
                              <div className="flex items-end">
                                <img
                                  onClick={() =>
                                                      quizresults(
                                                        quizItem.quiz_id,
                                                        quizItem.quiz_level_attempt_id
                                                      )
                                                    } src={view1} className="w-[18px] cursor-pointer h-[18px] mr-1" />
                                <img src={leader}
                                     onClick={() =>
                                                        leaderboard1(
                                                          quizItem.quiz_id,
                                                          quizItem.quiz_level_attempt_id,
                                                          quizItem.complexity,
                                                          quizItem.quiz_duration,
                                                          quizItem.pass_percentage
                                                        )
                                                      }
                                
                               
                               className="w-[18px] cursor-pointer h-[18px] mr-1" />
                                <img src={print1} className="w-[18px] h-[18px] mr-1" />
                      
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
            
              ))}
          </div>
    
    </div>
  );
};

export default Expiryquiz;
