import profile from '../../../assets/common/profile.jpg';
import camera from '../../../assets/home/camera.svg';
import file_upload from '../../../assets/home/doc.svg';
import delete_image from '../../../assets/feedcard/close.svg';


/*API stuff*/
import {collection, doc, query, where, getDocs, addDoc, orderBy, updateDoc, arrayUnion, increment } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {db, storage} from '../../../firebase-config'
import { useEffect, useState, useRef, useContext} from 'react';
import AuthContext from '../../../contexts/auth-context';
import moment from 'moment';   // library for formatting dates
import { async } from 'q';

// Main parent component
const CommentArea = (props) => {
    const [commentsArray, setCommentsArray] = useState([]);
    const [newCommentAdded, setNewCommentAdded] = useState();
    let commentItems = [null];
    // Get the comments from firestore and store them in an array
    useEffect(() => {
        var comments = []
        const getComments = async () =>{
            const postsRef = collection(db, "comments");
            const q = query(postsRef, where("post_id", "==", props.post_id), orderBy("ts", 'desc'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                comments.push({...doc.data(), "comment_id": doc.id})
            });
            setCommentsArray(comments);
        }
        getComments();
    }, [newCommentAdded])
  
    const displayNewReply = (i, repliesArray) => {
        var temp = commentsArray;
        temp[i]['replies'] = repliesArray;
        setCommentsArray(temp)
    }
    // Create comments component for every comment
    if(commentsArray.length > 0){
        commentItems = commentsArray.map((comment, i) => {
            // Having key for each Comment is required per React docs  
            return <SingleComment key={"comment-card-" + i} 
                        comment_data={comment}
                        setNewCommentAdded = {setNewCommentAdded}
                        displayNewReply = {displayNewReply}
                        positionInCommentsArray = {i}
                        commentCount = {props.commentCount}
                        setCommentCount = {props.setCommentCount}
                    />
        })
    }
    return (
        <div className="w-full px-8">
            <NewCommentBox 
                post_id = {props.post_id}
                setNewCommentAdded = {setNewCommentAdded}
                commentCount = {props.commentCount}
                setCommentCount = {props.setCommentCount}/>
            {commentItems.length != 0 && <div>{commentItems}</div>}
        </div>
    )
}

