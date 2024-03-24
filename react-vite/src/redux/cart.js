import { json } from "react-router-dom"

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
        if (theSpot.ok){
            const restaurant = await theSpot.json()
            dispatch(setRestaurant(restaurant))
        }
        dispatch(loadCart(cartItems))
    }else{
        return { message: "No items in Cart" }
    }
}

export const clearCart = () => async (dispatch) => {
    const cartItems = []
    dispatch(loadCart(cartItems))
}

export const addQuant = (id) => async (dispatch) =>{
    const newQuant = await fetch(`/api/cart/items/${id}/add`,{
        method:'PUT'
        // body: id
    })


    if (newQuant.ok){
        const data = await newQuant.json()
        dispatch(getTheCart)
        return data
    }
}

export const removeItem = (id) => async (dispatch) =>{
    const newQuant = await fetch(`/api/cart/items/${id}/minus`,{
        method:'PUT'
    })


    if (newQuant.ok){
        const data = await newQuant.json()
        dispatch(getTheCart)
        return data
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
