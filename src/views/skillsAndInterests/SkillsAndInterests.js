import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './components/Card';
// import skills_file from "./skills.txt";
import AuthContext from "../../contexts/auth-context";
import {doc, updateDoc} from "firebase/firestore"
import {db} from '../../firebase-config'



//TODO: make the conection with the contexts in ./store
//update the card components to scroll horizontally

/*Hardtyped arrays*/
const skills_data = ["Management skills", "Design", "Crafts/arts", "Research", "Marketing and sales", "Entertainment", "Finances", "Engineering", "Programming", "Writing"];
const interests_data = ["Entrepreneurship", "Service industry", "Design", "Architecture", "Engineering", "Programming", "Fine Arts", "Film/photography", "Science", "Social sciences", "Medical", "Politics", "Entertainment", "Writing", "Safety/security"];

const SkillsAndInterests = (props) => {
    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState([]);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    /*Handlers*/
    const handleSubmit = async (e) => {
        console.log(skills);
        console.log(interests);
        console.log(authCtx.userID);
        await updateDoc(doc(db, "users", authCtx.userID),{
            "skills": skills,
            "interests": interests
        })
        navigate('/home')
    };

    return (
        <div className="w-full h-full flex flex-col bg-green-5 py-10 items-center overflow-auto">
            <div className="flex max-md:flex-col gap-8 max-md:items-center md:justify-center  py-10 md:gap-8 ">
                <Card title="Skills" data={skills_data} accentStyle="bg-green-2 text-white" selectedItems={skills} setSelectedItems={setSkills}/>
                <Card title="Interests" data={interests_data} accentStyle="bg-yellow-2 text-white"  selectedItems={interests} setSelectedItems={setInterests} />
            </div>
            <button className="rounded-full w-fit bg-white px-2 py-1" onClick={handleSubmit}>Continue</button>
        </div>
        );
}
export default SkillsAndInterests;