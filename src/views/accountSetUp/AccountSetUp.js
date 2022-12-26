import Form from './components/AccountSetUp.Form';
import Confirmation from './components/AccountSetUp.Confirmation';
import { useState } from 'react';
const AccountSetUp = () => {
	const [canContinue, setCanContinue] = useState(false);
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const data = [
		[name, setName],
		[lastName, setLastName],
		[email, setEmail],
		[password, setPassword]
	];
	const handleContinue = () => {
		setCanContinue(true);
	}
	const Button = (props) => {
		return <button className="border rounded-full px-5 py-1 bg-gray-200" onClick={props.onClick}>{props.value}</button>;
	}

	const Navigation = () => {
		return (
			<div className="w-[23rem] h-fit flex justify-between">
				<Button value="Previous" />
				<Button value="Next" onClick={handleContinue} />
			</div>
			);
	}
	return (
		<div className="h-screen w-full bg-green-5 flex items-center pt-20 flex flex-col gap-10 overflow-auto">
			<div className="w-[23rem] h-[20rem] bg-white rounded-xl px-8 py-4">
				{!canContinue && <Form data={data}/>}
				{canContinue && <Confirmation data={data}/>}
			</div>
			
			{/*
			 <p className="text-white" >{!canContinue ? "1" : "2"}/2</p>
			 */ }
			{!canContinue && <Navigation/>}
			
			
			
		</div>
		);
}

export default AccountSetUp;