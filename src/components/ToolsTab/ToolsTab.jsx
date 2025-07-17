import './ToolsTab.css';
import { useNavigate } from 'react-router-dom';
import { FaClipboardCheck } from 'react-icons/fa';

const ToolsTab = () => {
  const navigate = useNavigate();

  return (
    <div className="tools-tab-container">
      <h2 className="tabs-heading">Resume Tools</h2>

      <div className="tool-card">
        <div className="tool-icon">
          <FaClipboardCheck size={25} color="#4a90e2" />
        </div>
        <div className="tool-info">
          <h3>Resume Checker</h3>
          <p>
            Analyze your resume for structure, grammar, ATS compliance, and keyword optimization.
            Get feedback to improve your chances of getting noticed.
          </p>
          <button onClick={() => navigate('/check-resume-score')} className="tool-btn">
            Check Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolsTab;
