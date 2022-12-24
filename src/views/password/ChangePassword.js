import { useState } from "react";
import Password from './components/ChangePassword.Password';
const data = [
	"At least 12 characters (required for your Muhlenberg password)—the more characters, the better",
	"A mixture of both uppercase and lowercase letters",
	"A mixture of letters and numbers",
	"Inclusion of at least one special character, e.g., ! @ # ? ]"
];


const ForgotPassword = () => {

	const [canSubmit, setCanSubmit] = useState(false);
	const [passMatch, setPassMatch] = useState(true);
	const [reqs, setReqs] = useState([true, true, true, true]);
	const [email, setEmail] = useState("");
	const [emailConfirmation, setEmailConfirmation] = useState("");


	const requirements = data.map(req => {
		const i = data.indexOf(req);
		return (
			<li key={i} className={"flex gap-1 " + (!reqs[i]? "text-orange-1":"")} >
				<span>●</span>
				<p>{req}</p>
			</li>
		);
	});


	const handleEmail = (e) => {
		setEmail(e.target.value)
	}
	const handleEmailConfirmation = (e) => {
		setEmailConfirmation(e.target.value)
	}
	

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

	const handleSubmit = (e) => {
		e.preventDefault();

		if (email.length === 0 && emailConfirmation.length == 0) {
			return;
		}

		if (email === emailConfirmation) {
			setPassMatch(true);
			if (checkRequirements()) {
				//Insert here the HTTP POST request
				console.log("Correct");
			}
		} else {
			setPassMatch(false);
			return;
        }

    }
	return (
		<div className="relative bg-green-5 h-screen sm:text-white flex justify-center pt-20 overflow-auto pb-8">
			<div className=" w-[20rem]  xl:w-[23rem] h-fit text-white flex flex-col items-center gap-8">
				<h1 className="w-full font-bold text-[14pt]">Change Password</h1>
				<div className="flex flex-col gap-2">
					<p className="font-medium text-[13pt]">Password Requirements</p>
					<ul className="flex flex-col gap-2">
						{requirements}
					</ul>
				</div>
				<form className="w-full flex flex-col items-center gap-8 text-orange-1">
					<p className={"w-full text-[8pt] " + (passMatch ? "hidden" : "")}>*The Passwords don't match</p>
					<Password value={email} onChange={handleEmail} placeholder="Password" visible={true} match={passMatch}/>
					<Password value={emailConfirmation} onChange={handleEmailConfirmation} placeholder="Re-enter your password" visible={true} match={passMatch} />
					<button className="block bg-white text-green-2  dropshadow-xl rounded-full px-4 py-1 mt-6 font-medium disabled:bg-gray-200 disabled:hover:cursor-no-drop" onClick={handleSubmit}>Change Password</button>

				</form>
			</div>
		</div>
    );
}

export default ForgotPassword;