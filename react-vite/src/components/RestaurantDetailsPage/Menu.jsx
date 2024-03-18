import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMenus } from "../../redux/menu";
import Category from "./Category";

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
      <div className="CategoriesType">
        {breakfast ? <Category breakfastItems={breakfastItems}/> : null}
        {lunch ? <Category lunchItems={lunchItems}/> : null}
        {dinner ? <Category dinnerItems={dinnerItems}/> : null}
        {beverages ? <Category beverageItems={beverageItems}/> : null}
      </div>
    </>
  );
}

export default Menu;
