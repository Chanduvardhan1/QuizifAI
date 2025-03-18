import React  ,{ useState, useEffect,useContext } from "react";
import Navigation from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import { AuthContext } from "../Authcontext/AuthContext";



function Topnavbar() {
 
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, authToken,logout } = useContext(AuthContext);

    const [username1, setUsername1] = useState("");
const [email,setEmail] = useState("")
  const [initialLoginData, setInitialLoginData] = useState({});

useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    setUsername1(storedUsername);
  }
}, []);

 useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);
     
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage
  
        if (!authToken) {
          throw new Error("No authentication token found");
        }
  
        // Fetch user profile details
        const response = await fetch("https://dev.quizifai.com:8010/get_prfl_dtls", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            user_id: userId, // Replace with dynamic user ID if required
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user profile details");
        }
  
        const data = await response.json();
  
        if (data.response !== "success") {
          throw new Error("Error in API response");
        }
  
        const userProfileDetails = data.data;
        console.log("User Profile Details:", userProfileDetails);
  
        // Set state with the fetched user profile details
        // setFirstName(userProfileDetails.first_name);
        // setMiddleName(userProfileDetails.middle_name || ""); // Handle null values
        // setLastName(userProfileDetails.last_name);
        // setGender(userProfileDetails.gender);
        // setDob(userProfileDetails.date_of_birth);
        // setDistrict(userProfileDetails.district_name);
        setEmail(userProfileDetails.user_email);
        setMobileNumber(userProfileDetails.user_phone_number);
        // setCountry(userProfileDetails.country_name);
        // setState(userProfileDetails.state_name);
        // setCity(userProfileDetails.location_name);
        // setPostalCode(userProfileDetails.pin_code);
        // setOccupation(userProfileDetails.occupation_name);
        // setOtherccupation(userProfileDetails.other_occupation_name);
        // setrolename(userProfileDetails.role_name);
        // setusertype(userProfileDetails.user_type);
        // setAddressId(userProfileDetails.user_address_id);
        // setAddress(userProfileDetails.user_address_line_1);
        // setAddress1(userProfileDetails.user_address_line_2);
        // setShowOtherInput(userProfileDetails.occupation_name === "Other");

        // Update any other states as needed
        const initialData = {
          firstName: userProfileDetails.first_name,
          middleName: userProfileDetails.middle_name,
          lastName: userProfileDetails.last_name,
          gender: userProfileDetails.gender,
          dob: userProfileDetails.date_of_birth,
          district: userProfileDetails.district_name,
          email: userProfileDetails.user_email,
          mobileNumber: userProfileDetails.user_phone_number,
          country: userProfileDetails.country_name,
          state: userProfileDetails.state_name,
          city: userProfileDetails.location_name,
          postalCode: userProfileDetails.pin_code,
          occupation: userProfileDetails.occupation_name,
          otherOccupation: userProfileDetails.other_occupation_name,
          roleName: userProfileDetails.role_name,
          userType: userProfileDetails.user_type,
          address: userProfileDetails.user_address_line_1,
          address1: userProfileDetails.user_address_line_2,

          addressId: userProfileDetails.user_address_id,
        };
        setInitialLoginData(initialData);
  
        console.log("User Data Initialized:", initialData);
      } catch (error) {
  if (error instanceof SyntaxError) {
        toast.error("A parsing error occurred. Please check your input file.");
      } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("A network error occurred. Please check your internet connection.");
      } else if (error.message.includes("Failed to fetch")) {
        toast.error("Server could not be reached. Please try again later.");
      }     }finally {
        setLoading(false); // Hide loading after API response
      }
    };
  
    fetchQuizData();
  }, [userId]);

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
             if (error instanceof SyntaxError) {
                        toast.error("A parsing error occurred. Please check your input file.");
                      } else if (error.message.includes("NetworkError") || error.message.includes("ERR_INTERNET_DISCONNECTED")) {
                        toast.error("A network error occurred. Please check your internet connection.");
                      } else if (error.message.includes("Failed to fetch")) {
                        toast.error("Server could not be reached. Please try again later.");
                      } else {
                        toast.error("An unexpected error occurred while processing your request. Please try again.");
                      }
        });
    }; 

  return (
    <>
     <div className="w-full bg-[#F5F5FB]">
        <ToastContainer/>
        <div className="flex justify-between items-center p-4">

     
        <div>
            <span className="text-[#214082] font-bold">Welcome  {username1.charAt(0).toUpperCase() + username1.slice(1)}</span>
        </div>
        <div className="flex gap-2">
{/* <button className="flex items-center w-64 outline-none space-x-1 bg-white p-1 rounded-full cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
    <div className="h-6 w-6 bg-indigo-900 rounded-full flex items-center justify-center text-white text-xs">{email ? email.charAt(0).toUpperCase() : "?"}</div>
    <span>{email}</span>

</button> */}
     
        
            <div className="flex flex-col justify-center items-center">
        <img
          src={LogoutIcon}
          onClick={handleBackToLogin}
          alt="Logout Icon"
          className="w-5 h-5 cursor-pointer "
        />
        <p className="text-[#002366] text-[14px]">Logout</p>
        </div>
        </div>
        </div>
     </div>
    </>
  );
}

export default Topnavbar;
