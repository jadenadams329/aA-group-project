/** Action Type Constants: */
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";

/**  Action Creators: */
export const loadRestaurants = (restaurants) => ({
	type: LOAD_RESTAURANTS,
	payload: restaurants.restaurants,
});

/** Thunk Action Creators: */
export const getAllRestaurants = () => async (dispatch) => {
	const res = await fetch("/api/restaurants");
	if (res.ok) {
		const data = await res.json();
		dispatch(loadRestaurants(data));
		return data;
	}
};

/** Reducer: */
const initialState = {
    isLoading: true,
    data: {}
}

const restaurantsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_RESTAURANTS: {
            const restaurantState = {}
            action.payload.forEach(restaurant => {
                restaurantState[restaurant.id] = restaurant
            });
            return {...state, data: restaurantState, isLoading: false}
        }
        default:
            return state;
    }
}

export default restaurantsReducer;
