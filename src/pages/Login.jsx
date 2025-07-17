import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./styles/Auth.css"; // Shared CSS for both Login & Signup
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import { useEffect } from "react"; // Make sure this is imported



const Login = () => {

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const [error, seterror] = useState();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setIsLoggedIn, getUserData } = useContext(AppContext);

  // Auto-clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        seterror(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      seterror("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com" + "/api/auth/login", {
        email, password
      }, { withCredentials: true })

      if (response.data && response.data.success) {
        setIsLoggedIn(true);
        toast.success("Login Success");
        getUserData();
        navigate('/', { replace: true });
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
        <h2>Welcome Back!</h2>
        <p style={{ fontSize: '11px', marginBottom: '8px' }}>Login to continue</p>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLoginSubmit}>
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
              autoComplete="current-password"
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="auth-btn"
          >
            {loading ? <i className="fas fa-spinner fa-spin" style={{ color: 'white' }}></i> : "Login"}
          </button>

        </form>

        <p className="auth-footer">
          <Link to="/forget-password">Forget Password?</Link>
        </p>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div style={{ color: '#888', fontFamily: 'Poppins', fontSize: '12px', marginTop: '10px' }}>--- or ---</div>

        <a className="google-btn" href="https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/google">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ marginLeft: '8px' }}>Sign in with Google</span>
        </a>
      </div>
    </div>
  );
};

export default Login;
