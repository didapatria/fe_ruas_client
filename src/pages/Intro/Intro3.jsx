const Intro3 = ({ title, content }) => {
  return (
    <div className="max-w-2xl m-auto">
      <div className="max-w-full space-y-5">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-lg">{content}</p>
      </div>
    </div>
  );
};

export default Intro3;
