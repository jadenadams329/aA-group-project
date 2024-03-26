import MenuItemForm from "./MenuItemForm";

const CreateItemForm = () => {
    const newItem = {
        name: '',
        price: '',
        description: '',
        category: '',
        photo_url: ''
    }

    return (
        <>
            <MenuItemForm
                item={newItem}
                formType="Create Item"
            />
        </>
    )
}

export default CreateItemForm
