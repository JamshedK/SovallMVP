import React from "react";
import HeaderA from "./HeaderA";
import comingsoon_gigachad from "../../assets/common/comingsoon_gigachad.svg";
import ComingSoonMessages from "../home/components/ComingSoonMessages";
import ComingSoonNotifications from "../home/components/ComingSoonNotifications";


const ComingSoon = (props) => {
    return(
        <div className="relative h-full w-full flex flex-col gap-4 justify-center items-center" style={{backgroundColor: "#3C9A9A"}}>
            <img src={comingsoon_gigachad}></img>
            <h1 className="text-white font-bold text-[16px] font-inter">Coming soon...</h1>
        </div>
    )

}

export default ComingSoon;