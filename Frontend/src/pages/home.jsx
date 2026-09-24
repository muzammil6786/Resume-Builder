import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  BrainCircuit,
  Target,
  ScanSearch,
  TrendingUp,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  WandSparkles,
  BarChart3,
  Zap,
  Search,
  Bot,
  LayoutTemplate,
  Download,
  ChevronRight,
  CircleCheck,
  Star,
  BriefcaseBusiness,
  Lightbulb,
} from "lucide-react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');

    * {
      scroll-behavior: smooth;
    }

    .font-display {
      font-family: 'Playfair Display', Georgia, serif;
    }

    .font-body {
      font-family: 'DM Sans', sans-serif;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(22px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-7px);
      }
    }

    @keyframes pulseSoft {
      0%, 100% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
    }

    .anim-1 {
      animation: fadeUp 0.6s ease both;
    }

    .anim-2 {
      animation: fadeUp 0.6s 0.1s ease both;
    }

    .anim-3 {
      animation: fadeUp 0.6s 0.2s ease both;
    }

    .anim-4 {
      animation: fadeUp 0.6s 0.3s ease both;
    }

    .float-card {
      animation: float 4s ease-in-out infinite;
    }

    .pulse-soft {
      animation: pulseSoft 2s ease-in-out infinite;
    }

    .card-hover {
      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease;
    }

    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 45px rgba(15, 23, 42, 0.09);
      border-color: rgba(59, 130, 246, 0.2);
    }

    .img-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .img-zoom {
      transition: transform 0.5s ease;
    }

    .img-zoom:hover {
      transform: scale(1.04);
    }

    .hero-bg {
      background:
        radial-gradient(
          circle at 12% 20%,
          rgba(219, 234, 254, 0.85),
          transparent 34%
        ),
        radial-gradient(
          circle at 88% 10%,
          rgba(224, 231, 255, 0.7),
          transparent 30%
        ),
        linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    }

    .ai-bg {
      background:
        radial-gradient(
          circle at 80% 20%,
          rgba(219, 234, 254, 0.8),
          transparent 28%
        ),
        linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
    }

    .grid-bg {
      background-image:
        linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
        linear-gradient(
          90deg,
          rgba(148, 163, 184, 0.06) 1px,
          transparent 1px
        );
      background-size: 28px 28px;
    }

    .score-ring {
      background: conic-gradient(
        #2563eb 0deg 309deg,
        #dbeafe 309deg 360deg
      );
    }

    .mini-bar {
      transition: width 0.7s ease;
    }
  `}</style>
);

const AI_FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI Resume Analyzer",
    desc: "Analyze your resume and get an AI-generated review of your content, skills, projects, readability, and overall resume quality.",
    label: "AI Analysis",
  },
  {
    icon: ScanSearch,
    title: "ATS & Keyword Analysis",
    desc: "Identify missing keywords and see how your resume content can be improved for applicant tracking systems.",
    label: "ATS Ready",
  },
  {
    icon: Target,
    title: "Job Description Matching",
    desc: "Compare your resume against a job description and identify the skills and keywords that need more attention.",
    label: "Job Match",
  },
  {
    icon: BarChart3,
    title: "AI Resume Analytics",
    desc: "Your analysis history is saved so you can track resume scores and see how your resume changes over time.",
    label: "Track Progress",
  },
];

const BUILDER_FEATURES = [
  {
    icon: Zap,
    title: "Live Resume Preview",
    desc: "See changes instantly while building your resume.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    desc: "Choose between clean Modern and Classic resume layouts.",
  },
  {
    icon: Download,
    title: "PDF Export",
    desc: "Export your finished resume as a ready-to-use PDF.",
  },
];

const STEPS = [
  {
    number: "01",
    icon: FileText,
    title: "Build your resume",
    desc: "Add your education, experience, skills, projects and personal information.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Let AI analyze it",
    desc: "Run an AI analysis to receive scores, strengths, weaknesses and recommendations.",
  },
  {
    number: "03",
    icon: WandSparkles,
    title: "Improve your resume",
    desc: "Use the AI recommendations and missing keywords to make targeted improvements.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track your progress",
    desc: "Run another analysis and compare your results through the analytics dashboard.",
  },
];

const STATS = [
  {
    value: "AI",
    label: "Resume analysis",
  },
  {
    value: "ATS",
    label: "Keyword analysis",
  },
  {
    value: "2",
    label: "Resume templates",
  },
  {
    value: "PDF",
    label: "One-click export",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const goToAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="font-body bg-white text-slate-900 min-h-screen overflow-x-hidden">
      <GlobalStyles />

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
                <FileText
                  size={18}
                  strokeWidth={2.5}
                  className="text-white"
                />
              </div>

              <span className="font-display text-xl font-black tracking-tight text-slate-900">
                Resu<span className="text-blue-600">Mate</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-500">
              <a
                href="#ai-features"
                className="hover:text-blue-600 transition-colors"
              >
                AI Features
              </a>

              <a
                href="#how-it-works"
                className="hover:text-blue-600 transition-colors"
              >
                How it works
              </a>

              <a
                href="#builder"
                className="hover:text-blue-600 transition-colors"
              >
                Resume Builder
              </a>

              <a
                href="#analytics"
                className="hover:text-blue-600 transition-colors"
              >
                Analytics
              </a>
            </div>

            <button
              onClick={goToAuth}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm"
            >
              <span className="sm:hidden">Start Free</span>
              <span className="hidden sm:inline">Get Started Free</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT */}

            <div>
              <div className="anim-1 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-5">
                <Sparkles size={15} />
                AI-powered resume builder
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-soft" />
              </div>

              <h1 className="anim-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.05] tracking-tight text-slate-950">
                Build it.
                <br />
                Analyze it.
                <br />
                <span className="text-blue-600">Improve it.</span>
              </h1>

              <p className="anim-3 mt-5 text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed max-w-xl">
                Create a professional resume and use AI to understand how
                strong it is. Get resume scores, ATS insights, missing
                keywords, and actionable recommendations in one place.
              </p>

              <div className="anim-4 flex flex-col sm:flex-row gap-3 mt-7">
                <button
                  onClick={goToAuth}
                  className="w-full sm:w-auto min-h-[54px] px-6 sm:px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                >
                  Try AI Resume Analyzer
                  <ArrowRight size={18} />
                </button>

                <a
                  href="#ai-features"
                  className="w-full sm:w-auto min-h-[54px] px-6 sm:px-7 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-200 text-slate-700 font-semibold text-sm sm:text-base transition-all flex items-center justify-center"
                >
                  Explore AI Features
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-blue-600" />
                  AI analysis
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-blue-600" />
                  ATS insights
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-blue-600" />
                  PDF export
                </span>
              </div>
            </div>

            {/* RIGHT IMAGE + AI CARD */}

            <div className="anim-4 relative">

              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-blue-100 shadow-2xl shadow-blue-100/60">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                  alt="Professionals working together"
                  className="img-cover img-zoom"
                />
              </div>

              {/* AI ANALYSIS FLOATING CARD */}

              <div className="float-card absolute -bottom-6 left-3 right-3 sm:left-auto sm:right-[-20px] w-auto sm:w-[300px] bg-white rounded-2xl border border-slate-100 shadow-2xl p-4">

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Bot size={17} className="text-white" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        AI Resume Analysis
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Analysis completed
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
                    AI
                  </span>
                </div>

                <div className="flex items-center gap-4">

                  <div className="relative w-16 h-16 rounded-full score-ring flex items-center justify-center">
                    <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
                      <span className="text-lg font-black text-slate-900">
                        86
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-800">
                      Overall Score
                    </p>

                    <div className="mt-2 space-y-1.5">
                      <div>
                        <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                          <span>ATS</span>
                          <span>91</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full w-[91%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                          <span>Skills</span>
                          <span>88</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full w-[88%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2">
                  <Lightbulb size={14} className="text-amber-500 mt-0.5" />

                  <p className="text-[10px] leading-relaxed text-slate-500">
                    AI found 4 missing keywords that could improve your job
                    match.
                  </p>
                </div>
              </div>

              {/* IMAGE LABEL */}

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl px-3 py-2 shadow-md border border-white">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-blue-600" />
                  <span className="text-xs font-bold text-slate-800">
                    AI-assisted
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-11">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="text-center lg:text-left lg:border-r last:border-r-0 border-slate-100 px-2"
              >
                <p className="font-display text-2xl sm:text-3xl font-black text-blue-600">
                  {value}
                </p>

                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {label}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= AI INTRO ================= */}

      <section
        id="ai-features"
        className="ai-bg py-16 sm:py-20 lg:py-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">

            {/* IMAGE */}

            <div className="relative order-2 lg:order-1">

              <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=85"
                  alt="Professional reviewing documents"
                  className="img-cover img-zoom"
                />
              </div>

              <div className="absolute -bottom-5 -right-2 sm:right-[-20px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-[230px]">

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Search size={16} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Keywords detected
                    </p>
                    <p className="text-[10px] text-slate-400">
                      AI recommendation
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                    Node.js
                  </span>

                  <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                    REST API
                  </span>

                  <span className="text-[10px] px-2 py-1 bg-amber-50 text-amber-700 rounded-md">
                    +4 missing
                  </span>
                </div>

              </div>
            </div>

            {/* CONTENT */}

            <div className="order-1 lg:order-2">

              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm mb-4">
                <Sparkles size={16} />
                YOUR AI RESUME ASSISTANT
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-tight">
                Don't just build a resume.
                <br />
                <span className="text-blue-600">Understand it.</span>
              </h2>

              <p className="mt-5 text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl">
                ResuMate uses AI to turn your resume into something you can
                actually improve. Instead of guessing what's missing, get
                structured feedback from every analysis.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BarChart3 size={17} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Multiple resume scores
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      See overall, ATS, content, skills, projects, and
                      readability scores.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Lightbulb size={17} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Actionable AI recommendations
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Find strengths, weaknesses and specific areas that need
                      improvement.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Target size={17} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Missing keyword detection
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Understand which keywords your resume may be missing.
                    </p>
                  </div>
                </div>

              </div>

              <button
                onClick={goToAuth}
                className="mt-8 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Analyze my resume
                <ArrowRight size={17} />
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ================= AI FEATURE CARDS ================= */}

      <section className="py-16 sm:py-20 lg:py-28 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">

            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm mb-3">
              <BrainCircuit size={16} />
              AI FEATURES
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
              AI tools built around your resume
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
              From your first draft to your next analysis, ResuMate gives you
              tools to build, review, and improve your resume.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">

            {AI_FEATURES.map(
              ({ icon: Icon, title, desc, label }) => (
                <div
                  key={title}
                  className="card-hover rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon size={21} className="text-blue-600" />
                    </div>

                    <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-slate-500">
                      {label}
                    </span>

                  </div>

                  <h3 className="mt-5 text-lg sm:text-xl font-bold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {desc}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-blue-600">
                    AI-powered feature
                    <ChevronRight size={14} />
                  </div>

                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* ================= HOW AI WORKS ================= */}

      <section
        id="how-it-works"
        className="bg-slate-50 border-y border-slate-100 py-16 sm:py-20 lg:py-28"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 sm:mb-14">

            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm mb-3">
              <Zap size={15} />
              SIMPLE WORKFLOW
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
              From resume draft to AI insights
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-500">
              A simple workflow that keeps your resume and analysis in one
              place.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {STEPS.map(
              ({ number, icon: Icon, title, desc }, index) => (
                <div
                  key={number}
                  className="relative bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm card-hover"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon size={20} className="text-blue-600" />
                    </div>

                    <span className="font-display text-3xl font-black text-blue-100">
                      {number}
                    </span>

                  </div>

                  <h3 className="mt-5 text-base sm:text-lg font-bold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {desc}
                  </p>

                  {index < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-11 -right-4 z-10">
                      <ArrowRight
                        size={18}
                        className="text-blue-200"
                      />
                    </div>
                  )}

                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* ================= ANALYTICS ================= */}

      <section
        id="analytics"
        className="py-16 sm:py-20 lg:py-28 bg-white"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ANALYTICS UI */}

            <div className="order-2 lg:order-1">

              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">

                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Resume Analytics
                    </p>

                    <p className="text-[10px] text-slate-400 mt-0.5">
                      AI analysis history
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                    <TrendingUp size={14} />
                    +18 points
                  </div>

                </div>

                <div className="p-5">

                  <div className="grid grid-cols-3 gap-3">

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] text-slate-400">
                        Latest score
                      </p>
                      <p className="mt-1 text-xl font-black text-slate-900">
                        86
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] text-slate-400">
                        Analyses
                      </p>
                      <p className="mt-1 text-xl font-black text-slate-900">
                        5
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] text-slate-400">
                        Improvement
                      </p>
                      <p className="mt-1 text-xl font-black text-green-600">
                        +18
                      </p>
                    </div>

                  </div>

                  {/* CHART */}

                  <div className="mt-7">

                    <div className="flex items-end justify-between h-36 gap-4 px-2">

                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="text-[9px] text-slate-400 text-center mb-1">
                          68
                        </div>
                        <div className="h-[68%] bg-blue-100 rounded-t-lg" />
                      </div>

                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="text-[9px] text-slate-400 text-center mb-1">
                          74
                        </div>
                        <div className="h-[74%] bg-blue-200 rounded-t-lg" />
                      </div>

                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="text-[9px] text-slate-400 text-center mb-1">
                          76
                        </div>
                        <div className="h-[76%] bg-blue-300 rounded-t-lg" />
                      </div>

                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="text-[9px] text-slate-400 text-center mb-1">
                          82
                        </div>
                        <div className="h-[82%] bg-blue-400 rounded-t-lg" />
                      </div>

                      <div className="flex-1 h-full flex flex-col justify-end">
                        <div className="text-[9px] text-blue-600 font-bold text-center mb-1">
                          86
                        </div>
                        <div className="h-[86%] bg-blue-600 rounded-t-lg" />
                      </div>

                    </div>

                    <div className="grid grid-cols-5 mt-2 text-[9px] text-slate-400 text-center">
                      <span>1st</span>
                      <span>2nd</span>
                      <span>3rd</span>
                      <span>4th</span>
                      <span>Latest</span>
                    </div>

                  </div>

                  <div className="mt-5 p-3 rounded-xl bg-blue-50 border border-blue-100 flex gap-2">

                    <Sparkles
                      size={15}
                      className="text-blue-600 mt-0.5 flex-shrink-0"
                    />

                    <p className="text-[10px] sm:text-xs text-blue-800 leading-relaxed">
                      Each completed AI analysis can be reviewed through your
                      analytics history to understand changes in your resume
                      score.
                    </p>

                  </div>

                </div>
              </div>
            </div>

            {/* CONTENT */}

            <div className="order-1 lg:order-2">

              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm mb-4">
                <BarChart3 size={16} />
                AI ANALYTICS
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-tight">
                See whether your resume is actually improving.
              </h2>

              <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">
                Every analysis gives you more than a single score. Use your
                analysis history to understand how your resume changes after
                each improvement.
              </p>

              <div className="mt-7 space-y-3">

                {[
                  "View your latest AI resume score",
                  "Review previous resume analyses",
                  "Track score changes over time",
                  "Understand recurring weaknesses",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CircleCheck
                      size={18}
                      className="text-blue-600 flex-shrink-0"
                    />

                    <span className="text-sm text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              <button
                onClick={goToAuth}
                className="mt-8 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all flex items-center gap-2"
              >
                Explore AI Analytics
                <ArrowRight size={17} />
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ================= BUILDER SECTION ================= */}

      <section
        id="builder"
        className="bg-slate-50 border-y border-slate-100 py-16 sm:py-20 lg:py-28"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* IMAGE */}

            <div className="relative">

              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=85"
                  alt="Resume document on a desk"
                  className="img-cover img-zoom"
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-white">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Resume ready
                    </p>

                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                      Professionally formatted PDF
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* CONTENT */}

            <div>

              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm mb-4">
                <FileText size={16} />
                RESUME BUILDER
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-tight">
                Build a clean resume before AI helps you improve it.
              </h2>

              <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">
                Start with a structured resume builder designed around the
                information recruiters actually need to see.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">

                {BUILDER_FEATURES.map(
                  ({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex gap-3"
                    >

                      <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                        <Icon
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          {desc}
                        </p>
                      </div>

                    </div>
                  )
                )}

              </div>

              <button
                onClick={goToAuth}
                className="mt-8 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
              >
                Start Building
                <ArrowRight size={17} />
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ================= JOB MATCH SECTION ================= */}

      <section className="py-16 sm:py-20 lg:py-28 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-slate-950 overflow-hidden relative">

            <div className="absolute inset-0 opacity-10 grid-bg" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-6 sm:p-10 lg:p-14">

              <div>

                <div className="inline-flex items-center gap-2 text-blue-300 font-semibold text-xs sm:text-sm mb-4">
                  <BriefcaseBusiness size={16} />
                  JOB DESCRIPTION ANALYSIS
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Match your resume to the role you're applying for.
                </h2>

                <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Compare a job description with your resume to identify
                  relevant keywords and areas where your resume may need
                  stronger alignment.
                </p>

                <button
                  onClick={goToAuth}
                  className="mt-7 px-5 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-slate-900 text-sm font-bold transition-all flex items-center gap-2"
                >
                  Try Job Matching
                  <ArrowRight size={17} />
                </button>

              </div>

              {/* MATCH UI */}

              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Job Match Analysis
                    </p>

                    <p className="text-[10px] text-slate-400 mt-1">
                      Backend Developer
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-sm font-black text-blue-600">
                      84%
                    </span>
                  </div>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-700">
                      Resume match
                    </span>

                    <span className="text-blue-600 font-bold">
                      84%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full w-[84%] bg-blue-600 rounded-full" />
                  </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="p-3 rounded-xl bg-green-50 border border-green-100">
                    <p className="text-[10px] text-green-600 font-semibold">
                      Matching skills
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-900">
                      12
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <p className="text-[10px] text-amber-600 font-semibold">
                      Missing keywords
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-900">
                      4
                    </p>
                  </div>

                </div>

                <div className="mt-4">

                  <p className="text-[10px] font-bold text-slate-700 mb-2">
                    Suggested keywords
                  </p>

                  <div className="flex flex-wrap gap-1.5">

                    {[
                      "REST API",
                      "PostgreSQL",
                      "Docker",
                      "Testing",
                    ].map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-medium"
                      >
                        + {keyword}
                      </span>
                    ))}

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="py-16 sm:py-20 lg:py-24 bg-blue-600">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/15 flex items-center justify-center mb-5">
            <Sparkles size={23} className="text-white" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Build your resume.
            <br />
            Then let AI help you improve it.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Create your resume, run an AI analysis, review the recommendations,
            and track your progress — all from one dashboard.
          </p>

          <button
            onClick={goToAuth}
            className="mt-7 px-7 py-4 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-sm sm:text-base transition-all shadow-xl inline-flex items-center gap-2"
          >
            Get Started with ResuMate
            <ArrowRight size={18} />
          </button>

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-white border-t border-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="lg:col-span-1">

              <div className="flex items-center gap-2">

                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>

                <span className="font-display text-lg font-black">
                  Resu<span className="text-blue-600">Mate</span>
                </span>

              </div>

              <p className="text-xs sm:text-sm text-slate-500 mt-3 max-w-[260px] leading-relaxed">
                An AI-powered resume builder for creating, analyzing, and
                improving professional resumes.
              </p>

            </div>

            <div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Product
              </h3>

              <div className="space-y-2.5 text-sm text-slate-500">

                <a
                  href="#ai-features"
                  className="block hover:text-blue-600 transition-colors"
                >
                  AI Resume Analyzer
                </a>

                <a
                  href="#analytics"
                  className="block hover:text-blue-600 transition-colors"
                >
                  AI Analytics
                </a>

                <a
                  href="#builder"
                  className="block hover:text-blue-600 transition-colors"
                >
                  Resume Builder
                </a>

              </div>

            </div>

            <div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Features
              </h3>

              <div className="space-y-2.5 text-sm text-slate-500">

                <button
                  onClick={goToAuth}
                  className="block hover:text-blue-600 transition-colors"
                >
                  ATS Analysis
                </button>

                <button
                  onClick={goToAuth}
                  className="block hover:text-blue-600 transition-colors"
                >
                  Job Matching
                </button>

                <button
                  onClick={goToAuth}
                  className="block hover:text-blue-600 transition-colors"
                >
                  PDF Export
                </button>

              </div>

            </div>

            <div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Get Started
              </h3>

              <div className="space-y-3">

                <button
                  onClick={goToAuth}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all"
                >
                  Create Resume
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} />
                  AI-assisted resume workflow
                </div>

              </div>

            </div>

          </div>

          <div className="border-t border-slate-100 mt-9 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} ResuMate. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400">

              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Privacy
              </span>

              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Terms
              </span>

              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Support
              </span>

            </div>

          </div>

        </div>
      </footer>
    </div>
  );
}