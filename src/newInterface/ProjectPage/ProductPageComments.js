import camera from '../../assets/home/camera.svg';

/*API stuff*/
import {collection, doc, query, where, getDocs, getDoc, addDoc, orderBy, updateDoc, arrayUnion, increment, deleteDoc, arrayRemove, serverTimestamp } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {db, storage} from '../../firebase-config'
import { useEffect, useState, useRef, useContext} from 'react';
import AuthContext from '../../contexts/auth-context';
import moment from 'moment';   // library for formatting dates
import { async } from 'q';
import UserContext from '../../contexts/user';
import SelectedTabContext from '../../contexts/selected-tab-context';

 // get username and profile pic
 const getUserInfo = async (userID) => {
    const response = await getDoc(doc(db, "users", userID))
    const temp = response.data(); 
    const timestamp = new Date().getTime();
    var userInfo = {}
    userInfo.username = temp.firstname + ' ' + temp.lastname;
    // Get the download url for the profile pic
    const imageRef = ref(storage, temp.image_path)
    try{
        const downloadURL = await getDownloadURL(imageRef)
        userInfo.profilePicPath = `${downloadURL}?t=${timestamp}`;
    } catch(e){
        console.log(e);
    }
    return userInfo;
}

// Main parent component
const ProductPageCommentArea = (props) => {
    const [commentsArray, setCommentsArray] = useState([]);
    const [newCommentAdded, setNewCommentAdded] = useState();
    const [commentDeleted, setCommentDeleted] = useState();
    let commentItems = [null];
    const stCtx = useContext(SelectedTabContext)
    // Get the comments from firestore and store them in an array
    useEffect(() => {
        var comments = []
        const getComments = async () =>{
            const postsRef = collection(db, "projectComments");
            const q = query(postsRef, where("projectID", "==", props.projectID), orderBy("ts", 'desc'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                comments.push({...doc.data(), "commentID": doc.id})
            });
            console.log(comments)
            setCommentsArray(comments);
        }
        getComments();
    }, [newCommentAdded, commentDeleted])
  
    const deleteComment = (commentID) => {
        const commentIndex = commentsArray.findIndex(x => x.commentID === commentID)
        // remove the post from the PostsData array
        const updatedComents = [...commentsArray.slice(0, commentIndex), ...commentsArray.slice(commentIndex + 1)]
        setCommentsArray(updatedComents)
    } 
    // Filter the comments based on the selectedTab
    const filteredComments = commentsArray.filter(comment => {
        console.log('Filtering selected tab ' + stCtx.selectedTab)
        return comment.type === stCtx.selectedTab;
    });

    // Create comments component for every comment
    if(filteredComments.length > 0){
        commentItems = filteredComments.map((comment, i) => {
            // Having key for each Comment is required per React docs  
            return <SingleComment key={"comment-card-" + i} 
                        commentData={comment}
                        setNewCommentAdded = {setNewCommentAdded}
                        setCommentDeleted = {setCommentDeleted}
                        positionInCommentsArray = {i}
                        commentCount = {props.commentCount}
                        setCommentCount = {props.setCommentCount}
                        deleteComment = {deleteComment}
                    />
        })
    }
    return (
        <div className="w-full">
            <div className='bg-white border-2 border-white'>
                <div className='mx-4 mt-2 mb-2'>
                    <NewCommentBox 
                        projectID = {props.projectID}
                        setNewCommentAdded = {setNewCommentAdded}
                        commentCount = {props.commentCount}
                        setCommentCount = {props.setCommentCount}>
                    </NewCommentBox>
                </div>
            </div>
            {<div className='flex flex-col space-y-[1px]'>
                {commentItems}
            </div>}
        </div>
    )
}

