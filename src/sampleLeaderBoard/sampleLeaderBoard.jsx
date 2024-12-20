
import React, { useEffect, useState,useRef } from 'react';
//import styles from './quiz_results.module.css';
import LeftBar from '../leftbar/leftbar';
import createdIcon from "../../src/assets/Images/images/quiz-Access/created.png";
import descriptionIcon from "../../src/assets/Images/images/quiz-Access/description.png";
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png"; 
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import current from "../../src/assets/Images/images/quizresults/faq.png"
import titleIcon from "../../src/assets/Images/images/quiz-Access/title.png";
import categoryIcon from "../../src/assets/Images/images/quiz-Access/category.png";
import ranksIcon from "../../src/assets/Images/images/quizresults/ranks.png"; 
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rankScoreIcon from "../../src/assets/Images/images/quizresults/rankscore.png";
import greybox1Image from "../../src/assets/Images/images/quizresults/greybox1.png";  
import greybox2Image from "../../src/assets/Images/images/quizresults/greybox2.png";
import greybox3Image from "../../src/assets/Images/images/quizresults/greybox3.png"; 
import rightIcon from "../../src/assets/Images/images/quizresults/right.png"; 
import one1Image from "../../src/assets/Images/images/quizview/one1.png";
import iconA from "../../src/assets/Images/images/questions/IconA.png"
import iconB from "../../src/assets/Images/images/questions/IconB.png";
import iconC from "../../src/assets/Images/images/questions/IconC.png";
import iconD from "../../src/assets/Images/images/questions/IconD.png";
import answerTimerIcon from "../../src/assets/Images/images/quizresults/answerTimer.png"; 
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png"; 
import wrongIcon from "../../src/assets/Images/images/quizresults/wrong.png";
import wrongIcon1 from "../../src/assets/Images/images/quizresults/wrongicon.png";
import two2Icon from "../../src/assets/Images/images/quizview/two2.png";
import three3Icon from "../../src/assets/Images/images/quizview/three3.png"; 
import four4Icon from "../../src/assets/Images/images/quizview/four4.png";
import { useLocation } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import fistrank from '../../src/assets/Images/images/quizresults/FirstRank.png'
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png"
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const quiz_results = () => {
  const [quizData, setQuizData] = useState(null);
  const [quizData1, setQuizData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false); // State to track quiz submission
  const resultRef = useRef();
 
  const optionLabels = {
    option1: 'A',
    option2: 'B',
    option3: 'C',
    option4: 'D'
  };

 useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const quizId = localStorage.getItem("quiz_id");
    const attemptNo = localStorage.getItem("quiz_level_attempt_id");

    const fetchQuizReport = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); 

        if (!authToken) {
          console.error('No authentication token found');
          return;
        }
        const response = await fetch('https://dev.quizifai.com:8010/quiz_report', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`, 
          },
          body: JSON.stringify({
            quiz_id: quizId,
            user_id: userId,
            attempt_no: attemptNo
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuizData1(data.data);
      } catch (error) {
        console.error('Error fetching quiz report:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizReport();
  }, []);

  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");
    const attemptNo = localStorage.getItem("quiz_level_attempt_id");

    const sendQuizResult = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

  if (!authToken) {
    console.error('No authentication token found');
    return;
  }
        const response = await fetch('https://dev.quizifai.com:8010/quiz_result_view', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`, 
          },
          body: JSON.stringify({
            user_id: userId,
            quiz_id: quizId,
            attempt_id: attemptNo
          })
        });
        const result = await response.json();
        const data = result.data[0];
        setQuizData(data);
        console.log('Quiz result submitted:', data);
        setIsQuizSubmitted(true); 
      } catch (error) {
        console.error('Error submitting quiz result:', error);
        setIsQuizSubmitted(false); 
      }
    };

    if (quizId && attemptNo) {
      sendQuizResult(); 
    }
  }, [userId]);

  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");

    const fetchLeaderboardData = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); 

  if (!authToken) {
    console.error('No authentication token found');
    return;
  }
        const response = await fetch('https://dev.quizifai.com:8010/leaderboard_result', {
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
        } else {
          console.error('Failed to fetch leaderboard data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    if (isQuizSubmitted) { 
      fetchLeaderboardData();
    }
  }, [isQuizSubmitted]);

  if (!quizData) {
    return <div>Loading...</div>;
  }
  if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error loading quiz data: {error.message}</div>;
    }
  
    if (!quizData1 || !quizData1.questions) {
      return <div>No quiz data available</div>;
    }
  const Back = () => {
  navigate(`/dashboard`);
};
  const questions = quizData1.questions;
  const topThree = leaderboardData.slice(0, 3);
  const handleDownload = () => {
    const input = resultRef.current;
    if (input) {
      html2canvas(input, { useCORS: true, scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${quizData.quiz_name}_results.pdf`);
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('resultRef is not attached to any DOM element');
    }
  };
  return (

    <div className={styles.container}>
      <Navigation/>
      
      <div className={styles.mainContent}  ref={resultRef}>
      <div className={styles.back1} onClick={Back}><MdOutlineCancel /></div>

        <div className={styles.header}>
        <div className={styles.titleContainer}>
        
          <div className={styles.downloads} >
         <div className={styles.download} >
 
            <span className={styles.quizname}>{quizData.quiz_name}</span>
         </div>
          </div>

               <p className={styles.quizdescription}>{quizData.quiz_description}</p>
         
              <div className={styles.flexrow}>
               <div className={styles.Createdbyupdated}>
               <div className={styles.Questions}>

           <span className={styles.Question} >Questions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>{" "}
           <span className={styles.username1} >{`${quizData.total_questions}`}</span>
     </div>
    <div>

              <span className={styles.Question} >Total Marks&nbsp;&nbsp;:</span>{" "}
                <span className={styles.username1} >{`${quizData.quiz_total_marks}`}</span>
    </div>
                <div className={styles.Created}>

               <span className={styles.Createdby} >Created By&nbsp;&nbsp;&nbsp;&nbsp;:</span>{" "}
               <span className={styles.username} >{`${quizData.created_by}`}</span>
                </div>
        
           <div>

             <span className={styles.Createdby} >Created On&nbsp;&nbsp;&nbsp;&nbsp;:</span>{" "}
               <span className={styles.username} >{`${quizData.created_on}`}</span>
           </div>
          </div>
               <div className={styles.Questionslines }>
      
              <div>

              <span className={styles.Question} >Duration :</span>{" "}
             <span className={styles.username1} >{`${quizData.quiz_duration}`} min</span>
             </div>
       
          <div>

             <span className={styles.Question } >Pass Percentage :</span>{" "}
            <span className={styles.username1} >{`${quizData.pass_percentage}`}</span>
         </div>

          </div>
           <div className={styles.Questionslines }>
      
    

         <div>

            <span className={styles.Question } >Complexity :</span>{" "}
            <span className={styles.username1} >{`${quizData.complexity}`}</span>
        </div>
        </div>
        </div>
        </div>
        
          
     
             <div className={styles.horizontalLine}></div>
             <div className={styles.wrapper}>
             <div className={styles.sentenceBox}>
             <div className={styles.verticaliconsContainer}>
             <h1  className={styles.verticalicon2} >{quizData.rank}</h1>
             <img
            src={rankimage} 
            alt="Icon 1"
            className={styles.verticalicon1}
  />
         <h1 className={styles.rank1}>Your Rank</h1>
         </div>
         <div className={styles.sentencesContainer}>
         <div className={styles.sentence}>
        <img
         src={dateIcon} 
         alt="Calendar Icon"
         className={styles.icon2}
  />
          <span>Taken on {quizData.quiz_start_date}</span>
        </div>
        </div>
        <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Spent {quizData.attempt_duration}</span>
        </div>
       
        
      </div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={current}
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Attempted {quizData.attempted_questions} Questions</span>
        </div>
        </div>
        
        <div className={styles.sentence1}>
        <img
    src={vector} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.correct_answers} Correct answer</span>
        </div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span className={styles.sentence3}>You have scored {quizData.attained_score_percentage}%, {quizData.quiz_grade} Grade,<span className={`${quizData.pass_flag ? styles.pass : styles.fail}`}>{quizData.pass_flag ? 'Pass' : 'Fail'}</span></span>
        </div>
      </div>
        </div>
       <div className={styles.ranksiconsContainer}>
        <img
    src={rank1Icon} 
    alt="Icon 1"
    className={styles.rankicon2}
     />     
      <img
     src={rank2Icon} 
     alt="" 
     className={styles.rankicon1}
  />
           <img
    src={rank3Icon} 
    alt="Rank 3 Icon"
    className={styles.rankicon3}
  />
        </div>
        <div className={styles.ranksiconsContainer1}>
     <p className={styles.second}>1<span  className={styles.st}>st</span></p>
        <p className={styles.fist}>2<span  className={styles.st}>nd</span></p> 
      
        <p className={styles.thired}>3<span  className={styles.st}>rd</span></p>
        </div>
         <div className={styles.innerBoxes1}>
        <div className={styles.innerBox1} style={{width:"122px", height:"93px",}}>
        
           </div>
          <div className={styles.innerBox2} style={{width:"122px", height:"118px", marginbottom:"23px"}}>
   
            
           </div>
          <div className={styles.innerBox3} style={{width:"122px", height:"93px",}}>
          
            
          </div>
        </div>    
 
    <div>
      <div className={styles.innerBoxes}>
        {topThree.map((entry, index) => {
          
        

          return (
            <div key={entry.rank}  >
              
              <span className={styles[`textOverImage${index + 1}`]} >
                {entry.user_name} <br /> <span style={{color:'#e20000'}}>{entry.attained_percentage}</span>
              </span>
             
            </div>
          );
        })}
      </div>
      <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={`${styles.column} ${styles.userName}`}>User Name</span>
    <span className={styles.column}>Percentage</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div>
      {leaderboardData.slice(0,10).map((entry, index) => (
        <div key={entry.rank} className={styles.values}>
        <div className={`${styles.value} ${styles.rank}`}>{entry.rank}</div>
        <div className={`${styles.value} ${styles.userName}`}>{entry.user_name}</div>
        <div className={`${styles.value} ${styles.percentage}`}>{entry.attained_percentage}</div>
        <div className={`${styles.value} ${styles.attempts}`}>{entry.attempts_count}</div>
        <div className={`${styles.value} ${styles.duration}`}>{entry.attempt_duration_mins}</div>
      </div>
      ))}
    </div>
    </div>
    </div>
    <div className={styles.horizontalLine} style={{marginTop:"0px"}}></div>
    <div className={styles.boxContainer}>
      <div className={styles.parentContainer}>
      {questions.map((question, index) => (
        <div className={styles.sentencesContainer1} style={{ marginLeft: "0px", marginTop: "40px", height:"220px" }} key={index}>
          <div className={styles.sentence}>
           
             <span style={{ color: "#F4774B" }}>{index + 1}. {question.question_text}</span>
           
          </div>

          {Object.keys(question.options).map((optionKey, idx) => {
            const optionText = question.options[optionKey];
            const isSelected = optionText === question.selected_option;
            const isCorrect = optionText === question.correct_option;

            return (
              <div className={styles.box} key={idx} style={{ backgroundColor: isCorrect ? '#A9FFB7' : isSelected ? '#FFB7B7' : 'white' }}>
                <div className={styles.iconA}>
                  
                  <span className={styles.iconText}>{optionLabels[optionKey]}. {optionText}</span>
                </div>
              </div>
            );
          })}

<span className={styles.newContainer}>
            <span className={styles.iconContainer}>
              
              <img
                src={question.selected_option === question.correct_option ? rightIcon1 : wrongIcon1}
                alt="Answer Icon"
                className={styles.icon6}
              />
            </span>
            <span className={styles.textContainer}>
              
              <p>{question.selected_option === question.correct_option ? 'Correct Answer' : 'Wrong Answer'}</p>
            </span>
          </span>
        </div>
      ))}
      </div>
    </div>
      
        </div>
         <LogoutBar/>
      </div>
      
    
  );
};

export default quiz_results;
