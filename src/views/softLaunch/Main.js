import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import bullet_point from './assets/bullet_point.svg';
import mascot from './assets/mascot_lg.svg';
import instagram from './assets/instagram.svg';
import gradientbg from './assets/gradient_bg.png';


const items = ["Find, shape, and pursue your passion",
                "Connect with creatives and hobbyists",
                "Get support for your project",
                "Enjoy affordable high quality education"
                ]

const list = items.map(item => {
    return (
        <div key={item[0]+item[3]} className="flex gap-2 items-center">
            <img className="h-4" src={bullet_point} />
            <p>{item}</p>
        </div>
        );
    }
);
function Main() {
    const [submit, setSubmit] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [email, setEmail] = useState("yourname@email.com")
    const [validEmail, setValidEmail] = useState(false);
    const [name, setName] = useState("Name Lastname");
    const [validName, setValidName] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
    }

    const gradient = {
        backgroundImage: `url(${gradientbg})`
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const handleEmail = (e) => {
        const email = e.target.value;
        const isValid = isValidEmail(email)
        setEmail(email)
        if (isValid) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }

        if (isValid && email != "yourname@email.com" && validName) {
            setCanSubmit(true)
        } else {
            setCanSubmit(false)
        }
    };

    const handleName = (e) => {
        const name = e.target.value;
        const lower = name.toLowerCase();
        
        if (lower != "name" && lower != "lastName" && lower != "name lastname" && lower != "namelastname" && lower != "namelast") {
            setValidName(name)
        }
        setName(name);
    };

    return (
        <div className="h-90% w-full flex max-md:flex-col justify-center items-center">
            <div className="md:w-80% lg:w-70% lg:w-2/3 max-md:flex-col h-95% lg:h-80% flex">
                {/*Left panel*/}
                <div className="max-md:h-full max-md:px-12 max-md:py-8 max-md:gap-8 flex flex-col max-md:items-center md:w-1/2 md:h-full text-white text-sm md:justify-between md:py-2 lg:gap-4 xl:gap-4 lg:justify-center border" >
                    
                    <div className="w-full md:w-2/3 lg:w-4/5 border lg:text-sm xl:text-xl xl:pb-14">
                        <h1 className="font-medium text-xl xl:text-[1.7rem] pb-2 text-yellow-3 max-md:w-full">Collaborative Innovative Education!</h1>
                        <div className="pl-8 flex flex-col gap-1">
                            {list}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:w-[13rem] lg:w-[60%] xl:w-2/3 pl-6 border xl:w-4/5 ">
                        <h1 className="font-medium text-lg text-yellow-3">Demo Video </h1>
                        <iframe className="w-full xl:w-4/5 aspect-video" src="https://www.youtube.com/embed/fzsjbcMxIEo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                    </div>

                </div>

                {/*Right panel*/}
                <div className="h-[32rem] max-md:h-[50rem] max-md:py-8 md:w-1/2 md:h-full flex justify-center items-center md:py-2 text-white border">
                    <div style={gradient} className="bg-cover bg-center w-5/6  h-[30rem] max-md:w-2/3 max-md:h-[40rem] md:h-full lg:w-2/3 xl:h-4/5 flex rounded-lg flex-col py-10 px-14 gap-3 shadow-2xl justify-between">
                        <div className="h-4/6 text-white flex flex-col gap-y-4">
                            <img src={mascot} className="h-4/6" />
                            <div className="flex flex-col align-items-center flex flex-col justify-center items-center">
                                <p className="font-medium md:text-sm max-2xl:text-normal 2xl:text-normal">IT'S TIME TO SHINE</p>
                                <p className="max-xl:text-sm max-2xl:text-normal">JOIN FOR UPDATES!</p>
                            </div>

                        </div>
                        <form className={submit ? "hidden": "w-full h-full flex flex-col items-center w-full gap-y-3 text-xs"} onSubmit={handleSubmit}>
                            <div className="border-b border-white block  w-full">
                                <input value={name} className="border-none bg-transparent pl-4 text-white text-xs w-full p-0 focus:border-transparent focus:ring-0 placeholder:text-xs placeholder:text-white" type="text" placeholder="Name" onChange={handleName}/>
                            </div>
                            <div className={"border-b block w-full border-white" + (validEmail ? "": "focus-within:border-rose-600")}>
                                <input value={email} className="border-none text-white  bg-transparent pl-4 text-xs w-full p-0 focus:border-transparent focus:ring-0 placeholder:text-xs placeholder:text-white" type="email" placeholder="Email" onChange={handleEmail}></input>
                            </div>
                            <button className="block bg-white text-green-2  dropshadow-xl rounded-full px-2 py-1 mt-2 font-medium italic disabled:bg-gray-200 disabled:hover:cursor-no-drop" disabled={!canSubmit}>Count me in!</button>
                        </form>
                        <p className={submit ? "font-bold flex text-center" :"hidden"}>Thank you for signing up for updates!</p>
                        <a className="h-6 flex gap-x-2 justify-center" href="https://www.instagram.com/sovall_com/">
                            <p className="text-xs">Follow us: </p>
                            <img className="h-4" src={instagram} />
                        </a>
                    </div>

                </div>

            </div>
        </div>
        );
}

export default Main;