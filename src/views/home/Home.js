/*components*/
import FeedCard from './components/FeedCard';
import NewPost from './components/NewPost';
import NotificationsToggle from './components/NotificationsToggle';
import Notifications from './components/Notifications';
import MessagesToggle from './components/MessagesToggle';
import Chat from './components/Chat';
import ChatHistory from './components/ChatHistory';
import ComingSoonMessages from './components/ComingSoonMessages';
import ComingSoonNotifications from './components/ComingSoonNotifications';
import LearnMore from './components/LearnMore';


/*assests*/
import profile from '../../assets/common/profile.jpg';
import company from '../../assets/home/company.png';
import InfoPanel from './components/InfoPanel';

/*API stuff*/
import {collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase-config'
import AuthContext from "../../contexts/auth-context";
import { useEffect, useState, useContext } from 'react';

// TODO: adjust dotted border for NewPost
// Fix the scroll for the "members who interacted with this post"
const Home = (props) => {
    const [notification, setNotification] = useState(false);
    const [messages, setMessages] = useState(false);
    const [notepad, setNotepad] = useState(false); //Not used for the MVP but let's leave it here
    const [chatQueue, setChatQueue] = useState([]);
    const [learnMore, setLearnMore] = useState(false);
    const width = "w-[28rem] xl:w-[32rem]";
    
    const [postsData, setpostsData] = useState({});
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
            const q = query(postsRef, where("userID", "==",authCtx.userID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                postDt.push({...doc.data(), "post_id": doc.id, "pic": profile, "username": "Jamshed", interactors})
            });
            setpostsData(postDt);
        }
        getPosts();
    },[])

    let postItems = null;
    if(Object.keys(postsData).length > 0){
        /*Arrays of components*/
        postItems = postsData.map((post, i) => {
            return <FeedCard key={"feed-card-" + i} data={post} />
        });
    }

    // const chats = chatQueue.map(id => {
    //     return <Chat key={"chat-" + id} onClose={handleChatClose} data={chats_data[id]} />
    // })


    return (
        <div className="relative h-full w-full flex flex-col items-center bg-[#3C9A9A]">
            <div className="w-full flex flex-col h-full items-center">

                {/*central panel*/ }
                <div className=" w-full h-full overflow-auto flex flex-col gap-4 items-center">
                    <InfoPanel width={width} own={true} user_id = {authCtx.userID}/>
                    <NewPost width={width} />
                    <div className={"flex flex-col gap-4 " + width }>
                        {postItems}
                    </div>
                </div>

                {/*left panel*/}
                <div className={"flex flex-col w-fit absolute left-0 top-0 " + (notification ? "h-full" : "h-fit")}>
                    <NotificationsToggle value={notification} setValue={setNotification} />
                    {/* <Notifications value={notification} setValue={setNotification} /> */}
                    <ComingSoonNotifications value={notification} setValue={setNotification} />
                </div>


                {/*right panel*/}
                <div className={"flex flex-col w-fit items-end absolute right-0 top-0 " + (messages ? "h-full" : "h-fit")} >
                    <MessagesToggle value={messages} setValue={setMessages} />
                    {/* <ChatHistory value={messages} setValue={setMessages} onClick={handleChatOpen} data={chat_history} /> */}
                    <ComingSoonMessages value={messages} setValue={setMessages} />
                </div>


                {/* chat panel
                <div className="absolute bottom-0 right-0 h-[20rem] w-fit flex gap-3 ">
                    {chats}
                </div> */}

                {/* Learn More */}
                <div className=''>
                    <LearnMore value={learnMore} setValue = {setLearnMore} />
                </div>

        </div>
    </div>
        
    );
}
export default Home;