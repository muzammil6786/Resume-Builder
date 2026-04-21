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

export function ClassicTemplate({ resume }) {
  const { settings, personalInfo } = resume;
  const fs = parsePx(settings.fontSize, 14);
  const gap = sectionGap(settings.spacing);
  const col = settings.primaryColor || "#1e3a5f";

  const SectionHead = ({ children }) => (
    <h3
      style={{
        fontSize: fs * 0.9,
        fontWeight: 700,
        color: col,
        borderBottom: `1px solid ${col}`,
        paddingBottom: 3,
        marginBottom: gap * 0.6,
        marginTop: gap * 1.2,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </h3>
  );

  return (
    <div
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: fs,
        color: "#1a1a1a",
        padding: "20px 16px",
        maxWidth: "800px",
        margin: "0 auto",
        wordBreak: "break-word",
        lineHeight: 1.65,
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          borderBottom: `2px solid ${col}`,
          paddingBottom: 16,
          marginBottom: gap,
        }}
      >
        <h1
          style={{
            fontSize: fs * 1.9,
            fontWeight: 700,
            color: "#0f172a",
            margin: "0 0 6px",
            letterSpacing: "0.02em",
          }}
        >
          {personalInfo.name || (
            <span style={{ color: "#999", fontStyle: "italic" }}>
              Your Name
            </span>
          )}
        </h1>
        <div
          style={{
            fontSize: fs * 0.82,
            color: "#555",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "4px 16px",
          }}
        >
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.github ||
          personalInfo.linkedin ||
          personalInfo.portfolio) && (
          <div
            style={{
              fontSize: fs * 0.78,
              marginTop: 5,
              display: "flex",
              justifyContent: "center",
              gap: "4px 14px",
              flexWrap: "wrap",
            }}
          >
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                style={{ color: col, textDecoration: "underline" }}
              >
                GitHub
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ color: col, textDecoration: "underline" }}
              >
                LinkedIn
              </a>
            )}
            {personalInfo.portfolio && (
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noreferrer"
                style={{ color: col, textDecoration: "underline" }}
              >
                Portfolio
              </a>
            )}
          </div>
        )}
        {personalInfo.summary && (
          <p
            style={{
              marginTop: 10,
              fontSize: fs * 0.83,
              color: "#444",
              lineHeight: 1.7,
              textAlign: "left",
            }}
          >
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Education */}
      {settings.showEducation && resume.education.length > 0 && (
        <div>
          <SectionHead>Education</SectionHead>
          {resume.education.map((e, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "4px",
                marginBottom: gap * 0.5,
              }}
            >
              <div>
                <span style={{ fontWeight: 700, fontSize: fs * 0.88 }}>
                  {e.degree}
                </span>
                {e.school && (
                  <span style={{ color: "#555", fontSize: fs * 0.8 }}>
                    {" "}
                    — {e.school}
                  </span>
                )}
              </div>
              {e.year && (
                <span style={{ fontSize: fs * 0.78, color: "#777" }}>
                  {e.year}
                </span>
              )}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "4px",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: fs * 0.9 }}>
                  {e.role}
                </span>
                <span style={{ fontSize: fs * 0.78, color: "#777" }}>
                  {e.duration}
                </span>
              </div>
              {e.company && (
                <div
                  style={{
                    fontSize: fs * 0.82,
                    color: col,
                    fontStyle: "italic",
                    marginTop: 2,
                  }}
                >
                  {e.company}
                </div>
              )}
              {e.description && (
                <p
                  style={{
                    fontSize: fs * 0.82,
                    color: "#333",
                    marginTop: 4,
                    lineHeight: 1.65,
                  }}
                >
                  {e.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {settings.showProjects && resume.projects.length > 0 && (
        <div>
          <SectionHead>Projects</SectionHead>
          {resume.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: gap * 0.8 }}>
              <div style={{ fontWeight: 700, fontSize: fs * 0.9 }}>
                {p.title}
              </div>
              {p.description && (
                <p
                  style={{
                    fontSize: fs * 0.82,
                    color: "#333",
                    marginTop: 4,
                    lineHeight: 1.65,
                  }}
                >
                  {p.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {settings.showSkills &&
        (resume.technicalSkills.length > 0 || resume.softSkills.length > 0) && (
          <div>
            <SectionHead>Skills</SectionHead>
            {resume.technicalSkills.length > 0 && (
              <p style={{ fontSize: fs * 0.85, marginBottom: gap * 0.4 }}>
                <strong>Technical: </strong>
                {resume.technicalSkills.join(", ")}
              </p>
            )}
            {resume.softSkills.length > 0 && (
              <p style={{ fontSize: fs * 0.85 }}>
                <strong>Soft Skills: </strong>
                {resume.softSkills.join(", ")}
              </p>
            )}
          </div>
        )}

      {/* Achievements */}
      {settings.showAchievements && resume.achievements.length > 0 && (
        <div>
          <SectionHead>Achievements</SectionHead>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {resume.achievements.map((a, i) => (
              <li
                key={i}
                style={{
                  fontSize: fs * 0.85,
                  color: "#333",
                  marginBottom: 4,
                  lineHeight: 1.65,
                }}
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interests */}
      {settings.showInterests && resume.interests.length > 0 && (
        <div>
          <SectionHead>Interests</SectionHead>
          <p style={{ fontSize: fs * 0.85, color: "#333" }}>
            {resume.interests.join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}
