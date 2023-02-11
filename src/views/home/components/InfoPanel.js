import profile from '../../../assets/common/profile.jpg';
import network from '../../../assets/home/network.svg';
import edit from '../../../assets/home/edit.svg';
import messages from '../../../assets/home/messages.svg';
import friends from '../../../assets/home/friends.svg';
import arrow_up from '../../../assets/home/arrow_up.svg';
<<<<<<< HEAD
import { useState } from 'react';

const skills_data = ["Videography", "Copywriting", "Communication", "Collaboration", "Animation", "Strategy"];
const interests_data = ["Problem Solving", "Physics", "Math", "Material Science", "Copywriting", "Adobe"];
=======
import { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../../../contexts/auth-context";
import {db} from '../../../firebase-config'
import Loader from '../../loader/Loader';
>>>>>>> 0744c28d210f0396f9c52358f0a40367868a06fb

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
    return <label className={"text-white rounded-tl-xl rounded-br-xl px-2 py-1 text-[8pt] " + bg} >{props.value}</label>
}
const InfoBlock = (props) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="font-bold text-[11pt]">{props.title}</h1>
            <div className="flex flex-wrap gap-1">
                {props.children}
            </div>
        </div>
    );

}

const Own = () => {
    return (
        <div className="flex gap-2 text-gray-500" >
            <QuickAccess label="network" src={network} href="/home" />
            <QuickAccess label="edit profile" src={edit} href="/home" />
        </div >
    )
}

const Other = () => {
    return (
        <div className="flex gap-2 text-gray-500" >
            <QuickAccess label="network" src={network} href="/home" />
            <QuickAccess label="edit profile" src={messages} href="/home" />
            <QuickAccess label="edit profile" src={friends} href="/home" />
        </div >
    )
}

const InfoPanel = (props) => {
    const [showDetails, setShowDetails] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const authCtx = useContext(AuthContext);
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        setShowDetails(prev => !prev);
    }
    useEffect(()=>{
        console.log("useEffect called here")
        setIsLoading(true);
        const getUserInfo = async () =>{
            const response = await getDoc(doc(db, "users", authCtx.userID))
            const data = response.data(); 
            setUserInfo(response.data())
            setFullName(data.firstname + ' ' + data.lastName);
            setEmail(data.email);
        } 
        getUserInfo();
        console.log('loading complete')
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
    if(isLoading){
        console.log('loading')
        return (
            <Loader/>
        );
    }
    else{
        console.log('main page loading')
        return (
            <div className={"bg-white h-fit px-8 pt-8 pb-3 rounded-b-xl flex flex-col gap-7 transition duration-150 ease-in-out " + props.width}>
                <div className="flex justify-between ">
                    <div className="flex gap-4">
                        <img className="w-16 h-16 rounded-full" src={profile} />
                        <div className="flex flex-col w-fit ">
                            <a href="/home" className="font-bold">{fullName}</a>
                            <a className="text-blue-500 text-[9pt]" href="/home">{email}</a>
                            <p className="text-[9pt]">Let's have fun with creativity!</p>
                        </div>

                    </div>
                    {props.own? <Own/> : <Other/>}
                </div>

                <div className={showDetails? "flex flex-col gap-6" : "hidden"}>
                    <InfoBlock title="Skills">{skills}</InfoBlock>
                    <InfoBlock title="Interest">{interests}</InfoBlock>
                </div>
                <div className="w-full flex justify-center ">
                    
                    <button className="w-fit flex flex-col justify-center items-center " onClick={handleClick}>
                        <p className={"text-[8pt] "+ (showDetails ? "order-last" : "")}>{(showDetails ? "Hide details" : "Show details")}</p>
                        <img className={"h-2 w-fit " + (!showDetails ? "rotate-180" : "")} src={arrow_up} />
                    </button>
                </div>

            </div>
            );
    }
}
export default InfoPanel;