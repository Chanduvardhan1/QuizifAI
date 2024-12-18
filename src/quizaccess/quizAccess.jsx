// Dashboard.js
"use client";
import React from "react";
import { useEffect, useState } from 'react';
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import styles from "./quizAccess.module.css";
// import { useRouter } from 'next/router';
// import Head from "next/head";
// import Image from "next/image";
import searchIcon from "../../src/assets/Images/images/dashboard/searchBar.png";
import titleIcon from "../../src/assets/Images/images/quiz-Access/title.png"; 
import createdIcon from "../../src/assets/Images/images/quiz-Access/created.png"; 
import descriptionIcon from "../../src/assets/Images/images/quiz-Access/description.png";
import percentIcon from "../../src/assets/Images/images/quiz-Access/percent.png";
import questionsIcon from "../../src/assets/Images/images/quiz-Access/questions.png";
import saveIcon from "../../src/assets/Images/images/quizview/save.png"; 
import retakeIcon from "../../src/assets/Images/images/quizview/retake.png"; 
import optionsIcon from "../../src/assets/Images/images/quizview/options.png";
import categoryIcon from "../../src/assets/Images/images/quiz-Access/category.png";
import timeIcon from "../../src/assets/Images/images/quiz-Access/time.png";
// import startIcon from "../../src/assets/Images/images/quiz-Access/start.png";
import scoringIcon from "../../src/assets/Images/images/quiz-Access/scoring.png";
import user4Icon from "../../src/assets/Images/images/quiz-Access/user4.png";
import user3Icon from "../../src/assets/Images/images/quiz-Access/user3.png";
import user1Icon from "../../src/assets/Images/images/quiz-Access/user1.png"; 
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";



//------------------**import images**------------------//
import physics from "../../src/assets/Images/quiz-type/quizcover.jpg"
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
import Attemts from "../../src/assets/Images/dashboard/Attemts.png"
import Quickest from "../../src/assets/Images/dashboard/image (15).png"
import Badge from "../../src/assets/Images/dashboard/badge 1.png"


const dashboardLogo = "/images/dashboard/quizifaiDashboard.png";
const dashboardIcon = "/images/dashboard/dashboard.png";
const quizIcon = "/images/dashboard/quiz.png";
const historyIcon = "/images/dashboard/history.png";
const scheduleIcon = "/images/dashboard/schedule.png";
const notificationIcon = "/images/dashboard/notification.png";
const adminIcon = "/images/quiz-Access/admin.png";
const settingsIcon = "/images/quiz-Access/settings.png";
const profileIcon = "/images/quiz-Access/profile1.png";


