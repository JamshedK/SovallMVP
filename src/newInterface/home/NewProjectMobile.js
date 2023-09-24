// assets
import downvote_icon from '../../assets/newInterface/home/downvote_icon.svg';
import comment_icon from '../../assets/newInterface/home/comment_icon.svg';
import profile from '../../assets/common/profile.jpg';
import magnifying_glass from '../../assets/newInterface/new_project/magnifying_glass.svg';
import add_recruitment_notice_icon from '../../assets/newInterface/new_project/add_recruitment_notice_icon.svg';
import close_image_icon from '../../assets/newInterface/new_project/close_image_icon.svg';
import add_image_icon from '../../assets/newInterface/new_project/add_image_icon.svg';

import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/user';
import AuthContext from '../../contexts/auth-context';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {auth, db, storage} from '../../firebase-config'

const NewProjectMobile = (props) => {
    const [containsImage, setContainsImage] = useState(false);
    const [collaborators, setCollaborators] = useState([])
    const [showPostButton, setShowPostButton] = useState(false)
    const [allUser, setAllUsers] = useState([])
    const [collaboratorsSuggestions, setCollaboratorsSuggestions] = useState([]) 
    const [imagePath, setImagePath] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [recruitmentArray, setRecruitmentArray] = useState([])
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    
    const textRef = useRef();
    const recruitmentNoticeInputRef = useRef()  
    const imageRef = useRef();
    const collaboratorSearchRef = useRef()
    
    const navigate = useNavigate()

    const userCtx= useContext(UserContext);
    const authCtx = useContext(AuthContext)

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

    // Show preview of an image when it's selected
    const handleImageSelected = (e) => {
        if(e.target.files[0] != null){
            setContainsImage(true);
            setImagePath(URL.createObjectURL(imageRef.current.files[0]))
            setSelectedImage(imageRef.current.files[0]);
        }
        else{
            setContainsImage(false);
        }
    }

    // remove image preview when the x button is clicked 
    const handleRemoveImage = () => {
        setContainsImage(false)
        setImagePath(null)
    }

    // To handle textarea resizing
    const handleTextareaChange = () => {
        if (textRef.current.value) {
            setProjectDescription(textRef.current.value)
            textRef.current.style.height = '7px'; // Reset the height 7px
            textRef.current.style.height = `${textRef.current.scrollHeight}px`; // Set the height to the scrollHeight
        }
    };

    const handleAddRecruitmentNotice =() => {
        const inputValue = recruitmentNoticeInputRef.current.value;
        if (inputValue.trim() !== '') {
            setRecruitmentArray(prevArray => [...prevArray, inputValue]);
            recruitmentNoticeInputRef.current.value = '';
            onRecruitmentNoticeInputChange()
        }

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

    // to create components for the list of collaborators the search button is used
    var suggestionsComp = null
    if (collaboratorsSuggestions.length > 0){
        suggestionsComp = collaboratorsSuggestions.map((suggestion) => {
            return (
                <div 
                    className='flex flex-row space-x-2 text-[12px] cursor-pointer' 
                    onClick={() => {
                        setCollaborators([...collaborators, suggestion])
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

    const removeCollaborator = (index) => {
        // Create a shallow copy of the collaborators array to avoid directly mutating the state
        const updatedCollaborators = [...collaborators];
      
        // Remove the collaborator at the specified index
        updatedCollaborators.splice(index, 1);
      
        // Update the collaborators state with the updated array
        setCollaborators(updatedCollaborators);
    };
      
    // to create components for list of collaborators
    var collaboratorsComp = null
    if (collaborators.length > 0){
        collaboratorsComp = collaborators.map((user, i) => {
            return (
                <div className='flex flex-row space-x-1'>
                    <div className="rounded-full h-5 w-5">
                        <img className="rounded-full h-full w-full object-cover" src={user.image_path} alt="Profile" />
                    </div>
                    <div className='flex flex-row items-start gap-1 md:gap-2 lg:gap-3'>
                        <div className='flex flex-col text-[10px] md:text-[12px] lg:text-[14px]'>
                            <label >{user.fullname.trim()}</label>
                            <label className='text-[#767676]'>{user.skill[0]}</label>
                        </div>
                        <button 
                            className='mt-1'
                            onClick={() => removeCollaborator(i)}
                        >
                            <img
                                className='h-3 md:h5 lg:h-5' 
                                src={close_image_icon}></img>
                        </button>
                    </div>
                </div>
            )
        })    
    }

    // to create components for list of recruitment notices
    var recruitmentsComp = null
    if (recruitmentArray.length > 0){
        recruitmentsComp = recruitmentArray.map((message, i)=>{
            return(
                <div className='text-[9px] md:text-[12px] lg:text-[14px] space-y-1'>
                     <div className='rounded-md px-3 py-2 bg-[#016A69] mt-4 text-white'>
                        {message}
                    </div>
                    <div className='text-[#3C9A9A] italic flex flex-row justify-start ml-2 space-x-6'>
                        <button onClick={() => handleEditPressed(i)}>Edit </button>
                        <button onClick={() => {
                            setRecruitmentArray(prevArray => {
                                const newArray = [...prevArray];
                                newArray.splice(i, 1); // Remove the element at index i
                                return newArray;
                              });                            
                            }}>Delete
                        </button>  
                    </div>
                </div>
        )})
    }

    // To edit the recruitment message
    const handleEditPressed = (i) => {
        const text = recruitmentArray[i]
        // remote the current item 
        setRecruitmentArray(prevArray => {
            const newArray = [...prevArray];
            newArray.splice(i, 1); // Remove the element at index i
            return newArray;
          }); 
          recruitmentNoticeInputRef.current.value = text
    }

    const handleProjectSubmission = async () => {
        // Create a new document in the "projects" collection
        const projectRef = collection(db, 'projects');
        var dbImagePath = '';
        if (containsImage){
            dbImagePath = await uploadImage(selectedImage) 
        }
        const projectData = {
          title: projectTitle,
          description: projectDescription,
          imagePath: dbImagePath,
          collaborators: collaborators,
          recruitmentNotices: recruitmentArray,
          isForTest: true,
          publishedDate: serverTimestamp(), // Use serverTimestamp to set the current date and time
          userID: authCtx.userID
        };
        console.log(projectData)
        
        try {
          const projectDoc = await addDoc(projectRef, projectData);
          alert('Project submitted')
          navigate('/')
          window.location.reload()
          // Handle success or perform additional operations
        } catch (error) {
          console.error('Error submitting project:', error);
          // Handle error or show error message
        }
      };
      
      const uploadImage = async (selectedImage) => {
        // generate a random number to be added to the name of the image
        const randomNum = Math.round(Math.random()*1000)
        // path for the image to be saved
        var dbImagePath = `projects/${selectedImage.name + randomNum}`
        // Uploads the image to firebase storage
        const filesFolderRef = ref(storage,dbImagePath)
        try{
            await uploadBytes(filesFolderRef, selectedImage)
        } catch(e){
            console.log(e);
        }
        // remove the image after the image was uploaded
        handleRemoveImage();
        return dbImagePath
      }

      const onRecruitmentNoticeInputChange = () => {
        if (recruitmentNoticeInputRef.current.value !== ''){
            setShowPostButton(true)
        } else {
            setShowPostButton(false)
        }
      }


    return (
        <div className="relative w-full bg-[#3C9A9A] flex items-center justify-center">
            <div className={"flex flex-col justify-center rounded-xl bg-green w-[99%] bg-white pl-3 pt-4 mx-2 pr-5 md:w-[50%] lg:w-[40%]"}>
                {/* username and profile NewProjectMobile */}
                <div className='flex flex-row space-x-1 text-[13px]'>
                    <div className="rounded-full h-5 w-5">
                        <img 
                            className="rounded-full h-full w-full object-cover cursor-pointer" 
                            src={userCtx.profilePicPath} 
                            alt="Profile" 
                        />
                    </div>
                    <label className="">{userCtx.username}</label>
                </div>
                {/* project details */}
                <input 
                    className="font-medium pt-3 outline-none md:text-[20px] lg:text-[20px]" 
                    placeholder='Project Title ... (35 characters)'
                    onChange={(e) => {
                        setProjectTitle(e.target.value)
                        }}>
                </input>
                <div className=''>
                    <textarea 
                        className='form-textarea text-[14px] lg:text-[16px] border-none w-full pl-0 focus:ring-0 resize-none
                            min-h-[10rem] md:min-h-fit lg:min-h-fit' 
                        placeholder='Project Description'
                        onChange={handleTextareaChange}
                        ref = {textRef}>
                    </textarea>
                    {!containsImage &&    
                        <div className="flex justify-end mr-7">
                            <label htmlFor="photoInput" className="cursor-pointer">
                                <img className='lg:h-5 md:h-5' src={add_image_icon}/>
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
                {/* Negative margin is to ignore the margin in parent component */}
                <hr className='left-0 right-0 border-[#3C9A9A] my-4 -mx-5'/>
                {/* collaborators */}
                <div className='mb-16 md:mb-5 lg:mb-10'>
                    <h1 className='text-center text-[14px] lg:text-[16px] pb-4'>Project Collaborators</h1>
                    <div className='flex flex-row justify-around align-top items-start flex-wrap'>
                        <div className='flex flex-col space-y-3'>
                            {collaborators.length > 0 && 
                                <div className='flex flex-col space-y-3'>
                                    {collaboratorsComp}
                                </div>}
                            <div className= 'w-[9rem] flex flex-col'>
                                <div className='inline-flex space-x-1 w-[9rem] pl-1'>
                                    <img src={magnifying_glass}/>
                                    <input className='outline-none text-[12px] lg:text-[14px]' placeholder='Add a collaborator' 
                                        ref={collaboratorSearchRef} onChange={handleCollaboratorSearch}/>
                                </div>
                                {collaboratorsSuggestions.length > 0 && <div className='flex flex-col rounded-b-md border-2 w-[9rem] px-2 py-2'>
                                    {suggestionsComp}
                                </div>}
                            </div>
                        </div>  
                        <div>
                            <div className='flex items-start text-[11px] md:text-[12px] lg:text-[14px] '>
                                <div className='flex flex-col items-center rounded-md px-3 pb-2 border-2 bg-[#E9E9E9]'>
                                    <input 
                                        ref={recruitmentNoticeInputRef} 
                                        onChange={onRecruitmentNoticeInputChange}
                                        className='outline-none bg-transparent' 
                                        placeholder='Post a recruitments notice'/>
                                    {showPostButton && 
                                        <button 
                                            onClick={handleAddRecruitmentNotice} 
                                            className="bg-[#00AAC1] text-white w-fit rounded-md px-4 py-0.5 md:py-1 lg:py-1 mt-2"
                                        >
                                            Post
                                        </button>}
                                </div>
                            </div>
                            {recruitmentsComp}
                        </div>  
                    </div>
                </div>
                <div className='flex items-center justify-center  text-[12px] lg:text-[14px] mb-5'>   
                    <button 
                        type="submit" 
                        className='bg-[#00AAC1] text-white py-1 px-4 rounded-lg flex justify-center md:py-2  lg:py-2'
                        onClick={handleProjectSubmission}> 
                        Start my project    
                    </button>
                </div>
            </div>
        </div>
    );
};
export default NewProjectMobile;
