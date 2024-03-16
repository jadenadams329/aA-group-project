
//^ action types:
const LOAD_CART = 'cart/LOAD_CART'
const GET_REST = 'cart/GET_REST'


//~ Action Creators:
const loadCart = (cartItems) =>({
    type: LOAD_CART,
    cartItems
})

const setRestaurant = (restaurant) =>({
    type: GET_REST,
    restaurant
})


//? Thunks:
export const getTheCart = () => async (dispatch)=> {
    const res = await fetch('/api/cart/items');

    if (res.ok) {
        const cartItems = await res.json();
        console.log(cartItems[0].restaurant,'this is the cart items in the thunk')
        const theSpot = await fetch(`/api/restaurants/${cartItems[0].restaurant}`);
        const rest = await theSpot.json()
        console.log(rest,'this is the restaurant that is pulled')
        const restaurant = rest.name
        dispatch(setRestaurant(restaurant))
        dispatch(loadCart(cartItems))
    }else{
        return { message: "No items in Cart" }
    }
}



//! Reducer:

const cartReducer =(state = {},action) =>{
    switch (action.type) {
        case LOAD_CART:
            return { ...state, cart: action.cartItems }
        case GET_REST:
            return {...state, restaurant: action.restaurant}

        default:
            return state
    }
}

export default cartReducer;
