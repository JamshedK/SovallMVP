import React, { Component, useState } from 'react';
import leftExpandArrow from '../../../assets/home/left_expand_arrow.svg';
import notification from '../../../assets/home/notifications.svg';

const NotificationsToggle = (props) => {

    const handleToggle = () => {
        props.setValue(prev => !prev);
    }
    return (
        <div className={!props.value ? "flex gap-2 h-5 items-center ml-4 mt-2": "hidden"}>
            <button className="h-fit w-fit" onClick={handleToggle}>
                <img className="h-2 w-fit" src={leftExpandArrow} />
            </button>
            <button className="w-fit h-fit" onClick={handleToggle}>
                <img className="h-4 w-fit" src={notification} />
            </button>

        </div>
        );
}

export default NotificationsToggle;