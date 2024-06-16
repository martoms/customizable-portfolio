import dev from '../images/dev-bg.svg'
import designer from '../images/designer-bg.svg';


const currentBG = (currentText) => {
    const illustration = document.querySelector('#illustration');
    if (currentText === 'Programmer') {
        illustration.style.mixBlendMode = 'color-dodge';
        return dev;
    }

    if (currentText === 'Graphic Designer') {
        illustration.style.mixBlendMode = 'overlay';
        return designer;
    }

    return dev;
}

export default currentBG