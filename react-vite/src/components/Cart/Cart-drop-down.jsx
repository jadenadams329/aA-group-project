import { useDispatch, useSelector } from "react-redux"
import { getTheCart } from "../../redux/cart"
import { useEffect } from "react";
import { useState } from "react";

import "./cart.css"

export default function CartDropDown() {
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
const cart = useSelector((state) => state.cart?.cart)
const rest = useSelector((state) => state.cart?.restaurant)
console.log(cart,"this is my cart state at the moment")

useEffect(()=>{
  dispatch(getTheCart()).then(()=> setIsLoading(false))
},[])

if (!isLoading) {
  return (
    <>
<h1>{rest}</h1>
    <ul className="cartList">
    {cart.map((item)=>(
      <li>
        <p>{item && item.name}</p>
      </li>
    ))}
    {!cart && (
      <h1>No items in Cart!</h1>
      )}
    </ul>

      </>
  )}
  else {
  return (<div>Loading...</div>)
}
}
