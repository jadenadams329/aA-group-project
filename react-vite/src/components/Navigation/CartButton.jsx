import { useEffect, useState, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartDropDown from "../Cart/Cart-drop-down";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getTheCart } from "../../redux/cart";



function CartButton() {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart?.cart)
	const rest = useSelector((state) => state.cart?.restaurant)
	// let cart = []
	const [showMenu, setShowMenu] = useState(false);
	const [counted, setCounted ] = useState(0)
	const ulRef = useRef();
	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};
	const getCount = () =>{
		if (cart?.length){
			return cart.length
		}else{
		return 0
		}
}
	useEffect(()=>{
		dispatch(getTheCart()).then(() => setCounted(getCount()))
		console.log(getCount(), "this is the cart in the cartbutton")
	},[dispatch])

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
					{cart && (

				<button onClick={toggleMenu} className="cartButton">
						<FaShoppingCart /> Cart · {counted}

				</button>
					)}
				{showMenu && (
					//make a cart button dropdown component and put below.
					<div className={ulClassName} ref={ulRef}>
						<CartDropDown cart={cart} restaurant={rest}/>
					</div>
				)}
			</div>
		</>
	);
}

export default CartButton;
