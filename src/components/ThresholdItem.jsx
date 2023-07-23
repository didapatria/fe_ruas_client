import { useState } from "react";

const ThresholdItem = ({ label, name }) => {
  const [threshold, setThreshold] = useState(0);

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <p>{label}</p>
      <input
        className="text-black px-2"
        type="number"
        min={0}
        name={name}
        value={threshold}
        onChange={handleThresholdChange}
      />
    </div>
  );
};

export default ThresholdItem;
