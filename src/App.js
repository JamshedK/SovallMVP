import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
<<<<<<< HEAD

=======
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
>>>>>>> 6b65328568b9feb346486551aa233fe58bfab996
export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    console.log(subscription);
    return (
        <div className="bg-green-2 h-full md:screen md:h-screen font-nunito">
            <Routes>
<<<<<<< HEAD
=======
                <Route path="/ourstory" element = {<About/>}/>
                <Route path="/signup" element = {<AccountSetUp/>}/>
                <Route path="/" element = {<LogIn/>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                <Route path="/changepassword" element = {<ChangePassword/>}/>
                <Route path="/about" element = {<About/>}/>
>>>>>>> 6b65328568b9feb346486551aa233fe58bfab996
            </Routes>
            
        </div>
        
      );
}
