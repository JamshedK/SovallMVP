import React, { Component, useState } from 'react';
import sovallNotes from '../../../assets/home/sovall_notes.svg';
import Sheet from "./Notepad.Sheet";
import Modal from "./Notepad.Modal";
import arrowBack from '../../../assets/home/arrow_back.svg';
import add from '../../../assets/home/add.svg';
import color from '../../../assets/home/color.svg';
import pencil from '../../../assets/home/pencil.svg';
import eraser from '../../../assets/home/eraser.svg';
import text from '../../../assets/home/text.svg';
import camera from '../../../assets/home/camera.svg';
import folder from '../../../assets/home/folder.svg';
import download from '../../../assets/home/download.svg';
import grid from '../../../assets/home/grid.svg';

//Dummy data
const tabData = ["Tab 1", "Tab 2", "Tab 3", , "Tab 4"];



const Notepad = (props) => {
    const [currentTab, setCurrentTab] = useState("0");
    const iconOptions = [color, pencil, eraser, text, camera, folder, download, grid];

    const options = iconOptions.map(icon => {
        
        return (
            <button className="h-full">
                <img className="h-3" src={icon}/>
            </button>
            );
    });
    
    

    let numberofTabs = tabData.length;


    const tabs = tabData.map((title,i) => {
       
        const child = "h-full w-full rounded-t-lg bg-yellow-1";


        return (
            <li className="flex h-full w-full ">
                <button className={child}>
                    {title}
                </button>
            </li>
            );
    });

    const handleTabClick = (e) => {
        const i = e.target.value;
        console.log(i);
        setCurrentTab(i)
    }
    
    return (
        <div className={props.value? "w-[20rem] flex flex-col h-[28rem] absolute left-0 bottom-0": "hidden"}>
            {/*The tab section"*/}
            <div className="flex w-full h-5% drop-shadow-lg">
                <button className="w-1/12 h-full flex justify-center items-center">
                    <img className="h-4" src={arrowBack} />
                </button>
                <ul className="h-full w-10/12 flex gap-[0.05rem]">
                    {tabs}
                </ul>
                <button className="w-1/12 h-full flex justify-center items-center">
                    <img className="h-3" src={add} />
                </button>
            </div>

            <div className="flex flex-col h-95% w-full bg-yellow-1 drop-shadow-xl">
                <div className="h-10 flex justify-between w-full px-8 py-4 bg-yellow-1 drop-shadow-xl">
                    {options}
                </div>
                
                <div className="h-92% flex flex-col overflow-auto gap-2">
                    {/*<Modal />*/ }
                    <Sheet />
                    <Sheet />
                    <Sheet />
                    <Sheet />
                </div>
                
            </div>
        </div>
        );
}

export default Notepad;