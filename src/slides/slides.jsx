
// // // import React, { useState } from 'react';
// // // import "../slides/slides.css";

// // // const Slides = () => {
// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const slides = [
// // //     {
// // //       title: 'Intelligent Quiz Generation & Simplified Exam Management',
// // //       description: 'Transforms textbooks and PDFs into quizzes and simplifies exam and quiz management',
      
// // //     },
// // //     {
// // //       title: 'Targeted Competitive Exam Prep',
// // //       description: 'Provides targeted quizzes for competitive exam preparation',
      
// // //     },
// // //   ];

// // //   const handleNextSlide = () => {
// // //     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
// // //   };

// // //   const handlePrevSlide = () => {
// // //     setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
// // //   };

// // //   return (
// // //     <div className="slides-container">
// // //       <div
// // //         className="slide"
// // //         style={{ backgroundColor: slides[currentSlide].backgroundColor }}
// // //       >
// // //         <h2>{slides[currentSlide].title}</h2>
// // //         <p>{slides[currentSlide].description}</p>
// // //       </div>
// // //       <div className="arrows">
// // //         <button onClick={handlePrevSlide}>
// // //           <span>&lt;</span>
// // //         </button>
// // //         <button onClick={handleNextSlide}>
// // //           <span>&gt;</span>
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Slides;





// // import React, { useState } from 'react';
// // import "../slides/slides.css";

// // const Slides = () => {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const slides = [
// //     {
// //       title: 'Intelligent Quiz Generation & Simplified Exam Management',
// //     },
// //     {
// //       title: 'Targeted Competitive Exam Prep',
// //     },
// //     {
// //       title: 'Automated Quiz Creation from Textbooks and PDFs',
// //     },
// //     {
// //       title: 'Efficient Exam and Quiz Management for Teachers',
// //     },
// //   ];

// //   const handleNextSlide = () => {
// //     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
// //   };

// //   const handlePrevSlide = () => {
// //     setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
// //   };

// //   return (
// //     <div className="slides-container">
// //       <div className="slide">
// //         <h2>{slides[currentSlide].title}</h2>
// //       </div>
// //       <div className="arrows">
// //         {currentSlide !== 0 && (
// //           <button onClick={handlePrevSlide}>
// //             <span>&lt;</span>
// //           </button>
// //         )}
// //         {currentSlide !== slides.length - 1 && (
// //           <button onClick={handleNextSlide}>
// //             <span>&gt;</span>
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Slides;

// import React, { useState } from 'react';
// import "../slides/slides.css";

// const Slides = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     {
//       title: 'Our QuizifAI enhances organizations by integrating AI-powered Quiz and Exam companions',
//     },
//     {
//       title: 'QuizifAI is an AI-powered SaaS application that generates quizzes from textbooks and PDFs',
//     },
//     {
//       title: 'This platform helps teachers manage exams and quizzes efficiently',
//     },
//     {
//       title: 'It also provides course-specific quizzes to assist with competitive exam preparation',
//     },
//   ];

//   const handleNextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="slides-container">
//       <div className="slide">
//         <h2>{slides[currentSlide].title}</h2>
//       </div>
//       <div className="arrows">
//         {currentSlide !== 0 && (
//           <button onClick={handlePrevSlide}>
//             <span>&lt;</span>
//           </button>
//         )}
//         {currentSlide !== slides.length - 1 && (
//           <button onClick={handleNextSlide}>
//             <span>&gt;</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Slides;



import React, { useState } from 'react';
import "../slides/slides.css";

const Slides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Our QuizifAI enhances organizations by integrating AI-powered Quiz and Exam companions',
    },
    {
      title: 'QuizifAI is an AI-powered SaaS application that generates quizzes from textbooks and PDFs',
    },
    {
      title: 'This platform helps teachers manage exams and quizzes efficiently',
    },
    {
      title: 'It also provides course-specific quizzes to assist with competitive exam preparation',
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slides-container">
      <div className="slide">
        <h2>{slides[currentSlide].title}</h2>
      </div>
      <div className="arrows">
        {currentSlide === 0 && (
          <button onClick={handleNextSlide}>
            <span>&gt;</span>
          </button>
        )}
        {currentSlide === 1 || currentSlide === 2 ? (
          <>
            <button onClick={handlePrevSlide}>
              <span>&lt;</span>
            </button>
            <button onClick={handleNextSlide}>
              <span>&gt;</span>
            </button>
          </>
        ) : currentSlide === 3 && (
          <button onClick={handlePrevSlide}>
            <span>&lt;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Slides;
