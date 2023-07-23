const Dots = ({ toggleStep, step, active }) => {
  return (
    <button
      className={`text-xl rounded-full w-fit p-2 ${
        active === step ? `bg-slate-800` : `bg-slate-500`
      }`}
      onClick={(event) => toggleStep(step)}
    />
  );
};

export default Dots;
