import { useState } from 'react';
import Card from './components/Card';
import skills_file from "./skills.txt";

//TODO: make the conection with the contexts in ./store
//uodate the card components to scroll horizontally

const skills_data = ["Management skills", "Design", "Crafts/arts", "Research", "Marketing and sales", "Entertainment", "Finances", "Engineering", "Programming", "Writing"];
const interests_data = ["Entrepreneurship", "Service industry", "Design", "Architecture", "Engineering", "Programming", "Fine Arts", "Film/photography", "Science", "Social sciences", "Medical", "Politics", "Entertainment", "Writing", "Safety/security"];
const SkillsAndInterests = (props) => {
    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState([]);

    const handleSubmit = (e) => {
        console.log(skills);
        console.log(interests);
    }
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