"use client";
import React, { useState, useEffect,useRef } from "react";
import { Line } from "rc-progress";
// import Switch from "react-switch";
import Navigation from "../navbar/navbar";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import ToggleButton from 'react-toggle-button'
import { FaSyncAlt } from 'react-icons/fa';

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
import editicon from "../../src/assets/Images/quiz-type/edit.png"
import QuestionPaper from "../assets/Images/Assets/questionPaper.png";
import GreaterThan from "../assets/Images/images/dashboard/greaterthan.png";

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

  const [publicAccess, setPublicAccess] = useState(false);
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
  const [simplequestions, setSimplequestions] = useState('')
  const [moderatequestions, setModeratequestions] = useState('')
  const [complexquestions, setComplexquestions] = useState('')

  const [complexityOptions, setComplexityOptions] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState("");
  const [ isEditing ,setisEditing] = useState(false);

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [layout1 , setlayout1] = useState(false)
  const [pdfUrl, setPdfUrl] = useState("");

  const [modalMessage, setModalMessage] = useState("");
    const [modalMessage1, setModalMessage1] = useState("");
  
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [shownext, setnext] = useState(false);

  //-------------****print quiz****-----------//
const pdfRef1 = useRef(null);
const inputReff = useRef(null);
const [image, setImage] = useState("");
const currentDate = new Date();
const userRole = localStorage.getItem('user_role');
const FormattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

const [editableFields, setEditableFields] = useState({
    hallTicket: false,
    time: false,
    subjectCode: false,
    maxMarks: false,
    heading: false,
    question1: false,
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    mark1: false,

    question2: false,
    option11: false,
    option12: false,
    option13: false,
    option14: false,
    option111: false,
    option112: false,
    option113: false,
    option114: false,
    mark2: false,

    question3: false,
    option21: false,
    option22: false,
    option23: false,
    option24: false,
    mark3: false,

    question4: false,
    option31: false,
    option32: false,
    option33: false,
    option34: false,
    mark4: false,

});

const handleFieldClick = (field) => {
    if(userRole === 'Quiz Master')
    setEditableFields((prev) => ({ ...prev, [field]: true }));
};

const downloadPDF1 = async ()  =>{
    const input = pdfRef1.current;
    try{
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation:"portrait",
            unit: 'px',
            format:"a4"
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width)/canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, width,height);
        pdf.save("document1.pdf");
    
    }catch(error){
        console.error("Error generating PDF:",error);
    }
};
useEffect(() =>{
    const savedImage = localStorage.getItem('savedImage');
    if(savedImage){
      setImage(savedImage);
    }
  },[]);
  
  function handleImageClick() {
    if (inputReff.current && typeof inputReff.current.click === 'function') {
      inputReff.current.click(); // Open file dialog
    } else {
      console.error('click method is not available on inputReff.current');
    }
  }
  
  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        localStorage.setItem('savedImage', imageDataUrl);
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  }
  
    
  function handleReplaceImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    handleImageClick(); // Open file dialog
  }
  
  function handleDeleteImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    localStorage.removeItem('savedImage'); // Remove from local storage
    setImage(""); // Reset to default image
  }
  
  function handleViewImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    if (image) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = image;
      link.target = '_blank'; // Open in a new tab
      link.click(); // Simulate click to open the image
    } else {
      console.error('No image available to view');
    }
  }

  const handleToPrint =() =>{
    navigate('/print')
  }

  useEffect(() =>{
     const savedContent = localStorage.getItem('savedPageContent');
    if (savedContent && pdfRef1.current) {
        pdfRef1.current.innerHTML = savedContent;
      }
    }, []);

  const handleSave1 = () =>{
    const content = pdfRef1.current.innerHTML;

    localStorage.setItem('savedContent', content);

    alert("Content saved successfully!");
  }

  const togglePopup = () => {
    setlayout1(false)
  }

//----------------***quiz print end***-----------------

const handleInstructionChange = (index, value) => {
  const updatedInstructions = [...instructions];
  updatedInstructions[index] = value;
  setInstructions(updatedInstructions);
};


const [username1, setUsername1] = useState("");

useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    setUsername1(storedUsername);
  }
}, []);

const [currentPage, setCurrentPage] = useState(0);
const questionsPerPage = 20;

// Calculate start and end indices for current page
const startIndex = currentPage * questionsPerPage;
const endIndex = startIndex + questionsPerPage;

// Slice the questions for the current page
const currentQuestions = questions.slice(startIndex, endIndex);

const handleNext4 = () => {
  if ((currentPage + 1) * questionsPerPage < questions.length) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevious = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};

const closeModal = () => {
  setShowModal(false);
  if (publicAccess === "off") {
  } else if (publicAccess === "on") {
    navigate("/dashboard");
  }
}; 

