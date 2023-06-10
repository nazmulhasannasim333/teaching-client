import React, { useState } from 'react';

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://img.freepik.com/free-photo/classmates-holding-folders_1098-1068.jpg?w=996&t=st=1686076624~exp=1686077224~hmac=fbff1e5404809667363cf582a2d9acd691b74a6ab4cf2ceda00ea077d73a9340',
      caption: 'Slide 1',
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam tenetur mollitia, vero eveniet aspernatur assumenda minus! Dolorem delectus, sunt iusto magnam iure nesciunt quod hic fuga explicabo reprehenderit dolores cumque?",
    },
    {
      id: 2,
      image: 'https://img.freepik.com/free-photo/ready-back-school_1134-12.jpg?w=996&t=st=1686076209~exp=1686076809~hmac=75dde7197009dbe5532917c9828b7e743ecedf5a7abada3440e29f3d6ad6aed3',
      caption: 'Slide 2',
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam tenetur mollitia, vero eveniet aspernatur assumenda minus! Dolorem delectus, sunt iusto magnam iure nesciunt quod hic fuga explicabo reprehenderit dolores cumque?",
    },
    {
      id: 3,
      image: 'https://img.freepik.com/free-photo/students-knowing-right-answer_329181-14271.jpg?w=996&t=st=1686075212~exp=1686075812~hmac=4f9c421de4b0a4adb2c6e818cb0c1a461a5d5a025e3d9f2afceae4dbe4ee14fb',
      caption: 'Slide 3',
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, suscipit?",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const goToNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const goToPrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="relative">
    <div className="flex h-[800px]">
      <div className="relative w-full">
        <img src={slides[activeSlide].image} alt={slides[activeSlide].caption} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 h-full flex flex-col justify-center pl-8">
          <div className='max-w-2xl lg:ms-32 mx-4'>
          <h1 className="text-white text-3xl font-bold mb-4 ">{slides[activeSlide].caption}</h1>
          <p className="text-white ">{slides[activeSlide].description}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-center mt-2">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          className={`w-3 h-3 mx-2 rounded-full ${activeSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={() => goToSlide(index)}
        ></button>
      ))}
    </div>

    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
      <button
        className="bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 p-2 rounded-full"
        onClick={goToPrevSlide}
      >
        Prev
      </button>
    </div>

    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
      <button
        className="bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 p-2 rounded-full"
        onClick={goToNextSlide}
      >
        Next
      </button>
    </div>
  </div>
  );
};

export default Slider;