const quizAccess = () => {
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

 // const BasicProgressBar = ({ currentValue, maxValue }) => (
   // <progress value={currentValue} max={maxValue}>{currentValue}%</progress>
  //);
  // const router = useRouter();

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
  };
  const handleButtonClick = () => {
  
    history.push('/quizquestions');
  };

  const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [quizDetails, setQuizDetails] = useState(null);
  // const { quizId } = useParams();
  // const handleStartQuiz = () => {
  //   if (quizData && quizData.quiz_id) {
  //     navigate(`/quizquestions/${quizData.quiz_id}`);
  //   }
  // };
  const handleStartQuiz = () => {
    if (quizData && quizData.quiz_title && quizData.quiz_id) {
      navigate(`/quizquestions/${quizData.quiz_id}`, {
        state: { 
          quiz_id: quizData.quiz_id,
          quiz_title: quizData.quiz_title,
          quiz_description: quizData.quiz_description,
          quiz_duration: quizData.quiz_duration,
          pass_percentage: quizData.pass_percentage,
          num_questions: quizData.num_questions,
          quiz_total_marks: quizData.quiz_total_marks,
          quiz_complexity_name:quizData.quiz_complexity_name,
          quiz_category_name:quizData.quiz_category_name,
          quiz_sub_category_name:quizData.quiz_sub_category_name,
          course_name:quizData.course_name,
          class_name:quizData.class_name,
        }
      });
    }
  };
  
  const Back = () => {
    
      navigate("/dashboard");
    
  };
  const [createdBy, setCreatedBy] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

  if (!authToken) {
    console.error('No authentication token found');
    return;
  }
    const userId = localStorage.getItem("user_id");
    const quizId = localStorage.getItem("quiz_id");
    fetch('https://dev.quizifai.com:8010/access_quiz_for_master', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        quiz_id: quizId,
        user_id: userId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setQuizData(data.data);
      // setQuizDetails(data["quiz metrics"]);
      // setCreatedBy(data.created_by);
      // setCreatedOn(data.created_on);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  }, []);
  return (
    <>
    <div className="flex flex-row w-full">
        <div>
        <Navigation/>
        </div>
<div className="w-full p-5">
    <div className="flex justify-end py-2">
            <div onClick={Back} className="flex items-center px-[10px] p-[5px] border-[1px] border-[#FF6865] bg-[#FFCCCB] text-[#FF0500] font-semibold rounded-[10px] cursor-pointer">
                <p>Close</p>
                <img src={closeimage} alt="" className="w-[20px] h-[20px]" />
            </div>
    </div>
    {quizData && (
<div className="flex w-[90%] border-[#8cd18e] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-2 bg-white">
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

          <h2 className="text-lg font-semibold text-[#00008b]">{quizData.quiz_title}</h2>
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
          <span>{`${quizData.quiz_category_name}`}</span>
          <span className="mx-1">.</span>
          <span>{`${quizData.quiz_sub_category_name}`}</span>
          <span className="mx-1">.</span>
          <span>{`${quizData.course_name}`}</span>
          <span className="mx-1">.</span>
          <span>{`${quizData.class_name}`}</span>
          <span className="mx-1">.</span>
          <span>{`${quizData.quiz_complexity_name}`}</span>
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
              <span className="ml-1 text-sm">{quizData.created_by}</span>
            </div>
            <div className="flex items-center">
              <img
                src={calander} 
                alt="Calendar"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quizData.created_on}</span>
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
              <span className="ml-1 text-sm">{`${quizData.num_questions}`} Questions</span>
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
              <span className="ml-1 text-sm">{quizData['quiz metrics'].total_attempts} Attemts</span>
            </div>
            <div className="flex items-center">
              <img
                src={Badge}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quizData['quiz metrics'].highest_score !== null ? quizData['quiz metrics'].highest_score : 'N/A'} High Score</span>
            </div>
            <div className="flex items-center">
              <img
                src={Quickest}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quizData['quiz metrics'].quickest_completion_time !== null ? quizData['quiz metrics'].quickest_completion_time : 'N/A'} Mins Quickest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
     )}
    <div className="flex py-4 text-[#F17530] text-[16px] font-bold">
        <p >Read the below instructions before starting the quiz</p>
    </div>
    <div className="text-[#214082]">
      <p><span>1 . </span> Carefully read each question before selecting your answer.</p>
      <p><span>2 . </span> Answer all questions, even if you are not sure.</p>
      <p><span>3 . </span> Make sure to submit your answers before the timer ends.</p>
      <p><span>4 . </span> If available, use the skip or review feature to mark questions you want to revisit later.</p>
      <p><span>5 . </span> Quizzes may auto-submit, but it is best to double-check.</p>
      <p><span>6 . </span> Contact <span className="text-[#F17530] underline" href="">Support@quizifai.com</span> in case you face any challanges</p>
    </div>
    <div className="flex justify-center py-10">
            <div onClick={handleStartQuiz} className="flex items-center px-[10px] p-[5px] border-[2px] border-solid border-[#2196F3] bg-[#ADD8E6] text-[#00008b] font-semibold rounded-[10px] cursor-pointer"
            >
                <p>Start</p>
                <img src={Playbutton} alt="" className="w-[20px] h-[20px]" />
            </div>
    </div>

</div>
      </div>
      </>
    
  );
};

export default quizAccess;
