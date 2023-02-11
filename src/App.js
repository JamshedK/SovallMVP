import * as React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LogIn from "./views/logIn/LogIn";
import Logout from "./views/logout/Logout";
import ForgotPassword from "./views/password/ForgotPassword";
import ChangePassword from "./views/password/ChangePassword";
import AccountSetUp from "./views/accountSetUp/AccountSetUp";
import SkillsAndInterests from "./views/skillsAndInterests/SkillsAndInterests";
import About from "./views/about/About";
import Home from "./views/home/Home";
import NotFound from "./views/notFound/NotFound";
import Loader from "./views/loader/Loader";
import HeaderA from "./views/common/HeaderA";
import HeaderB from "./views/common/HeaderB";
import AuthContext, { AuthContextProvider } from "./contexts/auth-context";


export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    const [temp, setTemp] = React.useState(true); //this is just a temporary way to switch between the 2 different headers, or no header
    const authCtx = React.useContext(AuthContext);

    return (
        <div className="bg-green-2 h-full md:screen md:h-screen font-nunito">
            <Header />
            <Routes>
                <Route path="/" element={<Main subcription={subscription} setSubscription={setSubscription} />} />
                <Route path="/ourStory" element={<About />} />
            </Routes>
        </div>
        );
}
