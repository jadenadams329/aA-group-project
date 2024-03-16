import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurant } from "../../redux/restaurants";
import "./RestaurantDetailsPage.css";

function RestaurantDetailsPage() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const restaurant = useSelector((state) => state.restaurants.data[id]);
	console.log(restaurant);

	useEffect(() => {
		dispatch(getRestaurant(id));
	}, [dispatch, id]);

	return (
		<>
			<div className="pageContainer">
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
				></div>
				<div className='rdContainer'>
					<h1>{restaurant && `${restaurant.name} (${restaurant.address})`}</h1>
					<div>
						<Link className='rdReviewLinkContainer'>
							<span>4.6</span>
							<i class='fa-solid fa-star'></i>
							<span className='rdReviewLinkSpan'>(33)</span>
							<span className='rdReviewLinkSpan'>{">"}</span>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default RestaurantDetailsPage;
