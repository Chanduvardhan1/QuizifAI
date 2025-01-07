//import Head from 'next/head';
//import img from "next/image";
import styles from './quizresults1.module.css';
import React, { useEffect, useState ,useRef} from 'react';
import ranksIcon from "../assets/Images/images/quizresults/ranks.png"; 
import rank1Icon from "../assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../assets/Images/images/quizresults/rank3.png";
import rankScoreIcon from "../assets/Images/images/quizresults/rankscore.png";
import greybox1Image from "../assets/Images/images/quizresults/greybox1.png";  
import greybox2Image from "../assets/Images/images/quizresults/greybox2.png";
import greybox3Image from "../assets/Images/images/quizresults/greybox3.png"; 
import FirstRank from "../assets/Images/images/quizresults/FirstRank.png";
import rightIcon from "../assets/Images/images/quizresults/right.png"; 
import one1Image from "../assets/Images/images/quizview/one1.png";
import iconA from "../assets/Images/images/questions/IconA.png";
import iconB from "../assets/Images/images/questions/IconB.png";
import iconC from "../assets/Images/images/questions/IconC.png";
import iconD from "../assets/Images/images/questions/IconD.png";
// import dateIcon from "../assets/Images/images/quizview/date.png";
import answerTimerIcon from "../assets/Images/images/quizresults/answerTimer.png"; 
import rightIcon1 from "../assets/Images/images/quizresults/righticon.png"; 
import wrongIcon from "../assets/Images/images/quizresults/wrong.png";
import wrongIcon1 from "../assets/Images/images/quizresults/wrongicon.png";
import two2Icon from "../assets/Images/images/quizview/two2.png";
import three3Icon from "../assets/Images/images/quizview/three3.png"; 
import four4Icon from "../assets/Images/images/quizview/four4.png";
import titleIcon from "../assets/Images/images/quiz-Access/title.png"; 
import createdIcon from "../assets/Images/images/quiz-Access/created.png"; 
import descriptionIcon from "../assets/Images/images/quiz-Access/description.png";
import bot2Icon from "../assets/Images/images/quizresults/bot2.png"; 
import percentIcon from "../assets/Images/images/quiz-Access/percent.png";
import questionsIcon from "../assets/Images/images/quiz-Access/questions.png";
import saveIcon from "../assets/Images/images/quizview/save.png"; 
import retakeIcon from "../assets/Images/images/quizview/retake.png"; 
import optionsIcon from "../assets/Images/images/quizview/options.png";
import categoryIcon from "../assets/Images/images/quiz-Access/category.png";
// import timeIcon from "../assets/Images/images/quiz-Access/time.png"; 
import botIcon from "../assets/Images/images/quizview/bot.png";
import publicIcon from "../assets/Images/images/quizview/public.png";
import startIcon from "../assets/Images/images/quiz-Access/start.png";
import LeftBar from "../leftbar/leftbar";
import { useLocation } from 'react-router-dom';
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import Attempt1 from "/images/dashboard/Attempt1.png";
import NoOfQuestion from "/images/dashboard/NoOfQuestion.png";
import Clock from "/images/dashboard/Clock.png";
import Easy from "/images/dashboard/Easy.png";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg"
import sucess from "../../src/assets/Images/images/quizresults/success.png"
import sucess1 from "../../src/assets/Images/images/quizresults/success1.png"
import Top1 from "../../src/assets/Images/images/quizresults/top-score.png"
import fast from "../../src/assets/Images/images/quizresults/fast.png"

import percentIcon1 from "../../src/assets/Images/images/quizresults/discount.png"; 
import timeIcon1 from "../../src/assets/Images/images/quizresults/stopwatch1.png";
// import dateIcon1 from "../../src/assets/Images/images/quizresults/schedule.png";
import current from "../../src/assets/Images/images/quizresults/faq.png"
import average1 from "../../src/assets/Images/images/quizresults/average1.png"
import questions from "../../src/assets/Images/images/quizresults/question-mark.png"
import physics from "../../src/assets/Images/dashboard/quiz12.png"

import close from "../../src/assets/Images/images/dashboard/cancel.png"
import print1 from "../../src/assets/Images/dashboard/print.png"
import trophy from "../../src/assets/Images/dashboard/trophy.png"
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
// import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png";
// import current from "../../src/assets/Images/images/quizresults/faq.png";
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import correction from "../../public/correcticon.png";
import Attemts from "../../src/assets/Images/dashboard/Attemts.png"
import Quickest from "../../src/assets/Images/dashboard/image (15).png"
import Badge from "../../src/assets/Images/dashboard/badge 1.png"
import stars from "../../src/assets/Images/quiz-type/star.png"
import timer from "../../src/assets/Images/quiz-type/Timer.png"
import calander from "../../src/assets/Images/quiz-type/calander.png"
import username from "../../src/assets/Images/quiz-type/username.png"
import comment from "../../src/assets/Images/quiz-type/comment.png"

