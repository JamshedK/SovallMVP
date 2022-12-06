import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import About from "./views/softLaunch/About";
import Header from './views/softLaunch/components/Header';
import Main from "./views/softLaunch/Main";

export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    return (
        
        <div className="bg-green-2 h-full md:screen md:h-screen font-nunito">
            <Header />
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/ourStory" element={<About />} />
            </Routes>
        </div>
        );
}