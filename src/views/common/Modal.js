import { Fragment } from "react";
import Backdrop from "./Backdrop";

const Modal = props => {
    return (
        <div className={props.show? "absolute top-0 w-full h-full flex items-center justify-center" : "hidden"}>
            <Backdrop onClick={props.onClick}/>

            <div className={props.show? "absolute w-fit h-fit " + props.className : "hidden" }>{props.children}</div>
        </div>
        );
}

export default Modal;