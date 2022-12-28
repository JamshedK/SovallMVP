import search from '../../assets/common/search_icon.svg';
const Search = (props) => {
    return (
        <div className="flex border-b pl-4 ">
            <button className="border">
                <img src={search} className="border" />
            </button>
            <input type="text" className=" p-0 border bg-transparent focus:border-none focus:ring-0" placeholder={props.placeholder }/>
        </div>
        );
}
export default Search;