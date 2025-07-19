import { useContext, useState } from 'react';
import './MyResumesTab.css';
import AppContext from '../../context/AppContext';
import Resume from '../../pages/Resume';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import Template_1 from '../ResumeTemplates/Template_1';
import Template_2 from '../ResumeTemplates/Template_2';
import Template_3 from '../ResumeTemplates/Template_3';
import Template_4 from '../ResumeTemplates/Template_4';
import Template_5 from '../ResumeTemplates/Template_5';
import Template_6 from '../ResumeTemplates/Template_6';
import Template_7 from '../ResumeTemplates/Template_7';
import Template_8 from '../ResumeTemplates/Template_8';
import Template_9 from '../ResumeTemplates/Template_9';
import Template_10 from '../ResumeTemplates/Template_10';
import Template_11 from '../ResumeTemplates/Template_11';
import Template_12 from '../ResumeTemplates/Template_12';
import Template_13 from '../ResumeTemplates/Template_13';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from '../ConfirmModel/ConfirmModel';

const MyResumesTab = () => {

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

    const { resumes, getResumesData } = useContext(AppContext);

    const [isDownloading, setIsDownloading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(false);

    const templates = {
        "wp-1col-tem1": Template_1,
        "p-2col-tem1": Template_2,
        "wp-2col-tem1": Template_3,
        "wp-2col-tem2": Template_4,
        "p-2col-tem2": Template_5,
        "p-1col-tem1": Template_6,
        "wp-1col-tem2": Template_7,
        "p-1col-tem2": Template_8,
        "wp-1col-des-tem1": Template_9,
        "p-2col-des-tem2": Template_10,
        "p-2col-des-tem3": Template_11,
        "wp-2col-des-tem4": Template_12,
        "wp-2col-des-tem5": Template_13
    };

    getResumesData();

    const downloadPDF = async (resume) => {
        setIsDownloading(true);
        try {
            const htmlContent = generateResumeHTML(resume);

            const response = await axios.post(
                "https://ai-resume-builder-backend-jw1g.onrender.com/api/build/generate-pdf",
                { htmlContent, fileName: resume.filename },
                { responseType: "blob" }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = resume.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            // Increament Pdf Downloads
            await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com.onrender.com/api/data/set-pdf-downloads");

        } catch (error) {
            console.error("Error downloading PDF:", error.message);
        } finally {
            setIsDownloading(false);
        }
    };

    const generateResumeHTML = (resume) => {
        const sheet = new ServerStyleSheet();
        try {
            const SelectedTemplate = templates[resume.template];
            if (!SelectedTemplate) return "<h1>No Template Selected</h1>";

            const content = ReactDOMServer.renderToString(
                sheet.collectStyles(<SelectedTemplate resumeData={resume} />)
            );

            const styles = sheet.getStyleTags();

            return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Resume</title>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
              <script src="https://kit.fontawesome.com/feb96495c5.js" crossorigin="anonymous"></script>
              ${styles}
              <style>
                * {
                    box-sizing: border-box;
                }
                html, body {
                margin: 0;
                padding: 0;
                }
                </style>
            </head>
            <body>${content}</body>
            </html>
          `;
        } catch (error) {
            console.error("Error generating resume HTML:", error);
            return "<h1>Error Generating Resume</h1>";
        } finally {
            sheet.seal();
        }
    };

    const openResumeInEditor = (resume) => {
        safeNavigate(`/edit-resume/${resume.template}`, {
            state: { resume }
        });
    };

    const handleDeleteClick = (id) => {
        setDeletingId(id);
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const deleteConfirm = async () => {
        setShowModal(false);
        // delete resume
        setIsDeleting(true);
        try {
            const response = await axios.delete(`https://ai-resume-builder-backend-jw1g.onrender.com/api/data/delete/${deletingId}`, {
                withCredentials: true,
            });

            if (response.data.success) {
                // show a success message
                toast("Resume deleted successfully!");

            } else {
                toast.error("Failed to delete resume.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }

    }

    const handleDownload = (resume) => {
        // download resume
        downloadPDF(resume);
    }

    const handleCreateResumeClick = () => {
        safeNavigate('/select-template')
    }

    return (
        <div className='my-resumes-tab'>

            <h1 className='tabs-heading'>My Resumes</h1>
            <div className="resumes-list">

                {/* Render resumes if available */}
                {resumes && resumes.length > 0 ? (
                    resumes.map((resume) => (
                        <div>
                            <div
                                className="resume-card"
                                key={resume._id}
                            >
                                <Resume template={resume.template} resumeData={resume} />

                                <div className="resume-overlay">
                                    <button
                                        className="resume-action"
                                        onClick={() => openResumeInEditor(resume)}
                                    >
                                        Edit
                                    </button>

                                    <div className='resume-actions-strip'>

                                        <button
                                            disabled={isDownloading}
                                            style={{
                                                cursor: isDownloading ? "not-allowed" : "pointer",
                                                backgroundColor: isDownloading ? "#6c757d" : "rgb(2, 98, 169)",
                                            }}
                                            className="resume-action" onClick={() => handleDownload(resume)}>
                                            <i className="fa-solid fa-download icon" />
                                            {isDownloading ? " Generating..." : " Download"}
                                        </button>

                                        <button
                                            disabled={isDeleting}
                                            style={{
                                                cursor: isDeleting ? "not-allowed" : "pointer",
                                                backgroundColor: isDeleting ? "#6c757d" : "rgb(2, 98, 169)",
                                            }}
                                            className="resume-action" onClick={() => handleDeleteClick(resume._id)}>
                                            <i className="fa-solid fa-trash icon" />
                                            {isDeleting ? "Deleting..." : " Delete"}
                                        </button>

                                    </div>


                                </div>
                            </div>
                            <div className="filename">{resume.filename} <span style={{ color: '#aaa' }}>.pdf</span> </div>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}

                {/* Always render Create Resume Card */}
                <div className="resume-card" onClick={handleCreateResumeClick}>
                    <div className="create-resume-content">
                        <i className="fa-solid fa-plus plus-icon" style={{ fontSize: '40px' }}></i>
                        <p className='text'>Create New Resume</p>
                    </div>
                </div>

            </div>
            {showModal && (
                <ConfirmModal
                    title="Delete Resume !"
                    message="You can't undo this process. Are you sure?"
                    onCancel={handleCancel}
                    onConfirm={deleteConfirm}
                />
            )}
        </div>
    );

}

export default MyResumesTab;
