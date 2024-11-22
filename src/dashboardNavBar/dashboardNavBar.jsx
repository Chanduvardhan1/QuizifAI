// import { useEffect, useState } from 'react';
// import profileimg from "../assets/Images/images/profile/profileImage.png";
// import Camera from "../assets/Images/images/profile/Camera.png";

// export default function Dashboard() {
//     // Mock data - replace with your actual data
//     const [userData, setUserData] = useState({
//         name: "Samantha S",
//         occupation: "Professional",
//         userId: "809",
//         city: "New York",


//         district: "Manhattan",
//         country: "USA",
//         globalRank: "156",
//         globalScore: "850",
//         totalQuizzes: "25",
//         totalMinutes: "320",
//         averageScore: "85",
//         subscription: {
//             type: "Public",
//             startDate: "2024-01-01",
//             remainingDays: "30"

//         }
//     });
//     const handleImageClick = () => {
//         if (inputRef.current) {
//             inputRef.current.click();
//         }
//     };
//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setSrc(reader.result);
//                 setModalVisible(true);
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//     const onImageLoaded = (image) => {
//         imageRef.current = image;
//         return false; // Prevent auto cropping
//     };
//     const handleCropComplete = (crop) => {
//         if (src && crop.width && crop.height) {
//             const image = document.createElement('img');
//             image.src = src;
//             image.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const scaleX = image.naturalWidth / image.width;
//                 const scaleY = image.naturalHeight / image.height;
//                 canvas.width = crop.width;
//                 canvas.height = crop.height;
//                 const ctx = canvas.getContext('2d');
//                 ctx.drawImage(
//                     image,
//                     crop.x * scaleX,
//                     crop.y * scaleY,
//                     crop.width * scaleX,
//                     crop.height * scaleY,
//                     0,
//                     0,
//                     crop.width,
//                     crop.height
//                 );
//                 setCroppedImage(canvas.toDataURL());
//             };
//         }
//     };

//     const handleSubmit = () => {
//         if (croppedImage) {
//             setImage(croppedImage);
//             localStorage.setItem('savedImage', croppedImage);
//             setModalVisible(false);
//         }
//     };

//     const handleDeleteImage = () => {
//         localStorage.removeItem('savedImage');
//         setImage('');
//     };
//     function handleReplaceImage(event) {
//         event.stopPropagation(); // Prevent the click from triggering the parent div's click event
//         handleImageClick(); // Open file dialog
//     }
//     function handleViewImage(event) {
//         event.stopPropagation(); // Prevent the click from triggering the parent div's click event
//         if (image) {
//             // Create a temporary link element
//             const link = document.createElement('a');
//             link.href = image;
//             link.target = '_blank'; // Open in a new tab
//             link.click(); // Simulate click to open the image
//         } else {
//             console.error('No image available to view');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <div className="grid grid-cols-2 gap-4 mb-4">

//                 <div className="flex flex-col items-center relative ml-[-82%] mr-4 border border-[#dddddd] rounded-sm p-2 h-64 w-40">
//                     <div className="relative">
//                         <img
//                             className="h-40 w-40 object-cover"
//                             src={profileimg}
//                             alt="Profile"
//                             style={{ height: '100px', width: '100px' }}
//                         />
//                         {/* <img
//                             className="absolute left-11 bottom-5 h-10 w-10"
//                             src={Camera}
//                             alt="Camera"
//                             onClick={handleImageClick}
//                         /> */}
//                     </div>
//                     <div className="mt-2 text-center">
//                         <h2 className="text-[16px] font-semibold text-[#214082] font-family-[lato]">
//                             {userData.name}
//                         </h2>
//                         <p className="text-[14px] text-[#214082] font-400 font-family-[lato]">{userData.occupation}</p>
//                         <p className="text-sm text-[#FF6701]">User ID: {userData.userId}</p>
//                     </div>
//                 </div>
//                 {/* Quizzes Box */}



