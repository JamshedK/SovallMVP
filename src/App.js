import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import LogIn from "./views/logIn/LogIn";
import ForgotPassword from "./views/password/ForgotPassword";
import ChangePassword from "./views/password/ChangePassword";
import AccountSetUp from "./views/accountSetUp/AccountSetUp";
import SkillsAndInterests from "./views/skillsAndInterests/SkillsAndInterests";
export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    console.log(subscription);
    return (
        <div className="bg-green-2 h-full md:screen md:h-screen font-nunito">
            <Routes>
                <Route path="/signup" element = {<AccountSetUp/>}/>
                <Route path="/" element = {<LogIn/>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                <Route path="/changepassword" element = {<ChangePassword/>}/>
                <Route path="/accountsetup" element={<AccountSetUp />} />
                <Route path="/skills-interests" element={<SkillsAndInterests />} />

            </Routes>
            
        </div>
        
      );
}
