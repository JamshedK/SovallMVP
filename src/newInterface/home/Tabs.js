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
    console.log('Project data')
    console.log(props.data)
    const issueCount = props.data?.issueCount !== undefined ? props.data.issueCount : 0;
    const discussionCount = props.data?.discussionCount !== undefined ? props.data.discussionCount : 0;
    const progressCount = props.data?.progressCount !== undefined ? props.data.progressCount : 0;

    const getTabStyle = (tabName) => {
        return selectedTab === tabName  ? "bg-white" : "bg-[#D9D9D9]";
    };

    return (
        <div 
            className="flex w-full bg-white items-center justify-center h-fit
                md:rounded-lg lg:rounded-lg"
        >
            {/* Header Tabs */}
            <div 
                className="flex flex-row justify-between items-center text-[10px] 
                    md:text-[14px] lg:text-[15px] font-inter w-full "
                >
                <div
                    className={` w-1/3 text-center cursor-pointer py-2 md:rounded-tl-lg
                        lg:rounded-tl-lg  ${getTabStyle('discussions')}`}
                    onClick={() => handleTabClick('discussions')}
                >
                    {`${discussionCount} discussions`}
                </div>
                <div
                    className={`w-1/3 text-center cursor-pointer py-2 ${getTabStyle('issues')}`}
                    onClick={() => handleTabClick('issues')}
                >
                    {`${issueCount} issues`}
                </div>
                <div
                    className={`w-1/3 text-center cursor-pointer py-2 md:rounded-tr-lg
                        lg:rounded-tr-lg ${getTabStyle('progress')}`}
                    onClick={() => handleTabClick('progress')}
                >
                    {`Progress updates (${progressCount}) `}
                </div>
            </div>
        </div>
    );
};