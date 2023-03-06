import React, {Component, useState} from "react";
import comingsoon_gigachad from "../../../assets/common/comingsoon_gigachad.svg";
import leftExpandArrow from '../../../assets/home/left_expand_arrow_green.svg';
import notification from '../../../assets/home/notifications_green.svg';



const ComingSoonNotifications = (props) => {

    const handleToggle = () => {
        props.setValue(prev => !prev)
    };

    return (
        <div className={props.value ? "bg-white rounded-r-[14.5px] w-[280px] h-[280px] items-center mt-3" : "hidden"}>

            <button className="relative left-[40px] top-[20px]" onClick={handleToggle}>
                <img className="" src={notification} />
            </button>

            <button className="relative left-[4px] top-[15px]" onClick={handleToggle}>
                <img className="" src={leftExpandArrow} />
            </button>

            <img className='relative w-20 h-30 top-[40px] left-[110px]' src={comingsoon_gigachad}/>

            <h1 className='relative text-[18px] left-[88px] top-[60px] text-brown-1 font-bold font-inter'>Coming soon . . .</h1>
            
        </div>
    );
};


export default ComingSoonNotifications;