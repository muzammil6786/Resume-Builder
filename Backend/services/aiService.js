function cleanJson(text) {
  const start = text.indexOf("{"),
    end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("AI returned invalid JSON");
  return JSON.parse(text.slice(start, end + 1));
}
async function groq(prompt) {
  if (!process.env.GROQ_API_KEY) {
    console.log("GROQ_API_KEY is missing");
    return null;
  }

  const model =
    process.env.GROQ_MODEL || "openai/gpt-oss-120b";

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model,

        temperature: 0.2,

        messages: [
          {
            role: "system",
            content:
              "You are a strict resume engineering assistant. Never invent skills, employers, education, metrics, or experience. Return ONLY valid JSON matching the requested shape.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Groq API error:", {
      status: response.status,
      data,
    });

    throw new Error(
      data?.error?.message ||
        `Groq API error ${response.status}`
    );
  }

  const content =
    data?.choices?.[0]?.message?.content || "";

  if (!content) {
    throw new Error("Groq returned an empty response");
  }

  return cleanJson(content);
}
function textOf(r) {
  return [
    r.title,
    r.summary,
    r.experience,
    r.education,
    ...r.skills,
    ...(r.projects || []).flatMap((p) => [
      p.name,
      p.description,
      ...(p.technologies || []),
    ]),
  ].join(" ");
}
function fallbackAnalyze(r) {
  const text = textOf(r).toLowerCase();

  const terms = [
    "javascript",
    "react",
    "node.js",
    "node",
    "express",
    "mongodb",
    "mongo",
    "postgresql",
    "sql",
    "rest",
    "api",
    "git",
    "docker",
    "aws",
    "redis",
    "typescript"
  ];

  const present = terms.filter(term =>
    text.includes(term)
  );

  const projectCount = (r.projects || []).filter(
    p => p.title || p.description
  ).length;

  const experienceCount = (r.experience || []).filter(
    e => e.company || e.role || e.description
  ).length;

  const score = Math.min(
    92,
    50 +
      present.length * 3 +
      projectCount * 5 +
      experienceCount * 5
  );

  return {
    overallScore: score,

    atsScore: Math.min(96, score + 5),

    contentScore: Math.min(94, score + 2),

    skillsScore: Math.min(
      95,
      50 + present.length * 4
    ),

    projectScore: Math.min(
      94,
      60 + projectCount * 10
    ),

    readabilityScore: 84,

    strengths: [
      "Technical skills are clearly represented",
      "Resume contains structured sections"
    ],

    weaknesses: [
      "Add measurable outcomes to experience and project descriptions",
      "Make the summary specific to the target role"
    ],

    recommendations: [
      "Use action verbs and measurable impact where truthful",
      "Keep the most relevant technical skills near the top"
    ],

    missingKeywords: terms
      .filter(term => !text.includes(term))
      .slice(0, 5)
  };
}
function prepareResumeForAI(r) {
  return {
    name: r.personalInfo?.name || "",
    summary: r.personalInfo?.summary || "",

    education: (r.education || []).map(e => ({
      school: e.school || "",
      degree: e.degree || "",
      year: e.year || ""
    })),

    experience: (r.experience || []).map(e => ({
      company: e.company || "",
      role: e.role || "",
      duration: e.duration || "",
      description: e.description || ""
    })),

    projects: (r.projects || []).map(p => ({
      title: p.title || "",
      description: p.description || ""
    })),

    technicalSkills: r.technicalSkills || [],
    softSkills: r.softSkills || [],
    interests: r.interests || [],
    achievements: r.achievements || []
  };
}
 async function analyzeResume(r) {
  const resume = prepareResumeForAI(r);

  const prompt = `
Analyze this resume.

Return ONLY valid JSON with these exact keys:

{
  "overallScore": number,
  "atsScore": number,
  "contentScore": number,
  "skillsScore": number,
  "projectScore": number,
  "readabilityScore": number,
  "strengths": string[],
  "weaknesses": string[],
  "recommendations": string[],
  "missingKeywords": string[]
}

All scores must be between 0 and 100.

Important:
- Never invent experience.
- Never invent skills.
- Never invent employers.
- Never invent education.
- Never invent achievements.
- Base the analysis only on the resume provided.

Resume:
${JSON.stringify(resume)}
`;

  const ai = await groq(prompt);

  return ai || fallbackAnalyze(r);
}
const matchJob = async function(r, jd) {
  const prompt = `Compare resume to job description. Return JSON keys: jobTitle,company,requiredSkills(string[]),preferredSkills(string[]),matchedSkills(string[]),missingSkills(string[]),matchScore(number 0-100),recommendations(string[]). Do not claim a resume skill unless it is actually present. Resume: ${JSON.stringify(r)} Job: ${jd}`;
  const ai = await groq(prompt);
if (ai) {
  return ai;
}
  const text = textOf(r).toLowerCase();
  const words = [
    ...new Set(
      (jd.match(/[a-zA-Z][a-zA-Z+#.-]{2,}/g) || []).map((x) => x.toLowerCase()),
    ),
  ];
  const matched = words.filter((x) => text.includes(x)).slice(0, 20);
  const missing = words.filter((x) => !text.includes(x)).slice(0, 10);
  return {
    jobTitle: "Target Role",
    company: "",
    requiredSkills: words.slice(0, 12),
    preferredSkills: [],
    matchedSkills: matched,
    missingSkills: missing,
    matchScore: Math.min(
      100,
      Math.round(
        (matched.length / Math.max(1, Math.min(words.length, 12))) * 100,
      ),
    ),
    recommendations: [
      "Tailor your summary to the role",
      "Highlight matching project technologies",
      "Only add missing skills if you genuinely have them",
    ],
  };
}
const tailorResume = async function(r, jd) {
  const resume = prepareResumeForAI(r);

  const prompt = `
Tailor this resume for the provided job description.

Do NOT invent:
- skills
- employers
- education
- experience
- achievements
- metrics

Only improve wording and emphasis using information already present.

Return ONLY valid JSON:

{
  "summary": "string",
  "bullets": [
    {
      "project": "string",
      "before": "string",
      "after": "string"
    }
  ],
  "keywords": ["string"]
}

Resume:
${JSON.stringify(resume)}

Job Description:
${jd}
`;

  const ai = await groq(prompt);

  if (ai) {
    return ai;
  }

  return {
    summary:
      r.personalInfo?.summary ||
      "Full Stack Developer focused on building reliable web applications.",

    bullets: (r.projects || [])
      .filter(p => p.title || p.description)
      .slice(0, 3)
      .map(p => ({
        project: p.title || "Project",
        before: p.description || "",
        after: p.description || ""
      })),

    keywords: r.technicalSkills || []
  };
}

module.exports = {
  analyzeResume,
  matchJob,
  tailorResume
};