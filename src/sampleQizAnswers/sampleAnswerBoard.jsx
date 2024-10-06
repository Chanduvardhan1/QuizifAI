import React from 'react';
import './sampleAnswerBoard.css'

function sampleAnswerBoard(props) {
    return (
        <div className='ml-[19%] mt-[4%]'>
            {props.q?.map((question, x) => {
                return (
                    <div className='answerQ' key={x} >
                        <h3>{` ${x + 1}. ${question.question}`}</h3>

                        {question.options.map((option, y) => {
                            return (
                                <div key={y} className={`flex items-center mb-4 ${y === question.answerIndex ? 'correctAnswerQ' : ''}`}>
                                    <div
                                        className={`mr-2 font-normal font-[historic] w-[40px] rounded-[5px] h-[37px] p-[8px] border-[1px] border-solid border-[#D3D3D3]  bg-[#E8E9E8]  flex justify-center text-center justify-items-center items-center text-[10px]`}>
                                        {String.fromCharCode(97 + y).toUpperCase()}
                                    </div>
                                    <div
                                        className={`w-[50%]  h-[37px] rounded-[5px] border-solid border-[#D3D3D3] border-[1.8px] p-[5px] text-[11px] text-[#000] ${y === question.answerIndex ? 'correct-answer-option' : ''}`}>
                                        {option.answer_option_text}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default sampleAnswerBoard;