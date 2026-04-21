import { useNavigate } from "react-router-dom";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

    .font-display { font-family: 'Playfair Display', Georgia, serif; }
    .font-body    { font-family: 'DM Sans', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .anim-1 { animation: fadeUp 0.6s ease both; }
    .anim-2 { animation: fadeUp 0.6s 0.12s ease both; }
    .anim-3 { animation: fadeUp 0.6s 0.24s ease both; }
    .anim-4 { animation: fadeUp 0.6s 0.36s ease both; }

    .card-hover {
      transition: transform 0.22s ease, box-shadow 0.22s ease;
    }
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 40px rgba(37,99,235,0.13);
    }
    .img-cover {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .blue-mesh {
      background:
        radial-gradient(ellipse 80% 60% at 10% 20%, rgba(219,234,254,0.7) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 80%, rgba(191,219,254,0.5) 0%, transparent 60%),
        #ffffff;
    }
    .img-zoom { transition: transform 0.5s ease; }
    .img-zoom:hover { transform: scale(1.05); }
  `}</style>
);

/* ── DATA ─────────────────────────────────────── */
const FEATURES = [
  {
    icon: "⚡",
    title: "Build in Minutes",
    desc: "Fill in your details and watch your resume come to life with instant live preview.",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=700&q=80",
    alt: "Person working on laptop",
  },
  {
    icon: "🎨",
    title: "Professional Templates",
    desc: "Modern and Classic layouts with customisable fonts, spacing, and accent colours.",
    img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=700&q=80",
    alt: "Resume document on desk",
  },
  {
    icon: "📄",
    title: "One-Click PDF Export",
    desc: "Download a perfectly formatted PDF the moment your resume is ready to send.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80",
    alt: "Business document analysis",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Create a free account",
    desc: "Sign up in seconds — no credit card required.",
    img: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=600&q=80",
    alt: "Person signing up on laptop",
  },
  {
    num: "02",
    title: "Fill in your details",
    desc: "Add your experience, skills, and projects in our guided editor.",
    img: "https://c8.alamy.com/comp/2AP41NY/fill-in-contact-info-blue-concept-icon-contact-us-idea-thin-line-illustration-autofill-information-online-form-filling-customer-support-service-v-2AP41NY.jpg",
    alt: "Person filling in a form",
  },
  {
    num: "03",
    title: "Download & apply",
    desc: "Export a polished PDF and start landing the interviews you deserve.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
    alt: "Team celebrating success in office",
  },
];

const STATS = [
  { value: "100+",    label: "Resumes created" },
  { value: "2",       label: "Templates" },
  { value: "Free",    label: "Always free to start" },
  { value: "1-click", label: "PDF export" },
];

/* ── COMPONENT ────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="font-body bg-white text-slate-900 min-h-screen overflow-x-hidden">
      <GlobalStyles />

      {/* ════════════ NAVBAR ════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">

          <span className="font-display text-lg sm:text-xl font-black text-blue-600 tracking-tight">
            ✦ ResuMate
          </span>

          <div className="flex items-center gap-2 sm:gap-3">
            
            <button
              onClick={() => navigate("/auth")}
              className="px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold
                         bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                         text-white transition-all min-h-[38px] shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section className="blue-mesh">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left copy */}
            <div>
              <div className="anim-1 inline-flex items-center gap-2 bg-blue-100 text-blue-700
                              text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Free to use
              </div>

              <h1 className="anim-2 font-display text-4xl sm:text-5xl lg:text-6xl font-black
                             leading-[1.08] tracking-tight text-slate-900 mb-5">
                Your resume.<br />
                <span className="text-blue-600">Your story.</span>
              </h1>

              <p className="anim-3 text-slate-500 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
                Build a standout resume in minutes — live preview, professional
                templates, and one-click PDF export.
              </p>

              <div className="anim-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm
                             bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                             text-white transition-all min-h-[50px]
                             shadow-lg shadow-blue-200"
                >
                  Build My Resume — Free
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm
                             border border-slate-200 hover:border-blue-300 hover:bg-blue-50
                             text-slate-600 hover:text-blue-700 transition-all min-h-[50px]"
                >
                  Log in →
                </button>
              </div>
            </div>

            {/* Right – hero image */}
            <div className="anim-4 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-100
                              border border-blue-100 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                  alt="Professionals collaborating"
                  className="img-cover img-zoom"
                />
                {/* floating status card */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto
                                bg-white/95 backdrop-blur rounded-xl p-3 sm:p-4
                                shadow-lg border border-blue-50 flex items-center gap-3 sm:max-w-xs">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center
                                  justify-center text-white font-bold flex-shrink-0">✓</div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Resume complete!</p>
                    <p className="text-xs text-slate-500 mt-0.5">PDF exported and ready to send</p>
                  </div>
                </div>
              </div>

              {/* stat badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4
                              bg-blue-600 text-white text-xs font-bold
                              px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
                Unlimited resumes, for free
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════ STATS STRIP ════════════ */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-2xl sm:text-3xl font-black text-blue-600">{value}</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Everything you need
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            No fluff. Just the tools that get you hired.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, desc, img, alt }) => (
            <div
              key={title}
              className="card-hover bg-white border border-slate-100 rounded-2xl
                         overflow-hidden shadow-sm"
            >
              <div className="aspect-[16/9] overflow-hidden bg-blue-50">
                <img src={img} alt={alt} className="img-cover img-zoom" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Ready in 3 steps
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map(({ num, title, desc, img, alt }) => (
              <div
                key={num}
                className="card-hover bg-white rounded-2xl overflow-hidden
                           border border-slate-100 shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden bg-blue-50 relative">
                  <img src={img} alt={alt} className="img-cover img-zoom" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-blue-600
                                  flex items-center justify-center shadow-md">
                    <span className="font-display text-xs font-black text-white">{num}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FINAL CTA (image + copy side-by-side) ════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* image */}
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden
                          shadow-xl border border-blue-100 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=85"
              alt="Professional celebrating a new job offer"
              className="img-cover img-zoom"
            />
          </div>

          {/* copy */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black
                           text-slate-900 mb-5 leading-tight">
              Land your next job.<br />
              <span className="text-blue-600">Start for free.</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg mb-8 leading-relaxed max-w-md">
              Join thousands of professionals who've already built their resume
              with ResuMate — no experience required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm
                           bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                           text-white transition-all min-h-[50px]
                           shadow-lg shadow-blue-200"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm
                           border border-slate-200 hover:border-blue-300 hover:bg-blue-50
                           text-slate-600 hover:text-blue-700 transition-all min-h-[50px]"
              >
                Log in
              </button>
            </div>
          </div>

        </div>
      </section>

     {/* ════════════ FOOTER ════════════ */}
<footer className="bg-white border-t border-gray-100 mt-12">

  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

    {/* TOP SECTION */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {/* BRAND */}
      <div>
        <h2 className="text-xl font-extrabold text-blue-600 mb-2">
          ✦ ResuMate
        </h2>
        <p className="text-sm text-gray-500">
          Build professional resumes effortlessly and land your dream job faster.
        </p>
      </div>

      {/* PRODUCT */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Product
        </h3>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="hover:text-blue-600 cursor-pointer">Features</li>
          <li className="hover:text-blue-600 cursor-pointer">Templates</li>
          <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
        </ul>
      </div>

      {/* COMPANY */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Company
        </h3>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="hover:text-blue-600 cursor-pointer">About</li>
          <li className="hover:text-blue-600 cursor-pointer">Careers</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* SUPPORT */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Support
        </h3>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
          <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
        </ul>
      </div>

    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">

      {/* COPYRIGHT */}
      <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
        © {new Date().getFullYear()} ResuMate. All rights reserved.
      </p>

      {/* SOCIALS */}
      <div className="flex items-center gap-4 text-gray-400 text-sm">
        <span className="hover:text-blue-600 cursor-pointer">Twitter</span>
        <span className="hover:text-blue-600 cursor-pointer">LinkedIn</span>
        <span className="hover:text-blue-600 cursor-pointer">GitHub</span>
      </div>

    </div>
  </div>
</footer>

    </div>
  );
}