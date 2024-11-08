
import React from 'react';

export default function SegmentedProgressIndicator({
    progress =92,
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

    return (
        <div className="relative flex flex-col items-center justify-center bg-white rounded-sm ">
            <span className="text-sm text-[#214082] font-semibold mb-2">
                Weekly Progress
            </span>
            
<div class="flex items-center">
  <div class="bg-green-600 text-white py-2 px-2 rounded-l-lg">Step 1</div>
  <div class="bg-green-500 text-white py-2 px-2 -ml-2">Step 2</div>
  <div class="bg-green-400 text-white py-2 px-2 rounded-r-lg -ml-2">Step 3</div>
</div>
            <svg className="w-32 h-32" viewBox="0 0 100 100">
                {/* Loop through each segment and render them */}
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
                                    : "#4ade80" // Gray for empty segments
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

                {/* Progress text */}
                <text 
                    x="50"
                    y="50" // Centering the text vertically
                    fontSize="14" // Font size for the text
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="#214082"
                >
                    {progress}%
                </text>
            </svg>
            <span className="text-sm text-[#FF6701] font-medium mt-2">
                {tasksCompleted}/{totalTasks} Quizzes Done
            </span>
        </div>
    );
}











