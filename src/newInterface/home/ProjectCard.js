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
import recruiting_icon_web from '../../assets/newInterface/home/recruiting_icon_web.svg';

import { useState, useEffect, useContext, useRef } from 'react';

import moment from 'moment'

import {getDownloadURL, ref} from 'firebase/storage'
import {db, storage} from '../../firebase-config'
import { doc, updateDoc, collection, increment, serverTimestamp, addDoc, query, where, getDocs, getDoc, deleteDoc } from "@firebase/firestore";
import AuthContext from '../../contexts/auth-context';
import { createSearchParams, useNavigate } from 'react-router-dom';

const MAX_LINES = 2; // Maximum number of lines before showing "See more"

export const ProjectCard = (props) => {
    const data = props.data

    const [commentCount, setCommentCount] = useState(props.data.commentCount)
    const [upvotedCount, setUpvotedCount] = useState(props.data.upvotedCount)
    const [downvotedCount, setDownvotedCount] = useState(props.data.downvotedCount || 0)
    const [recruitingCount, setRecruitingCount] = useState(props.data.recruitingCount || 0);
    const [issueCount, setIssueCount] = useState(props.data?.issueCount || 0)
    const [isUpvoted, setIsUpvoted] = useState(false);  // to swithc icons when upvoted or not
    const [isDownvoted, setIsDownvoted] = useState(false);  // to swithc icons when downvoted or not
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [containsImage, setContainsImage] = useState(false);
    const [username, setUserName] = useState('');
    const [profilePicPath, setProfilePicPath] = useState(''); 

    const intereactionColRef = collection(db, 'interactions')
    const projectDocRef = doc(db, "projects", data.projectID);
    const descriptionRef = useRef(null);

    const navigate = useNavigate()

    const authCtx = useContext(AuthContext)

    // When the post loads, determine if the user had liked it or not
    useEffect(() => {
        // To control the height of the description box
        const descriptionElement = descriptionRef.current;
        if (descriptionElement && descriptionElement.clientHeight > MAX_LINES * 13) {
            setIsExpanded(false);
        } else {
            setIsExpanded(true);
        }
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

    const handleRedirect = () => {
        const params = {id: data.projectID}
        navigate({
            pathname: '/project-page',
            search:`${createSearchParams(params)}`
        })
    }


    // To expand the description box
    const toggleExpanded = () => {
        setIsExpanded((prevState) => !prevState);
    };
    
    // to get the style fo the description box
    const getDescriptionStyle = () => {
        return isExpanded ? "max-h-full" : "max-h-[4.5rem] overflow-hidden";
    };
    

    // Format the date using moment library. Docs: https://momentjs.com/docs/#/displaying/format/
    const timeForPost = moment(data.publishedDate.toDate()).format('MMMM, D, YYYY');
    // Project card for mobile
    const mobileProjectCard = () => {
        const buttonsArray = [
            {icon: issue_icon, text: `${issueCount} Issues`},
            {icon: recruiting_icon, text: `${recruitingCount} Recruiting`,},
            {icon: comment_icon, text: commentCount > 0 ? commentCount.toString() : "", onClick: handleRedirect},
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

        return (
        <div className={"flex flex-col rounded-xl justify-between bg-white w-full py-5 lg:max-w-[40%] "}>
            <div className='px-3'>
                {/* username, date, save and notification button */}
                <div className="flex flex-row justify-between text-xs w-full pr-3">
                    <div className='flex flex-row space-x-1'>
                        <div className="rounded-full h-3 w-3">
                            <img className="rounded-full h-full w-full object-cover cursor-pointer" src={profilePicPath} alt="Profile" />
                        </div>
                        <label className="">{username}</label>
                        <label className=""> - </label>
                        <label className="">{timeForPost}</label>
                    </div>
                    <div className='flex flex-row space-x-8'>
                        <button>
                            <img className='w-3' src={save_icon}/>
                        </button>
                        <button>
                            <img className='w-[14px]' src={notification_icon}/>
                        </button>
                    </div>
                </div>
                <h1 className='pt-2 pb-1 text-sm font-bold'>{data?.title}</h1>
                {/* Text and image */}
                <div className="text-[12px]">
                    <div className={getDescriptionStyle()} ref={descriptionRef}>
                        <p>{data?.description}</p>
                    </div>
                    <div className='flex flex-row justify-between w-full text-[10px] py-2 px-4'>
                        {!isExpanded && (
                            <button className="w-fit cursor-pointer text-[#7A7A7A]" onClick={toggleExpanded}> Read more </button>
                        )}
                        {isExpanded && (
                            <button className="w-fit cursor-pointer text-[#7A7A7A]" onClick={toggleExpanded}> Read less </button>
                        )}
                        <button 
                            className="w-fit text-[#7A7A7A]"
                            onClick={() => handleRedirect()}
                        >
                            View full project
                        </button>
                    </div>
                    </div>
            </div>
            <img className='pt-2' src={imageURL}></img>
            {/* Bottom buttons */}
            <div className='flex justify-between text-xs pt-4 px-6'>
                {bottomButtons}
            </div>
        </div>
    )}
    // Project card for desktop
    const desktopProjectCard = () => {
        const buttonsArray = [
            {icon: notification_icon},
            {icon: isUpvoted ? upvote_icon_enabled : upvote_icon_disabled, text: upvotedCount > 0 ? upvotedCount.toString() : "", onClick: handleUpvote},
            {icon: isDownvoted ? downvote_icon_enabled : downvote_icon, text: downvotedCount > 0 ? downvotedCount.toString() : "", onClick: handleDownvote},
            {icon: comment_icon, text: commentCount > 0 ? commentCount.toString() : "", onClick: handleRedirect},
            {icon: save_icon}
        ];

        const buttonsComp = buttonsArray.map((obj, i) => {
            return(
                <button key={'button-'+i} className='flex flex-row space-x-1 items-center' onClick={obj.onClick}>
                    <img className='w-5' src={obj.icon}/>
                    <label className=''>{obj.text}</label>
                </button>
            )
        })
        const numCollaborators = data.collaborators.length;
        const collaboratorsComp = data.collaborators.slice(0,2).map((user) => {
            return (
                <div key={'div-'+Math.random()} className='flex flex-row space-x-1 cursor-pointer'>
                    <div className="rounded-full h-7 w-7">
                        <img className="rounded-full h-full w-full object-cover" src={user.image_path} alt="Profile" />
                    </div>
                    <div className='flex flex-col'>
                        <label className="text-[12px]">{user.fullname.trim()}</label>
                        <label className='text-[9px] text-[#767676]'>{user.skill[0]}</label>
                    </div>
                </div>
            )
        })    
        return(
            <div className={"flex flex-row justify-between h-[13rem] rounded-lg w-[65%]"}>
                {/* left */}
                <div className="px-8 bg-white rounded-l-xl h-full border-r-[2px] border-[#3C9A9A]">
                    <div className='py-6 flex flex-col  justify-between h-full space-y-1'>
                        {buttonsComp}
                    </div>
                </div>
                {/*  main screen */}
                <div className='flex flex-grow bg-white'>
                    <div className='flex flex-row w-full'>
                        {/* profile pic of post owner*/}
                        <div className="rounded-full h-7 w-7 ml-4 mt-5 ">
                            <img 
                                className="rounded-full h-full w-full object-cover" 
                                src={profilePicPath}
                                alt="Profile">
                            </img>
                        </div>
                        <div className='flex flex-row justify-around w-full'>
                            {/* project details */}
                            <div className='flex flex-col flex-grow ml-3 mt-5 max-w-[400px]'>
                                <h1 className='text-xl'>{data?.title}</h1>
                                <label className="text-[11px]">{`${username.split(" ")[0]} - ${timeForPost}` }</label>
                                <div className={getDescriptionStyle()} ref={descriptionRef}>
                                    <p className='text-[15px]'>{data?.description}</p>
                                </div>
                                <div className="flex-grow"></div> {/* This div will push the issueCount to the bottom */}
                                {issueCount > 0 &&
                                    <label 
                                        className='text-[13px] text-[#BD1B1B] mb-5'
                                    >
                                        {`+${issueCount} unsolved issues`}
                                    </label>
                                }
                            </div>
                            {/* image */}
                            <div className='mr-0'>
                                <img className='h-full object-cover w-[300px]' src={imageURL}></img>
                            </div>
                        </div>
                    </div>
                </div>
                {/* collaborators */}
                <div className='px-2 py-4 w-52 bg-white rounded-r-xl h-full border-l-[2px] border-[#3C9A9A]'>
                    <h1 className='font-inter text-[14px] font-medium'>Collaborators</h1>
                    <div className='flex flex-col space-y-3 mt-2'>
                        <div className='flex flex-row items-end'>
                            <div className='flex flex-col space-y-3'>
                                {collaboratorsComp}
                                </div>
                            {numCollaborators > 2 && 
                                <label className='text-[11px]'>{`+${numCollaborators-2}`}</label>}
                        </div>
                        <div className='flex flex-row space-x-1 cursor-pointer text-[12px] items-center'>
                            <div className="rounded-full h-7 w-7">
                                <img className="rounded-full h-full w-full object-cover" src={recruiting_icon_web} alt="Profile" />
                            </div>
                            <label>{`(${recruitingCount}) Recruiting`}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // for checking if the user in mobile

    // Update the isMobile state when the screen is resized
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='w-screen flex justify-center'>
            {isMobile ? mobileProjectCard() : desktopProjectCard()}
        </div>
    );
}
