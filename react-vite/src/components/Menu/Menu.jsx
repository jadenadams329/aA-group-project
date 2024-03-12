import './Menu.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMenus } from '../../redux/menus'
import { useEffect } from 'react'


function Menu(){
    const dispatch = useDispatch()
    const menus = Object.values(useSelector((state) => state.menus ? state.menus : null))

    useEffect(() => {
        dispatch(getAllMenus())
    }, [dispatch])

    if(!menus) return <>Loading...</>

}


export default Menu
