﻿import Form from './components/AccountSetUp.Form';
import Confirmation from './components/AccountSetUp.Confirmation';
import Input from '../common/Input';
import { useState, useContext } from 'react';
import AuthContext from "../../contexts/auth-context";
import { useNavigate } from 'react-router-dom';


const AccountSetUp = () => {
	const [canContinue, setCanContinue] = useState(false);
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [passMatch, setPassMatch] = useState(true);
	// useHistory hook for redirects
	const navigate = useNavigate(); 
	// For the context management
	const authCtx = useContext(AuthContext);  

	const data = [
		"At least 12 characters",
		"A mixture of uppercase and lowercase",
		"At least one number",
		"At least one special character, e.g., ! @ # ? ]"
	];
	
	const Button = (props) => {
		return <button className="border rounded-full px-5 py-1 bg-white" onClick={props.onClick}>{props.value}</button>;
	}
	const [reqs, setReqs] = useState([true, true, true, true]);

	const checkAndUpdateRequirements = () => {
		const update = [...reqs];
		if (password.length >= 12) {
			update[0] = true;
		} else {
			update[0] = false;
		}

		if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
			update[1] = true;
		} else {
			update[1] = false;
		}

		if (/[0-9]/.test(password)) {
			update[2] = true;
		} else {
			update[2] = false;
		}

		if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
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
			<li key={i} className={"flex gap-1 " + (!reqs[i] ? "text-[#BD1B1B]" : "")} >
				<span>●</span>
				<p>{req}</p>
			</li>

		);
	});

	const Navigation = () => {
		return (
			<div className="w-[23rem] h-fit flex justify-between">
				<Button value="Previous" />
				<Button value="Next" onClick={handleContinue} />
			</div>
			);
	}


	const handleContinue = async (e) => {
		e.preventDefault();
		if (password.length === 0 && passwordConfirmation.length == 0) {
			return;
		}

		if (password === passwordConfirmation) {
			setPassMatch(true);
			// if (checkAndUpdateRequirements()) {
				
			const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCanACeDK7fsTwEPlfJDgehm9M2RFck9FA'
			const response = await fetch(url, {
								method: 'POST',
								body: JSON.stringify({
									email: email, 
									password: password,
									returnSecureToken: true
								}),
								headers: {
									'Content-Type': 'application/json'
								}
							}
			);
			try{
				const data = await response.json();
				if(response.ok){
					// store the token
					authCtx.login(data.idToken);
					console.log(authCtx.token)
					// redirect the user to skils and interests
					navigate('/skills-interests');
				}else{
					console.log(data)
				}
			}catch(e){
				console.log(e)
			}
			
			}
		// } else {
		// 	setPassMatch(false);
		// 	return;
		// }
	}

	return (
		<div className="h-screen w-full bg-green-5 flex items-center pt-10 flex flex-col gap-8 overflow-auto">
			<div className="w-[23rem] h-[26rem] bg-white rounded-xl px-8 py-4">
				<div className={"flex flex-col gap-2"}>
					<h1 className="text-black font-bold text-[14pt]">Account Set-up</h1>
					<div className="flex flex-col gap-4 py-4">
						<Input placeholder="First Name" value={name} setValue={setName} />
						<Input placeholder="Last Name" value={lastName} setValue={setLastName} />
						<Input placeholder="Email" value={email} setValue={setEmail} />
						<Input placeholder="Password" value={password} setValue={setPassword} ps={true}/>
						<Input placeholder="Re-enter your password" value={passwordConfirmation} setValue={setPasswordConfirmation} ps={true}/>
					</div>
				
					<ul className="text-[10pt] text-gray-400 pl-8">
						{requirements}
						<li className={passMatch ? "hidden" : "text-[#BD1B1B]"}>*The Passwords don't match</li>
					</ul>

				</div>
			</div>

			<Navigation />
			
			
			
		</div>
		);
}

export default AccountSetUp;