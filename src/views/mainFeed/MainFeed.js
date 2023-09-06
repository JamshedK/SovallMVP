/*components*/
import FeedCard from '../home/components/FeedCard';
import NewPost from '../home/components/NewPost';
import NotificationsToggle from '../home/components/NotificationsToggle';
import Notifications from '../home/components/Notifications';
import MessagesToggle from '../home/components/MessagesToggle';
import Chat from '../home/components/Chat';
import ChatHistory from '../home/components/ChatHistory';
import ComingSoonMessages from '../home/components/ComingSoonMessages';
import ComingSoonNotifications from '../home/components/ComingSoonNotifications';


/*assests*/
import profile from '../../assets/common/profile.jpg';
import company from '../../assets/home/company.png';
import InfoPanel from '../home/components/InfoPanel';

/*API stuff*/
import {collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {db} from '../../firebase-config'
import AuthContext from "../../contexts/auth-context";
import { useEffect, useState, useContext } from 'react';

// TODO: adjust dotted border for NewPost
// Fix the scroll for the "members who interacted with this post"
const MainFeed = (props) => {
    const [notification, setNotification] = useState(true); //change notification state to capture data from DB
    const [messages, setMessages] = useState(false);
    const [notepad, setNotepad] = useState(false); //Not used for the MVP but let's leave it here
    const [chatQueue, setChatQueue] = useState([]);
    const width = "w-[28rem] max-md:w-full xl:w-[32rem]";
    
    const [postsData, setpostsData] = useState([]);
    const authCtx = useContext(AuthContext);


    /*Handlers*/
    const handleChatClose = (id) => {
        const index = chatQueue.indexOf(id);
        let temp = [...chatQueue];
        temp.splice(index, 1);
        setChatQueue(temp);

    }

    const handleChatOpen = (id) => {
        if (!chatQueue.includes(id)) {
            setChatQueue(prev => [...prev, id]);
        } else {
            console.log("already included");
        }

    }

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
            const q = query(postsRef, orderBy('published_date', "desc"));
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
                <div className=" w-full h-full pt-4 overflow-auto flex flex-col gap-4 items-center">
                    <NewPost width={width} />
                    <div className={"flex flex-col gap-4 " + width }>
                        {postItems}
                    </div>
                </div>

                {/*right panel*/}
                <div className={"flex flex-col w-fit absolute right-0 top-0 " + (notification ? "h-full" : "h-fit")}>
                    <NotificationsToggle value={notification} setValue={setNotification} />
                    {/* <Notifications value={notification} setValue={setNotification} /> */}
                    <Notifications value={notification} setValue={setNotification} />
                </div>


                {/*left panel*/}
                <div className={"flex flex-col w-fit items-end absolute left-0 top-0 " + (messages ? "h-full" : "h-fit")} >
                    <MessagesToggle value={messages} setValue={setMessages} />
                    {/* <ChatHistory value={messages} setValue={setMessages} onClick={handleChatOpen} data={chat_history} /> */}
                    <ComingSoonMessages value={messages} setValue={setMessages} />
                </div>
        </div>
    </div>
        
    );
}
export default MainFeed;