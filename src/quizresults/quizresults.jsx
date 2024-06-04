// import Head from 'next/head';
// import Image from "next/image";
import React, { useEffect, useState } from 'react';
import styles from './quizresults.module.css';
import LeftBar from '../leftbar/leftbar';
import createdIcon from "../../src/assets/Images/images/quiz-Access/created.png";
import descriptionIcon from "../../src/assets/Images/images/quiz-Access/description.png"; 
import percentIcon from "../../src/assets/Images/images/quiz-Access/percent.png"; 
import titleIcon from "../../src/assets/Images/images/quiz-Access/title.png";
import categoryIcon from "../../src/assets/Images/images/quiz-Access/category.png";
import timeIcon from "../../src/assets/Images/images/quiz-Access/time.png";
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
import dateIcon from "../../src/assets/Images/images/quizview/date.png";
import answerTimerIcon from "../../src/assets/Images/images/quizresults/answerTimer.png"; 
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png"; 
import wrongIcon from "../../src/assets/Images/images/quizresults/wrong.png";
import wrongIcon1 from "../../src/assets/Images/images/quizresults/wrongicon.png";
import two2Icon from "../../src/assets/Images/images/quizview/two2.png";
import three3Icon from "../../src/assets/Images/images/quizview/three3.png"; 
import four4Icon from "../../src/assets/Images/images/quizview/four4.png";
import { useLocation } from 'react-router-dom';


