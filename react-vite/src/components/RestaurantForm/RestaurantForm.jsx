import "./RestaurantForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../redux/restaurants";
import { useNavigate } from "react-router-dom";

function RestaurantForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [logo, setLogo] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [errors, setErrors] = useState(null);

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = { name, logo, address, city, state, zip_code: zip };
		try {
			console.log(formData);
			const restaurant = await dispatch(createRestaurant(formData));
			navigate(`/restaurants/${restaurant.id}`);
		} catch (error) {
			setErrors(error);
		}
	};
	console.log(errors && errors.name);
	return (
		<>
			<div className='rfContainer'>
				<div className='rfLeft'>
					<h1>Unlock a new revenue stream</h1>
					<p>Connect with more customers and grow your business on your terms. Partner with us today.</p>
				</div>
				<div className='rfFormContainer'>
					<h2>Get started</h2>
					<form className='rfForm' onSubmit={onSubmit}>
						<div className='rfFormInputContainer'>
							<label htmlFor='name'>Restaurant name:</label>
							<input
								type='text'
								id='name'
								name='name'
								required
								onChange={(e) => setName(e.target.value)}
								value={name}
								placeholder="Example: Sam's Pizza"
							/>
							{errors && errors.name && <p className='error'>{`*${errors.name[0]}`}</p>}
						</div>
						<div className='rfFormInputContainer'>
							<label htmlFor='logo'>Restaurant logo URL:</label>
							<input
								type='text'
								id='logo'
								name='logo'
								required
								onChange={(e) => setLogo(e.target.value)}
								value={logo}
								placeholder='img.jpg'
							/>
						</div>
						<div className='rfFormInputContainer'>
							<label htmlFor='address'>Restaurant address:</label>
							<input
								type='text'
								id='address'
								name='address'
								required
								onChange={(e) => setAddress(e.target.value)}
								value={address}
								placeholder='132 Fake St'
							/>
						</div>
						<div className='rfFormInputContainer'>
							<label htmlFor='city'>City:</label>
							<input
								type='text'
								id='city'
								name='city'
								required
								onChange={(e) => setCity(e.target.value)}
								value={city}
								placeholder='San Diego'
							/>
						</div>
						<div className='rfFormInputContainer'>
							<label htmlFor='state'>State:</label>
							<select id='state' name='state' required onChange={(e) => setState(e.target.value)} value={state}>
								<option value='AL'>Alabama</option>
								<option value='AK'>Alaska</option>
								<option value='AZ'>Arizona</option>
								<option value='AR'>Arkansas</option>
								<option value='CA'>California</option>
								<option value='CO'>Colorado</option>
								<option value='CT'>Connecticut</option>
								<option value='DE'>Delaware</option>
								<option value='DC'>District Of Columbia</option>
								<option value='FL'>Florida</option>
								<option value='GA'>Georgia</option>
								<option value='HI'>Hawaii</option>
								<option value='ID'>Idaho</option>
								<option value='IL'>Illinois</option>
								<option value='IN'>Indiana</option>
								<option value='IA'>Iowa</option>
								<option value='KS'>Kansas</option>
								<option value='KY'>Kentucky</option>
								<option value='LA'>Louisiana</option>
								<option value='ME'>Maine</option>
								<option value='MD'>Maryland</option>
								<option value='MA'>Massachusetts</option>
								<option value='MI'>Michigan</option>
								<option value='MN'>Minnesota</option>
								<option value='MS'>Mississippi</option>
								<option value='MO'>Missouri</option>
								<option value='MT'>Montana</option>
								<option value='NE'>Nebraska</option>
								<option value='NV'>Nevada</option>
								<option value='NH'>New Hampshire</option>
								<option value='NJ'>New Jersey</option>
								<option value='NM'>New Mexico</option>
								<option value='NY'>New York</option>
								<option value='NC'>North Carolina</option>
								<option value='ND'>North Dakota</option>
								<option value='OH'>Ohio</option>
								<option value='OK'>Oklahoma</option>
								<option value='OR'>Oregon</option>
								<option value='PA'>Pennsylvania</option>
								<option value='RI'>Rhode Island</option>
								<option value='SC'>South Carolina</option>
								<option value='SD'>South Dakota</option>
								<option value='TN'>Tennessee</option>
								<option value='TX'>Texas</option>
								<option value='UT'>Utah</option>
								<option value='VT'>Vermont</option>
								<option value='VA'>Virginia</option>
								<option value='WA'>Washington</option>
								<option value='WV'>West Virginia</option>
								<option value='WI'>Wisconsin</option>
								<option value='WY'>Wyoming</option>
							</select>
						</div>
						<div className='rfFormInputContainer'>
							<label htmlFor='zip_code'>Zip Code:</label>
							<input
								type='number'
								id='zip_code'
								name='zip'
								required
								onChange={(e) => setZip(e.target.value)}
								value={zip}
								placeholder='92084'
							/>
							{errors && errors.zip_code && <p className='error'>{`*${errors.zip_code[0]}`}</p>}
						</div>

						<div>
							<button className="rfButton" type='submit'>Submit</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default RestaurantForm;
