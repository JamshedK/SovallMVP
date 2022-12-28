import { Fragment, useState } from "react";

const CheckBox = (props) => {
    const [checked, setChecked] = useState(false);
    const selectedStyle = props.selectedStyle;
    const style = checked ? selectedStyle : "bg-gray-200";
    const handleClick = () => {
        setChecked(prev => !prev);
    }
    return (
        <button className={"h-fit w-fit px-2 rounded-full " + style} onClick={handleClick}>
            {props.value}
        </button>
        );
}

export default CheckBox;