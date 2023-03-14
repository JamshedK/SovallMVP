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
import {collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase-config'
import AuthContext from "../../contexts/auth-context";
import { useEffect, useState, useContext } from 'react';


//dummy data
// const postsData = [
//     {
//         pic: profile,
//         username: "salazar_rich",
//         published_date: "July, 6, 2022",
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
//         interactors: [
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             }
//         ]

//     },
//     {
//         pic: profile,
//         username: "salazar_rich",
//         published_date: "July, 6, 2022",
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
//         interactors: [
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//         ]

//     },
//     {
//         pic: profile,
//         username: "salazar_rich",
//         published_date: "July, 6, 2022",
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
//         interactors: [
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//         ]

//     },
//     {
//         pic: profile,
//         username: "salazar_rich",
//         published_date: "July, 6, 2022",
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
//         interactors: [
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//         ]

//     },
//     {
//         pic: profile,
//         username: "salazar_rich",
//         published_date: "July, 6, 2022",
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
//         interactors: [
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//         ]

//     },
//     {
//         pic: profile,
//         username: "salazar_rich",
//         published_date: "July, 6, 2022",
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac massa lorem. Duis posuere id erat vitae euismod. Nullam bibendum, massa a fermentum pulvinar, nunc felis suscipit sem, sed auctor purus diam ac lectus. Fusce justo magna, dapibus at ligula.",
//         interactors: [
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//             {
//                 pic: profile,
//                 username: "maybees12",
//                 field: ["Marketing", "Branding"]
//             },
//         ]

//     }
// ];

const chats_data = [
    {
        id: 0,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 1,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 2,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 4,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 5,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 6,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 7,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 8,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 9,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 10,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 11,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 12,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 13,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 14,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 15,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 16,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 17,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    },
    {
        id: 18,
        messages: [
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
            {
                type: "own",
                text: "Hi how are you doing?",
                published_date: "2022-05-21",
            },
            {
                type: "",
                text: "Hi how are you doing? hahhaha hahhaha hahhaha hahahah  ahahha hshshhs ",
                published_date: "2022-05-21",
            },
        ]
    }

]
        
const chat_history = [
    {
        pic: profile,
        id: 0,
        username: "reso_trs",
        last_message: "Hello hola konnichiwa",
        seen: true,
    },
    {
        pic: profile,
        id: 1,
        username: "salazar_rich",
        last_message: "Hello hola konnichiwa",
        seen: true,
    },
    {
        pic: profile,
        id: 2,
        username: "alim_satar",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id: 3,
        username: "kklemm.32",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: false,
    },
    {
        pic: profile,
        id: 4,
        username: "ttttrem_3",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: false,
    },
    {
        pic: profile,
        id:5,
        username: "casal.fundador",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,

    },
    {
        pic: profile,
        id:6,
        username: "caribouliss",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: false,
    },
    {
        pic: profile,
        id:7,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:8,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:9,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:10,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:11,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:12,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:13,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:14,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:15,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:16,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    },
    {
        pic: profile,
        id:17,
        username: "marcopolo24.e",
        last_message: "Hello hola konnichiwa, como estas, esto es un mensaje de prueba",
        seen: true,
    }

]


// TODO: adjust dotted border for NewPost
// Fix the scroll for the "members who interacted with this post"
const MainFeed = (props) => {
    const [notification, setNotification] = useState(false);
    const [messages, setMessages] = useState(false);
    const [notepad, setNotepad] = useState(false); //Not used for the MVP but let's leave it here
    const [chatQueue, setChatQueue] = useState([]);
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
            const q = query(postsRef);
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

    const chats = chatQueue.map(id => {
        return <Chat key={"chat-" + id} onClose={handleChatClose} data={chats_data[id]} />
    })


    return (
        <div className="relative h-full w-full flex flex-col items-center bg-[#3C9A9A]">
            <div className="w-full flex flex-col h-full items-center">

                {/*central panel*/ }
                <div className=" w-full h-full overflow-auto flex flex-col gap-4 items-center">
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


                {/*chat panel*/}
                <div className="absolute bottom-0 right-0 h-[20rem] w-fit flex gap-3 ">
                    {chats}
                </div>

        </div>
    </div>
        
    );
}
export default MainFeed;