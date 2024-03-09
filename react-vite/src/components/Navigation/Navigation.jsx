import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CartButton from "./CartButton";

function Navigation({ isLoaded }) {
	const user = useSelector((store) => store.session.user);
	const navigate = useNavigate();

	const toLogin = () => {
		return navigate("/login");
	};

	const toSignup = () => {
		return navigate("/signup");
	};

	let sessionLinks;
	if (user) {
		sessionLinks = (
			<>
				<li>
					<CartButton />
				</li>
				<li>
					<ProfileButton />
				</li>
			</>
		);
	} else {
		sessionLinks = (
			<>
				<li>
					<button className="loginButton" onClick={toLogin}><i className="fa-solid fa-user"></i> Log In</button>
				</li>
				<li>
					<button className="signupButton" onClick={toSignup}>Sign Up</button>
				</li>
			</>
		);
	}



	return (
		<nav>
			<ul className='navList'>
				<div className='navListContainer'>
					<div>
						<li>
							<NavLink className='yumLogo' to='/'>Yum</NavLink> <NavLink className='cartLogo' to='/'>Cart</NavLink>
						</li>
					</div>
					<div className='sessionLinks'>{isLoaded && sessionLinks}</div>
				</div>
			</ul>
		</nav>
	);
}

export default Navigation;
