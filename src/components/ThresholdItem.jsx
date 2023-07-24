const ThresholdItem = ({ label, name, value, onThresholdChange }) => {
  const handleThresholdChange = (event) => {
    const newValue =
      event.target.value === ""
        ? ""
        : Math.max(0, parseInt(event.target.value, 10));
    onThresholdChange(name, newValue); // Call the function from the parent component
  };

  return (
    <div className="w-full flex justify-between items-center">
      <p>{label}</p>
      <input
        className="text-black px-2"
        type="number"
        name={name}
        value={value || ""} // Provide a default value of an empty string if value is undefined
        onChange={handleThresholdChange}
        placeholder="0"
      />
    </div>
  );
};

export default ThresholdItem;
