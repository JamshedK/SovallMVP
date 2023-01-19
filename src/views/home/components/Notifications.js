import { useState } from 'react';
import leftExpandArrow from '../../../assets/home/left_expand_arrow_green.svg';
import notification from '../../../assets/home/notifications_green.svg';
import profile from '../../../assets/common/profile.jpg';

import Search from "./Search";

//Dummy data
const data = [
    {
        ts: "8 min",
        pic: "This is just a placeHolder",
        username: "salazar_rich",
        action: "commented your post."
    },
    {
        ts: "8 min",
        pic: "This is just a placeHolder",
        username: "salazar_rich",
        action: "commented your post."
    },
    {
        ts: "8 min",
        pic: "This is just a placeHolder",
        username: "salazar_rich",
        action: "commented your post."
    },
    {
        ts: "8 min",
        pic: "This is just a placeHolder",
        username: "salazar_rich",
        action: "commented your post."
    },
    {
        ts: "8 min",
        pic: "This is just a placeHolder",
        username: "salazar_rich",
        action: "commented your post."
    },
    {
        ts: "8 min",
        pic: "This is just a placeHolder",
        username: "salazar_rich",
        action: "commented your post."
    }, {
        ts: "8 min",
        pic: "This is just a placeHolder",
        username: "salazar_rich",
        action: "commented your post."
    },
]


const Tab = (props) => {
    const handleClick = () => {
        props.setValue(props.value);
    }
    return <button className={"w-full border-b text-[7pt] " + (props.isCurrent ? "text-black border-green-2 font-bold" : " text-gray-500 font-medium ")} onClick={handleClick} >{props.value} </button>
}

const notifications = data.map(i => {
    return (
        <div className="flex text-[8pt] gap-2 items-center">
            <p className="flex text-[6pt] w-fit">{i.ts}</p>
            <img className="h-6 rounded-full" src={profile} />
            <p><span className="font-semibold">{i.username}</span> {i.action}</p>
        </div>
    );
})


const Notifications = (props) => {

    const [current, setCurrent] = useState("All");
    const handleToggle = () => {
        props.setValue(prev => !prev);
    }

    const handleTabClick = (e) => {
        const value = e.target.value;
        setCurrent(value);
    }
    return (
        <div className={props.value ? "border w-[16rem] h-full bg-white flex flex-col py-2" : "hidden"}>
            <div className="flex gap-4 px-4 h-5">
                <div className="flex gap-2 h-full items-center p-0">
                    <button className="h-fit w-fit" onClick={handleToggle}>
                        <img className="h-2 w-fit" src={leftExpandArrow} />
                    </button>
                    <button className="w-fit h-fit" onClick={handleToggle}>
                        <img className="h-full" src={notification} />
                    </button>
                    
                </div>
                <Search placeholder="Search"/>
            </div>
            <div className="flex w-full pt-2">
                <Tab value="All" isCurrent={current === "All" ? true : false} setValue={setCurrent} />
                <Tab value="Last 24 hours" isCurrent={current === "Last 24 hours" ? true : false} setValue={setCurrent} />

            </div>
            <div className="w-full h-fit flex flex-col gap-2 pt-4 px-3 overflow-auto scrollbar-hide">
                {notifications}
                <p className="text-[8pt] w-full text-center">All done</p>
            </div>
        </div>
        );
}
export default Notifications;