import { Fragment } from 'react';
const FileInput = (props) => {
    return (
        <Fragment>
            <label htmlFor={props.id} className="h-full w-fit cursor-pointer">
                <img className="h-full w-fit" src={props.src} />
            </label>
            <input id={props.id} type="file" className="hidden" onChange={props.handler} />
        </Fragment>
    );
}

export default FileInput;