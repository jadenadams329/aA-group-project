const LOAD_ONE_MENU = 'menus/LOAD_ONE_MENU'
const LOAD_MENUS = 'menus/LOAD_MENUS'
const ADD_MENU = 'menus/ADD_MENUS'
const UPDATE_MENU = 'menus/UPDATE_MENUS'
const DELETE_MENU = 'menus/DELETE_MENUS'

/* Action Creator */
export const loadOneMenu = menu => ({
    type: LOAD_ONE_MENU,
    menu
})

export const loadMenus = menus => ({
    type: LOAD_MENUS,
    menus
})

export const addMenu = menu => ({
    type: ADD_MENU,
    menu
})

export const editMenu = menu => ({
    type: UPDATE_MENU,
    menu
})

export const deleteMenu = menuId => ({
    type: DELETE_MENU,
    menuId
})

/* Thunk */
export const getOneMenu = menuId => async(dispatch) => {
    const res = await fetch(`/api/menus/${menuId}`)

    if(res.ok){
        const menu = await res.json()
        dispatch(loadOneMenu(menu))
    } else {
        const err = await res.json()
        return err
    }
}

export const getAllMenus = restaurantId => async(dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurantId}/menus`)

    if(res.ok){
        const menus = await res.json()
        dispatch(loadMenus(menus))
    } else {
        const err = await res.json()
        return err
    }
}

export const createMenu = (restaurantId, menu) => async(dispatch) => {
    let res = await fetch(`/api/restaurants/${restaurantId}/menus`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(menu)
    })

    if(res.ok){
        const newMenu = await res.json()
        dispatch(addMenu(newMenu))
        return newMenu
    } else {
        res = await res.json()
        throw res
    }
}

export const updateMenu = menu => async(dispatch) => {
    const res = await fetch(`/api/menus/${menu.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(menu)
    })

    if(res.ok){
        const updatedMenu = await res.json()
        dispatch(editMenu(updatedMenu))
        return updatedMenu
    } else {
        const err = await res.json()
        return err
    }
}

export const removeMenu = menuId => async(dispatch) => {
    const res = await fetch(`/api/menus/${menuId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        dispatch(deleteMenu(menuId))
    } else {
        const err = await res.json()
        return err
    }
}

/* Reducer */

const initialState = {}

const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ONE_MENU: {
            return {...state, [action.menu.id]: action.menu}
        }
        case LOAD_MENUS: {
            const menuState = {}
            action.menus.forEach(menu => menuState[menu.id] = menu)
            return menuState
        }
        case ADD_MENU: {
            return {...state, [action.menu.id]: action.menu}
        }
        case UPDATE_MENU: {
            return {...state, [action.menu.id]: action.menu}
        }
        case DELETE_MENU: {
            const newMenuState = {...state}
            delete newMenuState[action.menuId]
            return newMenuState
        }
        default:
            return state
    }
}

export default menuReducer
