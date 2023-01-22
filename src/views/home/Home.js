/*components*/
import { useState } from 'react';
import FeedCard from './components/FeedCard';
import NewPost from './components/NewPost';
import NotificationsToggle from './components/NotificationsToggle';
import Notifications from './components/Notifications';
import MessagesToggle from './components/MessagesToggle';
import NotepadToggle from './components/NotepadToggle';
import Notepad from './components/Notepad';
import Chat from './components/Chat';
import ChatHistory from './components/ChatHistory';
/*assests*/
import profile from '../../assets/common/profile.jpg';
import company from '../../assets/home/company.png';
import InfoPanel from './components/InfoPanel';


//dummy data
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

const chats = [
    {
        id: 0,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
        ]
    },
    {
        id: 1,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
        ]
    },
    {
        id: 2,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
        ]
    },
    {
        id: 4,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
        ]
    },
    {
        id: 5,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
        ]
    },
    {
        id: 6,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                ts: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                ts: "2022-05-21",
            },
        ]
    }

]
        
const chat_history = [
    {
        pic: profile,
        username: "salazar_rich",
        last_message: "0 Hello hola konnichiwa",
        seen: true,
    },
    {
        pic: profile,
        username: "alim_satar",
        last_message: "1 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "kklemm.32",
        last_message: "2 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: false,
    },
    {
        pic: profile,
        username: "ttttrem_3",
        last_message: "3 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: false,
    },
    {
        pic: profile,
        username: "casal.fundador",
        last_message: "4 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,

    },
    {
        pic: profile,
        username: "caribouliss",
        last_message: "5 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: false,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        username: "marcopolo24.e",
        last_message: "6 Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    }

]


//TODO: adjust dotted border for NewPost
//Fix the scroll for the "members who interacted with this post"
const Home = (props) => {
    const [notification, setNotification] = useState(false);
    const [messages, setMessages] = useState(false);
    const [notepad, setNotepad] = useState(false); //Not used for the MVP but let's leave it here
    const [chatQueue, setChatQueue] = useState([]);
    const width = "w-[28rem] xl:w-[32rem]";
    //console.log(chatQueue.length);


    const posts = postsData.map((post,i) => {
        return <FeedCard key={"feed-card-"+i}  data={post} />

    });

   
    const handleChatClose = (e) => {
        console.log(e.target.cancelable);
        let current = [...chatQueue];
        //current.shift();
        //setChatQueue(current);
    }

    const handleChatOpen = (e) => {
        console.log(e.target);
        const key = chatQueue.length;
        let current = [...chatQueue];
        current.push(<Chat key={"chat-" + key} queue={chatQueue} setQueue={setChatQueue} data={chats[key]}/>);
        setChatQueue(current);
    }


       return (
           <div className="relative h-full w-full flex flex-col items-center bg-[#3C9A9A]">
               <div className="w-full flex flex-col h-full items-center">

                   {/*central panel*/ }
                   <div className=" w-full h-full overflow-auto flex flex-col gap-4 items-center">
                        <InfoPanel width={width} own={true}/>
                        <NewPost width={width} />
                        <div className={"flex flex-col gap-4 " + width }>
                            {posts}
                        </div>
                   </div>

                   {/*left panel*/}
                   <div className={"flex flex-col w-fit absolute left-0 top-0 " + (notification ? "h-full" : "h-fit")}>
                       <NotificationsToggle value={notification} setValue={setNotification} />
                       <Notifications value={notification} setValue={setNotification} />
                   </div>

                   {/*right panel*/}
                   <div className={"flex flex-col w-fit items-end absolute right-0 top-0 " + (messages ? "h-full" : "h-fit")} >
                       <MessagesToggle value={messages} setValue={setMessages} />
                       <ChatHistory value={messages} setValue={setMessages} onClick={handleChatOpen} data={chat_history} />
                   </div>


                   {/*chat panel*/}
                   <div className="absolute bottom-0 right-0 h-[20rem] w-fit flex gap-3">
                       {chatQueue}
                   </div>

            </div>
        </div>
        
        );
}
export default Home;