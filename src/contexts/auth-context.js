import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    userID: "",
    login: (token) => {},
    logout: () => {},
    accountSetup: (token, userID) => {}
})

export  const AuthContextProvider = (props) => {
    const storedToken = localStorage.getItem('token');
    const storedUserID = localStorage.getItem('userID');
    const [token, setToken] = useState(storedToken);
    const [userID, setUserID] = useState(storedUserID);

    const userIsLoggedIn = !!token // if token is empty, returns false

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const accountSetupHandler = (token, userID) => {
        setToken(token);
        setUserID(userID);
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token');
        setUserID(null);
        localStorage.removeItem('userID')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        accountSetup: accountSetupHandler
    }

    return <AuthContext.Provider value={contextValue}> {props.children} </AuthContext.Provider>
};

export default AuthContext;