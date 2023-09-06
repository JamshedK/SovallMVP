import { useState } from 'react';
import leftExpandArrow from '../../../assets/home/right_expand_arrow_green.svg';
import notification from '../../../assets/home/notifications_green.svg';
import profile from '../../../assets/common/profile.jpg';
import searchIcon from '../../../assets/common/search_icon_gray.svg';

import Search from "../../common/Search";


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
    return <button className={"w-full border-b text-[7pt] " + (props.isCurrent ? "text-black border-green-5 font-bold" : " text-gray-500 font-medium ")} onClick={handleClick} >{props.value} </button>
}

const notifications = data.map((n,i) => {
    return (
        <button key={"notification"+i} className="flex text-[7pt] gap-1 items-center bg-white rounded">
            <p className="flex text-[6pt] w-fit">{n.ts}</p>
            <img className="h-2 rounded-full" src={profile} />
            <p><span className="font-semibold">{n.username}</span> {n.action}</p>
        </button>
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
        <div className={props.value ? "w-[16rem] h-full  flex flex-col py-1 drop-shadow-xl " : "hidden b"}>
<div className="flex justify-end items-center gap-1 h-6 px-2">
    <div className="flex gap-1 h-full items-center">
        <button className="h-5 w-4" onClick={handleToggle}>
            <img className="h-4" src={notification} />
        </button>
        <button className="h-fit w-fit" onClick={handleToggle}>
            <img className="h-2 w-3" src={leftExpandArrow} />
        </button> 
    </div>
    {/* <Search placeholder="Search" style="border border-green-2 text-green-2" icon={searchIcon}/> */}
</div>

            <div className="flex w-full pt-1 drop-shadow-lg">
                {/* <Tab value="All" isCurrent={current === "All" ? true : false} setValue={setCurrent} /> */}
                {/* <Tab value="Last 24 hours" isCurrent={current === "Last 24 hours" ? true : false} setValue={setCurrent} /> */}

            </div>
            <div className="w-full h-fit flex flex-col gap-2 pt-3 px-3 overflow-auto">
                {notifications}
                {/* <p className="text-[8pt] w-full text-center">All done</p> */}
            </div>
        </div>
        );
}
export default Notifications;
