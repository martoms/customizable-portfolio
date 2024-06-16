/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import Typed from 'typed.js';

const Title = ({ setCurrentText }) => {
    const titleRef = useRef(null);

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

    return ( 
        <span className="title" ref={titleRef} />
    );
}
 
export default Title;