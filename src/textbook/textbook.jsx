"use client";
import React, { useState ,useEffect} from "react";
import { Line } from "rc-progress";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

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
import Book from "../assets/Images/quiz-type/Book.png";
import Navigation from "../navbar/navbar";
import physics from "../../src/assets/Images/quiz-type/quizcover.jpg"
import back from "../../src/assets/Images/quiz-type/Q back image.webp"
import username from "../../src/assets/Images/quiz-type/username.png"
import calander from "../../src/assets/Images/quiz-type/calander.png"
import timer from "../../src/assets/Images/quiz-type/Timer.png"
import comment from "../../src/assets/Images/quiz-type/comment.png"
import editicon from "../../src/assets/Images/quiz-type/edit.png"

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
  const [timings, setTimings] = useState("No");
  const [minutes, setMinutes] = useState("");
  const [availablefrom, setavailablefrom] = useState("");
  const [disabledon, setdisabledon] = useState("");

  const [publicAccess, setPublicAccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isRetakeOn, setIsRetakeOn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0");
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  // const [showRegistrationSuccess1, setShowRegistrationSuccess1] = useState(true);
  const [quiztotalmarks, setquiztotalmarks] = useState("100");
  const [questionWeightage, setquestionWeightage] = useState("");
  const [multiAnswerFlag, setmultiAnswerFlag] = useState("");
  const [questionDuration, setquestionDuration] = useState("");
  const [optionsArray, setoptionsArray] = useState("");
  const [questionsData, setquestionsData] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  // const [questions, setQuestions] = useState(
  //   // Array.from({ length: numQuestions }, () => ({
  //   //   question_text: "",
  //   //   options: [
  //   //     { answer_option_text: "" },
  //   //     { answer_option_text: "" },
  //   //     { answer_option_text: "" },
  //   //     { answer_option_text: "" },
  //   //   ],
  //   // }))
  // );
  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [coursename, setcoursename] = useState("");

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [quizCategory, setQuizCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [complexities, setComplexities] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);

  const [questions, setQuestions] = useState([]);

  const [subject, setsubject] = useState([]);


  const [document, setDocument] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [released, setReleased] = useState("");
  const [revision, setRevision] = useState("");
  const [documentType, setDocumentType] = useState("");

  const [ isEditing ,setisEditing] = useState(false);
  const [instructions,setininstructions] = useState('Carefully read each question before selecting your answer. Answer all questions, even if you are not sure. If available, use the skip or review feature to mark questions you want to revisit later. Make sure to submit your answers before the timer ends. Quizzes may auto-submit, but it is best to double-check.')

  const [simplequestions, setSimplequestions] = useState('')
  const [moderatequestions, setModeratequestions] = useState('')
  const [complexquestions, setComplexquestions] = useState('')

  const [selectedQuestions, setSelectedQuestions] = useState([]); 
  const [next, setNext] = useState(false);

 const [frontImage, setFrontImage] = useState(null);
 const [backImage, setBackImage] = useState(null);
 const [isFlipped, setIsFlipped] = useState(false);

 // Handle the upload of front or back image
 const [step, setStep] = useState(1);

 const handleNextpage = () => {
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
  setisEditing(true);
 }
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const response = await fetch(
        "https://dev.quizifai.com:8010/categories&sub_categories/",{

          headers: {
            'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      const data = await response.json();
      if (data.response === "success") {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    if (categories.length > 0) {
      const generalCategory = categories.find(category => category.category_name === 'General');
      if (generalCategory) {
        setSelectedCategory(generalCategory.category_name);
        setSubCategories(generalCategory.sub_categories.map(sub => sub.sub_category_name));
      }
    }
  }, [categories]);
  
  useEffect(() => {
    if (subCategories.length > 0) {
      const generalSubCategory = subCategories.find(subCategory => subCategory === 'General');
      if (generalSubCategory) {
        setSelectedSubCategory(generalSubCategory);
      } else {
        setSelectedSubCategory(subCategories[0]); // Default to the first subcategory if 'General' is not available
      }
    }
  }, [subCategories]);
  useEffect(() => {
    // Get the current date and format it as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    setavailablefrom(today);
  }, []);
  // Handle category selection
  const handleSelectCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    const category = categories.find(cat => cat.category_name === selectedCategory);
    if (category) {
      setSubCategories(category.sub_categories.map(subCat => subCat.sub_category_name));
      setSelectedSubCategory(''); // Reset subcategory when a new category is selected
    }
  };
  const sortedCategories = [...categories].sort((a, b) =>
    a.category_name.localeCompare(b.category_name)
  );
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
      const response = await fetch("https://dev.quizifai.com:8010/courses-clsses/",{
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.response === "success") {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    const generalCourse = courses.find(course => course.course_name === 'General');
    if (generalCourse) {
      setSelectedCourse(generalCourse.course_name);
      setClasses(generalCourse.classes.map(cls => cls.class_name));
    }
  }, [courses]);

  useEffect(() => {
    if (classes.length > 0) {
      const generalClass = classes.find(className => className === 'General');
      if (generalClass) {
        setSelectedClass(generalClass);
      }
    }
  }, [classes]);
  // Handle course selection
  const handleSelectCourse = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    // Find the selected course and set its classes
    const course = courses.find(
      (course) => course.course_name === selectedCourse
    );
    if (course) {
      setClasses(course.classes.map((cls) => cls.class_name));
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
      const response = await fetch("https://dev.quizifai.com:8010/complexities/",{

        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.response === "success") {
        setComplexities(
          data.data.map((complexity) => complexity.complexity_name)
        );
      }
    } catch (error) {
      console.error("Error fetching complexities:", error);
    }
  };

  // Handle complexity selection
  const handleSelectComplexity = (event) => {
    setSelectedComplexity(event.target.value);
  };
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

  // const handleToggleButton = (questionIndex, optionIndex) => {
  //   const newOptions = questions[questionIndex].options.map(
  //     (option, index) => ({
  //       ...option,
  //       correct_answer_flag: multiAnswer
  //         ? index === optionIndex
  //           ? !option.correct_answer_flag
  //           : option.correct_answer_flag
  //         : index === optionIndex,
  //       // If multiAnswer is true, toggle the clicked option, else set only the clicked option to true, rest to false
  //     })
  //   );

  //   // If multiAnswer is true, explicitly set unselected options to false
  //   if (multiAnswer) {
  //     newOptions.forEach((option, index) => {
  //       if (index !== optionIndex && !option.correct_answer_flag) {
  //         newOptions[index].correct_answer_flag = false;
  //       }
  //     });
  //   }

  //   const newQuestions = questions.map((question, idx) => ({
  //     ...question,
  //     options: idx === questionIndex ? newOptions : question.options,
  //   }));
  //   setQuestions(newQuestions);
  // };
  // const handleToggleButton = (chapterKey, subChapterKey, questionIndex, optionIndex) => {
  //   const updatedQuestions = [...questions];
  //   updatedQuestions[chapterKey][subChapterKey][questionIndex].options[optionIndex].correct_answer_flag = !updatedQuestions[chapterKey][subChapterKey][questionIndex].options[optionIndex].correct_answer_flag;
  //   setQuestions(updatedQuestions);
  // };

  const handleInputChange = (questionIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].answer_option_text = value;
    setQuestions(updatedQuestions);
  };

  const handleToggleButton = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].correct_answer_flag =
      !updatedQuestions[questionIndex].options[optionIndex].correct_answer_flag;
    setQuestions(updatedQuestions);
  };

  const getOptions = (options) => {
    const correctOption = options.find(option => option.correct_answer_flag);
    const incorrectOptions = options.filter(option => !option.correct_answer_flag);

    let selectedOptions;
    if (correctOption) {
      selectedOptions = [correctOption, ...incorrectOptions.slice(0, 3)];
    } else {
      selectedOptions = options.slice(0, 4);
    }

    // Shuffle the selected options to randomize the position of the correct answer
    for (let i = selectedOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedOptions[i], selectedOptions[j]] = [selectedOptions[j], selectedOptions[i]];
    }

    return selectedOptions;
  };
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         setUploadedFile(file);
//         await handleNext();
//     }
// };

