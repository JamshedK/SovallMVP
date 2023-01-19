import React, { Component } from 'react';

import close from '../../../assets/home/close.svg';
import profile from '../../../assets/common/profile.jpg';
import call from '../../../assets/home/call.svg';
import pin1 from '../../../assets/home/pin1.svg';
import pin2 from '../../../assets/home/pin2.svg';
import dotsMenu from '../../../assets/home/dots_menu.svg';
import poll from '../../../assets/home/poll.svg';
import doc from '../../../assets/home/doc.svg';
import photo from '../../../assets/home/photo.svg';
function Chat() {
    const icons = [call, pin1, pin2, dotsMenu];
    const chatIcons = [poll, doc, photo];

    const chatData = [
        {
            type: "own",
            text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
            ts : "2022-05-21",
        },
        {
            type: "",
            text: "Hi how are you doing?",
            ts: "2022-05-21",
        },
        {
            type: "",
            text: "Hi how are you doing?",
            ts: "2022-05-21",
        },
        {
            type: "own",
            text: "Hi how are you doing?",
            ts: "2022-05-21",
        },
        {
            type: "",
            text: "Hi how are you doing?",
            ts: "2022-05-21",
        },
        {
            type: "own",
            text: "Hi how are you doing?",
            ts: "2022-05-21",
        },
        {
            type: "own",
            text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
            ts: "2022-05-21",
        },
        {
            type: "own",
            text: "Hi how are you doing?",
            ts: "2022-05-21",
        },
        {
            type: "",
            text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
            ts: "2022-05-21",
        },
    ];


    const headerIcons = icons.map(icon => {
        return (
            <button className="h-full">
                <img src={icon}/>
            </button>
            );
    });

    const chatOptions = chatIcons.map(icon => {
        return (
            <button className="h-full">
                <img className="h-full" src={icon} />
            </button>
        );
    });

    const chatBubbles = chatData.map(message => {
        const flag = message.type == "own" ? true : false;
        const justification = flag ? "justify-end " : "justify-start ";
        const bg = flag ? "bg-green-1  text-white " : "bg-gray-200 ";
        const textAlign = flag ? "text-right " : "text-left ";
        const parentStyle = "w-full text-sm flex " + justification;
        const childStyle = "px-2 py-1 rounded-xl max-w-[80%] whitespace-normal " + bg + textAlign;

        return (
            <div className={parentStyle} >
                <p className={childStyle}>
                    {message.text}
                </p>
            </div>
            );
    });


    return (
        <div className="h-1/2 w-1/6 rounded-tl-xl bg-white absolute right-0 bottom-0 overflow-hidden hidden">
            {/*Header*/ }
            <div className="bg-white h-15% w-full flex flex-col pl-2 pt-2 drop-shadow-md ">
                <button className="h-20% w-full">
                    <img className="h-full" src={close} />
                </button>
                <div className="h-1/2 w-full flex justify-between px-4">
                    
                    <div className="h-90% flex gap-2 items-center ">
                        <button className="h-full">
                            <img className="h-full rounded-full" src={profile} />
                        </button>
                        <div className=" h-fit flex flex-col h-full justify-start">
                            <label className="text-xs block font-bold">Ricardo</label>
                            <label className="text-xxs text-gray-500" >Active 10 minutes ago</label>
                        </div>
                    </div>
                    <div className="w-5/12 flex justify-between">
                        {headerIcons}
                    </div>
                </div>
            </div>

            {/*Messages box*/ }
            <div className="w-full h-75% flex flex-col gap-1 px-3 overflow-auto  scrollbar-hide">
                {chatBubbles}
            </div>

            {/*Message input*/}
            <div className="w-full h-10% p-2 bg-white shadow-2xl">
                <div className=" w-full h-full border rounded-xl flex items-center rounded-lg overflow-hidden">
                    <input className="w-75% h-full border-none focus:none text-sm" type="text" />
                    <div className="w-25% h-75% flex justify-between py-1 pr-2">
                        {chatOptions}
                    </div>
                </div>
            </div>
        </div>
        );
}

export default Chat;