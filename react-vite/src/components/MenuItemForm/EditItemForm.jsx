import MenuItemForm from "./MenuItemForm"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneItem } from "../../redux/menu_item"


const EditItemForm = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const item = useSelector(state => state.menu_items[id])

    useEffect(() => {
        const fetchItems = async () => {
            await dispatch(getOneItem(id))
            setLoaded(true)
        }
        fetchItems()

    }, [dispatch, id])

    if (!loaded) return <>Loading...</>

    return (
        <>
            <MenuItemForm item={item} formType="Update Item"/>
        </>
    )
}


export default EditItemForm
