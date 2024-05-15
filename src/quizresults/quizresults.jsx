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

const quizresults = () => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/quiz_result', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: 1,
            quiz_id: 556,
            attempt_id: 251
          })
        });
        const data = await response.json();
        setQuizData(data.data);
        console.log('Quiz result submitted:', data);
      } catch (error) {
        console.error('Error submitting quiz result:', error);
      }
    };

    sendData(); // Trigger the POST request when the component mounts
  }, []);
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
          <span>Title of the Quiz</span>
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
      <span className={styles.descriptionText}>Description of the Quiz Description of the Quiz Description of <br></br>the Quiz  Description of the Quiz Description of the Quiz </span>
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
          <span>You have scored 89%</span>
        </div>
       
        
      </div>
     
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>23 mins spent for 60 questions</span>
        </div>
       
        
      </div>

      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={categoryIcon} 
    alt="Category Icon"
    className={styles.icon2}
  />
          <span>1st attempt, You have 2 more attempts</span>
        </div>
       
        
      </div>
      
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={dateIcon}
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>59 answered out of 60 questions</span>
        </div>
        </div>
        <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={dateIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>53 correct answers</span>
        </div>
        </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.verticaliconsContainer}>
        <img
    src={ranksIcon} 
    alt="Icon 1"
    className={styles.verticalicon1}
  />
         <img
    src={rankScoreIcon} 
    alt="Icon 2"
    className={styles.verticalicon2}
  />
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
        <div className={styles.innerBoxes}>
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
        </div>
        
        </div>
        <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={styles.column}>User Name</span>
    <span className={styles.column}>Score</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div>
        
  <div className={styles.values}>
    <div className={styles.value}>1</div>
    <div className={styles.value}>User Name</div>
    <div className={styles.value}>100</div>
    <div className={styles.value}>1</div>
    <div className={styles.value}>15 Min</div>
  </div>
  <div className={styles.values}>
    <div className={styles.value}>2</div>
    <div className={styles.value}>User Name</div>
    <div className={styles.value}>100</div>
    <div className={styles.value}>1</div>
    <div className={styles.value}>15.2 Min</div>
  </div>
  <div className={styles.values}>
    <div className={styles.value}>3</div>
    <div className={styles.value}>User Name</div>
    <div className={styles.value}>100</div>
    <div className={styles.value}>1</div>
    <div className={styles.value}>15.5 Min</div>
  </div>
  <div className={styles.values}>
    <div className={styles.value}>4</div>
    <div className={styles.value}>User Name</div>
    <div className={styles.value}>100</div>
    <div className={styles.value}>1</div>
    <div className={styles.value}>15.8 Min</div>
  </div>
  <div className={styles.values}>
    <div className={styles.value}>5</div>
    <div className={styles.value}>User Name</div>
    <div className={styles.value}>100</div>
    <div className={styles.value}>1</div>
    <div className={styles.value}>16.2 Min</div>
  </div>
  <div className={styles.values}>
    <div className={styles.value}>6</div>
    <div className={styles.value}>User Name</div>
    <div className={styles.value}>100</div>
    <div className={styles.value}>1</div>
    <div className={styles.value}>16.8 Min</div>
  </div>
  <div className={styles.values}>
    <div className={styles.value}>7</div>
    <div className={styles.value}>You</div>
    <div className={styles.value}>89</div>
    <div className={styles.value}>1</div>
    <div className={styles.value}>23 Min</div>
  </div>
        

        <div className={styles.boxContainer}>
          
