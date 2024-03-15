import { useDispatch, useSelector } from "react-redux"
import { getTheCart } from "../../redux/cart"
import { useEffect } from "react";
import { useState } from "react";

import "./cart.css"

export default function CartDropDown() {
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
const cart = useSelector((state) => state.cart.cart)


useEffect(()=>{
  dispatch(getTheCart()).then(()=> setIsLoading(false))
},[dispatch])

if (!isLoading) {
  return (
    <>
    <ul className="cartList">
      <p>
    test
    {cart.cart && cart.cart.map((item)=>{
      <li key={item.name} >
        <h4>{item.name}</h4>
      </li>
    })}
    </p>
    </ul>
    </>
  )}
  else {
  return (<div>Loading...</div>)
}
}
