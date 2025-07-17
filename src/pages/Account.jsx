import React, { useContext, useState } from "react";
import "./styles/Account.css";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import MyResumesTab from '../components/MyResumesTab/MyResumesTab';
import SettingsTab from '../components/SettingsTab/SettingsTab';
import ToolsTab from "../components/ToolsTab/ToolsTab";
import { useEffect } from "react"; // already imported React

const Account = () => {
    const { setIsLoggedIn, activeTab } = useContext(AppContext);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false); // state for mobile drawer


    useEffect(() => {
        if (sidebarOpen) {
            document.body.classList.add("sidebar-open");
        } else {
            document.body.classList.remove("sidebar-open");
        }
    }, [sidebarOpen]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "resumes": return <MyResumesTab />;
            case "aitools": return <ToolsTab />;
            case "settings": return <SettingsTab />;
            default: return <MyResumesTab />;
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/logout", {}, { withCredentials: true });

        if (response.data && response.data.success) {
            setIsLoggedIn(false);
            navigate('/');
            toast.success("Logout Success");
        } else {
            toast.error("Problem on Logout");
        }
    };

    return (
        <div className="account-page">
            {/* Hamburger for mobile */}
            {!sidebarOpen && (
                <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
                    <i className="fa-solid fa-bars hamburger"></i>
                </button>
            )}




            <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Account;
