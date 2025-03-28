// quizzes.js
import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import styles from "./quiz.module.css";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useNavigate } from "react-router-dom";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Start_button from "/images/dashboard/Start-button.png";
import start from "../../src/assets/Images/dashboard/non-attempted-start.png";
import Delete from "../../src/assets/Images/dashboard/delete.png";
import disable from "../../src/assets/Images/dashboard/disable.png";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Authcontext/AuthContext.jsx";
import Modal from "react-modal";
// import AttemptedCard from "../../src/commonCard/attemptedCard.jsx"
// import NonttemptedCard from "../../src/commonCard/nonAttemtedCard.jsx";
import DashBoardNavBar from "../../src/dashboardNavBar/dashboardNavBar.jsx";
import physics from "../../src/assets/Images/quiz-type/quizcover.jpg"
import username1 from "../../src/assets/Images/quiz-type/username.png"
import calander from "../../src/assets/Images/quiz-type/calander.png"
import timer from "../../src/assets/Images/quiz-type/Timer.png"
import comment from "../../src/assets/Images/quiz-type/comment.png"
import back from "../../src/assets/Images/dashboard/quiz12.png"

import more from "../../src/assets/Images/dashboard/more.png"
import Attemts from "../../src/assets/Images/dashboard/Attemts.png"
import view1 from "../../src/assets/Images/dashboard/view1.png"
import leader from "../../src/assets/Images/dashboard/Leader.png"
import print1 from "../../src/assets/Images/dashboard/print.png"
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import assign from "../../src/assets/Images/dashboard/assign.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import crown from "../../src/assets/Images/dashboard/image (16).png";
import { CircularProgress } from "@mui/material";
import Topnavbar from "../Topnavbar/topnavbar.jsx";

// Modal.setAppElement(el);
const Quiz = () => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userRole, setUserRole] = useState(localStorage.getItem("user_role"));
  const [username, setUsername] = useState("");
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState(false);
  const [selectedQuizItem, setSelectedQuizItem] = useState({});
  const currentValue1 = 50;
  const maxValue1 = 100;
  const currentValue2 = 30;
  const maxValue2 = 80;
  const [allquizzes, setAllquizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [dateRanges, setDateRanges] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const [popularity, setPopularity] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState([]);

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const [complexities, setComplexities] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState([]);

  const [createdBy, setCreatedBy] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState([]);

  const [data, setData] = useState("");
  const [timeData, setTimeData] = useState(null);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(null);
  const [averageScorePercentage, setAverageScorePercentage] = useState(null);
  const { authToken,logout } = useContext(AuthContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isDisableConfirmed, setIsDisableConfirmed] = useState(false);
  const [deleteDisabled, SetDeleteDisabled] = useState(false);
  const [enableModel, setEnableModel] = useState(false);
  // const [cardStatus, setCardStatus] = useState({});
  const orgId = localStorage.getItem('org_id');
  const subscriptionType = localStorage.getItem('subscription_type');

  const [quizId, setQuizId] = useState(0); // Ensure quizId is properly initialized


  const [cardStates1, setCardStates1] = React.useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
const [multiAnswer, setMultiAnswer] = useState(false);

 const [Premium , setPremium ] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);


 const HandlePremium = (event) => {
  setPremium(event.target.checked);
};

  const toggler1 = (event) => {
    setMultiAnswer(event.target.checked);
  };
  const toggleNavbar1 = (index) => {
    setCardStates1((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  // const staticApiResponse = [
  //   {
  //     quiz_id: 1,
  //     attempts_count: 0,
  //     retake_flag: 2,
  //     active_flag: "true",
  //     quiz_name: "Static Quiz 1",
  //     category: "Science",
  //     sub_category: "Physics",
  //     complexity: "Easy",
  //     created_by: "John Doe",
  //     quiz_create_date: "2024-11-25",
  //     number_of_questions: 10,
  //     quiz_duration: 30,
  //     quiz_attempts: 1,
  //     quiz_level_attempt_id: 101,
  //     pass_percentage: 60,
  //     photo1:physics,
  //   },
  //   {
  //     quiz_id: 2,
  //     attempts_count: 1,
  //     retake_flag: 3,
  //     active_flag: "false",
  //     quiz_name: "Static Quiz 2",
  //     category: "Math",
  //     sub_category: "Algebra",
  //     complexity: "Medium",
  //     created_by: "Jane Doe",
  //     quiz_create_date: "2024-11-24",
  //     number_of_questions: 20,
  //     quiz_duration: 45,
  //     quiz_attempts: 2,
  //     quiz_level_attempt_id: 102,
  //     pass_percentage: 70,
  //     photo1: physics,
  //   },
  // ];
  

  const handleDisableClick = (quiz_id) => {
    setQuizId(quiz_id);
    setModalIsOpen1(true);
  };
  const confirmDisable = (quizItem) => {
    console.log('confirmDisable');
    setIsDisableConfirmed(true);
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
        setModalIsOpen1(false);
        window.location.reload();
        // Optionally, update the card to show it's disabled
      } else {
        console.error("Failed to disable quiz");
      }
    } catch (error) {
         if (error instanceof SyntaxError) {
              toast.error("A parsing error occurred. Please check your input file.");
            } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
              toast.error("A network error occurred. Please check your internet connection.");
            } else if (error.message.includes("Failed to fetch")) {
              toast.error("Server could not be reached. Please try again later.");
            } else {
              toast.error("An unexpected error occurred while processing your request. Please try again.");
            }
    }
  };

  const navigate = useNavigate();
  // const userRole = localStorage.getItem("user_role");

  const sortAlphabetically = (arr) => {
    return arr.sort((a, b) => {
      const valueA = a ? a.toLowerCase() : "";
      const valueB = b ? b.toLowerCase() : "";
      return valueA.localeCompare(valueB);
    });
  };
  const handleOptionsDeleteClick = () => {
    setDeleteModelOpen(true);
  }
  const handleDeleteOnClick = (event, quizItem) => {
    setQuizId(event);
    handleDeleteQuiz(quizItem?.quiz_attempts);
    console.log("quizItem", quizItem);

  }

  useEffect(() => {
    const fetchDropdownValues = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

        if (!authToken) {
          throw new Error("No authentication token found");
        }
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        };

        // Fetch date range and popularity
        const dateRangeResponse = await fetch(
          "https://dev.quizifai.com:8010/get_date_rnge/",
          {
            headers,
          }
        );
        const dateRangeResult = await dateRangeResponse.json();
        console.log("Date Range and Popularity data:", dateRangeResult);
        setDateRanges(sortAlphabetically(dateRangeResult["Date Range"]));
        setPopularity(sortAlphabetically(dateRangeResult["Popularity"]));

        // Fetch categories and subcategories
        const categoriesResponse = await fetch(
          "https://dev.quizifai.com:8010/categories&sub_categories/",
          {
            headers,
          }
        );
        const categoriesResult = await categoriesResponse.json();
        console.log("Categories and Subcategories data:", categoriesResult);
        setCategories(
          sortAlphabetically(
            categoriesResult.data.map((item) => item.category_name)
          )
        );
        setAllSubCategories(categoriesResult.data);

        // Fetch complexities
        const complexitiesResponse = await fetch(
          "https://dev.quizifai.com:8010/complexities/",
          {
            headers,
          }
        );
        const complexitiesResult = await complexitiesResponse.json();
        console.log("Complexities data:", complexitiesResult);
        setComplexities(
          complexitiesResult.data.map((item) => item.complexity_name)
        );

        // Fetch courses and classes
        const coursesResponse = await fetch(
          "https://dev.quizifai.com:8010/courses-clsses/",
          {
            headers,
          }
        );
        const coursesResult = await coursesResponse.json();
        console.log("Courses and Classes data:", coursesResult);

        const uniqueCourseNames = Array.from(
          new Set(coursesResult.data.map((item) => item.course_name))
        );
        setCourses(sortAlphabetically(uniqueCourseNames));

        const uniqueClasses = Array.from(
          new Set(coursesResult.data.map((item) => JSON.stringify(item)))
        ).map((item) => JSON.parse(item));
        setAllClasses(uniqueClasses);
      } catch (error) {
          if (error instanceof SyntaxError) {
               toast.error("A parsing error occurred. Please check your input file.");
             } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
               toast.error("A network error occurred. Please check your internet connection.");
             } else if (error.message.includes("Failed to fetch")) {
               toast.error("Server could not be reached. Please try again later.");
             } else {
               toast.error("An unexpected error occurred while processing your request. Please try again.");
             }
      }
    };

    fetchDropdownValues();
  }, []);
//---------------------**dsahboard data fetch **-------------------------//
  const [loading1, setLoading1] = useState(true); // Loading state

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
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
          throw new Error("Failed to fetch quiz data");
        }
        const result = await response.json();
        console.log("quizzes received data:", result);

        const data = result.data[0];
        if (!data) {
          throw new Error("No data found");
        }

        setTimeData(data.time_spent || []);
        setWeeklyQuizCount(data.weekly_quiz_count || 0);
        setAverageScorePercentage(
          parseFloat(data.average_score_percentage) || 0
        );
        setAllquizzes(data.all_quizzes || []);
        setFilteredQuizzes(data.all_quizzes || []);

        // Extract unique dropdowns and sort them alphabetically
        // const uniqueValues = (key) =>
        //   [...new Set(data.all_quizzes.map((quiz) => quiz[key]))].sort(
        //     (a, b) => {
        //       if (typeof a === "string" && typeof b === "string") {
        //         return a.toLowerCase().localeCompare(b.toLowerCase());
        //       }
        // Handle non-string values or cases where a or b is not a string
        //     return 0;
        //   }
        // );
        // setDataRanges(uniqueValues("date_range"));
        // setPopularity(uniqueValues("quiz_attempts"));
        // setCategories(uniqueValues("category"));
        // setSubCategories(uniqueValues("sub_category"));
        // setComplexities(uniqueValues("complexity"));
        // setCourses(uniqueValues("course_name"));
        // setClasses(uniqueValues("class_name"));
        // setCreatedBy(uniqueValues("created_by"));

        const userDetails = data.audit_details;
        setUsername(userDetails.full_name);

        // Fetch created by details
        const uniqueCreatedBy = sortAlphabetically([
          ...new Set(data.all_quizzes.map((quiz) => quiz.created_by)),
        ]);
        setCreatedBy(uniqueCreatedBy);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
           if (error instanceof SyntaxError) {
                toast.error("A parsing error occurred. Please check your input file.");
              } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
                toast.error("A network error occurred. Please check your internet connection.");
              } else if (error.message.includes("Failed to fetch")) {
                toast.error("Server could not be reached. Please try again later.");
              } else {
                toast.error("An unexpected error occurred while processing your request. Please try again.");
              }
      }finally {
        setLoading1(false); // Stop loading after API call
      }
    };

    fetchQuizData();
  }, [userId, authToken]);
