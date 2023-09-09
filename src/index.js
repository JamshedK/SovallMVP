import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
import { SelectedTabContextProvider } from './contexts/selected-tab-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <SearchContextProvider>
            <UserContextProvider>
                <SelectedTabContextProvider>
                    <BrowserRouter>
                        {<App/>}
                    </BrowserRouter>
                </SelectedTabContextProvider>
            </UserContextProvider>
        </SearchContextProvider>
    </AuthContextProvider> 

);


