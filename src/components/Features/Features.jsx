import './Features.css';

const Features = () => {
    return (
        <section className="features-section">
            <div className="container3">
                <h2 className="section-title">Why Choose Our Resume Builder?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="fa-solid fa-wand-magic-sparkles feature-icon"></i>
                        <h3>AI-Powered Suggestions</h3>
                        <p>Receive personalized resume feedback in real-time to help you stand out.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-file-alt feature-icon"></i>
                        <h3>Multiple Templates</h3>
                        <p>Choose from 13 expertly designed, ATS-friendly resume templates.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-palette feature-icon"></i>
                        <h3>25 Theme Colors</h3>
                        <p>Instantly switch between 25 beautiful themes to match your style.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-download feature-icon"></i>
                        <h3>One-Click Export</h3>
                        <p>Download your resume instantly as PDF — no hassle, no delay.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-toolbox feature-icon"></i>
                        <h3>Custom Sections</h3>
                        <p>Add projects, certifications, awards, or any custom information.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-eye feature-icon"></i>
                        <h3>Real-Time Preview</h3>
                        <p>See your resume update live while you build — no more guessing.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
