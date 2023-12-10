import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../slices/dataSlice";
import { useNavigate } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi";
const Intro2 = ({ title, subtitle, img }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: threshold,
    isLoading,
    error,
  } = useSelector((state) => state.data);
  console.log("isLoading", isLoading);

  if (isLoading === false) {
    console.log("threshold:", threshold);
  }

  useEffect(() => {
    (async () => {
      await dispatch(fetchData("threshold"));
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     try {
  //       const thresholdData = await dispatch(fetchData("threshold"));
  //       console.log("thresholdData:", thresholdData.payload);
  //       setThreshold(thresholdData.payload);
  //       console.log("threshold:", threshold);
  //       // setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchDataAsync();
  // }, [dispatch]);

  const navigateToDetect = () => {
    navigate("/detect");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div>
          <h1 className="text-5xl mb-5 animate-pulse">Loading . . .</h1>
          <p>Proses pengambilan data sedang dilakukan, silakan tunggu</p>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div>
          <h1 className="text-5xl mb-5 animate-pulse">Ooops ! ! !</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container space-y-10 mx-auto">
      <div className="text-center space-y-5">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
      <div className="md:flex justify-around md:space-y-0 space-y-10">
        {img.map((data) => (
          <div key={data.id} className="relative">
            <div
              className="bg-gray-200 rounded-lg md:w-80 w-40 aspect-square text-gray-800 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(./assets/images/${data.url})` }}
            />
            <div className="text-lg bg-slate-800 bg-opacity-75 rounded-b-lg p-5 absolute inset-x-0 bottom-0 w-40 md:w-full">
              {data.label}
            </div>
            <span className="absolute flex md:-right-5 right-0 md:-bottom-5 bottom-0">
              <div className="flex items-end font-black text-gray-800">
                Threshold:
              </div>
              <div className="md:text-9xl text-8xl font-black bg-gradient-to-br from-gray-400 to-gray-600 bg-clip-text text-transparent">
                {threshold[data.category]}
              </div>
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={navigateToDetect}
          className="md:mt-8 mt-0 bg-gradient-to-r from-gray-300 to-gray-500 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-all duration-300 ease-in-out md:space-x-2"
        >
          <span className="hidden md:block">Start Detection</span>
          <FiArrowRightCircle className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Intro2;
