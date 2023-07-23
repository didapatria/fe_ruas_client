const Welcome = ({ toggleSlide }) => {
  return (
    <div className="space-y-5">
      <div className="text-center max-w-4xl leading-tight text-5xl">
        Selamat Datang di Web App
        <br />
        Simulasi Deteksi Kecurangan Akademis
      </div>
      <div className="w-full flex justify-center">
        <button
          className="text-xl bg-slate-800 rounded-full w-fit py-2 px-8"
          onClick={(event) => toggleSlide("intro1")}
        >
          Cari Tahu
        </button>
      </div>
    </div>
  );
};

export default Welcome;