const quizresults = () => {
  const [quizData, setQuizData] = useState(null);
  const location = useLocation();
  const { quizId, attemptNo } = location.state || {};
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    const fetchQuizReport = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/quiz_report', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quiz_id: quizId,
            user_id: userId,
            attempt_no: attemptNo
          })
        });
        const data = await response.json();
        setQuizData(data.data);
      } catch (error) {
        console.error('Error fetching quiz report:', error);
      }
    };

    fetchQuizReport();
  }, [quizId, attemptNo]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/leaderboard_result', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

    fetchLeaderboardData();
  }, [quizId]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    const sendQuizResult = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/quiz_result', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            quiz_id: quizId,
            attempt_id: attemptNo
          })
        });
        const result = await response.json();
        const data = result[0]?.data;
        setQuizData(data);
        console.log('Quiz result submitted:', data);
      } catch (error) {
        console.error('Error submitting quiz result:', error);
      }
    };

    if (quizId && attemptNo) {
      sendQuizResult(); // Trigger the POST request only if quizId and attemptNo are available
    }
  }, [quizId, attemptNo]);

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const questions = quizData.questions;
  const topThree = leaderboardData.slice(0, 3);

  return (

    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <LeftBar/>
      
      <div className={styles.mainContent}>
        <div className={styles.header}>
        <div className={styles.titleContainer}>
        <img
  src={titleIcon} 
  alt="User Icon"
  className={styles.icon1}
/>
          <span>{quizData.quiz_name}</span>
        </div>
        <div className={styles.infoContainer}>
        <img
  src={createdIcon} 
  alt="Calendar Icon"
  className={styles.icon2}
/>
          <span>user name<br></br>date</span>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
      <img
    src={descriptionIcon} 
    alt="Description Icon"
    className={styles.description}
  />
      <span className={styles.descriptionText}>{quizData.quiz_description}</span>
      </div>
     
      <div className={styles.horizontalLine}></div>
      <div className={styles.wrapper}>
      <div className={styles.sentenceBox}>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>You have scored {quizData.attained_score_percentage}%</span>
        </div>
       
        
      </div>
     
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.attempt_duration} spent for {quizData.total_questions}questions</span>
        </div>
       
        
      </div>

      {/* <div className={styles.sentencesContainer}>
        {/* <div className={styles.sentence}>
        <img
    src={categoryIcon} 
    alt="Category Icon"
    className={styles.icon2}
  />
          <span>1st attempt, You have 2 more attempts</span>
        </div> */}
       
        
      {/* </div>  */}
      
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={dateIcon}
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.attempted_questions} answered out of {quizData.total_questions} questions</span>
        </div>
        </div>
        <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={dateIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.attained_score} attained score</span>
        </div>
        
        </div>
        <div className={styles.sentence1}>
        <img
    src={dateIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.correct_answers} correct answer</span>
        </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.verticaliconsContainer}>
        <img
    src={ranksIcon} 
    alt="Icon 1"
    className={styles.verticalicon1}
  />
  <h1 className={styles.rank1}>Your rank</h1>
     <h1  className={styles.verticalicon2} >{quizData.rank}</h1>
      </div>
        </div>
        <div className={styles.horizontalLine} style={{marginTop:"0px"}}></div>
        <div className={styles.boxContainer1}>
          <div className={styles.titles}>
        <p className={styles.title}>Leaderboard</p>
        </div>
        
        <div className={styles.ranksiconsContainer}>
        <img
    src={rank1Icon} 
    alt="Icon 1"
    className={styles.rankicon1}
  />
         
         <img
    src={rank2Icon} 
    alt="" 
    className={styles.rankicon2}
  />
           <img
    src={rank3Icon} 
    alt="Rank 3 Icon"
    className={styles.rankicon3}
  />
        </div>
        {/* <div className={styles.innerBoxes}>
        <div className={styles.innerBox1} style={{width:"122px", height:"93px", marginTop:"150px", marginLeft:"-200px"}}>
        <img
    src={greybox1Image} 
    alt="img 1"
  />
            <span className={styles.textOverImage} style={{marginTop:"-40px", marginLeft:"50px"}}>Username<br></br>99.5</span>
            
          </div>
          <div className={styles.innerBox2} style={{width:"122px", height:"93px", marginTop:"-117px", marginLeft:"40px"}}>
          <img
    src={greybox2Image} 
    alt="img 1"
  />
            <span className={styles.textOverImage1}>Username<br></br>100</span>
          </div>
          <div className={styles.innerBox3} style={{width:"122px", height:"93px", marginTop:"-45px", marginLeft:"280px"}}>
          <img
    src={greybox3Image} 
    alt="img 1"
  />
            <span className={styles.textOverImage2}>Username<br></br>99</span>
          </div>
        </div> */}
        
        </div>
        {/* <div  className={styles.columns1}>
        {/* <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={styles.column}>User Name</span>
    <span className={styles.column}>Score</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div> */}
 
  {/* <div>
      {leaderboardData.map((entry, index) => (
        <div key={index} className={styles.values}>
          <div className={styles.value}>{entry.rank}</div>
          <div className={styles.value}>{entry.user_name}</div>
          <div className={styles.value}>{entry.score}</div>
          <div className={styles.value}>{entry.attempts}</div>
          <div className={styles.value}>{entry.duration}</div>
        </div>
      ))}
    </div> */}
    {/* </div>  */}
    <div>
      <div className={styles.innerBoxes}>
        {topThree.map((entry, index) => {
          const boxStyles = [
            { width: "122px", height: "93px", marginTop: "-115px", marginLeft: "-715px" },
            { width: "122px", height: "93px", marginTop: "-140px", marginLeft: "-470px" },
            { width: "122px", height: "93px", marginTop: "-93px", marginLeft: "-226px" }
          ];
          
          const textStyles = [
            { marginTop: "0px", marginLeft: "0px" },
            {},
            {}
          ];

          const images = [greybox1Image, greybox2Image, greybox3Image];

          return (
            <div key={entry.rank} className={styles[`innerBox${index + 1}`]} style={boxStyles[index]}>
              <img src={images[index]} alt={`img ${index + 1}`} />
              <span className={styles[`textOverImage${index + 1}`]} style={textStyles[index]}>
                {entry.user_name}<br />{entry.attained_percentage}
              </span>
            </div>
          );
        })}
      </div>
      <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={styles.column}>User Name</span>
    <span className={styles.column}>Percentage</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div>
      {leaderboardData.slice(3,10).map((entry, index) => (
        <div key={entry.rank} className={styles.values}>
          <div className={styles.value}>{entry.score_rank}</div>
          <div className={styles.value}>{entry.user_name}</div>
          <div className={styles.value}>{entry.attained_percentage}</div>
          <div className={styles.value}>{entry.attempts_count}</div>
          <div className={styles.value}>{entry.attempt_duration_mins}</div>
        </div>
      ))}
    </div>
    <div className={styles.boxContainer}>
      <div className={styles.parentContainer}>
     
      </div>
    </div>
      
        </div>
         
      </div>
      
    
  );
};

export default quizresults;
