import { useState } from "react";
import rightExpandArrow from '../../../assets/home/right_expand_arrow_green.svg';
import newMessage from '../../../assets/home/new_message.svg';
import profile from '../../../assets/common/profile.jpg';
import searchIcon from '../../../assets/common/search_icon_gray.svg';

import Search from "../../common/Search";
import PreviousMap from "postcss/lib/previous-map";

const Tab = (props) => {

    const handleClick = () => {
        props.setValue(props.value);
    }

    return (
        <button className={"w-full border-b text-[7pt] " + (props.isCurrent ? "text-black border-green-2 font-bold" : " text-gray-500 font-medium ")} onClick={handleClick} >
            <span className="font-bold text-black">{props.unread > 0 ? ("(" + props.unread) + ") " : ""}</span>
            {props.value}
        </button>
    );
}

const Preview = props => {
    const data = props.data;
    return (
        <button className="flex text-[8pt] gap-2 items-center w-full" onClick={()=>props.onClick(data.id)}>
            <img className="h-6 rounded-full" src={data.pic} />
            <div className="flex flex-col justify-start w-fit">
                <p className="w-fit font-semibold">{data.username}</p>
                <p className={"text-[8pt] w-28 overflow-hidden truncate text-left " + (data.seen ? " text-gray-400" : "font-semibold") }>{data.id+"! "+data.last_message.substring(0,28)}</p>
            </div>
        </button>
    );
}
const ChatHistory = (props) => {
    const [current, setCurrent] = useState("General");
    const unreadGeneral = 2;
    const unreadRequests = 3;

    const handleToggle = () => {
        props.setValue(prev => !prev);
    }

    const chats = props.data.map((chat, i) => {
        return (
            <Preview key={"chat-prev-" + i} data={chat} onClick={props.onClick} />
        );
    })

    return (
        <div className={props.value ? "w-[16rem] h-full bg-white flex flex-col pt-2 " : "hidden"}>

            <div className="flex gap-4 px-4 h-5">
                <Search placeholder="Search" style=" border border-green-2 text-green-2" icon={searchIcon} />
                <div className="flex gap-2 h-full items-center p-0">
                    <button className="w-fit h-fit" onClick={handleToggle}>
                        <img className="h-full" src={newMessage} />
                    </button>
                    <button className="h-fit w-fit" onClick={handleToggle}>
                        <img className="h-2 w-fit" src={rightExpandArrow} />
                    </button>

                </div>
                
            </div>
            <div className="flex w-full pt-2 drop-shadow-lg">
                <Tab value="General" isCurrent={current === "General" ? true : false} setValue={setCurrent} unread={unreadGeneral} />
                <Tab value="Requests" isCurrent={current === "Requests" ? true : false} setValue={setCurrent} unread={unreadRequests} />

            </div>
            <div className="w-full h-fit flex flex-col gap-2 px-4 pt-4 pb-2 overflow-auto">
                {chats}
                <p className="text-[8pt] w-full text-center">No more messages</p>
            </div>

        </div>
        );
}

export default ChatHistory;