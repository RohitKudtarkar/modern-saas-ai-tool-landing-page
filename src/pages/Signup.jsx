import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    User,
} from "lucide-react";
import { hashPassword } from "../utils/passwordUtils";
import { useToast } from "../context/ToastContext";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const { showToast, showPopup } = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    if (location.state?.showWelcomePopup) {
        showPopup({
            title: "Ready to get started?",
            message:
                "Create your account to access your workspace and productivity tools.",
            type: "info",
            confirmText: "Got it",
        });

        navigate(location.pathname, {
            replace: true,
            state: {},
        });
    }
}, [location, navigate, showPopup]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Please enter your name.";
        }

        if (!email.trim()) {
            newErrors.email = "Please enter your email address.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email) ||
            !["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"].includes(
                email.trim().toLowerCase().split("@")[1]
            )
        ) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Please enter a password.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            showToast(
                "Please check the highlighted fields and correct the errors.",
                "warning"
            );

            return;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUsers = JSON.parse(
            localStorage.getItem("demoUsers") || "[]"
        );

        const userExists = existingUsers.some(
            (user) => user.email === normalizedEmail
        );

        if (userExists) {
            setErrors({
                email: "An account with this email already exists.",
            });

            showToast(
                "An account with this email already exists.",
                "warning"
            );

            return;
        }

        try {
            // Hash the password before saving the account.
            const { salt, hash } = await hashPassword(password);

            existingUsers.push({
                name: name.trim(),
                email: normalizedEmail,
                passwordHash: hash,
                passwordSalt: salt,
            });

            localStorage.setItem(
                "demoUsers",
                JSON.stringify(existingUsers)
            );

            setErrors({});

            showToast(
                "Account created successfully! You can now log in.",
                "success"
            );

            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Signup error:", error);

            showToast(
                "Unable to create your account. Please try again.",
                "error"
            );
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-heading">
                    <span className="section-badge">GET STARTED</span>
                    <h1>Create your account</h1>
                    <p>Set up your workspace and start working smarter.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <label htmlFor="signup-name">Full name</label>

                    <div className="auth-input-wrapper">
                        <User size={18} />

                        <input
                            id="signup-name"
                            type="text"
                            placeholder="Enter your full name"
                            autoComplete="name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                                setErrors((prev) => ({
                                    ...prev,
                                    name: "",
                                }));
                            }}
                            required
                        />
                    </div>

                    {errors.name && (
                        <small className="auth-error">{errors.name}</small>
                    )}

                    <label htmlFor="signup-email">Email address</label>

                    <div className="auth-input-wrapper">
                        <Mail size={18} />

                        <input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setErrors((prev) => ({
                                    ...prev,
                                    email: "",
                                }));
                            }}
                            required
                        />
                    </div>

                    {errors.email && (
                        <small className="auth-error">{errors.email}</small>
                    )}

                    <label htmlFor="signup-password">Password</label>

                    <div className="auth-input-wrapper">
                        <LockKeyhole size={18} />

                        <input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setErrors((prev) => ({
                                    ...prev,
                                    password: "",
                                }));
                            }}
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <small className="auth-error">{errors.password}</small>
                    )}

                    <p className="signup-password-hint">
                        Use at least 8 characters for your password.
                    </p>

                    <button type="submit" className="auth-submit">
                        Create Account
                    </button>


                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>

                <p className="auth-disclaimer">
                    Your workspace starts here. Create an account to get started.
                </p>
            </section>
        </main>
    );
}

export default Signup;
