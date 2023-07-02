// assets
import downvote_icon from '../../assets/newInterface/home/downvote_icon.svg';
import comment_icon from '../../assets/newInterface/home/comment_icon.svg';
import profile from '../../assets/common/profile.jpg';
import magnifying_glass from '../../assets/newInterface/new_project/magnifying_glass.svg';
import add_recruitment_notice_icon from '../../assets/newInterface/new_project/add_recruitment_notice_icon.svg';
import close_image_icon from '../../assets/newInterface/new_project/close_image_icon.svg';
import add_image_icon from '../../assets/newInterface/new_project/add_image_icon.svg';



import { useContext, useState, useRef, useEffect } from 'react';
import UserContext from '../../contexts/user';
import { collection, getDocs, query } from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'

import {db, storage} from '../../firebase-config'

const categoryObj = {
                    "project": ["Project Title", "Project Description"],
                    "idea": ["Title", "Description"],
                    "ask_sovall": ["Title", "Description"]
                    };

export const NewProjectLaptop = (props) => {
    return(
            <div className={"flex flex-row justify-between h-[20rem] rounded-3xl " + props.width}>
                {/* left */}
                <div className="px-8 bg-white bg-opacity-70 rounded-l-3xl h-full">
                    <div className='py-6 flex flex-col  justify-between h-full'>
                        <button>
                            <img className='w-7' src=''/>
                        </button>
                        <button>
                            <img className='w-7' src={downvote_icon}/>
                        </button>
                        <button>
                            <img className='w-7' src={comment_icon}/>
                        </button>
                    </div>
                </div>
                {/*  main screen */}
                <div className='flex flex-grow bg-white w'>

                </div>
                {/* collaborators */}
                <div className='px-2 py-4 w-52 bg-white bg-opacity-70 rounded-r-3xl h-full'>
                    <h1 className='font-inter text-xl font-medium'>Collaborators</h1>
                    <div className="flex items-center h-10">
                        <img className="rounded-full h-full" />
                        <div className="flex flex-col px-1">
                            <label className="text-[11pt]">Hamid Mubariz</label>
                            <label className="text-[9pt]">Designer</label>
                        </div>
                    </div>

                </div>
            </div>
    );
}

