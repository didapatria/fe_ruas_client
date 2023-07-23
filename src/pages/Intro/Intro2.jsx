const Intro2 = ({ title, content }) => {
  return (
    <div className="space-y-10 w-full">
      <div className="text-center space-y-5">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-lg">{content}</p>
      </div>
      <div className="flex justify-around">
        <div className="bg-gray-200 rounded-lg w-80 aspect-square text-gray-800 flex items-center justify-center">
          Placeholder
        </div>
        <div className="bg-gray-200 rounded-lg w-80 aspect-square text-gray-800 flex items-center justify-center">
          Placeholder
        </div>
        <div className="bg-gray-200 rounded-lg w-80 aspect-square text-gray-800 flex items-center justify-center">
          Placeholder
        </div>
      </div>
    </div>
  );
};

export default Intro2;
