import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import LogIn from "./views/logIn/LogIn";
import About from "./views/about/About";
import ForgotPassword from "./views/password/ForgotPassword";
import ChangePassword from "./views/password/ChangePassword";
import AccountSetUp from './views/accountSetUp/AccountSetUp';
import { AuthContextProvider } from './contexts/auth-context';
import { SearchContextProvider } from './contexts/search-context';
import { UserContextProvider } from './contexts/user';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <SearchContextProvider>
            <UserContextProvider>
                <BrowserRouter>
                    {<App/>}
                </BrowserRouter>
            </UserContextProvider>
        </SearchContextProvider>
    </AuthContextProvider> 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
