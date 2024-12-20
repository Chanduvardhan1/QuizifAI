// import Head from 'next/head';
// import Image from "next/image";
import React, { useEffect, useState, useRef } from 'react';
import styles from './quiz_results.module.css';
import LeftBar from '../leftbar/leftbar';
import createdIcon from "../../src/assets/Images/images/quiz-Access/created.png";
import descriptionIcon from "../../src/assets/Images/images/quiz-Access/description.png";
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png";
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
// import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import current from "../../src/assets/Images/images/quizresults/faq.png"

import titleIcon from "../../src/assets/Images/images/quiz-Access/title.png";
import categoryIcon from "../../src/assets/Images/images/quiz-Access/category.png";
import ranksIcon from "../../src/assets/Images/images/quizresults/ranks.png";
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rankScoreIcon from "../../src/assets/Images/images/quizresults/rankscore.png";
import greybox1Image from "../../src/assets/Images/images/quizresults/greybox1.png";
import greybox2Image from "../../src/assets/Images/images/quizresults/greybox2.png";
import greybox3Image from "../../src/assets/Images/images/quizresults/greybox3.png";
import rightIcon from "../../src/assets/Images/images/quizresults/right.png";
import one1Image from "../../src/assets/Images/images/quizview/one1.png";
import iconA from "../../src/assets/Images/images/questions/IconA.png"
import iconB from "../../src/assets/Images/images/questions/IconB.png";
import iconC from "../../src/assets/Images/images/questions/IconC.png";
import iconD from "../../src/assets/Images/images/questions/IconD.png";
import answerTimerIcon from "../../src/assets/Images/images/quizresults/answerTimer.png";
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png";
import wrongIcon from "../../src/assets/Images/images/quizresults/wrong.png";
import wrongIcon1 from "../../src/assets/Images/images/quizresults/wrongicon.png";
import two2Icon from "../../src/assets/Images/images/quizview/two2.png";
import three3Icon from "../../src/assets/Images/images/quizview/three3.png";
import four4Icon from "../../src/assets/Images/images/quizview/four4.png";
import { useLocation } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import fistrank from '../../src/assets/Images/images/quizresults/FirstRank.png'
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png"
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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