//                 <div className="flex flex-col items-center relative ml-[-111%] mr-4 border border-[#dddddd] rounded-sm p-2 h-64 w-40 ">
//                     <div className="text-center">
//                         <h3 className="text-[16px] font-[500] text-[#214082] mb-2">Quizzes</h3>
//                         <p className="text-2xl font-bold text-orange-500">{userData.totalQuizzes}</p>
//                     </div>
//                     <div className="text-center my-4">
//                         <h3 className="text-[16px] font-[500] text-[#214082] mb-2">Minutes</h3>
//                         <p className="text-2xl font-bold text-orange-500">{userData.totalMinutes}</p>
//                     </div>
//                     <div className="text-center">
//                         <h3 className="text-[16px] font-[500] text-[#214082] mb-2">Average Score</h3>
//                         <p className="text-2xl font-bold text-orange-500">{userData.averageScore}%</p>
//                     </div>
//                 </div>

//             </div>



//             <div className="grid grid-cols-2 gap-4">
//                 {/* Global Stats Box */} 
//                   <div className="bg-white rounded-lg shadow p-4">
//                     <h3 className="text-lg font-bold mb-4">Global Rank</h3>
//                     <div className="space-y-4">
//                         <div>
//                             <p className="text-sm text-gray-600">Global Rank</p>
//                             <p className="text-2xl font-bold text-blue-500">#{userData.globalRank}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-gray-600">Global Score</p>
//                             <p className="text-2xl font-bold text-blue-500">{userData.globalScore}</p>
//                         </div>
//                     </div>
//                 </div> 
//                 {/* <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
//                     <div className="flex items-center mb-2">
//                         <ArrowUp className="w-6 h-6 text-green-500 mr-2" />
//                         <span className="text-3xl font-bold">{percentage}%</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground mb-4">Google Rankings</p>
//                     <div className="space-y-2">
//                         <div>
//                             <p className="text-sm text-muted-foreground">Global Rank</p>
//                             <p className="text-xl font-semibold">#{globalRank}</p>
//                         </div>
//                         <div>
//                             <p className="text-sm text-muted-foreground">Global Score</p>
//                             <p className="text-xl font-semibold">{globalScore}</p>
//                         </div>
//                     </div>
//                 </div> */}

//                 {/* Subscription Box */}
//                 <div className="bg-white rounded-lg shadow p-4">
//                     <h3 className="text-lg font-bold mb-4">Subscription Details</h3>
//                     <div className="space-y-2">
//                         <div className="flex justify-between">
//                             <p className="text-sm text-gray-600">Type:</p>
//                             <p className="font-medium">{userData.subscription.type}</p>
//                         </div>
//                         <div className="flex justify-between">
//                             <p className="text-sm text-gray-600">Start Date:</p>
//                             <p className="font-medium">{userData.subscription.startDate}</p>
//                         </div>
//                         <div className="flex justify-between">
//                             <p className="text-sm text-gray-600">Days Remaining:</p>
//                             <p className="font-medium">{userData.subscription.remainingDays}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useContext } from "react";

import { useEffect, useState } from 'react';
// import { ArrowUp } from "lucide-react"
import profileimg from "../assets/Images/images/profile/profileImage.png";
import physics from "../../src/assets/Images/quiz-type/physics.img.png"
import { AuthContext } from "../Authcontext/AuthContext.jsx";
import camera1 from "../../src/assets/Images/dashboard/edit.png"
import ProgressIndicator from '../weeklyProgress/weeklyProgress';
import x from "../../src/assets/Images/quiz-type/cross-button.png"
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import { useNavigate } from "react-router-dom";