// Component for each comment and replies to that commment
const SingleComment = (props) => {
    const [showNewReplyBox, setShowNewReplyBox] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [containsImage, setContainsImage] = useState(false);
    // Create an array of CommentReplies components to be displayed under the comment
    let replyItems = []
    
    useEffect(() => {
        const getImage = async () => {
            if(props.comment_data?.image_path){
                var imagePath = props.comment_data.image_path;
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
    },[props.comment_data]);
    if(props.comment_data?.replies){
        var replies = props.comment_data.replies;
        replyItems = replies.map((reply, i) => {
            // Having key for each Comment is required per React docs
            return <CommentReplies key={"reply-card-" + i} reply_data={reply}/>
        })
    }
    // Use moment library to format when the comment was made. Docs: https://momentjs.com/docs/#/displaying/fromnow/
    const ts = new Date(Date.parse(props.comment_data.ts))
    const timeForComment = moment(ts).fromNow();
    
    // update repliesArray to show the new reply
    const updateRepliesArray = (reply_data) => {
        if(props.comment_data?.replies){
            props.comment_data.replies.unshift(reply_data);
        }
        else{
            // create a new temp array
            var tempRepliesArray = []
            tempRepliesArray.push(reply_data)
            props.comment_data['replies']= tempRepliesArray
        }
        // call the main parent component function to update the state
        props.displayNewReply(props.positionInCommentsArray, props.comment_data.replies)
    }
    
    return (
        <div className='pt-2'>
            {/*Member comments*/}
            <div className='flex flex-row space-x-4'>
                <div className='h-10 v-10'>
                    <img className="rounded-full h-full" src = {profile}></img>
                </div>
                <div className='flex flex-col space-y-5 w-full'>
                    <div className='flex flex-col'>
                        <label>Jamshed</label>
                        <label>{props.comment_data.text}</label>
                        {containsImage && <img src={imageURL}></img>}
                        <div className='flex flex-row space-x-10'>
                            <button onClick={ ()=> setShowNewReplyBox(!showNewReplyBox)}> Reply </button>
                            <label> {timeForComment} </label>
                        </div>
                    </div>
                    {/* Display newReplyBox if the reply button is clicked */}
                    {showNewReplyBox && 
                        <NewReplyBox 
                            comment_id = {props.comment_data.comment_id}
                            setNewCommentAdded = {props.setNewCommentAdded}
                            post_id = {props.comment_data.post_id}
                            updateRepliesArray = {updateRepliesArray}
                            setShowNewReplyBox = {setShowNewReplyBox}
                            commentCount = {props.commentCount}
                            setCommentCount = {props.setCommentCount}
                        />}
                    {/*Replies to member comment if present*/}
                    <div>
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
    const tsForDisplay = moment(ts).fromNow();
    return (
        <div className='w-full flex flex-row space-x-4 space-y-2'>
                <div className='h-10 v-10'>
                    <img className="rounded-full h-full" src = {profile}></img>
                </div>
                <div className='flex flex-col space-y-1'>
                    <label>Wahid</label>
                    <label>{props.reply_data.text}</label>
                    <div className='flex flex-row space-x-10'>
                        <label>{tsForDisplay}</label>
                    </div>
                </div>
        </div>
    )
};
// Component for writing a new comment
// TODO: image and file input
const NewCommentBox = (props) => {
    const textAreaRef = useRef();  
    const [showCommentButton, setShowCommentButton] = useState(false);  // control whether to show comment button or not
    const [containsImage, setContainsImage] = useState(false);
    const [imageSource, setImageSource] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const commentsCollectionRef = collection(db, 'comments')    // reference to comments collection in firestore
    const postsDocRef = doc(db, "posts", props.post_id);
    const authCtx = useContext(AuthContext);

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
    }

    const commentButtonHandler = async () => {
        var imagePath = '';
        if(containsImage){
            // generate a random number to be added to the name of the image
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
        const newCommentData = {
            post_id: props.post_id,
            text: textAreaRef.current.value,
            ts: Date(),
            user_id: authCtx.userID,
            image_path: imagePath
        }
        // Store the new comment in firebase
        const docRef = await addDoc(commentsCollectionRef, newCommentData)
        // update the state to rerender all the comments
        props.setNewCommentAdded(Date.now())   // Date.now() is just a unique identified that force the component to rerender 
        textAreaRef.current.value = ''  // set the value of textarea to an emtpy string
        // update the state of commentCount
        props.setCommentCount(props.commentCount + 1)
        console.log(props.commentCount);
        // update comment_count for posts
        await updateDoc(postsDocRef, {comment_count: increment(1)});
        // add in interactions collections
        const interactionsColRef = collection(db, 'interactions')
        await addDoc(interactionsColRef, {
            user_id: authCtx.userID,
            post_id: props.post_id,
            comment_id: docRef.id,
            ts: new Date(),
            type: "comment"
        })
        setShowCommentButton(false)
    }

    return (
            <div className='w-full flex flex-col items-center'>
                {/* New comment box */}
                <div className='w-full flex flex-row'>
                    <img className="h-10 rounded-full h-full" src = {profile}></img>
                    <div className='w-full flex flex-row rounded-2xl space-x-3'>
                        {/* {The styling for textarea is to remove the default stylings} */}
                        <div className='w-full flex flex-col'>
                            <textarea className="w-full border-none outline-none resize-none overflow-hidden min-h-6 focus:bg-transparent 
                                        focus:outline-none focus:ring-0" placeholder='Add a comment...'
                                ref={textAreaRef}
                                onChange={onTextAreaChange}
                                ></textarea>
                            {/* Displaying the image if it was selected */}
                            {containsImage && 
                                <div className='flex flex-row'>
                                    <img className='px-5' src={imageSource}></img>
                                    <button className='w-5 h-5' onClick={handleRemoveImage}>
                                        <label>X</label>
                                    </button>
                                </div>}
                        </div>
                        {!containsImage && <label className="flex items-center cursor-pointer">
                            <input type="file" className="opacity-0 absolute h-0 w-0 overflow-hidden" accept="image/*" onChange={handleImageUpload} />
                            <img className="h-6 w-6" src={camera} alt="Camera icon" />
                        </label>}
                       {/* TODO: add file upload and polls */}
                    </div>
                </div>
                {showCommentButton && <button onClick={commentButtonHandler} className="bg-green-800 text-white rounded-full w-fit px-4">Comment</button>}
            </div>      
    )
};

const NewReplyBox = (props) => {
    const textAreaRef = useRef();  
    const commentRef = doc(db, 'comments', props.comment_id)    // reference to comments collection in firestore
    const postsDocRef = doc(db, "posts", props.post_id);

    const [showReplyButton, setShowReplyButton] = useState(false);  // control whether to show reply button or not
    const authCtx = useContext(AuthContext);

    // Display reply button only when the user types something
    const onTextAreaChange = () => {
        if(textAreaRef.current.value != ''){
            setShowReplyButton(true)
        }
        else{
            setShowReplyButton(false)
        }
    }

    const replyButtonHandler = async () => {
        const newReplyData = {
            text: textAreaRef.current.value,
            ts: Date(),
            user_id: authCtx.userID
        }
        // call the function in parent component to update the state of replyArray to display the reply
        // props.updateRepliesArray(newReplyData)
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
            post_id: props.post_id,
            comment_id: props.comment_id,
            ts: new Date(),
            type: "comment",
            sub_type: "reply"
        })
        // update the state to rerender CommentArea to fetch the new comment
        props.setNewCommentAdded(new Date());
        setShowReplyButton(false)
    }

    return (
            <div className='w-full flex flex-col items-center'>
                {/* New comment box */}
                <div className='w-full flex flex-row'>
                    <img className="h-10 rounded-full h-full" src = {profile}></img>
                    <div className='w-full flex flex-row rounded-2xl space-x-3'>
                        {/* {The styling for textarea is to remove the default stylings} */}
                        <textarea className="w-full border-none outline-none resize-none overflow-hidden min-h-6
                                     focus:bg-transparent focus:outline-none focus:ring-0" placeholder='Reply to the user...'
                             ref={textAreaRef}
                             onChange={onTextAreaChange}
                             ></textarea>
                        <button>
                            <img className='h-6 w-6' src={camera}></img>
                        </button>
                        <button>
                            <img className='h-6 w-6' src={file_upload}></img>
                        </button>
                    </div>
                </div>
                {showReplyButton && 
                    <button onClick={replyButtonHandler} className="bg-green-800 text-white rounded-full w-fit px-4">Reply</button>}
            </div>      
    )
};

export default CommentArea;