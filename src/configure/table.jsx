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
import close from "../../src/assets/Images/images/dashboard/cancel.png"

const table = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryFlag, setParentCategoryFlag] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [courseShortName, setCourseShortName] = useState('');
  const [CourseId, setCourseId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [classId, setClassId] = useState('');
  const userId = localStorage.getItem("user_id");
  const [specializationName, setSpecializationName] = useState('');
  const [specializationShortName, setSpecializationShortName] = useState('');
  const [specializationId, setSpecializationId] = useState('');


  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/configure');
  }
  const handleBack = () => {
    navigate("/configure")
  };
  


  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='w-full p-5'>

  

    {/* <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50"> */}
      <div className="bg-white shadow-lg rounded-md  md:w-1/2">
      <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg border-spacing-y-2">
              <thead className="bg-[#CBF2FB]">
                <tr className="text-[14px]">
                  <th className="py-2 px-4 border-b">Seq</th>
                  <th className="py-2 px-4 border-b text-start">Date</th>
                  <th className="py-2 px-4 border-b">Time</th>
                  <th className="py-2 px-4 border-b text-start">Quiz Title</th>
                  <th className="py-2 px-4 border-b text-start">Duration</th>
                  <th className="py-2 px-4 border-b">Rank</th>
                  <th className="py-2 px-4 border-b text-nowrap">Pass %</th>
                  <th className="py-2 px-4 border-b">Grade</th>
                  <th className="py-2 px-4 border-b">Pass/Fail</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {currentRows.map((quiz, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-100 active:bg-green-200 text-[12px]"
                     >
                    <td className="py-2 px-4 border-b text-center">
                      {indexOfFirstRow + index + 1}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-2 border-b text-center text-nowrap"
                    >
                      {quiz.month}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center text-nowrap"
                    >
                      {quiz.time}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-start"
                    >
                      {quiz.quiz_name}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-left text-nowrap"
                    >
                      {quiz.attempt_duration_mins}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.score_rank}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.attained_percentage}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.quiz_grade}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.pass_flag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  

      
      {/* </div> */}
    </div>









     
 

    
     
    </div>
    </div>
    </>
    
    

    
  )
}

export default table