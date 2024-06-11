"use client";
import React from "react";
// import Image from "next/image";
import { Line } from "rc-progress";


// Navbar-icons
import QuizifAilogo from "../../src/assets/Images/Quiz-admin/Quizifai-logo.png";
import Dashboard from "../../src/assets/Images/Org-Admin/Dropdown.png";
import Quiz from "../../src/assets/Images/Quiz-admin/Quizifai-logo.png";
import History from "../../src/assets/Images/Quiz-admin/Scored.png";
import Schedule from "../../src/assets/Images/Quiz-admin/Schedule.png";
import Notification from "../../src/assets/Images/Quiz-admin/Notification.png";
import QuizAdmin from "../../src/assets/Images/Quiz-admin/QuizAdmin.png";
import Profile from "../../src/assets/Images/Quiz-admin/Profile.png";


// Main-icons
import search from "../../src/assets/Images/Quiz-admin/Search.png";
import Name from "../../src/assets/Images/Quiz-admin/Name-icon.png";
import Date from "../../src/assets/Images/Quiz-admin/Date.png";
import Location from "../../src/assets/Images/Quiz-admin/Location.png";
import MailAddress from "../../src/assets/Images/Quiz-admin/Email-Address.png";
import Mobile from "../../src/assets/Images/Quiz-admin/Mobile-no.png";
import Create from "../../src/assets/Images/Quiz-admin/Create.png"
import Edit from "../../src/assets/Images/Quiz-admin/Edit.png"
import Dropdown from "../../src/assets/Images/Quiz-admin/Dropdown.png"

// Logout-icons 
  import LArrow from "../../src/assets/Images/Quiz-admin/Logout-arrow.png"
  import LWhitebox from "../../src/assets/Images/Quiz-admin/Logout-Whitebox.png"
  import LRound from "../../src/assets/Images/Quiz-admin/Logout-round.png"
  import UserOutline from "../../src/assets/Images/Quiz-admin/User-Outline.png"
  import User from "../../src/assets/Images/Quiz-admin/User.png"
  import Scored from "../../src/assets/Images/Quiz-admin/Scored.png"
  import Timespent from "../../src/assets/Images/Quiz-admin/Time-spent.png"
  import Bell from "../../src/assets/Images/Quiz-admin/Bell.png"
  import Todaytopic from "../../src/assets/Images/Quiz-admin/Today-Topic.png"
  import Mail from "../../src/assets/Images/Quiz-admin/Mail.png"

