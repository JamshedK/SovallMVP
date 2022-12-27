import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
    const [subscription, setSubscription] = React.useState(false);
    console.log(subscription);
    return (
        <div className="bg-green-2 h-full md:screen md:h-screen font-nunito">
            <Routes>
            </Routes>
            
        </div>
        
      );
}
