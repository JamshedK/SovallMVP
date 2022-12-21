import React, { Fragment } from "react";
import Input from './components/LogIn.Input';
import logo from '../../assets/common/sovall_2.svg';

const points = [
    "Find, shape, and pursue your passion",
    "Connect with creatives and hobbyists",
    "Get support to solve real- world problems",
    "Enjoy affordable high quality education"]

const LogIn = (props) => {
    const containerStyle = "md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] xl:w-[30rem] xl:h-[30rem] 2xl:w-[35rem] 2xl:h-[35rem] flex-col ";
    const bullet_points = points.map(point => {
        return <li key={point[0]} className="flex gap-1">
                    <span className="text-yellow-4">●</span>
                    <p>{point}</p>
               </li>
    });
    return (
        <div className="relative bg-green-6 h-screen flex justify-center flex-col items-center text-white overflow-auto">
            <div className="h-fit flex justify-center items-center p-1 gap-8 border">
                {/*Left panel*/ }
                <div className={containerStyle +" rounded-xl bg-[#197474] flex justify-between md:py-8 items-center border"}>
                    <div className="flex flex-col items-center">
                        <h1 className="text-yellow-4 w-fit font-bold md:text-[18pt] lg:text-[19pt] xl:text-[20pt]">Join Us</h1>
                        <a className="underline w-fit lg:text-[13pt]">Create account</a>
                    </div>
                    <form className="flex flex-col flex md:gap-2 lg:gap-4 px-8 items-center border">
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password"/>
                        <button className="bg-white text-green-4 rounded-full w-fit px-4 py-1">Login</button>
                    </form>
                    <a className="underline text-[8pt]">Forgot password?</a>
                </div>

                {/*Right Panel*/}
                <div className={containerStyle + " flex justify-between border border-red-500 lg:border-gray-500 xl:border-yellow-500 2xl:border-white"}>
                    <img className="md:h-7 lg:h-8" src={logo} />
                    <p className="text-yellow-4 underline font-medium md:text-[11pt] lg:text-[12pt] ">COLLABORATIVE INNOVATION EDUCATION</p>
                    <ul className="md:text-[10pt] lg:text-[11pt] md:ml-6">
                        {bullet_points}
                    </ul>
                    <div className="border h-auto flex py-1">
                        <iframe className="md:w-[85%] aspect-video" src="https://www.youtube.com/embed/uw7UkWrxQFc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
            <a href="mailto:support@sovall.com" className="absolute bottom-3 text-sm"> Reach out: support@sovall.com </a>
        </div>
        );
}

export default LogIn;