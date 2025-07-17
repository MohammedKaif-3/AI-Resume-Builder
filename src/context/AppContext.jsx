import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [resumes, setResumes] = useState({});
    const [activeTab, setActiveTab] = useState("resumes");

    const getAuthState = async () => {
        try {
            const { data } = await axios.get("https://ai-resume-builder-backend-jw1g.onrender.com/api/auth/is-auth", { withCredentials: true });
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();
                getResumesData();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get("https://ai-resume-builder-backend-jw1g.onrender.com/api/data/user", { withCredentials: true });
            data.success ? setUserData(data.userData) : setUserData({});
        } catch (error) {
            setUserData({});
            console.log(error.message);
        }
    };

    const getResumesData = async () => {
        try {
            const { data } = await axios.get("https://ai-resume-builder-backend-jw1g.onrender.com/api/data/resumes", { withCredentials: true });

            if (data.success && data.resumes) {
                setResumes(data.resumes);
            }

        } catch (error) {
            setResumes({});
            console.log(error.message);
        }

    }

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        activeTab,
        setActiveTab,
        resumes,
        getResumesData,
        userData,
        getUserData
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
