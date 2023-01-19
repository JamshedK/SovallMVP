import React, { Component } from 'react';
import Interactor from './Interactor';
import comments from '../../../assets/home/comments.svg';
import arrowDown from '../../../assets/home/arrow_down.svg';
import arrowBack from '../../../assets/home/arrow_back.svg';
import dotsMenu from '../../../assets/home/dots_menu.svg';
import arrowForth from '../../../assets/home/arrow_forth.svg';
import share from '../../../assets/home/share.svg';
import save from '../../../assets/home/saved.svg';
import pdf from '../../../assets/home/pdf.svg';

const Button = props => {
    return <button href={props.href} className="flex items-center gap-2 h-5">{props.children}</button>
}

const FeedCard= (props) => {
    const data = props.data;
    const interactorsData = data.interactors;
    const interactors = interactorsData.map(interactor => {
        return <Interactor data={interactor} />
    });
    const px = "px-8";
    return (
        <div className="w-full flex flex-col items-center bg-white border border-gray-300 rounded-xl py-8 gap-4" >
            {/*Post header*/}
            <div className={"flex justify-between items-center w-full " + px}>
                <div className="flex items-center h-10">
                    <img className="rounded-full h-full" src={data.pic} />
                    <div className="flex flex-col px-1">
                        <label className="font-bold text-[11pt]">{data.username}</label>
                        <label className="text-[9pt]">{data.ts}</label>
                    </div>
                </div>
                <div className="flex gap-3">
                    <label className="bg-green-4 font-thin align-middle text-white text-[8pt] px-3 h-fit py-1 rounded-tl-xl rounded-br-xl">Resources</label>
                    <img src={dotsMenu} />
                </div>
            </div>

            {/*post perse*/}
            <div className={"w-full h-fit flex flex-col gap-2 " + px}>
                {/*Attachment subsection*/}
                <div className="w-full px-4">
                    {/*attachment details*/ }
                    <div className="h-fit w-full rounded-xl bg-gray-200 flex gap-2">
                        <img src={pdf} />
                        <div className="h-full w-5/12 flex flex-col border">
                            <label className="font-bold">Title</label>
                            <p className="flex flex-wrap">
                                <span>#thisIsAnAwesomeHashtag</span>
                                <span>#this</span>
                                <span>#IsAHashtag</span>
                                <span>#thisIsAnA</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/*description subsection*/}
                <p className="flex-wrap">
                    {data.text.slice(0, 160)}
                    <span className="font-bold text-lg"> more...</span>
                </p>
            </div>

            {/*buttons*/}
            <div className={"flex justify-between w-full h-9 py-1 px-14"}>
                <Button>
                    <img className="h-full" src={comments} />
                </Button>
                <Button>
                    <img className="h-full" src={share} />
                </Button>
                <Button>
                    <img className="h-full" src={save} />
                </Button>
            </div>

            {/*division line*/ }
            <hr className="w-full"></hr>

            {/*interactors*/}
            <label className={"w-full " + px}>Members who intereacted with this post</label>
            <div className={"flex w-full items-start justify-between " + px}>
                <button className="w-fit h-9 flex" >
                    <img className="w-2" src={arrowBack} />
                </button>
                <div className="w-11/12 flex overflow-auto no-scroll scrollbar-hide">
                    {interactors}
                </div>
                <button className="w-fit h-9 flex">
                    <img className="w-2"  src={arrowForth} />
                </button>
            </div>
        </div>
        );
}

export default FeedCard;