const handleFileChange = (event) => {
  const file = event.target.files[0];
  setUploadedFile(file);
  if (file) {
    handleNext(file);
  }
};

const handleNext = async (file) => {
  //   if (!uploadedFile) {
  //     alert("Please upload a file before proceeding.");
  //     return; // Prevent further execution
  // }
  const requiredFields = [
    title,
    numQuestions,
    description,
    selectedCategory,
    selectedSubCategory,
    percentage,
    selectedComplexity,
    duration,
    timings,
    availablefrom,
 
    quiztotalmarks
];

const isAnyFieldEmpty = requiredFields.some(field => !field);

if (isAnyFieldEmpty) {
    alert("Please fill in all the required fields before proceeding.");
    return; // Prevent further execution
}
const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

if (!authToken) {
  console.error('No authentication token found. Please log in again.');
  return;
}
    try {
      const formData = new FormData();
      formData.append("quiz_title", title);
      formData.append("number_of_questions", numQuestions);
      formData.append("quiz_description", description);
      formData.append("quiz_category_name", selectedCategory);
      formData.append("multi_answer", multiAnswer);
      formData.append("quiz_sub_category_name", selectedSubCategory);
      formData.append("class_name", selectedClass);
      formData.append("pass_percentage", percentage);
      formData.append("quiz_complexity_name", selectedComplexity);
      formData.append("retake_flag", retake);
      formData.append("quiz_duration", duration);
      formData.append("course_name", selectedCourse);
      formData.append("quiz_time_bounded_questions", timings);
      formData.append("quiz_public_access", publicAccess);
      formData.append("available_from", availablefrom);
      formData.append("disabled_on", disabledon);
      formData.append("subject_name", subject);
      formData.append("quiz_total_marks", quiztotalmarks);
      formData.append("file", file);
   
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the auth token in the Authorization header
        },
        body: formData,
      };
  
      const uploadFileWithSimulatedProgress = (url, options) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(options.method, url);
  
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
            } else {
              reject(xhr.statusText);
            }
          };
  
          xhr.onerror = () => reject(xhr.statusText);
  
          Object.keys(options.headers || {}).forEach(key => {
            xhr.setRequestHeader(key, options.headers[key]);
          });
  
          xhr.send(options.body);
  
          // Simulate progress
          let progress = 0;
          const interval = setInterval(() => {
            if (progress < 95) {
              progress += 1;
              setUploadProgress(progress);
            } else {
              clearInterval(interval);
            }
          }, 100); // Update every 100ms
  
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              clearInterval(interval);
              setUploadProgress(100); // Set to 100% on completion
            }
          };
        });
      };
  
      const responseText = await uploadFileWithSimulatedProgress(
        "https://dev.quizifai.com:8010/uploadTextbook/",
        options
      );
  
      const responseData = JSON.parse(responseText);
      console.log(responseData, "data");
      if (responseData.response === "success") {
        if (responseData.data && responseData.data.questions) {
          setQuestions(responseData.data.questions);
            setDocument(responseData.data.document_name);
            setAuthor(responseData.data.author_name);
            setPublisher(responseData.data.publisher_name);
            setReleased(responseData.data.released_date);
            setRevision(responseData.data.revision_year);
            setDocumentType(responseData.data.document_type);
            setNext(true);
        } else {
          setErrorMessage("Questions data is missing from the response.");
        }
      } else {
        if (
          responseData.detail &&
          responseData.detail[0].type === "missing" &&
          responseData.detail[0].loc[1] === "body" &&
          responseData.detail[0].loc[2] === "num_questions"
        ) {
          setErrorMessage("Please provide the number of questions for the quiz.");
        } else {
          setErrorMessage(responseData.detail);
        }
      }
    } catch (error) {
      console.error("Type-Quiz failed:", error);
      setErrorMessage("An error occurred while choosing the type of the quiz");
    }
  };
  

