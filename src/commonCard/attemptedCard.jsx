import React, { useState } from 'react';
import styles from "../../src/dashboard/dashboard.module.css";
import newView from "../../public/newview.png";
import leaderboard2 from "../../public/leaderboaed1.png";
import print from "../../public/print.png";
import created from "../../public/createdby.png";
import NoOfQuestion1 from "../../public/noofquestions.png";
import noOfAttampt from "../../public/noofattampt.png";
import Calender from "../../public/calender1.png";
import clock1 from "../../public/clock1.png";
import Results from "../quiz-results1/quiz-results1";
import { useNavigate } from 'react-router-dom';
function AttemptedCard(props) {

    const [view, setView] = useState(false);
    const { quizItem, handleView, handleLeaderBoard } = props;
    console.log('quizIIII', quizItem);



    // const viewOnClick = () => {
    //     handleView && handleView();
    //     setView(true);

    // }

    return (
        <div className='mr-4'>
            <div className={styles.sampleCard}>
                <div className={styles.sampleBoxImage}>
                </div>
                <div className={styles.sampleBoxDetails}>
                    <label className={styles.title}>{quizItem?.quiz_name}</label>
                    <label className={styles.description}>Curriculum .General.Simple</label>
                    <div className={styles.sampleBoxQuizDetails} >
                        <div className={styles.sampleBoxQuizDetailsBoxes}>
                            <div className="ml-[5px] h-[25px]">
                                <img className={styles.author} src={created} />
                                <label className={styles.text}>{quizItem?.created_by}</label>
                            </div>

                            <div className="ml-[5px]  h-[25px]">
                                <img className={styles.questions} src={NoOfQuestion1} />
                                <label className={styles.text}>{quizItem?.number_of_questions}</label>
                            </div>

                            <div className="ml-[5px] h-[25px]" >
                                <img className={styles.questions} src={noOfAttampt} />
                                <label className={styles.text}>{quizItem?.quiz_attempts}</label>
                            </div>
                        </div>
                        <div className={styles.sampleBoxQuizDetailsBoxes}>
                            <div className="">
                                <img className={styles.calender} src={Calender} />
                                <label className={styles.text} >{quizItem?.quiz_create_date}</label>
                            </div>
                            <div>
                                <img className={styles.clock} src={clock1} />
                                <label className={styles.text}>{quizItem?.quiz_duration}</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sampleBoxDetailsFooterIcons}>
                        {<img className={styles.view} title="View" src={newView}  />}
                        <img className={styles.clock} title="Leaderboard" src={leaderboard2} />
                        <img className={styles.print} title="Print" src={print}/>
                    </div>
                </div>
            </div>
            <div className={styles.pinkLine}></div>

            {view && <Results />}
            
        </div>
    )
}

export default AttemptedCard;