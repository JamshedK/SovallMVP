import profile from '../../../assets/common/profile.jpg';
import camera from '../../../assets/home/camera.svg';
import file_upload from '../../../assets/home/doc.svg';

/*API stuff*/
import {collection, query, where, getDocs, addDoc, orderBy, Query } from "firebase/firestore";
import {db} from '../../../firebase-config'
import { useEffect, useState, useRef, useContext} from 'react';
import AuthContext from '../../../contexts/auth-context';
import moment from 'moment'   // library for formatting dates

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
        // 
        props.displayNewComment({...newCommentData, "comment_id": docRef.id});
        // set the value of textarea to an emtpy string
        textAreaRef.current.value = ''
        setShowCommentButton(false)
    }

    return (
            <div className='w-full flex flex-col items-center'>
                {/* New comment box */}
                <div className='w-full flex flex-row'>
                    <img className="h-10 rounded-full h-full" src = {profile}></img>
                    <div className='w-full flex flex-row rounded-2xl space-x-3'>
                        {/* {The styling for textarea is to remove the default stylings} */}
                        <textarea className="w-full border-none outline-none resize-none overflow-hidden min-h-6 focus:bg-transparent focus:outline-none focus:ring-0" placeholder='Add a comment...'
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

// Component for replies to comments
const CommentReplies = (props) => {
    return (
        <div className='flex flex-row space-x-4'>
                <div className='h-10 v-10'>
                    <img className="rounded-full h-full" src = {profile}></img>
                </div>
                <div className='flex flex-col'>
                    <label>Wahid</label>
                    <label>This is a reply</label>
                    <div className='flex flex-row space-x-10'>
                        <label> 2 min </label>
                    </div>
                </div>
        </div>
    )
};

const SingleComment = (props) => {
    //FIXME: fix this
    let replyItems = []
    if(props.comment_data?.replies){
        replyItems = props.comment_data.replies.map((reply, i) => {
            // Having key for each Comment is required per React docs
            return <CommentReplies key={"reply-card-" + i} reply_data={reply}/>
        })
    }
    const getTimeForComment = () => {
        var tsForDisplay = '';
        const ts = new Date(Date.parse(props.comment_data.ts))
        tsForDisplay =  moment(ts).fromNow();
        return tsForDisplay;
    }
    const timeForComment = getTimeForComment();

    return (
        <div className='pt-2'>
            {/*Member comments*/}
            <div className='flex flex-row space-x-4'>
                <div className='h-10 v-10'>
                    <img className="rounded-full h-full" src = {profile}></img>
                </div>
                <div className='flex flex-col space-y-5'>
                    <div className='flex flex-col'>
                        <label>Jamshed</label>
                        <label>{props.comment_data.text}</label>
                        <div className='flex flex-row space-x-10'>
                            <button> Reply </button>
                            <label> {timeForComment} </label>
                        </div>
                    </div>
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
            // for getting replies to the comments
            comments.forEach(async(comment) =>{
                var replies = []
                const docRef = collection(db, "comment_replies");
                const q = query(docRef, where("comment_id", "==", comment.comment_id), orderBy('ts', 'desc'));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    replies.push(doc.data())
                    comment["replies"] = replies;
                })
            })
            setCommentsArray(comments);
        }
        getComments();
    }, [])

    // Update the contents of commentsArray state to display a new comment
    const displayNewComment = (newComment) =>{
        setCommentsArray([newComment, ...commentsArray]);
    }

    // Create comments component for every comment
    if(commentsArray.length > 0){
        commentItems = commentsArray.map((comment, i) => {
            // Having key for each Comment is required per React docs
            return <SingleComment key={"comment-card-" + i} comment_data={comment}/>
        })
    }
    return (
        <div className="w-full px-8">
            {/* Pass the displayNewComment function to the child component to update the commentArray state*/}
            <NewCommentBox post_id = {props.post_id} displayNewComment = {displayNewComment}/>
            {commentItems.length != 0 && <div>{commentItems}</div>}
        </div>
    )
}

export default CommentArea;