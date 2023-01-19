/*components*/
import { useState } from 'react';
import FeedCard from './components/FeedCard';
import Header from './components/Header';
import NewPost from './components/NewPost';
import NotificationsToggle from './components/NotificationsToggle';
import Notifications from './components/Notifications';
import MessagesToggle from './components/MessagesToggle';
import NotepadToggle from './components/NotepadToggle';
import Notepad from './components/Notepad';
import Chat from './components/Chat';
/*assests*/
import profile from '../../assets/common/profile.jpg';
import company from '../../assets/home/company.png';
import InfoPanel from './components/InfoPanel';



const postsData = [
    {
        pic: profile,
        username: "salazar_rich",
        ts: "July, 6, 2022",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
        interactors: [
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            }
        ]

    },
    {
        pic: profile,
        username: "salazar_rich",
        ts: "July, 6, 2022",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
        interactors: [
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
        ]

    },
    {
        pic: profile,
        username: "salazar_rich",
        ts: "July, 6, 2022",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
        interactors: [
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
        ]

    },
    {
        pic: profile,
        username: "salazar_rich",
        ts: "July, 6, 2022",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
        interactors: [
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
        ]

    },
    {
        pic: profile,
        username: "salazar_rich",
        ts: "July, 6, 2022",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
        interactors: [
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
            {
                pic: profile,
                username: "maybees12",
                field: ["Marketing", "Branding"]
            },
        ]

    }
];



//TODO: adjust dotted border for NewPost
//Fix the scroll for the "members who interacted with this post"
const Home = (props) => {
    const [notification, setNotification] = useState(false);
    const [messages, setMessages] = useState(false);
    const [notepad, setNotepad] = useState(false); //Not used for the MVP but let's leave it here
    
    const width = "w-[28rem] xl:w-[32rem]";

    const posts = postsData.map(post => {
        return <FeedCard data={post} />

    });

       return (
           <div className="relative h-screen  w-screen flex flex-col items-center bg-[#3C9A9A] overflow-auto scrollbar-hide">
               <div className="w-full flex flex-col h-full overflow-auto items-center gap-8 scrollbar-hide">
                   
                   <MessagesToggle value={messages} setValue={setMessages} />
                  

                   <div className="flex flex-col w-fit h-full absolute left-0 top-0">
                       <NotificationsToggle value={notification} setValue={setNotification} />
                       <Notifications value={notification} setValue={setNotification} />
                   </div>
                
                   <div className=" w-full h-fit flex flex-col gap-4 items-center">
                        <InfoPanel width={width} own={true}/>
                        <NewPost width={width} />
                        <div className={"pb-8 flex flex-col gap-4 " + width }>
                            {posts}
                        </div>
                   </div>
            </div>
        </div>
        
        );
}
export default Home;