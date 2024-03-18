import "./MenuItem.css";

function MenuItem({ items }) {
  return (
    <>
      {items && items.map((item) => (
          <div className="ItemDetail">
            <div className="NameAndPrice">
              {item.name}
              <p className="itemdes">{item.description}</p>${item.price}
            </div>
            <img className="ItemImage" src={item.photo_url} />
          </div>
        ))}
    </>
  );
}

export default MenuItem;
