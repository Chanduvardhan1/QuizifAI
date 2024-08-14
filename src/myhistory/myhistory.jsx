import React from "react";
import Navigation from "../navbar/navbar";
import LogoutBar from "../logoutbar/logoutbar";
const myhistory = () => {
  return (
    <>
    <div className="flex w-full">
   < Navigation/>
    <div className="w-full p-[10px] text-[14px] font-Poppins text-[#214082] font-bold">
      <div className="flex justify-center p-[5px] text-[24px]">
       <h1>Myhisory</h1>
      </div>
      
      <div className=" flex justify-between py-[20px] my-[10px]">
      <div className="flex flex-col gap-5">
        <div>
<span>User name : </span>
<span className=" font-normal">chandu</span>
</div>
<div>
<span>User id : </span>
<span className=" font-normal">466</span>
</div>
<div>
<span>Total no.of  Attempts : </span>
<span className=" font-normal">10</span>
</div>
<div>
<span>Total no.of Quizzes : </span>
<span className=" font-normal">10</span>
</div>
<div>
<span>Total no.of min : </span>
<span className=" font-normal">10</span>
</div>
<div>
<span>Total no.of score : </span>
<span className=" font-normal">10</span>
</div>

      </div>
      <div>
      <div  className="flex flex-col gap-5">
        <div>
<span>Global Rank : </span>
<span className=" font-normal">1</span>
</div>
<div>
<span>Global score : </span>
<span className=" font-normal">1200</span>
</div>
<div className="flex">
<span>Complexity: </span>
<span className=" font-normal"><p>simple-1</p>
<p>moderate-2</p>
<p>complex-2</p>
</span>
</div>
<div className="flex">
<span >Pass/Fail : </span>
<span className=" font-normal"><p>Pass-1</p>
<p>Fail-2</p>

</span>
</div>
      </div>
      </div>
      </div>
      <div className=" flex  justify-between p-[5px] mb-3">
        <div>
        <h1>Quiz Histoy : </h1>
        </div>
       
<div className="flex gap-[5px] justify-center items-center">
<input type="search" 
       className="p-1 border-0 border-2 border-black rounded-lg" 
       placeholder="search"/>
<span>Sortt by : </span>
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
