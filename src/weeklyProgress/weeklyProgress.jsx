
import React from 'react';

export default function SegmentedProgressIndicator({
    progress = 92,
    tasksCompleted = 4,
    totalTasks = 5,
}) {
    const radius = 30; // Radius of the circle
    const strokeWidth = 12; // Stroke width, making it smaller
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const segments = 30; // Total number of segments
    const segmentLength = circumference / segments; // Length of each segment

    const filledSegments = Math.round((progress / 100) * segments); // Number of segments to fill

    const segmentsArray = Array.from({ length: segments }, (_, index) => {
        // Assigning colors for segments
        if (index < filledSegments) {
            return "filled"; // Color this segment as filled (progress)
        } else if (index < filledSegments + Math.floor(segments / 3)) {
            return "inProgress"; // Color this segment as in-progress
        } else {
            return "empty"; // Color this segment as empty
        }
    });
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
        <div>
            <svg className="w-20 h-20" viewBox="0 0 100 100">
            {segmentsArray.map((segment, index) => {
                    const angleStart = (index / segments) * 360 - 90; // Starting angle for the segment
                    const angleEnd = ((index + 1) / segments) * 360 - 90; // Ending angle for the segment

                    return (
                        <circle
                            key={index}
                            strokeWidth={strokeWidth}
                            strokeLinecap="line" // Use "line" to create sharp ends for the stroke
                            fill="transparent"
                            r={radius}
                            cx="50"
                            cy="50"
                            stroke={
                                segment === "filled"
                                    ? "#16a34a" // Green for filled segments (Completed)
                                    : segment === "inProgress"
                                    ? "##22c55e" // Yellow for in-progress segments
                                    : "#6fb044" // Gray for empty segments
                            }
                            strokeDasharray={`${segmentLength} ${circumference}`} // Length and gap of each segment
                            strokeDashoffset={-segmentLength * index} // Offset to create the circular segments
                            style={{
                                transformOrigin: "50% 50%",
                                transform: `rotate(${angleStart}deg)`,
                                transition: "stroke-dashoffset 0.5s ease-in-out",
                            }}
                        />
                    );
                })}
                {/* Progress point */}
                {/* <circle cx={progressPointX} cy={progressPointY} r="5" fill={strokeColor} /> */}
                {/* Progress text */}
                <text x="50" y="55" fontSize="20" fontWeight="bold" textAnchor="middle">
                    {progress}%
                </text>
            </svg>
            <h1 className='text-[20px] text-[#00ab00] font-medium' >Excellent</h1>
            </div>
        </div>
            {/* <span className="text-sm text-[#FF6701] font-medium mt-2">
                {tasksCompleted}/{totalTasks} Quizzes Done
            </span> */}
        </div>
    );
}











