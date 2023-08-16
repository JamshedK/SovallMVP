import { useContext, useState } from "react";
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
import SelectedTabContext from "../../contexts/selected-tab-context";

export const TabsMobile = (props) => {
    const [selectedTab, setSelectedTab] = useState('discussions');
    const stCtx = useContext(SelectedTabContext)
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        stCtx.setSelectedTab(tab)
    };

    const getTabStyle = (tabName) => {
        return selectedTab === tabName  ? "bg-white" : "bg-[#D9D9D9]";
    };

    return (
        <div className="flex w-full bg-white items-center justify-center h-screen">
            {/* Header Tabs */}
            <div className="flex flex-row justify-between items-center text-[14px] font-inter w-full mx-4 px-2">
                <div
                    className={`rounded-tl-[8px] w-1/3 text-center cursor-pointer py-2 border-t-2 border-l-2 border-[#D9D9D9] ${getTabStyle('discussions')}`}
                    onClick={() => handleTabClick('discussions')}
                >
                    discussions
                </div>
                <div
                    className={`w-1/3 text-center cursor-pointer py-2 border-t-2 border-[#D9D9D9] ${getTabStyle('issues')}`}
                    onClick={() => handleTabClick('issues')}
                >
                    issues
                </div>
                <div
                    className={`rounded-tr-[8px] w-1/3 text-center cursor-pointer py-2 border-t-2 border-r-2 border-[#D9D9D9] ${getTabStyle('progress')}`}
                    onClick={() => handleTabClick('progress')}
                >
                    Progress updates
                </div>
            </div>
        </div>
    );
};