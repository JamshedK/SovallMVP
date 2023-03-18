// Assets
import add_profile_pic from '../../../assets/editprofile/add_profile_pic.svg';
import remove_interest from '../../../assets/editprofile/remove_interest.svg';
import skillsText from '../../../data/skills.txt';
import interestsText from '../../../data/interests.txt';


import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../../../contexts/auth-context";
import UserContext from '../../../contexts/user';
import {db} from '../../../firebase-config'
import Toggle from "../../common/Toggle";

const EditProfile = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [skillsArray, setSkillsArray] = useState([])
    const [interestsArray, setInterestsArray] = useState([])
    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState([]);

    const userCtx = useContext(UserContext);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    function readSkillsAndInterests(){
        fetch(skillsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var skillsArray = [];
            for(var i = 0; i < temp.length; i++){
                skillsArray.push({"value": temp[i], "selected": false})
            }
            setSkillsArray(skillsArray);
        });
        fetch(interestsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var interestsArray = [];
            for(var i = 0; i < temp.length; i++){
                interestsArray.push({"value": temp[i], "selected": false,})
            }
            setInterestsArray(interestsArray);
        });
        console.log(skillsArray)
    }

    useEffect(()=>{
        readSkillsAndInterests();
        const getUserInfo = async () =>{
            const response = await getDoc(doc(db, "users", authCtx.userID))
            const data = response.data(); 
            setUserInfo(response.data())
        } 
        getUserInfo();
    }, [])

    const handleProfilePicSelected = (e) => {

    }

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
                            <input id='file-input' className='invisible w-0 h-0' type="file" accept="image/png, image/jpeg"
                                onClick={handleProfilePicSelected}/>
                        </label>
                    </div>
                    <div className="flex flex-col w-fit ">
                        <a href="/home" className="font-bold">{userCtx.username}</a>
                        <a className="text-blue-500 text-[9pt]" href="/home">{userInfo.email}</a>
                        <p className="text-[9pt]">Let's have fun with creativity!</p>
                    </div>
                </div>
                </div>
                <div className="flex flex-col">
                    <Card title="Skills" data={skillsArray} accentStyle="bg-green-2 text-white" selectedItems={skills} setSelectedItems={setSkills}/>
                    <Card title="Interests" data={interestsArray} accentStyle="bg-yellow-2 text-white"  selectedItems={interests} setSelectedItems={setInterests} />
                    <button onClick={handleChangePassword}>Click here to change password</button>
                    <button onClick={handleSaveChanges}>Save changes</button>
                </div>
            </div>
        </div>
    )
    
}

const Card = (props) => {
    const options = props.data.map(item => {
        const id = props.data.indexOf(item);
        return <Toggle key={id} value={item.value} selectedStyle={props.accentStyle} isSelected={item.isSelected} selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems} />
    });
    return (
        <div className="bg-white rounded-xl h-fit w-[24rem] flex flex-col p-8 gap-3">
            <h1 className="font-bold">{props.title}</h1>
            <div>
                <p className="pl-4">Select at least three</p>
                <input className="w-full px-3 py-2 placeholder-gray-500 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        type="text" placeholder="Search"/>
            </div>
            <div className="h-[9rem] flex flex-wrap gap-3 overflow-auto">
                {options}
            </div>
        </div>
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
export default EditProfile;