//   const handleNext = async () => {
//   //      if (!uploadedFile) {
//   //     alert("Please upload a file before proceeding.");
//   //     return; // Prevent further execution
//   // }
//   const requiredFields = [
//     title,
//     numQuestions,
//     description,
//     selectedCategory,
//     selectedSubCategory,
//     percentage,
//     selectedComplexity,
//     duration,
//     timings,
//     availablefrom,
//     quiztotalmarks
// ];

// const isAnyFieldEmpty = requiredFields.some(field => !field);

// if (isAnyFieldEmpty) {
//     alert("Please fill in all the required fields before proceeding.");
//     return; // Prevent further execution
// }
//     try {
//       const formData = new FormData();
//       formData.append("quiz_title", title);
//       formData.append("number_of_questions", numQuestions);
//       formData.append("quiz_description", description);
//       formData.append("quiz_category_name", selectedCategory);
//       formData.append("multi_answer", multiAnswer);
//       formData.append("quiz_sub_category_name", selectedSubCategory);
//       formData.append("class_name", selectedClass);
//       formData.append("pass_percentage", percentage);
//       formData.append("quiz_complexity_name", selectedComplexity);
//       formData.append("retake_flag", retake);
//       formData.append("quiz_duration", duration);
//       formData.append("course_name", selectedCourse);
//       formData.append("quiz_time_bounded_questions", timings);
//       formData.append("quiz_public_access", publicAccess);
//       formData.append("available_from", availablefrom);
//       formData.append("disabled_on", disabledon);
//       formData.append("subject_name", subject);
//       formData.append("quiz_total_marks", quiztotalmarks);
//       formData.append("file", uploadedFile); // Assuming you have a ref for file input

