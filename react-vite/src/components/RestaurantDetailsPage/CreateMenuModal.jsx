import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createMenu } from "../../redux/menu";
import { useState } from "react";
import './CreateMenuModal.css'

const CreateMenuModal = ({restId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [menuType, setMenuType] = useState('')
    const [errors, setErrors] = useState({});


    const handleSubmit = async e => {
        try{
            e.preventDefault()
            const errs = {}
            if(!menuType){
                errs.errors = "Please choose a Menu Type"
                setErrors(errs)
            } else {
                const menu = {name: menuType}
                await dispatch(createMenu(restId, menu))
                closeModal()
            }
        } catch (err){

        }
    }

    const nope = e => {
        e.preventDefault()
        closeModal()
    }

    return (
        <form className="CreateMenuForm">
            <h2>Create a Menu</h2>
            <div className="SelectionAndPhoto">
                {errors.errors && <span className="Errors">{errors.errors}</span>}
                <label>
                    <select onChange={e => setMenuType(e.target.value)}>
                        <option value=''>Select Menu Type</option>
                        <option value='Breakfast'>Breakfast</option>
                        <option value='Lunch'>Lunch</option>
                        <option value='Dinner'>Dinner</option>
                        <option value='Beverages'>Beverages</option>
                    </select>
                </label>
                {menuType === 'Breakfast' && <img className="MenuPhoto" src='https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>}
                {menuType === 'Lunch' && <img className="MenuPhoto" src='https://images.unsplash.com/photo-1601356616077-695728ae17cb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>}
                {menuType === 'Dinner' && <img className="MenuPhoto" src="https://images.unsplash.com/photo-1611765083444-a3ce30f1c885?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>}
                {menuType === 'Beverages' && <img className="MenuPhoto" src="https://images.unsplash.com/photo-1589948100953-963e39185fd6?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>}
            </div>
            <div className="DeleteItemButtons">
                <button
                    className="CreateMenuButton"
                    onClick={handleSubmit}
                >Yes (Create Menu!)</button>
                <button
                    className="NopeButton"
                    onClick={nope}
                >Not For Now!</button>
            </div>
        </form>
    )
}


export default CreateMenuModal
