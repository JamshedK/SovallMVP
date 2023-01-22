import React, { Component, Fragment, useRef, useState } from 'react';

import FileInput from '../../common/FileInput';
import Modal from '../../common/Modal';

import closeIcon from '../../../assets/home/close.svg';
import profile from '../../../assets/common/profile.jpg';
import call from '../../../assets/home/call.svg';
import pin1 from '../../../assets/home/pin1.svg';
import pin2 from '../../../assets/home/pin2.svg';
import dotsMenu from '../../../assets/home/dots_menu.svg';
import poll from '../../../assets/home/poll.svg';
import doc from '../../../assets/home/doc.svg';
import photo from '../../../assets/home/photo.svg';




const Chat = (props) => {
    const [menu, setMenu] = useState(false);
    const [pinned, setPinned] = useState(false);
    const photoInput = useRef(null);
    const fileInput = useRef(null);

    const messages_data = props.data.messages;

    /**Hadlers*/
    const handleClose = () => {
        let current = [...props.queue];
        current.shift(0);
        props.setQueue(current);

    }


    const handlePhoto = (e) => {
        const photo = e.target.files[0];
    }

    const handleDoc = (e) => {
        const file = e.target.files[0];
    }

    const handlePinnedClick = () => {
        setPinned(prev => !prev);
    }

    const handleMenuClick = () => {
        setMenu(prev => !prev);
    }

    const handleShowMedia = () => {
        console.log("Show media");
    }

    const handleDeleteChat = () => {
        console.log("Delete Chat");
    }

    const handleBlock = () => {
        console.log("Block");
    }
    const handleReport = () => {
        console.log("Report");
    }

    

    /**Data objects*/
    const header_icons = [
        //add "call" and "shared pinned messages" icons after the mvp
        {
            src: pin1,
            handler: handlePinnedClick
        },
        {
            src: dotsMenu,
            handler: handleMenuClick
        }]
        ;
    const chat_icons = [
        //add poll after the mvp
        {   
            id: "doc",
            src: doc,
            handler: handleDoc
        },
        {   
            id: "photo",
            src: photo,
            handler: handlePhoto
        }
    ] 

    const menu_options = [
        {
            value: "Shared media",
            onClick: handleShowMedia
        },
        {
            value: "Delete Chat",
            onClick: handleDeleteChat
        },
        {
            value: "Block",
            onClick: handleBlock
        },
        {
            value: "Report",
            onClick: handleReport
        },
    ]


    /** JSX lists*/
    const headerIcons = header_icons.map((item, i) => {
        const h = i === 1 ? "h-[60%]" : "h-[80%]";
        return (
            <button key={"header-icon-" + i} className={h} onClick={item.handler}>
                <img className="h-full w-fit" src={item.src} />
            </button>
        );
    });

    const chatBubbles = messages_data.map((message,i) => {
        const flag = message.type === "own" ? true : false;
        const justification = flag ? "justify-end " : "justify-start ";
        const bg = flag ? "bg-green-6  text-white " : "bg-gray-200 ";

        const textAlign = flag ? "text-right " : "text-left ";
        const parentStyle = "w-full text-sm flex " + justification;
        const childStyle = bg + " px-2 py-1 rounded-[0.9rem] max-w-[80%] whitespace-normal "+ textAlign;

        return (
            <div key={"chat-bubble-"+i} className={parentStyle} >
                <p className={childStyle}>
                    {message.text}
                </p>
            </div>
            );
    });


    const messageButtons = chat_icons.map((item, i) => {
        return (
            <FileInput id={item.id} src={item.src} handler={item.handler} />

        );
    });

    const menuOptions = menu_options.map((item, i) => {
        return (
            <button className="w-full h-fit text-[8pt] hover:bg-gray-100 py-1" onClick={item.onClick}>
                {item.value}
            </button>
            );
    });


    return (
        <div className="flex flex-col h-full w-[16rem] rounded-t-xl overflow-hidden bg-white shadow-lg shadow-gray-900 relative">
            
            {/*Header*/ }
            <div className="bg-white h-12 w-full flex flex-col pl-2 pt-2 drop-shadow-lg">
                <button className="h-20% w-fit" onClick={handleClose}>
                    <img className="h-full bg-gray-300 rounded-full hover:bg-[#BD1B1B]" src={closeIcon} />
                </button>
                <div className="h-[65%] w-full flex justify-between items-center pl-2 pr-4">
                    
                    <div className="h-[90%] flex gap-2 items-center">
                        <button className="h-full">
                            <img className="h-full rounded-full" src={profile} />
                        </button>
                        <div className=" h-fit flex flex-col h-[80%] justify-center">
                            <label className="text-[5pt] block font-bold">Ricardo{props.data.id}</label>
                            <label className="text-[4.5pt] text-gray-500" >Active 10 minutes ago</label>
                        </div>
                    </div>
                    <div className="w-fit h-[80%] flex justify-end gap-4 items-center">
                        {headerIcons}
                    </div>
                </div>
            </div>

            {/*Messages box*/ }
            <div className="w-full flex flex-col-reverse items-center gap-1 px-3 overflow-auto">

                {chatBubbles}
                <div className="h-fit w-fit flex flex-col items-center pt-6 pb-2">
                    <button className="h-10 w-fit"><img className="h-full rounded-full" src={profile} /></button>
                    <p className="font-semibold text-[10pt] w-fit">Ricardo</p>
                    <p className="text-[7pt] text-gray-400">UX/UI Designer</p>
                </div>
                
            </div>

            {/*Message input*/}
            <div className="w-full h-10 bg-white shadow-2xl py-1 px-1">
                <div className=" w-full h-full border rounded-lg flex items-center pr-4">
                    <input type="text" className="text-[8pt] px-4 py-0 border-none bg-transparent focus:border-none focus:ring-0 grow" />
                    <div className="h-[50%] flex justify-between items-center gap-2">
                        {messageButtons}
                    </div>
                </div>
            </div>
            <Modal className="bg-white w-[65%] flex flex-col py-8 rounded-lg gap-2" show={menu} onClick={handleMenuClick}>
                {menuOptions}
            </Modal>

            <Modal className="bg-white w-[60%] flex flex-col items-center py-8 rounded-lg gap-2" show={menu} onClick={handleMenuClick}>
                <DeleteChat/>
            </Modal>

            <div className="bg-white " ></div>
        </div>
        );
}

const DeleteChat = props => {
    const Button = props => {
        return (
            <button className={"w-fit px-2 rounded-full " + props.className} onClick={props.onCLick}>{props.value}</button>
            );
    }
    return (
        <div className="px-2 text-[10pt] flex flex-col gap-3">
            <p className="">Are you sure you want to delete this chat?</p>
            <div className="flex justify-center">
                <Button value="Delete" className="hover:bg-red-500 hover:text-white" onClick={props.onClick}/>
                <Button value="Cancel" className="hover:bg-gray-400 hover:text-white" onClick={props.onClick} />
            </div>

        </div>
        );
}

export default Chat;