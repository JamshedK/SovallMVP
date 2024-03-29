/*Custom input component*/
import show from '../../assets/common/show_p_gray.svg';
import hide from '../../assets/common/hide_p_gray.svg';
import { useState } from 'react';


const Input = (props) => {
    const def = props.ps ? false: true;
    const [visible, setVisible] = useState(def);
    const type = visible ? "text" : "password";

    
    const handleValue = (e) => {
        const value = e.target.value;
        props.setValue(value);
    }
    const handleClick = (e) => {
        e.preventDefault();
        setVisible(prev => !prev);
    }

    const Button = () => {
        return (
            <button onClick={handleClick}>
                <img src={visible?hide:show} />
            </button>
        );
    }

    return (
        <div className={"border-b flex w-full h-fit focus-within:border-orange-1"}>
            <input 
                value={props.value} 
                className="form-input focus:appearance-none border-none h-fit text-white  bg-transparent pl-1 lg:text-[text-11px] 
                    lg:placeholder:text-[11pt]  placeholder:text-[13px] w-full p-0" 
                type={type} 
                placeholder={props.placeholder} 
                onChange={handleValue}
            >
            </input>
            {props.ps && <Button />}
        </div>
        )
}

export default Input;