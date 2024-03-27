import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from "react-redux";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('')
    const user = useSelector((store) => store.session.user);
    if (user){
        navigate('/restaurants')
    }

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/signup', { state: { address: inputValue } })
    }

    const handleInputChange = (e) => { // Add this function to handle input change
        setInputValue(e.target.value);
    }

	return (
		<>
			<div className='lpContainer'>
				<div className='lpContentContainer'>
					<h2 id='lpH2'>Order food near you</h2>
					<div className='lpSignUpContainer'>
						<div className='inputIconWrapper'>
							<i className='fa-solid fa-location-dot' id="lpIcon"></i>
							<input id='lpInput' type='text' placeholder="Enter delivery address" onChange={handleInputChange}></input>
						</div>
						<button className="lpButton" onClick={handleClick}>Sign Up</button>
					</div>
					<p className="lpP">
						Or <Link className="lpLink" to={'/login'}>Sign In</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default LandingPage;
