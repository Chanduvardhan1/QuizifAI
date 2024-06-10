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
  const [selectedCources,setSelectedCources]=useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClasses,setSelectedClasses]=useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [complexity, setComplexity] = useState("");
  const [complexities, setComplexities] = useState([]);

  const [selectedComplexity, setSelectedComplexity] = useState("");
  const [timeData, setTimeData] = useState(null);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(null);
  const [averageScorePercentage, setAverageScorePercentage] = useState(null);
  const [allquizzes, setAllquizzes] = useState([]);
  const [getMoreQuizzes, setGetMoreQuizzes] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState();
 
  // Filtered quizzes based on selected dropdown options
  const filteredQuizzes = allquizzes.filter((quizItem) => {
    return (
      (selectedCategory === "" || quizItem.category === selectedCategory) &&
      (selectedSubCategory === "" || quizItem.sub_category === selectedSubCategory) &&
      (selectedComplexity === "" || quizItem.complexity === selectedComplexity) &&
      (selectedCources === "" || quizItem.course === selectedCources) &&
      (selectedClasses === "" || quizItem.class === selectedClasses)
    );
  });

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
              username: username,
              quiz_complexity_name: selectedComplexity,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        console.log("Data received:", data);

        if(data.all_quizes){
          console.log("quizzes:",data.all_quizes);
          setAllquizzes(data.all_quizes);
        }
        else{
          console.log("all_quizzes property not yet found in response");
        }
        setTimeData(data.time_spent);
        // setLatestResults(data.latest_results);
        setWeeklyQuizCount(data.weekly_quiz_count);
        setAverageScorePercentage(data.average_score_percentage);
        // setNotAttemptedQuizzes(data.latest_not_attempted_quizzes);
        // setAttemptedQuizzes(data.latest_attempted_quizzes);
        // setTopScoredQuizzes(data.top_scored_quizzes);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } 
    };

    fetchQuizData();
  }, [userId, username]);

  const toggleNavbar =() =>{
    setIsNavbarOpen(!isNavbarOpen);
  };

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

  return (
    <div className={styles.container}>
      <Navigation/>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome {username}</p>
          <div className={styles.headerRight}>
          <div className="w-[99px] h-[41px] absolute mr-[170px] -mt-2 rounded-[10px] bg-[#F0B8C1]">
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
        <div className={styles.completionInfo} style={{background:"#A5CCE3"}}>
        You've completed  {weeklyQuizCount} Quizzes this week with an average score of {averageScorePercentage}%
        </div>
       
        <div className={styles.contentWrapper1}>
          {/* <div className={styles.latestQuizHeader}>
            <p className="text-[16px] font-Poppins -ml-[18.5px]">Sort by</p>
          </div> */}
         
  <div className={styles.infoCards}>
 <div className={styles.sortBy}>
  {/* <p className="ml-8 my-3 font-Poppins font-medium">Sort by:</p> */}
  <div className="gap-1 mb-3 bg-[#F0B8C1] border-none px-2 ml-6 rounded-md">
  <select
        className="w-[100px] rounded-md ml-4 cursor-pointer text-[10px] bg-[#F0B8C1] border-none"
        style={{ border: "none", outline: "none" }}
        value={selectedCategory}
        onChange={handleSelectCategory}
      >
        <option value="" disabled style={{background:"#A5CCE3"}}>Date Range</option>
        {categories.map(category => (
          <option key={category.category_id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </select>
      <select
        className="w-[100px] p-2 rounded-md cursor-pointer text-[10px] bg-[#F0B8C1] border-none"
        style={{ border: "none", outline: "none" }}
        value={selectedCategory}
        onChange={handleSelectCategory}
      >
        <option value="" disabled style={{background:"#A5CCE3"}}>Popularity</option>
        {categories.map(category => (
          <option key={category.category_id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </select>
  <select
        className="w-[100px] p-2 rounded-md ml-1 cursor-pointer text-[11px] bg-[#F0B8C1] border-none"
        style={{ border: "none", outline: "none" }}
        value={selectedCategory}
        onChange={handleSelectCategory}
      >
        <option value="" disabled>Category</option>
        {categories.map(category => (
          <option key={category.category_id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </select>

    <select
        className="w-[100px] p-2 rounded-md ml-1 cursor-pointer text-[11px] bg-[#F0B8C1]"
        style={{ border: "none", outline: "none" }}
        onChange={handleSelectSubCategory}
        value={selectedSubCategory}
      >
        <option value="" disabled style={{background:"#A5CCE3"}}>Sub Category</option>
        {subCategories.map((subCategory, index) => (
          <option key={index} value={subCategory}>
            {subCategory}
          </option>
        ))}
      </select>

    <select
        className="w-[100px] p-2 rounded-md ml-1 mt-2 cursor-pointer text-[11px] bg-[#F0B8C1]"
        style={{ border: "none", outline: "none" }}
        onChange={handleSelectComplexity}
        value={selectedComplexity}
      >
        <option value="" disabled style={{background:"#A5CCE3"}}>Complexity</option>
        {complexities.map((complexity, index) => (
          <option key={index} value={complexity}>
            {complexity}
          </option>
        ))}
      </select>
      <select
        className="w-[90px] p-2 rounded-md ml-1 cursor-pointer text-[11px] bg-[#F0B8C1]"
        style={{ border: "none", outline: "none" }}
        value={selectedCources}
        onChange={handleSelectCource}
      >
        <option value="" disabled>Courses</option>
        {cources.map(cource => (
          <option key={cource.course_id} value={cource.course_name}>
            {cource.course_name}
          </option>
        ))}
      </select>
      <select
        className="w-[90px] p-2 rounded-md ml-1 cursor-pointer text-[11px] bg-[#F0B8C1] pr-[15px]"
        style={{ border: "none", outline: "none" }}
        onChange={handleSelectClass}
        value={selectedClasses}
      >
        <option value="" disabled style={{background:"#A5CCE3"}}>Classes</option>
        {classes.map((classes, index) => (
          <option key={index} value={classes}>
            {classes}
          </option>
        ))}
      </select>
  </div>
</div>
</div>

<div className={styles.container1}>
{filteredQuizzes.length > 0 ?(
    filteredQuizzes.map((quizItem, index) =>(
      <div className={styles.infoCards}>
    {/* Info cards content */}
    <div className={styles.card} key={index} style={{ paddingTop: "8px",marginTop:"15px" }}>
    <span className="relative group">
                <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate underline underline-offset-2">
                {quizItem.quiz_name}
                </span>
                <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                {quizItem.quiz_name}
                </span>
    </span>

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
                           className={styles.startimage}
                           src={Start_button}
                           alt="Play icon"
                         />
                         <span
                           className={styles.starttext}
                           onClick={() =>
                             handleStartQuiz(latestquizzes[0].quiz_id)
                           }
                         >
                           Start
                         </span>
                       </div>
              {/* Edit  */}
              <div className={styles.edit}>
                         <img
                           className={styles.editimage}
                           src={Edit_button}
                           alt="Play icon"
                         />
                         <span
                           className={styles.edittext}
                           onClick={() => Edit(latestquizzes[0].quiz_id)}
                         >
                           Edit
                         </span>
                       </div>
              {/* Leaderboard */}
              <div className={styles.leaderboard}>
                         <img
                           className={styles.leaderboardimage}
                           src={leaderboard_button}
                           alt="Play icon"
                         />
                         <span
                           className={styles.leaderboardtext}
                           
                         >
                           Leaderboard
                         </span>
                       </div>
              {/* Share */}

              <div className={styles.share}>
                         <img
                           className={styles.shareimage}
                           src={Share_button}
                           alt="Play icon"
                         />
                         <span className={styles.sharetext}>Share</span>
                       </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-5">
  <span className="relative group">
    <span className="ml-[10px] mt-4 w-[50px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.category}
    </span>  
  </span>

  <p className="px-[2px] font-normal">|</p>
  
  <span className="relative group">
    <span className="mt-4 w-[100px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.sub_category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.sub_category}
    </span>  
  </span>
      </div>
      <div className="relative group mt-1">
  <span className="text-wrap text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
    {quizItem.quiz_description}
  </span>
  <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
    {quizItem.quiz_description}
  </span>
      </div>

      <div
        className={styles.additionalInfo}
        style={{ position:"relative",top:"55px" }}
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
            <p>{quizItem.quiz_attempts}</p>
            <span className="text-[8px] ml-1">attempts</span>
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
          {quizItem.number_of_questions}
          <span className="text-[8px] ml-[1px]">questions</span>
        </span>
        <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
          <img
            className="pb-[1px] mr-[1px] relative left-[3px] "
            src={Clock}
            alt="Time Icon"
            width={14}
            height={14}
          />{" "}
          {quizItem.quiz_duration}
          <span className="text-[8px] -ml-[0.5px]">minutes</span>
        </span>
        <span className="flex text-[9px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded  relative -left-[10px] hover:text-black">
          <img
            className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]"
            src={Easy}
            alt="Challenge Icon"
            width={15}
            height={9}
          />{" "}
          {quizItem.complexity}
        </span>
      </div>
    </div>
  </div>
    ))
   ):(
    <div className="ml-[50px] text-red-500">No quizzes available</div>
   )}
      </div>         
            
    </div>
    </div>
      <LogoutBar/>
    </div>
  );
};

export default Quiz;
