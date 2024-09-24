// import React, { useState } from 'react';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import "../slides/slides.css";

// const Slides = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slides = [
//     {
//       title: 'Intelligent Quiz Generation',
//       description: 'Transforms textbooks and PDFs into quizzes',
//       backgroundColor: '#f7f7f7',
//     },
//     {
//       title: 'Simplified Exam Management',
//       description: 'Simplifies exam and quiz management',
//       backgroundColor: '#e5e5e5',
//     },
//     {
//       title: 'Targeted Competitive Exam Prep',
//       description: 'Provides targeted quizzes for competitive exam preparation',
//       backgroundColor: '#d3d3d3',
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
//       <div
//         className="slide"
//         style={{ backgroundColor: slides[currentSlide].backgroundColor }}
//       >
//         <h2>{slides[currentSlide].title}</h2>
//         <p>{slides[currentSlide].description}</p>
//       </div>
//       <div className="arrows">
//         <button onClick={handlePrevSlide}>
//           <FaArrowLeft />
//         </button>
//         <button onClick={handleNextSlide}>
//           <FaArrowRight />
//         </button>
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
      title: 'Intelligent Quiz Generation & Simplified Exam Management',
      description: 'Transforms textbooks and PDFs into quizzes and simplifies exam and quiz management',
      // backgroundColor: '#f7f7f7',
    },
    {
      title: 'Targeted Competitive Exam Prep',
      description: 'Provides targeted quizzes for competitive exam preparation',
      // backgroundColor: '#d3d3d3',
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
      <div
        className="slide"
        style={{ backgroundColor: slides[currentSlide].backgroundColor }}
      >
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].description}</p>
      </div>
      <div className="arrows">
        <button onClick={handlePrevSlide}>
          <span>&lt;</span>
        </button>
        <button onClick={handleNextSlide}>
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Slides;