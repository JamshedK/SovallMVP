import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';

import AuthContext from '../../contexts/auth-context';
import magnifying_glass from '../../assets/newInterface/new_project/magnifying_glass.svg';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {auth, db, storage} from '../../firebase-config'

const Collaborators = (props) => {
    const [collaboratorsSuggestions, setCollaboratorsSuggestions] = useState([]) 
    const [allUser, setAllUsers] = useState([])
    const collaboratorSearchRef = useRef()

    useEffect(()=>{
        // Get the list of all users so we can filter for collaborators search
        const getUsers = async () => {
            var tempArray = []
            const usersRef = collection(db, 'users') 
            const querySnapshot = await getDocs(usersRef)
            querySnapshot.forEach((doc) => {
                var obj = doc.data()
                tempArray.push({"user_id": doc.id, "fullname": obj?.firstname + ' ' + obj?.lastname, 'image_path': obj?.image_path, 'skill': obj?.skills
             })
            });
            setAllUsers(tempArray)
        }
        getUsers()
    }, [])

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
    const addCollaborator = async (suggestion) => {
        console.log(props.projectID)
        const projectRef = doc(db, 'projects', props.projectID)
        try{
            await updateDoc(projectRef, {
                collaborators: arrayUnion(suggestion)
            })
            props.setUpdateStats(new Date())
        } catch (error){
            console.log(error)
        }
    }

    // to create components for the list of collaborators the search button is used
    var suggestionsComp = null
    if (collaboratorsSuggestions.length > 0){
        suggestionsComp = collaboratorsSuggestions.map((suggestion) => {
            return (
                <div 
                    className='flex flex-row space-x-2 text-[12px] cursor-pointer' 
                    onClick={() => {
                        // setCollaborators([...collaborators, suggestion])
                        addCollaborator(suggestion)
                        setCollaboratorsSuggestions([])
                        collaboratorSearchRef.current.value = ''
                    }}>
                    <div className="rounded-full h-5 w-5">
                        <img className="rounded-full h-full w-full object-cover" src={suggestion.image_path} alt="Profile" />
                    </div>
                    <label className="">{suggestion.fullname.trim()}</label>
                </div>
            )
        })
    }

    const collaboratorsComp = props.collaborators.map((user) => {
        return (
            <div key={'div-'+Math.random()} className='flex flex-row space-x-1 cursor-pointer'>
                <div className="rounded-full h-7 w-7">
                    <img 
                        className="rounded-full h-full w-full object-cover border-[1.5px] border-[#044A54]" 
                        src={user.image_path} alt="Profile" />
                </div>
                <div className='flex flex-col'>
                    <label className="text-[12px]">{user.fullname.trim()}</label>
                    <label className='text-[9px] text-[#767676]'>{user.skill[0]}</label>
                </div>
            </div>
        )
    })    
  return (
    <div className='px-2 py-4 w-52 bg-white rounded-r-xl h-full border-l-[2px] border-[#3C9A9A]'>
        <div className='flex flex-col gap-2'>
            <h1 className='font-inter text-[14px] font-medium'>Collaborators:</h1>
            <div className='flex flex-col space-y-3'>
                {collaboratorsComp}
            </div>
            <div className= 'flex flex-col'>
                <div className='inline-flex space-x-1 pl-1'>
                    <img src={magnifying_glass}/>
                    <input 
                        className='outline-none text-[12px] lg:text-[14px] w-40' 
                        placeholder='Add a collaborator' 
                        ref={collaboratorSearchRef} onChange={handleCollaboratorSearch}
                    />
                </div>
                {collaboratorsSuggestions.length > 0 && 
                    <div className='flex flex-col rounded-b-md border-2 px-2 py-2'>
                        {suggestionsComp}
                    </div>
                }
            </div>
        </div>
    </div>
  );
};
export default Collaborators;
