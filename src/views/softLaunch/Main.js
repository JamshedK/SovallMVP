import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import bullet_point from './assets/bullet_point.svg';
import mascot from './assets/mascot_lg.svg';
import instagram from './assets/instagram.svg';
import gradientbg from './assets/gradient_bg.png';

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNzcxZWEyMGI0NTk2NzlkYTYzYjNlMWMxMmUwOTU1M2U0ZWRhM2U5NzY3YjUyZDY2MWRmMDVmN2VkNWJlYWNjM2M3ZmMyMTNkODZmMGZjYzgiLCJpYXQiOjE2NzAxOTk3NDIuNjQ0MTM0LCJuYmYiOjE2NzAxOTk3NDIuNjQ0MTM2LCJleHAiOjQ4MjU4NzMzNDIuNjM5MTI1LCJzdWIiOiIyNjYyNDIiLCJzY29wZXMiOltdfQ.EySh1-3Xgy8kS4SyGPdhlDstNE12w2NYxhYgtwLVraC6Dos2RjOfgoEPTrwZ6RyZUEZy41g8wOKGZlcprr-wvCDwdMFNkwrgmkXXcq3sR0QSaaO-q7UaASJlAoqYffn7NkEKr2Q20GpQLa0bXUH8HkXPlxlEltWLpWGc-jg1l9OkSTX0980jdmGpLXkYw5InlFwvthvLze4HIi7W078-HS5YrrsW5ZH5TllVZ6WJasnK3rm5fGi_acsEsX2BTHh45btjKAupRxMg_uF5mtdpBGpanaGAM9WCjIS3TKCxR0FJN3-d6pPWmuqj3lKaUkdBQ37qkOx69OmpU7XAOf-og8SqUFfBB2g9xyzhcjODk7wX0jnVKHCY-BpZ1zQK9C1YVTSEz0pka7X6GuF7qQyRhb_nxQFmcnr7caumClm94I57AYCtIkuxszgsjsRMwCflN0b1iY53zSiOpPWX8NmXtuVGW8eYi242DgP_ZTR7oVFaF3aUsaMmNMoBzFElkSiJlM54m7zqH0tFxpmGVd8MEASDHOhQs8U6qbvdmSCEQa_yNOqFNN7bmXCZykOGGWsV6CYtcdP1QV7CMLVAvFuNSxeTY4jeLn6znUWPugUNd9MGxamX9YTvW115RQOF3KHWBVfq-l3YgBNremXbNHL8-Z2WZU1qYl6QkQFMlMDDpck "
        },
        body: JSON.stringify(data)
    });
    return response.text();
}



