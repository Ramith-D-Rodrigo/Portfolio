"use client";

import { useState } from "react";
import Notification from "./Notification";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface NotificationType {
    color: string;
    message: string;
}

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<NotificationType | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleNotificationClose = () => {
        setNotification(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onHCaptchaChange = (token: string) => {
        setCaptchaToken(token);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setNotification(null);

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        const json = JSON.stringify({ ...formData, access_key: accessKey, "h-captcha-response": captchaToken });

        const newNotification: NotificationType = {
            color: "red",
            message: "none",
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });

            const result = await response.json();

            if (result.success) {
                newNotification.message = "Thank you for reaching out! I will get back to you soon.";
                newNotification.color = "green";
            } else {
                newNotification.message = "Something went wrong. Please try again later.";
                newNotification.color = "red";
            }
            setNotification(newNotification);
        } catch (error) {
            console.log(error);
            newNotification.message = "An error occurred. Please check your connection and try again.";
            newNotification.color = "red";
            setNotification(newNotification);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex space-x-10">
            {/* Contact Form */}
            <div className="w-1/2">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                            Subject
                        </label>
                        <input
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                    </div>
                    <HCaptcha
                        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        reCaptchaCompat={false}
                        onVerify={onHCaptchaChange}
                    />
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>

            {/* JSON Preview */}
            <div className="w-1/2 p-4">
                <h3 className="text-lg font-semibold text-white mb-2">JSON Preview</h3>
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6 text-sm text-white font-mono whitespace-pre-wrap break-words">
                        {JSON.stringify({ ...formData, access_key: "NOW THAT'S A SECRET!" }, null, 2)}
                    </div>
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <Notification
                    message={notification.message}
                    onClose={handleNotificationClose}
                    color={notification.color}
                />
            )}
        </div>
    );
};

export default ContactForm;
