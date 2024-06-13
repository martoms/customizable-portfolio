import { useRef, useEffect, useState } from "react";
import hideSideNav from "../script_dependencies/hideSideNav";
import avatar from '../images/martoms-transparent.svg';
import dayAndTime from "../script_dependencies/dayAndTime";
import name from '../images/name-logo.svg';
import Typed from 'typed.js';
import HomeNav from "../components/home/HomeNav";
import dev from '../images/dev-bg.svg';
import designer from '../images/designer-bg.svg';
import callout from '../images/callout.svg';
import Modal1 from "../components/Modal1";
import getQuote from "../script_dependencies/getQuote";

const Home = () => {
    
    // for day greetings
    const { day, timeOfDay } = dayAndTime();

    // for title
    const titleRef = useRef(null);
    const [currentText, setCurrentText] = useState('');
    const [showCallout, setShowCallout] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quote, setQuote] = useState('');
    const [err, setErr] = useState('');

    // for callout
    useEffect(() => {
        setTimeout(() => {
            setShowCallout(true);
        }, 7000)
    }, [])

    // for Modal
    const handleShowModal = () => {
        // getQuote(setQuote, setErr);
        setShowModal(true);
        if (showCallout === true) setShowCallout(false);
    };

    // console.log('quote', quote)
    // console.log('err', err)

    const modalData = {
        title: 'Title goes here',
        body: 'the body'
    }


    // for Title
    useEffect(() => {
        const title = new Typed(titleRef.current, {
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
          title.destroy();
        };
    }, []);

    // for background change
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
                        {
                            showCallout &&
                            <div className="callout">
                                <p>Click Me!</p>
                                <img src={ callout } alt="callout" />
                            </div>
                        }
                        <img src={avatar} alt="avatar" onClick={ handleShowModal } />
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
                    <h5>Hi, I am a <span className="title" ref={titleRef} /></h5>
                </div>
            </div>
            <div className="selection"></div>
            <HomeNav />
            <Modal1
                showModal={ showModal }
                setShowModal = { setShowModal }
                modalData ={ modalData }
            />
        </div>
    );
}
 
export default Home;