const Questions = () => {
  const location = useLocation();
  const { quizId , quizTotalMarks, passPercentage,quizname,quizdescription,createdby,complexity,numberofquestions,quizduration,  mincompletiontime,
    quizattempts,
    avgscore,
    max_percentage,quizcreatedate} = location.state || {};
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [quizData, setQuizData] = useState({});
  const [quizMetrics, setQuizMetrics] = useState({})
  const resultRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Get the auth token from localStorage

        if (!authToken) {
          throw new Error('No authentication token found');
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
          // Assuming you have quiz data in result, otherwise update this part
          setQuizData({
            quiz_name: result.data[0].quiz_name,
            quiz_description: result.data[0].quiz_description,
            created_by: result.data[0].created_by,
            created_date: result.data[0].created_date,
            attempts_count: result.data[0].attempts_count,
            total_questions: result.data[0].total_questions,
            quiz_duration: result.data[0].quiz_duration,
            complexity: result.data[0].complexity,

          });
          setQuizMetrics(result.quiz_metrices);

        } else {
          console.error('Failed to fetch leaderboard data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (quizId) {
      fetchData();
    }
  }, [quizId]);

  const handleBack = () => {
    navigate("/dashboard")
  };

const topThree = leaderboardData.slice(0, 3);
  const remaining = leaderboardData.slice(0,10);

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

      <h2 className="text-lg font-semibold text-[#00008b]">{quizname}</h2>
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
    {quizdescription}
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
      <span>{numberofquestions}</span>
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
          <span className="ml-1 text-sm">{createdby}</span>
        </div>
        <div className="flex items-center">
          <img
            src={calander} 
            alt="Calendar"
            className="w-[18px] h-[18px] mr-1"
          />
          <span className="ml-1 text-sm">{quizcreatedate}</span>
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
          <span className="ml-1 text-sm">{quizduration} Questions</span>
        </div>
        <div className="flex items-center">
          <img
            src={timer}
            alt="Timer"
            className="w-[18px] h-[18px] mr-1"
          />
          <span className="ml-1 text-sm">{quizduration}</span>
        </div>
        <div className="flex items-center">
          <img
            src={Attemts}
            alt="Timer"
            className="w-[18px] h-[18px] mr-1"
          />
          <span className="ml-1 text-sm">{quizattempts} Attemts</span>
        </div>
        <div className="flex items-center">
          <img
            src={Badge}
            alt="Timer"
            className="w-[18px] h-[18px] mr-1"
          />
          <span className="ml-1 text-sm">0% High Score</span>
        </div>
        <div className="flex items-center">
          <img
            src={Quickest}
            alt="Timer"
            className="w-[18px] h-[18px] mr-1"
          />
          <span className="ml-1 text-sm">0 Mins Quickest</span>
        </div>
      </div>
    </div>
  </div>
</div>
   
    <div className='flex w-full' >
       <div class="w-[50%] text-center p-4">
       <div class="">
     
         <div class="flex items-center justify-center">
           <span class="inline-block h-[1px] bg-blue-900 w-[80px] mr-[5px]"></span>
           <label class="text-[#d98b19] font-lato text-[18px] font-semibold">Your Attempt Details</label>
           <span class="inline-block h-[1px] bg-blue-900 w-[80px] ml-[5px]"></span>
         </div>
       </div>
     
       <div class="relative flex justify-center flex-col items-center">
         <img class="absolute h-[50.62px] w-[80.01px] top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[50px] text-blue-900 font-bold font-lato" src={questions} />
         <img class="h-[108.62px] w-[130.01px] flex justify-center" src={rankimage} alt="Icon 1" />
         <span class="text-blue-900 font-medium font-lato text-[17px]">Your Rank</span>
       </div>
     
       <div class="w-full flex items-center">
       <div class="w-full flex justify-center items-center flex-col gap-4 sm:w-[100%]">
       <div class="w-full flex items-center">
         <img class="h-[30px] w-[30px]" src={sucess} alt="Calendar Icon" />
         <span class="ml-2 font-lato text-blue-900">Total Attempts : </span>
         <span class="ml-2 font-lato text-blue-500">{quizattempts}</span>
       </div>
       <div class="w-full flex items-center">
         <img class="h-[30px] w-[30px]" src={timeIcon} alt="Clock Icon" />
         <span class="ml-2 font-lato text-blue-900">Average Completion Time :  </span>
         <span class="ml-2 font-lato text-blue-500">{mincompletiontime} Min</span>
       </div>
       <div class="w-full flex items-center">
         <img class="h-[30px] w-[30px]" src={Top1} alt="Check Icon" />
         <span class="ml-2 font-lato text-blue-900">Top Score :  </span>
         <span class="ml-2 font-lato text-blue-500">{quizMetrics.highest_score}</span>
       </div>
       <div class="w-full flex items-center">
         <img class="h-[30px] w-[30px]" src={current} alt="Question Icon" />
         <span class="ml-2 font-lato text-blue-900">Average Score :   </span>
         <span class="ml-2 font-lato text-blue-500">{avgscore}</span>
       </div>
     </div>
    
     
         
       </div>
    
     
     </div>
  


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
      
      </div>
  );
};

export default Questions;
