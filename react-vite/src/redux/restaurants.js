/** Action Type Constants: */
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";
const LOAD_RESTAURANT = "restaurants/LOAD_RESTAURANT";
const ADD_RESTAURANT = "restaurants/ADD_RESTAURANT";
const UPDATE_RESTAURANT = "restaurants/UPDATE_RESTAURANT"

/**  Action Creators: */
export const loadRestaurants = (restaurants) => ({
	type: LOAD_RESTAURANTS,
	payload: restaurants.restaurants,
});

export const loadRestaurant = (restaurant) => ({
	type: LOAD_RESTAURANT,
	restaurant,
});

export const addRestaurant = (restaurant) => ({
	type: ADD_RESTAURANT,
	restaurant,
});

export const editRestaurant = (restaurant) => ({
	type: UPDATE_RESTAURANT,
	restaurant
})


/** Thunk Action Creators: */
export const getAllRestaurants = () => async (dispatch) => {
	const res = await fetch("/api/restaurants");
	if (res.ok) {
		const data = await res.json();
		dispatch(loadRestaurants(data));
		return data;
	}
};

export const getRestaurant = (id) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${id}`);
	if (res.ok) {
		const data = await res.json();
		dispatch(loadRestaurant(data));
		return data;
	}
};

export const createRestaurant = (data) => async (dispatch) => {
	const res = await fetch(`/api/restaurants`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const restaurant = await res.json();
		dispatch(addRestaurant(restaurant));
		return restaurant;
	} else {
		const errorData = await res.json();
		console.log(errorData)
		throw errorData;  // Throw the error data directly
	}
};

export const updateRestaurant = (restaurantId, data) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${restaurantId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})

	if(res.ok) {
		const restaurant = await res.json();
		dispatch(editRestaurant(restaurant))
		return restaurant
	} else {
		const errorData = await res.json()
		throw errorData;
	}
}

/** Reducer: */
const initialState = {
	isLoading: true,
	data: {},
};

const restaurantsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_RESTAURANTS: {
			const restaurantState = {};
			action.payload.forEach((restaurant) => {
				restaurantState[restaurant.id] = restaurant;
			});
			return { ...state, data: restaurantState, isLoading: false };
		}
		case LOAD_RESTAURANT:
			return { ...state, data: { ...state.data, [action.restaurant.id]: action.restaurant }, isLoading: false };

		case ADD_RESTAURANT:
			return { ...state, data: { ...state.data, [action.restaurant.id]: action.restaurant }, isLoading: false };

		case UPDATE_RESTAURANT:
			return { ...state, data: { ...state.data, [action.restaurant.id]: action.restaurant }, isLoading: false };

		default:
			return state;
	}
};

export default restaurantsReducer;
