import { React, useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg";
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png";
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import "./sampleQuiz.css";
import { useNavigate } from 'react-router-dom';
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import homeImage from "/images/oldimage.png";
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png"
import current from "../../src/assets/Images/images/quizresults/faq.png"
import { useSelector ,useDispatch} from "react-redux";
import SampleAnswerBoard from '../sampleQizAnswers/sampleAnswerBoard';
import showUserAnswers, { setDynamicStateFlags } from "../../src/home/slice.jsx";

// const showAnswers = false
const Samplequiz = () => {
  const {
    leaderBoard,
    randomQuestions,
    started
  } = useSelector(state => state.home);
  const navigate = useNavigate();

  const handleOnClose = () => {
     navigate("/")
   }


  const handleOnAnswer = () => {
    setShowAnswers(true);   }
   const [showAnswers,setShowAnswers]= useState(false);
  const today = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = today.getDate().toString().padStart(2, '0');
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const dateString = `${day}-${month}-${year}`;
  let resStr = ``;
  let Grade = `A`
  const percentage = (leaderBoard.correctAnswers / leaderBoard.attemptedQuestions) * 100;
  let rank = 1;
  let passed = false;
  if (percentage < 41) {
    Grade = `D`;
    rank = 4;
    passed = false;
  } else if (percentage < 61) {
    Grade = `C`;
    rank = 3;
    passed = true;
  } else if (percentage < 81) {
    Grade = `B`;
    rank = 2;
    passed = true;
  }


  return (

    <div >
      <div className='flex float-right gap-4px'>
        <button className={`w-16 h-[30px] text-[#555555] text-[13px] leading-7 font-bold flex items-center justify-center rounded-full hover:bg-[#EF512F] transition-transform transform hover:scale-110 mt-[9%] mr-[5%] $`}>
          Home
        </button>

        <button className={`w-20 h-[30px] rounded-full font-Poppins bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center gap-1 hover:bg-[#EF512F] transition-transform transform hover:scale-110 mt-[9%] mr-[3%]  $`}>
          Sign Up
          {/* <img className='h-[17px]' src={signUpIcon} alt="Sign Up Icon" /> */}
        </button>
        <button className={`w-20 h-[30px] rounded-full font-Poppins bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center gap-1 hover:bg-[#EF512F] transition-transform transform hover:scale-110  ml-[2%] mt-[9%]  mr-[6%] $`}>
          Login
          {/* <img className="h-[17px]" src={logInIcon} alt="Login Icon" /> */}
        </button>
      </div>

      <div className='flexContainer'>
       
        <div className='subDiv1'>
          <span>Your Attempt Details</span>
          <div className='subDiv'>
            <h1 className='rank'> {rank} </h1>
            <img className='h-[108.62px] w[130.01px  ml-[43%]'
              src={rankimage}
              alt="Icon 1"

            />
            <span> Your Rank </span>
            <div className=''>
              <div  className='ml-13px'>
                <img className='h-[30px] w[30.px] block inline mt-23px '
                  src={dateIcon}
                  alt="Calendar Icon"
                />
               <span className='ml-24px'> {dateString}</span>
              </div>
              <div>
                <img className='h-[30px] w[30.px] block inline  '
                  src={timeIcon}
                  alt="Calendar Icon"
                />
                <span className='minutes'>15 Minutes</span>
              </div>
              <div>
                <img className='h-[30px] w[30.px] block inline  '
                  src={vector}
                  alt="Calendar Icon"

                />
                <span className='correctAnswers'>{leaderBoard.correctAnswers} correct answer</span>
              </div>
              <div className='mt-8%'>
                <img className='h-[30px] w[30.px] block inline '
                  src={current}
                  alt="Calendar Icon"

                />
                <span className='questions '>Attempted {leaderBoard.attemptedQuestions} questions</span>
              </div>
              <div>
              
                <div className='ml-[74%] border border-blue-500 rounded-md'>You have scored {percentage}%</div>
                <div className='ml-[74%] border border-blue-500 rounded-md'>{Grade} ,{passed} Grade</div>
              </div>
            </div>
          </div>
        </div>
        <img src={homeImage} alt="home Image" className="float-right" />
      </div>
      <div className='button'>
          <button  onClick={handleOnAnswer}className='answer'>Answer</button>
        <button onClick={handleOnClose} className='close'> Close</button>
      </div>
      {showAnswers && <SampleAnswerBoard q={randomQuestions} />}
    </div>

  )
}
export default Samplequiz;
