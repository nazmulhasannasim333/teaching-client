import React from "react";
import { Fade } from "react-awesome-reveal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/8466786/pexels-photo-8466786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "Start from Play",
      description:
        "Schools also often offer extracurricular activities such as sports, arts, clubs, and organizations, which allow students to explore their interests and develop talents outside of the classroom. These activities promote teamwork, leadership, and personal growth",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/8363152/pexels-photo-8363152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "Know about Earth",
      description:
        "Furthermore, schools serve as a social environment where students interact with their peers, make friends, and learn important social  abilities, and gain exposure to diverse perspectives and cultures.",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/5427666/pexels-photo-5427666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "Classes Time",
      description:
        "Schools can vary greatly in terms of size, location, educational philosophies, and available resources. Each school has its own unique community, values, and educational approach, which contribute to its overall identity and atmosphere",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/9159042/pexels-photo-9159042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "Lab Room Testing",
      description:
        "Lab Room testing by, schools serve as a social environment where students interact with their peers, make friends, and learn important social  abilities, and gain exposure to diverse perspectives and cultures.",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/8500290/pexels-photo-8500290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "Class Room  and Reading",
      description:
        "Lab Room testing by, schools serve as a social environment where students interact with their peers, make friends, and learn important social  abilities, and gain exposure to diverse perspectives and cultures.",
    },
  ];

  return (
    <Carousel autoPlay={1} className="text-center">
      {
        slides.map((slide, i) => <div className="relative" key={i}>
        <img src={slide.image} />
        <Fade className="absolute bg-opacity-50 bg-gray-800 top-0 left-0 w-full h-full flex items-center justify-center" delay={1e3} cascade damping={1e-1}>
          <div className="bg-opacity-25 bg-gray-800 p-10 lg:max-w-7xl w-full rounded-md text-white lg:mb-40">
          <h1 className="lg:text-5xl text-xl my-4">{slide.caption}</h1>
          <p className="text-white lg:text-lg text-sm">{slide.description}</p>
          </div>
        </Fade>
      </div>)
      }
    </Carousel>
  );
};

export default Slider;
