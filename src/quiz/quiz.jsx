// Dashboard.js
import React , { useState, useEffect } from "react";
import Select from 'react-select';
import styles from "./quiz.module.css";
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx"
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import { useNavigate } from "react-router-dom";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Start_button from "../../public/images/dashboard/Start-button.png";
import Share_button from "../../public/images/dashboard/Share-button.png";
import leaderboard_button from "../../public/images/dashboard/leaderboard-button.png";
import Edit_button from "../../src/assets/Images/dashboard/Edit-button.png";
import download from "../../src/assets/Images/dashboard/download.png";
import high_score from "../../src/assets/Images/dashboard/high-score.png";
import eye from "../../src/assets/Images/dashboard/eye.png";
import Attempt1 from "../../public/images/dashboard/Attempt1.png";
import NoOfQuestion from "../../public/images/dashboard/NoOfQuestion.png";
import Easy from "../../public/images/dashboard/Easy.png";
import Clock from "../../public/images/dashboard/Clock.png";


const Quiz = () => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState("");
  const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30;
  const maxValue2 = 80; 

  const [allquizzes, setAllquizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  const [dataRanges, setDataRanges] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const [popularity, setPopularity] = useState([]);
  const [selectedPopularity,setSelectedPopularity]=useState([]);

  const [courses, setCourses] = useState([]);
  const [selectedCourses,setSelectedCourses]=useState([]);

  const [classes, setClasses] = useState([]);
  const [selectedClasses,setSelectedClasses]=useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const [complexities, setComplexities] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState([]);

  const [createdBy, setCreatedBy] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState([]);

  const [data, setData] = useState("")
  const [timeData, setTimeData] = useState(null);
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(null);
  const [averageScorePercentage, setAverageScorePercentage] = useState(null);

  const [getMoreQuizzes, setGetMoreQuizzes] = useState(false);
  // const [allquizzes, setAllquizzes] = useState([]);
 
  // Filtered quizzes based on selected dropdown options
  // const filteredQuizzes = allquizzes.filter((quizItem) => {
  //   return (
  //     (selectedCategory === "" || quizItem.category === selectedCategory) &&
  //     (selectedSubCategory === "" || quizItem.sub_category === selectedSubCategory) &&
  //     (selectedComplexity === "" || quizItem.complexity === selectedComplexity) &&
  //     (selectedCources === "" || quizItem.course === selectedCources) &&
  //     (selectedClasses === "" || quizItem.class === selectedClasses)
  //   );
  // });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);
      try {
        const response = await fetch(
          `https://quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const result = await response.json();
        console.log("quizzes received data:", result);
        
        const data = result.data[0];
        if (!data) {
          throw new Error('No data found');
        }
  
        setTimeData(data.time_spent || []);
        setWeeklyQuizCount(data.weekly_quiz_count || 0);
        setAverageScorePercentage(parseFloat(data.average_score_percentage) || 0);
        setAllquizzes(data.all_quizzes || []);

          // Extract unique dropdowns and sort them alphabetically
        const uniqueValues = (key) =>[...new Set(data.all_quizzes.map(quiz => quiz[key]))].sort();
        setDataRanges(uniqueValues('date_range'));
        setPopularity(uniqueValues('attempts_rank'));
        setCategories(uniqueValues('category'));
        setSubCategories(uniqueValues('sub_category'));
        setComplexities(uniqueValues('complexity'));
        setCourses(uniqueValues('course_name'));
        setClasses(uniqueValues('class_name'));
        setCreatedBy(uniqueValues('created_by'));
  
        const userDetails = data.audit_details;
        setUsername(userDetails.full_name);

      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } 
    };
  
    fetchQuizData();
  }, [userId]);

  const [cardStates, setCardStates] = useState(Array(allquizzes.length).fill(false));
  const toggleNavbar = (index) => {
    setCardStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  const [cardStatus, setCardStatus] = useState(Array(allquizzes.length).fill(false));
  const toggleNavbar1 = (index) => {
    setCardStatus((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };
  
  const Edit = (quizId) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/editmanuly`);
  };

  const leaderboard = (quizId) => {
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate('/quiz-results1', { state: { quizId } })
  };


  const quizresults = (quizId, attemptId) => {
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    localStorage.setItem("quiz_level_attempt_id", attemptId); // Store attempt_id in local storage
    navigate(`/quizview_results`);
  };

  const handleStartQuiz = (quizId) => {
    // navigate(`/quizaccess/${quizId}`);
    localStorage.setItem("quiz_id", quizId); // Store quiz_id in local storage
    navigate(`/quizaccess`);
  };

  useEffect(() => {
    const filtered = allquizzes.filter((quizItem) => {
      const matchesCategory = !selectedCategory.length || selectedCategory.includes(quizItem.category);
      const matchesSubCategory = !selectedSubCategory.length || selectedSubCategory.includes(quizItem.sub_category);
      const matchesComplexity = !selectedComplexity.length || selectedComplexity.includes(quizItem.complexity);
      const matchesCourse = !selectedCourses.length || selectedCourses.includes(quizItem.course_name);
      const matchesClass = !selectedClasses.length || selectedClasses.includes(quizItem.class_name);
      const matchesCreatedBy = !selectedCreatedBy.length || selectedCreatedBy.includes(quizItem.created_by);
      return matchesCategory && matchesSubCategory && matchesComplexity && matchesCourse && matchesCreatedBy && matchesClass;
    });
    setFilteredQuizzes(filtered);
  }, [allquizzes, selectedCategory, selectedSubCategory, selectedComplexity, selectedCourses, selectedClasses,selectedCreatedBy]);
  
  // Custom styles for react-select to match your existing dropdown design
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 'auto',
      minWidth: '183px',
      padding: '2px',
      marginLeft: '-2px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px',
      backgroundColor: '#f3d0d5',
      border: 'none',
      outline: 'none',
      boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none', // Focused state border
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#f3d0d5',
      overflowX: 'hidden',
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#A5CCE3' : '#f3d0d5',
      color: 'black',
      fontSize: '10px',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      padding: '5px 10px', // Adjusted padding for better alignment
      lineHeight: '1.2', // Adjusted line-height for better alignment
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e5e5e5',
      height: 'auto', // Adjusted to auto height for better text wrapping
      padding: '2px', // Adjusted padding for better text alignment
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black',
      fontSize: '10px',
      lineHeight: 'normal',
      maxWidth: '100px', // Adjusted to prevent text overflow
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      fontSize: '10px', // Adjust font size for remove icon
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: 'bold',
      color: '#495487', // Custom color for the placeholder
      fontSize: '10px',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#495487', // Custom color for the dropdown indicator arrow
    }),
    indicatorSeparator: () => ({
      display: 'none', // Remove the indicator separator
    }),
  };


  return (
    <div className={styles.container}>
      <Navigation/>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome {username}</p>
          <div className={styles.headerRight}>
          <div className="w-[99px] h-[41px] absolute mr-[170px] -mt-2 rounded-[10px] bg-[#f3d0d5]">
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
        <div className={styles.completionInfo} style={{background:"#30CDF040"}}>
        You've completed  {weeklyQuizCount} Quizzes this week with an average score of {averageScorePercentage}%
        </div>
       
        <div className={styles.contentWrapper1}>
          {/* <div className={styles.latestQuizHeader}>
            <p className="text-[16px] font-Poppins -ml-[18.5px]">Sort by</p>
          </div> */}
         
  <div className={styles.infoCards} >
 <div className={styles.sortBy}>
  <div className="flex gap-1 mb-3 bg-[#f3d0d5] border-none px-2 ml-8 mr-4 -pl-[30px] rounded-md">
    {/* DataRange  */}
    <Select
        isMulti
        options={dataRanges.map(dtrng => ({ value: dtrng, label: dtrng }))}
        value={selectedDateRange.map(dtrng => ({ value: dtrng, label: dtrng }))}
        onChange={(selected) => setSelectedDateRange(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Data Range"
      />
      {/* Popularity  */}
      <Select
        isMulti
        options={popularity.map(plr => ({ value: plr, label: plr }))}
        value={selectedPopularity.map(plr => ({ value: plr, label: plr }))}
        onChange={(selected) => setSelectedPopularity(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Popularity"
      />
       {/* Category */}
   <Select
        isMulti
        options={categories.map(cat => ({ value: cat, label: cat }))}
        value={selectedCategory.map(cat => ({ value: cat, label: cat }))}
        onChange={(selected) => setSelectedCategory(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Category"
      />
{/* subcategories  */}
      <Select
        isMulti
        options={subCategories.map(subcat => ({ value: subcat, label: subcat }))}
        value={selectedSubCategory.map(subcat => ({ value: subcat, label: subcat }))}
        onChange={(selected) => setSelectedSubCategory(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Sub Category"
       />
  </div>
  <div className="flex gap-1 mb-3 bg-[#f3d0d5] border-none px-2 ml-8 mr-4 -pl-[30px] rounded-md">
    {/* complexity    */}
    <Select
        isMulti
        options={complexities.map(complex => ({ value: complex, label: complex }))}
        value={selectedComplexity.map(complex => ({ value: complex, label: complex }))}
        onChange={(selected) => setSelectedComplexity(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Complecity"
      />
   {/* Courses  */}
   <Select
        isMulti
        options={courses.map(crs => ({ value: crs, label: crs }))}
        value={selectedCourses.map(crs => ({ value: crs, label: crs }))}
        onChange={(selected) => setSelectedCourses(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Courses"
      />
    {/* classes    */}
    <Select
        isMulti
        options={classes.map(cls => ({ value: cls, label: cls }))}
        value={selectedClasses.map(cls => ({ value: cls, label: cls }))}
        onChange={(selected) => setSelectedClasses(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Classes"
      />
     {/* CreatedBy   */}
     <Select
        isMulti
        options={createdBy.map(ctdBy => ({ value: ctdBy, label: ctdBy }))}
        value={selectedCreatedBy.map(ctdBy => ({ value: ctdBy, label: ctdBy }))}
        onChange={(selected) => setSelectedCreatedBy(selected.map(item => item.value))}
        styles={customStyles}
        placeholder="Created By"
      />
  </div>
</div>
</div>

 <div className="mx-auto">
 <div className="flex flex-wrap mx-auto ml-[35px] -mt-[10px]">
            {filteredQuizzes.map((quizItem, index) => (
               <div
               key={index}
               className=""         
             >
              {quizItem.attempt_flag === 'Y' ?(
                <div
                key={index} className={styles.card}
                style={{
                  width:"245px",
                  paddingTop: "8px",
                  paddingTop:"20px",
                  marginTop:"20px",
                  marginRight:"10px",
                  backgroundColor: "#fee2e2",               
                }}
              >
                <span className="relative group">
                <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate -mt-[10px]">
                {quizItem.quiz_name}
                </span>
                <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                {quizItem.quiz_name}
                </span>
              </span>
                  <div className={styles.iconContainer}>
                    <div className="z-20 mb-[2px] pl-[36px] font-normal rounded -mt-[13px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4 -ml-[27px] cursor-pointer rounded-lg hover:bg-slate-200"
                        onClick={() => toggleNavbar(index)}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                        {cardStates[index] ? "Close Navbar" : "Open Navbar"}
                      </svg>
                      {cardStates[index]  && (
                        <div className={styles.infoIcons}>
                          <img
                            className="absolute h-[1px] w-[1px] left-[6px] top-1"
                            src={eye}
                            alt="Play icon"
                          />
                          <span className="text-[8px] pl-[27px] -ml-[9px]  cursor-pointer hover:text-black"
                          onClick={() =>
                            quizresults(quizItem.quiz_id,quizItem.quiz_level_attempt_id)
                          }>
                            View
                          </span>
                          <img
                            className="absolute h-[10px] w-[10px]  left-[14px] -ml-2 top-[17px]"
                            src={download}
                            alt="download icon"
                          />
                          <span className="text-[8px] -ml-[18px] absolute top-[15px] left-9 cursor-pointer hover:text-black">
                            Download
                          </span>
                          <img
                            className={styles.leaderboardimage} style={{marginTop:"1px"}}
                            src={leaderboard_button}
                            alt="Play icon"
                          />
                          <span
                            className={styles.leaderboardtext}
                            onClick={() => leaderboard(quizItem.quiz_id)}
                          >
                            Leaderboard
                          </span>
                          <img
                            className={styles.shareimage} style={{marginTop:"2px"}}
                            src={Share_button}
                            alt="Play icon"
                          />
                          <span className={styles.sharetext} onClick={() => handleStartQuiz(quizItem.quiz_id)}>Retake</span>
                        </div>
                      )}
                    </div>
                  </div>

 <div className="flex mt-5">
  <span className="relative group">
    <span className="text-[#002366] ml-[10px] mt-4 w-[50px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.category}
    </span>  
  </span>

  <p className="px-[2px] font-normal">|</p>
  
  <span className="relative group">
    <span className="text-[#002366] w-[100px] cursor-pointer z-0 truncate text-[9px] font-normal">
    {quizItem.sub_category}
    </span>
    <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
    {quizItem.sub_category}
    </span>  
  </span>
      </div>
      
      {/* <div className="h-[1px] w-full bg-white"></div> */}
{/* <div className="h-[3px] w-full bg-white"></div> */}
  <div className="relative group mt-1">
  <span className="text-wrap mt-[6px] text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
    {quizItem.quiz_description}
  </span>
  <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
    {quizItem.quiz_description}
  </span>
</div>
<div className="h-[2px] w-full bg-white"></div>

      <div style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}>
      <div className="h-[85px] rounded w-full bg-[#F5F5F5]">
      <div className="text-[7px] font-normal pl-[10px] relative top-[73px]">
                    <span>
                      {quizItem.pass_flag ? 'Pass' : 'Fail'}
                      </span>
                    <span className="px-[4px]">|</span>
                    <span>
                      {quizItem.speed_rank}
                      <sup>th</sup>Fastest
                    </span>
                    <span className="px-[3px]">|</span>
                    <span>
                      {quizItem.score_rank} <sup>th</sup>Highest
                    </span>
                    <span className="px-[3px]">|</span>
                    <span>
                      {quizItem.attained_percentage}% Score
                    </span>
                    <span className="px-[3px]">|</span>
                    <span>{quizItem.quiz_grade} Grade</span>
                  </div>
                  <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[50px] left-[10px]">
                  <div>Created By :
                    <span className="pl-[2px]">{quizItem.created_by}</span>
                  </div>
                  {/* <div>Created On</div> */}
                  </div>

                  <div
                    className={styles.additionalInfo}
                    style={{ marginTop: "25px" }}
                  >
                    <div
                      className={styles.infoIcon}
                      style={{ marginTop: "20px",marginRight:"20px" }}
                    ></div>
                    <div className="z-0">
                      <div className="text-[7px] flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366]  relative -left-[8px] -top-[90px] hover:text-black ">
                        <img
                          className={styles.attemptsimage}
                          src={Attempt1}
                          alt="Attempts Icon"
                          width={10}
                          height={10}
                        />
                        <p>{quizItem.quiz_attempts} </p>
                        <span
                          title="number of times quiz attempted"
                          className="text-[8px] -ml-[1px] cursor-pointer"
                        >
                          quiz attempts
                        </span>
                      </div>
                    </div>

                    <span className="text-[8px] flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[12px] hover:text-black">
                      <img
                        className="pb-[1px] pt-[4px] -mt-1  relative bottom-[2px]"
                        src={high_score}
                        alt="Number of question Icon"
                        width={15}
                        height={15}

                      />{" "}
                      {quizItem.attained_score}/
                      {quizItem.quiz_total_marks}
                      <div
                        title="attained score/total score"
                        className="cursor-pointer text-[6px]"
                      >
                        <span className="text-[8px] -ml-[1px]">score</span>
                      </div>
                    </span>
                    <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                      <img
                        className="pb-[1px] mr-[1px] relative left-[3px] "
                        src={NoOfQuestion}
                        alt="Time Icon"
                        width={14}
                        height={14}
                      />{" "}
                      {quizItem.attempted_questions}/
                      {quizItem.number_of_questions}
                      <div
                        title="attempted qustions/total questions"
                        className="cursor-pointer text-[6px]"
                      >
                        <span className="text-[8px] -ml-[1px]">attemped</span>
                      </div>
                    </span>
                    <span className="text-[7px] flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded  relative -left-[14px] hover:text-black ">
                      <img
                        className="pb-[1px] mr-[1px] relative left-[3px] "
                        src={Clock}
                        alt="Time Icon"
                        width={14}
                        height={14}
                      />{" "}
                      {quizItem.attempt_duration_mins}/
                      {quizItem.quiz_duration}
                      <div
                        title="time taken for attempted/total duration of quiz "
                        className="cursor-pointer text-[6px]"
                      >
                        <span className="text-[8px] -ml-[1px]">duration</span>
                      </div>
                    </span>
                  </div>
        </div>
        </div>
    
                </div>
              ):(
                <div
              className={styles.card}
              style={{
                width: "245px",
                paddingTop: "8px",
                marginRight: "10px",
                marginTop:"20px",
                backgroundColor: "#CBF2FB",
              }}
            >
             <span className="relative group">
              <span className="text-[10px] text-[#002366] absolute ml-[10px] w-[195px] cursor-pointer z-0 truncate">
                {quizItem.quiz_name}
              </span>
              <span className="text-nowrap cursor-pointer hidden group-hover:inline-block absolute left-2 top-4 w-auto z-30 bg-black text-white px-1 border border-black-300 rounded">
                {quizItem.quiz_name}
              </span>
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
                  onClick={() => toggleNavbar1(index)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                  {cardStatus[index] ? "Close Navbar" : "Open Navbar"}
                </svg>
  
                {cardStatus[index] && (
                  <div className={styles.infoIcons}>
                    <div className={styles.start}>
                      <img className={styles.startimage} src={Start_button} alt="Play icon" />
                      <span className={styles.starttext} onClick={() => handleStartQuiz(quizItem.quiz_id)}>Start</span>
                    </div>
                    <div className={styles.edit}>
                      <img className={styles.editimage} src={Edit_button} alt="Edit icon" />
                      <span className={styles.edittext} onClick={() => Edit(quizItem.quiz_id)}>Edit</span>
                    </div>
                    <div className={styles.leaderboard}>
                      <img className={styles.leaderboardimage} src={leaderboard_button} alt="Leaderboard icon" />
                      <span className={styles.leaderboardtext} onClick={() => leaderboard(quizItem.quiz_id)}>Leaderboard</span>
                    </div>
                    <div className={styles.share}>
                      <img className={styles.shareimage} src={Share_button} alt="Share icon" />
                      <span className={styles.sharetext}>Share</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
  
            <div className="flex mt-[10px] relative top-[9px]">
              <span className="relative group">
                <span className="text-[#002366] ml-[10px] w-[50px] cursor-pointer z-0 truncate text-[9px] font-normal">
                  {quizItem.category}
                </span>
                <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-2 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                  {quizItem.category}
                </span>
              </span>
              <p className="px-[2px] font-normal">|</p>
              <span className="relative group">
                <span className="text-[#002366] mt-4 w-[100px] cursor-pointer z-0 truncate text-[9px] font-normal">
                  {quizItem.sub_category}
                </span>
                <span className="text-nowrap cursor-pointer absolute hidden group-hover:inline-block left-0 top-[14px] w-auto z-30 bg-black text-white px-1 py-0.5 border border-black-300 rounded">
                  {quizItem.sub_category}
                </span>
              </span>
            </div>
            <div className="text-[#002366] flex font-semibold text-[6px] gap-[60px] relative top-[75px] left-[12px]">
            <div>Created By :
                      <span className="pl-[2px]">{quizItem.created_by}</span>
                    </div>
                    {/* <div>Created On</div> */}
                    </div>
            {/* <div style={{ backgroundColor: "#EFEFEF", padding: "2px 0" }}>
              <div className="h-[10px] w-full bg-[#D9D9D9]"></div>
            </div> */}
  
            <div className="relative group mt-1 ">
              <span className="mt-[6px] text-wrap text-[8px] font-normal absolute ml-[10px] w-[140px] cursor-pointer z-0 truncate line-clamp-4">
                {quizItem.quiz_description}
              </span>
              <span className="cursor-pointer hidden group-hover:inline-block absolute left-2 top-0 w-auto max-w-[280px] z-30 bg-black text-white py-1 px-1 border border-black-300 rounded leading-tight">
                {quizItem.quiz_description}
              </span>
            </div>
            
            <div className="h-[2px] w-full bg-white"></div>
  
            <div style={{ backgroundColor: "#F9F9F9", padding: "1px 0" }}>
              <div className="h-[85px] rounded w-full bg-[#F5F5F5]">
  
              <div className={styles.additionalInfo} style={{ position: "relative", top: "55px" }}>
              <div className={styles.infoIcon} style={{ marginTop: "25px" }}></div>
              <div className="z-0">
                <div className="flex gap-[5px] h-[18px] w-[105px] pt-[4px] rounded text-[#002366] relative -left-[10px] -top-[90px] hover:text-black">
                  <img className="h-[15px] w-[13px] pl-[3px] pb-1" src={Attempt1} alt="Attempts Icon" width={10} height={10} />
                  <p>{quizItem.quiz_attempts}</p>
                  <span className="text-[8px] ml-1">attempts</span>
                </div>
              </div>
  
              <span className="flex pl-[2px] pt-[1.5px] -mt-[89.5px] gap-[3px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[12px] hover:text-black">
                <img className="pb-[1px] pt-[2px] -mt-1 relative bottom-[2px]" src={NoOfQuestion} alt="Number of question Icon" width={15} height={10} />
                {quizItem.number_of_questions}
                <span className="text-[8px] ml-[1px]">questions</span>
              </span>
              <span className="flex pl-[2px] pt-[2px] pb-[2px] -mt-[0.5px] gap-[5px] text-[#002366] h-[18px] w-[106px] rounded relative -left-[14px] hover:text-black">
                <img className="pb-[1px] mr-[1px] relative left-[3px]" src={Clock} alt="Time Icon" width={14} height={14} />
                {quizItem.quiz_duration}
                <span className="text-[8px] -ml-[0.5px]">minutes</span>
              </span>
              <span className="flex text-[9px] pt-1 -mt-[4px] gap-[3px] h-[18px] text-[#002366] w-[106px] rounded relative -left-[10px] hover:text-black">
                <img className="ml-[1px] pl-[2px] pt-[1px] pb-[2px] pr-[2px]" src={Easy} alt="Challenge Icon" width={15} height={9} />
                {quizItem.complexity}
              </span>
            </div>
              </div>
            </div>

              </div>
              )}
              </div>
            ))}
    </div>
  </div>         
            
    </div>
    </div>
      <LogoutBar/>
    </div>
  );
};

export default Quiz;
