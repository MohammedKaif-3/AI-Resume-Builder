import { useEffect, useMemo, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import './editor.css';
import './model.css'; // make sure to import modal styles
import axios from 'axios';

const LinkModal = ({ initialUrl, onSave, onClose }) => {
  const [url, setUrl] = useState(initialUrl || '');

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h4>Insert Link</h4>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{fontFamily:'Poppins'}}
          placeholder="https://example.com"
          autoFocus
        />
        <div className="modal-buttons">
          <button onClick={() => onSave(url)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const TipTapEditor = ({ value, onChange, features = [], field, index, itemKey, text, resumeData, setResumeData }) => {

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');

  const tones = [
    { name: 'Formal', desc: 'Polite and official.' },
    { name: 'Casual', desc: 'Relaxed and conversational.' },
    { name: 'Friendly', desc: 'Warm and approachable.' },
    { name: 'Professional', desc: 'Clear and confident.' },
    { name: 'Concise', desc: 'Brief and focused.' }
  ];

  const lineOptions = [2, 3, 4, 5, 6, 7];

  const [tone, setTone] = useState("Formal");
  const [lines, setLines] = useState(3);

  const [cooldown, setCooldown] = useState(0);
  const [cooldown2, setCooldown2] = useState(0);

  const [modelUsed, setModelUsed] = useState(null);

  const [state, setstate] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState({ index: null, state: false });
  const [isGenerating, setIsGenerating] = useState({ index: null, state: false });
  const [enhancePreview, setEnhancePreview] = useState({ index: null, text: null });

  const [error, setError] = useState(null);

  const extensions = useMemo(() => {
    const base = [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
    ];

    if (features.includes('underline')) base.push(Underline);
    if (features.includes('link')) base.push(Link);
    if (features.includes('bulletList') || features.includes('orderedList')) {
      base.push(BulletList, OrderedList, ListItem);
    }

    return base;
  }, [features]);

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      const updatedHtml = editor.getHTML();
      onChange(updatedHtml);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value]);

  const htmlToPlainText = (html) => {
    if (!html || typeof html !== 'string') return "";

    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  };

  const handleEnhance = async (value, onSuccess, index = null) => {
    if (!value?.trim()) {
      if (field == "profile") {
        setError('Write Summary to Enhance.');
      } else {
        setError('Write Description to Enhance.');
      }
      setIsEnhancing({ index, state: false });
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (cooldown2 > 0) return;

    setError(null); // Clear any previous error
    setstate(1);
    setIsEnhancing({ index, state: true });

    try {
      const res = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/build/enhance", {
        text: value,
      });

      if(res.data.modelUsed){
        setModelUsed(res.data.modelUsed)
      }

      if (res.data.rewritten) {
        onSuccess(res.data.rewritten); // store result using callback

        setCooldown2(25);
      }
    } catch (error) {
      console.error("Rewrite failed:", error);
      setError("Something went wrong. Please try again later.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsEnhancing({ index, state: false });
    }
  };

  const acceptEnhance = (field, index = null) => {
    if (field === "profile") {
      if (!enhancePreview.text) return;

      setResumeData(prev => ({ ...prev, profile: enhancePreview.text }));

    } else if (field === "project" && index !== null) {
      if (!enhancePreview.text || enhancePreview.index !== index) return;

      setResumeData(prev => {
        const updatedProjects = [...prev.projects];
        updatedProjects[index] = {
          ...updatedProjects[index],
          description: enhancePreview.text,
        };
        return { ...prev, projects: updatedProjects };
      });

    } else if (field === "experience" && index !== null) {
      if (!enhancePreview.text || enhancePreview.index !== index) return;

      setResumeData(prev => {
        const updatedExperience = [...prev.experience];
        updatedExperience[index] = {
          ...updatedExperience[index],
          description: enhancePreview.text,
        };
        return { ...prev, experience: updatedExperience };
      });

    } else if (field === "customsection" && index !== null && itemKey !== null) {
      if (enhancePreview.index !== index) return;

      setResumeData(prev => {
        const updatedSections = [...prev.customsections];
        const section = updatedSections[index];
        updatedSections[index] = {
          ...section,
          items: {
            ...section.items,
            [itemKey]: {
              ...section.items[itemKey],
              description: enhancePreview.text,
            }
          }
        };
        return { ...prev, customsections: updatedSections };
      });
    }

    setEnhancePreview({ index: null, text: null });
    setstate(0);
  };

  const cancelEnhance = () => {
    setEnhancePreview({ index: null, text: null });
    setstate(0);
  };

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (cooldown2 === 0) return;

    const timer = setInterval(() => {
      setCooldown2((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown2]);


  const handleGenerate = async (value) => {
    const isEducationEmpty =
      !Array.isArray(value.education) || // Not an array or missing
      value.education.length === 0 || // Empty array
      !value.education.some(item =>
        typeof item === 'object' &&
        item.degree?.trim() &&
        item.field?.trim()
      );

    const isSkillsEmpty =
      !Array.isArray(value.skills) || // Not an array or missing
      value.skills.length === 0 || // Empty array
      value.skills.every(item =>
        typeof item !== 'object' || Object.keys(item).length === 0
      );

    if (cooldown > 0) return;

    if (isEducationEmpty && isSkillsEmpty) {
      setError('Add Education and Skills sections to generate a meaningful summary. More sections make it even stronger.');
      setTimeout(() => setError(null), 4000);
      return;
    }


    const data = { ...value };

    setstate(2);
    setIsGenerating({ index: null, state: true });
    const keysToDelete = [
      "filename", "customsections", "phone", "linkedin", "github", "_id", "userId",
      "email", "website", "profileimg", "resumelineheight", "theme", "updatedAt",
      "sectionnames", "template", "profile", "firstname", "lastname", "createdAt", "__v"
    ];

    for (const key of keysToDelete) {
      delete data[key];
    }

    try {
      const res = await axios.post("https://ai-resume-builder-backend-jw1g.onrender.com/api/build/generate", {
        data, tone, lines
      });

      if(res.data.modelUsed){
        setModelUsed(res.data.modelUsed)
      }

      if (res.data.generatedText) {
        // console.log(res.data.generatedText)
        enhancePreview.text = res.data.generatedText;

        setCooldown(25);
      }
    } catch (error) {
      console.error("Rewrite failed:", error);
      setError("Something went wrong. Please try again later.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsGenerating({ index: null, state: false });
    }
  }

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <div className="editor-toolbar">
          <div className='tools'>
            {features.includes('bold') && (
              <button
                title='Bold'
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'active' : ''}
              >
                <i className="fa-solid fa-bold"></i>
              </button>
            )}
            {features.includes('italic') && (
              <button
                title='Italic'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'active' : ''}
              >
                <i className="fa-solid fa-italic"></i>
              </button>
            )}
            {features.includes('underline') && (
              <button
                title='Underline'
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'active' : ''}
              >
                <i className="fa-solid fa-underline"></i>
              </button>
            )}
            {features.includes('bulletList') && (
              <button
                title='Bullet List'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'active' : ''}
              >
                <i className="fa-solid fa-list-ul"></i>
              </button>
            )}
            {features.includes('orderedList') && (
              <button
                title='Ordered List'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'active' : ''}
              >
                <i className="fa-solid fa-list-ol"></i>
              </button>
            )}
            {features.includes('link') && (
              <button
                title='Link'
                onClick={() => {
                  const previousUrl = editor.getAttributes('link').href;
                  setSelectedLink(previousUrl || '');
                  setShowLinkModal(true);
                }}
                className={editor.isActive('link') ? 'active' : ''}
              >
                <i className="fa-solid fa-link"></i>
              </button>
            )}
          </div>

          {features.includes('generateWithAi') && (
            <div className="ai-controls">
              <select
                title="Tone"
                value={tone}
                className="ai-controls-select"
                onChange={(e) => setTone(e.target.value)}
              >
                {tones.map((t) => (
                  <option
                    key={t.name}
                    value={t.name}
                    title={t.desc}  // tooltip shows the description
                    className="ai-controls-option"
                  >
                    {t.name}
                  </option>
                ))}
              </select>

              <select title='No. of Lines' value={lines} className='ai-controls-select' onChange={(e) => setLines(Number(e.target.value))}>
                {lineOptions.map((n) => (
                  <option className='ai-controls-option' key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          )}

        </div>

        <EditorContent editor={editor} className="editor-content" spellCheck={true} />

        {field === "profile" ?
          <>
            {/* Preview Modal */}
            {enhancePreview.text && (
              <div style={{
                margin: '0',
                marginTop: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                border: "2px solid #ccc",
                borderRadius: "1px",
                fontFamily: "Poppins",
                fontSize: "10px",
                transition: "all 0.3s ease",
                padding: "10px 16px",
              }}>
                <h4 style={{ marginTop: '5px', marginBottom: '5px' }}>
                  {state === 1 && (
                    <>
                      <i className="fa-solid fa-wand-magic-sparkles"></i> Enhanced Summary
                    </>
                  )}
                  {state === 2 && (
                    <>
                      <i className="fa-solid fa-brain"></i> Generated Summary
                    </>
                  )}
  
                </h4>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{enhancePreview.text}</p>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button onClick={() => acceptEnhance("profile")} style={styles.acceptBtn}>
                    <i className="fa-solid fa-check"></i> Accept</button>
                  <button onClick={() => cancelEnhance()} style={styles.cancelBtn}>
                    <i className="fa-solid fa-xmark"></i> Reject</button>
                </div>
              </div>
            )}

            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", justifyContent: 'space-between', gap: "8px" }}>
              {features.includes('enhanceWithAi') && (
                <button
                  disabled={isEnhancing.state || cooldown2 > 0}
                  onClick={() => {
                    if (cooldown2 > 0) return;  // prevent if cooldown active

                    const plainText = htmlToPlainText(resumeData.profile);
                    handleEnhance(plainText, (enhancedText) => {
                      setEnhancePreview({ index: null, text: enhancedText });
                    }, null);

                  }}
                  style={{
                    padding: "7px 9px",
                    fontSize: "10px",
                    fontFamily: "Poppins",
                    borderRadius: "3px",
                    cursor: (isEnhancing.state || cooldown2 > 0) ? "not-allowed" : "pointer",
                  }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  {isEnhancing.state
                    ? " Enhancing..."
                    : cooldown2 > 0
                      ? ` Please wait ${cooldown2}s`
                      : " Enhance with AI"}
                </button>

              )}

              {features.includes('generateWithAi') && (
                <button
                  onClick={() => handleGenerate(resumeData)}
                  disabled={isGenerating.state || cooldown > 0}
                  style={{
                    margin: '0',
                    padding: "7px 9px",
                    fontSize: "10px",
                    fontFamily: "Poppins",
                    borderRadius: "3px",
                    cursor: isGenerating.state || cooldown > 0 ? "not-allowed" : "pointer",
                  }}
                >
                  <i className="fa-solid fa-brain"></i>
                  {isGenerating.state
                    ? " Generating..."
                    : cooldown > 0
                      ? ` Please wait ${cooldown}s`
                      : " Generate with AI"}
                </button>

              )}
            </div>
          </>
          :
          <>
            {/* Preview Modal */}
            {enhancePreview.index === index && enhancePreview.text && (
              <div style={{
                background: "#fff",
                border: "2px solid #ccc",
                borderRadius: "1px",
                fontFamily: "Poppins",
                fontSize: "10px",
                padding: "10px 16px",
                boxShadow: "0 10px 18px rgba(0,0,0,0.15)"
              }}>
                <h4 style={{ marginTop: '5px', marginBottom: '5px' }}>
                  <i className="fa-solid fa-wand-magic-sparkles"></i> Enhanced Description</h4>
                <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{enhancePreview.text}</p>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button onClick={() => acceptEnhance(field, index)} style={styles.acceptBtn}>
                    <i className="fa-solid fa-check"></i> Accept</button>
                  <button onClick={() => cancelEnhance()} style={styles.cancelBtn}>
                    <i className="fa-solid fa-xmark"></i> Reject</button>
                </div>
              </div>
            )}

            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", justifyContent: 'space-between', gap: "8px" }}>
              {features.includes('enhanceWithAi') && (
                <button
                  disabled={(isEnhancing.state && isEnhancing.index === index) || cooldown2 > 0}
                  onClick={() => {
                    if (cooldown2 > 0) return;  // prevent if cooldown active

                    handleEnhance(htmlToPlainText(text), (enhancedText) =>
                      setEnhancePreview({ index, text: enhancedText }), index
                    );

                  }}
                  style={{
                    padding: "7px 9px",
                    fontSize: "10px",
                    fontFamily: "Poppins",
                    borderRadius: "3px",
                    cursor:
                      (isEnhancing.state && isEnhancing.index === index) || cooldown2 > 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  {isEnhancing.state && isEnhancing.index === index
                    ? " Enhancing..."
                    : cooldown2 > 0
                      ? ` Please wait ${cooldown2}s`
                      : " Enhance with AI"}
                </button>

              )}

            </div>
          </>
        }
        {error && <p style={{
          color: "grey",
          margin: '0',
          marginTop: '10px',
          fontFamily: "Poppins",
          fontSize: '11px',
        }}>
          <i className="fa-solid fa-circle-exclamation"></i>
          {" " + error}</p>}
      </div>

      {showLinkModal && (
        <LinkModal
          initialUrl={selectedLink}
          onSave={(url) => {
            if (url.trim() === '') {
              editor.chain().focus().unsetLink().run();
            } else {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
            setShowLinkModal(false);
          }}
          onClose={() => setShowLinkModal(false)}
        />
      )}
    </div>
  );
};

const styles = {

  acceptBtn: {
    padding: "6px 12px",
    fontSize: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    color: '#444',
    fontWeight: '500',
    gap: '5px',
    borderRadius: "3px",
    fontFamily: "Poppins",
    border: "1px dotted #4caf50",
    cursor: "pointer"
  },
  cancelBtn: {
    padding: "6px 12px",
    color: '#444',
    fontWeight: '500',
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    gap: '5px',
    fontSize: '10px',
    fontFamily: "Poppins",
    borderRadius: "3px",
    border: "1px dotted #f44336",
    cursor: "pointer"
  },
}

export default TipTapEditor;
