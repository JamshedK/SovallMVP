const Search = (props) => {
    const dimesions = "h-" + props.h + " w-" + props.w;
    const placeholderColor = "placeholder:" + props.placeholderColor;
    return (
        <div className={dimesions + " flex items-center  rounded-full px-3 py-1 gap-1 " + props.style}>
            <button className="h-full">
                <img src={props.icon} className="h-full" />
            </button>
            <input type="text" className={" text-[8pt] p-0 border-none bg-transparent focus:border-none focus:ring-0 "+ placeholderColor} placeholder={props.placeholder }/>
        </div>
        );
}
export default Search;