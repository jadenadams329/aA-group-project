import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeItem } from "../../redux/menu_item";
import { getAllMenus } from "../../redux/menu";
import { getRestaurant } from "../../redux/restaurants";
import './DeleteItemModal.css'

const DeleteItemModal = ({item, restId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const confirmDelete = async e => {
        e.preventDefault()
        await dispatch(removeItem(item.id))
        await getRestaurant(restId)
        await dispatch(getAllMenus(restId))
        closeModal()
    }

    const nope = e => {
        e.preventDefault()
        closeModal()
    }

    return (
        <form className="DeleteItemForm">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to take this item out of the Menu?</p>
            <div className="NameAndImage">
                <p className="ItemName">{item.name}</p>
                <img className="itemImage" src={item.photo_url}/>
            </div>
            <div className="DeleteItemButtons">
                <button
                    className="DeleteButton"
                    onClick={confirmDelete}
                >Yes (Delete Item)</button>
                <button
                    className="NopeButton"
                    onClick={nope}
                >No (Keep Item)</button>
            </div>
        </form>
    )
}

export default DeleteItemModal
