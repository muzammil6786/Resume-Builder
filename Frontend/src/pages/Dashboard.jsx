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
    <div className="p-8 bg-gray-100 min-h-screen">
       {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Resumes</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/builder")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Resume
          </button>

          {/* 🔴 LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : resumes.length === 0 ? (
        <p className="text-gray-500">No resumes found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {resumes.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">
                {r.title || "Untitled Resume"}
              </h2>

              <p className="text-sm text-gray-500">
                {r.personalInfo?.name || "No name"}
              </p>

              {/* SKILLS PREVIEW */}
              <p className="text-sm mt-2 text-gray-600">
                {(r.technicalSkills || []).slice(0, 3).join(", ") ||
                  "No skills added"}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(r._id)}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(r._id)}
                  className="text-red-500 font-medium"
                >
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