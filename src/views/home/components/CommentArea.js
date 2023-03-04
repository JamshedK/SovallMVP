import profile from '../../../assets/common/profile.jpg';
import camera from '../../../assets/home/camera.svg';
import file_upload from '../../../assets/home/doc.svg';

/*API stuff*/
import {collection, doc, query, where, getDocs, addDoc, orderBy, updateDoc, arrayUnion } from "firebase/firestore";
import {db} from '../../../firebase-config'
import { useEffect, useState, useRef, useContext} from 'react';
import AuthContext from '../../../contexts/auth-context';
import moment from 'moment';   // library for formatting dates

// Component for writing a new comment
// TODO: image and file input
const NewCommentBox = (props) => {
    const textAreaRef = useRef();  
    const [showCommentButton, setShowCommentButton] = useState(false);  // control whether to show comment button or not
    const commentsCollectionRef = collection(db, 'comments')    // reference to comments collection in firestore
    const authCtx = useContext(AuthContext);

    // Display comment button only when the user types something
    const onTextAreaChange = () => {
        if(textAreaRef.current.value != ''){
            setShowCommentButton(true)
        }
        else{
            setShowCommentButton(false)
        }
    }

    const commentButtonHandler = async () => {
        const newCommentData = {
            post_id: props.post_id,
            text: textAreaRef.current.value,
            ts: Date(),
            user_id: authCtx.userID
        }
        // Store the new comment in firebase
        const docRef = await addDoc(commentsCollectionRef, newCommentData)
        // call the function in parent component to update the state of commentsArray to display the new comment
        props.displayNewComment({...newCommentData, "comment_id": docRef.id});
        textAreaRef.current.value = ''  // set the value of textarea to an emtpy string
        setShowCommentButton(false)
    }

    return (
            <div className='w-full flex flex-col items-center'>
                {/* New comment box */}
                <div className='w-full flex flex-row'>
                    <img className="h-10 rounded-full h-full" src = {profile}></img>
                    <div className='w-full flex flex-row rounded-2xl space-x-3'>
                        {/* {The styling for textarea is to remove the default stylings} */}
                        <textarea className="w-full border-none outline-none resize-none overflow-hidden min-h-6 focus:bg-transparent 
                                    focus:outline-none focus:ring-0" placeholder='Add a comment...'
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
                {showCommentButton && <button onClick={commentButtonHandler} className="bg-green-800 text-white rounded-full w-fit px-4">Comment</button>}
            </div>      
    )
};

const NewReplyBox = (props) => {
    const textAreaRef = useRef();  
    const commentRef = doc(db, 'comments', props.comment_id)    // reference to comments collection in firestore
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
        props.updateRepliesArray(newReplyData)
        // hide newReplyBox
        props.setShowNewReplyBox(false);
        // Store the new reply in firestore
        await updateDoc(commentRef,{
            replies: arrayUnion(newReplyData)
        })
        // props.displayNewComment({...newCommentData, "comment_id": docRef.id});
        textAreaRef.current.value = ''  // set the value of textarea to an emtpy string
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

// Component for each comment and replies to that commment
const SingleComment = (props) => {
    const [showNewReplyBox, setShowNewReplyBox] = useState(false);
    // Create an array of CommentReplies components to be displayed under the comment
    let replyItems = []
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
                        <div className='flex flex-row space-x-10'>
                            <button onClick={ ()=> setShowNewReplyBox(!showNewReplyBox)}> Reply </button>
                            <label> {timeForComment} </label>
                        </div>
                    </div>
                    {/* Display newReplyBox if the reply button is clicked */}
                    {showNewReplyBox && 
                        <NewReplyBox 
                            comment_id = {props.comment_data.comment_id}
                            updateRepliesArray = {updateRepliesArray}
                            setShowNewReplyBox = {setShowNewReplyBox}
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

// Main parent component
const CommentArea = (props) => {
    const [commentsArray, setCommentsArray] = useState([]);
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
    }, [])

    // Update the contents of commentsArray state to display a new comment
    const displayNewComment = (newComment) =>{
        setCommentsArray([newComment, ...commentsArray]);
    }
    
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
                        displayNewReply = {displayNewReply}
                        positionInCommentsArray = {i}/>
        })
    }
    return (
        <div className="w-full px-8">
            {/* Pass the displayNewComment function to the child component to update the commentArray state*/}
            <NewCommentBox 
                post_id = {props.post_id}
                displayNewComment = {displayNewComment}/>
            {commentItems.length != 0 && <div>{commentItems}</div>}
        </div>
    )
}

export default CommentArea;