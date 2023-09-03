import Form from './components/AccountSetUp.Form';
import Confirmation from './components/AccountSetUp.Confirmation';//redirect to this component after finishing the sign up
import Input from '../common/Input';
import { useState, useContext } from 'react';
import AuthContext from "../../contexts/auth-context";
import { useNavigate } from 'react-router-dom';
import {db} from '../../firebase-config'
import {collection, doc, setDoc } from '@firebase/firestore';


const AccountSetUp = () => {
	const [canContinue, setCanContinue] = useState(false);
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [university, setUniversity] = useState('')
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [passMatch, setPassMatch] = useState(true);
	const [reqs, setReqs] = useState([true, true, true, true]);
	
	// useNavigate hook for redirects
	const navigate = useNavigate(); 
	// For the context management
	const authCtx = useContext(AuthContext); 
	
	//hardtyped data for the password requirements
	const data = [
		"At least 6 characters"
		// "A mixture of uppercase and lowercase",
		// "At least one number",
		// "At least one special character, e.g., ! @ # ? ]"
	];
	
	/*Components*/
	const Button = (props) => {
		return <button className="border rounded-full px-5 py-1 bg-white" onClick={props.onClick}>{props.value}</button>;
	}
	
	const Navigation = () => {
		return (
			<div className="w-[23rem] h-fit flex justify-between">
				<Button value="Previous" />
				<Button value="Next" onClick={handleContinue} />
			</div>
			);
	}
	
	/*utility functions*/
	const checkAndUpdateRequirements = () => {
		const update = [...reqs];
		if (password.length >= 6) {
			update[0] = true;
		} else {
			update[0] = false;
		}

		// if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
		// 	update[1] = true;
		// } else {
		// 	update[1] = false;
		// }

		// if (/[0-9]/.test(password)) {
		// 	update[2] = true;
		// } else {
		// 	update[2] = false;
		// }

		// if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
		// 	update[3] = true;
		// } else {
		// 	update[3] = false;
		// }

		setReqs(update);

		if (update.includes(false)) {
			return false;
		} else {
			return true;
		}
	}

	const addUserToFirestore = async (localId) => {
		console.log(localId);
		await setDoc(doc(db, 'users', localId), {
			firstname:name, 
			lastname: lastName,
			email:email,
			image_path: 'account/default_profile_pic.svg',
			university: university
		})
	}
	
	/*Handlers*/
	const handleContinue = async (e) => {
		e.preventDefault();
		if (password.length === 0 && passwordConfirmation.length == 0) {
			return;
		}

		if (password === passwordConfirmation) {
			setPassMatch(true);
			if (checkAndUpdateRequirements()) {
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
				console.log(data);
				if(response.ok){
					// store the token
					authCtx.accountSetup(data.idToken, data.localId);
					console.log(authCtx.userID);
					// redirect the user to skils and interests
					navigate('/skills-interests');
					// add the user to firestore
					addUserToFirestore(data.localId);
				}else{
					console.log(data)
				}
			}catch(e){
				console.log(e)
			}
			
			}
		} else {
			setPassMatch(false);
			return;
		}
	}
	
	
	/*arrays of components*/
	const requirements = data.map(req => {
		const i = data.indexOf(req);
		return (
			<li key={i} className={"flex gap-1 " + (!reqs[i] ? "text-[#BD1B1B]" : "")} >
				<span>●</span>
				<p>{req}</p>
			</li>

		);
	});


	return (
		<div className="h-full w-full bg-green-5 flex items-center pt-10 flex flex-col gap-8 overflow-auto">
			<div className="w-[23rem] h-[26rem] bg-white rounded-xl px-8 py-4">
				<div className={"flex flex-col gap-2"}>
					<h1 className="text-black font-bold text-[14pt]">Account Set-up</h1>
					{/*Form input*/ }
					<form className="flex flex-col gap-4 py-4">
						<Input placeholder="First Name" value={name} setValue={setName} />
						<Input placeholder="Last Name" value={lastName} setValue={setLastName} />
						<Input placeholder="Email" value={email} setValue={setEmail} />
						<Input placeholder="University" value={university} setValue={setUniversity} />
						<Input placeholder="Password" value={password} setValue={setPassword} ps={true}/>
						<Input placeholder="Re-enter your password" value={passwordConfirmation} setValue={setPasswordConfirmation} ps={true}/>
					</form>
					{/*Requirement bullet points*/ }
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
