import React, { Component } from 'react';
import PenColor from './Notepad.Modal.PenColor';
import SaveToFolder from './Notepad.Modal.PageDesign';
function Modal() {
    return (
        <div className="absolute h-92% h-full w-full flex justify-center">
            
            <div className="h-full w-full absolute z-20 flex justify-center">
                {/*<PenColor />*/}
                <SaveToFolder/>
            </div>
            <div className="h-full w-full bg-black opacity-50 z-10 " />
        </div>
        );
}

export default Modal;