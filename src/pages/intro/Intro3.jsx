import ThresholdItem from "../../components/ThresholdItem";

const Intro3 = ({ title, subtitle, content }) => {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-4/5 space-y-5">
          <h1 className="text-5xl text-center">{title}</h1>
          <p className="text-lg">{subtitle}</p>
          <div className="w-1/3 space-y-5 text-lg">
            {content.map((data) => (
              <ThresholdItem
                key={data.id}
                label={data.label}
                name={data.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro3;
