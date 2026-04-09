require('dotenv').config();
const express = require("express");
const cors = require("cors");
const {connectDB} = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resume.routes");
const pdfRoutes = require("./routes/pdf.routes");

const session = require("express-session");
const passport = require("./config/passport");



const port = process.env.Port;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","https://resume-builder-pi-pearl.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());



app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth",authRoutes);
app.use("/resume",resumeRoutes);
app.use("/pdf",pdfRoutes);







app.get("/", (req, res) => {
    res.send("Server is up for Testing APIs ");
});

app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on ${port}`);
});