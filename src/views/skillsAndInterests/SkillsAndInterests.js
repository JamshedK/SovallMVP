import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../contexts/auth-context";
import {doc, updateDoc} from "firebase/firestore"
import {db} from '../../firebase-config'

import skillsText from '../../data/skills.txt';
import interestsText from '../../data/interests.txt';

import magnifying_glass from '../../assets/account/magnifying_glass.svg';




//TODO: make the conection with the contexts in ./store
//update the card components to scroll horizontally

const SkillsAndInterests = (props) => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [allSkills, setAllSkills] = useState([])
    const [allInterests, setAllInterests] = useState([])
    const [disableContinue, setDisableContinue] = useState(true)
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    // Get the skills and intersts from the txt files
    function readSkillsAndInterests(){
        // TODO: Sort by isSelected
        fetch(skillsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var allSkills = [];
            for(var i = 0; i < temp.length; i++){
                allSkills.push({"value": temp[i], "isSelected": false})
            }
            setAllSkills(allSkills);
        });
        fetch(interestsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var allInterests = [];
            for(var i = 0; i < temp.length; i++){
                allInterests.push({"value": temp[i], "isSelected": false,})
            }
            setAllInterests(allInterests);
        });
    }
    useEffect(() => {
        readSkillsAndInterests();
    },[])

    useEffect(() => {
        if(selectedInterests.length > 0 && selectedSkills.length > 0){
            setDisableContinue(false)
        }
        else{
            setDisableContinue(true)
        }
    }, [selectedInterests, selectedSkills])

    /*Handlers*/
    const handleSubmit = async (e) => {
        // Save the skills and interests in Firestore
        await updateDoc(doc(db, "users", authCtx.userID),{
            "skills": selectedSkills,
            "interests": selectedInterests
        })
        navigate('/home')
    };


    return (
        <div className="w-full h-full flex flex-col bg-green-5 py-10 items-center overflow-auto">
            <div className="flex max-md:flex-col gap-8 max-md:items-center md:justify-center  py-10 md:gap-8 ">
                <Card title="Skills" data={allSkills} accentStyle="bg-green-2 text-white" 
                    selectedItems={selectedSkills} setSelectedItems={setSelectedSkills}/>
                <Card title="Interests" data={allInterests} accentStyle="bg-yellow-2 text-black"  
                    selectedItems={selectedInterests} setSelectedItems={setSelectedInterests}/>
            </div>
            <span className='text-white pb-5'> By joining I agree to Sovall's{' '}
                <a href='https://docs.google.com/document/d/13tB0fN7BY4HWO-0wXTR6dxqY_FxrOrVASthmgs81GLY/edit' className="underline"> terms and conditions</a>
          </span>
            <button disabled={disableContinue} className="rounded-full w-fit bg-white px-4 py-1 disabled:bg-gray-400 disabled:hover:cursor-no-drop" 
                onClick={handleSubmit}>Continue</button>
        </div>
        );
}

export const Card = (props) => {
    const [query, setQuery] = useState('');
    var filteredData = props.data.filter(item => {
        if (item.value.toLowerCase().includes(query.toLowerCase())){
            return item
        }
    })
    // sort the data by selected first
    filteredData.sort((item1, item2) => {
        if (item1.isSelected > item2.isSelected){
            console.log(true);
            return 1;
        }
        else if (item1.isSelected < item2.isSelected){
            return -1
        }
        return 0;
    })
    for(var i in filteredData){
        if (filteredData[i].isSelected === true){
            console.log(filteredData[i])
        }
    }
    const options = filteredData.map(item => {
        const id = props.data.indexOf(item);
        var tempIsSelected;
        if(props.selectedItems.includes(item.value)) tempIsSelected = true;
        return <SkillInterestItem 
                    key={id} value={item.value} selectedStyle={props.accentStyle} 
                    isSelected={tempIsSelected} selectedItems={props.selectedItems} 
                    setSelectedItems={props.setSelectedItems}/>
    });    
    return (
        <div className="bg-white rounded-xl h-fit w-[24rem] flex flex-col p-8 gap-3">
            <h1 className="font-medium font-inter">{props.title}</h1>
            <div>
                <p className="pl-4 text-red-500">Select at least one</p>
                <input className="bg-center bg-no-repeat w-full rounded-full px-3 py-2 placeholder-gray-500 border-b-2 border-gray-300 focus:outline-none"
                    type="text" placeholder="Search"
                    onChange={e => setQuery(e.target.value)}
                    // styling for magnifying glass
                    style={{
                        backgroundImage: `url(${magnifying_glass})`,
                        backgroundPosition: '10px center', 
                        backgroundSize: '16px auto', 
                        paddingLeft: '35px',
                      }}
                />
            </div>
            <div className="h-[9rem] flex flex-wrap gap-3 overflow-auto">
                {options}
            </div>
        </div>
    );
}

export const SkillInterestItem = (props) => {
    const [checked, setChecked] = useState(props.isSelected);
    const selectedStyle = props.selectedStyle;
    const style = checked ? selectedStyle : "bg-gray-200";
    const handleClick = () => {
        let temp = [...props.selectedItems];

        if (temp.includes(props.value)) {
            const index = temp.indexOf(props.value);
            temp.splice(index, 1);
        } else {
            temp.push(props.value);
        }

        props.setSelectedItems(temp);
        setChecked(prev => !prev);
    }
    return (
        <button className={"h-fit w-fit px-4 py-1 rounded-full " + style} onClick={handleClick}>
            {props.value}
        </button>
        );
}
export default SkillsAndInterests;