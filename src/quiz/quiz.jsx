// Dashboard.js
import React , { useState, useEffect } from "react";
import styles from "./quiz.module.css";
//import Head from "next/head";
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx"
import Plus from "../../src/assets/Images/dashboard/Plus.png";
//import { useRouter } from 'next/router';
//import img from "next/image";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import arrow1 from "../assets/Images/images/dashboard/arrow1.png";
import arrow3 from "../assets/Images/images/dashboard/arrow3.png";
import moreArrow from "../assets/Images/images/dashboard/moreArrow.png";
import infoIcon from "../assets/Images/images/dashboard/infoIcon.png";
import topicIcon from "../assets/Images/images/dashboard/topicNew.png";
import timerIcon from "../assets/Images/images/dashboard/timerNew.png";
import difficultyIcon from "../assets/Images/images/dashboard/difficultyLevelNew.png";
import img1Icon from "../assets/Images/images/dashboard/img1New.png";
import img2Icon from "../assets/Images/images/dashboard/img2New.png";
import img3Icon from "../assets/Images/images/dashboard/img3New.png";
import img4Icon from "../assets/Images/images/dashboard/newImg4.png";
import img5Icon from "../assets/Images/images/dashboard/img5New.png";
import addQuizIcon from "../assets/Images/images/superadmin/add-quiz.png";
import addUserIcon from "../assets/Images/images/superadmin/add-user.png";
import switchUserIcon from "../assets/Images/images/superadmin/switch-user.png";
import eyeIcon from "../assets/Images/images/dashboard/eyeIcon.png"; 
import img3NewIcon from "../assets/Images/images/dashboard/img3New.png";
import ProgressBar from "@ramonak/react-progress-bar";

import Attempt1 from "../../public/images/dashboard/Attempt1.png";
import NoOfQuestion from "../../public/images/dashboard/NoOfQuestion.png";
import Clock from "../../public/images/dashboard/Clock.png";
import Start_button from "../../public/images/dashboard/Start-button.png";
import Share_button from "../../public/images/dashboard/Share-button.png";
import Edit_button from "../../src/assets/Images/dashboard/Edit-button.png";
import leaderboard_button from "../../public/images/dashboard/leaderboard-button.png";
import Easy from "../../public/images/dashboard/Easy.png";
//import LeftBar from "./leftbar";
//import { Navigation1 } from "react-calendar";

