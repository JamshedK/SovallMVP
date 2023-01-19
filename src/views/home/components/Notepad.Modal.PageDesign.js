import React, { Component } from 'react';

import folder from '../../../assets/home/folder_green.svg';
import newFolder from '../../../assets/home/new_folder.svg';
function SaveToFolder() {
    
    const folderData = ["Folder", "Folder", "Folder", "Folder", "Folder", "Folder", , "Folder", "Folder", , "Folder", "Folder", "Folder", "Folder", "Folder"];
    const folders = folderData.map(title => {
        return (
            <button className="h-fit">
                <div className="flex flex-col">
                    <img className="h-8" src={folder} />
                    <label>{title}</label>
                </div>
            </button>
        );
    });

    return (
        
        <div className="h-full w-full">
            {/*New folder Modal*/ }
            <div className="absolute h-full w-full flex justify-center items-center z-30">
                <div className="w-1/2 h-40 bg-white rounded-xl flex flex-col items-center gap-2 py-4" >
                    <div className="w-full flex flex-col text-xs items-center gap-1" >
                        <img className="h-8" src={folder} />
                        <label>New Folder</label>
                    </div>
                    <input className="w-full border-none placeholder:text-black text-center text-sm outline-none" type="text" placeholder="Insert name"></input>
                    <button className="bg-green-1 text-white px-3 rounded-full">Save</button>
                </div>
            </div>
            <div className="absolute h-full w-full bg-black opacity-50 z-20" />
            <div className="h-full w-full pt-20 flex justify-center" >
                <div className="h-1/2 w-3/5 bg-white  rounded-xl flex flex-col items-center px-6 pt-2 gap-3 z-10">

                    <label className="text-green-1 font-bold">Save to folder</label>
                    <div className="w-fit grid grid-cols-3  gap-y-3 gap-x-4 text-xs overflow-auto scrollbar-hide">

                        <button className="h-fit">
                            <div className="flex flex-col">
                                <img className="h-8" src={newFolder} />
                                <label>New Folder</label>
                            </div>
                        </button>
                        {folders}
                    </div>

                </div>
            </div>
        </div>
        );
}

export default SaveToFolder;