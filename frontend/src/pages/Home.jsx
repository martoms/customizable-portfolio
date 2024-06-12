import { useRef, useEffect, useState } from "react";
import hideSideNav from "../script_dependencies/hideSideNav";
import avatar from '../images/martoms-transparent.svg';
import dayAndTime from "../script_dependencies/dayAndTime";
import name from '../images/name-logo.svg';
import Typed from 'typed.js';
import HomeNav from "../components/home/HomeNav";
import dev from '../images/dev-bg.svg';
import designer from '../images/designer-bg.svg';

const Home = () => {
    
    // for day greetings
    const { day, timeOfDay } = dayAndTime();

    // for title
    const el = useRef(null);
    const [currentText, setCurrentText] = useState('');

    useEffect(() => {
        const typed = new Typed(el.current, {
          strings: ['Programmer', 'Graphic Designer'],
          startDelay: 500,
          typeSpeed: 100,
          backDelay: 3000,
          backSpeed: 100,
          loop: true,
          loopCount: Infinity,
          onStringTyped: (arrayPos, self) => {
              setCurrentText(self.strings[arrayPos]);
          },
        });
    
        return () => {
          typed.destroy();
        };
    }, []);

    const currentBG = () => {
        const illustration = document.querySelector('#illustration');
        if (currentText === 'Programmer') {
            illustration.style.mixBlendMode = 'color-dodge'
            return dev;
        }

        if (currentText === 'Graphic Designer') {
            illustration.style.mixBlendMode = 'overlay'
            return designer;
        }

        return dev;
    }

    return ( 
        <div className="container main home" onClick={hideSideNav}>
            <div className="bg">
                <img id="illustration" src={currentBG()} alt="background illustration" />
            </div>
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
                    <h5>Hi, I am a <span className="title" ref={el} /></h5>
                </div>
            </div>
            <div className="selection"></div>
            <HomeNav />
        </div>
    );
}
 
export default Home;
