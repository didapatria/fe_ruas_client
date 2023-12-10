import { useState } from "react";

import Dots from "../../components/Dots";
import Intro1 from "./Intro1";
import Intro2 from "./Intro2";

import dataIntro from "../../model/dataIntro";

const Intro = () => {
  const [step, setStep] = useState(1);
  const toggleStep = (value) => {
    setStep(value);
  };
  return (
    <div className="space-y-5 w-full">
      <div className="m-4 h-[85vh] overflow-auto">
        {dataIntro.map((data) => (
          <div
            key={data.id}
            className={step === data.id ? "flex w-full h-full" : "hidden"}
          >
            {step === data.id && (
              <>
                {data.id === 1 && (
                  <Intro1
                    title={data.title}
                    content={data.content}
                    toggleStep={toggleStep}
                  />
                )}
                {data.id === 2 && (
                  <Intro2
                    title={data.title}
                    subtitle={data.subtitle}
                    img={data.img}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center space-x-5">
        {dataIntro.map((data) => (
          <Dots
            key={data.id}
            toggleStep={toggleStep}
            step={data.id}
            active={step}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;
