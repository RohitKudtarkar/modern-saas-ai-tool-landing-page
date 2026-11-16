
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { useToast } from "../context/ToastContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");

      showToast(
        "Please enter your email address.",
        "warning"
      );

      return;
    }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const commonDomainTypos = [
  "gmai.com",
  "gmal.com",
  "gmial.com",
  "gmaill.com",
  "gma.com",
  "gm.com",
  "g.com",
  "hotmal.com",
  "hotmai.com",
  "outlok.com",
  "outloo.com",
  "yaho.com",
  "yahooo.com",
];

const emailDomain = normalizedEmail.split("@")[1];

if (
  !emailRegex.test(normalizedEmail) ||
  commonDomainTypos.includes(emailDomain)
) {
      setError("Please enter a valid email address.");

      showToast(
        "Please enter a valid email address.",
        "warning"
      );

      return;
    }

    const users = JSON.parse(
      localStorage.getItem("demoUsers") || "[]"
    );

    const userExists = users.some(
      (user) => user.email === normalizedEmail
    );

    setError("");

    if (!userExists) {
      setError("No account found with this email address.");

      showToast(
        "No account found with this email address.",
        "error"
      );

      return;
    }

    showToast(
      "Your account was found. Password reset is a demo feature and no email was sent.",
      "success"
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <span className="section-badge">ACCOUNT RECOVERY</span>
          <h1>Forgot your password?</h1>
          <p>
            Enter your registered email address to continue
            with account recovery.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="forgot-email">Email address</label>

          <div className="auth-input-wrapper">
            <Mail size={18} />
            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your registered email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <small className="auth-error">{error}</small>
          )}

          <button type="submit" className="auth-submit">
            Continue
            <Send size={17} />
          </button>

        
        </form>

        <p className="auth-switch">
          <Link to="/login">
            <ArrowLeft size={15} />
            Back to Login
          </Link>
        </p>

        <p className="auth-disclaimer">
          Need help accessing your account? We're here to help.
        </p>
      </section>
    </main>
  );
}

export default ForgotPassword;