//---------------------**dsahboard data fetch end **----------------------//

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const selectedCategories = allSubCategories.filter((item) =>
        selectedCategory.includes(item.category_name)
      );

      const newSubCategories = selectedCategories.flatMap((item) =>
        item.sub_categories.map((sub) => sub.sub_category_name)
      );

      setFilteredSubCategories(sortAlphabetically(newSubCategories));
    } else {
      setFilteredSubCategories(
        sortAlphabetically(
          allSubCategories.flatMap((item) =>
            item.sub_categories.map((sub) => sub.sub_category_name)
          )
        )
      );
    }
  }, [selectedCategory, allSubCategories]);

  // useEffect(() => {
  //   if (selectedDateRange.length > 0) {
  //     const newPopularity = dateRanges
  //       .filter(item => selectedDateRange.includes(item.date_range))
  //       .flatMap(item => item.popularity);

  //     setPopularity((newPopularity));
  //   } else {
  //     setPopularity((dateRanges.flatMap(item => item.popularity)));
  //   }
  // }, [selectedDateRange, dateRanges]);

  useEffect(() => {
    if (selectedCourses.length > 0) {
      const selectedCoursesClasses = allClasses.filter((item) =>
        selectedCourses.includes(item.course_name)
      );

      const newClasses = selectedCoursesClasses.flatMap((item) =>
        item.classes.map((cls) => cls.class_name)
      );

      setFilteredClasses(sortAlphabetically(newClasses));
    } else {
      setFilteredClasses(
        sortAlphabetically(
          allClasses.flatMap((item) =>
            item.classes.map((cls) => cls.class_name)
          )
        )
      );
    }
  },
    [selectedCourses, allClasses]);

  const [cardStates, setCardStates] = useState(
    Array(allquizzes.length).fill(false)
  );
  const toggleNavbar = (index) => {
    setCardStates((prevState) => {
      const updatedStates = Array(allquizzes.length).fill(false); // Close all navbars
      updatedStates[index] = !prevState[index]; // Toggle the selected navbar
      return updatedStates;
    });
  };

  // const [cardStatus, setCardStatus] = useState(
  //   Array(allquizzes.length).fill(false)
  // );
  // const toggleNavbar1 = (index) => {
  //   setCardStatus((prevState) => {
  //     const updatedStates = [...prevState];
  //     updatedStates[index] = !updatedStates[index];
  //     return updatedStates;
  //   });
  // };

  // const createquiz = () => {
  //   navigate("/pdf");
  // };
  const [loading, setLoading] = useState(false);

  const createquiz = async () => {
    setLoading(true); 

    try {
      const userId = localStorage.getItem("user_id");
      const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error("No authentication token found");
      }  
      const response = await fetch(
        `https://dev.quizifai.com:8010/get_user_subscriptionlimitations?user_id=${userId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`, // Use dynamically retrieved token
          },
        }
      );
  
      const result = await response.json();
  
      if (result.response === "success") {
        const { remaining_ai_creations_today, remaining_manual_creations_today } = result.data;
  
        // Check if both remaining AI and manual creations are 0
        if (remaining_ai_creations_today === 0 && remaining_manual_creations_today === 0) {
          toast.error("You have no remaining attempts to create a quiz.");
          return;
        }
  
        // Proceed to PDF page
        navigate(`/pdf`);
      } else if (result.response === "fail") {
        // Show the failure message from the API response
        toast.error(result.response_message || "Failed to start the quiz.");
      } else {
        toast.error("Failed to fetch subscription limitations. Please try again.");
      }
    } catch (error) {
        if (error instanceof SyntaxError) {
             toast.error("A parsing error occurred. Please check your input file.");
           } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
             toast.error("A network error occurred. Please check your internet connection.");
           } else if (error.message.includes("Failed to fetch")) {
             toast.error("Server could not be reached. Please try again later.");
           } else {
             toast.error("An unexpected error occurred while processing your request. Please try again.");
           }
    }finally {
      setLoading(false); // Hide loading after API response
    }
  };
  
  const Edit = (quizId) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/editmanuly`);
  };
  //  const handleEnableClick = () => {

  // }

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
    max_percentage
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
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    // localStorage.setItem("quiz_level_attempt_id", attemptId);
    // localStorage.setItem("complexity", complexity); // Store attempt_id in local storage
    // localStorage.setItem("quiz_duration", quizduration);
    navigate(`/leaderboard`, {
      state: {
        quizId,
        attemptId,
        complexity,
        quizduration,
        passpercentage,
        // quizdescription,
        // createdby,
        // numberofquestions,
        // quizduration,
        // complexity,
        // mincompletiontime,
        // quizattempts,
        // avgscore,
        // max_percentage,quizcreatedate
      },
    });
  };
  const quizresults = (quizId, attemptId) => {
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    localStorage.setItem("quiz_level_attempt_id", attemptId); // Store attempt_id in local storage
    navigate(`/quizview_results`);
  };
  const Assign = (quizId, quizName) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    localStorage.setItem("quiz_name", quizName);
    navigate(`/assignquiz`);
  };
  
 const handleStartQuiz = async (quizId, activeFlag, premiumQuizFlag) => {
    // Check if the quiz is inactive
   if (activeFlag === "i" || activeFlag === "false") {
        toast.error("This quiz is inactive and cannot be started.");
        return;
      }

    // Check if the quiz is premium and the user is not a premium subscriber
    if (premiumQuizFlag && subscriptionType !== "Premium" && subscriptionType !== "NTPL Internship") {
      setIsPremiumModalOpen(true); // Show modal for upgrading to premium
      return;
    }

    try {
      // Fetch user subscription limitations
      const response = await fetch(
        `https://dev.quizifai.com:8010/get_user_subscriptionlimitations?user_id=${userId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer <YOUR_ACCESS_TOKEN>`, // Replace with the actual token
          },
        }
      );

      const result = await response.json();

      if (result.response === "success") {
        const { remaining_attempts_today } = result.data;

        // Check if there are no remaining attempts
        if (remaining_attempts_today === 0) {
          toast.error("You have no remaining attempts to access this quiz.");
          return;
        }

        // Proceed with starting the quiz
        localStorage.setItem("quiz_id", quizId); // Store quiz_id in localStorage
        navigate(`/quizaccess`); // Navigate to the quiz access page
      }  else if (result.response === "fail") {
              // Show the failure message from the API response
              toast.error(result.response_message || "Failed to start the quiz.");
            } else {
        toast.error(
          "Failed to fetch subscription limitations. Please try again."
        );
      }
    } catch (error) {
   if (error instanceof SyntaxError) {
        toast.error("A parsing error occurred. Please check your input file.");
      } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("A network error occurred. Please check your internet connection.");
      } else if (error.message.includes("Failed to fetch")) {
        toast.error("Server could not be reached. Please try again later.");
      } else {
        toast.error("An unexpected error occurred while processing your request. Please try again.");
      }
    }
  };
  
   const handleStartQuiz1 = async (
     quizId,
     attemptsCount,
     retakeFlag,
     activeFlag,
     premiumQuizFlag
   ) => {
     if (activeFlag === "i" || activeFlag === "false") {
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
 
     // Check if the quiz is premium and the user does not have a premium subscription
     if (premiumQuizFlag && subscriptionType !== "Premium" && subscriptionType !== "NTPL Internship") {
       setIsPremiumModalOpen(true); // Show modal for upgrading to premium
       return;
     }
 
     try {
       // Fetch user subscription limitations
       const response = await fetch(
         `https://dev.quizifai.com:8010/get_user_subscriptionlimitations?user_id=${userId}`,
         {
           method: "POST",
           headers: {
             Accept: "application/json",
             Authorization: `Bearer <YOUR_ACCESS_TOKEN>`, // Replace with the actual token
           },
         }
       );
 
       const result = await response.json();
 
       if (result.response === "success") {
         const { remaining_attempts_today } = result.data;
 
         // Check if there are no remaining attempts
         if (remaining_attempts_today === 0) {
           toast.error("You have no remaining attempts to access this quiz.");
           return;
         }
 
         // Proceed with starting the quiz
         localStorage.setItem("quiz_id", quizId); // Store quiz_id in localStorage
         navigate(`/quizaccess`); // Navigate to the quiz access page
       }  else if (result.response === "fail") {
               // Show the failure message from the API response
               toast.error(result.response_message || "Failed to start the quiz.");
             } else {
         toast.error(
           "Failed to fetch subscription limitations. Please try again."
         );
       }
     } catch (error) {
      if (error instanceof SyntaxError) {
           toast.error("A parsing error occurred. Please check your input file.");
         } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
           toast.error("A network error occurred. Please check your internet connection.");
         } else if (error.message.includes("Failed to fetch")) {
           toast.error("Server could not be reached. Please try again later.");
         } else {
           toast.error("An unexpected error occurred while processing your request. Please try again.");
         }
     }
   };
   const open = () => {
      setIsPremiumModalOpen(true);
  
    }
    const handlePremiumConfirmation = () => {
      setIsPremiumModalOpen(false);
      toast.success("You have confirmed your subscription!");
      navigate(`/subscription`);
    };
  
    const closeModal = () => {
      setIsPremiumModalOpen(false);
    };

  const currentDate = new Date();

  useEffect(() => {
    const filtered = allquizzes.filter((quizItem) => {
      const matchesCategory =
        !selectedCategory.length ||
        selectedCategory.includes(quizItem.category);
      const matchesSubCategory =
        !selectedSubCategory.length ||
        selectedSubCategory.includes(quizItem.sub_category);
      const matchesComplexity =
        !selectedComplexity.length ||
        selectedComplexity.includes(quizItem.complexity);
      const matchesCourse =
        !selectedCourses.length ||
        selectedCourses.includes(quizItem.course_name);
      const matchesClass =
        !selectedClasses.length ||
        selectedClasses.includes(quizItem.class_name);
      const matchesCreatedBy =
        !selectedCreatedBy.length ||
        selectedCreatedBy.includes(quizItem.created_by);
      const matchesSearch =
        searchQuery.length === 0 ||
        quizItem.quiz_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quizItem.quiz_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesComplexity &&
        matchesCourse &&
        matchesCreatedBy &&
        matchesClass &&
        matchesSearch
      );
    });

    setFilteredQuizzes(filtered);
  }, [
    allquizzes,
    selectedCategory,
    selectedSubCategory,
    selectedComplexity,
    selectedCourses,
    selectedClasses,
    selectedCreatedBy,
    searchQuery,
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const highlightText = (text, query) => {
  //   if (!query) return text;
  //   const parts = text.split(new RegExp(`(${query})`, "gi"));
  //   return parts.map((part, index) =>
  //     part.toLowerCase() === query.toLowerCase() ? (
  //       <span key={index} style={{ backgroundColor: "yellow" }}>
  //         {part}
  //       </span>
  //     ) : (
  //       part
  //     )
  //   );
  // };

  // Custom styles for react-select to match your existing dropdown design

  const highlightText = (text, query) => {
    if (typeof text !== "string") {
      return text;
    }

    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "auto",
      minWidth: "183px",
      padding: "2px",
      marginLeft: "-2px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      backgroundColor: "#CBF2FB",
      border: "none",
      outline: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #2684FF" : "none", // Focused state border
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#CBF2FB",
      overflowX: "hidden",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#A5CCE3" : "#CBF2FB",
      color: "#00008b",
      fontSize: "10px",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      padding: "5px 10px", // Adjusted padding for better alignment
      lineHeight: "1.2", // Adjusted line-height for better alignment
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e5e5e5",
      height: "auto", // Adjusted to auto height for better text wrapping
      padding: "2px", // Adjusted padding for better text alignment
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "black",
      fontSize: "12px",
      lineHeight: "normal",
      maxWidth: "100px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      fontSize: "12px",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "bold",
      color: "#495487",
      fontSize: "12px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#495487",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const handleDeleteClick = (quiz_id) => {
    console.log('quiz_id', quiz_id);
    setQuizId(quiz_id);
    setModalIsOpen(true);
  }

  const handleDeleteQuiz = async (quiz_attempts) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      if (quiz_attempts > 0) {
        alert("Quiz cannot be deleted as it has been attempted by one or more users. It can only be disabled.");
        setModalIsOpen(false);
        return;
      }

      const body = JSON.stringify({
        user_id: userId,
        quiz_id: quizId,  // Corrected to use quizId
      });

      const response = await fetch("https://dev.quizifai.com:8010/delete_quiz/", {
        method: "POST",
        headers,
        body,
      });

      if (response.ok) {

        // const result = await deleteResponse ?.json();
        // console.log("Delete response:", result);
        setModalIsOpen(false);
        setDeleteModelOpen(false);
        window.location.reload();
        // Optionally, refresh the quiz list or update the UI
      } else {
        console.error("Failed to delete quiz");
      }
    } catch (error) {
        if (error instanceof SyntaxError) {
              toast.error("A parsing error occurred. Please check your input file.");
            } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
              toast.error("A network error occurred. Please check your internet connection.");
            } else if (error.message.includes("Failed to fetch")) {
              toast.error("Server could not be reached. Please try again later.");
            } else {
              toast.error("An unexpected error occurred while processing your request. Please try again.");
            }
    }
  };

  useEffect(() => {
    if (isDeleteConfirmed) {
      handleDeleteQuiz();
    }
  }, [isDeleteConfirmed]);


  const handleDisableQuiz = async (quizItem) => {
    console.log("quizItem", quizItem);
  
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
        quiz_id: quizItem?.quiz_id, // Corrected reference
      });
  
      const response = await fetch("https://dev.quizifai.com:8010/disable_quiz/", {
        method: "POST",
        headers,
        body,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Disable response:", result);
  
        if (result.response === "fail") {
          // Show popup with failure message
          setPopupMessage(result.response_message);
          setShowPopup(true);
        }
  
        // Close modal
        setModalIsOpen1(false);
  
        // Reload page to reflect changes
        window.location.reload();
      } else {
        console.error("Failed to disable quiz: Response not OK");
      }
    } catch (error) {
   if (error instanceof SyntaxError) {
        toast.error("A parsing error occurred. Please check your input file.");
      } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("A network error occurred. Please check your internet connection.");
      } else if (error.message.includes("Failed to fetch")) {
        toast.error("Server could not be reached. Please try again later.");
      } else {
        toast.error("An unexpected error occurred while processing your request. Please try again.");
      }    }
  };
  

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
        if (error instanceof SyntaxError) {
          toast.error("A parsing error occurred. Please check your input file.");
        } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
          toast.error("A network error occurred. Please check your internet connection.");
        } else if (error.message.includes("Failed to fetch")) {
          toast.error("Server could not be reached. Please try again later.");
        } else {
          toast.error("An unexpected error occurred while processing your request. Please try again.");
        }
      });
  };
  // useEffect(() => {
  //   if (isDisableConfirmed) {
  //     handleDisableQuiz(isDisableConfirmed,selectedQuizItem);
  //   }
  // }, [isDisableConfirmed]);

  return (
    <div className="flex font-Poppins">
      <Navigation />
      <ToastContainer />
      <div className={styles.mainContent}>
      <Topnavbar/>
        <div className={styles.header}>
          {/* <p className="-mt-[5px]">
            <span className="text-[20px]">Welcome</span>{" "}
            {username.charAt(0).toUpperCase() + username.slice(1)}
          </p> */}
          <p></p>
          <div className={styles.headerRight}>
       
          <div className="flex justify-end items-center">
                    <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[10px]">
                    Premium Quizzes <span className="text-red-500"></span>
                    </label>
                    <FormControlLabel
                          control={<Switch />} 
                          // label="Required"
                          onChange={HandlePremium}
                          checked={Premium}
                            className="react-switch"
                          />
                </div>
            {userRole === "Quiz Master" && (
              <div className="flex p-2 rounded-[10px] pr-4 bg-[#fee2e2]">
                <div  onClick={createquiz} className="flex items-center">
                  <img
                   onClick={createquiz}
                    className="w-[25px] h-[25px] "
                    src={Plus}
                    alt="Plus Icon"
                  />
                  <a
                    onClick={createquiz}
                    // href="./create-quiz"
                    className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-1"
                  >
                    Quiz
                  </a>
                </div>
              </div>
            )}
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className="h-[14px] w-[14px] absolute top-[13px] left-[14px]"
              />
              <input
                className="text-[10px] border-solid border-[1px] border-[#000084] pl-[38px] pr-[10px] rounded-md h-[38px] mr-[10px] w-fit bg-[#F5F5F5] text-left placeholder-[#214082]  focus:border-none outline-none"
                type="text"
                placeholder="Search quizzes"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {/* <div className="flex flex-col justify-center items-center">
  <img
    src={LogoutIcon}
    onClick={handleBackToLogin}
    alt="Logout Icon"
    className="w-5 h-5 cursor-pointer"
  />
  <p className="text-[#002366] text-[14px]">Logout</p>
</div> */}
          </div>
        </div>
        {/* <div
          className=" h-[41px] mx-[33px] pl-[20px] text-[15px] mr-[58px] font-Poppins font-medium flex items-center -mt-[15px] leading-6 text-left justify-left
         text-[#002366] rounded-md"
          style={{ background: "#eedbe5" }}
        >
          <p>
            {weeklyQuizCount > 0 && averageScorePercentage > 0
              ? `You have successfully completed ${weeklyQuizCount} Quizzes this week, achieving an average score of ${averageScorePercentage}%`
              : "You have not attended any quizzes yet, Please attempt the quizzes below."}
          </p>{" "}
        </div> */}

        <div className={styles.contentWrapper1}>
          {/* <div className={styles.latestQuizHeader}>
            <p className="text-[16px] font-Poppins -ml-[18.5px]">Sort by</p>
          </div> */}
  {/* <div className="flex justify-end items-center">
                    <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[10px]">
                    Premium Quizzes <span className="text-red-500"></span>
                    </label>
                    <FormControlLabel
                          control={<Switch />} 
                          // label="Required"
                          onChange={HandlePremium}
                          checked={Premium}
                            className="react-switch"
                          />
                </div> */}
          <div className={styles.infoCards}>
           
            <div className="flex gap-2">
              <div className=" flex gap-2 pb-2 ml-[16px]">
                <div className="flex-1 min-w-[10px]">
                  <Select
                    isMulti
                    options={dateRanges.map((dtrng) => ({
                      value: dtrng,
                      label: dtrng,
                    }))}
                    value={selectedDateRange.map((dtrng) => ({
                      value: dtrng,
                      label: dtrng,
                    }))}
                    onChange={(selected) =>
                      setSelectedDateRange(selected.map((item) => item.value))
                    }
                    styles={customStyles}
                    placeholder="Date Range"
                  />
                </div>
                {/* <div className="flex-1 min-w-[150px]">
                  <Select
                    isMulti
                    options={popularity.map((plr) => ({
                      value: plr,
                      label: plr ? ` ${plr}` : plr,
                    }))}
                    value={selectedPopularity.map((plr) => ({
                      value: plr,
                      label: plr ? ` ${plr}` : plr,
                    }))}
                    onChange={(selected) =>
                      setSelectedPopularity(selected.map((item) => item.value))
                    }
                    styles={customStyles}
                    placeholder="Popularity"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <Select
                    isMulti
                    options={categories.map((cat) => ({
                      value: cat,
                      label: cat,
                    }))}
                    value={selectedCategory.map((cat) => ({
                      value: cat,
                      label: cat,
                    }))}
                    onChange={(selected) =>
                      setSelectedCategory(selected.map((item) => item.value))
                    }
                    styles={customStyles}
                    placeholder="Category"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <Select
                    isMulti
                    value={selectedSubCategory.map((subcat) => ({
                      value: subcat,
                      label: subcat,
                    }))}
                    onChange={(selected) =>
                      setSelectedSubCategory(selected.map((item) => item.value))
                    }
                    styles={customStyles}
                    placeholder="Sub Category"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                <Select
                  isMulti
                  options={courses.map((course) => ({
                    value: course,
                    label: course,
                  }))}
                  value={selectedCourses.map((course) => ({
                    value: course,
                    label: course,
                  }))}
                  onChange={(selected) =>
                    setSelectedCourses(selected.map((item) => item.value))
                  }
                  styles={customStyles}
                  placeholder="Courses"
                />
                </div>
                <div className="flex-1 min-w-[150px]">
                <Select
                  isMulti
                  options={filteredClasses.map((cls) => ({
                    value: cls,
                    label: cls,
                  }))}
                  value={selectedClasses.map((cls) => ({
                    value: cls,
                    label: cls,
                  }))}
                  onChange={(selected) =>
                    setSelectedClasses(selected.map((item) => item.value))
                  }
                  styles={customStyles}
                  placeholder="Classes"
                />
                </div> */}
            
              {/* <div className=""> */}
                {/* complexity    */}
                <div className="flex-1 min-w-[150px]">
                <Select
                  isMulti
                  options={complexities.map((complex) => ({
                    value: complex,
                    label: complex,
                  }))}
                  value={selectedComplexity.map((complex) => ({
                    value: complex,
                    label: complex,
                  }))}
                  onChange={(selected) =>
                    setSelectedComplexity(selected.map((item) => item.value))
                  }
                  styles={customStyles}
                  placeholder="Complexity"
                />
                </div>
                <div className="flex-1 min-w-[150px]">
                <Select
                  isMulti
                  options={createdBy.map((ctdBy) => ({
                    value: ctdBy,
                    label: ctdBy,
                  }))}
                  value={selectedCreatedBy.map((ctdBy) => ({
                    value: ctdBy,
                    label: ctdBy,
                  }))}
                  onChange={(selected) =>
                    setSelectedCreatedBy(selected.map((item) => item.value))
                  }
                  styles={customStyles}
                  placeholder="Created By"
                />
                </div>
                </div>
                
                {/* CreatedBy   */}
            
              {/* </div> */}
            </div>
            <div className="flex gap-2 mr-8 mb-2">
              <div className="flex gap-1 justify-start items-center border-[1px] border-[#84acfa] p-1 rounded-full">
                <div className=" bg-[#84acfa] w-2 h-2"></div>
<div className="text-[14px] text-[#84acfa]">Not Attempted</div>

              </div>
              <div className="flex gap-1 justify-start items-center border-[1px] border-[#fba0e3] p-1 rounded-full">
                <div className=" bg-[#fba0e3]  w-2 h-2"></div>
<div className="text-[14px] text-[#fba0e3]">Attempted</div>

              </div>
              <div className="flex gap-1 justify-start items-center border-[1px] border-[#81c784] p-1 rounded-full">
                <div className=" bg-[#81c784]  w-2 h-2"></div>
<div className="text-[14px] text-[#81c784]" >No Retake Available</div>

              </div>
              <div className="flex gap-1 justify-start items-center border-[1px] border-[#A7A7A7] p-1 rounded-full">
                <div className=" bg-[#A7A7A7]  w-2 h-2"></div>
<div className="text-[14px] text-[#A7A7A7]">Disabled</div>

              </div>
            </div>
          </div>
{/* <div className="flex mx-auto">
  <DashBoardNavBar/>
</div> */}
  {isPremiumModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-10 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-xl font-semibold mb-4">
              This is a premium quiz!
            </h2>
            <p className="mb-4">
              Would you like to subscribe to access this quiz?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                 No
              </button>
              <button
               onClick={handlePremiumConfirmation}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                          Yes
              </button>
            </div>
          </div>
        </div>
       )}
         {loading && (
         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
           <CircularProgress size={40} color="primary" />
         </div>
       )}
          <div className="mx-auto">
            <div className="flex flex-wrap mx-auto gap-[10px] ml-[18px]">
              {loading1
          ? // Show Skeleton Loaders
          [...Array(9)].map((_, index) => (
            <div key={index} className="w-full max-w-[390px] h-[170px] bg-gray-200 p-4 animate-pulse rounded-lg shadow-lg">
               <div className="flex">
            <div>
            <div  className="rounded-md w-[120px]  h-[140px] bg-gray-300 " />

            </div>
              <div className="ml-3 flex flex-col gap-2">
                <div  className=" w-[170px]  h-[20px] bg-gray-300 rounded-sm" />
                <div  className=" w-[230px]  h-[15px] bg-gray-300 rounded-sm" />
                <div className="flex justify-between">
                <div  className=" w-[90px]  h-[15px] bg-gray-300 rounded-sm" />
                <div  className=" w-[90px]  h-[15px] bg-gray-300 rounded-sm" />

                </div>
                <div className="flex justify-between">
                <div  className=" w-[90px]  h-[15px] bg-gray-300 rounded-sm" />
                <div  className=" w-[90px]  h-[15px] bg-gray-300 rounded-sm" />

                </div>
                <div  className=" w-[80px]  h-[15px] bg-gray-300 rounded-sm" />
                <div className="flex gap-1 justify-end">
                <div  className=" w-[25px]  h-[25px] bg-gray-300 rounded-full" />

                <div  className=" w-[25px]  h-[25px] bg-gray-300 rounded-full" />
                {/* <div  className=" w-[25px]  h-[25px] bg-gray-300 rounded-full" /> */}

                </div>
              </div>
            </div>
            </div>
          ))
        : filteredQuizzes
                .filter((quizItem) => {
                  const adjustedAttemptsCount = quizItem.attempts_count === 1 ? 0 : quizItem.attempts_count;
                  const quizCreateDate = new Date(quizItem.quiz_start_date);
                  const quizEndDate = quizItem.quiz_end_date
                    ? new Date(quizItem.quiz_end_date)
                    : null;
    //                 const isQuizMaster = userRole === "Quiz Master";
    // const isActiveForOthers =
    //   quizItem.active_flag?.toLowerCase() === "true" ||
    //   quizItem.active_flag?.toLowerCase() === "y";
      // const shouldShowQuiz = Premium
      // ? quizItem.premium_quiz_flag === true // Show only premium quizzes if toggle is on
      // : quizItem.premium_quiz_flag === null || quizItem.premium_quiz_flag === false; // Show only non-premium quizzes if toggle is off
      const shouldShowQuiz = Premium
      ? quizItem.premium_quiz_flag === true // Show only premium quizzes if the toggle is on
      : true; 
                  return (
                    shouldShowQuiz &&
                    // (isQuizMaster || isActiveForOthers) &&
                    quizItem.active_flag !== "i" && // Exclude inactive quizzes
      quizItem.active_flag !== "false" && 
                    currentDate >= quizCreateDate &&
                    (quizEndDate === null || currentDate <= quizEndDate)
                  );
                })
                .map((quizItem, index) => (
                  <div className={quizItem?.active_flag != "true" ? "quizDisabled" : ""} key={index}>
                    {quizItem.attempt_flag === "Y" ? (
                      <div className="quiz-list">

                     {/* <div
                     key={index}
                     
                     className={`${quizItem.attempts_count < quizItem.retake_flag
                            ? quizItem.active_flag ?.toLowerCase() != "true" ?  'border-[#81c784] border-[1px] border-b-[8px]' : "border-[#fba0e3] border-[1px] border-b-[8px]": quizItem.active_flag ?.toLowerCase() != "true" ? 'border-[#81c784] border-[1px] border-b-[8px]' : "border-[#A7A7A7] border-[1px] border-b-[8px]" } flex flex-row w-full max-w-[390px] h-[170px]  rounded-lg rounded-b-xl shadow-lg p-[10px] bg-white mb-4`}
                   > */}
                 
       <div
      key={index}
      className={`
        ${
          // quizItem.active_flag?.toLowerCase() === "i" || quizItem.active_flag === "false"
          //   ? "border-[#A7A7A7] border-[1px] border-b-[8px]"
          //   : 
            quizItem.attempts_count >= quizItem.retake_flag
            ? "border-[#81c784] border-[1px] border-b-[8px]"
            : "border-[#fba0e3] border-[1px] border-b-[8px]"
        }
        flex flex-row w-full max-w-[390px] h-[170px] rounded-lg rounded-b-xl shadow-lg p-[10px] bg-white mb-4
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
                              quizItem.active_flag,
                                quizItem.premium_quiz_flag
                            )
                          }
                         src={quizItem.photo1 || back}
                         alt="Quiz Cover"
                         className="w-[140px] h-[140px] rounded-md mr-2 cursor-pointer"
                       />
                     </div>
                   
                     <div className="flex flex-col w-full">
                       {/* Title and Version */}
                       <div className="relative group flex justify-between items-center gap-[3px]">
                         {/* Truncated text container */}
                         <h2    onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag,
                                quizItem.premium_quiz_flag
                              )
                            }
                            className="text-[15px] font-semibold text-[#00008b] w-[170px] sm:w-[215px] truncate cursor-pointer">
                         {quizItem.quiz_name}
                         </h2>
                   
                         {/* Full text that will appear above on hover */}
                         {/* <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-[25px] w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                           Physics,Physics,Physics,Physics
                         </span> */}
                           {quizItem.premium_quiz_flag === true && (
                                                     <img
                                       src={crown}
                                       alt="Premium"
                                       className="w-6 h-6"
                                     />
                                                      )}
                          {(userRole === "Quiz Master" || userRole === "Super Admin")  && (
                         <img src={more} alt="" onClick={() => toggleNavbar1(index)} className=" w-[12px] h-[12px] hover:bg-gray-200   hover:rounded-full" />
                          )}
                         {cardStates1[index] && (
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
      onClick={() => Assign(quizItem.quiz_id, quizItem.quiz_name)}
    >
      Assign
    </span>
  </div>
)}

                             {(userRole === "Quiz Master" || userRole === "Super Admin") && (
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
                                <div>
  <div className="flex  items-center">
  <img
  onClick={() => handleDisableClick(quizItem.quiz_id)}
    className="w-2 h-2 mr-1 cursor-pointer"
    src={disable}
    alt="Disable icon"
  />
 {String(quizItem.active_flag).toLowerCase() !== "true" ? (
  <span
    className="text-[#00008b] text-[12px] cursor-pointer hover:underline"
    onClick={handleEnableOnClick}
  >
    Enable
  </span>
) : (
  <span
    className="text-[#00008b] text-[12px] cursor-pointer hover:underline"
    onClick={() => setModalIsOpen1(true)}
  >
    Disable
  </span>
)}


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
                                                      quizItem.quiz_level_attempt_id,
                                                      quizItem.complexity,
                                                      quizItem.quiz_duration,
                                                      quizItem.pass_percentage
                                   )
                                 }
                               >
                                 Leaderboard
                               </span>
                             </div> */}
                             {(userRole === "Quiz Master" || userRole === "Super Admin") && (
                               <div className="flex items-center">
                                 <img
                                   className="w-2 h-2 mr-1"
                                   src={Delete}
                                   alt="Delete icon"
                                 />
                                 <span
                                   className="text-[12px] text-[#00008b] cursor-pointer hover:underline"
                                   onClick={() => handleDeleteClick(quizItem.quiz_id)}
                                 >
                                   Delete
                                 </span>
                                 <Modal
                                    isOpen={deleteModelOpen}
                                    onRequestClose={() => setDeleteModelOpen(false)}
                                    className="bg-white rounded-lg p-8 mx-auto max-w-md border-red-400 border-[1px]"
                                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                  >
                                    <h2 className="text-xl font-semibold mb-4">
                                      Are you sure you want to delete this card?
                                    </h2>
                                    <div className="mb-4">
                                      <input
                                        type="checkbox"
                                        id="confirmCheckbox"
                                        className="mr-2"
                                        checked={deleteChecked}
                                         onChange={(e) =>
                                          setDeleteChecked(e.target.checked)
                                         }
                                      />
                                      <label htmlFor="confirmCheckbox">
                                        I understand the consequences.
                                      </label>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                      <button 
                                        className={`bg-red-500 text-white px-4 py-2 rounded ${
                                          !isChecked
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                        }`}
                                        onClick={() =>handleDeleteOnClick(quizItem.quiz_id,quizItem )}
                                        
                                        // disabled={!deleteDisabled}
                                      >
                                        Delete 
                                      </button>
                                      <button
                                        className="bg-gray-300 text-black px-4 py-2 rounded"
                                        onClick={() => setDeleteModelOpen(false)}
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
                       <div   onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag,
                                quizItem.premium_quiz_flag
                              )
                            }
                             className="text-[#00008b] text-[10px] truncate max-w-[230px] max-h-4 justify-start mt-1 cursor-pointer">
                         <span>{quizItem.category}</span>
                         <span className="mx-1">.</span>
                         <span>{quizItem.sub_category}</span>
                         <span className="mx-1">.</span>
                         <span>{quizItem.complexity}</span>
                       </div>
                   
                       {/* Icons Row */}
                       <div className="flex-col items-center text-[10px] space-y-1 mt-2 text-[#00008b]">
                         {/* Author and Date */}
                         <div   onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag,
                                quizItem.premium_quiz_flag
                              )
                            } className="flex items-center justify-between text-[12px] sm:text-[10px] cursor-pointer">
                           <div className="flex items-center">
                             <img src={username1} className="w-[20px] h-[20px] mr-1" />
                             <span className="ml-1 text-[12px]  ">{quizItem.created_by}</span>
                           </div>
                           <div className="flex items-center">
                             <img src={calander} className="w-[20px] h-[20px] mr-1" />
                             <span className="ml-1 text-[12px] ">{quizItem.quiz_create_date}</span>
                           </div>
                         </div>
                   
                         {/* Quiz Info */}
                         <div    onClick={() =>
                              handleStartQuiz1(
                                quizItem.quiz_id,
                                quizItem.attempts_count,
                                quizItem.retake_flag,
                                quizItem.active_flag,
                                quizItem.premium_quiz_flag
                              )
                            }
                            className="flex items-center justify-between pr-1 text-xs sm:text-sm cursor-pointer">
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
                         <div   className="flex items-center space-x-4 text-xs sm:text-sm">
                           <div className="flex items-center">
                             <img src={Attemts} className="w-[18px] h-[18px] mr-1" />
                             <span className="ml-1 text-[12px]">{quizItem.quiz_attempts} Attempts</span>
                           </div>
                         </div>
                         <div className="flex justify-between pl-1">
                              <div>
                              <p className="text-[12px]"> 
                                <span>{quizItem.pass_flag ? 'Pass' : 'Fail'}</span><span> |</span>
                               {/* <span> 8 Fastest</span> <span> |</span>
                               <span> 8 Higest</span><span> |</span> */}
                               <span> {quizItem.attained_score} Score</span><span> |</span>
                               <span> {quizItem.quiz_grade} Grade</span>

                               </p>
                              </div>
                           <div className="flex items-end">
                             <img      onClick={() =>
                                       quizresults(
                                         quizItem.quiz_id,
                                      quizItem.quiz_level_attempt_id
                    )
                                    } src={view1} 
                                    alt="Quiz Results"
                                    title="Quiz Results"
                                    className="w-[18px] h-[18px] mr-1 cursor-pointer" />
                             <img   onClick={() =>
                        
                                                  leaderboard1(
                                                    quizItem.quiz_id,
                                                    quizItem.quiz_level_attempt_id,
                                                    quizItem.complexity,
                                                    quizItem.quiz_duration,
                                                    quizItem.pass_percentage
                                                  )
                                                }
                             src={leader}
                             style={{ cursor: "pointer" }}
  className="w-[18px] h-[18px] mr-1"
  alt="Leaderboard"
  title="View Leaderboard" />
                             {/* <img src={print1} className="w-[18px] h-[18px] mr-1" /> */}
                   
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                  
    </div>
                      // <div
                      //   key={index}
                      //   className={styles.card}
                      //   style={{
                      //     width: "245px",
                      //     // paddingTop: "8px",
                      //     paddingTop: "20px",
                      //     marginTop: "20px",
                      //     marginRight: "10px",
                      //     backgroundColor:
                      //       quizItem.attempts_count < quizItem.retake_flag
                      //         ? quizItem.active_flag ?.toLowerCase() != "true" ?  'gray' : "#fee2e2" 
                      //         : quizItem.active_flag ?.toLowerCase() != "true" ? 'gray' : "#55505026",
                      //   }}
                      //  >
                      //   <span className="relative group">
                      //     <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate -mt-[13px]">
                      //       {highlightText(quizItem.quiz_name, searchQuery)}
                      //     </span>
                      //     <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-[2px] w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                      //       {highlightText(quizItem.quiz_name, searchQuery)}
                      //     </span>
                      //   </span>
                      //   <div className={styles.iconContainer}>
                      //     <div className="z-20 mb-[2px] pl-[45px] font-normal rounded -mt-[13px]">
                      //       <svg
                      //         xmlns="http://www.w3.org/2000/svg"
                      //         fill="none"
                      //         viewBox="0 0 24 24"
                      //         strokeWidth="1.5"
                      //         stroke="currentColor"
                      //         className="w-4 h-4 -ml-[25px] relative -top-[9px] right-2 rotate-90 cursor-pointer rounded-lg hover:bg-slate-200"
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
                      //       </svg>
                      //       {cardStates[index] && (
                      //         <div
                      //           className={styles.infoIcons1}
                      //           style={{
                      //             marginLeft: "-125px",
                      //             marginTop: "-28px",
                      //           }}
                      //         >
                      //           <div className={styles.start}>
                      //             <img
                      //               className=" w-[10px] h-[10px]"
                      //               src={eye}
                      //               alt="Play icon"
                      //             />
                      //             <span
                      //               className="text-[8px]   cursor-pointer hover:text-black"
                      //               onClick={() =>
                      //                 quizresults(
                      //                   quizItem.quiz_id,
                      //                   quizItem.quiz_level_attempt_id
                      //                 )
                      //               }
                      //             >
                      //               View 
                      //             </span>
                      //           </div>
                      //           {quizItem.attempts_count <
                      //             quizItem.retake_flag && (
                      //             <div className={styles.retake}>
                      //               <img
                      //                 className=" h-[10px] w-[10px] "
                      //                 src={Share_button}
                      //                 alt="download icon"
                      //               />
                      //               <span
                      //                 className="text-[8px] - cursor-pointer hover:text-black"
                      //                 onClick={() =>
                      //                   handleStartQuiz(quizItem.quiz_id)
                      //                 }
                      //               >
                      //                 Retake
                      //               </span>
                      //             </div>
                      //           )}
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
                      //               style={{ marginTop: "1px" }}
                      //               src={leaderboard_button}
                      //               alt="Play icon"
                      //             />
                      //             <span
                      //               className={styles.leaderboardtext}
                      //               onClick={() =>

                      //                 leaderboard1(
                      //                   quizItem.quiz_id,
                      //                   quizItem.quiz_level_attempt_id,
                      //                   quizItem.complexity,
                      //                   quizItem.quiz_duration,
                      //                   quizItem.pass_percentage
                      //                 )
                      //               }
                      //             >
                      //               Leaderboard 
                      //             </span>
                      //           </div>
                      //           {userRole === "Quiz Master" && (
                      //             <div>
                      //               <div className={styles.start}>
                      //               <img
                      //                 className={styles.startimage}
                      //                 src={disable}
                      //                 alt="Play icon"
                      //               />
                      //               {quizItem?.active_flag?.toLowerCase() != "true"  ? 
                      //               <span
                      //               className="display-inline"
                      //               onClick={handleEnableOnClick}
                      //               >

                      //                 enable 
                      //               </span>

                      //                 :<span
                      //                 className={styles.starttext}
                      //                 onClick={() => setModalIsOpen1(true)}
                      //               >
                      //                 Disable 
                      //               </span>}

                      //               <Modal
                      //                 isOpen={modalIsOpen1}
                      //                 onRequestClose={() =>
                      //                   setModalIsOpen1(false)
                      //                 }
                      //                 ariaHideApp={false}
                      //                 className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                      //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      //               >
                      //                 <h2 className="text-xl font-semibold mb-4">
                      //                   Are you sure you want to disable this card?
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
                      //                     className={`bg-red-500 text-white px-4 py-2 rounded ${
                      //                       !isChecked1
                      //                         ? "opacity-50 cursor-not-allowed"
                      //                         : ""
                      //                     }`}
                      //                     onClick={() =>  confirmDisable(quizItem)}
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

                      //               <Modal
                      //                 isOpen={enableModel}
                      //                 onRequestClose={() =>
                      //                   setModalIsOpen1(false)
                      //                 }
                      //                 ariaHideApp={false}
                      //                 className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                      //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      //               >
                      //                 <h2 className="text-xl font-semibold mb-4">
                      //                   Are you sure you want to Enable this card?
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
                      //                     className={`bg-red-500 text-white px-4 py-2 rounded ${
                      //                       !isChecked1
                      //                         ? "opacity-50 cursor-not-allowed"
                      //                         : ""
                      //                     }`}
                      //                     onClick={() => confirmEnable(quizItem)}
                      //                     disabled={!isChecked1}
                      //                   >
                      //                     Enable 
                      //                   </button>
                      //                   <button
                      //                     className="bg-gray-300 text-black px-4 py-2 rounded"
                      //                     onClick={() => setEnableModel(false)}
                      //                   >
                      //                     Cancel 
                      //                   </button>
                      //                 </div>
                      //               </Modal>
                      //             </div>
                      //             <div>
                      //             <img 
                      //               className={styles.startimage}
                      //               style={{display: "inline-block", marginRight: 4}}
                      //               src={Delete}
                      //               alt="Delete icon"
                      //             />
                      //             <span 
                      //               className={styles.starttext}
                      //               style={{display: "inline-block"}}
                      //               onClick={() => handleOptionsDeleteClick()}
                      //               >
                      //               Delete 
                      //             </span>
                      //             {/* <div>
                      //               <button onClick={handleEnableClick}className="display: inline-block">enable</button>
                      //               </div> */}

                      //             <Modal
                      //               isOpen={deleteModelOpen}
                      //               onRequestClose={() => setDeleteModelOpen(false)}
                      //               className="bg-white rounded-lg p-8 mx-auto max-w-md border-red-400 border-[1px]"
                      //               overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      //             >
                      //               <h2 className="text-xl font-semibold mb-4">
                      //                 Are you sure you want to delete this card?
                      //               </h2>
                      //               <div className="mb-4">
                      //                 <input
                      //                   type="checkbox"
                      //                   id="confirmCheckbox"
                      //                   className="mr-2"
                      //                   checked={deleteChecked}
                      //                    onChange={(e) =>
                      //                     setDeleteChecked(e.target.checked)
                      //                    }
                      //                 />
                      //                 <label htmlFor="confirmCheckbox">
                      //                   I understand the consequences.
                      //                 </label>
                      //               </div>
                      //               <div className="flex justify-end space-x-4">
                      //                 <button 
                      //                   className={`bg-red-500 text-white px-4 py-2 rounded ${
                      //                     !isChecked
                      //                       ? "opacity-50 cursor-not-allowed"
                      //                       : ""
                      //                   }`}
                      //                   onClick={() =>handleDeleteOnClick(quizItem.quiz_id,quizItem )}

                      //                   // disabled={!deleteDisabled}
                      //                 >
                      //                   Delete 
                      //                 </button>
                      //                 <button
                      //                   className="bg-gray-300 text-black px-4 py-2 rounded"
                      //                   onClick={() => setDeleteModelOpen(false)}
                      //                 >
                      //                   Cancel
                      //                 </button>
                      //               </div>
                      //             </Modal>
                      //             </div>
                      //             </div>

                      //           )}
                      //           {/* <img
                      //       className={styles.shareimage} style={{marginTop:"2px"}}

                      //       src={download}
                      //       alt="Play icon"
                      //     />
                      //     <span className={styles.sharetext} >Download</span> */}
                      //         </div>
                      //       )}
                      //     </div>
                      //   </div>

                      //   <div className="flex mt-[9px] mb-[19px] relative top-[19px]">
                      //     <span className="relative group -top-[13px]">
                      //       <span className="text-[#002366] cursor-pointer z-0 truncate text-[9px] relative top-[1px] left-[10px] font-semibold inline-block w-[80px] overflow-hidden whitespace-nowrap">
                      //         {highlightText(quizItem.category, searchQuery)}
                      //       </span>
                      //       <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block top-[14px] left-[7px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                      //         {highlightText(quizItem.category, searchQuery)}
                      //       </span>
                      //     </span>

                      //     <p className="px-[4px] font-normal relative -top-[13px] pl-2">
                      //       |
                      //     </p>

                      //     <span className="relative group -top-[13px]">
                      //       <span className="text-[#002366] cursor-pointer z-0 truncate text-[9px] relative top-[1px] font-semibold inline-block w-[90px] overflow-hidden whitespace-nowrap">
                      //         {highlightText(
                      //           quizItem.sub_category,
                      //           searchQuery
                      //         )}
                      //       </span>
                      //       <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                      //         {highlightText(
                      //           quizItem.sub_category,
                      //           searchQuery
                      //         )}
                      //       </span>
                      //     </span>

                      //     {quizItem.attempts_count < quizItem.retake_flag && (
                      //       <button
                      //         className="cursor-pointer ml-auto relative -top-[5px] right-1 flex gap-[2px] border-2 bg-[#F5F8F9] rounded-xl border-[#472E86] h-[16px] w-[34.5px]"
                      //         onClick={() =>
                      //           handleStartQuiz1(
                      //             quizItem.quiz_id,
                      //             quizItem.attempts_count,
                      //             quizItem.retake_flag
                      //           )
                      //         }
                      //       >
                      //         <img
                      //           className="h-[5.5px] w-[4.5px] relative top-[3.5px] left-[2px]"
                      //           src={PlayButton}
                      //           alt="Start button"
                      //         />
                      //         <h1 className="text-[#472E86] text-[6px] relative top-[2px] pl-[1px] font-bold">
                      //           Retake
                      //         </h1>
                      //       </button>
                      //     )}
                      //   </div>
                      //   <div className="h-1 -mt-[8px] pl-[10px] text-[7px] font-normal text-[#002366] relative -top-[6px]">
                      //     <h3>
                      //       Quiz ID :{" "}
                      //       {highlightText(quizItem.quiz_id, searchQuery)}
                      //     </h3>
                      //   </div>
                      //   {/* <div className="h-[1px] w-full bg-white"></div> */}
                      //   {/* <div className="h-[3px] w-full bg-white"></div> */}
                      //   <div className="relative group mt-1">
                      //     <span className="text-wrap mt-[6px] text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
                      //       {highlightText(
                      //         quizItem.quiz_description,
                      //         searchQuery
                      //       )}
                      //     </span>
                      //     <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
                      //       {highlightText(
                      //         quizItem.quiz_description,
                      //         searchQuery
                      //       )}
                      //     </span>
                      //   </div>
                      //   <div className="h-[2px] w-full bg-white"></div>

                      //   <div
                      //     style={{
                      //       backgroundColor: "#F9F9F9",
                      //       padding: "1px 0",
                      //     }}
                      //   >
                      //     <div className="h-[85px] rounded w-full bg-[#F5F5F5]">
                      //       <div className="text-[7px] font-normal pl-[10px] relative top-[73px]">
                      //         <span>
                      //           {quizItem.pass_flag ? "Pass" : "Fail"}
                      //         </span>
                      //         <span className="px-[4px]">|</span>
                      //         <span>
                      //           {quizItem.speed_rank}
                      //           <sup>th</sup>Fastest
                      //         </span>
                      //         <span className="px-[3px]">|</span>
                      //         <span>
                      //           {quizItem.score_rank} <sup>th</sup>Highest
                      //         </span>
                      //         <span className="px-[3px]">|</span>
                      //         <span>{quizItem.attained_percentage}% Score</span>
                      //         <span className="px-[3px]">|</span>
                      //         <span>{quizItem.quiz_grade} Grade</span>
                      //       </div>
                      //       <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[50px] left-[10px]">
                      //         <div>
                      //           Created By :
                      //           <span className="pl-[2px]">
                      //             {highlightText(
                      //               quizItem.created_by,
                      //               searchQuery
                      //             )}
                      //           </span>
                      //         </div>
                      //         {/* <div>Created On</div> */}
                      //       </div>

                      //       <div
                      //         className={styles.additionalInfo}
                      //         style={{ marginTop: "25px" }}
                      //       >
                      //         <div
                      //           className={styles.infoIcon}
                      //           style={{
                      //             marginTop: "20px",
                      //             marginRight: "20px",
                      //           }}
                      //         ></div>
                      //         <div className="z-0">
                      //           <div className="text-[7px] flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[8px] -top-[90px] hover:text-black ">
                      //             <img
                      //               className={styles.attemptsimage}
                      //               src={Attempt1}
                      //               alt="Attempts Icon"
                      //               width={10}
                      //               height={10}
                      //             />
                      //             <p>{quizItem.quiz_attempts} </p>
                      //             <span
                      //               title="number of times quiz attempted"
                      //               className="text-[8px] -ml-[1px] cursor-pointer"
                      //             >
                      //               Quiz attempts
                      //             </span>
                      //           </div>
                      //         </div>

                      //         <span className="text-[8px] flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                      //           <img
                      //             className="pb-[1px] pt-[4px] -mt-1  relative bottom-[2px]"
                      //             src={high_score}
                      //             alt="Number of question Icon"
                      //             width={15}
                      //             height={15}
                      //           />{" "}
                      //           {quizItem.attained_score}/
                      //           {quizItem.quiz_total_marks}
                      //           <div
                      //             title="attained score/total score"
                      //             className="cursor-pointer text-[6px]"
                      //           >
                      //             <span className="text-[8px] -ml-[1px]">
                      //               Score
                      //             </span>
                      //           </div>
                      //         </span>
                      //         <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                      //           <img
                      //             className="pb-[1px] mr-[1px] relative left-[3px] "
                      //             src={NoOfQuestion}
                      //             alt="Time Icon"
                      //             width={14}
                      //             height={14}
                      //           />{" "}
                      //           {quizItem.attempted_questions}/
                      //           {quizItem.number_of_questions}
                      //           <div
                      //             title="attempted qustions/total questions"
                      //             className="cursor-pointer text-[6px]"
                      //           >
                      //             <span className="text-[8px] -ml-[1px]">
                      //               Attemped
                      //             </span>
                      //           </div>
                      //         </span>
                      //         <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                      //           <img
                      //             className="pb-[1px] mr-[1px] relative left-[3px] "
                      //             src={Clock}
                      //             alt="Time Icon"
                      //             width={14}
                      //             height={14}
                      //           />{" "}
                      //           {quizItem.attempt_duration_mins}/
                      //           {quizItem.quiz_duration}
                      //           <div
                      //             title="time taken for attempted/total duration of quiz "
                      //             className="cursor-pointer text-[6px]"
                      //           >
                      //             <span className="text-[8px] -ml-[1px]">
                      //               Duration
                      //             </span>
                      //           </div>
                      //         </span>
                      //       </div>
                      //     </div>
                      //   </div>
                      // </div>
                    ) : (

                      <div className="">
                         {/* <div
                     key={index}
                     
                     className={`flex flex-row w-full max-w-[390px] h-[170px]  rounded-lg rounded-b-xl shadow-lg p-[10px] bg-white mb-4 border-[#84acfa] border-[1px] border-b-[8px]`}
                   > */}
                   <div
  key={index}
  className={`flex flex-row w-full max-w-[390px] h-[170px] rounded-lg rounded-b-xl shadow-lg p-[10px] bg-white mb-4
    ${
      // quizItem.active_flag === "i" || quizItem.active_flag === "false"
      //   ? "border-gray-400 border-[1px] border-b-[8px]" // Gray border if active_flag is "i"
      //   : 
        "border-[#84acfa] border-[1px] border-b-[8px]" // Default blue border
    }
  `}
>
                     {/* Image Section */}
                     <div       className="w-[140px] h-[127px]  rounded-md  mr-2"
                     >
                       <img
                       onClick={() => handleStartQuiz(quizItem.quiz_id, quizItem.active_flag,quizItem.premium_quiz_flag)}
                         src={quizItem.photo1 || back}
                         alt="Quiz Cover"
                         className="w-[140px] h-[140px] rounded-md mr-2 cursor-pointer"
                       />
                     </div>
                   
                     <div className="flex flex-col w-full">
                       {/* Title and Version */}
                       <div className="relative group flex justify-between items-center gap-[3px]">
                         {/* Truncated text container */}
                         <h2 onClick={() => handleStartQuiz(quizItem.quiz_id, quizItem.active_flag,quizItem.premium_quiz_flag)}
                         className="text-[15px] font-semibold text-[#00008b] w-[170px] sm:w-[215px] truncate cursor-pointer">
                         {quizItem.quiz_name}
                         </h2>
                   
                         {/* Full text that will appear above on hover */}
                         {/* <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-[25px] w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                           Physics,Physics,Physics,Physics
                         </span> */}
                           {quizItem.premium_quiz_flag === true && (
                                                     <img
                                       src={crown}
                                       alt="Premium"
                                       className="w-6 h-6"
                                     />
                                                      )}
                            {(userRole === "Quiz Master" || userRole === "Super Admin")  && (
                         <img src={more} alt="" onClick={() => toggleNavbar(index)} className=" w-[12px] h-[12px] hover:bg-gray-200   hover:rounded-full" />
                            )}
                         {cardStates[index] && (
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
      onClick={() => Assign(quizItem.quiz_id, quizItem.quiz_name)}

    >
      Assign
    </span>
  </div>
)}

                             {(userRole === "Quiz Master" || userRole === "Super Admin") && (
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
  <div className="flex  items-center">
  <img
  onClick={() => handleDisableClick(quizItem.quiz_id)}
    className="w-2 h-2 mr-1 cursor-pointer"
    src={disable}
    alt="Disable icon"
  />
      {String(quizItem.active_flag).toLowerCase() !== "true" ? (
  <span
    className="text-[#00008b] text-[12px] cursor-pointer hover:underline"
    onClick={handleEnableOnClick}
  >
    Enable
  </span>
) : (
  <span
    className="text-[#00008b] text-[12px] cursor-pointer hover:underline"
    onClick={() => setModalIsOpen1(true)}
  >
    Disable
  </span>
)}

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
                                                    quizItem.max_percentage
                                                  )
                                                }
                               >
                                 Leaderboard
                               </span>
                             </div> */}
                             {(userRole === "Quiz Master" || userRole === "Super Admin") && (
                               <div className="flex items-center">
                                 <img
                                   className="w-2 h-2 mr-1"
                                   src={Delete}
                                   alt="Delete icon"
                                 />
                                 <span
                                   className="text-[12px] text-[#00008b] cursor-pointer hover:underline"
                                   onClick={() => handleDeleteClick(quizItem.quiz_id)}
                                 >
                                   Delete
                                 </span>
                                 <Modal
                                      isOpen={modalIsOpen}
                                      
                                      className="bg-white rounded-lg p-8 mx-auto max-w-md border-red-400 border-[1px]"
                                      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                    >
                                      <h2 className="text-xl font-semibold mb-4">
                                        Are you sure you want to delete this
                                        card?
                                      </h2>
                                      <div className="mb-4">
                                        <input
                                          type="checkbox"
                                          id="confirmCheckbox"
                                          className="mr-2"
                                          checked={isChecked}
                                          onChange={(e) => setIsChecked(e.target.checked)}/>
                                        <label htmlFor="confirmCheckbox">
                                          I understand the consequences.
                                        </label>
                                      </div>
                                      <div className="flex justify-end space-x-4">
                                        <button
                                          className={`bg-red-500 text-white px-4 py-2 rounded ${
                                            !isChecked
                                              ? "opacity-50 cursor-not-allowed"
                                              : ""
                                          }`}
                                          onClick={() =>handleDeleteOnClick(quizItem.quiz_id,quizItem )}
                                          disabled={!isChecked}
                                        >
                                          Delete 
                                        </button>
                                        <button
                                        className="bg-gray-300 text-black px-4 py-2 rounded"
                                        onClick={() => setDeleteModelOpen(false)}
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
                       <div onClick={() => handleStartQuiz(quizItem.quiz_id, quizItem.active_flag,quizItem.premium_quiz_flag)} 
                        className="text-[#00008b] text-[10px] truncate max-w-[230px] max-h-4 justify-start mt-1 cursor-pointer">
                         <span>{quizItem.category}</span>
                         <span className="mx-1">.</span>
                         <span>{quizItem.sub_category}</span>
                         <span className="mx-1">.</span>
                         <span>{quizItem.complexity}</span>
                       </div>
                   
                       {/* Icons Row */}
                       <div className="flex-col items-center text-[10px] space-y-1 mt-2 text-[#00008b]">
                         {/* Author and Date */}
                         <div onClick={() => handleStartQuiz(quizItem.quiz_id, quizItem.active_flag,quizItem.premium_quiz_flag)}  className="flex items-center justify-between text-[12px] sm:text-[10px] cursor-pointer">
                           <div className="flex items-center">
                             <img src={username1} className="w-[20px] h-[20px] mr-1" />
                             <span className="ml-1 text-[12px]  ">{quizItem.created_by}</span>
                           </div>
                           <div className="flex items-center">
                             <img src={calander} className="w-[20px] h-[20px] mr-1" />
                             <span className="ml-1 text-[12px] ">{quizItem.quiz_create_date}</span>
                           </div>
                         </div>
                   
                         {/* Quiz Info */}
                         <div onClick={() => handleStartQuiz(quizItem.quiz_id, quizItem.active_flag,quizItem.premium_quiz_flag)}  className="flex items-center justify-between pr-1 text-xs sm:text-sm cursor-pointer">
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
                         <div onClick={() => handleStartQuiz(quizItem.quiz_id, quizItem.active_flag,quizItem.premium_quiz_flag)}  className="flex items-center space-x-4 text-xs sm:text-sm cursor-pointer">
                           <div className="flex items-center">
                             <img src={Attemts} className="w-[18px] h-[18px] mr-1" />
                             <span className="ml-1 text-[12px]">{quizItem.quiz_attempts} Attempts</span>
                           </div>
                         </div>
                         <div className="flex items-end justify-end ">
                           <div className="flex items-end">
                             {/* <img      onClick={() =>
                                       quizresults(
                                         quizItem.quiz_id,
                                      quizItem.quiz_level_attempt_id
                    )
                                    } src={view1}
                                    alt="Quiz Results"
                             title="Quiz Results"
                              className="w-[18px] h-[18px] mr-1" /> */}
                             <img      onClick={() =>
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
                                                    quizItem.max_percentage
                                                  )
                                                }
                             src={leader}
                             style={{ cursor: "pointer" }}
                             className="w-[18px] h-[18px] mr-1"
                             alt="Leaderboard"
                             title="View Leaderboard" />
                      
                             {/* <img src={print1} className="w-[18px] h-[18px] mr-1" /> */}
                   
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                      </div>
                      // <div
                      //   className={styles.card}
                      //   style={{
                      //     width: "245px",
                      //     paddingTop: "8px",
                      //     marginRight: "10px",
                      //     marginTop: "20px",
                      //     backgroundColor: "#CBF2FB",
                      //   }}
                      //  >
                      //   <span className="relative group">
                      //     <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate -mt-[1px]">
                      //       {highlightText(quizItem.quiz_name, searchQuery)}
                      //     </span>
                      //     <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-20 bg-black text-white px-1 border border-black-300 rounded">
                      //       {highlightText(quizItem.quiz_name, searchQuery)}
                      //     </span>
                      //   </span>

                      //   <div className={styles.iconContainer}>
                      //     <div className="z-30 mb-[2px] pl-[17px] font-normal rounded">
                      //       <svg
                      //         xmlns="http://www.w3.org/2000/svg"
                      //         fill="none"
                      //         viewBox="0 0 24 24"
                      //         strokeWidth="1.5"
                      //         stroke="currentColor"
                      //         className="w-4 h-4 -ml-[33px] -mt-[11px] relative -right-6 rotate-90 cursor-pointer rounded-lg hover:bg-slate-200"
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
                      //       </svg>

                      //       {cardStates[index] && (
                      //         <div
                      //           className={styles.infoIcons}
                      //           style={{
                      //             marginLeft: "-102px",
                      //             marginTop: "-18px",
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
                      //                   quizItem.max_percentage
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
                      //                 // onClick={() => handleDeleteClick(quizItem.quiz_id,quizItem)}

                      //                 onClick={() => handleOptionsDeleteClick()}
                      //               >
                      //                 Delete
                      //               </span>
                      //               <Modal
                      //                 isOpen={deleteModelOpen}

                      //                 className="bg-white rounded-lg p-8 mx-auto max-w-md border-red-400 border-[1px]"
                      //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      //               >
                      //                 <h2 className="text-xl font-semibold mb-4">
                      //                   Are you sure you want to delete this
                      //                   card?
                      //                 </h2>
                      //                 <div className="mb-4">
                      //                   <input
                      //                     type="checkbox"
                      //                     id="confirmCheckbox"
                      //                     className="mr-2"
                      //                     checked={isChecked}
                      //                     onChange={(e) => setIsChecked(e.target.checked)} />
                      //                   <label htmlFor="confirmCheckbox">
                      //                     I understand the consequences.
                      //                   </label>
                      //                 </div>
                      //                 <div className="flex justify-end space-x-4">
                      //                   <button
                      //                     className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked
                      //                         ? "opacity-50 cursor-not-allowed"
                      //                         : ""
                      //                       }`}
                      //                     onClick={() => handleDeleteOnClick(quizItem.quiz_id, quizItem)}
                      //                     disabled={!isChecked}
                      //                   >
                      //                     Delete
                      //                   </button>
                      //                   <button
                      //                     className="bg-gray-300 text-black px-4 py-2 rounded"
                      //                     onClick={() => setDeleteModelOpen(false)}
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
                      //                 alt="Play icon"
                      //               />
                      //               {quizItem.active_flag?.toLowerCase() != "true" ?
                      //                 <span
                      //                   className="display-inline"

                      //                   onClick={handleEnableOnClick}
                      //                 >
                      //                   enable

                      //                 </span>
                      //                 : <span
                      //                   className={styles.starttext}
                      //                   onClick={() => setModalIsOpen1(true)}
                      //                 >
                      //                   Disable

                      //                 </span>}
                      //               {/* <div>
                      //               <button className="display: inline-block">enable</button>
                      //               </div> */}
                      //               <Modal
                      //                 isOpen={modalIsOpen1}
                      //                 onRequestClose={() =>
                      //                   setModalIsOpen1(false)
                      //                 }
                      //                 ariaHideApp={false}
                      //                 className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                      //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      //               >
                      //                 <h2 className="text-xl font-semibold mb-4">
                      //                   Are you sure you want to disable this card?
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
                      //                         ? "opacity-50 cursor-not-allowed"
                      //                         : ""
                      //                       }`}
                      //                     onClick={() => confirmDisable(quizItem)}
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
                      //               <Modal
                      //                 isOpen={enableModel}
                      //                 onRequestClose={() =>
                      //                   setModalIsOpen1(false)
                      //                 }
                      //                 ariaHideApp={false}
                      //                 className="bg-white rounded-lg p-8 mx-auto mt-10 max-w-md border-red-400 border-[1px]"
                      //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      //               >
                      //                 <h2 className="text-xl font-semibold mb-4">
                      //                   Are you sure you want to Enable this card?
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
                      //                         ? "opacity-50 cursor-not-allowed"
                      //                         : ""
                      //                       }`}
                      //                     onClick={() => confirmEnable(quizItem)}
                      //                     disabled={!isChecked1}
                      //                   >
                      //                     Enable
                      //                   </button>
                      //                   <button
                      //                     className="bg-gray-300 text-black px-4 py-2 rounded"
                      //                     onClick={() => setEnableModel(false)}
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

                      //   <div className="flex mt-[9px] relative top-[17px]">
                      //     <span className="relative group left-[11px]">
                      //       <span className="text-[#002366] cursor-pointer z-0 truncate text-[9px] relative top-[1px] font-semibold inline-block w-[80px] overflow-hidden whitespace-nowrap">
                      //         {highlightText(quizItem.category, searchQuery)}
                      //       </span>
                      //       <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block top-[14px] -left-[2px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                      //         {highlightText(quizItem.category, searchQuery)}
                      //       </span>
                      //     </span>
                      //     <p className="px-[4px] font-normal pl-2">|</p>
                      //     <span className="relative group">
                      //       <span className="text-[#002366] cursor-pointer z-0 truncate text-[9px] relative top-[1px] font-semibold inline-block w-[80px] overflow-hidden whitespace-nowrap">
                      //         {highlightText(
                      //           quizItem.sub_category,
                      //           searchQuery
                      //         )}
                      //       </span>
                      //       <span className="absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded text-nowrap">
                      //         {highlightText(
                      //           quizItem.sub_category,
                      //           searchQuery
                      //         )}
                      //       </span>
                      //     </span>
                      //     <button
                      //       className="cursor-pointer ml-auto relative -top-[1px] right-1"
                      //       onClick={() => handleStartQuiz(quizItem.quiz_id)}
                      //     >
                      //       <img
                      //         className="h-8 w-[34px]"
                      //         src={start}
                      //         alt="Start button"
                      //       />
                      //     </button>
                      //   </div>
                      //   <div className="h-1 -mt-[3px] pl-[10px] text-[7px] text-[#002366] font-normal relative top-[3px]">
                      //     <h3>
                      //       Quiz ID :{" "}
                      //       {highlightText(quizItem.quiz_id, searchQuery)}
                      //     </h3>
                      //   </div>
                      //   <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[75px] left-[12px]">
                      //     <div>
                      //       Created By :
                      //       <span className="pl-[2px]">
                      //         {highlightText(quizItem.created_by, searchQuery)}
                      //       </span>
                      //     </div>
                      //     {/* <div>Created On</div> */}
                      //   </div>
                      //   {/* <div style={{ backgroundColor: "#EFEFEF", padding: "2px 0" }}>
                      //  <div className="h-[10px] w-full bg-[#D9D9D9]"></div>
                      //  </div> */}

                      //   <div className="relative group mt-1 ">
                      //     <span className="mt-[6px] text-wrap text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
                      //       {highlightText(
                      //         quizItem.quiz_description,
                      //         searchQuery
                      //       )}
                      //     </span>
                      //     <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
                      //       {highlightText(
                      //         quizItem.quiz_description,
                      //         searchQuery
                      //       )}
                      //     </span>
                      //   </div>

                      //   <div className="h-[2px] w-full bg-white"></div>

                      //   <div
                      //     style={{
                      //       backgroundColor: "#F9F9F9",
                      //       padding: "1px 0",
                      //     }}
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
                      //   </div>
                      // </div>
                    )}
                  </div>
                ))}
                      {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <p className="text-lg font-semibold">{popupMessage}</p>
          <button
            onClick={handleClosePopup}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    )}
            </div>
          </div>
         
        </div>
      </div>
      {/* <LogoutBar /> */}
    </div>
  );
};

export default Quiz;
