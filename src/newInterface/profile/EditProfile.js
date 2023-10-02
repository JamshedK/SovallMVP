// Assets
import add_profile_pic from '../../assets/editprofile/add_profile_pic.svg';
import remove_interest from '../../assets/editprofile/remove_interest.svg';
import skillsText from '../../data/skills.txt';
import { Card } from '../account/Skills';

import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth"
import AuthContext from '../../contexts/auth-context';
import UserContext from '../../contexts/user';
import {auth, db, storage} from '../../firebase-config'
import {ref, uploadBytes} from 'firebase/storage';


const EditProfile = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [allSkills, setAllSkills] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);

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
    function readSkills(){
        // TODO: Sort by isSelected
        fetch(skillsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var allSkills = [];
            for(var i = 0; i < temp.length; i++){
                allSkills.push({"value": temp[i], "isSelected": false})
            }
            setAllSkills(allSkills);
        });
    }

    useEffect(()=>{
        readSkills();
        setProfilePicForDisplay(userCtx.profilePicPath)
        setNewUserName(userCtx.username)
        const getUserInfo = async () =>{
            const response = await getDoc(doc(db, "users", authCtx.userID))
            const data = response.data();
            setUserInfo(response.data())
            setSelectedSkills(data.skills);
            setIsLoading(false);
        } 
        getUserInfo();
        updateIsSelected();
    }, [userCtx])

    const updateIsSelected = () => {
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
            })

            // redirect the user to home page
            navigate('/profile');
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
        <div className="flex w-full justify-center bg-[#044A54] items-center pb-16">
            <div 
                className=" px-8 pt-8 pb-3 rounded-b-xl flex flex-col gap-7 
                    transition duration-150 ease-in-out w-full md:w-[40%] lg:w-[30%] m-2"
            >
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
                        <p contentEditable="true" suppressContentEditableWarning={true} className="focus:border-none text-white" 
                            onInput={e => setNewUserName(e.target.innerHTML)}>{userCtx.username}</p>
                            {/* Temporarily disabling this */}
                        {/* <p contentEditable="true" suppressContentEditableWarning={true} className="text-[9pt]">
                            Let's have fun with creativity!</p> */}
                    </div>
                </div>
                </div>
                <div className="flex flex-col">
                    <div className='flex flex-col items-center'>
                        <h1 className='text-white text-[27px] w-fit '>Skills</h1>
                        <p className='text-white text-[14px] w-fit'>Select at least three</p>
                    </div>
                    {!isLoading && 
                        <Card 
                            title="Skills" 
                            data={allSkills} 
                            accentStyle="bg-[#F7B618] text-[#044A54]" 
                            selectedItems={selectedSkills} 
                            setSelectedItems={setSelectedSkills}
                            // updateIsSelected={updateIsSelected}
                            />
                        }
                    <div className='flex flex-col justify-center items-center gap-5 mt-8'>
                        <button
                                className="bg-white text-[#044A54] w-fit px-4 py-2 text-[15px] rounded-md disabled:bg-gray-400 disabled:hover:cursor-no-drop"
                                onClick={handleSaveChanges}
                            >
                                Save changes
                        </button>
                        <button
                                className=" text-white w-fit px-4 py-2 text-[15px] underline rounded-md disabled:bg-gray-400 disabled:hover:cursor-no-drop"
                                onClick={handleChangePassword}
                            >
                                Change password
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default EditProfile;