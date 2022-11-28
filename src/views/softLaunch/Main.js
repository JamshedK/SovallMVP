import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import bullet_point from './assets/bullet_point.svg';
import mascot from './assets/mascot_lg.svg';
import instagram from './assets/instagram.svg';
import gradientbg from './assets/gradient_bg.png';


const items = ["Find, shape, and pursue your passion",
                "Celebrate your creativity and curiosity",
                "Connect with hobbyists and creatives",
                "Get support for your project"]

const list = items.map(item => {
    return (
        <div className="flex gap-2 items-center">
            <img className="h-4" src={bullet_point} />
            <p>{item}</p>
        </div>
        );
    }
);
function Main() {

    const gradient = {
        backgroundImage: `url(${gradientbg})`
    };

    return (
        <div className="bg-green-2 md:h-screen">
            <Header />
            <div className="h-90% w-full flex max-md:flex-col justify-center items-center">
                <div className="md:w-80% lg:w-70% xl:w-2/3 max-md:flex-col h-95% flex">
                    {/*Left panel*/}
                    <div className="max-md:h-full max-md:px-12 max-md:py-8 max-md:gap-8 flex flex-col max-md:items-center md:w-1/2 md:h-full text-white text-sm md:justify-between md:py-2" >
                        <div className="md:w-2/3 text-sm ">
                            <h1 className="underline max-md:w-full md:w-fit md:pr-1 mb-4 max-md:pb-1 font-medium text-lg text-yellow-3 border-b border-yellow-1 ">PURSUE YOUR PASSION</h1>
                            <p>
                                Under the pressure of its one-size-fits-all cookie-cutter, the current education system has crushed the genius of creatives, misfits, and rebels.
                            </p>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h1 className="font-medium text-lg text-yellow-3 max-md:w-full">JOIN US!</h1>
                            <div className="pl-4 flex flex-col gap-1">
                                {list}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 md:w-[13rem]">
                            <h1 className="font-medium">DEMO VIDEO </h1>
                            <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/l3fRrxf0gAI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        </div>

                    </div>

                    {/*Right panel*/}
                    <div className="h-[32rem] max-md:h-[50rem] max-md:py-8 md:w-1/2 md:h-full flex justify-center items-center md:py-2 text-white">
                        <div style={gradient} className="bg-cover bg-center w-5/6  h-[30rem] max-md:w-2/3 max-md:h-[40rem] md:h-full lg:w-2/3 flex rounded-lg flex-col py-10 px-14 gap-3 shadow-2xl">
                            <div className="h-4/6 text-white flex flex-col gap-y-4">
                                <img src={mascot} className="h-4/6" />
                                <div className="flex flex-col align-items-center flex flex-col justify-center items-center">
                                    <p className="font-medium md:text-sm max-2xl:text-normal 2xl:text-normal">IT'S TIME TO SHINE</p>
                                    <p className="max-xl:text-sm max-2xl:text-normal">JOIN FOR UPDATES!</p>
                                </div>
                                
                            </div>
                            <form className="w-full h-full flex flex-col items-center w-full gap-y-3 text-xs">
                                <div className="border-b border-white block pl-4 w-full">
                                    <input className="border-none bg-transparent text-white text-xs w-full p-0 focus:border-transparent focus:ring-0 placeholder:text-xs placeholder:text-white" type="text" placeholder="Name"/>
                                </div>
                                <div className="border-b border-white block pl-4 w-full">
                                    <input className="border-none text-white bg-transparent text-xs w-full p-0 focus:border-transparent focus:ring-0 placeholder:text-xs placeholder:text-white" type="email" placeholder="Email"></input>
                                </div>
                                <button className="block bg-white text-green-2  rounded-full px-2 py-1 mt-2 font-medium italic">Count me in!</button>
                            </form>
                            <a className="h-6 flex gap-x-2 justify-center" href="https://www.instagram.com/sovall_com/">
                                <p className="text-xs">Follow us: </p>
                                <img className="h-4" src={instagram}/>
                            </a>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        );
}

export default Main;