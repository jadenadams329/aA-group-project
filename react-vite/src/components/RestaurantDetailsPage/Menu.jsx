import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMenus } from "../../redux/menu";

function Menu({ id }) {
  const dispatch = useDispatch();
  const [breakfast, setBreakfast] = useState(true);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const menus = Object.values(useSelector((state) => (state.menus ? state.menus : null)));
  const breakfastItems = menus.filter(menu => menu.name === 'Breakfast')[0]?.menu_items
  const lunchItems = menus.filter(menu => menu.name === 'Lunch')[0]?.menu_items
  const dinnerItems = menus.filter(menu => menu.name === 'Dinner')[0]?.menu_items
  console.log(breakfastItems)

  const click = (type) => {
    switch (type) {
      case "Breakfast":
        setBreakfast(true);
        setLunch(false);
        setDinner(false);
        break;
      case "Lunch":
        setBreakfast(false);
        setLunch(true);
        setDinner(false);
        break;
      case "Dinner":
        setBreakfast(false);
        setLunch(false);
        setDinner(true);
        break;
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
            <div className="MenuName" onClick={() => click(menu.name)}>
              {menu.name}
            </div>
          ))}
      </div>
      <div className="Details">
        <div className="CategoriesType">
            {breakfast && breakfastItems && breakfastItems.map(item => (
                <ul>
                    <li>{item.category}</li>
                </ul>
            ))}
        </div>
        <div className="Items">
            {breakfast && breakfastItems && breakfastItems.map(item => (
                <div>
                    <img className="ItemImage" src={item.photo_url}/>
                    {item.name}
                </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
