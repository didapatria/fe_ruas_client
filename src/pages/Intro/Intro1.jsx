const Intro1 = ({ title, content }) => {
  return (
    <div className="flex m-10 space-x-10 w-full">
      <div className="w-1/2 flex justify-center items-center bg-slate-200 rounded-3xl aspect-video py-10 px-5">
        <img src="./assets/images/enable-webcams.png" alt="Enable Webcams" />
      </div>
      <div className="flex-1">
        <div className="max-w-full space-y-5">
          <h1 className="text-5xl">{title}</h1>
          <ul className="list-decimal text-lg ml-5">
            {content.map((data) => (
              <li>{data.list}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Intro1;
