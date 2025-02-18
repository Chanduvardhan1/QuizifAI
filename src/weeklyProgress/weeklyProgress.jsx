import React, { useState, useEffect,useContext } from "react";
import { AuthContext } from "../Authcontext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SegmentedProgressIndicator() {
  const [quizProgress, setQuizProgress] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const orgId = localStorage.getItem('org_id');

  const navigate = useNavigate();

  const { isAuthenticated, authToken,logout } = useContext(AuthContext);

  //---------------------**dsahboard data fetch **-------------------------//
    const [loading1, setLoading1] = useState(true); // Loading state
    const [weekStats, setWeekStats] = useState({
      week_detail: "",
      total_quiz_time: "",
      attempted_quiz_count: 0,
      accuracy_rate: "",
      score_performance: "",
    });

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }
      const fetchQuizData = async () => {
        try {
          const response = await fetch(
            "https://dev.quizifai.com:8010/dashboard",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                user_id: userId,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch quiz data");
          }
          const result = await response.json();
  
          const data = result.data[0];

  const weekStatsData = data.week_stats;

        // Set the week stats in the state
        setWeekStats(weekStatsData);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }finally {
          setLoading1(false); // Stop loading after API call
        }
      };
  
      fetchQuizData();
    }, [authToken, isAuthenticated, navigate, userId]);
  
  //---------------------**dsahboard data fetch end **----------------------//
  
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
               Week :{" "}
                <span className="text-[#FF6701] text-[12px]">
                  {weekStats.week_detail}
                </span>
              </h1>
              <h1 className="text-[#002366] text-[14px]">
              Time Spent 
              <span className="ml-[34px]">:</span>{" "}

                <span className="text-[#FF6701] text-[12px]">
                  {weekStats.total_quiz_time}
                </span>
              </h1>
              <h1 className="text-[#002366] text-[14px]">
              Accuracy Rate 
              <span className="text-[14px] font-[500] text-[#214082] ml-[13px] "> : </span>

                <span className="text-[#FF6701] text-[12px]">
                  {weekStats.accuracy_rate}
                </span>
              </h1>
           
              {/* <h1 className="text-[#002366] text-[14px]">
                Assigned Quizzes{" "}
                <span className="ml-[21px]">:</span>{" "}
                <span className="text-[#FF6701]">
                  {quizProgress.data.total_assigned_quizzes}
                </span>
              </h1> */}
                 <h1 className="text-[#002366] text-[14px]">
                 Score Outcomes 
              <span className="text-[14px] font-[500] text-[#214082]  "> : </span>

                <span className="text-[#FF6701] text-[12px]">
                  {weekStats.score_performance}
                </span>
              </h1>
              {/* {orgId && (
              <h1 className="text-[#002366] text-[14px]">
              Quizzes Completed {" "}
              <span className="ml-[0px]">:</span>{" "}
              <span className="text-[#FF6701] text-[12px]">
                {quizProgress.data.total_attempted_quizzes}/
                {quizProgress.data.total_assigned_quizzes}
                </span>
              </h1>
              )} */}
            </div>
          </div>
          {/* {orgId && (
          <div className="flex flex-col items-center w-full mt-1 space-y-1">
          

          
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
            <div className="text-center">
              <h1
                className="text-[18px] font-bold"
                style={{ color: progressColor }}
              >
                {progress}%
              </h1>
              <h2
                className="text-[18px] font-medium"
                style={{ color: progressColor }}
              >
                {progressLabel}
              </h2>
            </div>
            </div>

)} */}
         
        </div>
      ) : (
        <p>{error || "No quiz progress data available."}</p>
      )}
    </div>
  );
}
