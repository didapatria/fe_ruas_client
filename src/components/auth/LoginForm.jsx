import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../../slices/authSlice";
import Alert from "../modal/Alert";

function LoginForm() {
  const [nrpNim, setNrpNim] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the loginUser action
    try {
      // Assuming loginUser is an async function returning a promise
      await dispatch(loginUser({ nrpNim, password })).unwrap();
      setModalContent("Login successful!");
      setShowModal(true);
    } catch (error) {
      setModalContent(error);
      setShowModal(true);
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white container w-96 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-10">
          <div className="form-group">
            <label
              htmlFor="nrpNim"
              className="form-label inline-block mb-2 text-gray-700"
            >
              NRP/NIM
            </label>
            <input
              type="text"
              className="form-control 
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="nrpNim"
              placeholder="Masukkan NRP/NIM"
              value={nrpNim}
              onChange={(e) => setNrpNim(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordType}
                className="form-control 
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-2 right-3"
              >
                {passwordType === "password" ? (
                  <FiEyeOff className="text-xl text-slate-400" />
                ) : (
                  <FiEye className="text-xl text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
        >
          Login
        </button>
      </form>
      <Alert
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Login Status"
      >
        <p>{modalContent}</p>
      </Alert>
    </div>
  );
}

export default LoginForm;