const closeModal1 = () => {
  setShowModal1(false);
};


  // Handle the upload of front or back image
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleNextpage0 = () => {

    setStep(1);
  };

  const handleNextpage = () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      setIsSubmitting(false);
      return;
    }
  
    // Validation: Check file type
    const allowedFileTypes = ["application/vnd.ms-excel", "text/csv"];
    if (!allowedFileTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a CSV file.");
      setIsSubmitting(false);
      return;
    }
  
    // Validation: Check file size (example: limit to 5MB)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
      toast.error("File size exceeds the 5MB limit. Please upload a smaller file.");
      setIsSubmitting(false);
      return;
    }
    setStep(2);
  };
  const handleNextpage1 = () => {
    setStep(3);
  };
  const handleNextpage2 = () => {
    setStep(4);
    // setShowRegistrationSuccess(true);

  };
  const handleNextpage3 = () => {
    setStep(5);

  };
  const handleNextpage4 = () => {
    setStep(6);

  };
  const handeledit =()=> {
    setisEditing((prevState) => !prevState);
   }
 const handleToLayout1 = () =>{
  navigate('/pdf1');
}
const handleToLayout2 = () =>{
  navigate('/pdf2');
}
const handleToLayout3 = () =>{
  navigate('/pdf3');
}
const handleToLayout4 = () =>{
  navigate('/pdf1');
}
 const handleSimplequestions = (event) => {
  setSimplequestions(event.target.value);
};
const handleModeratequestions = (event) => {
  setModeratequestions(event.target.value);
};
const handleComplexquestions = (event) => {
  setComplexquestions(event.target.value);
};
  // useEffect(() => {
  //   if (frontImage && backImage) {
  //     handleUpload();
  //   }
  // }, [frontImage, backImage]);

 
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

  const handleUpload = async (quiz_id) => {
    if (!frontImage || !backImage) {
      alert('Please select both front and back images');
      return;
    }

    const formData = new FormData();
    formData.append('file1', frontImage);
    formData.append('file2', backImage);

    try {
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const response = await fetch(`https://dev.quizifai.com:8010/upload-qz_image?quiz_id=${quiz_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Replace with your actual token
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

  const handleDeleteImage1 = () => {
    setFrontImage(null);
    setBackImage(null);
    setIsFlipped(false);
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
  const instructionsString = instructions.join("\n");
  const handleNext  = async () => {
     
    const user_id = localStorage.getItem('user_id');
    try {
      // if (!frontImage || !backImage) {
      //   toast.error('Please select both front and back images');
      //   setIsSubmitting(false);
      //   return;
      // }
      setIsSubmitting(true);
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
            quiz_public_access: publicAccess ? 'on' : 'off',
            available_from: quizData ? quizData.available_from : availablefrom,
            disabled_on: quizData ? quizData.disabled_on : disabledon,
            quiz_total_marks: quizData
              ? quizData.quiz_total_marks
              : description,
              user_id:user_id,
               quiz_instructions: instructionsString,
            org_id: selectedOrg,
            pdf_url:pdfUrl,
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
      if (response.ok && responseData.response === "success") {
        console.log('response',responseData);
        setModalMessage("Quiz created successfully!");
        setIsError(false);
        setShowModal(true);
        setnext(true);
         setQuizId(responseData.data.quiz_id)
         setQuizName(responseData.data.quiz_title)
         setPublicAccess(responseData.data.public_access_flag === "off");
         const newQuizId = responseData.data.quiz_id;
         setQuizId(newQuizId);
         if (newQuizId) {
           await handleUpload(newQuizId); // Pass quiz ID as a parameter
         }

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
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Type-Quiz failed:", error);
      setErrorMessage("An error occurred while choosing the type of the quiz");
    }
  };


 const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    setModalMessage1("This feature will come soon!");
    setIsError(false);
    setShowModal1(true);
  };


//-----------------**AssignQuiz**-----------------//
const [shareWithGroupOrOrg, setShareWithGroupOrOrg] = useState(false); // Initialize toggle state
const [groupName, setGroupName] = useState('');
const [file, setFile] = useState(null);
const [quizid, setQuizId] = useState(null);
const [quizName, setQuizName] = useState('');
const [showassign, setShowassign] = useState(false);
const [isError1, setIsError1] = useState(false);
const [modalMessage2, setModalMessage2] = useState('');

const closeModal2 = () => {
  setShowassign(false);
};

const handleToggle = (event) => {
  setShareWithGroupOrOrg(event.target.checked); // Update state based on toggle
}; 

const handleSubmit = async (e) => {
  e.preventDefault();
  const selectedUserIds = selectedUsers.map((user) => user.value); // Extract IDs

  // Prepare FormData
  const formData = new FormData();
  formData.append('quiz_id', quizid);
  formData.append('org_id', orgId);
  formData.append('share_with_group_or_org', shareWithGroupOrOrg);
  formData.append('group_name', groupName);
  formData.append('user_ids',selectedUserIds ); // Pass user IDs as a comma-separated string
  if (file) formData.append('files', file);

  try {
    const response = await fetch(
      'https://dev.quizifai.com:8010/assign-quiz-to-group-organization-or-users/',
      {
        method: 'POST',
        body: formData,
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    if (result && result.response === "success") {
      // Check if response indicates success
      setModalMessage2('Quiz assigned successfully!');
      setIsError1(false);
    } else {
      setModalMessage2('Failed to assign quiz. Please try again.');
      setIsError1(true);
    }

    setShowassign(true);
    console.log('Response:', result);
  } catch (error) {
    console.error('Error assigning quiz:', error.message);
    setModalMessage2('Failed to assign quiz. Please try again.');
    setIsError1(true);
    setShowassign(true);
  }
};

//-----------------**AssignQuiz END**-----------------//

//-----------------**users dropdown**-----------------//
const [users, setUsers] = useState([]); // Store dropdown options
const [selectedUsers, setSelectedUsers] = useState([]); // Store selected user IDs
// const [quizId, setQuizId] = useState('');

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Get the auth token from localStorage

      if (!authToken) {
        throw new Error('No authentication token found');
      }
      const response = await fetch(
        `https://dev.quizifai.com:8010/get_organization_nrml_usrs?org_id=${orgId}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.response === 'success' && result.data) {
        // Map response data to react-select options
        const options = result.data.map((user) => ({
          value: user.user_id,
          label: user.user_name,
        }));
        setUsers(options);
      } else {
        console.error('Failed to fetch users:', result.response_message);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  fetchUsers();
}, []);
//-----------------**users dropdown END**-----------------//

const customOption = ({ data, innerRef, innerProps, isSelected }) => (
  <div
    ref={innerRef}
    {...innerProps}
    className={`flex items-center p-2 cursor-pointer ${
      isSelected ? 'bg-blue-50' : 'hover:bg-gray-100'
    }`}
  >
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => {}}
      className="mr-2"
    />
    <span>{data.label}</span>
  </div>
);


