// Assets
import add_profile_pic from '../../../assets/editprofile/add_profile_pic.svg';
import remove_interest from '../../../assets/editprofile/remove_interest.svg';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../../../contexts/auth-context";
import UserContext from '../../../contexts/user';
import {db} from '../../../firebase-config'
import Loader from '../../loader/Loader';

const QuickAccess = (props) => {
    return (
        <a href={props.href} className="flex flex-col h-5">
            <img className="h-full" src={props.src} />
            <label className="text-[8pt]">{props.label}</label>
        </a>
    );
}
const Label = (props) => {
    const bg = props.bg;
    return <label className={"text-white rounded-xl px-2 py-1 text-[8pt] " + bg} >{props.value}</label>
}
const InfoBlock = (props) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="font-bold text-[11pt]">{props.title}</h1>
            <input className="w-full px-3 py-2 placeholder-gray-500 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                type="text" placeholder="Search"/>
                <div className="flex flex-wrap gap-1">
                {props.children}
            </div>
        </div>
    );

}

const EditProfile = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const authCtx = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    
    useEffect(()=>{
        setIsLoading(true);
        const getUserInfo = async () =>{
            const response = await getDoc(doc(db, "users", authCtx.userID))
            const data = response.data(); 
            setUserInfo(response.data())
        } 
        getUserInfo();
        setIsLoading(false);
    }, [])

     /* To make sure to render the skills component only when the request is complete
        Check if array of interests is empty and if so, sets it to null
    */
    const skills = userInfo.skills && Array.isArray(userInfo.skills) ? userInfo.skills.map((skill,i) => {
        return <Label key={"info-skill-"+i}  value={skill} bg="bg-green-4"/>
    }) : null

    const interests = userInfo.interests && Array.isArray(userInfo.interests) ? userInfo.interests.map((interest,i) => {
        return <Label key={"info-interest-" + i}  value={interest} bg="bg-yellow-4" />
    }) : null;

    const handleSaveChanges = () => {
        if (window.confirm("Are you sure you want to save this changes?")) {
            // TODO: Handle the new changes
          }
    }

    const handleChangePassword = () => {
        // Redirect the user to change password page
        navigate('/changepassword');
    }
    return(
        <div className="flex w-full justify-center bg-[#3C9A9A]">
            <div className={"bg-white px-8 pt-8 pb-3 rounded-b-xl flex flex-col gap-7 transition duration-150 ease-in-out " + props.width}>
                <div className="flex justify-between ">
                <div className="flex gap-4 ">
                    <div className='flex flex-row justify-between items-end'>
                        <img className="w-16 h-16 rounded-full" src={userCtx.profilePicPath} />
                        <label for='file-input' className='flex flex-row gap-6 pointer-events-auto left-[450px]'>
                            <img className='w-5 h-5' src={add_profile_pic}></img>
                            <input id='file-input' className='invisible w-0 h-0' type="file" accept="image/png, image/jpeg"/>
                        </label>
                    </div>
                    <div className="flex flex-col w-fit ">
                        <a href="/home" className="font-bold">{userCtx.username}</a>
                        <a className="text-blue-500 text-[9pt]" href="/home">{email}</a>
                        <p className="text-[9pt]">Let's have fun with creativity!</p>
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-6">
                    <InfoBlock title="Skills">{skills}</InfoBlock>
                    <InfoBlock title="Interest">{interests}</InfoBlock>
                    <button onClick={handleChangePassword}>Click here to change password</button>
                    <button onClick={handleSaveChanges}>Save changes</button>
                </div>
            </div>
        </div>
    )
    
}
export default EditProfile;