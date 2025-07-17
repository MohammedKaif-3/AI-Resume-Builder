import "./HeroSection.css";
import img from "../../assets/transparent_logo.png";
import { Link } from "react-router-dom";

const HeroSection = () => {

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Build Your Perfect Resume with AI</h1>
        <p>Create a professional resume in minutes with AI-powered suggestions.</p>
        <Link to={'/select-template'} className="cta-btn">Create Resume</Link>
        <Link to={'/check-resume-score'} className="cta-btn2">Check Resume Score</Link>
      </div>
      <div className="hero-image">
        <img src={img} alt="AI Resume Builder" />
      </div>
    </section>
  );
};

export default HeroSection;
