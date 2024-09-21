import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import homeImage from "../../public/images/oldimage.png";
import HeaderSection from "../HeaderSection/HeaderSection";
import SampleLeaderBoard from "../sample/sampleLeaderBoard";
import { questions } from "./Constants";
import "./home.css";

function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(1);
  const [submit, setSubmit] = useState('false');
  const [attempted, setAttempted] = useState({
    isAttempted: false,
    answeredIndex: null,
    isCorrect: false,
  });
  const [countTimer, setCountTimer] = useState(null);
  const[visibleText,setVisibleText] = useState('false');
  const navigate = useNavigate();
  const handleClick3 = () => {
    navigate("/contact");
  };
  const handleOnClickButton = () => {
    setStarted(true);
  }
  const handleOnClickNext = () => {
    setIndex(index + 1);
    setAttempted(false);
  }
  const handleOnClickPrevious = () => {
    setIndex(index - 1);
  }

  const padZero = (number) => {
    return (number < 10 ? "0" : "") + number;
  }

  const timer = () => {
    let duration = 5*60;
    setInterval(function() {
      // Calculate the remaining time
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
    
      // Format the time as MM:SS
      const time = `${padZero(minutes)}:${padZero(seconds)}`;
    
      // Display the time
      setCountTimer(`Duration ${time}`);
    
      // Decrement the duration
      duration--;
    
      // Stop the countdown when it reaches 0
      if (duration < 0) {
        clearInterval(this);
        setCountTimer("Time's up!");
      }
    }, 1000);
  }

  useEffect(() => {
    if (started) {
      timer();
    }
  }, [started]);

  const handleAnswerClick = (value, question, answeredIndex) => {
    const isCorrect = value === question.answer;
    setAttempted({
      isAttempted: true,
      answeredIndex,
      isCorrect,
    });
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

    setSubmitted(true);

    const setPhoneNumber = (e) => {
      const inputValue = e.target.value;
      if (/^[0-9]{10}$/.test(inputValue)) {
        setPhoneNumber(inputValue);
      }
    }

    const setUserEmail = (e) => {
      const inputValue = e.target.value;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
        setUserEmail(inputValue);
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
      setFirstName("");
      setMessage("");
      setLastName("");
      setPhoneNumber("");

      setUserEmail("");
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
    //console.log('dsdddf');
    setSubmit(true);
  }
  // console.log('submit',submit);
  const q = questions[index - 1];
  return (
    <div>
      <HeaderSection />
      <div>
        <div className="flex flex-col md:flex-row p-5 main">
          <div className="w-full md:w-1/2 pl-0 md:pl-20 mt-[-8px] justify-center">
            {!started && <h1 className=" font-Poppins font-bold text-[#555555] leading-[50px] text-center md:text-left">
               <span className="text">Exploring online resources for AI-generated Exams and Quizzes</span> 
            </h1>}
            {!started && <div className="card">
              <div className="cardText">
                {/* <label className="title"> What Is QuizifAI</label> */}
                {/* <span className="subText">QuizifAI is a SaaS platform powered by AI that transforms textbooks and PDFs into quizzes, making exam and quiz management easier for teachers. Additionally, it provides targeted quizzes for effective competitive exam preparation.</span> */}
                <ol>
                  <li className="description">• QuizifAI is a SaaS  platform.</li>
                  <li className="description">• It is powered by AI (Artificial Intelligence).</li>
                  <li className="description"> • Transforms textbooks and PDFs into quizzes.</li>
                  <li className="description">•  Simplifies exam and quiz management.</li>
                  <li className="description">• Provides targeted quizzes for competitive exam preparation.</li>

                </ol>
                {/* <span>If you want to check out our trial quiz, please take a look at this SAMPLE QUIZ.</span> */}
                <p><span className="description">If you want to check out our trial quiz, please take a look at this</span>
                  <span className="sample">Sample Quiz</span></p>
                <button onClick={handleOnClickButton} className="w-[103px] h-9 bg-[rgb(0,9,139)] text-white font-Poppins text-[13px] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110 ml-167 m 0 auto  mt-20 ">Try Quiz</button>

              </div>
            </div>
            }
            {/* <ThumbDownAltIcon /> */}
            {started && <>
              <div> Current Affairs</div>
              <h2>Test your knowledge </h2>
              <div>Questions 5</div>
              <div>Duration: 5 min</div>
              <div>Complexity : Simple</div>
              <div className="timer">{countTimer}</div>
              <li className="w-[100%] h-[40px] rounded-[5px] border-solid border-[#B8BBC2] border-[1.5px] p-[10px] text-[14px] text-[#21408] font-bold">
                <div>{`${index}. ${q.question}`}</div>
                
              </li>
              
              <li style={{ marginTop: 15 }}>
                {q.options.map((option, x) => {
                  return (
                    <div key={x} className={`flex items-center mb-4`}>
                      <div className="mr-2 font-normal w-[40px] rounded-[5px] p-[8px] border-[1px] border-solid border-[#B8BBC2] flex justify-center text-center justify-items-center items-center text-[14px]">
                        {String.fromCharCode(97 + x).toUpperCase()}
                      </div>
                      <div
                        type="text"
                        placeholder="Question"
                        onClick={(e) => handleAnswerClick(option.answer_option_text, q, x)}
                        className={`
                          ${(x === q.answerIndex && attempted.isAttempted) ? 'correctAnswer' : ''}
                          ${(x === attempted.answeredIndex && x !== q.answerIndex) ? 'wrongAnswer' : ''}
                          w-[90%] h-[40px] rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] p-[10px] text-[14px] text-[#214082] font-bold`}
                      >
                        {option.answer_option_text}
                      </div>

                    </div>
                  )
                })}
              </li>
            </>}
            {started && index != 5 && <button className="next" onClick={handleOnClickNext}>Next</button>}
            {started && index != 1 && index !== 5 && <button className="previous" onClick={handleOnClickPrevious}>Previous</button>}
            {started && index == 5 && <button onClick={handleOnClickSubmit} className="submit">Submit </button>}


          </div>
          {activeSection === "home" && (
            <div className="w-full md:w-1/2 pr-0 md:pr-[70px] pt-4 md:pt-20 flex flex-col justify-center items-center md:items-end">
              <div className="relative mt-4 md:mt-[-134px]">
                <img src={homeImage} alt="home Image" className="w-full" />
                <div className="flex flex-col items-center mt-4 ml-[120px] lg:ml-[1px]">
                  <Link to={"/signup"} >
                    {/* <button className= "w-[103px] h-9 bg-[rgb(0,9,139)] text-white font-Poppins text-[13px] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110 ml-167  ">
        Try QuizifAI
        </button> */}

                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {submit && <SampleLeaderBoard />}
    </div>
  );
}

export default Home;