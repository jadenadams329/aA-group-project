import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Confirmation() {
const navigate = useNavigate()
 useEffect(()=>{
  setTimeout(()=>{
    navigate('/restaurants')
  },4000)
 },[])

  return (
    <div style={{display:'flex',flexDirection: 'column',alignItems:'center'}}>
      <h1 style={{fontWeight:'bold', fontSize:'51pt'}}>Your Order Has Been Confirmed!</h1>
    <img src='https://content.presentermedia.com/files/clipart/00003000/3296/check_mark_green_800_wht.jpg'></img>
    </div>
  )
}
