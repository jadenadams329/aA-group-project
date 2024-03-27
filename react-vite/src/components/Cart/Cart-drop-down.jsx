import { useDispatch, useSelector } from "react-redux";
import { editQuants, getTheCart, removeItem } from "../../redux/cart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import "./cart.css";

export default function CartDropDown({ cart, restaurant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.session.user);

  let subTotal = 0.0;
  const getSubTotal = () => {
    if (cart?.length) {
      cart.map((item) => (subTotal += item.price * item.quantity));
      return subTotal.toFixed(2);
    }
    return subTotal.toFixed(2);
  };

  const addOne = (id, quant) => {
    const newq = quant + 1;
    dispatch(editQuants(id, { quantity: newq }));
  };
  useEffect(() => {
    dispatch(getTheCart()).then(() => setIsLoading(false));
  }, [dispatch, cart?.length]);

  const addItemfunc = (e) => {
    e.preventDefault();
    navigate(`restaurants/${restaurant.id}`);
  };

  const subOne = (id, quant) => {
    const newq = quant - 1;
    dispatch(editQuants(id, { quantity: newq }));
  };

  if (!isLoading) {
    return (
      <div className='cart'>
        {cart?.length > 0 && (
          <>
            <h1
              className='cart-header'
              style={{ position: "relative", right: "50px" }}
            >
              <img
                key={restaurant.id}
                src={restaurant.logo}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "30px",
                  position: "relative",
                  left: "330px",
                  top: "15px",
                }}
              ></img>
              {restaurant.name}
            </h1>
            <p style={{ color: "black" }}>Deliver to {user.address}</p>
            <hr></hr>
            <ul className='cartList' style={{ listStyle: "none" }}>
              {cart &&
                cart.map((item) => (
                  <li key={item.name} className='items'>
                    <>
                      <div className='quantityButtons'>
                        {console.log(item.id, "this is the item")}
                        {item.quantity > 1 && (
                          <button
                            className='qbutton'
                            onClick={() => subOne(item.id, item.quantity)}
                          >
                            {" "}
                            - {" "}
                          </button>
                        )}
                        {item.quantity === 1 && (
                          <button
                            style={{
                              borderRadius: "20px",
                              width: "30px",
                              border: "none",
                              height: "25px",
                              backgroundColor: "lightgrey",
                            }}
                            onClick={() => dispatch(removeItem(item.id,item.cartId))}
                          >
                            <FaRegTrashCan />
                          </button>
                        )}{" "}
                        {item.quantity}{" "}
                        <button
                          className='qbutton'
                          onClick={() => addOne(item.id, item.quantity)}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <p
                          className='cart-label'
                          style={{ fontSize: "11pt", color: "black" }}
                        >
                          {item.name}
                        </p>
                        <p
                          className='price'
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          {" "}
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <hr className='separater'></hr>
                      </div>
                      <img
                        className='itemimg'
                        src={item.photo_url}
                        style={{ height: "30px", width: "40px" }}
                      ></img>
                    </>
                  </li>
                ))}
            </ul>

            <h3 className='sub'>
              <div>Subtotal:</div>
              <div className='subtotal'>${getSubTotal()}</div>{" "}
            </h3>
            {/* <h3>Subtotal: ${subTotal}</h3> */}
            <div className='buttons'>
              <button
                className='checkoutButton'
                onClick={() => navigate("/checkout")}
              >
                Go to Checkout
              </button>{" "}
              <button className='addItemsButton' onClick={addItemfunc}>
                Add Items
              </button>
            </div>
          </>
        )}
        {!cart ||
          (cart?.length == 0 && (
            <div>
              <h1 style={{position:'relative', left:'30px',
            fontSize:'30pt'}}>No items in Cart!</h1>
              <hr></hr>
              <button
                  style={{padding:' 12px',
                    marginBottom: '8px',
                    borderRadius: '8px',
                    border:'none',
                    backgroundColor: 'lightgray',
                  width:'400px',
                  fontSize:'18pt',
                  fontWeight:'bold',
                  fontStyle:'italic'
                  }}
                onClick={() => navigate("restaurants")}
              >
                Add Items
              </button>
            </div>
          ))}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
