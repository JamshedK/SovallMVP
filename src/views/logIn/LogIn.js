import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from './components/LogIn.Input';
import logo from '../../assets/common/sovall_2.svg';
import AuthContext from "../../contexts/auth-context";
import background from '../../assets/common/signup_background.png'
import LearnMore from "../home/components/LearnMore";



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
        const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
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

    const [learnMore, setLearnMore] = useState(false);

    return (
        <div className="relative bg-green-6 h-full w-full flex  justify-center flex-col items-center text-white overflow-auto">
            <div className="h-full flex relative max-md:top-10 max-md:mt-14 max-md:pt-8 max-sm:flex-col justify-center items-center p-1 gap-10 max-md:gap-5">
                {/*Left panel - ie login container*/ }
                <div className={containerStyle +" rounded-xl bg-[#197474] bg-cover sm:bg-cover sm:bg-center sm:bg-justify-center sm:bg-[length:360px_180px] lg:bg-justify-center lg:bg-cover xl:bg-[length:700px_620px] lg:bg-justify-center lg:bg-[length:540px_540px] md:bg-center md:bg-justify-center md:bg-[length:360px_360px] bg-no-repeat flex justify-between md:py-8 items-center max-md:h-[416px] py-8"} >
                    {/* style={{backgroundImage: `url(${background})`}} */}

                    <div className="flex flex-col items-center gap-6">
                        <img className="relative top-4 h-12 md:h-12 lg:h-12" src={logo} />
                        {/* <h1 className="text-yellow-4 w-fit font-bold md:text-[18pt] lg:text-[19pt] xl:text-[20pt] 2xl:text-[24pt]">Join Us</h1> */}
                        <button className="relative top-4 bg-white text-green-4 rounded-full w-fit px-4 py-1">
                            <a href = '/accountsetup' className="">Create account</a>

                        </button>

                        <h1 className="relative max-md:top-1 md:top-3">or</h1>
                    </div>

                    <form onSubmit = {handleLogin} className="flex flex-col flex md:gap-2 lg:gap-4 px-8 items-center gap-3 lg:w-2/3">
                        <Input type="email" placeholder="Email" value={email} setValue={setEmail}/>
                        <Input type="password" placeholder="Password" value={password} setValue={setPassword} ps={true}/>
                        <button className="bg-white text-green-4 rounded-full w-fit px-4 py-1">Login</button>
                    </form>

                    <a href = '/forgotpassword' className=" text-[8pt] lg:text-[10pt] xl:text-[12pt]">forgot password?</a>
                    
                </div>

                {/*Right Panel - quick info about sovall*/}
                <div className={containerStyle + " gap-1 flex justify-between border-red-500 lg:border-gray-500 xl:border-yellow-500 2xl:border-white"}>
                    {/* <img className="h-14 md:h-7 lg:h-8" src={logo} /> */}
                    {/* text-yellow-4 font-bold text-[20pt] font-medium md:text-[11pt] lg:text-[14pt] xl:text-[16pt]  2xl:text-[18pt] */}
                    {/* <ul className="md:text-[10pt] lg:text-[13pt]  xl:text-[15pt]  2xl:text-[17pt] "> */}
                        {/* {bullet_points} */}
                        {/* <h1>U</h1> */}
                        {/* <a className="text-[11pt]" href="/about">Learn more...</a> */}
                    {/* </ul> */}

                    <div className="gap-0">
                        <h1 className="text-yellow-4 font-bold text-[30px]">Solve Problems</h1>
                        <h1 className="font-bold text-[30px]">Uni Students'</h1>
                        <h1 className="font-bold text-[29px]">Collaboration</h1>
                        <h1 className="font-bold text-[34px]">Community</h1>
                    </div>
                    

                    
                    
                    <div className="relative flex top-12 max-md:top-24 md:right-20 text-[#525252]">
                        <LearnMore value={learnMore} setValue={setLearnMore} />
                    </div>

                    <div className="h-auto relative top-9 max-md:top-24 flex py-1">
                        <iframe className="md:w-[85%] aspect-video" src="https://youtube.com/embed/4_S2yqmOW38" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>

                    <a href="mailto:support@sovall.com" className="relative text-black border-2 bg-white text-center rounded-[14px] w-[250px] top-6  max-md:top-24 justify-center items-center text-sm"> Reach out: support@sovall.com </a>


                </div>


            </div>
        </div>
        );
}

export default LogIn;