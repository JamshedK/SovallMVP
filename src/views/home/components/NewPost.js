import React, { Component, useState } from 'react';

import photo from '../../../assets/home/photo.svg';
import doc from '../../../assets/home/doc.svg';
import poll from '../../../assets/home/poll.svg';

const images = [photo, doc];
const buttons = images.map(image => {
    return (
        <button>
            <img className="h-full" src={image} />
        </button>
        );
});

const handleClick = () => {
    console.log("click");
}
const NewPost = (props) => {
    useState(false);
    return (
        <div className={"w-full h-fit flex flex-col border border-dashed border-gray-300 rounded-xl bg-white gap-6 p-10 " + props.width }>
            <div className="text-green-1">
                <label className="font-semibold" >We are here to help you grow. Venture towards excellence</label>
                <ul className="list-disc pl-7 w-full cursor-text" onClick={handleClick}>
                    <li>Identify a problem...</li>
                    <li>Offer a solution...</li>
                    <li>Find a team...</li>
                </ul>
            </div>
            <div className="flex w-full h-1/6 justify-end items-center ">
                <div className="flex gap-6 w-fit h-full">
                    {buttons}
                </div>
            </div>
        </div>
    );
}

export default NewPost;