<div className={styles.parentContainer}>

        {/* Content inside the box container */}
        <div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
        <div className={styles.sentence}>
        <img
    src={one1Image} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA</span>
          <span className={styles.iconContainer}>
          <img
    src={rightIcon} 
    alt="Your Icon"
    className={styles.righticon}
  />
  </span>
        </div>
        
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA} 
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconB}>
    <img
    src={iconB} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconC}>
    <img
    src={iconC} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconD}>
    <img
    src={iconD} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<span className={styles.newContainer}>
    <span className={styles.iconContainer}>
    <img
    src={answerTimerIcon} 
    alt="Icon 1"
    className={styles.icon5}
  />
  <img
    src={rightIcon1} 
    alt="Icon 2"
    className={styles.icon6}
  />
    </span>
    <span className={styles.textContainer}>
      <p>Answered in 53 Sec</p>
      <p>Description of the Answer Description of the <br></br>Answer Description of the Answer Description<br></br> of the Answer Description of the Answer <br></br>Description of the Answer</p>
    </span>
  </span>
</div>
</div>

<div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
        <div className={styles.sentence}>
        <img
    src={two2Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA </span>
          <span className={styles.iconContainer}>
          <img
    src={wrongIcon} 
    alt="Your Icon"
    className={styles.righticon}
  />
  </span>
        </div>
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA} 
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconB}>
    <img
    src={iconB} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconC}>
    <img
    src={iconC} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconD}>
    <img
    src={iconD} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<span className={styles.newContainer}>
    <span className={styles.iconContainer}>
    <img
    src={answerTimerIcon} 
    alt="Icon 1"
    className={styles.icon5}
  />
  <img
    src={wrongIcon1} 
    alt="Icon 2"
    className={styles.icon7}
  />
    </span>
    <span className={styles.textContainer}>
      <p>Answered in 53 Sec</p>
      <p>Description of the Answer Description of the <br></br>Answer Description of the Answer Description<br></br> of the Answer Description of the Answer <br></br>Description of the Answer</p>
    </span>
  </span>

</div>
<div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
        <div className={styles.sentence}>
        <img
    src={three3Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA </span>
          <span className={styles.iconContainer}>
          <img
    src={rightIcon}
    alt="Your Icon"
    className={styles.righticon}
  />
  </span>
        </div>
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA}
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} >
    <div className={styles.iconB}>
    <img
    src={iconB}
    alt="Icon 2"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconC}>
    <img
    src={iconC}
    alt="Icon 3"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconD} >
    <img
    src={iconD}
    alt="Icon 4"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<span className={styles.newContainer}>
    <span className={styles.iconContainer}>
    <img
    src={answerTimerIcon} 
    alt="Icon 1"
    className={styles.icon5}
  />
  <img
    src={rightIcon1} 
    alt="Icon 2"
    className={styles.icon6}
  />
    </span>
    <span className={styles.textContainer}>
      <p>Answered in 53 Sec</p>
      <p>Description of the Answer Description of the <br></br>Answer Description of the Answer Description<br></br> of the Answer Description of the Answer <br></br>Description of the Answer</p>
    </span>
  </span>

</div>
<div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
        <div className={styles.sentence}>
        <img
    src={four4Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA </span>
          <span className={styles.iconContainer}>
          <img
    src={wrongIcon} 
    alt="Your Icon"
    className={styles.righticon}
  />
  </span>
        </div>
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA}
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} >
    <div className={styles.iconB}>
    <img
    src={iconB}
    alt="Icon 2"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconC}>
    <img
    src={iconC}
    alt="Icon 3"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<div className={styles.box}style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconD}>
    <img
    src={iconD}
    alt="Icon 4"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<span className={styles.newContainer}>
    <span className={styles.iconContainer}>
    <img
    src={answerTimerIcon} 
    alt="Icon 1"
    className={styles.icon5}
  />
  <img
    src={wrongIcon1} 
    alt="Icon 2"
    className={styles.icon7}
  />
    </span>
    <span className={styles.textContainer}>
      <p>Answered in 53 Sec</p>
      <p>Description of the Answer Description of the <br></br>Answer Description of the Answer Description<br></br> of the Answer Description of the Answer <br></br>Description of the Answer</p>
    </span>
  </span>
</div>




      </div>
      
        </div>
         
      </div>
      
    
  );
};

export default quizresults;
