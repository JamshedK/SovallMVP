const Input = (props)=>{
    return (
        <div className="rounded-full border border-white w-full">
            <input className={"bg-transparent border-none pl-4 py-1 w-full focus:ring-0  focus:border-none placeholder:text-white"} type={props.type} value={props.value} placeholder={props.placeholder} />
        </div>
        );
}

export default Input;