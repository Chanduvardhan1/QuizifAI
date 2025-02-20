import React, { useState } from 'react'
// import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
// import newlogo from "../../public/newlogo.png";
// import chartbots2 from "../../public/chatbots2.png";.
import homepagelogo from "../assets/Images/images/home/Quizifai3.png"
import Menu from "../assets/Images/images/home/menu.png";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../../public/images/homeicon.png";
import signUpIcon from "../../public/images/signupicon.png";
import logInIcon from "../../public/images/loginicon.png";
const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getButtonClassName = (path) => `w-20 h-[30px] text-white text-[13px] leading-7 font-bold rounded-full mb-4 ${currentPath === path ? 'font-bold' : 'font-normal'}`;
  return (
    <div className=' px-20'>
      <section className='p-2'>
        <div className='container flex mx-auto'>
          <div>
            <Link to={"/"}>
              <img className='w-[160px] h-[60px] lg:h-[60px] lg:w-[160px] ml-[-33%]' src={homepagelogo} alt="Logo" />
            </Link>
          </div>

          <div className='ml-auto my-auto'>
            <ul className="hidden lg:flex gap-4">
              <li>
                <Link to="/">
                  <button className={`w-16 h-[30px] text-[#555555]  font-[lato] text-[13px] leading-7 font-bold flex items-center justify-center rounded-full hover:bg-[#EF512F] transition-transform transform hover:scale-110 ${currentPath === '/' ? 'font-bold' : ''}`}>
                    Home
                    {/* <img className='h-[17px]' src={homeIcon} /> */}
                  </button>
                </Link>
              </li>
              {/* <li>
              <Link to="/Contactus">
                <button className={`w-[84px] h-[30px] text-[#555555] text-[13px] leading-7 font-bold flex items-center justify-center rounded-full hover:bg-[#EF512F] transition-transform transform hover:scale-110 ${currentPath === '/Contactus' ? 'font-bold' : ''}`}>
                  Contact Us
                </button>
              </Link>
            </li> */}
              <li>
                <Link to={"/signup"}>
                  {/* <button className={`w-20 h-[30px] rounded-full font-Poppins bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110 ${currentPath === '/signup' ? 'font-bold' : ''}`}>
                  Sign Up
                  <img className='h-[17px]' src = {signUpIcon}/>
                </button> */}

                  <button className={`w-20 h-[30px] rounded-full bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center gap-1 hover:bg-[#EF512F] transition-transform transform hover:scale-110 ${currentPath === '/signup' ? 'font-bold' : ''}`}>
                    Sign Up
                    {/* <img className='h-[17px]' src={signUpIcon} alt="Sign Up Icon" /> */}
                  </button>

                </Link>
              </li>
              <li>
                <Link to="/login">
                  {/* <button className={`w-20 h-[30px] rounded-full font-Poppins bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110 ${currentPath === '/login' ? 'font-bold' : ''}`}>
                    Login
                    <img className="h-[17px]" src={logInIcon} />
                  </button> */}

                  <button className={`w-20 h-[30px] rounded-full font-[lato] bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center gap-1 hover:bg-[#EF512F] transition-transform transform hover:scale-110 ${currentPath === '/login' ? 'font-bold' : ''}`}>
                    Login
                    {/* <img className="h-[17px]" src={logInIcon} alt="Login Icon" /> */}
                  </button>


                </Link>
              </li>
            </ul>
            <div className='h-4 w-4 lg:hidden' onClick={toggleMenu}>
              <img src={Menu} alt="menuIcon" />
            </div>
          </div>

          <div>
            <div className={`lg:hidden fixed top-0 left-0 w-2/3 h-full bg-black text-white z-50 flex flex-col items-center pt-10 pr-4 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <Link to="/" onClick={toggleMenu}>
                <button className={getButtonClassName('/')}>Home</button>
              </Link>
              <Link to={"/signup"} onClick={toggleMenu}>
                <button className={getButtonClassName('/signup')}>Sign Up</button>
              </Link>
              <Link to="/login" onClick={toggleMenu}>
                <button className={getButtonClassName('/login')}>Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeaderSection