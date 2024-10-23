// // import React from 'react'

// // export default function ProgressIndicator({ progress = 82, tasksCompleted = 4, totalTasks = 5 }) {
// //   const radius = 45
// //   const circumference = 2 * Math.PI * radius
// //   const strokeDashoffset = circumference - (progress / 100) * circumference

// //   return (
// //     <div className="w-48 h-48 relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
// //       <svg className="w-full h-full" viewBox="0 0 100 100">
// //         <circle
// //           className="text-gray-200"
// //           strokeWidth="5"
// //           stroke="currentColor"
// //           fill="transparent"
// //           r={radius}
// //           cx="50"
// //           cy="50"
// //         />
// //         <circle
// //           className="text-primary"
// //           strokeWidth="5"
// //           strokeDasharray={circumference}
// //           strokeDashoffset={strokeDashoffset}
// //           strokeLinecap="round"
// //           stroke="url(#gradient)"
// //           fill="transparent"
// //           r={radius}
// //           cx="50"
// //           cy="50"
// //           style={{
// //             transformOrigin: '50% 50%',
// //             transform: 'rotate(-90deg)',
// //             transition: 'stroke-dashoffset 0.5s ease-in-out',
// //           }}
// //         />
// //         <defs>
// //           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //             <stop offset="0%" stopColor="#4ade80" />
// //             <stop offset="100%" stopColor="#fbbf24" />
// //           </linearGradient>
// //         </defs>
// //       </svg>
// //       <div className="absolute flex flex-col items-center">
// //         <span className="text-4xl font-bold">{progress}%</span>
// //         <span className="text-sm text-gray-500 text-[#00233F] font-size-[15px] font-semibold">Weekly progress</span>
// //         <span className="text-xs text-gray-400">
// //           {tasksCompleted}/{totalTasks} Quizzes Done
// //         </span>
// //       </div>
// //     </div>
// //   )
// // }



// // import React from 'react';

// // export default function ProgressIndicator({ progress = 82, tasksCompleted = 4, totalTasks = 5 }) {
// //   const radius = 45;
// //   const circumference = 2 * Math.PI * radius;
// //   const strokeDashoffset = circumference - (progress / 100) * circumference;

// //   return (
// //     <div className="w-48 h-48 relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
// //       <svg className="w-full h-full" viewBox="0 0 100 100">
// //         <circle
// //           className="text-gray-200"
// //           strokeWidth="5"
// //           stroke="currentColor"
// //           fill="transparent"
// //           r={radius}
// //           cx="50"
// //           cy="50"
// //         />
// //         <circle
// //           className="text-primary"
// //           strokeWidth="5"
// //           strokeDasharray={circumference}
// //           strokeDashoffset={strokeDashoffset}
// //           strokeLinecap="round"
// //           stroke="#90EE90" // Changed the stroke color to #EE9090
// //           fill="transparent"
// //           r={radius}
// //           cx="50"
// //           cy="50"
// //           style={{
// //             transformOrigin: '50% 50%',
// //             transform: 'rotate(-90deg)',
// //             transition: 'stroke-dashoffset 0.5s ease-in-out',
// //           }}
// //         />
// //         <defs>
// //           {/* Removed the linearGradient as it's no longer needed */}
// //         </defs>
// //       </svg>
// //       <div className="absolute flex flex-col items-center">
// //         <span className="text-4xl font-bold">{progress}%</span>
// //         <span className="text-sm text-gray-500 text-[#00233F] font-size-[15px] font-semibold">Weekly progress</span>
// //         <span className="text-xs text-gray-400">
// //           {tasksCompleted}/{totalTasks} Quizzes Done
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }





// // import React from 'react';

// // export default function ProgressIndicator({
// //     progress = 82,
// //     tasksCompleted = 4,
// //     totalTasks = 5,
// // }) {
// //     const radius = 45;
// //     const circumference = 2 * Math.PI * radius;
// //     const strokeDashoffset = circumference - (progress / 100) * circumference;
// //     const progressPointX = 50 + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2);
// //     const progressPointY = 50 + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2);

// //     return (
// //         <div className="w-48 h-48 relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
// //             <svg className="w-full h-full" viewBox="0 0 100 100">
// //                 <circle
// //                     className="text-gray-200"
// //                     strokeWidth="5"
// //                     stroke="currentColor"
// //                     fill="transparent"
// //                     r={radius}
// //                     cx="50"
// //                     cy="50"
// //                 />
// //                 <circle
// //                     className="text-primary"
// //                     strokeWidth="4"
// //                     strokeDasharray={circumference}
// //                     strokeDashoffset={strokeDashoffset}
// //                     strokeLinecap="round"
// //                     stroke="#90EE90"
// //                     fill="transparent"
// //                     r={radius}
// //                     cx="50"
// //                     cy="50"
// //                     style={{
// //                         transformOrigin: '50% 50%',
// //                         transform: 'rotate(-90deg)',
// //                         transition: 'stroke-dashoffset 0.5s ease-in-out',
// //                     }}
// //                 />
// //                 <circle
// //                     cx={progressPointX}
// //                     cy={progressPointY}
// //                     r="5"
// //                     fill="#90EE90"
// //                 />
// //             </svg>
// //             <div className="absolute flex flex-col items-center">
// //                 <span className="text-4xl font-bold">{progress}%</span>
// //                 <span className="text-sm text-gray-500 text-[#00233F] font-size-[15px] font-semibold">Weekly progress</span>
// //                 <span className="text-xs" style={{ color: '#FF6701' }}>
// //                     {tasksCompleted}/{totalTasks} Quizzes Done
// //                 </span>
// //             </div>
// //         </div>
// //     );
// // }
// // import React from 'react';

