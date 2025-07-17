import './ResumeScoringSection.css';
import { useNavigate } from 'react-router-dom';

const ResumeScoringSection = () => {
  const navigate = useNavigate();

  return (
    <section className="scoring-section">
      <div className="scoring-content">
        <h2 className="scoring-title">Get Instant Resume Feedback</h2>
        <p className="scoring-subtitle">
          Our smart resume scoring system analyzes your content and structure to provide instant feedback — making sure your resume is ATS-friendly and ready to impress.
        </p>

        <ul className="scoring-list">
          <li><i className="fas fa-check-circle"></i> Highlights missing or weak sections</li>
          <li><i className="fas fa-bullseye"></i> Rates resume strength out of 100</li>
          <li><i className="fas fa-lightbulb"></i> Offers improvement tips</li>
          <li><i className="fas fa-robot"></i> Powered by AI & industry best practices</li>
        </ul>

        <button className="scoring-cta-btn" onClick={() => navigate('/check-resume-score')}>
          <i className="fas fa-search"></i> Check My Resume Score
        </button>
      </div>
    </section>
  );
};

export default ResumeScoringSection;
