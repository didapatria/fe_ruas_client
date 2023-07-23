const Intro2 = ({ title, subtitle, img }) => {
  return (
    <div className="space-y-10 w-full">
      <div className="text-center space-y-5">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
      <div className="flex justify-around">
        {img.map((data) => (
          <div key={data.id} className="relative">
            <div
              className="bg-gray-200 rounded-lg w-80 aspect-square text-gray-800 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(./assets/images/${data.url})` }}
            />
            <div className="text-center text-lg bg-slate-800 bg-opacity-75 rounded-b-lg py-5 absolute inset-x-0 bottom-0">
              {data.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intro2;
