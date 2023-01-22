import { Fragment } from 'react';
const FileInput = (props) => {
    return (
        <Fragment>
            <label for={props.id} key={"chat-option-"} className="h-full w-fit cursor-pointer">
                <img className="h-full w-fit" src={props.src} />
            </label>
            <input id={props.id} type="file" className="hidden" onChange={props.handler} />
        </Fragment>
    );
}

export default FileInput;