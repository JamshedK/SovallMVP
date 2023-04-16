/*components*/
import FeedCard from '../home/components/FeedCard';
import NotificationsToggle from '../home/components/NotificationsToggle';
import MessagesToggle from '../home/components/MessagesToggle';
import ComingSoonMessages from '../home/components/ComingSoonMessages';
import ComingSoonNotifications from '../home/components/ComingSoonNotifications';


/*assests*/
import profile from '../../assets/common/profile.jpg';

/*API stuff*/
import {getDoc, doc } from "firebase/firestore";
import {db} from '../../firebase-config'
import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';


// TODO: adjust dotted border for NewPost
// Fix the scroll for the "members who interacted with this post"
const ShowPostById = (props) => {
    const [notification, setNotification] = useState(false);
    const [messages, setMessages] = useState(false);
    const width = "w-[28rem] max-md:w-full xl:w-[32rem]";
    const [searchParams, setSearchParams] = useSearchParams();
    const [postData, setPostData] = useState(null)
    const postId = searchParams.get('id')

    // Get posts data
    useEffect(() => {      
        const getPostById= async () =>{
            // get the post given the postID
            try{
                const response = await getDoc(doc(db, "posts", postId))
                const data = response.data(); 
                setPostData({...data, 'post_id': postId})
            }
            catch (e){
                console.log(e)
            }
        }
        getPostById();
    },[])

    let postItems = null;
    // if(Object.keys(postsData).length > 0){
    //     /*Arrays of components*/
    //     postItems = postsData.map((post, i) => {
    //         return <FeedCard key={"feed-card-" + i} data={post} />
    //     });
    // }

    return (
        <div className="relative h-full w-full flex flex-col items-center bg-[#3C9A9A]">
            <div className="w-full flex flex-col h-full items-center">

                {/*central panel*/ }
                <div className=" w-full h-full pt-4 overflow-auto flex flex-col gap-4 items-center">
                    <div className={"flex flex-col gap-4 " + width }>
                        {postData !== null && <FeedCard data={postData} extendCommentArea={true}/>}
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
        </div>
    </div>
        
    );
}
export default ShowPostById;