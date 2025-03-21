//import Head from 'next/head';
//import img from 'next/image';
import { useEffect, useState, useRef  } from "react";
import styles from "./quizquestions.module.css";
import numberIcon from "../assets/Images/images/questions/numberIcon.png";
import iconA from "../assets/Images/images/questions/IconA.png";
import iconB from "../assets/Images/images/questions/IconB.png";
import iconC from "../assets/Images/images/questions/IconC.png";
import iconD from "../assets/Images/images/questions/IconD.png";
import clockIcon from "../assets/Images/images/questions/clock.png";
import LeftBar from "../leftbar/leftbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { toast, ToastContainer } from "react-toastify";
import print1 from "../../src/assets/Images/dashboard/print.png"
import trophy from "../../src/assets/Images/dashboard/trophy.png"
import Attemts from "../../src/assets/Images/dashboard/Attemts.png"
import Quickest from "../../src/assets/Images/dashboard/image (15).png"
import Badge from "../../src/assets/Images/dashboard/badge 1.png"


// import useBlocker from '../useBlocker/useBlocker.jsx';

//------------------**import images**------------------//
import physics from "../../src/assets/Images/dashboard/quiz12.png"
import startIcon from "../../src/assets/Images/images/quiz-Access/start.png";
import username from "../../src/assets/Images/quiz-type/username.png"
import calander from "../../src/assets/Images/quiz-type/calander.png"
import timer from "../../src/assets/Images/quiz-type/Timer.png"
import comment from "../../src/assets/Images/quiz-type/comment.png"
import editicon from "../../src/assets/Images/quiz-type/edit.png"
import Playbutton from "../../src/assets/Images/quiz-type/image.png"
import closeimage from "../../public/closeimage.png";
import stars from "../../src/assets/Images/quiz-type/star.png"


