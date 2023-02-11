/*This component is meant to be used as a backdrop for modals
 * Usually the props.children will be the window that we want to have a the modal
 */
const Backdrop = (props) => {
    return <div className="bg-black w-full h-full opacity-50" onClick={props.onClick}>{props.children}</div>
}

export default Backdrop;