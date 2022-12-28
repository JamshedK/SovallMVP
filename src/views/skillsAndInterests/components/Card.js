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
        return <Toggle key={id} value={item} selectedStyle="bg-green-4 text-white" isSelected={false} />
    });
    return (
        <div className="bg-white rounded-xl h-fit w-[20rem] flex flex-col px-4 py-8">
            <h1 className="font-bold">{props.title}</h1>
            <p className="pl-4">Select at least three</p>
            <Search placeholder="Search" />
            <div className="flex w-full border">
                <Arrow src={arrowPrev} />
                <div className="w-[96%] border h-[7rem] flex flex-col overflow-auto">
                    {options }
                </div>
                <Arrow src={arrowNext}/>

            </div>
        </div>
    );
}
export default Card;