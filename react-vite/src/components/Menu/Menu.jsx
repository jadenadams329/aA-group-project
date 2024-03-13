import './Menu.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


function Menu(){
    const dispatch = useDispatch()
    const menus = Object.values(useSelector((state) => state.menu ? state.menu : null))
    // const items = Object.values(useSelector((state) => state.menu_item ? state.menu_item : null))

    useEffect(() => {


    }, [dispatch])

    if(!menus) return <>Loading...</>

}


export default Menu
