import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/resume");
        setResumes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        alert("Unauthorized - login again");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/api/auth/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch {
      alert("Logout failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this resume?")) return;
      await api.delete(`/resume/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/builder?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
          {/* MOBILE */}
          <div className="flex flex-col gap-4 md:hidden">
            <h1 className="text-xl font-bold">Resumes</h1>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/builder")}
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

          {/* DESKTOP */}
          <div className="hidden md:flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-bold">Resumes</h1>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/builder")}
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

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {loading ? (
          <div className="text-center text-lg py-12">Loading...</div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border max-w-md mx-auto">
            <p className="font-semibold text-xl md:text-2xl">No resumes yet</p>

            <button
              onClick={() => navigate("/builder")}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div
            className="
              grid
              gap-5 md:gap-7 lg:gap-10
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
    p-6 md:p-7 lg:p-8
    flex flex-col justify-between
    min-h-[220px] md:min-h-[240px]
    shadow-sm hover:shadow-md
    transition-all duration-200
  "
              >
                {/* TOP CONTENT */}
                <div>
                  {/* TITLE */}
                  <h2 className="font-semibold text-lg md:text-xl lg:text-2xl leading-snug truncate">
                    {r.title || "Untitled Resume"}
                  </h2>

                  {/* NAME */}
                  <p className="text-base md:text-lg text-gray-500 mt-3 truncate">
                    {r.personalInfo?.name || "No name"}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(r._id)}
                    className="flex-1 bg-blue-50 text-blue-600 
                 py-3 md:py-3.5 
                 rounded-xl 
                 text-base md:text-lg 
                 font-semibold 
                 hover:bg-blue-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(r._id)}
                    className="flex-1 bg-red-50 text-red-500 
                 py-3 md:py-3.5 
                 rounded-xl 
                 text-base md:text-lg 
                 font-semibold 
                 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
