import React, { Component, useState, useRef, useEffect, useContext} from 'react';

import photo from '../../../assets/home/photo.svg';
import doc from '../../../assets/home/doc.svg';
import poll from '../../../assets/home/poll.svg';

import profile from '../../../assets/common/profile.jpg';
import AuthContext from '../../../contexts/auth-context';
import UserContext from '../../../contexts/user';
import { db, storage } from '../../../firebase-config';
import { collection, addDoc} from '@firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage';
import moment from 'moment';




const images = [photo, doc, poll];
const buttons = images.map((image,i) => {
    return (
        <button key={"new-post-image-"+i}>
            <img className="h-full" src={image} />
        </button>
        );
});


const handleClick = () => {
    console.log("click");
}

const NewPost = (props) => {
    // useState(false);
    const [containsImage, setContainsImage] = useState(false);
    const [imagePath, setImagePath] = useState(null);
    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext)
    const postTextRef = useRef();       // useRef hook to get reference for the textArea and get it's content later on
    const imageRef = useRef();
    const selectCategoryRef = useRef();
    const postCollectionRef = collection(db, 'posts')
    const timeForPost = moment(new Date()).format('MMMM, D, YYYY');

        // Save the user post post to Firebase
    const handlePost = async () => {
        console.log(postTextRef.current.value);
        const published_date = new Date();
        if(imageRef.current.files[0]){
            setContainsImage(true)
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

    // Show preview of an image when it's selected
    const handleImageSelected = () => {
        setContainsImage(true);
        setImagePath(URL.createObjectURL(imageRef.current.files[0]))
    }

    const placeholder = 'Venture towards excellence: \n   ● Identify a problem\n   ● Offer a solution\n   ● Share resources\n\
   ● Find a team member\n   ● Launch a poll and collect data'

    return (
        <div className={"relative w-full h-fit flex flex-col border border-dashed border-gray-300 rounded-xl bg-white gap-6 p-8 px-8 " + props.width }>
            <div className="text-green-1">
                {/* <label className="font-semibold" >We are here to help you grow. Venture towards excellence</label>
                <ul className="list-disc pl-7 w-full cursor-text" onClick={handleClick}>
                    <li>Identify a problem...</li>
                    <li>Offer a solution...</li>
                    <li>Find a team...</li>
                </ul> */}


                {/*profile and selecting category for the post*/ }
                <div className='relative flex flex-row items-start'>
                    <img className="w-10 h-10 rounded-full" src={userCtx.profilePicPath} />
                    <div className='px-1'>
                        <p className='text-[14px] font-bold'> {userCtx.username}</p>
                        <p className='text-[12px]'>{timeForPost}</p>
                    </div>

                
                    <div className=''>
                        <select className="absolute top-[0px] h-[39px] w-[110px] align-text-top text-top text-[12px] right-0 justify-end rounded-[30px]" ref = {selectCategoryRef}defaultValue={'DEFAULT'}>
                        <option className='' value="DEFAULT" disabled>No tab selected</option>
                        <option value='Problems'>Problems</option>
                        <option value='Solutions'>Solutions</option>
                        <option value='Resources'>Resources</option>
                        <option value='Opportunities'>Opportunities</option>
                        <option value='Polls'>Polls</option>
                        <option value='Other'>Other</option>
                        </select>
                    </div>

                </div>

                {/* text area 
                Text box automatic resizing with minimum of two lines.*/}
                <div className='flex flex-col gap-5'>
                    <textarea placeholder={placeholder} className='relative border-hidden rounded-[14.5px] w-full h-[10rem] top-2 placeholder:text-[15px] placeholder:px-[11px]'
                     ref={postTextRef}>
                    </textarea>
                    {containsImage && <img src = {imagePath}></img>}
                </div>

                {/* post button */}

                <div className='relative flex flex-row justify-center w-full top-9 mb-4'>
                    <button onClick={handlePost} className=' rounded-[14.5px] w-20 h-7 text-[14px] bg-[#025B5B] text-white'>Post</button>

                    <div className="relative left-[35%] top-1 w-fit h-full">
                    {/* TODO: Correct the styles */}
                    
                        <label className='w-fit h-fit cursor-pointer'>

                            <img src={doc}></img>
                            <input id='file-input' className='invisible w-4 h-4' type="file" accept="image/png, image/jpeg" ref={imageRef} onChange = {handleImageSelected}/>

                        </label>
                                   
                    {/* TODO: Can add the poll here later */}

                    </div>

                </div>

            </div>

        </div>

    );
    
}

export default NewPost;