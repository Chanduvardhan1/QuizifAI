import React from "react";
import styles from "./dashboard.module.css";
//import { useRouter } from 'next/router';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import dashboardIcon from "../assets/Images/images/dashboard/dashboard1.png";
import NewDashboard from "../assets/Images/images/dashboard/NewDashboard.png";

import quizIcon from "../assets/Images/images/dashboard/quiz1.png";
import NewQuizzes from "../assets/Images/images/dashboard/NewQuizzes.png";

import historyIcon from "../assets/Images/images/dashboard/history.png";
import scheduleIcon from "../assets/Images/images/dashboard/schedule.png";
import NewSchedule from "../assets/Images/images/dashboard/NewSchedule.png";
import notificationIcon from "../assets/Images/images/dashboard/notification.png";

import profileIcon from "../assets/Images/images/dashboard/profile1.png";
import NewProfile from "../assets/Images/images/dashboard/NewProfile.png";
import Settings from "../assets/Images/images/dashboard/Settings1.png";
import NewSettings from "../assets/Images/images/dashboard/NewSettings.png";
//import Head from "next/head";
//import Image from "next/image";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const Navigation = () => {

const  [isActive, setIsActive] = useState(false);
const  [isActiveQuizzes, setIsActiveQuizzes] = useState(false);
const  [isActiveSchedule, setIsActiveSchedule] = useState(false);
const  [isActiveProfile, setIsActiveProfile] = useState(false);
const  [isActiveConfig, setIsActiveConfig] = useState(false);

 
 const [iconDashboard, setIconDashboard] = useState(NewDashboard);
 const [iconQuizzez, setIconQuizzez] = useState(quizIcon);
 const [iconSchedule, setIconSchedule] = useState(scheduleIcon);
 const [iconProfile, setProfile] = useState(profileIcon);
 const [iconSettings, setSettings] = useState(Settings);

 const [activePage, setActivePage] = useState('dashboard');


  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };
  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  // const handleNavigation = () => {
  //   setIconDashboard(dashboardIcon);
  //   navigate(('/dashboard'));
  //   // setIsActive(true);
  //   setActivePage('dashboard');
  // };

  // const handleNavigation1 =() =>{
  // setIconQuizzez(NewQuizzes);
  // setIsActiveQuizzes(true);
  //  navigate('/quiz');
  // };
  // const handleNavigation2 =() =>{
  //   setIconSchedule(NewSchedule);
  //   setIsActiveSchedule(true);
  //    navigate('/schedule');
  //   };
  // const handleNavigation3 =() =>{
  //   setProfile(NewProfile);
  //   setIsActiveProfile(true);
  //   navigate('/free-profile');
  //     };
  //  const handleNavigation4 =() =>{
  //   setIsActiveConfig(true);
  //   navigate('/configure');
  //  }    

  const handleNavigation2 =() =>{
    setIconSchedule(NewSchedule);
    setIsActiveSchedule(true);
     navigate('/schedule');
    };
  const handleNavigation3 =() =>{
    setProfile(NewProfile);
    setIsActiveProfile(true);
    navigate('/free-profile');
      };

   const handleNavigation4 =() =>{
    setSettings(NewSettings);
    setIsActiveConfig(true);
    navigate('/configure');
   }    


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
      <div className={`${styles.pageItem} ${activePage === 'dashboard' ? styles.active : ''}`} onClick={() => handleNavigation('dashboard')}>
        <img src={iconDashboard} alt="Icon 1" className={styles.pageIcon} />
        <div className={`${styles.verticalline} ${activePage === 'dashboard' ? styles.active : ''}`}></div>
        <span className={styles.pageLink}>Dashboard</span>
        </div>
      <div className={`${styles.pageItem} ${activePage === 'quizzes' ? styles.active : ''}`} onClick={() => handleNavigation('quiz')}>
        <img src={iconQuizzez} alt="Icon 2" className={styles.pageIcon} />
        <div className={`${styles.verticalline} ${activePage === 'quizzes' ? styles.active : ''}`}></div>
        <span className={styles.pageLink}>Quizzes</span>
      </div>
      <div className={`${styles.pageItem} ${activePage === 'profile' ? styles.active : ''}`} onClick={() => handleNavigation('free-profile')}>
        <img src={iconProfile} alt="Icon 2" className={styles.pageIcon} />
        <div className={`${styles.verticalline} ${activePage === 'profile' ? styles.active : ''}`}></div>
        <span className={styles.pageLink}>Profile</span>
      </div>
      <div className={`${styles.pageItem} ${activePage === 'settings' ? styles.active : ''}`} onClick={() => handleNavigation('configure')}>
        <img src={iconSettings} alt="Icon 2" className={styles.pageIcon} />
        <div className={`${styles.verticalline} ${activePage === 'settings' ? styles.active : ''}`}></div>
        <span className={styles.pageLink}>Settings</span>
      </div>
      </div>
      </div>
  );
};

export default Navigation;
