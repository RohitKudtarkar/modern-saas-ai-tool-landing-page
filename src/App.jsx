
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PagePlaceholder from "./pages/PagePlaceholder";
import Dashboard from "./pages/Dashboard";
import AIContent from "./pages/AIContent";
import DocumentSummary from "./pages/DocumentSummary";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/ai-content" element={<AIContent />} />

        <Route
          path="/dashboard/documents"
          element={<DocumentSummary />}
        />

        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/history" element={<History />} />
        <Route path="/dashboard/settings" element={<Settings />} />

        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
