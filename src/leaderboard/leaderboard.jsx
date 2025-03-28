// import Head from 'next/head';
// import Image from "next/image";
import React, { useEffect, useRef, useState } from 'react';
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png";
import current from "../../src/assets/Images/images/quizresults/faq.png";
// import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import styles from './quiz_results.module.css';

import { MdOutlineCancel } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png";
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png";
import wrongIcon1 from "../../src/assets/Images/images/quizresults/wrongicon.png";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import Navigation from "../navbar/navbar.jsx";
// import rankimage from "../../src/assets/Images/images/quizresults/rankimage.png"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg";

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
import print1 from "../../src/assets/Images/dashboard/print.png"
import trophy from "../../src/assets/Images/dashboard/trophy.png"
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
// import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png";
// import current from "../../src/assets/Images/images/quizresults/faq.png";
// import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import correction from "../../public/correcticon.png";
import Attemts from "../../src/assets/Images/dashboard/Attemts.png"
import Quickest from "../../src/assets/Images/dashboard/image (15).png"
import Badge from "../../src/assets/Images/dashboard/badge 1.png"
import close from "../../src/assets/Images/images/dashboard/cancel.png"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const leaderboard = () => {
  const [quizData, setQuizData] = useState(null);
  const [quizData1, setQuizData1] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);
  const location = useLocation();
  const { quizId, attemptNo } = location.state || {};
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false); // State to track quiz submission
  const [showAnswers, setShowAnswers] = useState(false);

  const resultRef = useRef();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;
  
  // Ensure 'questions' is properly initialized
  
  // Calculate total pages based on the number of questions
  
  // Calculate indexes for slicing
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;

  const optionLabels = {
    option1: 'A',
    option2: 'B',
    option3: 'C',
    option4: 'D'
  };
  const {passpercentage,complexity,quizduration,attemptId} = location.state || {};
  const handleToggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

 useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const quizId = localStorage.getItem("quiz_id");
    // const attemptNo = localStorage.getItem("quiz_level_attempt_id");
    // const {passPercentage} = location.state || {};
    const fetchQuizReport = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found. Please log in again.');
          return;
        }
        const response = await fetch('https://dev.quizifai.com:8010/quiz_report', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            quiz_id: quizId,
            user_id: userId,
            attempt_no: attemptId
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuizData1(data.data);
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
      } finally {
        setLoading(false);
      }
    };

    fetchQuizReport();
  }, []);


  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found. Please log in again.');
          return;
        }
        const response = await fetch('https://dev.quizifai.com:8010/leaderboard_result_for_user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            quiz_id: quizId
          })
        });

        const result = await response.json();

        if (result.response === 'success') {
          setLeaderboardData(result.data);
        } else {
          console.error('Failed to fetch leaderboard data:', result.message);
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

    fetchLeaderboardData();
  }, [quizId]);
      const userId = localStorage.getItem("user_id");

  useEffect(() => {
 
      const sendQuizResult = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found. Please log in again.');
          return;
        }
        const response = await fetch('https://dev.quizifai.com:8010/quiz_result_view', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            quiz_id: quizId,
            attempt_id: attemptId
          })
        });
        const result = await response.json();
        if (result.response === "success") {
          setQuizData(result.data[0]);
        } else {
          setIsQuizSubmitted(false);
          console.error("Failed to fetch quiz data:", result.response_message);
        }
      }catch (error) {
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

    if (quizId && attemptId) {
      sendQuizResult(); // Trigger the POST request only if quizId and attemptNo are available
    }
  }, [quizId, attemptId]);



  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");

    const fetchLeaderboardData = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

    if (!authToken) {
      console.error('No authentication token found. Please log in again.');
      return;
    }
        const response = await fetch('https://dev.quizifai.com:8010/leaderboard_result_for_user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            quiz_id: quizId
          })
        });

        const result = await response.json();

        if (result.response === 'success') {
          setLeaderboardData(result.data);
        } else {
          console.error('Failed to fetch leaderboard data:', result.message);
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

    if (isQuizSubmitted) { // Trigger fetch only if quiz result submission was successful
      fetchLeaderboardData();
    }
  }, [isQuizSubmitted]);

  if (!quizData) {
    return <div>Loading...</div>;
  }
 
  if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

