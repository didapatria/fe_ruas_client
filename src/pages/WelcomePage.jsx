import { useState } from "react";

import Welcome from "./welcome";
import Intro from "./intro";

const WelcomePage = () => {
  const [slide, setSlide] = useState("welcome");
  const toggleSlide = (value) => {
    setSlide(value);
  };

  return (
    <div className="w-full min-h-screen bg-gray-600 text-white flex justify-center items-center">
      {slide === "welcome" ? (
        <Welcome toggleSlide={toggleSlide} slide={slide} />
      ) : null}
      {slide === "intro1" ? (
        <Intro toggleSlide={toggleSlide} slide={slide} />
      ) : null}
    </div>
  );
};

export default WelcomePage;