// Component for each comment and replies to that commment
const SingleComment = (props) => {
    const [showNewReplyBox, setShowNewReplyBox] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [containsImage, setContainsImage] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const authCtx = useContext(AuthContext);
    const [showDeleteBtn, setShowDeleteBtn] = useState(props.commentData.userID === authCtx.userID)
    // Create an array of CommentReplies components to be displayed under the comment
    let replyItems = []
    // TODO: Repetetive code here and in CommentReplies. Make one function
    useEffect( () => {
        let mounted = true;
        const getImage = async () => {
            if (props.commentData?.image_path) {
            const imageRef = ref(storage, props.commentData.image_path);
            try {
                const timestamp = new Date().getTime();
                const downloadURL = await getDownloadURL(imageRef);
                if (mounted) {
                setImageURL(`${downloadURL}?t=${timestamp}`);
                setContainsImage(true);
                }
            } catch(e) {
                console.log(e);
            }
            } else if (mounted) {
            setImageURL('');
            setContainsImage(false);
            }
        };
        getImage();
        const func = async () => {
            var temp = await getUserInfo(props.commentData.userID)
            if(temp){
                setUserInfo(temp)
            }
        }
        func();
        return () => {
            mounted = false;
        };

    },[props.commentData]);

    // removed the reply from the firestore
    const deleteReply = async (i) => {
        const commentRef = doc(db, 'projectComments', props.commentData.commentID);
        await updateDoc(commentRef, {
            replies: arrayRemove(props.commentData.replies[i])
        });
        props.setCommentDeleted(new Date()); // unique identified to rerun the useEffect in CommentArea
    }

    if(props.commentData?.replies){
        var replies = props.commentData.replies;
        replyItems = replies.map((reply, i) => {
            // Having key for each Comment is required per React docs
            return <CommentReplies key={"reply-card-" + i} reply_data={reply} i={i}  deleteReply={deleteReply}/>
        })
    }
    // Use moment library to format when the comment was made. Docs: https://momentjs.com/docs/#/displaying/fromnow/
    const timeForComment = moment(props.commentData.ts.toDate()).format('MMMM, D, YYYY');

    const onDeleteBtnClicked = async () => {
        console.log(props.commentData)
        if (window.confirm("Are you sure you want to delete the comment?")) {
            props.deleteComment(props.commentData.commentID);
            /* TODO: 
                - Do not delete comment but set the deleted field for collection to true
                - Decrease the comment count 
            */
            await deleteDoc(doc(db, 'projectComments', props.commentData.commentID))
            setShowDeleteBtn(false);
        }
    }
    return (
        <div className='pt-2 bg-white'>
            {/*Member comments*/}
            <div className='flex flex-row space-x-4'>
                <div className='flex flex-col space-y-5 w-full'>
                    <div className='flex flex-col px-4'>
                        {/* username info  */}
                        <div className='flex flex-row space-x-1 text-xs md:text-[10px] lg:text-[11px]'>
                            <div className="rounded-full h-3 w-3">
                                <img 
                                    className="rounded-full h-full w-full object-cover cursor-pointer" 
                                    src={userInfo.profilePicPath} alt="Profile"
                                />
                            </div>
                            <label className="">{userInfo.username}</label>
                            <label className=""> - </label>
                            <label className="">{timeForComment}</label>
                        </div>
                        <label className='text-[12px] md:text-[14px] lg:text-[15px]'>{props.commentData.text}</label>
                        {containsImage && <img src={imageURL}></img>}
                        <div className='flex flex-row space-x-10 text-[#6C6C6C] text-xs md:text-[10px] lg:text-[11px]'>
                            <button className='' onClick={ ()=> setShowNewReplyBox(!showNewReplyBox)}> Reply </button>
                            {showDeleteBtn && <button onClick={onDeleteBtnClicked}>Delete</button>}
                        </div>
                    </div>
                    {/* Display newReplyBox if the reply button is clicked */}
                    {showNewReplyBox && 
                        <div className='mx-3'>
                            <NewReplyBox 
                                commentID = {props.commentData.commentID}
                                setNewCommentAdded = {props.setNewCommentAdded}
                                projectID = {props.commentData.projectID}
                                setShowNewReplyBox = {setShowNewReplyBox}
                                commentCount = {props.commentCount}
                                setCommentCount = {props.setCommentCount}
                            />
                        </div>
                    }   
                    {/*Replies to member comment if present*/}
                    <div className='mx-8'>
                        {replyItems}
                    </div>
                </div>
            </div>
        </div>
)
}

