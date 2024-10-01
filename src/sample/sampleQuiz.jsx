import { React } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png";
import current from "../../src/assets/Images/images/quizresults/faq.png";
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg";
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png";
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import styles from "./sampleQuiz.module.css";
import { useNavigate } from 'react-router-dom';

const Samplequiz = () => {
  const navigate = useNavigate();

  const Back = () => {
  };

  const handleOnClose = () => {
    navigate("/")
  }
  return (

    <div className={styles.container} >
      <div className={styles.mainContent} >

        <div className={styles.header}>
          <div className={styles.titleContainer}>

            <div className={styles.downloads} >
              <div className={styles.download} >

                <span className={styles.quizname}>Current Affairs</span>
              </div>

            </div>

            <p className={styles.quizdescription}>Challenge yourself with "Quizifai Daily Current Affairs"! Discover and learn about the latest news in a fun way!</p>


            <div className={styles.flexrow}>
              <div className={styles.Createdbyupdated}>
                <div className={styles.Questions}>

                  <span className={styles.Question} >Questions :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
                  <span className={styles.username1} >5</span>
                </div>
                <div>

                  <span className={styles.Question} >Total Marks : &nbsp;&nbsp;</span>{" "}
                  <span className={styles.username1} >5</span>
                </div>
                <div className={styles.Created}>

               
                  <span className={styles.username} ></span>
                </div>

                <div>

                 
                  <span className={styles.username} ></span>
                </div>
              </div>
              <div className={styles.Questionslines}>

                <div>

                  <span className={styles.Question} >Duration : </span>{" "}
                  <span className={styles.username1} > 5 min</span>
                </div>

                <div>

                  
                  <span className={styles.username1} ></span>
                </div>

              </div>
              <div className={styles.Questionslines}>



                <div>

                  <span className={styles.Question} > Complexity : </span>{" "}
                  <span className={styles.username1} >Simple</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.wrapper}>
          <div className={styles.sentenceBox}>
            <div className={styles.verticaliconsContainer}>
              <h1 className={styles.verticalicon2} >1</h1>
              <img
                src={rankimage}
                alt="Icon 1"
                className={styles.verticalicon1}
              />
              <h1 className={styles.rank1}>Your Rank </h1>
            </div>
            <div className={styles.sentencesContainer}>
              <div className={styles.sentence}>
                <img
                  src={dateIcon}
                  alt="Calendar Icon"
                  className={styles.icon2}
                />
                <span>Taken on  </span>
              </div>
            </div>
            <div className={styles.sentencesContainer}>
              <div className={styles.sentence}>
                <img
                  src={timeIcon}
                  alt="Calendar Icon"
                  className={styles.icon2}
                />
                <span>Spent </span>
              </div>


            </div>
            <div className={styles.sentencesContainer}>
              <div className={styles.sentence}>
                <img
                  src={current}
                  alt="Calendar Icon"
                  className={styles.icon2}
                />
                <span>Attempted Questions</span>
              </div>
            </div>

            <div className={styles.sentence1}>
              <img
                src={vector}
                alt="Calendar Icon"
                className={styles.icon2}
              />
              <span> correct answer</span>
            </div>
            <div className={styles.sentencesContainer}>
              <div className={styles.sentence}>
                <img
                  src={percentIcon}
                  alt="Calendar Icon"
                  className={styles.icon2}
                />
                <span className={styles.sentence3}>You have scored%,   Grade,<span className={styles.pass}>Fail</span> </span>
              </div>


            </div>






          </div>
          <div className={styles.boxContainer1}>
            <div className={styles.titles}>
              <p className={styles.title}>Leaderboard </p>


            </div>
            <div className={styles.lines}>
              <div className={styles.lines1}></div>
              <div className={styles.lines2}> Top 10 Rankers</div>
              <div className={styles.lines3}></div>
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
              <p className={styles.second}>1<span className={styles.st1}>st</span></p>
              <p className={styles.fist}>2<span className={styles.st2}>nd</span></p>

              <p className={styles.thired}>3<span className={styles.st3}>rd</span></p>
            </div>
            <div className={styles.innerBoxes1}>
              <div className={styles.innerBox1} style={{ width: "122px", height: "93px", }}>



              </div>
              <div className={styles.innerBox2} style={{ width: "122px", height: "118px", marginbottom: "23px" }}>


              </div>
              <div className={styles.innerBox3} style={{ width: "122px", height: "93px", }}>


              </div>
            </div>






            <div>
              <div className={styles.innerBoxes}>


              </div>
              <div className={styles.columns}>
                <span className={styles.column}>Rank</span>
                <span className={`${styles.column} ${styles.userName}`}>User Name</span>
                <span className={styles.column}>Percentage</span>
                <span className={styles.column}>Attempts</span>
                <span className={styles.column}>Duration</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.horizontalLine} style={{ marginTop: "0px" }}></div>
        <div className={styles.boxContainer}>
          <div className={styles.parentContainer}>
            <div className={styles.sentencesContainer1} style={{ marginLeft: "0px", marginTop: "40px", height: "220px" }} >
              <div className={styles.sentence}>
              </div>
              <button
                onClick={handleOnClose}
                className="absolute top-4 right-4 w-20 h-[30px] rounded-full font-Poppins bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110"
              >
                Close
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>








  )
}
export default Samplequiz;
