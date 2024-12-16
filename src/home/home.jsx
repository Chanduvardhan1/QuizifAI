import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import homeImage from "/images/oldimage.png";
// import chatbots from "../../public/images/chatbots.jpg";
import chartbots1 from "../../public/chatbots1.png";
import HeaderSection from "../HeaderSection/HeaderSection";
import SampleLeaderBoard from "../sample/sampleLeaderBoard";
import { questions } from "./Constants";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { setDynamicStateFlags, setAttempted, getContactUsEmail, saveUserAttemptedQuestions } from "./slice";
import Slides from "../slides/slides";
import previousicon from "../../public/backSide.png";
import nextbutton from "../../public/images/nimage.png";
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
    attempted,
    leaderBoard
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
      handleAttemptedQuestions();
      dispatch(setAttempted({
        isAttempted: false,
        answeredIndex: null,
        isCorrect: false,
      }));
    }

    const handleAttemptedQuestions = () => {
      const obj = { ...leaderBoard }
      const list = [...leaderBoard.attemptedQList]
      if (attempted.isCorrect) {
        obj.correctAnswers = leaderBoard.correctAnswers + 1;
      }
      if (!obj.attemptedQList.includes(index)) {
        obj.attemptedQuestions = leaderBoard.attemptedQuestions + 1;
        list.push(index);
      }
      obj.attemptedQList = list;
      dispatch(saveUserAttemptedQuestions(obj))
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

  // useEffect(() => {
  //   if (started) {
  //     timer();
  //   }
  // }, [started]);

  const handleAnswerClick = (value, question, answeredIndex) => {
    const isCorrect = value === question.answer;
    dispatch(setAttempted({
      isAttempted: true,
      answeredIndex,
      isCorrect
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
    handleAttemptedQuestions();
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
  useEffect(() => {
    dispatch(setDynamicStateFlags({ key: 'randomQuestions', value: randomQuestions }))
  }, [])
  return (
    <div>
      <HeaderSection />
      <div>
        <div className="flex flex-col md:flex-row p-5 main">
          <div className="wrapper">
            {!started && <span className=" font-['Segoe_UI_Historic'] font-bold text-[#555555] leading-[50px] text-center md:text-left">
              <span className="text1"> Discovering Online References for AI-Generated Exams and Quizzes</span>
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
                  <span className="heading"> Current Affairs</span>
                  <h2 className="challenge" >Stay updated! Challenge yourself with our quiz on recent events and global happenings. How well do you know the news? </h2>
                  <span className="challenge">Curriculum . General . Simple</span>
                </div>

              </div>


              <div className="mainDiv">
                <div className="subDiv">
                  <li className=" font-[14px] font-[lato]   bg-[#DEEFF5] cursor-pointer w-[100%] rounded-[5px] border-solid border-[#ADD8E6] border-[1.5px] p-[10px] text-[15px] text-[#00008B]   li questions ">

                    <div>{`${index}. ${q.question}`}</div>

                  </li>
                  <li className="q-w">
                    {q.options?.map((option, x) => {
                      return (
                        <div key={x} className={`flex items-center mb-4`}>
                          <div onClick={(e) => handleAnswerClick(option.answer_option_text, q, x)}
                            className={`
                                ${(x === attempted.answeredIndex && attempted.isAttempted) ? 'correctAnswer' : ''}
                                 
                              mr-2 font-normal w-[40px] rounded-[5px] h-[37px] p-[8px] border-[1px] border-solid border-[#D3D3D3]  bg-[#E8E9E8]  flex justify-center text-center justify-items-center items-center text-[14px] font-[lato] cursor-pointer`}>
                            {String.fromCharCode(97 + x).toUpperCase()}
                          </div>
                          <div
                            type="text"
                            placeholder="Question"
                            onClick={(e) => handleAnswerClick(option.answer_option_text, q, x)}
                            className={`
                                  ${(x === attempted.answeredIndex && attempted.isAttempted) ? 'correctAnswer' : ''}
                                  
                                 w-[100%] bg-[#E8E9E8] cursor-pointer  h-[37px] rounded-[5px] border-solid border-[#D3D3D3] border-[1.8px] p-[5px] text-[14px] text-[#000] font-[lato]`}
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
            <div className="flex gap-1 justify-end">

            {started && index > 1 &&  (
              <button className="w-[13%] text-[#00008b] text-[14px] bg-[#ADD8E6] border-[1px] border-[#2196F3] cursor-pointer pt-[1px] pl-[11px] flex items-center rounded-[5px]" onClick={handleOnClickPrevious}>
                <img className="previous-icon" src={previousicon} /> Prev
              </button>
            )}
            {started && index != 5 && <button  className="w-[13%] text-[#00008b] text-[14px] bg-[#ADD8E6] border-[1px] border-[#2196F3] cursor-pointer pt-[1px] pl-[11px] flex items-center rounded-[5px]"onClick={handleOnClickNext}>Next <img className="h-[17px] ml-3 " src={nextbutton} /> </button>}
            {/* {started && index != 1 && <button className="previous" onClick={handleOnClickPrevious} > <img className="previous-icon" src={previousicon} /> Prev </button>} */}
           
            {started && index === 5 && <button onClick={handleOnClickSubmit}  className="w-[13%] text-[#00008b] text-[14px] bg-[#ADD8E6] border-[1px] border-[#2196F3] cursor-pointer pt-[1px] pl-[11px] flex items-center rounded-[5px]">Submit </button>}
            </div>
          </div>
          {activeSection === "home" && (
            <div className="w-50% md:w-1/2 pr-0 md pt-4 md:pt-20 flex flex-col justify-center items-center md:items-end mt-[12%],ml-[2%]">
              <div className="relative mt-4 md:mt-[-134px]">
                {/* <img src={homeImage} alt="home Image" className="image" /> */}
                {/* <img src={chatbots} alt="home Image" className="w-[100%] ml-[-11%] h-[120%] mb-[7%] width={500} height={500}"/> */}
                {/* <img src={chatbots} alt="home Image" className="h-[500px] w-[650px]"/> */}
                <img src={chartbots1} alt="home Image" className="h-[400px] w-[92%] max-w-[641px] ml-[8%] mt-[8%]"/>
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