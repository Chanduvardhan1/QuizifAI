import React, { useEffect } from 'react'
import Navigation from "../navbar/navbar.jsx"
import defaultPhoto from '../../src/assets/Images/dashboard/empty image.png'




const institution = () => {
  
 
    


  return (
    <>
    <div className='w-full '>
   <div className='mb-2'>
    <h1 className=' text-[20px] text-[#214082] font-semibold'>Institution level leaderboard</h1>
   </div>
   <div className='flex gap-[10px] w-[40%] h-10'>
   <select
                  className="w-full border-[1px]  "
                //   value={questionType}
                //   onChange={(e) => setQuestionType(e.target.value)}
        >
               <option value="" disabled>
              Select Class
            </option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
        
        </select> 
        <select
                  className="w-full border-[1px]  "
                //   value={questionType}
                //   onChange={(e) => setQuestionType(e.target.value)}
        >
               <option value="" disabled>
              Subjects  
            </option>
            <option value="Subjects">Subjects</option>
            <option value="Subjects">Subjects</option>
            <option value="Subjects">Subjects</option>
        
        </select> 
   </div>
   <div className='flex justify-center gap-[15px]'>
    <div className='flex flex-col justify-center items-center pt-[30px]'>
        <p>2</p>
        <img src={defaultPhoto} alt="" className=' w-[100px] h-[100px] rounded-[50px]'/>
        <p className='text-[#214082]'>90%</p>
    </div>
    <div className='flex flex-col justify-start items-center '>
        <p>1</p>
        <img src={defaultPhoto} alt="" className=' w-[100px] h-[100px] rounded-[50px]'/>
        <p className='text-[#214082]'>95%</p>
    </div>
    <div className='flex flex-col justify-end items-center'>
        <p>3</p>
        <img src={defaultPhoto} alt="" className=' w-[100px] h-[100px] rounded-[50px]'/>
        <p className='text-[#214082]'>80%</p>
    </div>
   </div>



<div class=" p-4">
    <div class="container mx-auto">
        {/* <h1 class="text-2xl font-bold text-center mb-6">Rank Table</h1> */}
        <div class="overflow-x-auto">
            <table class="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-300 px-4 py-2 text-[#214082]">Rank</th>
                        <th class="border border-gray-300 px-4 py-2 text-[#214082]">Name</th>
                        <th class="border border-gray-300 px-4 py-2 text-[#214082]">Score</th>
                        <th class="border border-gray-300 px-4 py-2 text-[#214082]">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white hover:bg-gray-100">
                        <td class="border border-gray-300 px-4 py-2 text-center">4</td>
                        <td class="border border-gray-300 px-4 py-2">John Doe</td>
                        <td class="border border-gray-300 px-4 py-2 text-center">95</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">A</td>
                    </tr>
                    <tr class="bg-gray-50 hover:bg-gray-100">
                        <td class="border border-gray-300 px-4 py-2 text-center">5</td>
                        <td class="border border-gray-300 px-4 py-2">Jane Smith</td>
                        <td class="border border-gray-300 px-4 py-2 text-center">89</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-green-500 font-bold">B</td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-100">
                        <td class="border border-gray-300 px-4 py-2 text-center">6</td>
                        <td class="border border-gray-300 px-4 py-2">Michael Brown</td>
                        <td class="border border-gray-300 px-4 py-2 text-center">75</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-yellow-500 font-bold">C</td>
                    </tr>
                    <tr class="bg-gray-50 hover:bg-gray-100">
                        <td class="border border-gray-300 px-4 py-2 text-center">7</td>
                        <td class="border border-gray-300 px-4 py-2">Emily Davis</td>
                        <td class="border border-gray-300 px-4 py-2 text-center">60</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-red-500 font-bold">D</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>




    </div>
    </>
    
    

    
  )
}

export default institution