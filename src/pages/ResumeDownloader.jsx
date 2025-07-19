import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { toast } from "react-toastify";
import './styles/ResumeDownloader.css';
import Template_1 from "../components/ResumeTemplates/Template_1";
import Template_2 from "../components/ResumeTemplates/Template_2";
import Template_3 from "../components/ResumeTemplates/Template_3";
import Template_4 from "../components/ResumeTemplates/Template_4";
import Template_5 from "../components/ResumeTemplates/Template_5";
import Template_6 from "../components/ResumeTemplates/Template_6";
import Template_7 from "../components/ResumeTemplates/Template_7";
import Template_8 from "../components/ResumeTemplates/Template_8";
import Template_9 from "../components/ResumeTemplates/Template_9";
import Template_10 from "../components/ResumeTemplates/Template_10";
import Template_11 from "../components/ResumeTemplates/Template_11";
import Template_12 from "../components/ResumeTemplates/Template_12";
import Template_13 from "../components/ResumeTemplates/Template_13";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import ScoreBox from "../components/Scorebox/Scorebox";

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

const ResumeDownloader = ({ template, resumeData, setResumeData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isScoring, setIsScoring] = useState(false);

  const [showScoreLive, setShowScoreLive] = useState(false);
  const [score, setScore] = useState({});

  const [isThemeModalOpen, setThemeModalOpen] = useState(false);

  const { getUserData, userData, isLoggedIn } = useContext(AppContext);

  const location = useLocation();
  const isEditMode = location.pathname.startsWith('/edit-resume');

  const resumeThemes = {
    default: { id: "default", background: "", heading: "" },
    classic: { id: "classic", background: "#ffffff", heading: "#1a1a1a" },
    elegant: { id: "elegant", background: "#fdfdfd", heading: "#8e44ad" },
    modern: { id: "modern", background: "#f4f4f4", heading: "#e91e63" },
    ocean: { id: "ocean", background: "#e0f7fa", heading: "#006064" },
    slate: { id: "slate", background: "#eceff1", heading: "#37474f" },
    sunset: { id: "sunset", background: "#fff3e0", heading: "#e64a19" },
    forest: { id: "forest", background: "#e8f5e9", heading: "#1b5e20" },
    coral: { id: "coral", background: "#fff8f6", heading: "#bf360c" },
    royal: { id: "royal", background: "#e8eaf6", heading: "#303f9f" },
    lavender: { id: "lavender", background: "#f3e5f5", heading: "#6a1b9a" },
    charcoal: { id: "charcoal", background: "#f5f5f5", heading: "#424242" },
    steel: { id: "steel", background: "#eceff1", heading: "#37474f" },
    peach: { id: "peach", background: "#fff0e6", heading: "#ff7043" },
    cyan: { id: "cyan", background: "#e0f7fa", heading: "#0097a7" },
    crimson: { id: "crimson", background: "#fff5f5", heading: "#c62828" },
    mint: { id: "mint", background: "#e8f5e9", heading: "#2e7d32" },
    navy: { id: "navy", background: "#e3f2fd", heading: "#1565c0" },
    mocha: { id: "mocha", background: "#efebe9", heading: "#5d4037" },
    blush: { id: "blush", background: "#fce4ec", heading: "#ad1457" },
    sand: { id: "sand", background: "#fdf5e6", heading: "#a1887f" },
    ice: { id: "ice", background: "#f0f4f8", heading: "#3949ab" },
    plum: { id: "plum", background: "#f3e5f5", heading: "#6a1b9a" },
    denim: { id: "denim", background: "#e3f2fd", heading: "#1976d2" },
    grayscale: { id: "grayscale", background: "#ffffff", heading: "#424242" }
  };

  const resumeThemesArray = Object.entries(resumeThemes).map(([id, theme]) => ({
    id,
    ...theme
  }));

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

  const generateResumeHTML = () => {
    const sheet = new ServerStyleSheet();
    try {
      const SelectedTemplate = templates[template];
      if (!SelectedTemplate) return "<h1>No Template Selected</h1>";

      const content = ReactDOMServer.renderToString(
        sheet.collectStyles(<SelectedTemplate resumeData={resumeData} />)
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

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const htmlContent = generateResumeHTML();

      const response = await axios.post(
        "https://ai-resume-builder-backend-jw1g.onrender.com/api/build/generate-pdf",
        { htmlContent, fileName: resumeData.filename || "Untitled" },
        { responseType: "blob", withCredentials: true }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resumeData.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Increament Pdf Downloads
      await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/data/set-pdf-downloads");

    } catch (error) {
      console.error("Error downloading PDF:", error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const updateResume = async () => {
    setIsSaving(true);
    try {

      let profileImgUrl = "";
      if (resumeData.profileimg && resumeData.profileimg.startsWith("data:image")) {
        const file = dataURLtoFile(resumeData.profileimg, "profile-image.png");
        const formData = new FormData();
        formData.append("profileimg", file);

        const imgUploadRes = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/data/upload-profile-image", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (imgUploadRes.data.success) {
          profileImgUrl = imgUploadRes.data.imageUrl;
        }
      }

      // Now save the resume
      const dataToSave = { ...resumeData, profileimg: profileImgUrl };

      const response = await axios.put("https://ai-resume-builder-backend-jw1g.onrender.com" + `/api/data/update-resume/${dataToSave._id}`, {
        dataToSave
      }, { withCredentials: true })

      if (response.data && response.data.success) {
        toast.success("Resume Updated Successfully");
      } else {
        toast.error("Unable to Save Resume");
      }

    } catch (error) {
      console.error(error.message);
      toast.error("Unable to Save Resume");
    } finally {
      setIsSaving(false);
    }
  }

  function handleSaving() {
    if (isEditMode) {
      updateResume();
      safeNavigate('/account');
    } else {
      saveResume();
    }
  }

  function jsonToText(resume) {
    return JSON.stringify(resume, null, 2);
  }

  const handleScoring = async () => {
    setIsScoring(true);
    try {
      const res = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/build/score-resume", {
        resumeData,
        text: jsonToText(resumeData),
        fSize: 140,
        fType: '.pdf',
        fPageCount: 1,
      });
      const result = res.data.data;
      setScore(result);
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      setIsScoring(false);
      setShowScoreLive(true)
    }
  }

  useEffect(() => {
    if (showScoreLive) {
      handleScoring()
    }
  }, [resumeData, showScoreLive]);

  const saveResume = async () => {
    if (!isLoggedIn) {
      safeNavigate('/login');
      return;
    }

    await getUserData(); // 🛠️ Make sure to `await` if it's async

    if (!userData?.isAccountVerified) {
      toast.warn("Verify your Email to Save Resume");
      safeNavigate('/verify-email');
      return;
    }

    setIsSaving(true);

    try {
      let profileImgUrl = resumeData.profileimg;

      // Step 1: Upload new profile image if it's a base64 image
      if (profileImgUrl && profileImgUrl.startsWith("data:image")) {
        const file = dataURLtoFile(profileImgUrl, "profile-image.png");
        const formData = new FormData();
        formData.append("profileimg", file);

        // Send the old image URL if it's a valid one
        if (resumeData.profileimg && resumeData.profileimg.startsWith("http")) {
          formData.append("oldImageUrl", resumeData.profileimg);
        }

        const imgUploadRes = await axios.post(
          "https://ai-resume-builder-backend-jw1g.onrender.com/api/data/upload-profile-image",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (imgUploadRes.data.success) {
          profileImgUrl = imgUploadRes.data.imageUrl;
        } else {
          toast.error("Image upload failed.");
          setIsSaving(false);
          return;
        }
      }


      // Step 2: Prepare and send resume data
      const dataToSave = {
        ...resumeData,
        profileimg: profileImgUrl,
        template,
      };

      const response = await axios.post(
        "https://ai-resume-builder-backend-jw1g.onrender.com/api/data/save-resume",
        { dataToSave },
        { withCredentials: true }
      );

      if (response.data?.success) {
        toast.success("Resume Saved Successfully");
        safeNavigate('/account');
      } else {
        toast.error(response.data?.message || "Unable to Save Resume");
      }

    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("You can't store more than 5 resumes");
      } else {
        toast.error(error?.message || "Something went wrong");
      }
    } finally {
      setIsSaving(false);
    }
  };


  const ThemeSelector = ({ selectedThemeId, onSelect }) => {
    const [columns, setColumns] = useState(5);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 480) {
          setColumns(3);
        } else if (window.innerWidth <= 768) {
          setColumns(4);
        } else {
          setColumns(5);
        }
      };

      handleResize(); // initial check
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '8px',
          padding: '8px',
          height: '50%',
          width: '100%',
          maxWidth: '97%',
        }}
      >
        {resumeThemesArray.map((theme) => (
          <div
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            title={theme.id.charAt(0).toUpperCase() + theme.id.slice(1).toLowerCase()}
            style={{
              border:
                selectedThemeId === theme.id
                  ? '2px solid #4caf50'
                  : '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              background: theme.background,
              padding: '6px',
              boxShadow:
                selectedThemeId === theme.id
                  ? '0 0 6px rgba(0,0,0,0.2)'
                  : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontWeight: 500,
                fontSize: '9px',
                marginBottom: '4px',
                textAlign: 'center',
                fontFamily: 'Poppins',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {theme.id.charAt(0).toUpperCase() + theme.id.slice(1).toLowerCase()}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '3px',
              }}
            >
              {theme.id === 'default' ? (
                <i className="fa-solid fa-circle-half-stroke" />
              ) : (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    background: theme.heading,
                    borderRadius: '50%',
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="downloader-container">
      <ScoreBox
        score={score.resumeScore}
        feedback={score.feedback}
        isVisible={showScoreLive}
        onClose={() => setShowScoreLive(false)}
      />
      <button
        className="downloader-button"
        style={{
          backgroundColor: isDownloading ? "#6c757d" : "rgb(2, 98, 169)",
          cursor: isDownloading ? "not-allowed" : "pointer",
        }}
        disabled={isDownloading}
        onClick={downloadPDF}
      >
        <i className="fa-solid fa-download" style={{ color: "#ffffff" }}></i>
        {isDownloading ? " Generating..." : " Download PDF"}
      </button>
      <button
        className="downloader-button"
        style={{
          backgroundColor: isSaving ? "#6c757d" : "rgb(2, 98, 169)",
          cursor: isSaving ? "not-allowed" : "pointer",
        }}
        disabled={isSaving}
        onClick={handleSaving}
      >
        <i className="fa-solid fa-floppy-disk" style={{ color: "#ffffff" }}></i>
        {isSaving ? " Saving..." : isEditMode ? " Save Changes" : " Save"}
      </button>

      <button
        className="downloader-button"
        style={{
          border: '1px solid #ccc',
          padding: '5px 8px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          color: isScoring ? "#888" : "#444",
          fontWeight: '500',
          cursor: isScoring ? "not-allowed" : "pointer",
        }}
        disabled={isScoring}
        onClick={handleScoring}
      >
        <i className="fa-solid fa-wand-sparkles"></i>
        {isScoring ? " Analysing..." : " Score Me"}
      </button>

      <button
        className="downloader-button"
        style={{
          border: '1px solid #ccc',
          padding: '5px 8px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          color: '#444',
          fontWeight: '500',
        }}
        onClick={() => setThemeModalOpen(true)}>
        <i className="fa-solid fa-palette"></i> Theme
      </button>

      {isThemeModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#fff',
            padding: '15px',
            borderRadius: '8px',
            maxWidth: '800px',
            maxHeight: '90vh',
            position: 'relative',
            overflowY: 'auto'
          }}>
            <button className="downloader-closeBtn" title="Close" onClick={() => setThemeModalOpen(false)}><i className="fa-solid fa-circle-xmark"></i></button>
            <ThemeSelector
              selectedThemeId={resumeData?.theme?.id || 'default'}
              onSelect={(themeId) => {
                const selectedTheme = resumeThemesArray.find(theme => theme.id === themeId);
                setResumeData(prev => ({ ...prev, theme: selectedTheme }));
                setThemeModalOpen(false);
              }}

            />
          </div>
        </div>
      )}

    </div>
  );
};


export default ResumeDownloader;
