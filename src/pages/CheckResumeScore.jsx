import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import './styles/CheckResumeScore.css';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const CheckResumeScore = () => {

    const [isUploading, setIsUploading] = useState(false);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [state, setState] = useState(0);

    const [score, setScore] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [resume, setResume] = useState({});

    const [fType, setFType] = useState('');
    const [fSize, setFSize] = useState(0);
    const [fPageCount, setFPageCount] = useState(0);

    const navigate = useNavigate();

    let resumeText;

    const [wordCount, setWordCount] = useState(null);
    const [personalPronounsResult, setPersonalPronounsResult] = useState({});
    const [commonWordResult, setCommonWordResult] = useState({});
    const [readingLevel, setReadingLevel] = useState({});
    const [softSkills, setSoftSkills] = useState({});
    const [measureableAchievements, setMeasureableAchievements] = useState({});
    const [ats, setAts] = useState(0);

    const handleUpload = async (file) => {
        if (!file) return alert("Please select a file.");
        const formData = new FormData();
        formData.append("resume", file);
        setIsUploading(true);

        try {
            const res = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/build/upload-resume", formData);
            resumeText = res.data.text;
            setFSize(res.data.fileSize);
            setFType(res.data.fileType);
            setFPageCount(res.data.pageCount);
            setResume(res.data.extractedJson);
            scoreResume(res.data.extractedJson, res.data.pageCount, res.data.fileSize, res.data.fileType);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const scoreResume = async (data, fPageCount, fSize, fType) => {
        setIsAnalysing(true);
        try {
            const res = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/build/score-resume", {
                resumeData: data,
                text: resumeText,
                fSize,
                fType,
                fPageCount,
            });
            const result = res.data.data;
            setScore(result.resumeScore);
            setFeedbacks(result.feedback);
            setWordCount(result.wordCount);
            setPersonalPronounsResult(result.pronounResult);
            setCommonWordResult(result.commonWordResult);
            setReadingLevel(result.readingLevel);
            setSoftSkills(result.softSkills);
            setMeasureableAchievements(result.measurableAchievements)
            setAts(result.atsScore);
            console.log(result);
        } catch (error) {
            console.log("Error:", error.message);
        } finally {
            setIsAnalysing(false);
            setState(1);
        }
    }

    function FileDropZone({ onFileSelect }) {
        const [highlight, setHighlight] = useState(false);
        const [error, setError] = useState(null);
        const [fileName, setFileName] = useState(null);
        const fileInputRef = useRef(null);

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        const isValidFileType = (file) => allowedTypes.includes(file.type);

        const handleFile = (file) => {
            if (file && isValidFileType(file)) {
                setError(null);
                setFileName(file.name);
                onFileSelect(file);
            } else {
                setError("Only PDF and DOCX files are allowed.");
                setFileName(null);
            }
        };

        const handleDrop = useCallback((e) => {
            e.preventDefault();
            setHighlight(false);
            handleFile(e.dataTransfer.files[0]);
        }, []);

        const handleChange = (e) => {
            handleFile(e.target.files[0]);
        };

        const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        return (
            <div className="file-drop-wrapper">
                <div
                    className={`file-drop-zone ${highlight ? "highlight" : ""}`}
                    onClick={() => fileInputRef.current.click()}
                    onDragEnter={(e) => {
                        preventDefaults(e);
                        setHighlight(true);
                    }}
                    onDragOver={preventDefaults}
                    onDragLeave={(e) => {
                        preventDefaults(e);
                        setHighlight(false);
                    }}
                    onDrop={handleDrop}
                >
                    {!isUploading && !isAnalysing && (
                        <p className="drop-instruction">
                            Drag & drop a <strong>PDF</strong> or <strong>DOCX</strong> file here
                            <br />
                            or click to select
                        </p>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />

                    {isUploading && (
                        <>
                            <span className="drop-icon">
                                <i className="fa-solid fa-cloud-arrow-up icon2"></i>
                            </span>
                            <p className="drop-status">Uploading...</p>
                        </>
                    )}

                    {isAnalysing && (
                        <>
                            <span className="drop-icon">
                                <i className="fa-solid fa-magnifying-glass-chart icon2"></i>
                            </span>
                            <p className="drop-status">Analysing...</p>
                        </>
                    )}

                    {error && <p className="drop-error">{error}</p>}
                </div>
            </div>
        );
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function getColor(score) {
        if (score >= 90) return "#4CAF50"; // Green
        if (score >= 70) return "#FFC107"; // Yellow
        if (score >= 50) return "#FF9800"; // Orange
        return "#F44336"; // Red
    }

    function ViewItem({ title, message, state }) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: '20px 15px',
                    border: '1px solid #ddd',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    gap: '10px',
                }}
            >
                {/* Left: Title + Icon */}
                <div
                    style={{
                        flex: '1 1 150px',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'flex-start',
                        gap: "0.5rem",
                    }}
                >
                    <span style={{ fontWeight: "bold", color: '#4e4e4e', fontSize: "12px", fontFamily: 'Poppins' }}>{title}</span>
                    {state ? (
                        <i className="fa-solid fa-check" style={{ color: "green" }}></i>
                    ) : (
                        <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
                    )}
                </div>

                {/* Right: Message */}
                <div style={{ flex: '2 1 300px' }}>
                    <div style={{ margin: 0, color: "#555", fontSize: '11.5px', lineHeight: '1.4' }}>
                        {message}
                    </div>
                </div>
            </div>
        );
    }

    const SuggestionsList = ({ suggestions }) => {
        if (!suggestions?.length) return null;

        return (
            <div className="suggestions-container">
                <h3>Suggestions to Improve:</h3>
                <ul className="suggestions-list">
                    {suggestions.map((item, index) => (
                        <li key={index}>
                            <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '5px', marginTop: '3px' }} /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    function BasicDetails({ score }) {
        const [displayScore, setDisplayScore] = useState(0);

        useEffect(() => {
            let startTime = null;
            const duration = 1500;

            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                const currentScore = Math.floor(easedProgress * score);
                setDisplayScore(currentScore);

                if (elapsed < duration) {
                    requestAnimationFrame(animate);
                } else {
                    setDisplayScore(score);
                }
            }

            requestAnimationFrame(animate);
        }, [score]);

        const radius = 90;
        const stroke = 15;
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset =
            circumference - (displayScore / 100) * circumference;

        const color = getColor(displayScore);

        return (
            <>
                <div className='outerbox'>
                    <div className='score-box-result'>
                        <div
                            style={{
                                position: "relative",
                            }}
                        >
                            <svg height={radius * 2} width={radius * 2}>
                                <circle
                                    stroke="#e6e6e6"
                                    fill="transparent"
                                    strokeWidth={stroke}
                                    r={normalizedRadius}
                                    cx={radius}
                                    cy={radius}
                                />
                                <circle
                                    stroke={color}
                                    fill="transparent"
                                    strokeWidth={stroke}
                                    strokeDasharray={`${circumference} ${circumference}`}
                                    strokeDashoffset={strokeDashoffset}
                                    r={normalizedRadius}
                                    cx={radius}
                                    cy={radius}
                                    style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
                                />
                            </svg>
                            <h1
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    margin: 0,
                                    color: "#333",
                                    fontSize: "clamp(24px, 8vw, 50px)", // Responsive font size
                                    fontWeight: "bold",
                                    userSelect: "none",
                                }}
                            >
                                {displayScore}
                            </h1>

                        </div>
                        <div>
                            <SuggestionsList suggestions={feedbacks} />
                        </div>
                    </div>

                    <div className="box">
                        <h2 className='heading'>Document Analysis</h2>
                        <ViewItem
                            title={"File Type"}
                            message={
                                fType === ".pdf" ? (
                                    <> The file type of your resume is <strong>PDF</strong>. This is one of the most preferred and ATS-friendly formats. Well done!</>
                                ) : (
                                    <>Your resume is in <strong>DOCX</strong> format. While acceptable, converting to PDF can ensure consistent formatting across devices.</>
                                )
                            }
                            state={
                                fType === ".pdf" || fType === ".docx" ? true : false
                            }
                        />

                        <ViewItem
                            title={"File Size"}
                            message={
                                fSize < 500 ? (
                                    <>The file size of your resume is <strong>{fSize}KB</strong> which is optimal. Your resume is efficient and easy to process.</>
                                ) : (
                                    <>The file size of your resume is <strong>{fSize}KB</strong>. which is large, which might cause slow loading or uploading issues. Consider compressing it for better compatibility.</>
                                )
                            }
                            state={
                                fSize < 500 ? true : false
                            }
                        />

                        <ViewItem
                            title={"Page Count"}
                            message={
                                fPageCount === 1 ? (
                                    <>Your resume length is <strong>{fPageCount} page.</strong> Recruiters generally prefer concise single page resumes that highlight the most relevant achievements.</>
                                ) : fPageCount === 2 ? (
                                    <>Two-pages resumes are acceptable, especially for candidates with more experience or diverse skills.</>
                                ) : (
                                    <>Your resume lenght is <strong>{fPageCount} pages.</strong>The resume is longer than the recommended limit. Consider shortening it to 1–2 pages for better readability.</>
                                )
                            }

                            state={
                                fPageCount < 3 ? true : false
                            }
                        />

                        <ViewItem
                            title={"Word Count"}
                            message={
                                wordCount < 200 ? (
                                    <>Your resume contains <strong>{wordCount} words</strong>, which appears too short. Consider adding more relevant information to make a stronger impression.</>
                                ) : wordCount <= 500 ? (
                                    <>Your resume contains <strong>{wordCount} words</strong>. The word count is within the ideal range. Your resume is concise and likely easy for recruiters to scan. Well done!</>
                                ) : (
                                    <>Your resume contains <strong>{wordCount} words</strong>, which may be too lengthy. Consider trimming unnecessary content to keep it under 800 words for better readability and ATS performance.</>
                                )
                            }
                            state={wordCount >= 200 && wordCount <= 500}
                        />
                    </div>

                    <div className="box">
                        <h2 className='heading'>Data Analysis</h2>
                        <ViewItem
                            title={"Phone Number"}
                            message={
                                resume?.phone && resume.phone.trim() !== "" ? (
                                    <>Your resume includes a phone number: <strong>{resume.phone}</strong>. Recruiters will find it easy to contact you. Good job!</>
                                ) : (
                                    <><strong>We couldn't detect a phone number</strong> in your resume. Make sure to include one so recruiters can easily reach you.</>
                                )
                            }
                            state={resume?.phone && resume.phone.trim() !== ""}
                        />

                        <ViewItem
                            title={"Email Address"}
                            message={
                                resume?.email && resume.email.trim() !== "" ? (
                                    <>Your resume includes an email address: <strong>{resume.email}</strong>. Great!</>
                                ) : (
                                    <><strong>We couldn't detect an email address</strong> in your resume. Make sure to include one so recruiters can easily reach out to you.</>
                                )
                            }
                            state={resume?.email && resume.email.trim() !== ""}
                        />

                        <ViewItem
                            title={"LinkedIn"}
                            message={
                                resume?.linkedin && resume.linkedin.trim() !== "" ? (
                                    <>Your resume includes a LinkedIn profile: <strong>{resume.linkedin}</strong>. Great! This adds credibility and gives recruiters more insight into your background.</>
                                ) : (
                                    <><strong>We couldn't detect a LinkedIn profile</strong> in your resume. Including one helps showcase your professional presence and build trust.</>
                                )
                            }
                            state={resume?.linkedin && resume.linkedin.trim() !== ""}
                        />

                        <ViewItem
                            title={"GitHub"}
                            message={
                                resume?.github && resume.github.trim() !== "" ? (
                                    <>Your resume includes a GitHub profile: <strong>{resume.github}</strong>. Great! This showcases your coding skills and project contributions to recruiters.</>
                                ) : (
                                    <><strong>We couldn't detect a GitHub profile</strong> in your resume. Adding one is beneficial if you're applying for technical roles—it highlights your hands-on experience and projects.</>
                                )
                            }
                            state={resume?.github && resume.github.trim() !== ""}
                        />

                        <ViewItem
                            title={"Education"}
                            message={
                                resume?.education && resume.education.length > 0 ? (
                                    <>Your resume includes an education section. Highlighting your academic background adds credibility to your qualifications. Well done!</>
                                ) : (
                                    <><strong>We couldn't detect an education section</strong> in your resume. Consider adding your academic history to strengthen your profile.</>
                                )
                            }
                            state={resume?.education && resume.education.length > 0}
                        />

                        <ViewItem
                            title={"Skills"}
                            message={
                                resume?.skills && resume.skills.length > 0 ? (
                                    <>Your resume includes a list of skills. Highlighting your key strengths helps recruiters quickly assess your suitability. Great job!</>
                                ) : (
                                    <><strong>We couldn't detect a skills section</strong> in your resume. Adding your technical and soft skills will strengthen your profile significantly.</>
                                )
                            }
                            state={resume?.skills && resume.skills.length > 0}
                        />

                        <ViewItem
                            title={"Experience"}
                            message={
                                resume?.experience && resume.experience.length > 0 ? (
                                    <>Your resume includes professional or project experience. Showcasing real-world experience greatly improves your credibility. Well done!</>
                                ) : (
                                    <><strong>We couldn't detect any experience section</strong> in your resume. Adding relevant work or project experience can significantly boost your profile.</>
                                )
                            }
                            state={resume?.experience && resume.experience.length > 0}
                        />

                        <ViewItem
                            title={"Projects"}
                            message={
                                resume?.projects && resume.projects.length > 0 ? (
                                    <>Your resume includes a projects section. Highlighting your hands-on work demonstrates your skills and initiative. Great job!</>
                                ) : (
                                    <><strong>We couldn't detect any projects</strong> in your resume. Including personal or academic projects helps showcase your practical experience, especially if you're early in your career.</>
                                )
                            }
                            state={resume?.projects && resume.projects.length > 0}
                        />

                    </div>

                    <div className="box">
                        <h2 className='heading'>Lexical Analysis</h2>
                        <ViewItem
                            title={"Personal Pronouns"}
                            message={
                                personalPronounsResult.count > 0 ? (
                                    <>Detected personal pronouns: <strong>"{personalPronounsResult.wordsUsed.slice(0, 3).join(', ')}{personalPronounsResult.wordsUsed.length > 3 ? ', ...' : ''}"</strong>. Avoid using personal pronouns in resumes for a professional tone.</>
                                ) : (
                                    <>We did not detect any personal pronouns in your resume. Great job!</>
                                )
                            }
                            state={personalPronounsResult.count === 0}
                        />

                        <ViewItem
                            title={"Common Word Ratio"}
                            message={
                                <>
                                    {
                                        commonWordResult.ratio >= 0.4 ? (
                                            <>Your resume has a high ratio of common words: <strong>{commonWordResult.ratio} out of 1</strong>. Try replacing some with stronger, more specific language.</>
                                        ) : commonWordResult.ratio >= 0.2 ? (
                                            <>Moderate ratio of common words: <strong>{commonWordResult.ratio} out of 1</strong>. Consider refining some phrases.</>
                                        ) : (
                                            <>Excellent! Your common word ratio is low: <strong>{commonWordResult.ratio} out of 1</strong>, showing effective, concise language.</>
                                        )
                                    }

                                    {/* Optional Ratio Bar */}
                                    <div style={{
                                        height: "6px",
                                        borderRadius: "4px",
                                        background: "#e0e0e0",
                                        marginTop: '5px',
                                        overflow: "hidden",
                                        width: "100%"
                                    }}>
                                        <div style={{
                                            height: "100%",
                                            width: `${(commonWordResult.ratio * 100).toFixed(0)}%`,
                                            background:
                                                commonWordResult.ratio >= 0.4 ? "#d32f2f" :
                                                    commonWordResult.ratio >= 0.2 ? "#fbc02d" :
                                                        "#66bb6a"
                                        }}></div>
                                    </div>
                                </>
                            }
                            state={commonWordResult.ratio < 0.4}
                        />

                        <ViewItem
                            title={"Reading Level"}
                            message={
                                readingLevel.score >= 4 ? (
                                    <>Your resume has a high readability score <strong>{readingLevel.score} out of 10</strong>. It's very easy to read—great for recruiters and ATS!</>
                                ) : readingLevel.score >= 3 ? (
                                    <>Your resume's readability score is <strong>{readingLevel.score} out of 10</strong>. It's moderately readable, but simplifying the language further could help.</>
                                ) : (
                                    <>Your resume has a low readability score <strong>{readingLevel.score} out of 10</strong>. Consider simplifying sentence structure and word choice for better clarity and accessibility.</>
                                )
                            }
                            state={readingLevel.score >= 3}
                        />

                    </div>

                    <div className="box">
                        <h2 className='heading'>Semantic Analysis</h2>
                        <ViewItem
                            title={"Hard Skills"}
                            message={
                                resume?.skills && resume.skills.length >= 3 ? (
                                    <>
                                        Your resume includes <strong>{resume.skills.length}</strong> hard skill{resume.skills.length > 1 ? 's' : ''}:{" "}
                                        <strong>{resume.skills.join(", ")}.</strong> Great job!
                                    </>
                                ) : resume?.skills && resume.skills.length > 0 ? (
                                    <>
                                        We detected <strong>{resume.skills.length}</strong> hard skill{resume.skills.length > 1 ? 's' : ''}:{" "}
                                        <strong>{resume.skills.join(", ")}</strong>. Try adding a few more technical tools or technologies to strengthen your resume.
                                    </>
                                ) : (
                                    <>
                                        <strong>We couldn't detect any hard skills</strong> in your resume. Adding technical skills like tools, programming languages, or software expertise can significantly strengthen your profile.
                                    </>
                                )
                            }
                            state={resume?.skills && resume.skills.length >= 3}
                        />

                        <ViewItem
                            title={"Soft Skills"}
                            message={
                                softSkills.count >= 2 ? (
                                    <>
                                        Your resume includes <strong>{softSkills.count}</strong> soft skill{softSkills.count > 1 ? 's' : ''}:{" "}
                                        <strong>{softSkills.matchedSkills.join(", ")}. </strong>
                                        Great job showcasing your interpersonal strengths!
                                    </>
                                ) : softSkills.count === 1 ? (
                                    <>
                                        We detected <strong>1 soft skill</strong>: <strong>{softSkills.matchedSkills[0]}</strong>.
                                        Consider adding more soft skills to enhance your profile.
                                    </>
                                ) : (
                                    <>
                                        <strong>We couldn't detect any soft skills</strong> in your resume.
                                        Consider adding traits like communication, leadership, or problem-solving to make your profile more well-rounded.
                                    </>
                                )
                            }
                            state={softSkills.count >= 2}
                        />

                        <ViewItem
                            title={"Measurable Achievements"}
                            message={
                                measureableAchievements.count >= 1 ? (
                                    <>
                                        Your resume includes <strong>{measureableAchievements.count}</strong> measurable achievement{measureableAchievements.count > 1 ? 's' : ''}:{" "}
                                        <strong>{measureableAchievements.matches.join(', ')}.</strong>
                                        {measureableAchievements.count === 1
                                            ? " Good start! Consider adding more quantifiable results to further showcase your impact."
                                            : " Great job showcasing results and impact!"}
                                    </>
                                ) : (
                                    <>
                                        <strong>We couldn't detect measurable achievements</strong> in your resume.
                                        Consider quantifying your impact using numbers (e.g., "Increased sales by 20%") to make your contributions more convincing.
                                    </>
                                )
                            }
                            state={measureableAchievements.count >= 1}
                        />

                        <ViewItem
                            title={"ATS Structure"}
                            message={
                                ats > 2 ? (
                                    <>Your resume follows ATS-friendly structure with proper headings, sections. Well done!</>
                                ) : (
                                    <>Your resume structure may not be fully ATS-optimized. Ensure it uses standard headings like "Education", "Experience", "Skills", and avoids tables or graphics.</>
                                )
                            }
                            state={ats > 2}
                        />


                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='resume-checker-wrapper'>
                <Navbar />
                <div className='wrapper2'>
                    {state === 0 && (
                        <>
                            <div className="details">
                                <h1>Resume Checker</h1>
                                <p>Find out if <strong>applicant tracking systems</strong> are tossing out your resume before it's even read.
                                    Upload your resume below for <strong>free resume check</strong></p>
                            </div>
                            <FileDropZone onFileSelect={handleUpload} />
                        </>
                    )}

                    {state === 1 && (
                        <>
                            <BasicDetails score={score} />
                            <button className='btn' onClick={() => setState(0)}>
                                Check Another Resume
                            </button>
                            <div className='container2'>
                                <p><i className="fa-solid fa-lightbulb"></i> Not satisfied with your resume score? Create a professional ATS-friendly resume effortlessly with our AI-Powered resume building service.</p>
                                <button className='btn'
                                    onClick={() => navigate('/select-template')}>Create My Resume</button>
                            </div>
                        </>
                    )}

                </div>
                <Footer />
            </div>
        </>
    );
}

export default CheckResumeScore;
