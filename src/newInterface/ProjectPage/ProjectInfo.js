// assets
import notification_icon from '../../assets/newInterface/home/notification_icon.svg';
import upvote_icon_disabled from '../../assets/newInterface/home/upvote_icon_disabled.svg';
import upvote_icon_enabled from '../../assets/newInterface/home/upvote_icon_enabled.svg';
import downvote_icon from '../../assets/newInterface/home/downvote_icon.svg';
import downvote_icon_enabled from '../../assets/newInterface/home/downvote_icon_enabled.svg';

import comment_icon from '../../assets/newInterface/home/comment_icon.svg';
import save_icon from '../../assets/newInterface/home/save_icon.svg';
import issue_icon from '../../assets/newInterface/home/issue_icon.svg';
import recruiting_icon from '../../assets/newInterface/home/recruiting_icon.svg';

import { useState, useEffect, useContext, useRef } from 'react';

import moment from 'moment'

import {getDownloadURL, ref} from 'firebase/storage'
import {db, storage} from '../../firebase-config'
import { doc, updateDoc, collection, increment, serverTimestamp, addDoc, query, where, getDocs, getDoc, deleteDoc } from "@firebase/firestore";
import AuthContext from '../../contexts/auth-context';
import { useNavigate } from 'react-router-dom';

const MAX_LINES = 2; // Maximum number of lines before showing "See more"

