import React from "react";
import Navigation from "../navbar/navbar";
import LogoutBar from "../logoutbar/logoutbar";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authcontext/AuthContext";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import GreaterThan from "../assets/Images/images/dashboard/greaterthan.png";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import Easy from "../assets/Images/history/Easy.png"; 
import Moderate from "../assets/Images/history/Moderate.png"; 
import Complex from "../assets/Images/history/Complex.png"; 
import DashBoardNavBar from "../../src/dashboardNavBar/dashboardNavBar.jsx";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import close from "../../src/assets/Images/images/dashboard/cancel.png"


const superadminusesdetails = () => {
  const [userName, setUserName] = useState("");
  const [globalRank, setGlobalRank] = useState("");
  const [globalScore, setGlobalScore] = useState("");
  const [noOfQuizzes, setNoOfQuizzes] = useState("");
  const [noOfMinutes, setNoOfMinutes] = useState("");
  const [noOfAttempts, setNoOfAttempts] = useState("");
  const [simpleCount, setSimpleCount] = useState("");
  const [moderateCount, setModerateCount] = useState("");
  const [complexCount, setComplexCount] = useState("");
  const [passCount, setPassCount] = useState("");
  const [FailCount, setFailCount] = useState("");
  const [quizDetails, setQuizDetails] = useState([]);
  const [NoOfScore, setNoOfScore] = useState("");
  const [historyData, setHistoryData] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const navigate = useNavigate();
  const { isAuthenticated, authToken,logout } = useContext(AuthContext);
  const inputReff = useRef(null);
  const [image, setImage] = useState("");
  const [date, setDate] = useState('');

  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [sortOption, setSortOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  const [quizzes, setQuizzes] = useState([]);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const authToken = localStorage.getItem("authToken") || null;
      if (!authToken) {
        console.error("No authToken found in localStorage.");
        return;
      }
      try {
        const response = await fetch(
          "https://dev.quizifai.com:8010/all-organization-users-details/",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUsers(data.data);
        setFilteredUsers(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  // Extract unique values for dropdowns
  const userNames = [...new Set(users.map((user) => user.user_name))];
  const emails = [...new Set(users.map((user) => user.email))];
  const roles = [...new Set(users.map((user) => user.role))];

  // Filter users based on search and dropdown selections
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedUserName) {
      filtered = filtered.filter((user) => user.user_name === selectedUserName);
    }

    if (selectedEmail) {
      filtered = filtered.filter((user) => user.email === selectedEmail);
    }

    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, selectedUserName, selectedEmail, selectedRole, users]);


  // Handle sort change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset to the first page when sort changes
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  useEffect(() => {
    const filtered = quizzes.filter((quiz) => {
      const matchesSearchTerm =
        quiz.quiz_title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSortOption =
        sortOption === 'All' || quiz.quiz_title === sortOption;
      return matchesSearchTerm && matchesSortOption;
    });
    // setFilteredQuizzes(filtered);
  }, [searchTerm, sortOption, quizzes]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

  // Get the current date for filtering


  // Image handling and crop logic
  useEffect(() => {
    const savedImage = localStorage.getItem("savedImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  function handleImageClick() {
    if (inputReff.current && typeof inputReff.current.click === "function") {
      inputReff.current.click(); // Open file dialog
    } else {
      console.error("click method is not available on inputReff.current");
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        // localStorage.setItem('savedImage', imageDataUrl);
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };
  function handleReplaceImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    handleImageClick(); // Open file dialog
  }

  function handleDeleteImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    localStorage.removeItem("savedImage"); // Remove from local storage
    setImage(""); // Reset to default image
  }

  function handleViewImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    if (image) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = image;
      link.target = "_blank"; // Open in a new tab
      link.click(); // Simulate click to open the image
    } else {
      console.error("No image available to view");
    }
  }
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      ASPECT_RATIO,
      width,
      height
    );
    setCrop(crop);
  };

  const leaderboard = (quizId, attemptId) => {
    localStorage.setItem("quiz_id", quizId);
    navigate("/leaderboard", {
      state: {
        quizId,
        attemptId,
      },
    });
  };
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
  // --------------***view image*** -------------- //
const [photo, setPhoto] = useState(''); // State to store the image URL
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(null);

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

      useEffect(() => {
        fetchProfileImage();
      }, []);
// --------------***view image end*** -------------- //
const handleBack = () => {
  navigate("/repoarts")
};
const [selectedQuizTitle, setSelectedQuizTitle] = useState('All');

