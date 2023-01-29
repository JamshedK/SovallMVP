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
import Loader from "./views/loader/Loaders";
import HeaderA from "./views/common/HeaderA";
import HeaderB from "./views/common/HeaderB";
import AuthContext, { AuthContextProvider } from "./contexts/auth-context";


export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    const [temp, setTemp] = React.useState(true); //this is just a temporary way to switch between the 2 different headers, or no header
    const authCtx = React.useContext(AuthContext);

    return (
        <div className="font-nunito w-screen flex flex-col h-screen relative overflow-auto scrollbar-hide">
            <header className="flex h-fit w-full sticky top-0 z-20">
                {temp&& <HeaderA />}
                {!temp&& <HeaderB />}
            </header>
            <div className="relative w-full flex justify-center overflow-auto scrollbar-auto z-10 grow">
                <Routes>
                    <Route path="/" element={<LogIn />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/changepassword" element={<ChangePassword />} />
                    <Route path="/accountsetup" element={<AccountSetUp />} />
                    <Route path="/skills-interests" element={<SkillsAndInterests />} />
                    {authCtx.isLoggedIn && <Route path="/home" element={<Home />} />}
                    <Route path="/about" element={<About />} />
                    <Route path="/signout" element={<Logout/>}/>
                    <Route path="/loader" element={<Loader/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>        
      );
}
