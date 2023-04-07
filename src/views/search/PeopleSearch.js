import InfoPanel from '../home/components/InfoPanel';
import ComingSoonMessages from '../home/components/ComingSoonMessages';
import ComingSoonNotifications from '../home/components/ComingSoonNotifications';
import NotificationsToggle from '../home/components/NotificationsToggle';
import MessagesToggle from '../home/components/MessagesToggle';
import NoResults from './NoResults';

/*API stuff*/
import {collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase-config'
import { useEffect, useState, useContext } from 'react';
import SearchContext from '../../contexts/search-context';


const PeopleSearch = (props) => {
    const [notification, setNotification] = useState(false);
    const [messages, setMessages] = useState(false);
    const width = "w-[28rem] max-md:w-full xl:w-[32rem]";
    const [people, setPeople] = useState({});
    const searchCtx = useContext(SearchContext);


   useEffect(() => {
    const getPeopleList = async () =>{
        var temList = []
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temList.push({...doc.data(), "id": doc.id})
        });
        const filteredPeople = temList.filter((user) => {
            var username = (user.firstname + ' ' + user.lastname).toLowerCase();
            if(username.includes(searchCtx.query.toLowerCase())){
                console.log(searchCtx.query + ' exists')
                return user;
            }
        })
        setPeople(filteredPeople);
    }
    getPeopleList();
   },[searchCtx.enterPressed]);
  
   let userCards = null;
    if(Object.keys(people).length > 0){
        /*Arrays of components*/
        console.log('here')
        userCards = people.map((user, i) => {
            return <InfoPanel key={user.id} width={width} own={true} user_id={user.id} />;
        });
    }

    return (
        <div className="relative h-full w-full flex flex-col items-center bg-[#3C9A9A]">
            <div className="w-full flex flex-col h-full items-center">     
                {/*central panel*/ }       
                <div className=" w-full h-full pt-4 overflow-auto flex flex-col gap-4 items-center mt-2">
                    {Object.keys(people).length === 0 && <NoResults/>}
                    {userCards}                    
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
