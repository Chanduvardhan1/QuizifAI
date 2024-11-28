import React, { useEffect } from 'react'
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from 'react';
import Switch from "react-switch";
import { useNavigate } from 'react-router-dom';
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png"
import Delete from "../../src/assets/Images/Assets/Delete.png"
import Line from "../../src/assets/Images/Assets/Line.png"
import { RiDeleteBinLine } from "react-icons/ri";
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import camera1 from "../../src/assets/Images/dashboard/edit.png"
import editicon from "../../src/assets/Images/quiz-type/edit.png"
import question from "../../src/assets/Images/images/questions/eye.png"
import delete1 from "../../src/assets/Images/images/questions/delete (1).png"


const data = [
    { id: 1, subject: 'Math', description: 'This question bank is for 2020 graduating batch.', createdBy: 'Chandu vardhan k', createdOn: '06/02/2020', numQuestions: 24 },
    { id: 2, subject: 'Physics', description: 'This question bank is for 2021 graduating batch.', createdBy: 'Ravi Kumar', createdOn: '12/05/2021', numQuestions: 30 },
    { id: 3, subject: 'Chemistry', description: 'This question bank is for 2019 graduating batch.', createdBy: 'Priya S', createdOn: '08/10/2019', numQuestions: 18 },
    { id: 4, subject: 'Biology', description: 'This question bank is for 2022 graduating batch.', createdBy: 'Naveen K', createdOn: '15/08/2022', numQuestions: 22 },
    { id: 5, subject: 'Computer Science', description: 'This question bank is for 2023 graduating batch.', createdBy: 'Sandeep R', createdOn: '02/11/2023', numQuestions: 28 },
    { id: 6, subject: 'English', description: 'This question bank is for 2020 graduating batch.', createdBy: 'Lina J', createdOn: '04/04/2020', numQuestions: 20 }
  ];

