
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    UserRound,
    Mail,
    Save,
    X,
    Sun,
    Moon,
    LogOut,
    Trash2,
    Palette,
    ShieldCheck,
    Database,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { clearUserHistory } from "../utils/historyUtils";

function Settings() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { showToast, showPopup } = useToast();

    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("currentUser") || "null");
        } catch {
            return null;
        }
    });

    const [name, setName] = useState(currentUser?.name || "");
    const [email, setEmail] = useState(currentUser?.email || "");

    const [isEditing, setIsEditing] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Start profile editing
    const handleEditProfile = () => {
        if (!currentUser) return;

        setName(currentUser.name || "");
        setEmail(currentUser.email || "");
        setIsEditing(true);
        setMessage("");
        setMessageType("");
    };

    // Save profile changes
    const handleSaveProfile = (event) => {
        event.preventDefault();

        if (!currentUser) {
            setMessage("Unable to find your account. Please log in again.");
            setMessageType("error");

            showToast(
                "Unable to find your account. Please log in again.",
                "error"
            );

            return;
        }

        const trimmedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (
            trimmedName === (currentUser.name || "").trim() &&
            normalizedEmail === (currentUser.email || "").trim().toLowerCase()
        ) {
            setIsEditing(false);
            setMessage("");
            setMessageType("");

            showToast("No changes to save.", "info");
            return;
        }

        if (!trimmedName) {
            setMessage("Please enter your name.");
            setMessageType("error");

            showToast(
                "Please enter your name.",
                "warning"
            );

            return;
        }

        if (!normalizedEmail) {
            setMessage("Please enter your email address.");
            setMessageType("error");

            showToast(
                "Please enter your email address.",
                "warning"
            );

            return;
        }
        if (
            !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(normalizedEmail) ||
            !["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"].includes(
                normalizedEmail.split("@")[1]
            )
        ) {
            setMessage("Please enter a valid email address.");
            setMessageType("error");

            showToast(
                "Please enter a valid email address.",
                "warning"
            );

            return;
        }

        try {
            const existingUsers = JSON.parse(
                localStorage.getItem("demoUsers") || "[]"
            );

            const oldEmail = currentUser.email.toLowerCase();

            const userIndex = existingUsers.findIndex(
                (user) => user.email.toLowerCase() === oldEmail
            );

            if (userIndex === -1) {
                setMessage("Account not found. Please log in again.");
                setMessageType("error");

                showToast(
                    "Account not found. Please log in again.",
                    "error"
                );

                return;
            }

            const emailAlreadyExists = existingUsers.some(
                (user, index) =>
                    index !== userIndex &&
                    user.email.toLowerCase() === normalizedEmail
            );

            if (emailAlreadyExists) {
                setMessage("An account with this email already exists.");
                setMessageType("error");

                showToast(
                    "An account with this email already exists.",
                    "warning"
                );

                return;
            }

            // Preserve existing password hash and salt.
            existingUsers[userIndex] = {
                ...existingUsers[userIndex],
                name: trimmedName,
                email: normalizedEmail,
            };

            localStorage.setItem(
                "demoUsers",
                JSON.stringify(existingUsers)
            );

            const updatedUser = {
                name: trimmedName,
                email: normalizedEmail,
            };

            localStorage.setItem(
                "currentUser",
                JSON.stringify(updatedUser)
            );

            // Update remembered email if it belongs to this account.
            const rememberedEmail = localStorage.getItem("rememberedEmail");

            if (rememberedEmail?.toLowerCase() === oldEmail) {
                localStorage.setItem("rememberedEmail", normalizedEmail);
            }

            setCurrentUser(updatedUser);
            setName(trimmedName);
            setEmail(normalizedEmail);
            setIsEditing(false);

            setMessage("");
            setMessageType("");

            showToast("Your profile has been updated successfully.", "success");
        } catch (error) {
            console.error("Profile update error:", error);

            setMessage("Unable to update your profile. Please try again.");
            setMessageType("error");

            showToast(
                "Unable to update your profile. Please try again.",
                "error"
            );
        }
    };

    // Cancel profile editing
    const handleCancelEdit = () => {
        setName(currentUser?.name || "");
        setEmail(currentUser?.email || "");
        setIsEditing(false);
        setMessage("");
        setMessageType("");
    };

    // Log out
    const handleLogout = () => {
        showPopup({
            title: "Log Out?",
            message: "Are you sure you want to log out of your account?",
            type: "warning",
            confirmText: "Log Out",
            cancelText: "Cancel",

            onConfirm: () => {
                localStorage.removeItem("currentUser");
                navigate("/login");
            },
        });
    };

    // Clear activity history
    const handleClearHistory = () => {
        showPopup({
            title: "Clear Activity History?",
            message: "Are you sure you want to delete all your activity history? This action cannot be undone.",
            type: "warning",
            confirmText: "Clear History",
            cancelText: "Cancel",

            onConfirm: () => {
                clearUserHistory();

                showToast(
                    "Your activity history has been cleared successfully.",
                    "success"
                );
            },
        });
    };

    return (
        <main className="dashboard-page">
            <DashboardSidebar />

            <section className="dashboard-main">
                <div className="settings-page">

                    {/* Settings Header */}
                    <header className="settings-header">
                        <div>
                            <span className="section-badge">
                                WORKSPACE PREFERENCES
                            </span>

                            <h1>Settings</h1>

                            <p>
                                Manage your profile, appearance and workspace preferences.
                            </p>
                        </div>
                    </header>

                    {!currentUser && (
                        <div className="settings-message error">
                            Your account information could not be found.
                            Please log in again.
                        </div>
                    )}

                    {/* Profile Settings */}
                    <section className="settings-section">
                        <div className="settings-section-heading">
                            <div className="settings-section-icon">
                                <UserRound size={21} />
                            </div>

                            <div>
                                <h2>Profile Information</h2>
                                <p>Manage your personal account details.</p>
                            </div>
                        </div>

                        <form
                            className="settings-profile-form"
                            onSubmit={handleSaveProfile}
                            noValidate
                        >
                            <div className="settings-form-grid">

                                <div className="settings-field">
                                    <label htmlFor="settings-name">
                                        Full name
                                    </label>

                                    <div className="settings-input-wrapper">
                                        <UserRound size={18} />

                                        <input
                                            id="settings-name"
                                            type="text"
                                            value={name}
                                            onChange={(event) => {
                                                setName(event.target.value);
                                                setMessage("");
                                            }}
                                            disabled={!isEditing || !currentUser}
                                        />
                                    </div>
                                    {message === "Please enter your name." && (
                                        <span className="auth-error">
                                            {message}
                                        </span>
                                    )}
                                </div>

                                <div className="settings-field">
                                    <label htmlFor="settings-email">
                                        Email address
                                    </label>

                                    <div className="settings-input-wrapper">
                                        <Mail size={18} />

                                        <input
                                            id="settings-email"
                                            type="text"
                                            inputMode="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                                setMessage("");
                                            }}
                                            disabled={!isEditing || !currentUser}
                                        />
                                    </div>

                                    {(
                                        message === "Please enter your email address." ||
                                        message === "Please enter a valid email address." ||
                                        message === "An account with this email already exists."
                                    ) && (
                                            <span className="auth-error">
                                                {message}
                                            </span>
                                        )}
                                </div>

                            </div>

                            <div className="settings-profile-actions">
                                {!isEditing ? (
                                    <button
                                        key="edit-profile"
                                        type="button"
                                        className="settings-primary-button"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleEditProfile();
                                        }}
                                        disabled={!currentUser}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            key="save-profile"
                                            type="submit"
                                            className="settings-primary-button"
                                        >
                                            <Save size={17} />
                                            Save Changes
                                        </button>

                                        <button
                                            type="button"
                                            className="settings-secondary-button"
                                            onClick={handleCancelEdit}
                                        >
                                            <X size={17} />
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </section>

                    {/* Appearance Settings */}

                    {/* Appearance Settings */}
                    <section className="settings-section">
                        <div className="settings-section-heading">
                            <div className="settings-section-icon">
                                <Palette size={21} />
                            </div>

                            <div>
                                <h2>Appearance</h2>
                                <p>Customize how your workspace looks.</p>
                            </div>
                        </div>

                        <div className="settings-option-row">
                            <div className="settings-option-info">
                                <div className="settings-option-icon">
                                    {theme === "light" ? (
                                        <Sun size={20} />
                                    ) : (
                                        <Moon size={20} />
                                    )}
                                </div>

                                <div>
                                    <h3>Theme Preference</h3>
                                    <p>Currently using {theme} mode.</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="settings-secondary-button"
                                onClick={toggleTheme}
                            >
                                {theme === "light" ? (
                                    <>
                                        <Moon size={17} />
                                        Dark Mode
                                    </>
                                ) : (
                                    <>
                                        <Sun size={17} />
                                        Light Mode
                                    </>
                                )}
                            </button>
                        </div>
                    </section>

                    {/* Account Information */}
                    <section className="settings-section">
                        <div className="settings-section-heading">
                            <div className="settings-section-icon">
                                <ShieldCheck size={21} />
                            </div>

                            <div>
                                <h2>Account</h2>
                                <p>Manage your current account session.</p>
                            </div>
                        </div>

                        <div className="settings-option-row">
                            <div className="settings-option-info">
                                <div className="settings-option-icon">
                                    <UserRound size={20} />
                                </div>

                                <div>
                                    <h3>Signed-in Account</h3>
                                    <p>
                                        {currentUser?.email || "No active account"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="settings-danger-button"
                                onClick={handleLogout}
                                disabled={!currentUser}
                            >
                                <LogOut size={17} />
                                Log Out
                            </button>
                        </div>
                    </section>

                    {/* Data Management */}
                    <section className="settings-section">
                        <div className="settings-section-heading">
                            <div className="settings-section-icon">
                                <Database size={21} />
                            </div>

                            <div>
                                <h2>Data Management</h2>
                                <p>Manage your saved workspace activity.</p>
                            </div>
                        </div>

                        <div className="settings-option-row">
                            <div className="settings-option-info">
                                <div className="settings-option-icon">
                                    <Trash2 size={20} />
                                </div>

                                <div>
                                    <h3>Clear Activity History</h3>
                                    <p>
                                        Permanently delete all saved activity records.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="settings-danger-button"
                                onClick={handleClearHistory}
                            >
                                <Trash2 size={17} />
                                Clear History
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}

export default Settings;
