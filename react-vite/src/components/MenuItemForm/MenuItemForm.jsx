import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createItem, updateItem } from "../../redux/menu_item";
import "./MenuItemForm.css";

function MenuItemForm({ item, formType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(item?.name);
  const [price, setPrice] = useState(item?.price);
  const [description, setDescription] = useState(item?.description);
  const [category, setCategory] = useState(item?.category);
  const [photo_url, setPhoto_url] = useState(item?.photo_url);

  const reset = () => {
    setName(""),
      setPrice(""),
      setCity(""),
      setDescription(""),
      setPhoto_url("");
  };

  const handleSubmit = async (e) => {};

  return (
    <form className="ItemForm" onSubmit={handleSubmit}>
      <div className="Pic">
        <img
          className="FormPic"
          src="https://images.unsplash.com/photo-1554672408-a5f6022e74c1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="ItemList">
        <h2>
          {formType === "Create Item"
            ? "Create a New Item"
            : "Update Your Item"}
        </h2>
        <label>
          <h4>Item Name</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
          />
        </label>
        <label>
          <h4>Default Price</h4>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Please enter the default pricing"
          />
        </label>
        <label>
          <h4>Describe your Item!</h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <h4>Define the Category of your Item!</h4>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="FastFood, Pizza, ...etc"
          />
        </label>
        <label>
            <h4>Liven up the item with a preview Photo!</h4>
            <input
                type="text"
                value={photo_url}
                onChange={e => setPhoto_url(e.target.value)}
                placeholder="Preview Image URL"
            />
        </label>
        <div>
            <button>
                {formType}
            </button>
        </div>
      </div>
    </form>
  );
}

export default MenuItemForm;