// Component for replies to comments
const CommentReplies = (props) => {
    const ts = new Date(Date.parse(props.reply_data.ts))
    const [imageURL, setImageURL] = useState('');
    const [containsImage, setContainsImage] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const authCtx = useContext(AuthContext);
    const [showDeleteBtn, setShowDeleteBtn] = useState(props.reply_data.user_id === authCtx.userID);
    // const tsForDisplay = moment(ts).fromNow();
    // Use moment library to format when the comment was made. Docs: https://momentjs.com/docs/#/displaying/fromnow/
    const timeForComment = moment(ts).format('MMMM, D, YYYY');
    // fetch the image if the reply contains one
    useEffect(() => {
        const getImage = async () => {
            if(props.reply_data?.image_path){
                var imagePath = props.reply_data.image_path;
                if(imagePath !== ''){
                    // Get the picture attached to the comment
                    const imageRef = ref(storage, imagePath)
                    try{
                        const downloadURL = await getDownloadURL(imageRef)
                        setImageURL(downloadURL);
                        setContainsImage(true);
                    } catch(e){
                        console.log(e);
                    }
                }
            }
        }
        getImage();
        const func = async () => {
            var temp = await getUserInfo(props.reply_data.user_id)
            if(temp){
                setUserInfo(temp)
            }
        }
        func();
    },[]);

    const onDeleteBtnClicked = async () => {
        if (window.confirm("Are you sure you want to delete the reply?")) {
            /* TODO: 
                - Do not delete comment but set the deleted field for collection to true
                - Decrease the comment count 
            */
           props.deleteReply(props.i)
        }
        setShowDeleteBtn(false);
    }
    console.log(props)
    return (
        <div className='w-full flex flex-col space-x-4 space-y-1'>
                {/* username info  */}
                <div className='flex flex-row space-x-1 text-xs md:text-[10px] lg:text-[11px]'>
                    <div className="rounded-full h-3 w-3">
                        <img 
                            className="rounded-full h-full w-full object-cover cursor-pointer" 
                            src={userInfo.profilePicPath} alt="Profile"
                        />
                    </div>
                    <label className="">{userInfo.username}</label>
                    <label className=""> - </label>
                    <label className="">{timeForComment}</label>
                </div>
            <div className='flex flex-col space-y-1 text-xs'>
                <label className='text-[12px] md:text-[14px] lg:text-[15px]'>{props.reply_data.text}</label>
                {containsImage && <img src={imageURL}></img>}
                <div className='flex flex-row space-x-10 text-[#6C6C6C]'>
                    {showDeleteBtn && <button onClick={onDeleteBtnClicked}>Delete</button>}
                </div>
            </div>
        </div>
    )
};
// Component for writing a new comment
// TODO: image and file input
const NewCommentBox = (props) => {
    const stCtx = useContext(SelectedTabContext) // context for selectedTab
    const textAreaRef = useRef();  
    const [showCommentButton, setShowCommentButton] = useState(false);  // control whether to show comment button or not
    const [containsImage, setContainsImage] = useState(false);
    const [imageSource, setImageSource] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const commentsCollectionRef = collection(db, 'projectComments')    // reference to comments collection in firestore
    const projectsDocRef = doc(db, "projects", props.projectID);
    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext)
    console.log(stCtx.selectedTab)
    const commentPageText = {'discussions': {
                                'inputPlaceholder': 'Start a discussion', 
                                'buttonText': 'Comment'
                                }, 
                            'issues': {
                                'inputPlaceholder': 'Create an issue', 
                                'buttonText': 'Post issue'  
                                }, 
                            'progress':{ 
                                'inputPlaceholder': 'Share progress updates',
                                'buttonText':'Share update'
                            }
                        }

    // Display comment button only when the user types something
    const onTextAreaChange = (event) => {
        event.preventDefault();
        if(textAreaRef.current.value != ''){
            setShowCommentButton(true)
        }
        else{
            setShowCommentButton(false)
        }
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        if(e.target.files[0] != null){
            setContainsImage(true);
            setImageSource(URL.createObjectURL(e.target.files[0]));
            setSelectedImage(e.target.files[0]);
        }
        else{
            setContainsImage(false);
        }
    }

    const handleRemoveImage = () => {
        setContainsImage(false);
        setImageSource(null);
        setSelectedImage(null);
    }

    const commentButtonHandler = async () => {
        var imagePath = '';
        if(containsImage){
            // generate a random number to be added to the name of the image
            const randomNum = Math.round(Math.random()*1000)
            // path for the image to be saved
            imagePath = `projectComments/${selectedImage.name + randomNum}`
              // Uploads the image to firebase storage
            const uploadFile = async (selectedImage, imagePath) => {
                const filesFolderRef = ref(storage,imagePath)
                try{
                    await uploadBytes(filesFolderRef, selectedImage)
                } catch(e){
                    console.log(e);
                }
                // remove the image after the image was uploaded
                handleRemoveImage();
            }
            uploadFile(selectedImage, imagePath);
        }
        const newCommentData = {
            projectID: props.projectID,
            text: textAreaRef.current.value,
            ts: serverTimestamp(),
            userID: authCtx.userID,
            imagePath: imagePath,
            type: stCtx.selectedTab
        }
        // Store the new comment in firebase
        const docRef = await addDoc(commentsCollectionRef, newCommentData)
        // update the state to rerender all the comments
        props.setNewCommentAdded(Date.now())   // Date.now() is just a unique identified that force the component to rerender 
        textAreaRef.current.value = ''  // set the value of textarea to an emtpy string
        // update the state of commentCount
        props.setCommentCount(props.commentCount + 1)
        // console.log(props.commentCount);
        // update comment_count for posts
        await updateDoc(projectsDocRef, {commentCount: increment(1)});
        // add in interactions collections
        const interactionsColRef = collection(db, 'projectInteractions')
        await addDoc(interactionsColRef, {
            userID: authCtx.userID,
            projectID: props.projectID,
            commentID: docRef.id,
            ts: serverTimestamp(),
            type: "discussionComment"
        })
        setShowCommentButton(false)
    }
    return (
        <div className='w-full flex flex-col items-center bg-[#E9E9E9] rounded-lg px-2 py-2 '>
            <div className='flex w-full space-x-2'>
                <div className='flex flex-row items-start space-x-2 w-full'>
                    <img className="h-4 rounded-full mt-1" src = {userCtx.profilePicPath}></img>
                    <textarea 
                        className="form-textarea w-full text-[12px] md:text-[14px] lg:text-[15px] border-none pl-0 pt-0 focus:ring-0 resize-none bg-[#E9E9E9] h-10 text-black" 
                        placeholder={commentPageText[stCtx.selectedTab].inputPlaceholder}
                        ref={textAreaRef}
                        onChange={onTextAreaChange}
                    ></textarea>
                </div>
            </div>
            {showCommentButton && 
                <button 
                    onClick={commentButtonHandler} 
                    className="relative top-2 bg-[#00AAC1] text-white rounded-md w-fit px-4 text-[12px] mb-4 py-1"
                >
                    {commentPageText[stCtx.selectedTab].buttonText}
                </button>}
        </div>      
    )
};