// const quizTitles = ['All', ...new Set(quizAttempts.map(quiz => quiz.quiz_title))];

// Filtering logic for search term and selected quiz title
// const filteredQuizzes = quizAttempts.filter((quiz) => {
//     // Ensure the search term is trimmed and case-insensitive
//     const trimmedSearchTerm = searchTerm.trim().toLowerCase();
//     const lowerCaseQuizTitle = quiz.quiz_title.toLowerCase();
  
//     const searchMatch = lowerCaseQuizTitle.includes(trimmedSearchTerm); // search term match
//     const titleMatch = selectedQuizTitle === 'All' || quiz.quiz_title === selectedQuizTitle; // selected quiz title match
  
//     // Debugging the filter match
//     console.log('Quiz:', quiz.quiz_title, 'Search Match:', searchMatch, 'Title Match:', titleMatch);
  
//     return searchMatch && titleMatch; // Only return quizzes that match both
//   });
  return (
    <>
      <div className="flex w-full">
        <Navigation />
        <div className="w-[92%] p-[10px] text-[14px] font-Poppins text-[#214082] font-bold">
        <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
               <img src={close} alt="" className="w-[25px] h-[25px]" />
             </div>
          {/* <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530]">Organization Users List</h1>
          </div> */}
          <div className="flex justify-start items-center p-[5px] text-[14px]">
                <span className="text-[#F17530]">Title</span>
                <span className="text-[#F17530] ml-[49px]"> : </span>

              <span className="text-[#214082] text-[12px] ml-2">Organization Users List</span>
            </div>
            <div className="flex justify-start items-center p-[5px] text-[14px]">
                <span className="text-[#F17530]">Description : </span>
              <span className="text-[#214082] ml-2  text-[12px]">The Organization User List for Super Admin provides a comprehensive view of all users within the organization, allowing management of roles, statuses, and account details.</span>
            </div>
{/* <div className="flex">
<DashBoardNavBar/>
</div> */}
          {/* <div className="py-[20px] my-[10px]">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 pb-2 items-center ">
              <div
                  className="rounded-full w-[80px]  h-[80px] "

                >
                 
                    <img
                      className="w-[80px] h-[80px] rounded-2xl"
                      src={photo}
                      alt="Default"
                    />
                
                </div>
                <div className="-mt-4">
                  <span className="text-[15px]">Welcome </span>
                  <span className="text-[15px]">
                    {userName.charAt(0).toUpperCase() + userName.slice(1)}
                  </span>
                  <br />
                  <span className="text-[13px]">User id : </span>
                  <span className=" font-normal text-[12px]">{userId}</span>
                </div>
              </div>
              </div>
              <div className="flex justify-evenly gap-3 border-2 px-2 py-2 bg-[#DCFCE7] w-full">
              <div>
                  <div>
                    <span>Total no.of Attempts : </span>
                    <span className=" font-normal">{noOfAttempts}</span>
                  </div>

                  <div>
                    <span>Total no.of Quizzes </span>
                    <span className="pl-[14px] font-normal">
                      <span className="font-bold">:</span> {noOfQuizzes}
                    </span>
                  </div>

                  <div className="text-nowrap">
                    <span>Total no.of min </span>
                    <span className="pl-[41px] font-normal">
                      <span className="font-bold">:</span> {noOfMinutes}
                    </span>
                  </div>

                  <div>
                    <span>Total Score </span>
                    <span className="pl-[68px] font-normal">
                      <span className="font-bold">:</span> {globalScore}
                    </span>
                  </div>
                </div>

                              <div>
                  <div>
                    <span>Global Rank </span>
                    <span className="pl-1 font-normal">
                      <span className="font-bold">:</span> {globalRank}
                    </span>
                  </div>
                  <div className="text-nowrap">
                    <span>Global Score </span>
                    <span className="font-normal">
                      <span className="font-bold">:</span> {globalScore}
                    </span>
                  </div>         
                </div>
                
                <div className="flex">
                    <div className="font-bold">
                      <span>Complexity</span>
                      <span className="px-1">:</span>
                    </div>
                    <div className="flex-col">
                    <span>
                      <p className="text-normal text-nowrap flex font-semibold">
                        Simple <span className="pl-[23px]">:</span><span className="px-1 font-normal">{simpleCount}</span>
                      </p>
                       </span>

                      <p className="text-nowrap flex font-semibold">
                       Moderate :<span className=" px-1 font-normal">{moderateCount}</span>
                      </p>
                      
                      <p className="text-nowrap flex font-semibold">
                       Complex <span className="pl-2">:</span><span className=" px-1 font-normal">{complexCount}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <span className="pl-5 text-nowrap">Pass/Fail : </span>
                    <span className=" font-semibold pl-1">
                      <p className="text-nowrap"> Pass : <span className="font-normal">{passCount}</span></p>
                      <p className="text-nowrap pl-[2px]">Fail <span className="pl-[6px]">:</span> <span className="font-normal">{FailCount}</span></p>
                    </span>
                  </div>
              </div>
              
            </div> */}
      

             <div className="flex justify-between mb-3 pl-[5px] items-center">
               
             <div className="flex w-full gap-2 ">
                   {/* Organization Dropdown */}
                   <span className="text-[#F17530] text-[14px]">User Name</span>
                   <span className="text-[#F17530] text-[14px] ">: </span>

                   <select
          className="py-1 px-2 text-[12px] border rounded-md"
          value={selectedUserName}
          onChange={(e) => setSelectedUserName(e.target.value)}
        >
          <option value="">All Users</option>
          {userNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
           
                   {/* User Role Dropdown */}
                   <span className="text-[#F17530] text-[14px]">Email :</span>
                   <select
          className="py-1 px-2 text-[12px] border rounded-md"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="">All Emails</option>
          {emails.map((email) => (
            <option key={email} value={email}>
              {email}
            </option>
          ))}
        </select>                  
           
                   {/* Registration Day Dropdown */}
                   <span className="text-[#F17530] text-[14px]">Roles :</span>
                   <select
          className="py-1 px-2 text-[12px] border rounded-md"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        </div>
                   {/* Search Input */}
                   <div className="flex">
                     <input
                       type="search"
                       className="p-1 border-2 border-black rounded-lg"
                       placeholder="Search..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                     />
                      <img
                                       className="h-4 w-4 relative top-[9px] right-9"
                                       src={searchIcon}
                                       alt="search icon"
                                     />
                   </div>
     
                 </div>
          
          <div className="overflow-x-auto">
          <table className="w-full bg-gray-100 border border-gray-200 rounded-lg">
        <thead className="bg-[#CBF2FB]">
          <tr className="text-[14px]">
            <th className="py-2 px-4 border-b">Seq</th>
            <th className="py-2 px-4 border-b">Org ID</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b text-start">User Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Last Login</th>
            <th className="py-2 px-4 border-b text-start">
              Total Quizzes Attempted
            </th>
            <th className="py-2 px-4 border-b text-nowrap">Average Score</th>
            <th className="py-2 px-4 border-b text-start">Activity</th>
            <th className="py-2 px-4 border-b">Subscription Status</th>
            <th className="py-2 px-4 border-b">Subscription Expiry</th>
            <th className="py-2 px-4 border-b">Recent Quizzes Attempted</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={user.user_id}
              className="bg-white hover:bg-gray-100 text-[12px]"
            >
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-2 border-b text-center text-nowrap">{user.org_id}</td>
              <td className="py-2 px-2 border-b text-center">{user.user_id}</td>
              <td className="py-2 px-4 border-b text-start">{user.user_name}</td>
              <td className="py-2 px-2 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">{user.role}</td>
              <td className="py-2 px-4 border-b text-center">{user.status}</td>
              <td className="py-2 px-4 border-b text-center">
                {user.last_login_at}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.total_quizzes_attempted}
              </td>
              <td className="py-2 px-4 border-b text-start">
                {user.average_score}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.activity_level}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.subscription_status}
              </td>
              <td className="py-2 px-4 border-b text-start">
                {user.subscription_expiry_date}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {user.recent_quizzes_attempted}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       
            {/* <div className="flex justify-between mt-4">
              <button
                className="flex gap-1 items-center cursor-pointer"
                disabled={currentPage === 1}
              >
                <img
                  className="h-3 w-3 rotate-180"
                  src={GreaterThan}
                  alt="Previous icon"
                />
                <h1 className="text-[#F17530]">Previous</h1>
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(sortedQuizzes.length / rowsPerPage)}
              </span>
              <button
                className="flex gap-1 items-center cursor-pointer"
                onClick={handleNext}
                disabled={indexOfLastRow >= quizDetails.length}
              >
                <h1 className="text-[#F17530]">Next</h1>
                <img className="h-3 w-3" src={GreaterThan} alt="Next icon" />
              </button>
            </div> */}
          </div>
        </div>
        {/* <LogoutBar /> */}
      </div>
    </>
  );
};

export default superadminusesdetails;
