import { useState } from "react";

import Welcome from "./section/Welcome";
import Intro from "./section/Intro";

const WelcomePage = () => {
  const [slide, setSlide] = useState("welcome");
  const toggleSlide = (value) => {
    setSlide(value);
  };

  return (
    <div className="w-full min-h-screen bg-gray-600 text-white text-5xl flex justify-center items-center">
      {slide === "welcome" ? <Welcome toggleSlide={toggleSlide} /> : null}
      {slide === "intro" ? <Intro toggleSlide={toggleSlide} /> : null}
    </div>
  );
};

export default WelcomePage;
