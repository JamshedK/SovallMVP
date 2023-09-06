import React, { Component, useState } from 'react';
// import leftExpandArrow from '../../../assets/home/left_expand_arrow.svg'; not in use curently
import notification from '../../../assets/home/notification.svg';

const NotificationsToggle = (props) => {

    const handleToggle = () => {
        props.setValue(prev => !prev);
    }
    return (
        <div className={!props.value ? "flex gap-1 h-0 mt-[20px] ml-4 items-center ": "hidden"}>
            {/* <button className="h-fit w-fit" onClick={handleToggle}>
                <img className="h-3 w-3" src={leftExpandArrow} />
            </button> */}
        
            <button className="w-4 h-6" onClick={handleToggle}>
                <img className="h-4 w-8" src={notification} />
            </button>

        </div>
        );
}

export default NotificationsToggle;