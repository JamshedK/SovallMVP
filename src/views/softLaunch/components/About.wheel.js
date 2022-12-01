import React, { useState } from 'react';
import person_1 from '../assets/person_1.png';
import person_2 from '../assets/person_2.png';
import person_3 from '../assets/person_3.png';
import person_4 from '../assets/person_4.png';

const Wheel = (props) => {
    const [degree, setdegree] = useState(0);
    const rotateWheelOnClick = (e) => {
        setdegree((prevRotation) => prevRotation + 90);
        props.handleClick();
    };

    const wheelR = 'rotate(' + degree + 'deg)';
    const picR = 'rotate(-' +degree + 'deg)';

    const wheelRotation = {
        transform: wheelR,
    };

    const picRotation = {
        transform: picR,
    };

    
    const founders_data = [[person_1, "right-0", 0], [person_2, "top-0",1], [person_3, "left-0",2], [person_4, "bottom-0",3]];
    let pic_style =""
    const founders = founders_data.map(data => {
        const index = founders_data.indexOf(data);
        if (index === props.current) {
            pic_style = "absolute transition ease-in-out hover:scale-125 duration-500 h-30% w-30% dropshadow-2xl rounded-full z-50 ";
        } else {
            pic_style = "absolute transition ease-in-out hover:scale-125 duration-500 h-20% w-20% z-50 ";
        }
        return (<button key={data[2]} id={`data[2]`} onClick={rotateWheelOnClick} style={picRotation} className={pic_style + data[1]} ><img className="w-full" src={data[0]} /></button>);
    });

    const style = `"transform" : rotate(${props.rotation}deg)`;
    
    

    return (
        <div style={wheelRotation} className="w-full h-full relative flex justify-center items-center duration-500 ease-in-out z-40">
            {founders}
        </div>
        );
}

export default Wheel;