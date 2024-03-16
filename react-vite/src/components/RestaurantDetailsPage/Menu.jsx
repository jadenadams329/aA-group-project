import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMenus } from "../../redux/menu";

function Menu({ id }) {
  const dispatch = useDispatch();
  const [breakfast, setBreakfast] = useState(true);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [beverages, setBeverages] = useState(false)
  const menus = Object.values(useSelector((state) => (state.menus ? state.menus : null)));
  const breakfastItems = menus.filter(menu => menu.name === 'Breakfast')[0]?.menu_items
  const lunchItems = menus.filter(menu => menu.name === 'Lunch')[0]?.menu_items
  const dinnerItems = menus.filter(menu => menu.name === 'Dinner')[0]?.menu_items
  const beverageItems = menus.filter(menu => menu.name === 'Beverages')[0]?.menu_items

  const click = (type) => {
    switch (type) {
      case "Breakfast":
        setBreakfast(true);
        setLunch(false);
        setDinner(false);
        setBeverages(false);
        break;
      case "Lunch":
        setBreakfast(false);
        setLunch(true);
        setDinner(false);
        setBeverages(false);
        break;
      case "Dinner":
        setBreakfast(false);
        setLunch(false);
        setDinner(true);
        setBeverages(false);
        break;
      case "Beverages":
        setBreakfast(false);
        setLunch(false);
        setDinner(false);
        setBeverages(true);
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getAllMenus(id));
  }, [dispatch, id]);

  if (!menus) return <>Loading...</>;



  return (
    <>
      <div className="MenuTypeContainer">
        {menus &&
          menus.map((menu) => (
            <div key={menu.id} className="MenuName" onClick={() => click(menu.name)}>
              {menu.name}
            </div>
          ))}
      </div>

      <div className="Details">
        <div className="CategoriesType">
            {breakfast && breakfastItems && breakfastItems.map(item => (
                <ul key={item.id}>
                    <li>{item.category}</li>
                </ul>
            ))}
            {lunch && lunchItems && lunchItems.map(item => (
                <ul key={item.id}>
                    <li>{item.category}</li>
                </ul>
            ))}
            {dinner && dinnerItems && dinnerItems.map(item => (
                <ul key={item.id}>
                    <li>{item.category}</li>
                </ul>
            ))}
            {beverages && beverageItems && beverageItems.map(item => (
                <ul key={item.id}>
                    <li>{item.category}</li>
                </ul>
            ))}
        </div>
        <div className="Items">
            {breakfast && breakfastItems && breakfastItems.map(item => (
                <div key={item.id} className="ItemDetail">
                    <div className="nameAndPrice">
                      <p>{item.name}</p>
                      <p className="itemdes">{item.description}</p>
                      <p>${item.price}</p>
                    </div>
                    <img className="ItemImage" src={item.photo_url}/>
                </div>
            ))}
            {lunch && lunchItems && lunchItems.map(item => (
                <div key={item.id} className="ItemDetail">
                    <img className="ItemImage" src={item.photo_url}/>
                    <div className="nameAndPrice">
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                </div>
            ))}
            {dinner && dinnerItems && dinnerItems.map(item => (
                <div key={item.id} className="ItemDetail">
                    <img className="ItemImage" src={item.photo_url}/>
                    <div className="nameAndPrice">
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                </div>
            ))}
        </div>


      </div>
    </>
  );
}

export default Menu;
