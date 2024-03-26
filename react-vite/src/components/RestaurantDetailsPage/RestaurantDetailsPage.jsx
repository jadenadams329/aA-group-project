import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurant } from "../../redux/restaurants";
import Menu from "./Menu";
import "./RestaurantDetailsPage.css";
import OwnerButton from "../RestaurantForm/OwnerButton";

function RestaurantDetailsPage() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const restaurant = useSelector((state) => state.restaurants.data[id]);
	const user = useSelector((state) => state.session.user);
	console.log(restaurant);

	useEffect(() => {
		dispatch(getRestaurant(id));
	}, [dispatch, id]);

	let ownerButton;

	if (user && restaurant && user.id == restaurant.owner_id) {
		ownerButton = (
			<>
					<OwnerButton id={id} />
			</>
		);
	}

	return (
		<>
			<div className='pageContainer'>
				<div
					style={{
						backgroundImage: `url(${restaurant && restaurant.logo})`,
						backgroundRepeat: "no-repeat",
						height: "250px",
						width: "100%",
						backgroundSize: "cover",
						backgroundPosition: "center center",
						marginTop: "15px",
						borderRadius: "15px",
					}}
					className='logoBanner'
				>
					<div>{ownerButton && ownerButton}</div>
				</div>
				<div className='rdContainer'>
					<h1>{restaurant && `${restaurant.name} (${restaurant.address})`}</h1>
					<div>
						<Link className='rdReviewLinkContainer'>
							<span>4.6</span>
							<i className='fa-solid fa-star'></i>
							<span className='rdReviewLinkSpan'>(33)</span>
							<span className='rdReviewLinkSpan'>{">"}</span>
						</Link>
					</div>
				</div>
				<div>
					<Menu id={id} />
				</div>
			</div>
		</>
	);
}

export default RestaurantDetailsPage;
