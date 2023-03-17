import photo from '../../assets/home/photo.svg';
import doc from '../../assets/home/doc.svg';
import poll from '../../assets/home/poll.svg';
import profile from '../../assets/common/profile.jpg';
import AuthContext from '../../contexts/auth-context';
import { useContext, useState, useRef } from 'react';
import { db, storage } from '../../firebase-config';
import { collection, addDoc} from '@firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage';


const images = [photo, doc, poll];
const buttons = images.map((image,i) => {
    return (
        <button key={"new-post-image-"+i}>
            <img className="h-full" src={image} />
        </button>
        );
});

// The page for creating a new post
const NewPost = () => {
    const [containsImage, setContainsImage] = useState(false);
    const [imagePath, setImagePath] = useState(null);
    const authCtx = useContext(AuthContext);
    const postTextRef = useRef();       // useRef hook to get reference for the textArea and get it's content later on
    const imageRef = useRef();
    const selectCategoryRef = useRef();
    const postCollectionRef = collection(db, 'posts')
    
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

    return(
        <div className="relative h-full w-full flex justify-center items-center" style={{backgroundColor: "#3C9A9A"}}>
            {/* container for the post */}
            <div className="absolute box-border flex flex-col p-6 gap-6 bg-white top-14 rounded-[14.5px] w-[538px] h-[463px]">
                {/*profile and selecting category for the post*/ }
                <div className='flex flex-row items-start '>
                    <img className="w-9 h-9 rounded-full" src={profile} />
                    <div className='text-[13px] px-1'>
                        <p className='font-bold'> Wesley</p>
                        <p>Sep 29, 2022</p>
                    </div>

                

                    <select className="absolute w-38 h-8 align-text-top text-left text-sm top-6 right-2 rounded-[20px]" ref = {selectCategoryRef}defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>No tab selected</option>
                        <option value='Problems'>Problems</option>
                        <option value='Solutions'>Solutions</option>
                        <option value='Resources'>Resources</option>
                        <option value='Opportunities'>Opportunities</option>
                        <option value='Polls'>Polls</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>

                {/* text area 
                Text box automatic resizing with minimum of two lines.*/}
                <div className='flex flex-col gap-5'>
                    <textarea placeholder={placeholder} className='relative border-hidden rounded-[14.5px] w-[490px] h-[200px] top-8 placeholder:p-4 placeholder:px-[111px]'
                     ref={postTextRef}>
                    </textarea>
                    {containsImage && <img src = {imagePath}></img>}
                </div>

                {/* post button */}
                <button onClick={handlePost} className='relative left-[200px] top-10 rounded-[14.5px] w-20 h-7 text-[14px] place-items-center bg-[#025B5B] text-white'>Post</button>
                
                {/* upload options */}
                <div className="gap-6 w-fit h-full">
                    {/* TODO: Correct the styles */}
                    
                    <label for='file-input' className='relative top-10 flex flex-row gap-6 pointer-events-auto left-[450px]'>
                        <img src={doc}></img>
                        <input id='file-input' className='invisible' type="file" accept="image/png, image/jpeg" ref={imageRef} onChange = {handleImageSelected}/>

                    </label>


                    {/* TODO: Can add the poll here later */}
                </div>
                
            </div>
        </div>
    )
}

export default NewPost;