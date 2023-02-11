/* Header for after LogIn */
import react, { useState } from "react";
import arrowPrev from "../../assets/common/arrow_prev.svg";
import quick_1 from "../../assets/common/header_icon_1.svg";
import quick_2 from "../../assets/common/header_icon_2.svg";
import quick_3 from "../../assets/common/header_icon_3.svg";
import quick_4 from "../../assets/common/header_icon_4.svg";
import sovall from "../../assets/common/sovall_main.svg";
import profile from "../../assets/common/profile.jpg";
import searchIcon from "../../assets/common/search_icon_white.svg";
import dotsMenu from "../../assets/common/dots_menu.svg";
import Search from "./Search";




function HeaderB(props) {
	const [currentFilter, setCurrentFilter] = useState(0);

	/*Hardtyped arrays*/
	const quickAccessData = [[quick_1, "/"], [quick_2, "/"], [quick_3, "/"], [quick_4, "/"],];
	const filterOptionsData = [["All", "/"], ["Problem", "/"], ["Resources", "/"], ["Opportunities", "/"], ["Other", "/"]];

	const quickAccess = quickAccessData.map((item,i) => {
		const h = i === 1 ? "h-full" : "h-[80%]";
		return (
			<a key={"quick-acces-"+i}  className={h} href={item[1]}>
				<img className="w-fit h-full" src={item[0]}/>
			</a>
			);
	});

	/*Handlers*/
	const handleFilter = (e) => {
		const value = parseInt(e.target.value);
		setCurrentFilter(value);

	}



	/*Arrays of components*/
	const filterOptions = filterOptionsData.map((item, i) => {
		const style = i === currentFilter ? "bg-white text-green-4" : "bg-green-7 text-white";
		return (
			<button key={ "filter-option-"+i} value={i} className={"h-full rounded-full flex items-center text-[8pt] px-2 " + style} onClick={handleFilter}>
				{item[0]}
			</button>
		);
	});

	return (
		<div className="h-[5rem] w-full bg-green-6 px-7 py-1 flex flex-col justify-center gap-[0.3rem] items-center text-white drop-shadow-xl z-20">
			<div className="flex w-full h-[35%] items-center justify-between gap-20">
				<div className="flex items-center h-[80%] w-full gap-2">
					<a className="h-[40%]" href="/"><img className="h-full" src={arrowPrev} /></a>
					<a className="h-full" href="/"><img className="h-full" src={sovall} /></a>
				</div>
				<Search icon={searchIcon} placeholder="Search" placeholderColor="text-white" style="text-white border border-white" w="full" h="[80%]"/>
				<div className="flex h-full w-full gap-4 justify-end items-center">
					{quickAccess}
					<a className="h-full" href="/">
						<img className="rounded-full h-full bg-yellow-2 p-[0.05rem]" src={profile} />
					</a>
					<a className="h-full flex items-center" href="/">
						<img className="rounded-full h-[70%]" src={dotsMenu} />
					</a>
				</div>
			</div>
			<div className="flex w-fit h-[40%] py-1 gap-4">
				{filterOptions}
			</div>
		</div>
	);
}

export default HeaderB;