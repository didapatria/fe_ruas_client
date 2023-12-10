import { useEffect, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";

const ThresholdForm = ({ isOpen, onClose, onSave, data }) => {
  const [tengokKiriKanan, setTengokKiriKanan] = useState(
    data?.tengok_kiri_kanan ?? 999
  );
  const [lihatDepan, setLihatDepan] = useState(data?.lihat_depan ?? 999);
  const [lihatAtas, setLihatAtas] = useState(data?.lihat_atas ?? 999);

  useEffect(() => {
    if (data) {
      setTengokKiriKanan(data.tengok_kiri_kanan);
      setLihatDepan(data.lihat_depan);
      setLihatAtas(data.lihat_atas);
    }
  }, [data]);

  const handleSave = () => {
    const newThreshold = {
      tengok_kiri_kanan: tengokKiriKanan,
      lihat_depan: lihatDepan,
      lihat_atas: lihatAtas,
    };
    onSave(newThreshold);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-10 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center px-4 py-6`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="bg-white rounded-lg p-8 m-4 max-w-lg mx-auto my-16 relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center space-x-10">
          <h3 className="text-xl font-semibold">
            Form Batasan Deteksi Menyontek
          </h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 hover:text-gray-800 p-2 rounded-full"
          >
            <FiX />
          </button>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="tengokKiriKanan"
              className="block text-sm font-medium text-gray-700"
            >
              Tengok Kiri-Kanan:
            </label>
            <input
              type="number"
              id="tengokKiriKanan"
              value={tengokKiriKanan}
              required
              onChange={(e) => setTengokKiriKanan(e.target.value)}
              className="mt-1 px-3 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lihatDepan"
              className="block text-sm font-medium text-gray-700"
            >
              Lihat Depan:
            </label>
            <input
              type="number"
              id="lihatDepan"
              value={lihatDepan}
              required
              onChange={(e) => setLihatDepan(e.target.value)}
              className="mt-1 px-3 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lihatAtas"
              className="block text-sm font-medium text-gray-700"
            >
              Lihat Atas:
            </label>
            <input
              type="number"
              id="lihatAtas"
              value={lihatAtas}
              required
              onChange={(e) => setLihatAtas(e.target.value)}
              className="mt-1 px-3 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </form>
        <button
          onClick={handleSave}
          className="mt-4 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors w-full space-x-2"
        >
          <FiSave className="text-xl" />
          <span>Simpan</span>
        </button>
      </div>
    </div>
  );
};

export default ThresholdForm;
