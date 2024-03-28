
//^ action types:
const LOAD_CART = 'cart/LOAD_CART'
const GET_REST = 'cart/GET_REST'
const ADD_QUANT = 'cart/ADD_QUANT'
const CART_ID = 'cart/CART_ID'
const CLEAR_CART='cart/CLEAR_CART'

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


const setId = (id) => ({
    type: CART_ID,
    id
})

const clearedCart = () => ({
type: CLEAR_CART
})

//? Thunks:
export const getTheCart = () => async (dispatch)=> {
    const res = await fetch('/api/cart/items');

    if (res.ok) {
        const cartItems = await res.json();
        // console.log(cartItems[0].restaurant,'this is the cart items in the thunk')
        let quant = 0;
        if (cartItems.length){
            dispatch(setId(cartItems[0].cartId))
        }
        if(cartItems.length){
            cartItems.map((item) => (
                quant += item.quantity
                ))

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



export const clearCart = (id) => async (dispatch) => {
    const data =await fetch(`/api/cart/${id}`,{
        method: 'DELETE'

    })
    if (data.ok){
        const res = await data.json()
            console.log(res,'ppppppppppppppppppp')

        dispatch(clearedCart())
    }

}




export const editQuants = (id,quant) => async (dispatch) =>{
    console.log(quant,'quant from my thunk',id)
    const res = await fetch(`/api/cart/items/${id}`,{
        method: 'PUT',
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(quant)
    })
    if (res.ok){
       const data = await res.json()
        dispatch(getTheCart())
        return data
    }
}



export const removeItem = (id,cartId) => async (dispatch) => {
    const res = await fetch(`/api/cart/items/${id}`,{
        method: 'DELETE'
    })
    if(res.ok){
        const data = await fetch('/api/cart/items')
        if (data.ok){
            const me= await data.json()
            console.log(me,'meeeeeeeeeeeeeeeeeeeeeeee')
            dispatch(clearCart(cartId))
        }
    }
}




export const addingItem = (id) => async (dispatch) =>{
    const res = await fetch(`/api/cart/items/${id}`,{
        method: 'POST'
    })

    if (res.ok){
        const data = await res.json()
        const rest = await fetch(`/api/restaurants/${id}`)
        const test = await rest.json()
        console.log(test,' this is my new resty------------')
        dispatch(setId(''))
        dispatch(getTheCart())
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
        case CART_ID:
            return {...state, cartId: action.id}
        case CLEAR_CART:
            return {}
        default:
            return state
    }
}

export default cartReducer;