const quiz_results = () => {
  const [quizData, setQuizData] = useState(null);
  const [quizData1, setQuizData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  //   const { quizId, attemptNo } = location.state || {};
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false); // State to track quiz submission
  const resultRef = useRef();
  const [showAnswers, setShowAnswers] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const optionLabels = {
    option1: 'A',
    option2: 'B',
    option3: 'C',
    option4: 'D'
  };
  const handleToggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const quizId = localStorage.getItem("quiz_id");
    const attemptNo = localStorage.getItem("quiz_level_attempt_id");

    const fetchQuizReport = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found');
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
            attempt_no: attemptNo
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuizData1(data.data);
      } catch (error) {
        console.error('Error fetching quiz report:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizReport();
  }, []);


  // useEffect(() => {
  //   const fetchLeaderboardData = async () => {
  //     try {
  //       const response = await fetch('https://dev.quizifai.com:8010/leaderboard_result', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           quiz_id: quizId
  //         })
  //       });

  //       const result = await response.json();

  //       if (result.response === 'success') {
  //         setLeaderboardData(result.data);
  //       } else {
  //         console.error('Failed to fetch leaderboard data:', result.message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching leaderboard data:', error);
  //     }
  //   };

  //   fetchLeaderboardData();
  // }, [quizId]);

  const userId = localStorage.getItem("user_id");
  // useEffect(() => {

  //   const sendQuizResult = async () => {
  //     try {
  //       const response = await fetch('https://dev.quizifai.com:8010/quiz_result', {
  //         method: 'POST',
  //         headers: {
  //           'accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           user_id: userId,
  //           quiz_id: quizId,
  //           attempt_id: attemptNo
  //         })
  //       });
  //       const result = await response.json();
  //       const data = result[0]?.data;
  //       setQuizData(data);
  //       console.log('Quiz result submitted:', data);
  //     } catch (error) {
  //       console.error('Error submitting quiz result:', error);
  //     }
  //   };

  //   if (quizId && attemptNo) {
  //     sendQuizResult(); // Trigger the POST request only if quizId and attemptNo are available
  //   }
  // }, [quizId, attemptNo]);
  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");
    const attemptNo = localStorage.getItem("quiz_level_attempt_id");

    const sendQuizResult = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found');
          return;
        }
        const response = await fetch('https://dev.quizifai.com:8010/quiz_result_view', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            quiz_id: quizId,
            attempt_id: attemptNo
          })
        });
        const result = await response.json();
        const data = result.data[0];
        setQuizData(data);
        console.log('Quiz result submitted:', data);
        setIsQuizSubmitted(true); // Set the submission state to true after success
      } catch (error) {
        console.error('Error submitting quiz result:', error);
        setIsQuizSubmitted(false); // Ensure it's false on error
      }
    };

    if (quizId && attemptNo) {
      sendQuizResult(); // Trigger the POST request only if quizId and attemptNo are available
    }
  }, [userId]);

  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");

    const fetchLeaderboardData = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found');
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
        console.error('Error fetching leaderboard data:', error);
      }
    };

    if (isQuizSubmitted) { // Trigger fetch only if quiz result submission was successful
      fetchLeaderboardData();
    }
  }, [isQuizSubmitted]);

  if (!quizData) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading quiz data: {error.message}</div>;
  }

  if (!quizData1 || !quizData1.questions) {
    return <div>No quiz data available</div>;
  }
  const Back = () => {

   /* fetch or store quizId */;
    navigate(`/dashboard`);
  };
  const handleBack = () => {
    navigate("/dashboard")
  };
  const questions = quizData1.questions;
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

    <div className="w-full p-5 pt-[60px]" ref={resultRef}>
      {/* <div className={styles.back1} onClick={Back}><MdOutlineCancel /></div> */}
      <div onClick={handleBack} className=" absolute top-5 right-5 cursor-pointer">
        <img src={close} alt="" className="w-[25px] h-[25px]" />
      </div>
      <div className="flex w-full border-[#8cd18e] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-2 bg-white">
    {/* Quiz Image */}
    <div className="relative mr-2">
      <img
        src={physics}
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
      <p className="text-[#00008b] w-[80%] line-clamp-2 text-sm mt-1">
      {quizData.quiz_description}
      </p>

      {/* Meta Information */}
      <div className="text-[#00008b] text-sm flex flex-wrap mt-3">
        <span>Science</span>
        <span className="mx-1">.</span>
        <span>Physics</span>
        <span className="mx-1">.</span>
        <span>Class 10</span>
        <span className="mx-1">.</span>
        <span>CBSE</span>
        <span className="mx-1">.</span>
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
            <span className="ml-1 text-sm">{`${quizData.created_by}`}</span>
          </div>
          <div className="flex items-center">
            <img
              src={calander} 
              alt="Calendar"
              className="w-[18px] h-[18px] mr-1"
            />
            <span className="ml-1 text-sm">{`${quizData.created_on}`}</span>
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
            <span className="ml-1 text-sm">30 Attemts</span>
          </div>
          <div className="flex items-center">
            <img
              src={Badge}
              alt="Timer"
              className="w-[18px] h-[18px] mr-1"
            />
            <span className="ml-1 text-sm">90% High Score</span>
          </div>
          <div className="flex items-center">
            <img
              src={Quickest}
              alt="Timer"
              className="w-[18px] h-[18px] mr-1"
            />
            <span className="ml-1 text-sm">2:02 Mins Quickest</span>
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
             <span class="inline-block h-[1px] bg-blue-900 w-[80px] mr-[5px]"></span>
             <label class="text-[#d98b19] font-lato text-[18px] font-semibold">Your Attempt Details</label>
             <span class="inline-block h-[1px] bg-blue-900 w-[80px] ml-[5px]"></span>
           </div>
         </div>
       
         <div class="relative flex justify-center flex-col items-center">
           <label class="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[50px] text-blue-900 font-bold font-lato">{quizData.rank}</label>
           <img class="h-[108.62px] w-[130.01px] flex justify-center" src={rankimage} alt="Icon 1" />
           <span class="text-blue-900 font-medium font-lato text-[17px]">Your Rank</span>
         </div>
       
         <div class="w-full flex items-center">
         <div class="w-full flex justify-center items-center flex-col gap-4 sm:w-[50%]">
         <div class="w-[210px] h-[7vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={dateIcon} alt="Calendar Icon" />
           <span class="ml-2 font-lato text-blue-900">{quizData.quiz_start_date}</span>
         </div>
         <div class="w-[210px] h-[7vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={timeIcon} alt="Clock Icon" />
           <span class="ml-2 font-lato text-blue-900">{quizData.attempt_duration} Minutes</span>
         </div>
         <div class="w-[210px] h-[7vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={vector} alt="Check Icon" />
           <span class="ml-2 font-lato text-blue-900">{quizData.correct_answers} Correct answers</span>
         </div>
         <div class="w-[210px] h-[7vh] flex items-center">
           <img class="h-[30px] w-[30px]" src={current} alt="Question Icon" />
           <span class="ml-2 font-lato text-blue-900">Attempted {quizData.attempted_questions} questions</span>
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
         <button
             // onClick={handleOnAnswer}
             className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
           >
             Print
             <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" />
           </button>
         </div>
       </div>
       
       </div>
      ):(
      <div className="w-[45%] rounded-2xl bg-white">
        <div className="flex py-1 items-end justify-end ">
           <button
             onClick={handleToggleAnswers}
             className="text-red-500 text-sm bg-[#FFB7B7] border border-red-500 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
           >
             Close
             {/* <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" /> */}
           </button>
         </div>
        <div className="flex flex-row">
          {/* Question Numbers */}
          {questions.map((question, index) => {
            const isCorrect = question.selected_option === question.correct_option;
            const isWrong = question.selected_option !== null && !isCorrect;
    
            return (
              <div
                key={index}
                onClick={() => setCurrentQuestionIndex(index)} // Set selected question index
                className={`cursor-pointer w-8 h-8 flex items-center justify-center border-[1px] text-sm font-medium ${
                  index === currentQuestionIndex
                    ? 'bg-green-100 text-white' // Highlight selected question
                    : isCorrect
                    ? 'bg-[#c9e4ca] text-black' // Correct answer (green)
                    : isWrong
                    ? 'bg-[#FFB7B7] text-red-600' // Wrong answer (red)
                    : 'bg-green-100 text-black' // Default
                }`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
    
        <div className="flex flex-col items-start">
          {/* Render Selected Question */}
          {questions.map((question, index) =>
            index === currentQuestionIndex ? (
              <div className="w-full mt-8" key={index}>
                {/* Question Text */}
                <div className="mb-2">
                  <span className="text-[#214082] text-lg font-semibold">
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
                        className={` mt-3 flex items-center px-4 `}
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
                <div className="flex items-center mt-6 ml-6">
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
                </div>
    
                {/* Correct Answer Description */}
                <div className="correct-answer-description mt-4 ml-6">
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
            <th className="border-b border-gray-300 px-4 py-2 text-left">Score</th>
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
              <td className="border-b px-4 py-2">{entry.total_score}</td>
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
      <button
    // onClick={handleOnAnswer}
    className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
  >
     Leader Board
    <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" />
  </button>
    </div>
</div>
  </div>
 


     

    </div>
    {/* <LogoutBar /> */}
  </div>


  );
};

export default quiz_results;
