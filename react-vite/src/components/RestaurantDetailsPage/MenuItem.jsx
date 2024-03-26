import "./MenuItem.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteItemModal from "./DeleteItemModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { Link } from "react-router-dom";
import { addingItem, getTheCart } from "../../redux/cart";


function MenuItem({ items }) {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.session ? state.session?.user?.id : null)
  const ownerId = useSelector(state => state.restaurants ? state.restaurants?.data['1']?.owner_id : null)
  const restId = useSelector(state => state.restaurants ? state.restaurants?.data['1']?.id : null)

  return (
    <>
      {items && items.map((item) => (
          <div key={item.id} className="ItemDetail">
            <div className="NameAndDes">
              {item.name}
              <p className="itemdes">{item.description}</p>
              <div className="DesAndButton">
                ${item.price.toFixed(2)}
                <button onClick={() => dispatch(addingItem(item.id)).then(() => dispatch(getTheCart()))} className="AddButton">
                  <i className="fa-solid fa-circle-plus"></i>
                </button>
              </div>
              {ownerId === userId ?
                      <div className="Buttons">
                        <div className="UpdateLink">
                            <Link to={`/items/${item.id}/edit`}>Update</Link>
                        </div>
                        <div className="DeleteItemButton">
                          <OpenModalButton
                            buttonText="Delete"
                            modalComponent={
                              <DeleteItemModal
                                item={item}
                                restId={restId}
                              />
                            }
                          />
                        </div>
                      </div>
                      : null}
            </div>
            <img className="ItemImage" src={item.photo_url} />
          </div>
        ))}
    </>
  );
}

export default MenuItem;