function quizadmin() {
  return (
    <>
      <div className="flex">
        {/* Navigation-Section */}
        <header className="w-[219px] h-[1000px] absolute top-[-19px] left-[-9px] rounded-tl-[20px] rounded-bl-[20px] bg-[#F5F5FB]">
        <div className="w-[126px]  h-[129px] absolute top-[65px] left-[47px]">
            <img src={QuizifAilogo} alt="QuizifAi Logo Icon"/>
        </div>

        {/* Navigation-icons */}
        <div className="flex w-[15px] h-[15px] absolute top-[231px] left-[51px]">
          <img src={Dashboard} alt="Dashborad Image"/>
          <a className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]" for="" href="/dashboard">Dashboard</a>
        </div>

        <div className="flex w-[16px] h-[15px] absolute top-[285px] left-[51px]">
          <img src={Quiz} alt="Quiz's Image"/>
          <a className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]" for="" href="/quiz">Quiz</a>
        </div>

        {/* <div className="flex w-[13.87px] h-[15.41px] absolute top-[338px] left-[51px]">
          <img src={History} alt="History Image"/>
          <a className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]" for="" href="/dashboard">History</a>
        </div> */}

        <div className="flex w-[17px] h-4 absolute top-[394px] left-[51px]">
          <img src={Schedule} alt="Schedule Image"/>
          <a className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]" for="" href="/schedule">Schedule</a>
        </div>
{/* 
        <div className="flex w-4 h-[15px] absolute top-[453px] left-[51px]">
          <img src={Notification} alt="Notification Image"/>
          <a className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]" for="">Notification</a>
        </div> */}
{/* 
        <div className="flex w-[25.46px] h-[27.87px] absolute top-[508px] left-[51px]">
          <img className="-ml-2.5" src={QuizAdmin} alt="QuizAdmin Image"/>
          <a className="ml-4 text-Poppins font-medium text-[15px] leading-[15px] text-nowrap text-[#30304F]" for="">Quiz Admin</a>
        </div> */}
      
        <div className="flex w-[17px] h-[17px] absolute top-[581px] left-[51px]">
          <img src={Profile} alt="Profile Image"/>
          <a className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]" for="" href="/free-profile">Profile</a>
        </div>

        </header>
        {/* Main-section  */}
        <main className="mx-auto">
          <div className="w-[218px] h-[39px] absolute left-[244px] top-[52px]">
            <h1 className="leading-[30px] font-medium font-poppins text-[20px]">
              Welcome Username
            </h1>
          </div>

          <div className="w-[170px] h-[16px] absolute top-[55px] left-[702px]">
            <h1 className="leading-[22.5px] font-medium font-poppins text-[15px]">
              23 Jan 2024, Tuesday
            </h1>
          </div>
          <div className="w-[40.79px] h-[40.79px] absolute top-[41.58px] left-[874.82px] rounded-[10px] bg-[#E5E9F9]">
            <img
              className="w-[19.04px] h-[19.04px] ml-3 mt-3 border"
              src={search}
              alt="searching Image"
            
            />
          </div>

          <div className="w-32 h-[21px] absolute top-[108px] left-[248px]">
            <h1 className="leading-6 font-medium text-[15px] font-Poppins">
              Create
            </h1>
          </div>

          <form className="w-[664.5px] h-[233.6px] absolute top-[161px] left-[248px]">      
             <div className="flex gap-7">
              <div className="flex pl-5 pt-2 h-[43.6px] w-[317.5px] rounded-xl bg-[#F0EFFF]">
              <img className="w-6 h-6 " src={Name} alt="First name Icon" />
              <label className="text-nowrap leading-[22.5px] font-normal text-[15px] text-Poppins text-[#C7C4FF] pl-1 pt-1" for="Username">First Name</label>
              </div>

              <div className="flex pl-5 pt-2 h-[43.6px] w-[317.5px] rounded-xl bg-[#F0EFFF]">
              <img className="w-6 h-6" src={Name} alt="Last name Icon"/>
              <label className="leading-[22.5px] font-normal text-[15px] text-Poppins text-[#C7C4FF] pl-1 pt-1" for="Username">Last Name</label>
              </div>
            </div>

            <div className="flex gap-7 mt-5">
              <div className="flex pl-5 pt-2 h-[43.6px] w-[317.5px] rounded-xl bg-[#F0EFFF]">
              <img className="w-6 h-6 flex items-center justify-center mt-0.5 " src={Date} alt="Date Icon"/>
              <label className="text-nowrap leading-[22.5px] font-normal text-[15px] text-Poppins text-[#C7C4FF] pl-1 pt-1" for="Username">DD/MM/YYYY</label>
              </div>

              <div className="flex pl-5 pt-2 h-[83px] w-[317px] rounded-xl bg-[#F0EFFF]">
              <img className="w-6 h-6 mt-1" src={Location} alt="Location Icon"/>
              <label className="leading-[22.5px] font-normal text-[15px] text-Poppins text-[#C7C4FF] pl-1 pt-1" for="Username">Address
                 </label>
              </div>
            </div>

            <div className="flex -mt-5 pl-5 pt-2 h-[43.6px] w-[317.5px] rounded-xl bg-[#F0EFFF]">
              <img className="w-6 h-6 flex items-center justify-center mt-0.5" src={MailAddress} alt="Mail Icon" />
              <label className="text-nowrap leading-[22.5px] font-normal text-[15px] text-Poppins text-[#C7C4FF] pl-1 pt-1" for="Username">Email Address
                </label>
              </div>

             <div className="flex mt-5 gap-10">
             <div className="flex pl-5 pt-2 h-[43.6px] w-[317.5px] rounded-xl bg-[#F0EFFF]">
              <img className="w-[14px] h-6 mt-1 " src={Mobile} alt="Mobhile Icon"/>
              <label className="text-nowrap leading-[22.5px] font-normal text-[15px] text-Poppins text-[#C7C4FF] pl-1 pt-1" for="Username">Mobile Number
                </label>
              </div>
              <div className="h-8 w-[123px] rounded-[10px] bg-[#5E81F4] flex items-center justify-center">
               <a className="text-[15px] font-medium leading-[22.5px] text-white" for="">Add</a>
              </div>
             </div>

             <div className="flex h-[25px] w-[217px] absolute top-[320px]">
              <img className=" h-[25px] w-[25px]" src={Create} alt="Create Quiz Icon"/>
              <a for=" " className="ml-5 leading-6 text-[16px] font-semibold text-Poppins">Create a new Quiz</a>
             </div>

             <div className="flex h-[25px] w-[217px] absolute top-[400px]">
              <img className=" h-[23.18px] w-[23.18px]" src={Edit} alt="Edit Quiz Icon"/>
              <a for=" " className="ml-5 leading-6 text-[16px] font-semibold text-Poppins text-nowrap">Edit the Quiz Created by</a>
             </div>

           <div className="flex">
           <div className=" rounded-lg w-44 flex border-solid border-gray-300 border-[2px] absolute top-[455px] ml-10">
               <div className=" border-grey-400 leading-[18px] text-[12px] font-medium  px-4 py-3 rounded cursor-pointer">Division</div>
               <img className="w-5 h-5 flex mt-3 ml-14" src={Dropdown} alt="Dropdown Icon for Division"/>
              </div>

              <div className=" rounded-lg w-40 flex border-solid border-gray-300 border-[2px] absolute top-[455px] ml-60">
               <div className=" border-grey-400 leading-[18px] text-[12px] font-medium  px-4 py-3 rounded cursor-pointer text-nowrap">User Name</div>
               <img className="w-5 h-5 flex mt-3 ml-7" src={Dropdown} alt="Dropdown Icon user name"/>
              </div>   
           </div>

           <div className=" absolute top-[550px] h-8 w-[123px] rounded-[10px] bg-[#5E81F4] flex items-center justify-center">
               <a className="text-[15px] font-medium leading-[22.5px] text-white" for="">Submit</a>
              </div>                         
          </form>
         
        </main>
        {/* Logout-Section */}
        <footer className="w-[272px] h-[989px] absolute left-[989px] rounded-tr-[20px] rounded-br-[20px] bg-[#F5F5FB]">
        <div className="w-[244.3px] h-[680.04px] absolute">
          <div className="flex">
          <div className="absolute top-[65px] w-[85px] h-4 mx-5 -mt-3">
           <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">Logout</h1>
          </div>
          <div className="absolute top-[65px] w-7 h-5 -mt-3">
          <img className='h-6 w-6  absolute left-[203px] z-20 pt-2 -mt-0.5' src={LArrow} alt='Logout arrow icon'/>
           <img className='mt-0.5 h-6 w-6 absolute left-[199px] z-10' src={LWhitebox} alt='Logout round white icon'/>
          <img className='h-7 w-7  absolute left-52' src={LRound} alt='Logout round outline icon'/>
          </div>
          </div>

          <div className="">
              <img className="w-[117.84px] h-[117.84px] absolute top-[130px] left-20" src={UserOutline} alt="Profile Useroutline Icon"/>
              <img className="w-[71px] h-[71px] absolute top-[155px] left-[104px]" src={User} alt="Profile User Icon"/>
          </div>

          <div className="w-[101px] h-6 mx-24">
            <h1 className="absolute top-[267px] flex items-center font-Poppins font-semibold text-[15px] leading-[22.5px] ">User Name</h1>
          </div>
          <div className="w-[67px] h-[15px] mx-28">
            <h1 className="absolute top-[289px] flex items-center font-Poppins font-semibold text-[12px] leading-[18px] text-[#9696BB] ">Profession</h1>
          </div>
          
         <div className="flex">
         <div className="w-9 h-9 absolute top-[358px] bg-[#FFFFFF] rounded-[10px] ml-7"></div>
            <img className="w-[22px] h-[22px] absolute top-[366px] ml-[34px]" src={Scored} alt="No of questions scored icon"/>
        </div>
        <div className="w-[77px] h-[17px] absolute top-[355px] ml-20">
          <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">Scored</h1>
        </div>
        <div className="w-[146px] h-[17px] absolute top-[380px] ml-20">
          <h1 className="font-Poppins font-medium text-[10px] leading-[15px] text-[#9696BB]">Intermediate</h1>
        </div>
        <div className="w-[87.93px] h-[4.53px] absolute top-[375.21px] ml-44">
            <Line percent={70} strokeWidth={5} strokeColor="#5E81F4" />
        </div>

        <div className="flex">
         <div className="w-9 h-9 absolute top-[426.88px] bg-[#FFFFFF] rounded-[10px] ml-7"></div>
            <img className="w-[22.66px] h-[21.75px] absolute top-[433.22px] ml-[34px]" src={Timespent} alt="TimeSpent for every Question Icon"/>
        </div>
        <div className="w-[87.02px] h-[17.22px] absolute top-[424.16px] ml-20">
          <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">Time Spent</h1>
        </div>
        <div className="w-[66px] h-[17px] absolute top-[449px] ml-20">
          <h1 className="font-Poppins font-medium text-[10px] leading-[15px] text-[#9696BB]">Advanced</h1>
        </div>
        <div className="w-[87.93px] h-[4.53px] absolute top-[444.1px] ml-44">
            <Line percent={70} strokeWidth={5} strokeColor="#5E81F4" />
        </div>
         
         <div className="flex">
         <div className="w-[138px] h-[29px] absolute top-[537px] ml-5">
         <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">Notification</h1>
         </div>

        <div className="w-[17px] h-[18px] absolute top-[534px] ml-[215px]">
          <img src={Bell} alt="Notification bell Icon"/>
         </div>
         </div>

         <div className="flex">
         <div className="w-[36.26px] h-[36.26px] absolute top-[582.79px] bg-[#FEF2F3] rounded-[10px] ml-5"></div>
            <img className="w-[15.41px] h-[15.41px] absolute top-[593.66px] ml-[30px]" src={Todaytopic} alt="Today-topic Icon"/>
        </div>
        <div className="w-[158.63px] h-[17.22px] absolute top-[580.07px] ml-20">
          <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">Today - Topic</h1>
        </div>
        <div className="w-[152.28px] h-[17.22px] absolute top-[604.54px] ml-20">
          <h1 className="font-Poppins font-medium text-[10px] leading-[15px] text-[#9696BB]">23 Jan 2024, Tuesday</h1>
        </div>

        
        <div className="flex">
         <div className="w-9 h-9 absolute top-[648px] bg-[#EEF2FD] rounded-[10px] ml-5"></div>
            <img className="w-[17px] h-[13px] absolute top-[660px] ml-[30px]" src={Mail} alt="Mail Icon"/>
        </div>
        <div className="w-[174px] h-[18px] absolute top-[645px] ml-20">
          <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">Topic - Sub Topic Title</h1>
        </div>
        <div className="w-[135px] h-[17px] absolute top-[670px] ml-20">
          <h1 className="font-Poppins font-medium text-[10px] leading-[15px] text-[#9696BB]">24 Jan 2024, Wednesday</h1>
        </div>
        
        <div className="flex">
         <div className="w-9 h-9 absolute top-[706.06px] bg-[#EEF2FD] rounded-[10px] ml-5"></div>
            <img className="w-[17px] h-[13px] absolute top-[718px] ml-[30px]" src={Mail} alt="Mail Icon"/>
        </div>
        <div className="w-[189px] h-[18px] absolute top-[703px] ml-20">
          <h1 className="font-Poppins font-medium text-[15px] leading-[22.5px]">Topic - Sub Topic Title</h1>
        </div>
        <div className="w-[145.94px] h-[17.22px] absolute top-[727.82px] ml-20">
          <h1 className="font-Poppins font-medium text-[10px] leading-[15px] text-[#9696BB]">24 Jan 2024, Wednesday</h1>
        </div>

         </div>
        
        </footer>
      
      </div>
    </>
  );
}

export default quizadmin;
