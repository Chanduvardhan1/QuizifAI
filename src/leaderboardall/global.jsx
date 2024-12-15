import React, { useEffect ,useState} from 'react'
import Navigation from "../navbar/navbar.jsx"
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'




const global = () => {
  
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [quizNames, setQuizNames] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const orgId = localStorage.getItem('org_id');

  
    useEffect(() => {
      const fetchLeaderboard = async () => {
        try {
          const response = await fetch('https://dev.quizifai.com:8010/leaderboard_result_for_admin', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDaGFuZHUgVmFyZGhhbiBLIiwiZXhwIjoyNTM0MDIzMDA3OTl9.y5r49Zue79xvpjtCV8oIPw4Pijv12lB4GFBBP1thrS8',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ org_id: orgId }),
          });
  
          const data = await response.json();
  
          if (data.response === 'success') {
            setLeaderboardData(data.data);
            setFilteredData(data.data);
            const uniqueQuizNames = Array.from(new Set(data.data.map(item => item.quiz_name)));
            setQuizNames(uniqueQuizNames);
          } else {
            console.error('Error fetching leaderboard data:', data.response_message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchLeaderboard();
    }, []);
  
    const handleQuizFilter = (quizName) => {
      setSelectedQuiz(quizName);
      if (quizName) {
        const filtered = leaderboardData.filter(item => item.quiz_name === quizName);
        setFilteredData(filtered);
      } else {
        setFilteredData(leaderboardData);
      }
    };
    


  return (
    <>
    <div className='w-full '>
   <div className='mb-2'>
    <h1 className=' text-[20px] text-[#214082] font-semibold underline'>Gobal level leaderboard</h1>
   </div>
   <div className='flex gap-[10px] w-[40%] h-10'>
   <select
          className="w-full border border-gray-300 px-2 py-1"
          value={selectedQuiz}
          onChange={(e) => handleQuizFilter(e.target.value)}
        >
          <option value="">Select Quiz</option>
          {quizNames.map((quiz, index) => (
            <option key={index} value={quiz}>{quiz}</option>
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



<div class=" p-4">
    <div class="container mx-auto">
        {/* <h1 class="text-2xl font-bold text-center mb-6">Rank Table</h1> */}
        <div class="overflow-x-auto">
        <table className="table-auto w-full text-[#214082] border-collapse border border-gray-200">
            <thead className="bg-[#CBF2FB]">
              <tr className="text-[14px]">
                <th className="border-b px-4 py-2">Rank</th>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Score</th>
                <th className="border-b px-4 py-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">{user.rank}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.user_name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{user.total_score}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">
                    {user.attained_percentage >= 90
                      ? 'A'
                      : user.attained_percentage >= 80
                      ? 'B'
                      : user.attained_percentage >= 70
                      ? 'C'
                      : 'D'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
</div>




    </div>
    </>
    
    

    
  )
}

export default global