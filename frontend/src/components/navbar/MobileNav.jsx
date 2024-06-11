import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavToggle from '../script_dependencies/NavToggle';
import navLogo from '../../images/MT.svg';

const MobileNav = () => {
    return ( 
        <Navbar id="navbar" className="navbar d-md-none fixed-top">
            {/* Collapse button */}
            <button className="navbar-toggler hamburger-button" type="button" onClick={NavToggle} style={{ zIndex: 10 }}>
                <div className="animated-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>


            {/* Navbar brand */}
            <div className="ms-auto">
            <Link className="navbar-brand" to="/">
                <img src={navLogo} alt="logo" id="logo" />
            </Link>
            </div>
        </Navbar>
    );
}


export default MobileNav;