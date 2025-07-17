import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Resume from './Resume';
import ResumeDownloader from './ResumeDownloader';
import EditableFileName from '../components/EditableFileName';
import TipTapEditor from '../components/TipTapEditor/TipTapEditor';
import './styles/CreateResume.css';

const CreateResume = () => {

  const wrapperRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const [skillInput, setSkillInput] = useState('');
  const [duplicateError, setDuplicateError] = useState(false);

  const [rename, setRename] = useState(false);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionType, setNewSectionType] = useState("simple");

  const [showForm, setShowForm] = useState(false);
  const isMobile = window.innerWidth <= 768;


  const [techInput, setTechInput] = useState('');

  const { templateId } = useParams();
  const template = [
    'wp-1col-tem1',
    'p-2col-tem1',
    'wp-2col-tem1',
    'wp-2col-tem2',
    'p-2col-tem2',
    'p-1col-tem1',
    'wp-1col-tem2',
    'p-1col-tem2',
    'wp-1col-des-tem1',
    'p-2col-des-tem2',
    'p-2col-des-tem3',
    'wp-2col-des-tem4',
    'wp-2col-des-tem5'
  ].includes(templateId) ? templateId : null;

  const location = useLocation();
  const resume = location.state?.resume;

  const [resumeData, setResumeData] = useState(() => {
    const saved = sessionStorage.getItem("resumeData");
    if (saved) return JSON.parse(saved);

    // Default fallback
    return {
      template: "",
      resumelineheight: 1.6,
      filename: "Untitled",
      theme: {},
      sectionnames: {
        profile: "Profile",
        education: "Education",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
      },
      firstname: "",
      lastname: "",
      jobtitle: "",
      profileimg: "",
      profile: "",
      phone: "",
      email: "",
      github: "",
      linkedin: "",
      website: "",
      education: [],
      skills: [],
      projects: [],
      experience: [],
      customsections: []
    };
  });

  useEffect(() => {
    if (resume) {
      console.log(resume)
      setResumeData(resume);
      sessionStorage.removeItem("resumeData");
    }
  }, [resume]);

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill === '') return;

    const skillExists = resumeData.skills.some(
      skill => skill.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (skillExists) {
      setDuplicateError(true);
      return;
    }

    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, trimmedSkill],
    }));
    setSkillInput('');
    setDuplicateError(false);
  };

  const handleAddTechStack = (project, index) => {
    const newStack = [...project.techStack, techInput.trim()];
    updateArrayField('projects', index, 'techStack', newStack);
    setTechInput('');
  }

  const handleRemoveSkill = index => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    setResumeData(prev => ({ ...prev, skills: updatedSkills }));
  };

  useEffect(() => {
    if (!resume) {
      sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [resumeData]);


  useEffect(() => {
    const updateZoom = () => {
      if (!wrapperRef.current) return;

      const wrapperWidth = wrapperRef.current.offsetWidth;
      const wrapperHeight = wrapperRef.current.offsetHeight;

      const resumeWidth = 794; // 210mm in px at 96dpi
      const resumeHeight = 1123; // 297mm in px at 96dpi

      const zoomX = wrapperWidth / resumeWidth;
      const zoomY = wrapperHeight / resumeHeight;

      setZoomLevel(Math.min(zoomX, zoomY));
    };

    updateZoom();
    window.addEventListener('resize', updateZoom);
    return () => window.removeEventListener('resize', updateZoom);
  }, []);

  // Generic handler for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateLineHeight = (amount) => {
    setResumeData(prev => ({
      ...prev,
      resumelineheight: Math.min(3, Math.max(1, prev.resumelineheight + amount))
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData(prev => ({
          ...prev,
          profileimg: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setResumeData(prev => ({
      ...prev,
      profileimg: '', // or null if you prefer
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setResumeData(prev => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      return { ...prev, [section]: updatedSection };
    });
  };

  const addItem = (section, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => {
      const updated = [...prev[section]];
      updated.splice(index, 1);
      return { ...prev, [section]: updated };
    });
  };

  const addCustomSection = () => {
    if (!newSectionTitle.trim()) return;

    const itemId = Date.now().toString(); // Unique key for the first item

    const newSection = {
      id: Date.now().toString(),
      title: newSectionTitle,
      type: newSectionType,
      items: newSectionType === "simple"
        ? { [itemId]: "" }
        : {
          [itemId]: {
            title: "",
            subtitle: "",
            description: "",
            link: ""
          }
        }
    };

    setResumeData(prev => ({
      ...prev,
      customsections: [...(prev.customsections || []), newSection]
    }));

    setNewSectionTitle("");
    setNewSectionType("simple");
  };

  const updateItem = (sectionId, key, value) => {
    setResumeData(prev => ({
      ...prev,
      customsections: prev.customsections.map(section => {
        if (section.id !== sectionId) return section;

        const isSimple = section.type === "simple";

        return {
          ...section,
          items: {
            ...section.items,
            [key]: isSimple ? value : { ...section.items[key], ...value }
          }
        };
      })
    }));
  };

  const addItemToSection = (sectionId) => {
    const newItemId = Date.now().toString();
    setResumeData(prev => ({
      ...prev,
      customsections: prev.customsections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            items: {
              ...section.items,
              [newItemId]: section.type === "simple" ? "" : {
                title: "",
                date: "",
                description: "",
                link: ""
              }
            }
          }
          : section
      )
    }));
  };

  const removeItemFromSection = (sectionId, keyToRemove) => {
    setResumeData(prev => ({
      ...prev,
      customsections: prev.customsections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            items: Object.fromEntries(
              Object.entries(section.items).filter(([key]) => key !== keyToRemove)
            )
          }
          : section
      )
    }));
  };

  const deleteCustomSection = (indexToDelete) => {
    setResumeData(prev => ({
      ...prev,
      customsections: prev.customsections.filter((section, i) => i !== indexToDelete)
    })
    );
  };

  function EditableSectionTitle({ sectionKey, resumeData, setResumeData, rename, setRename }) {
    const isEditing = rename === sectionKey;
    const [title, setTitle] = useState(
      (resumeData?.sectionnames && resumeData.sectionnames[sectionKey])
    );

    useEffect(() => {
      if (resumeData?.sectionnames) {
        setTitle(resumeData.sectionnames?.[sectionKey]);
      }
    }, [resumeData?.sectionnames?.[sectionKey]]);

    const handleBlur = () => {
      const trimmed = title.trim();

      // Revert if empty
      if (!trimmed) {
        setTitle(resumeData?.sectionnames[sectionKey]);
      } else {
        setResumeData(prev => ({
          ...prev,
          sectionnames: {
            ...prev.sectionnames,
            [sectionKey]: trimmed,
          },
        }));
      }

      setRename(null);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") e.target.blur();
    };

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {isEditing ? (
          <input
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              fontSize: "21px",
              fontWeight: "bold",
              outline: 'none',
              marginTop: '20px',
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
                fontFamily: "Poppins",
                fontSize: "21px",
                fontWeight: "bold",
                margin: 0,
                marginTop: '20px',
                color: "#000",
                cursor: "default",
              }}
            >
              {resumeData?.sectionnames?.[sectionKey] || ""}

            </h2>
            <span
              onClick={() => setRename(sectionKey)}
              style={{
                cursor: "pointer",
                fontSize: "14px",
                color: "#888",
                marginLeft: "6px",
                marginTop: '20px',
              }}
            >
              <i className="fa-solid fa-pencil" style={{ paddingLeft: '3px' }} title="Edit Section Name"></i>
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className='wrapper'>
        <div className='editor-headerControls'>

          {(showForm || !isMobile) && (
            <>
              <EditableFileName
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
              {isMobile && (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="editor-toggleButton"
                >
                  {showForm ? (
                    <>
                      <i className="fa-solid fa-eye" style={{ marginRight: '6px', color: 'white' }}></i>
                      Preview
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-file-pen" style={{ marginRight: '6px', color: 'white' }}></i>
                      Form
                    </>
                  )}
                </button>
              )}
            </>
          )}

          {!showForm && (
            <>
              <div className='res-header'>
                <ResumeDownloader template={template} resumeData={resumeData} setResumeData={setResumeData} />

                <div className='editor-controlGroup'>
                  <div className='editor-zoomButtons'>
                    <label className='editor-controlsLabel' title='Line Height'>Height</label>
                    <button style={{ padding: '1px 7px', borderRadius: '2px' }} onClick={() => updateLineHeight(-0.1)}>-</button>

                    <span style={{ fontSize: '0.6rem' }}>
                      {resumeData?.resumelineheight != null ? `${resumeData.resumelineheight.toFixed(1)}x` : "N/A"}
                    </span>

                    <button style={{
                      padding: '1px 5px',
                      margin: '0',
                      borderRadius: '2px'
                    }} onClick={() => updateLineHeight(0.1)}>+</button>
                  </div>

                  {!isMobile && (
                    <div className='editor-zoomButtons'>
                      <label className='editor-controlsLabel' title='Zoom'>Zoom</label>
                      <button style={{ padding: '1px 7px', borderRadius: '2px' }} onClick={() => setZoomLevel(prev => Math.max(prev - 0.10, 0.3))}>-</button>
                      <span style={{ fontSize: '0.6rem' }}>
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <button style={{
                        padding: '1px 5px',
                        margin: '0',
                        borderRadius: '2px'
                      }} onClick={() => setZoomLevel(prev => Math.min(prev + 0.10, 2))}>+</button>
                    </div>
                  )}
                </div>
                
                {isMobile && (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="editor-toggleButton"
                  >
                    {showForm ? (
                      <>
                        <i className="fa-solid fa-eye" style={{ marginRight: '6px', color: 'white' }}></i>
                        Preview
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-file-pen" style={{ marginRight: '6px', color: 'white' }}></i>
                        Form
                      </>
                    )}
                  </button>
                )}
              </div>

            </>
          )}

        </div>

        <div className="editor-page-container">
          {(showForm || !isMobile) && (
            <div className='editor-formSection'>
              <h2 style={{ margin: '0', fontSize: '20px' }}>Personal Details</h2>
              <div className='editor-section'>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <div>
                    <label className='editor-label'>First Name</label>
                    <input
                      placeholder='John'
                      className='editor-input' name="firstname" value={resumeData.firstname || ""} onChange={handleChange} />
                  </div>

                  <div>
                    <label className='editor-label'>Last Name</label>
                    <input
                      placeholder='Doe'
                      className='editor-input' name="lastname" value={resumeData.lastname || ""} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <div>
                    <label className='editor-label'>Job Title</label>
                    <input
                      className='editor-input' name="jobtitle" placeholder='Software Engineer' value={resumeData.jobtitle || ""} onChange={handleChange} />
                  </div>
                  <div>
                    <label className='editor-label'>Email</label>
                    <input
                      className='editor-input' name="email" placeholder='johndoe@gmail.com' value={resumeData.email || ""} onChange={handleChange} />
                  </div>
                </div>

                <label className='editor-label'>Profile Image</label>
                <div className='editor-input'>
                  <label htmlFor="profileUpload" style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    backgroundColor: '#0262A9',
                    color: 'white',
                    marginRight: '50px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontFamily: 'Poppins',
                  }}>
                    Upload Image
                  </label>
                  <input
                    id="profileUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />

                  {resumeData.profileimg && (
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                      <img
                        src={resumeData.profileimg}
                        alt="Profile Preview"
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          marginLeft: '50px',
                          borderRadius: '8px',
                          display: 'block'
                        }}
                      />
                      <span
                        onClick={removeProfileImage}
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          backgroundColor: '#ff4d4f',
                          color: '#fff',
                          borderRadius: '50%',
                          width: '15px',
                          height: '15px',
                          fontSize: '11px',
                          textAlign: 'center',
                          lineHeight: '18px',
                          cursor: 'pointer',
                          boxShadow: '0 0 2px rgba(0,0,0,0.3)',
                        }}
                        title="Remove Image"
                      >
                        &times;
                      </span>
                    </div>
                  )}

                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <div>
                    <label className='editor-label'>Phone</label>
                    <input
                      className='editor-input' name="phone" placeholder='+91 9392373488' value={resumeData.phone || ""} onChange={handleChange} />
                  </div>
                  <div>
                    <label className='editor-label'>LinkedIn</label>
                    <input
                      className='editor-input' name="linkedin" placeholder='linkedin.com/in/johndoe' value={resumeData.linkedin || ""} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <div>
                    <label className='editor-label'>GitHub</label>
                    <input
                      className='editor-input' name="github" placeholder='github.com/johndoe' value={resumeData.github || ""} onChange={handleChange} />
                  </div>
                  <div>
                    <label className='editor-label'>Website / Portfolio</label>
                    <input
                      className='editor-input' name="website" placeholder='johndoe.dev' value={resumeData.website || ""} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <label className='editor-label'>Profile Summary</label>

                  <TipTapEditor
                    value={resumeData.profile}
                    onChange={(html) => setResumeData(prev => ({ ...prev, profile: html }))}
                    features={['bold', 'italic', 'underline', 'enhanceWithAi', 'generateWithAi']}
                    field={"profile"}
                    index={null}
                    itemKey={null}
                    text={""}
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />

                </div>
              </div>

              {/* Education Section */}

              <EditableSectionTitle
                sectionKey="education"
                resumeData={resumeData}
                setResumeData={setResumeData}
                rename={rename}
                setRename={setRename}
              />

              {resumeData.education.map((edu, index) => (
                <div key={index} className='editor-section'>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <label className='editor-label'>Degree</label>
                      <input
                        placeholder='Btech'
                        className='editor-input'
                        value={edu.degree || ""}
                        onChange={e => updateArrayField('education', index, 'degree', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='editor-label'>Institution</label>
                      <input
                        className='editor-input'
                        value={edu.institution || ""}
                        placeholder='Stanford University'
                        onChange={e => updateArrayField('education', index, 'institution', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <label className='editor-label'>Start Date</label>
                      <input
                        className='editor-input'
                        value={edu.startdate || ""}
                        placeholder='2018'
                        onChange={e => updateArrayField('education', index, 'startdate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='editor-label'>End Date</label>
                      <input
                        className='editor-input'
                        value={edu.enddate || ""}
                        placeholder='2022'
                        onChange={e => updateArrayField('education', index, 'enddate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>

                    <div>
                      <label className='editor-label'>Branch [If Specifiable]</label>
                      <input
                        className='editor-input'
                        placeholder='Computer Science'
                        value={edu.field || ""}
                        onChange={e => updateArrayField('education', index, 'field', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className='editor-label'>Percentage / CGPA</label>
                      <input
                        className='editor-input'
                        placeholder='7.5'
                        value={edu.score || ""}
                        onChange={e => updateArrayField('education', index, 'score', e.target.value)}
                      />
                    </div>
                  </div>


                  <button title='Remove' className='editor-removeButton' onClick={() => removeItem('education', index)}><i className="fa-solid fa-delete-left"></i></button>
                </div>
              ))}

              <button
                className='editor-button'
                onClick={() =>
                  addItem('education', {
                    degree: '',
                    institution: '',
                    startdate: '',
                    enddate: '',
                    score: '',
                    field: ''
                  })
                }
              >
                + Add Education
              </button>

              {/* Experience Section */}

              <EditableSectionTitle
                sectionKey="experience"
                resumeData={resumeData}
                setResumeData={setResumeData}
                rename={rename}
                setRename={setRename}
              />

              {resumeData.experience.map((exp, index) => (
                <div key={index} className='editor-section'>


                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <label className='editor-label'>Position</label>
                      <input
                        placeholder='Software Engineer'
                        className='editor-input'
                        value={exp.position || ""}
                        onChange={e => updateArrayField('experience', index, 'position', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='editor-label'>Company</label>
                      <input
                        placeholder='Google'
                        className='editor-input'
                        value={exp.company || ""}
                        onChange={e => updateArrayField('experience', index, 'company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <label className='editor-label'>Start Data</label>
                      <input
                        placeholder='02/2022'
                        className='editor-input'
                        value={exp.startdate || ""}
                        onChange={e => updateArrayField('experience', index, 'startdate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='editor-label'>End Data</label>
                      <input
                        placeholder='06/2024'
                        className='editor-input'
                        value={exp.enddate || ""}
                        onChange={e => updateArrayField('experience', index, 'enddate', e.target.value)}
                      />
                    </div>
                  </div>

                  <label className='editor-label'>Description</label>

                  <TipTapEditor
                    value={exp.description}
                    onChange={value => updateArrayField('experience', index, 'description', value)}
                    features={['bold', 'italic', 'underline', 'bulletList', 'orderedList', 'link', 'enhanceWithAi']}
                    field={"experience"}
                    index={index}
                    itemKey={null}
                    text={exp.description}
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />

                  <button title='Remove' className='editor-removeButton' onClick={() => removeItem('experience', index)}><i className="fa-solid fa-delete-left"></i></button>
                </div>
              ))}

              <button
                className='editor-button'
                onClick={() =>
                  addItem('experience', {
                    position: '',
                    company: '',
                    startdate: '',
                    enddate: '',
                    description: '',
                  })
                }
              >
                + Add Experience
              </button>

              {/* Skills */}

              <EditableSectionTitle
                sectionKey="skills"
                resumeData={resumeData}
                setResumeData={setResumeData}
                rename={rename}
                setRename={setRename}
              />

              <div className='editor-tagInputWrapper'>
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className='editor-tag'>
                    {skill}
                    <button
                      title='Remove'
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className='editor-removeTagButton'
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </span>
                ))}
              </div>

              <label className='editor-label'>Skill</label>
              <div className='editor-inputRow'>
                <input
                  type="text"
                  value={skillInput || ""}
                  onChange={e => {
                    setSkillInput(e.target.value);
                    setDuplicateError(false); // clear error on typing
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Python"
                  className='editor-tagInput'
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className='editor-addButton'
                >
                  Add Skill
                </button>
              </div>

              {duplicateError && (
                <div className='editor-errorText'>Skill already added.</div>
              )}

              {/* Projects */}

              <EditableSectionTitle
                sectionKey="projects"
                resumeData={resumeData}
                setResumeData={setResumeData}
                rename={rename}
                setRename={setRename}
              />

              {resumeData.projects.map((project, index) => (
                <div key={index} className='editor-section'>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <label className='editor-label'>Project Name</label>
                      <input
                        placeholder='Portfolio Website'
                        className='editor-input'
                        value={project.name || ""}
                        onChange={e => updateArrayField('projects', index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='editor-label'>GitHub Link</label>
                      <input
                        className='editor-input'
                        placeholder='https://github.com/johndoe/portfolio'
                        value={project.github || ""}
                        onChange={e => updateArrayField('projects', index, 'github', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>

                    <label className='editor-label'>Tech Stack</label>

                    {/* Display Tech Stack as tags */}
                    <div className='editor-tagInputWrapper'>
                      {project.techStack.map((tech, i) => (
                        <div key={i} className='editor-tag'>
                          {tech}
                          <button
                            title='Remove'
                            className='editor-removeTagButton'
                            onClick={() => {
                              const newStack = project.techStack.filter((_, j) => j !== i);
                              updateArrayField('projects', index, 'techStack', newStack);
                            }}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className='editor-inputRow'>
                      <input
                        className='editor-tagInput'
                        placeholder="Javascript"
                        value={techInput || ""}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && techInput.trim()) {
                            e.preventDefault();
                            handleAddTechStack(project, index);
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => handleAddTechStack(project, index)}
                        className='editor-addButton'
                      >
                        Add Tech
                      </button>
                    </div>

                    <label className='editor-label'>Description</label>

                    <TipTapEditor
                      value={project.description}
                      onChange={value => updateArrayField('projects', index, 'description', value)}
                      features={['bold', 'italic', 'underline', 'bulletList', 'orderedList', 'link', 'enhanceWithAi']}
                      field={"project"}
                      index={index}
                      itemKey={null}
                      text={project.description}
                      resumeData={resumeData}
                      setResumeData={setResumeData}
                    />

                  </div>

                  <button title='Remove' className='editor-removeButton' onClick={() => removeItem('projects', index)}><i className="fa-solid fa-delete-left"></i></button>
                </div>
              ))}

              <button
                className='editor-button'
                onClick={() =>
                  addItem('projects', {
                    name: '',
                    description: '',
                    github: '',
                    techStack: []
                  })
                }
              >
                + Add Project
              </button>

              {/* Custom Sections */}

              {resumeData.customsections?.map((section, index) => (
                <div key={index} >
                  <h2 style={{ margin: '10px 0', fontSize: '21px' }}>
                    {section.title}
                    <span
                      title='Delete Section'
                      onClick={() => deleteCustomSection(index)}
                      style={{
                        cursor: 'pointer',
                        fontSize: '15px',
                      }}
                    >
                      <i className="fa-solid fa-trash" style={{ marginLeft: "10px" }}></i>
                    </span>
                  </h2>

                  {/* Simple section type */}
                  {section.type === "simple" && Object.entries(section.items).map(([key, item]) => (
                    <div key={key} style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                      <input
                        value={item || ""}
                        onChange={e => updateItem(section.id, key, e.target.value)}
                        placeholder="Item"
                        className='editor-input2'
                      />
                      <button
                        title='Remove'
                        className='editor-removeButton2'
                        onClick={() => removeItemFromSection(section.id, key)}
                      >
                        <i className="fa-solid fa-delete-left"></i>
                      </button>
                    </div>
                  ))}

                  {/* Detailed section type */}
                  {section.type !== "simple" && Object.entries(section.items).map(([key, item]) => (

                    <div key={key} className='editor-section'>

                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <div>
                          <label className='editor-label'>Title</label>
                          <input
                            value={item.title || ""}
                            onChange={e => updateItem(section.id, key, { title: e.target.value })}
                            placeholder="Title"
                            className='editor-input'
                          />
                        </div>
                        <div>
                          <label className='editor-label'>Link [If any]</label>
                          <input
                            value={item.link || ""}
                            onChange={e => updateItem(section.id, key, { link: e.target.value })}
                            placeholder="example.com"
                            className='editor-input'
                          />
                        </div>
                      </div>

                      <label className='editor-label'>Date [If necessary]</label>
                      <input
                        value={item.date || ""}
                        onChange={e => updateItem(section.id, key, { date: e.target.value })}
                        placeholder="2020 - 2025"
                        className='editor-input'
                      />

                      <label className='editor-label'>Description</label>
                      <TipTapEditor
                        value={item.description}
                        onChange={value => updateItem(section.id, key, { description: value })}
                        features={['bold', 'italic', 'underline', 'bulletList', 'orderedList', 'link', 'enhanceWithAi']}
                        field={"customsection"}
                        index={index}
                        itemKey={key}
                        text={item.description}
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />

                      <button
                        title='Remove'
                        className='editor-removeButton'
                        onClick={() => removeItemFromSection(section.id, key)}
                      >
                        <i className="fa-solid fa-delete-left"></i>
                      </button>
                    </div>
                  ))}

                  <button className='editor-addButton' onClick={() => addItemToSection(section.id)}>
                    + Add
                  </button>
                </div>
              ))}

              <div style={{ marginTop: "2rem", marginBottom: '3rem', padding: "20px", border: "1px solid #ddd", borderRadius: "4px" }}>
                <h3 style={{ marginTop: '0' }}><i className="fa-regular fa-square-plus icon3"></i> Custom Sections</h3>

                <div>
                  <label className='editor-label'>Section Name</label>
                  <input
                    type="text"
                    placeholder="Achievements"
                    value={newSectionTitle || ""}
                    onChange={e => setNewSectionTitle(e.target.value)}
                    className='editor-input'
                  />


                  <label className='editor-label'>Type</label>
                  <select
                    value={newSectionType}
                    onChange={e => setNewSectionType(e.target.value)}
                    className='editor-input'
                  >
                    <option className='editor-label' value="simple">Simple (List)</option>
                    <option className='editor-label' value="detailed">Detailed (Fields)</option>
                  </select>

                  <button
                    onClick={addCustomSection}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#0262A9",
                      color: "#fff",
                      border: "none",
                      marginTop: '10px',
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.75rem"
                    }}
                  >
                    + Add Section
                  </button>
                </div>
              </div>

            </div>
          )}

          {(!showForm || !isMobile) && (
            <div className='editor-previewSection'>
              {template ? (
                <>

                  <div className='editor-previewWrapper' ref={wrapperRef}>
                    <div className='editor-a4Scaled' style={{
                      zoom: zoomLevel,
                    }} >
                      <Resume template={template} resumeData={resumeData} />
                    </div>
                  </div>
                </>
              ) : (
                <p>Invalid template selected.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};


export default CreateResume;