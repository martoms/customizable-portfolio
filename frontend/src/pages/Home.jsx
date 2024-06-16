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
import Modal1 from '../components/modals/Modal1';
import ellipsis from '../images/ellipse-dots.gif'
import gear from '../images/gear.svg';
import Settings from '../components/modals/Settings';
import he from 'he';
import { Button, Form } from 'react-bootstrap';

const Home = () => {
    
    // for day greetings
    const { day, timeOfDay } = dayAndTime();

    // for title
    const titleRef = useRef(null);
    const [currentText, setCurrentText] = useState('');
    const [showCallout, setShowCallout] = useState(false);
    const [showThoughts, setShowThoughts] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [quote, setQuote] = useState({});
    const [joke, setJoke] = useState({});
    const [trivia, setTrivia] = useState({});
    const [options, setOptions] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [category, setCategory] = useState('trivias');
    const [ask, setAsk] = useState(false);
    const server= import.meta.env.VITE_REACT_API_URL;


    // for callout
    useEffect(() => {
        setTimeout(() => {
            setShowCallout(true);
        }, 7000)
    }, [])

    // for Thoughts on click
    const handleShowThoughts = () => {
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
                    case 'trivias': setTrivia(data);
                        break;
                }
                setShowCallout(false);
                setShowThoughts(true);
                setIsPending(false);
            })
            .catch(err => console.log(err.message))
    };

    const loading = (
        <img src={ellipsis} alt='loading' />
    )

    // for quotes
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

    // for jokes
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
                            <Button variant='secondary' disabled>{ delivery }</Button>
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

    // for trivias
    const {
        category: trivCat,
        question,
        correct_answer: correct,
        incorrect_answers: incorrect
    } = trivia

    useEffect(() => {
        if (incorrect) {
            let opts = [...incorrect, correct];
    
            for (let i = opts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [opts[i], opts[j]] = [opts[j], opts[i]];
            }

            setOptions(opts)
        }
    }, [incorrect])
    

    const triviaOpt = options?.map((opt, k) => (
        <li key={k}>
            {opt}
        </li>
    ))

    const triviaData = {
        title: showThoughts && he.decode(trivCat),
        body: (
            <>
                <div className="trivias">
                    <div className="question">
                        { showThoughts && he.decode(question) }
                    </div>
                </div>
                <ul>
                    { triviaOpt }
                </ul>
            </>
        ),
        attrib: (
            <div className="attribution">
                Trivia questions provided by <a href="https://opentdb.com/" target="_blank">Open Trivia Database</a>
            </div>
        )
    }

    // for thoughts modal data
    const modalData = () => {
        switch (category) {
            case 'quotes': return quoteData;
            case 'jokes': return jokeData;
            case 'trivias': return triviaData;
        }
    }

    // for settings
    const form = (
        <div>
            <p>Choose what you want me to say:</p>
            <Form>
                <Form.Check 
                    name='category'
                    id='quotesOpt' 
                    type='radio' 
                    label='Quotes'
                    onChange={() => setCategory('quotes')}
                    checked={category === 'quotes'}
                />
                <Form.Check 
                    name='category'
                    id='jokesOpt' 
                    type='radio' 
                    label='Jokes'
                    onChange={() => setCategory('jokes')}
                    checked={category==='jokes'}
                />
            </Form>
        </div>
    )

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
            <img src={gear} alt="gear icon" onClick={() => setShowSettings(true)} />
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
                        <img src={avatar} alt="avatar" onClick={ handleShowThoughts } />
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
                showModal={ showThoughts }
                setShowModal={ setShowThoughts }
                modalData={ modalData() }
            />
            <Settings
                showModal={ showSettings }
                setShowModal={ setShowSettings }
                form={ form }
            />
        </div>
    );
}
 
export default Home;
