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


const superadminquizsummary = () => {
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

  const [quizSummary, setQuizSummary] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    organization_name: "",
    user_email: "",
    user_role: "",
  });

  useEffect(() => {
    const fetchQuizSummary = async () => {
      const authToken = localStorage.getItem("authToken") || null;

      if (!authToken) {
        console.error("No authToken found in localStorage.");
        return;
      }

      try {
        const response = await fetch(
          "https://dev.quizifai.com:8010/organization-quiz-summary-for-super-admin/",
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
        setQuizSummary(data.data);
        setFilteredData(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchQuizSummary();
  }, []);

  // Get unique dropdown options dynamically
  const getUniqueOptions = (key) => {
    return [...new Set(quizSummary.map((item) => item[key]))].filter(Boolean);
  };

  // Filtering logic for search and dropdowns
  useEffect(() => {
    let filtered = quizSummary.filter((quiz) =>
      Object.keys(filters).every((key) =>
        filters[key] ? quiz[key]?.toLowerCase().includes(filters[key].toLowerCase()) : true
      )
    );

    if (searchTerm) {
      filtered = filtered.filter((quiz) =>
        Object.values(quiz)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, filters, quizSummary]);

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
        <div className="w-full p-[10px] text-[14px] font-Poppins text-[#214082] font-bold">
        <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
               <img src={close} alt="" className="w-[25px] h-[25px]" />
             </div>
          {/* <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530]">Organization Quiz Summary</h1>
          </div> */}
          <div className="flex justify-start items-center p-[5px] text-[14px]">
                <span className="text-[#F17530]">Title</span>
                <span className="text-[#F17530] ml-[110px]"> : </span>

              <span className="text-[#214082] text-[12px] ml-2">Organization Quiz Summary</span>
            </div>
            <div className="flex justify-start items-center p-[5px] text-[14px]">
                <span className="text-[#F17530]">Description  </span>
                <span className="text-[#F17530] ml-[65px]"> : </span>

              <span className="text-[#214082] ml-2  text-[12px]">An organization users list records all individuals in an organization, detailing their roles, permissions, and contact info in a structured format.</span>
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
          {/* <div className=" flex  justify-between p-[5px] mb-3">
            <div>
              <h1 className="text-[#F17530] pt-3">Organization Quiz Summary : </h1>
            </div> */}

            <div className="flex justify-between items-center pl-[5px] mb-3">
      
            <div className="flex w-full gap-2 ">
              <span className="text-[#F17530] text-[14px] mr-2">Organization Name</span>
              <span className="text-[#F17530] text-[14px] ">: </span>

  <select
    className="p-2 border text-[12px] border-gray-300 rounded-md"
    value={filters.organization_name}
    onChange={(e) => setFilters({ ...filters, organization_name: e.target.value })}
  >
    <option value="">All</option>
    {getUniqueOptions("organization_name").map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>

  </div>
      
              <div className="flex">
                <input
                  type="search"
                  className="p-1 border-2 border-black rounded-lg bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27currentColor%27%3e%3cpath strokeLinecap=%27round%27 strokeLinejoin=%27round%27 strokeWidth=%272%27 d=%27M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z%27 /%3e%3c/svg%3e')] bg-no-repeat bg-left-3 bg-center"
                  placeholder="search"
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
       
          <div className=" overflow-x-hidden">
          {filteredData.length > 0 ? (
        <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg border-spacing-y-2 overflow-hidden">
          <thead className="bg-[#CBF2FB]">
            <tr className="text-[14px]">
            <th className="py-2 px-4 border-b">Org ID</th>
              <th className="py-2 px-4 border-b">Organization Name</th>
              <th className="py-2 px-4 border-b">Total Quizzes</th>
              <th className="py-2 px-4 border-b">Total Attempts</th>
              <th className="py-2 px-4 border-b">Average Score</th>
              <th className="py-2 px-4 border-b">Top Performing Quiz</th>
              <th className="py-2 px-4 border-b">Least Attempted Quiz</th>
              <th className="py-2 px-4 border-b">Quiz Master Count</th>
              <th className="py-2 px-4 border-b">Engagement Rate %</th>

              <th className="py-2 px-4 border-b">Easy %</th>
              <th className="py-2 px-4 border-b">Medium %</th>
              <th className="py-2 px-4 border-b">Hard %</th>
              <th className="py-2 px-4 border-b">Top Performing Department %</th>

            </tr>
          </thead>
          <tbody>
          {filteredData.map((quiz, index) => (
            <tr  key={index}  className="bg-white hover:bg-gray-100 active:bg-green-200 text-[12px]">
               <td className="py-2 px-2 border-b text-center text-nowrap">{quiz.org_id}</td>
              <td className="py-2 px-4 border-b text-start">{quiz.organization_name}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.total_quizzes}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.total_attempts}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.average_score !== null ? quiz.average_score : "N/A"}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.top_performing_quiz !== null ? quiz.top_performing_quiz : "N/A"}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.least_attempted_quiz !== null ? quiz.least_attempted_quiz : "N/A"}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.quiz_master_count}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.engagement_rate !== null ? quiz.engagement_rate : "N/A"}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.easy_percentage !== null ? `${quiz.easy_percentage}%` : "N/A"}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.medium_percentage !== null ? `${quiz.medium_percentage}%` : "N/A"}</td>
              <td className="py-2 px-4 border-b text-center">{quiz.hard_percentage !== null ? `${quiz.hard_percentage}%` : "N/A"}              </td>
              <td className="py-2 px-4 border-b text-center">{quiz.top_performing_department !== null ? `${quiz.top_performing_department}%` : "N/A"}</td>

            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
       
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

export default superadminquizsummary;
