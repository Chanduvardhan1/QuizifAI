import React, { useState, useEffect } from "react";

export default function SegmentedProgressIndicator() {
  const [quizProgress, setQuizProgress] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  // Fetch quiz progress
  useEffect(() => {
    const fetchQuizProgress = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }
        const response = await fetch(
          `https://dev.quizifai.com:8010/organization_users_weekly_quiz_progress/?user_id=${userId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setQuizProgress(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuizProgress();
  }, []);
  const progress =
  quizProgress?.response === "success" &&
  quizProgress.data.total_assigned_quizzes > 0
    ? Math.round(
        (quizProgress.data.total_attempted_quizzes /
          quizProgress.data.total_assigned_quizzes) *
          100
      )
    : 0; // Default to 0 if no quizzes are assigned

// Function to determine progress color
const getProgressColor = (progress) => {
  if (progress <= 35) return "#ff2c2c"; // Red
  if (progress <= 50) return "#ff7900"; // Yellow
  if (progress <= 70) return "#FFFF00"; // Orange
  if (progress <= 85) return "#90EE91"; // Light Green
  return "#00ab00"; // Green
};

// Function to determine progress label
const getProgressLabel = (progress) => {
  if (progress <= 35) return "Very Poor";
  if (progress <= 50) return "Poor";
  if (progress <= 70) return "Average";
  if (progress <= 85) return "Good";
  return "Excellent";
};

// Get progress color and label
const progressColor = getProgressColor(progress);
const progressLabel = getProgressLabel(progress);
  return (
    <div className="relative flex flex-col items-center bg-white rounded-sm">
      {quizProgress?.response === "success" ? (
        <div className="flex flex-col w-full px-5 items-center">
          <div className="flex w-full flex-col gap-1 justify-between mt-1">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#002366] text-[14px]">
                Assigned Quizzes{" "}
                <span className="ml-[21px]">:</span>{" "}
                <span className="text-[#FF6701]">
                  {quizProgress.data.total_assigned_quizzes}
                </span>
              </h1>
              <h1 className="text-[#002366] text-[14px]">
                Incompleted Quizzes :{" "}
                <span className="text-[#FF6701]">
                  {quizProgress.data.total_attempted_quizzes}
                </span>
              </h1>
              <h1 className="text-[#002366] text-[14px]">
                {quizProgress.data.total_attempted_quizzes}/
                {quizProgress.data.total_assigned_quizzes} Quizzes Done
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center w-full mt-1 space-y-4">
            {/* Progress bar container */}
            <div className="w-full max-w-lg bg-gray-200 h-2 rounded-lg relative">
              <div
                className="h-2 rounded-lg"
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
                style={{ color: progressColor }}
              >
                {progress}%
              </h1>
              <h2
                className="text-xl font-medium"
                style={{ color: progressColor }}
              >
                {progressLabel}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <p>{error || "No quiz progress data available."}</p>
      )}
    </div>
  );
}
