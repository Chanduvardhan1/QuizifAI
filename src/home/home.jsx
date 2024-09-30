import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import homeImage from "/images/oldimage.png";
// import homeImage from "../images/newHome.png";
import HeaderSection from "../HeaderSection/HeaderSection";
import SampleLeaderBoard from "../sample/sampleLeaderBoard";
import { questions } from "./Constants";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { setDynamicStateFlags, setAttempted, getContactUsEmail ,saveUserAttemptedQuestions} from "./slice";
import Slides from "../slides/slides";
import current from "../../public/current.png";
import User from "../../public/user.png";
import Calender from "../../public/calendar.png";
import Question from "../../public/question.png";
import clockIcon from "../../public/timeicon.png";
import Play from "../../public/play.png";
import timmer from "../../public/timmerimg.png";;
import highScore from "../../public/highscore.png";
import previousicon from "../../public/images/previousicon.png";
import nextbutton from "../../public/images/nextbutton.png";
import { getRandomElements } from "../utils";

let randomQuestions;

function Home() {
  const [intervalT, setIntervalT] = useState(null);
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    phoneNumber,
    userEmail,
    submitted,
    started,
    index,
    countTimer,
    visibleText,
    activeSection,
    submit,
    attempted
  } = useSelector(state => state.home);
  const navigate = useNavigate();
  const handleClick3 = () => {
    navigate("/contact");
  };
  const handleOnClickButton = () => {
    dispatch(setDynamicStateFlags({ key: 'started', value: true }));
  }
  const handleOnClickNext = () => {
    dispatch(setDynamicStateFlags({ key: 'index', value: index + 1 }));
    dispatch(setAttempted({
      isAttempted: false,
      answeredIndex: null,
      isCorrect: false,
    }));
  }
  const handleOnClickPrevious = () => {
    dispatch(setDynamicStateFlags({ key: 'index', value: index - 1 }));
  }

  const padZero = (number) => {
    return (number < 10 ? "0" : "") + number;
  }

  const timer = () => {
    let duration = 5 * 60;
    const t = setInterval(function () {
      // Calculate the remaining time
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;

      // Format the time as MM:SS
      const time = `${padZero(minutes)}:${padZero(seconds)}`;

      // Display the time
      dispatch(setDynamicStateFlags({ key: 'countTimer', value: `Timer : ${time}` }))

      // Decrement the duration
      duration--;
      // Stop the countdown when it reaches 0
      if (duration < 0) {
        clearInterval(intervalT);
        dispatch(setDynamicStateFlags({ key: 'countTimer', value: `` }))
      }
    }, 1000);
    setIntervalT(t);
  }

  useEffect(() => {
    if (started) {
      timer();
    }
  }, [started]);

  const handleAnswerClick = (value, question, answeredIndex) => {
    const isCorrect = value === question.answer;
    dispatch(setAttempted({
      isAttempted: true,
      answeredIndex,
      isCorrect,
    }));
  }

  // Now you have access to the token
  const submitContactForm = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email_address: userEmail,
      message: message,
    };

    dispatch(setDynamicStateFlags({ key: 'submitted', value: true }));

    const setPhoneNumber = (e) => {
      const inputValue = e.target.value;
      if (/^[0-9]{10}$/.test(inputValue)) {
        dispatch(setDynamicStateFlags({ key: 'phoneNumber', value: inputValue }));
      }
    }

    const setUserEmail = (e) => {
      const inputValue = e.target.value;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
        dispatch(setDynamicStateFlags({ key: 'userEmail', value: inputValue }));
      };
    };

    try {
      const response = await fetch(
        "https://dev.quizifai.com:8010/contact_us_email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch(setDynamicStateFlags({ key: 'firstName', value: '' }));
      dispatch(setDynamicStateFlags({ key: 'message', value: '' }));
      dispatch(setDynamicStateFlags({ key: 'lastName', value: '' }));
      dispatch(setDynamicStateFlags({ key: 'phoneNumber', value: '' }));
      dispatch(setDynamicStateFlags({ key: 'userEmail', value: '' }));
      const responseData = await response.json();
      console.log(responseData);
      // Handle response data as needed
      navigate("/contact");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle error
    }
  };
  const handleOnClickSubmit = () => {
    dispatch(setDynamicStateFlags({ key: 'submit', value: true }));
    clearInterval(intervalT);
    dispatch(setDynamicStateFlags({ key: 'index', value: 1 }));
    dispatch(setDynamicStateFlags({ key: 'started', value: false }));
    navigate("/homeleaderboard");
  }
  useEffect(() => {
    randomQuestions = getRandomElements(questions, 5)
  }, [])
  const q = randomQuestions && randomQuestions[index - 1] || {};

  return (
    <div>
      <HeaderSection />
      <div>
        <div className="flex flex-col md:flex-row p-5 main">
          <div className="wrapper">
            {!started && <span className =" font-Poppins font-bold text-[#555555] leading-[50px] text-center md:text-left">
              <span className="text1"> Exploring online resources for AI-generated Exams and Quizzes</span>
            </span>}
            {!started && <div className="card">
              <div className="cardText">
                <div>
                  <Slides onClick={handleOnClickButton} />
                </div>
              </div>
            </div>
            }
            {started && <>
              <div className="main-div">
                <div className="mainHeading">
                  <span className="heading"> Quiz Title -NCERT Class 10,Physics Quiz</span>
                  <h2 className="challenge" >Challenge yourself with "Quizifai Daily Current Affairs"! Discover and learn about the latest news in a fun way! </h2>
                  <h3 className=".challenge">Curriculum .NCERT.8th Class.Moderate</h3>
                </div>

              </div>


              <div className="">
                <div className="subDiv">
                  <li className="w-[99%] h-[40px] rounded-[5px] border-solid border-[#808080] border-[1.5px] p-[10px] text-[14px] text-[#21408]  li">
                    <div>{`${index}. ${q.question}`}</div>

                  </li>
                  <li className="q-w">
                    {q.options?.map((option, x) => {
                      return (
                        <div key={x} className={`flex items-center mb-4`}>
                          <div onClick={(e) => handleAnswerClick(option.answer_option_text, q, x)} className="mr-2 font-normal w-[40px] rounded-[5px] p-[8px] border-[1px] border-solid border-[#808080] flex justify-center text-center justify-items-center items-center text-[10px]">
                            {String.fromCharCode(97 + x).toUpperCase()}
                          </div>
                          <div
                            type="text"
                            placeholder="Question"
                            onClick={(e) => handleAnswerClick(option.answer_option_text, q, x)}
                            className={`
                                ${(x === q.answerIndex && attempted.isAttempted) ? 'correctAnswer' : ''}
                                ${(x === attempted.answeredIndex && x !== q.answerIndex) ? 'wrongAnswer' : ''}
                                w-[64%] h-[40px] rounded-[5px] border-solid border-[#808080] border-[1.8px] p-[10px] text-[12px] text-[#000]`}
                          >
                            {option.answer_option_text}
                          </div>

                        </div>
                      )
                    })}
                  </li>
                </div>
              </div>

            </>}
            {started && index != 5 && <button className="next" onClick={handleOnClickNext}>Next <img className="h-[17px] ml-3" src={nextbutton} /> </button>}
            {started && index != 1 && index !== 5 && <button className="previous" onClick={handleOnClickPrevious} > <img className="previous-icon" src={previousicon} /> Prev </button>}
            {started && index === 5 && <button onClick={handleOnClickSubmit} className="submit">Submit </button>}

          </div>
          {activeSection === "home" && (
            <div className="w-50% md:w-1/2 pr-0 md pt-4 md:pt-20 flex flex-col justify-center items-center md:items-end">
              <div className="relative mt-4 md:mt-[-134px]">
                <img src={homeImage} alt="home Image" className="image" />
                <div className="flex flex-col items-center mt-4 ml-[120px] lg:ml-[1px]">
                  <Link to={"/signup"} >

                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;