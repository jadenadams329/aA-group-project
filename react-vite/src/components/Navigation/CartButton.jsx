import { useEffect, useState, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";

function CartButton() {
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("mousedown", closeMenu);

		return () => document.removeEventListener("mousedown", closeMenu);
	}, [showMenu]);

	const ulClassName = "cart-dropdown" + (showMenu ? "" : " hidden");
    //TODO ADD CART QTY next to cart word
	return (
		<>
			<div style={{position: 'relative'}}>
				<button onClick={toggleMenu} className="cartButton">
					<FaShoppingCart /> Cart · 0
				</button>
				{showMenu && (
					//make a cart button dropdown component and put below.
					<ul className={ulClassName} ref={ulRef}>
						<li>Cart Item Goes Here</li>
					</ul>
				)}
			</div>
		</>
	);
}

export default CartButton;
