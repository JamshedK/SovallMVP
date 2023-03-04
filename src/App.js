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
import HeaderA from "./views/common/HeaderA";
import HeaderB from "./views/common/HeaderB";
import NewPost from "./views/Post/NewPost";
import AuthContext, { AuthContextProvider } from "./contexts/auth-context";


export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    const authCtx = React.useContext(AuthContext);  //Auth Context which gives access to the user that is logged in
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <div className="font-nunito w-screen flex flex-col h-screen relative overflow-auto scrollbar-hide">
            <header className="flex h-fit w-full sticky top-0 z-20">
                {/*different headers for if the user is logged in*/}
                {!authCtx.isLoggedIn && <HeaderA />}
                {authCtx.isLoggedIn && <HeaderB />} 
            </header>
            <div className="relative w-full flex justify-center overflow-auto scrollbar-auto z-10 grow">
                <Routes>
                    {/*
                        Routing permission depends on the state of the user. authCtx.isLoggedIn is either true
                        or false, which shows if the user is logged in. 
                    */}
                    <Route path="/" element={isLoggedIn ? <Home /> : <LogIn />} />
                    {!authCtx.isLoggedIn && <Route path="/forgotpassword" element={<ForgotPassword />} />}
                    <Route path="/changepassword" element={<ChangePassword />} />
                    <Route path="/accountsetup" element={isLoggedIn ? <Home /> : <AccountSetUp />} />
                    <Route path="/skills-interests" element={<SkillsAndInterests />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signout" element={<Logout />} />
                    <Route path="/newpost" element={<NewPost/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </div>



        </div>        
      );
}
