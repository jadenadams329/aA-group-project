//^ action types:
const LOAD_CART = 'cart/LOAD_CART'



//~ Action Creators:
const loadCart = (cartItems) =>({
    type: LOAD_CART,
    cartItems
})


//? Thunks:
export const getTheCart = () => async (dispatch)=> {
    const res = await fetch('/api/cart/items');

    if (res.ok) {
        const cartItems = await res.json();
        console.log(cartItems,'this is the cart items in the thunk')
        dispatch(loadCart(cartItems))
    }else{
        return { message: "No items in Cart" }
    }
}



//! Reducer:

const cartReducer =(state = {},action) =>{
    switch (action.type) {
        case LOAD_CART:
            return {...state, cart: action.cartItems}

        default:
            return state
    }
}

export default cartReducer;
