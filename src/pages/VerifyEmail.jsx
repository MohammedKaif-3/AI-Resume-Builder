import React, { useContext, useState } from "react";
import "./styles/Auth.css"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, seterror] = useState();

    const navigate = useNavigate();

    const {getUserData} = useContext(AppContext);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            seterror("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                "https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/verify-email",
                { otp },
                { withCredentials: true }
            );

            if (response.data && response.data.success) {
                toast.success("Email verified successfully!");
                getUserData();
                navigate("/account");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            seterror(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com" + "/api/auth/send-verify-otp", {
                
            }, { withCredentials: true })

            if (response.data && response.data.success) {
                toast.success("OTP sent to your email");
            } else {
                seterror(response.data.message || "Unexpected response from server.");
            }

        } catch (err) {
            console.log(err.response?.data?.message || "Something went wrong!");
        } 
    };

    return (
        <div className="auth-container">
            <form className="auth-box" onSubmit={handleVerify}>
                <h2>Email Verification</h2>
                <p>Please enter the 6-digit OTP sent to your email.</p>
                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="auth-input"
                />

                <button type="submit" className="auth-btn" disabled={loading}>
                    {loading ? "Verifying..." : "Verify Email"}
                </button>

                <p className="resend-otp-text">
                    Didn't receive OTP? <span onClick={handleResend} className="resend-link">Resend OTP</span>
                </p>
            </form>
        </div>
    );
};

export default VerifyEmail;
