import { format, getHours } from 'date-fns';
import HideSideNav from "../components/script_dependencies/HideSideNav";
import avatar from '../images/martoms-transparent.svg'

const Home = () => {

    // Get day and time greetings
    const getCurrentDayAndTimeOfDay = () => {
        const now = new Date();
      
        // Get the current day
        const day = format(now, 'EEEE'); 
      
        // Get the current hour
        const hour = getHours(now);
      
        // Determine the time of day
        let timeOfDay;
        if (hour < 12) {
          timeOfDay = 'morning';
        } else if (hour === 12) {
          timeOfDay = 'noon';
        } else if (hour > 12 && hour < 17) {
          timeOfDay = 'afternoon';
        } else {
          timeOfDay = 'evening';
        }
      
        return { day, timeOfDay };
    }
      
    // Usage example
    const { day, timeOfDay } = getCurrentDayAndTimeOfDay();

    return ( 
        <div className="container main home" onClick={HideSideNav}>
            <div className="row">
                <div className="col day-greetings">
                    <p>Good { timeOfDay }, have a happy { day }!</p>
                </div>
                <div className="col image-col">
                    <div className="img-container">
                        <img src={avatar} alt="avatar" />
                    </div>
                </div>
                <div className="col name-col">
                    <div className="name">
                        <p>Marjohn</p>
                        <p>Tomatao</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;