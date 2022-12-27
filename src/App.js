import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Header from './views/softLaunch/components/Header';
import Main from "./views/softLaunch/Main";
import LogIn from "./views/logIn/LogIn";
import ForgotPassword from "./views/password/ForgotPassword";
import ChangePassword from "./views/password/ChangePassword";
import About from "./views/softLaunch/About";
import AccountSetUp from "./views/accountSetUp/AccountSetUp";
/*
<LogIn/>
*/
export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    console.log(subscription);
    return (
        <div className="bg-green-2 h-full md:screen md:h-screen font-nunito">
            <Routes>
                <Route path="/ourstory" element = {<About/>}/>
                <Route path="/signup" element = {<AccountSetUp/>}/>
                <Route path="/" element = {<LogIn/>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                <Route path="/changepassword" element = {<ChangePassword/>}/>
                <Route path="/about" element = {<About/>}/>
            </Routes>
            
        </div>
        
      );
}
