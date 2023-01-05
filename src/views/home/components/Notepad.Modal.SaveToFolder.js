import React, { Component } from 'react';

import dotted from '../../../assets/home/dotted_page.svg';
import blank from '../../../assets/home/blank_page.svg';
import grid from '../../../assets/home/grid_page.svg';
import lines from '../../../assets/home/lines_page.svg';
function PageDesign() {

    const images = [dotted, blank,grid,lines];

    const options = images.map(option => {
        return (
            <button className="h-fit">
                <img className="h-14" src={option}/>
            </button>
            );
    })
    return (
        <div className="h-48 w-1/2 bg-white  rounded-xl flex flex-col items-center px-6 pt-2 gap-3">
            <label className="text-green-1 font-bold">Page design</label>
            <div className="w-fit grid grid-rows-2 grid-flow-col gap-5">
                {options}
            </div>
            
        </div>
        );
}

export default PageDesign;