import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "../../slices/authSlice";
import Alert from "../modal/Alert";

function RegisterForm() {
  const [nrpNim, setNrpNim] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // NrpNim validation (numeric check)
    const nrpNimRegex = /^\d{9,}$/;
    if (!nrpNimRegex.test(nrpNim)) {
      setModalContent("NRP/NIM minimal 9 digit, hanya angka.");
      setShowModal(true);
      return;
    }

    // Basic validation for other fields
    if (!fullName) {
      setModalContent("Nama Lengkap harus di isi.");
      setShowModal(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalContent("Please enter a valid email address.");
      setShowModal(true);
      return;
    }

    // Password validation (at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character)
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // min. 8 characters, contain string & number:
    // /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const passwordRegex = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
    if (!passwordRegex.test(password)) {
      setModalContent(
        "Password minimal 8 karakter, terdiri dari kombinasi huruf & angka."
      );
      setShowModal(true);
      return;
    }

    try {
      await dispatch(
        registerUser({ nrpNim, fullName, email, password })
      ).unwrap();
      setModalContent("Register successful!");
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
              placeholder="9 digit NRP/NIM"
              value={nrpNim}
              onChange={(e) => setNrpNim(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="fullName"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Nama Lengkap
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
              placeholder="Masukkan Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
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
              placeholder="contoh: nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <div className="mt-2">
              <ul className="list-disc ml-6 text-sm font-light text-gray-800">
                <li>Minimal 8 karakter</li>
                <li>Kombinasi huruf & angka</li>
                {/* <li>Kombinasi huruf, angka & special karakter</li>
                <li>Terdiri dari huruf besar & kecil</li> */}
              </ul>
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
          Daftar Akun
        </button>
      </form>
      <Alert
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Register Status"
      >
        <p>{modalContent}</p>
      </Alert>
    </div>
  );
}

export default RegisterForm;