const items = ["Find solutions in teams",
                "Get support from us"
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
    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false);
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = {
                            "email": email,
                            "fields": {
                                "name": name
                            }
                          }
        postData('https://connect.mailerlite.com/api/subscribers', userInfo)
            .then((data) => {
                console.log(data)
            });
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

        if (isValid && email !== "yourname@email.com" && validName) {
            setCanSubmit(true)
        } else {
            setCanSubmit(false)
        }
    };

    const handleName = (e) => {
        const name = e.target.value;
        const lower = name.toLowerCase();
        
        if (lower !== "name" && lower !== "lastName" && lower !== "name lastname" && lower !== "namelastname" && lower !== "namelast") {
            setValidName(name)
        }
        setName(name);
    };

    return (
        <div className="h-90% w-full flex max-md:flex-col justify-center items-center ">
            <div className="md:w-80% lg:w-[70%] lg:w-2/3 max-md:flex-col h-95% lg:h-[85%] flex">
                {/*Left panel*/}
                <div className="max-md:h-full max-md:px-12 max-md:py-8 max-md:gap-8 flex flex-col md:justify-center md:w-1/2 md:h-full text-white text-sm md:py-2 md:gap-8" >
                    
                    <div className="w-full lg:w-4/5 2xl:text-xl 2xl:pb-14">
                        <h1 className="font-medium text-normal pb-4 md:text-[14pt] lg:text-[16pt] xl:text-[18pt] 2xl:text-[22pt] pb-2 text-yellow-3 max-md:w-full ">Solve Social Problems</h1>
                        <div className="pl-8 flex flex-col gap-3 md:text-[13pt] lg:text-[15pt] xl:text-[16pt] 2xl:text-[22pt]">
                            {list}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:w-[13rem] lg:w-[60%] xl:w-2/3 xl:w-4/5 ">
                        <h1 className="font-medium text-lg text-yellow-3  md:text-[15pt] lg:text-[16pt] xl:text-[18pt] 2xl:text-[22pt]">Demo Video </h1>
                        <iframe className="w-full xl:w-4/5 aspect-video" src="https://www.youtube.com/embed/fzsjbcMxIEo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                    </div>

                </div>

                {/*Right panel*/}
                <div className="h-[32rem] max-md:h-[35rem] max-md:py-8 md:w-1/2 md:h-full flex justify-center items-center md:py-2 text-white">
                    <div style={gradient} className="max-md:bg-cover bg-center w-5/6 max-md:w-[80%] max-md:h-[32rem] md:h-full xl:w-2/3 xl:h-full flex rounded-lg flex-col py-10 px-14 gap-3 shadow-2xl justify-between">
                        <div className="h-[50%] lg:h-[60%] text-white flex flex-col gap-y-4 ">
                            <img src={mascot} className="h-[70%] lg:h-4/6" />
                            <div className="flex flex-col align-items-center flex flex-col justify-center items-center">
                                <p className="font-medium md:text-sm max-2xl:text-normal xl:text-[1rem]  2xl:text-[1.4rem]">IT'S TIME TO SHINE</p>
                                <p className="max-lg:text-sm lg:text-normal xl:text-[1rem] 2xl:text-[1.4rem]">JOIN FOR UPDATES!</p>
                            </div>

                        </div>
                        <form className={submit ? "hidden": "w-full h-full flex flex-col items-center gap-y-3 text-xs"} onSubmit={handleSubmit}>
                            <div className={"border-b block w-full border-white xl:w-[85%] 2xl:h-[20%] " + (validName ? "" : "focus-within:border-rose-600")}>
                                <input value={name} className="border-none h-full bg-transparent pl-4 text-white text-xs xl:placeholder:text-[10pt] xl:text-[10pt] 2xl:placeholder:text-[12pt] 2xl:text-[12pt] w-full focus:border-transparent focus:ring-0 placeholder:text-xs placeholder:text-white " type="text" placeholder="Name" onChange={handleName}/>
                            </div>
                            <div className={"border-b block w-full border-white xl:w-[85%] h-fit" + (validEmail ? "": "focus-within:border-rose-600")}>
                                <input value={email} className="border-none h-fit text-white  bg-transparent pl-4 text-xs  xl:placeholder:text-[10pt] xl:text-[10pt] 2xl:placeholder:text-[12pt] 2xl:text-[12pt] w-full p-0 focus:border-transparent focus:ring-0 placeholder:text-xs placeholder:text-white" type="email" placeholder="Email" onChange={handleEmail}></input>
                            </div>
                            <button className="block bg-white text-green-2  dropshadow-xl rounded-full px-2 py-1 mt-2 font-medium italic disabled:bg-gray-200 disabled:hover:cursor-no-drop" disabled={!canSubmit}>Count me in!</button>
                        </form>
                        <p className={submit ? "font-bold text-center 2xl:text-[1.5rem]" :"hidden"}>Thank you for signing up for updates!</p>
                        <a className="h-6 2xl:h-9 flex gap-x-2 justify-center items-center " href="https://www.instagram.com/sovall_com/">
                            <p className="text-xs 2xl:text-[1.1rem]">Follow us: </p>
                            <img className="h-4 2xl:h-6" src={instagram} />
                        </a>
                    </div>

                </div>

            </div>
        </div>
        );
}

export default Main;