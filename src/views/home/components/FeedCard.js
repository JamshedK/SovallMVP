import React, { Component, useEffect, useState, useContext} from 'react';
import CommentArea from './CommentArea';
import moment from 'moment'
import { doc, updateDoc, increment, collection, addDoc, query, where, getDocs, getDoc, deleteDoc } from "@firebase/firestore";
import {db, storage} from '../../../firebase-config'
import {getDownloadURL, ref} from 'firebase/storage'
import AuthContext from '../../../contexts/auth-context';


/* Assets */
import Interactor from './Interactor';
import comments from '../../../assets/home/comments.svg';
import arrowDown from '../../../assets/home/arrow_down.svg';
import arrowBack from '../../../assets/home/arrow_back.svg';
import dotsMenu from '../../../assets/home/dots_menu.svg';
import arrowForth from '../../../assets/home/arrow_forth.svg';
import share from '../../../assets/home/share.svg';
import save from '../../../assets/home/saved.svg';
import upvote from '../../../assets/home/upvote.svg';
import upvote_selected from '../../../assets/home/upvote_selected.svg';
import { async } from 'q';


const Button = props => {
    return <button href={props.href} className="flex items-center gap-2 h-5" onClick={props.onClick}>{props.children}</button>
}

const FeedCard= (props) => {
    // For controlling which upvoted icon to display
    const [isPostUpvoted, setIsPostUpvoted] = useState(false);  // to swithc icons when upvoted or not
    const [extendCommentArea, setExtendCommentArea] = useState(false); // to extend the comment area
    // TODO: Consider adding a callback function to update the post info in parent component
    const [commentCount, setCommentCount] = useState(0);
    const [sharedCount, setSharedCount] = useState(0);
    const [upvotedCount, setUpvotedCount] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [containsImage, setContainsImage] = useState(false);
    const data = props.data;
    const interactorsData = data.interactors;
    const docRef = doc(db, "posts", data.post_id);
    const intereactionColRef = collection(db, 'interactions')
    const authCtx = useContext(AuthContext);

    // Format the date using moment library. Docs: https://momentjs.com/docs/#/displaying/format/
    const ts = new Date(Date.parse(data.published_date))
    const timeForPost = moment().format('MMMM, D, YYYY');

    const px = "px-8";
    
    // When the post loads, determine if the user had liked it or not
    useEffect(() => {
        // check if the user has already upvoted the post
        const checkAlreadyUpvoted = async () => {
            const q = query(intereactionColRef, 
                where("user_id", "==", authCtx.userID),
                where("post_id", "==", data.post_id),
                where("type", "==", "upvote"));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.size > 0){
                setIsPostUpvoted(true);
            }
        }
        checkAlreadyUpvoted();
        // make a request to get only the counts from the post and store it here to make it easier to update
        const getPostStats = async () => {
            const docRef = doc(db, 'posts', data.post_id );
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setCommentCount(docSnap.data()?.comment_count ?? 0)
                setUpvotedCount(docSnap.data()?.upvoted_count ?? 0)
            }
        }
        getPostStats();
        // make a request to get the image if it exists
        const getImage = async () => {
            if(props.data?.imagePath){
                var imagePath = props.data.imagePath;
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
    }, []);

    const onUpvote = async () => {
        // Increment or decrement upvote_count in posts collection
        if(!isPostUpvoted){
            await updateDoc(docRef, {upvoted_count: increment(1)});
            // Add to intereactions collection
            await addDoc(intereactionColRef, {
                user_id: authCtx.userID,
                post_id: data.post_id,
                ts: new Date(),
                type: "upvote"
            })
              setUpvotedCount(upvotedCount+1)
        }else{
            // decrement the count
            await updateDoc(docRef, {upvoted_count: increment(-1)});
            // remove from interactions collection
            const q = query(intereactionColRef, 
                where("post_id", "==", data.post_id),
                where("user_id", "==", authCtx.userID),
                where("type", "==", "upvote"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (document) =>{
                const intereactionDocRef = doc(db, "interactions", document.id)
                await deleteDoc(intereactionDocRef)
            })
            setUpvotedCount(upvotedCount-1)
        }
        // update the state
        setIsPostUpvoted(!isPostUpvoted);
    }

    const handleCommentButtonClicked = () => {
        setExtendCommentArea(!extendCommentArea);
    }
    const interactors = interactorsData.map((interactor,i) => {
        return <Interactor key={"-interactor-"+i} data={interactor} />
    });

    return (
        <div className="w-full flex flex-col items-center bg-white border border-gray-300 rounded-xl py-8 gap-4" >
            {/*Post header*/}
            <div className={"flex justify-between items-center w-full " + px}>
                <div className="flex items-center h-10">
                    <img className="rounded-full h-full" src={data.pic} />
                    <div className="flex flex-col px-1">
                        <label className="font-bold text-[11pt]">{data.username}</label>
                        <label className="text-[9pt]">{timeForPost}</label>
                    </div>
                </div>
                <div className="flex gap-3">
                    <label className="bg-green-4 font-thin align-middle text-white text-[8pt] px-3 h-fit py-1 rounded-xl rounded-xl">Resources</label>
                    <img src={dotsMenu} />
                </div>
            </div>

            {/*post perse*/}
            <div className={"w-full h-fit flex flex-col gap-2 " + px}>
                {/*Attachment subsection*/}
                <div className="w-full px-4">
                    {/*attachment details*/ }
                    <div className="h-fit w-full rounded-xl bg-gray-200 flex gap-2">
                        {containsImage && <img src={imageURL}></img>}
                    </div>
                </div>

                {/*description subsection*/}
                <p className="flex-wrap">
                    {data.text}
                </p>
            </div>

            {/*buttons*/}
            <div className={"flex justify-between w-full h-9 py-1 px-14"}>
                <Button>
                    <img className="h-full" src={save} />
                </Button>
                <Button>
                    <img className="h-full" src={share} />
                    {/* Display the counts only when postsInfoCopy has shared_count and it's not zero */}
                    {sharedCount > 0 && <label>{sharedCount}</label>}
                </Button>
                <Button onClick={handleCommentButtonClicked}>
                    <img className="h-full" src={comments} />
                    {commentCount > 0 && <label>{commentCount}</label>}
                </Button>
                <Button className="border border-red-2" onClick = {onUpvote}>
                    {isPostUpvoted && <img className="h-full" src={upvote_selected}></img>}
                    {!isPostUpvoted && <img className="h-full" src={upvote} />}
                    {upvotedCount > 0 && <label>{upvotedCount}</label>}
                </Button>
            </div>
            {/*Comment area*/}
            {extendCommentArea && 
                <CommentArea 
                    commentCount = {commentCount} 
                    setCommentCount = {setCommentCount}
                    post_id = {data.post_id}/>}
            {/*division line*/ }
            <hr className="w-full"></hr>

            {/*interactors*/}
            <label className={"w-full " + px}>Members who intereacted with this post</label>
            <div className={"relative flex w-full items-start justify-between overflow-auto " + px}>
                {interactors}
            </div>
        </div>
        );
}

export default FeedCard;