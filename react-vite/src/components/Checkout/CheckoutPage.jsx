import './checkout.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getTheCart } from '../../redux/cart';


export default function CheckoutPage() {
  const dispatch = useDispatch();

  const cart= useSelector((state) => state.cart?.cart)
  const restaurant = useSelector((state) => state.cart?.restaurant)
  let subTotal = 0.00
  const getSubTotal = () => {
    if (cart?.length){
      cart.map((item)=>(
        subTotal += (item.price * item.quantity)
        ))
        return subTotal.toFixed(2)
      }
      return subTotal.toFixed(2)

  }

  useEffect (() =>{
    dispatch(getTheCart()).then(getSubTotal())

  },[dispatch,subTotal])


  return (
    <div>
      <div style={{padding:'50px'}}>
      <img src={restaurant.logo} className='checkout-logo' style={{height:'70px',width:'70px',borderRadius:'50px'}}></img><h1 className='rest-name'>{restaurant.name}</h1>
      </div>
    </div>
  )
}
