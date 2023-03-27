import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from './components/LogIn.Input';
import logo from '../../assets/common/sovall_2.svg';
import AuthContext from "../../contexts/auth-context";
import background from '../../assets/common/signup_background.png'



const LogIn = (props) => {
    
    const authCtx = useContext(AuthContext);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    /*hardtyped arrays describing sovall*/
    const points = [
        "Educational resources",
        "Network opportunities",
        "Budget support"];

    /*Style Constant*/
    const containerStyle = "md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] xl:w-[30rem] xl:h-[30rem] 2xl:w-[35rem] 2xl:h-[35rem] flex-col ";
    
    // Make an API request to firebase to login the user
    const handleLogin = async (e) => {
        e.preventDefault();
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCanACeDK7fsTwEPlfJDgehm9M2RFck9FA'
        const response = await fetch(url, {
                            method: 'POST',
                            body: JSON.stringify({
                                email: email, 
                                password: password,
                                returnSecureToken: true
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
        );
        try{
            const data = await response.json();
            if(response.ok){
                // if login is successful, store the token in localStore using authContext hook
                authCtx.login(data.idToken, data.localId);
                // redirect the user after login
                navigate('/home')
            }else{
                // if login was unsuccessful, let the user know what went wrong
                console.log(data);
                if(data?.error?.errors){ // if the returned data contains error
                    if(data.error.errors[0].reason === "invalid"){
                        alert('Incorrect password or login');
                    }
                }
            }
        }catch(e){
            console.log(e)
        }
        
    }

    /*Array of components for the bullet points*/
    const bullet_points = points.map(point => {
        return (
            <li key={point[0]} className="flex gap-1">
                <span>●</span>
                <p>{point}</p>
            </li>
        );
    });

    return (
        <div className="relative bg-green-6 h-full w-full flex  justify-center flex-col items-center text-white overflow-auto">
            <div className="h-fit flex justify-center items-center p-1 gap-20">
                {/*Left panel - ie login container*/ }
                <div className={containerStyle +" rounded-xl bg-[#197474] bg-cover sm:bg-cover sm:bg-center sm:bg-justify-center sm:bg-[length:300px_180px] lg:bg-justify-center lg:bg-cover xl:bg-[length:700px_620px] lg:bg-justify-center lg:bg-[length:540px_540px] md:bg-center md:bg-justify-center md:bg-[length:360px_360px] bg-no-repeat flex justify-between md:py-8 items-center"} style={{backgroundImage: `url(${background})`}}>
                    <div className="flex flex-col items-center">
                        <h1 className="text-yellow-4 w-fit font-bold md:text-[18pt] lg:text-[19pt] xl:text-[20pt] 2xl:text-[24pt]">Join Us</h1>
                        <a href = '/accountsetup' className="underline w-fit lg:text-[13pt] xl:text-[15pt] 2xl:text-[17pt]">Create account</a>
                    </div>
                    <form onSubmit = {handleLogin} className="flex flex-col flex md:gap-2 lg:gap-4 px-8 items-center lg:w-2/3">
                        <Input type="email" placeholder="Email" value={email} setValue={setEmail}/>
                        <Input type="password" placeholder="Password" value={password} setValue={setPassword} ps={true}/>
                        <button className="bg-white text-green-4 rounded-full w-fit px-4 py-1">Login</button>
                    </form>
                    <a href = '/forgotpassword' className="underline text-[8pt] lg:text-[10pt] xl:text-[12pt]">Forgot password?</a>
                </div>

                {/*Right Panel - quick info about sovall*/}
                <div className={containerStyle + " flex justify-between border-red-500 lg:border-gray-500 xl:border-yellow-500 2xl:border-white"}>
                    <img className="md:h-7 lg:h-8" src={logo} />
                    <p className="text-yellow-4 underline font-medium md:text-[11pt] lg:text-[14pt] xl:text-[16pt]  2xl:text-[18pt]">Solve problems</p>
                    <ul className="md:text-[10pt] lg:text-[13pt]  xl:text-[15pt]  2xl:text-[17pt] md:ml-6">
                        {bullet_points}
                        <a className="text-[11pt]" href="/about">Learn more...</a>
                    </ul>
                    <div className="h-auto flex py-1">
                        <iframe className="md:w-[85%] aspect-video" src="https://www.youtube.com/embed/uw7UkWrxQFc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
            <a href="mailto:support@sovall.com" className="absolute bottom-3 text-sm"> Reach out: support@sovall.com </a>
        </div>
        );
}

export default LogIn;