// // export default function ProgressIndicator({
// //   progress = 82,
// //   tasksCompleted = 4,
// //   totalTasks = 5,
// // }) {
// //   const radius = 45;
// //   const circumference = 2 * Math.PI * radius;
// //   const strokeDashoffset = circumference - (progress / 100) * circumference;
// //   const progressPointX = 50 + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2);
// //   const progressPointY = 50 + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2);

// //   return (
// //     <div className="w-48 h-64 relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
// //       <svg className="w-48 h-48" viewBox="0 0 100 100">
// //         <circle
// //           className="text-gray-200"
// //           strokeWidth="5"
// //           stroke="currentColor"
// //           fill="transparent"
// //           r={radius}
// //           cx="50"
// //           cy="50"
// //         />
// //         <circle
// //           className="text-primary"
// //           strokeWidth="3"
// //           strokeDasharray={circumference}
// //           strokeDashoffset={strokeDashoffset}
// //           strokeLinecap="round"
// //           stroke="#90EE90"
// //           fill="transparent"
// //           r={radius}
// //           cx="50"
// //           cy="50"
// //           style={{
// //             transformOrigin: '50% 50%',
// //             transform: 'rotate(-90deg)',
// //             transition: 'stroke-dashoffset 0.5s ease-in-out',
// //           }}
// //         />
// //         <circle
// //           cx={progressPointX}
// //           cy={progressPointY}
// //           r="5"
// //           fill="#90EE90"
// //         />
// //         <text x="50" y="55" fontSize="24" fontWeight="bold" textAnchor="middle">
// //           {progress}%
// //         </text>
// //       </svg>
// //       <div className="absolute bottom-0 w-full text-center">
// //         <span className="text-sm text-gray-500 font-semibold">Weekly Progress</span>
// //         <span className="text-sm text-orange-500">{tasksCompleted}/{totalTasks} Quizzes Done</span>
// //       </div>
// //     </div>
// //   );
// // }




// import React from 'react';

// export default function ProgressIndicator({
//   progress = 82,
//   tasksCompleted = 4,
//   totalTasks = 5,
// }) {
//   const radius = 40;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;
//   const progressPointX = 50 + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2);
//   const progressPointY = 50 + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2);

//   return (
//     <div className="w-48 h-64 relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
//       <svg className="w-40 h-40" viewBox="0 0 100 100">
//         <circle
//           className="text-gray-200"
//           strokeWidth="3"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//         />
//         <circle
//           className="text-primary"
//           strokeWidth="2"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round"
//           stroke="#90EE90"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//           style={{
//             transformOrigin: '50% 50%',
//             transform: 'rotate(-90deg)',
//             transition: 'stroke-dashoffset 0.5s ease-in-out',
//           }}
//         />
//         <circle
//           cx={progressPointX}
//           cy={progressPointY}
//           r="5"
//           fill="#90EE90"
//         />
//         <text x="50" y="55" fontSize="20" fontWeight="bold" textAnchor="middle">
//           {progress}%
//         </text>
//       </svg>
//       <div className="absolute bottom-0 w-full text-center mt-4">
//         <span className="text-sm text-gray-500 font-semibold">Weekly Progress</span>
//         <span className="text-sm text-orange-500">{tasksCompleted}/{totalTasks} Quizzes Done</span>
//       </div>
//     </div>
//   );
// }








// import React from 'react';

// export default function ProgressIndicator({
//   progress = 82,
//   tasksCompleted = 4,
//   totalTasks = 5,
// }) {
//   const radius = 35;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;
//   const progressPointX = 50 + radius * Math.cos((progress / 100) * 2 * Math.PI - Math.PI / 2);
//   const progressPointY = 50 + radius * Math.sin((progress / 100) * 2 * Math.PI - Math.PI / 2);

//   return (
//     <div className="w-48 h-56 relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
//       <svg className="w-40 h-40" viewBox="0 0 100 100">
//         <circle
//           className="text-gray-200"
//           strokeWidth="3"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//         />
//         <circle
//           className="text-primary"
//           strokeWidth="2"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round"
//           stroke="#90EE90"
//           fill="transparent"
//           r={radius}
//           cx="50"
//           cy="50"
//           style={{
//             transformOrigin: '50% 50%',
//             transform: 'rotate(-90deg)',
//             transition: 'stroke-dashoffset 0.5s ease-in-out',
//           }}
//         />
//         <circle
//           cx={progressPointX}
//           cy={progressPointY}
//           r="5"
//           fill="#90EE90"
//         />
//         <text x="50" y="55" fontSize="20" fontWeight="bold" textAnchor="middle">
//           {progress}%
//         </text>
//       </svg>
//       <div className="absolute bottom-0 w-full text-center mt-2">
//         <span className="text-sm text-orange-500">{tasksCompleted}/{totalTasks} Quizzes Done</span>
//         <span className="text-xs text-gray-500 font-semibold">Weekly Progress</span>
//       </div>
//     </div>
//   );
// }



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
        <div className="ml-[9%] w-48 h-192 relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
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
            <span className="text-sm text-[#FF6701] font-600">{tasksCompleted}/{totalTasks} Quizzes Done</span>
        </div>
    );
}








