import React, { Component, useState } from 'react';

import rightExpandArrow from '../../../assets/home/right_expand_arrow.svg';
import messages from '../../../assets/home/messages_white.svg';

const MessagesToggle = (props) => {
    const handleToggle = () => {
        props.setValue(prev => !prev);
    }
    return (
        <div className="flex items-center w-fit h-8 gap-2 absolute right-6 mt-0">
            <button  onClick={handleToggle}>
                <img src={messages} />
            </button>
            <button className={"h-fit " + (props.value ? "rotate-180" : "")}  onClick={handleToggle}>
                <img src={rightExpandArrow} />
            </button>
            
        </div>
        );
}
export default MessagesToggle;