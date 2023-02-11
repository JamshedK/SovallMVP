import react, { useState } from 'react';
const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [canSubmit, setCanSubmit] = useState(false);

	/*Utility function*/
	function isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	}

	/*Handlers*/
	const handleEmail = (e) => {
		const email = e.target.value;
		const isValid = isValidEmail(email)

		setEmail(email)
		if (isValid) {
			setValidEmail(true)
		} else {
			setValidEmail(false)
		}

		if (isValid && email !== "yourname@email.com") {
			setCanSubmit(true)
		} else {
			setCanSubmit(false)
		}
	};

	return (
		<div className="relative bg-green-5 h-full sm:text-white flex justify-center pt-20">
			<div className=" w-[20rem]  xl:w-[25rem] text-white flex flex-col items-center gap-8">
				<h1 className="w-full font-bold text-[14pt]">Forgot Password</h1>
				<p>
					Enter the email associated with your account and we'll send you a link to reset your password
				</p>
				<form className="w-full flex flex-col items-center gap-6">
					<div className={"border-b block w-full border-white h-fit" + (validEmail ? "" : " focus-within:border-rose-600")}>
						<input value={email} className="border-none h-fit text-white  bg-transparent pl-4 text-xs  xl:placeholder:text-[10pt] xl:text-[10pt] 2xl:placeholder:text-[12pt] 2xl:text-[12pt] w-full p-0 focus:border-transparent focus:ring-0 placeholder:text-[10pt] placeholder:text-white" type="email" placeholder="Email" onChange={handleEmail}></input>
					</div>
					<button className="block bg-white text-green-2  dropshadow-xl rounded-full px-4 py-1 mt-2 font-medium disabled:bg-gray-200 disabled:hover:cursor-no-drop" disabled={!canSubmit}>Continue</button>

				</form>
			</div>
			<a href="mailto:info@sovall.com" className="absolute bg-[#2C8888] bottom-4 text-white rounded-full py-2 px-5 drop-shadow-lg"> Reach out: info@sovall.com</a>
		</div>
	);
}

export default ForgotPassword;