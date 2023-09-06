import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../contexts/auth-context";
import {doc, updateDoc} from "firebase/firestore"
import {db} from '../../firebase-config'
import sovall_logo from '../../assets/newInterface/account/sovall_logo.svg';

import skillsText from '../../data/skills.txt';

const Skills = (props) => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([])
    const [disableContinue, setDisableContinue] = useState(true)
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    // Get the skills and intersts from the txt files
    function readSkills(){
        // TODO: Sort by isSelected
        fetch(skillsText).then(r => r.text()).then(text => {
            var temp = text.split('\r\n')
            var allSkills = [];
            for(var i = 0; i < temp.length; i++){
                allSkills.push({"value": temp[i], "isSelected": false})
            }
            setAllSkills(allSkills);
        });
    }
    useEffect(() => {
        readSkills();
    },[])

    useEffect(() => {
        if(selectedSkills.length > 0){
            setDisableContinue(false)
        }
        else{
            setDisableContinue(true)
        }
    }, [selectedSkills])

    /*Handlers*/
    const handleSubmit = async (e) => {
        // Save the skills in Firestore
        await updateDoc(doc(db, "users", authCtx.userID),{
            "skills": selectedSkills
        })
        navigate('/profile')
    };

    return (
        <div className="bg-[#044A54] w-full h-full flex flex-col items-center justify-center gap-20">
            <div>
                <img 
                    className='w-40 mt-[20%]' 
                    src={sovall_logo}
                />
            </div>
            <div className='flex flex-col gap-4 md:w-[50%] lg:w-[30%] xl:w-[30%] mb-16'>
                <div 
                    className="flex flex-col gap-8 md:gap-8 px-10 "
                >
                    <div className='flex flex-col items-center'>
                        <h1 className='text-white text-[27px] w-fit '>My skills</h1>
                        <p className='text-white text-[14px] w-fit'>Select at least three</p>
                    </div>
                    <Card 
                        title="Skills"
                        data={allSkills} 
                        accentStyle="bg-[#F7B618] text-[#044A54]" 
                        selectedItems={selectedSkills}
                        setSelectedItems={setSelectedSkills}
                    />
                    <button
                            disabled={disableContinue}
                            className="bg-white text-[#044A54] w-full px-4 py-2 text-[15px] rounded-md disabled:bg-gray-400 disabled:hover:cursor-no-drop"
                            onClick={handleSubmit}
                        >
                            Join Sovall
                        </button>
                </div>
                <span 
                    className='text-white pb-5 px-6 text-[16px] text-center'
                > 
                    <strong>By joining, I agree to making the world more exciting</strong> and agree to Sovall's{' '}
                    <a 
                        href='https://docs.google.com/document/d/13tB0fN7BY4HWO-0wXTR6dxqY_FxrOrVASthmgs81GLY/edit' 
                        className="underline"
                    >
                        terms and conditions
                    </a>
            </span>
          </div>
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
        return <SkillsItem 
                    key={id} 
                    value={item.value}
                    selectedStyle={props.accentStyle} 
                    isSelected={tempIsSelected} 
                    selectedItems={props.selectedItems} 
                    setSelectedItems={props.setSelectedItems}
                />
    });    
    return (
        <div className="rounded-xl h-fit flex flex-col gap-3">
            <div className={"border-b border-[#FEFFFF] flex w-full h-fit"}>
                <input 
                    value={props.value} 
                    className="form-input focus:appearance-none border-none h-fit text-white bg-transparent pl-1 lg:text-[text-11px] 
                        lg:placeholder:text-[11pt]  placeholder:text-[13px] w-full p-0 
                        focus:ring-0 placeholder:text-white" 
                    type="text"
                    placeholder="Search"
                    onChange={e => setQuery(e.target.value)}
                >
                </input>
            </div>
            
            <div className="h-[15rem] flex flex-wrap gap-3 overflow-auto">
                {options}
            </div>
        </div>
    );
}

export const SkillsItem = (props) => {
    const [checked, setChecked] = useState(props.isSelected);
    const selectedStyle = props.selectedStyle;
    const style = checked ? selectedStyle : "bg-[#4D7E86] text-white";
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
        <button className={"h-fit w-fit px-4 py-2 rounded-md text-[14px] md:text-[1rem] lg:text-[1rem] " + style} onClick={handleClick}>
            {props.value}
        </button>
        );
}
export default Skills;