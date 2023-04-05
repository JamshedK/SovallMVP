import React, {Component, useState} from "react";
import comingsoon_gigachad from "../../../assets/common/comingsoon_gigachad.svg";
import rightExpandArrow from '../../../assets/home/right_expand_arrow_green.svg';
import message from '../../../assets/home/messages.svg'



const ComingSoonMessages = (props) => {

    const handleToggle = () => {
        props.setValue(prev => !prev)
    };

    return (
        <div className={props.value ? "bg-white mr-0 border-2 border-[#3C9A9A] border-r-white relative pr-14 rounded-l-[14.5px] w-[280px] h-[280px] items-center mt-3" : "hidden"}>

            <button className="relative left-[220px] top-[20px]" onClick={handleToggle}>
                <img className="" src={message} />
            </button>

            <button className="relative left-[230px] top-[14px]" onClick={handleToggle}>
                <img className="" src={rightExpandArrow} />
            </button>

            <img className='relative w-20 h-30 top-[40px] left-[70px]' src={comingsoon_gigachad}/>

            <h1 className='relative text-[18px] left-[55px] top-[60px] text-brown-1 font-bold font-inter'>Coming soon . . .</h1>
            
        </div>
    );
};


export default ComingSoonMessages;