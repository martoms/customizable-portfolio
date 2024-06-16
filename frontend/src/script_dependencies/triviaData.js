import correctIcon from '../images/correct.svg';
import wrongIcon from '../images/wrong.svg';
import he from 'he';

const triviaData = (category, showThoughts, trivCat, score, mistake, question, triviaOpt) => {
    
    return {
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
    };
}
 
export default triviaData;