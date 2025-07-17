import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Auth.css";
import axios from 'axios';

const Signup = () => {

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, seterror] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Auto-clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        seterror(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      seterror("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      seterror("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com" + "/api/auth/signup", {
        name, email, password
      }, { withCredentials: true })

      if (response.data && response.data.success) {
        navigate('/login');
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
        <h2>Create an Account</h2>
        <p style={{ fontSize: '11px', marginBottom: '8px' }}>Sign up to get started</p>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignupSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              autoComplete="new-password"
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            />
          </div>

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              autoComplete="new-password"
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
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Sign Up"}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        <div style={{ color: '#888', fontFamily: 'Poppins', fontSize: '12px', marginTop: '10px' }}>--- or ---</div>

        <a className="google-btn" href="https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/google">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ marginLeft: '8px' }}>Sign up with Google</span>
        </a>

      </div>
    </div>
  );
};

export default Signup;
