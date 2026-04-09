import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { ModernTemplate } from "../components/templates/mordern";
import { ClassicTemplate } from "../components/templates/classic";

/* ── blank slate used for both initial state and reset ── */
const EMPTY_RESUME = {
  title: "",
  template: "modern",
  settings: {
    primaryColor: "#666666",
    fontSize: "14px",
    spacing: "normal",
    showEducation: true,
    showExperience: true,
    showProjects: true,
    showSkills: true,
    showAchievements: true,
    showInterests: true,
  },
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
    summary: "",
  },
  education: [],
  experience: [],
  projects: [],
  technicalSkills: [],
  softSkills: [],
  interests: [],
  achievements: [],
};

export default function Builder() {
  const [params, setSearchParams] = useSearchParams();
  const id = params.get("id");

  const [resume, setResume]               = useState(EMPTY_RESUME);
  const [saving, setSaving]               = useState(false);
  const [exporting, setExporting]         = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);
  const [fetchError, setFetchError]       = useState(null);

  /* ── fetch whenever id changes ── */
  useEffect(() => {
    if (!id) {
      // New resume — always start from blank
      setResume(EMPTY_RESUME);
      setFetchError(null);
      return;
    }

    const fetchResume = async () => {
      setLoadingResume(true);
      setFetchError(null);
      setResume(EMPTY_RESUME); // clear stale data immediately

      try {
        const res  = await api.get(`/resume/${id}`);
        const data = res.data || {};

        // Normalize settings from DB
        const incomingSettings = { ...EMPTY_RESUME.settings, ...data.settings };

        // fontSize saved as number (14) → select needs string ("14px")
        if (typeof incomingSettings.fontSize === "number") {
          incomingSettings.fontSize = `${incomingSettings.fontSize}px`;
        }
        if (!incomingSettings.fontSize) {
          incomingSettings.fontSize = "14px";
        }

        setResume({
          ...EMPTY_RESUME,
          title:           data.title          || "",
          template:        data.template        || "modern",
          personalInfo:    { ...EMPTY_RESUME.personalInfo, ...data.personalInfo },
          settings:        incomingSettings,
          education:       data.education       || [],
          experience:      data.experience      || [],
          projects:        data.projects        || [],
          technicalSkills: data.technicalSkills || [],
          softSkills:      data.softSkills      || [],
          interests:       data.interests       || [],
          achievements:    data.achievements    || [],
        });
      } catch (err) {
        console.error("Fetch failed:", err);
        setFetchError("Failed to load resume. Please go back and try again.");
      } finally {
        setLoadingResume(false);
      }
    };

    fetchResume();
  }, [id]);

  /* ── save ── */
  const handleSave = async () => {
    try {
      setSaving(true);
      const { _id, createdAt, updatedAt, __v, user, ...cleanResume } = resume;

      // fontSize must be stored as a number in the DB
      if (cleanResume.settings?.fontSize) {
        cleanResume.settings.fontSize = parseInt(cleanResume.settings.fontSize);
      }

      if (id) {
        await api.patch(`/resume/${id}`, cleanResume);
      } else {
        const res = await api.post("/resume", cleanResume);
        setSearchParams({ id: res.data._id }, { replace: true });
      }
      alert("✅ Saved");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* ── export ── */
  const handleExport = async () => {
    setExporting(true);
    try {
      const p   = resume.personalInfo;
      const s   = resume.settings;
      const col = s.primaryColor || "#2563eb";

      const spacingMap = { compact: "10px", normal: "16px", relaxed: "22px" };
      const gap = spacingMap[s.spacing] || "16px";

      const chip = (text, bg, textCol, border) =>
        `<span style="display:inline-block;background:${bg};color:${textCol};border:1px solid ${border};border-radius:4px;padding:2px 9px;font-size:11px;font-weight:600;margin:2px 3px 2px 0">${text}</span>`;

      const secHead = (label) =>
        `<div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.14em;color:${col};border-bottom:2px solid ${col};padding-bottom:4px;margin:20px 0 10px">${label}</div>`;

      const educationHTML =
        s.showEducation && resume.education.length
          ? secHead("Education") +
            resume.education.map((e) => `
              <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:${gap}">
                <div>
                  <div style="font-weight:700;font-size:13px;color:#0f172a">${e.degree || ""}</div>
                  <div style="font-size:12px;color:#64748b">${e.school || ""}</div>
                </div>
                <div style="font-size:11px;color:#94a3b8;white-space:nowrap;padding-left:12px">${e.year || ""}</div>
              </div>`).join("") : "";

      const experienceHTML =
        s.showExperience && resume.experience.length
          ? secHead("Experience") +
            resume.experience.map((e) => `
              <div style="margin-bottom:${gap}">
                <div style="display:flex;justify-content:space-between;align-items:baseline">
                  <span style="font-weight:700;font-size:13px;color:#0f172a">${e.role || ""}</span>
                  <span style="font-size:11px;color:#94a3b8;white-space:nowrap;padding-left:12px">${e.duration || ""}</span>
                </div>
                ${e.company     ? `<div style="font-size:12px;color:${col};font-weight:700;margin-top:2px">${e.company}</div>` : ""}
                ${e.description ? `<p style="font-size:12px;color:#334155;margin:5px 0 0;line-height:1.65">${e.description}</p>` : ""}
              </div>`).join("") : "";

      const projectsHTML =
        s.showProjects && resume.projects.length
          ? secHead("Projects") +
            resume.projects.map((proj) => `
              <div style="margin-bottom:${gap}">
                <div style="font-weight:700;font-size:13px;color:#0f172a">${proj.title || ""}</div>
                ${proj.description ? `<p style="font-size:12px;color:#334155;margin:4px 0 0;line-height:1.65">${proj.description}</p>` : ""}
              </div>`).join("") : "";

      const skillsHTML =
        s.showSkills && (resume.technicalSkills.length || resume.softSkills.length)
          ? secHead("Skills") +
            (resume.technicalSkills.length
              ? `<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Technical</div>
                 <div style="margin-bottom:10px">${resume.technicalSkills.map((sk) => chip(sk, "#eff6ff", col, col + "44")).join("")}</div>` : "") +
            (resume.softSkills.length
              ? `<div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Soft Skills</div>
                 <div>${resume.softSkills.map((sk) => chip(sk, "#f0fdf4", "#166534", "#bbf7d0")).join("")}</div>` : "") : "";

      const achievementsHTML =
        s.showAchievements && resume.achievements.length
          ? secHead("Achievements") +
            `<ul style="padding-left:18px;margin:0">
              ${resume.achievements.map((a) => `<li style="font-size:12px;color:#334155;margin-bottom:4px;line-height:1.65">${a}</li>`).join("")}
            </ul>` : "";

      const interestsHTML =
        s.showInterests && resume.interests.length
          ? secHead("Interests") +
            `<div>${resume.interests.map((it) => chip(it, "#faf5ff", "#6b21a8", "#e9d5ff")).join("")}</div>` : "";

      const html = `
        <div style="font-family:Georgia,serif;font-size:${s.fontSize || "14px"};color:#1a1a2e;padding:44px 48px;line-height:1.6;max-width:710px;margin:0 auto">
          <div style="border-bottom:3px solid ${col};padding-bottom:18px;margin-bottom:20px">
            <h1 style="font-size:28px;font-weight:700;color:#0f172a;margin:0 0 8px;letter-spacing:-0.02em;line-height:1.15">${p.name || ""}</h1>
            <div style="display:flex;flex-wrap:wrap;gap:4px 18px;font-size:12px;color:#475569;margin-top:4px">
              ${p.email    ? `<span>&#9993; ${p.email}</span>`      : ""}
              ${p.phone    ? `<span>&#128222; ${p.phone}</span>`    : ""}
              ${p.location ? `<span>&#128205; ${p.location}</span>` : ""}
            </div>
            ${p.summary ? `<p style="margin:12px 0 0;font-size:12.5px;color:#334155;line-height:1.7">${p.summary}</p>` : ""}
          </div>
          ${educationHTML}${experienceHTML}${projectsHTML}${skillsHTML}${achievementsHTML}${interestsHTML}
        </div>`;

      const res = await api.post("/pdf/export", { html }, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a   = document.createElement("a");
      a.href    = url;
      a.download = `${resume.title || "resume"}.pdf`;
      a.click();
    } catch (err) {
      console.error("Export failed:", err);
      alert("❌ PDF export failed");
    } finally {
      setExporting(false);
    }
  };

  /* ── helpers ── */
  const updatePersonal = (field, value) =>
    setResume((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  const updateArrayItem = (section, index, field, value) =>
    setResume((prev) => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });

  const addItem     = (section, obj)      => setResume((prev) => ({ ...prev, [section]: [...prev[section], obj] }));
  const removeItem  = (section, index)    => setResume((prev) => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  const addField    = (section)           => setResume((prev) => ({ ...prev, [section]: [...prev[section], ""] }));
  const updateField = (section, i, value) => setResume((prev) => { const u = [...prev[section]]; u[i] = value; return { ...prev, [section]: u }; });
  const removeField = (section, index)    => setResume((prev) => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));

  /* ── loading / error screens ── */
  if (loadingResume) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading resume…</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow">
          <p className="text-red-500 font-semibold text-lg mb-4">{fetchError}</p>
          <button onClick={() => window.history.back()} className="bg-slate-800 text-white px-5 py-2 rounded-lg">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ── main UI ── */
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* ═══════════════ LEFT PANEL – Editor ═══════════════ */}
      <div className="w-1/2 flex flex-col bg-white border-r border-gray-200 overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white flex-shrink-0">
          <h2 className="text-base font-bold tracking-wide">✦ Resume Builder</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 rounded text-white ${saving ? "bg-gray-400" : "bg-green-600"}`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Resume Title</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
              placeholder="e.g. Software Engineer – 2025"
              value={resume.title}
              onChange={(e) => setResume((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>

          {/* DESIGN */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Design</label>
            <div className="grid grid-cols-2 gap-3">

              <div>
                <span className="text-xs text-gray-500 font-semibold">Template</span>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
                  value={resume.template}
                  onChange={(e) => setResume((prev) => ({ ...prev, template: e.target.value }))}
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                </select>
              </div>

              <div>
                <span className="text-xs text-gray-500 font-semibold">Font Size</span>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
                  value={resume.settings.fontSize}
                  onChange={(e) => setResume((prev) => ({ ...prev, settings: { ...prev.settings, fontSize: e.target.value } }))}
                >
                  <option value="12px">Small</option>
                  <option value="14px">Medium</option>
                  <option value="16px">Large</option>
                </select>
              </div>

              <div>
                <span className="text-xs text-gray-500 font-semibold">Spacing</span>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400"
                  value={resume.settings.spacing}
                  onChange={(e) => setResume((prev) => ({ ...prev, settings: { ...prev.settings, spacing: e.target.value } }))}
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                </select>
              </div>

              <div>
                <span className="text-xs text-gray-500 font-semibold">Accent Colour</span>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={resume.settings.primaryColor}
                    onChange={(e) => setResume((prev) => ({ ...prev, settings: { ...prev.settings, primaryColor: e.target.value } }))}
                    className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0"
                  />
                  <span className="text-xs text-gray-400">{resume.settings.primaryColor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-2 gap-x-3 mt-3">
              {[
                ["showEducation",    "Education"],
                ["showExperience",   "Experience"],
                ["showProjects",     "Projects"],
                ["showSkills",       "Skills"],
                ["showAchievements", "Achievements"],
                ["showInterests",    "Interests"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={resume.settings[key]}
                    onChange={(e) => setResume((prev) => ({ ...prev, settings: { ...prev.settings, [key]: e.target.checked } }))}
                    className="accent-blue-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Contact Info</label>
            {[
              ["name",      "Full Name"],
              ["email",     "Email"],
              ["phone",     "Phone"],
              ["location",  "Location"],
              ["github",    "GitHub URL"],
              ["linkedin",  "LinkedIn URL"],
              ["portfolio", "Portfolio URL"],
            ].map(([field, placeholder]) => (
              <input
                key={field}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400 mt-2"
                placeholder={placeholder}
                value={resume.personalInfo[field]}
                onChange={(e) => updatePersonal(field, e.target.value)}
              />
            ))}
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-blue-400 mt-2 resize-none"
              rows={3}
              placeholder="Professional Summary"
              value={resume.personalInfo.summary}
              onChange={(e) => updatePersonal("summary", e.target.value)}
            />
          </div>

          {/* EDUCATION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Education</label>
              <button onClick={() => addItem("education", { school: "", degree: "", year: "" })} className="text-xs font-semibold text-blue-500 hover:text-blue-700">+ Add</button>
            </div>
            {resume.education.map((edu, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3 mt-2 bg-gray-50 relative">
                <button onClick={() => removeItem("education", i)} className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-600">✕</button>
                <input placeholder="School"          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400 mt-1" value={edu.school} onChange={(e) => updateArrayItem("education", i, "school",  e.target.value)} />
                <input placeholder="Degree / Course" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400 mt-2" value={edu.degree} onChange={(e) => updateArrayItem("education", i, "degree",  e.target.value)} />
                <input placeholder="Year"            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400 mt-2" value={edu.year}   onChange={(e) => updateArrayItem("education", i, "year",    e.target.value)} />
              </div>
            ))}
          </div>

          {/* EXPERIENCE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Experience</label>
              <button onClick={() => addItem("experience", { company: "", role: "", duration: "", description: "" })} className="text-xs font-semibold text-blue-500 hover:text-blue-700">+ Add</button>
            </div>
            {resume.experience.map((exp, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3 mt-2 bg-gray-50 relative">
                <button onClick={() => removeItem("experience", i)} className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-600">✕</button>
                <input placeholder="Company"      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400"    value={exp.company}     onChange={(e) => updateArrayItem("experience", i, "company",     e.target.value)} />
                <input placeholder="Role / Title" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400 mt-2" value={exp.role}        onChange={(e) => updateArrayItem("experience", i, "role",        e.target.value)} />
                <input placeholder="Duration"     className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400 mt-2" value={exp.duration}    onChange={(e) => updateArrayItem("experience", i, "duration",    e.target.value)} />
                <textarea placeholder="Description" rows={2} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400 mt-2 resize-none" value={exp.description} onChange={(e) => updateArrayItem("experience", i, "description", e.target.value)} />
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Projects</label>
              <button onClick={() => addItem("projects", { title: "", description: "" })} className="text-xs font-semibold text-blue-500 hover:text-blue-700">+ Add</button>
            </div>
            {resume.projects.map((p, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3 mt-2 bg-gray-50 relative">
                <button onClick={() => removeItem("projects", i)} className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-600">✕</button>
                <input placeholder="Project Title"  className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400"    value={p.title}       onChange={(e) => updateArrayItem("projects", i, "title",       e.target.value)} />
                <textarea placeholder="Description" rows={2} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-400 mt-2 resize-none" value={p.description} onChange={(e) => updateArrayItem("projects", i, "description", e.target.value)} />
              </div>
            ))}
          </div>

          {/* CHIPS */}
          {[
            ["technicalSkills", "Technical Skills"],
            ["softSkills",      "Soft Skills"],
            ["interests",       "Interests"],
            ["achievements",    "Achievements"],
          ].map(([key, title]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</label>
                <button onClick={() => addField(key)} className="text-xs font-semibold text-blue-500 hover:text-blue-700">+ Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume[key].map((item, i) => (
                  <div key={i} className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                    <input
                      className="bg-transparent border-none outline-none text-xs text-blue-700 w-20"
                      value={item}
                      onChange={(e) => updateField(key, i, e.target.value)}
                      placeholder="Type…"
                    />
                    <button onClick={() => removeField(key, i)} className="text-blue-300 hover:text-red-500 text-xs leading-none">✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ═══════════════ RIGHT PANEL – Preview ═══════════════ */}
      <div className="w-1/2 flex flex-col overflow-hidden">

        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 flex-shrink-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Live Preview</p>
            <p className="text-sm font-semibold text-gray-800 leading-tight">{resume.title || "Untitled Resume"}</p>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "⬇ Export PDF"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#d4d8df] p-8 flex justify-center items-start">
          <div
            className="bg-white w-full max-w-2xl rounded-sm overflow-hidden relative"
            style={{ minHeight: "960px", boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.16)" }}
          >
            <div
              className="absolute top-0 right-0 w-0 h-0 z-10"
              style={{ borderStyle: "solid", borderWidth: "0 26px 26px 0", borderColor: "transparent #d4d8df transparent transparent" }}
            />
            {resume.template === "modern"  && <ModernTemplate  resume={resume} />}
            {resume.template === "classic" && <ClassicTemplate resume={resume} />}
          </div>
        </div>

      </div>

    </div>
  );
}