const Welcome = ({ toggleSlide }) => {
  return (
    <div className="space-y-5">
      <div className="text-center">Selamat Datang</div>
      <div className="w-full flex justify-center">
        <button
          className="text-xl bg-slate-500 rounded-full w-fit p-2"
          onClick={(event) => toggleSlide("intro")}
        >
          Tombol ke intro
        </button>
      </div>
    </div>
  );
};

export default Welcome;
