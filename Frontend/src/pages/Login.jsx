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
  <div className="min-h-screen flex flex-col items-center justify-center
                  px-4 py-8 bg-gray-50">

    {/* ── CONTAINER ── */}
    <div className="w-full max-w-md">

      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-600">
          Resume Builder
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Create professional resumes in minutes
        </p>
      </div>

      {/* ── CARD ── */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-8">

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-700 mb-5">
          {isLogin ? "Login to your account" : "Create your account"}
        </h2>

        {/* ── TABS ── */}
        <div className="flex mb-5 bg-gray-100 rounded-xl p-1 border border-gray-200">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all
                        min-h-[44px] active:scale-95
                        ${isLogin
                          ? "bg-blue-500 text-white shadow"
                          : "text-gray-500 hover:text-gray-700"
                        }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all
                        min-h-[44px] active:scale-95
                        ${!isLogin
                          ? "bg-red-500 text-white shadow"
                          : "text-gray-500 hover:text-gray-700"
                        }`}
          >
            Sign Up
          </button>
        </div>

        {/* ── FORM ── */}
        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="flex flex-col gap-3 sm:gap-4"
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl text-sm
                         focus:outline-none focus:border-blue-400 transition
                         min-h-[48px] bg-gray-50 placeholder-gray-400"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl text-sm
                       focus:outline-none focus:border-blue-400 transition
                       min-h-[48px] bg-gray-50 placeholder-gray-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl text-sm
                       focus:outline-none focus:border-blue-400 transition
                       min-h-[48px] bg-gray-50 placeholder-gray-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Submit */}
          <button
            type="submit"
            className={`mt-1 py-3 rounded-xl font-semibold text-white text-sm
                        transition-all min-h-[48px] active:scale-[0.98]
                        ${isLogin
                          ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                          : "bg-red-500 hover:bg-red-600 active:bg-red-700"
                        }`}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── GOOGLE ── */}
        <button
          type="button"
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3
                     py-3 rounded-xl border border-gray-300 bg-white
                     hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98]
                     transition-all font-medium text-sm text-gray-700
                     min-h-[48px]"
        >
          {/* Inline Google G — no external image dependency */}
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        {/* ── FOOTER TOGGLE ── */}
        <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
          <span className="text-sm text-gray-500">
            {isLogin ? "New here?" : "Already have an account?"}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-blue-500 hover:underline
                       active:text-blue-700 min-h-[36px] px-1 transition-colors"
          >
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>

      </div>
    </div>
  </div>
);

}