import React, { useState } from 'react';
import './sampleAnswerBoard.css'

function sampleAnswerBoard(props) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Manage selected question index

    return (
        // <div className='ml-[19%] mt-[4%]'>
        //     {props.q?.map((question, x) => {
        //         return (
        //             <div className='answerQ' key={x} >
        //                 <h3 className='heading1'>{` ${x + 1}. ${question.question}`}</h3>

        //                 {question.options.map((option, y) => {
        //                     return (
        //                         <div key={y} className={`flex items-center mb-4 font-[lato]  ml-[-14%] ${y === question.answerIndex ? 'correctAnswerQ' : ''}`}>
        //                             <div
        //                                 className={`mr-2 font-normal font-[lato] w-[40px] rounded-[5px] h-[37px] p-[8 border-[#777777] border-[1px] border-solid border-[#D3D3D3]    flex justify-center text-center justify-items-center items-center text-[14px]`}>
        //                                 {String.fromCharCode(97 + y).toUpperCase()}
        //                             </div>
        //                             <div
        //                                 className={`w-[40%] font-[lato] h-[37px] rounded-[5px] border-solid border-[#D3D3D3] border-[#777777] border-[1.8px] p-[5px] text-[14px] text-[#000]  ${y === question.answerIndex ? 'correct-answer-option' : ''}`}>
        //                                 {option.answer_option_text}
        //                             </div>
        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //         )
        //     })}
        // </div>
        <div>
      {/* Question Navigation */}
      <div className="flex justify-center  my-6">
        {props.q?.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentQuestionIndex(index)} // Set selected question index
            className={`cursor-pointer w-8 h-8 flex items-center justify-center border-[1px] border-green-500  text-sm font-medium ${
              index === currentQuestionIndex
                ? "bg-blue-500 text-white" // Highlight selected question
                : "bg-green-200"
            }`}
          >
            {index + 1}
          </div>
          
        ))}
        
      </div>

      {/* Display Current Question */}
      <div className=" w-full mt-[4%]">
        {props.q && props.q[currentQuestionIndex] && (
          <div className="answerQ w-full px-5">
            <h3 className="heading1">{`${
              currentQuestionIndex + 1
            }. ${props.q[currentQuestionIndex].question}`}</h3>

            {props.q[currentQuestionIndex].options.map((option, y) => (
              <div
                key={y}
                className={`flex items-center mb-4 font-[lato] ${
                  y === props.q[currentQuestionIndex].answerIndex
                    ? "correctAnswerQ"
                    : ""
                }`}
              >
                <div
                  className={`mr-2 font-normal font-[lato] w-[40px] rounded-[5px] h-[37px] p-[8px] border-[#777777] border-[1px] border-solid border-[#D3D3D3] flex justify-center text-center items-center text-[14px]`}
                >
                  {String.fromCharCode(97 + y).toUpperCase()}
                </div>
                <div
                  className={`w-[100%] font-[lato] h-[37px] rounded-[5px] border-solid border-[#D3D3D3] border-[#777777] border-[1.8px] p-[5px] text-[14px] text-[#000] ${
                    y === props.q[currentQuestionIndex].answerIndex
                      ? "correct-answer-option"
                      : ""
                  }`}
                >
                  {option.answer_option_text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    )
}

export default sampleAnswerBoard;