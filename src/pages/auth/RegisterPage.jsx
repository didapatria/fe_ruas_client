import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full">
        <h2 className="text-center text-2xl font-bold mb-6">
          Daftar Akun Baru
        </h2>
        <RegisterForm />
        <p className="text-center mt-4">
          Sudah memiliki akun?{" "}
          <Link
            to="/auth/login"
            className="text-blue-600 hover:text-blue-700 transition duration-300"
          >
            Login disini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
