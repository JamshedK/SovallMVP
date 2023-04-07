import React, {useState, useEffect, useRef} from "react";
import giga from '../../../assets/common/giga_learnmore.svg';


const LearnMore = (props) => {
    const handleToggleOpen = () => {
        props.setValue(prev => !prev);
    };

    const handleToggleClose = () => {
        props.setValue(false);
    };

    const menuRef = useRef();

    useEffect(() => {
        const handler = (event) => {
            if(!menuRef.current.contains(event.target)) {
                handleToggleClose()
            }
        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    return(
        <div>
            <div className="">
                <div onClick={handleToggleOpen} className={props.value ? "hidden" : "flex absolute right-10 border-2 border-solid border-[D9D9D9] bottom-7 bg-white rounded-[11px] w-[105px] h-[35px] items-center justify-center font-semibold font-inter font-[12px] cursor-pointer"}>
                    <h1>Learn more</h1>
                </div>

                <div ref={menuRef} className={!props.value ? "hidden" : "flex flex-col space-y-4 absolute right-10 border-2 border-solid bottom-7 bg-white rounded-[11px] w-[180px] h-[270px] justify-center text-center text-[#525252] font-inter font-[13px]"}>
                    <ul className="flex flex-col space-y-2">
                        <a href="../../about">
                            <h1>Our purpose</h1> 
                        </a>

                        <a href="../../about">
                            <h1>Our story</h1> 
                        </a>

                        <a href="../../about">
                            <h1>Sovall founders</h1> 
                        </a>

                        <a href="../../about">
                            <h1>Demo video</h1> 
                        </a>

                        <a href="../../about">
                            <h1>FAQ</h1> 
                        </a>

                        <a href="../../about">
                            <h1>Terms of service</h1> 
                        </a>

                        <a href="../../about">
                            <h1>Contact us</h1> 
                        </a>

                        {/* <a href="../../about">Our story</a>
                        <a href="../../about">Sovall founders </a>
                        <a href="../../about">Demo video </a>
                        <li href="../../about">FAQ </li>
                        <li href="../../about">Terms of service </li>
                        <li href="../../about">Contact us </li>       */}
                    </ul>
                </div>

            </div>

            <img className="absolute h-12 w-12 bottom-0 right-0" src={giga} />

        </div>
    );
}

export default LearnMore;
