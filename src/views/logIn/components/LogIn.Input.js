import show from '../../../assets/common/show_p.svg';
import hide from '../../../assets/common/hide_p.svg';
import { useState } from 'react';

const Input = (props) => {

    const def = props.ps ? false : true;
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
                <img src={visible ? hide : show} />
            </button>
        );
    }


    return (
        <div className="rounded-full border border-white w-full flex pr-2">
            <input className={"bg-transparent border-none pl-4 py-1 w-full focus:ring-0  focus:border-none placeholder:text-white"} type={type} value={props.value} onChange={handleValue} placeholder={props.placeholder} />
            {props.ps && <Button />}
        </div>
        );
}

export default Input;