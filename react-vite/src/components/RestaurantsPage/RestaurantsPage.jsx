import RestaurantCard from './RestaurantCard'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from '../../redux/restaurants';
import "./RestaurantsPage.css"

function RestaurantsPage() {
    let isLoading = true
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurants.data);
    isLoading = useSelector(state => state.restaurants.isLoading);
    const restaurantsList = Object.values(restaurants)


    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [dispatch])
  return (
    <>
        <div>
            <div>
                <h2 className='rpHeader'>All Restaurants</h2>
            </div>
            <div className='rpCardContainer'>
                {!isLoading && restaurantsList && restaurantsList.map((restaurant) => (
                    <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                ))}

            </div>
        </div>
    </>
  )
}

export default RestaurantsPage
