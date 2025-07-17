import { useContext, useState } from 'react';
import './SettingsTab.css';
import ConfirmModel from '../ConfirmModel/ConfirmModel';
import axios from 'axios';
import { toast } from 'react-toastify';
import AppContext from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SettingsTab = () => {
    const [showModal, setShowModal] = useState(false);

    const { setIsLoggedIn } = useContext(AppContext);

    const useSafeNavigate = () => {
        const location = useLocation();
        const navigate = useNavigate();

        return (to, options = {}) => {
            if (location.pathname !== to) {
                navigate(to, options);
            }
        };
    };

    const safeNavigate = useSafeNavigate();

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleConfirm = async () => {
        setShowModal(false);
    
        try {
            const response = await axios.delete("https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/delete-account", {
                withCredentials: true
            });
    
            if (response.data?.success) {
                try {
                    const res = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/logout", {}, {
                        withCredentials: true
                    });
    
                    if (res.data?.success) {
                        setIsLoggedIn(false);
                        safeNavigate('/', { replace: true });
                    } else {
                        toast.error("Problem during logout.");
                    }
                } catch (error) {
                    toast.error(`Logout error: ${error.response?.data?.message || error.message}`);
                }
    
                toast.success("Account deleted successfully.");
            } else {
                toast.error(`Error: ${response.data?.message || 'Unknown error.'}`);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Something went wrong. Try again later.";
            toast.error(errorMsg);
            console.error(errorMsg);
        }
    };
    

    return (
        <div className="settings-tab">
            <h1>Settings</h1>
            <div className='container'>
                <p className="warn-text">
                    <i className="fa-solid fa-triangle-exclamation" style={{marginRight: "6px" }}></i>
                    Deleting your account will permanently remove all your data, including resumes and uploaded files. This action cannot be undone.
                </p>
                <button className="delete-account-btn" onClick={handleDeleteClick}>
                    Delete Account
                </button>
            </div>

            {showModal && (
                <ConfirmModel
                    title="Delete Account !"
                    message="This will permanently delete your account and all associated data. Are you sure?"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    );
};

export default SettingsTab;
