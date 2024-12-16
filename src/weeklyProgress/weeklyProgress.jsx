
import React from 'react';

export default function SegmentedProgressIndicator({
    progress = 92,
 
}) {
   
    const getProgressColor = (progress) => {
        if (progress <= 35) return "#ff2c2c"; // Red
        if (progress <= 50) return "#ff7900"; // Yellow
        if (progress <= 70) return "#FFFF00"; // Orange
        if (progress <= 85) return "#90EE91"; // Light Green
        return "#00ab00"; // Green
    };
    const getProgressLabel = (progress) => {
        if (progress <= 35) return "Very Poor";
        if (progress <= 50) return "Poor";
        if (progress <= 70) return "Average";
        if (progress <= 85) return "Good";
        return "Excellent";
    };

    const progressColor = getProgressColor(progress);
    const progressLabel = getProgressLabel(progress);

    // const radius = 45; // Set the radius
    // const circumference = 2 * Math.PI * radius; // Calculate circumference
    // const strokeDashoffset = circumference - (progress / 100) * circumference; // Calculate offset based on progress

    // const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2; // Adjust angle to start at the top
    // const progressPointX = 50 + radius * Math.cos(angle); // X position
    // const progressPointY = 50 + radius * Math.sin(angle); // Y position

    // Function to get the stroke color based on progress
    // const getStrokeColor = (progress) => {
    //     if (progress <= 35) return "#ff2c2c"; // Red
    //     if (progress > 35 && progress <= 50) return "#ff7900"; // Yellow
    //     if (progress > 50 && progress <= 70) return "#FFFF00"; // Orange
    //     if (progress > 70 && progress <= 85) return "#90EE91"; // Light Green
    //     return "#00ab00"; // Green
    // };

    // const strokeColor = getStrokeColor(progress);

 
    return (
        <div className="relative flex flex-col items-center  bg-white rounded-sm ">
            {/* <span className="text-sm text-[#214082] font-semibold mb-2">
                Weekly Progress
            </span> */}
            
{/* <div class="flex items-center gap-1">
  <div class="bg-green-600 text-white py-2 px-2 rounded-lg">Step 1</div>
  <div class="bg-green-500 text-white py-2 px-2 rounded-lg">Step 2</div>
  <div class="bg-[#6fb044] text-white py-2 px-2 rounded-lg">Step 3</div>
</div> */}
<div className='flex flex-col w-full px-5 items-center '>
    
        <div className='flex w-full flex-col gap-1 justify-between mt-1'>

           <div className='flex flex-col gap-2'>
            <h1 className='text-[#002366] text-[14px]'>Assigned Quizzes <span className=' ml-[21px]'>:</span> <span className='text-[#FF6701]'>10</span></h1>
            <h1 className='text-[#002366] text-[14px]'>Incompleted Quizzes : <span className='text-[#FF6701]'>5</span></h1>
            <h1 className='text-[#002366] text-[14px]'>5/10 Quizzes Done</h1>
           </div>


            {/* <div className='flex  gap-2 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='text-[10px] text-[#214082]'>0-35%</div>

                <div className='w-[50px] h-[1px] bg-[#ff2c2c]'></div>
                    </div>
                <div className='w-[50px] text-[10px] text-[#ff2c2c]'>Very poor</div>

               
            </div>

            <div className='flex  gap-2 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='text-[10px] text-[#214082]'>35%-50%</div>

                <div className='w-[50px] h-[1px] bg-[#ff7900]'></div>
                    </div>
                <div className='w-[50px] text-[10px] text-[#ff7900]'>Poor</div>

               
            </div>
            <div className='flex  gap-2 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='text-[10px] text-[#214082]'>50%-70%</div>

                <div className='w-[50px] h-[1px] bg-[#FFFF00]'></div>
                    </div>
                <div className='w-[50px] text-[10px] text-[#FFFF00]'>Fair</div>

               
            </div>
            <div className='flex  gap-2 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='text-[10px] text-[#214082]'>70%-85%</div>

                <div className='w-[50px] h-[1px] bg-[#90EE91]'></div>
                    </div>
                <div className='w-[50px] text-[10px] text-[#90EE91]'>Good</div>

               
            </div>
            <div className='flex  gap-2 justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                    <div className='text-[10px] text-[#214082]'>85%-100%</div>

                <div className='w-[50px] h-[1px] bg-[#00ab00]'></div>
                    </div>
                <div className='w-[50px] text-[10px] text-[#00ab00]'>Excellent</div>

               
            </div> */}


            {/* <div className='flex flex-col justify-center items-center'>
                <div className='w-full h-[1px]  bg-[#ff7900]'></div>
                <div className='text-[10px]'>35%-50%</div>
                <div className='text-[10px] text-[#ff7900]'>poor</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-full h-[1px] bg-[#FFFF00]'></div>
                <div className='text-[10px]'>50%-70%</div>
                <div className='text-[10px] text-[#FFFF00]'>Fair</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-full h-[1px] bg-[#90EE91]'></div>
                <div className='text-[10px]'>70%-85%</div>
                <div className='text-[10px] text-[#90EE91]'>Good</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-full h-[1px]  bg-[#00ab00]'></div>
                <div className='text-[10px]'>85-100%</div>
                <div className='text-[10px] text-[#00ab00]'>Excellent</div>
            </div> */}
        </div>
        <div className="flex flex-col items-center w-full mt-1 space-y-4">
            {/* Progress bar container */}
            <div className="w-full max-w-lg bg-gray-200 h-4 rounded-lg relative">
                {/* Progress bar */}
                <div
                    className="h-4 rounded-lg"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progressColor,
                        transition: "width 0.5s ease-in-out",
                    }}
                ></div>
            </div>
            {/* Progress percentage and label */}
            <div className="text-center">
                <h1
                    className="text-lg font-bold"
                    style={{ color: progressColor }} // Dynamic text color
                >
                    {progress}%
                </h1>
                <h2
                    className="text-xl font-medium"
                    style={{ color: progressColor }} // Dynamic label color
                >
                    {progressLabel}
                </h2>
            </div>
        </div>
        </div>
            {/* <span className="text-sm text-[#FF6701] font-medium mt-2">
                {tasksCompleted}/{totalTasks} Quizzes Done
            </span> */}
        </div>
    );
}











