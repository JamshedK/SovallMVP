import { useLocation } from 'react-router-dom';

import arrow_up from '../../assets/home/arrow_up.svg';
import { useState, useEffect, useContext } from 'react';
import {getDownloadURL, ref} from 'firebase/storage'
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../../contexts/auth-context";
import {db, storage} from '../../firebase-config'

const QuickAccess = (props) => {
    return (
        <a href={props.href} className="flex flex-col h-[1.25rem]">
            <label 
                className="text-[8pt] md:text-[10px] lg:text-[12px] cursor-pointer"
            >
                {props.label}
            </label>
        </a>
    );
}

const InfoBlock = (props) => {
    return (
        <div className="w-full flex flex-col gap-[0.5rem]">
            <h1 className="font-bold text-[11pt]">{props.title}</h1>
            <div className="flex flex-wrap gap-[0.25rem]">
                {props.children}
            </div>
        </div>
    );

}

const Own = () => {
    return (
        <div className="flex gap-[0.5rem] text-gray-500 " >
            {/* <QuickAccess label="network" src={network} href="/search/people" /> */}
            <QuickAccess label="Edit" href="/edit-profile" />
        </div>
    )
}

const Other = () => {
    return (
        <div className="relative flex gap-[0.5rem] text-gray-500 right-0" >
            {/* <QuickAccess label="network" src={network} href="/home" /> */}
            {/* Commented out for now since we haven't implemented them yet */}
            {/* <QuickAccess label="edit profile" src={messages} href="/home" />
            <QuickAccess label="edit profile" src={friends} href="/home" /> */}
        </div >
    )
}

const ProfileInfoPanel = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [username, setUserName] = useState('');
    const [profilePicPath, setProfilePicPath] = useState('');    

  
    useEffect(()=>{
        const getUserInfo = async () =>{
            const response = await getDoc(doc(db, "users", props.user_id))
            const data = response.data(); 
            setUserInfo(response.data())
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
    }, [])

     /* To make sure to render the skills component only when the request is complete
        Check if array of interests is empty and if so, sets it to null
    */
    const skills = userInfo.skills && Array.isArray(userInfo.skills) ? userInfo.skills.map((skill,i) => {
        return <label
                    className="h-fit w-fit px-4 py-2 rounded-md text-[11px] md:text-[13px   ] lg:text-[14px]
                        bg-[#F7B618] text-black"
                    key={"info-skill-"+i}  value={skill} bg="bg-green-4" textColor="text-white"
                >
                    {skill}
                </label>
    }) : null

    const [learnMore, setLearnMore] = useState(false);

    return(
        <div className={"bg-white h-fit px-[2rem] py-14 lg:md:rounded-b-xl md:rounded-b-xl flex flex-col gap-7 transition duration-150 ease-in-out " + props.width}>
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <img className="w-[4rem] h-[4rem] rounded-full" src={profilePicPath} />
                    <div className="flex flex-col w-fit ">
                        <a href="/home" className="font-bold">{username}</a>
                        <a className="text-blue-500 text-[9pt]" href="/home">{userInfo.email}</a>
                        <p className="text-[9pt]">{userInfo?.university}</p>
                    </div>
                </div>
                <div className='mt-1'>
                    {props.own? <Own/> : <Other/>}
                </div>
            </div>
            <div className="flex flex-col w-full gap-[1.5rem]">
                <InfoBlock title="Skills">{skills}</InfoBlock>
            </div>
        </div>
    )
    
}
export default ProfileInfoPanel;