export default function dashboardNavBar() {
    const [userData, setUserData] = useState({
        name: "Samantha S",
        occupation: "Professional",
        userId: "809",
        city: "New York",
        district: "Manhattan",
        country: "USA",
        // globalRank: "1",
        globalScore: "15626",
        totalQuizzes: "25",
        totalMinutes: "320",
        averageScore: "85",
        subscription: {
            type: "Public",
            startDate: "2024-01-01",
            remainingDays: "30"
        }
    });
    const { isAuthenticated, authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialRank = 1;
    const initialScore = 1543;
    const [rank, setRank] = useState(initialRank);
    const [score, setScore] = useState(initialScore);
    const [rankChange, setRankChange] = useState(null); // "increase", "decrease", or null
    const [previousRank, setPreviousRank] = useState(initialRank);
    const [userId, setUserId] = useState(localStorage.getItem("user_id"));
    const [city, setCity] = useState("");
    const [occupation, setOccupation] = useState("");
    const [country, setCountry] = useState("");
    const [district, setDistrict] = useState("")
    const [globalRank, setGlobalRank] = useState("");
    const [globalscore, setGlobalscore] = useState("");
    const [totalQuizzes, setTotalQuizzes] = useState("");
    const [totalMinutes, setTotalMinutes] = useState("");
    const [userName, setUserName] = useState('');
    const [averageScorePercentage, setAverageScorePercentage] = useState("");
    const [remainingDays, setRemainingDays] = useState('');
    const [otherOccupation, setOtherOccupation] = useState("");
    const [registeredOn, setRegisteredOn] = useState("");
    const [photo, setPhoto] = useState(''); // State to store the image URL
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
      // Detect if rank has increased or decreased
      if (rank > previousRank) {
        setRankChange('increase');
      } else if (rank < previousRank) {
        setRankChange('decrease');
      } else {
        setRankChange(null);
      }
      setPreviousRank(rank);
    }, [rank]);
  
    // Determine triangle color based on rank and rankChange
    const getTriangleColors = () => {
      if (rankChange === 'increase') {
        return {
          upColor: 'bg-green-500',
          downColor: 'bg-red-200',
        };
      } else if (rankChange === 'decrease') {
        return {
          upColor: 'bg-green-200',
          downColor: 'bg-red-500',
        };
      } else {
        // Default colors based on rank threshold
        return rank <= 10
          ? { upColor: 'bg-green-500', downColor: 'bg-red-200' }
          : { upColor: 'bg-green-200', downColor: 'bg-red-500' };
      }
    };
  
    const { upColor, downColor } = getTriangleColors();
  
    // Mock function to change rank (for testing)
    const handleRankChange = (newRank) => {
      setRank(newRank);
    };
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/login'); // Redirect to login if not authenticated
          return;
        }
        const fetchQuizData = async () => {
          console.log("User ID:", userId);
    
          try {
    
            const response = await fetch(
              `https://dev.quizifai.com:8010/dashboard`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                  user_id: userId
                }),
              }
            );
    
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            console.log("Data:", data);
            const auditDetails = data.data[0].audit_details || {};
            const userProfile = data.data[0].user_profile_details || {};
            const userMetrics = data.data[0].user_metrics || {};
            const latestResults = data.data[0].latest_result || [];

            setUserName(userProfile.full_name || "N/A");
      setEmail(userProfile.user_email || "N/A");
      setPhoneNumber(userProfile.user_phone_number || "N/A");
      setRoleName(userProfile.role_name || "N/A");
      setOccupation(userProfile.occupation_name || "N/A");
      // setLocation(userProfile.location_name || "N/A");
      setCountry(userProfile.country_name || "N/A");
      setTotalQuizzes(userMetrics.countofquizes || 0);
      setAverageScorePercentage(userMetrics.average_total_percentage || 0);

      setCountry(auditDetails.country_name || "");
          setGlobalRank(auditDetails.global_score_rank || "");
          setGlobalscore(auditDetails.global_score || "");
          setRegisteredOn(auditDetails.created_date || "");
          setLastLogin(auditDetails.last_login_timestamp || "");
          setPasswordChanged(auditDetails.user_password_change_date || "");


           } catch (error) {
            console.error("Error fetching quiz data:", error);
          }
        };
    
        fetchQuizData();
      }, [userId, isAuthenticated, authToken]);
      const fetchProfileImage = async () => {
        try {
          const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
                if (!authToken) {
                  console.error("No authentication token found. Please log in again.");
                  return;
                }
          const response = await fetch(`https://dev.quizifai.com:8010/view-profile_image?user_id=${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'accept': 'application/json',
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            if (data.response === 'success') {
              setPhoto(data.data); // Set the image URL from the response
            } else {
              setPhoto(defaultPhoto);
            }
          } else {
            setPhoto(defaultPhoto);
            // setError('Failed to fetch image');
          }
        } catch (error) {
          setPhoto(defaultPhoto);
          // setError('Error fetching image: ' + error.message);
        } finally {
          setLoading(false);
        }
      };
      const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const response = await fetch(`https://dev.quizifai.com:8010/upload-image?user_id=${userId}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            body: formData,
          });
      
          if (response.ok) {
            // After successfully uploading, fetch the updated image
            fetchProfileImage();
            navigate(0)
          } else {
            setError('Failed to upload image');
          }
        } catch (error) {
          setError('Error uploading image: ' + error.message);
        }
      };
      
      const handleIconClick = () => {
        document.getElementById('fileInput').click();
      };
      
      // Handle file selection
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          uploadImage(file);
        }
      };
      
      useEffect(() => {
        fetchProfileImage();
      }, []);
      
    //   useEffect(() => {
    //     fetchUserProfile();
    //   }, []);
      
      const deleteImage = async () => {
        try {
          const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
                if (!authToken) {
                  console.error("No authentication token found. Please log in again.");
                  return;
                }
          const response = await fetch(`https://dev.quizifai.com:8010/remove-image?user_id=${userId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'accept': 'application/json',
            },
          });
      
          if (response.ok) {
            // Clear the photo state after successful deletion
            setPhoto('');
            setError(null); // Reset any errors
            navigate(0)
          } else {
            setError('Failed to delete image');
          }
        } catch (error) {
          setError('Error deleting image: ' + error.message);
        }
      };
      const openModal = () => {
        setIsModalOpen(true);
      };
      const closeModal = () => {
        setIsModalOpen(false);
      };
// const score = 1564;
    return (
        <div className="container mx-auto p-4">
          <div className="flex w-full bg-[#F3D0D5]  gap-4 mb-1  px-2 p-2 font-semibold rounded-lg">
      <button
        // onClick={() => handleTabClick('Manual')}
        className={`w-full px-4 py-2 mr-4
          text-[#214082] bg-[#c1e7e3] rounded-lg
        `}
      >
      Profile
      </button>
      <button
        // onClick={() => handleTabClick('Excel')}
        className={`w-full px-4 py-2 mr-4 text-[#214082] bg-[#ceffe4] rounded-lg
        `}
      >
        Quizzes Overview 
      </button>
      <button
        // onClick={() => handleTabClick('Pdf')}
        className={`w-full px-4 py-2  mr-4 bg-[#ffe5d9]
      rounded-lg  text-[#214082] 
        `}
      >
       Weekly Progress
      </button>
      <button
        // onClick={() => handleTabClick('Textbook')}
        className={`w-full px-4 py-2 mr-4 rounded-lg text-[#214082] bg-[#ffe9ee]
        `}
      >
        Global Rank
      </button>
      <button
        // onClick={() => handleTabClick('Textbook')}
        className={`w-full px-4 py-2 mr-4 text-[#214082] rounded-lg  bg-[#c1bbdd]
        `}
      >
        Subscription 
      </button>
    </div>
            <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="flex flex-col items-center justify-center relative mr-4 border shadow-lg rounded-md p-2 bg-white ">
                    <div className="relative">
                    {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="relative w-full h-full">
        <img
          src={photo}
          alt="Profile"
          onClick={openModal}
          className="w-[80px] h-[80px] rounded-2xl"
        />
        <div 
          className="absolute bottom-0 right-0 rounded-full cursor-pointer"
          onClick={openModal}
        >
         <img src={camera1} alt="" className="w-[20px] h-[20px]"/>
        </div>
      </div>
      )}

      {/* Hidden file input for selecting image */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
                    </div>
                    {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
         <div class="flex items-center justify-center min-h-screen ">
  <div class="bg-gray-800 text-white rounded-lg p-6 shadow-lg max-w-xs">
    <div class="relative">
      <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200">
        <img src={photo} alt="Profile" class="w-full h-full object-cover"/>
      </div>
      
      <div class="absolute top-[-15px] right-[-15px] flex space-x-2">
        <button class="bg-gray-600 p-2 rounded-full text-white hover:bg-gray-500">
        
          <img src={x} alt="" class="h-5 w-5" />
        </button>
      </div>
    </div>
    
    <h2 class="text-center text-xl  mt-4">Profile photo</h2>
    
    <div class="mt-4 flex justify-between">
      <button class="bg-gray-700 px-4 py-2 rounded text-sm text-white hover:bg-gray-600"  onClick={handleIconClick}>Add photo</button>
      {/* <button class="bg-gray-700 px-4 py-2 rounded text-sm text-white hover:bg-gray-600">Add photo</button> */}
      {/* <button class="bg-gray-700 px-4 py-2 rounded text-sm text-white hover:bg-gray-600">Frames</button> */}
      <button class="bg-red-600 px-4 py-2 rounded text-sm text-white hover:bg-red-500" onClick={deleteImage}>Delete</button>
    </div>
  </div>
</div>

        </div>
      )}
                    <div className="mt-2 text-center">
                        <h2 className="text-[16px] font-semibold text-[#214082] font-family-[lato]">
                        {userName}

                        </h2>
                        <p className="text-[14px] text-[#214082] font-400 font-family-[lato]">{userData.occupation}</p>
                        <p className="text-sm text-[#FF6701]">User ID: {userId}</p>
                        <p className="text-sm text-[#002366]">{city}</p>


                        <p className="text-sm text-[#002366]">{district}</p>
                        <p className="text-sm text-[#002366]">{country}</p>
                    </div>
                </div>

                <div className="flex flex-col  justify-start items-start relative mr-4 border shadow-lg rounded-sm p-2 bg-white">
                  <div className=" space-y-2 flex flex-col items-start justify-center pl-[10px]">
                    <div className=" flex justify-center items-center text-center mt-2">
                        <h3 className="text-[16px] font-[500] text-[#214082] ">Quizzes : </h3>
                        <p className="text-[16px] font-bold text-orange-500 ml-[2px]"> {userData.totalQuizzes}</p>
                    </div>
                    <div className=" flex justify-center items-center text-center my-4">
                        <h3 className="text-[16px] font-[500] text-[#214082] ">Minutes : </h3>
                        <p className="text-[16px] font-bold text-orange-500 ml-[2px]"> {userData.totalMinutes}</p>
                    </div>
                    <div className="flex justify-center items-center text-center">
                        <h3 className="text-[16px] font-[500] text-[#214082] ">Average Score : </h3>
                        <p className="text-[16px] font-bold text-orange-500 ml-[2px]"> {userData.averageScore}%</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center relative mr-4 border shadow-lg rounded-sm p-2 py-[20px] bg-white">
           <ProgressIndicator />
           
        </div>
        <div className="flex flex-col items-center justify-center relative mr-4 border shadow-lg rounded-sm p-2 bg-white">
        <div className="flex flex-col items-center">
      {/* Icons above the rank number */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-1 mt-2 mr-3">
          {/* Triangles for rank indication */}
          <div className={`w-4 h-4 ${upColor} clip-triangle-up`}></div>
          <div className={`w-4 h-4 ${downColor} clip-triangle-down`}></div>
        </div>

        {/* Rank Number */}
        <div className="text-6xl font-bold text-orange-500">
          {rank}
        </div>
      </div>

      {/* Score */}
      <div className="text-lg text-orange-500 ml-[30%]">
        {score}
      </div>

      {/* Global Score Label */}
      <div className="text-[14px]  font-semibold text-[#214082] ">
        Global Score
      </div>

      {/* Buttons to simulate rank change for testing */}
      {/* <div className="flex gap-2 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleRankChange(rank + 1)}
        >
          Increase Rank
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => handleRankChange(rank - 1)}
        >
          Decrease Rank
        </button>
      </div> */}
    </div>

    </div>

                <div className="flex flex-col items-center justify-start relative mr-4 border shadow-lg rounded-sm p-2 py-[20px] bg-white">
                {/* <h3 className="text-[14px] font-bold mb-5 text-[#214082]">Subscription</h3> */}

                    {/* <h3 className="text-sm font-bold mb-4 text-[#214082]"> <span>Public</span></h3> */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-sm text-[#214082] ">Type :</p>
                            <div>

                            <p className="text-[14px] font-medium text-orange-500"> Public/</p>
                            <p className="text-[14px] font-medium text-[#8b8c8d] "> Subcribed/</p>
                            <p className="text-[14px] font-medium text-[#8b8c8d] "> Organization</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-[#214082]">Date : </p>
                            {/* <p className="font-medium text-orange-500">{userData.subscription.startDate}</p> */}
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-[#214082] mr-31%">Days Remaining : </p>
                            <p className="font-medium ml-1 text-orange-500"> {userData.subscription.remainingDays}</p>
                        </div>
                    </div>
                </div>
            </div>

          
        </div>
    );
}