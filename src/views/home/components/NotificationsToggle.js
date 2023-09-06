import React, { Component, useState } from 'react';
import leftExpandArrow from '../../../assets/home/left_expand_arrow.svg'; 
import notification from '../../../assets/home/notification.svg';

const NotificationsToggle = (props) => {

    const handleToggle = () => {
        props.setValue(prev => !prev);
    }
    return (
        <div className={!props.value ? "flex gap-1 h-0 mt-[20px] ml-4 items-center ": "hidden"}>
            <button className="w-6 h-6" onClick={handleToggle}>
                <img className="h-6 w-6" src={notification} />
            </button>

            <button className="h-3 w-3" onClick={handleToggle}>
                <img className="h-3 w-3" src={leftExpandArrow} />
            </button>

        </div>
        );
}

export default NotificationsToggle;