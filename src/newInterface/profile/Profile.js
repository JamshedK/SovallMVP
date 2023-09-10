/*components*/
import FeedCard from '../../views/home/components/FeedCard';

/*assests*/
import profile from '../../assets/common/profile.jpg';
import ProfileInfoPanel from './ProfileInfoPanel';
/*API stuff*/
import {collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase-config'
import AuthContext from "../../contexts/auth-context";
import { useEffect, useState, useContext } from 'react';

// TODO: adjust dotted border for NewPost
// Fix the scroll for the "members who interacted with this post"
const Profile = (props) => {
    const width = "w-full md:w-[24rem] lg:w-[28rem] xl:w-[32rem]";
    
    const [postsData, setpostsData] = useState([]);
    const authCtx = useContext(AuthContext);

    // Get the user posts data
    useEffect(() => {
        // temporary variable
        var interactors = [
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            }]


        const getPosts = async () =>{
            var postDt = []
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("userID", "==",authCtx.userID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                postDt.push({...doc.data(), "post_id": doc.id, "pic": profile, "username": "Jamshed", interactors})
            });
            setpostsData(postDt);
        }

        getPosts();
        
    },[])

    const deletePost = (post_id) => {
        const postIndex = postsData.findIndex(x => x.post_id === post_id)
        // remove the post from the PostsData array
        const updatedPosts = [...postsData.slice(0, postIndex), ...postsData.slice(postIndex + 1)]
        setpostsData(updatedPosts)
    } 
      
    let postItems = null;
    if(Object.keys(postsData).length > 0){
        /*Arrays of components*/
        postItems = postsData.map((post, i) => {
            return <FeedCard key={"feed-card-" + i} data={post} deletePost={deletePost}/>
        });
    }

    return (
        <div className="relative h-full w-full flex flex-col items-center bg-[#3C9A9A]">
            <div className="w-full flex flex-col h-full items-center">

                {/*central panel*/ }
                <div className=" w-full h-full overflow-auto flex flex-col gap-4 items-center">
                    <ProfileInfoPanel width={width} own={true} user_id = {authCtx.userID}/>
                    <div className={"flex flex-col gap-4 " + width }>
                        {postItems}
                    </div>
                </div>
        </div>
    </div>
        
    );
}
export default Profile;