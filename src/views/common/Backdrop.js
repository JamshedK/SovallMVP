const Backdrop = (props) => {
    return <div className="bg-black w-full h-full opacity-50" onClick={props.onClick}>{props.children}</div>
}

export default Backdrop;