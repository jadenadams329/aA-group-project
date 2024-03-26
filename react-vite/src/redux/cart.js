

//^ action types:
const LOAD_CART = 'cart/LOAD_CART'
const GET_REST = 'cart/GET_REST'
const ADD_QUANT = 'cart/ADD_QUANT'

//~ Action Creators:
const loadCart = (cartItems) =>({
    type: LOAD_CART,
    cartItems
})

const setRestaurant = (restaurant) =>({
    type: GET_REST,
    restaurant
})

const setTotalItems = (quant) => ({
    type: ADD_QUANT,
    quant
})


//? Thunks:
export const getTheCart = () => async (dispatch)=> {
    const res = await fetch('/api/cart/items');

    if (res.ok) {
        const cartItems = await res.json();
        // console.log(cartItems[0].restaurant,'this is the cart items in the thunk')
        let quant = 0;
        if(cartItems.length){
            cartItems.map((item) => (
                quant += item.quantity
                ))
            console.log(quant,'this is how many items are in my cart~~~~~~~~~~~~~')
            const theSpot = await fetch(`/api/restaurants/${cartItems[0].restaurant}`);
            if (theSpot.ok){
                const restaurant = await theSpot.json()
                if (restaurant) {
                    dispatch(setRestaurant(restaurant))
                }
            }
        }
        dispatch(setTotalItems(quant))
        dispatch(loadCart(cartItems))
    }
}

export const clearCart = () => async (dispatch) => {
    const cartItems = []
    dispatch(loadCart(cartItems))
}

// export const addQuant = (id) => async (dispatch) =>{
//     const newQuant = await fetch(`/api/cart/items/${id}/add`,{
//         method:'PUT'
//         // body: id
//     })


//     if (newQuant.ok){
//         const data = await newQuant.json()
//         dispatch(getTheCart)
//         return data
//     }
// }

// export const removeItem = (id) => async (dispatch) =>{
//     const newQuant = await fetch(`/api/cart/items/${id}/minus`,{
//         method:'PUT'
//     })


//     if (newQuant.ok){
//         const data = await newQuant.json()
//         dispatch(getTheCart)

//     }
// }

export const addingItem = (id) => async (dispatch) =>{
    const res = await fetch(`/api/cart/items/${id}`,{
        method: 'POST'
    })

    if (res.ok){
        const data = await res.json()
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
        case ADD_QUANT:
            return {...state, totalItems: action.quant}
        default:
            return state
    }
}

export default cartReducer;
