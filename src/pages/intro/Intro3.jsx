import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ThresholdItem from "../../components/ThresholdItem";

const Intro3 = ({ title, subtitle, content }) => {
  const [thresholds, setThresholds] = useState({});

  const navigate = useNavigate();

  const handleThresholdChange = (name, value) => {
    setThresholds((prevThresholds) => ({
      ...prevThresholds,
      [name]: value,
    }));
  };

  const handleClick = (event) => {
    event.preventDefault();

    // Navigate to /detect
    navigate("/detect", { state: thresholds });
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-4/5 space-y-5">
          <h1 className="text-5xl text-center">{title}</h1>
          <p className="text-lg">{subtitle}</p>
          <form>
            <div className="w-1/3 space-y-5 text-lg">
              {content.map((data, index) => (
                <ThresholdItem
                  key={data.id}
                  label={data.label}
                  name={data.name}
                  value={thresholds[data.name]} // Pass the value from the state
                  onThresholdChange={handleThresholdChange}
                />
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="text-xl bg-slate-800 rounded-full w-fit py-2 px-8"
                onClick={handleClick}
              >
                Simpan Pengaturan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Intro3;
