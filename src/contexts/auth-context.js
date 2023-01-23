import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

export  const AuthContextProvider = (props) => {
    const storedToken = localStorage.getItem('token');
    const [token, setToken] = useState(storedToken);

    const userIsLoggedIn = !!token // if token is empty, returns false

    const loginHandler = (token) => {
        console.log('token stored, auth-context');
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        console.log('token deleted, auth-context')
        setToken(null)
        localStorage.removeItem('token');
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}> {props.children} </AuthContext.Provider>
};

export default AuthContext;