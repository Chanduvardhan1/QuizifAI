
import React from 'react';

export default function ProgressIndicator({
    progress = 82,
    tasksCompleted = 4,
    totalTasks = 5,
}) {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const progressPointX = 50 + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2);
    const progressPointY = 50 + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2);

    return (
        <div className="ml-[-156%] w-48 h-[262px] mt-[9px] relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
            {/* <span className="text-sm text-Prussian Blue font-500">Weekly Progress</span> */}
            <span className="text-sm text-[#214082] font-semibold">
                Weekly Progress
            </span>
            <svg className="w-40 h-40" viewBox="0 0 100 100">
                <circle
                    className="text-gray-200"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                />
                <circle
                    className="text-primary"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="#90EE90"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                    style={{
                        transformOrigin: '50% 50%',
                        transform: 'rotate(-90deg)',
                        transition: 'stroke-dashoffset 0.5s ease-in-out',
                    }}
                />
                <circle
                    cx={progressPointX}
                    cy={progressPointY}
                    r="5"
                    fill="#90EE90"
                />
                <text x="50" y="55" fontSize="20" fontWeight="bold" textAnchor="middle">
                    {progress}%
                </text>
            </svg>
            <span className="text-sm text-[#FF6701] font-500">{tasksCompleted}/{totalTasks} Quizzes Done</span>
        </div>
    );
}








