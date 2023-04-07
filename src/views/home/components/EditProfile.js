// Assets
import add_profile_pic from '../../../assets/editprofile/add_profile_pic.svg';
import remove_interest from '../../../assets/editprofile/remove_interest.svg';
import skillsText from '../../../data/skills.txt';
import interestsText from '../../../data/interests.txt';
import { Card } from '../../skillsAndInterests/SkillsAndInterests';

import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth"
import AuthContext from "../../../contexts/auth-context";
import UserContext from '../../../contexts/user';
import {auth, db, storage} from '../../../firebase-config'
import {ref, uploadBytes} from 'firebase/storage';


const EditProfile = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [allSkills, setAllSkills] = useState([])
    const [allInterests, setAllInterests] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const userCtx = useContext(UserContext);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    // new edited stuff
    const imageRef = useRef();
    const [containsImage, setContainsImage] = useState(false);
    const [profilePicForDisplay, setProfilePicForDisplay] = useState();
    const [newUserName, setNewUserName] = useState();
    const [newBio, setNewBio] = useState()


    // Get the skills and intersts from the txt files
    function readSkillsAndInterests(){
        // TODO: Sort by isSelected
        fetch(skillsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var allSkills = [];
            for(var i = 0; i < temp.length; i++){
                allSkills.push({"value": temp[i], "isSelected": false})
            }
            setAllSkills(allSkills);
        });
        fetch(interestsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var allInterests = [];
            for(var i = 0; i < temp.length; i++){
                allInterests.push({"value": temp[i], "isSelected": false,})
            }
            setAllInterests(allInterests);
        });
    }

    useEffect(()=>{
        readSkillsAndInterests();
        setProfilePicForDisplay(userCtx.profilePicPath)
        setNewUserName(userCtx.username)
        const getUserInfo = async () =>{
            const response = await getDoc(doc(db, "users", authCtx.userID))
            const data = response.data();
            setUserInfo(response.data())
            setSelectedSkills(data.skills);
            setSelectedInterests(data.interests);
            setIsLoading(false);
        } 
        getUserInfo();
        updateIsSelected();
    }, [userCtx])

    const updateIsSelected = () => {
        console.log("I was called")
        for(var i in selectedInterests){
            for(var j in allInterests){
                if(selectedInterests[i] === allInterests[j].value){
                    allInterests[j].isSelected = true;
                    var temp = allInterests;
                    setAllInterests(temp);
                }
            }
        }
        for(var i in selectedSkills){
            for(var j in allSkills){
                if(selectedSkills[i] === allSkills[j].value){
                    allSkills[j].isSelected = true;
                    var temp = allSkills;
                    setAllSkills(temp);
                }
            }
        }
    }

    const handleProfilePicSelected = () => {
        const file = imageRef.current.files[0];
        if (file) {
            setContainsImage(true);
            setProfilePicForDisplay(URL.createObjectURL(file));
        }
    }

    const handleSaveChanges = async () => {
        if (window.confirm("Are you sure you want to save this changes?")) {
            // TODO: Add the new changes to firestore
            var username = newUserName.trim().split(' ') // get the first and lastname
            var firstname = userInfo.firstname
            var lastname = userInfo.lastname
            if(username.length >= 2){
                firstname = username[0] 
                lastname = username[1]
            }

            console.log(firstname)
            var image_path = userInfo?.image_path;
            // if a new profile pic was selected, save the new profile pic
            if(containsImage){
            // generate a random number to be added to the name of the image
                const randomNum = Math.round(Math.random()*1000)
                // path for the image to be saved
                image_path = `account/${imageRef.current.files[0].name + randomNum}`
                // store the image in firebase
                uploadFile(imageRef, image_path);
            }

            // Make a request to update the data in Firestore
            const userDocRef = doc(db, 'users', authCtx.userID)
            await updateDoc(userDocRef, {
                "firstname": firstname,
                "lastname": lastname, 
                "image_path": image_path,
                "skills": selectedSkills, 
                "interests": selectedInterests
            })

            // redirect the user to home page
            navigate('/home');
          }
    }

     // Uploads the image to firebase storage
     const uploadFile = async (imageRef, imagePath) => {
        const image = imageRef.current.files[0];
        const filesFolderRef = ref(storage,imagePath)
        try{
            await uploadBytes(filesFolderRef, image)
        } catch(e){
            console.log(e);
        }
    }

    const handleChangePassword = () => {
        // TODO: Navigate to email sent page
        sendPasswordResetEmail(auth, userInfo.email)
        .then(a=>{alert(`Password reset email sent to ${userInfo.email}`)});
    }
    return(
        <div className="flex w-full justify-center bg-[#3C9A9A]">
            <div className={"bg-white px-8 pt-8 pb-3 rounded-b-xl flex flex-col gap-7 transition duration-150 ease-in-out " + props.width}>
                <div className="flex justify-between ">
                <div className="flex gap-4 ">
                    <div className='flex flex-row justify-between items-end'>
                        <img className="w-16 h-16 rounded-full" src={profilePicForDisplay} />
                        <label className='flex flex-row gap-6 pointer-events-auto left-[450px]'>
                            <img className='w-5 h-5' src={add_profile_pic}></img>
                            <input id='file-input' className='invisible w-0 h-0' type="file" accept="image/png, image/jpeg"
                                ref={imageRef} onChange={handleProfilePicSelected}/>
                        </label>
                    </div>
                    <div className="flex flex-col w-fit ">
                        <p contentEditable="true" suppressContentEditableWarning={true} className="font-bold focus:border-red-500" 
                            onInput={e => setNewUserName(e.target.innerHTML)}>{userCtx.username}</p>
                            {/* Temporarily disabling this */}
                        {/* <p contentEditable="true" suppressContentEditableWarning={true} className="text-[9pt]">
                            Let's have fun with creativity!</p> */}
                    </div>
                </div>
                </div>
                <div className="flex flex-col">
                    {!isLoading && <Card 
                        title="Skills" data={allSkills} accentStyle="bg-green-2 text-white" 
                        selectedItems={selectedSkills} setSelectedItems={setSelectedSkills}
                        updateIsSelected={updateIsSelected}/>}
                    {!isLoading && <Card 
                        title="Interests" data={allInterests} accentStyle="bg-yellow-2 text-black"  
                        selectedItems={selectedInterests} setSelectedItems={setSelectedInterests} 
                        updateIsSelected={updateIsSelected}/>}
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <button className='text-white w-[250px] bg-[#3C9A9A] border-2 border-solid rounded-[14px]' onClick={handleChangePassword}>Click here to change password</button>
                        <button className='text-white w-[160px] bg-[#3C9A9A] border-2 border-solid rounded-[14px] ' onClick={handleSaveChanges}>Save changes</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
    
}

export default EditProfile;