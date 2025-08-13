import logo from "../../assets/transparent_logo_cropped.png";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-column">
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <h2><img src={logo} alt="Logo" className="logo" /> AI Resume Builder</h2>
                    </Link>
                    <p>Build smart.</p>
                    <p>Apply smarter.</p>
                    <p>Your AI-powered job companion.</p>
                </div>

                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link className='link' to="/">Home</Link></li>
                        <li><Link className='link' to="/check-resume-score">Check Resume Score</Link></li>
                        <li><Link className='link' to="/select-template">Create Resume</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Connect with Us</h4>
                    <div className="social-icons">
                        <a href="https://www.linkedin.com/in/mohammedkaif003/"><i className="fa-brands fa-linkedin fa-3x"></i></a>
                        <a href="https://github.com/MohammedKaif-3"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.instagram.com/kaif_shaik_7_8_6/"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                    <p>Email: airesumebuilder2025@gmail.com</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p><i className="fa-solid fa-heart"></i> Developed by <a href="https://mohammedkaif-3.github.io/Portfolio/" target="blank">Mohammed Kaif</a></p>
                <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
