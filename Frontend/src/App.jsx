import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import HomePage from "./pages/home";
import GoogleSuccess from "./pages/googleSucess";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/"      element={<HomePage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
