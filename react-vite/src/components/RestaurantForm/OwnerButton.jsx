import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OwnerButton({ id }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Prevent bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	const closeMenu = () => {
		setShowMenu(false);
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

	const ulClassName = "restaurant-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<div style={{ position: "relative" }}>
				<button className='rdEditButton' onClick={toggleMenu}>
					<i className='fa-solid fa-ellipsis'></i>
				</button>
				{showMenu && (
					<ul ref={ulRef} className={ulClassName} id='obUl'>
						<div>
							<li className='obListItem'>
								<Link className='obLink' to={`/restaurants/${id}/edit`}>
									Edit Restaurant
								</Link>
							</li>
						</div>
					</ul>
				)}
			</div>
		</>
	);
}

export default OwnerButton;
