import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  FileText,
  BarChart3,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Search,
  Sparkles,
} from "lucide-react";
import api from "../services/api";

/* =========================================================
   INFO LIST
========================================================= */

function InfoList({ title, items, icon: Icon }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon size={18} className="text-blue-600" />}

        <h3 className="font-semibold text-lg">{title}</h3>
      </div>

      {items?.length ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-2 text-sm md:text-base text-gray-600"
            >
              <span className="text-blue-600 mt-1">•</span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">
          No information available.
        </p>
      )}
    </div>
  );
}

/* =========================================================
   AI RESUME ANALYZER
========================================================= */

function Analyzer({
  resume,
  resumes,
  setSelected,
  onClose,
}) {
  const [a, setA] = useState(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!resume?._id) {
      return;
    }

    setLoading(true);
    setA(null);

    try {
      const { data } = await api.post(
        "/api/ai/resume/analyze",
        {
          resumeId: resume._id,
        }
      );

      setA(data.analysis);
    } catch (e) {
      alert(
        e.response?.data?.message ||
          "Analysis failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
      <div className="min-h-full flex items-start md:items-center justify-center p-4">
        <div className="bg-gray-50 w-full max-w-6xl rounded-2xl shadow-xl my-4 md:my-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="bg-white border-b rounded-t-2xl px-5 md:px-7 py-5 flex justify-between items-center gap-4">

            <div>
              <div className="flex items-center gap-2 flex-wrap">

                <h2 className="text-xl md:text-2xl font-bold">
                  AI Resume Analyzer
                </h2>

                <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-full text-xs font-semibold">
                  <Sparkles size={13} />
                  AI Powered
                </span>

              </div>

              <p className="text-sm md:text-base text-gray-500 mt-1">
                Get an AI-generated assessment of your resume before applying.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="p-5 md:p-7">

            {/* =================================================
                SELECT RESUME
            ================================================= */}

            <div className="bg-white border rounded-xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-end md:justify-between">

              <div className="flex-1">

                <label
                  htmlFor="analyzer-resume"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select resume to analyze
                </label>

                <select
                  id="analyzer-resume"
                  value={resume?._id || ""}
                  onChange={(e) => {
                    const selectedResume =
                      resumes.find(
                        (r) =>
                          r._id ===
                          e.target.value
                      );

                    setSelected(
                      selectedResume || null
                    );

                    setA(null);
                  }}
                  className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    Select a resume
                  </option>

                  {resumes.map((r) => (
                    <option
                      key={r._id}
                      value={r._id}
                    >
                      {r.title ||
                        "Untitled Resume"}
                      {" — "}
                      {r.personalInfo?.name ||
                        "Unnamed"}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={run}
                disabled={loading || !resume}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <BrainCircuit size={18} />
                )}

                {loading
                  ? "Analyzing..."
                  : "Analyze Resume"}
              </button>
            </div>

            {/* =================================================
                AI INFORMATION
            ================================================= */}

            {resume && !loading && !a && (
              <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-4 md:p-5">

                <div className="flex items-start gap-3">

                  <div className="bg-white p-2.5 rounded-lg shrink-0 shadow-sm">
                    <BrainCircuit
                      size={21}
                      className="text-purple-600"
                    />
                  </div>

                  <div>

                    <div className="flex items-center gap-2 flex-wrap">

                      <h3 className="font-semibold text-gray-900">
                        AI-powered resume analysis
                      </h3>

                      <span className="text-xs font-medium bg-white text-purple-600 px-2 py-1 rounded-full border border-purple-100">
                        AI Generated
                      </span>

                    </div>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      Our AI will analyze your resume and
                      generate scores, strengths, areas needing
                      attention, recommendations, and possible
                      missing keywords.
                    </p>

                  </div>

                </div>
              </div>
            )}

            {/* =================================================
                SELECTED RESUME
            ================================================= */}

            {resume && (
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">

                <div className="bg-white p-2 rounded-lg">
                  <FileText
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div className="min-w-0">

                  <strong className="block truncate">
                    {resume.title ||
                      "Untitled Resume"}
                  </strong>

                  <span className="text-sm text-gray-500">
                    {resume.personalInfo?.name ||
                      "Unnamed candidate"}
                  </span>

                </div>

              </div>
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!resume && (
              <div className="bg-white border rounded-xl text-center py-12 mt-5">

                <Search
                  size={35}
                  className="mx-auto text-gray-300 mb-3"
                />

                <p className="font-medium text-gray-700">
                  Select a resume to start analysis
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Choose one of your resumes above.
                </p>

              </div>
            )}

            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (
              <div className="bg-white border rounded-xl text-center py-12 mt-5">

                <div className="flex justify-center mb-4">
                  <div className="bg-purple-50 p-4 rounded-full">
                    <BrainCircuit
                      size={35}
                      className="text-purple-600 animate-pulse"
                    />
                  </div>
                </div>

                <Loader2
                  size={25}
                  className="mx-auto text-blue-600 animate-spin mb-3"
                />

                <p className="font-semibold">
                  AI is analyzing your resume...
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Reviewing your content, skills,
                  projects, keywords and readability.
                </p>

                <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-full">
                  <Sparkles size={12} />
                  AI Analysis in progress
                </span>

              </div>
            )}

            {/* =================================================
                RESULT
            ================================================= */}

            {a && !loading && (
              <div className="mt-6">

                {/* =================================================
                    AI ANALYSIS COMPLETE
                ================================================= */}

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-4 md:p-5 mb-6">

                  <div className="flex items-start gap-3">

                    <div className="bg-white p-2.5 rounded-lg shrink-0 shadow-sm">
                      <BrainCircuit
                        size={21}
                        className="text-purple-600"
                      />
                    </div>

                    <div>

                      <div className="flex items-center gap-2 flex-wrap">

                        <h3 className="font-semibold text-gray-900">
                          AI Analysis Complete
                        </h3>

                        <span className="text-xs font-medium bg-white text-purple-600 px-2 py-1 rounded-full border border-purple-100">
                          AI Generated
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        The scores and insights below were
                        generated by analyzing the content of
                        your resume using our integrated AI feature.
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    AI SCORE
                ================================================= */}

                <div>

                  <div className="flex items-center justify-between mb-3">

                    <div>

                      <h3 className="font-semibold text-lg">
                        AI Resume Score
                      </h3>

                      <p className="text-sm text-gray-500">
                        Scores generated from your AI resume analysis.
                      </p>

                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-full">
                      <BrainCircuit size={14} />
                      AI Generated
                    </div>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">

                    {[
                      [
                        "Overall",
                        a.overallScore,
                      ],
                      [
                        "ATS",
                        a.atsScore,
                      ],
                      [
                        "Content",
                        a.contentScore,
                      ],
                      [
                        "Skills",
                        a.skillsScore,
                      ],
                      [
                        "Projects",
                        a.projectScore,
                      ],
                      [
                        "Readability",
                        a.readabilityScore,
                      ],
                    ].map(
                      ([name, value]) => (
                        <div
                          key={name}
                          className="bg-white border rounded-xl p-4 text-center"
                        >

                          <span className="block text-sm text-gray-500">
                            {name}
                          </span>

                          <strong className="block text-2xl md:text-3xl mt-1">
                            {value ?? 0}
                          </strong>

                          <small className="text-gray-400">
                            / 100
                          </small>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* =================================================
                    AI INSIGHTS
                ================================================= */}

                <div className="mt-6">

                  <div className="flex items-center gap-2 mb-3">

                    <Sparkles
                      size={18}
                      className="text-purple-600"
                    />

                    <div>

                      <h3 className="font-semibold text-lg">
                        AI Insights
                      </h3>

                      <p className="text-sm text-gray-500">
                        Personalized insights generated from your resume.
                      </p>

                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <InfoList
                      title="Strengths"
                      items={
                        a.strengths || []
                      }
                      icon={CheckCircle2}
                    />

                    <InfoList
                      title="Needs attention"
                      items={
                        a.weaknesses || []
                      }
                      icon={AlertCircle}
                    />

                    <InfoList
                      title="Recommendations"
                      items={
                        a.recommendations ||
                        []
                      }
                      icon={Lightbulb}
                    />

                    <InfoList
                      title="Possible missing keywords"
                      items={
                        a.missingKeywords ||
                        []
                      }
                      icon={Search}
                    />

                  </div>

                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AI RESUME ANALYTICS
========================================================= */

function Analytics({ onClose }) {
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get(
          "/api/ai/analytics"
        );

        setD(res.data);
      } catch {
        setD({
          analyses: [],
          jobs: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

        <div className="bg-white rounded-xl p-8 text-center">

          <Loader2
            size={32}
            className="animate-spin mx-auto text-blue-600"
          />

          <p className="mt-3 font-medium">
            Loading AI analytics...
          </p>

        </div>

      </div>
    );
  }

  const analyses = d?.analyses || [];
  const jobs = d?.jobs || [];

  const latest =
    analyses[analyses.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">

      <div className="min-h-full flex items-start md:items-center justify-center p-4">

        <div className="bg-gray-50 w-full max-w-6xl rounded-2xl shadow-xl my-4 md:my-8">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="bg-white border-b rounded-t-2xl px-5 md:px-7 py-5 flex justify-between items-center gap-4">

            <div>

              <div className="flex items-center gap-2 flex-wrap">

                <p className="text-xs font-semibold tracking-wider text-purple-600">
                  AI RESUME INSIGHTS
                </p>

                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-100 px-2 py-1 rounded-full text-xs font-semibold">
                  <Sparkles size={12} />
                  AI Powered
                </span>

              </div>

              <h2 className="text-xl md:text-2xl font-bold mt-1">
                AI Resume Analytics
              </h2>

              <p className="text-sm md:text-base text-gray-500 mt-1">
                Track the results of your AI-powered resume analyses over time.
              </p>

            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={22} />
            </button>

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="p-5 md:p-7">

            {/* =================================================
                AI ANALYTICS INFO
            ================================================= */}

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-4 md:p-5 mb-5">

              <div className="flex items-start gap-3">

                <div className="bg-white p-2.5 rounded-lg shrink-0 shadow-sm">
                  <BrainCircuit
                    size={21}
                    className="text-purple-600"
                  />
                </div>

                <div>

                  <div className="flex items-center gap-2 flex-wrap">

                    <h3 className="font-semibold">
                      Powered by AI Resume Analysis
                    </h3>

                    <span className="text-xs font-semibold text-purple-600 bg-white border border-purple-100 px-2 py-1 rounded-full">
                      AI
                    </span>

                  </div>

                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Your analytics are built from the AI analyses
                    performed on your resumes. Each analysis
                    contributes to your resume score history and
                    helps you track changes over time.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                TOP STATS
            ================================================= */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* LATEST SCORE */}

              <div className="bg-white border rounded-xl p-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Latest AI Score
                  </span>

                  <BrainCircuit
                    size={18}
                    className="text-purple-600"
                  />

                </div>

                <div className="flex items-end gap-1 mt-2">

                  <strong className="text-4xl">
                    {latest?.overallScore ??
                      "—"}
                  </strong>

                  {latest && (
                    <span className="text-gray-400 mb-1">
                      /100
                    </span>
                  )}

                </div>

                <p className="text-sm text-gray-500 mt-2 truncate">
                  {latest?.resume?.title ||
                    "No AI analysis yet"}
                </p>

                {latest && (
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    <Sparkles size={11} />
                    Generated by AI
                  </span>
                )}

              </div>

              {/* TOTAL ANALYSES */}

              <div className="bg-white border rounded-xl p-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Total AI Analyses
                  </span>

                  <Sparkles
                    size={18}
                    className="text-purple-600"
                  />

                </div>

                <strong className="block text-4xl mt-2">
                  {analyses.length}
                </strong>

                <p className="text-sm text-gray-500 mt-2">
                  Resume analyses completed by AI
                </p>

              </div>

              {/* JOB ANALYSES */}

              <div className="bg-white border rounded-xl p-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    AI Job Analyses
                  </span>

                  <BrainCircuit
                    size={18}
                    className="text-purple-600"
                  />

                </div>

                <strong className="block text-4xl mt-2">
                  {jobs.length}
                </strong>

                <p className="text-sm text-gray-500 mt-2">
                  Target roles analyzed by AI
                </p>

              </div>

            </div>

            {/* =================================================
                HISTORY
            ================================================= */}

            <div className="bg-white border rounded-xl mt-5 overflow-hidden">

              <div className="p-5 border-b">

                <div className="flex items-center gap-2">

                  <h3 className="font-semibold text-lg">
                    AI Analysis History
                  </h3>

                  <BrainCircuit
                    size={18}
                    className="text-purple-600"
                  />

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Review the scores generated by AI for each resume analysis.
                </p>

              </div>

              {analyses.length ? (
                <div className="divide-y">

                  {analyses
                    .slice()
                    .reverse()
                    .map((x) => {

                      const resumeTitle =
                        x.resume?.title ||
                        "Untitled resume";

                      const candidateName =
                        x.resume?.personalInfo
                          ?.name ||
                        "Unnamed candidate";

                      return (
                        <div
                          className="p-4 md:p-5 flex items-center justify-between gap-4"
                          key={x._id}
                        >

                          {/* RESUME INFORMATION */}

                          <div className="flex items-center gap-3 min-w-0">

                            <div className="bg-purple-50 p-2.5 rounded-lg shrink-0">
                              <BrainCircuit
                                size={19}
                                className="text-purple-600"
                              />
                            </div>

                            <div className="min-w-0">

                              <strong className="block truncate">
                                {resumeTitle}
                              </strong>

                              <span className="block text-sm text-gray-500 truncate">
                                {candidateName}
                              </span>

                              <small className="block text-xs text-gray-400 mt-1">
                                {x.createdAt
                                  ? new Date(
                                      x.createdAt
                                    ).toLocaleDateString()
                                  : "Unknown date"}
                              </small>

                              <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                <Sparkles size={11} />
                                AI Analysis
                              </span>

                            </div>

                          </div>

                          {/* SCORE */}

                          <div className="text-right shrink-0">

                            <b className="text-2xl">
                              {x.overallScore ??
                                0}
                            </b>

                            <small className="text-gray-400 ml-1">
                              /100
                            </small>

                          </div>

                        </div>
                      );
                    })}

                </div>
              ) : (
                <div className="text-center py-12 px-5">

                  <BrainCircuit
                    size={35}
                    className="mx-auto text-gray-300 mb-3"
                  />

                  <p className="font-medium text-gray-700">
                    No AI analysis history yet
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Analyze your first resume with AI to start tracking your progress.
                  </p>

                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  const [resumes, setResumes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showAnalyzer, setShowAnalyzer] =
    useState(false);

  const [showAnalytics, setShowAnalytics] =
    useState(false);

  const [selectedResume, setSelectedResume] =
    useState(null);

  const navigate = useNavigate();

  /* =======================================================
     FETCH RESUMES
  ======================================================= */

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/resume");

        setResumes(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (err) {
        alert(
          "Unauthorized - login again"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    try {
      await api.get(
        "/api/auth/logout"
      );

      localStorage.removeItem("token");

      navigate("/");
    } catch {
      alert("Logout failed");
    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (id) => {
    try {
      if (
        !window.confirm(
          "Delete this resume?"
        )
      ) {
        return;
      }

      await api.delete(
        `/resume/${id}`
      );

      setResumes((prev) =>
        prev.filter(
          (r) => r._id !== id
        )
      );
    } catch {
      alert("Delete failed");
    }
  };

  /* =======================================================
     EDIT
  ======================================================= */

  const handleEdit = (id) => {
    navigate(
      `/builder?id=${id}`
    );
  };

  /* =======================================================
     ANALYZE
  ======================================================= */

  const handleAnalyze = (resume) => {
    setSelectedResume(resume);
    setShowAnalyzer(true);
  };

  /* =======================================================
     CLOSE ANALYZER
  ======================================================= */

  const closeAnalyzer = () => {
    setShowAnalyzer(false);
    setSelectedResume(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">

          {/* =================================================
              MOBILE HEADER
          ================================================= */}

          <div className="flex flex-col gap-4 md:hidden">

            <div className="flex justify-between items-center">

              <div>

                <h1 className="text-xl font-bold">
                  Resumes
                </h1>

                <div className="flex items-center gap-1.5 mt-1">

                  <Sparkles
                    size={13}
                    className="text-purple-600"
                  />

                  <span className="text-xs font-medium text-purple-600">
                    AI-powered resume tools
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowAnalytics(true)
                }
                className="flex items-center gap-2 text-blue-600 font-semibold"
              >
                <BarChart3 size={18} />
                Analytics
              </button>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  navigate("/builder")
                }
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-base font-semibold"
              >
                New
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 border text-red-500 py-3 rounded-lg text-base font-semibold"
              >
                Logout
              </button>

            </div>

          </div>

          {/* =================================================
              DESKTOP HEADER
          ================================================= */}

          <div className="hidden md:flex justify-between items-center">

            <div>

              <h1 className="text-2xl lg:text-3xl font-bold">
                Resumes
              </h1>

              <div className="flex items-center gap-1.5 mt-1">

                <Sparkles
                  size={14}
                  className="text-purple-600"
                />

                <span className="text-sm font-medium text-purple-600">
                  AI-powered resume tools
                </span>

              </div>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setShowAnalytics(true)
                }
                className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg text-base font-semibold flex items-center gap-2"
              >
                <BarChart3 size={18} />
                Analytics
              </button>

              <button
                onClick={() =>
                  navigate("/builder")
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-base font-semibold"
              >
                + Create Resume
              </button>

              <button
                onClick={handleLogout}
                className="border border-red-200 text-red-500 px-5 py-3 rounded-lg text-base font-semibold"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">

        {loading ? (

          <div className="text-center text-lg py-12">
            Loading...
          </div>

        ) : resumes.length === 0 ? (

          /* =================================================
             NO RESUMES
          ================================================= */

          <div className="text-center py-20 bg-white rounded-xl border max-w-md mx-auto">

            <FileText
              size={40}
              className="mx-auto text-gray-300 mb-4"
            />

            <p className="font-semibold text-xl md:text-2xl">
              No resumes yet
            </p>

            <p className="text-gray-500 mt-2">
              Create your first resume to get started.
            </p>

            <button
              onClick={() =>
                navigate("/builder")
              }
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold"
            >
              Create Resume
            </button>

          </div>

        ) : (

          /* =================================================
             RESUME GRID
          ================================================= */

          <div
            className="
              grid
              gap-5 md:gap-7 lg:gap-8
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

            {resumes.map((r) => (

              <div
                key={r._id}
                className="
                  bg-white border rounded-2xl
                  p-5 md:p-6
                  flex flex-col justify-between
                  min-h-[250px]
                  shadow-sm hover:shadow-md
                  transition-all duration-200
                "
              >

                {/* =================================================
                    TOP CONTENT
                ================================================= */}

                <div>

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h2 className="font-semibold text-lg md:text-xl leading-snug truncate">
                        {r.title ||
                          "Untitled Resume"}
                      </h2>

                      <p className="text-sm md:text-base text-gray-500 mt-2 truncate">
                        {r.personalInfo?.name ||
                          "No name"}
                      </p>

                    </div>

                    <div className="bg-gray-50 p-2 rounded-lg shrink-0">

                      <FileText
                        size={19}
                        className="text-gray-500"
                      />

                    </div>

                  </div>

                  {/* AI READY LABEL */}

                  <div className="mt-6 flex items-center gap-2">

                    <span className="text-sm text-gray-400">
                      Resume
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      <Sparkles size={11} />
                      AI Analysis
                    </span>

                  </div>

                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <button
                    onClick={() =>
                      handleEdit(r._id)
                    }
                    className="
                      bg-blue-50 text-blue-600
                      py-3 rounded-xl
                      text-sm md:text-base
                      font-semibold
                      hover:bg-blue-100
                      transition
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleAnalyze(r)
                    }
                    className="
                      bg-purple-50 text-purple-600
                      py-3 rounded-xl
                      text-sm md:text-base
                      font-semibold
                      hover:bg-purple-100
                      transition
                      flex items-center justify-center gap-2
                    "
                  >
                    <BrainCircuit size={17} />
                    Analyze with AI
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(r._id)
                    }
                    className="
                      col-span-2
                      bg-red-50 text-red-500
                      py-3 rounded-xl
                      text-sm md:text-base
                      font-semibold
                      hover:bg-red-100
                      transition
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* =====================================================
          AI ANALYZER
      ===================================================== */}

      {showAnalyzer && (
        <Analyzer
          resume={selectedResume}
          resumes={resumes}
          setSelected={setSelectedResume}
          onClose={closeAnalyzer}
        />
      )}

      {/* =====================================================
          AI ANALYTICS
      ===================================================== */}

      {showAnalytics && (
        <Analytics
          onClose={() =>
            setShowAnalytics(false)
          }
        />
      )}

    </div>
  );
}