import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import validator from "validator";
import "./SignupForm.css";

function SignupFormPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState(location.state?.address ? location.state.address : "");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [errors, setErrors] = useState({});

	let [userInteraction, setUserInteraction] = useState({
		email: false,
		username: false,
		firstName: false,
		lastName: false,
		password: false,
		confirmPassword: false,
		zipCode: false,
	});

	let submitDisabled = true;



	submitDisabled = Object.values(errors).length === 0 ? false : true;

	useEffect(() => {
		const validationErrors = {};
		if (!validator.isEmail(email)) validationErrors["isEmail"] = "*Please enter a valid email";
		if (username.length <= 3) validationErrors["usernameLength"] = "*Username must be 4 or more characters";
		if (password.length <= 5) validationErrors["passwordLength"] = "*Password should contain at least 6 characters";
		if (!validator.equals(password, confirmPassword)) validationErrors["confirmPassword"] = "*Passwords must match";
		if (zip.length > 5 || zip.length < 5) validationErrors["zipLength"] = "*Zip must be 5 numbers";
		setErrors(validationErrors);
	}, [email, username, firstName, lastName, password, zip, confirmPassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if (password !== confirmPassword) {
		// 	return setErrors({
		// 		confirmPassword: "Confirm Password field must be the same as the Password field",
		// 	});
		// }

		const serverResponse = await dispatch(
			thunkSignup({
				email,
				username,
				password,
				first_name: firstName,
				last_name: lastName,
				phone_number: phone,
				address,
				city,
				state,
				zip,
			})
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			navigate("/restaurants");
		}
	};

	if (sessionUser) return <Navigate to='/restaurants' replace={true} />;

	return (
		<>
			<div className='suPageContainer'>
				<h1>Sign Up</h1>
				{errors.server && <p className='error'>{errors.server}</p>}
				<div className='suFormContainer'>
					<form className='suForm' onSubmit={handleSubmit}>
						<div className='suSection'>
							<label>Email</label>
							<input
								type='text'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value),
										setUserInteraction((prevState) => ({
											...prevState,
											email: true,
										}));
								}}
								required
							/>
							{errors.email && <p className='error'>{errors.email}</p>}
							{errors.isEmail && userInteraction.email && <p className='error'>{errors.isEmail}</p>}
						</div>
						<div className='suSection'>
							<label>Username</label>
							<input
								type='text'
								value={username}
								onChange={(e) => {
									setUsername(e.target.value),
										setUserInteraction((prevState) => ({
											...prevState,
											username: true,
										}));
								}}
								required
							/>
							{errors.username && <p className='error'>{errors.username}</p>}
							{errors.usernameLength && userInteraction.username && <p className='error'>{errors.usernameLength}</p>}
						</div>
						<div className='suSection'>
							<label>Password</label>
							<input
								type='password'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value),
										setUserInteraction((prevState) => ({
											...prevState,
											password: true,
										}));
								}}
								required
							/>
							{errors.password && <p className='error'>{errors.password}</p>}
							{errors.passwordLength && userInteraction.password && <p className='error'>{errors.passwordLength}</p>}
						</div>
						<div className='suSection'>
							<label>Confirm Password</label>
							<input
								type='password'
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value),
										setUserInteraction((prevState) => ({
											...prevState,
											confirmPassword: true,
										}));
								}}
								required
							/>
							{errors.confirmPassword && userInteraction.confirmPassword && (
								<p className='error'>{errors.confirmPassword}</p>
							)}
						</div>
						<div className='suSection'>
							<div className='suSectionLower'>
								<div>
									<label>First Name</label>
									<input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
								</div>
								<div>
									<label>Last Name</label>
									<input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
								</div>
							</div>
						</div>
						<div className='suSection'>
							<label>Phone Number</label>
							<input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
						</div>
						<div className='suSection'>
							<label>Address</label>
							<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
						</div>
						<div className='suSection'>
							<div className='suSectionLower'>
								<div>
									<label>City</label>
									<input type='text' value={city} onChange={(e) => setCity(e.target.value)} required />
								</div>
								<div>
									<label htmlFor='state'>State:</label>
									<select name='state' required onChange={(e) => setState(e.target.value)} value={state}>
										<option value='Alabama'>Alabama</option>
										<option value='Alaska'>Alaska</option>
										<option value='Arizona'>Arizona</option>
										<option value='Arkansas'>Arkansas</option>
										<option value='California'>California</option>
										<option value='Colorado'>Colorado</option>
										<option value='Connecticut'>Connecticut</option>
										<option value='Delaware'>Delaware</option>
										<option value='District Of Columbia'>District Of Columbia</option>
										<option value='Florida'>Florida</option>
										<option value='Georgia'>Georgia</option>
										<option value='Hawaii'>Hawaii</option>
										<option value='Idaho'>Idaho</option>
										<option value='Illinois'>Illinois</option>
										<option value='Indiana'>Indiana</option>
										<option value='Iowa'>Iowa</option>
										<option value='Kansas'>Kansas</option>
										<option value='Kentucky'>Kentucky</option>
										<option value='Louisiana'>Louisiana</option>
										<option value='Maine'>Maine</option>
										<option value='Maryland'>Maryland</option>
										<option value='Massachusetts'>Massachusetts</option>
										<option value='Michigan'>Michigan</option>
										<option value='Minnesota'>Minnesota</option>
										<option value='Mississippi'>Mississippi</option>
										<option value='Missouri'>Missouri</option>
										<option value='Montana'>Montana</option>
										<option value='Nebraska'>Nebraska</option>
										<option value='Nevada'>Nevada</option>
										<option value='New Hampshire'>New Hampshire</option>
										<option value='New Jersey'>New Jersey</option>
										<option value='New Mexico'>New Mexico</option>
										<option value='New York'>New York</option>
										<option value='North Carolina'>North Carolina</option>
										<option value='North Dakota'>North Dakota</option>
										<option value='Ohio'>Ohio</option>
										<option value='Oklahoma'>Oklahoma</option>
										<option value='Oregon'>Oregon</option>
										<option value='Pennsylvania'>Pennsylvania</option>
										<option value='Rhode Island'>Rhode Island</option>
										<option value='South Carolina'>South Carolina</option>
										<option value='South Dakota'>South Dakota</option>
										<option value='Tennessee'>Tennessee</option>
										<option value='Texas'>Texas</option>
										<option value='Utah'>Utah</option>
										<option value='Vermont'>Vermont</option>
										<option value='Virginia'>Virginia</option>
										<option value='Washington'>Washington</option>
										<option value='West Virginia'>West Virginia</option>
										<option value='Wisconsin'>Wisconsin</option>
										<option value='Wyoming'>Wyoming</option>
									</select>
								</div>
							</div>
						</div>
						<div className='suSection'>
							<label>Zip Code</label>
							<input
								type='number'
								value={zip}
								onChange={(e) => {
									setZip(e.target.value),
										setUserInteraction((prevState) => ({
											...prevState,
											zipCode: true,
										}));
								}}
								required
							/>
							{errors && errors.zipLength && userInteraction.zipCode && (
								<p className='error'>{`${errors.zipLength}`}</p>
							)}
						</div>
						<button disabled={submitDisabled} className='liButton' type='submit'>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupFormPage;
