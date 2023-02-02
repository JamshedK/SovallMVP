/*Toggle button component */
import { Fragment, useState } from "react";

const Toggle = (props) => {
    const [checked, setChecked] = useState(false);
    const selectedStyle = props.selectedStyle;
    const style = checked ? selectedStyle : "bg-gray-200";
    const handleClick = () => {
        let temp = props.selectedItems;

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
        <button className={"h-fit w-fit px-2 py-1 rounded-full " + style} onClick={handleClick}>
            {props.value}
        </button>
        );
}

export default Toggle;