const questionbankview = () => {
    const questions = [
        {
          id: 1,
          question: "What is the primary purpose of the `useState` hook in React?",
          options: [
            "To manage global state",
            "To manage local component state",
            "To fetch data from APIs",
            "To apply styles dynamically",
          ],
          correctAnswer: "To manage local component state",
        },
        {
          id: 2,
          question: "Which utility class in Tailwind CSS is used to apply padding to all sides?",
          options: ["p-4", "m-4", "pl-4", "pt-4"],
          correctAnswer: "p-4",
        },
      ];
     
      const [answers, setAnswers] = useState({});
      const [submitted, setSubmitted] = useState(false);
    
      const handleOptionChange = (questionId, value) => {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: value,
        }));
      };
    
      const handleInputChange = (questionId, value) => {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: value,
        }));
      };
    
      const handleSubmit = () => {
        setSubmitted(true);
      };

    const [showDiv, setShowDiv] = useState(false);

    const handleToggleClick = () => {
        setShowDiv((prevState) => !prevState); // Toggle the visibility
      };

      const questions1 = [
        {
          id: 1,
          beforeBlank: "React is a",
          afterBlank: "library for building user interfaces.",
          correctAnswer: "JavaScript",
        },
        {
          id: 2,
          beforeBlank: "Tailwind CSS is a",
          afterBlank: "CSS framework.",
          correctAnswer: "utility-first",
        },
        {
          id: 3,
          beforeBlank: "The",
          afterBlank: "hook is used to handle side effects in React.",
          correctAnswer: "useEffect",
        },
      ];
    
      const [answers1, setAnswers1] = useState({});
      const [submitted1, setSubmitted1] = useState(false);
    
      const handleInputChange1 = (questionId, value) => {
        setAnswers1((prev) => ({
          ...prev,
          [questionId]: value,
        }));
      };
    
      const handleSubmit1 = () => {
        setSubmitted1(true);
      };


      const [questionType, setQuestionType] = useState("");
      const [questionLevel, setQuestionLevel] = useState("");
      const [selectedChapter, setSelectedChapter] = useState("");

      const [showForm, setShowForm] = useState(false);
      const [question, setQuestion] = useState("");
      const [options, setOptions] = useState(["", "", "", ""]);
      const [answer, setAnswer] = useState("");

      const handleGoClick = () => {
        if (questionType && questionLevel && selectedChapter) {

          setShowForm(true);
        } else {
            alert("Please fill out all fields before proceeding.");
        }
      };
    
      const handleOptionChange1 = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
      };
    
      const handleCreateClick = () => {
        console.log({
          questionType,
          questionLevel,
          selectedChapter,
          question,
          options,
          answer,
        });
        alert("Question created successfully!");
        // Clear inputs
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
        setShowForm(false);
      };
    
    


  return (
    <>
    <div className='flex w-full '>
    <Navigation/> 
   <div className='w-full'>
   <div className='p-4'>
    <div className='w-full flex flex-col justify-end items-end text-left'>
        <div>
        <h1 className=' flex items-end text-[16px]  font-semibold text-[#00008b]'>Subject : <span className=' text-gray-200 ml-1'>Mathematics</span></h1>
    <h1 className=' flex   items-end text-[16px]  font-semibold text-[#00008b]'>Total No.of Questions : <span className=' text-gray-200 ml-1'>24</span></h1>

        </div>
   
    </div>
    <div>
        <div>
            <h1 className=' text-[#00008b] underline'>Filter:</h1>
        </div>
        <div className='flex gap-5 mb-2'>
        <select
                  className="w-full border border-[1px]  "

        >
          <option value="Chapter" disabled>Chapter</option>
          <option value="Chapter" disabled>Chapter</option>

        </select>   
        <select
                  className="w-full border border-[1px]  "

        >
          <option value="Chapter" disabled>Chapter</option>
          <option value="Chapter" disabled>Chapter</option>

        </select> 
        <button className=' bg-blue-300 px-4 p-2 rounded-lg'>
            searchs
        </button>
        <button  onClick={handleToggleClick} className=' bg-blue-300 px-4 p-2 rounded-lg'>
        {showDiv ? "Close" : "Add"}

        </button>
        </div>
        {showDiv && (
        <div className='flex gap-5'>
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2">Question Type</label>
        <select
                  className="w-full border-[1px]  "
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
        >
               <option value="" disabled>
              Select
            </option>
            <option value="MCQ">MCQ</option>
            <option value="Fill the blank">Fill the blank</option>
            <option value="True/false">True/false</option>
        
        </select>  
     
        </div>
     
        <div className="w-full flex flex-row">
        <label className="w-[50%] text-blue-800 font-semibold mb-2">Question Level<span className="text-red-500">*</span></label>
        <select
                  className="w-full border-[1px]  "
                  value={questionLevel}
                  onChange={(e) => setQuestionLevel(e.target.value)}
        >
  <option value="M">Medium</option>
  <option value="L">Low</option>

        </select> 
     
        </div>

      
        <select
            className="w-full border-[1px]"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Chapter V">Chapter V</option>
            <option value="Chapter VI">Chapter VI</option>
          </select>
        <button   onClick={handleGoClick} className=' bg-blue-300 px-4 p-2 rounded-lg'>
            Go
        </button>
        </div>
        )}
    </div>
    <div className='flex w-full'>
        <div className='w-full'>

      
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">MCQS Questions :</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-6 border-b border-gray-300 pb-4">
          <h2 className="text-lg font-medium mb-2">{q.id}. {q.question}</h2>
          <div className="mb-4">
            {q.options.map((option, index) => (
              <label key={index} className="block mb-2">
                {/* <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={(e) => handleOptionChange(q.id, e.target.value)}
                  className="mr-2"
                /> */}
                 <input
              type="text"
           value={option}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your answer here"
            />
             
              </label>
            ))}
          </div>
          {/* <div>
            <label htmlFor={`custom-answer-${q.id}`} className="block mb-1">
              Or type your answer:
            </label>
            <input
              type="text"
              id={`custom-answer-${q.id}`}
              value={answers[q.id] || ""}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your answer here"
            />
          </div> */}
          {/* {submitted && (
            <p
              className={`mt-2 ${
                answers[q.id]?.trim() === q.correctAnswer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {answers[q.id]?.trim() === q.correctAnswer
                ? "Correct!"
                : `Incorrect. Correct answer: ${q.correctAnswer}`}
            </p>
          )} */}
        </div>
      ))}
      {/* <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
      >
        Submit
      </button> */}
    </div>


    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Fill in the Blanks Quiz</h1>
      {questions1.map((q) => (
        <div key={q.id} className="mb-2  border-gray-300 pb-4">
          <p className="text-lg mb-3">
          {q.id}. {q.beforeBlank}{" "}
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleInputChange(q.id, e.target.value)}
              className="border-transparent border-b-2 border-gray-400 hover:border-blue-200 focus:outline-none"
              placeholder="Your answer"
            />{" "}
            {q.afterBlank}
          </p>
          {submitted && (
            <p
              className={`mt-2 ${
                answers[q.id]?.trim().toLowerCase() ===
                q.correctAnswer.toLowerCase()
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {answers[q.id]?.trim().toLowerCase() ===
              q.correctAnswer.toLowerCase()
                ? "Correct!"
                : `Incorrect. Correct answer: ${q.correctAnswer}`}
            </p>
          )}
        </div>
      ))}
      {/* <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
      >
        Submit
      </button> */}
    </div>
    </div>
    {showForm && (
        <div className="border p-6 rounded-l w-full h-[470px]">
          <h2 className="text-lg font-bold mb-4">Create Question</h2>
          <div className="mb-4">
            <label className="block text-blue-800 font-semibold mb-2">
              Question
            </label>
            <input
              type="text"
              className="w-full border-[1px] rounded p-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />
          </div>
          {questionType === "MCQ" && (
          <div>
            <label className="block text-blue-800 font-semibold mb-2">
              Options
            </label>
            {["A", "B", "C", "D"].map((label, index) => (
              <div key={index} className="mb-2 flex items-center gap-2">
                <span className="font-semibold text-gray-800">{label}.</span>
                <input
                  type="text"
                  className="w-full border-[1px] rounded p-2"
                  value={options[index]}
                  onChange={(e) => handleOptionChange1(index, e.target.value)}
                  placeholder={`Option ${label}`}
                />
              </div>
            ))}
          </div>
          )}
           {questionType === "Fill the blank" && (
            <div>
              <label className="block text-blue-800 font-semibold mb-2">
                Answer
              </label>
              <input
                type="text"
                className="w-full border border-[1px] rounded p-2"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter the answer"
              />
            </div>
          )}
          <button
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg"
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>
      )}
    </div>
     </div>
   
    </div>
    </div>
    </>
    
    

    
  )
}

export default questionbankview