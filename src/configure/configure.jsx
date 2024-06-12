import React from 'react'
import { useNavigate } from "react-router-dom";
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { useState } from 'react';
import searchIcon from "../assets/Images/images/dashboard/Search.png";



const configure = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
  };

  const items = [
      { id: 1, title: 'Organization', content: 'Categories, Courses' },
      { id: 2, title: 'Configuration', content: '' },
      { id: 3, title: 'Notification', content: '' },
      { id: 4, title: 'User & Roles', content: 'Categories, Courses' },
      { id: 5, title: 'Subscription', content: '' },
      { id: 6, title: 'Preferences', content: '' },
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

    const navigate = useNavigate();
    const navigatetocategory = () =>{
     navigate('/category');   
    }
  return (
    <div className='flex font-Poppins'>
    <Navigation />
    <div className='flex-1 flex mt-[20px] flex-col'>
        <div className='flex'>
            <h1 className='mt-[10px] ml-[20px] font-Poppins font-semibold text-[#214082] text-[18px]'>All Settings</h1>
            <img
                className='h-[12px] w-[12px] ml-[160px] relative left-[25px] top-5'
                src={searchIcon}
                alt="Search Icon"
            />
            <input
                className='text-[10px] text-[#5E81F4] mt-[10px] px-[20px] h-[30px] w-fit bg-[#F5F5F5] justify-center text-center placeholder-[#5E81F4] border-none'
                type='text'
                placeholder='Enter Your Settings'
                value={searchQuery}
                onChange={handleInputChange}
            />
        </div>
        <div className='flex flex-wrap gap-[20px] mt-[60px] ml-[15px] mr-[10px] justify-center'>
            {filteredItems.map(item => (
                <div
                    key={item.id}
                    className='h-[300px] w-[200px] bg-[#F5F5F5] rounded-md shadow-xl transition-all duration-300 scale-95 hover:scale-100 flex-none'
                >
                    <h1 className='text-[12px] text-[#214082] underline underline-offset-4 cursor-pointer font-medium hover:no-underline text-center pt-2'>
                        {highlightText(item.title, searchQuery)}
                    </h1>
                    {item.content.split(', ').map((contentItem, index) => (
                        <p key={index} className='mt-3 text-[10px] ml-11'>
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