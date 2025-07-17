import { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/transparent_logo_cropped.png";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";


const Navbar = () => {

    const { isLoggedIn } = useContext(AppContext);

    return (
        <nav className="navbar">
            <Link to={'/'} style={{textDecoration: 'none'}}><div className="navbar-left">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="title">AI Resume Builder</h1>
            </div></Link>

            {isLoggedIn ?
                <Link to="/account" className="login-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Account
                </Link>
                :
                <Link to="/login" className="login-btn">Login</Link>
            }


        </nav>
    );
};

export default Navbar;
