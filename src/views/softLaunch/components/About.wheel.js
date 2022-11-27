import React, { useState, useEffect } from 'react';
import person_1 from '../assets/person_1.png';
import person_2 from '../assets/person_2.png';
import person_3 from '../assets/person_3.png';
import person_4 from '../assets/person_4.png';

const Wheel = (props) => {
    const [degree, setdegree] = useState(0);
    const [picDegree, setPicDegree] = useState(0)

    const rotateWheelOnClick = () => {
        setdegree((prevRotation) => prevRotation + 90);
    };
    /*useEffect(() => {
        setTimeout(() => {
            rotateWheelOnClick();
        }, 20000);
    });*/

    const wheelR = 'rotate(' + degree + 'deg)';
    const picR = 'rotate(-' +degree + 'deg)';

    const wheelRotation = {
        transform: wheelR,
    };

    const picRotation = {
        transform: picR,
    };

    
    const founders_data = [[person_1, "right-0"], [person_2, "bottom-0"], [person_3, "left-0"], [person_4, "top-0"]];

    const pic_style = "absolute transition ease-in-out hover:scale-125 duration-500 h-20% w-20% z-50 ";
    const founders = founders_data.map(data => {
        return (<button key={data[1]} onClick={rotateWheelOnClick} style={picRotation} className={pic_style + data[1]} ><img className="w-full" src={data[0]} /></button>);
    });

    const style = `"transform" : rotate(${props.rotation}deg)`;
    console.log(style)
    
    

    return (
        <div style={wheelRotation} className="w-full h-full relative flex justify-center items-center duration-500 ease-in-out z-40 ">
            {founders}
        </div>
        );
}

export default Wheel;