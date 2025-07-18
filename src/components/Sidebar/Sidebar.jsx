import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import './Sidebar.css'

const Sidebar = ({ onLogout, isOpen, closeSidebar }) => {
    const { userData, setActiveTab, activeTab } = useContext(AppContext);
    const firstLetter = userData?.name ? userData.name.charAt(0).toUpperCase() : "?";

    const navigate = useNavigate();

    const sendVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/send-verify-otp", {}, { withCredentials: true });
            if (response.data && response.data.success) {
                toast.success("OTP sent to your email");
                navigate('/verify-email');
            }
        } catch (err) {
            console.log(err.response?.data?.message || "Something went wrong!");
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (window.innerWidth < 768) closeSidebar(); // Auto-close drawer on mobile
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <button className="close-sidebar-btn" onClick={closeSidebar}>
                    <i className="fa-solid fa-xmark close"></i>
                </button>
            )}
            <div className="sidebar-profile">
                <div className="profile-circle">{firstLetter}</div>
                <p className="profile-name">{userData?.name || "N/A"}</p>
                <p className="profile-email">
                    {userData?.isAccountVerified ? (
                        <i className="fa-solid fa-check" style={{ color: "#28a745", marginRight: "6px" }}></i>
                    ) : (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: "#FFA500", marginRight: "6px" }}></i>
                    )}
                    {userData?.email || "N/A"}
                </p>

                {!userData?.isAccountVerified && (
                    <button onClick={sendVerifyOtp} className="verify-email-btn">Verify Email</button>
                )}
            </div>

            <div className="line-separater"></div>

            <ul className="sidebar-menu">
                <li className={activeTab === "resumes" ? "active-tab" : ""} onClick={() => handleTabClick("resumes")}>My Resumes</li>
                <li className={activeTab === "aitools" ? "active-tab" : ""} onClick={() => handleTabClick("aitools")}>Tools</li>
                <li className={activeTab === "settings" ? "active-tab" : ""} onClick={() => handleTabClick("settings")}>Settings</li>
                <div className="line-separater"></div>
            </ul>

            <button className="home-btn" onClick={() => navigate('/')}><i className="fa-solid fa-house"></i> Home</button>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Sidebar;
