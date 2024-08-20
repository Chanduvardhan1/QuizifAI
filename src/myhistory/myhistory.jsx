import React from "react";
import Navigation from "../navbar/navbar";
import LogoutBar from "../logoutbar/logoutbar";
import { useEffect,useState } from "react";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import profileimg from "../assets/Images/images/profile/profileImage.png";
const myhistory = () => {
  const [userName, setUserName] = useState("");
  const [globalRank, setGlobalRank] = useState("");
  const [globalScore, setGlobalScore] = useState("");
  const [noOfQuizzes, setNoOfQuizzes] = useState("");
  const [noOfMinutes, setNoOfMinutes] = useState("");
  const [NoOfScore, setNoOfScore] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  useEffect(() => {
    const fetchQuizData = async () => {
      console.log("User ID:", userId);     
      try {
        const authToken = localStorage.getItem('authToken'); // Get the auth token from localStorage

        if (!authToken) {
          throw new Error('No authentication token found');
        }
        const response = await fetch(
          `https://dev.quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              user_id: userId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data:", data);

         // Debugging audit_details
      console.log("Audit Details:", data.data[0].audit_details);

        const userDetails = data.data[0].audit_details;
        if (userDetails && userDetails.full_name) {
        setUserName(userDetails.full_name);
        setGlobalRank(userDetails.global_score_rank);
        setGlobalScore(userDetails.global_score);
        console.log("User Name set to:", userDetails.full_name);
      } else {
        console.error("User details not found or full_name is missing");
      }

      const userMetrics = data.data[0].user_metrics;
      setNoOfQuizzes(userMetrics.countofquizes);
      setNoOfMinutes(userMetrics.total_minutes);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId]);

  return (
    <>
    <div className="flex w-full">
   < Navigation/>
    <div className="w-full p-[10px] text-[14px] font-Poppins text-[#214082] font-bold">
      <div className="flex justify-center p-[5px] text-[24px]">
       <h1 className="text-[#F17530]">My History</h1>
      </div>
      
      <div className=" flex justify-between py-[20px] my-[10px]">
      <div className="flex flex-col gap-5">

<div className="flex gap-3">
  <img className="h-14 w-14" src={profileimg} alt="profile icon"/>
  <div className="mt-2">
<span className="text-[13px]">Welcome </span>
<span className="text-[13px]">{userName || ""}</span><br/>
<span className="text-[13px]">User id : </span>
<span className=" font-normal text-[12px]">{userId}</span>
</div>
</div>        

<div>
<span>Total no.of  Attempts : </span>
<span className=" font-normal">10</span>
</div>

<div className="-mt-4">
<span>Total no.of Quizzes </span>
<span className="pl-[14px]">: {noOfQuizzes}</span>
</div>

<div className="-mt-4">
<span>Total no.of min </span>
<span className="pl-[41px]">: {noOfMinutes}</span>
</div>

<div className="-mt-4">
<span>Total no.of score </span>
<span className="pl-[30px]">: 10</span>
</div>

      </div>
      <div>
  <div  className="flex flex-col gap-5 relative right-[300px]">
<div className="mt-20">
<span>Global Rank </span>
<span className="pl-1">: {globalRank}</span>
</div>

<div className="-mt-4">
<span>Global score </span>
<span className="pl-[2px]">: {globalScore}</span>
</div>
</div>

<div className="flex flex-col gap-5 -mt-[47px] mr-6">
<div className="flex">
<span>Complexity </span>
<span className=" font-normal"><p className="text-normal"><span className="pl-1 font-bold">:</span> Simple <span className="pl-[20px]">-1</span></p>
<p className="pl-3">Moderate -2</p>
<p className="pl-3">Complex <span className="pl-[6px]">-2</span></p>
</span>
</div>
<div className="flex">
<span className="pl-5">Pass/Fail : </span>
<span className=" font-normal pl-1"><p> Pass-1</p>
<p className="">Fail-2</p>

</span>
</div>
      </div>

      </div>
      </div>
      <div className=" flex  justify-between p-[5px] mb-3">
        <div>
        <h1 className="text-[#F17530]">Quizzes History : </h1>
        </div>
       
<div className="flex gap-[5px] justify-center items-center">
<input type="search" 
       className="p-1 border-2 border-black rounded-lg bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27currentColor%27%3e%3cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z%27 /%3e%3c/svg%3e')] bg-no-repeat bg-left-3 bg-center" 
       placeholder="search"/>

<span className="text-[#F17530]">Sort by : </span>
<span>
    <select name="" id="">
        <option value="latest">Latest</option>
        <option value="ThisMonth">ThisMonth</option>
        <option value="ThisWeek">ThisWeek</option>

    </select>
</span>
</div>
      </div>
      <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
            <tr>
                <th className="py-2 px-4 border-b">So.no</th>
                <th className="py-2 px-4 border-b">Month</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Quiz Title</th>
                <th className="py-2 px-4 border-b">Rank</th>
                <th className="py-2 px-4 border-b">Pass %</th>
                <th className="py-2 px-4 border-b">Duration</th>
                <th className="py-2 px-4 border-b">Pass/Fail</th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">1</td>
                <td className="py-2 px-4 border-b text-center">Jan</td>
                <td className="py-2 px-4 border-b text-center">1:00 pm</td>
                <td className="py-2 px-4 border-b">Manthamatics</td>
                <td className="py-2 px-4 border-b text-center">1</td>
                <td className="py-2 px-4 border-b text-center">70</td>
                <td className="py-2 px-4 border-b text-center">2 min</td>
                <td className="py-2 px-4 border-b text-center">pass</td>
            </tr>
        </tbody>
    </table>
</div>
    </div>
    <LogoutBar/>
    </div>
    </>
  );
};

export default myhistory;
