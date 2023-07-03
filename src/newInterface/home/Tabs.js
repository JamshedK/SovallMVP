import { useState } from "react";
import notification_icon from '../../assets/newInterface/home/notification_icon.svg';
import upvote_icon_disabled from '../../assets/newInterface/home/upvote_icon_disabled.svg';
import downvote_icon from '../../assets/newInterface/home/downvote_icon.svg';
import comment_icon from '../../assets/newInterface/home/comment_icon.svg';
import save_icon from '../../assets/newInterface/home/save_icon.svg';
import issue_icon from '../../assets/newInterface/home/issue_icon.svg';
import recruiting_icon from '../../assets/newInterface/home/recruiting_icon.svg';
import example_image from '../../assets/newInterface/home/example_image.jpg';
import add_tab from '../../assets/newInterface/home/add_tab.svg'

import profile from '../../assets/common/profile.jpg';


export const TabsMobile = (props) => {
    
    return(
        <div className="flex h-full w-full bg-[#3C9A9A] flex items-center justify-center h-screen">
            {/* Header Tabs */}
            <div className="flex flex-row justify-between items-center text-[14px] font-inter w-full mx-4 px-2">
                <div className="bg-white rounded-tl-[8px] w-1/2 text-center ">Product</div>
                <div className="bg-white rounded-tr-[8px] w-1/2 text-center">To Do (Private) </div>

                <img className="relative left-2" src={add_tab}/>
            </div>

            {/* Content Tabs */}
            <div className="bg-white">
                
            </div>
        </div>
    )

}