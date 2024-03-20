import "./MenuItem.css";
import { useSelector } from "react-redux";
import DeleteItemModal from "./DeleteItemModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function MenuItem({ items }) {
  const userId = useSelector(state => state.session ? state.session?.user?.id : null)
  const ownerId = useSelector(state => state.restaurants ? state.restaurants?.data['1']?.owner_id : null)
  const restId = useSelector(state => state.restaurants ? state.restaurants?.data['1']?.id : null)

  const addItemToCart = () => {

  }

  return (
    <>
      {items && items.map((item) => (
          <div key={item.id} className="ItemDetail">
            <div className="NameAndDes">
              {item.name}
              <p className="itemdes">{item.description}</p>
              <div className="DesAndButton">
                ${item.price}
                <button onClick={addItemToCart} className="AddButton">
                  <i className="fa-solid fa-circle-plus"></i>
                </button>
              </div>
              {ownerId === userId ?
                      <div className="Buttons">
                        <div>
                          <button className="UpdateButton">Update</button>
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
