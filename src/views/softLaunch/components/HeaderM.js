import {Link } from "react-router-dom";
import logo from '../assets/sovall_1.svg';
import arrow_back from '../assets/arrow_back.svg';

function Header() {
	return (
		<div className="sticky top-0 w-screen h-10% bg-green-3 py-3 px-10 drop-shadow-md flex text-white">
			<div className="flex items-center w-full justify-between">
				<img className="h-3/5" src={logo} alt="logo" />
				<Link to={"/ourStory"} className="underline ">Our Story</Link>
			</div>
			
		</div>
		);
}

export default Header;