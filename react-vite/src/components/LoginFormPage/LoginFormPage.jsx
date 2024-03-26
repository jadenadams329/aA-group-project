import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to='/' replace={true} />;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const serverResponse = await dispatch(
			thunkLogin({
				email,
				password,
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
			<div className='loginFormContainer'>
				<div>
					<h1 style={{ float: "left", fontWeight: "500" }}>Yum </h1>
					<h1 style={{ float: "right", marginLeft: "5px" }}>Cart</h1>
				</div>
				{errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}
				<form onSubmit={handleSubmit} className='liForm'>
					<div className="emailContainer">
						<label>Email</label>
						<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
						{errors.email && <p className="error">{errors.email}</p>}
					</div>
					<div className="passwordContainer">
						<label>Password</label>
						<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
						{errors.password && <p className="error">{errors.password}</p>}
					</div>

					<button className="liButton" type='submit'>Log In</button>
				</form>
			</div>
		</>
	);
}

export default LoginFormPage;
