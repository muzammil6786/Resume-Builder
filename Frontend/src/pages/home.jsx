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

    /* Hamburger menu */
    .mobile-menu {
      display: none;
    }
    .mobile-menu.open {
      display: flex;
    }
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

      {/* ════════════════════════════════
          NAVBAR
          Mobile:  logo + single CTA button (no nav links)
          Tablet:  logo + CTA (same, wider padding)
          Desktop: logo + nav links + CTA
      ════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between
                        h-14         /* mobile */
                        sm:h-15      /* tablet */
                        lg:h-16      /* desktop */
                       ">

          {/* Brand */}
          <span className="font-display text-lg sm:text-xl font-black text-blue-600 tracking-tight select-none">
            ✦ ResuMate
          </span>

          {/* Desktop nav links — hidden below lg */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</a>
          </div>

          {/* CTA — always visible, label changes at sm */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/auth")}
              className="px-3 sm:px-5 py-2
                         rounded-lg
                         text-xs sm:text-sm
                         font-semibold
                         bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                         text-white transition-all
                         min-h-[38px] sm:min-h-[40px]
                         shadow-sm whitespace-nowrap"
            >
              {/* Shorten label on very small screens */}
              <span className="sm:hidden">Start Free</span>
              <span className="hidden sm:inline">Get Started Free</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════
          HERO
          Mobile:  stacked, copy on top, image below, full-width buttons
          Tablet:  stacked, more breathing room
          Desktop: side-by-side 2-col grid
      ════════════════════════════════ */}
      <section className="blue-mesh">
        <div className="max-w-7xl mx-auto
                        px-4 sm:px-6 lg:px-8
                        py-14 sm:py-24 lg:py-32">

          <div className="grid grid-cols-1 lg:grid-cols-2
                          gap-8 sm:gap-10 lg:gap-16
                          items-center">

            {/* ── Left copy ── */}
            <div>
              {/* Badge */}
              <div className="anim-1 inline-flex items-center gap-2
                              bg-blue-100 text-blue-700
                              text-xs sm:text-sm font-semibold
                              px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Free to use
              </div>

              {/* Headline */}
              <h1 className="anim-2 font-display
                             text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                             font-black leading-[1.08] tracking-tight
                             text-slate-900 mb-4 sm:mb-5">
                Your resume.<br />
                <span className="text-blue-600">Your story.</span>
              </h1>

              {/* Sub-copy */}
              <p className="anim-3 text-slate-500
                            text-base sm:text-lg lg:text-xl
                            max-w-xs sm:max-w-sm lg:max-w-md
                            mb-6 sm:mb-8 leading-relaxed">
                Build a standout resume in minutes — live preview, professional
                templates, and one-click PDF export.
              </p>

              {/* CTA buttons
                  Mobile:  full-width stack
                  Tablet+: side by side inline */}
              <div className="anim-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto
                             px-6 sm:px-7 py-4
                             rounded-xl font-semibold
                             text-sm sm:text-base
                             bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                             text-white transition-all
                             min-h-[56px]
                             shadow-lg shadow-blue-200"
                >
                  Build My Resume — Free
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto
                             px-6 sm:px-7 py-4
                             rounded-xl font-semibold
                             text-sm sm:text-base
                             border border-slate-200
                             hover:border-blue-300 hover:bg-blue-50
                             text-slate-600 hover:text-blue-700
                             transition-all min-h-[56px]"
                >
                  Log in →
                </button>
              </div>
            </div>

            {/* ── Right image ──
                Mobile:  shown below copy with reduced height
                Desktop: alongside copy */}
            <div className="anim-4 relative mt-2 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden
                              shadow-xl shadow-blue-100
                              border border-blue-100
                              aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                  alt="Professionals collaborating"
                  className="img-cover img-zoom"
                />

                {/* Floating status card
                    Mobile: full bleed bottom, smaller text
                    Tablet+: left-anchored, max-width */}
                <div className="absolute bottom-3 left-3 right-3
                                sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[260px]
                                bg-white/95 backdrop-blur rounded-xl
                                p-2.5 sm:p-4
                                shadow-lg border border-blue-50
                                flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600
                                  flex items-center justify-center
                                  text-white font-bold text-sm flex-shrink-0">✓</div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Resume complete!</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                      PDF exported and ready to send
                    </p>
                  </div>
                </div>
              </div>

              {/* Stat badge
                  Smaller and repositioned on mobile to avoid overflow */}
              <div className="absolute -top-2 -right-1
                              sm:-top-3 sm:-right-3
                              lg:-top-4 lg:-right-4
                              bg-blue-600 text-white
                              text-[10px] sm:text-xs font-bold
                              px-3 sm:px-4 py-1.5 sm:py-2
                              rounded-full shadow-lg whitespace-nowrap">
                Unlimited resumes, for free
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          STATS STRIP
          Mobile:  2-col grid (2×2)
          Tablet+: 4-col single row
      ════════════════════════════════ */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto
                        px-4 sm:px-6 lg:px-8
                        py-10 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label} className="px-2">
                <p className="font-display
                              text-3xl sm:text-4xl
                              font-black text-blue-600">{value}</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURES
          Mobile:  single column cards
          Tablet:  2-col grid (1 card full-width + 2 col)  
          Desktop: 3-col grid
      ════════════════════════════════ */}
      <section id="features" className="max-w-7xl mx-auto
                                         px-4 sm:px-6 lg:px-8
                                         py-16 sm:py-20 lg:py-28">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-display
                         text-3xl sm:text-4xl md:text-4xl lg:text-5xl
                         font-black text-slate-900 mb-3 sm:mb-4">
            Everything you need
          </h2>
          <div className="w-10 sm:w-12 h-1 bg-blue-600 rounded-full mx-auto mb-3 sm:mb-4" />
          <p className="text-slate-500
                        text-xs sm:text-sm lg:text-base
                        max-w-xs sm:max-w-sm mx-auto">
            No fluff. Just the tools that get you hired.
          </p>
        </div>

        {/* Cards
            Mobile:  1 col
            Tablet:  first card full-width, next 2 side-by-side  → use sm:grid-cols-2, first child sm:col-span-2
            Desktop: strict 3 col */}
        <div className="grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-6 sm:gap-8">
          {FEATURES.map(({ icon, title, desc, img, alt }, i) => (
            <div
              key={title}
              className={`card-hover bg-white border border-slate-100 rounded-2xl
                          overflow-hidden shadow-sm
                          ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
                         `}
            >
              {/* Image taller on the wide first card (tablet), normal otherwise */}
              <div className={`overflow-hidden bg-blue-50
                               ${i === 0 ? "aspect-[16/7] sm:aspect-[16/7] lg:aspect-[16/9]"
                                         : "aspect-[16/9]"}`}>
                <img src={img} alt={alt} className="img-cover img-zoom" />
              </div>
              <div className=" p-5 sm:p-6 lg:p-8">
                <div className="text-xl sm:text-2xl mb-2 sm:mb-3">{icon}</div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2">
                  {title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          HOW IT WORKS
          Mobile:  single column vertical steps
          Tablet:  2-col (step 1 full, then 2+3 side by side)
          Desktop: 3-col
      ════════════════════════════════ */}
      <section id="how-it-works" className="bg-slate-50 border-y border-slate-100
                                             py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="font-display
                           text-3xl sm:text-4xl md:text-4xl lg:text-5xl
                           font-black text-slate-900 mb-3 sm:mb-4">
              Ready in 3 steps
            </h2>
            <div className="w-10 sm:w-12 h-1 bg-blue-600 rounded-full mx-auto" />
          </div>

          <div className="grid
                          grid-cols-1
                          sm:grid-cols-2
                          lg:grid-cols-3
                          gap-6 sm:gap-8">
            {STEPS.map(({ num, title, desc, img, alt }, i) => (
              <div
                key={num}
                className={`card-hover bg-white rounded-2xl overflow-hidden
                             border border-slate-100 shadow-sm
                             ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
                            `}
              >
                <div className={`overflow-hidden bg-blue-50 relative
                                 ${i === 0 ? "aspect-[16/7] sm:aspect-[16/7] lg:aspect-[4/3]"
                                           : "aspect-[4/3]"}`}>
                  <img src={img} alt={alt} className="img-cover img-zoom" />
                  {/* Step number badge */}
                  <div className="absolute top-3 left-3
                                  w-8 h-8 sm:w-9 sm:h-9
                                  rounded-full bg-blue-600
                                  flex items-center justify-center shadow-md">
                    <span className="font-display text-[10px] sm:text-xs font-black text-white">
                      {num}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-1.5">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FINAL CTA
          Mobile:  image stacked BELOW copy (order utility)
          Tablet:  same stacking, wider
          Desktop: side-by-side, image left / copy right
      ════════════════════════════════ */}
      <section className="max-w-7xl mx-auto
                          px-4 sm:px-6 lg:px-8
                          py-16 sm:py-20 lg:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-2
                        gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Image — moves below copy on mobile */}
          <div className="order-2 lg:order-1
                          rounded-2xl overflow-hidden
                          shadow-xl border border-blue-100
                          aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=85"
              alt="Professional celebrating a new job offer"
              className="img-cover img-zoom"
            />
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display
                           text-3xl sm:text-4xl md:text-4xl lg:text-5xl
                           font-black text-slate-900
                           mb-4 sm:mb-5 leading-tight">
              Land your next job.<br />
              <span className="text-blue-600">Start for free.</span>
            </h2>
            <p className="text-slate-500
                          text-base sm:text-lg lg:text-xl
                          mb-6 sm:mb-8 leading-relaxed
                          max-w-xs sm:max-w-sm lg:max-w-md">
              Join thousands of professionals who've already built their resume
              with ResuMate — no experience required.
            </p>

            {/* Full-width on mobile, auto on tablet+ */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto
                           px-6 sm:px-8 py-4
                           rounded-xl font-semibold
                           text-sm sm:text-base
                           bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                           text-white transition-all min-h-[56px]
                           shadow-lg shadow-blue-200"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto
                           px-6 sm:px-8 py-4
                           rounded-xl font-semibold
                           text-sm sm:text-base
                           border border-slate-200
                           hover:border-blue-300 hover:bg-blue-50
                           text-slate-600 hover:text-blue-700
                           transition-all min-h-[56px]"
              >
                Log in
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
          FOOTER
          Mobile:  1-col stacked
          Tablet:  2-col (brand + product / company + support)
          Desktop: 4-col
      ════════════════════════════════ */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

          {/* Footer grid */}
          <div className="grid
                          grid-cols-2      /* mobile: 2-col (brand spans 2, rest 1) */
                          sm:grid-cols-2   /* tablet: 2-col proper */
                          lg:grid-cols-4   /* desktop: 4-col */
                          gap-6 sm:gap-8">

            {/* Brand — full width on mobile, 1 col tablet+ */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-blue-600 mb-2">
                ✦ ResuMate
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-[220px] leading-relaxed">
                Build professional resumes effortlessly and land your dream job faster.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                Product
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Features</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Templates</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Pricing</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                Company
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">About</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                Support
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-100 mt-8 sm:mt-10 pt-5 sm:pt-6
                          flex flex-col sm:flex-row
                          items-center justify-between gap-3">
            <p className="text-xs text-gray-400 text-center sm:text-left order-2 sm:order-1">
              © {new Date().getFullYear()} ResuMate. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm text-gray-400 order-1 sm:order-2">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">LinkedIn</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">GitHub</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}