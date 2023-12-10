import { FiArrowRightCircle } from "react-icons/fi";

const Intro1 = ({ title, content, toggleStep }) => {
  return (
    <div className="flex m-10 space-x-10 container mx-auto h-auto justify-center">
      <div className="w-4/12 flex justify-center items-start">
        <div className="bg-slate-200 rounded-3xl py-10 px-5">
          <img src="./assets/images/enable-webcams.png" alt="Enable Webcams" />
        </div>
      </div>
      <div className="w-5/12">
        <div className="max-w-full space-y-5">
          <h1 className="text-5xl">{title}</h1>
          <ul className="list-decimal text-lg ml-5">
            {content.map((data) => (
              <li key={data.id}>{data.list}</li>
            ))}
          </ul>
          <button
            onClick={(event) => toggleStep(2)}
            className="md:mt-8 mt-0 bg-gradient-to-r from-gray-300 to-gray-500 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-all duration-300 ease-in-out md:space-x-2"
          >
            <span className="hidden md:block">Selanjutnya</span>
            <FiArrowRightCircle className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro1;
