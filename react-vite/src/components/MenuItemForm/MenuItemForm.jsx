import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../../redux/menu_item";
import "./MenuItemForm.css";
import { getOneItem } from "../../redux/menu_item";
import { getOneMenu } from "../../redux/menu";

function MenuItemForm({ item, formType }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(item?.name);
  const [price, setPrice] = useState(item?.price);
  const [description, setDescription] = useState(item?.description);
  const [category, setCategory] = useState(item?.category);
  const [photo_url, setPhoto_url] = useState(item?.photo_url);
  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(false);
  const edit_Menu_id = useSelector(state => state.menu_items[item?.id]?.menu_id)
  const menu_id = formType === 'Create Item' ? id : edit_Menu_id
  const restId = useSelector(state => state.menus[menu_id]?.restaurant_id)

  useEffect(() => {
    const fetch = async () => {
      if(formType === 'Update Item') {
        await dispatch(getOneItem(id))
        await dispatch(getOneMenu(menu_id))
      }
      setLoaded(true)
    }
    fetch()
  }, [dispatch, formType, id, menu_id])

  useEffect(() => {
    const errs = {};
    if (!name) errs.name = "Please provide a name for the Item.";
    if (!price) errs.price = "Please provide the price for the Item.";
    if (price && price <= 0) errs.price = "Price must be greater than 0.";
    if (!description) errs.description = "Please provide description of the item.";
    if (category.length <= 0) errs.category = "Please categorize the item.";
    if (!photo_url) errs.photo_url = "Please provide a picture for the item";
    if (
      photo_url &&
      !photo_url.toLowerCase().endsWith(".png") &&
      photo_url &&
      !photo_url.toLowerCase().endsWith(".jpg") &&
      photo_url &&
      !photo_url.toLowerCase().endsWith(".jpeg")
    ) {
      errs.photo_url = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setErrors(errs);
  }, [dispatch, name, price, description, category, photo_url]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      item = { name, price, description, category, photo_url };
      if (formType === "Create Item") {
        const newItem = {
          name,
          price,
          description,
          category,
          photo_url,
          menu_id,
        };
        await dispatch(createItem(menu_id, newItem));
      } else if(formType === "Update Item") {
        item.id = id
        const editItem = await dispatch(updateItem(item))
        item = editItem
      }
      navigate(`/restaurants/${restId}`);
    } catch (error) {
        setErrors(error)
    }
  };

  if (!loaded) return <>Loading.....</>;

  return (
    <form className="ItemForm" onSubmit={handleSubmit}>
      <div className="Pic">
        {formType === "Create Item" ?
          <img
            className="FormPic"
            src="https://images.unsplash.com/photo-1554672408-a5f6022e74c1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          :
          <img
            className="FormPic"
            src="https://images.unsplash.com/photo-1615642036791-a9fa3dc117b2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        }
      </div>
      <div className="Form">
        <div>
          <h2>
            {formType === "Create Item"
              ? "Create a New Item"
              : "Update Your Item"}
          </h2>
          <label>
            <h4>Give the Item a Name!</h4>
            {errors.name && <span className="ErrorMsg">{errors.name}</span>}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item Name"
            />
          </label>
          <label>
            <h4>How much is the item?</h4>
            {errors.price && <span className="ErrorMsg">{errors.price}</span>}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Please enter the default pricing"
            />
          </label>
          <label>
            <h4>Describe your Item!</h4>
            {errors.description && (
              <span className="ErrorMsg">{errors.description}</span>
            )}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Stir-fried rice with scrambled eggs and vegetables, seasoned with soy sauce."
            />
          </label>
          <label>
            <h4>Define the Category of the Item!</h4>
            {errors.category && (
              <span className="ErrorMsg">{errors.category}</span>
            )}
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="FastFood, Pizza, ...etc"
            />
          </label>
          <label>
            <h4>Liven up the item with a Photo!</h4>
            {errors.photo_url && (
              <span className="ErrorMsg">{errors.photo_url}</span>
            )}
            <input
              type="text"
              value={photo_url}
              onChange={(e) => setPhoto_url(e.target.value)}
              placeholder="Preview Image URL"
            />
          </label>
          <div className="CreateButton">
            <button
              disabled={Object.values(errors).length}
              className="CreateItemButton"
            >{formType}</button>
          </div>
        </div>

        </div>
    </form>
  );
}

export default MenuItemForm;
