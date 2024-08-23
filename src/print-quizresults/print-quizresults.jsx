import React from 'react'
import QuizifAilogo from "../assets/Images/quiz-type/Quizifai 1.png";

export default function printquizresults (){
  return (
    <>
    {/* first format */}
    <h1 className='font-bold text-center text-[30px] font-Poppins text-blue-900 mt-3 underline underline-offset-2'>QUESTION PAPER TEMPLATES</h1>
     <div className='bg-slate-400 h-full w-full'>
  {/* first-sub1  */}
        <div className='h-[500px] w-[550px] absolute top-10 left-[50px] bg-gray-200 rounded mt-7'>
            <div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
            <h1 className='font-serif font-semibold text-center relative top-5 text-sm'><span className='text-red-600'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION </span><br/>
            SCIENCE <br/>CLASS IX (THEORY)
            <br/>SAMPLE QUESTION PAPER - II <br/></h1>
            <img className='h-[50px] w-[50px]  absolute top-[50px] left-[40px] border-4 border-solid' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
            <h1 className='font-serif font-semibold text-left relative top-6 pl-5 pt-10'>Hall Ticket No:<br/>Time:<span className='font-thin font-none pl-1'>3 Hours</span></h1>
            <h1 className='font-serif font-semibold text-left relative -top-[65px] pl-[330px] pt-10'>Subject Code:<br/>Maximum Marks:<span className='font-thin font-none pl-1'>75</span></h1>
            <h1 className='font-serif font-semibold text-center text-xl relative text-blue-900 -mt-[35px]'>Multiple Choice Questions</h1>

            <h1 className='pl-10'>1. <span className='text-xs font-serif'>
            Seema visited a Natural Gas Compressing Unit and found that the gas can
            be liquefied under specific conditions of temperature and pressure. While
            sharing her experience with friends she got confused. Help her to identity
            the correct set of conditions.
             </span></h1>
             <span className='text-xs font-serif pl-10'>(a) Low temperature, low pressure</span><br/>
             <span className='text-xs font-serif pl-10'>(b) High temperature, low pressure</span><br/>
             <span className='text-xs font-serif pl-10'>(c) Low temperature, high pressure</span><br/>
             <span className='text-xs font-serif pl-10'>(d) High temperature, high pressure</span>
             <span className='pl-[160px]'>(1)</span>

            </div>
        </div>
         <a href='./pdf1' className='bg-blue-800 text-white rounded-md absolute top-[590px] left-[260px] px-6 font-serif hover:bg-blue-600'>Get this format</a>
   {/* first-sub2 */}

        <div className='h-[500px] w-[550px] absolute top-10 left-[680px] bg-gray-200 rounded mt-7'>
        <div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
            <div className='h-[170px] w-[500px] bg-amber-50 pt-[20px] '>
              <h1 className='text-left font-semibold font-serif pl-3 text-[13px]'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION<br/>SCIENCE<br/>
              SAMPLE QUESTION PAPER - II<br/>Hall Ticket No:<br/>Subject Code:<br/>Time:<span className='font-normal'>60 Min</span><br/>Maximum Marks:</h1>
              <img className='h-[130px] w-[130px] absolute top-[30px] left-[340px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
            </div>

            <h1 className='pl-5 pt-[10px]'>1. <span className='font-serif'>
            Which of the following is not a correct way to state a null hypothesis?
             </span></h1>
             
             <input className='ml-8 text-xs' type='radio' name='options' value='option-1'/>H0: ˆ ˆ 0 p1 − p2 = 0 <br/>
             <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-2'/>H0: µd = 10<br/>
             <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-3'/>H0: µ1 − µ2 = 0 <br/>
             <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-4'/>H0: p = .5 

             <h1 className='pl-5 pt-[20px]'>2. <span className='font-serif'>
             A result is called “statistically significant” whenever
             </span></h1>
             
             <input className='ml-8 text-xs' type='radio' name='options' value='option-1'/>The null hypothesis is true.<br/>
             <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-2'/>The alternative hypothesis is true.<br/>
             <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-3'/>The p-value is less or equal to the significance level <br/>
             <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-4'/>The p-value is larger than the significance level. 
            </div>
            <a href='./pdf2' className='bg-blue-800 text-white rounded-md absolute top-[522px] left-[220px] px-6 font-serif hover:bg-blue-600'>Get this format</a>
{/* first-sub3  */}
        </div>

        <div className='h-[500px] w-[550px] absolute top-[630px] left-[380px] bg-gray-200 rounded'>
        <div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
        <h1 className='font-serif font-bold text-center relative  -left-[150px] text-[13px] pt-[13px]'>KENDRIYA VIDYALAYA<br/> SANGATHAN,RAIPUR REGION<br/>SCIENCE<br/>SAMPLE QUESTION PAPER - II<br/>2024</h1>
        <img className='h-[120px] w-[120px]  absolute -top-[10px] left-[200px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
        <h1 className='font-serif font-bold text-left text-[13px] pl-[340px] -mt-[90px]'>Subject Code:<br/>Hall Ticket No:<br/>Maximum Marks:<span className='font-thin font-none pl-1'>75</span></h1>
          <h1 className='font-semibold px-10 pt-[60px]'>Sample Multiple Choice Questions for the material since Midterm 2. Sample questions from
              Midterms 1 and 2 are also representative of questions that may appear on the final exam. </h1>

              <div className='flex'>
                <h1 className='pl-[10px] pt-[26px] text-bold font-serif text-[15px] pr-3'>1.</h1>
                <span className='pt-[25px]'>
                For a random sample of 9 women, the average resting pulse rate is x = 76 beats per minute, and the
                sample standard deviation<br/> is s = 5. The standard error of the sample mean is 

                </span><br/>
            </div>
    
             <span className=' font-serif pl-[30px] pt-5'>A. 0.557</span><br/>
             <span className=' font-serif pl-[30px]'>B. 0.745 </span><br/>
             <span className=' font-serif pl-[30px]'>C. 1.667 </span><br/>
             <span className=' font-serif pl-[30px]'>D. 2.778</span>

          </div>
        </div>
        <a href='./pdf3' className='bg-blue-800 text-white rounded-md absolute top-[1150px] left-[590px] px-6 font-serif hover:bg-blue-600 mb-[10px]'>Get this format</a>

        </div>

{/* second format  */}
        <h1 className='font-bold text-center text-[30px] text-serif text-blue-900 mt-3 underline underline-offset-2 absolute top-[1210px] left-[420px]'>Print Question Paper + Answer Key</h1>

    <div className='bg-slate-400 h-full w-full'>

  {/* second-sub1  */}
<div className='h-[500px] w-[550px] absolute top-[1260px] left-[50px] bg-gray-200 rounded mt-7'>
    <div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
    <h1 className='font-serif font-semibold text-center relative top-5 text-sm'><span className='text-red-600'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION </span><br/>
    SCIENCE <br/>CLASS IX (THEORY)
    <br/>SAMPLE QUESTION PAPER - II <br/></h1>
    <img className='h-[50px] w-[50px]  absolute top-[50px] left-[40px] border-4 border-solid' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
    <h1 className='font-serif font-semibold text-left relative top-6 pl-5 pt-10'>Hall Ticket No:<br/>Time:<span className='font-thin font-none pl-1'>3 Hours</span></h1>
    <h1 className='font-serif font-semibold text-left relative -top-[65px] pl-[330px] pt-10'>Subject Code:<br/>Maximum Marks:<span className='font-thin font-none pl-1'>75</span></h1>
    <h1 className='font-serif font-semibold text-center text-xl relative text-blue-900 -mt-[35px]'>Multiple Choice Questions</h1>

    <h1 className='pl-10'>1. <span className='text-xs font-serif'>
    Seema visited a Natural Gas Compressing Unit and found that the gas can
    be liquefied under specific conditions of temperature and pressure. While
    sharing her experience with friends she got confused. Help her to identity
    the correct set of conditions.
     </span></h1>
     <span className='text-xs font-serif pl-10'>(a) Low temperature, low pressure</span><br/>
     <span className='text-xs font-serif pl-10'>(b) High temperature, low pressure</span><br/>
     <span className='text-xs font-serif pl-10 font-semibold'>(c) Low temperature, high pressure</span><br/>
     <span className='text-xs font-serif pl-10'>(d) High temperature, high pressure</span>
     <span className='pl-[160px]'>(1)</span>

    </div>
</div>
 <a href='./pdf1' className='bg-blue-800 text-white rounded-md absolute top-[1810px] left-[250px] px-6 font-serif hover:bg-blue-600'>Get this format</a>

{/* second-sub2  */}
<div className='h-[500px] w-[550px] absolute top-[1260px] left-[680px] bg-gray-200 rounded mt-7'>
<div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
    <div className='h-[160px] w-[500px] bg-amber-50 pt-[20px] '>
      <h1 className='text-left font-semibold font-serif pl-3 text-[13px]'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION<br/>SCIENCE<br/>
              SAMPLE QUESTION PAPER - II<br/>Hall Ticket No:<br/>Subject Code:<br/>Time:<span className='font-normal'>60 Min</span><br/>Maximum Marks:</h1>
      <img className='h-[130px] w-[130px] absolute top-[30px] left-[330px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
    </div>

    <h1 className='pl-5 pt-[10px]'>1. <span className='font-serif'>
    Which of the following is not a correct way to state a null hypothesis?
     </span></h1>
     
     {/* <input className='ml-8 text-xs' type='radio' name='options' value='option-1'/>H0: ˆ ˆ 0 p1 − p2 = 0 <br/>
     <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-2'/>H0: µd = 10<br/>
     <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-3'/>H0: µ1 − µ2 = 0 <br/>
     <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-4'/>H0: p = .5  */}
     <span className='ml-8 text-sm'>(i) H0: ˆ ˆ 0 p1 − p2 = 0</span><br/>
     <span className='ml-8 text-sm'>(ii) H0: µd = 10</span><br/>
     <span className='ml-8 text-sm'>(iii) H0: µ1 − µ2 = 0</span><br/>
     <span className='ml-8 text-sm font-semibold'>(iv) H0: p = .5  </span><br/>

     <h1 className='pl-5 pt-[20px]'>2. <span className='font-serif'>
     A result is called “statistically significant” whenever
     </span></h1>
     
     {/* <input className='ml-8 text-xs' type='radio' name='options' value='option-1'/>The null hypothesis is true.<br/>
     <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-2'/>The alternative hypothesis is true.<br/>
     <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-3'/>The p-value is less or equal to the significance level <br/>
     <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-4'/>The p-value is larger than the significance level.  */}

     <span className='ml-8 text-sm'>(i)The null hypothesis is true.</span><br/>
     <span className='ml-8 text-sm'>(ii)The alternative hypothesis is true</span><br/>
     <span className='ml-8 text-sm font-semibold'>(iii)The p-value is less or equal to the significance level </span><br/>
     <span className='ml-8 text-sm '>(iv)The p-value is larger than the significance level  </span><br/>
    </div>
    <a href='./pdf2' className='bg-blue-800 text-white rounded-md absolute top-[522px] left-[200px] px-6 font-serif hover:bg-blue-600'>Get this format</a>

</div>
{/* second- sub3 */}
<div className='h-[500px] w-[550px] absolute top-[1860px] left-[370px] bg-gray-200 rounded'>
<div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
<h1 className='font-serif font-bold text-center relative  -left-[150px] text-[13px] pt-[13px]'>KENDRIYA VIDYALAYA<br/> SANGATHAN,RAIPUR REGION<br/>SCIENCE<br/>SAMPLE QUESTION PAPER - II<br/>2024</h1>
        <img className='h-[120px] w-[120px]  absolute -top-[10px] left-[200px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
        <h1 className='font-serif font-bold text-left text-[13px] pl-[340px] -mt-[90px]'>Subject Code:<br/>Hall Ticket No:<br/>Maximum Marks:<span className='font-thin font-none pl-1'>75</span></h1>
  <h1 className='font-semibold px-10 pt-[50px]'>Sample Multiple Choice Questions for the material since Midterm 2. Sample questions from
      Midterms 1 and 2 are also representative of questions that may appear on the final exam. </h1>

      <div className='flex'>
        <h1 className='pl-[10px] pt-[26px] text-bold font-serif text-[15px] pr-3'>1.</h1>
        <span className='pt-[25px]'>
        For a random sample of 9 women, the average resting pulse rate is x = 76 beats per minute, and the
        sample standard deviation<br/> is s = 5. The standard error of the sample mean is 

        </span><br/>
    </div>

     <span className=' font-serif pl-[30px] pt-5'>A. 0.557</span><br/>
     <span className=' font-serif pl-[30px]'>B. 0.745 </span><br/>
     <span className=' font-serif pl-[30px] font-semibold'>C. 1.667 </span><br/>
     <span className=' font-serif pl-[30px]'>D. 2.778</span>

  </div>
</div>
<a href='./pdf3' className='bg-blue-800 text-white rounded-md absolute top-[2380px] left-[580px] px-6 font-serif hover:bg-blue-600 mb-[10px]'>Get this format</a>

</div>


{/* third format  */}
<h1 className='font-bold text-center text-[30px] text-serif text-blue-900 mt-3 underline underline-offset-2 absolute top-[2450px] left-[490px]'>Print only Answer Key</h1>
<div className='bg-slate-400 h-full w-full'>

{/* third-sub1  */}
<div className='h-[500px] w-[550px] absolute top-[2500px] left-[50px] bg-gray-200 rounded mt-7'>
  <div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
  <h1 className='font-serif font-semibold text-center relative top-5 text-sm'><span className='text-red-600'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION </span><br/>
  SCIENCE <br/>CLASS IX (THEORY)
  <br/>SAMPLE QUESTION PAPER - II <br/>2024<br/></h1>
  <img className='h-[50px] w-[50px]  absolute top-[50px] left-[40px] border-4 border-solid' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
  <h1 className='font-serif font-semibold text-left relative top-6 pl-5 pt-10'>Hall Ticket No:<br/>Time:<span className='font-thin font-none pl-1'>3 Hours</span></h1>
  <h1 className='font-serif font-semibold text-left relative -top-[65px] pl-[330px] pt-10'>Subject Code:<br/>Maximum Marks:<span className='font-thin font-none pl-1'>75</span></h1>
  <h1 className='font-serif font-semibold text-center text-xl relative text-blue-900 -mt-[35px]'>Multiple Choice Questions</h1>

  <h1 className='pl-10'>1. <span className='text-xs font-serif'>
  Seema visited a Natural Gas Compressing Unit and found that the gas can
  be liquefied under specific conditions of temperature and pressure. While
  sharing her experience with friends she got confused. Help her to identity
  the correct set of conditions.
   </span></h1>
   <span className='text-xs font-serif pl-10 font-semibold'>(c) Low temperature, high pressure</span><br/>

   {/* <span className='pl-[400px] -mt-[50px]'>(1)</span> */}

  </div>
</div>
<a href='./pdf1' className='bg-blue-800 text-white rounded-md absolute top-[3050px] left-[250px] px-6 font-serif hover:bg-blue-600'>Get this format</a>

{/* third-sub2  */}
<div className='h-[500px] w-[550px] absolute top-[2500px] left-[680px] bg-gray-200 rounded mt-7'>
<div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
<div className='h-[160px] w-[500px] bg-amber-50 pt-[20px] '>
      <h1 className='text-left font-semibold font-serif pl-3 text-[13px]'>KENDRIYA VIDYALAYA SANGATHAN, RAIPUR REGION<br/>SCIENCE<br/>
              SAMPLE QUESTION PAPER - II<br/>Hall Ticket No:<br/>Subject Code:<br/>Time:<span className='font-normal'>60 Min</span><br/>Maximum Marks:</h1>
      <img className='h-[130px] w-[130px] absolute top-[30px] left-[330px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
  </div>

  <h1 className='pl-5 pt-[20px]'>1. <span className='font-serif'>
  Which of the following is not a correct way to state a null hypothesis?
   </span></h1>
   <span className='ml-8 text-sm font-semibold'>(iv) H0: p = .5  </span><br/>
   {/* <input className='ml-8 text-xs' type='radio' name='options' value='option-1'/>H0: ˆ ˆ 0 p1 − p2 = 0 <br/>
   <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-2'/>H0: µd = 10<br/>
   <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-3'/>H0: µ1 − µ2 = 0 <br/>
   <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-4'/>H0: p = .5  */}

   <h1 className='pl-5 pt-[20px]'>2. <span className='font-serif'>
   A result is called “statistically significant” whenever
   </span></h1>
   <span className='ml-8 text-sm font-semibold'>(iii)The p-value is less or equal to the significance level </span><br/>

   {/* <input className='ml-8 text-xs' type='radio' name='options' value='option-1'/>The null hypothesis is true.<br/>
   <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-2'/>The alternative hypothesis is true.<br/>
   <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-3'/>The p-value is less or equal to the significance level <br/>
   <input className='ml-8 text-xs' type='radio' name='options' id='female' value='option-4'/>The p-value is larger than the significance level.  */}

<h1 className='pl-5 pt-[20px]'>2. <span className='font-serif'>
For a random sample of 9 women, the average resting pulse rate is x = 76 beats per minute, and the
      sample standard deviation<br/> is s = 5. The standard error of the sample mean is
   </span></h1>
   <span className='ml-8 text-sm font-semibold'>(iii)C. 1.667  </span><br/>
  </div>
  <a href='./pdf2' className='bg-blue-800 text-white rounded-md absolute top-[522px] left-[200px] px-6 font-serif hover:bg-blue-600'>Get this format</a>

</div>
{/* third- sub3 */}
<div className='h-[500px] w-[550px] absolute top-[3100px] left-[370px] bg-gray-200 rounded'>
<div className='bg-white h-[470px] w-[500px] relative left-[23px] top-[15px]'>
<h1 className='font-serif font-bold text-center relative  -left-[150px] text-[13px] pt-[13px]'>KENDRIYA VIDYALAYA<br/> SANGATHAN,RAIPUR REGION<br/>SCIENCE<br/>SAMPLE QUESTION PAPER - II<br/>2024</h1>
        <img className='h-[120px] w-[120px]  absolute -top-[10px] left-[200px]' src={QuizifAilogo} alt="QuizifAi Logo Icon" />
        <h1 className='font-serif font-bold text-left text-[13px] pl-[340px] -mt-[90px]'>Subject Code:<br/>Hall Ticket No:<br/>Maximum Marks:<span className='font-thin font-none pl-1'>75</span></h1>
<h1 className='font-semibold px-10 pt-[40px]'>Sample Multiple Choice Questions for the material since Midterm 2. Sample questions from
    Midterms 1 and 2 are also representative of questions that may appear on the final exam. </h1>

    <div className='flex'>
      <h1 className='pl-[10px] pt-[26px] text-bold font-serif text-[15px] pr-3'>1.</h1>
      <span className='pt-[25px]'>
      For a random sample of 9 women, the average resting pulse rate is x = 76 beats per minute, and the
      sample standard deviation<br/> is s = 5. The standard error of the sample mean is 
      </span><br/>
  </div>
   <span className=' font-serif pl-[30px] font-semibold'>C. 1.667 </span><br/>


   <div className='flex'>
      <h1 className='pl-[10px] pt-[16px] text-bold font-serif text-[15px] pr-3'>2.</h1>
      <span className='pt-[15px]'>
      Which of the following is not a correct way to state a null hypothesis? 
      </span><br/>
  </div>
   <span className=' font-serif pl-[30px] font-semibold'>D. H0: p = .5</span>
</div>
</div>
<a href='./pdf3' className='bg-blue-800 text-white rounded-md absolute top-[3620px] left-[570px] px-6 font-serif hover:bg-blue-600 mb-[10px]'>Get this format</a>


</div>


    </>
   
  )
};