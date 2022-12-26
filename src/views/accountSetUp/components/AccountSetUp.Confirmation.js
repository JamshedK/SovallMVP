import { Fragment } from "react";

const Confirmation = (props) => {
	const name = props.data[0][0];
	const email = props.data[2][0];
	return (
		<div className={"flex flex-col gap-8 py-2 items-center"}>
			<h1 className="text-black font-bold text-[15pt] text-center">Verify your Email</h1>
			<div className="flex flex-col gap-6 py-4">
				<p>Hello {name},</p>
				<p>We sent a verification email to your email address <a className="text-[#0075FF]">{email}</a></p>
			</div>
			<button className="border rounded-full px-5 py-1 bg-gray-200 w-fit">Re-send email</button>
		</div>
	);
}

export default Confirmation;