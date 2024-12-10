"use client";
import React from "react";
import { useEffect, useState } from 'react';
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
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


const quizAccess1 = () => {

 
  return (
    <>
    <div className="flex flex-row w-full">
        <div>
        <Navigation/>
        </div>
<div className="w-full p-5">
    <div className="flex justify-end py-2">
            <div onClick={Back} className="flex items-center px-[10px] p-[5px] border-[1px] border-[#FF6865] bg-[#FFCCCB] text-[#FF0500] font-semibold rounded-[10px] "
            >
                <p>Close</p>
                <img src={closeimage} alt="" className="w-[20px] h-[20px]" />
            </div>
    </div>
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
                <img src={timer}
                 alt="" 
                className="w-[18px] h-[18px] "   
                   />
                <img src={timer}
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
                src={Playbutton}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quizData['quiz metrics'].total_attempts} Attemts</span>
            </div>
            <div className="flex items-center">
              <img
                src={timer}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quizData['quiz metrics'].highest_score !== null ? quizData['quiz metrics'].highest_score : 'N/A'} High Score</span>
            </div>
            <div className="flex items-center">
              <img
                src={Playbutton}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">{quizData['quiz metrics'].quickest_completion_time !== null ? quizData['quiz metrics'].quickest_completion_time : 'N/A'} Mins Quickest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <div onClick={handleStartQuiz} className="flex items-center px-[10px] p-[5px] border-[2px] border-solid border-[#2196F3] bg-[#ADD8E6] text-[#00008b] font-semibold rounded-[10px]"
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

export default quizAccess1;
