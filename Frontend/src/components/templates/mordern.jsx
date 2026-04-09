// ─── helpers ────────────────────────────────────────────────────────────────
 
/** Accept "14px", "14", or 14 → always returns a plain number */
function parsePx(value, fallback = 14) {
  const n = parseInt(value, 10);
  return isNaN(n) ? fallback : n;
}
 
const SPACING_MAP = { compact: 8, normal: 14, relaxed: 22 };
 
function sectionGap(spacing) {
  return SPACING_MAP[spacing] ?? 14;
}

export function ModernTemplate({ resume }) {
  const { settings, personalInfo } = resume;
  const fs = parsePx(settings.fontSize, 14);          // e.g. 14
  const gap = sectionGap(settings.spacing);            // e.g. 14
  const col = settings.primaryColor || "#2563eb";
 
  const SectionHead = ({ children }) => (
    <div
      style={{
        fontSize: fs * 0.65,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: col,
        borderBottom: `2px solid ${col}`,
        paddingBottom: 4,
        marginBottom: gap * 0.7,
        marginTop: gap * 1.4,
      }}
    >
      {children}
    </div>
  );
 
  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: fs,
        color: "#1a1a2e",
        padding: "44px 48px",
        lineHeight: 1.6,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: `3px solid ${col}`,
          paddingBottom: 18,
          marginBottom: gap,
        }}
      >
        <h1
          style={{
            fontSize: fs * 2,
            fontWeight: 700,
            color: "#0f172a",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          {personalInfo.name || (
            <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Your Name</span>
          )}
        </h1>
 
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 18px", fontSize: fs * 0.82, color: "#475569" }}>
          {personalInfo.email    && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone    && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        </div>
 
        {(personalInfo.github || personalInfo.linkedin || personalInfo.portfolio) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", marginTop: 6, fontSize: fs * 0.78 }}>
            {personalInfo.github    && <a href={personalInfo.github}    target="_blank" rel="noreferrer" style={{ color: col, fontWeight: 700, textDecoration: "none" }}>GitHub ↗</a>}
            {personalInfo.linkedin  && <a href={personalInfo.linkedin}  target="_blank" rel="noreferrer" style={{ color: col, fontWeight: 700, textDecoration: "none" }}>LinkedIn ↗</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" style={{ color: col, fontWeight: 700, textDecoration: "none" }}>Portfolio ↗</a>}
          </div>
        )}
 
        {personalInfo.summary && (
          <p style={{ marginTop: 12, fontSize: fs * 0.83, color: "#334155", lineHeight: 1.7 }}>
            {personalInfo.summary}
          </p>
        )}
      </div>
 
      {/* Education */}
      {settings.showEducation && resume.education.length > 0 && (
        <div>
          <SectionHead>Education</SectionHead>
          {resume.education.map((e, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: gap * 0.6 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: fs * 0.86, color: "#0f172a" }}>{e.degree}</div>
                <div style={{ fontSize: fs * 0.78, color: "#64748b" }}>{e.school}</div>
              </div>
              {e.year && <div style={{ fontSize: fs * 0.74, color: "#94a3b8" }}>{e.year}</div>}
            </div>
          ))}
        </div>
      )}
 
      {/* Experience */}
      {settings.showExperience && resume.experience.length > 0 && (
        <div>
          <SectionHead>Experience</SectionHead>
          {resume.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: gap }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: fs * 0.88, color: "#0f172a" }}>{e.role}</span>
                <span style={{ fontSize: fs * 0.72, color: "#94a3b8" }}>{e.duration}</span>
              </div>
              {e.company && <div style={{ fontSize: fs * 0.79, color: col, fontWeight: 700, marginTop: 2 }}>{e.company}</div>}
              {e.description && <p style={{ fontSize: fs * 0.8, color: "#334155", marginTop: 5, lineHeight: 1.65 }}>{e.description}</p>}
            </div>
          ))}
        </div>
      )}
 
      {/* Projects */}
      {settings.showProjects && resume.projects.length > 0 && (
        <div>
          <SectionHead>Projects</SectionHead>
          {resume.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: gap * 0.85 }}>
              <div style={{ fontWeight: 700, fontSize: fs * 0.88, color: "#0f172a" }}>{p.title}</div>
              {p.description && <p style={{ fontSize: fs * 0.8, color: "#334155", marginTop: 4, lineHeight: 1.65 }}>{p.description}</p>}
            </div>
          ))}
        </div>
      )}
 
      {/* Skills */}
      {settings.showSkills && (resume.technicalSkills.length > 0 || resume.softSkills.length > 0) && (
        <div>
          <SectionHead>Skills</SectionHead>
          {resume.technicalSkills.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: fs * 0.68, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Technical</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {resume.technicalSkills.map((sk, i) => (
                  <span key={i} style={{ background: "#eff6ff", color: col, border: `1px solid ${col}33`, borderRadius: 4, padding: "2px 9px", fontSize: fs * 0.72, fontWeight: 600 }}>{sk}</span>
                ))}
              </div>
            </div>
          )}
          {resume.softSkills.length > 0 && (
            <div>
              <div style={{ fontSize: fs * 0.68, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Soft Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {resume.softSkills.map((sk, i) => (
                  <span key={i} style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", borderRadius: 4, padding: "2px 9px", fontSize: fs * 0.72, fontWeight: 600 }}>{sk}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
 
      {/* Achievements */}
      {settings.showAchievements && resume.achievements.length > 0 && (
        <div>
          <SectionHead>Achievements</SectionHead>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {resume.achievements.map((a, i) => (
              <li key={i} style={{ fontSize: fs * 0.82, color: "#334155", marginBottom: 4, lineHeight: 1.65 }}>{a}</li>
            ))}
          </ul>
        </div>
      )}
 
      {/* Interests */}
      {settings.showInterests && resume.interests.length > 0 && (
        <div>
          <SectionHead>Interests</SectionHead>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {resume.interests.map((it, i) => (
              <span key={i} style={{ background: "#faf5ff", color: "#6b21a8", border: "1px solid #e9d5ff", borderRadius: 4, padding: "2px 9px", fontSize: fs * 0.72, fontWeight: 600 }}>{it}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}