import { Link } from "react-router-dom";
import react, { useState } from "react";
import logo from '../assets/sovall_1.svg';
import arrowBack from '../assets/arrow_back.svg';

function Header(props) {
	const [goBack, setGoBack] = useState(false);
	
	const clickTrue = () => {
		setGoBack(true);
	};
	const clickFalse = () => {
		setGoBack(false);
	};

	console.log("goback:"+goBack);

	return (
		<div className="sticky top-0 md:w-screen h-10% bg-green-3 py-3 px-10 drop-shadow-md flex text-white z-50 flex justify-between">
			<Link to="/" className="flex gap-2 items-center max-md:w-1/3 max-md:h-full w-full w-fit transition duration-200 " onClick={clickFalse}>
				<img className={goBack ? "md:h-40% " : "hidden"} src={arrowBack} />
				<img className="h-80% md:h-3/5" src={logo} alt="logo" />
			</Link>
			<Link to={"/ourStory"} className={!goBack ? "flex max-md:justify-end underline flex items-center max-md:w-1/3 " : "hidden"} onClick={clickTrue}>Our Story</Link>
			
		</div>
		);
}

export default Header;