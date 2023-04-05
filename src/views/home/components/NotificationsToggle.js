import React, { Component, useState } from 'react';
import leftExpandArrow from '../../../assets/home/left_expand_arrow.svg';
import notification from '../../../assets/home/notification.svg';

const NotificationsToggle = (props) => {

    const handleToggle = () => {
        props.setValue(prev => !prev);
    }
    return (
        <div className={!props.value ? "flex gap-2 h-5 mt-[30px] ml-4 items-center ": "hidden"}>
            {/* <button className="h-fit w-fit" onClick={handleToggle}>
                <img className="h-3 w-3" src={leftExpandArrow} />
            </button> */}
        
            <button className="w-fit h-fit" onClick={handleToggle}>
                <img className="h-5 w-5" src={notification} />
            </button>

        </div>
        );
}

export default NotificationsToggle;