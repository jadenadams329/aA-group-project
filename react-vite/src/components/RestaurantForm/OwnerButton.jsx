import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteRestaurantModal from "../RestaurantDetailsPage/DeleteRestaurantModal";

function OwnerButton({ id }) {
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const navigate = useNavigate();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Prevent bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	const closeMenu = () => {
		setShowMenu(false);
	};

	const callNavigate = () => {
		return navigate("/restaurants");
	};

	const handleEditRestaurant = () => {
		return navigate(`/restaurants/${id}/edit`)
	}

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
								<button className="obLink" onClick={handleEditRestaurant}>Edit Restaurant</button>
							</li>
						</div>
						<div>
							<li>
								<OpenModalButton
									cssClass={"obLink"}
									buttonText='Delete Restaurant'
									modalComponent={<DeleteRestaurantModal restaurantId={id} navigate={callNavigate} />} />
							</li>
						</div>
					</ul>
				)}
			</div>
		</>
	);
}

export default OwnerButton;
