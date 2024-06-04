//import Head from 'next/head';
//import img from 'next/image';
import { useEffect, useState,useRef } from 'react';
import styles from './quizquestions.module.css';
import numberIcon from "../assets/Images/images/questions/numberIcon.png"; 
import iconA from "../assets/Images/images/questions/IconA.png";
import iconB from "../assets/Images/images/questions/IconB.png";
import iconC from "../assets/Images/images/questions/IconC.png";
import iconD from "../assets/Images/images/questions/IconD.png"; 
import clockIcon from "../assets/Images/images/questions/clock.png";
import LeftBar from "../leftbar/leftbar";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const QuizQuestions = () => {

  // const [quizData, setQuizData] = useState(null);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [selectedOptions, setSelectedOptions] = useState({});
  // const [answers, setAnswers] = useState({});
  // const [attemptNo, setAttemptNo] = useState(null);
  // const { quizId } = useParams();
  // useEffect(() => {
  //   const userId = localStorage.getItem("user_id");

  //   fetch('https://quizifai.com:8010/get-questions', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       quiz_id: 46,
  //       user_id: userId
  //     })
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       setQuizData(data.data);
  //       setAttemptNo(data.data.quiz_level_attempt_id);
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with your fetch operation:', error);
  //     });
  // }, []); 

  // if (!quizData) {
  //   return <div>Loading...</div>;
  // }


  // const handleOptionSelect = (optionId) => {
  //   setSelectedOptions(prevOptions => ({
  //     ...prevOptions,
  //     [currentQuestionIndex]: optionId
  //   }));
  // };

  // const handlePreviousQuestion = () => {
  //   setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  // };

  // const handleNextQuestion = () => {
  //   setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  // };

  // const handleSubmit = () => {
  //   const userId = localStorage.getItem("user_id");
  //   const answers = Object.keys(selectedOptions).map(questionIndex => ({
  //     question_id: quizData.questions[questionIndex].question_id,
  //     options: {
  //       [`option_${selectedOptions[questionIndex]}`]: true
  //     }
  //   }));

  //   fetch('https://quizifai.com:8010/submit', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user_id: userId,
  //       quiz_id: quizId,
  //       attempt_no: attemptNo,
  //       answers: answers
  //     })
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //     // Handle response if needed
  //     setAttemptNo(data.data.quiz_level_attempt_id);
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with your fetch operation:', error);
  //   });
  // };

  // if (!quizData) {
  //   return <div>Loading...</div>;
  // }

  // const currentQuestion = quizData.questions.data[currentQuestionIndex];
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const userId = localStorage.getItem("user_id");
 // Assuming quiz_id is 1592
  const [attemptNo, setAttemptNo] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const { quizId } = useParams();

  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");
    fetch('https://quizifai.com:8010/get-questions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quiz_id: quizId,
        user_id: userId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setQuizData(data.data);
      setAttemptNo(data.data.data.find(d => d.quiz_level_attempt_id).quiz_level_attempt_id);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
    timerRef.current = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [quizId]);

  const handleOptionSelect = (optionId) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [currentQuestionIndex]: optionId
    }));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    clearInterval(timerRef.current);
    if (!quizData || !quizData.data) {
      console.error('No quiz data available to submit');
      return;
    }

    const answers = Object.keys(selectedOptions).map(questionIndex => ({
      question_id: quizData.data[questionIndex].question_id,
      options: {
        option_1: selectedOptions[questionIndex] === quizData.data[questionIndex].quiz_ans_option_1_id,
        option_2: selectedOptions[questionIndex] === quizData.data[questionIndex].quiz_ans_option_2_id,
        option_3: selectedOptions[questionIndex] === quizData.data[questionIndex].quiz_ans_option_3_id,
        option_4: selectedOptions[questionIndex] === quizData.data[questionIndex].quiz_ans_option_4_id
      }
    }));
    // const quizId = localStorage.getItem("quiz_id");

    fetch('https://quizifai.com:8010/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizId,
        attempt_no: attemptNo,
        answers: answers
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      navigate(`/quizresults`, { state: { quizId, attemptNo } });
      // Handle response if needed
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  };
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (!quizData || !quizData.data) {
    return <div>Loading...</div>;
  }
  const filteredQuizData = quizData.data.filter(item => item.question_id);
  const currentQuestion = quizData.data.filter(item => item.question_id)[currentQuestionIndex];
  const optionLabels = ['A', 'B', 'C', 'D'];
  const optionKeys = ['quiz_ans_option_1_text', 'quiz_ans_option_2_text', 'quiz_ans_option_3_text', 'quiz_ans_option_4_text'];

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
          <h1 className={styles.quizTitle}>{quizData.data.quiz_title}</h1>
          {/* <div className={styles.imageContainer}>
          {/* <img
    src={numberIcon} 
    alt="Logo"
    width={59}
    height={59}
    className={styles.logoImage}
  /> */}
        {/* <div className={styles.textContainer}>
        <p>{`${currentQuestionIndex + 1}. ${currentQuestion.question_text}`}</p>

        </div> */}
        
    {/* </div>  */}
    {/* <div className={styles.boxesContainer}>
{/* 
    <div className={styles.icon}>
    <ul>
        {Object.keys(currentQuestion).map(key => {
          if (key.startsWith('quiz_ans_option_') && key.endsWith('_text')) {
            const optionId = currentQuestion[key.replace('_text', '_id')];
            return (
              <li key={optionId}>
                <button
                  className={styles.box}
                  onClick={() => handleOptionSelect(optionId)}
                  style={{ fontWeight: selectedOption === optionId ? 'bold' : 'normal' }}
                >
                  {currentQuestion[key]}
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div> */}

    {/* <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          style={{ color: '#FFFFFF', backgroundColor: '#FEBB42', height: '52px', borderRadius: '10px', border: 'none' }}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === quizData.questions.length - 1 && (
          <button
            className={styles.button}
            style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <button
          className={styles.button}
          style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quizData.questions.length - 1}
        >
          Next
        </button>
      </div> */}
  {/* <div>
      <ul>
        {currentQuestion && Object.keys(currentQuestion).map(key => {
          if (key.startsWith('quiz_ans_option_') && key.endsWith('_text')) {
            const optionId = currentQuestion[key.replace('_text', '_id')];
            return (
              <li key={optionId}>
                <button
                  className={styles.box}
                  onClick={() => handleOptionSelect(optionId)}
                  style={{ fontWeight: selectedOptions[currentQuestionIndex] === optionId ? 'bold' : 'normal' }}
                >
                  {currentQuestion[key]}
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          style={{ color: '#FFFFFF', backgroundColor: '#FEBB42', height: '52px', borderRadius: '10px', border: 'none' }}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === quizData.data.length - 1 && (
          <button
            className={styles.button}
            style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <button
          className={styles.button}
          style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quizData.data.length - 1}
        >
          Next
        </button>
      </div>
    </div> */}

    {/* </div> */}
    <div>
      {currentQuestion && (
        <>
          <div className={styles.imageContainer}>
            <div className={styles.textContainer}>
              <p>{`${currentQuestionIndex + 1}. ${currentQuestion.question_text}`}</p>
            </div>
          </div>
          <div className={styles.boxesContainer}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
        {optionKeys.map((key, index) => {
          const optionId = currentQuestion[key.replace('_text', '_id')];
          const optionLabel = optionLabels[index];
          const isSelected = selectedOptions[currentQuestionIndex] === optionId;
          return (
            <li key={optionId} style={{ marginBottom: '10px' }}>
              <button
                className={styles.box}
                onClick={() => handleOptionSelect(optionId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '40px',
                  marginRight: '10px',
                  padding: '10px',
                  textAlign: 'center' ,
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                }}>{optionLabel}</div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  backgroundColor: isSelected ? 'lightyellow' : 'transparent',
                  width: '400px', // Ensure the button takes full width
                  padding: '10px', // Adds padding for better click area
                  border: isSelected ? '2px solid #FEBB42' : '1px solid #ccc', // Highlights selected option
                  borderRadius: '5px', // Rounds corners of buttons
                  textAlign: 'left' // Align text to the left for better readability
                }}>{currentQuestion[key]}</div>
              </button>
            </li>
          );
        })}
      </ul>
          </div>
        </>
      )}
             <div className={styles.buttonsContainer}>
            {currentQuestionIndex > 0 && (
                <button
                    className={styles.button}
                    style={{ color: '#FFFFFF', backgroundColor: '#FEBB42', height: '52px', borderRadius: '10px', border: 'none' }}
                    onClick={handlePreviousQuestion}
                >
                    Previous
                </button>
            )}
            {currentQuestionIndex < quizData.data.filter(item => item.question_id).length - 1 && (
                <button
                    className={styles.button}
                    style={{ backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
                    onClick={handleNextQuestion}
                >
                    Next
                </button>
            )}
            {currentQuestionIndex === quizData.data.filter(item => item.question_id).length - 1 && (
                <button
                    className={styles.button}
                    style={{ marginLeft: '50px', backgroundColor: 'rgb(11 87 208)', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            )}
        </div>

     
    </div>
          </div>
          <div className={styles.verticalLine}></div>
      <div className={styles.sentence1} style={{ marginTop: "110px" }}>
        {`${currentQuestionIndex + 1} out of ${filteredQuizData.length}`}
      </div>
      <div className={styles.sentence2} style={{ marginTop: "170px" }}>
        Total timer: <span className={styles.sentence3}>{formatTime(elapsedTime)}</span> 
      </div>
      <div className={styles.sentence3} style={{ marginTop: "230px" }}>
        {/* {formatTime(elapsedTime)} */}
      </div>
          {/* <div className={styles.sentence4} style={{marginTop:"290px", marginLeft:"-140px"}}>Quiz timer: </div>
          <div className={styles.imageContainer} style={{marginTop: "350px", marginLeft: "-100px"}}>
    <img
      src={clockIcon} 
      alt="Icon"
      width={100}
      height={100}
      className={styles.clockIcon}
    />
  </div> */}
      </div>
    
  );
};

export default QuizQuestions;
