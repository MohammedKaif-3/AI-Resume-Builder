import React, { useState } from "react";
import "./styles/Auth.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setemail] = useState("");

    const [error, seterror] = useState();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleForgetPasswordSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            seterror("Please enter your email *");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com" + "/api/auth/send-reset-otp", {
                email
            }, {withCredentials: true})

            if (response.data && response.data.success) {
                toast.success("OTP sent to your email")
                navigate('/reset-password');
            } else {
                seterror(response.data.message || "Unexpected response from server.");
            }

        } catch (err) {
            seterror(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Forgot Password ?</h2>
                <p>We'll send you an OTP to reset your password.</p>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleForgetPasswordSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-btn"
                    >
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
