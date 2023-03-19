// Assets
import add_profile_pic from '../../../assets/editprofile/add_profile_pic.svg';
import remove_interest from '../../../assets/editprofile/remove_interest.svg';
import skillsText from '../../../data/skills.txt';
import interestsText from '../../../data/interests.txt';


import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AuthContext from "../../../contexts/auth-context";
import UserContext from '../../../contexts/user';
import {db, storage} from '../../../firebase-config'
import {ref, uploadBytes} from 'firebase/storage';


const EditProfile = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [allSkills, setAllSkills] = useState([])
    const [allInterests, setAllInterests] = useState([])
    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState([]);

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
            setSkills(data.skills);
            setInterests(data.interests);
            setIsLoading(false);
        } 
        getUserInfo();
    }, [userCtx])

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
                "skills": skills, 
                "interests": interests
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
        // Redirect the user to change password page
        navigate('/changepassword');
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
                    {!isLoading && <Card title="Skills" data={allSkills} accentStyle="bg-green-2 text-white" selectedItems={skills} setSelectedItems={setSkills}/>}
                    {!isLoading && <Card title="Interests" data={allInterests} accentStyle="bg-yellow-2 text-white"  selectedItems={interests} setSelectedItems={setInterests} />}
                    <button onClick={handleChangePassword}>Click here to change password</button>
                    <button onClick={handleSaveChanges}>Save changes</button>
                </div>
            </div>
        </div>
    )
    
}

const Card = (props) => {
    const [query, setQuery] = useState('');
    const filteredData = props.data.filter(item => {
        if (item.value.toLowerCase().includes(query.toLowerCase())){
            return item
        }
    })
    const options = filteredData.map(item => {
        const id = props.data.indexOf(item);
        var tempIsSelected;
        if(props.selectedItems.includes(item.value)) tempIsSelected = true;
        return <Toggle key={id} value={item.value} selectedStyle={props.accentStyle} isSelected={tempIsSelected} selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems} />
    });
    return (
        <div className="bg-white rounded-xl h-fit w-[24rem] flex flex-col p-8 gap-3">
            <h1 className="font-bold">{props.title}</h1>
            <div>
                <p className="pl-4">Select at least three</p>
                <input className="w-full px-3 py-2 placeholder-gray-500 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        type="text" placeholder="Search"
                        onChange={e => setQuery(e.target.value)}/>
            </div>
            <div className="h-[9rem] flex flex-wrap gap-3 overflow-auto">
                {options}
            </div>
        </div>
    );
}

const Toggle = (props) => {
    const [checked, setChecked] = useState(props.isSelected);
    const selectedStyle = props.selectedStyle;
    const style = checked ? selectedStyle : "bg-gray-200";
    const handleClick = () => {
        let temp = props.selectedItems;

        if (temp.includes(props.value)) {
            const index = temp.indexOf(props.value);
            temp.splice(index, 1);
            
        } else {
            temp.push(props.value);
        }

        props.setSelectedItems(temp);
        setChecked(prev => !prev);
        console.log(temp)
    }
    return (
        <button className={"h-fit w-fit px-2 py-1 rounded-full " + style} onClick={handleClick}>
            {props.value}
        </button>
        );
}

export default EditProfile;