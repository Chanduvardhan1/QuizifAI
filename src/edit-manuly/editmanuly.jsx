"use client";
import React, { useState, useEffect, useRef } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import Navigation from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

// Navbar-icons
import QuizifAilogo from "../assets/Images/images/home/Quizifai3.png";
import Dashboard from "../assets/Images/quiz-type/Dashboard.png";
import Quiz from "../assets/Images/quiz-type/Quiz.png";
import History from "../assets/Images/quiz-type/History.png";
import Schedule from "../assets/Images/quiz-type/Schedule.png";
import Notification from "../assets/Images/quiz-type/Notification.png";
import QuizAdmin from "../assets/Images/quiz-type/Quiz-admin.png";
import Profile from "../assets/Images/quiz-type/Profile.png";
import eye from "../assets/Images/dashboard/infoIcon.png";
// Main-Section-icons
import QuizTitle from "../assets/Images/quiz-type/Quiz-Title.png";
import QuizDiscription from "../assets/Images/quiz-type/Quiz-discription.png";
import Next from "../assets/Images/quiz-type/Next.png";
import { FiAlertCircle } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";

import CreateOrEdit from "../assets/Images/quiz-type/Create-Edit.png";
import Line from "../assets/Images/quiz-type/Line.png";
import Time from "../assets/Images/quiz-type/Time.png";
import Dropdown from "../assets/Images/quiz-type/Dropdown.png";
import A from "../assets/Images/quiz-type/A.png";
import RedToggle from "../assets/Images/quiz-type/Red-Toggle.png";
import B from "../assets/Images/quiz-type/B.png";
import C from "../assets/Images/quiz-type/C.png";
import D from "../assets/Images/quiz-type/D.png";
import Delete from "../assets/Images/quiz-type/Delete.png";
import Refresh from "../assets/Images/quiz-type/Refresh.png";
import RefreshOptions from "../assets/Images/quiz-type/Refresh-options.png";
import { Alert } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import editicon from "../../src/assets/Images/quiz-type/edit.png"

// const options1 =[
//   {label: "Numbers"},
//   {label: "10-30"},
//   {label: "30-50"},
//   {label: "50-70"},
//   {label: "70-100"},
//   {label: "100-150"},

// ]
const options1 = [{ label: "Numbers" }];

for (let i = 1; i <= 300; i++) {
  options1.push({ label: i.toString() });
}

const options2 = [
  { label: "Pages for you" },
  {
    label: "Education",
    subCategories: ["Math", "Science", "History", "computer science"],
  },
  { label: "General", subCategories: ["Politics", "Technology", "Health"] },
  { label: "Creative", subCategories: ["Art", "Music", "Writing"] },
];

const options3 = [
  { label: "Division" },
  { label: "Group A" },
  { label: "Group B" },
  { label: "Group C" },
  { label: "Group D" },
  { label: "Group E" },
];

const options4 = [
  { label: "Classes" },
  { label: "Grade 1" },
  { label: "Grade 2" },
  { label: "Grade 3" },
  { label: "Grade 4" },
  { label: "Grade 5" },
  { label: "Grade 6" },
  { label: "Grade 7" },
  { label: "Grade 8" },
  { label: "Grade 9" },
  { label: "Grade 10" },
  { label: "Grade 11" },
  { label: "Grade 12" },
];

const options5 = [
  { label: "Percentage" },
  { label: 0 },
  { label: 5 },
  { label: 10 },
  { label: 15 },
  { label: 20 },
  { label: 25 },
  { label: 30 },
  { label: 35 }, // No quotation marks
  { label: 40 }, // No quotation marks
  { label: 45 },
  { label: 50 },
  { label: 55 },
  { label: 60 },
  { label: 65 },
  { label: 70 },
  { label: 75 },
  { label: 80 },
  { label: 85 },
  { label: 90 },
  { label: 95 },
  { label: 100 },
];

const options6 = [
  { label: "Complexity" },
  { label: "simple" },
  { label: "moderate" },
  { label: "Complex" },
];

const options7 = [
  { label: "Duration" },
  { label: 5 },
  { label: 10 },
  { label: 15 },
  { label: 20 },
  { label: 30 },
  { label: 40 },
  { label: 50 },
  { label: 60 },
  { label: 70 },
  { label: 80 },
  { label: 90 },
  { label: 100 },
  { label: 110 },
  { label: 120 },
  { label: 130 },
  { label: 140 },
  { label: 150 },
  { label: 160 },
  { label: 170 },
  { label: 180 },
];

const options8 = [
  { label: "Timings" },
  { label: "No" },
  { label: "All questions in same time" },
  { label: "Each questions different time" },
];

const options9 = [
  { label: "Minutes" },
  { label: "0.5 Min" },
  { label: "1 Min" },
  { label: "1.5 Min" },
  { label: "2 Min" },
  { label: "2.5 Min" },
];

