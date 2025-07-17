import React, { useState, useEffect } from "react";

const EditableFileName = ({ resumeData, setResumeData }) => {
  const [fileName, setFileName] = useState(resumeData.filename || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFileName(resumeData.filename || "");
  }, [resumeData.filename]);

  const handleBlur = () => {
    const trimmed = fileName.trim();
    const finalName = trimmed || "Untitled";
    setFileName(finalName);
    setIsEditing(false);

    // Update resumeData's filename
    setResumeData(prev => ({
      ...prev,
      filename: finalName,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        gap: "6px",
        paddingLeft: "20px",
      }}
    >
      {isEditing ? (
        <input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          autoFocus
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            outline: 'none',
            border: 'none',
            background: 'transparent',
            borderBottom: '1px dashed grey',
            padding: "4px 8px",
            fontFamily: "Poppins",
            maxWidth: "200px",
          }}
        />
      ) : (
        <>
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              margin: 0,
              display: "flex",
              alignItems: "center",
              fontFamily: "Poppins",
              cursor: "default",
              gap: "3px",
              color: "#333",
            }}
          >
            {fileName.trim() || "Untitled"}
            <span style={{ fontWeight: "normal", color: "#aaa" }}>.pdf</span>
          </h2>

          <span
            style={{ cursor: "pointer", color: "#888", fontSize: '14px' }}
            title="Edit file name"
            onClick={() => setIsEditing(true)}
          >
            <i className="fa-solid fa-pencil" style={{ paddingLeft: '3px' }} />
          </span>
        </>
      )}
    </div>
  );
};

export default EditableFileName;
