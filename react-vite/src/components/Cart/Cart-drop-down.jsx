import { useDispatch, useSelector } from "react-redux"
import { getTheCart } from "../../redux/cart"
import { useEffect } from "react";
import { useState } from "react";



import "./cart.css"

export default function CartDropDown() {
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
// let cart = []
const cart = useSelector((state) => state.cart?.cart)
const rest = useSelector((state) => state.cart?.restaurant)
// console.log(cart,"this is my cart state at the moment")
let subTotal = 0.00
const getSubTotal = () => {
  let sub = 0.00
  if (cart.length){

    cart.map((item)=>(
      subTotal += item.price
      ))
      return subTotal.toFixed(2)
    }
    return subTotal.toFixed(2)

}
useEffect(()=>{
  dispatch(getTheCart()).then(()=> setIsLoading(false))

},[])

if (!isLoading) {
  return (
    <>

    {cart.length >= 1 && (
      <>
<h1 className="cart-header"><img key={rest.id} src={rest.logo} style={{height: "50px", width: "50px", borderRadius: "30px"}}></img>{rest.name}</h1>
<hr></hr>
<ul className="cartList" style={{listStyle: "none"}}>
    {cart && cart.map((item)=>(
      <li key={item.name}>
        <>
        <p>
          {item.name} ${item.price.toFixed(2)}
        </p>
        <hr></hr>
        </>
      </li>
    ))}



    </ul>

<h3>Subtotal: ${getSubTotal()}</h3>
{/* <h3>Subtotal: ${subTotal}</h3> */}
<button className="checkoutButton">Checkout</button> <button className="addItemsButton">Add Items</button>
      </>
    )}
    {cart.length === 0 && (
<>
      <h1>No items in Cart!</h1>
      <hr></hr>
      <button className="addItemsButton">Add Items</button>
      </>
    )}



      </>
  )}
  else {
  return (<div>Loading...</div>)
}
}
