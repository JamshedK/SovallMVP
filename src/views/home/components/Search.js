import search from '../../../assets/common/search_icon.svg';
const Search = (props) => {
    return (
        <div className="flex border border-green-2 h-full items-center  rounded-full px-3 py-1 gap-1 w-full">
            <button className="h-full">
                <img src={search} className="h-full" />
            </button>
            <input type="text" className=" text-[8pt] p-0 border-none bg-transparent focus:border-none focus:ring-0" placeholder={props.placeholder }/>
        </div>
        );
}
export default Search;