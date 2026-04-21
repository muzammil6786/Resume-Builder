import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const googleLogin = () => {
    window.location.href =
      "https://resume-builder-p13s.onrender.com/api/auth/google";
  };

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-white to-slate-100">

      {/* ══════════════════════════════════════
          LEFT PANEL — desktop (1025px+) only
      ══════════════════════════════════════ */}
      <div
        className="
          hidden lg:flex
          lg:w-[45%] xl:w-1/2
          flex-col items-center justify-center
          bg-gradient-to-br from-blue-600 to-blue-800
          px-10 xl:px-16 py-16
          relative overflow-hidden
        "
      >
        {/* Background decoration */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10 max-w-sm xl:max-w-md text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-blue-600 font-black text-lg">R</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight">ResuMate</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight mb-4">
            Build resumes that<br />
            <span className="text-blue-200">get you hired.</span>
          </h2>
          <p className="text-blue-100 text-base xl:text-lg leading-relaxed mb-10">
          Resume builder trusted by thousands of professionals worldwide.
          </p>

          {/* Feature list */}
          <ul className="space-y-3">
            {[
              "✦  Professional templates in seconds",
              "✦  Save resumes for different jobs",
              "✦  Export to PDF instantly",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-blue-100">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT PANEL — all screen sizes
      ══════════════════════════════════════ */}
      <div
        className="
          flex flex-1 items-center justify-center
          px-4            /* mobile: tight side padding */
          sm:px-8         /* tablet: comfortable */
          lg:px-12        /* desktop: generous */
          xl:px-16
          py-8 sm:py-10 lg:py-12
          relative
        "
      >
        {/* HOME button */}
        <button
          onClick={() => navigate("/")}
          className="
            absolute top-4 left-4
            sm:top-5 sm:left-5
            lg:top-6 lg:left-6
            flex items-center gap-1.5
            px-3 py-1.5
            text-xs sm:text-sm
            bg-white border border-gray-200
            rounded-lg shadow-sm
            text-gray-600 hover:text-gray-900
            hover:bg-gray-50 active:scale-95
            transition-all duration-150
          "
        >
          ← Home
        </button>

        {/* ── FORM WRAPPER ──
            mobile:  full width, max 440px centered
            tablet:  max 480px
            desktop: max 420px (right panel is narrower)   */}
        <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[420px] xl:max-w-[440px]">

          {/* Mobile / Tablet brand header (hidden on desktop — left panel handles it) */}
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-2xl shadow-md mb-4">
              <span className="text-white font-black text-xl sm:text-2xl">R</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              ResuMate
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Build your resume in minutes
            </p>
          </div>

          {/* ── CARD ── */}
          <div
            className="
              bg-white
              rounded-2xl sm:rounded-3xl
              shadow-md sm:shadow-xl
              border border-gray-100
              p-5          /* mobile:  compact */
              sm:p-7       /* tablet:  medium  */
              lg:p-8       /* desktop: generous */
            "
          >

            {/* TABS */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-5 sm:mb-6">
              {["Login", "Sign Up"].map((label, i) => {
                const active = i === 0 ? isLogin : !isLogin;
                return (
                  <button
                    key={label}
                    onClick={() => setIsLogin(i === 0)}
                    className={`
                      flex-1 py-2 sm:py-2.5
                      text-sm sm:text-base
                      rounded-lg font-semibold
                      transition-all duration-200
                      min-h-[40px] sm:min-h-[44px]
                      ${active
                        ? "bg-white shadow text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                      }
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Greeting */}
            <div className="mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {isLogin ? "Welcome back " : "Create your account"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                {isLogin
                  ? "Sign in to access your resumes"
                  : "Get started — it's free"}
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={(e) => { e.preventDefault(); submit(); }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Name — sign up only */}
              {!isLogin && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    className="
                      w-full px-4
                      py-3 sm:py-3.5       /* bigger touch target on mobile */
                      text-sm sm:text-base
                      border border-gray-200
                      rounded-xl
                      bg-gray-50
                      focus:bg-white
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent
                      outline-none
                      transition
                      placeholder:text-gray-300
                    "
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={form.email}
                  className="
                    w-full px-4
                    py-3 sm:py-3.5
                    text-sm sm:text-base
                    border border-gray-200
                    rounded-xl
                    bg-gray-50
                    focus:bg-white
                    focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    outline-none
                    transition
                    placeholder:text-gray-300
                  "
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs sm:text-sm font-medium text-gray-600">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    className="
                      w-full px-4 pr-11
                      py-3 sm:py-3.5
                      text-sm sm:text-base
                      border border-gray-200
                      rounded-xl
                      bg-gray-50
                      focus:bg-white
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent
                      outline-none
                      transition
                      placeholder:text-gray-300
                    "
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                               text-gray-400 hover:text-gray-600
                               text-xs font-medium select-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full
                  py-3 sm:py-3.5          /* tall touch target */
                  mt-1 sm:mt-2
                  text-sm sm:text-base
                  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                  active:scale-[0.98]
                  text-white
                  rounded-xl
                  font-bold
                  shadow-md shadow-blue-100
                  transition-all duration-150
                "
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center my-4 sm:my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* GOOGLE */}
            <button
              onClick={googleLogin}
              className="
                w-full flex items-center justify-center gap-2.5
                py-3 sm:py-3.5
                text-sm sm:text-base
                border border-gray-200
                rounded-xl
                font-medium text-gray-700
                hover:bg-gray-50 active:bg-gray-100
                active:scale-[0.98]
                transition-all duration-150
                shadow-sm
              "
            >
              {/* Google SVG icon */}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* FOOTER LINK */}
            <p className="text-center text-xs sm:text-sm text-gray-400 mt-5 sm:mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin((v) => !v)}
                className="ml-1 text-blue-600 font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>

          {/* Legal note — visible on all sizes */}
          <p className="text-center text-xs text-gray-300 mt-4 px-2">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}