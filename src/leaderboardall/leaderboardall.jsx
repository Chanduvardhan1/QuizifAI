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
import Institution from './institution.jsx';
import Statusreport from './statusreport.jsx';
import Global from './global.jsx';
const leaderboardall = () => {
  
 
// Tab changes //
const [activeTab, setActiveTab] = useState('Global');

const handleTabClick = (tab) => {
  setActiveTab(tab);
};
// Tab changes end //

  return (
    <>
    <div className='flex w-full '>
    <Navigation/> 
   <div className='w-full p-5'>
    <div>
        <h1 className='flex font-bold justify-center text-[25px] text-[#214082]'>Leaderboard</h1>
    </div>
   <div className="flex w-full bg-[#F3D0D5]  gap-4 mb-1  px-2 p-2 font-semibold rounded-lg">
      {/* <button
        onClick={() => handleTabClick('Global')}
        className={`w-full px-4 py-2 mr-4 ${
          activeTab === 'Global' ? 'bg-gray-100 text-[#214082] rounded-t-lg' : ' text-[#214082] bg-[#c1e7e3] rounded-lg'
        }`}
       
         
       
      >
      Institution
      </button> */}
      <button
        onClick={() => handleTabClick('Global')}
       
      

        className={`w-full px-4 py-2 mr-4 ${
          activeTab === 'Global' ? 'bg-gray-100 text-[#214082] rounded-t-lg' : ' text-[#214082] bg-[#c1e7e3] rounded-lg'
        }`}
      >
       Global
      </button>
      <button
      
        onClick={() => handleTabClick('Status')}
        className={`w-full px-4 py-2 mr-4 ${
          activeTab === 'Status' ? 'bg-gray-100 text-[#214082] rounded-t-lg' : '  bg-[#ffe5d9] rounded-lg  text-[#214082] '
       
        }`}
      >
      Status Report
      </button>
    
    </div>
    {activeTab === 'Global' &&(
 <div>
 <Global/>
</div>
    )}
       {activeTab === 'Status' &&(

   <div>
    <Statusreport/>
   </div>
       )}

    </div>
    </div>
    </>
    
    

    
  )
}

export default leaderboardall