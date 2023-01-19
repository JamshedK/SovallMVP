import React, { Component } from 'react';
import logo from '../../../assets/home/sovall_green.svg';
import search from '../../../assets/home/search.svg';
import education from '../../../assets/home/education.svg';
import launch from '../../../assets/home/launch.svg';
import saved from '../../../assets/home/saved.svg';
import home from '../../../assets/home/home.svg';
import profile from '../../../assets/common/profile.jpg';
import dots_menu from '../../../assets/home/dots_menu.svg';

function Header() {
    
    const quickAccessOptions = [education,launch, saved, home];
    const quickAccess = quickAccessOptions.map(option => {
        return (
            <button>
                <img className="h-full" src={option} />
            </button>
            );
    });

    const radOptions = ["All", "Posts", "Resources", "Folders", "+More"];
    const radio = radOptions.map(option => {
        return (
            <button className="h-fit h-fit px-2 text-sm border rounded-full">
                <p>{option}</p>
            </button>
        );
    });

    return (
        <div className="sticky top-0 bg-home-header h-10% w-full drop-shadow-lg flex items-center z-50 borde2-2 border-blacks">
            <div className="h-4/6 w-full flex flex-col gap-2 px-8">
                <div className="h-3/5 flex justify-between">

                    {/*Section 1.1 contains the logo*/}
                    <button className="w-1/5 h-full">
                        <img className="h-full" src={logo} />
                    </button>

                    {/*Section 1.2 contains the search bar*/}
                    <div className="flex items-center h-full w-1/4">
                        <form className="flex border border-green-1 rounded-full w-full h-5/6 items-center px-4">
                            <label>
                                <img className="h-full" src={search} />
                            </label>
                            <input className="border-none bg-transparent h-full" type="text" placeholder="Search"></input>
                        </form>
                    </div>

                    {/*Section 1.3 contains the quick acess*/}
                    <div className="h-full w-1/5 flex justify-between items-center pl-6">
                        <div className="flex justify-between h-4/6 w-fit gap-8">
                            {quickAccess}
                        </div>
                        <div className="w-3/12 h-full flex justify-between items-center">
                            <button className="h-full">
                                <img className="rounded-full h-full" src={profile} />
                            </button>
                            <button className="">
                                <img src={dots_menu} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 2 contains the radio options*/}
                <div className="flex justify-center h-1/6 w-full text-green-1">
                    <form className="w-1/5 h-full flex justify-between gap-4">
                        {radio}
                    </form>
                </div>

            </div>
        </div>
        );
}

export default Header;