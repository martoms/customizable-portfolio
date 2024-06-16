import { useEffect, useState } from 'react';
import hideSideNav from '../script_dependencies/hideSideNav';
import avatar from '../images/martoms-transparent.svg';
import dayAndTime from '../script_dependencies/dayAndTime';
import name from '../images/name-logo.svg';
import HomeNav from '../components/home/HomeNav';
import callout from '../images/callout.svg';
import Title from '../components/home/Title';
import Modal1 from '../components/modals/Modal1';
import ellipsis from '../images/ellipse-dots.gif'
import gear from '../images/gear.svg';
import Settings from '../components/modals/Settings';
import he from 'he';
import { Button } from 'react-bootstrap';
import correctIcon from '../images/correct.svg';
import wrongIcon from '../images/wrong.svg';
import HomeSettings from '../components/home/HomeSettings';
import currentBG from '../script_dependencies/currentBG';

const Home = () => {
    
    // for day greetings
    const { day, timeOfDay } = dayAndTime();

    // for title
    const [currentText, setCurrentText] = useState('');
    const [showCallout, setShowCallout] = useState(false);
    const [showThoughts, setShowThoughts] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [quote, setQuote] = useState({});
    const [joke, setJoke] = useState({});
    const [trivia, setTrivia] = useState({});
    const [options, setOptions] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [mistake, setMistake] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const [category, setCategory] = useState('quotes');
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
    }, [incorrect, correct])
    
    const verifyAnswer = (e) => {
        if (!showAnswer) {
            e.target.classList.add('active')
            setShowAnswer(true);
            const selected = e.target.innerHTML;
            const choices = document.querySelectorAll('.trivias li');
            choices.forEach(choice => {
                const value = choice.innerHTML;

                if (value === selected && value === correct) {
                    choice.classList.add('correct')
                } else if (value === selected && value !== correct) {
                    choice.classList.add('wrong')
                } else if (value !== selected && value === correct) {
                    choice.classList.add('greyedout')
                    choice.classList.add('right')
                } else {
                    choice.classList.add('greyedout')
                }
            })

            if (selected === correct) {
                setScore(score + 1);
            } else {
                setMistake(mistake + 1);
            }
        }
    }

    useEffect(() => {
        if (!showThoughts) setShowAnswer(false)
    }, [showThoughts])

    const triviaOpt = options?.map((opt, k) => (
        <li key={k} onClick={(e) => verifyAnswer(e)}>
            { category === 'trivias' && showThoughts && he.decode(opt) }
        </li>
    ))

    const triviaData = {
        title: (
            <div className="category">
                { category === 'trivias' && showThoughts && he.decode(trivCat) }
            </div>
        ),
        body: (
            <div className="trivias">
                <div className="stat">
                    <div className="score">
                        <img src={correctIcon} alt="correct icon" />{ score }
                    </div>
                    <div className="mistake">
                        <img src={wrongIcon} alt="wrong icon" />{ mistake }
                    </div>
                </div>
                <div className="question">
                    { category === 'trivias' && showThoughts && he.decode(question) }
                </div>
                <ul>
                    { triviaOpt }
                </ul>
            </div>
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

    return ( 
        <div className="container main home" onClick={hideSideNav}>
            <img src={gear} alt="gear icon" onClick={() => setShowSettings(true)} />
            <div className="bg">
                <img id="illustration" src={currentBG(currentText)} alt="background illustration" />
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
                    <h5>
                        {`Hi, I am a `}
                        <Title setCurrentText={ setCurrentText } />
                    </h5>
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
                form={ HomeSettings(category, setCategory) }
            />
        </div>
    );
}
 
export default Home;
