const LOAD_ITEMS = 'items/LOAD_ITEMS'
const ADD_ITEM = 'item/ADD_ITEM'
const UPDATE_ITEM = 'item/UPDATE_ITEM'
const DELETE_ITEM = 'item/DELETE_ITEM'

/* Action Creator */
export const loadItems = items => ({
    type: LOAD_ITEMS,
    items
})

export const addItem = item => ({
    type: ADD_ITEM,
    item
})

export const editItem = item => ({
    type: UPDATE_ITEM,
    item
})

export const deleteItem = itemId => ({
    type: DELETE_ITEM,
    itemId
})

/* Thunk */
export const getAllItems = () => async(dispatch) => {
    const res = await fetch('/api/items')

    if(res.ok){
        const items = await res.json()
        dispatch(loadItems(items))
    } else {
        const err = await res.json()
        return err
    }
}

export const createItem = (menuId, item) => async(dispatch) => {
    const res = await fetch(`/api/menus/${menuId}/items`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })

    if(res.ok){
        const newItem = await res.json()
        dispatch(addItem(newItem))
        return newItem
    } else {
        const err = await res.json()
        return err
    }
}

export const updateItem = item => async(dispatch) => {
    const res = await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })

    if(res.ok){
        const updatedItem = await res.json()
        dispatch(editItem(updatedItem))
        return updatedItem
    } else {
        const err = await res.json()
        return err
    }
}

export const removeItem = itemId => async(dispatch) => {
    const res = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        dispatch(deleteItem(itemId))
    } else {
        const err = await res.json()
        return err
    }
}

/* Reducer */

const initialState = {}

const menuItemReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ITEMS: {
            const itemState = {}
            action.items.forEach(item => itemState[item.id] = item)
            return itemState
        }
        case ADD_ITEM: {
            return {...state, [action.item.id]: action.item}
        }
        case UPDATE_ITEM: {
            return {...state, [action.item.id]: action.item}
        }
        case DELETE_ITEM: {
            const newMenuItemState = {...state}
            delete newMenuItemState[action.itemId]
            return newMenuItemState
        }
        default:
            return state
    }
}

export default menuItemReducer
