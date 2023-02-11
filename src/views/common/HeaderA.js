/* Header for before LogIn */
import react, { useState } from "react";
import arrowPrev from "../../assets/common/arrow_prev.svg";
import sovall from "../../assets/common/sovall_main.svg";
function HeaderA(props) {
	return (
		<div className="h-full w-full bg-green-2 px-7 flex text-white drop-shadow-xl z-20">
			<div className="flex items-center h-[90%] w-fit gap-2">
				<a className="h-[15%]" href="/"><img className="h-full" src={arrowPrev}/></a>
				<a className="h-[40%]" href="/"><img className="h-full" src={sovall}/></a>
			</div>
		</div>
	);
}

export default HeaderA;