import react from 'react';

const pageHeader = () => {
    return (
        <div className='flex float-right gap-4px mr-[6%]'>
            <button className={`w-16 h-[30px] font-[lato] text-[#555555] text-[13px] leading-7 font-bold flex items-center justify-center rounded-full hover:bg-[#EF512F] transition-transform transform hover:scale-110 mt-[9%] mr-[5%] $`}>
                Home
            </button>

            <button className={`w-20 h-[30px]  font-[lato] rounded-full font-Poppins bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center gap-1 hover:bg-[#EF512F] transition-transform transform hover:scale-110 mt-[9%] mr-[3%]  $`}>
                Sign Up
                {/* <img className='h-[17px]' src={signUpIcon} alt="Sign Up Icon" /> */}
            </button>
            <button className={`w-20 h-[30px]  font-[lato] rounded-full font-Poppins bg-[#3B61C8] text-white text-[13px] leading-7 font-semibold flex items-center justify-center gap-1 hover:bg-[#EF512F] transition-transform transform hover:scale-110  ml-[2%] mt-[9%]  mr-[6%] $`}>
                Login
                {/* <img className="h-[17px]" src={logInIcon} alt="Login Icon" /> */}
            </button>
        </div>
    )
}

export default pageHeader;