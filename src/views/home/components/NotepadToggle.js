import React, { useState} from 'react';
import notepad from '../../../assets/home/notepad.svg';
import rightExpandArrow from '../../../assets/home/right_expand_arrow.svg';



const NotepadToggle = (props) => {
    const handleToggle = () => {
        props.setValue(prev => !prev);
    }
    return (
        <div className="flex items-center w-8 h-8 ml-3 gap-2">
            <button className={"h-fit " + (props.value ? "rotate-180" : "")} onClick={handleToggle}>
                <img src={rightExpandArrow} />
            </button>
            <button onClick={handleToggle}>
                <img src={notepad} />
            </button>

        </div>

    );
}

export default NotepadToggle;