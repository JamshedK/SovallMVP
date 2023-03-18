import React, {useState, useEffect} from "react";
import giga from '../../../assets/common/giga_learnmore.svg';


const LearnMore = (props) => {
    const handleToggle = () => {
        props.setValue(prev => !prev);
    };

    return(
        <div>
            <button className="" onClick={handleToggle}>
                <div className={props.value ? "hidden" : "flex absolute right-[133px] bottom-[133px] bg-white rounded-[11px] w-[160px] h-[35px] items-center justify-center font-semibold font-inter font-[13px]"}>
                    <h1>Learn more</h1>
                </div>

                <div className={!props.value ? "hidden" : "flex flex-col absolute right-[133px] bottom-[133px] gap-2 bg-white rounded-[11px] w-[180px] h-[300px] items-center justify-center font-inter font-[13px]"}>
                    <h1 className="relative top-2">Learn more</h1>
                    <ul>
                        <li href="../../about">Our purpose </li>
                        <li href="../../about">Our story</li>
                        <li href="../../about">Sovall founders </li>
                        <li href="../../about">Demo video </li>
                        <li href="../../about">FAQ </li>
                        <li href="../../about">Terms of service </li>
                        <li href="../../about">Contact us </li>                        
                    </ul>
                </div>
            </button>

            <img className="absolute right-[80px] bottom-[80px]" src={giga} />

        </div>
    );
}

export default LearnMore;
