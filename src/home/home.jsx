import React, { useState} from "react";
import "./home.css";
import homeImage from "/images/Homeimage.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderSection from "../HeaderSection/HeaderSection";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";
//import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [started,setStarted] = useState(false);
  const[index,setIndex] = useState(1);
  const [question1,setQuestion1] = useState();
  const [question2,setQuestion2] = useState(); 
  const [question3,setQuestion3] = useState();
  const [question4,setQuestion4] = useState();
   const navigate = useNavigate();
  const handleClick3 = () => {
    navigate("/contact");
  };
  const handleOnClickButton = () => {
    setStarted(true);
  }
  const handleOnClickNext = () => {
    setIndex(index + 1);
  }
  const handleOnClickPrevious = () => {
    setIndex(index - 1);
  }

  const handleOnClickQuestion1 = (e) => {
    e.target.value
  console.log('e.target.value', e.target.value);
  console.log('checked',checked)

  }
  const handleOnClickQuestion2 = (e) => {
    e.target.value
  console.log('e.target.value', e.target.value);
  console.log('checked',checked)
    

  }

  const handleOnClickQuestion3 = (e) => {
    e.target.value
    console.log('e.target.value', e?.target?.value);
    ;
    console.log('checked',e?.target.checked)
  }
  const handleOnCkickQuestion4 = (e)=>{
    e.target.value
    console.log('e.target.value', e.target.value);
    console.log('checked',checked)
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

    const setPhoneNumber = (e) =>{
         const inputValue = e.target.value;
         if (/^[0-9]{10}$/.test(inputValue)){
          setPhoneNumber(inputValue);
         }
    }

    const setUserEmail = (e) => {
      const inputValue = e.target.value;
      if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
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
  return (
    <div>
    <HeaderSection/>
    <div>
    <div className="flex flex-col md:flex-row p-5 main">
  <div className="w-full md:w-1/2 pl-0 md:pl-20 mt-[-8px] justify-center">
  <h1 className=" font-Poppins font-bold text-[#555555] leading-[50px] text-center md:text-left">
          <span  className="text">Exploring online resources for AI-generated Exams and Quizzes</span>
        </h1>
       {!started  && <div className ="card">
          <div className="cardText">
              <label className="title"> What Is QuizifAI</label>
              {/* <span className="subText">QuizifAI is a SaaS platform powered by AI that transforms textbooks and PDFs into quizzes, making exam and quiz management easier for teachers. Additionally, it provides targeted quizzes for effective competitive exam preparation.</span> */}
              <ol>
                <li className="description">• QuizifAI is a SaaS (Software as a Service) platform.</li>
                <li className="description">• It is powered by AI (Artificial Intelligence).</li>
                <li className="description"> • Transforms textbooks and PDFs into quizzes.</li>
                <li className="description">•  Simplifies exam and quiz management.</li>
                <li className="description">• Provides targeted quizzes for competitive exam preparation.</li>

              </ol>
              {/* <span>If you want to check out our trial quiz, please take a look at this SAMPLE QUIZ.</span> */}
              <p><span className="description">If you want to check out our trial quiz, please take a look at this</span> 
              <span className="sample">Sample Quiz</span></p>
              <button  onClick={handleOnClickButton}className= "w-[103px] h-9 bg-[rgb(0,9,139)] text-white font-Poppins text-[13px] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110 ml-167 m 0 auto  mt-20 ">Get Started</button>
  
          </div>                       
        </div>
        }
        {/* <ThumbDownAltIcon /> */}
        {started && <>
        
        {index === 1 &&  <ul className="questions">
          <li className="question1">1.Which country hosts the international air exercise ‘Tarang Shakti 2024’?</li>
          <li>
            <div>
              <div className="subdiv">
                <div className="option">
                  <input onChange={handleOnClickQuestion1} type="radio" name="options" value="UK"></input>
                  <label className="p-2" for ="UK">UK</label> 
                </div>
                <div className="option">
                  <input onChange = {handleOnClickQuestion2} type = "radio" name="options" value=" India"></input>
                  <label className="p-2" for ="India">India</label>
                </div>
              </div>
              <div className="subdiv2">
                <div className="option">
                  <input onChange = {handleOnClickQuestion3} type = "radio" name="options" value=" Germany"></input>
                  <label className="p-2"for = " Germany">Germany</label>
                </div>
                <div className="option">
                  <input onChange={handleOnCkickQuestion4} type = "radio" name="options" value="France"></input>
                  <label for ="France">France</label>
                </div>
              </div>
            </div>
          </li>
          {/* <button onClick={handleOnClickNext}>Next</button> */}
        </ul>}
        {/* {index != 5 && <button onClick={handleOnClickNext}>Next</button>} */}
        { index === 2 && <ul className="questions">
          <li>
          2.Krishnaraja Sagar (KRS) Dam, recently seen in the news, is located in which state?</li> 
          <li>
          <div>
              <div className="subdiv">
                <div className="option">
                  <input onChange={handleOnClickQuestion1} type="radio" name="options" value=" Karnataka"></input>
                  <label className="p-2" for =" Karnataka">Karnataka</label> 
                </div>
                <div className="option">
                  <input onChange = {handleOnClickQuestion2} type = "radio" name="options" value=" Tamil Nadu"></input>
                  <label className="p-2" for ="Tamil Nadu">Tamil Nadu </label>
                </div>
              </div>
              <div className="subdiv2">
                <div className="option">
                  <input onChange = {handleOnClickQuestion3} type = "radio" name="options" value="  Gujarat"></input>
                  <label className="p-2"for = "  Gujarat"> Gujarat</label>
                </div>
                <div className="option">
                  <input onChange={handleOnCkickQuestion4} type = "radio" name="options" value="Kerala"></input>
                  <label for ="Kerala">Kerala</label>
                </div>
              </div>
            </div>
          </li>
        </ul>}
        { index === 3 && <ul className="questions">
          <li>3.“Jhumur”, recently seen in the news, is a traditional dance performed in which state?</li>
          <li>
          <div>
              <div className="subdiv">
                <div className="option">
                  <input onChange={handleOnClickQuestion1} type="radio" name="options" value="Nagaland"></input>
                  <label className="p-2" for ="Nagaland">Nagaland</label> 
                </div>
                <div className="option">
                  <input onChange = {handleOnClickQuestion2} type = "radio" name="options" value=" Sikkim"></input>
                  <label className="p-2" for ="Sikkim">Sikkim</label>
                </div>
              </div>
              <div className="subdiv2">
                <div className="option">
                  <input onChange = {handleOnClickQuestion3} type = "radio" name="options" value=" Assam"></input>
                  <label className="p-2"for = " Assam">Assam</label>
                </div>
                <div className="option">
                  <input onChange={handleOnCkickQuestion4} type = "radio" name="options" value="Manipur"></input>
                  <label for ="Manipur">Manipur</label>
                </div>
              </div>
            </div>
            </li>
            </ul>}
            
            { index === 4 && <ul className="questions">
              <li>4.What is Parkinson’s disease, recently seen in the news?</li>
              <li>

              <div>
              <div className="subdiv">
                <div className="option">
                  <input onChange={handleOnClickQuestion1} type="radio" name="options" value="A cardiovascular disorder"></input>
                  <label className="p-2" for ="A cardiovascular disorder">A cardiovascular disorder</label> 
                </div>
                <div className="option">
                  <input onChange = {handleOnClickQuestion2} type = "radio" name="options" value="  A progressive neurological disorder"></input>
                  <label className="p-2" for =" A progressive neurological disorder"> A progressive neurological disorder</label>
                </div>
              </div>
              <div className="subdiv2">
                <div className="option">
                  <input onChange = {handleOnClickQuestion3} type = "radio" name="options" value=" A respiratory illness"></input>
                  <label className="p-2"for = " A respiratory illness">A respiratory illness</label>
                </div>
                <div className="option">
                  <input onChange={handleOnCkickQuestion4} type = "radio" name="options" value=" A type of cancer"></input>
                  <label for =" A type of cancer"> A type of cancer</label>
                </div>
              </div>
            </div>
              </li>
            </ul>}
            { index === 5 && <ul className="questions">
              <li>5.Recently, who has become the first woman to be appointed the Director General of Medical Services?</li>
              <li>
              <div>
              <div className="subdiv">
                <div className="option">
                  <input onChange={handleOnClickQuestion1} type="radio" name="options" value="Lt Gen Punita Arora"></input>
                  <label className="p-2" for ="Lt Gen Punita Arora">Lt Gen Punita Arora</label> 
                </div>
                <div className="option">
                  <input onChange = {handleOnClickQuestion2} type = "radio" name="options" value=" Lt Gen Sadhna Saxena Nair"></input>
                  <label className="p-2" for ="Lt Gen Sadhna Saxena Nair">Lt Gen Sadhna Saxena Nair</label>
                </div>
              </div>
              <div className="subdiv2">
                <div className="option">
                  <input onChange = {handleOnClickQuestion3} type = "radio" name="options" value=" Lt Gen Madhuri Kanitkar"></input>
                  <label className="p-2"for = " Lt Gen Madhuri Kanitkar">Lt Gen Madhuri Kanitkar</label>
                </div>
                <div className="option">
                  <input onChange={handleOnCkickQuestion4} type = "radio" name="options" value="Lt Gen Kavita Sahai"></input>
                  <label for ="Lt Gen Kavita Sahai">Lt Gen Kavita Sahai</label>
                </div>
              </div>
            </div>
                </li>
            </ul>}
        </>}
        { started && index != 5 &&  <button className="next" onClick={handleOnClickNext}>Next</button>}
        { started && index != 1 && index !== 5  && <button className="previous" onClick={handleOnClickPrevious}>previous</button>}
        {started && index == 5 && <button className="submit">Submit</button>}
        
  </div>
  {activeSection === "home" && (
    <div className="w-full md:w-1/2 pr-0 md:pr-[70px] pt-4 md:pt-20 flex flex-col justify-center items-center md:items-end">
      <div className="relative mt-4 md:mt-[-134px]">
      <img src={homeImage} alt="home Image" className="w-full" />
        <div className="flex flex-col items-center mt-4 ml-[120px] lg:ml-[1px]">
          <Link to={"/signup"} >
          <button className= "w-[103px] h-9 bg-[rgb(0,9,139)] text-white font-Poppins text-[13px] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110 ml-167  ">
        Try QuizifAI
        </button>

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