if (!quizData1 || !quizData1.questions) {
  return <div>No quiz data available</div>;
}
 
  const Back = () => {
    
   /* fetch or store quizId */;
  navigate(`/dashboard`);
};
const handleBack = () => {
  navigate(-1)
};
  const questions = quizData1.questions;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const displayedQuestions = questions.slice(startIndex, endIndex);
  
  // Handle Next and Back button clicks
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleBack1 = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const topThree = leaderboardData.slice(0, 3);
  const handleDownload = () => {
    const input = resultRef.current;
    if (input) {
      html2canvas(input, { useCORS: true, scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${quizData.quiz_name}_results.pdf`);
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('resultRef is not attached to any DOM element');
    }
  };



  return (

    <div className="flex w-full" >

    <Navigation />
<ToastContainer/>
    <div className="w-full p-5 pt-[60px]" ref={resultRef}>
      {/* <div className={styles.back1} onClick={Back}><MdOutlineCancel /></div> */}
      <div onClick={handleBack} className=" absolute top-5 right-5 cursor-pointer">
        <img src={close} alt="" className="w-[25px] h-[25px]" />
      </div>
      <div className="flex w-full border-[#8cd18e] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-2 bg-white">
    {/* Quiz Image */}
    <div className="relative mr-2">
      <img
               src={quizData.quiz_statistics?.photo1 || physics}

        alt="Quiz Cover"
        className="w-[120px] h-[165px] rounded-md mr-4 cursor-pointer"
      />
    </div>

    {/* Quiz Details */}
    <div className="flex flex-col w-full">
      {/* Title */}
      <div className="flex justify-between items-center">
          <div>

        <h2 className="text-lg font-semibold text-[#00008b]">{quizData.quiz_name}</h2>
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
      {quizData.quiz_description}
      </p>

      {/* Meta Information */}
      <div className="text-[#00008b] text-sm flex flex-wrap mt-3">
        <span>{quizData.quiz_statistics?.category}</span>
        <span className="mx-1">.</span>
        <span>{quizData.quiz_statistics?.sub_category}</span>
        <span className="mx-1">.</span>
        {/* <span>{quizData.quiz_statistics?.course_name}</span>
        <span className="mx-1">.</span>
        <span>{quizData.quiz_statistics?.class_name}</span> */}
        {/* <span className="mx-1">.</span> */}
        <span>{`${quizData.complexity}`}</span>
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
            <span className="ml-1 text-sm">{`${quizData.total_questions}`} Questions</span>
          </div>
          <div className="flex items-center">
            <img
              src={timer}
              alt="Timer"
              className="w-[18px] h-[18px] mr-1"
            />
            <span className="ml-1 text-sm">{`${quizData.quiz_duration}`} Minutes</span>
          </div>
          <div className="flex items-center">
                   <img
                     src={Attemts}
                     alt="Timer"
                     className="w-[18px] h-[18px] mr-1"
                   />
                   <span className="ml-1 text-sm">{quizData.quiz_statistics?.total_attempts} Total Attempts</span>
                 </div>
                 <div className="flex items-center">
                   <img
                     src={Badge}
                     alt="Timer"
                     className="w-[18px] h-[18px] mr-1"
                   />
                   <span className="ml-1 text-sm">{quizData.quiz_statistics?.highest_score} High Score</span>
                 </div>
                 <div className="flex items-center">
                   <img
                     src={Quickest}
                     alt="Timer"
                     className="w-[18px] h-[18px] mr-1"
                   />
                   <span className="ml-1 text-sm">{quizData.quiz_statistics?.quickest_completion_time} Mins Quickest</span>
                 </div>
        </div>
      </div>
    </div>
  </div>
     
      <div className='flex w-full' >
         
      {!showAnswers ? (
         <div class="w-[50%] text-center p-4">
        <div class="">
       
        <div class="flex items-center justify-center">
  <span class="flex-1 h-[1px] bg-blue-900 mr-[5px]"></span>
  <label class="text-[#d98b19] font-lato text-[18px] font-semibold">Your Attempt Details</label>
  <span class="flex-1 h-[1px] bg-blue-900 ml-[5px]"></span>
</div>
     </div>
       
         <div class="relative flex justify-center flex-col items-center">
           <label class="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[50px] text-blue-900 font-bold font-lato">{quizData.rank}</label>
           <img class="h-[108.62px] w-[130.01px] flex justify-center" src={rankimage} alt="Icon 1" />
           <span class="text-blue-900  font-bold font-lato text-[17px]">Your Rank</span>
         </div>
       
         <div class="w-full flex items-center">
         <div class="w-full flex justify-center items-center flex-col gap-4 ml-[13px] sm:w-[50%]">
         <div class="w-[210px] h-[5vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={dateIcon} alt="Calendar Icon" />
           <span class="ml-2 font-lato font-bold text-[15px] text-blue-900">{quizData.quiz_start_date}</span>
         </div>
         <div class="w-[210px] h-[5vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={timeIcon} alt="Clock Icon" />
           <span class="ml-2 font-lato  font-bold text-[15px] text-blue-900">{quizData.attempt_duration}</span>
         </div>
         <div class="w-[210px] h-[5vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={vector} alt="Check Icon" />
           <span class="ml-2 font-lato  font-bold text-[15px] text-blue-900">{quizData.correct_answers} Correct answers</span>
         </div>
         <div class="w-[210px] h-[5vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={current} alt="Question Icon" />
           <span class="ml-2 font-lato  font-bold text-[15px] text-blue-900">Attempted {quizData.attempted_questions} questions</span>
         </div>
       </div>
       <div className='w-full flex justify-center items-center sm:w-[50%]'>
       <div class="flex  w-[70%] flex-col p-2 px-6 rounded-2xl bg-green-300 items-center">
       
             <div class=" text-green-700 font-medium text-center">{quizData.attained_score_percentage}%</div>
             <div class=" text-[#fa5967]  text-center">{quizData.quiz_grade}, {quizData.pass_flag ? 'Pass' : 'Fail'}</div>
           </div>
       </div>
       
           
         </div>
         <div className="flex flex-wrap justify-end gap-2">
         <div className="flex items-center gap-1 justify-center ">
           <button
             onClick={handleToggleAnswers}
             className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
           >
             Answers
             <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" />
           </button>
         </div>
         <div className="flex items-center justify-center">
         {/* <button
             // onClick={handleOnAnswer}
             className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
           >
             Print
             <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" />
           </button> */}
         </div>
       </div>
       
       </div>
      ):(
      <div className="w-[80%] rounded-2xl p-4 bg-white">
         <div class="">
       
         <div class="flex items-center justify-center">
  <span class="flex-1 h-[1px] bg-blue-900 mr-[5px]"></span>
  <label class="text-[#d98b19] font-lato text-[18px] font-semibold">Your Attempt Details</label>
  <span class="flex-1 h-[1px] bg-blue-900 ml-[5px]"></span>
</div>

     </div>
        <div className="flex py-1 items-end justify-end ">
           <button
             onClick={handleToggleAnswers}
             className="text-red-500 text-sm bg-[#FFB7B7] border border-red-500 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
           >
             Close
             {/* <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" /> */}
           </button>
         </div>
         <div className="flex gap-2 flex-row">
          <>
          <button
        onClick={handleBack1}
        disabled={currentPage === 1}
        className={`  text-sm rounded-md px-3 py-1 flex items-center  font-lato ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Back
      </button>
          {/* Question Numbers */}
          {displayedQuestions.map((question, index) => {
        const actualIndex = startIndex + index;
        const isCorrect = question.selected_option === question.correct_option;
        const isWrong = question.selected_option !== null && !isCorrect;

        return (
          <div
            key={actualIndex}
            onClick={() => setCurrentQuestionIndex(actualIndex)}
            className={`cursor-pointer w-8 h-8 flex items-center justify-center border-[1px] text-sm font-medium ${
              actualIndex === currentQuestionIndex
                ? 'bg-[#85b4e9] text-white'
                : isCorrect
                ? 'bg-[#c9e4ca] text-black'
                : isWrong
                ? 'bg-[#FFB7B7] text-red-600'
                : 'bg-green-100 text-black'
            }`}
          >
            {actualIndex + 1}
          </div>
        );
      })}
        <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`text-sm rounded-md px-3 py-1 flex items-center  font-lato ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Next
      </button>
      </>
        </div>
    
        <div className="flex flex-col items-start">
          {/* Render Selected Question */}
          {questions.map((question, index) =>
            index === currentQuestionIndex ? (
              <div className="w-full mt-8" key={index}>
                {/* Question Text */}
                <div className="mb-2">
                  <span className="text-[#214082] text-[15px] font-semibold">
                    {index + 1}. {question.question_text}
                  </span>
                </div>
    
                {/* Options */}
                <div className="flex flex-col mb-6">
                  {Object.keys(question.options).map((optionKey, IDXx) => {
                    const optionText = question.options[optionKey];
                    const isSelected = optionText === question.selected_option;
                    const isCorrect = optionText === question.correct_option;
    
                    return (
                      <div
                        key={IDXx}
                        className={` mt-3 flex items-center  `}
                      >
                         <div
                      className={`mr-2 font-normal font-[lato] w-[40px] rounded-[5px] h-[37px] p-[8px] bg-[#E8E9E8] border-[1px] border-solid border-[#D3D3D3] flex justify-center text-center items-center text-[14px]  ${
                          isCorrect
                            ? 'bg-[#c9e4ca] border-green-500'
                            : isSelected
                            ? 'bg-[#FFB7B7] border-red-500'
                            : 'border-[#D3D3D3] bg-[#E8E9E8] rounded-[5px] border-solid border-[1.8px] '
                        }`}
                    >
                      {optionLabels[optionKey]}
                    </div>
                    <div
                      className={`w-[100%] font-[lato] h-[37px] rounded-[5px] border-solid border-[#D3D3D3] bg-[#E8E9E8] border-[1.8px] p-[5px] text-[14px] text-[#000]  ${
                          isCorrect
                            ? 'bg-[#c9e4ca] border-green-500'
                            : isSelected
                            ? 'bg-[#FFB7B7] border-red-500'
                            : 'border-[#D3D3D3] bg-[#E8E9E8] rounded-[5px] border-solid border-[1.8px] '
                        }`}
                    >
                       {optionText}
                    </div>
                       
                      </div>
                    );
                  })}
                </div>
    
                {/* Answer Feedback */}
                {/* <div className="flex items-center mt-6 ml-6">
                  <img
                    src={
                      question.selected_option === question.correct_option
                        ? rightIcon1
                        : wrongIcon1
                    }
                    alt="Answer Icon"
                    className="w-6 h-6 mr-2"
                  />
                  <span
                    className={`text-sm font-medium ${
                      question.selected_option === question.correct_option
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {question.selected_option === question.correct_option
                      ? 'Correct Answer'
                      : 'Wrong Answer'}
                  </span>
                </div> */}
    
                {/* Correct Answer Description */}
                <div className="correct-answer-description mt-4 ">
                  <span className="description-text">
                 <span className=' font-semibold text-[#000085]'>Answer Description :</span>  {question.correct_answer_description}
                  </span>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>)}
 

<div className='flex flex-col justify-end px-2 items-center'>
<div className=' w-[10px] rounded-full bg-[#00008b] h-[10px]'></div>
<div className='h-[85%] w-[1px] bg-[#00008b]'></div>
<div className=' w-[10px] rounded-full bg-[#00008b] h-[10px]'></div>

</div>
<div className=' w-full flex p-4  flex-col justify-between'>
<div className="max-w-4xl rounded-md">
<div class="">
  <div class="flex items-center justify-center  ">
    <span class="inline-block h-[1px] bg-blue-900 w-full mr-[5px]"></span>
    <label class="text-[#d98b19] flex w-[60%] font-lato text-[18px] items-center justify-center font-semibold">Top Performers</label>
    <span class="inline-block h-[1px] bg-blue-900 w-full ml-[5px]"></span>
  </div>
</div>

    <div className="overflow-x-auto py-2">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100 font-bold text-[#00008b]">
          <tr>
          <th className="border-b border-gray-300 px-4 py-2 text-left">Rank</th>
            <th className="border-b border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border-b border-gray-300 px-4 py-2 text-center">Attempts</th>
            <th className="border-b border-gray-300 px-4 py-2 text-left">Percentage</th>
            <th className="border-b border-gray-300 px-4 py-2 text-left">Duration</th>
            {/* <th className="border-b border-gray-300 px-4 py-2 text-center">Version</th> */}
            <th className="border-b border-gray-300 px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.slice(0, 10).map((entry, index) => (
            <tr
            key={entry.rank}
              className={`${
                entry.current ? "bg-green-100" : ""
              } hover:bg-gray-50 text-[#00008b]`}
            >
              <td className="border-b px-4 py-2">{entry.rank}</td>
              <td className="border-b px-4 py-2">{entry.user_name}</td>
              <td className="border-b px-4 py-2 text-center">{entry.attempts_count}</td>
              <td className="border-b px-4 py-2">{entry.attained_percentage}%</td>
              <td className="border-b px-4 py-2">{entry.attempt_duration_mins}</td>
              {/* <td className="border-b px-4 py-2 text-center">{entry.version}</td> */}
              <td className="border-b px-4 py-2">
                {entry.created_date}
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  </div>
  <div className=" text-right flex justify-end">
      {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
        Leader Board
      </button> */}
      {/* <button
    // onClick={handleOnAnswer}
    className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
  >
     Leader Board
    <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" />
  </button> */}
    </div>
</div>
  </div>
 


     

    </div>
    {/* <LogoutBar /> */}



 
  </div>
      
    
  );
};

export default leaderboard;