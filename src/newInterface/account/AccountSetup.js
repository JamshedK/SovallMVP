import sovall_logo from '../../assets/newInterface/account/sovall_logo.svg';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../views/common/Input';
import AuthContext from '../../contexts/auth-context';
import {doc, setDoc } from '@firebase/firestore';
import { db } from '../../firebase-config';

const AccountSetup = () => {
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [reqs, setReqs] = useState([true, true, true, true]);
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    	//hardtyped data for the password requirements
	const data = [
		"6 characters minimum"
		// "A mixture of uppercase and lowercase",
		// "At least one number",
		// "At least one special character, e.g., ! @ # ? ]"
	];

    /*arrays of requirements to show for password*/
	const requirements = data.map(req => {
		const i = data.indexOf(req);
		return (
			<li key={i} className={"flex gap-1 " + (!reqs[i] ? "text-[#BD1B1B]" : "")} >
				<span>●</span>
				<p>{req}</p>
			</li>

		);
	});

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
			email:email,
			image_path: 'account/default_profile_pic.svg',
		})
	}

    	/*Handlers*/
	const handleNextClicked = async (e) => {
		e.preventDefault();
        if (checkAndUpdateRequirements()) {
            const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
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
                    navigate('/skills');
                    // add the user to firestore
                    addUserToFirestore(data.localId);
                }else{
                    console.log(data)
                }
            }catch(e){
                console.log(e)
            }
        }
	}

    return (
        <div className='bg-[#044A54] w-full h-full flex flex-col items-center justify-center gap-32'>
            <div>
                <img 
                    className='w-40 mt-[25%]' 
                    src={sovall_logo}
                />
            </div>
            {/* User info */}
            <div className='flex justify-center flex-col items-center mb-20'>
                <h1 
                    className='text-white text-[27px] w-fit '
                >
                    My info
                </h1>
                {/*Form input*/ }
                <form className="flex flex-col gap-4 py-4 items-center">
                    <Input placeholder="Full name" value={name} setValue={setName} />
                    <Input placeholder="Email" value={email} setValue={setEmail} />
                    <Input placeholder="Password" value={password} setValue={setPassword} ps={true}/>
                    {/*Requirement bullet points*/ }
                    <ul className="text-[10pt] text-white pl-2 w-full">
                        {requirements}
                    </ul>
                    <button 
                        className="bg-white text-[#044A54] w-full px-4 py-2 text-[15px] rounded-md"
                        onClick={handleNextClicked}
                    >
                        Next
                    </button>
                    <h1 className='text-white'> 1/2 </h1>
                </form>
            </div>
        </div>
    )
}

export default AccountSetup;