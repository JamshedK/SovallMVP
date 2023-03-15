import InfoPanel from '../home/components/InfoPanel';
import ComingSoonMessages from '../home/components/ComingSoonMessages';
import ComingSoonNotifications from '../home/components/ComingSoonNotifications';
import NotificationsToggle from '../home/components/NotificationsToggle';
import MessagesToggle from '../home/components/MessagesToggle';


/*API stuff*/
import {collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase-config'
import AuthContext from "../../contexts/auth-context";
import { useEffect, useState, useContext } from 'react';


const PeopleSearch = (props) => {
    const [notification, setNotification] = useState(false);
    const [messages, setMessages] = useState(false);
    const width = "w-[28rem] xl:w-[32rem]";
    
    const [postsData, setpostsData] = useState({});
    const authCtx = useContext(AuthContext);

    return (
        <div className="relative h-full w-full flex flex-col items-center bg-[#3C9A9A]">
            <div className="w-full flex flex-col h-full items-center">     
                {/*central panel*/ }       
                <div className=" w-full h-full overflow-auto flex flex-col gap-4 items-center mt-2">
                    <InfoPanel width={width} own={true}/>
                    <InfoPanel width={width} own={false}/>
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
    )
}
export default PeopleSearch;
