import React from 'react';
import styles from "./sampleQuiz.module.css";
    const Samplequiz = () => {
    return (
        <div>
            <h1 className ={styles.CurrentAffaries}>Current Affaries</h1>
         <div className={styles.Createdbyandupdated}>
              <div className={styles.Questions}>
                <span className={styles.Question}>
                  Questions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </span>{" "}
                <span></span>
                <span className={styles.username1}> </span>
              </div>
              <div>
                <span className={styles.Question}>
                  Total Marks&nbsp;&nbsp;:
                </span>{" "}
                <span className={styles.username1}></span>
              </div>
              <div className={styles.Createdby}>
                <span className={styles.Question}>
                  Created By &nbsp;&nbsp;&nbsp;:
                </span>{" "}
                 
              </div>

              <div>
                <span className={styles.Question}>
                  Created On&nbsp;&nbsp;&nbsp;:
                </span>{" "}
              </div>
            </div>
            <div className={styles.Questionslines}>
              <div>
                <span className={styles.Question}>Duration :</span>{" "}
                
              </div>

              <div>
                <span className={styles.Question}>Pass Percentage :</span>{" "}
                
              </div>
            </div>
            <div className={styles.Questionslines}>
              <div>
                <span className={styles.Question}>Complexity :</span>{" "}
                
              </div>
            </div>
            <div>

            </div>
          </div>
          
        
    )
}
export default Samplequiz;
