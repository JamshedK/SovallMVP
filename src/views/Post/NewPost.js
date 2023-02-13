import photo from '../../assets/home/photo.svg';
import doc from '../../assets/home/doc.svg';
import poll from '../../assets/home/poll.svg';
import profile from '../../assets/common/profile.jpg';
import AuthContext from '../../contexts/auth-context';
import { useContext, useState, useRef } from 'react';
import { db, storage } from '../../firebase-config';
import { collection, addDoc} from '@firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage'

// The page for creating a new post
const NewPost = () => {
    const authCtx = useContext(AuthContext);
    const postTextRef = useRef();       // useRef hook to get reference for the textArea and get it's content later on
    const imageRef = useRef();
    const selectCategoryRef = useRef();
    const postCollectionRef = collection(db, 'posts')
    
    // Save the user post post to Firebase
    const handlePost = async () => {
        console.log(postTextRef.current.value);
        const published_date = new Date();
        var containsImage = false;
        if(imageRef.current.files[0]){
            containsImage = true;
        }

        var imagePath = '';
        if(containsImage){
            // generate a random number to be added to the name of the image
            const randomNum = Math.round(Math.random()*1000)
            // path for the image to be saved
            imagePath = `posts/${imageRef.current.files[0].name + randomNum}`
            // store the image in firebase
            uploadFile(imageRef, imagePath);
        }
        //Save the post in firebase
        const docRef = await addDoc(postCollectionRef, {
            userID: authCtx.userID,
            text: postTextRef.current.value,
			published_date: published_date,
            imagePath:imagePath,
            category:selectCategoryRef.current.value
		})

    }

    // Uploads the image to firebase storage
    const uploadFile = async (imageRef, imagePath) => {
        const image = imageRef.current.files[0];
        const filesFolderRef = ref(storage,imagePath)
        try{
            await uploadBytes(filesFolderRef, image)
        } catch(e){
            console.log(e);
        }
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
                    <select ref = {selectCategoryRef} defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>No category selected</option>
                        <option value='Problems'>Problems</option>
                        <option value='Solutions'>Solutions</option>
                        <option value='Resources'>Resources</option>
                        <option value='Opportunities'>Opportunities</option>
                        <option value='Polls'>Polls</option>
                        <option value='Other'>Other</option>
                    </select>
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
                    <input type="file" accept="image/png, image/jpeg" ref={imageRef}/>
                    {/* TODO: Can add the poll here later */}
                </div>
                {/* post button */}
                <button onClick={handlePost} className='bg-[#025B5B] text-white'>Post</button>
            </div>
        </div>
    )
}

export default NewPost;