const NewReplyBox = (props) => {
    const [containsImage, setContainsImage] = useState(false);
    const [imageSource, setImageSource] = useState();
    const [selectedImage, setSelectedImage] = useState(null);   // reference to the image that was selected
    const [showReplyButton, setShowReplyButton] = useState(false);  // control whether to show reply button or not


    const textAreaRef = useRef();  
    const commentRef = doc(db, 'projectComments', props.commentID)    // reference to comments collection in firestore
    const postsDocRef = doc(db, "projects", props.projectID);

    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext)

    // Display reply button only when the user types something
    const onTextAreaChange = () => {
        if(textAreaRef.current.value != ''){
            setShowReplyButton(true)
        }
        else{
            setShowReplyButton(false)
        }
    }
    // preview image when selected
    const handleImageUpload = (e) => {
        // TODO: Display the comment button when image is selected 
        e.preventDefault();
        if(e.target.files[0] != null){
            setShowReplyButton(true)
            setContainsImage(true);
            setImageSource(URL.createObjectURL(e.target.files[0]));
            setSelectedImage(e.target.files[0]);
        }
        else{
            setContainsImage(false);
            setShowReplyButton(false)

        }
    }
    // remove image preview when X button is clicked
    const handleRemoveImage = () => {
        setContainsImage(false);
        setImageSource(null);
    }
    const replyButtonHandler = async () => {
        var imagePath = '';
        if(containsImage){
            // generate a random number to be added to the name of the image to avoid name duplication
            const randomNum = Math.round(Math.random()*1000)
            // path for the image to be saved
            imagePath = `comments/${selectedImage.name + randomNum}`
              // Uploads the image to firebase storage
            const uploadFile = async (selectedImage, imagePath) => {
                const filesFolderRef = ref(storage,imagePath)
                try{
                    await uploadBytes(filesFolderRef, selectedImage)
                } catch(e){
                    console.log(e);
                }
                // remove the image after the image was uploaded
                handleRemoveImage();
            }
            uploadFile(selectedImage, imagePath);
        }
        const newReplyData = {
            text: textAreaRef.current.value,
            ts: Date(),
            user_id: authCtx.userID,
            image_path: imagePath
        }
        // hide newReplyBox
        props.setShowNewReplyBox(false);
        // Store the new reply in firestore
        const docRef = await updateDoc(commentRef,{replies: arrayUnion(newReplyData)})
        // update the state of commentCount
        props.setCommentCount(props.commentCount + 1)
        // update comment_count for posts
        await updateDoc(postsDocRef, {comment_count: increment(1)});
        // add in interactions collections
        const interactionsColRef = collection(db, 'interactions')
        await addDoc(interactionsColRef, {
            user_id: authCtx.userID,
            projectID: props.projectID,
            commentID: props.commentID,
            ts: new Date(),
            type: "comment",
            sub_type: "reply"
        })
        // update the state to rerender CommentArea to fetch the new comment
        props.setNewCommentAdded(new Date());
        setShowReplyButton(false)
    }

    return (
            <div className='w-full flex flex-col items-center bg-[#E9E9E9] rounded-lg px-2 py-2 '>
                <div className='flex w-full space-x-2'>
                    <div className='flex flex-row items-start space-x-2 border-2 w-full'>
                        <img className="h-4 rounded-full mt-1" src = {userCtx.profilePicPath}></img>
                        <textarea 
                            className="form-textarea w-full text-[10px] md:text-[13px] lg:text-[14px] border-none pl-0 pt-0 focus:ring-0 resize-none bg-[#E9E9E9] h-6 text-black" 
                            placeholder='Reply'
                            ref={textAreaRef}
                            onChange={onTextAreaChange}
                        ></textarea>
                    </div>
                </div>
                {showReplyButton && 
                    <button 
                        onClick={replyButtonHandler} 
                        className="relative top-2 bg-[#00AAC1] text-white rounded-md w-fit px-4 text-[12px] py-1 mb-4"
                    >
                        Reply
                    </button>}
            </div>                
    )
};

export default ProductPageCommentArea;