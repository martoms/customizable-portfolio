import { useRef, useEffect, useState } from 'react';
import hideSideNav from '../script_dependencies/hideSideNav';
import avatar from '../images/martoms-transparent.svg';
import dayAndTime from '../script_dependencies/dayAndTime';
import name from '../images/name-logo.svg';
import Typed from 'typed.js';
import HomeNav from '../components/home/HomeNav';
import dev from '../images/dev-bg.svg';
import designer from '../images/designer-bg.svg';
import callout from '../images/callout.svg';
import Modal1 from '../components/Modal1';
import ellipsis from '../images/ellipse-dots.gif'
import gear from '../images/gear.svg';
import { Button } from 'react-bootstrap';

const Home = () => {
    
    // for day greetings
    const { day, timeOfDay } = dayAndTime();

    // for title
    const titleRef = useRef(null);
    const [currentText, setCurrentText] = useState('');
    const [showCallout, setShowCallout] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quote, setQuote] = useState('');
    const [joke, setJoke] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [category, setCategory] = useState('jokes');
    const [ask, setAsk] = useState(false);
    const server= import.meta.env.VITE_REACT_API_URL;


    // for callout
    useEffect(() => {
        setTimeout(() => {
            setShowCallout(true);
        }, 7000)
    }, [])

    // for Modal
    const handleShowModal = () => {
        setIsPending(true);
        setAsk(false);
        setShowCallout(true);
        fetch(`${server}/${category}`)
            .then(res => res.json())
            .then(data => {
                switch (category) {
                    case 'quotes': setQuote(data);
                        break;
                    case 'jokes': setJoke(data);
                        break;
                }
                setShowCallout(false);
                setShowModal(true);
                setIsPending(false);
            })
            .catch(err => console.log(err.message))
    };

    const loading = (
        <img src={ellipsis} alt='loading' />
    )

    const {
        a: author,
        q: quoteText
    } = quote

    const quoteData = {
        body: (
            <div className="quotes">
                <p>{ quoteText }</p>
                <p>{ author }</p>
            </div>
        ),
        attrib: (
            <div className="attribution">
                Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a>
            </div>
        )
    }

    const {
        type,
        joke: jokeText,
        setup,
        delivery
    } = joke


    const jokeData = {
        body: (
            <div className="jokes">
                {
                    type === 'single' ?
                    <div className="single">
                        <p>{ jokeText }</p>
                    </div>
                    :
                    <div className="twoparts">
                        <p>{ setup }</p>
                        {
                            !ask ? <Button onClick={() => setAsk(true)}>Tell me!</Button> :
                            <Button disabled>{ delivery }</Button>
                        }
                    </div>
                }
            </div>
        ),
        attrib: (
            <div className="attribution">
                Jokes provided by <a href="https://v2.jokeapi.dev/" target="_blank">JokeAPI</a>
            </div>
        )
    }

    const modalData = () => {
        switch (category) {
            case 'quotes': return quoteData;
            case 'jokes': return jokeData;
        }
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
            <img src={gear} alt="gear icon" />
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
                                {
                                    !isPending ?
                                    <p>Click Me!</p>
                                    :
                                    loading
                                }
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
                modalData = { modalData() }
            />
        </div>
    );
}
 
export default Home;
