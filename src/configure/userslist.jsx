import React, { useEffect } from "react";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from "react";
import Select from 'react-select';
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png";
import Delete from "../../src/assets/Images/Assets/Delete.png";
import Line from "../../src/assets/Images/Assets/Line.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'
import close from "../../src/assets/Images/images/dashboard/cancel.png"
// import searchIcon from "../assets/Images/images/dashboard/Search.png";

const userslist = () => {

  const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
  
    const userId = localStorage.getItem("user_id");
    const orgId = localStorage.getItem('org_id');
    const userRole = localStorage.getItem("user_role");

    const [username1, setUsername1] = useState("");
    const [orgName, setOrgName] = useState(""); // State to store the organization name


    const handleBack = () => {
      navigate("/configure")
    };

useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    setUsername1(storedUsername);
  }
}, []);
const [errorMessage, setErrorMessage] = useState("");

const fetchOrganizationUsers = async () => {
    try {
      const authToken = localStorage.getItem("authToken"); // Get the token from localStorage
      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `https://dev.quizifai.com:8010/get_organization_nrml_usrs?org_id=${orgId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: "", // Empty body as per the cURL request
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.response === "success") {
        setUsers(data.data);
        setOrgName(data.data[0].org_name); // Assuming `data.data` contains the users
      } else {
        setError(data.response_message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError(error.message || "An error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchOrganizationUsers();
  }, []);

  

    // --------------***view image*** -------------- //
const [photo, setPhoto] = useState(''); // State to store the image URL
const [loading, setLoading] = useState(true); 
// const [error, setError] = useState(null);

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

  return (
    <>
      <div className="flex w-full font-Poppins">
        <Navigation />
        <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
          <img src={close} alt="" className="w-[25px] h-[25px]" />
        </div>
        <div className="container mx-auto p-6">
        {/* <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530] font-bold">Users List</h1>
          </div> */}
            <div className="">
      <h1 className="text-center text-[24px] font-bold text-[#F17530]">Users List</h1>
    </div>
    {userRole === 'Admin' && (
      <div className="flex justify-between gap-2 mb-2 items-center">
        <div className="flex items-center gap-2 justify-center">
        <div
                  className="rounded-full w-[80px]  h-[80px]"

                >
                 
                    <img
                      className="w-[80px] h-[80px] rounded-2xl"
                      src={photo}
                      alt="Default"
                    />
                
                </div>

                <div className=" font-bold text-[#214082]">
                  <span className="text-[14px]">Welcome </span>
                  <span className="text-[14px]">
                    {username1.charAt(0).toUpperCase() + username1.slice(1)}
                  </span>
                  <br />
                  <span className="text-[14px]">User ID : </span>
                  <span className=" font-normal text-[12px]">{userId}</span>
                  <br />
                  <span className="text-[14px] ">Organization ID : </span>
                  <span className=" font-normal text-[12px]">{orgId}</span>
                  <br />
                  <span className="text-[14px]">Organization Name : </span>
                  <span className=" font-normal text-[12px]">{}</span>
                </div>
        </div>
        <div>
        <div className="flex">
                <input
                  type="search"
                  className="p-1 border-2 border-black rounded-lg bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27currentColor%27%3e%3cpath strokeLinecap=%27round%27 strokeLinejoin=%27round%27 strokeWidth=%272%27 d=%27M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z%27 /%3e%3c/svg%3e')] bg-no-repeat bg-left-3 bg-center"
                  placeholder="search"
                //   value={searchTerm}
                //   onChange={handleSearchChange}
                />
                <img
                  className="h-4 w-4 relative top-[9px] right-9"
                  src={searchIcon}
                  alt="search icon"
                />
              </div>
        </div>
               
                </div>
    )}
    


      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* <div className="flex gap-3 border-2 px-2 py-2 bg-[#DCFCE7] text-[#214082] w-full">
              <div>
                  <div>
                    <span>Organization ID  </span>
                    <span className="pl-[70px] font-normal"> : {orgId}</span>
                  </div>

                  <div>
                    <span>Organization Name </span>
                    <span className="pl-[45px] font-normal">
                      <span className="font-bold">:</span> {orgName}
                    </span>
                   </div>

                  <div className="text-nowrap">
                    <span>Organization description </span>
                    <span className="pl-[8px] font-normal">
                      <span className="font-bold">:</span> Narmtech
                    </span>
                  </div> 

                  <div>
                    <span>Admin Name </span>
                    <span className="pl-[91px] font-normal">
                      <span className="font-bold">:</span> {username1}
                    </span>
                  </div>
                </div>

              </div> */}
      <table className="min-w-full bg-white border border-gray-300 shadow mt-4 rounded-lg">
        <thead className="bg-[#CBF2FB]">
          <tr className="bg-[#CBF2FB] text-left">
            <th className="py-2 px-4 border-b text-[#214082]">User ID</th>
            <th className="py-2 px-4 border-b text-[#214082] text-center">Name</th>
            <th className="py-2 px-4 border-b text-[#214082] text-center">Email</th>
            <th className="py-2 px-4 border-b text-[#214082]">Active Status</th>
            <th className="py-2 px-4 border-b text-[#214082]">Role Name</th>
            <th className="py-2 px-4 border-b text-[#214082]">Organization Name</th>
            <th className="py-2 px-4 border-b text-[#214082]">Edit/Delete</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="bg-white hover:bg-gray-100 active:bg-green-200 text-[12px]">
              <td className="py-2 px-4 border-b text-[#214082]">{user.user_id}</td>
              <td className="py-2 px-4 border-b text-[#214082] text-center">{user.user_name}</td>
              <td className="py-2 px-4 border-b text-[#214082] text-center">{user.user_email}</td>

              <td className="py-2 px-4 border-b text-[#214082] text-center">
                {user.active_status ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </td>
              <td className="py-2 px-4 border-b text-[#214082]">{user.role_name}</td>
              <td className="py-2 px-4 border-b text-[#214082]">{user.org_name}</td>
              <td className="h-full border-b text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline">
                    <img
                      className="h-[13px] w-[13px] mr-1 cursor-pointer"
                      src={Edit}
                      alt="Edit"
                      onClick={() => handleEdit(group)}
                    />
                    <button className="flex text-orange-500 w-[30px] h-[30px]">
                      <RiDeleteBinLine />
                    </button>
                  </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
{/* 
        <LogoutBar /> */}
      </div>
    </>
  );
};

export default userslist;
