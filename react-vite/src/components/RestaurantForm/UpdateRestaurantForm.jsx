import "./RestaurantForm.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRestaurant, getRestaurant } from "../../redux/restaurants";

function UpdateRestaurantForm() {
	const { id } = useParams();
	const restaurant = useSelector((state) => state.restaurants.data[id]);
	const isLoading = useSelector((state) => state.restaurants.isLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [logo, setLogo] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [errors, setErrors] = useState(null);

	useEffect(() => {
        dispatch(getRestaurant(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (restaurant) {
            setName(restaurant.name);
            setLogo(restaurant.logo);
            setAddress(restaurant.address);
            setCity(restaurant.city);
            setState(restaurant.state);
            setZip(restaurant.zip_code);
        }
    }, [restaurant]);

    useEffect(() => {
        const validationErrors = {}
        if (zip > 99999 || zip < 10000) {
            validationErrors["zip"] = "Please enter valid Zip Code"
        }
        setErrors(validationErrors)
    },[zip])

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = { name, logo, address, city, state, zip_code: zip };
		try {
			console.log(formData);
			const restaurant = await dispatch(updateRestaurant(id, formData));
			navigate(`/restaurants/${restaurant.id}`);
		} catch (error) {
			setErrors(error);
		}
	};

	console.log(restaurant);

	return (
		<>
			{!isLoading && (
				<div className='rfContainer'>
					<div className='rfFormContainer'>
						<h2>Update your restaurant</h2>
						<form className='rfForm' onSubmit={onSubmit}>
							<div className='rfFormInputContainer'>
								<label htmlFor='name'>Restaurant name:</label>
								<input
									type='text'
									id='name'
									name='name'
									required
									onChange={(e) => setName(e.target.value)}
									value={name && name}
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
								{errors && errors.zip && <p className='error'>{`*${errors.zip}`}</p>}
							</div>

							<div>
								<button className='rfButton' type='submit' disabled={errors && errors.zip && !!errors.zip}>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default UpdateRestaurantForm;