const handleback =() =>{
  navigate('/dashboard')
}

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
        if (responseData.pdf_url?.status === "success") {
          const pdfUrl = responseData.pdf_url.pdf_url;
          setPdfUrl(pdfUrl); // Save PDF URL to state
          console.log("File uploaded successfully. PDF URL:", pdfUrl);
        }
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
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('https://dev.quizifai.com:8010/organization/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGFuZHUgdmFyZGhhbiBrIiwiZXhwIjoyNTM0MDIzMDA3OTl9.H_wmqwEmdspaXzFRthV49YH_y25UZlj5zul3hV0bXF8',
          },
        });
        const result = await response.json();
        if (result.response === 'success') {
          setOrganizations(result.data);
        } else {
          console.error(result.response_message);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
  
    fetchOrganizations();
  }, []);
  
    const handleOrgSelect = (orgId) => {
      setSelectedOrg(orgId);
      // Pass org_id to the backend
      console.log('Selected Organization ID:', orgId);
      // Example POST request to send org_id
      fetch('https://your-backend-endpoint.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ org_id: orgId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from backend:', data);
        })
        .catch((error) => console.error('Error sending org_id:', error));
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
          <ToastContainer />
      <div className="w-full">
{/* <div className="flex justify-end py-2 cursor-pointer text-[#eeb600f0]" onClick={Back}><MdOutlineCancel /></div> */}



  {!showRegistrationSuccess && (
  <main className="container mx-auto mt-5">
 
   {/* <div className="bg-[#eedbe5] rounded-[10px] p-4 mb-8 ">
      <h1 className="font-Poppins font-normal text-[20px] text-[#214082]">
        Finalize the configuration and click 'Next' to proceed with adding your quiz questions.
      </h1>
    </div> */}
    {step !== 0 && (
<div className="flex w-full h-[15%] border-[#d9afc4] border-[1px] border-b-[8px] rounded-lg rounded-b-xl shadow-lg p-2 bg-white ">
      {/* <img
        src={physics}
        alt="Quiz Cover"
        className="w-32 h-44 rounded-md mr-4"
      /> */}
          <div className="relative mr-2">
          <img
  src={isFlipped ? (backImage ? URL.createObjectURL(backImage) : back): (frontImage ? URL.createObjectURL(frontImage) : physics)
  }
  alt="Quiz Cover"
  className="w-[120px] h-[140px] rounded-md mr-4 cursor-pointer"
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
          <button onClick={handleDeleteImage1}  className="absolute bottom-1 right-1 text-white bg-red-500 bg-opacity-75 rounded-full p-1">
                        <RiDeleteBinLine className="w-[12px] h-[12px]" />
                      </button>
      </div>
      <div className="flex flex-col  w-full">
        {/* Title and Version */}
        <div className="flex items-center gap-[3px]">
          <h2 className="text-lg font-semibold text-[#00008b]">
          {quizData ? quizData.quiz_title : title || "Enter the Title"}

          </h2>
          {/* <span className="text-xs text-red-500">v1.0</span> */}
        </div>

        {/* Description */}
        <p className="text-[#00008b] w-[80%] line-clamp-2 text-sm mt-1">
        {quizData ? quizData.quiz_description : description || "Enter the Description"}

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
        <div className=" flex-col items-center space-y-2  mt-2 text-[#00008b]">
          {/* Author and Date */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              {/* <i className="fas fa-user"></i> */}
              <img src={username}  className=" w-[18px] h-[18px] mr-1"/>
              <span className="ml-1 text-sm">{username1}</span>
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
    )}
    {step === 0 && (
         <>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white my-4 p-5">
  <div className="md:col-span-2">
    <h1 className="font-semibold text-[20px] text-[#214082]">Quiz Instructions</h1>
  </div>

  {instructions.map((instruction, index) => (
    <div key={index} className="flex items-start">
      {/* Number Display */}
      <div className="w-4 text-[14px] font-semibold text-right mr-2">{index + 1}.</div>
      {/* Input for Editing */}
      <input
          disabled={!isEditing}
          value={instruction}
          onChange={(e) => handleInstructionChange(index, e.target.value)}
          className={`w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[14px] focus:outline-none ${
            !isEditing ? 'text-gray-700 cursor-not-allowed' : 'text-black'
          }`}
      />
    </div>
  ))}

  <div className="flex justify-end md:col-span-2">
  <div className="flex gap-1">

<button
    onClick={handeledit} 
    className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
  >
    Edit
  </button>
  <button
    onClick={handleNextpage0}
    className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
  >
    Next
  </button>
  
  </div>
  </div>
</div>

        </> 
       )}
    {step === 1 && (
         <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
    
      <div className="md:col-span-2"> 
        <h1 className=" font-semibold text-[20px] text-[#00008b]">Generic Fields</h1>
      </div>
      {/* Show Quiz Title and Description in Step 1 */}
      <div className="flex flex-col items-start justify-start md:col-span-2" >
                <div className=" p-2 border-[1px] bg-white flex flex-col justify-center">
                  <div className="flex">
                    <img className="w-[24px] h-[24px] ml-4 -rotate-90" src={Next}/>
               
                <label
        htmlFor="fileInput"
        className="font-Poppins font-medium text-[15px] leading-[22.5px] flex items-center px-4 py-2 text-white cursor-pointer"
      >
        <div className="relative group">
          <span className="block truncate  text-[#00008b]">
          Drag and Drop a file here or <span className="text-[#3B61C8] underline">click to browse</span>
          </span>
         
        </div>
        <input
                id="fileInput"
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileInputChange}
                className="hidden"
              />
       
      </label>
                  </div>
                  <div>

                <h1 className="flex justify-center text-[#00008b]">up to 512MB per file</h1>
                  </div>
                </div>
               
 
      {/* <div className=" w-[137.09px] h-[9.05px]">
        <Line percent={uploadProgress} strokeWidth={5} strokeColor="#B1FB9B" />
        <h1 className="font-Poppins text-[#214082] font-normal text-[10px] leading-[15px]  mt-1 ml-8">
          {`Uploading ${uploadProgress}%`}
        </h1>
      </div> */}
    {/* </div> */}
    <div className="flex justify-center items-center mt-10">

   
{errorMessage && <p className=" flex text-red-500">{errorMessage}</p> }
</div>
    </div>

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
  value={quizData ? quizData.quiz_title : title}
  onChange={(e) => setTitle(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
/>

            </div>
            <hr className="h-[1px] w-full" />
          </div>

          {/* Quiz Description */}
          <div className="flex flex-col md:col-span-2">
            <div className="w-full flex flex-row">
              <label className="w-[10%] text-blue-800 font-semibold mb-2 ">
               Description <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                type="text"
                required
                value={quizData ? quizData.quiz_description : description}

                onChange={(e) => setDescription(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
              />
            </div>
            <hr className="h-[1px] w-full" />
          </div>

       
         
       

   
     
          {/* Quiz Category */}
          <div className="flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[23%] text-blue-800 font-semibold mb-2 ">
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
              <label className="w-[23%] text-blue-800 font-semibold mb-2">
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
          <div className="md:col-span-2">

          <div className="flex gap-6">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className="w-[31%] text-blue-800 font-semibold mb-2 ">
                Course<span className="text-red-500"></span>
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
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[20%] text-blue-800 font-semibold mb-2">
                Class<span className="text-red-500"></span>
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
           {/*  Public access */}
  <div className=" w-[50%] flex flex-col">
        <div className="w-[100%] flex flex-row">
        <label className="w-[100%] text-blue-800 font-semibold mb-2 mr-[10px] ">  Public access <span className="text-red-500">*</span></label>
        <FormControlLabel 

         
        control={<Switch />} 
        // label="Required"
          onChange={toggler3}
          checked={ quizData ? quizData.quiz_public_access : publicAccess}
          className="react-switch"
        />
       
        </div>
      
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



<div className="md:col-span-2">

<div className="w-full flex gap-6">
      {/* Complexity */}
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[23%] text-blue-800 font-semibold mb-2">Complexity<span className="text-red-500">*</span></label>
        
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
<div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className="w-[30%] text-blue-800 font-semibold mb-2 ">
      Subject<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      // value={selectedCourse}
      // onChange={handleSelectCourse}
    >
      <option value="" disabled>Select a Subject</option>
      <option value="">None</option>
      {/* {courses.map((course) => (
        <option key={course.course_id} value={course.course_name}>
          {course.course_name}
        </option>
      ))} */}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>


</div>

</div>

<div className="flex justify-between md:col-span-2">
            <button
              onClick={() => setStep(0)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Back
            </button>
            <button
              onClick={handleNextpage}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
            >
              Next
            </button>
          </div>
    </div>
        </> 
       )}
         {step === 2 && (
         <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
  
    <div className="md:col-span-2">
        <h1 className=" font-semibold text-[20px] text-[#00008b]">Quiz Metrics</h1>
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
      {/* <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2 mr-[132px] ">Complexity<span className="text-red-500">*</span></label>

        <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={simplequestions}
          onChange={handleSimplequestions}
        >
          <option value="" disabled>Simple</option>
          {Array.from({ length: numQuestions }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
        </select>
        <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={moderatequestions}
          onChange={handleModeratequestions}
        >
          <option value="" disabled>Moderate</option>
          {Array.from({ length: numQuestions }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
        </select>
        <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={complexquestions}
          onChange={handleComplexquestions}
        >
          <option value="" disabled>Complex</option>
          {Array.from({ length: numQuestions }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
        </select>
      
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
       {/* Pass Percentage */}
      
 <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2">Pass Percentage<span className="text-red-500">*</span></label>
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
      {/* <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[100%] text-blue-800 font-semibold mb-2 mr-[75px] ">Question Type<span className="text-red-500">*</span></label>

        <select
                  className={ ` w-[80%]  border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={selectedComplexity}
          onChange={setSelectedComplexity}
        >
          <option value="" disabled>MCQ</option>
          {Array.from({ length: numQuestions }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
        </select>
        <select
                  className={ ` w-[80%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={selectedComplexity}
          onChange={setSelectedComplexity}
        >
          <option value="" disabled>Fill in the blank</option>
          {Array.from({ length: numQuestions }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
        </select>
        <select
                  className={ ` w-[80%] border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={selectedComplexity}
          onChange={setSelectedComplexity}
        >
          <option value="" disabled>True or False</option>
          {Array.from({ length: numQuestions }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
        </select>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div> */}
     

      
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
      {/* Time bounded Questions */}
 <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2 "> Time bounded Questions<span className="text-red-500">*</span></label>

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
       {/* Complexity */}
       {/* <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2">Complexity<span className="text-red-500">*</span></label>
        
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
      </div> */}
   {/* Retake Option */}
   <div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[105px]">
          Retake Option <span className="text-red-500">*</span>
        </label>
        <FormControlLabel 
         control={<Switch />} 
        // label="Required"
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
  

        <div className="flex justify-between md:col-span-2">
            <button
              onClick={() => setStep(1)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Back
            </button>
            <button
              onClick={handleNextpage1}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Next
            </button>
          </div>
      </div>
      </> 
       )}
    {step === 3 && (
         <>
    <div className=" bg-white my-4 p-5">
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6 bg-white ">
    
    <div className="md:col-span-2">
        <h1 className=" font-semibold text-[20px] text-[#00008b]">AI Inputs</h1>
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
          checked={quizData ? quizData.multi_answer : multiAnswer}

          className="react-switch"
        />
        
      </div>
     
 {/* Multiple Answers */}
 <div className="flex items-center md:col-span-2">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[55px]">
        Learning Material <span className="text-red-500">*</span>
        </label>
        <FormControlLabel 
         control={<Switch />} 
        // label="Required"
          onChange={toggler1}
          checked={quizData ? quizData.multi_answer : multiAnswer}
          className="react-switch"
        />
        
      </div>
    </div>
  
    <div className="flex justify-between md:col-span-2 py-5">
            <button
              onClick={() => setStep(2)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Back
            </button>
            <button
              onClick={handleNextpage2}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Next
            </button>
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
    </> 
       )}
  {/* </main>
)} */}
{step === 4 && (
         <>
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
      
      </div>
      {currentQuestions.map((question, questionIndex) => (
        <div key={startIndex + questionIndex} className="mb-8">
          <div className="flex items-center mb-4">
            <div className="mr-2 text-xl font-bold text-[#214082]">
              {startIndex + questionIndex + 1}.
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
                  <div className="flex justify-between mt-4">
        <button
                className="flex gap-1 items-center cursor-pointer"
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                <img
                  className="h-3 w-3 rotate-180"
                  src={GreaterThan}
                  alt="Previous icon"
                />
                <h1 className="text-[#F17530]">Previous</h1>
              </button>
              <span>
              Page {currentPage} of {Math.ceil(questions.length / questionsPerPage)}

              </span>
     
        <button
                className="flex gap-1 items-center cursor-pointer"
                onClick={handleNext}
                disabled={(currentPage + 1) * questionsPerPage >= questions.length}
              >
                <h1 className="text-[#F17530]">Next</h1>
                <img className="h-3 w-3" src={GreaterThan} alt="Next icon" />
              </button>
      </div>
  
              <div className=" flex justify-between items-center py-5 ">
                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
      className={`w-[123px] h-[32px] rounded-[10px] ${
        isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1E4DE9] hover:bg-[rgb(239,81,48)]"
      } text-white transform hover:scale-105 transition duration-200`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      Save as Drafts
    </button>
    <button
                 disabled={isSubmitting} 
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
              onClick={handleNext}
             
                >
                 {isSubmitting ? "Creating..." : "Create"}
                </button>
                {shownext && (
                <button
            onClick={handleNextpage3}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Next
            </button>
            )}
              </div>
            </div>

            {/* Submit button */}
          </main>
        {/* // )} */}
        </>
)}
{step === 5 && (
         <>

<div className=" bg-white my-4 p-5">
          <div className="flex flex-col gap-6 bg-white ">
    
    <div className="flex items-start">
        <h1 className=" font-semibold text-[20px] text-[#214082]">Assign Quizzes</h1>
      </div>
     
      {/* <div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Oragnization<span className="text-red-500">*</span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
value={orgId}
                  placeholder="Oragnization"
                
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div> */}
<div className="flex gap-6 w-full">

<div className="flex flex-col  gap-6 w-full">
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Quiz ID<span className="text-red-500">*</span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                             value={`${quizName}`} 
                  placeholder="Oragnization"
                
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div>



<div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[72px]">
        Sharing with Group/Organization
        <span className="text-red-500">*</span>
        </label>
        <FormControlLabel
        control={<Switch />} 
        checked={shareWithGroupOrOrg} // Controlled state
        onChange={handleToggle} // Update state on toggle
          className="react-switch"
        />
        
      </div>
    
    {!shareWithGroupOrOrg && (
        <div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Deparment<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      // value={selectedCourse}
      // onChange={handleSelectCourse}
    >
      <option value="" disabled>Select a Deparment</option>
      <option value="">None</option>
      {/* {courses.map((course) => (
        <option key={course.course_id} value={course.course_name}>
          {course.course_name}
        </option>
      ))} */}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>
 )}
  {!shareWithGroupOrOrg &&(
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      User ID<span className="text-red-500">*</span>
    </label>
    {/* <Select
  options={users} // Dynamically populated options
isMulti
  value={selectedUsers} // Selected values
  onChange={setSelectedUsers} // Update state on selection
  className="basic-multi-select w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
  classNamePrefix="select"
/> */}
 <Select
        options={users}
        isMulti
        value={selectedUsers}
        onChange={setSelectedUsers}
        className="basic-multi-select w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
        classNamePrefix="select"
        placeholder="Search and select users..."
        closeMenuOnSelect={false}
        components={{ Option: customOption }}
        isSearchable={true}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#2563EB' : '#D1D5DB',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : base.boxShadow,
            '&:hover': { borderColor: '#2563EB' },
          }),
          option: (base, state) => ({
            ...base,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: '#2563EB',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#2563EB',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#2563EB',
            ':hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              color: 'white',
            },
          }),
        }}
      />

  </div>
  {/* <hr className="h-[1px] w-full" /> */}
</div>
   
)}
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
    File <span className="text-red-500"></span>
    </label>
    <input
      className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
      placeholder="File"
      type="file"
      onChange={(e) => setFile(e.target.files[0])}>
      </input>
  </div>
  <hr className="h-[1px] w-full" />
</div>
</div>
{/* <div className="flex flex-col  gap-6 w-full">
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      School<span className="text-red-500"></span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="School"
                
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div>
      <div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className="w-[20%] text-blue-800 font-semibold mb-2 ">
      Class<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
   
    >
      <option value="" disabled>Select a Class</option>
      <option value="">None</option>
      
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>
<div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className=" w-[20%] text-blue-800 font-semibold mb-2">
    Section<span className="text-red-500"></span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      
    >
      <option value="" disabled>Select a Section</option>
      
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>

<div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[72px]">
        Email Alert <span className="text-red-500"></span>
        </label>
        <FormControlLabel
        control={<Switch />} 
          onChange={toggler1}
          className="react-switch"
        />
        
      </div>





</div> */}

</div>


    </div>
  
    <div className="flex justify-between md:col-span-2 py-5">
    

            <button
              onClick={() => setStep(4)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Back
            </button>
            <div className="flex gap-2">
            <button onClick={handleNextpage4} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
  Skip
</button>

            <button
            onClick={handleSubmit}
              // onClick={handleNextpage4}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Assign
            </button>
            
            <button
            onClick={handleNextpage4}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Next
            </button>
            </div>
          
          </div>
 </div>


    </> 
       )}
        {step === 6 && (
         <>
  <div className=" bg-white my-4 p-5">
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6 bg-white ">
    
    <div className="md:col-span-2">
        <h1 className=" font-semibold text-[20px] text-[#214082]">Print Quiz</h1>
      </div>
     
     
      <div className="w-full flex items-center ">
 <div className=" w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className=" w-[23%] text-blue-800 font-semibold mb-2 mr-[10px]">
               Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                 rows="4" 
                cols="50"
                required
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                disabled={!isEditing}

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
          <div className='w-full'>
        <div className='font-bold text-center text-[25px] font-Poppins text-blue-900 mt-3 hover:transform hover:scale-110 transition-transform duration-300 ease-in-out'style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>   
         <h1>EXAM PAPER TEMPLATES</h1>
        </div>

        <div className='flex justify-around mt-5'>
            <div className='bg-[#F3F7FB] px-10 py-4'>
                <div className='h-14 w-14 bg-white rounded-full border-t-2 border-[#EF5130]'> 
                <img className='h-7 w-7 ml-4 mt-3' src={QuestionPaper}/>
                </div>
                <h1 className='text-[15px] font-semibold'>Layout 1</h1>
                <button className='bg-[#EF5130] text-white rounded-[15px] px-1 relative left-2 mt-3' onClick={handleToLayout1}>View</button>
            </div>
{layout1 && (

     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto" ref={pdfRef1}>
        <div
            className="bg-white w-[794px] h-[1123px] p-8 rounded-lg shadow-lg relative"
            style={{
              width: "794px", // 210mm in pixels (A4 width at 96 DPI)
              height: "1123px", // 297mm in pixels (A4 height at 96 DPI)
            }}
          >
              {/* Close Button */}
              <button
              className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              onClick={togglePopup}
            >
              Close
            </button>
     <h1 className='font-serif font-bold text-center text-[25px] mt-20 focus:outline-none focus:border-none'
     onClick={() => handleFieldClick('hallTicket')}
     contentEditable={editableFields.hallTicket}
     >
     <span className='text-red-600 border-none'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION </span><br/>
     <span>SCIENCE</span> <br/>CLASS IX (THEORY)
     <br/>SAMPLE QUESTION PAPER - II <br/>2024</h1>
 
     <div className='h-[130px] w-[130px] border-4 border-solid focus:outline-none focus:border-none relative -mt-[140px] ml-32'>
     <div className="w-[100px] ml-[11px] h-[100px] mt-3" style={{ position: "relative" }}>
       {image ? (
         <img className="w-[100px] h-[100px] border-2 border-white" src={image} alt="Uploaded" />
       ) : (
         <img className="w-[100px] h-[100px] border-2 border-white" src={QuizifAilogo} alt="Default" />
       )}
       <input type="file" ref={inputReff} onChange={handleImageChange1} style={{ display: "none" }} />
 
       <div className="w-fit h-[24px] px-[2px] py-[1px] relative left-16 -top-7">
         <div className="rounded-full w-fit h-[28px] px-[2px] py-[2px] flex items-center justify-center group">
           {/* <img className="h-4 w-4 relative -top-[3px] cursor-pointer" src={Camera} alt="Camera" /> */}
           <div className="absolute top-full text-[7px] left-0 right-[30px] mt-1 bg-white rounded-sm text-black w-fit h-[37px] cursor-pointer px-1 py-[2px] text-nowrap items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <p onClick={handleReplaceImage}>Replace Image</p><br/>
             <p className="relative -top-[10px]" onClick={handleViewImage}>View Image</p><br/>
             <p className="relative -top-[20px]" onClick={handleDeleteImage}>Delete Image</p>
           </div>
         </div>
       </div>
     </div>
     </div>
 
             <div className='flex justify-between mt-14'>
                 <div className='ml-32'>
                 <div className='font-serif font-bold  text-[20px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('hallTicket')}
             contentEditable={editableFields.hallTicket}
             >Hall Ticket No:</div>
 
             <div className='font-serif font-bold text-[20px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('time')}
             contentEditable={editableFields.time}
             >Time:<span className='font-thin font-none pl-1'>60 Min</span></div>  
                 </div>
             
             <div className='mr-24'>
             <div className='font-serif font-bold text-[20px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('subjectCode')}
             contentEditable={editableFields.subjectCode}
             >Subject Code:</div>
 
             <div className='font-serif font-bold text-[20px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('maxMarks')}
             contentEditable={editableFields.maxMarks}
             >Maximum Marks:<span className='font-thin font-none pl-1'>75</span></div>
             </div>
             </div>
             
 
 
             <h1 className='font-serif font-semibold text-center text-[25px] relative text-blue-900 mt-5 pl-20 -ml-20 focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('heading')}
              contentEditable={editableFields.heading}
              >Multiple Choice Questions</h1>
 
             <div className='flex'>
                 <h1 className='pl-[200px] pt-[35px] text-bold font-serif text-[21px] pr-3'>1.</h1>
                 <span className='pt-[40px] pr-[350px] focus:outline-none focus:border-none' 
                 onClick={() => handleFieldClick('question1')}
                 contentEditable = {editableFields.question1}>
                 Seema visited a Natural Gas Compressing Unit and found that the gas can
                 be liquefied under specific conditions of temperature and pressure. While
                 sharing her experience with friends she got confused. Help her to identity
                 the correct set of conditions.
                 </span>
             </div>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option1')}
             contentEditable = {editableFields.option1}>(a) Low temperature, low pressure</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option2')}
              contentEditable = {editableFields.option2}>(b) High temperature, low pressure</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option3')}
              contentEditable = {editableFields.option3}>(c) Low temperature, high pressure</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option4')}
              contentEditable = {editableFields.option4}>(d) High temperature, high pressure</span>
              <span className='pl-[330px] focus:outline-none focus:border-none' 
              onClick={() => handleFieldClick('mark1')}
              contentEditable= {editableFields.mark1}>(1)</span>
 
              <div className='flex'>
                 <h1 className='pl-[200px] pt-[15px] text-bold font-serif text-[20px] pr-3'>2.</h1>
                 <span className='pt-[18px] pr-[350px] focus:outline-none focus:border-none'
                 onClick={() => handleFieldClick('question2')}
                 contentEditable = {editableFields.question2}>
                 Which of the following are physical changes?
                 </span>
             </div>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
             onClick={() => handleFieldClick('option11')}
             contentEditable = {editableFields.option11}>(i) Melting of iron metal</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option12')}
              contentEditable = {editableFields.option12}>(ii) Rusting of iron</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option13')}
              contentEditable = {editableFields.option13}>(iii) Bending of an iron rod</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option14')}
              contentEditable = {editableFields.option14}>(iv) Drawing a wire of iron metal</span><br/>
 
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option111')}
              contentEditable = {editableFields.option112}>(a) (i), (ii) and (iii)</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option112')}
              contentEditable = {editableFields.option112}>(b) (i), (ii) and (iv)</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option113')}
              contentEditable = {editableFields.option113}>(c) (i), (iii) and (iv)</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option114')}
              contentEditable = {editableFields.option114}>(d) (ii), (iii) and (iv)</span>
              <span className='pl-[459px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('mark2')}
              contentEditable = {editableFields.mark2}>(1)</span>
 
              <div className='flex'>
                 <h1 className='pl-[200px] pt-[10px] text-bold font-serif text-[20px] pr-3'>3.</h1>
                 <span className='pt-[14px] pr-[350px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('question3')}
              contentEditable = {editableFields.question3}>
                 Which one of the following has maximum number of atoms?
                 </span>
             </div>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option21')}
              contentEditable = {editableFields.option21}>(a) 18 g of H2O</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option22')}
              contentEditable = {editableFields.option22}>(b) 18 g of O2</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option23')}
              contentEditable = {editableFields.option23}>(c) 18 g of CO2</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option24')}
              contentEditable = {editableFields.option24}>(d) 18 g of CH4</span>
              <span className='pl-[479px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('marks3')}
              contentEditable = {editableFields.mark3}>(1)</span>
 
              <div className='flex'>
                 <h1 className='pl-[200px] pt-[15px] text-bold font-serif text-[20px] pr-3'>4.</h1>
                 <span className='pt-[17px] pr-[350px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('question4')}
              contentEditable = {editableFields.question4}>
                 In a sample of ethyl ethanoate (CH3COOC2H5) the two oxygen atoms have
                 the same number of electrons but different number of neutrons. Which of
                 the following is the correct reason for it?
                 </span>
             </div>
             <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option31')}
              contentEditable = {editableFields.option31}>(a) One of the oxygen atoms has gained electrons</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option32')}
              contentEditable = {editableFields.option32}>(b) One of the oxygen atoms has gained two neutrons</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option33')}
              contentEditable = {editableFields.option33}>(c) The two oxygen atoms are isotopes</span><br/>
              <span className=' font-serif pl-[220px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('option34')}
              contentEditable = {editableFields.option34}> (d) The two oxygen atoms are isobars.</span>
              <span className='pl-[320px] focus:outline-none focus:border-none'
              onClick={() => handleFieldClick('mark4')}
              contentEditable = {editableFields.mark4}>(1)</span>
 
              <h1 className='text-xs pl-[1000px] pt-10 pb-10 font-semibold'>{FormattedDate}</h1>
              <div className='flex gap-5 mb-5 justify-center'>
              <button 
           className='bg-[#223F80] rounded-md text-white px-3 py-1 hover:bg-[#EF5130]'
           onClick={handleSave1} // Attach the save function here
         >
           Save
         </button>            
         <button className='bg-[#223F80] rounded-md text-white px-3 py-1 relative  hover:bg-[#EF5130]' onClick={downloadPDF1}>Download PDF</button>
              <button className='bg-[#223F80] rounded-md text-white px-3  hover:bg-[#EF5130]' onClick={handleToPrint}>Print</button>
              </div>
 
 
     </div>
     </div>
)}
            <div className='bg-[#F3F7FB] px-10 py-4'>
                <div className='h-14 w-14 bg-white rounded-full border-t-2 border-[#EF5130]'> 
                <img className='h-7 w-7 ml-4 mt-3' src={QuestionPaper}/>
                </div>
                <h1 className='text-[15px] font-semibold'>Layout 2</h1>
                <button className='bg-[#EF5130] text-white rounded-[15px] px-1 relative left-2 mt-3' onClick={handleToLayout2}>View</button>
            </div>

           
            <div className='bg-[#F3F7FB] px-10 py-4'>
                <div className='h-14 w-14 bg-white rounded-full border-t-2 border-[#EF5130]'> 
                <img className='h-7 w-7 ml-4 mt-3' src={QuestionPaper}/>
                </div>
                <h1 className='text-[15px] font-semibold'>Layout 3</h1>
                <button className='bg-[#EF5130] text-white rounded-[15px] px-1 relative left-2 mt-3' onClick={handleToLayout3}>View</button>
            </div>
            <div className='bg-[#F3F7FB] px-10 py-4'>
                <div className='h-14 w-14 bg-white rounded-full border-t-2 border-[#EF5130]'> 
                <img className='h-7 w-7 ml-4 mt-3' src={QuestionPaper}/>
                </div>
                <h1 className='text-[15px] font-semibold'>Layout 4</h1>
                <button className='bg-[#EF5130] text-white rounded-[15px] px-1 relative left-2 mt-3' onClick={handleToLayout4}>View</button>
            </div>
        </div>
       </div>
  {/* Multiple Answers */}
  <div className="flex justify-end md:col-span-2">

  <button onClick={handleback} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
  Skip
</button>
  <button
           
              className="px-[40px] ml-2 p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Print
            </button>
     
 {/* Multiple Answers */}
 <button
              className="px-[40px] ml-2 p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Save
            </button>
            </div>
    </div>
  
    <div className="flex justify-between md:col-span-2 py-5">
            <button
              onClick={() => setStep(5)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Back
            </button>
          </div>
 
   
    </div>
    </> 
       )}
         {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
            isError ? "border-red-500" : "border-green-500"
          } border-t-4`}
        >
          <h2
            className={`text-xl font-semibold ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {isError ? "Error" : "Success"}
          </h2>
          <p className="mt-2 text-gray-700">{modalMessage}</p>
          <button
            onClick={closeModal}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    )}
        {showModal1 && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
            isError ? "border-red-500" : "border-green-500"
          } border-t-4`}
        >
          {/* <h2
            className={`text-xl font-semibold ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {isError ? "Error" : "Success"}
          </h2> */}
          <p className="mt-2 text-gray-700">{modalMessage1}</p>
          <button
            onClick={closeModal1}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    )}
      {showassign && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className={`bg-white rounded-lg shadow-lg p-6 w-96 text-center ${
        isError1 ? "border-red-500" : "border-green-500"
      } border-t-4`}
    >
      <h2
        className={`text-xl font-semibold ${
          isError1 ? "text-red-500" : "text-green-500"
        }`}
      >
        {isError1 ? "Error" : "Success"}
      </h2>
      <p className="mt-2 text-gray-700">{modalMessage2}</p>
      <button
        onClick={closeModal2}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
 </main>
)}

      </div>
</div>
    </>
  );
}
