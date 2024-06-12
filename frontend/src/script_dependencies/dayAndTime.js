import { format, getHours } from 'date-fns';


// Get day and time greetings
const dayAndTime = () => {
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

export default dayAndTime