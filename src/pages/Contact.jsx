
import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "../context/ToastContext";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const { showToast } = useToast();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        const name = formData.name.trim();
        const subject = formData.subject.trim();
        const message = formData.message.trim();

        if (!name) {
            newErrors.name = "Please enter your name.";
        } else if (name.length < 2) {
            newErrors.name = "Name must be at least 2 characters.";
        }

        if (!subject) {
            newErrors.subject = "Please enter a subject.";
        } else if (subject.length < 3) {
            newErrors.subject = "Subject must be at least 3 characters.";
        }

        if (!message) {
            newErrors.message = "Please enter your message.";
        } else if (message.length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            showToast(
                "Please correct the highlighted fields before submitting.",
                "warning"
            );

            return;
        }

        showToast(
            "Demo submission successful. No message was sent.",
            "success"
        );

        setFormData({
            name: "",
            subject: "",
            message: "",
        });

        setErrors({});
    };

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <span className="section-badge">GET IN TOUCH</span>
                <h1>Let's start a conversation</h1>
                <p>
                    Have a question or suggestion? Use the form below
                    to share your thoughts with us.
                </p>
            </section>

            <section className="contact-container">
                <div className="contact-info">
                    <div className="contact-icon">
                        <MessageSquare size={30} />
                    </div>

                    <span className="about-label">WE'RE HERE TO HELP</span>

                    <h2>We value your feedback</h2>

                    <p>
                        Your questions, ideas and suggestions help us
                        improve the experience and build better tools.
                    </p>

                    <div className="contact-note">
                        <CheckCircle2 size={19} />
                        <span>
                            A simple and convenient way to share your feedback.
                        </span>
                    </div>
                </div>

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <h2>Send us a message</h2>
                    <p>Fill in the details below.</p>

                    <label htmlFor="contact-name">Your Name</label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />

                    {errors.name && (
                        <small className="auth-error">
                            {errors.name}
                        </small>
                    )}

                    <small className="contact-character-count">
                        {formData.name.length} / 50
                    </small>

                    <label htmlFor="contact-subject">Subject</label>
                    <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        autoComplete="off"
                        placeholder="Enter message subject"
                        value={formData.subject}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />

                    {errors.subject && (
                        <small className="auth-error">
                            {errors.subject}
                        </small>
                    )}

                    <small className="contact-character-count">
                        {formData.subject.length} / 100
                    </small>

                    <label htmlFor="contact-message">Your Message</label>
                    <textarea
                        id="contact-message"
                        name="message"
                        autoComplete="off"
                        placeholder="Write your message here..."
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={1000}
                        required
                    />

                    {errors.message && (
                        <small className="auth-error">
                            {errors.message}
                        </small>
                    )}

                    <small className="contact-character-count">
                        {formData.message.length} / 1000
                    </small>

                    <button type="submit" className="contact-submit">
                        Send Message
                        <Send size={17} />
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Contact;
