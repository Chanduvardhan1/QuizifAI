//import Head from 'next/head';
//import img from "next/image";
import styles from './quizresults1.module.css';
import React, { useEffect, useState } from 'react';
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
import dateIcon from "../assets/Images/images/quizview/date.png";
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
import timeIcon from "../assets/Images/images/quiz-Access/time.png"; 
import botIcon from "../assets/Images/images/quizview/bot.png";
import publicIcon from "../assets/Images/images/quizview/public.png";
import startIcon from "../assets/Images/images/quiz-Access/start.png";
import LeftBar from "../leftbar/leftbar";

const Questions = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");
    const fetchData = async () => {
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
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
const topThree = leaderboardData.slice(0, 3);
  const remaining = leaderboardData.slice(3,10);

  return (
    <div className={styles.container}>
      {/*<Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
  </Head>*/}
      <LeftBar/>
      <div className={styles.mainContent}>
       
        <div className={styles.boxContainer1}>

        <div className={styles.titles}>
        <p className={styles.title}>Leaderboard</p>
        </div>
        <div className={styles.ranksiconsContainer}>
          <img src={rank1Icon} alt="Icon 1" className={styles.rankicon1} />
          <img src={FirstRank} alt="First Rank" className={styles.firstRank} />
          <img src={rank2Icon} alt="" className={styles.rankicon2} />
          <img src={rank3Icon} alt="Rank 3 Icon" className={styles.rankicon3} />
        </div>
        <div className={styles.innerBoxes}>
        {topThree.map((item, index) => (
            <div
              key={index}
              className={styles[`innerBox${index + 1}`]}
              style={{
                width: "122px",
                height: "93px",
                marginTop: index === 0 ? "150px" : index === 1 ? "-117px" : "-45px",
                marginLeft: index === 0 ? "-200px" : index === 1 ? "40px" : "280px"
              }}
            >
              <img
                src={index === 0 ? greybox1Image : index === 1 ? greybox2Image : greybox3Image}
                alt={`img ${index + 1}`}
              />
              <span
                className={styles[`textOverImage${index + 1}`]}
                style={{ width: "100px" }}
              >
                {item.user_name}<br />
                <span style={{ color: index === 0 ? "#009BD6" : index === 1 ? "#FB9639" : "#00D95F" }}>{item.attained_percentage}</span>
              </span>
            </div>
          ))}
        </div>
       
        
        </div>
        <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={styles.column}>User Name</span>
    <span className={styles.column}>Percentage</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div>
        
  {remaining.map((item, index) => (
        <div className={styles.values} key={index + 3}>
          <div className={styles.value}>{item.score_rank}</div>
          <div className={styles.value}>{item.user_name}</div>
          <div className={styles.value}>{item.attained_percentage}</div>
          <div className={styles.value}>{item.attempts_count}</div>
          <div className={styles.value}>{item.attempt_duration_mins}</div>
        </div>
      ))}
        
  <span className={styles.boticonContainer}>
  <img
    src={bot2Icon} 
    alt="Your Icon"
    className={styles.boticon}
  />
  </span>
  {/* <div className={styles.header}>
        <div className={styles.titleContainer}>
        <img
      src={titleIcon} 
      alt="User Icon"
      className={styles.icon1}
    />
          <span>Title of the Quiz</span>
        </div>
        <div className={styles.infoContainer}>
        <img
      src={createdIcon} 
      alt="Calendar Icon"
      className={styles.icon2}
    />
          <span>Quiz created by user name on date</span>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
      <img
      src={descriptionIcon} 
      alt="Description Icon"
      className={styles.description}
    />
      <span className={styles.descriptionText}>Description of the Quiz Description of the Quiz Description of the Quiz  Description of the Quiz <br></br>Description of the Quiz Description of the Quiz Description of the Quiz Description of the Quiz</span>
      </div>
     
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>70% is the pass score</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={createdIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Complexity: Simple | Medium | Complex</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={questionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>20 questions</span>
        </div>
        
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={saveIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />

          <span>Save this paper: Yes</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={retakeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Retake this paper: 2</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={optionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Multiple Answers:  Yes</span>
        </div>
        
      </div>

      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={categoryIcon} 
    className={styles.icon2}
  />

          <span>Sub Category from Quiz Category</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Total 40 mins of 60 Sec for each questions</span>
        </div>
        
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={dateIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Quiz will be live from: DD/MM/YYYY to DD/MM/YYYY</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={botIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>AI support needed: Yes</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={publicIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Public access: Yes</span>
        </div>
        </div>
        
        <div className={styles.buttonContainer}>
        <button className={styles.imageButton}>
        <img
    src={startIcon} 
    alt="Calendar Icon"
  />
        </button>
      </div> */}
        </div>
        
         
      </div>
      
    
  );
};

export default Questions;
