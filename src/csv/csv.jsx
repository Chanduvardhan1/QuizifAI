"use client";
import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";
import Switch from "react-switch";
import Navigation from "../navbar/navbar";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

import { useNavigate } from "react-router-dom";
// import ToggleButton from 'react-toggle-button'

// Navbar-icons
import QuizifAilogo from "../assets/Images/quiz-type/Quizifai 1.png";
import Dashboard from "../assets/Images/quiz-type/Dashboard.png";
import Quiz from "../assets/Images/quiz-type/Quiz.png";
import History from "../assets/Images/quiz-type/History.png";
import Schedule from "../assets/Images/quiz-type/Schedule.png";
import Notification from "../assets/Images/quiz-type/Notification.png";
import QuizAdmin from "../assets/Images/quiz-type/Quiz-admin.png";
import Profile from "../assets/Images/quiz-type/Profile.png";

// Main-Section-icons
import QuizTitle from "../assets/Images/quiz-type/Quiz-Title.png";
import Dropdown from "../assets/Images/quiz-type/Dropdown.png";
import QuizDiscription from "../assets/Images/quiz-type/Quiz-discription.png";
import Toggle from "../assets/Images/quiz-type/Toggle.png";
import Next from "../assets/Images/quiz-type/Next.png";
import Plus from "../assets/Images/quiz-type/Plus.png";
import CSV from "../assets/Images/quiz-type/CSV.png";
import CoverPage from "../coverPage/coverPage";
import physics from "../../src/assets/Images/quiz-type/quizcover.jpg"
import back from "../../src/assets/Images/quiz-type/Q back image.webp"
import username from "../../src/assets/Images/quiz-type/username.png"
import calander from "../../src/assets/Images/quiz-type/calander.png"
import timer from "../../src/assets/Images/quiz-type/Timer.png"
import comment from "../../src/assets/Images/quiz-type/comment.png"

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
  { label: 10 },
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

