import photo from '../../assets/home/photo.svg';
import doc from '../../assets/home/doc.svg';
import poll from '../../assets/home/poll.svg';
import profile from '../../assets/common/profile.jpg';
import AuthContext from '../../contexts/auth-context';
import { useContext, useState, useRef } from 'react';
import { db } from '../../firebase-config';
import { collection, addDoc} from '@firebase/firestore';

// The page for creating a new post
const NewPost = () => {
    const authCtx = useContext(AuthContext);
    const postTextRef = useRef();       // useRef hook to get reference for the textArea and get it's content later on
    const postCollectionRef = collection(db, 'posts')
    // Save the user post post to Firebase
    const handlePost = async () => {
        console.log(postTextRef.current.value);
        const published_date = new Date();
        //TODO: Save the post in firebase, and return a postID
        const docRef = await addDoc(postCollectionRef, {
            userID: authCtx.userID,
            text: postTextRef.current.value,
			published_date: published_date
		})
        console.log(docRef.id)
        //TODO: Use the postID to store the image
    }

    return(
        <div className="h-full w-full flex justify-center items-center" style={{backgroundColor: "#3C9A9A"}}>
            {/* container for the post */}
            <div className="flex flex-col p-2 gap-5 bg-white w-64 h-50">
                {/*profile and selecting category for the post*/ }
                <div className='flex flex-row items-start '>
                    <img className="w-8 h-8 rounded-full" src={profile} />
                    <div className='text-xs'>
                        <p>Name</p>
                        <p>Date</p>
                    </div>
                    <p>No tab selected</p>
                </div>
                {/* text area */}
                <div className='flex flex-col gap-5'>
                    <label>Write</label>
                    <textarea ref={postTextRef}>

                    </textarea>
                </div>
                {/* upload options */}
                <div className="flex gap-6 w-fit h-full">
                    {/* TODO: Correct the styles */}
                    <input type="file" accept="image/png, image/jpeg"/>
                    {/* TODO: Can add the poll here later */}
                </div>
                {/* post */}
                <button onClick={handlePost} className='bg-[#025B5B] text-white'>Post</button>
            </div>
        </div>
    )
}

export default NewPost;