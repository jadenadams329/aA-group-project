import RestaurantCard from "./RestaurantCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../redux/restaurants";
import { Link } from "react-router-dom";
import "./RestaurantsPage.css";

function RestaurantsPage() {
	let isLoading = true;
	const dispatch = useDispatch();
	const restaurants = useSelector((state) => state.restaurants.data);
	isLoading = useSelector((state) => state.restaurants.isLoading);
	const restaurantsList = Object.values(restaurants);

	useEffect(() => {
		dispatch(getAllRestaurants());
	}, [dispatch]);
	return (
		<>
			<div>
				<div>
					<h2 className='rpHeader'>All Restaurants</h2>
				</div>
				<div className='rpCardContainer'>
					{!isLoading &&
						restaurantsList &&
						restaurantsList.map((restaurant) => (
							<Link className='rcLink' key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
								<RestaurantCard restaurant={restaurant} key={restaurant.id} />
							</Link>
						))}
				</div>
			</div>
		</>
	);
}

export default RestaurantsPage;
