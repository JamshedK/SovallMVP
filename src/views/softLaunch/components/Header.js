import { Link } from "react-router-dom";
import react, { useState } from "react";
import logo from '../assets/sovall_1.svg';
import arrowBack from '../assets/arrow_back.svg';

function Header() {
	const [inHome, setInHome] = useState(true);
	console.log(inHome)
	const clickHandler = () => {
		setInHome(prev => !prev);
		
	};

	return (
		<div className="sticky top-0 md:w-screen h-10% bg-green-3 py-3 px-10 drop-shadow-md flex text-white z-50 flex justify-between ">
			<Link to="/" className="flex gap-2 items-center w-full w-fit transition duration-200" >
				<img className={inHome ? "h-40%" : "h-40% hidden"} src={arrowBack} />
				<img className="h-3/5" src={logo} alt="logo" />
			</Link>
			<Link to={"/ourStory"} className={inHome ? "underline hidden" : "underline "} >Our Story</Link>
			
		</div>
		);
}

export default Header;