import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";

function ProfileButton() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((store) => store.session.user);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Prevent bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	const closeMenu = () => {
		setShowMenu(false);
	};

	const logout = (e) => {
		e.preventDefault();
		dispatch(thunkLogout());
		closeMenu();
	};

	useEffect(() => {
		const closeMenuOnOutsideClick = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				closeMenu();
			}
		};

		document.addEventListener("mousedown", closeMenuOnOutsideClick);

		return () => {
			document.removeEventListener("mousedown", closeMenuOnOutsideClick);
		};
	}, []); // Empty dependency array ensures this effect runs only once during initialization

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<div style={{ position: "relative" }}>
				<button onClick={toggleMenu} className="profileButton">
					<i className="fa-solid fa-user" id="profileIcon"></i>
				</button>
				{showMenu && (
					<ul className={ulClassName} ref={ulRef}>
						{user && (
							<>
								<li>{user.username}</li>
								<li>{user.email}</li>
								<li>
									<button onClick={logout}>Log Out</button>
								</li>
							</>
						)}
					</ul>
				)}
			</div>
		</>
	);
}

export default ProfileButton;
