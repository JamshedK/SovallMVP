import react, { Fragment, useState } from "react";
import Input from '../../common/Input';

const data = [
	"At least 12 characters",
	"A mixture of uppercase and lowercase",
	"At least one number",
	"At least one special character, e.g., ! @ # ? ]"
];




const Form = (props) => {
	const [name, setName] = props.data[0];
	const [lastName, setLastName] = props.data[1];
	const [email, setEmail] = props.data[2];
	const [password, setPassword] = props.data[3];
	const [reqs, setReqs] = useState([false, false, false, false]);

	const checkRequirements = () => {
		const update = [...reqs];
		if (email.length >= 12) {
			update[0] = true;
		} else {
			update[0] = false;
		}

		if (/[A-Z]/.test(email) && /[a-z]/.test(email)) {
			update[1] = true;
		} else {
			update[1] = false;
		}

		if (/[0-9]/.test(email)) {
			update[2] = true;
		} else {
			update[2] = false;
		}

		if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(email)) {
			update[3] = true;
		} else {
			update[3] = false;
		}
		setReqs(update);
		if (update.includes(false)) {
			return false;
		} else {
			return true;
		}


	}

	const requirements = data.map(req => {
		const i = data.indexOf(req);
		return (
			<li key={i} className={"flex gap-1 " + (reqs[i] ? "text-black" : "")} >
				<span className={reqs[i] ? "text-[#00AAC1]" : ""} >●</span>
				<p>{req}</p>
			</li>

		);
	});



	return (
		<div className={"flex flex-col gap-4"}>
			<h1 className="text-black font-bold text-[14pt]">Account Set-up</h1>
			<div className="flex flex-col gap-6 py-4">
				<Input placeholder="First Name" value={name} setValue={setName} />
				<Input placeholder="Last Name" value={lastName} setValue={setLastName} />
				<Input placeholder="Email" value={email} setValue={setEmail} />
				<Input placeholder="Password" value={password} setValue={setPassword} ps={true} />
			</div>
			<ul className="text-[10pt] text-gray-400">
				{requirements}
			</ul>
		</div>
	);
}

export default Form;