import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import About from "./views/softLaunch/About";
import Header from './views/softLaunch/components/Header';
import Main from "./views/softLaunch/Main";
import LogIn from "./views/logIn/LogIn";

/*
<LogIn/>
*/
export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    console.log(subscription);
    return (
        <div className="bg-green-2 h-full md:screen md:h-screen font-nunito">
            <Header />
            <Routes>
                <Route path="/" element={<Main subcription={subscription} setSubscription={setSubscription}/>} />
                <Route path="/ourStory" element={<About />} />
            </Routes>
            
        </div>
        
      );
}
