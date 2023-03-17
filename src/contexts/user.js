import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from './auth-context';
import {db, storage} from './../firebase-config'
import { doc, getDoc } from "@firebase/firestore";
import {getDownloadURL, ref} from 'firebase/storage'



const UserContext = createContext({
    username: '',
    image_path: ''
})

export const UserContextProvider = (props) => {
    const [username, setUserName] = useState();
    const [profilePicPath, setProfilePicPath] = useState();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        // get user info
        const getUserInfo = async () => {
            const response = await getDoc(doc(db, "users", authCtx.userID))
            const data = response.data(); 
            const timestamp = new Date().getTime();
            setUserName(data.firstname + ' ' + data.lastname);
            // Get the download url for the profile pic
            const imageRef = ref(storage, data.image_path)
            try{
                const downloadURL = await getDownloadURL(imageRef)
                setProfilePicPath(`${downloadURL}?t=${timestamp}`);
            } catch(e){
                console.log(e);
            }
        }
        getUserInfo();

    },[])

    const contextValue = {
        username: username,
        imagePath: profilePicPath
    }
    return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>
}

export default UserContext;