export const ProjectInfo = (props) => {
    const data = props.data

    const [commentCount, setCommentCount] = useState(props.data.commentCount)
    const [upvotedCount, setUpvotedCount] = useState(props.data.upvotedCount)
    const [downvotedCount, setDownvotedCount] = useState(props.data.downvotedCount || 0)
    const [recruitingCount, setRecruitingCount] = useState(props.data.recruitingCount || 0);
    const [issueCount, setIssueCount] = useState(props.data?.issueCount || 0)
    const [isUpvoted, setIsUpvoted] = useState(false);  // to swithc icons when upvoted or not
    const [isDownvoted, setIsDownvoted] = useState(false);  // to swithc icons when downvoted or not
    const [imageURL, setImageURL] = useState('');
    const [containsImage, setContainsImage] = useState(false);
    const [username, setUserName] = useState('');
    const [profilePicPath, setProfilePicPath] = useState(''); 
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedDescription, setEditedDescription] = useState(data?.description);  
    const intereactionColRef = collection(db, 'interactions')
    const projectDocRef = doc(db, "projects", data?.projectID);
    const descriptionRef = useRef(null);    

    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)

    // When the post loads, determine if the user had liked it or not
    useEffect(() => {

        const checkAlreadyInteracted = async (interactionType) => {
            const q = query(
                intereactionColRef,
                where("userID", "==", authCtx.userID),
                where("projectID", "==", data.projectID),
                where("type", "==", interactionType)
            );
            const querySnapshot = await getDocs(q);
                if (querySnapshot.size > 0) {
                    if (interactionType === "upvote") {
                        setIsUpvoted(true);
                    } else if (interactionType === "downvote") {
                        setIsDownvoted(true);
                    }
                }
          };
          
        // Call the function to check both upvote and downvote interactions
        checkAlreadyInteracted("upvote");
        checkAlreadyInteracted("downvote");
          
        // make a request to get the image for the post if it exists
        const getImage = async () => {
            if(data?.imagePath){
                // get the image URL from Firebase Storage and add a unique identifier
                const timestamp = new Date().getTime();
                var imagePath = data.imagePath;
                if(imagePath !== ''){
                    // Get the picture attached to the comment
                    const imageRef = ref(storage, imagePath)
                    try{
                        const downloadURL = await getDownloadURL(imageRef)
                        setImageURL(`${downloadURL}?t=${timestamp}`);
                        setContainsImage(true);
                    } catch(e){
                        console.log(e);
                    }
                }
            }
            }
            getImage();
            // get username and profile pic
            const getUserInfo = async () => {
                const response = await getDoc(doc(db, "users", data?.userID))
                const temp = response.data(); 
                const timestamp = new Date().getTime();
                setUserName(temp.firstname + ' ' + temp.lastname);
                // Get the download url for the profile pic
                const imageRef = ref(storage, temp.image_path)
                try{
                    const downloadURL = await getDownloadURL(imageRef)
                    setProfilePicPath(`${downloadURL}?t=${timestamp}`);
                } catch(e){
                    console.log(e);
                }
            }
            getUserInfo();
    }, []);
    
    const handleEditClick = () => {
        setIsEditMode(true);
    };
      
    const handleSaveClick = async () => {
        setIsEditMode(false);
        // Get the updated description content from the ref
        const updatedDescription = descriptionRef.current.textContent.trim();
        setEditedDescription(updatedDescription);

        // Update the description in Firebase
        await updateDoc(projectDocRef, { description: editedDescription });
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
        // reload to make sure the changes do not save
        window.location.reload()
    };      

    const handleDeleteClick = async () => {
        // Show a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this project?');
    
        if (isConfirmed) {
          // Delete the project from Firebase
          await deleteDoc(projectDocRef);
    
          // Navigate to "/"
          navigate('/')
        }
    };
    

    const handleUpvote = async () => {
        // Increment or decrement upvoteCount in posts collection
        if(!isUpvoted){
            await updateDoc(projectDocRef, {upvotedCount: increment(1)});
            // Add to intereactions collection
            await addDoc(intereactionColRef, {
                userID: authCtx.userID,
                projectID: data.projectID,
                ts: serverTimestamp(),
                type: "upvote"
            })
              setUpvotedCount(upvotedCount+1)
        }else{
            // decrement the count
            await updateDoc(projectDocRef, {upvotedCount: increment(-1)});
            // remove from interactions collection
            const q = query(intereactionColRef, 
                where("projectID", "==", data.projectID),
                where("userID", "==", authCtx.userID),
                where("type", "==", "upvote"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (document) =>{
                const intereactionDocRef = doc(db, "interactions", document.id)
                await deleteDoc(intereactionDocRef)
            })
            setUpvotedCount(upvotedCount-1)
        }
        // update the state
        setIsUpvoted(!isUpvoted);
    }

    const handleDownvote = async () => {
        // Increment or decrement downvote in posts collection
        if(!isDownvoted){
            await updateDoc(projectDocRef, {downvotedCount: increment(1)});
            // Add to intereactions collection
            await addDoc(intereactionColRef, {
                userID: authCtx.userID,
                projectID: data.projectID,
                ts: serverTimestamp(),
                type: "downvote"
            })
              setDownvotedCount(downvotedCount+1)
        }else{
            // decrement the count
            await updateDoc(projectDocRef, {downvotedCount: increment(-1)});
            // remove from interactions collection
            const q = query(intereactionColRef, 
                where("projectID", "==", data.projectID),
                where("userID", "==", authCtx.userID),
                where("type", "==", "downvote"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (document) =>{
                const intereactionDocRef = doc(db, "interactions", document.id)
                await deleteDoc(intereactionDocRef)
            })
            setDownvotedCount(downvotedCount-1)
        }
        // update the state
        setIsDownvoted(!isDownvoted);
    }

    const buttonsArray = [
                {icon: issue_icon, text: `${issueCount} Issues`},
                {icon: recruiting_icon, text: `${recruitingCount} Recruiting`,},
                {icon: comment_icon, text: commentCount > 0 ? commentCount.toString() : ""},
                {icon: isUpvoted ? upvote_icon_enabled : upvote_icon_disabled, text: upvotedCount > 0 ? upvotedCount.toString() : "", onClick: handleUpvote},
                {icon: isDownvoted ? downvote_icon_enabled : downvote_icon, text: downvotedCount > 0 ? downvotedCount.toString() : "", onClick: handleDownvote}
        ];

    const bottomButtons = buttonsArray.map((obj, i) => {
        return(
            <button key={'button-'+i} className='flex flex-row space-x-1 items-center' onClick={obj.onClick}>
                <img className='w-4' src={obj.icon}/>
                <label className='mt-1'>{obj.text}</label>
            </button>
        )
    })
    
    // Format the date using moment library. Docs: https://momentjs.com/docs/#/displaying/format/
    const timeForPost = moment(data.publishedDate.toDate()).format('MMMM, D, YYYY');

    return (
        <div className={"flex flex-col md:rounded-xl large:rounded-xl justify-between bg-white w-full h-fit py-5 lg:max-w-[40%] "}>
            <div className='px-3'>
                {/* username, date, save and notification button */}
                <div className="flex flex-row justify-between text-xs w-full pr-3">
                    <div className='flex flex-row space-x-1 lg:text-[11px] md:text-[11px]'>
                        <div className="rounded-full h-3 w-3">
                            <img 
                                className="rounded-full h-full w-full object-cover cursor-pointer" 
                                src={profilePicPath} alt="Profile"
                            />
                        </div>
                        <label className="">{username}</label>
                        <label className=""> - </label>
                        <label className="">{timeForPost}</label>
                    </div>
                    <div className='flex flex-row space-x-8'>
                        {/* <button>
                            <img className='w-3' src={save_icon}/>
                        </button> */}
                        <button>
                            <img className='w-[14px]' src={notification_icon}/>
                        </button>
                    </div>
                </div>
                <h1 className='pt-2 pb-1 text-sm lg:text-xl md:text-lg font-bold'>{data?.title}</h1>
                {/* Text and image */}
                <div className="text-[12px] md:text-[13px] lg:text-[15px]">
                    <div className='focus:outline-none'
                        ref={descriptionRef}
                        contentEditable={isEditMode}
                    >
                        {editedDescription}
                    </div>
                </div>


                {/* Edit and delete button */}
                <div className='flex flex-row text-[12px] space-x-10 mt-2 text-[#3C9A9A]'>
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                    {/*Save Button */}
                    {isEditMode && (
                        <button onClick={handleSaveClick}>Save</button>
                    )}
                    {isEditMode && (
                        <button onClick={handleCancelClick}>Cancel</button>
                    )}

                </div>
            </div>
            <img className='pt-2' src={imageURL}></img>
            {/* Bottom buttons */}
            <div className='flex justify-between pt-4 px-6 text-xs md:text-[11px] lg:text-[12px]'>
                {bottomButtons}
            </div>
        </div>
    );
}
