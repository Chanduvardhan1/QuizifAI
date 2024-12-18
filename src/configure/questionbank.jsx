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
import close from "../../src/assets/Images/images/dashboard/cancel.png"


const data = [
    { id: 1, subject: 'Math', description: 'This question bank is for 2020 graduating batch.', createdBy: 'Chandu vardhan k', createdOn: '06/02/2020', numQuestions: 24 },
    { id: 2, subject: 'Physics', description: 'This question bank is for 2021 graduating batch.', createdBy: 'Ravi Kumar', createdOn: '12/05/2021', numQuestions: 30 },
    { id: 3, subject: 'Chemistry', description: 'This question bank is for 2019 graduating batch.', createdBy: 'Priya S', createdOn: '08/10/2019', numQuestions: 18 },
    { id: 4, subject: 'Biology', description: 'This question bank is for 2022 graduating batch.', createdBy: 'Naveen K', createdOn: '15/08/2022', numQuestions: 22 },
    { id: 5, subject: 'Computer Science', description: 'This question bank is for 2023 graduating batch.', createdBy: 'Sandeep R', createdOn: '02/11/2023', numQuestions: 28 },
    { id: 6, subject: 'English', description: 'This question bank is for 2020 graduating batch.', createdBy: 'Lina J', createdOn: '04/04/2020', numQuestions: 20 }
  ];

const questionbank = () => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/configure")
  };

  
  return (
    <>
    <div className='flex w-full '>
    <Navigation/> 
   <div>
   <div className='p-4'>
   <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
         <h1 className=' text-[18px]  font-semibold text-[#00008b]'>Questions Banks</h1>
     </div>
   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((item) => (
       
        <div
          key={item.id}
          className="max-w-sm max-h-[200px] mx-auto bg-white  rounded-lg overflow-hidden border border-gray-500"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="">
              <h3 className="text-md font-semibold text-[#00008b]">
              Question Bank ID : <span>{item.id}</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <img src={question} alt="" className="w-[18px] h-[18px]" />
              <img src={editicon} alt="" className="w-[18px] h-[18px]" />
              <img src={delete1} alt="" className="w-[18px] h-[18px]" />
            </div>
          </div>

          {/* Description */}
          <div className="px-4 py-2">
            <p className="text-[16px] font-semibold text-gray-600">{item.subject}</p>
            <p className="text-sm text-gray-600">
             {item.description}
            </p>
            {/* <strong className="text-[#00008b]">Description:</strong>  */}
          </div>

          {/* Footer Section */}
          <div className="px-4 py-2 border-gray-200">
            <div className="flex justify-between gap-[5px] text-sm text-gray-600">
              <div>
                <p>
                  <strong className="text-[#00008b]">Created By:</strong>
                </p>
                <p>{item.createdBy}</p>
              </div>
              <div>
                <p>
                  <strong className="text-[#00008b]">Created on:</strong>
                </p>
                <p>{item.createdOn}</p>
              </div>
              <div>
                <p>
                  <strong className="text-[#00008b]">No. of Questions:</strong>
                </p>
                <p>{item.numQuestions}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
    </>
    
    

    
  )
}

export default questionbank