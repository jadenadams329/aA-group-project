import "./checkout.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearCart, getTheCart } from "../../redux/cart";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaCircleChevronUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";




export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const cart = useSelector((state) => state.cart?.cart);
  const restaurant = useSelector((state) => state.cart?.restaurant);
  const [useCredit, setUseCredit] = useState(false);
  const cartId = useSelector((state) => state.cart?.cartId)
  const [counted, setCounted] = useState();
  const [showPics, setShowPics] = useState(true);


  const tax = 0.09
  const getCount = () => {
    let count = 0;
    if (cart?.length) {
      cart.map((item) => (count += item.quantity));
      // console.log(count)
      return count;
    } else {
      return count;
    }
  };

  let subTotal = 0.0;
  const getSubTotal = () => {
    if (cart?.length) {
      cart.map((item) => (subTotal += item.price * item.quantity));
      return subTotal
    }
    return subTotal.toFixed(2);
  };

  const getTotal = () => {
    const taxes = subTotal*tax
    const final = subTotal + taxes
    if(useCredit){

      const total= final - user.credit
      console.log(total,'this is the whole total for checkout')
      if(total < 0) {
          return 0.00
        }else{
          return total.toFixed(2)
        }
    }
    return final.toFixed(2)
  }

  useEffect(() => {
    dispatch(getTheCart())
      .then(getSubTotal())
      .then(() => {
        setCounted(getCount());
      });
  }, [dispatch, subTotal, counted]);


  const finished = () => {

dispatch(clearCart(cartId))
  // navigate(<Confirmation lastFour={lastFour} total={getTotal()} subtotal={getSubTotal()}  />)
  navigate('/confirmed')
  }





  return (
    <div>
      {restaurant && (
        <div style={{ padding: "50px" }}>
          <img
            src={restaurant.logo}
            className='checkout-logo'
            style={{ height: "70px", width: "70px", borderRadius: "50px" }}
          ></img>
          <h1 className='rest-name'>{restaurant.name}</h1>

          <div>
            <h2>Delivery details</h2>
            <p style={{color:'black'}}>
              <FaMapMarkerAlt /> {user.address}, {user.state}{" "}
              <button
                className='addyedit'
                type='button'
                onClick={() => {
                  alert("Feature Coming Soon!");
                }}
              >
                Edit
              </button>
            </p>
          </div>
          <hr></hr>
          <div>
            <h2>Payment</h2>
            <p style={{ fontWeight: "bold",color:'black' }}>Credits Remaining:</p>
            <p style={{color:'black'}}>${user.credit.toFixed(2)}</p>
            <h5>
              Use Credit:{" "}
              <input
                type='checkbox'
                onClick={() =>( setUseCredit(!useCredit))}
              ></input>
            </h5>
            <h4>Card</h4>
            <label>Card Number: </label>
            <br />
            <input
              type='number'
              placeholder='Card Number Required'
              required={true}
              
            ></input>
            <br />
            <br />
            <label>Expiration Date:</label>
            <br />
            <input type='number' placeholder='MM'></input>/
            <input type='number' placeholder='YYYY'></input>
            <br />
            <br />
            <div className='qmark'>

              <label>
                <p style={{color:'black'}}><FaRegQuestionCircle />{" "}CVV{" "}</p>

                <img
                  id='cvv'
                  className='cvv'
                  src='https://www.cvvnumber.com/csc_1.gif'
                ></img>
              </label>
            </div>
            <input type='number' placeholder='CVV'></input>
            <br />
            <br />
            <label>Billing ZipCode:</label>
            <br />
            <input type='number' min={0} minLength={6} maxLength={6} placeholder='Zipcode'></input>
            <br />
          </div>
          <hr></hr>
          <br />
          <div>
            <h2>Order Summary</h2>
            <br />
            {showPics && (
              <p style={{color:'black'}}>
                {counted} items{" "}
                <FaChevronCircleDown onClick={() => setShowPics(!showPics)} />
              </p>
            )}
            {!showPics && (
              <p style={{color:'black'}}>
                {counted} items {" "}
                <FaCircleChevronUp onClick={() => setShowPics(!showPics)} />
              </p>
            )}
            {showPics &&
              cart.map((item) => (
                <img key={item.photo_url}
                  style={{ height: "30px", width: " 30px", margin: "5px" }}
                  src={item.photo_url}
                ></img>
              ))}
            {!showPics &&
              cart.map((item) => (
                <div key={item.name} style={{ height: "50px" }}>
                  <hr></hr>
                  <p style={{color:'black'}}>{item.quantity}</p>{" "}
                  <p
                    style={{
                      position: "relative",
                      left: "40px",
                      bottom: "40px",
                      margin: "none",
                      color:'black'
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      position: "relative",
                      left: "350px",
                      bottom: "78px",
                      margin: "none",
                      color:'black'
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
          </div>


                      <div className="placeOrder">
                    <h2>Order Total</h2>
                    <p style={{color:'black'}}>Subtotal <p style={{position:'relative',left:'300px',bottom:'40px',height:'2px',margin:'none',color:'black'}}>${getSubTotal()}</p></p>
                    <p style={{color:'black'}}>Taxes <p style={{position:'relative',left:'300px',bottom:'40px',height:'2px',margin:'none',color:'black'}}>${(subTotal*tax).toFixed(2)}</p></p>
                    <hr></hr>
                    <h2>Total <p style={{position:'relative',left:'280px',bottom:'58px',margin:'none',color:'black'}}>${getTotal()}</p></h2>
                    <button className="placeOrderButton" onClick={finished}>Place Order</button>
                    </div>

        </div>
      )}
    </div>
  );
}
