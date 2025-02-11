import React, { useEffect ,useState} from 'react'
import Navigation from "../navbar/navbar.jsx"
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'




const quizmasterleaderboard = () => {
  
    const orgId = localStorage.getItem('org_id');
    const [leaderboardData, setLeaderboardData] = useState([]); // Data for table
    const [filteredData, setFilteredData] = useState([]); // Filtered data
    const [quizNameFilter, setQuizNameFilter] = useState(""); // Quiz Name filter
    const [createdByFilter, setCreatedByFilter] = useState(""); // Created By filter
  
    // Fetch leaderboard data
    useEffect(() => {
      const fetchLeaderboard = async () => {
        try {
          const authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage
  
          if (!authToken) {
            throw new Error("No authentication token found");
          }
          const response = await fetch(
            "https://dev.quizifai.com:8010/leaderboard_result_for_admin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({ org_id: orgId }),
            }
          );
          const result = await response.json();
          if (result.response === "success") {
            const data = result.data.formatted_results || [];
            setLeaderboardData(data);
            setFilteredData(data); // Initialize with all data
          } else {
            console.error(result.response_message || "Failed to fetch data.");
          }
        } catch (error) {
          console.error("Error fetching leaderboard data:", error);
        }
      };
  
      fetchLeaderboard();
    }, []);
    useEffect(() => {
        const filtered = leaderboardData.filter(
          (entry) =>
            (quizNameFilter === "" || entry.quiz_name === quizNameFilter) &&
            (createdByFilter === "" || entry.created_by === createdByFilter)
        );
        setFilteredData(filtered);
      }, [quizNameFilter, createdByFilter, leaderboardData]);
    
    


  return (
    <>
    <div className='w-full '>
   {/* <div className='mb-2'>
    <h1 className=' text-[20px] text-[#214082] font-semibold underline'>Gobal level leaderboard</h1>
   </div> */}
   <div className='flex gap-[10px] w-[40%] h-10'>
   <select
   placeholder="Select Quizzes"
        className="w-full border-[1px]"
        value={createdByFilter}
        onChange={(e) => setCreatedByFilter(e.target.value)}
      >
        <option value="">All Quiz Masters</option>
        {[...new Set(leaderboardData.map((entry) => entry.created_by))].map((creator, index) => (
          <option key={index} value={creator}>
            {creator}
          </option>
        ))}
      </select>
     
   </div>
   {/* <div className='flex justify-center gap-[15px]'>
    <div className='flex flex-col justify-center items-center pt-[30px]'>
        <p>2</p>
        <img src={defaultPhoto} alt="" className=' w-[100px] h-[100px] rounded-[50px]'/>
        <p>90%</p>
    </div>
    <div className='flex flex-col justify-start items-center '>
        <p>1</p>
        <img src={defaultPhoto} alt="" className=' w-[100px] h-[100px] rounded-[50px]'/>
        <p>95%</p>
    </div>
    <div className='flex flex-col justify-end items-center'>
        <p>3</p>
        <img src={defaultPhoto} alt="" className=' w-[100px] h-[100px] rounded-[50px]'/>
        <p>80%</p>
    </div>
   </div> */}



<div class="py-4">
    <div class="container mx-auto">
        {/* <h1 class="text-2xl font-bold text-center mb-6">Rank Table</h1> */}
        <div class="overflow-x-auto">
        <table className="table-auto w-full text-[#214082] border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#CBF2FB]">
              <th className="border-b px-4 py-2">Rank</th>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Score</th>
              <th className="border-b px-4 py-2">Quiz Name</th>
              <th className="border-b px-4 py-2">Grade</th>
              <th className="border-b px-4 py-2">Pass/Fail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white hover:bg-gray-100 text-[#00084]" : "bg-gray-50 hover:bg-green-200 "}
                >
                  <td className="border-b  px-4 py-2 text-center">{entry.rank}</td>
                  <td className="border-b px-4 py-2 text-cente">{entry.user_name}</td>
                  <td className="border-b  px-4 py-2 text-center">{entry.total_score}</td>
                  <td className="border-b  px-4 py-2 text-cente">{entry.quiz_name}</td>
                  <td className="border-b  px-4 py-2 text-center">{entry.quiz_grade}</td>
                  <td
                    className={`border-b px-4 py-2 text-center ${
                      entry.pass_flag ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {entry.pass_flag ? "Pass" : "Fail"}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
    </div>
</div>





    </div>
    </>
    
    

    
  )
}

export default quizmasterleaderboard