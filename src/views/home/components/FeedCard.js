import React, { Component, useEffect, useState, useContext} from 'react';
import CommentArea from './CommentArea';
import moment from 'moment'
import { doc, updateDoc, increment, collection, addDoc, query, where,getDocs, select } from "firebase/firestore";
import {db} from '../../../firebase-config'
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
import pdf from '../../../assets/home/pdf.svg';
import upvote from '../../../assets/home/upvote.svg';
import upvote_selected from '../../../assets/home/upvote_selected.svg';


const Button = props => {
    return <button href={props.href} className="flex items-center gap-2 h-5" onClick={props.onClick}>{props.children}</button>
}

const FeedCard= (props) => {
    // For controlling which upvoted icon to display
    const [isPostUpvoted, setIsPostUpvoted] = useState(false);  // to swithc icons when upvoted or not
    const [extendCommentArea, setExtendCommentArea] = useState(false); // to extend the comment area
    const [postStats, setPostStats] = useState({})
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
            const postsColRef = collection(db, 'posts');
            const q = query(postsColRef,
                where("post_id", "==", data.post_id),
                select('upvoted_count', 'comments_count', 'shared_count'));
            const querySnapshot = await getDocs(q);  
            querySnapshot.forEach((doc) => {
                setPostStats(doc.data())
                console.log(doc.data());
            })  
        }
    }, []);
    const onUpvote = async () => {
        // Update the state
        setIsPostUpvoted(!isPostUpvoted);
        // Increment or decrement upvote_count in posts collection
        if(!isPostUpvoted){
            await updateDoc(docRef, {
                upvoted_count: increment(1)
            });
        }else{
            await updateDoc(docRef, {
                upvoted_count: increment(-1)
            });
        }
        // Add or remove the upvote button from interactions collection
        await addDoc(intereactionColRef, {
            user_id: authCtx.userID,
            post_id: data.post_id,
            ts: new Date(),
            type: "upvote"
        })
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
                        <img src={pdf} />
                        <div className="h-full w-5/12 flex flex-col border">
                            <label className="font-bold">Title</label>
                            <p className="flex flex-wrap">
                                <span>#thisIsAnAwesomeHashtag</span>
                                <span>#this</span>
                                <span>#IsAHashtag</span>
                                <span>#thisIsAnA</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/*description subsection*/}
                <p className="flex-wrap">
                    {data.text.slice(0, 160)}
                    <span className="font-bold text-lg"> more...</span>
                </p>
            </div>

            {/*buttons*/}
            <div className={"flex justify-between w-full h-9 py-1 px-14"}>
                <Button>
                    <img className="h-full" src={save} />
                </Button>
                <Button>
                    <img className="h-full" src={share} />
                    {/* Display the counts only when the data has shared_count  */}
                    {data?.shared_count && <label>100</label>}
                </Button>
                <Button onClick={handleCommentButtonClicked}>
                    <img className="h-full" src={comments} />
                    {data?.comment_count && <label>{data.comment_count}</label>}
                </Button>
                <Button className="border border-red-2" onClick = {onUpvote}>
                    {isPostUpvoted && <img className="h-full" src={upvote_selected}></img>}
                    {!isPostUpvoted && <img className="h-full" src={upvote} />}
                    {data?.upvoted_count && <label>{data.upvoted_count}</label>}
                </Button>
            </div>
            {/*Comment area*/}
            {extendCommentArea && <CommentArea post_id = {data.post_id}/>}

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