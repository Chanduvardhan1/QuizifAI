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


const InternshipUsers= () => {
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


  const [quizMasters, setQuizMasters] = useState([]);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFirstName, setSelectedFirstName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPlan, setSelectedPlan] = useState('Public');

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://dev.quizifai.com:8010/all-internshipsubscription-users-details/",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDaGFuZHUgVmFyZGhhbiBLIiwiZXhwIjoyNTM0MDIzMDA3OTl9.5ilMoE-Jx72u-SPkaf853jN5VZIO0GzzlVjxJndnc-s",
            },
          }
        );

        const data = await response.json();
        if (data.response === "success") {
          setUsers(data.data);
          setFilteredUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle filter changes
  const handleFilterChange = () => {
    let filtered = users;

    if (selectedCourse) {
      filtered = filtered.filter((user) => user.course === selectedCourse);
    }

    if (selectedSemester) {
      filtered = filtered.filter(
        (user) => user.pursuing_semester === selectedSemester
      );
    }

    if (selectedClass) {
      filtered = filtered.filter((user) => user.specialization === selectedClass);
    }

    setFilteredUsers(filtered);
  };

  // Apply filters when dropdown values change
  useEffect(() => {
    handleFilterChange();
  }, [selectedCourse, selectedSemester, selectedClass]);

  // Extract unique values for dropdowns
  const uniqueFirstNames = [...new Set(users.map((user) => user.first_name))];
  const uniqueEmails = [...new Set(users.map((user) => user.user_email))];
  const uniqueRoles = [...new Set(users.map((user) => user.user_role))];
  const uniqueOrganizations = [...new Set(users.map((user) => user.organization_name))];

  // Filter users based on dropdown selection and search
  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);




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


const handleBack = () => {
  navigate("/repoarts")
};

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
            <h1 className="text-[#F17530]">Organization All Users</h1>
          </div> */}
     <div className="flex justify-start items-center p-[5px] text-[14px]">
                <span className="text-[#F17530]">Title</span>
                <span className="text-[#F17530] ml-[49px]"> : </span>

              <span className="text-[#214082] text-[12px] ml-2">Subscribers Reports</span>
            </div>
            <div className="flex justify-start items-center p-[5px] text-[14px]">
                <span className="text-[#F17530]">Description : </span>
              <span className="text-[#214082] ml-2  text-[12px]">Retrieves all user subscription details for Public, Premium Lite, Premium, Organization Access, and NTPL Internship plans, including user info, status, and validity.</span>
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
            {/* <div>
              <h1 className="text-[#F17530] pt-3">Organization All Users : </h1>
            </div> */}

            <div className="flex gap-[5px] pl-[5px] justify-center items-center mb-4">
       
            <div className="flex w-full gap-2 mb-4">
        <span className="text-[#F17530] text-[14px]">Course:</span>
        <select
          className="py-1 px-2 text-[12px] w-[120px] rounded-md border"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {[...new Set(users.map((user) => user.course))].map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <span className="text-[#F17530] text-[14px]">Semester:</span>
        <select
          className="py-1 px-2 text-[12px] w-[120px] rounded-md border"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          {[...new Set(users.map((user) => user.pursuing_semester))].map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <span className="text-[#F17530] text-[14px]">Class:</span>
        <select
          className="py-1 px-2 text-[12px] w-[120px] rounded-md border"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {[...new Set(users.map((user) => user.specialization))].map((cls) => (
            <option key={cls} value={cls}>
              {cls}
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
            <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg border-spacing-y-2 overflow-hidden">
          <thead className="bg-[#CBF2FB]">
            <tr className="text-[14px]">
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">College</th>
              <th className="py-2 px-4 border-b">University</th>
              <th className="py-2 px-4 border-b">Course</th>
              <th className="py-2 px-4 border-b">Specialization</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Internship Start</th>
              <th className="py-2 px-4 border-b">Internship End</th>
              <th className="py-2 px-4 border-b">Internship Status</th>
              <th className="py-2 px-4 border-b">Subscription Status</th>
              <th className="py-2 px-4 border-b">Subscription Start</th>
              <th className="py-2 px-4 border-b">Subscription End</th>
              <th className="py-2 px-4 border-b">Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100 text-[12px]">
                <td className="py-2 px-4 border-b text-center">{user.user_id || "N/A"}</td>
                <td className="py-2 px-4 border-b text-start">{user.first_name || "N/A"}</td>
                <td className="py-2 px-4 border-b text-start">{user.last_name || "N/A"}</td>
                <td className="py-2 px-4 border-b text-start">{user.user_email || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.user_phone_number || "N/A"}</td>
                <td className="py-2 px-4 border-b text-start">{user.college_name || "N/A"}</td>
                <td className="py-2 px-4 border-b text-start">{user.university_name || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.course || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.specialization || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.pursuing_year || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.pursuing_semester || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.internship_start_date || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.internship_end_date || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.internship_status || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.subscription_status || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.subscription_start_date || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.subscription_end_date || "N/A"}</td>
                <td className="py-2 px-4 border-b text-center">{user.verification_status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
        {/* <LogoutBar /> */}
      </div>
    </>
  );
};

export default InternshipUsers;
