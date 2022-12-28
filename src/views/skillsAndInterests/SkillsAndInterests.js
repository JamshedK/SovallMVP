import Card from './components/Card';
import skills_file from "./skills.txt";

const skills_data = ["Management skills", "Design", "Crafts/arts", "Research", "Marketing and sales", "Entertainment", "Finances", "Engineering", "Programming", "Writing"];
const interests_data = ["Entrepreneurship", "Service industry", "Design", "Architecture", "Engineering", "Programming", "Fine Arts", "Film/photography", "Science", "Social sciences", "Medical", "Politics", "Entertainment", "Writing", "Safety/security"];
const SkillsAndInterests = (props) => {

    return (
        <div className="w-full h-screen flex">
            <Card title="Skills" data={skills_data}/>
        </div>
        );
}
export default SkillsAndInterests;