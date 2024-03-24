import "./RestaurantCard.css"
function RestaurantCard({ restaurant }) {
  return (
    <>
        <div className="rcContainer">
            <img src={restaurant && restaurant.logo} className="rcImg"></img>
            <div className="rcBottom">
                <h3>{restaurant && `${restaurant.name} (${restaurant.address})` }</h3>
                <div className="rcReview">
                    <span>4.6</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default RestaurantCard
