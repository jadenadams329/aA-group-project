import "./RestaurantForm.css";

function RestaurantForm() {
	return (
		<>
			<div className='rfContainer'>
				<div className='rfLeft'>
					<h1>Unlock a new revenue stream</h1>
					<p>Connect with more customers and grow your business on your terms. Partner with us today.</p>
				</div>
				<div className='rfFormContainer'>
					<h2>Get started</h2>
					<form className='rfForm'>
						<label htmlFor='name'>Restaurant name:</label>
						<input type='text' id='name' name='name' required />

						<label htmlFor='logo'>Restaurant logo URL:</label>
						<input type='text' id='logo' name='logo' required />

						<label htmlFor='address'>Restaurant address:</label>
						<input type='text' id='address' name='address' required />

						<label htmlFor='city'>City:</label>
						<input type='text' id='city' name='city' required />

						<label htmlFor='state'>State:</label>
						<input type='text' id='state' name='state' required />

						<label htmlFor='zip_code'>Zip Code:</label>
						<input type='number' id='zip_code' name='zip_code' required />
					</form>
				</div>
			</div>
		</>
	);
}

export default RestaurantForm;