export default function editmanuly() {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [multiAnswer, setMultiAnswer] = useState(false);

  const [percentage, setPercentage] = useState("");
  const [Complexity, setComplexity] = useState("");
  const [retakeOption, setRetakeOption] = useState("");
  const [retake, setRetake] = useState(0);
  const [duration, setDuration] = useState("");
  const [timings, setTimings] = useState();
  const [minutes, setMinutes] = useState("");
  const [availablefrom, setavailablefrom] = useState("");
  const [disabledon, setdisabledon] = useState("");

  const [publicAccess, setPublicAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isRetakeOn, setIsRetakeOn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  const [quiztotalmarks, setquiztotalmarks] = useState("");
  const [questionWeightage, setquestionWeightage] = useState("");
  const [multiAnswerFlag, setmultiAnswerFlag] = useState("");

  const [optionsArray, setoptionsArray] = useState("");
  const [questionsData, setquestionsData] = useState("");
  const [numQuestions, setNumQuestions] = useState();
  const [questionDuration, setQuestionDuration] = useState(0);
  // const [questions, setQuestions] = useState(
  //   Array.from({ length: numQuestions }, () => ({
  //     question_text: "",
  //     options: [
  //       { answer_option_text: "" },
  //       { answer_option_text: "" },
  //       { answer_option_text: "" },
  //       { answer_option_text: "" },
  //     ],
  //   }))
  // );
  const [questions, setQuestions] = useState([]);

  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [coursename, setcoursename] = useState("");

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [quizCategory, setQuizCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [complexities, setComplexities] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState("");

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');


  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const [quizData, setQuizData] = useState(null);
  const [subCategories, setSubCategories] = useState([]); // Initialize as empty array
  const [classes, setClasses] = useState([]); // Initialize as empty array
  const [categories, setCategories] = useState([]);

  const [isModified, setIsModified] = useState(false);
  const saveButtonRef = useRef(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]); // State to store selected questions
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [quizcreation, setQuizcreation] = useState('')
const [instructions, setInstructions] = useState([
      "Read all the instructions carefully before starting the quiz.",
      "Ensure you have a stable internet connection throughout the quiz duration.",
      "Use a compatible device (e.g., laptop, tablet, or mobile) as specified for the quiz.",
      "Check the allotted time for the quiz and plan accordingly.",
      "Make sure you are in a quiet, distraction-free environment.",
      "Review the total number of questions in the quiz.",
      "Understand the marking scheme, including negative marking (if applicable).",
      "Note whether the quiz allows multiple attempts or is a one-time attempt.",
      "Ensure your device’s battery is fully charged or connected to a power source.",
      "Keep necessary materials ready if allowed (e.g., calculator, pen, paper).",
      "Do not open other tabs, windows, or applications during the quiz unless permitted.",
      "Follow any specific rules set by the instructor or platform.",
      "Avoid any forms of cheating or academic dishonesty.",
      "Be aware that the quiz might automatically submit at the end of the allotted time.",
      "Contact support or your instructor immediately if you face technical issues.",
    ]);

  const [ isEditing ,setisEditing] = useState(false);
  const orgId = localStorage.getItem('org_id');

  const handeledit =()=> {
    setisEditing(true);
   }
   const [isDisabled, setIsDisabled] = useState(false);
   const [modalMessage1, setModalMessage1] = useState("");

   const [isError, setIsError] = useState(false);
   const handleClick = () => {
     setIsDisabled(true);
     setModalMessage1("This feature will come soon!");
     setIsError(false);
     setShowModal1(true);
   };

  useEffect(() => {
    fetchCategories();
  }, []);



  // const fetchCategories = async () => {
  //   try {
  //     const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

  //     if (!authToken) {
  //       console.error('No authentication token found. Please log in again.');
  //       return;
  //     }
  //     const response = await fetch('https://dev.quizifai.com:8010/categories&sub_categories/');
  //     const data = await response.json();
  //     if (data.response === 'success') {
  //       setCategories(data.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };

  // Handle category selection

  const fetchCategories = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }

      const response = await fetch('https://dev.quizifai.com:8010/categories&sub_categories/', {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.response === 'success') {
        setCategories(data.data);
      } else {
        console.error('Failed to fetch categories:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const handleSelectCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    const category = categories.find(cat => cat.category_name === selectedCategory);
    if (category) {
      setSubCategories(category.sub_categories.map(subCat => subCat.sub_category_name));
      setSelectedSubCategory(''); // Reset subcategory when a new category is selected
    }
  };

  // Handle subcategory selection
  const handleSelectSubCategory = (event) => {
    const selectedSubCategory = event.target.value;
    setSelectedSubCategory(selectedSubCategory);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/courses-clsses/', {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.response === 'success') {
        setCourses(data.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Handle course selection
  const handleSelectCourse = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);

    if (selectedCourse === "") {
      // Clear the selection
      setClasses([]);
    } else {
      // Find the selected course and set its classes
      const course = courses.find(
        (course) => course.course_name === selectedCourse
      );
      if (course) {
        setClasses(course.classes.map((cls) => cls.class_name));
      }
    }
  };

  // Handle class selection
  const handleSelectClass = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };


  useEffect(() => {
    fetchComplexities();
  }, []);

  const fetchComplexities = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/complexities/', {
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.response === 'success') {
        setComplexities(data.data.map(complexity => complexity.complexity_name));
      }
    } catch (error) {
      console.error('Error fetching complexities:', error);
    }
  };

  // Handle complexity selection
  const handleSelectComplexity = (event) => {
    setSelectedComplexity(event.target.value);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("https://dev.quizifai.com:8010/complexities/", {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //       },
  //     });
  //     const responseData = await response.json();
  //     if (responseData.response === "success") {
  //       setComplexities(responseData.data);
  //     } else {
  //       console.error("Response was not successful:", responseData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch categories
  //   fetch("https://dev.quizifai.com:8010/categories/", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch categories");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Check if data is an array
  //       if (Array.isArray(data.data)) {
  //         setCategoryOptions(data.data);
  //       } else {
  //         throw new Error("Invalid data format for categories");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching categories:", error);
  //       // Handle error, e.g., setCategoryOptions([]) to clear any existing data
  //       setCategoryOptions([]);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (quizCategory !== "") {
  //     // Fetch subcategories based on selected category
  //     fetch("https://dev.quizifai.com:8010/get_categories/", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ category_name: quizCategory }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch subcategories");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         if (data.response === "success" && Array.isArray(data.data)) {
  //           setSubCategoryOptions(data.data);
  //         } else {
  //           throw new Error("Invalid data format for subcategories");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching subcategories:", error);
  //         // Handle error
  //       });
  //   }
  // }, [quizCategory]);

  // const handleSelectCategory = (e) => {
  //   const selectedCategory = e.target.value;
  //   setQuizCategory(selectedCategory);
  //   // Reset subcategory when category changes
  //   setSubCategory("");
  // };

  // const handleSelectSubCategory = (e) => {
  //   setSubCategory(e.target.value);
  // };

  // useEffect(() => {
  //   // Fetch courses
  //   fetch("https://dev.quizifai.com:8010/courses/")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch courses");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.response === "success") {
  //         setCourseOptions(data.data);
  //       } else {
  //         throw new Error("Failed to fetch courses");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching courses:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   // Fetch classes based on selected course name
  //   if (coursename !== "") {
  //     fetch("https://dev.quizifai.com:8010/get_class_name/", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ course_name: coursename }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch classes: " + response.statusText);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         if (data.response === "success" && Array.isArray(data.data)) {
  //           setClassOptions(data.data);
  //         } else {
  //           throw new Error(
  //             "Invalid data format for classes: " + JSON.stringify(data)
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching classes:", error);
  //       });
  //   }
  // }, [coursename]);
  // const handleSelectCourse = (e) => {
  //   const selectedCourse = e.target.value;
  //   setcoursename(selectedCourse);
  //   // Reset classes when course changes
  //   setClasses("");
  // };

  // const handleSelectClass = (e) => {
  //   setClasses(e.target.value);
  // }; // Dependency on coursename ensures this effect runs whenever coursename changes

  const navigate = useNavigate();
  const handleNext1 = () => {
    setShowRegistrationSuccess(true);
  };
  const handleNext2 = () => {
    setShowRegistrationSuccess(false);
  };
  // const handleCheckboxChange = (questionIndex, optionIndex) => {
  //   const newOptions = [...questions[questionIndex].options].map(
  //     (option, index) => ({
  //       ...option,
  //       correct_answer_flag: index === optionIndex ? true : false, // Set only the clicked option to true, rest to false
  //     })
  //   );
  //   const newQuestions = [...questions];
  //   newQuestions[questionIndex].options = newOptions;
  //   setQuestions(newQuestions);
  // };
  // const handleToggleButton = (questionIndex, optionIndex) => {
  //   const newOptions = [...questions[questionIndex].options].map(
  //     (option, index) => ({
  //       ...option,
  //       correct_answer_flag: multiAnswer
  //         ? index === optionIndex
  //           ? !option.correct_answer_flag
  //           : option.correct_answer_flag
  //         : index === optionIndex
  //         ? true
  //         : false,
  //       // If multiAnswer is true, toggle the clicked option, else set only the clicked option to true, rest to false
  //     })
  //   );
  //   const newQuestions = [...questions];
  //   newQuestions[questionIndex].options = newOptions;
  //   setQuestions(newQuestions);
  // };
  const handleToggleButton = (questionIndex, optionIndex) => {
    const newOptions = questions[questionIndex].options.map(
      (option, index) => ({
        ...option,
        correct_answer_flag: multiAnswer
          ? index === optionIndex
            ? !option.correct_answer_flag
            : option.correct_answer_flag
          : index === optionIndex,
        // If multiAnswer is true, toggle the clicked option, else set only the clicked option to true, rest to false
      })
    );

    // If multiAnswer is true, explicitly set unselected options to false
    if (multiAnswer) {
      newOptions.forEach((option, index) => {
        if (index !== optionIndex && !option.correct_answer_flag) {
          newOptions[index].correct_answer_flag = false;
        }
      });
    }

    const newQuestions = questions.map((question, idx) => ({
      ...question,
      options: idx === questionIndex ? newOptions : question.options,
    }));
    setQuestions(newQuestions);
    setIsModified(true);
  };
  const instructionsString = instructions.join("\n");

  const handleNext = async () => {
    const requiredFields = [
      numQuestions,
      selectedCategory,
      selectedSubCategory,
      percentage,
      selectedComplexity,
      duration,
      quiztotalmarks,
    ];

    const isAnyFieldEmpty = requiredFields.some(field => !field);

    if (isAnyFieldEmpty) {
      toast.error("Please fill in all the required fields before proceeding.");
      return; // Prevent further execution
    }
    // if (numQuestions < 5) {
    //   toast.error("You need to have at least 5 questions.");
    //   return;
    // }
    if (questions.length < numQuestions) {
      toast.error(`You have deleted some questions. You currently have ${questions.length} questions, but 'Number of questions' is set to ${numQuestions}. Please update the 'Number of questions' accordingly.`);
      return; // Prevent further execution
    }
    if (multiAnswer) {
      const hasInvalidMultiAnswer = questions.some(question => {
        if (question.multi_answer_flag) {
          const correctAnswers = question.options.filter(option => option.correct_answer_flag);
          return correctAnswers.length <= 1; // Invalid if not more than one correct answer
        }
        return false;
      });

      if (hasInvalidMultiAnswer) {
        toast.error("For multi-answer questions, there should be more than one correct answer.");
        return;
      }
    }

    // const totalWeightage = questions.reduce((total, question) => total + question.question_weightage, 0);
    // if (totalWeightage !== quiztotalmarks) {
    //   toast.error("Total question weightage does not match quiz total marks.");
    //   return;
    // }

    try {
      const user_id = localStorage.getItem('user_id');
      const quiz_id = localStorage.getItem('quiz_id');

      // Check if user_id is retrieved successfully
      if (!user_id) {
        setErrorMessage("User ID not found. Please log in again.");
        return;
      }
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const questionDuration = calculateQuizDuration();

      const response = await fetch(`https://dev.quizifai.com:8010/edit_quiz/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          user_id: user_id,
          quiz_id: quiz_id,
          org_id: orgId,
          quiz_title: title,
          num_questions: numQuestions,
          quiz_description: description,
          quiz_category_name: selectedCategory,
          multi_answer: multiAnswer,
          quiz_sub_category_name: selectedSubCategory,
          class_name: selectedClass,
          pass_percentage: percentage,
          quiz_complexity_name: selectedComplexity,
          retake_flag: selectedValue,
          quiz_duration: duration,
          course_name: selectedCourse,
          quiz_time_bounded_questions: timings,
          quiz_public_access: publicAccess ? 'on' : 'off',
          available_from: availablefrom,
          quiz_creation_method: quizcreation,
          disabled_on: disabledon,
          quiz_total_marks: quiztotalmarks,
          quiz_instructions:instructionsString,
          questions: questions.map((question) => ({
            question_text: question.question_text,
            correct_answer_description: question.correct_answer_description,
            question_weightage: question.question_weightage,
            multi_answer_flag: multiAnswer,
            question_duration: question.question_duration,
            options: question.options.map((option) => ({
              answer_option_text: option.answer_option_text,
              correct_answer_flag: option.correct_answer_flag,
            })),
          })),
          // questions: questions.map((question) => ({
          //   question_text: question.question_text,
          //   correct_answer_description: question.correct_answer_description,
          //   question_weightage: question.question_weightage,
          //   multi_answer_flag: question.multi_answer_flag,
          //   quiz_ans_option_1_text: question.options[0]?.answer_option_text || "",
          //   quiz_ans_option_2_text: question.options[1]?.answer_option_text || "",
          //   quiz_ans_option_3_text: question.options[2]?.answer_option_text || "",
          //   quiz_ans_option_4_text: question.options[3]?.answer_option_text || "",
          //   correct_option_text: question.options
          //     .find((option) => option.correct_answer_flag)?.answer_option_text || "",
          // })),
         
        }),
      });
     
      const responseData = await response.json();
      console.log(responseData, "data");

      if (response.ok) {
        if (responseData.response === "success") {
          setIsModified(false);
          // Navigate to quiz created page with the response data
          navigate("/quizcreated", { state: { quizData: responseData } });
        } else if (responseData.data && responseData.data.length > 0) {
          // Handle the specific message about the inactive quiz
          toast.error(responseData.data[0]);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        if (responseData.detail) {
          if (responseData.detail === "'int' object has no attribute 'version_number'") {
            toast.error("An error occurred due to an incorrect data type for 'version_number'. Please contact support.");
            return;
          }
          const errorMessages = responseData.detail.map(error => {
            if (error.type === "missing" && error.loc.includes("num_questions")) {
              return "Please provide the number of questions for the quiz.";
            } else if (error.type === "date_from_datetime_parsing" && error.loc.includes("available_from")) {
              return "Please provide a valid date for 'available from'.";
            } else if (error.type === "date_from_datetime_parsing" && error.loc.includes("disabled_on")) {
              return "Please provide a valid date for 'disabled on'.";
            } else if (error.type === "string_type" && error.loc.includes("course_name")) {
              return "Course name should be a valid string.";
            } else if (error.type === "string_type" && error.loc.includes("class_name")) {
              return "Class name should be a valid string.";
            } else if (error.type === "value_error" && error.loc.includes("quiz_time_bounded_questions")) {
              return "quiz_time_bounded_questions must be one of the following: 'No', 'All questions in same time', 'Each questions different time'.";
            } else if (error.detail === "Option Text is missing.") {
              return "Option Text is missing.";
            } else {
              return error.msg;
            }
          });
          toast.error(errorMessages.join("\n"));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } catch (error) {
      console.error("Type-Quiz failed:", error);
      toast.error("An error occurred while choosing the type of the quiz");
    }
  };
  // useEffect(() => {
  //   const fetchQuizData = async () => {
  //     const user_id = localStorage.getItem('user_id');
  //     const quiz_id = localStorage.getItem('quiz_id');

  //     try {
  //       const response = await fetch('https://dev.quizifai.com:8010/access_quiz_for_master', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'accept': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           quiz_id: quiz_id,
  //           user_id: user_id
  //         })
  //       });

  //       const data = await response.json();

  //       if (data.response === 'success') {
  //         setQuizData(data.data);
  //         setTitle(data.data.quiz_title);
  //         setSelectedClass(data.data.class_name);

  //         setSelectedCourse(data.data.course_name);

  //         setNumQuestions(data.data.num_questions);
  //         setDescription(data.data.quiz_description);
  //         setSelectedCategory(data.data.quiz_category_name);

  //         setSelectedComplexity(data.data.quiz_complexity_name);
  //         setMultiAnswer(data.data.multi_answer);
  //         setSelectedSubCategory(data.data.quiz_sub_category_name);

  //         setPercentage(data.data.pass_percentage);
  //         setRetake(data.data.retake_flag);
  //         setPublicAccess(data.data.quiz_public_access);

  //         setDuration(data.data.quiz_duration);
  //         setTimings(data.data.quiz_time_bounded_questions);
  //         setavailablefrom(data.data.available_from);

  //         setdisabledon(data.data.disabled_on);
  //         // setQuizTotalMarks(data.data.retake_flag);
  //         setquiztotalmarks(data.data.quiz_total_marks);
  //         console.log('Available classes:', data.data.class_name);
  //         console.log('Available subcategories:', data.data.quiz_sub_category_name);

  //         setClasses([data.data.class_name] || []); // Wrap in an array
  //         setSubCategories([data.data.quiz_sub_category_name] || []); // Wrap in an array


  //         const processedQuestions = data.data.questions.map(question => ({
  //           ...question,
  //           options: [
  //             { answer_option_text: question.quiz_ans_option_1_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_1_text },
  //             { answer_option_text: question.quiz_ans_option_2_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_2_text },
  //             { answer_option_text: question.quiz_ans_option_3_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_3_text },
  //             { answer_option_text: question.quiz_ans_option_4_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_4_text }
  //           ]
  //         }));

  //         setQuestions(processedQuestions); 
  //             }
  //     } catch (error) {
  //       console.error('Error fetching quiz data', error);
  //     }
  //   };

  //   fetchQuizData();
  // }, []);

  const fetchQuizData = async () => {
    const user_id = localStorage.getItem('user_id');
    const quiz_id = localStorage.getItem('quiz_id');

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/access_quiz_for_master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          quiz_id: quiz_id,
          user_id: user_id
        })
      });

      const data = await response.json();

      if (data.response === 'success') {
        setQuizData(data.data);
        setTitle(data.data.quiz_title);
        setSelectedClass(data.data.class_name);
        setSelectedCourse(data.data.course_name);
        setNumQuestions(data.data.num_questions);
        setDescription(data.data.quiz_description);
        setSelectedCategory(data.data.quiz_category_name);
        setSelectedComplexity(data.data.quiz_complexity_name);
        setMultiAnswer(data.data.multi_answer);
        setSelectedSubCategory(data.data.quiz_sub_category_name);
        setPercentage(data.data.pass_percentage);
        setSelectedValue(data.data.retake_flag);
        setPublicAccess(data.data.quiz_public_access === "on");
        setDuration(data.data.quiz_duration);
        setIsRetakeOn(data.data.retake_flag > 0);
        setTimings(data.data.quiz_time_bounded_questions);
        setavailablefrom(data.data.available_from);
        setdisabledon(data.data.disabled_on);
        setquiztotalmarks(data.data.quiz_total_marks);
        setQuizcreation(data.data.quiz_creation_method)
        console.log('Available classes:', data.data.class_name);
        console.log('Available subcategories:', data.data.quiz_sub_category_name);

        setClasses([data.data.class_name] || []); // Wrap in an array
        setSubCategories([data.data.quiz_sub_category_name] || []); // Wrap in an array

        const processedQuestions = data.data.questions.map(question => ({
          ...question,
          options: [
            { answer_option_text: question.quiz_ans_option_1_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_1_text },
            { answer_option_text: question.quiz_ans_option_2_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_2_text },
            { answer_option_text: question.quiz_ans_option_3_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_3_text },
            { answer_option_text: question.quiz_ans_option_4_text, correct_answer_flag: question.correct_option_text === question.quiz_ans_option_4_text }
          ]
        }));

        setQuestions(processedQuestions);
        setInitialQuestions(processedQuestions);
        setNumQuestions(processedQuestions.length); // Set numQuestions to the length of fetched questions
        updateQuestionWeightage(data.data.quiz_total_marks, processedQuestions.length);
      }
    } catch (error) {
      console.error('Error fetching quiz data', error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);


  useEffect(() => {
    if (saveButtonRef.current) {
      if (isModified) {
        saveButtonRef.current.style.backgroundColor = "#EF5130"; // Change button color to red
      } else {
        saveButtonRef.current.style.backgroundColor = "#1E4DE9"; // Reset to original color
      }
    }
  }, [isModified]);

  const handleCancel = () => {
    fetchQuizData();
    setIsModified(false);
  };

  const calculateWeightage = (numQuestions, quiztotalmarks) => {
    return numQuestions > 0 ? Math.ceil(quiztotalmarks / numQuestions) : 0;
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
    setIsModified(true);
  };
  const toggler1 = (event) => {
    setMultiAnswer(event.target.checked);
  };

  const toggler2 = () => {
    setIsRetakeOn((prevState) => !prevState);
    if (!isRetakeOn) {
      // If the switch is turned on, set the selected value to '1'
      setSelectedValue("1");
    } else {
      // If the switch is turned off, reset the selected value to '0'
      setSelectedValue("0");
    }
  };
  // const handleInputChange = (e) => {
  //   if (isRetakeOn) {
  //     setRetake(e.target.value);
  //   }
  // };

  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

 
  const toggler3 = (event) => {
    setPublicAccess(event.target.checked);


  };

  function handleSelect1(event) {
    setNumber(event.target.value);
  }
  const handleAvailableFromChange = (e) => {
    setavailablefrom(e.target.value);
    // Clear the disabledOn date if it's before the new availableFrom date
    if (disabledon && e.target.value > disabledon) {
      setdisabledon('');
    }
  };

  const handleDisabledOnChange = (e) => {
    const newDisabledOn = e.target.value;
    if (availablefrom && newDisabledOn < availablefrom) {
      // Show an error message or clear the disabledOn field
      setdisabledon('');
      setErrorMessage("Disabled on date cannot be earlier than available from date.");
    } else {
      setdisabledon(newDisabledOn);
      setErrorMessage('');
    }
  };
  // function handleSelect2(e) {
  //   const selectedCategory = e.target.value;
  //   setQuizCategory(selectedCategory);

  //   // Find the selected category object
  //   const selectedCategoryObj = options2.find(
  //     (option) => option.label === selectedCategory
  //   );

  //   if (selectedCategoryObj && selectedCategoryObj.subCategories) {
  //     // If the selected category has sub-categories, update the sub-category state
  //     setSubCategory(selectedCategoryObj.subCategories[0]); // Set the first sub-category as default
  //   } else {
  //     // If the selected category does not have sub-categories, reset the sub-category state
  //     setSubCategory("");
  //   }
  // }

  // function handleSelect3(e) {
  //   setSubCategory(e.target.value);
  // }

  function handleSelect4(event) {
    setClasses(event.target.value);
  }

  function handleSelect5(event) {
    const selectedValue = event.target.value.replace("::", "");
    setPercentage(selectedValue);
  }

  function handleSelect6(event) {
    setSelectedComplexity(event.target.value);
  }

  const handleSelect7 = (e) => {
    const selectedValue = e.target.value;
    setDuration(selectedValue);
  };

  const handleSelect8 = (e) => {
    const selectedValue = e.target.value;
    setTimings(selectedValue);
  };

  function handleSelect9(event) {
    setMinutes(event.target.value);
  }

  const calculateQuizDuration = () => {
    if (numQuestions <= 0 || duration <= 0) {
      return 0;
    }
    return Math.ceil(duration / numQuestions) * 60;
  };
  const Back = () => {

    navigate("/dashboard");

  };


  const updateQuestionWeightage = (totalMarks, numQuestions) => {
    if (numQuestions > 0) {
      const weightagePerQuestion = totalMarks / numQuestions;

      const newQuestions = questions.map(question => ({
        ...question,
        question_weightage: weightagePerQuestion,
      }));
      setQuestions(newQuestions);
    }
  };


  const handleNumQuestionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumQuestions(value);
    updateQuestionWeightage(quiztotalmarks, value);

    if (value >= quizData.questions.length) {
      // If increasing or equal to the originally fetched number of questions
      const newQuestions = quizData.questions.slice(0, quizData.questions.length).map(question => ({
        ...question,
        options: [
          { answer_option_text: question.quiz_ans_option_1_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_1_text },
          { answer_option_text: question.quiz_ans_option_2_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_2_text },
          { answer_option_text: question.quiz_ans_option_3_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_3_text },
          { answer_option_text: question.quiz_ans_option_4_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_4_text }
        ],
        question_duration: question.question_duration || 0, // Provide default value if missing
      }));

      for (let i = quizData.questions.length; i < value; i++) {
        // Add empty question structure for new questions
        newQuestions.push({
          quiz_question_id: `new_question_${i + 1}`,
          quiz_question_text: '',
          question_duration: 0, // Default value for new questions
          options: [
            { answer_option_text: '', correct_answer_flag: false },
            { answer_option_text: '', correct_answer_flag: false },
            { answer_option_text: '', correct_answer_flag: false },
            { answer_option_text: '', correct_answer_flag: false }
          ]
        });
      }
      setQuestions(newQuestions);
    } else {
      // If decreasing, retain the originally fetched questions up to the new value
      const updatedQuestions = quizData.questions.slice(0, value).map(question => ({
        ...question,
        options: [
          { answer_option_text: question.quiz_ans_option_1_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_1_text },
          { answer_option_text: question.quiz_ans_option_2_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_2_text },
          { answer_option_text: question.quiz_ans_option_3_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_3_text },
          { answer_option_text: question.quiz_ans_option_4_text || '', correct_answer_flag: question.correct_option_text === question.quiz_ans_option_4_text }
        ],
        question_duration: question.question_duration || 0, // Provide default value if missing
      }));
      setQuestions(updatedQuestions);
    }
  };


  // const handleNumQuestionsChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   setNumQuestions(value);
  //   updateQuestionWeightage(quiztotalmarks, value);

  //   if (value > questions.length) {
  //     // If increasing, just update the state without modifying questions
  //     setQuestions([...questions]);
  //   } else {
  //     // If decreasing, slice the existing questions array to the new value
  //     const updatedQuestions = questions.slice(0, value);
  //     setQuestions(updatedQuestions);
  //   }
  // };

  // const handleNumQuestionsChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (value > questions.length) {
  //     setErrorMessage('The number of questions cannot exceed the fetched questions.');
  //   } else {
  //     setNumQuestions(value);
  //     setErrorMessage('');
  //   }
  // };
  const toggleQuestionSelection = (index) => {
    setSelectedQuestions(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleDeleteSelected = () => {
    const newQuestions = questions.filter((_, index) => !selectedQuestions.includes(index));
    setQuestions(newQuestions);
    // setNumQuestions(newQuestions.length);
    setSelectedQuestions([]);
    setIsAllSelected(false);
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questions.map((_, index) => index));
    }
    setIsAllSelected(!isAllSelected);
  };
  const handleQuizTotalMarksChange = (e) => {

    const value = parseInt(e.target.value, 10);
    setquiztotalmarks(value);
    setIsModified(true);
    updateQuestionWeightage(value, numQuestions);
  };
  // useEffect(() => {
  //   if (numQuestions > 0 && questions.length === 0) {
  //     fetchQuizData();
  //   }
  // }, [numQuestions])
  return (
    <>
        <div className="flex flex-row w-full bg-[#f5f5f5] ">
      {/* <div className="w-[16%]">
      <Navigation />
      </div> */}
      <div className="">
      <Navigation />      
      <ToastContainer/>

      </div>

      <div className="w-full ">
{/* <div className="flex justify-end py-2 cursor-pointer text-[#eeb600f0]" onClick={Back}><MdOutlineCancel /></div> */}



    {!showRegistrationSuccess && (
  <main className="container mx-auto mt-5">
 
   {/* <div className="bg-[#eedbe5] rounded-[10px] p-4 mb-8 ">
      <h1 className="font-Poppins font-normal text-[20px] text-[#214082]">
        Finalize the configuration and click 'Next' to proceed with adding your quiz questions.
      </h1>
    </div> */}

  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
    
      <div className="md:col-span-2"> 
        <h1 className=" font-semibold text-[20px] text-[#214082]">Generic Fields</h1>
      </div>
      {/* Show Quiz Title and Description in Step 1 */}
       
          {/* Quiz Title */}
          <div className="flex flex-col md:col-span-2">
            <div className="w-full flex flex-row">
              <label className="w-[10%] text-blue-800 font-semibold mb-2 ">
                Title <span className="text-red-500">*</span>
              </label>
              <input
  className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
  type="text"
  required
  value={title}
  onChange={(e) => setTitle(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
/>

            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Quiz Description */}
          <div className="w-full flex flex-col ">
            <div className="w-full flex flex-row">
              <label className="w-[23%] text-blue-800 font-semibold mb-2 ">
               Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                type=""
                rows="4" 
                cols="50"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
              />
            </div>
            <hr className="h-[1px] w-full" />
          </div>
 {/* Quiz instructions */}
 <div className="w-full flex items-center ">
 <div className=" w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[25%] text-blue-800 font-semibold mb-2 mr-[10px]">
               Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                 rows="4" 
                cols="50"
                required
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                

              />
            </div>
            <hr className="h-[1px] w-full" />

          </div>
             <div className="  m-2">
              <img src={editicon} onClick={handeledit} className=" w-[18px] h-[18px] cursor-pointer "/>
            {/* <button
              // onClick={handleNextpage}
              className="px-2 py-[4px] bg-[#3b61c8] text-white font-semibold rounded-xl hover:bg-blue-700"
            >
              Edit
            </button> */}
          </div>
          </div>
       
         
       

   
     
          {/* Quiz Category */}
          <div className="flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[23%] text-blue-800 font-semibold mb-2 ">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                value={selectedCategory}
                onChange={handleSelectCategory}
              >
                  <option value="" disabled>Select a category</option>
                {categories.map(category => (
                  <option key={category.category_id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Sub Category */}
          <div className="flex flex-col">
            <div className="w-full flex flex-row">
              <label className="w-[26%] text-blue-800 font-semibold mb-2">
                Sub Category<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                value={selectedSubCategory}
                onChange={handleSelectSubCategory}
              >
               <option value="" disabled>Select a subcategory</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Course */}
          <div className="md:col-span-2">

          <div className="flex gap-6">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className="w-[31%] text-blue-800 font-semibold mb-2 ">
                Course<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                value={selectedCourse}
                onChange={handleSelectCourse}
              >
                 <option value="" disabled>Select a course</option>
              <option value="">None</option>
              {courses.map(course => (
                <option key={course.course_id} value={course.course_name}>
                  {course.course_name}
                </option>
              ))}
              </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Class */}
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[20%] text-blue-800 font-semibold mb-2">
                Class<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                value={selectedClass}
                onChange={handleSelectClass}
                disabled={classes.length === 0}
              >
              <option value="" disabled>Select a class</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
              </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>
           {/*  Public access */}
  <div className=" w-[50%] flex flex-col">
        <div className="w-[100%] flex flex-row">
        <label className="w-[100%] inline-flex items-center cursor-pointer text-blue-800 font-semibold mb-2 mr-[10px] ">  Public access <span className="text-red-500 mr-2">*</span>
        <FormControlLabel
      control={
        <Switch 
          onChange={toggler3} 
          checked={publicAccess} 
          className="react-switch" 
        />
      }
      // label="Required"
    />
  {/* <input type="checkbox" value="" class="sr-only peer"/> */}
  {/* <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div> */}
</label>
        </div>
      
      </div>
      </div>
      </div>


      <div className="md:col-span-2">

<div className="w-full flex gap-6">
      {/* Complexity */}
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[23%] text-blue-800 font-semibold mb-2">Complexity<span className="text-red-500">*</span></label>
        
        <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={selectedComplexity}
          onChange={handleSelectComplexity}
        >
      <option value="" disabled>Complexities</option>
                {complexities.map((complexity, index) => (
                  <option key={index} value={complexity}>
                    {complexity}
                  </option>
                ))}
        </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>



</div>

</div>







  
{/* <div className="w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[20%] text-blue-800 font-semibold mb-2">
                organizations<span className="text-red-500">*</span>
              </label>
             

               {organizations.length > 0 ? (
        <select 
         className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
        onChange={(e) => handleOrgSelect(e.target.value)} value={selectedOrg}>
          <option value="">Select an organization</option>
          {organizations.map((org) => (
            <option key={org.org_id} value={org.org_id}>
              {org.org_name}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading organizations...</p>
      )}
            </div>
            <hr className="h-[1px] w-full" />
          </div> */}

          {/* <div className="flex justify-start md:col-span-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
            >
              Back
            </button>
          </div> */}
         
    </div>
       
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
  
    <div className="md:col-span-2">
        <h1 className=" font-semibold text-[20px] text-[#214082]">Quiz Metrics</h1>
      </div>

      {/* Number of Questions */}
     
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2  ">Number of Questions<span className="text-red-500">*</span></label>
      
        <input
                 type="number"
                 className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                 placeholder="No of question"
                 value={numQuestions}
                 onChange={handleNumQuestionsChange}
                
               />

        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
    
     
      {/*  Quiz total marks*/}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2"> Quiz total marks<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Total marks"
                  value={quiztotalmarks}
                  onChange={handleQuizTotalMarksChange}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     
      {/* Complexity */}
    
       {/* Pass Percentage */}
      
 <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2">Pass Percentage<span className="text-red-500">*</span></label>
   
        <select
         className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={percentage}
          onChange={handleSelect5}
        >
           {options5.map((options5) => (
                  <option className="border-grey-400 leading-[18px] font-medium rounded">
                    {options5.label}
                  </option>
                ))}
        </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
    
     

      
{/* Quiz Duration */}
      <div className="flex items-center">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2 mr-[10px] ">Duration<span className="text-red-500">*</span></label>
   
        <select
                          className={ `w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  onChange={handleSelect7}
                  value={duration}
                >
                  {options7.map((option, index) => (
                    <option
                      key={index}
                      className="border-grey-400 leading-[18px] font-medium rounded"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
               
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      <div className="relative mt-2 ">
                  <button
                    onClick={() => setIsOpen(true)}
                    className=""
                  >
                    <FiAlertCircle />
                  </button>
                  {isOpen && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-80 bg-white border border-gray-300 p-4 rounded shadow-md w-[350px] ">
                      <p>The maximum duration time is 180 mints.</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
      </div>

     
      {/* Quiz will be available from */}
      
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[63%] text-blue-800 font-semibold mb-2 mr-[9px] ">Quiz will be available from<span className="text-red-500">*</span></label>
        <input
              type="date"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                placeholder="YYYY-MM-DD"
                value={availablefrom}
                onChange={handleAvailableFromChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {/* Quiz must be disable on */}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[60%] text-blue-800 font-semibold mb-2  ">Quiz must be disable on<span className="text-red-500">*</span></label>
        <input
              type="date"
              className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                placeholder="YYYY-MM-DD"
                value={disabledon}
                o onChange={handleDisabledOnChange}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
   
 {/*  Time bounded Questions */}
 <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 "> Time bounded Questions<span className="text-red-500">*</span></label>

        <select
         className={ ` w-[75%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                  onChange={handleSelect8}
                  value={timings}
                >
                  {options8.map((options8) => (
                    <option className="border-grey-400 leading-[18px] font-medium rounded">
                      {options8.label}
                    </option>
                  ))}
                </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
   {/* Retake Option */}
   <div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[105px]">
          Retake Option <span className="text-red-500"></span>
        </label>
        <FormControlLabel
        control={<Switch />} 
        // label="Required"
          onChange={toggler2}
          checked={isRetakeOn}
          className="react-switch"
        />
         <div className=" ml-2">
                {isRetakeOn ? (
                  <select
                    className="w-[48px] h-[35px]  rounded-[10px] border-[1.8px] bg-[#F4F4F4]"
                    value={selectedValue}
                    onChange={handleDropdownChange}
                  >
                    <option value="" disabled>
                      select
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                ) : (
                  <input
                    className="w-[48px] h-[35px]  rounded-[10px] border-[1.8px] bg-[#F4F4F4]"
                    value={selectedValue}
                    readOnly
                  />
                )}
              </div>
      </div>
  

    
      </div>
   
 
    <div className=" bg-white my-4 p-5">
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6 bg-white ">
    
    <div className="md:col-span-2">
        <h1 className=" font-semibold text-[20px] text-[#214082]">AI Inputs</h1>
      </div>
     
     

 
       {/*  Time bounded Questions */}
       {/* <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[57%] text-blue-800 font-semibold mb-2 mr-[10px] "> Subject<span className="text-red-500">*</span></label>

        <select
         className={ ` w-[75%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                  onChange={handleSelect8}
                  value={timings}
                >
                  {options8.map((options8) => (
                    <option className="border-grey-400 leading-[18px] font-medium rounded">
                      {options8.label}
                    </option>
                  ))}
                </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
     

  {/*  Public access */}
  {/* <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 mr-[10px] ">Chapters<span className="text-red-500">*</span></label>

        <select
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  value={publicAccess}
                  onChange={toggler3}
                >
                  <option value="Public">Public</option>
                  <option value="Subscribed">Subscribed</option>
                  <option value="Organization">Organization</option>
                </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}

  {/* Multiple Answers */}
  <div className="flex items-center md:col-span-2">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[59px]">
        Multiple Answers <span className="text-red-500">*</span>
        </label>
        <FormControlLabel
        control={<Switch />} 
        // label="Required"
          onChange={toggler1}
          checked={multiAnswer}
          className="react-switch"
        />
        
      </div>
     

    </div>
  
   
    {/* {next && (
  <div className="flex justify-end items-end">

   
  <div className="w-[98px] h-[37px]  rounded-[10px] bg-[#1E4DE9]">
            <button
              // href="./enter-quiz"
              onClick={handleNext1}
              className="font-Poppins font-medium text-[15px] leading-[29.5px] flex justify-start px-4 py-1 text-white"
            >
              Next
              <img
                className="w-[24px] h-[24px] ml-4"
                alt="next icon"
                src={Next}
              />
            </button>
          </div>
          </div>
    )} */}
   
    </div>
  
   


        {/* {showRegistrationSuccess && ( */}
          <main className="w-max-auto bg-white p-[10px] mt-[10px]">
          
            <div className="w-full">
              <h1 className="font-Poppins font-bold text-[30px] leading-[45px] text-orange-400">
                Create / Edit your Quiz
              </h1>
              <h1 className="font-Poppins font-medium text-[12px] leading-[18px] text-[#214082]">
                Enter all your questions, options, and answers
              </h1>
            </div>

            {/* Questions and options */}
            <div className="w-full ">
            <div className=" flex  items-center mb-[10px] pr-[40px] ">
              {/* <div className="ml-[-20px] mr-[5px]" >
        <input 
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelectAll}
        />
        <label className="ml-[5px] font-normal text-[#214082]">Select</label>
      </div> */}
              <div >
                {selectedQuestions.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="  text-black p-2 text-[14px] rounded-full  flex justify-center items-center gap-[3px]"
                  >
                    <RiDeleteBinLine className=" text-orange-500 w-[20px] h-[20px] ml-[-5px]" /> <span className=" text-[#214082]">Delete</span>
                  </button>
                )}
              </div>

            </div>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-8">


                <div className="flex items-center mb-4">
                  <input
                    className="ml-[-20px] mr-[5px] mt-1 flex justify-center text-center"
                    type="checkbox"
                    checked={selectedQuestions.includes(questionIndex)}
                    onChange={() => toggleQuestionSelection(questionIndex)}
                  />
                  <div className="mr-2 text-xl font-normal text-[#214082]">
                    {questionIndex + 1}.
                  </div>
                  <input
                    type="text"
                    placeholder="Question"
                    className="w-[90%] h-[40px] rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] p-[10px] text-[14px] text-[#214082] font-bold"
                    value={question.question_text}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[questionIndex].question_text = e.target.value;
                      setQuestions(newQuestions);
                      setIsModified(true);
                    }}
                  />

                  {/* Input field for question weightage */}
                  <input
                    type="number"
                    placeholder="Marks"
                    className="w-[80px] h-[40px] rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] mx-2 p-[10px] font-normal "
                    value={question.question_weightage}
                    readOnly
                  />

                  {/* Input field for question duration */}
                  <input
                    type="text"
                    hidden
                    placeholder="Duration"
                    className="w-[130px] h-[40px] rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal"
                    value={question.question_duration}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) * 60;
                      const updatedQuestions = [...questions];
                      updatedQuestions[questionIndex].question_duration = value;
                      setQuestions(updatedQuestions);
                    }}
                  />
                  <RiDeleteBinLine onClick={() => {
                    const newQuestions = questions.filter((_, index) => index !== questionIndex);
                    setQuestions(newQuestions);
                    // setNumQuestions(newQuestions.length);
                    setIsModified(true);
                  }}
                    className="w-[25px] h-[25px] text-orange-500"
                  />

                </div>

                {/* Input fields for options */}
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    {/* Option input field */}
                    <div className="mr-2 font-normal w-[40px] rounded-[5px] p-[8px] border-[1px] border-solid border-[#B8BBC2] flex justify-center text-center justify-items-center items-center text-[14px]">
                      {String.fromCharCode(97 + optionIndex).toUpperCase()}
                    </div>
                    <input
                      type="text"
                      placeholder="Option Text"
                      className="w-[850px]  rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal text-[12px]"
                      value={option.answer_option_text}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[optionIndex].answer_option_text = e.target.value;
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].options = newOptions;
                        setQuestions(newQuestions);
                        setIsModified(true);
                      }}
                    />
                    {/* Add correct answer flag input */}
                    <button
                      className={`mr-2 ${option.correct_answer_flag ? "bg-green-500" : "bg-gray-300"
                        } rounded-full w-10 h-[20px] transition-colors duration-300 focus:outline-none`}
                      onClick={() => handleToggleButton(questionIndex, optionIndex)}
                    >
                      <span
                        className={`block ${option.correct_answer_flag
                          ? "translate-x-5"
                          : "translate-x-0"
                          } transform -translate-y-1.5 w-[18px] h-[18px] relative top-[6px] bg-white rounded-full shadow-md transition-transform duration-300`}
                      ></span>
                    </button>
                  </div>
                ))}
                  <input
      type="text"
      placeholder="Enter correct answer description"
      className="w-[90%] h-[40px] rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] p-[10px] text-[14px] "
      value={question.correct_answer_description || ''} // Show the correct description
      onChange={(e) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correct_answer_description = e.target.value;
        setQuestions(newQuestions); // Update the questions state
        setIsModified(true); // Mark as modified
      }}
    />
              </div>
            ))}

            <div className=" flex  gap-[20px] items-center pl-[25px] ">
              <button
                className="w-[80px] h-[30px] rounded-[10px] bg-[#1E4DE9] text-white hover:bg-[#EF5130]"
                onClick={handleNext}
              >
                Save 
              </button>

              <button
                className="w-[80px] h-[30px] rounded-[10px] bg-[#1E4DE9] text-white hover:bg-[#EF5130]"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
         
            </div>

            {/* Submit button */}
          </main>
        {/* // )} */}
      


 </main>
)}





      </div>

</div>
    </>
  );
}
