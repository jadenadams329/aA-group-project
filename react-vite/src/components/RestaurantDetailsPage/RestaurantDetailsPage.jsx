import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurant } from '../../redux/restaurants';
import Menu from "./Menu";

function RestaurantDetailsPage() {
  const dispatch = useDispatch();
	const { id } = useParams();

  const restaurant = useSelector((state) => state.restaurants.data[id])

  useEffect(() => {
    dispatch(getRestaurant(id))
  }, [dispatch, id])

  return (
    <>
      <div>RestaurantDetailsPage</div>
      <Menu id={id}/>
    </>
  )
}

export default RestaurantDetailsPage
