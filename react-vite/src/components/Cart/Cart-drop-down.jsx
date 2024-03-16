import { useDispatch } from "react-redux"
import { getTheCart } from "../../redux/cart"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./cart.css"

export default function CartDropDown({cart, restaurant}) {
const navigate = useNavigate()
  const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);


// console.log(cart,"this is my cart state at the moment")
let subTotal = 0.00
const getSubTotal = () => {
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

},[dispatch])


const addItemfunc = (e) => {
  e.preventDefault()
  navigate(`restaurants/${restaurant.id}`)
}




if (!isLoading) {
  return (
    <>

    {cart.length >= 1 && (
      <>
<h1 className="cart-header"><img key={restaurant.id} src={restaurant.logo} style={{height: "50px", width: "50px", borderRadius: "30px"}}></img>{restaurant.name}</h1>
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
<button className="checkoutButton" onClick={()=> navigate('/checkout')}>Checkout</button> <button className="addItemsButton" onClick={addItemfunc}>Add Items</button>
      </>
    )}
    {cart.length === 0 && (
<>
      <h1>No items in Cart!</h1>
      <hr></hr>
      <button className="addItemsButton" onClick={()=> navigate('restaurants')}>Add Items</button>
      </>
    )}



      </>
  )}
  else {
  return (<div>Loading...</div>)
}
}
