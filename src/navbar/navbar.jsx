import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./dashboard.module.css";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import rocket from "../assets/Images/images/dashboard/rocket.png";
import infinity from "../assets/Images/images/dashboard/infinity.png";
import { AuthContext } from "../Authcontext/AuthContext.jsx"
 import Quiz from "../../public/quiz.png";
 import profileIcon from "../../public/profilepage.png";
 import settingsicon from "../../public/settingsicon.png";
 import myHistoryIcon from "../../public/myhistory.png"
 import contactUs from "../../public/contactus.png";
 import dashboard from "../../public/dashboardnew.png";
const Navigation = () => {
  // Initialize activePage state to the current pathname
  const [activePage, setActivePage] = useState(window.location.pathname);
  const [registeredOn, setRegisteredOn] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [passwordChanged, setPasswordChanged] = useState("");
  const [country, setCountry] = useState("");
  const [globalRank, setGlobalRank] = useState("");
  const [userName, setUserName] = useState("");
  const [district, setDistrict] = useState("");
  const [occupation, setOccupation] = useState("");
  const [city, setCity] = useState("");
  const [otherOccupation, setOtherOccupation] = useState("");
  // const [subscriptionStartDate, setSubscriptionStartDate] = useState("");
  // const [subscriptionEndDate, setSubscriptionEndDate] = useState("");
  const [remainingDays, setRemainingDays] = useState("");
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const { isAuthenticated, authToken, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    const fetchQuizData = async () => {
      console.log("User ID:", userId);

      try {

        const response = await fetch(
          `https://dev.quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              user_id: userId
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data:", data);

        const auditDetails = data.data[0].audit_details;
        if (auditDetails) {
          // setCity(auditDetails.location_name || "");
          setCountry(auditDetails.country_name || "");
          // setGlobalRank(auditDetails.global_score_rank || "");
          // setGlobalscore(auditDetails.global_score || "");
          setRegisteredOn(auditDetails.created_date || "");
          setLastLogin(auditDetails.last_login_timestamp || "");
          setPasswordChanged(auditDetails.user_password_change_date || "");

          const userDetails = auditDetails;
          setUserName(userDetails.full_name);

          const UserProfileDetails = data.data[0].user_profile_details;
          setDistrict(UserProfileDetails.district_name);
          setOccupation(UserProfileDetails.occupation_name);
          setCity(UserProfileDetails.location_name);
          setOtherOccupation(UserProfileDetails.other_occupation_name);

          // const subscriptionDetails = auditDetails.subscription_details && auditDetails.subscription_details[0];
        } else {
          console.error("No user details found.");
        }

        const usermetrics = data.data[0].user_metrics;
        if (usermetrics) {
          setTotalQuizzes(usermetrics.countofquizes || 0);
          setTotalMinutes(usermetrics.total_minutes || 0);
          setAverageScorePercentage(usermetrics.average_total_percentage || 0);
          // setGlobalRank(usermetrics.global_score_rank || "");
        } else {
          console.error("No user metrics found.");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId, authToken, isAuthenticated, navigate]);

  useEffect(() => {
    console.log("Registered On:", registeredOn);
    console.log("Last Login:", lastLogin);
    console.log("Password Changed:", passwordChanged);
  }, [registeredOn, lastLogin, passwordChanged]);


  const handleNavigation = (page) => {
    // Update the activePage state when a NavLink is clicked
    setActivePage(page);
  };


  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navbar}>
        <img
          src={quizifailogo}
          alt="Logo"
          width={180}
          height={160}
          className="cursor-pointer"
          onClick={handleBackToDashboard}
        />
        <div className={styles.pageList}>
          <NavLink
            to="/dashboard"
            className={`${styles.pageItem} ${activePage === '/dashboard' ? styles.bold : ''}`}
            onClick={() => handleNavigation('/dashboard')}
           >
            <img src={dashboard}  alt="Dashboard Icon"
              className={`${styles.pageIcon} ${activePage === '/dashboard' ? styles.activeIcon : ''}`} />
            <span className={styles.pageLink}>Dashboard</span>
          </NavLink>
          <NavLink
            to="/quiz"
            className={`${styles.pageItem} ${activePage === '/quiz' ? styles.bold : ''}`}
            onClick={() => handleNavigation('/quiz')}
          >
            <img src={Quiz} alt="Quiz Icon"
              className={`${styles.pageIcon} ${activePage === '/quiz' ? styles.activeIcon : ''}`} />
            <span className={styles.quizText}>Quizzes</span>
          </NavLink>
          <NavLink
            to="/free-profile"
            className={`${styles.pageItem} ${activePage === '/free-profile' ? styles.bold : ''}`}
            onClick={() => handleNavigation('/free-profile')}
          >
            <img src={profileIcon} alt="Profile Icon"
              className={`${styles.pageIcon} ${activePage === '/free-profile' ? styles.activeIcon : ''}`} />
            <span className={styles.profileText}>Profile</span>
          </NavLink>
          <NavLink
            to="/configure"
            className={`${styles.pageItem} ${activePage === '/configure' ? styles.bold : ''}`}
            onClick={() => handleNavigation('/configure')}
          >
            <img src={settingsicon} alt="Settings Icon"
              className={`${styles.pageIcon} ${activePage === '/configure' ? styles.activeIcon : ''}`} />
            <span className={styles.settingText}>Settings</span>
          </NavLink>
          <NavLink
            to="/contact"
            className={`${styles.pageItem} ${activePage === '/contact' ? styles.bold : ''}`}
            onClick={() => handleNavigation('/contact')}
          >
            <img src={contactUs} alt="Settings Icon"
              className={`${styles.pageIcon} ${activePage === '/contact' ? styles.activeIcon : ''}`} />
            <span className={styles.pageLink}>Contact US</span>
          </NavLink>
          <NavLink
            to="/myhistory"
            className={`${styles.pageItem} ${activePage === '/myhistory' ? styles.bold : ''}`}
            onClick={() => handleNavigation('/myhistory')}
          >
            <img
              src={myHistoryIcon}
              alt="Settings Icon"
              className={`${styles.pageIcon} ${activePage === '/myhistory' ? styles.activeIcon : ''}`}
            />
            <span className={styles.pageLink}>My History</span>
          </NavLink>
          {/* <img className="h-[122px] w-[60px] ml-[35px] mt-[50px]" src={rocket} alt="rocket"/> */}
        </div>
       </div>
       <div>
        {/* <div className="h-[5px] w-full bg-white mt-[10px]"></div> */}
      
      </div>
    </div>
  );
};

export default Navigation;











