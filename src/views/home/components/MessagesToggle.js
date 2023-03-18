import React, { Component, useState } from 'react';

import rightExpandArrow from '../../../assets/home/right_expand_arrow.svg';
import messages from '../../../assets/home/messages_white.svg';

const MessagesToggle = (props) => {
    const handleToggle = () => {
        props.setValue(prev => !prev);
    }
    return (
        <div className={"flex items-center w-fit h-5 gap-2 mt-2 mr-4 "+ (props.value? "hidden" : "") }>
            <button className="h-fit w-fit" onClick={handleToggle}>
                <img className="h-4 w-fit"  src={messages} />
            </button>
            
            <button className="w-fit h-fit"  onClick={handleToggle}>
                <img className="h-2 w-fit"  src={rightExpandArrow} />
            </button>
            
        </div>
        );
}
export default MessagesToggle;