import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ================= GOOGLE LOGIN ================= */
  // const googleLogin = () => {
  //   window.location.href = "http://localhost:5000/api/auth/google";
  // };
  const googleLogin = () => {
  window.location.href =
    "https://resume-builder-p13s.onrender.com/api/auth/google";
};

  /* ================= NORMAL LOGIN / REGISTER ================= */
  const submit = async () => {
    try {
      if (!form.email || !form.password || (!isLogin && !form.name)) {
        return alert("Please fill all fields");
      }

      if (!form.email.endsWith("@gmail.com")) {
        return alert("Only Gmail addresses are allowed");
      }

      const url = isLogin ? "/api/auth/login" : "/api/auth/register";

      const res = await api.post(url, form);

      localStorage.setItem("token", res.data.user.accessToken);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">
          Resume Builder
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Create professional resumes in minutes
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg p-10 rounded-3xl 
                      bg-white/70 backdrop-blur-lg 
                      border-2 border-gray-200 
                      shadow-xl">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isLogin ? "Login to your account" : "Create your account"}
        </h2>

        {/* Tabs */}
        <div className="flex mb-8 bg-gray-100 rounded-xl p-1 border border-gray-200">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-3 rounded-xl text-sm font-semibold transition ${
              isLogin
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-500"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 rounded-xl text-sm font-semibold transition ${
              !isLogin
                ? "bg-red-500 text-white shadow-md"
                : "text-gray-500"
            }`}
          >
            Signup
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col gap-5"
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="bg-transparent border-2 border-gray-200 px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="bg-transparent border-2 border-gray-200 px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-2 border-gray-200 px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`mt-2 py-3 rounded-xl font-semibold text-white transition duration-300 ${
              isLogin
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* GOOGLE BUTTON */}
        <div className="text-center mt-6">
          <button
            onClick={googleLogin}
            className="w-full py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition font-medium"
          >
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          {isLogin ? "New here?" : "Already have an account?"}
          <span
            className="ml-2 font-semibold cursor-pointer text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create Account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}