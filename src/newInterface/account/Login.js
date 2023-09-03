import previous_slide from '../../assets/newInterface/account/previous_slide.svg';
import next_slide from '../../assets/newInterface/account/next_slide.svg';
import slide_1 from '../../assets/newInterface/account/slide_1.svg';
import slide_2 from '../../assets/newInterface/account/slide_2.svg';
import slide_3 from '../../assets/newInterface/account/slide_3.svg';
import google_icon from '../../assets/newInterface/account/google_icon.svg';
import sovall_logo from '../../assets/newInterface/account/sovall_logo.svg';

import {GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useContext, useEffect, navigate } from "react";
import AuthContext from "../../contexts/auth-context";
import { auth } from "../../firebase-config";

import Input from "../../views/common/Input";

const Login = (props) => {
    const authCtx = useContext(AuthContext);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0)

    const slideArray = [slide_1, slide_2, slide_3]

    useEffect(() => {
        // Change the slide every two seconds
        const refreshData = () => {
            // setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
        };
    
        // Set up a timer with setInterval to call the refreshData function every 3 seconds
        const intervalId = setInterval(refreshData, 3000);
        // Clean up the interval when the component unmounts to avoid memory leaks
        return () => {
            clearInterval(intervalId);
        };
      }, []); 

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
    // Login with Google handler
    // TODO: save token
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            console.log(user)
            console.log("Logged in user (Google):", user);
            // Login the user
            // authCtx.login(user);
            // Redirect to home page after successful login
            navigate("/");
        } catch (error) {
            console.error("Error logging in with Google:", error);
            alert("An error occurred while logging in with Google. Please try again.");
        }
      };
    return (
        <div className="bg-[#044A54] w-full h-full flex flex-row flex-wrap items-center justify-center ">
            <div>
                {/* logo */}
                <div className="flex justify-center">
                        <img src={sovall_logo}/>
                    </div>
                    {/* Slideshow */}
                    <div className="flex flex-row space-x-3 justify-center items-center mt-10 ">
                        <button
                            className="h-fit" 
                            onClick={() => {
                                setCurrentSlide((prev) => (prev === 0 ? slideArray.length - 1 : prev - 1))
                            }}
                        >
                            <img src={previous_slide}/>
                        </button>
                        <img className="w-[80%] lg:w-[40%] md:w-[40%]"
                            src={slideArray[currentSlide]}>
                        </img>
                        <button
                            className="h-fit" 
                            onClick={() => {
                                setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
                            }}
                        >
                            <img src={next_slide}/>
                        </button>
                    </div>
            </div>
            <div className="mx-16">
                <form className="flex flex-col md:gap-2 lg:gap-4 items-center gap-3 lg:w-2/3">
                    <Input 
                        type="email" 
                        placeholder="Email..." 
                        value={email} 
                        setValue={setEmail}/>
                    <Input 
                        type="password" 
                        placeholder="Password..." 
                        value={password} 
                        setValue={setPassword} 
                        ps={true}/>
                    <button 
                        className="bg-white text-green-4 w-full px-4 py-1 text-[15px] rounded-md"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <h1 
                        className="mt-4 text-[15px] lg:text-[10pt] xl:text-[12pt] text-white"
                    >
                        Don't have an account?
                    </h1>
                    <button 
                        className="bg-[#4D7E86] text-white w-full px-4 py-2 text-[15px] rounded-md"
                        onClick={() => {
                            navigate('/accountsetup')
                        }}
                    >
                        Sign up
                    </button>
                    <button 
                        className="bg-[#4D7E86] text-white w-full text-[15px] rounded-md"
                        onClick={handleGoogleLogin}
                    >
                        <div className="flex flex-row items-center ">
                            <img 
                                className="h-full mr-2" 
                                src={google_icon} alt="Google Icon" />
                            <span className="mx-2">Continue with Google</span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;