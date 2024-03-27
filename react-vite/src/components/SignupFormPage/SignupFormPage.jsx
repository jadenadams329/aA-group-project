import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");

	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to='/restaurants' replace={true} />;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setErrors({
				confirmPassword: "Confirm Password field must be the same as the Password field",
			});
		}

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

	return (
		<>
			<h1>Sign Up</h1>
			{errors.server && <p>{errors.server}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Email
					<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
				</label>
				{errors.email && <p>{errors.email}</p>}
				<label>
					Username
					<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
				</label>
				{errors.username && <p>{errors.username}</p>}
				<label>
					Password
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
				</label>
				{errors.password && <p>{errors.password}</p>}
				<label>
					Confirm Password
					<input
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
				<label>
					First Name
					<input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
				</label>
				<label>
					Last Name
					<input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
				</label>
				<label>
					Phone Number
					<input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} required />
				</label>
				<label>
					Address
					<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
				</label>
				<label>
					City
					<input type='text' value={city} onChange={(e) => setCity(e.target.value)} required />
				</label>
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
				<label>
					Zip Code
					<input type='number' value={zip} onChange={(e) => setZip(e.target.value)} required />
				</label>
				<button type='submit'>Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormPage;