//       const response = await fetch(
//         "https://dev.quizifai.com:8010/uploadTextbook/",
//         {
//           method: "POST",
//           body: formData,
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round(
//               (progressEvent.loaded / progressEvent.total) * 100
//             );
//             setUploadProgress(progress);
//           },
//         }
//       );
//       const responseData = await response.json();
//       console.log(responseData, "data");
//       if (responseData.response === "success") {
//         if (responseData.data && responseData.data.questions) {
//           // setShowRegistrationSuccess1(true)
//           setQuestions(responseData.data.questions);
          
//             setDocument(responseData.data.document_name);
//             setAuthor(responseData.data.author_name);
//             setPublisher(responseData.data.publisher_name);
//             setReleased(responseData.data.released_date);
//             setRevision(responseData.data.revision_year);
//             setDocumentType(responseData.data.document_type);
//         } else {
//           setErrorMessage("Questions data is missing from the response.");
//         }

//       // if (response.ok) {
//       //   // Assuming router and state setter are defined properly
//       //   setQuestions(responseData.questions);
//       //   setDocument(responseData.document_name);
//       //   setAuthor(responseData.author_name);
//       //   setPublisher(responseData.publisher_name);
//       //   setReleased(responseData.released_date);
//       //   setRevision(responseData.revision_year);
//       //   setDocumentType(responseData.document_type);
//       } else {
//         if (
//           responseData.detail &&
//           responseData.detail[0].type === "missing" &&
//           responseData.detail[0].loc[1] === "body" &&
//           responseData.detail[0].loc[2] === "num_questions"
//         ) {
//           setErrorMessage(
//             "Please provide the number of questions for the quiz."
//           );
//         } else {
//           setErrorMessage(responseData.detail);
//         }
//       }
//     } catch (error) {
//       console.error("Type-Quiz failed:", error);
//       setErrorMessage("An error occurred while choosing the type of the quiz");
//     }
//   };



  
  const handleNext4 = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

    if (!authToken) {
      console.error('No authentication token found. Please log in again.');
      return;
    }
      const user_id = localStorage.getItem('user_id');

      // Check if user_id is retrieved successfully
      if (!user_id) {
        setErrorMessage("User ID not found. Please log in again.");
        return;
      }
      const response = await fetch(
        `https://dev.quizifai.com:8010/crt_qz_from_txtbook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            quiz_title: title,
            num_questions: numQuestions,
            quiz_description: description,
            quiz_category_name: selectedCategory,
            multi_answer: multiAnswer,
            quiz_sub_category_name: selectedSubCategory,
            class_name: selectedClass,
            pass_percentage: percentage,
            quiz_complexity_name: selectedComplexity,
            retake_flag: retake,
            quiz_duration: duration,
            course_name: selectedCourse,
            quiz_time_bounded_questions: timings,
            quiz_public_access: publicAccess,
            available_from: availablefrom,
            disabled_on: disabledon,
            quiz_total_marks: quiztotalmarks,
            document_name: document,
            author_name: author,
            publisher_name: publisher,
            released_date: released,
            revision_year: revision,
            document_type: document,
            subject_name: subject,
            user_id:user_id,
            questions: questions.map((question) => ({
              question_text: question.question_text,
              lesson:question.lesson,
              sub_heading: question.sub_heading,
              question_weightage: question.question_weightage,
              multi_answer_flag: multiAnswer,
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
        navigate("/quizcreated1", { state: { quizData: responseData } });
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

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
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

  function handleSelect6(event) {
    setSelectedComplexity(event.target.value);
  }

  function handleSelect7(event) {
    const selectedValue = event.target.value.replace("::", "");
    setDuration(selectedValue);
  }

  function handleSelect8(event) {
    setTimings(event.target.value);
  }

  function handleSelect9(event) {
    setMinutes(event.target.value);
  }
  const Back = () => {
    
    navigate("/create-quiz");
  
};

const handleDeleteQuestion = (questionIndex) => {
  setQuestions(prevQuestions =>
    prevQuestions.filter((_, index) => index !== questionIndex)
  );
};
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
  // setIsAllSelected(false);
};
const handleSimplequestions = (event) => {
  setSimplequestions(event.target.value);
};
const handleModeratequestions = (event) => {
  setModeratequestions(event.target.value);
};
const handleComplexquestions = (event) => {
  setComplexquestions(event.target.value);
};
  return (
    
    <>
    <div className="flex flex-row w-full bg-[#f5f5f5] ">
     
<div className="w-full">

{!showRegistrationSuccess && (
  <main className="container mx-auto mt-5">
 
   {/* <div className="bg-[#eedbe5] rounded-[10px] p-4 mb-8 ">
      <h1 className="font-Poppins font-normal text-[20px] text-[#214082]">
        Finalize the configuration and click 'Next' to proceed with adding your quiz questions.
      </h1>
    </div> */}
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
      </div>
      <div className="flex flex-col  w-full">
        {/* Title and Version */}
        <div className="flex items-center gap-[3px]">
          <h2 className="text-lg font-semibold text-[#00008b]">
          {title || "Enter the Title"}
          </h2>
          {/* <span className="text-xs text-red-500">v1.0</span> */}
        </div>

        {/* Description */}
        <p className="text-[#00008b] w-[80%] line-clamp-2 text-sm mt-1">
        {description || "Enter the Description"}
        </p>

        {/* Meta Information */}
        <div className="text-[#00008b] text-sm flex flex-wrap mt-2">
          <span>{selectedCategory}</span>
          <span className="mx-1">.</span>
          <span>{selectedSubCategory}</span>
          <span className="mx-1">.</span>
          <span>{selectedCourse} . {selectedClass}</span>
          <span className="mx-1">.</span>
          <span>{selectedComplexity}</span>
        </div>

        {/* Icons Row */}
        <div className=" flex-col items-center space-y-2  mt-2 text-[#00008b]">
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

              <span className="ml-1 text-sm">{availablefrom}</span>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {/* <i className="fas fa-question-circle"></i> */}
              <img src={comment}  className=" w-[18px] h-[18px] mr-1"/>

              <span className="ml-1 text-sm">{numQuestions} Questions</span>
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
    {step === 1 && (
         <>
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
              <label className=" w-[23%] text-blue-800 font-semibold mb-2 mr-[10px]">
               Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
                 rows="4" 
                cols="50"
                required
                value={instructions}
                onChange={(e) => setininstructions(e.target.value)}
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
                {sortedCategories.map((category) => (
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
              <label className="w-[23%] text-blue-800 font-semibold mb-2">
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
      {courses.map((course) => (
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
<label className="w-[100%] text-blue-800 font-semibold mb-2 mr-[10px] ">  Public access <span className="text-red-500">*</span></label>
<Switch
onChange={toggler3}
checked={publicAccess}
className="react-switch"
/>

</div>

</div>
</div>
</div>
          {/* <div className="flex justify-start md:col-span-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
            >
              Back
            </button>
          </div> */}
           <div className="flex justify-end md:col-span-2">
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
        <h1 className=" font-semibold text-[20px] text-[#214082]">Quiz Metrics</h1>
      </div>

      {/* Number of Questions */}
     
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2  ">Number of Questions<span className="text-red-500">*</span></label>
        <input
          className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          type="number"
          required
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
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
                  onChange={(e) => setquiztotalmarks(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
     
      {/* Complexity */}
      <div className="flex flex-col">
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
        {/* <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={selectedComplexity}
          onChange={handleSelectComplexity}
        >
          <option value="" disabled>Complex</option>
          {complexities.map((complexity, index) => (
            <option key={index} value={complexity}>
              {complexity}
            </option>
          ))}
        </select> */}
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
       {/* Pass Percentage */}
      
 <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2">Pass Percentage<span className="text-red-500">*</span></label>
   
        <select
         className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={percentage}
          onChange={handleSelect5}
        >
          {options5.map((option) => (
            <option key={option.value} value={option.value}>
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
                  className={ ` w-[80%]  border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={selectedComplexity}
          onChange={handleSelectComplexity}
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
          onChange={handleSelectComplexity}
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
          onChange={handleSelectComplexity}
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
       {/* Complexity */}
       <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[65%] text-blue-800 font-semibold mb-2">Complexity<span className="text-red-500">*</span></label>
        
        <select
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
          value={selectedComplexity}
          onChange={handleSelectComplexity}
        >
          <option value="" disabled>Complex</option>
          {complexities.map((complexity, index) => (
            <option key={index} value={complexity}>
              {complexity}
            </option>
          ))}
        </select>
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
          Retake Option <span className="text-red-500">*</span>
        </label>
        <Switch
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
        <h1 className=" font-semibold text-[20px] text-[#214082]">AI Inputs</h1>
      </div>
     
     

 
    {/*  subject name*/}
    <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[63%] text-blue-800 font-semibold mb-2">Subject Name<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Subject Name"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {/*  document name*/}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2">Document Name<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Document Name"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
{/*  author name*/}
<div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[63%] text-blue-800 font-semibold mb-2">Author Name<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Author Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {/*  publisher name*/}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2"> Publisher Name<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Publisher Name"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {/* released date*/}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[63%] text-blue-800 font-semibold mb-2">Released Date<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Released Name"
                  value={released}
                  onChange={(e) => setReleased(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {/* revision year*/}
      <div className="flex flex-col">
        <div className="w-full flex flex-row">
        <label className="w-[59%] text-blue-800 font-semibold mb-2">Revision Year<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Revision Name"
                  value={revision}
                  onChange={(e) => setRevision(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>
      {/*document type*/}
      <div className="flex flex-col ">
        <div className="w-full flex flex-row">
        <label className="w-[63%] text-blue-800 font-semibold mb-2">Document Type<span className="text-red-500">*</span></label>
      
     <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Document Type"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                ></input>
        </div>
      
        <hr className={`h-[1px] w-full`} />
      </div>


  {/* Multiple Answers */}
  <div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[75px]">
        Multiple Answers <span className="text-red-500">*</span>
        </label>
        <Switch
          onChange={toggler1}
          checked={multiAnswer}
          className="react-switch"
        />
        
      </div>
     
 {/* Multiple Answers */}
 <div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[76px]">
        Learning Material <span className="text-red-500">*</span>
        </label>
        <Switch
          onChange={toggler1}
          checked={multiAnswer}
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
          <main className="w-max-auto">
              <div className="flex flex-col items-center justify-center mt-10">
                <div className=" p-2 border-[1px] bg-white flex flex-col justify-center">
                  <div className="flex">
                    <img className="w-[24px] h-[24px] ml-4 -rotate-90" src={Next}/>
               
                <label
        htmlFor="fileInput"
        className="font-Poppins font-medium text-[15px] leading-[22.5px] flex items-center px-4 py-2 text-white cursor-pointer"
      >
        <div className="relative group">
          <span className="block truncate  text-black">
          Drag and Drop a file here or <span className="text-[#3B61C8]">click to browse</span>
          </span>
         
        </div>
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {/* <img
          className="w-[24px] h-[24px] ml-4 -rotate-90"
          src={Next}
          alt="Next"
        />
        <img
          className="w-[20.48px] h-[24.96px] ml-1"
          src={PDF}
          alt="PDF"
        /> */}
      </label>
                  </div>
                  <div>

                <h1 className="flex justify-center">up to 512MB per file</h1>
                  </div>
                </div>
               
    {/* <div className=" w-[150.68px] h-[37.09px] rounded-[10px] bg-[#1E4DE9]"> */}
      {/* <label
        htmlFor="fileInput"
        className="font-Poppins font-medium text-[15px] leading-[22.5px] flex items-center px-4 py-2 text-white cursor-pointer"
      >
        {/* <div className="relative group">
          <span className="block truncate max-w-[60px]">
            {uploadedFile ? uploadedFile.name : 'Select'}
          </span>
          {uploadedFile && (
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {uploadedFile.name}
            </span>
          )}
        </div> */}
        {/* <input
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
      </label>  */}

      {/* <button
        className="w-[98px] h-[32px] font-Poppins text-[#214082] font-medium text-[15px] leading-[20px] rounded-[10px] bg-[#1E4DE9] text-white mt-9 ml-5"
        onClick={handleNext}
      >
        Submit
      </button> */}
      <div className=" w-[137.09px] h-[9.05px]">
        <Line percent={uploadProgress} strokeWidth={5} strokeColor="#B1FB9B" />
        <h1 className="font-Poppins text-[#214082] font-normal text-[10px] leading-[15px]  mt-1 ml-8">
          {`Uploading ${uploadProgress}%`}
        </h1>
      </div>
    {/* </div> */}
    <div className="flex justify-center items-center mt-10">

   
{errorMessage && <p className=" flex text-red-500">{errorMessage}</p> }
</div>
    </div>
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
           <RiDeleteBinLine className=" text-orange-500 w-[20px] h-[20px] ml-[-5px]"  /> <span className=" text-[#214082]">Delete</span>
        </button>
      )}
      </div>
  
      </div>
      {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-8 ">
                  {/* Input field for question */}
                  <div className="flex items-center mb-4">
                  <input
    className="ml-[-20px] mr-[5px] mt-1 flex justify-center text-center"
            type="checkbox"
            checked={selectedQuestions.includes(questionIndex)}
            onChange={() => toggleQuestionSelection(questionIndex)}
          />
                    <div className="mr-2 text-xl font-bold text-[#214082]">
                      {questionIndex + 1}.
                    </div>
                    <input
                      type="text"
                      placeholder={`Question`}
                      className="w-[70%] h-[40px] font-bold text-[#214082] rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] p-[10px] text-[14px]"
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
                  
                  <RiDeleteBinLine onClick={() => {
          const newQuestions = questions.filter((_, index) => index !== questionIndex);
          setQuestions(newQuestions);
        }}  
        className="w-[25px] h-[25px] text-orange-500"
/>
                    {/* <input
  type="number"
  placeholder="Duration"
  className="w-[130px] h-[37px] rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal"
  value={question.question_duration}
  onChange={(e) => {
    const value = parseInt(e.target.value); // Parse input value to integer
    if (!isNaN(value)) { // Check if value is a valid number
      const updatedQuestions = questions.map((q, index) => {
        if (index === questionIndex) {
          return { ...q, question_duration: value };
        }
        return q;
      });
      setQuestions(updatedQuestions);
    }
  }}
/> */}
                  </div>
                  {/* Input fields for options */}
                  {getOptions(question.options).map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <div className="mr-2 text-xl font-normal" style={{
                  width: '40px',
                  marginRight: '10px',
                  padding: '5px',
                  textAlign: 'center' ,
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                  justifycontent: 'center',
                  display: 'flex',
                  alignitems: 'center',
                 justifyContent:"center",
                 fontSize:"14px"
                }}>
                 {String.fromCharCode(97 + optionIndex).toUpperCase()}
                </div>
                <input
                  type="text"
                  placeholder="Option Text"
                  className="w-[836px]  rounded-[5px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal text-[12px]"
                  value={option.answer_option_text}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                />
                <button
                  className={`mr-2 ${option.correct_answer_flag ? "bg-green-500" : "bg-gray-300"} rounded-full w-10 h-[20px] transition-colors duration-300 focus:outline-none`}
                  onClick={() => handleToggleButton(questionIndex, optionIndex)}
                >
                  <span
                    className={`block ${option.correct_answer_flag ? "translate-x-5" : "translate-x-0"} transform -translate-y-1.5 w-[18px] h-[18px] relative top-[6px] bg-white rounded-full shadow-md transition-transform duration-300`}
                  ></span>
                </button>
              </div>
            ))}
                </div>
              ))}
              <div className=" flex justify-between items-center py-5 ">
                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={() => setStep(3)}
                >
                  Save as Driaft
                </button>

                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={handleNextpage3}
                >
                  next
                </button>
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
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6 bg-white ">
    
    <div className="md:col-span-2">
        <h1 className=" font-semibold text-[20px] text-[#214082]">Assign Quizzes</h1>
      </div>
     
      <div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[40%] text-blue-800 font-semibold mb-2 ">
      Oragnization<span className="text-red-500">*</span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="Oragnization"
                  // value={quiztotalmarks}
                  // onChange={(e) => setquiztotalmarks(e.target.value)}
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div>
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[40%] text-blue-800 font-semibold mb-2 ">
      School<span className="text-red-500">*</span>
    </label>
    <input
                             className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}

                  placeholder="School"
                  // value={quiztotalmarks}
                  // onChange={(e) => setquiztotalmarks(e.target.value)}
                ></input>
  </div>
  <hr className="h-[1px] w-full" />
