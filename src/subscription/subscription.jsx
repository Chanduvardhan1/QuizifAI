"use client";
import React from "react";
// import Image from "next/image";

// Main-Section-icons
import Cancel from "../../src/assets/Images/Subscription/Cancel.png";
import Dropdown from "../../src/assets/Images/Subscription/Dropdown.png";
import QuizifAiLogo from "../../src/assets/Images/Subscription/Quizifai-Logo.png";
import Tick from "../../src/assets/Images/Subscription/Tick.png";
import Cross from "../../src/assets/Images/Subscription/Cross.png";

function subscription() {
  return (
    <>
      <div className="w-[783px] h-[67px] absolute top-[39px] left-[249px]">
        <h1 className="font-Poppins font-semibold text-[30px] leading-[45px] text-[#555555] flex justify-center">
          Choose a plan that fit’s you
        </h1>
      </div>

      <div className="w-[207px] h-[45px] absolute top-[100px] left-[987px]">
        <h1 className="font-Poppins font-bold text-[30px] leading-[45px] text-[#454B60]">
          Subscription
        </h1>
      </div>
      <img
        className="w-7 h-7 absolute top-[55px] left-[1167px]"
        src={Cancel}
      />

      <div className="w-[504px] h-[70px] absolute top-[126px] left-[389px] rounded-[20px] bg-[#ECECEC]">
        <h1 className="font-Poppins font-semibold text-[20px] leading-[30px] text-[#555555] ml-24 mt-5">
          Monthly{" "}
        </h1>
      </div>

      <div className="w-[252px] h-[70px] absolute top-[126px] left-[662px] rounded-[20px] bg-[#EFF8FF] z-10">
        <h1 className="font-Poppins font-semibold text-[20px] leading-[30px] text-[#555555] flex justify-center mt-5">
          Yearly
        </h1>
      </div>

      <div className="w-[387px] h-[1.5px] absolute top-[158px] left-[794px] bg-[#867EFF] z-0">
        <hr></hr>
      </div>

      <div className=" rounded-lg w-[146px] flex border-solid border-[#B8BBC2] border-[1.8px] absolute top-[172px] left-[1007px]">
        <div className=" border-grey-400 leading-[18px] text-[12px] font-medium  px-4 py-3 rounded">
          Currency
        </div>
        <img
          className="w-5 h-5 flex mt-3 ml-4 cursor-pointer"
          src={Dropdown}
          alt="Dropdown Icon for Division"
        />
      </div>
<div className="w-[1150px] h-[547px] absolute top-[246px] left-[66px]">

<table className=" border-separate border border-slate-400 rounded-[10px]">
        <thead className=" border-[#B8BBC2] border-[1.8px]">
          <tr>
            <th className="w-[295px] -pt-[200px] border border-slate-300">
              <img className="w-[168px] h-[170px] ml-12" src={QuizifAiLogo} />
            </th>
            <th className="w-[295px] font-Poppins font-semibold text-[25px] leading-[20px] text-[#214082] border border-slate-300">
              Basic
              <br />
              <span className="font-Poppins font-medium text-[11px] leading-[20px] text-[#214082]">
                (Free)
              </span>
              <br />
              <span className="font-medium text-[9px] leading-[14px] text-[#555555B2] pt-5">
                Free for 7 days as a trail
              </span>
              <br />
              <span className="font-semibold text-[25px] leading-[37.5px] ">
                $0.00
              </span>
            </th>

            <th className="w-[295px] font-Poppins font-semibold text-[25px] leading-[20px] text-[#214082] border border-slate-300 bg-[#f7fcf9]"> 
              Premium
              <br />
              <span className="font-Poppins font-medium text-[11px] leading-[20px] text-[#214082]">
                (Most Popular)
              </span>
              <br />
              <span className="font-medium text-[9px] leading-[14px] text-[#555555B2] pt-5">
                Create unlimited Quiz of your own and <br />
                <span>our with AI support too</span>
              </span>
              <br />
              <span className="font-semibold text-[25px] leading-[37.5px] ">
                $0.00
              </span>
            </th>

            <th className="w-[295px] font-Poppins font-semibold text-[25px] leading-[20px] text-[#214082] border border-slate-300">
              Organization
              <br />
              <span className="font-Poppins font-medium text-[11px] leading-[20px] text-[#214082]">
              (Today Offer)
              </span>
              <br />
              <span className="font-medium text-[9px] leading-[14px] text-[#555555B2] pt-5">
              Create a team and assign the Quiz that you have  <br />
                <span>created of your own and our with AI support too</span>
              </span>
              <br />
              <span className="font-semibold text-[25px] leading-[37.5px] ">
                $0.00
              </span>
            </th>
          </tr>
        </thead>

        <tbody className="border-separate border-spacing-2 border border-slate-400">
          <tr className="">
            <td className="text-[#214082] font-normal text-[14px] leading-[21px] flex justify-center border border-slate-300 pt-2 pb-2">
              7 days free
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32" src={Tick} />
            </td>
            <td className=" border border-slate-300 bg-[#f3f8f5]">
              <img className="w-6 h-6 ml-32" src={Tick} />
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mt-1 mb-1" src={Tick} />
            </td>
          </tr>

          <tr>
            <td className="text-[#214082] font-normal text-[14px] leading-[21px] flex justify-center border border-slate-300 pt-2 pb-2">
              Attend Quiz
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32" src={Tick} />
            </td>
            <td className=" border border-slate-300 bg-[#f0f8f3]">
              <img className="w-6 h-6 ml-32" src={Tick} />
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mt-1 mb-1" src={Tick} />
            </td>
          </tr>

          <tr>
            <td className="text-[#214082] font-normal text-[14px] leading-[21px] flex justify-center border border-slate-300 pt-2 pb-2">
              Assign AI to create
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32" src={Cross} />
            </td>
            <td className=" border border-slate-300 bg-[#f0f8f3]">
              <img className="w-6 h-6 ml-32" src={Tick} />
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mt-1 mb-1" src={Tick} />
            </td>
          </tr>

          <tr>
            <td className="text-[#214082] font-normal text-[14px] leading-[21px] flex justify-center border border-slate-300 pt-2 pb-2">
              Create Quiz
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32" src={Cross} />
            </td>
            <td className=" border border-slate-300 bg-[#f0f8f3]">
              <img className="w-6 h-6 ml-32" src={Tick} />
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mt-1 mb-1" src={Tick} />
            </td>
          </tr>

          <tr>
            <td className="text-[#214082] font-normal text-[14px] leading-[21px] flex justify-center border border-slate-300 pt-2 pb-2">
              Create a User
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32" src={Cross} />
            </td>
            <td className=" border border-slate-300 bg-[#f0f8f3]">
              <img className="w-6 h-6 ml-32" src={Cross} />
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mt-1 mb-1" src={Tick} />
            </td>
          </tr>

          <tr>
            <td className="text-[#214082] font-normal text-[14px] leading-[21px] flex justify-center border border-slate-300 pt-2 pb-2">
              Usage Usages
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32" src={Cross} />
            </td>
            <td className=" border border-slate-300 bg-gradient-to-b from-[#f5fcf8] to-[#ecf4f9]">
              <img className="w-6 h-6 ml-32" src={Cross} />
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mt-1 mb-1" src={Tick} />
            </td>
          </tr>

          <tr>
            <td className="text-[#214082] font-normal text-[14px] leading-[21px] flex justify-center border border-slate-300 pt-10 pb-9">
              Usage Usages
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mb-2" src={Cross} />
              <button className="w-[151.73px] h-[41.55px] rounded-[14px] shadow-inner shadow-[#6c6d70] ml-14 mb-4">
                Current Plan
              </button>
            </td>
            <td className=" border border-slate-300 bg-gradient-to-t from-[#f0f8f3] to-[#f0f9ff]">
              <img className="w-6 h-6 ml-32 mb-2" src={Cross} />
              <button className="w-[151.73px] h-[41.55px] rounded-[14px] shadow-inner shadow-[#6c6d70] ml-14 mb-4">
                Upgrade 
              </button>
            </td>
            <td className=" border border-slate-300">
              <img className="w-6 h-6 ml-32 mx-4 mt-1 mb-2" src={Tick} />
              <button className="w-[151.73px] h-[41.55px] rounded-[14px] shadow-inner shadow-[#6c6d70] ml-14 mb-4">
                Upgrade 
              </button>
            </td>
          </tr>
        </tbody>
      </table>

</div>
     
    </>
  );
}

export default subscription;
