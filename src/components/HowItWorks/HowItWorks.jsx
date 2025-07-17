import './HowItWorks.css';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate('/select-template'); // Update path based on your route
  };

  return (
    <section className="how-it-works-section">
      <h2 className="how-title">How It Works</h2>
      <div className="how-steps">
        <div className="how-step">
          <i className="fas fa-user-edit how-icon"></i>
          <h3>Step 1</h3>
          <p>Enter your personal and professional details using our smart editor.</p>
        </div>
        <div className="how-step">
          <i className="fas fa-file-alt how-icon"></i>
          <h3>Step 2</h3>
          <p>Select a resume template and customize the design and layout.</p>
        </div>
        <div className="how-step">
          <i className="fas fa-download how-icon"></i>
          <h3>Step 3</h3>
          <p>Download your polished resume instantly as a professional PDF.</p>
        </div>
      </div>

      <div className="how-cta-wrapper">
        <button className="how-cta-btn" onClick={handleCTA}>
          <i className="fas fa-rocket"></i> Create My Resume
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
