
import { React, useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg";
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png";
import "./sampleQuiz.scss";
import { useNavigate } from 'react-router-dom';
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import homeImage from "/images/oldimage.png";

import { useSelector } from "react-redux";
import SampleAnswerBoard from '../sampleQizAnswers/sampleAnswerBoard';
import showUserAnswers, { setDynamicStateFlags } from "../../src/home/slice.jsx";
import PageHeader from '../common/pageHeader.jsx';
import chartbots1 from "../../public/chatbots1.png";
import correction from "../../public/correcticon.png";
import HeaderSection from "../HeaderSection/HeaderSection";


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
import print1 from "../../src/assets/Images/dashboard/print.png"
import trophy from "../../src/assets/Images/dashboard/trophy.png"
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png";
import current from "../../src/assets/Images/images/quizresults/faq.png";
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import Attemts from "../../src/assets/Images/dashboard/Attemts.png"
import Quickest from "../../src/assets/Images/dashboard/image (15).png"
import Badge from "../../src/assets/Images/dashboard/badge 1.png"

const performers = [
  { id: 1, name: "Ram M Reddy", attempts: 2, score: "94.34 %", duration: "01:03:30", version: "03", date: "03-Sep-2024" },
  { id: 2, name: "Samantha S", attempts: 8, score: "89.14 %", duration: "04:03:30", version: "03", date: "01-Sep-2024" },
  { id: 3, name: "Sai J", attempts: 4, score: "78.94 %", duration: "05:01:10", version: "02", date: "08-Sep-2024", current: true },
  { id: 4, name: "Arifa", attempts: 2, score: "94.34 %", duration: "01:03:30", version: "03", date: "03-Sep-2024" },
  { id: 5, name: "Deepika R", attempts: 8, score: "89.14 %", duration: "04:03:30", version: "02", date: "01-Sep-2024" },
];

const Samplequiz = () => {
  const {
    leaderBoard,
    randomQuestions,
    started
  } = useSelector(state => state.home);
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate("/");
  }

  const handleOnAnswer = () => {
    setShowAnswers(prev => !prev); // Toggle showAnswers
  }

  const [showAnswers, setShowAnswers] = useState(false);
  const today = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = today.getDate().toString().padStart(2, '0');
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const dateString = `${day}-${month}-${year}`;
  let resStr = ``;
  let Grade = `A Grade`;
  const percentage = (leaderBoard.correctAnswers / leaderBoard.attemptedQuestions) * 100;
  let rank = 1;
  let passed = false;
  if (percentage < 41) {
    Grade = `D Grade`;
    rank = 4;
    passed = false;
  } else if (percentage < 61) {
    Grade = `C Grade`;
    rank = 3;
    passed = true;
  } else if (percentage < 81) {
    Grade = `B Grade`;
    rank = 2;
    passed = true;
  }

  return (
    <div>
      <HeaderSection />
      <div className='flex w-full'>

    
      <div className=' p-1'>
      {/* <div className="flex justify-end py-2">
            <div className="flex items-center px-[10px] p-[5px] border-[1px] border-[#FF6865] bg-[#FFCCCB] text-[#FF0500] font-semibold rounded-[10px] "
            >
                <p>Close</p>
                <img src={closeimage} alt="" className="w-[20px] h-[20px]" />
            </div>
    </div> */}
<div className="flex w-full border-[#8cd18e] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-2 bg-white">
      {/* Quiz Image */}
      <div className="relative mr-2">
        <img
          src={physics}
          alt="Quiz Cover"
          className="w-[100px] h-[140px] rounded-md mr-4 cursor-pointer"
        />
      </div>

      {/* Quiz Details */}
      <div className="flex flex-col w-full">
        {/* Title */}
        <div className="flex justify-between items-center">
            <div>

          <h2 className="text-lg font-semibold text-[#00008b]">Current Affairs</h2>
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
        Test your knowledge with QuizifAI Current Affairs quiz stay updated on global events and trends!
        </p>

        {/* Meta Information */}
        <div className="text-[#00008b] text-sm flex flex-wrap mt-1">
          <span>General</span>
          <span className="mx-1">.</span>
          <span>General</span>
          <span className="mx-1">.</span>
          <span>General</span>
          <span className="mx-1">.</span>
          <span>General</span>
          <span className="mx-1">.</span>
          <span>Simple</span>
        </div>

        {/* Icons and Additional Info */}
        <div className="flex-col items-center space-y-1 mt-1 text-[#00008b]">
          {/* Author and Date */}
          <div className="flex items-center space-x-10">
            <div className="flex items-center">
              <img
               src={username}
                alt="User"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">Samantha S</span>
            </div>
            <div className="flex items-center">
              <img
                src={calander} 
                alt="Calendar"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">2024-12-01</span>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="flex items-center space-x-10">
            <div className="flex items-center">
              <img
                src={comment}
                alt="Questions"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">5 Questions</span>
            </div>
            <div className="flex items-center">
              <img
                src={timer}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">5 Minutes</span>
            </div>
            <div className="flex items-center">
              <img
                src={Attemts}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">1 Attemts</span>
            </div>
            <div className="flex items-center">
              <img
                src={Badge}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">90% High Score</span>
            </div>
            {/* <div className="flex items-center">
              <img
                src={Playbutton}
                alt="Timer"
                className="w-[18px] h-[18px] mr-1"
              />
              <span className="ml-1 text-sm">2:02 Mins Quickest</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    <div class="">
    <div class="flex items-center justify-center px-[10px] mt-2">
      <span class="inline-block h-[1px] bg-blue-900 w-full mr-[5px]"></span>
      <label class="text-[#d98b19] font-lato text-[18px] font-semibold flex justify-center w-[500px]">Your Attempt Details</label>
      <span class="inline-block h-[1px] bg-blue-900 w-full ml-[5px]"></span>
    </div>
  </div>
    <div className='flex w-full' >
  
      <div className=' w-[50%] '>
      <SampleAnswerBoard q={randomQuestions} />

      </div>
    <div class="w-[50%] flex justify-center text-center mt-4">

  <div class="w-full flex items-end">
    
  <div class="w-full flex justify-center items-center flex-col gap-2 sm:w-[50%]">
  <div class="w-[210px] h-[7vh] flex items-center">
    <img class="h-[20px] w-[20px]" src={dateIcon} alt="Calendar Icon" />
    <span class="ml-2 font-lato text-[14px] font-semibold text-blue-900">{dateString}</span>
  </div>
  <div class="w-[210px] h-[7vh] flex items-center">
    <img class="h-[20px] w-[20px]" src={timeIcon} alt="Clock Icon" />
    <span class="ml-2 font-lato text-[14px] font-semibold text-blue-900">15 Minutes</span>
  </div>
  <div class="w-[210px] h-[7vh] flex items-center">
    <img class="h-[20px] w-[20px]" src={vector} alt="Check Icon" />
    <span class="ml-2 font-lato text-[14px] font-semibold text-blue-900">{leaderBoard.correctAnswers} Correct answers</span>
  </div>
  <div class="w-[210px] h-[7vh] flex items-center">
    <img class="h-[20px] w-[20px]" src={current} alt="Question Icon" />
    <span class="ml-2 font- text-[14px] font-semibold  text-blue-900">Attempted {leaderBoard.attemptedQuestions} questions</span>
  </div>
</div>
<div className='w-full flex-col gap-2 flex justify-center items-center sm:w-[50%]'>
<div class="relative flex justify-center flex-col items-center">
    <label class="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[50px] text-blue-900 font-bold font-lato">{rank}</label>
    <img class="h-[108.62px] w-[130.01px] flex justify-center" src={rankimage} alt="Icon 1" />
    <span class="text-blue-900 font-medium font-lato text-[17px]">Your Rank</span>
  </div>
<div class="flex  w-[70%] flex-col p-2 px-6 rounded-xl bg-green-100 border-green-300 border-[1px] items-center">

      <div class=" text-green-700 font-medium text-center">{percentage}%</div>
    </div>
    <div class="flex  w-[70%] flex-col p-2 px-6 rounded-xl bg-red-100 border-red-300 border-[1px] items-center">

      <div class=" text-[#fa5967]  text-center">{Grade}, {passed ? "Grade" : "Fail"}</div>
</div>
</div>


    
  </div>
  {/* <div className="flex  mt-2 gap-2">
  <div className="flex items-center justify-center ">
    <button
      onClick={handleOnAnswer}
      className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
    >
      Answers
      <img className="ml-2 h-5 w-5" src={correction} alt="Correction Icon" />
    </button>
  </div>
  <div className="flex items-center justify-center">
  <button
      onClick={handleOnAnswer}
      className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
    >
      Print
      <img className="ml-2 h-5 w-5" src={print1} alt="Correction Icon" />
    </button>
  </div>
  <div className="flex items-center justify-center">
  <button
      onClick={handleOnAnswer}
      className="text-blue-900 text-sm bg-blue-200 border border-blue-900 rounded-md px-3 py-1 cursor-pointer flex items-center  font-lato"
    >
      Leader Board
      <img className="ml-2 h-5 w-5" src={trophy} alt="Correction Icon" />
    </button>
  </div>
  <div className="flex justify-end py-2">
            <div onClick={handleOnClose} className="flex items-center px-[10px] cursor-pointer p-[5px] border-[1px] border-[#FF6865] bg-[#FFCCCB] text-[#FF0500] font-semibold rounded-[10px] "
            >
                <p>Close</p>
                <img src={closeimage} alt="" className="w-[20px] h-[20px]" />
            </div>
    </div>
</div> */}

</div>

    </div>



        {/* <img src={homeImage} alt="home Image" className="float-right" /> */}
        {/* <img src={chartbots1} alt="home Image" className="h-[400px] w-full max-w-[641px] ml-[0%] mt-[8%] mr-[3%]" /> */}
      </div>

<div>
<img src={chartbots1} alt="home Image" className="h-[400px] w-[92%] max-w-[641px] ml-[8%] mt-[8%]"/>

</div>

      </div>
      {/* <div className='button'>
    <div className='answer-container'>
        <button onClick={handleOnAnswer} className='answer'>
            Answers
            <img className='icon' src={correction} alt="Correction Icon" />
        </button>
    </div>
    <div className='close-container'>
        <button onClick={handleOnClose} className='close'>
            Close
            <img className='icon' src={closeimage} alt="Close Icon" />
        </button>
    </div>
</div> */}




    </div>




  );
}

export default Samplequiz;




