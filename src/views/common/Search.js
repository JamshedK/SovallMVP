import { useRef, useContext, useEffect } from "react";
import SearchContext from "../../contexts/search-context";


/*Search component*/
const Search = (props) => {
    const dimesions = "h-" + props.h + " w-" + props.w;
    const placeholderColor = "placeholder:" + props.placeholderColor;
    const searchCtx = useContext(SearchContext);
    const inputRef = useRef();
    // check the searchContext and if there is an existing query, set the value of the field to that
    useEffect(()=>{
        if(searchCtx.query){
            inputRef.current.value = searchCtx.query
        }    
    },[searchCtx.query]);

    return (
        <div className={dimesions + " flex items-center   px-0 py-1 gap-2  " + props.style}>
            <button className="h-full">
                <img src={props.icon} className="h-full" />
            </button>
            <input type="text" className={" text-[10pt] p-0 border-none bg-transparent focus:border-none focus:ring-0 "+ placeholderColor} 
                placeholder={props.placeholder } 
                ref={inputRef}
                onKeyDown={props.onEnterButtonClicked}
                onChange={(e) => {searchCtx.UpdateQuery(e.target.value)}}/>
        </div>
        );
}
export default Search;