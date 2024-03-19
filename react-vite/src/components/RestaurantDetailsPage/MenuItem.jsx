import "./MenuItem.css";
import { useSelector } from "react-redux";
import DeleteItemModal from "./DeleteItemModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function MenuItem({ items }) {
  const userId = useSelector(state => state.session ? state.session?.user?.id : null)
  const ownerId = useSelector(state => state.restaurants ? state.restaurants?.data['1']?.owner_id : null)
  const restId = useSelector(state => state.restaurants ? state.restaurants?.data['1']?.id : null)

  return (
    <>
      {items && items.map((item) => (
          <div key={item.id} className="ItemDetail">
            <div className="NameAndPrice">
              {item.name}
              <p className="itemdes">{item.description}</p>
              ${item.price}
              {ownerId === userId ?
                      <p>
                        <button className="UpdateButton">Update</button>
                        <OpenModalButton
                          buttonText="Delete"
                          modalComponent={
                            <DeleteItemModal
                              item={item}
                              restId={restId}
                            />
                          }
                        />
                      </p>
                      : null}
            </div>
            <img className="ItemImage" src={item.photo_url} />
          </div>
        ))}
    </>
  );
}

export default MenuItem;