import "react-toastify/dist/ReactToastify.css";
import useBlocker from "../useBlocker/useBlocker.jsx";
// import usePrompt from '../usePrompt/usePrompt.jsx';
const QuizQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const userId = localStorage.getItem("user_id");
  const [attemptNo, setAttemptNo] = useState(null);
  const [skippedQuestionsDisplay, setSkippedQuestionsDisplay] = useState([]);
  const { quizId } = useParams();

  const timerRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);
  const lastVisitedQuestionRef = useRef(0);
  const selectedOptionsRef = useRef({});
  const [isNavigating, setIsNavigating] = useState(false);
  // const prevLocation = useRef(location.pathname);
  const [cameraStream, setCameraStream] = useState(null);

  const {
    quiz_title,
    quiz_description,
    quiz_duration,
    quiz_total_marks,
    num_questions,
    pass_percentage,
    quiz_complexity_name,
    quiz_category_name,
    quiz_sub_category_name,
    course_name,
    class_name,
    quiz_metrics,
    
  } = location.state || {};
  const {
    total_attempts,
    your_attempts,
    highest_score,
    photo1,
    quickest_completion_time,
  } = quiz_metrics || {};

  const [elapsedTime, setElapsedTime] = useState(quiz_duration * 60);
  // const isSubmitting = useRef(false);
  const submittedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false); // Track if the quiz is submitted
  const [shouldSubmitOnLeave, setShouldSubmitOnLeave] = useState(false);
  const [confirmNavigation, setConfirmNavigation] = useState(false);
  const [isBlocking, setIsBlocking] = useState(true);
  const isSubmitting = useRef(false); // To track if the quiz is being submitted

  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const initialRender = useRef(true);


  useEffect(() => {
    const handleRightClick = (event) => {
      event.preventDefault(); // Prevent right-click menu
    };

    const handleKeyDown = (event) => {
      if (event.key === "PrintScreen") {
        event.preventDefault(); // Block the print screen key
        alert("Screenshots are disabled on this page.");
      }
    };

    const disableCopy = (event) => {
      event.preventDefault(); // Prevent copy action
    };

    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", disableCopy);

    // Cleanup listeners on component unmount
    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", disableCopy);
    };
  }, []);



 
  
  
  const markPreviousQuestionsAsSkipped = (targetIndex) => {
    const newSkippedQuestions = [];
    for (let i = 0; i < targetIndex; i++) {
      if (
        selectedOptions[i] === undefined &&
        !skippedQuestionsDisplay.includes(i + 1)
      ) {
        newSkippedQuestions.push(i + 1);
      }
    }
    setSkippedQuestionsDisplay((prev) => [
      ...new Set([...prev, ...newSkippedQuestions]),
    ]);
  };

  const handleNextClick = () => {
    markPreviousQuestionsAsSkipped();
    if (currentQuestionIndex + 1 < filteredQuizData.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      lastVisitedQuestionRef.current = currentQuestionIndex + 1;
    }
  };

  const handlePrevClick = () => {
    markPreviousQuestionsAsSkipped();
    if (currentQuestionIndex - 1 >= 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      lastVisitedQuestionRef.current = currentQuestionIndex - 1;
    }
  };

  const startIndex = Math.floor(currentQuestionIndex / 50) * 10; // Calculate startIndex based on currentQuestionIndex

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage

  //     if (!authToken) {
  //       console.error("No authentication token found");
  //       return;
  //     }
  //     const quizId = localStorage.getItem("quiz_id");
  //     try {
  //       const response = await fetch(
  //         "https://dev.quizifai.com:8010/get-questions",
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //           body: JSON.stringify({
  //             quiz_id: quizId,
  //             user_id: userId,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       console.log("Fetched data:", data);

  //       if (data && data.data && Array.isArray(data.data)) {
  //         const questions = data.data.filter(
  //           (item) => item.question_id !== undefined
  //         );
  //         const attemptData = data.data.find(
  //           (item) => item.quiz_level_attempt_id !== undefined
  //         );

  //         console.log("Setting quiz data:", questions);
  //         setQuizData({ questions });
  //         setIsLoading(false);

  //         if (attemptData) {
  //           setAttemptNo(attemptData.quiz_level_attempt_id);
  //           setQuizData((prevState) => ({
  //             ...prevState,
  //             created_by: attemptData.created_by,
  //             created_on: attemptData.created_on,
  //           }));
  //           console.log("Attempt No:", attemptData.quiz_level_attempt_id);
  //         } else {
  //           console.warn("No object with quiz_level_attempt_id found");
  //         }
  //       } else {
  //         throw new Error("Unexpected response format");
  //       }
  //     } catch (error) {
  //       console.error("There was a problem with your fetch operation:", error);
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const authToken = localStorage.getItem("authToken");
  
  //     if (!authToken) {
  //       console.error("No authentication token found");
  //       return;
  //     }
  
  //     const quizId = localStorage.getItem("quiz_id");
  //     try {
  //       const response = await fetch(
  //         "https://dev.quizifai.com:8010/get-questions",
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //           body: JSON.stringify({
  //             quiz_id: quizId,
  //             user_id: userId,
  //           }),
  //         }
  //       );
  
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  
  //       const result = await response.json();
  //       console.log("Fetched data:", result);
  
  //       if (result.response === "success" && result.data) {
  //         const { questions, quiz_level_attempt_id, created_by, created_on } = result.data;
  
  //         if (Array.isArray(questions)) {
  //           setQuizData({ questions });
  //           console.log("Setting quiz questions:", questions);
  //         } else {
  //           console.warn("Questions data is not an array or missing.");
  //         }
  
  //         if (quiz_level_attempt_id) {
  //           setAttemptNo(quiz_level_attempt_id);
  //           setQuizData((prevState) => ({
  //             ...prevState,
  //             created_by,
  //             created_on,
  //           }));
  //           console.log("Attempt No:", quiz_level_attempt_id);
  //         } else {
  //           console.warn("quiz_level_attempt_id is missing.");
  //         }
  
  //         setIsLoading(false);
  //       } else {
  //         throw new Error("Unexpected response format or data missing");
  //       }
  //     } catch (error) {
  //       console.error("There was a problem with your fetch operation:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, [userId]);
  
  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
  
      if (!authToken) {
        console.error("No authentication token found");
        return;
      }
  
      const quizId = localStorage.getItem("quiz_id");
      try {
        const response = await fetch(
          "https://dev.quizifai.com:8010/get-questions",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              quiz_id: quizId,
              user_id: userId,
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json();
        console.log("Fetched data:", result);
  
        if (result.response === "success" && result.data) {
          const questions = result.data.filter(
            (item) => item.question_id && item.question_text
          );
  
          if (questions.length > 0) {
            setQuizData({ questions });
            console.log("Setting quiz questions:", questions);
          } else {
            console.warn("No valid questions found in the response.");
          }
  
          const metadata = result.data.find(
            (item) => item.quiz_level_attempt_id
          );
          if (metadata) {
            const { quiz_level_attempt_id, created_by, created_on } = metadata;
            setAttemptNo(quiz_level_attempt_id);
            setQuizData((prevState) => ({
              ...prevState,
              created_by,
              created_on,
            }));
            console.log("Attempt No:", quiz_level_attempt_id);
          } else {
            console.warn("quiz_level_attempt_id is missing.");
          }
  
          setIsLoading(false);
        } else {
          throw new Error("Unexpected response format or data missing");
        }
      } catch (error) {
         if (error instanceof SyntaxError) {
               toast.error("A parsing error occurred. Please check your input file.");
             } else if (error.message.includes("NetworkError")) {
               toast.error("A network error occurred. Please check your internet connection.");
             } else if (error.message.includes("Failed to fetch")) {
               toast.error("Server could not be reached. Please try again later.");
             } else {
               toast.error("An unexpected error occurred while processing your request. Please try again.");
             }
      }
    };
  
    fetchData();
  }, [userId]);
  
  // useEffect(() => {
  //   const startCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //       setCameraStream(stream);
  //       console.log("Camera started");
  //     } catch (error) {
  //       console.error("Camera access denied:", error);
  //       toast.error("Camera access is required to proceed.");
  //       navigate(-1); // Go back to the previous page
  //     }
  //   };

  //   const fetchData = async () => {
  //     const authToken = localStorage.getItem("authToken");
  //     if (!authToken) {
  //       console.error("No authentication token found");
  //       return;
  //     }

  //     const quizId = localStorage.getItem("quiz_id");
  //     try {
  //       const response = await fetch("https://dev.quizifai.com:8010/get-questions", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //         body: JSON.stringify({ quiz_id: quizId, user_id: userId }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();
  //       console.log("Fetched data:", result);

  //       if (result.response === "success" && result.data) {
  //         const questions = result.data.filter(
  //           (item) => item.question_id && item.question_text
  //         );

  //         if (questions.length > 0) {
  //           setQuizData({ questions });
  //           console.log("Setting quiz questions:", questions);
  //         } else {
  //           console.warn("No valid questions found in the response.");
  //         }

  //         const metadata = result.data.find((item) => item.quiz_level_attempt_id);
  //         if (metadata) {
  //           setAttemptNo(metadata.quiz_level_attempt_id);
  //           setQuizData((prevState) => ({
  //             ...prevState,
  //             created_by: metadata.created_by,
  //             created_on: metadata.created_on,
  //           }));
  //           console.log("Attempt No:", metadata.quiz_level_attempt_id);
  //         } else {
  //           console.warn("quiz_level_attempt_id is missing.");
  //         }

  //         setIsLoading(false);
  //       } else {
  //         throw new Error("Unexpected response format or data missing");
  //       }
  //     } catch (error) {
  //       if (error instanceof SyntaxError) {
  //         toast.error("A parsing error occurred. Please check your input file.");
  //       } else if (error.message.includes("NetworkError")) {
  //         toast.error("A network error occurred. Please check your internet connection.");
  //       } else if (error.message.includes("Failed to fetch")) {
  //         toast.error("Server could not be reached. Please try again later.");
  //       } else {
  //         toast.error("An unexpected error occurred while processing your request. Please try again.");
  //       }
  //     }
  //   };

  //   startCamera();
  //   fetchData();

  //   return () => {
  //     if (cameraStream) {
  //       cameraStream.getTracks().forEach((track) => track.stop());
  //       console.log("Camera stopped on unmount");
  //     }
  //   };
  // }, [userId]);


  useEffect(() => {
    if (quizData && quizData.questions && quizData.questions.length > 0) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerRef.current);
            handleSubmit1(true); // Auto-submit when timer runs out
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [quizData]);

  useEffect(() => {
    if (elapsedTime <= 120 && !showWarning) {
      // 5 minutes = 300 seconds
      setShowWarning(true);
    }
  }, [elapsedTime, showWarning]);

  useEffect(() => {
    if (showWarning) {
      toast.error("You have 2 minutes left!");
    }
  }, [showWarning]);

  useEffect(() => {
    selectedOptionsRef.current = selectedOptions;
    console.log("Updated selectedOptions:", selectedOptions);
  }, [selectedOptions]);

  const handleOptionSelect = (optionId) => {
    setSelectedOptions((prev) => {
      const updatedOptions = {
        ...prev,
        [currentQuestionIndex]: optionId,
      };
      // console.log('Updated selectedOptions in handleOptionSelect:', updatedOptions); // Log to check state
      updateSkippedQuestions(currentQuestionIndex, updatedOptions);
      return updatedOptions;
    });
  };

  const updateSkippedQuestions = (
    questionIndex,
    updatedOptions = selectedOptions
  ) => {
    const isAnswered = updatedOptions[questionIndex] !== undefined;
    const isAlreadySkipped = skippedQuestionsDisplay.includes(
      questionIndex + 1
    );

    if (!isAnswered && !isAlreadySkipped) {
      setSkippedQuestionsDisplay((prev) => [...prev, questionIndex + 1]);
    } else if (isAnswered && isAlreadySkipped) {
      setSkippedQuestionsDisplay((prev) =>
        prev.filter((qNum) => qNum !== questionIndex + 1)
      );
    }
  };

  const handleNextQuestion = () => {
    updateSkippedQuestions(currentQuestionIndex);
    if (currentQuestionIndex < quizData.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      lastVisitedQuestionRef.current = nextIndex;


    }
  };

  const handlePreviousQuestion = () => {
    updateSkippedQuestions(currentQuestionIndex);
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      lastVisitedQuestionRef.current = prevIndex;
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const handleSubmit = () => {
    const unanswered = quizData.questions
      .map((question, index) =>
        selectedOptions[index] === undefined ? index + 1 : null
      )
      .filter((questionNumber) => questionNumber !== null);

    const answered = quizData.questions
      .map((question, index) =>
        selectedOptions[index] !== undefined ? index + 1 : null
      )
      .filter((questionNumber) => questionNumber !== null);

    setUnansweredQuestions(unanswered);
    setAnsweredQuestions(answered);

    setShowPopup(true); // Show the popup
  };

  const submitQuiz = () => {
    const answers = Object.keys(selectedOptions).map((questionIndex) => ({
      question_id: quizData.questions[questionIndex].question_id,
      options: {
        option_1:
          selectedOptions[questionIndex] ===
          quizData.questions[questionIndex].quiz_ans_option_1_id,
        option_2:
          selectedOptions[questionIndex] ===
          quizData.questions[questionIndex].quiz_ans_option_2_id,
        option_3:
          selectedOptions[questionIndex] ===
          quizData.questions[questionIndex].quiz_ans_option_3_id,
        option_4:
          selectedOptions[questionIndex] ===
          quizData.questions[questionIndex].quiz_ans_option_4_id,
      },
    }));
    const authToken = localStorage.getItem("authToken");
    const quizId = localStorage.getItem("quiz_id");

    fetch("https://dev.quizifai.com:8010/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizId,
        attempt_no: attemptNo,
        answers: answers,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // if (cameraStream) {
        //   cameraStream.getTracks().forEach((track) => track.stop());
        //   console.log("Camera turned off after submission");
        // }
        navigate(`/quizresults`, { state: { quizId, attemptNo } });
      })
      .catch((error) => {
          if (error instanceof SyntaxError) {
                toast.error("A parsing error occurred. Please check your input file.");
              } else if (error.message.includes("NetworkError")) {
                toast.error("A network error occurred. Please check your internet connection.");
              } else if (error.message.includes("Failed to fetch")) {
                toast.error("Server could not be reached. Please try again later.");
              } else {
                toast.error("An unexpected error occurred while processing your request. Please try again.");
              }
      });
  };

  // const handleSubmit = () => {
  //   clearInterval(timerRef.current);
  //   if (!quizData || !quizData.questions || quizData.questions.length === 0) {
  //     console.error("No quiz data available to submit");
  //     return;
  //   }

  //   const unansweredQuestions = quizData.questions
  //     .map((question, index) =>
  //       selectedOptions[index] === undefined ? index + 1 : null
  //     )
  //     .filter((questionNumber) => questionNumber !== null);

  //   // if (unansweredQuestions.length > 0) {
  //   //   toast.error(`Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(', ')}`);
  //   //   setSkippedQuestionsDisplay(unansweredQuestions);
  //   //   return;
  //   // }

  //   setValidationMessage("");
  //   const answers = Object.keys(selectedOptions).map((questionIndex) => ({
  //     question_id: quizData.questions[questionIndex].question_id,
  //     options: {
  //       option_1:
  //         selectedOptions[questionIndex] ===
  //         quizData.questions[questionIndex].quiz_ans_option_1_id,
  //       option_2:
  //         selectedOptions[questionIndex] ===
  //         quizData.questions[questionIndex].quiz_ans_option_2_id,
  //       option_3:
  //         selectedOptions[questionIndex] ===
  //         quizData.questions[questionIndex].quiz_ans_option_3_id,
  //       option_4:
  //         selectedOptions[questionIndex] ===
  //         quizData.questions[questionIndex].quiz_ans_option_4_id,
  //     },
  //   }));
  //   const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage

  //   if (!authToken) {
  //     console.error("No authentication token found");
  //     return;
  //   }
  //   const quizId = localStorage.getItem("quiz_id");

  //   fetch("https://dev.quizifai.com:8010/submit", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //     body: JSON.stringify({
  //       user_id: userId,
  //       quiz_id: quizId,
  //       attempt_no: attemptNo,
  //       answers: answers,
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       navigate(`/quizresults`, { state: { quizId, attemptNo } });
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with your fetch operation:", error);
  //     });
  // };

  const handleSubmit1 = (isAutoSubmit = false) => {
    clearInterval(timerRef.current);

    // Capture the most recent selectedOptions state
    const currentSelectedOptions = selectedOptionsRef.current;

    console.log(
      "Submitting selectedOptions in handleSubmit:",
      currentSelectedOptions
    ); // Log to check state before submitting

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
      console.error("No quiz data available to submit");
      return;
    }

    const unansweredQuestions = quizData.questions
      .map((question, index) =>
        currentSelectedOptions[index] === undefined ? index + 1 : null
      )
      .filter((questionNumber) => questionNumber !== null);

    if (unansweredQuestions.length > 0 && !isAutoSubmit) {
      toast.error(
        `Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(
          ", "
        )}`
      );
      setSkippedQuestionsDisplay(unansweredQuestions);
      return;
    }

    setValidationMessage("");
    const answers = Object.keys(currentSelectedOptions).map(
      (questionIndex) => ({
        question_id: quizData.questions[questionIndex].question_id,
        options: {
          option_1:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_1_id,
          option_2:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_2_id,
          option_3:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_3_id,
          option_4:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_4_id,
        },
      })
    );

    console.log("Submitting answers:", answers); // Log to check the answers array

    const quizId = localStorage.getItem("quiz_id");
    const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage

    if (!authToken) {
      console.error("No authentication token found");
      return;
    }

    fetch("https://dev.quizifai.com:8010/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizId,
        attempt_no: attemptNo,
        answers: answers,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // if (cameraStream) {
        //   cameraStream.getTracks().forEach((track) => track.stop());
        //   console.log("Camera turned off after submission");
        // }
        navigate(`/quizresults`, { state: { quizId, attemptNo } });
        console.log("Quiz submitted");
      })
      .catch((error) => {
          if (error instanceof SyntaxError) {
                toast.error("A parsing error occurred. Please check your input file.");
              } else if (error.message.includes("NetworkError")) {
                toast.error("A network error occurred. Please check your internet connection.");
              } else if (error.message.includes("Failed to fetch")) {
                toast.error("Server could not be reached. Please try again later.");
              } else {
                toast.error("An unexpected error occurred while processing your request. Please try again.");
              }
      });
  };
  const handleSubmit2 = (isAutoSubmit = false) => {
    clearInterval(timerRef.current);

    const currentSelectedOptions = { ...selectedOptions };

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
      console.error("No quiz data available to submit");
      return;
    }

    const unansweredQuestions = quizData.questions
      .map((question, index) =>
        currentSelectedOptions[index] === undefined ? index + 1 : null
      )
      .filter((questionNumber) => questionNumber !== null);

    if (unansweredQuestions.length > 0 && !isAutoSubmit) {
      toast.error(
        `Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(
          ", "
        )}`
      );
      return;
    }

    const answers = Object.keys(currentSelectedOptions).map(
      (questionIndex) => ({
        question_id: quizData.questions[questionIndex].question_id,
        options: {
          option_1:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_1_id,
          option_2:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_2_id,
          option_3:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_3_id,
          option_4:
            currentSelectedOptions[questionIndex] ===
            quizData.questions[questionIndex].quiz_ans_option_4_id,
        },
      })
    );

    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("user_id");

    if (!authToken) {
      console.error("No authentication token found");
      return;
    }

    fetch("https://dev.quizifai.com:8010/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizId,
        answers: answers,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // if (cameraStream) {
        //   cameraStream.getTracks().forEach((track) => track.stop());
        //   console.log("Camera turned off after submission");
        // }
        navigate("/quizresults", { state: { quizId } });
        submittedRef.current = true;
      })
      .catch((error) => {
         if (error instanceof SyntaxError) {
               toast.error("A parsing error occurred. Please check your input file.");
             } else if (error.message.includes("NetworkError")) {
               toast.error("A network error occurred. Please check your internet connection.");
             } else if (error.message.includes("Failed to fetch")) {
               toast.error("Server could not be reached. Please try again later.");
             } else {
               toast.error("An unexpected error occurred while processing your request. Please try again.");
             }
      });
  };
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (!submittedRef.current) {
  //       handleSubmit2(true); // Auto-submit when page is refreshed
  //       event.preventDefault(); // Show browser's confirmation dialog
  //       event.returnValue = ''; // Required for showing confirmation dialog in some browsers
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  // useEffect(() => {
  //   const handleNavigation = (location, action) => {
  //     if (action === 'POP' || action === 'PUSH') {
  //       handleSubmit2(true); // Auto-submit on navigation
  //     }
  //   };

  //   const unblock = navigate.block(handleNavigation);

  //   return () => {
  //     unblock();
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (!submittedRef.current) {
  //       event.preventDefault();
  //       event.returnValue = '';
  //       handleSubmit2(true); // Auto-submit on page unload
  //     }
  //   };

  //   const handleNavigation = () => {
  //     if (!submittedRef.current) {
  //       handleSubmit2(true); // Auto-submit on route change
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   navigate(handleNavigation);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     navigate(handleNavigation);
  //   };
  // }, [navigate]);
  // useEffect(() => {
  //   if (quizData && quizData.questions && quizData.questions.length > 0) {
  //     console.log('QuizData available for submission:', quizData); // Log the data
  //   }
  // }, [quizData]);

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     if (!submittedRef.current) {
  //     // Required for Chrome
  //       handleSubmit2(true); // Auto-submit when page is refreshed
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const handleQuestionClick = (index) => {
    markPreviousQuestionsAsSkipped(index);
    setCurrentQuestionIndex(index);
    lastVisitedQuestionRef.current = index;
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  if (!quizData || !quizData.questions) {
    return <div>Loading ...</div>;
  }
  if (isLoading) {
    return <div>Loading bbbb...</div>;
  }
  const filteredQuizData = quizData.questions.filter(
    (item) => item.question_id
  );
  const currentQuestion = filteredQuizData[currentQuestionIndex];
  const optionLabels = ["A", "B", "C", "D"];
  const optionKeys = [
    "quiz_ans_option_1_text",
    "quiz_ans_option_2_text",
    "quiz_ans_option_3_text",
    "quiz_ans_option_4_text",
  ];

  const visibleSkippedQuestions = skippedQuestionsDisplay.filter(
    (questionNumber) => {
      const actualIndex = questionNumber - 1;
      return actualIndex >= startIndex && actualIndex < startIndex + 10;
    }
  );
  const sortedOptionKeys = [...optionKeys].sort((a, b) => {
    const optionA = currentQuestion[a];
    const optionB = currentQuestion[b];

    // Define your special options
    const specialOptions = [
      "All of the above",
      "All of the above.",
      "None of the above",
      "All the above",
      "None the above",
      "All of the Above",
      "None of the Above",
      "All The above",
      "None The above",
      "All Of The Above",
      "None Of The Above",
      "All The Above",
      "None The bove",
    ];

    // Check if optionA or optionB is a special option
    if (specialOptions.includes(optionA) && specialOptions.includes(optionB)) {
      // Both are special options, sort alphabetically
      return optionA.localeCompare(optionB);
    } else if (specialOptions.includes(optionA)) {
      // optionA is a special option, it should come last
      return 1;
    } else if (specialOptions.includes(optionB)) {
      // optionB is a special option, it should come last
      return -1;
    } else {
      // Otherwise, maintain the current order
      return 0;
    }
  });
  const endIndex = Math.min(startIndex + 50, filteredQuizData.length);

  const Back = () => {
    navigate("/quizaccess");
  };

  console.log('currentQuestionIndex', currentQuestionIndex);
  console.log('quizData)', quizData);

  return (
    <div className={`${styles.container} no-select`}>

      {/*<Head>
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
        rel="stylesheet"
        />
      </Head>*/}
      <Navigation />
      <ToastContainer />
      <div className={styles.mainContent}>
      <div className="flex justify-end py-2">
      {/* <div className=" absolute top-[85px] right-8 w-[100px] h-[100px]">
      {isLoading ? <p>Loading...</p> : <p></p>}
      <video autoPlay playsInline ref={(videoRef) => {
        if (videoRef && cameraStream) {
          videoRef.srcObject = cameraStream;
        }
      }} />
    </div> */}
            {/* <div className="flex items-center px-[10px] p-[5px] border-[1px] border-[#FF6865] bg-[#FFCCCB] text-[#FF0500] font-semibold rounded-[10px] "
            >
                <p>Close</p>
                <img src={closeimage} alt="" className="w-[20px] h-[20px]" />
            </div> */}
    </div>
<div className="flex w-full border-[#8cd18e] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-2 bg-white">
      {/* Quiz Image */}
      <div className="relative mr-2">
        <img
          src={photo1 || physics}
          alt="Quiz Cover"
          className="w-[120px] h-[165px] rounded-md mr-4 cursor-pointer"
        />
      </div>

      {/* Quiz Details */}
      <div className="flex flex-col w-full">
        {/* Title */}
        <div className="flex justify-between items-center">
            <div>

          <h2 className="text-lg font-semibold text-[#00008b]"> {quiz_title}</h2>
            </div>
            <div className="flex gap-3">
                <div className="flex gap-2">
                <img src={trophy}
                 alt="" 
                className="w-[18px] h-[18px] "   
                   />
                <img src={print1}
                 alt="" 
                className="w-[18px] h-[18px] "  />
                </div>
                <div className="flex">
                    <img src={stars}
                 alt="" 
                className="w-[18px] h-[18px] "  
                 /> <img src={stars}
                 alt="" 
                className="w-[18px] h-[18px]"  
                 />
                  <img src={stars}
                 alt="" 
                className="w-[18px] h-[18px] "  
                 />
                  <img src={stars}
                 alt="" 
                className="w-[18px] h-[18px]"  
                 />
                  <img src={stars}
                 alt="" 
                className="w-[18px] h-[18px]"  
                 />
                  
                </div>
            </div>
        </div>

        {/* Description */}
        <p className="text-[#00008b] w-full line-clamp-2 text-sm mt-1">
        {quiz_description}
        </p>

        {/* Meta Information */}
        <div className="text-[#00008b] text-sm flex flex-wrap mt-3">
          <span>{quiz_category_name}</span>
          <span className="mx-1">.</span>
          <span>{quiz_sub_category_name}</span>
          <span className="mx-1">.</span>
          {/* <span>{course_name}</span>
          <span className="mx-1">.</span>
          <span>{class_name}</span>
          <span className="mx-1">.</span> */}
          <span>{quiz_complexity_name}</span>
        </div>

        {/* Icons and Additional Info */}
        <div className="flex-col items-center space-y-4 mt-3 text-[#00008b]">
          {/* Author and Date */}
          <div className="flex items-center space-x-10">
            <div className="flex items-center">
              <img
               src={username}
                alt="User"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">Created By : {`${quizData.created_by}`}</span>
            </div>
            <div className="flex items-center">
              <img
                src={calander} 
                alt="Calendar"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">Created On : {`${quizData.created_on}`}</span>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src={comment}
                alt="Questions"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{num_questions} Questions</span>
            </div>
            <div className="flex items-center">
              <img
                src={timer}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quiz_duration} Minutes</span>
            </div>
            <div className="flex items-center">
              <img
                src={Attemts}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{total_attempts} Total Attempts</span>
            </div>
            <div className="flex items-center">
              <img
                src={Badge}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{highest_score} High Score</span>
            </div>
            <div className="flex items-center">
              <img
                src={Quickest}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quickest_completion_time} Mins Quickest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
        {/* <div>
          <h1 className={styles.quiztitle} style={{ color: "#214082" }}>
            {quiz_title}
          </h1>
          <p className={styles.quizdescription}>{quiz_description}</p>

          <div className={styles.flexrow}>
            <div className={styles.Createdbyandupdated}>
              <div className={styles.Questions}>
                <span className={styles.Question}>
                  Questions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </span>{" "}
                <span></span>
                <span className={styles.username1}> {num_questions}</span>
              </div>
              <div>
                <span className={styles.Question}>
                  Total Marks&nbsp;&nbsp;:
                </span>{" "}
                <span className={styles.username1}>{quiz_total_marks}</span>
              </div>
              <div className={styles.Createdby}>
                <span className={styles.Question}>
                  Created By &nbsp;&nbsp;&nbsp;:
                </span>{" "}
                <span
                  className={styles.username}
                >{`${quizData.created_by}`}</span>
              </div>

              <div>
                <span className={styles.Question}>
                  Created On&nbsp;&nbsp;&nbsp;:
                </span>{" "}
                <span
                  className={styles.username}
                >{`${quizData.created_on}`}</span>
              </div>
            </div>
            <div className={styles.Questionslines}>
              <div>
                <span className={styles.Question}>Duration :</span>{" "}
                <span className={styles.username1}>{quiz_duration} min</span>
              </div>

              <div>
                <span className={styles.Question}>Pass Percentage :</span>{" "}
                <span className={styles.username1}>{pass_percentage}</span>
              </div>
            </div>
            <div className={styles.Questionslines}>
              <div>
                <span className={styles.Question}>Complexity :</span>{" "}
                <span className={styles.username1}>
                  {quiz_complexity_name}{" "}
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div>
          <h1 className={styles.sentence1}>
            Question{" "}
            <span>
              {" "}
              {`${currentQuestionIndex + 1} of ${filteredQuizData.length}`}
            </span>
          </h1>
          <h1 className={styles.Question}>
            Choose the correct answer then click the{" "}
            <span className={styles.sentence1}>"Next"</span> button
          </h1>
        </div>
        <div className="flex">

        <div className={styles.currentQuestion}>
          {currentQuestion && (
            <>
              {/* <div className={styles.imageContainer}> */}
              <div className={styles.textContainer}>
                <p>{`${currentQuestionIndex + 1}. ${
                  currentQuestion.question_text
                }`}</p>
              </div>
              {/* </div> */}
              <div className={styles.boxesContainer}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {sortedOptionKeys.map((key, index) => {
                    const optionId =
                      currentQuestion[key.replace("_text", "_id")];
                    const optionLabel = optionLabels[index];
                    const isSelected =
                      selectedOptions[currentQuestionIndex] === optionId;

                    return (
                      <li key={optionId} style={{ marginBottom: "10px" }}>
                        <button
                          className={styles.box}
                          onClick={() => handleOptionSelect(optionId)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "transparent",
                            width: "100%",
                            border: "none",
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              marginRight: "10px",
                              padding: "7px",
                              textAlign: "center",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              border: isSelected
                                ? "1px solid #22c55e"
                                : "1px solid #ccc",
                              backgroundColor: isSelected
                              ? "#c9e4ca"
                              : "#E8E9E8",
                            }}
                          >
                            {optionLabel}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: isSelected ? "bold" : "normal",
                              backgroundColor: isSelected
                                ? "#c9e4ca"
                                : "#E8E9E8",
                              width: "550px", // Ensure the button takes full width
                              padding: "10px", // Adds padding for better click area
                              border: isSelected
                                ? "1px solid #22c55e"
                                : "1px solid #ccc", // Highlights selected option
                              borderRadius: "5px", // Rounds corners of buttons
                              textAlign: "left", // Align text to the left for better readability
                              fontSize: "14px",
                            }}
                          >
                            {currentQuestion[key]}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}

        
        </div>
     
        <div className='flex flex-col justify-end px-2 items-center'>
  <div className=' w-[10px] rounded-full bg-[#00008b] h-[10px]'></div>
  <div className='h-[100%] w-[1px] bg-[#00008b]'></div>
  <div className=' w-[10px] rounded-full bg-[#00008b] h-[10px]'></div>

</div>
      <div className={styles.Totaltimer}>
        {/* <div className={styles.back1} onClick={Back}>
          <MdOutlineCancel />
        </div> */}
        <div className={styles.sentence1} style={{ marginTop: "35x" }}>
          {/* {`${currentQuestionIndex + 1} out of ${filteredQuizData.length}`} */}
        </div>
        <div className={styles.sentence2}>
          <span> Total timer :</span>{" "}
          <span className={styles.sentence3}>{formatTime(elapsedTime)}</span>
        </div>
        <div className={styles.questionNumbersContainer}>
          {/* Previous Button */}
          {startIndex >= 50 && <button onClick={handlePrevClick}>&lt;</button>}

          {/* Question Numbers */}

          {filteredQuizData.slice(startIndex, endIndex).map((_, index) => {
            const actualIndex = startIndex + index;
            const isSelected = selectedOptions[actualIndex] !== undefined;
            const isSkipped = skippedQuestionsDisplay.includes(actualIndex + 1);
            return (
              <div
                key={actualIndex}
                className={`${styles.questionNumber} ${
                  isSelected ? styles.selected : ""
                } ${isSkipped ? styles.skipped1 : ""}`}
                onClick={() => handleQuestionClick(actualIndex)}
              >
                {actualIndex + 1}
              </div>
            );
          })}

          {/* Next Button */}
          {startIndex + 50 < filteredQuizData.length && (
            <button onClick={handleNextClick}>&gt;</button>
          )}
        </div>
        {/* {showWarning && <div className={styles.warningMessage}>Warning: You have 5 minutes left!</div>} */}

        {skippedQuestionsDisplay.length > 0 && (
          <div className={styles.skippedQuestionsContainer}>
            <div className={styles.backgroundbox}>
              <div className={styles.innerbox}>
                {skippedQuestionsDisplay.map((questionNumber) => (
                  <div
                    key={questionNumber}
                    className={`${styles.questionNumber1} ${styles.skipped}`}
                    onClick={() => handleQuestionClick(questionNumber - 1)}
                  >
                    {questionNumber}
                  </div>
                ))}
              </div>
              <h3 className={styles.skipped}>
                You skipped these questions; please ensure you review them
                carefully before finalizing the quiz
              </h3>
            </div>
          </div>
        )}
          
      </div>
      <div className={styles.sentence3} style={{ marginTop: "230px" }}>
        {/* {formatTime(elapsedTime)} */}
      </div>
      </div>
      <div className={styles.buttonsContainer} style={{ display: "flex", justifyContent: "center", width: "100%", gap:"50px"}}>
        <div className="flex gap-2 w-full justify-end ">
        {currentQuestionIndex > 0 ? (
    <div className=" mr-[10px]">
      {/* <button
        className={styles.button}
        style={{
          color: "#FFFFFF",
          backgroundColor: "#FEBB42",
          height: "29px",
          width: "97px",
          textAlign: "center",
          borderRadius: "10px",
          border: "none",
        }}
        onClick={handlePreviousQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button> */}
      <div 
      onClick={handlePreviousQuestion}
      disabled={currentQuestionIndex === 0}
       className="flex  cursor-pointer items-center px-[10px] p-[5px] border-[2px] border-solid border-[#2196F3] bg-[#ADD8E6] text-[#00008b] font-semibold rounded-[10px]"
      >
          <img src={Playbutton} alt="" className="w-[20px] h-[20px] rotate-180" />
          <p>Previous</p>
      </div>
    </div>
  ) : (
    <div style={{ width: "97px" }}></div> // Placeholder div to keep space
  )}

  <div>
    {quizData?.questions?.length - 1 !== currentQuestionIndex && 
    // <button
    //   className="text-[13px] cursor-pointer rounded-md font-medium"
    //   style={{
    //     backgroundColor: "#8453FC",
    //     height: "29px",
    //     borderRadius: "10px",
    //     width: "97px",
    //     border: "none",
    //     color: "#FFFFFF",
    //     marginLeft: "410px",
    //   }}
    //   onClick={handleNextQuestion}
    //   disabled={currentQuestionIndex === filteredQuizData.length - 1}
    // >
    //   Next 
    // </button>
      <div 
      onClick={handleNextQuestion}
      disabled={currentQuestionIndex === filteredQuizData.length - 1}
       className="flex cursor-pointer items-center px-[10px] p-[5px] border-[2px] border-solid border-[#2196F3] bg-[#ADD8E6] text-[#00008b] font-semibold rounded-[10px]"
      >
          <p>Next</p>
          <img src={Playbutton} alt="" className="w-[20px] h-[20px]" />
      </div>
    }
  </div>
        </div>
       
 <div className="w-[90%] flex justify-start ">
  
 
  <div className={styles.button3}>
            {/* <button
              className={styles.button}
              style={{
                marginTop: "-39px",
                backgroundColor: "#15c51596",
                height: "29px",
                width: "97px",
                borderRadius: "10px",
                border: "none",
                color: "#FFFFFF",
                marginRight: "-165px",
                zIndex: "1",
              }}
              onClick={handleSubmit}
            >
              Submit 
            </button> */}
            <div 
                   onClick={handleSubmit}
       className="flex cursor-pointer items-center px-[10px] p-[5px] border-[2px] border-solid border-[#18c91e] bg-[#8cd18e] text-[#000085] font-semibold rounded-[10px]"
      >
          <p>Submit</p>
          {/* <img src={Playbutton} alt="" className="w-[20px] h-[20px]" /> */}
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Quiz Summary</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {quizData.questions.map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center w-5 h-5 rounded border  text-xs font-medium ${
                    answeredQuestions.includes(index + 1)
                      ? "bg-[#8cd18e] text-blue-900 border-[#18c91e]"
                      : "bg-red-300 text-red-900 border-[#c91862]"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="flex gap-1 justify-end">
              <button
                       className="flex  cursor-pointer items-center px-[10px] p-[5px] border-[2px] border-solid border-[#2196F3] bg-[#ADD8E6] text-[#00008b] font-semibold rounded-[10px]"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                       className="flex cursor-pointer items-center px-[10px] p-[5px] border-[2px] border-solid border-[#18c91e] bg-[#8cd18e] text-[#000085] font-semibold rounded-[10px]"

                onClick={() => {
                  setShowPopup(false);
                  submitQuiz();
                }}
              >
                Submit
              </button>
            </div>
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

export default QuizQuestions;
