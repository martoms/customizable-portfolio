import { useRef, useEffect } from "react";
import hideSideNav from "../script_dependencies/hideSideNav";
import avatar from '../images/martoms-transparent.svg'
import dayAndTime from "../script_dependencies/dayAndTime";
import name from '../images/name-logo.svg';
import Typed from 'typed.js';
import HomeNav from "../components/home/HomeNav";

const Home = () => {
    
    // for day greetings
    const { day, timeOfDay } = dayAndTime();

    // for title
    const el = useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
          strings: ['Programmer', 'Graphic Designer'],
          startDelay: 500,
          typeSpeed: 100,
          backDelay: 3000,
          backSpeed: 100,
          loop: true,
          loopCount: Infinity,
        });
    
        return () => {
          typed.destroy();
        };
      }, []);

    return ( 
        <div className="container main home" onClick={hideSideNav}>
            <div className="row">
                <div className="col day-greetings">
                    <p>Good { timeOfDay },</p>
                    <p>have a happy { day }!</p>
                </div>
            </div>
            <div className="row">
                <div className="col image-col">
                    <div className="img-container">
                        <img src={avatar} alt="avatar" />
                    </div>
                </div>
                <div className="col name-col">
                    <div className="img-container">
                        <img src={name} alt="name and logo" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col title-col">
                    <h5>Hi, I am a <span ref={el} /></h5>
                </div>
            </div>
            <HomeNav />
        </div>
    );
}
 
export default Home;