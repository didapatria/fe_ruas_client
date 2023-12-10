import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div>
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <LoginForm />
        <p className="text-center mt-4">
          Belum punya akun?{" "}
          <Link
            to="/auth/register"
            className="text-blue-600 hover:text-blue-700 transition duration-300"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
