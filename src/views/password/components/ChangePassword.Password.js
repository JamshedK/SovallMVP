import show from '../../../assets/common/show_p.svg';
import hide from '../../../assets/common/hide_p.svg';
import { useState } from 'react';
const Password = (props) => {
    const [hidden, setHidden] = useState(true);
    const type = hidden ? "text" : "password";

    const handleClick = (e) => {
        e.preventDefault();
        setHidden(prev => !prev);
    }
    return (
        <div className={"border-b block flex w-full border-white h-fit focus-within:border-orange-1 " + (props.match ? "" :"border-orange-1")}>
            <input value={props.value} className="border-none h-fit text-white  bg-transparent pl-4 lg:text-[text-11] lg:placeholder:text-[11pt]  w-full p-0 focus:border-transparent focus:ring-0 placeholder:text-white" type={type} placeholder={props.placeholder} onChange={props.onChange}></input>
            <button onClick={handleClick}>
                <img src={hidden? hide : show} />
            </button>
        </div>
        )
}

export default Password;