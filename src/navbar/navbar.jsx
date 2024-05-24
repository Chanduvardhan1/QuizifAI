import React from "react";
import styles from "./dashboard.module.css";
//import { useRouter } from 'next/router';
import { useNavigate } from "react-router-dom";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import dashboardIcon from "../assets/Images/images/dashboard/dashboard.png";
import quizIcon from "../assets/Images/images/dashboard/quiz.png";
import historyIcon from "../assets/Images/images/dashboard/history.png";
import scheduleIcon from "../assets/Images/images/dashboard/schedule.png";
import notificationIcon from "../assets/Images/images/dashboard/notification.png";
import profileIcon from "../assets/Images/images/dashboard/profile.png";
//import Head from "next/head";
//import Image from "next/image";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const Navigation = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };
  /*const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const handleBackToQuiz = () => {
    router.push('/quiz');
  };

  const handleBackToNotification = () => {
    router.push('/notification');
  };

  const handleBackToProfile = () => {
    router.push('/profile');
  };

  const handleBackToHistory = () => {
    router.push('/history');
  };

  const handleBackToSchedule = () => {
    router.push('/schedule');
  };*/

  return (
    <div className={styles.navigation}>
      {/* Navigation content */}
      <img
      onClick={handleBackToHome}
        src={quizifailogo}
        alt="Logo"
        width={180}
        height={160}
        className={styles.dashboardLogo}
      />
      <div className={styles.pageList}>
        <div className={styles.pageItem} onClick={() => handleNavigation('/dashboard')}>
          <img src={dashboardIcon} alt="Icon 1" className={styles.pageIcon} />
          <span className={styles.pageLink} >Dashboard</span>
        </div>
        <div className={styles.pageItem} onClick={() => handleNavigation('/quiz')}>
          <img src={quizIcon} alt="Icon 2" className={styles.pageIcon} />
          <span className={styles.pageLink}>Quizzes</span>
        </div>
        {/* <div className={styles.pageItem} onClick={() => handleNavigation('/history')}>
          <img src={historyIcon} alt="Icon 1" className={styles.pageIcon} />
          <span className={styles.pageLink} >History</span>
        </div> */}
        <div className={styles.pageItem}  onClick={() => handleNavigation('/schedule')}>
          <img src={scheduleIcon} alt="Icon 2" className={styles.pageIcon} />
          <span className={styles.pageLink} >Schedule</span>
        </div>
        {/* <div className={styles.pageItem} onClick={() => handleNavigation('/notification')}>
          <img src={notificationIcon} alt="Icon 1" className={styles.pageIcon} />
          <span className={styles.pageLink}>Notification</span>
        </div> */}
        <div className={styles.pageItem} onClick={() => handleNavigation('/free-profile')}>
          <img src={profileIcon} alt="Icon 2" className={styles.pageIcon} />
          <span className={styles.pageLink} >Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
