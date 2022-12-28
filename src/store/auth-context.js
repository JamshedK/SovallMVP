import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)

    const userIsLoggedIn = !!token // if token is empty, returns false

    const loginHandler = (token) => {
        setToken(null)
    }

    const logoutHandler = () => {
        setToken(null)
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
        
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;