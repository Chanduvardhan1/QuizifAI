
import { React, useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg";
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png";
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import "./sampleQuiz.scss";
import { useNavigate } from 'react-router-dom';
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import homeImage from "/images/oldimage.png";
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png";
import current from "../../src/assets/Images/images/quizresults/faq.png";
import { useSelector } from "react-redux";
import SampleAnswerBoard from '../sampleQizAnswers/sampleAnswerBoard';
import showUserAnswers, { setDynamicStateFlags } from "../../src/home/slice.jsx";
import PageHeader from '../common/pageHeader.jsx';
import chartbots1 from "../../public/chatbots1.png";
import closeimage from "../../public/closeimage.png";
import correction from "../../public/correcticon.png";

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
  let Grade = `A`;
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
    <div>
      <PageHeader />
      <div className='flexContainer'>
        <div className='contentWrapper'>
          <div className='content-details'>
            <div className='content-details-attempt'>
              <span className='leftLine line'></span>
              <label>Your Attempt Details</label>
              <span className='rightLine line'></span>
            </div>
          </div>
          <div className='content-rank-flower'>
            <label className='rank'> {rank} </label>
            <img className='h-[108.62px] w[130.01px] ml-[43%]'
              src={rankimage}
              alt="Icon 1"
            />
            <span>Your Rank</span>
          </div>
          <div className='content-result'>
            <div className='content-result-left'>
              <div className='mr-[3%] mt-[1%] content-result-left-box'>
                <img className='h-[30px] w[30.px] block inline mt-23px '
                  src={dateIcon}
                  alt="Calendar Icon"
                />
                <span className='ml-[9px] font-[lato]'>{dateString}</span>
              </div>
              <div className='mr-[5%] mt-[1%] content-result-left-box'>
                <img className='h-[30px] w[30.px] block inline  '
                  src={timeIcon}
                  alt="Calendar Icon"
                />
                <span className='ml-[9px] font-[lato]'>15 Minutes</span>
              </div>
              <div className='mt-[1%] content-result-left-box'>
                <img className='h-[30px] w[30.px] block inline  '
                  src={vector}
                  alt="Calendar Icon"
                />
                <span className='ml-[9px] font-[lato]'>{leaderBoard.correctAnswers} Correct answer</span>
              </div>
              <div className='ml-[6%] mt-[1%] content-result-left-box'>
                <img className='h-[30px] w[30.px] block inline '
                  src={current}
                  alt="Calendar Icon"
                />
                <span className='ml-[9px] font-[lato]'>Attempted {leaderBoard.attemptedQuestions} questions</span>
              </div>
            </div>
            <div className='content-result-right'>
              <div className='content-result-right-box'>
                <div className='w-[200px] rounded-md transform -translate-y-1/2 content-result-right-box-round'>{percentage}%</div>
                <div className='w-[200px] rounded-md content-result-right-box-round grade'>{Grade} {passed ? "Grade" : "Fail"}</div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src={homeImage} alt="home Image" className="float-right" /> */}.
        <img src={chartbots1} alt="home Image" className="h-[400px] w-full max-w-[641px] ml-[0%] mt-[8%] mr-[3%]" />
      </div>
      <div className='button'>
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
</div>


      {showAnswers && <SampleAnswerBoard q={randomQuestions} />}
    </div>
  );
}

export default Samplequiz;
