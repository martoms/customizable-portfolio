import { Link } from "react-router-dom";

const SideNav = () => {

    return ( 
        <div className="row">
            <div className="col-1 d-md-none d-flex justify-content-center">
                <div id="mySidenav" className="sidenav">
                    <Link className="sidenav-btn" to="/">Home</Link>
                    <hr />
                    <div className="navgroups">
                        <p className="sidenav-btn">Web Development</p>
                        <Link className="sidenav-btn" to="/projects/web-development">Projects</Link>
                        <Link className="sidenav-btn" to="/skills/web-development">Skills</Link>
                    </div>
                    <hr />
                    <div className="navgroups">
                        <p className="sidenav-btn">Graphic Design</p>
                        <Link className="sidenav-btn" to="/projects/graphic-design">Projects</Link>
                        <Link className="sidenav-btn" to="/skills/graphic-design">Skills</Link>
                    </div>
                    <hr />
                    <Link className="sidenav-btn" to="/about">About</Link>
                    <Link className="sidenav-btn" to="/contact">Contact</Link>
                </div>
            </div>
        </div>
    );
}
 
export default SideNav;