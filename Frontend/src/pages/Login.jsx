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
    <div
      className="min-h-screen flex items-center justify-center 
                  bg-gradient-to-br from-blue-50 to-gray-100 
                  px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="w-full max-w-md sm:max-w-lg">
        {/* HEADER */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600">
            ResuMate
          </h1>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm md:text-base">
            Build your resume in minutes
          </p>

          {/* HOME BUTTON */}
         <button
  onClick={() => navigate("/")}
  className="
    fixed top-2 left-2 z-50
    px-3 py-1.5 text-xs font-medium
    bg-blue-500 border border-gray-200 rounded-lg shadow-sm
    hover:bg-blue-600 transition
    sm:absolute sm:top-30 sm:right-6 sm:left-auto
    sm:px-4 sm:py-2 sm:text-sm
  "
>
   Home
</button>
        </div>

        {/* CARD */}
        <div
          className="bg-white 
                      p-5 sm:p-6 md:p-8 
                      rounded-2xl shadow-lg border border-gray-100"
        >
          {/* TABS */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-5 sm:mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm 
                        rounded-lg font-semibold transition
              ${
                isLogin
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 sm:py-2.5 text-xs sm:text-sm 
                        rounded-lg font-semibold transition
              ${
                !isLogin
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="space-y-3 sm:space-y-4"
          >
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
                         text-sm sm:text-base
                         border rounded-xl bg-gray-50 
                         focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
                       text-sm sm:text-base
                       border rounded-xl bg-gray-50 
                       focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
                       text-sm sm:text-base
                       border rounded-xl bg-gray-50 
                       focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 
                       text-sm sm:text-base
                       bg-blue-600 text-white rounded-xl font-semibold 
                       hover:bg-blue-700 transition"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-5 sm:my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-2 sm:px-3 text-[10px] sm:text-xs text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* GOOGLE */}
          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-2 
                     py-2.5 sm:py-3 
                     text-sm sm:text-base
                     border rounded-xl hover:bg-gray-50 transition"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-blue-600 font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
