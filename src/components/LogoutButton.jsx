import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice"; // Adjust the import path as needed
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center px-4 py-2 bg-red-400 text-black text-base font-medium rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 space-x-2"
    >
      <FiLogOut className="text-xl" />
      <span className="hidden md:block">Logout</span>
    </button>
  );
};

export default LogoutButton;
