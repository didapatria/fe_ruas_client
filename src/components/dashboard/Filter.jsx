import { useState } from "react";
import { FiRotateCw, FiSearch } from "react-icons/fi";

export default function Filter({ filterText, onFilter, onClear }) {
  const [isSpinning, setIsSpinning] = useState(false);

  const onRefresh = () => {
    setIsSpinning(true);
    // Trigger any refresh logic here
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
    // Call the onClear function if needed
    if (onClear) {
      onClear();
    }
  };

  const handleClick = () => {
    onRefresh();
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          id="search"
          type="text"
          placeholder="Search by Filter"
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
          className="mt-1 px-4 py-2 block w-full rounded-md border-gray-400 shadow-sm"
        />
        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
      </div>
      <button
        onClick={handleClick}
        className="flex items-center justify-center bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-500 md:space-x-2"
      >
        <FiRotateCw className={`text-xl ${isSpinning ? "animate-spin" : ""}`} />
        <span className="hidden md:block">Refresh</span>
      </button>
    </div>
  );
}
