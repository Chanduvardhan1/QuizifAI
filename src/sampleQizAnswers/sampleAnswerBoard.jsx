import React from 'react';

function sampleAnswerBoard(props) {
    return (
        <div>
            {props.q?.map((question, x) => {
                return (
                    <div key={x}>
                        <h3>{`Question ${x + 1}: ${question.question}`}</h3>

                        {question.options.map((option, y) => {
                            return (
                                <div key={y} className={`flex items-center mb-4 ${y === option.answerIndex ? 'correctAnswer' : ''}`}>
                                    <div
                                        className={`mr-2 font-normal w-[40px] rounded-[5px] h-[37px] p-[8px] border-[1px] border-solid border-[#D3D3D3]  bg-[#E8E9E8]  flex justify-center text-center justify-items-center items-center text-[10px]`}>
                                        {String.fromCharCode(97 + x).toUpperCase()}
                                    </div>
                                    <div
                                        className={`w-[50%] bg-[#E8E9E8]  h-[37px] rounded-[5px] border-solid border-[#D3D3D3] border-[1.8px] p-[5px] text-[11px] text-[#000]`}>
                                        {option.answer_option_text}
                                    </div>
                                </div>
                            )
                        })}
                        <p className="correct-answer">Correct Answer: {question.options[question.answerIndex].answer_option_text}</p>
                    </div>
                )
            })}

        </div>
    )
}


export default sampleAnswerBoard;