const Quiz = () => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState(localStorage.getItem("user_name"));
  const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30;
  const maxValue2 = 80; 


  const [cources, setCources] = useState([]);
  const [selectedCources,setSelectedCources]=useState([]);

  const [classes, setClasses] = useState([]);
  const [selectedClasses,setSelectedClasses]=useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [complexity, setComplexity] = useState("");
  const [complexities, setComplexities] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState("");
  // const [latestResults, setLatestResults] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const [allquizzes, setAllquizzes] = useState([]);
  const [getMoreQuizzes, setGetMoreQuizzes] = useState(false);
  const [topScoredQuizzes, setTopScoredQuizzes] = useState([]);


  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarOpen1, setIsNavbarOpen1] = useState(false);
  const [isNavbarOpen2, setIsNavbarOpen2] = useState(false);
  const [isNavbarOpen3, setIsNavbarOpen3] = useState(false);
  const [isNavbarOpen4, setIsNavbarOpen4] = useState(false);
  const [isNavbarOpen5, setIsNavbarOpen5] = useState(false);
  const [isNavbarOpen6, setIsNavbarOpen6] = useState(false);
  const [isNavbarOpen7, setIsNavbarOpen7] = useState(false);
  const [isNavbarOpen8, setIsNavbarOpen8] = useState(false);

  const [isNavbarOpen11, setIsNavbarOpen11] = useState(false);
  const [isNavbarOpen12, setIsNavbarOpen12] = useState(false);
  const [isNavbarOpen13, setIsNavbarOpen13] = useState(false);
  const [isNavbarOpen14, setIsNavbarOpen14] = useState(false);
  const [isNavbarOpen15, setIsNavbarOpen15] = useState(false);
  const [isNavbarOpen16, setIsNavbarOpen16] = useState(false);


  const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://quizifai.com:8010/categories&sub_categories/');
      const data = await response.json();
      if (data.response === 'success') {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

   // Handle category selection
   const handleSelectCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    // Filter subcategories based on the selected category
    const category = categories.find(cat => cat.category_name === selectedCategory);
    if (category) {
      setSubCategories(category.sub_categories.map(subCat => subCat.sub_category_name));
    }
  };

  // Handle subcategory selection
  const handleSelectSubCategory = (event) => {
    const selectedSubCategory = event.target.value;
    setSelectedSubCategory(selectedSubCategory);
  };

  useEffect(() => {
    fetchCources();
  }, []);

  const fetchCources = async () =>{
    try{
      const response = await fetch('https://quizifai.com:8010/courses-clsses/');
      const data = await response.json();
      if(data.response === 'success'){
        setCources(data.data);
      }
    }catch (error) {
      console.error('Error fetching Cources:', error);
    }
  }

   // Handle cources selection
   const handleSelectCource = (event) => {
    const selectedCources = event.target.value;
    setSelectedCources(selectedCources);
    // Filter classes based on the selected cource
    const cource = cources.find(cour => cour.course_name === selectedCources);
    if (cource) {
      setClasses(cource.classes.map(cls => cls.class_name));
    }
  };

  // Handle subcategory selection
  const handleSelectClass = (event) => {
    const selectedClasses = event.target.value;
    setSelectedClasses(selectedClasses);
  };
  
  useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);
      console.log("User Name:", username);
      try {
        const response = await fetch(
          `https://quizifai.com:8010/latest_quizes?user_id=${userId}&username=${username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              username: username, // Ensure correct payload format
              quiz_complexity_name: selectedComplexity,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        console.log("Data received:", data);
        setTimeData(data.time_spent);
        // setLatestResults(data.latest_results);
        setWeeklyQuizCount(data.weekly_quiz_count);
        setAverageScorePercentage(data.average_score_percentage);
        // setNotAttemptedQuizzes(data.latest_not_attempted_quizzes);
        // setAttemptedQuizzes(data.latest_attempted_quizzes);
        setTopScoredQuizzes(data.top_scored_quizzes);
        setAllquizzes(data.all_quizzes);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
      
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    fetchComplexities();
  }, []);

  const fetchComplexities = async () => {
    try {
      const response = await fetch('https://quizifai.com:8010/complexities/');
      const data = await response.json();
      if (data.response === 'success') {
        setComplexities(data.data.map(complexity => complexity.complexity_name));
      }
    } catch (error) {
      console.error('Error fetching complexities:', error);
    }
  };

  const handleSelectComplexity = (event) => {
    setSelectedComplexity(event.target.value);
  };

  function handleSelect6(event) {
    setSelectedComplexity(event.target.value);
  }

  const toggleGetMoreQuizzes = () => {
    setGetMoreQuizzes(true);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };
  const toggleNavbar1 = () => {
    setIsNavbarOpen1((prevState) => !prevState);
  };
  const toggleNavbar2 = () => {
    setIsNavbarOpen2((prevState) => !prevState);
  };
  const toggleNavbar3 = () => {
    setIsNavbarOpen3((prevState) => !prevState);
  };
  const toggleNavbar4 = () => {
    setIsNavbarOpen4((prevState) => !prevState);
  };
  const toggleNavbar5 = () => {
    setIsNavbarOpen5((prevState) => !prevState);
  };
  const toggleNavbar6 = () => {
    setIsNavbarOpen6((prevState) => !prevState);
  };
  const toggleNavbar7 = () => {
    setIsNavbarOpen7((prevState) => !prevState);
  };
  const toggleNavbar8 = () => {
    setIsNavbarOpen8((prevState) => !prevState);
  };
  const toggleNavbar11 = () => {
    setIsNavbarOpen11((prevState) => !prevState);
  };
  const toggleNavbar12 = () => {
    setIsNavbarOpen12((prevState) => !prevState);
  };
  const toggleNavbar13 = () => {
    setIsNavbarOpen13((prevState) => !prevState);
  };
  const toggleNavbar14 = () => {
    setIsNavbarOpen14((prevState) => !prevState);
  };
  const toggleNavbar15 = () => {
    setIsNavbarOpen15((prevState) => !prevState);
  };
  const toggleNavbar16 = () => {
    setIsNavbarOpen16((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Navigation/>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome {username}</p>
          <div className={styles.headerRight}>
          <div className="w-[99px] h-[41px] absolute mr-[170px] -mt-2 rounded-[10px] bg-[#FFEDCD]">
            <div className="flex">
              <img
                className="w-[25px] h-[25px] ml-2 mt-2"
                src={Plus}
                alt="Plus Icon"
              />
              <a href="./create-quiz" className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3">
                Quiz
              </a>
            </div>
          </div>
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div>
          </div>
        </div>
        <div className={styles.completionInfo}>
        You've completed  {weeklyQuizCount} Quizzes this week with an average score of {averageScorePercentage}%
        </div>
       
        <div className={styles.contentWrapper1}>
          <div className={styles.latestQuizHeader}>
            <p className="text-[16px] font-Poppins -ml-[18.5px]">Sort by</p>

            {/* <span className={styles.moreLink} onClick={toggleGetMoreQuizzes}>
              More{" "}
              <img
                className="ml-2"
                src={moreArrow}
                alt="More"
                width={17}
                height={10}
              />
            </span> */}
          </div>
         
  <div className={styles.infoCards}>
 <div className={styles.sortBy}>
  {/* <p className="ml-8 my-3 font-Poppins font-medium">Sort by:</p> */}
  <div className="gap-2 mb-3">
  <select
        className="w-[224px] p-2 rounded-md ml-7 cursor-pointer text-[15px]"
        value={selectedCategory}
        onChange={handleSelectCategory}
      >
        <option value="" disabled>Topic</option>
        {categories.map(category => (
          <option key={category.category_id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </select>

    <select
        className="w-[224px] p-2 rounded-md ml-6 cursor-pointer text-[15px]"
        onChange={handleSelectSubCategory}
        value={selectedSubCategory}
      >
        <option value="" disabled>Sub topic</option>
        {subCategories.map((subCategory, index) => (
          <option key={index} value={subCategory}>
            {subCategory}
          </option>
        ))}
      </select>

    <select
        className="w-[224px] p-2 rounded-md ml-7 mt-2 cursor-pointer text-[15px]"
        onChange={handleSelectComplexity}
        value={selectedComplexity}
      >
        <option value="" disabled>Toughness</option>
        {complexities.map((complexity, index) => (
          <option key={index} value={complexity}>
            {complexity}
          </option>
        ))}
      </select>
  </div>

  <div className="gap-2 mb-3">
   <select
        className="w-[330px] p-2 rounded-md ml-7 cursor-pointer text-[15px]"
        value={selectedCources}
        onChange={handleSelectCource}
      >
        <option value="" disabled>Cources</option>
        {cources.map(cource => (
          <option key={cource.course_id} value={cource.course_name}>
            {cource.course_name}
          </option>
        ))}
      </select>
      <select
        className="w-[290px] p-2 rounded-md ml-6 cursor-pointer text-[15px]"
        onChange={handleSelectClass}
        value={selectedClasses}
      >
        <option value="" disabled>Classes</option>
        {subCategories.map((classes, index) => (
          <option key={index} value={classes}>
            {classes}
          </option>
        ))}
      </select>
  </div>
</div>
            
    </div>

    {allquizzes && allquizzes.length >0 ?(
               <div className={styles.infoCards}>
               {/* Info cards content */}
               <div className={styles.card} style={{ paddingTop: "8px" }}>
                 <p className={styles.title}>{allquizzes[0]?.quiz_name}</p>
   
                 <div className={styles.iconContainer}>
                   <div className="z-40 mb-[2px] pl-[36px] font-normal rounded ">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                       onClick={toggleNavbar}
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                       />
                       {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                     </svg>
   
                     {isNavbarOpen && (
                       <div className={styles.infoIcons}>
                         {/* start */}
                         <div className={styles.start}>
                           <img
                             className="absolute h-[1px] w-[1px] left-[6px] top-1"
                             src={Start_button}
                             alt="Play icon"
                           />
                           <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                             Start
                           </span>
                         </div>
                         {/* Edit  */}
                         <div className={styles.start}>
                           <img
                             className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                             src={Edit_button}
                             alt="Play icon"
                           />
                           <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                             Edit
                           </span>
                         </div>
                         {/* Leaderboard */}
                         <div className={styles.start}>
                           <img
                             className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                             src={leaderboard_button}
                             alt="Play icon"
                           />
                           <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                             Leaderboard
                           </span>
                         </div>
                         {/* Share */}
   
                         <div className={styles.start}>
                           <img
                             className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                             src={Share_button}
                             alt="Play icon"
                           />
                           <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                             Share
                           </span>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
   
                 <div className={styles.category}>
                   <span className={styles.category1}>
                     {allquizzes[0]?.category}<span className={styles.category11}>
                     {allquizzes[0]?.category}
                     </span>
                   </span>
                   <p className={styles.line}>|</p>
                   <span className={styles.category2}>
                     {allquizzes[0]?.sub_category}
                     <span className={styles.category22}>{allquizzes[0]?.sub_category}</span>
                   </span>
                 </div>
   
                 <div className={styles.description}>
                   <span className={styles.description1}>{allquizzes[0]?.quiz_description}
                   <span className={styles.subdescription}>{allquizzes[0]?.quiz_description}</span></span>
                 </div>
                 <div
                   className={styles.additionalInfo}
                   style={{ marginTop: "65px" }}
                 >
                   <div
                     className={styles.infoIcon}
                     style={{ marginTop: "20px" }}
                   ></div>
                   <div className="z-0">
                     <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                       <img
                         className="h-[15px] w-[13px] pl-[3px] pb-1"
                         src={Attempt1}
                         alt="Attempts Icon"
                         width={10}
                         height={10}
                       />
                       <p>{allquizzes[0]?.quiz_attempts}</p>
                       <span className="text-[6px] ml-1">attempts</span>
                     </div>
                   </div>
   
                   <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                     <img
                       className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                       src={NoOfQuestion}
                       alt="Number of question Icon"
                       width={15}
                       height={10}
                     />{" "}
                     {allquizzes[0]?.number_of_questions}
                     <span className="text-[6px] ml-[1px]">questions</span>
                   </span>
                   <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                     <img
                       className="pb-[1px] mr-[1px] relative left-[3px] "
                       src={Clock}
                       alt="Time Icon"
                       width={14}
                       height={14}
                     />{" "}
                     {allquizzes[0]?.quiz_duration}
                     <span className="text-[6px] -ml-[0.5px]">minutes</span>
                   </span>
                   <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                     <img
                       className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                       src={Easy}
                       alt="Challenge Icon"
                       width={15}
                       height={9}
                     />{" "}
                     {allquizzes[0]?.complexity}
                   </span>
                 </div>
               </div>
   
               <div className={styles.card} style={{ paddingTop: "8px" }}>
                 <span className={styles.title}>
                   {allquizzes[1]?.quiz_name}
                 </span>
   
                 <div className={styles.iconContainer}>
                   <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                       onClick={toggleNavbar1}
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                       />
                       {isNavbarOpen ? "Close Navbar" : "Open Navbar"}
                     </svg>
                     {isNavbarOpen1 && (
                       <div className={styles.infoIcons}>
                         <img
                           className="absolute h-[1px] w-[1px] left-[6px] top-1"
                           src={Start_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                           Start
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                           src={Edit_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                           Edit
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                           src={leaderboard_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                           Leaderboard
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                           src={Share_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                           Share
                         </span>
                       </div>
                     )}
                   </div>
                 </div>
   
                 <div className={styles.category}>
                   <span className={styles.category1}>
                     {allquizzes[1]?.category}<span className={styles.category11}>{allquizzes[1]?.category}</span>
                   </span>
                   <p className={styles.line}>|</p>
                   <span className={styles.category2}>
                     {allquizzes[1]?.sub_category}<span className={styles.category22}>{allquizzes[1]?.sub_category}</span>
                   </span>
                 </div>
   
                 <div className={styles.description}>
                   <span className={styles.description1}>{allquizzes[1]?.quiz_description}
                    <span className={styles.subdescription}>{allquizzes[1]?.quiz_description}</span></span>
                 </div>
   
                 <div
                   className={styles.additionalInfo}
                   style={{ marginTop: "65px" }}
                 >
                   <div
                     className={styles.infoIcon}
                     style={{ marginTop: "20px" }}
                   ></div>
                   <div className="z-0">
                     <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                       <img
                         className="h-[15px] w-[13px] pl-[3px] pb-1"
                         src={Attempt1}
                         alt="Attempts Icon"
                         width={10}
                         height={10}
                       />
                       <p>{allquizzes[1]?.quiz_attempts}</p>
                       <span className="text-[6px] ml-1">attempts</span>
                     </div>
                   </div>
   
                   <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                     <img
                       className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                       src={NoOfQuestion}
                       alt="Number of question Icon"
                       width={15}
                       height={10}
                     />{" "}
                     {allquizzes[1]?.number_of_questions}
                     <span className="text-[6px] ml-[1px]">questions</span>
                   </span>
                   <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                     <img
                       className="pb-[1px] mr-[1px] relative left-[3px] "
                       src={Clock}
                       alt="Time Icon"
                       width={14}
                       height={14}
                     />{" "}
                     {allquizzes[1]?.quiz_duration}
                     <span className="text-[6px] -ml-[0.5px]">minutes</span>
                   </span>
                   <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                     <img
                       className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                       src={Easy}
                       alt="Challenge Icon"
                       width={15}
                       height={9}
                     />{" "}
                     {allquizzes[1]?.complexity}
                   </span>
                 </div>
               </div>
               <div className={styles.card} style={{ paddingTop: "8px" }}>
                 <span className={styles.title}>
                   {allquizzes[2]?.quiz_name}
                 </span>
   
                 <div className={styles.iconContainer}>
                   <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                       onClick={toggleNavbar2}
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                       />
                       {isNavbarOpen2 ? "Close Navbar" : "Open Navbar"}
                     </svg>
                     {isNavbarOpen2 && (
                       <div className={styles.infoIcons}>
                         <img
                           className="absolute h-[1px] w-[1px] left-[6px] top-1"
                           src={Start_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                           Start
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                           src={Edit_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                           Edit
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                           src={leaderboard_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                           Leaderboard
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                           src={Share_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                           Share
                         </span>
                       </div>
                     )}
                   </div>
                 </div>
                 <div className={styles.category}>
                   <span className={styles.category1}>
                     {allquizzes[2]?.category} <span className={styles.category11}>{allquizzes[2]?.category}</span>
                   </span>
                   <p className={styles.line}>|</p>
                   <span className={styles.category2}>
                     {allquizzes[2]?.sub_category}<span className={styles.category22}>{allquizzes[2]?.sub_category}</span>
                   </span>
                 </div>
   
                 <div className={styles.description}>
                   <span className={styles.description1}>{allquizzes[2]?.quiz_description}
                    <span className={styles.subdescription}>{allquizzes[2]?.quiz_description}</span></span>
                 </div>
                 <div
                   className={styles.additionalInfo}
                   style={{ marginTop: "65px" }}
                 >
                   <div
                     className={styles.infoIcon}
                     style={{ marginTop: "20px" }}
                   ></div>
                   <div className="z-0">
                     <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                       <img
                         className="h-[15px] w-[13px] pl-[3px] pb-1"
                         src={Attempt1}
                         alt="Attempts Icon"
                         width={10}
                         height={10}
                       />
                       <p>{allquizzes[2]?.quiz_attempts}</p>
                       <span className="text-[6px] ml-1">attempts</span>
                     </div>
                   </div>
   
                   <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                     <img
                       className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                       src={NoOfQuestion}
                       alt="Number of question Icon"
                       width={15}
                       height={10}
                     />{" "}
                     {allquizzes[2]?.number_of_questions}
                     <span className="text-[6px] ml-[1px]">questions</span>
                   </span>
                   <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                     <img
                       className="pb-[1px] mr-[1px] relative left-[3px] "
                       src={Clock}
                       alt="Time Icon"
                       width={14}
                       height={14}
                     />{" "}
                     {allquizzes[2]?.quiz_duration}
                     <span className="text-[6px] -ml-[0.5px]">minutes</span>
                   </span>
                   <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                     <img
                       className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                       src={Easy}
                       alt="Challenge Icon"
                       width={15}
                       height={9}
                     />{" "}
                     {allquizzes[2]?.complexity}
                   </span>
                 </div>
               </div>
               <div className={styles.card} style={{ paddingTop: "8px" }}>
                 <span className={styles.title}>
                   {allquizzes[3]?.quiz_name}
                 </span>
                 <div className={styles.iconContainer}>
                   <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                       onClick={toggleNavbar3}
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                       />
                       {isNavbarOpen3 ? "Close Navbar" : "Open Navbar"}
                     </svg>
                     {isNavbarOpen3 && (
                       <div className={styles.infoIcons}>
                         <img
                           className="absolute h-[1px] w-[1px] left-[6px] top-1"
                           src={Start_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                           Start
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                           src={Edit_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                           Edit
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                           src={leaderboard_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                           Leaderboard
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                           src={Share_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                           Share
                         </span>
                       </div>
                     )}
                   </div>
                 </div>
   
                 <div className={styles.category}>
                   <span className={styles.category1}>
                     {allquizzes[3]?.category}<span className={styles.category11}>{allquizzes[3]?.category}</span>
                   </span>
                   <p className={styles.line}>|</p>
                   <span className={styles.category2}>
                     {allquizzes[3]?.sub_category}<span className={styles.category22}>{allquizzes[3]?.sub_category}</span>
                   </span>
                 </div>
   
                 <div className={styles.description}>
                   <span className={styles.description1}>{allquizzes[3]?.quiz_description}
                   <span className={styles.subdescription}>{allquizzes[3]?.quiz_description}</span>
                   </span>
                 </div>
                 <div
                   className={styles.additionalInfo}
                   style={{ marginTop: "65px" }}
                 >
                   <div
                     className={styles.infoIcon}
                     style={{ marginTop: "20px" }}
                   ></div>
                   <div className="z-0">
                     <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                       <img
                         className="h-[15px] w-[13px] pl-[3px] pb-1"
                         src={Attempt1}
                         alt="Attempts Icon"
                         width={10}
                         height={10}
                       />
                       <p>{allquizzes[3]?.quiz_attempts}</p>
                       <span className="text-[6px] ml-1">attempts</span>
                     </div>
                   </div>
   
                   <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                     <img
                       className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                       src={NoOfQuestion}
                       alt="Number of question Icon"
                       width={15}
                       height={10}
                     />{" "}
                     {allquizzes[3]?.number_of_questions}
                     <span className="text-[6px] ml-[1px]">questions</span>
                   </span>
                   <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                     <img
                       className="pb-[1px] mr-[1px] relative left-[3px] "
                       src={Clock}
                       alt="Time Icon"
                       width={14}
                       height={14}
                     />{" "}
                     {allquizzes[3]?.quiz_duration}
                     <span className="text-[6px] -ml-[0.5px]">minutes</span>
                   </span>
                   <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                     <img
                       className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                       src={Easy}
                       alt="Challenge Icon"
                       width={15}
                       height={9}
                     />{" "}
                     {allquizzes[3]?.complexity}
                   </span>
                 </div>
               </div>
               <div className={styles.card} style={{ paddingTop: "8px" }}>
                 <span className={styles.title}>
                   {allquizzes[4]?.quiz_name}
                 </span>
                 <div className={styles.iconContainer}>
                   <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                       onClick={toggleNavbar4}
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                       />
                       {isNavbarOpen4 ? "Close Navbar" : "Open Navbar"}
                     </svg>
                     {isNavbarOpen4 && (
                       <div className={styles.infoIcons}>
                         <img
                           className="absolute h-[1px] w-[1px] left-[6px] top-1"
                           src={Start_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                           Start
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                           src={Edit_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                           Edit
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                           src={leaderboard_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                           Leaderboard
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                           src={Share_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                           Share
                         </span>
                       </div>
                     )}
                   </div>
                 </div>
                 <div className={styles.category}>
                   <span className={styles.category1}>
                     {allquizzes[4]?.category}<span className={styles.category11}>{allquizzes[4]?.category}</span>
                   </span>
                   <p className={styles.line}>|</p>
                   <span className={styles.category2}>
                     {allquizzes[4]?.sub_category}<span className={styles.category22}> {allquizzes[4]?.sub_category}</span>
                   </span>
                 </div>
   
                 <div className={styles.description}>
                   <span className={styles.description1}>{allquizzes[4]?.quiz_description}
                   <span className={styles.subdescription}>{allquizzes[4]?.quiz_description}</span>
                   </span>
                 </div>
                 <div
                   className={styles.additionalInfo}
                   style={{ marginTop: "65px" }}
                 >
                   <div
                     className={styles.infoIcon}
                     style={{ marginTop: "20px" }}
                   ></div>
                   <div className="z-0">
                     <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                       <img
                         className="h-[15px] w-[13px] pl-[3px] pb-1"
                         src={Attempt1}
                         alt="Attempts Icon"
                         width={10}
                         height={10}
                       />
                       <p>{allquizzes[4]?.quiz_attempts}</p>
                       <span className="text-[6px] ml-1">attempts</span>
                     </div>
                   </div>
   
                   <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                     <img
                       className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                       src={NoOfQuestion}
                       alt="Number of question Icon"
                       width={15}
                       height={10}
                     />{" "}
                     {allquizzes[4]?.number_of_questions}
                     <span className="text-[6px] ml-[1px]">questions</span>
                   </span>
                   <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                     <img
                       className="pb-[1px] mr-[1px] relative left-[3px] "
                       src={Clock}
                       alt="Time Icon"
                       width={14}
                       height={14}
                     />{" "}
                     {allquizzes[4]?.quiz_duration}
                     <span className="text-[6px] -ml-[0.5px]">minutes</span>
                   </span>
                   <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                     <img
                       className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                       src={Easy}
                       alt="Challenge Icon"
                       width={15}
                       height={9}
                     />{" "}
                     {allquizzes[4]?.complexity}
                   </span>
                 </div>
               </div>
               <div className={styles.card} style={{ paddingTop: "8px" }}>
                 <span className={styles.title}>
                   {allquizzes[5]?.quiz_name}
                 </span>
                 <div className={styles.iconContainer}>
                   <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                       onClick={toggleNavbar5}
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                       />
                       {isNavbarOpen5 ? "Close Navbar" : "Open Navbar"}
                     </svg>
                     {isNavbarOpen5 && (
                       <div className={styles.infoIcons}>
                         <img
                           className="absolute h-[1px] w-[1px] left-[6px] top-1"
                           src={Start_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                           Start
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                           src={Edit_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                           Edit
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                           src={leaderboard_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                           Leaderboard
                         </span>
                         <img
                           className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                           src={Share_button}
                           alt="Play icon"
                         />
                         <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                           Share
                         </span>
                       </div>
                     )}
                   </div>
                 </div>
   
                 <div className={styles.category}>
                   <span className={styles.category1}>
                     {allquizzes[5]?.category}<span className={styles.category11}>{allquizzes[5]?.category}</span>
                   </span>
                   <p className={styles.line}>|</p>
                   <span className={styles.category2}>
                     {allquizzes[5]?.sub_category}
                     <span className={styles.category22}>{allquizzes[5]?.sub_category}</span>
                   </span>
                 </div>
   
                 <div className={styles.description}>
                   <span className={styles.description1}>{allquizzes[5]?.quiz_description}
                   <span className={styles.subdescription}>{allquizzes[5]?.quiz_description}</span>
                   </span>
                 </div>
   
                 <div
                   className={styles.additionalInfo}
                   style={{ marginTop: "65px" }}
                 >
                   <div
                     className={styles.infoIcon}
                     style={{ marginTop: "20px" }}
                   ></div>
                   <div className="z-0">
                     <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                       <img
                         className="h-[15px] w-[13px] pl-[3px] pb-1"
                         src={Attempt1}
                         alt="Attempts Icon"
                         width={10}
                         height={10}
                       />
                       <p>{allquizzes[5]?.quiz_attempts}</p>
                       <span className="text-[6px] ml-1">attempts</span>
                     </div>
                   </div>
   
                   <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                     <img
                       className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                       src={NoOfQuestion}
                       alt="Number of question Icon"
                       width={15}
                       height={10}
                     />{" "}
                     {allquizzes[5]?.number_of_questions}
                     <span className="text-[6px] ml-[1px]">questions</span>
                   </span>
                   <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                     <img
                       className="pb-[1px] mr-[1px] relative left-[3px] "
                       src={Clock}
                       alt="Time Icon"
                       width={14}
                       height={14}
                     />{" "}
                     {allquizzes[5]?.quiz_duration}
                     <span className="text-[6px] -ml-[0.5px]">minutes</span>
                   </span>
                   <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                     <img
                       className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                       src={Easy}
                       alt="Challenge Icon"
                       width={15}
                       height={9}
                     />{" "}
                     {allquizzes[5]?.complexity}
                   </span>
                 </div>
               </div>
               {getMoreQuizzes && (
                 <div className=" ">
                   <div className="flex">
                     <div
                       className={`${styles.card} ${styles.highlightedCard}`}
                       style={{
                         paddingTop: "8px",
                         backgroundColor: "#CFFCFF",
                       }}
                     >
                       <span className={styles.title}>
                         {allquizzes[6]?.quiz_name}
                       </span>
                       <div className={styles.iconContainer}>
                         <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke-width="1.5"
                             stroke="currentColor"
                             class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                             onClick={toggleNavbar6}
                           >
                             <path
                               stroke-linecap="round"
                               stroke-linejoin="round"
                               d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                             />
                             {isNavbarOpen6 ? "Close Navbar" : "Open Navbar"}
                           </svg>
                           {isNavbarOpen6 && (
                             <div className={styles.infoIcons}>
                               <img
                                 className="absolute h-[1px] w-[1px] left-[6px] top-1"
                                 src={Start_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                                 Start
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                                 src={Edit_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                                 Edit
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                                 src={leaderboard_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                                 Leaderboard
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                                 src={Share_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                                 Share
                               </span>
                             </div>
                           )}
                         </div>
                       </div>
                       <div className={styles.category}>
                         <span className={styles.category1}>
                           {allquizzes[6]?.category}
                           <span  className={styles.category11}>{allquizzes[6]?.category}</span>
                         </span>
                         <p className={styles.line}>|</p>
                         <span className={styles.category2}>
                           {allquizzes[6]?.sub_category}
                           <span className={styles.category22}>{allquizzes[6]?.sub_category}</span>
                         </span>
                       </div>
   
                       <div className={styles.description}>
                         <span className={styles.description1}>{allquizzes[6]?.quiz_description}
                         <span className={styles.subdescription}>{allquizzes[6]?.quiz_description}</span>
                         </span>
                       </div>
                       <div
                         className={styles.additionalInfo}
                         style={{ marginTop: "65px" }}
                       >
                         <div
                           className={styles.infoIcon}
                           style={{ marginTop: "20px" }}
                         ></div>
                         <div className="z-0">
                           <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                             <img
                               className="h-[15px] w-[13px] pl-[3px] pb-1"
                               src={Attempt1}
                               alt="Attempts Icon"
                               width={10}
                               height={10}
                             />
                             <p>{allquizzes[6]?.quiz_attempts}</p>
                             <span className="text-[6px] ml-1">attempts</span>
                           </div>
                         </div>
   
                         <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                           <img
                             className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                             src={NoOfQuestion}
                             alt="Number of question Icon"
                             width={15}
                             height={10}
                           />{" "}
                           {allquizzes[6]?.number_of_questions}
                           <span className="text-[6px] ml-[1px]">questions</span>
                         </span>
                         <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                           <img
                             className="pb-[1px] mr-[1px] relative left-[3px] "
                             src={Clock}
                             alt="Time Icon"
                             width={14}
                             height={14}
                           />{" "}
                           {allquizzes[6]?.quiz_duration}
                           <span className="text-[6px] -ml-[0.5px]">minutes</span>
                         </span>
                         <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                           <img
                             className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                             src={Easy}
                             alt="Challenge Icon"
                             width={15}
                             height={9}
                           />{" "}
                           {allquizzes[6]?.complexity}
                         </span>
                       </div>
                     </div>
   
                     <div
                       className={`${styles.card} ${styles.highlightedCard}`}
                       style={{ paddingTop: "8px", backgroundColor: "#CFFCFF" }}
                     >
                       <span className={styles.title}>
                         {allquizzes[7]?.quiz_name}
                       </span>
                       <div className={styles.iconContainer}>
                         <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke-width="1.5"
                             stroke="currentColor"
                             class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                             onClick={toggleNavbar7}
                           >
                             <path
                               stroke-linecap="round"
                               stroke-linejoin="round"
                               d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                             />
                             {isNavbarOpen7 ? "Close Navbar" : "Open Navbar"}
                           </svg>
                           {isNavbarOpen7 && (
                             <div className={styles.infoIcons}>
                               <img
                                 className="absolute h-[1px] w-[1px] left-[6px] top-1"
                                 src={Start_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                                 Start
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                                 src={Edit_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                                 Edit
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                                 src={leaderboard_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                                 Leaderboard
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                                 src={Share_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                                 Share
                               </span>
                             </div>
                           )}
                         </div>
                       </div>
                       <div className={styles.category}>
                         <span className={styles.category1}>
                           {allquizzes[7]?.category}
                           <span className={styles.category11}>{allquizzes[7]?.category}</span>
                         </span>
                         <p className={styles.line}>|</p>
                         <span className={styles.category2}>
                           {allquizzes[7]?.sub_category}
                           <span className={styles.category22}>{allquizzes[7]?.sub_category}</span>
                         </span>
                       </div>
   
                       <div className={styles.description}>
                         <span className={styles.description1}>{allquizzes[7]?.quiz_description}
                         <span className={styles.subdescription}>{allquizzes[7]?.quiz_description}</span></span>
                       </div>
                       <div
                         className={styles.additionalInfo}
                         style={{ marginTop: "65px" }}
                       >
                         <div
                           className={styles.infoIcon}
                           style={{ marginTop: "20px" }}
                         ></div>
                         <div className="z-0">
                           <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                             <img
                               className="h-[15px] w-[13px] pl-[3px] pb-1"
                               src={Attempt1}
                               alt="Attempts Icon"
                               width={10}
                               height={10}
                             />
                             <p>{allquizzes[7]?.quiz_attempts}</p>
                             <span className="text-[6px] ml-1">attempts</span>
                           </div>
                         </div>
   
                         <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                           <img
                             className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                             src={NoOfQuestion}
                             alt="Number of question Icon"
                             width={15}
                             height={10}
                           />{" "}
                           {allquizzes[7]?.number_of_questions}
                           <span className="text-[6px] ml-[1px]">questions</span>
                         </span>
                         <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                           <img
                             className="pb-[1px] mr-[1px] relative left-[3px] "
                             src={Clock}
                             alt="Time Icon"
                             width={14}
                             height={14}
                           />{" "}
                           {allquizzes[7]?.quiz_duration}
                           <span className="text-[6px] -ml-[0.5px]">minutes</span>
                         </span>
                         <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                           <img
                             className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                             src={Easy}
                             alt="Challenge Icon"
                             width={15}
                             height={9}
                           />{" "}
                           {allquizzes[7]?.complexity}
                         </span>
                       </div>
                     </div>
                     <div
                       className={`${styles.card} ${styles.highlightedCard}`}
                       style={{ paddingTop: "8px", backgroundColor: "#CFFCFF" }}
                     >
                       <span className={styles.title}>
                         {allquizzes[8]?.quiz_name}
                       </span>
                       <div className={styles.iconContainer}>
                         <div className="z-40 mb-[2px] pl-[36px] font-normal rounded">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke-width="1.5"
                             stroke="currentColor"
                             class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                             onClick={toggleNavbar8}
                           >
                             <path
                               stroke-linecap="round"
                               stroke-linejoin="round"
                               d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                             />
                             {isNavbarOpen8 ? "Close Navbar" : "Open Navbar"}
                           </svg>
                           {isNavbarOpen8 && (
                             <div className={styles.infoIcons}>
                               <img
                                 className="absolute h-[1px] w-[1px] left-[6px] top-1"
                                 src={Start_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black">
                                 Start
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[15px]"
                                 src={Edit_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                                 Edit
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[26px] "
                                 src={leaderboard_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[26px] left-[36px]  cursor-pointer hover:text-black">
                                 Leaderboard
                               </span>
                               <img
                                 className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[37px] "
                                 src={Share_button}
                                 alt="Play icon"
                               />
                               <span className="text-[5px] -ml-[18px] absolute top-[37px] left-[36px] cursor-pointer hover:text-black">
                                 Share
                               </span>
                             </div>
                           )}
                         </div>
                       </div>
                       <div className={styles.category}>
                         <span className={styles.category1}>
                           {allquizzes[8]?.category}
                           <span className={styles.category11}>{allquizzes[8]?.category}</span>
                         </span>
                         <p className={styles.line}>|</p>
                         <span className={styles.category2}>
                           {allquizzes[8]?.sub_category}
                           <span className={styles.category22}>{allquizzes[8]?.sub_category}</span>
                         </span>
                       </div>
   
                       <div className={styles.description}>
                         <span className={styles.description1}>{allquizzes[8]?.quiz_description}
                         <span className={styles.subdescription}>{allquizzes[8]?.quiz_description}</span>
                         </span>
                       </div>
                       <div
                         className={styles.additionalInfo}
                         style={{ marginTop: "65px" }}
                       >
                         <div
                           className={styles.infoIcon}
                           style={{ marginTop: "20px" }}
                         ></div>
                         <div className="z-0">
                           <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[10px] -top-[90px] hover:text-black ">
                             <img
                               className="h-[15px] w-[13px] pl-[3px] pb-1"
                               src={Attempt1}
                               alt="Attempts Icon"
                               width={10}
                               height={10}
                             />
                             <p>{allquizzes[8]?.quiz_attempts}</p>
                             <span className="text-[6px] ml-1">attempts</span>
                           </div>
                         </div>
   
                         <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                           <img
                             className="pb-[1px] pt-[2px] -mt-1  relative bottom-[2px]"
                             src={NoOfQuestion}
                             alt="Number of question Icon"
                             width={15}
                             height={10}
                           />{" "}
                           {allquizzes[8]?.number_of_questions}
                           <span className="text-[6px] ml-[1px]">questions</span>
                         </span>
                         <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                           <img
                             className="pb-[1px] mr-[1px] relative left-[3px] "
                             src={Clock}
                             alt="Time Icon"
                             width={14}
                             height={14}
                           />{" "}
                           {allquizzes[8]?.quiz_duration}
                           <span className="text-[6px] -ml-[0.5px]">minutes</span>
                         </span>
                         <span className="flex text-[6px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
                           <img
                             className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
                             src={Easy}
                             alt="Challenge Icon"
                             width={15}
                             height={9}
                           />{" "}
                           {allquizzes[8]?.complexity}
                         </span>
                       </div>
                     </div>
                   </div>
                   {/* attempted-quiz  */} 
                 </div>
               )}
             </div>
            ):(
              <div className="pl-[110px] font-light my-2">No quizzes are available right now</div>
            )}
    </div>
    </div>
      <LogoutBar/>
    </div>
  );
};

export default Quiz;