</div>
<div className="flex flex-col w-full">
  <div className="w-full flex flex-row">
    <label className="w-[40%] text-blue-800 font-semibold mb-2 ">
      Deparment<span className="text-red-500">*</span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      value={selectedCourse}
      onChange={handleSelectCourse}
    >
      <option value="" disabled>Select a Deparment</option>
      <option value="">None</option>
      {courses.map((course) => (
        <option key={course.course_id} value={course.course_name}>
          {course.course_name}
        </option>
      ))}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>
<div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className="w-[40%] text-blue-800 font-semibold mb-2 ">
      Class<span className="text-red-500">*</span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      value={selectedCourse}
      onChange={handleSelectCourse}
    >
      <option value="" disabled>Select a Class</option>
      <option value="">None</option>
      {courses.map((course) => (
        <option key={course.course_id} value={course.course_name}>
          {course.course_name}
        </option>
      ))}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>



{/* Multiple Answers */}
<div className="flex items-center">
        <label className="font-Poppins text-[#214082] font-medium text-[15px] mr-[72px]">
        Email Alert <span className="text-red-500">*</span>
        </label>
        <Switch
          onChange={toggler1}
          checked={multiAnswer}
          className="react-switch"
        />
        
      </div>

{/* Section */}
<div className="w-full flex flex-col">
  <div className="w-full flex flex-row">
    <label className=" w-[40%] text-blue-800 font-semibold mb-2">
    Section<span className="text-red-500">*</span>
    </label>
    <select
      className="w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none"
      value={selectedClass}
      onChange={handleSelectClass}
      disabled={classes.length === 0}
    >
      <option value="" disabled>Select a Section</option>
      {classes.map((className, index) => (
        <option key={index} value={className}>
          {className}
        </option>
      ))}
    </select>
  </div>
  <hr className="h-[1px] w-full" />
</div>


    </div>
  
    <div className="flex justify-between md:col-span-2 py-5">
            <button
              onClick={() => setStep(4)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Back
            </button>
            <button
              onClick={handleNextpage4}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Next
            </button>
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
     
     


  {/* Multiple Answers */}
  <button
           
              className="px-[40px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Print
            </button>
     
 {/* Multiple Answers */}
 <button
              className="px-[40px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Save
            </button>
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
 </main>
)}
      </div>

</div>
    </>
  );
};
