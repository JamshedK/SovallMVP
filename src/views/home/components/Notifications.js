import { useEffect, useState } from 'react';
import { db } from '../../../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import leftExpandArrow from '../../../assets/home/right_expand_arrow_green.svg';
import notification from '../../../assets/home/notifications_green.svg';
import profile from '../../../assets/common/profile.jpg';

const Notifications = (props) => {
const [current, setCurrent] = useState("All");
const [notifications, setNotifications] = useState([]); // State to store notifications

const handleToggle = () => {
props.setValue(prev => !prev);
}

const handleTabClick = (e) => {
    const value = e.target.value;
    setCurrent(value);
}

// Fetch notifications from Firestore
useEffect(() => {
    // Assuming you have a Firestore collection named 'notifications'
    const notificationsRef = collection(db, 'notifications');

// Use onSnapshot to listen for real-time updates
const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
    const updatedNotifications = snapshot.docs.map(doc => doc.data());
    setNotifications(updatedNotifications);
});

// Clean up the listener when component unmounts
return () => {
    unsubscribe();
};
}, []); // Empty dependency array to fetch only once

return (
    <div className={props.value ? "w-[19rem] h-full  flex flex-col py-2 drop-shadow-xl " : "hidden b"}>
        {/* ... rest of the component ... */}
        <div className="w-full h-fit flex flex-col gap-4 pt-4 px-4 overflow-auto">
            {notifications.map((n, i) => (
                <button key={"notification" + i} className="flex text-[7pt] gap-2 items-center bg-white rounded">
                    {/* Render notification content here */}
            </button>))}
        </div>
    </div>
);
}
export default Notifications;
