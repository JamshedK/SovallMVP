import React, { useContext } from "react"
import AuthContext from "../../contexts/auth-context"

const Logout = (props) => {
    const authCtx = useContext(AuthContext)
    if (props.signout === true){
        authCtx.logout();
    }
    return (
        <p>Logging out</p>
    )
}

export default Logout;