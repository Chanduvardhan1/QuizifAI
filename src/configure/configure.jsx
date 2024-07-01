import React from 'react'
import { useNavigate } from "react-router-dom";
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { useState } from 'react';
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import cancel from "../assets/Images/images/dashboard/cancel.png";



const configure = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
  };

  const handleBanckToDashbaord = () =>{
    navigate('/dashboard');
  }

  const handleCategoriesClick = () => {
    navigate('/dashboard'); // Navigate to dashboard when Categories is clicked
  };

  const items = [
      { id: 1, title: 'Configuration', content: 'Categories, Courses' },
      { id: 2, title: 'Organization', content: 'Profile, Manage Subscription, Performance Metrics, Marketing and Sales, Financial Information, Mission and Vision, Goals and Objectives' },
      { id: 3, title: 'Notification', content: 'Contact Information, Target Audience, Date and Time, Main Content, Additional Information' },
      { id: 4, title: 'User & Roles', content: 'User Information, Roles and Permissions, Training and Development, Communication, Security and Compliance, Responsibilities and Expectations' },
      { id: 5, title: 'Developer & Data', content: 'Developer Information, Data Information, Access and Permissions, Tools and Resources, Project Management' },
      { id: 6, title: 'Preferences', content: 'User Information, Preference Categories, Default Settings, Default Settings, Application-Specific Preferences, Subscription Preferences, Feedback and Support Preferences' },
  ];
  
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
);

  const highlightText = (text, query) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, 'gi'));
      return (
          <span>
              {parts.map((part, index) =>
                  part.toLowerCase() === query.toLowerCase() ? (
                      <span key={index} style={{ backgroundColor: 'lightblue' }}>{part}</span>
                  ) : (
                      part
                  )
              )}
          </span>
      );
  };

  return (
    <div className='flex font-Poppins'>
    <Navigation />
    <div className='flex-1 flex flex-col bg-[#F5F5F5]'>
        <div className='flex bg-white h-[50px]'>
        
            <h1 className='mt-[10px] ml-[20px] font-Poppins font-semibold text-[#214082] text-[16px]'>All Settings</h1>
            <img
                className='h-[12px] w-[12px] ml-[210px] relative left-[25px] top-5'
                src={searchIcon}
                alt="Search Icon"
            />
            <input
                className='text-[10px] mt-[10px] px-[20px] h-[30px] w-fit bg-[#F5F5F5] justify-center text-center placeholder-[#214082] border-none'
                type='text'
                placeholder='Enter Your Settings'
                value={searchQuery}
                onChange={handleInputChange}
            />
            <div className='flex gap-1 h-[30px] p-2 ml-auto mr-[2%] mt-[1%] rounded'>
                {/* <h1 className='text-[10px]'>Cancel settings</h1> */}
                <img onClick={handleBanckToDashbaord} className='h-3 w-3 cursor-pointer mt-[1px]' src={cancel}/> 
            </div>
        </div>
        <div className='flex flex-wrap gap-[20px] mt-[60px] ml-[15px] mr-[10px] justify-center'>
            {filteredItems.map(item => (
                <div
                    key={item.id}
                    className='h-[300px] w-[220px] bg-white rounded-md shadow-xl transition-all duration-300 scale-95 hover:scale-100 flex-none'
                >
                    <h1 className='text-[12px] font-semibold text-[#EF5130] underline underline-offset-4 cursor-pointer hover:no-underline text-center pt-2'
                    >
                        {highlightText(item.title, searchQuery)}
                    </h1>
                    {item.content.split(', ').map((contentItem, index) => (
                        <p key={index} 
                        className='mt-3 text-[10px] ml-[20px] text-[#3340AF] font-semibold'
                        onClick={contentItem === 'Categories' ? handleCategoriesClick : null}
                        >
                            {highlightText(contentItem, searchQuery)}
                        </p>
                    ))}
                </div>
            ))}
        </div>
        
    </div>
    <LogoutBar />
</div>
  )
}

export default configure