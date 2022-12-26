import react, { Fragment, useState } from "react";
import Input from '../../common/Input';

const input = (value, setValue, placeholder) => {
	const handleValue = (e) => {
		setValue(e.target.value);
	}
	return (
		<div className="border-b pl-8">
			<input className="w-full border-none bg-transparent focus:border-transparent focus:ring-0" placeholder={placeholder} value={value} onChange={handleValue}/>
		</div>
		);
}
const Form = (props) => {
	const [name, setName] = props.data[0];
	const [lastName, setLastName] = props.data[1];
	const [email, setEmail] = props.data[2];
	const [password, setPassword] = props.data[3];


	return (
		<div className={"flex flex-col gap-4"}>
			<h1 className="text-black font-bold text-[14pt]">Account Set-up</h1>
			<div className="flex flex-col gap-6 py-4">
				<Input placeholder="First Name" value={name} setValue={setName} />
				<Input placeholder="Last Name" value={lastName} setValue={setLastName} />
				<Input placeholder="Email" value={email} setValue={setEmail} />
				<Input placeholder="Password" value={password} setValue={setPassword} ps={true} />
			</div>
		</div>
	);
}

export default Form;