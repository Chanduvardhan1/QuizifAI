// LogoutBar.js

import React from "react";
//import Image from "next/image";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import styles from "./dashboard.module.css";
import logoutArrowIcon from "../assets/Images/images/dashboard/logoutArrow1.png";
import user2Icon from "../assets/Images/images/dashboard/user2.png";
import userIcon from "../assets/Images/images/dashboard/user.png";
import scoredIcon from "../assets/Images/images/dashboard/scored.png";
import timeSpentIcon from "../assets/Images/images/dashboard/timeSpent.png";
import notifyIcon from "../assets/Images/images/dashboard/notify.png";
import todayTopicIcon from "../assets/Images/images/dashboard/todayTopic.png";
import subTopicIcon from "../assets/Images/images/dashboard/subTopic.png";


const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30; 
  const maxValue2 = 80; 


const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );

  

const LogoutBar = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/login");
  };

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState(localStorage.getItem("user_name"));
  const [occupation, setOccupation] = useState(localStorage.getItem("occupation_name"));
  
  useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);
      console.log("User Name:", username);
      console.log("occupation:", occupation);

      try {
        const response = await fetch(
          `https://quizifai.com:8010/get_prfl_dtls?user_id=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data:", data);
        // Assume you set the fetched data to the state as necessary
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId, username,occupation]); 
  return (
    <div className={styles.logout}>
        <div style={{ marginTop: "40px", display: "flex", alignItems: "center" , marginLeft:"20px"}}>
  <span style={{ marginRight: "10px" }}>Logout</span>

<div>
<img
    src={logoutArrowIcon}
    onClick={handleBackToLogin}
    alt="Logout Icon"
    style={{ width: "30px", height: "20px", marginLeft:"100px",cursor:"pointer" }}
  />
</div>
 

  </div>
        <div style={{ position: "relative", marginTop: "20px" }}>
          
        <img
          src={user2Icon}
          alt="Background Image"
          style={{ display: "block", marginLeft: "60px", marginTop: "40px" }}
        />

<img
          src={userIcon}
          alt="Foreground Image"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            paddingRight:"9px",
          }}
        />
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "15px", marginBottom: "5px", fontWeight: 600 }}>
            {username}
          </p>
          <p
            style={{
              fontSize: "12px",
              margin: "0",
              fontWeight: 500,
              color: "#9696BB",
            }}
          >
            {occupation}
          </p>
          <p
          style={{
            fontSize: "12px",
            margin: "0",
            fontWeight: 500,
            color: "rgb(94,129,244)",
          }}>
            User id : {userId}
          </p>
          <div style={{ marginTop: "10px" }}>
            <div style={{ marginTop: "40px", marginLeft: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                  src={scoredIcon}
                  alt="Scored Icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "cover",
                  }}
                />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      marginRight: "15px",
                    }}
                  >
                    Scored
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9696BB",
                      marginTop: "3px",
                    }}
                  >
                    Intermediate
                  </span>
                </div>
                <span style={{ marginLeft: "25px", width: "60px" }}>
                <BasicProgressBar currentValue={currentValue1} maxValue={maxValue1} />
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                src={timeSpentIcon}
                alt="Time Spent Icon"
                style={{
                  width: "20px",
                  height: "20px",
                  objectFit: "cover",
                }}
              />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 500 }}>
                    Time Spent
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9696BB",
                      marginTop: "3px",
                      marginRight: "30px",
                    }}
                  >
                    Advanced
                  </span>
                </div>
                <span style={{ marginLeft: "8px", width: "60px" }}>
               <BasicProgressBar currentValue={currentValue2} maxValue={maxValue2} />
               </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginTop: "40px" }}>
  <span style={{ fontSize: "15px", color: "#000000", fontWeight: 500 }}>
    Notification
  </span>
  <img
    src={notifyIcon}
    alt="Notify Icon"
    className={styles.notifyIcon}
    style={{ marginLeft: "120px" }}
  />
</div>

            </div>

            <div style={{ marginTop: "40px", marginLeft: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#FFE8EE",
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   <img
                  src={todayTopicIcon}
                  alt="Scored Icon"
                  style={{ width: "15px", height: "15px" }}
                />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      marginRight: "15px",
                    }}
                  >
                    Today - Topic
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9696BB",
                      marginTop: "3px",
                    }}
                  >
                    23 Jan 2024, Tuesday
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#E4EBFF",
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                  src={subTopicIcon}
                  alt="Time Spent Icon"
                  style={{ width: "17px", height: "13px" }}
                />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 500 }}>
                    Topic - Sub Topic Title
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9696BB",
                      marginTop: "3px",
                      marginRight: "30px",
                    }}
                  >
                    24 Jan 2024, Wednesday
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#E4EBFF",
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                  src={subTopicIcon}
                  alt="Time Spent Icon"
                  style={{ width: "17px", height: "13px" }}
                />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 500 }}>
                    Topic - Sub Topic Title
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#9696BB",
                      marginTop: "3px",
                      marginRight: "30px",
                    }}
                  >
                    24 Jan 2024, Wednesday
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LogoutBar;
