import show from '../../assets/common/show_p_gray.svg';
import hide from '../../assets/common/hide_p_gray.svg';
import { useState } from 'react';


const Input = (props) => {

    const [hidden, setHidden] = useState(true);
    const type = hidden ? "text" : "password";

    
    const handleValue = (e) => {
        props.setValue(e.target.value);
    }
    const handleClick = (e) => {
        e.preventDefault();
        setHidden(prev => !prev);
    }

    const Button = () => {
        return (
            <button onClick={handleClick}>
                <img src={hidden?hide:show} />
            </button>
        );
    }

    return (
        <div className={"border-b block flex w-full h-fit focus-within:border-orange-1 pl-6"}>
            <input value={props.value} className="border-none h-fit text-black  bg-transparent pl-4 lg:text-[text-11] lg:placeholder:text-[11pt]  w-full p-0 focus:border-transparent focus:ring-0" type={type} placeholder={props.placeholder} onChange={handleValue}></input>
            {props.ps && <Button />}
        </div>
        )
}

export default Input;