export default function quiztype() {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [multiAnswer, setMultiAnswer] = useState(false);

  const [percentage, setPercentage] = useState("");
  const [Complexity, setComplexity] = useState("");
  const [retakeOption, setRetakeOption] = useState("");
  const [retake, setRetake] = useState(0);
  const [duration, setDuration] = useState("");
  const [timings, setTimings] = useState("");
  const [minutes, setMinutes] = useState("");
  const [availablefrom, setavailablefrom] = useState("");
  const [disabledon, setdisabledon] = useState("");

  const [publicAccess, setPublicAccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isRetakeOn, setIsRetakeOn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0");
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  const [quiztotalmarks, setquiztotalmarks] = useState("");
  const [questionWeightage, setquestionWeightage] = useState("");
  const [multiAnswerFlag, setmultiAnswerFlag] = useState("");
  const [questionDuration, setquestionDuration] = useState("");
  const [optionsArray, setoptionsArray] = useState("");
  const [questionsData, setquestionsData] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);

  const [selectedTiming, setSelectedTiming] = useState([]);
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

  const [coursename, setcoursename] = useState("");
  const [classes, setClasses] = useState("");
  const [quizCategory, setQuizCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [complexities, setComplexities] = useState([]);
  const [quizData, setQuizData] = useState(null);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  const [percentageOptions, setPercentageOptions] = useState([]);

  const [questions, setQuestions] = useState([]);

  const [complexityOptions, setComplexityOptions] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState("");

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle the upload of front or back image
  const [step, setStep] = useState(1);

  const handleNextpage = () => {
    setStep(2);
  };
 
 
  useEffect(() => {
    if (frontImage && backImage) {
      handleUpload();
    }
  }, [frontImage, backImage]);

 
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'front') {
        setFrontImage(file);
        setIsFlipped(true); // Automatically "flip" to show the back after uploading the front image
      } else {
        setBackImage(file);
      }
    }
  };

  // Toggle flip state to switch between front and back image
  const handleFlip = () => {
    if (frontImage && backImage) setIsFlipped(!isFlipped); // Only allow flipping if both images are uploaded
  };

  const handleUpload = async () => {
    if (!frontImage || !backImage) {
      alert('Please select both front and back images');
      return;
    }

    const formData = new FormData();
    formData.append('file1', frontImage);
    formData.append('file2', backImage);

    try {
      const user_id = localStorage.getItem('user_id');

      const response = await fetch(`https://dev.quizifai.com:8010/upload-qz_image?quiz_id=${user_id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
        },
        body: formData,
      });

      if (response.ok) {
        alert('Images uploaded successfully');
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading images');
    }
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

  const handleSelectSubCategory = (e) => {
    setSubCategory(e.target.value);
  };

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
  const handleSelectCourse = (e) => {
    const selectedCourse = e.target.value;
    setcoursename(selectedCourse);
    // Reset classes when course changes
    setClasses("");
  };

  const handleSelectClass = (e) => {
    setClasses(e.target.value);
  }; // Dependency on coursename ensures this effect runs whenever coursename changes

  const navigate = useNavigate();
  const handleNext1 = () => {
    setShowRegistrationSuccess(true);
  };
  const handleNext2 = () => {
    setShowRegistrationSuccess(false);
  };

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
  };
  const handleNext  = async () => {
    const user_id = localStorage.getItem('user_id');
    try {
      const response = await fetch(
        `https://dev.quizifai.com:8010/crt_qz_from_exl_csv`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quiz_title: quizData ? quizData.quiz_title : title,
            num_questions: quizData ? quizData.num_questions : numQuestions,
            quiz_description: quizData
              ? quizData.quiz_description
              : description,
            quiz_category_name: quizData
              ? quizData.quiz_category_name
              : categoryOptions[0],
            multi_answer: quizData ? quizData.multi_answer : multiAnswer,
            quiz_sub_category_name: quizData
              ? quizData.quiz_sub_category_name
              : subCategoryOptions[0],
            class_name: quizData ? quizData.course_name : classes,
            pass_percentage: percentage,
            quiz_complexity_name: quizData
              ? quizData.quiz_complexity_name
              : complexityOptions[0],
            retake_flag: quizData ? quizData.retake_flag : isRetakeOn,
            quiz_duration: duration,
            course_name: quizData ? quizData.course_name : coursename,
            quiz_time_bounded_questions: quizData
              ? quizData.quiz_time_bounded_questions
              : selectedTiming[0],
            quiz_public_access: publicAccess,
            available_from: quizData ? quizData.available_from : availablefrom,
            disabled_on: quizData ? quizData.disabled_on : disabledon,
            quiz_total_marks: quizData
              ? quizData.quiz_total_marks
              : description,
              user_id:user_id,
            questions: questions.map((question) => ({
              question_text: question.question_text,
              question_weightage: question.question_weightage,
              multi_answer_flag: quizData ? quizData.multi_answer : multiAnswer,
              question_duration: question.question_duration,
              options: question.options.map((option) => ({
                answer_option_text: option.answer_option_text,
                correct_answer_flag: option.correct_answer_flag,
              })),
            })),
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData, "data");

      if (response.ok) {
        // Assuming router and state setter are defined properly
        navigate("/quizcreated1", { state: { quizData: responseData.data } });
      } else {
        if (
          responseData.detail &&
          responseData.detail[0].type === "missing" &&
          responseData.detail[0].loc[1] === "body" &&
          responseData.detail[0].loc[2] === "num_questions"
        ) {
          setErrorMessage(
            "Please provide the number of questions for the quiz."
          );
        } else {
          setErrorMessage(responseData.detail);
        }
      }
    } catch (error) {
      console.error("Type-Quiz failed:", error);
      setErrorMessage("An error occurred while choosing the type of the quiz");
    }
  };
  const toggler1 = (checked) => {
    setMultiAnswer(checked);
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

  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const toggler3 = (checked) => {
    setPublicAccess(checked);
  };

  function handleSelect1(event) {
    setNumber(event.target.value);
  }

  function handleSelect4(event) {
    setClasses(event.target.value);
  }

  function handleSelect5(event) {
    const selectedValue = event.target.value.replace("::", "");
    setPercentage(selectedValue);
  }

  const handleSelect6 = (event) => {
    setSelectedComplexity(event.target.value);
  };

  function handleSelect7(event) {
    const selectedValue = event.target.value.replace("::", "");
    setDuration(selectedValue);
  }

  const handleSelect8 = (event) => {
    setSelectedTiming(event.target.value);
    // Handle selection change
    console.log("Selected value:", event.target.value);
  };

  function handleSelect9(event) {
    setMinutes(event.target.value);
  }

  const handleFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("files", file);
    const interval = setInterval(() => {
      if (uploadProgress < 100) {
        setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      } else {
        clearInterval(interval);
      }
    }, 1000);

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        setErrorMessage('No authentication token found. Please log in again.');
        clearInterval(interval);
        return;
      }
      const response = await fetch(
        "https://dev.quizifai.com:8010/qz_from_exl_csv/",
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
          },
          body: formData,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData, "data");

      if (response.ok && responseData.response === "success") {
        setQuizData(responseData.data[0]);
        setComplexityOptions([responseData.data[0].quiz_complexity_name]);
        setSelectedComplexity(responseData.data[0].quiz_complexity_name);
        setTimings(responseData.data[0].quiz_time_bounded_questions);
        setSubCategory(responseData.data[0].quiz_sub_category_name);
        setcoursename(responseData.data[0].course_name);
        setClasses(responseData.data[0].class_name);
        setPercentage(responseData.data[0].pass_percentage);

        setSelectedValue(responseData.data[0].retake_flag);
        setDuration(responseData.data[0].quiz_duration);
        setQuestions(responseData.data[0].questions);
        // Assuming router and state setter are defined properly
        // navigate("/quizcreated", { state: { quizData: responseData } });

        // Set category and subcategory options
        setCategoryOptions([responseData.data[0].quiz_category_name]);
        setSubCategoryOptions([responseData.data[0].quiz_sub_category_name]);
        setCourseOptions([responseData.data[0].course_name]);
        setClassOptions([responseData.data[0].class_name]);

        setPercentageOptions([
          {
            label: responseData.data[0].pass_percentage,
            value: responseData.data[0].pass_percentage,
          },
        ]);

        setSelectedTiming([responseData.data[0].quiz_time_bounded_questions]);
      } else {
        if (
          responseData.detail &&
          responseData.detail[0].type === "missing" &&
          responseData.detail[0].loc[1] === "body" &&
          responseData.detail[0].loc[2] === "num_questions"
        ) {
          setErrorMessage(
            "Please provide the number of questions for the quiz."
          );
        }else if (
          responseData.response === "fail" &&
          responseData.data ===
            "Total question weightage does not match quiz total marks."
        ) {
          setErrorMessage(
            "Total question weightage does not match quiz total marks."
          );
        }  else {
          setErrorMessage(responseData.detail);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please try again.");
    } finally {
      clearInterval(interval); // Stop the progress interval regardless of success or failure
    }
  };

  const [detailsUploadProgress, setDetailsUploadProgress] = useState(0);
  const [questionsUploadProgress, setQuestionsUploadProgress] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const handleFileInputChangecsv = async (event, fileType) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("files", file);

    const interval = setInterval(() => {
      if (fileType === "details" && detailsUploadProgress < 100) {
        setDetailsUploadProgress((prevProgress) =>
          Math.min(prevProgress + 10, 100)
        );
      } else if (fileType === "questions" && questionsUploadProgress < 100) {
        setQuestionsUploadProgress((prevProgress) =>
          Math.min(prevProgress + 10, 100)
        );
      } else {
        clearInterval(interval);
      }
    }, 1000);

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        setErrorMessage('No authentication token found. Please log in again.');
        clearInterval(interval);
        return;
      }
      const response = await fetch(
        "https://dev.quizifai.com:8010/crt_qz_from_exl_csv/",
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
          },
          body: formData,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            if (fileType === "details") {
              setDetailsUploadProgress(progress);
            } else if (fileType === "questions") {
              setQuestionsUploadProgress(progress);
            }
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData, "data");

      if (response.ok && responseData.response === "success") {
        if (fileType === "questions") {
          setUploadCompleted(true); // Set upload completed to true only after questions file is uploaded
        }
        if (uploadCompleted) {
          // Assuming router and state setter are defined properly
          navigate("/quizcreated", { state: { quizData: responseData } });
        }
      } else if (
        responseData.response === "fail" &&
        responseData.data ===
          "Total question weightage does not match quiz total marks."
      ) {
        setErrorMessage(
          "Total question weightage does not match quiz total marks."
        );
      } else {
        if (
          responseData.detail &&
          responseData.detail[0].type === "missing" &&
          responseData.detail[0].loc[1] === "body" &&
          responseData.detail[0].loc[2] === "num_questions"
        ) {
          setErrorMessage(
            "Please provide the number of questions for the quiz."
          );
        } else {
          setErrorMessage(responseData.detail);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please try again.");
    } finally {
      clearInterval(interval); // Stop the progress interval regardless of success or failure
    }
  };
  const handleSelectPercentage = (event) => {
    setPercentage(event.target.value);
  };
  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  const Back = () => {
    
    navigate("/create-quiz");
  
};
  return (
    <>
     <div className="flex flex-row w-full bg-[#f5f5f5] ">
      <div className="w-[16%]">
      <Navigation />

      </div>
<div className="w-[84%]  p-5">

<div className="flex justify-end pr-2 cursor-pointer text-[#eeb600f0]" onClick={Back}><MdOutlineCancel /></div>

    {!showRegistrationSuccess && (
  <main className="container mx-auto mt-10">
   <div className="bg-[#d3d3d3] rounded-[10px] p-4 mb-8 text-center">
      <h1 className="font-Poppins font-semibold text-[20px] text-[#214082]">
        Finalize the configuration and click 'Next' to proceed with adding your quiz questions.
      </h1>
    </div>
<div className="flex w-full h-[20%] border-[#a9a9a9] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-4 bg-white ">
      {/* <img
        src={physics}
        alt="Quiz Cover"
        className="w-32 h-44 rounded-md mr-4"
      /> */}
          <div className="relative mr-2">
          <img
  src={
    isFlipped 
      ? (backImage ? URL.createObjectURL(backImage) : back)
      : (frontImage ? URL.createObjectURL(frontImage) : physics)
  }
  alt="Quiz Cover"
  className="w-32 h-44 rounded-md mr-4 cursor-pointer"
  onClick={handleFlip}
/>
        
        {/* File inputs for front and back images */}
        {!frontImage && (
          <input type="file" onChange={(e) => handleImageChange(e, 'front')} className="hidden" id="front-upload" />
        )}
        {!backImage && isFlipped && (
          <input type="file" onChange={(e) => handleImageChange(e, 'back')} className="hidden" id="back-upload" />
        )}

        {/* Labels or flip icon for upload buttons */}
        {!frontImage && (
          <label htmlFor="front-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer text-[12px] rounded-md">
            Upload Front Cover
          </label>
        )}
        {isFlipped && !backImage && (
          <label htmlFor="back-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer text-[12px] rounded-md">
            Upload Back Cover
          </label>
        )}
        
        {/* Flip icon to toggle between front and back after both images are uploaded */}
        {frontImage && backImage && (
          <button onClick={handleFlip} className="absolute top-2 right-2 text-white hidden bg-black bg-opacity-75 rounded-full p-1">
            <FaSyncAlt size={18} />
          </button>
        )}
      </div>
      <div className="flex flex-col  w-full">
        {/* Title and Version */}
        <div className="flex items-center gap-[3px]">
          <h2 className="text-lg font-semibold text-gray-800">
          {quizData ? quizData.quiz_title : title}
          </h2>
          {/* <span className="text-xs text-red-500">v1.0</span> */}
        </div>

        {/* Description */}
        <p className="text-gray-600 w-[80%] line-clamp-2 text-sm mt-1">
        {quizData ? quizData.quiz_description : description}
        </p>

        {/* Meta Information */}
        <div className="text-[#00008b] text-sm flex flex-wrap mt-2">
          <span>{ quizData? quizData.quiz_category_name: categoryOptions[0]}</span>
          <span className="mx-1">.</span>
          <span>{quizData? quizData.quiz_sub_category_name: subCategoryOptions[0]}</span>
          <span className="mx-1">.</span>
          <span>{quizData ? quizData.course_name : ""} {quizData ? quizData.class_name : ""}</span>
          <span className="mx-1">.</span>
          <span>{ quizData ? quizData.quiz_complexity_name: complexityOptions[0]}</span>
        </div>

        {/* Icons Row */}
        <div className=" flex-col items-center space-y-2  mt-4 text-[#00008b]">
          {/* Author and Date */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              {/* <i className="fas fa-user"></i> */}
              <img src={username}  className=" w-[18px] h-[18px] mr-1"/>
              <span className="ml-1 text-sm">Samantha S</span>
            </div>
            <div className="flex items-center">
              {/* <i className="fas fa-calendar-alt"></i> */}
              <img src={calander}  className=" w-[18px] h-[18px] mr-1"/>

              <span className="ml-1 text-sm">{quizData ? quizData.available_from : availablefrom}</span>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {/* <i className="fas fa-question-circle"></i> */}
              <img src={comment}  className=" w-[18px] h-[18px] mr-1"/>

              <span className="ml-1 text-sm">{quizData ? quizData.num_questions : numQuestions} Questions</span>
            </div>
            <div className="flex items-center">
              {/* <i className="fas fa-clock"></i> */}
              <img src={timer}  className=" w-[18px] h-[18px] mr-1"/>

              <span className="ml-1 text-sm">{duration} Minutes</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats Row */}
        {/* <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            <span>203 attempts</span> | <span>80% High Score</span> | <span>2:02 mins quickest</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div> */}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
      
      <div className="md:col-span-2"> 
        <h1 className=" font-semibold text-[20px] text-[#ef5130]">General Details</h1>
      </div>
      {/* Show Quiz Title and Description in Step 1 */}
      {/* {step === 1 && ( */}
        {/* <> */}
          {/* Quiz Title */}
          <div className="flex flex-col md:col-span-2">
               <div className="flex justify-end items-center mb-3">

          <div className="w-[140.68px] h-[37.09px] rounded-[10px] bg-[#1E4DE9]">
              <label
                htmlFor="fileInput"
                className="font-Poppins font-medium text-[15px] leading-[22.5px] flex justify-start px-4 py-2 text-white cursor-pointer"
              >
                Upload
                <img
                  className="w-[24px] h-[24px] ml-4 -rotate-90"
                  src={Next}
                  alt="Next"
                />
                <img className="w-[26px] h-[26px] ml-1" src={CSV} alt="CSV" />
              </label>
              <input
                id="fileInput"
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {errorMessage && (
                <div className="error-message w-[500px] relative right-[535px] top-[-40px] flex justify-center text-red-500">{errorMessage}</div>
              )}
             
            </div>
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                type="text"
                required
                value={quizData ? quizData.quiz_title : title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Quiz Description */}
          <div className="w-full flex flex-col md:col-span-2">
            <div className="w-full flex flex-row">
              <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
               Description <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                type="text"
                required
                value={quizData ? quizData.quiz_description : description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <hr className="h-[1px] w-full" />
          </div>
 {/* Quiz instructions */}
 <div className="w-full flex items-center  md:col-span-2">
 <div className=" w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[20%] text-blue-800 font-semibold mb-2 mr-[10px]">
              Instructions <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                type="text"
                required
                value={quizData ? quizData.quiz_description : description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <hr className="h-[1px] w-full" />

          </div>
             <div className="  m-2">
            <button
              // onClick={handleNextpage}
              className="px-2 py-[4px] bg-[#3b61c8] text-white font-semibold rounded-xl hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
          </div>
          {/* Next Button */}
          {/* <div className="flex justify-end md:col-span-2">
            <button
              onClick={handleNextpage}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div> */}
        {/* </> */}
      {/* )} */}

      {/* Show Remaining Fields in Step 2 */}
      {/* {step === 2 && ( */}
        {/* <> */}
          {/* Quiz Category */}
          <div className="flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[51%] text-blue-800 font-semibold mb-2 ">
                Category<span className="text-red-500">*</span>
              </label>
              
              <select
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"

                    value={
                      quizData
                        ? quizData.quiz_category_name
                        : categoryOptions[0]
                    }
                    onChange={(e) => setQuizCategory(e.target.value)}
                  >
                    {categoryOptions.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Sub Category */}
          <div className="flex flex-col">
            <div className="w-full flex flex-row">
              <label className="w-[51%] text-blue-800 font-semibold mb-2">
                Sub Category<span className="text-red-500">*</span>
              </label>
          
              <select
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"

                    onChange={(e) => setSubCategory(e.target.value)}
                    value={
                      quizData
                        ? quizData.quiz_sub_category_name
                        : subCategoryOptions[0]
                    }
                  >
                    {subCategoryOptions.map((subCategory, index) => (
                      <option key={index} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Course */}
          <div className="flex flex-col">
            <div className="w-full flex flex-row">
              <label className="w-[51%] text-blue-800 font-semibold mb-2 ">
                Course<span className="text-red-500">*</span>
              </label>
            
              <select
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                  onChange={(e) => setcoursename(e.target.value)}
                  value={quizData ? quizData.course_name : ""}
                >
                  {complexities.map((complexity, index) => (
                    <option key={index} value={complexity}>
                      {complexity}
                    </option>
                  ))}
                </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Class */}
          <div className="flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[51%] text-blue-800 font-semibold mb-2">
                Class<span className="text-red-500">*</span>
              </label>
              <select
                  className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                  onChange={(e) => setClasses(e.target.value)}
                  value={quizData ? quizData.class_name : ""}
                >
                  {classOptions.map((classOption, index) => (
                    <option key={index} value={classOption}>
                      {classOption}
                    </option>
                  ))}
                </select>
            </div>
            <hr className="h-[1px] w-full" />
          </div>
          {/* <div className="flex justify-start md:col-span-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
            >
              Back
            </button>
          </div> */}
        {/* </> */}
      {/* )} */}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
    <div className="md:col-span-2">
        <h1 className=" font-semibold text-[20px] text-[#ef5130]">Quiz Metrics</h1>
      </div>

      {/* Number of Questions */}
     
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2  ">Number of Questions<span className="text-red-500">*</span></label>
        
                <input
                    type="number"
                    className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                    placeholder="No of questions"
                    value={quizData ? quizData.num_questions : numQuestions}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setNumQuestions(value);

                      // Assuming setQuestions is defined somewhere
                      // setQuestions(
                      //   Array.from({ length: value }, () => ({
                      //     question_text: "",
                      //     options: [
                      //       { answer_option_text: "" },
                      //       { answer_option_text: "" },
                      //       { answer_option_text: "" },
                      //       { answer_option_text: "" },
                      //     ],
                      //   }))
                      // );
                    }}
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
                  value={quizData ? quizData.quiz_total_marks : description}
                  onChange={(e) => setquiztotalmarks(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     
      {/* Complexity */}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 ">Complexity<span className="text-red-500">*</span></label>

        <select
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                    onChange={(e) => setSelectedComplexity(e.target.value)}
                    value={
                      quizData
                        ? quizData.quiz_complexity_name
                        : complexityOptions[0]
                    }
                  >
                    {complexityOptions.map((complexity, index) => (
                      <option key={index} value={complexity}>
                        {complexity}
                      </option>
                    ))}
                  </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
       {/* Pass Percentage */}
      
 <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2">Pass Percentage<span className="text-red-500">*</span></label>
        <select
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                    onChange={handleSelectPercentage}
                    value={percentage}
                  >
                    {percentageOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {/* Question Type */}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[100%] text-blue-800 font-semibold mb-2 mr-[75px] ">Question Type<span className="text-red-500">*</span></label>

        <select
          className={ ` w-[80%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                    onChange={(e) => setSelectedComplexity(e.target.value)}
                    value={
                      quizData
                        ? quizData.quiz_complexity_name
                        : complexityOptions[0]
                    }
                  >
                    {complexityOptions.map((complexity, index) => (
                      <option key={index} value={complexity}>
                        {complexity}
                      </option>
                    ))}
                  </select>
                  <select
          className={ ` w-[80%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                    onChange={(e) => setSelectedComplexity(e.target.value)}
                    value={
                      quizData
                        ? quizData.quiz_complexity_name
                        : complexityOptions[0]
                    }
                  >
                    {complexityOptions.map((complexity, index) => (
                      <option key={index} value={complexity}>
                        {complexity}
                      </option>
                    ))}
                  </select>
                  <select
          className={ ` w-[80%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                    onChange={(e) => setSelectedComplexity(e.target.value)}
                    value={
                      quizData
                        ? quizData.quiz_complexity_name
                        : complexityOptions[0]
                    }
                  >
                    {complexityOptions.map((complexity, index) => (
                      <option key={index} value={complexity}>
                        {complexity}
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
                value={quizData ? quizData.available_from : availablefrom}
                onChange={(e) => setavailablefrom(e.target.value)}
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
                value={quizData ? quizData.disabled_on : disabledon}
                onChange={(e) => setdisabledon(e.target.value)}
              ></input>
  
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

   {/* Retake Option */}
   <div className="flex items-center mt-4">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[93px]">
          Retake Option <span className="text-red-500">*</span>
        </label>
        <Switch
      onChange={toggler2}
      checked={quizData ? quizData.retake_flag : isRetakeOn}
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
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-6 bg-white ">
    
    <div className="md:col-span-3">
        <h1 className=" font-semibold text-[20px] text-[#ef5130]">AI Metrics</h1>
      </div>
      {/*  Time bounded Questions */}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[100%] text-blue-800 font-semibold mb-2 mr-[10px] "> Time bounded Questions<span className="text-red-500">*</span></label>

        
                <select
           className={ ` w-[75%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                
                    onChange={(e) => setTimings(e.target.value)}
                    value={
                      quizData
                        ? quizData.quiz_time_bounded_questions
                        : selectedTiming[0]
                    }
                  >
                    {selectedTiming.map((timing, index) => (
                      <option key={index} value={timing}>
                        {timing}
                      </option>
                    ))}
                  </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     

  {/*  Public access */}
  <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 mr-[10px] ">  Public access <span className="text-red-500">*</span></label>

        <select
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  value={  quizData ? quizData.quiz_public_access : publicAccess}
                  onChange={toggler3}
                >
                  <option value="Public">Public</option>
                  <option value="Subscribed">Subscribed</option>
                  <option value="Organization">Organization</option>
                </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>

  {/* Multiple Answers */}
  <div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[93px]">
        Multiple Answers <span className="text-red-500">*</span>
        </label>
        <Switch
                   onChange={toggler1}
                   checked={quizData ? quizData.multi_answer : multiAnswer}
          className="react-switch"
        />
        
      </div>
     

    </div>
    {/* <div className="flex flex-col items-center justify-center mt-10">
    <div className=" w-[150.68px] h-[37.09px] rounded-[10px] bg-[#1E4DE9]">
      <label
        htmlFor="fileInput"
        className="font-Poppins font-medium text-[15px] leading-[22.5px] flex items-center px-4 py-2 text-white cursor-pointer"
      >
        <div className="relative group">
          <span className="block truncate max-w-[60px]">
            {uploadedFile ? uploadedFile.name : 'Select'}
          </span>
          {uploadedFile && (
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {uploadedFile.name}
            </span>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <img
          className="w-[24px] h-[24px] ml-4 -rotate-90"
          src={Next}
          alt="Next"
        />
        <img
          className="w-[20.48px] h-[24.96px] ml-1"
          src={PDF}
          alt="PDF"
        />
      </label>

      {/* <button
        className="w-[98px] h-[32px] font-Poppins text-[#214082] font-medium text-[15px] leading-[20px] rounded-[10px] bg-[#1E4DE9] text-white mt-9 ml-5"
        onClick={handleNext}
      >
        Submit
      </button> */}
      {/* <div className=" w-[137.09px] h-[9.05px]">
        <Line percent={uploadProgress} strokeWidth={5} strokeColor="#B1FB9B" />
        <h1 className="font-Poppins text-[#214082] font-normal text-[10px] leading-[15px]  mt-1 ml-8">
          {`Uploading ${uploadProgress}%`}
        </h1>
      </div>
    </div>
    </div>  */}
   
  <div className="flex justify-end items-end mt-10">

   
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

    {/* <div className="flex justify-center items-center mt-10">

   
  {errorMessage && <p className=" flex text-red-500">{errorMessage}</p> }
  </div> */}
    </div>
  </main>
)}

{showRegistrationSuccess && (
          <main className="w-max-auto">
            <div className="w-[848px] h-[44px] absolute top-[90px] left-[298px]">
              <h1 className="font-Poppins font-bold text-[30px] leading-[45px] text-orange-400">
                Create / Edit your Quiz 
              </h1>
              <h1 className="font-Poppins font-medium text-[12px] text-[#214082]  leading-[18px]">
                Enter all your questions, options, and answers
              </h1>
            </div>

            {/* Questions and options */}
            <div className="absolute top-[210px] left-[298px] w-[1212px] h-[450px] ">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-8 ">
                  {/* Input field for question */}
                  <div className="flex items-center mb-4">
                    <div className="mr-2 text-xl font-bold text-[#214082]">
                      {questionIndex + 1}.
                    </div>
                    <input
                      type="text"
                      placeholder={`Question`}
                      className="w-[70%] h-[40px] text-[#214082] font-bold rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] p-[10px] text-[14px] "
                      value={question.question_text}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].question_text =
                          e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />

                    {/* Input field for question weightage */}
                    <input
                      type="number"
                      placeholder="Marks"
                      className="w-[85px] h-[40px] rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] mx-2 p-[10px] font-normal"
                      value={question.question_weightage}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        const updatedQuestions = questions.map((q, index) => {
                          if (index === questionIndex) {
                            return { ...q, question_weightage: value };
                          }
                          return q;
                        });
                        setQuestions(updatedQuestions);
                      }}
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
                        updatedQuestions[questionIndex].question_duration =
                          value;
                        setQuestions(updatedQuestions);
                      }}
                    />
     
                  </div>
                  {/* Input fields for options */}
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      {/* Option input field */}
                        <div className="mr-2  font-normal w-[40px] rounded-[5px] p-[8px] border-[1px] border-solid border-[#B8BBC2] flex justify-center text-center justify-items-center items-center text-[14px]">
                        {String.fromCharCode(97 + optionIndex).toUpperCase()}
                        </div>
                      <input
                        type="text"
                        placeholder={`Option Text`}
                        className="w-[850px]  rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal text-[12px]"
                        value={option.answer_option_text}
                        onChange={(e) => {
                          const newOptions = [...question.options];
                          newOptions[optionIndex].answer_option_text =
                            e.target.value;
                          const newQuestions = [...questions];
                          newQuestions[questionIndex].options = newOptions;
                          setQuestions(newQuestions);
                        }}
                      />
                      {/* Add correct answer flag input */}
                      <button
                        className={`mr-2 ${
                          option.correct_answer_flag
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } rounded-full w-10 h-[20px] transition-colors duration-300 focus:outline-none`}
                        onClick={() =>
                          handleToggleButton(questionIndex, optionIndex)
                        }
                      >
                        <span
                          className={`block ${
                            option.correct_answer_flag
                              ? "translate-x-5"
                              : "translate-x-0"
                          } transform -translate-y-1.5 w-[18px] h-[18px] relative top-[6px] bg-white rounded-full shadow-md transition-transform duration-300`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>
              ))}
              <div className=" flex justify-between items-center pr-[330px] ">
                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={handleNext2}
                >
                  Back 
                </button>

                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={handleNext}
                 >
                  Save 
                </button>
                <CoverPage/>
              </div>
             
            </div>

            {/* Submit button */}
          </main>
        )}
      </div>

</div>
    </>
  );
}
