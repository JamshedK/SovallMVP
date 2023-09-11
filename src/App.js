import * as React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
// import LogIn from "./views/logIn/LogIn";
import Login from "./newInterface/account/Login";
import Logout from "./views/logout/Logout";
import ForgotPassword from "./views/password/ForgotPassword";
import ChangePassword from "./views/password/ChangePassword";
// import AccountSetUp from "./views/accountSetUp/AccountSetUp";
import AccountSetup from "./newInterface/account/AccountSetup";
import SkillsAndInterests from "./views/skillsAndInterests/SkillsAndInterests";
import PeopleSearch from "./views/search/PeopleSearch";
import PostSearch from "./views/search/PostSearch";
import About from "./views/about/About";
import Home from "./views/home/Home";
import NewHome from "./newInterface/home/NewHome";
import EditProfile from "./views/home/components/EditProfile";
import MainFeed from "./views/mainFeed/MainFeed";
import NotFound from "./views/notFound/NotFound";
import HeaderA from "./views/common/HeaderA";
import TopNavBar from "./newInterface/navbar/TopNavBar"; 
import Profile from "./newInterface/profile/Profile";
import NewPost from "./views/Post/NewPost";
import ComingSoon from "./views/common/ComingSoon";
import AuthContext, { AuthContextProvider } from "./contexts/auth-context";
import { SearchContextProvider } from "./contexts/search-context";
import AboutSoftLaunch from "./views/about/AboutSoftLaunch";
import ShowPostById from "./views/search/ShowPostById";
import BottomNavBar from "./newInterface/navbar/BottomNavBar";
import NewProjectMobile  from "./newInterface/home/NewProjectMobile";
import { TabsMobile } from "./newInterface/home/Tabs";
import ProjectPageMain from "./newInterface/projectPage/ProjectPageMain";
import Skills from "./newInterface/account/Skills";

export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    const authCtx = React.useContext(AuthContext);  //Auth Context which gives access to the user that is logged in
    const isLoggedIn = authCtx.isLoggedIn;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // for checking if the user in mobile

    // Update the isMobile state when the screen is resized
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="md:screen md:h-screen font-inter w-screen flex flex-col h-screen relative overflow-auto scrollbar-hide">
            {!isMobile && <header className="flex h-fit w-full sticky top-0 z-20">
                {/*different headers for if the user is logged in*/}
                    {!authCtx.isLoggedIn && <SearchContextProvider></SearchContextProvider>}
                    {authCtx.isLoggedIn && <TopNavBar/>} 
            </header>}
            
            <div className="relative w-full flex justify-center overflow-auto scrollbar-auto z-10 grow">
                <Routes>
                    {/*
                        Routing permission depends on the state of the user. authCtx.isLoggedIn is either true
                        or false, which shows if the user is logged in. 
                    */}
                    <Route path="/" element={isLoggedIn ? <NewHome isMobile={isMobile}/> : <Login />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/changepassword" element={<ChangePassword />} />
                    <Route path="/accountsetup" element={<AccountSetup/>} />
                    <Route path="/skills-interests" element={<SkillsAndInterests />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/edit-profile" element={<EditProfile/>}/>
                    <Route path="/about" element={<AboutSoftLaunch />} />
                    <Route path="/signout" element={<Logout />} />
                    <Route path="/newpost" element={<NewPost/>}/>
                    <Route path="/newproject" element={<NewProjectMobile/>}/>
                    <Route path="/project-page" element={<ProjectPageMain/>}/> 
                    <Route path="/discussion" element={<TabsMobile/>}/>
                    <Route path='/mainfeed' element={<NewHome isMobile={isMobile}/>}></Route>
                    <Route path="/search/people" element={<PeopleSearch/>}/>
                    <Route path="/search/posts" element={<PostSearch/>}/>
                    <Route path="/search/posts/id" element={<ShowPostById/>}/>
                    <Route path="/comingsoon" element={<ComingSoon/>}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            {isMobile && isLoggedIn && 
                <div className="bottom-0 w-full fixed z-10">
                    <BottomNavBar />
                </div>}
        </div>        
      );
}
