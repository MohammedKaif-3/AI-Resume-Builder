import React, { useState } from "react";
import "./styles/Auth.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [email, setemail] = useState("");
    const [otp, setotp] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, seterror] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        if (!email || !otp || !newPassword || !confirmPassword) {
            seterror("All fields are required!");
            return;
        }

        if (newPassword !== confirmPassword) {
            seterror("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/reset-password", {
                email, otp, newPassword
            }, { withCredentials: true });

            if (response.data && response.data.success) {
                toast.success("Password reset successful");
                navigate('/login');
            } else {
                seterror(response.data.message || "Unexpected response from server.");
            }
        } catch (err) {
            seterror(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Reset Password</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleResetPasswordSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                    />

                    <div className="password-field">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                        />
                        <i
                            className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            title={showNewPassword ? 'Hide password' : 'Show password'}
                        />
                    </div>

                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                        />
                        <i
                            className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            title={showConfirmPassword ? 'Hide password' : 'Show password'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-btn"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
