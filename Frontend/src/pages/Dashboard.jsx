import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/resume");
        setResumes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Unauthorized - login again");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await api.get("/api/auth/logout"); // adjust endpoint if needed

      // remove token if stored
      localStorage.removeItem("token");

      // redirect to login

      navigate("/");
      alert("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this resume?")) return;

      await api.delete(`/resume/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  /* ================= EDIT NAVIGATION ================= */
  const handleEdit = (id) => {
    if (!id) {
      console.error("Invalid ID");
      return;
    }

    navigate(`/builder?id=${id}`, { replace: false });
  };

  return (
  <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">

    {/* ── HEADER ── */}
    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
        My Resumes
      </h1>

      <div className="flex items-center gap-2 w-full xs:w-auto">
        <button
          onClick={() => navigate("/builder")}
          className="flex-1 xs:flex-none bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                     text-white px-4 py-2.5 rounded-lg text-sm font-semibold
                     transition-colors min-h-[42px] whitespace-nowrap"
        >
          + Create Resume
        </button>

        <button
          onClick={handleLogout}
          className="flex-2 max-w-xs xs:flex-none bg-red-500 hover:bg-red-600 active:bg-red-700
                     text-white px-4 py-2.5 rounded-lg text-sm font-semibold
                     transition-colors min-h-[42px] whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    </div>

    {/* ── LOADING ── */}
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 animate-pulse text-sm">Loading resumes…</p>
      </div>

    ) : resumes.length === 0 ? (

      /* ── EMPTY STATE ── */
      <div className="flex flex-col items-center justify-center text-center
                      mt-10 sm:mt-16 px-4 py-12 bg-white rounded-2xl
                      border border-dashed border-gray-300 max-w-md mx-auto">
        <div className="text-4xl mb-4 select-none">📄</div>
        <p className="text-gray-700 font-semibold text-lg">No resumes yet</p>
        <p className="text-gray-400 text-sm mt-1 mb-6 max-w-xs">
          Create your first resume and it'll show up here.
        </p>
        <button
          onClick={() => navigate("/builder")}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                     text-white px-6 py-2.5 rounded-lg font-semibold text-sm
                     transition-colors min-h-[42px]"
        >
          + Create Your First Resume
        </button>
      </div>

    ) : (

      /* ── GRID ── */
      <div className="grid gap-4 sm:gap-5
                      grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">

        {resumes.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-xl border border-gray-200
                       hover:border-blue-300 hover:shadow-lg
                       transition-all duration-200
                       flex flex-col"
          >
            {/* ── CARD BODY ── */}
            <div className="flex-1 p-4 sm:p-5">

              {/* Title + name */}
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate leading-snug">
                {r.title || "Untitled Resume"}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5 truncate">
                {r.personalInfo?.name || "No name provided"}
              </p>

              {/* Skills chips */}
              {(r.technicalSkills || []).length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(r.technicalSkills || []).slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 border border-blue-100
                                 text-xs font-medium px-2 py-0.5 rounded-full
                                 max-w-[120px] truncate"
                    >
                      {skill}
                    </span>
                  ))}
                  {(r.technicalSkills || []).length > 4 && (
                    <span className="text-xs text-gray-400 self-center">
                      +{r.technicalSkills.length - 4} more
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-3 italic">No skills added</p>
              )}
            </div>

            {/* ── CARD FOOTER ── */}
            <div className="border-t border-gray-100 flex">
              <button
                onClick={() => handleEdit(r._id)}
                className="flex-1 flex items-center justify-center gap-1.5
                           py-3 text-sm font-semibold text-blue-600
                           hover:bg-blue-50 active:bg-blue-100
                           transition-colors rounded-bl-xl min-h-[48px]"
              >
                <span className="text-base leading-none">✏️</span>
                Edit
              </button>

              <div className="w-px bg-gray-100" />

              <button
                onClick={() => handleDelete(r._id)}
                className="flex-1 flex items-center justify-center gap-1.5
                           py-3 text-sm font-semibold text-red-500
                           hover:bg-red-50 active:bg-red-100
                           transition-colors rounded-br-xl min-h-[48px]"
              >
                <span className="text-base leading-none">🗑️</span>
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>
    )}
  </div>
);
}