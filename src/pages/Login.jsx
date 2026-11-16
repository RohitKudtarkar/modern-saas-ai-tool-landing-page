
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import {
    hashPassword,
    verifyPassword,
} from "../utils/passwordUtils";
import { useToast } from "../context/ToastContext";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState(
        () => localStorage.getItem("rememberedEmail") || ""
    );

    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(
        () => Boolean(localStorage.getItem("rememberedEmail"))
    );

    const [errors, setErrors] = useState({});

    const { showToast } = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Please enter your password.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            showToast(
                "Please check the highlighted fields and correct the errors.",
                "warning"
            );

            return;
        }

        try {
            const normalizedEmail = email.trim().toLowerCase();

            const existingUsers = JSON.parse(
                localStorage.getItem("demoUsers") || "[]"
            );

            const userIndex = existingUsers.findIndex(
                (user) => user.email === normalizedEmail
            );

            if (userIndex === -1) {
                setErrors({
                    credentials: "Incorrect email or password. Please try again.",
                });

                showToast(
                    "Incorrect email or password. Please try again.",
                    "error"
                );

                return;
            }
            const user = existingUsers[userIndex];
            let passwordIsValid = false;

            // Verify a previously hashed password.
            if (user.passwordHash && user.passwordSalt) {
                passwordIsValid = await verifyPassword(
                    password,
                    user.passwordSalt,
                    user.passwordHash
                );
            }

            // Support existing accounts with plaintext passwords.
            else if (user.password) {
                passwordIsValid = user.password === password;

                if (passwordIsValid) {
                    // Automatically migrate the old account.
                    const { salt, hash } = await hashPassword(password);

                    existingUsers[userIndex] = {
                        name: user.name,
                        email: user.email,
                        passwordHash: hash,
                        passwordSalt: salt,
                    };

                    localStorage.setItem(
                        "demoUsers",
                        JSON.stringify(existingUsers)
                    );
                }
            }

            if (!passwordIsValid) {
                showToast(
                    "Incorrect email or password. Please try again.",
                    "error"
                );
                return;
            }

            // Save the currently logged-in user's profile.
            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    name: user.name,
                    email: user.email,
                })
            );

            if (rememberMe) {
                localStorage.setItem("rememberedEmail", normalizedEmail);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            setErrors({});

            showToast(
                "Login successful! Welcome to your dashboard.",
                "success"
            );

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);

            showToast(
                "Unable to log in. Please try again.",
                "error"
            );
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-heading">
                    <span className="section-badge">WELCOME BACK</span>
                    <h1>Log in to your account</h1>
                    <p>Continue working smarter with your workspace.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <label htmlFor="login-email">Email address</label>

                    <div className="auth-input-wrapper">
                        <Mail size={18} />

                        <input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    {errors.email && (
                        <small className="auth-error">{errors.email}</small>
                    )}

                    <label htmlFor="login-password">Password</label>

                    <div className="auth-input-wrapper">
                        <LockKeyhole size={18} />

                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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

                    {errors.credentials && (
    <small className="auth-error">{errors.credentials}</small>
)}

                    <div className="auth-options">
                        <label className="remember-option">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) =>
                                    setRememberMe(event.target.checked)
                                }
                            />

                            <span>Remember me</span>
                        </label>

                        <Link to="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className="auth-submit">
                        Log In
                    </button>


                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>

                <p className="auth-disclaimer">
                    Welcome back! Continue to your workspace.
                </p>
            </section>
        </main>
    );
}

export default Login;
