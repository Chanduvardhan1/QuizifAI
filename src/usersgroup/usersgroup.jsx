"use client";
import React  ,{ useState, useEffect } from "react";
import visible from "../assets/Images/images/profile/visible.png";
import hide from "../assets/Images/images/profile/hide.png";
import Navigation from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

function usersgroup() {
    const [preferredLoginMethod, setPreferredLoginMethod] = useState("Email");
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [showNewPasswords, setShowNewPasswords] = useState(false);
    const navigate = useNavigate();

    const handleLoginCancelClick1 = () => {
        setShowNewPasswords(false);
      };
      const togglePasswordVisibility = (type) => {
        if (type === "old") {
          setOldPasswordVisible(!oldPasswordVisible);
        } else if (type === "new") {
          setNewPasswordVisible(!newPasswordVisible);
        } else if (type === "confirm") {
          setConfirmPasswordVisible(!confirmPasswordVisible);
        }
      };
      const handleexcel = () => {
        navigate("/excelcreat")
      }
  return (
    <>
      <div className="w-full flex">
        <div>
<Navigation/>
        </div>
        <div className="w-full">

       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white my-4 p-5">
  
  <div className="md:col-span-2">
      <h1 className=" font-semibold text-[20px] text-[#214082]">User Create</h1>
    </div>

    {/* User Id*/}
   
    {/* <div className="flex flex-col md:col-span-2">
      <div className="w-[50%] flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2  ">User Id</label>
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-[50%]`} />
    </div>
   */}
   
    {/*  Fist Name*/}
    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2">Fist Name<span className="text-red-500">*</span></label>
    
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
   
    {/* Address */}
    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2">Address 1</label>

    
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
     {/* last Name */}
    
<div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2">last Name<span className="text-red-500">*</span></label>
 
      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
    {/* Address 2 */}
    <div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2 ">Address 2</label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
   

    
{/* Middle Name */}
<div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2 ">Middle Name<span className="text-red-500">*</span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="number"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>

   {/* email */}
<div className="flex flex-col">
      <div className="w-full flex flex-row">
      <label className="w-[50%] text-blue-800 font-semibold mb-2 ">Email<span className="text-red-500">*</span></label>

      <input
        className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
 
   

  
    
    </div>
    
<div className="flex">
    <div className="w-full flex gap-5 flex-col p-5 ">
    {/* <div className="flex justify-start items-start ">
      <h1 className=" font-semibold text-[20px] text-[#214082]">Login Method</h1>
    </div> */}
    <div
            
          >
                      <label className="text-blue-800 font-semibold">Login Method</label>
            <button
              className={`border-b-2 w-[25%] text-[14px] pl-[10px] ml-[10px] focus:outline-none ${
                preferredLoginMethod === "Email"
                  ? "border-blue-200"
                  : "border-transparent"
              } `}
              onClick={() =>setPreferredLoginMethod("Email")}
            //   disabled={!isEditingLogin}
            >
              Email
            </button>
            {/* <button
              className={`border-b-2 w-[20%] text-[14px] pl-[10px] focus:outline-none ${
                preferredLoginMethod === "Mobile"
                  ? "border-blue-200"
                  : "border-transparent"
              } `}
              onClick={() =>
              setPreferredLoginMethod("Mobile")
              }
            //   disabled={!isEditingLogin}
            >
              Mobile
            </button> */}
            {/* <hr className="h-[1px] w-[90px] bg-gray-200"></hr> */}
          </div>

          <div className="flex flex-col pl-[100px]">
      <div className="w-full flex flex-row">
      <label className="w-[25%] text-blue-800 font-semibold mb-2 ">Email<span className="text-red-500">*</span></label>

      <input
        className={ `  w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
        type="text"
        required
        // value={numQuestions}
        // onChange={(e) => setNumQuestions(e.target.value)}
      />
      </div>
    
      <hr className={`h-[1px] w-full`} />
    </div>
    </div>
    <div className="bg-white w-full ">
          <h1 className="mt-4 text-[13px] text-[#EF5130] font-semibold colour red">
            Update Password
          </h1>
          <div className="flex">
            <div className="inputGroup1" >
              <label className="text-blue-800 text-[13px] font-semibold">
                Password
              </label>
              <input
                className="border-transparent border-b-2 hover:border-blue-200 mr-[40px] ml-[px] h-[30px] w-[173px] text-[11px] focus:outline-gray-300 pl-[5px]"
                // type={oldPasswordVisible ? "text" : "password"}
                placeholder="password"
                // value={oldPassword}
                // onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                onClick={() => togglePasswordVisibility("old")}
                className="cursor-pointer"
              >
                {oldPasswordVisible ? (
                  <img
                    className="h-[17px] w-[17px] ml-[66%] relative -top-[25px]"
                    src={visible}
                    title="hide"
                    alt="Hide Password"
                  />
                ) : (
                  <img
                    className="h-[17px] w-[17px] ml-[66%] relative -top-[25px]"
                    src={hide}
                    title="show"
                    alt="Show Password"
                  />
                )}
              </span>
              {/* {oldPasswordError && (
                <div className="text-red-500 text-xs mt-1">
                  {oldPasswordError}
                </div>
              )} */}
            </div>

            {/* {showNewPasswords && ( */}
              <>
                <div className="inputGroup1">
                  <label className="text-blue-800 font-semibold ml-[15px] text-[13px]">
                    New Password
                  </label>
                  <input
                    className="border-transparent border-b-2 hover:border-blue-200 ml-[15px] h-[30px] w-[163px] text-[11px] focus:outline-gray-300"
                    // type={newPasswordVisible ? "text" : "password"}
                    placeholder="new password"
                    // value={newPassword}
                    // onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    onClick={() => togglePasswordVisibility("new")}
                    className="cursor-pointer"
                  >
                    {newPasswordVisible ? (
                      <img
                        className="h-[17px] w-[17px] ml-[72%] relative -top-[25px]"
                        src={visible}
                        title="hide"
                        alt="Hide Password"
                      />
                    ) : (
                      <img
                        className="h-[17px] w-[17px] ml-[72%] relative -top-[25px]"
                        src={hide}
                        title="show"
                        alt="Show Password"
                      />
                    )}
                  </span>
                  {/* {newPasswordError && (
                    <div className="text-red-500 text-xs mt-1 w-[190px] mx-[10px]">
                      {newPasswordError}
                    </div>
                  )} */}
                </div>

                <div className="inputGroup1">
                  <label className="text-blue-800 font-semibold ml-[20px] text-[13px]">
                    Confirm Password
                  </label>
                  <input
                    className="border-transparent border-b-2 hover:border-blue-200 ml-[20px] h-[30px] w-[178px] text-[11px] focus:outline-gray-300"
                    // type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="confirm password"
                    // value={confirmPassword}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="cursor-pointer"
                  >
                    {confirmPasswordVisible ? (
                      <img
                        className="h-[17px] w-[17px] ml-[67%] relative -top-[25px]"
                        src={visible}
                        title="hide"
                        alt="Hide Password"
                      />
                    ) : (
                      <img
                        className="h-[17px] w-[17px] ml-[67%] relative -top-[25px]"
                        src={hide}
                        title="show"
                        alt="Show Password"
                      />
                    )}
                  </span>
                  {/* {confirmPasswordError && (
                    <div className="text-red-500 text-xs mt-1 w-[200px]">
                      {confirmPasswordError}
                    </div>
                  )} */}
                </div>
              </>
            {/* )} */}
          </div>
<div className="flex justify-end pr-[50px]">
<button
            className=" bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[150px] text-[13px] font-semibold rounded-[20px]  mb-[20px] text-white mt-[20px] text-nowrap"
            // onClick={handleUpdatePassword}
          >
         Update Password
          </button>
</div>
        
          {showNewPasswords && (
            <button
              className="bg-[#3B61C8] hover:transform hover:scale-110 hover:bg-[rgb(239,81,48)] transition-transform duration-300 ease-in-out h-[30px] w-[80px] text-[13px] font-semibold rounded-[20px] ml-[4%] text-white"
              onClick={handleLoginCancelClick1}
            >
              Cancel
            </button>
          )}
         
        </div>
        </div>
    <div className="flex justify-between  p-5 pr-[50px] ">
            <button
            //   onClick={() => setStep(2)}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Edit
            </button>
            <button
            //   onClick={handleNextpage2}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"

            >
              Create
            </button>
          </div>
          <div className="flex justify-end px-10">
        <h1 className="text-blue-800 font-semibold"> Settings &gt; Organization &gt; <span onClick={handleexcel} className=" cursor-pointer hover:underline">Bulk user Import</span></h1> 
    </div>
      </div>
      </div>
    </>
  );
}

export default usersgroup;