export const NewProjectMobile = (props) => {
    const [containsImage, setContainsImage] = useState(false);
    const [collaborators, setCollaborators] = useState([])
    const [allUser, setAllUsers] = useState([])
    const [collaboratorsSuggestions, setCollaboratorsSuggestions] = useState([]) 
    const [imagePath, setImagePath] = useState(null);

    const imageRef = useRef();
    const collaboratorSearchRef = useRef()

    const userCtx= useContext(UserContext);

    useEffect(()=>{
        // Get the list of all users so we can filter for collaborators search
        const getUsers = async () => {
            var tempArray = []
            const usersRef = collection(db, 'users') 
            const querySnapshot = await getDocs(usersRef)
            querySnapshot.forEach((doc) => {
                var obj = doc.data()
                tempArray.push({"user_id": doc.id, "fullname": obj?.firstname + ' ' + obj?.lastname, 'image_path': obj?.image_path })
            });
            setAllUsers(tempArray)
        }
        getUsers()
    }, [])

    // Show preview of an image when it's selected
    const handleImageSelected = () => {
        setContainsImage(true);
        setImagePath(URL.createObjectURL(imageRef.current.files[0]))
    }

    // remove image preview when the x button is clicked 
    const handleRemoveImage = () => {
        setContainsImage(false)
        setImagePath(null)
    }

    const handleCollaboratorSearch = async () => {
        const searchValue = collaboratorSearchRef.current.value.trim();
        var tempUsers = []
        var filteredUsers = []
        if (searchValue !== '') {
            // filter by the input value that the user gives
            tempUsers = allUser.filter((user) => {
                return user.fullname.toLowerCase().includes(searchValue.toLowerCase());
            });
            // get the profile pictures links 
            const maxLength = Math.min(allUser.length, 4); // we only need to display 4 users
            for (let i = 0; i < maxLength; i++) {
                try{
                    const url = await getProfilePic(tempUsers[i])
                    tempUsers[i].image_path = url
                    filteredUsers.push(tempUsers[i])
                    console.log(filteredUsers)
                }
                catch(e){
                    console.log(e)
                }
            }
            setCollaboratorsSuggestions(filteredUsers)
        }
        else{
            setCollaboratorsSuggestions([])
        }
      };
      
      // helper method to get download links for profile pictures
      const getProfilePic = async (userObj) => {
        if(userObj?.image_path){
            var imagePath = userObj?.image_path;
            if(imagePath !== ''){
                // Get the profile picture
                const imageRef = ref(storage, imagePath)
                try{
                    const downloadURL = await getDownloadURL(imageRef)
                    return downloadURL
                } catch(e){
                    console.log(e);
                }
            }
        }
    }

    var suggestionsComp = null
    // to create components for the list of collaborators the search button is used
    console.log('Suggestions length ' + collaboratorsSuggestions.length)
    if (collaboratorsSuggestions.length > 0){
        suggestionsComp = collaboratorsSuggestions.map((suggestion) => {
            return (
                <div className='flex flex-row space-x-2 text-[12px] cursor-pointer'>
                    <div className="rounded-full h-5 w-5">
                        <img className="rounded-full h-full w-full object-cover" src={suggestion.image_path} alt="Profile" />
                    </div>
                    <label className="">{suggestion.fullname.trim()}</label>
                </div>
            )
        })
    }

    return (
        <div className="relative w-full bg-[#3C9A9A] flex items-center justify-center h-screen">
            <div className={"flex flex-col justify-center rounded-xl bg-green w-[99%] md:max-w-[50%] bg-white pl-3 pt-4 mx-2 pr-5"}>
                {/* username and profile NewProjectMobile */}
                <div className='flex flex-row space-x-1 text-[13px]'>
                    <div className="rounded-full h-5 w-5">
                        <img className="rounded-full h-full w-full object-cover cursor-pointer" src={userCtx.profilePicPath} alt="Profile" />
                    </div>
                    <label className="">{userCtx.username}</label>
                </div>
                {/* project details */}
                <input className="font-medium pt-3 outline-none"placeholder='Project Title ... (35 characters)'></input>
                <div>
                    <textarea className='relative border-hidden pl-0 focus:ring-0' placeholder='Project Description'></textarea>
                    {!containsImage &&    
                        <div className="flex justify-end mr-7">
                            <label htmlFor="photoInput" className="cursor-pointer">
                                <img src={add_image_icon}/>
                            </label>
                            <input id="photoInput" type="file" accept="image/*" ref={imageRef} className="hidden" onChange={handleImageSelected}/>
                        </div> }
                    {containsImage && 
                        <div className='relative flex items-start'>
                            <button onClick={handleRemoveImage}>
                                <img className='absolute ml-2 mt-2 w-4 h-4' src={close_image_icon}/>
                            </button>
                            <img className='w-full' src = {imagePath}></img>
                        </div>}
                </div>

                <hr className='border-gray-300 my-4'/>
                {/* collaborators */}
                <div>
                    <h1 className='text-center text-[12px] pb-2'>Project Collaborators</h1>
                    <div className='flex flex-row justify-around align-top min-h-[8rem] items-start flex-wrap'>
                        <div className= 'w-[9rem] flex flex-col'>
                            <div className='inline-flex space-x-1 w-[9rem]'>
                                <img src={magnifying_glass}/>
                                <input className='outline-none text-[11px]' placeholder='Add a collaborator' 
                                    ref={collaboratorSearchRef} onChange={handleCollaboratorSearch}/>
                            </div>
                            {collaboratorsSuggestions.length > 0 && <div className='flex flex-col rounded-b-md border-2 w-[9rem] px-2 py-2'>
                                {suggestionsComp}
                            </div>}
                        </div>
                        <div className='flex items-start mt-4'>
                            {/* The negative margins is to position the image with the div post the recruitments notice */}
                            <button>
                                <img className='absolute w-5 -ml-2 -mt-2' src={add_recruitment_notice_icon}/>
                            </button>
                            <div className='rounded-md px-3 pb-2 border-2 bg-[#E9E9E9] text-[9px]'>
                                <input className='outline-none bg-transparent' placeholder='Post a recruitments notice'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center text-[11px] mb-5'>   
                    <button type="submit" className='bg-[#00AAC1] text-white py-1 px-4 rounded-lg text-[9px] flex justify-center'>Start my project</button>
                </div>
            </div>
        </div>
    );
}
