
import React, { useState } from 'react';
import './slides.css';

const Slides = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Generate Exams and Quizzes Quickly for your course',
      description: [
        'Generate quizzes and exams quickly using QuizifAI.',
        'QuizifAI understands your courses and generates',
        'subjective and objective questions instantly.'
      ]
    },
    {
      title: 'Use your Textbooks and Notes to generate Quizzes',
      description: [
        'You can use your textbooks and notes in different',
        'formats to generate quizzes using QuizifAI.'
      ]
    },
    {
      title: 'Try our Premium Quizzes, Exams',
      description: [
        'QuizifAI\'s premium quizzes are carefully crafted for',
        'specific needs, and reviewed by professionals to make',
        'it more useful for exam takers.'
      ]
    },
    {
      title: 'Excited to try our AI Generated Quiz by QuizifAI?',
      description: [
        'Click here to access our AI Generated Quiz.'
      ]
    }
  ];

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  const handleNextSlide = () => {
    setActiveSlide((activeSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((activeSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slides-container">
      <div className="slides-wrapper" style={{
        transform: `translateX(-${activeSlide * 100}%)`
      }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${activeSlide === index ? 'active' : ''}`}
          >
            <h2>{slide.title}</h2>
            <p>
              {slide.description.map((desc, index) => (
                <span key={index}>{desc}<br /></span>
              ))}
            </p>
          </div>
        ))}
      </div>
      <div className="dots-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${activeSlide === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slides;