import Search from "../../common/Search";
import Toggle from "../../common/Toggle";
import arrowPrev from "../../../assets/common/arrow_prev.svg";
import arrowNext from "../../../assets/common/arrow_next.svg";


const Card = (props) => {
    const Arrow = (props) =>{
        return (
            <button className="w-[2%]">
                <img src={props.src} />
            </button>
            )
    }

    const options = props.data.map(item => {
        const id = props.data.indexOf(item);
        return <Toggle key={id} value={item} selectedStyle={props.accentStyle} isSelected={false} selectedItems={props.selectedItems} setSelectedItems={props.setSelectedItems} />
    });
    return (
        <div className="bg-white rounded-xl h-fit w-[24rem] flex flex-col p-8 gap-3">
            <h1 className="font-bold">{props.title}</h1>
            <div>
                <p className="pl-4">Select at least three</p>
                {/*I consider that the next line is unnecesary for the MVP*/}
                {/*<Search placeholder="Search" />*/} 
            </div>
            <div className="h-[9rem] flex flex-wrap gap-3 overflow-auto">
                {options}
            </div>
        </div>
    );
}
export default Card;