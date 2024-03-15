import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurant } from '../../redux/restaurants';

function RestaurantDetailsPage() {
  const dispatch = useDispatch();
	const { id } = useParams();

  const restaurant = useSelector((state) => state.restaurants.data[id])
  console.log(restaurant)

  useEffect(() => {
    dispatch(getRestaurant(id))
  }, [dispatch, id])

  return (
    <div>RestaurantDetailsPage</div>
  )
}

export default RestaurantDetailsPage
