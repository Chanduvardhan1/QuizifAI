import React, {useContext, useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// import help from "../../public/closeimage.png";
import helpVivid from "../../src/assets/Images/quiz-type/star.png"
import nyayahImage from "../../src/assets/Images/dashboard/print.png"
import trophy from "../../src/assets/Images/dashboard/trophy.png"
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import Navigation from "../navbar/navbar";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import { useNavigate } from "react-router-dom";
// import help from "../../src/assets/Images/dashboard/communication.png"
import help from "../../public/chatbots1.png";
import { CircularProgress } from "@mui/material";

const HelpDesk = () => {
    const navigate = useNavigate();
  
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [ticketNumber, setTicketNumber] = useState(null);
  const [conversation, setConversation] = useState([]);
  const location = useLocation();
  const [ticketCategory, setTicketCategory] = useState(""); 
  const [files, setFiles] = useState(null);

  const [ownerId, setOwnerId] = useState('');
const [ownerLawfirmId, setOwnerLawfirmId] = useState('');
const [ticketCategoryId, setTicketCategoryId] = useState('');
const [ticketDescription, setTicketDescription] = useState('');
const [attachedFiles, setAttachedFiles] = useState([]);
const [categories, setCategories] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const orgId = localStorage.getItem('org_id');
const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  const [loading, setLoading] = useState(false);

  const options = [
    "I'm facing an issue",
    "I have a query",
    "I need the status of my existing ticket",
    'Other',
  ];

  const features = [
    'Quizzes',
    'Profile',
    'Reports',
    'Configuration',
    'Assign Quiz',
    'Other',
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setStep(1);
    setConversation((prev) => [
      ...prev,
      { sender: 'assistant', text: 'Hello, I am your Quizifai Help Desk Assistant. How can I assist you today?' },
      { sender: 'user', text: option },
    ]);
  };

  useEffect(() => {
    if (location.state?.startAtStep4) {
      setStep(4);
      setTicketNumber(location.state.ticketNumber || `TICKET${Math.floor(Math.random() * 1000)}`);
    }
  }, [location.state]);

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
    setStep(3);
    setConversation((prev) => [
      ...prev,
      { sender: 'assistant', text: `Which feature are you facing issue with?` },
      { sender: 'user', text: feature },
    ]);
  };

  const getTicketCategory = (option) => {
    switch (option) {
      case "I'm facing an issue":
        return "1";
      case "I have a query":
        return "2";
      default:
        return "3";
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        setLoading(true); 
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found. Please log in again.');
          return;
        }
        // Replace the URL and token as needed
        const response = await fetch(`https://dev.quizifai.com:8010/tkt_dropdowns?orgid=${orgId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dropdown data');
        }

        const data = await response.json();

        if (data.response === "success") {
          // Populate state with the received data
          setCategories(data.data.categories);
          setPriorities(data.data.priorities);
          setStatuses(data.data.statuses);
          setAdmins(data.data.admins);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Hide loading after API response
      }
    };

    fetchDropdowns();
  }, []);
  // const handleTicketCreation = () => {
  //   const ticket = `TICKET${Math.floor(Math.random() * 1000)}`;
  //   setTicketNumber(ticket);
  //   setStep(4);
  //   setConversation((prev) => [
  //     ...prev,
  //     { sender: 'assistant', text: 'Thank you for the details. Your ticket has been created successfully.' },
  //     { sender: 'assistant', text: `Ticket Number: ${ticket}` },
  //   ]);
  // };

  const handleTicketCreation = async () => {
    const ownerLawfirmId = sessionStorage.getItem('user_lawfirm_id');
    if (!userId) {
      toast.error('User ID is required.');
      return;
    }
    
    // if (!selectedOption) {
    //   toast.error('Please select a ticket category.');
    //   return;
    // }
    if (!userDescription) {
      toast.error('Ticket description cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('ownerid', userId);
    formData.append('ownerlawfirm_id', ownerLawfirmId);
    formData.append('ticketcategoryid', getTicketCategory(selectedOption));
    formData.append('ticketdescription', userDescription);
  
    // Attach files if any
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
    }
  
    try {
      setLoading(true); 
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
  
      const response = await fetch('https://dev.quizifai.com:8010/create_tkt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'accept': 'application/json',
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const ticketId = data?.ticketid; // Correctly adjusted for the response structure
  
      if (ticketId) {
        setTicketNumber(ticketId);
        setStep(4);
  
        setConversation((prev) => [
          ...prev,
          { sender: 'assistant', text: 'Thank you for the details. Your ticket has been created successfully.' },
          { sender: 'assistant', text: `Ticket Number: ${ticketId}` },
        ]);
      } else {
        throw new Error('Ticket ID not found in response');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('Failed to create ticket. Please try again.');
  
      setConversation((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Sorry, there was an error creating your ticket. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  

  const resetState = () => {
    setStep(0);
    setSelectedOption('');
    setSelectedFeature('');
    setUserDescription('');
    setTicketNumber(null);
    setConversation([]);
    setFiles(null);
    setError(null);
  };
  const handleOtherOption = () => {
    setStep(3);
    setSelectedFeature('Other');
    setConversation((prev) => [
      ...prev,
      { sender: 'assistant', text: 'Please provide a detailed description of your issue or query.' },
    ]);
  };



const handleMytickets = ()=> {
  navigate('/MyTickets1')
}


  const handleBackToLogin = () => {
    const authToken = localStorage.getItem('authToken') || null;
  
    if (!authToken) {
      console.error('No authToken found in localStorage.');
      return;
    }
  
    fetch('https://dev.quizifai.com:8010/usr_logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Logout response:', data);
        if (data.response === 'success') {
          localStorage.clear();
          logout(); // Clear AuthContext
          console.log('Navigating to login...');
          navigate('/login'); // Navigate to login page
        } else {
          console.error('Logout failed:', data.response_message);
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };
  return (
    <div className="flex min-h-screen bg-[#f5f5f5] overflow-hidden">
      <style>{`
        body {
          background-color:#F5F5F5;
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          padding: 0;
          height: 100vh;
          overflow: hidden;
        }
        .top-bar {
          height: 64px;
          width: 100%;
          background-color:F5F5F5;
          z-index: 10;
          position: sticky;
          top: 0;
        }
        .chat-container {
          max-height: calc(100vh - 64px - 80px);
          overflow-y: auto;
        }
        .bg-gray-200 {
        background-color:#E5E7EB;
        }
        .bg-gray-300 {
          background-color:#D1D5DB;
        }
        .bg-gray-100 {
          background-color:#F3F4F6;
        }
        .text-blue-500 {
          color: #00008b;
        }
        .bg-blue-500 {
          background-color: #3B82F6;
        }
        .bg-green-500 {
          background-color: #10B981;
        }
        .bg-green-400 {
          background-color:#34D399;
        }
      `}</style>

    
  

       {/* Main Content */}
 
      <div className='flex w-full'>
        <Navigation/>
   
        <ToastContainer/>
  {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} color="primary" />
  </div>
)}
        <div className="flex flex-col  flex-1 p-4 pt-12 gap-2">
           <div className=" absolute top-3 right-3 cursor-pointer">
                    <img
                        src={LogoutIcon}
                        onClick={handleBackToLogin}
                        alt="Logout Icon"
                        className="w-5 h-5 cursor-pointer "
                      />
                  </div>
          {/* <div className="w-1/3 bg-gray-100 h-screen mt-[-30px] rounded-lg flex flex-col items-center justify-center p-8 relative">
            <img
              src={help}
              alt="Help Desk Icon"
              className="transition-all duration-500 w-32 h-32 mb-4"
            />
             <button
  onClick={resetState}
  className={`              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
 flex items-center gap-2 px-4 py-2 hover:opacity-90 transition-colors absolute bottom-8 right-8 bg 
     `}
>
  <p size={20} />
  Start Over
</button>
          </div> */}
          <div className='flex justify-end'>
     <button
  onClick={resetState}
  className={`  px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]

     `}
>
  <p size={20} />
  Start Over
</button>
</div>
<div className='flex gap-2 w-full'>


<div  className="w-1/3 bg-white shadow-md h-screen  rounded-lg flex flex-col items-center justify-center p-8 relative">
<img src={help}  className="transition-all duration-500 w-64 h-62 mb-4"
alt="" />
</div>
          <div className="flex-1 bg-white shadow-md  rounded-lg p-6 overflow-hidden">
        <div className="chat-container space-y-4">
          <div className="space-y-4 mb-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`${
                    message.sender === 'assistant' ? ' bg-[#E8E9E8] border-[1px] border-[#ccc]' : 'bg-blue-500 text-white'
                  } px-4 py-2 rounded-lg max-w-[85%] break-words text-[#00008b]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {step === 0 && (
              <div className="flex flex-col space-y-2">
                <div className="text-[#00008b] text-left font-bold">
                  Hello, I am your Quizifai Help Desk Assistant. How can I assist you today? Please select an option:
                </div>
                {options.map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-[5px] font-semibold w-[58%] text-left bg-[#f5f5f5] border-[1px] border-[#ccc] hover:bg-gray-300 text-sm  transition-colors text-[#00008b] `}
                    onClick={() => option === 'Other' ? handleOtherOption() : handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {step === 1 &&
             (selectedOption === "I'm facing an issue" || selectedOption === "I have a query") && (

                <div className="flex flex-col space-y-4">
                  <div className="text-[#00008b] text-left font-bold">
                    Which feature are you facing issue with or have a question about?
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-[5px] text-left text-[#00008b] bg-[#E8E9E8] border-[1px] border-[#ccc] hover:bg-gray-300 transition-colors `}
                        onClick={() => handleFeatureSelect(feature)}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {step === 3 && (
              <div className="flex flex-col space-y-2">
                
                <select
              className="w-full p-3  text-[#00008b] bg-[#E8E9E8] rounded-[5px] border-[1px] border-[#ccc] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 "
              // value={priority}
              // onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
                <textarea
                  className="w-full p-3 bg-[#E8E9E8] border-[1px] border-[#ccc] focus:ring-1 outline-none resize-none"
                  rows={4}
                  placeholder="Ticket Description"
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                />
                
                <input 
                  type="file" 
                  onChange={(e) => setFiles(e.target.files)} 
                  multiple 
                />

                <button
                  onClick={handleTicketCreation}
                  className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                >
                  Create Ticket
                </button>
              </div>
            )}

            {step === 4 && (
              <div
                className={`p-4 rounded-lg `}
              >
                <p className='text-[#00008b] font-bold'>Your ticket has been created successfully. Ticket Number: {ticketNumber}</p>
                <p
                  onClick={handleMytickets}
                  className="text-[#00008b] cursor-pointer underline mt-2 block"
                >
                  Go to My Tickets
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>

    </div>
    </div>

 
  );
};

export default HelpDesk;